const request = require('supertest');
const express = require('express');
const participantRouter = require('../routes/participants');
const db = require('../db');

// Mock the DB module
jest.mock('../db');

const app = express();
app.use(express.json());
app.use('/participants', participantRouter);

describe('Participants API', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /participants', () => {
    test('SUCCESS: Should fetch all participants ordered by name', async () => {
      const mockData = [
        { id: 1, full_name: 'Alice', department: 'Division A', booking_status: 'Unassigned' },
        { id: 2, full_name: 'Bob', department: 'Division B', booking_status: 'Assigned' }
      ];

      // Simulate a successful DB query
      db.query.mockResolvedValueOnce([mockData]);

      const res = await request(app).get('/participants');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
      expect(res.body[0].full_name).toBe('Alice');
    });

    test('FAILURE: Should return 500 if database query fails', async () => {
      db.query.mockRejectedValueOnce(new Error('DB Connection Lost'));

      const res = await request(app).get('/participants');

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toBe('Failed to fetch participants');
    });
  });

  describe('GET /participants/unassigned', () => {
    test('SUCCESS: Should fetch only unassigned participants', async () => {
      const mockUnassignedData = [
        { id: 1, full_name: 'Alice', department: 'Division A' }
      ];

      db.query.mockResolvedValueOnce([mockUnassignedData]);

      const res = await request(app).get('/participants/unassigned');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(1);
      // Check that the query used the correct WHERE clause logic
      expect(db.query).toHaveBeenCalledWith(expect.stringContaining("WHERE booking_status = 'Unassigned'"));
    });

    test('SUCCESS: Should return an empty array if all participants are assigned', async () => {
      db.query.mockResolvedValueOnce([[]]); // Empty results

      const res = await request(app).get('/participants/unassigned');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });
  });
});