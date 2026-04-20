const request = require('supertest');
const { app, db } = require('../server'); // Import your Express app and SQLite connection

describe('Smart Seat Allocation API constraints', () => {

    // --- ARRANGE ---
    // Before testing, let's reset the database to a known state using a Guard step
    beforeAll(() => {
        // Clear participants
        db.prepare('DELETE FROM participants').run();
        
        // Ensure sessions exist
        db.prepare('DELETE FROM sessions').run();
        const insertSession = db.prepare('INSERT INTO sessions (id, name, time_slot, max_capacity) VALUES (?, ?, ?, ?)');
        insertSession.run(1, 'Morning', '09:00 - 10:30', 20);

        // Ensure divisions exist
        db.prepare('DELETE FROM divisions').run();
        const insertDivision = db.prepare('INSERT INTO divisions (name, session_allocation_limit) VALUES (?, ?)');
        insertDivision.run('A', 8);
        insertDivision.run('B', 6);

        // Insert some mock participants
        const insertUser = db.prepare('INSERT INTO participants (id, name, division, is_allocated) VALUES (?, ?, ?, ?)');
        insertUser.run(1, 'John - Div A', 'A', 0);
        insertUser.run(2, 'Jane - Div A', 'A', 0);
        insertUser.run(3, 'Sipho - Div B', 'B', 0);
    });

    // --- TEST 1: The Happy Path ---
    it('should successfully allocate a free participant', async () => {
        // Act
        const res = await request(app)
            .post('/api/allocate')
            .send({ participantId: 1, sessionId: 1 });

        // Assert
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        // Guard Assertion: Verify database state
        const user = db.prepare('SELECT is_allocated FROM participants WHERE id = 1').get();
        expect(user.is_allocated).toBe(1);
    });

    // --- TEST 2: Double Booking Constraint ---
    it('should reject a participant who is already allocated', async () => {
        // Act (Participant 1 was just allocated in the previous test)
        const res = await request(app)
            .post('/api/allocate')
            .send({ participantId: 1, sessionId: 1 });

        // Assert
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain('already allocated');
    });

    // --- TEST 3: Division Quota Constraint ---
    it('should enforce division quotas to prevent overbooking', async () => {
        // Arrange: Max out Division B's quota (Limit is 6)
        const insertUser = db.prepare('INSERT INTO participants (name, division, allocated_session_id, is_allocated) VALUES (?, ?, ?, ?)');
        for(let i = 0; i < 6; i++) {
            insertUser.run(`Filler B-${i}`, 'B', 1, 1);
        }

        // Act: Try to allocate Sipho (Participant 3, who is in Division B)
        const res = await request(app)
            .post('/api/allocate')
            .send({ participantId: 3, sessionId: 1 });

        // Assert: It should fail because Div B now has 6 people in Session 1
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain('has reached its limit');
    });
});