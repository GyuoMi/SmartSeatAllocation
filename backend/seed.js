const Database = require('better-sqlite3');
const path = require('path');

// This creates the database file in the same folder
const db = new Database(path.join(__dirname, 'allocation.db'));

console.log("Starting database seed...");

// 1. Drop existing tables to ensure a clean slate every time you run it
db.exec(`
    DROP TABLE IF EXISTS participants;
    DROP TABLE IF EXISTS divisions;
    DROP TABLE IF EXISTS sessions;
`);

// 2. Create the Tables
db.exec(`
    CREATE TABLE sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        time_slot TEXT NOT NULL,
        max_capacity INTEGER DEFAULT 20
    );

    CREATE TABLE divisions (
        name TEXT PRIMARY KEY,
        session_allocation_limit INTEGER NOT NULL
    );

    CREATE TABLE participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        division TEXT NOT NULL,
        allocated_session_id INTEGER,
        is_allocated BOOLEAN DEFAULT 0,
        FOREIGN KEY(division) REFERENCES divisions(name),
        FOREIGN KEY(allocated_session_id) REFERENCES sessions(id)
    );
`);

// 3. Insert Sessions
const insertSession = db.prepare(`INSERT INTO sessions (name, time_slot, max_capacity) VALUES (?, ?, ?)`);
insertSession.run('Morning', '09:00 - 10:30', 20);
insertSession.run('Midday', '11:00 - 12:30', 20);
insertSession.run('Afternoon', '13:00 - 14:30', 20);

// 4. Insert Division Limits (The constraints from the brief)
const insertDivision = db.prepare(`INSERT INTO divisions (name, session_allocation_limit) VALUES (?, ?)`);
insertDivision.run('A', 8);
insertDivision.run('B', 6);
insertDivision.run('C', 6);

// 5. Generate exactly 60 Mock Participants
const insertParticipant = db.prepare(`INSERT INTO participants (name, division) VALUES (?, ?)`);

// Generate 24 for Division A
for (let i = 1; i <= 24; i++) {
    insertParticipant.run(`Employee A-${i.toString().padStart(2, '0')}`, 'A');
}
// Generate 18 for Division B
for (let i = 1; i <= 18; i++) {
    insertParticipant.run(`Employee B-${i.toString().padStart(2, '0')}`, 'B');
}
// Generate 18 for Division C
for (let i = 1; i <= 18; i++) {
    insertParticipant.run(`Employee C-${i.toString().padStart(2, '0')}`, 'C');
}

console.log("✅ Database seeded successfully!");
console.log("- 3 Sessions created");
console.log("- Division limits enforced");
console.log("- 60 Participants generated (24 A, 18 B, 18 C)");