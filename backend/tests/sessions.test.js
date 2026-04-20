const request = require('supertest');
const express = require('express');
const sessionRouter = require('../routes/sessions');
const db = require('../db');

// Mock the DB module
jest.mock('../db');

const app = express();
app.use(express.json());
app.use('/sessions', sessionRouter);

describe('Sessions API', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /sessions', () => {
    test('SUCCESS: Should calculate session stats and department counts correctly', async () => {
      // Mocked row from your complex SQL query
      const mockSessionStats = [
        {
          id: 1,
          session_name: 'Morning',
          time_slot: '09:00 - 10:30',
          capacity: 20,
          division_a_limit: 8,
          division_b_limit: 8,
          division_c_limit: 6,
          total_booked: 10,
          remaining_seats: 10,
          division_a_count: 4,
          division_b_count: 4,
          division_c_count: 2
        }
      ];

      db.query.mockResolvedValueOnce([mockSessionStats]);

      const res = await request(app).get('/sessions');

      expect(res.statusCode).toBe(200);
      expect(res.body[0].session_name).toBe('Morning');
      // Verify calculations exist in the response
      expect(res.body[0].remaining_seats).toBe(10);
      expect(res.body[0].division_a_count).toBe(4);
    });

    test('SUCCESS: Should return empty data structure for sessions with zero bookings', async () => {
      const emptySession = [
        {
          id: 2,
          session_name: 'Midday',
          total_booked: 0,
          remaining_seats: 20,
          division_a_count: 0,
          division_b_count: 0,
          division_c_count: 0
        }
      ];

      db.query.mockResolvedValueOnce([emptySession]);

      const res = await request(app).get('/sessions');

      expect(res.statusCode).toBe(200);
      expect(res.body[0].total_booked).toBe(0);
    });

    test('FAILURE: Should return 500 on database error', async () => {
      db.query.mockRejectedValueOnce(new Error('Connection timeout'));

      const res = await request(app).get('/sessions');

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toBe('Failed to fetch sessions');
    });
  });
});