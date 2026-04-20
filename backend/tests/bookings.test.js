const request = require('supertest');
const express = require('express');
const bookingRouter = require('../routes/bookings'); // Adjust path as needed
const db = require('../db');

jest.mock('../db');

const app = express();
app.use(express.json());
app.use('/bookings', bookingRouter);

describe('Smart Seat Allocation API', () => {
  let mockConnection;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup a mock connection object for transactions
    mockConnection = {
      beginTransaction: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      release: jest.fn(),
      query: jest.fn(),
    };
    db.getConnection.mockResolvedValue(mockConnection);
  });

  describe('POST /bookings', () => {
    
    test('SUCCESS: Should create a booking when all constraints are met', async () => {
      mockConnection.query.mockResolvedValueOnce([[{ id: 1, full_name: 'Lemo', department: 'Division A', booking_status: 'Unassigned' }]]);
      mockConnection.query.mockResolvedValueOnce([[{ id: 10, session_name: 'Morning', capacity: 20, division_a_limit: 8 }]]);
      mockConnection.query.mockResolvedValueOnce([[{ booked_count: 15 }]]);
      mockConnection.query.mockResolvedValueOnce([[{ dept_count: 5 }]]);

      const res = await request(app)
        .post('/bookings')
        .send({ participantId: 1, sessionId: 10 });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Booking successful');
      expect(mockConnection.commit).toHaveBeenCalled();
    });

    test('CONSTRAINT: Should prevent duplicate assignment', async () => {
      // Participant is already 'Assigned'
      mockConnection.query.mockResolvedValueOnce([[{ id: 1, booking_status: 'Assigned' }]]);

      const res = await request(app)
        .post('/bookings')
        .send({ participantId: 1, sessionId: 10 });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('already assigned');
      expect(mockConnection.rollback).toHaveBeenCalled();
    });

    test('CONSTRAINT: Should prevent booking if session is full', async () => {
      mockConnection.query.mockResolvedValueOnce([[{ id: 1, department: 'Division B', booking_status: 'Unassigned' }]]);
      mockConnection.query.mockResolvedValueOnce([[{ id: 10, capacity: 20 }]]);
      // Current count is 20 (Full)
      mockConnection.query.mockResolvedValueOnce([[{ booked_count: 20 }]]);

      const res = await request(app)
        .post('/bookings')
        .send({ participantId: 1, sessionId: 10 });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('session is already full');
    });

    test('CONSTRAINT: Should respect department limits', async () => {
      mockConnection.query.mockResolvedValueOnce([[{ id: 1, department: 'Division C', booking_status: 'Unassigned' }]]);
      mockConnection.query.mockResolvedValueOnce([[{ id: 10, division_c_limit: 6 }]]);
      mockConnection.query.mockResolvedValueOnce([[{ booked_count: 10 }]]); // Session has space...
      mockConnection.query.mockResolvedValueOnce([[{ dept_count: 6 }]]); // ...but Division C is full

      const res = await request(app)
        .post('/bookings')
        .send({ participantId: 1, sessionId: 10 });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('Division C has reached its limit');
    });
  });

  describe('DELETE /bookings/:id', () => {
    test('SUCCESS: Should delete booking and reset participant status', async () => {
      mockConnection.query.mockResolvedValueOnce([[{ participant_id: 5 }]]); // Found booking
      
      const res = await request(app).delete('/bookings/100');

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Booking deleted successfully');
      // Verify the status update was called
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE participants SET booking_status = \'Unassigned\''),
        [5]
      );
    });
  });
});