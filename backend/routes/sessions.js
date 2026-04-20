const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all sessions with booking stats
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
          s.id,
          s.session_name,
          s.time_slot,
          s.capacity,
          s.division_a_limit,
          s.division_b_limit,
          s.division_c_limit,
          COUNT(b.id) AS total_booked,
          (s.capacity - COUNT(b.id)) AS remaining_seats,
          SUM(CASE WHEN p.department = 'Division A' THEN 1 ELSE 0 END) AS division_a_count,
          SUM(CASE WHEN p.department = 'Division B' THEN 1 ELSE 0 END) AS division_b_count,
          SUM(CASE WHEN p.department = 'Division C' THEN 1 ELSE 0 END) AS division_c_count
      FROM sessions s
      LEFT JOIN bookings b ON s.id = b.session_id
      LEFT JOIN participants p ON b.participant_id = p.id
      GROUP BY
          s.id,
          s.session_name,
          s.time_slot,
          s.capacity,
          s.division_a_limit,
          s.division_b_limit,
          s.division_c_limit
      ORDER BY s.id
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ message: 'Failed to fetch sessions' });
  }
});

module.exports = router;