const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all bookings
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        b.id,
        b.booking_date,
        p.id AS participant_id,
        p.full_name,
        p.employee_number,
        p.department,
        s.id AS session_id,
        s.session_name,
        s.time_slot
      FROM bookings b
      JOIN participants p ON b.participant_id = p.id
      JOIN sessions s ON b.session_id = s.id
      ORDER BY b.booking_date DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// POST create booking
router.post('/', async (req, res) => {
  const { participantId, sessionId } = req.body;

  if (!participantId || !sessionId) {
    return res.status(400).json({
      message: 'participantId and sessionId are required'
    });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Get participant
    const [participantRows] = await connection.query(
      `SELECT id, full_name, department, booking_status
       FROM participants
       WHERE id = ?`,
      [participantId]
    );

    if (participantRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Participant not found' });
    }

    const participant = participantRows[0];

    // 2. Prevent duplicate assignment
    if (participant.booking_status === 'Assigned') {
      await connection.rollback();
      return res.status(400).json({
        message: 'Invalid booking: participant is already assigned to a session'
      });
    }

    // 3. Get session
    const [sessionRows] = await connection.query(
      `SELECT
          id,
          session_name,
          capacity,
          division_a_limit,
          division_b_limit,
          division_c_limit
       FROM sessions
       WHERE id = ?`,
      [sessionId]
    );

    if (sessionRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Session not found' });
    }

    const session = sessionRows[0];

    // 4. Check session capacity
    const [capacityRows] = await connection.query(
      `SELECT COUNT(*) AS booked_count
       FROM bookings
       WHERE session_id = ?`,
      [sessionId]
    );

    const bookedCount = capacityRows[0].booked_count;

    if (bookedCount >= session.capacity) {
      await connection.rollback();
      return res.status(400).json({
        message: 'Invalid booking: session is already full'
      });
    }

    // 5. Check department count in this session
    const [deptRows] = await connection.query(
      `SELECT COUNT(*) AS dept_count
       FROM bookings b
       JOIN participants p ON b.participant_id = p.id
       WHERE b.session_id = ?
       AND p.department = ?`,
      [sessionId, participant.department]
    );

    const currentDeptCount = deptRows[0].dept_count;

    let deptLimit = 0;
    if (participant.department === 'Division A') {
      deptLimit = session.division_a_limit;
    } else if (participant.department === 'Division B') {
      deptLimit = session.division_b_limit;
    } else if (participant.department === 'Division C') {
      deptLimit = session.division_c_limit;
    }

    if (currentDeptCount >= deptLimit) {
      await connection.rollback();
      return res.status(400).json({
        message: `Invalid booking: ${participant.department} has reached its limit for ${session.session_name}`
      });
    }

    // 6. Insert booking
    await connection.query(
      `INSERT INTO bookings (participant_id, session_id)
       VALUES (?, ?)`,
      [participantId, sessionId]
    );

    // 7. Update participant status
    await connection.query(
      `UPDATE participants
       SET booking_status = 'Assigned'
       WHERE id = ?`,
      [participantId]
    );

    await connection.commit();

    res.status(201).json({
      message: 'Booking successful',
      participant: participant.full_name,
      department: participant.department,
      session: session.session_name
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error creating booking:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        message: 'Invalid booking: participant is already assigned'
      });
    }

    res.status(500).json({ message: 'Failed to create booking' });
  } finally {
    connection.release();
  }
});

// DELETE booking and make participant unassigned again
router.delete('/:id', async (req, res) => {
  const bookingId = req.params.id;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // find booking
    const [bookingRows] = await connection.query(
      `SELECT participant_id
       FROM bookings
       WHERE id = ?`,
      [bookingId]
    );

    if (bookingRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Booking not found' });
    }

    const participantId = bookingRows[0].participant_id;

    // delete booking
    await connection.query(
      `DELETE FROM bookings
       WHERE id = ?`,
      [bookingId]
    );

    // update participant status
    await connection.query(
      `UPDATE participants
       SET booking_status = 'Unassigned'
       WHERE id = ?`,
      [participantId]
    );

    await connection.commit();

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Failed to delete booking' });
  } finally {
    connection.release();
  }
});

module.exports = router;