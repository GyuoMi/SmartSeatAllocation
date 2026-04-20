# Smart Seat Allocation Platform

## Overview
The Smart Seat Allocation Platform is a web-based application designed to automate the allocation of participants to training sessions. It replaces manual processes such as spreadsheets with a rule-driven system that ensures fair, accurate, and efficient seat distribution.

The platform prevents common issues like overbooking, duplicate allocations, and exceeding departmental limits, while providing real-time visibility into session capacity.

---

## Features
- Allocate participants to training sessions
- Prevent overbooking (maximum 20 per session)
- Prevent duplicate assignments (one session per participant)
- Enforce division limits per session
- Real-time session capacity tracking
- Dropdown-based participant selection from the database
- Live updates after booking or deletion
- Clean and simple user interface

---

## System Architecture
Frontend: React  
Backend: Node.js with Express  
Database: MySQL  

Flow:
React → Express API → MySQL Database

---

## Database Design
The system uses the following tables:

- participants → stores employee details  
- sessions → stores session information and limits  
- bookings → stores participant allocations  

### Constraints enforced:
- Maximum 20 participants per session  
- A participant can only be assigned once  
- Division limits per session:
  - Division A: 8
  - Division B: 8
  - Division C: 6  

---

## Technologies Used

### Frontend
- React
- CSS

### Backend
- Node.js
- Express.js

### Database
- MySQL
- mysql2

### Other
- dotenv
- cors

---

## Business Rules Implemented

1. Session Capacity Limit  
   Each session can hold a maximum of 20 participants  

2. Single Assignment Rule  
   A participant can only be assigned to one session  

3. Division Limits  
   - Division A: max 8 per session  
   - Division B: max 8 per session  
   - Division C: max 6 per session  

4. Real-time Feedback  
   The system shows available seats and prevents invalid bookings  

---

## How to Run the Project

### 1. Setup Database
```sql
CREATE DATABASE smart_seat_allocation;
USE smart_seat_allocation;
