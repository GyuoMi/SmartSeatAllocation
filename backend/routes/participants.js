const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all participants
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, employee_number, full_name, email, department, booking_status
      FROM participants
      ORDER BY full_name
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).json({ message: 'Failed to fetch participants' });
  }
});

// GET only unassigned participants for dropdown
router.get('/unassigned', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, employee_number, full_name, department
      FROM participants
      WHERE booking_status = 'Unassigned'
      ORDER BY full_name
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching unassigned participants:', error);
    res.status(500).json({ message: 'Failed to fetch unassigned participants' });
  }
});

module.exports = router;