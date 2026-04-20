const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the SQLite database (Ensure you ran seed.js first!)
const db = new Database(path.join(__dirname, 'allocation.db'));

// Middleware
app.use(cors()); // Allows the React frontend to fetch data
app.use(express.json()); // Parses incoming JSON payloads

// ==========================================
// 1. GET /api/sessions (The Dashboard Data)
// ==========================================
app.get('/api/sessions', (req, res) => {
    try {
        // This query fetches the sessions AND counts how many people from each division are in it.
        // This is much faster than doing the math on the React frontend!
        const sessions = db.prepare(`
            SELECT 
                s.id, 
                s.name, 
                s.time_slot, 
                s.max_capacity,
                COUNT(p.id) as total_count,
                SUM(CASE WHEN p.division = 'A' THEN 1 ELSE 0 END) as divA_count,
                SUM(CASE WHEN p.division = 'B' THEN 1 ELSE 0 END) as divB_count,
                SUM(CASE WHEN p.division = 'C' THEN 1 ELSE 0 END) as divC_count
            FROM sessions s
            LEFT JOIN participants p ON s.id = p.allocated_session_id
            GROUP BY s.id
        `).all();
        
        res.json(sessions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch sessions' });
    }
});

// ==========================================
// 2. GET /api/participants (The Dropdown Data)
// ==========================================
app.get('/api/participants', (req, res) => {
    const { division } = req.query;
    try {
        // Only fetch people who belong to the selected HR division AND are not yet allocated
        const participants = db.prepare(`
            SELECT * FROM participants 
            WHERE division = ? AND is_allocated = 0
        `).all(division);
        
        res.json(participants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch participants' });
    }
});

// ==========================================
// 3. POST /api/allocate (The Core Constraint Logic)
// ==========================================
app.post('/api/allocate', (req, res) => {
    const { participantId, sessionId } = req.body;

    if (!participantId || !sessionId) {
        return res.status(400).json({ error: 'Missing participant or session ID' });
    }

    try {
        // Start a database transaction. This ensures that if any check fails, 
        // the whole process safely aborts without saving bad data.
        const allocateTransaction = db.transaction(() => {
            
            // --- Check 1: Does the participant exist and are they free? ---
            const participant = db.prepare(`SELECT * FROM participants WHERE id = ?`).get(participantId);
            if (!participant || participant.is_allocated === 1) {
                throw new Error("Participant is already allocated to a session.");
            }

            // --- Check 2: Session Capacity Hard Limit (Max 20) ---
            const sessionTotal = db.prepare(`
                SELECT COUNT(*) as count FROM participants WHERE allocated_session_id = ?
            `).get(sessionId).count;
            
            if (sessionTotal >= 20) {
                throw new Error("This session has reached its maximum capacity of 20 participants.");
            }

            // --- Check 3: Division Hard Limit (e.g., Max 8 for Div A) ---
            const divisionLimit = db.prepare(`
                SELECT session_allocation_limit FROM divisions WHERE name = ?
            `).get(participant.division).session_allocation_limit;

            const currentDivisionCount = db.prepare(`
                SELECT COUNT(*) as count FROM participants 
                WHERE allocated_session_id = ? AND division = ?
            `).get(sessionId, participant.division).count;

            if (currentDivisionCount >= divisionLimit) {
                throw new Error(`Division ${participant.division} has reached its limit of ${divisionLimit} seats for this session.`);
            }

            // --- Final Step: Atomic Update ---
            // The 'AND is_allocated = 0' prevents double-booking race conditions
            const result = db.prepare(`
                UPDATE participants 
                SET allocated_session_id = ?, is_allocated = 1 
                WHERE id = ? AND is_allocated = 0
            `).run(sessionId, participantId);

            if (result.changes === 0) {
                throw new Error("Concurrency error: Participant was allocated by another user.");
            }
        });

        // Execute the transaction
        allocateTransaction();
        res.json({ success: true, message: 'Allocation successful' });

    } catch (error) {
        // If ANY of our custom errors are thrown, catch them and send them safely to the React frontend
        res.status(400).json({ error: error.message });
    }
});

// Export the app and database so Jest can use them
module.exports = { app, db };

// Only start the server if we run this file directly (not during tests)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });
}