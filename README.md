Smart Seat Allocation Platform
 Overview

The Smart Seat Allocation Platform is a web-based application designed to automate the allocation of participants to training sessions. It replaces manual processes such as spreadsheets with a rule-driven system that ensures fair, accurate, and efficient seat distribution.

The platform prevents common issues like overbooking, duplicate allocations, and exceeding departmental limits, while providing real-time visibility into session capacity.

🚀 Features
✅ Allocate participants to training sessions
❌ Prevent overbooking (max 20 per session)
❌ Prevent duplicate assignments (one session per participant)
❌ Enforce division limits per session
📊 Real-time session capacity tracking
📋 Dropdown-based participant selection from database
🔄 Live updates after booking or deletion
🧩 Clean and structured UI for easy use
🏗️ System Architecture

The application follows a full-stack architecture:

Frontend: React (UI & user interaction)
Backend: Node.js + Express (API & business logic)
Database: MySQL (data storage)
React (Frontend)
        ↓
Node.js / Express API
        ↓
MySQL Database
🗄️ Database Design

The system uses the following core tables:

participants → stores employee details
sessions → stores session information and limits
bookings → tracks allocations

Key constraints enforced:

Max 20 participants per session
One booking per participant
Division limits per session (A:8, B:8, C:6)
⚙️ Technologies Used
Frontend
React
CSS (custom styling)
Backend
Node.js
Express.js
Database
MySQL
mysql2 package
Other Tools
dotenv (environment variables)
CORS
🧠 Business Rules Implemented

The system enforces the following rules:

Session Capacity Limit
Each session can hold a maximum of 20 participants
Single Assignment Rule
A participant can only be assigned to one session
Division Limits
Division A: max 8 per session
Division B: max 8 per session
Division C: max 6 per session
Real-time Feedback
Displays remaining seats per session
Prevents invalid bookings with clear messages
▶️ How to Run the Project

1. Setup Database

Run the SQL script:

CREATE DATABASE smart_seat_allocation;
USE smart_seat_allocation;

Then run the provided database.sql file.

2. Start Backend
cd backend
npm install
node server.js

You should see:

Server running on port 5000
✅ Connected to MySQL database
3. Start Frontend
cd frontend
npm install
npm run dev
4. Open in Browser
http://localhost:5173
🖥️ How It Works
User selects a participant from the dropdown
User selects a training session
System validates:
if participant is already assigned
if session is full
if division limit is reached
If valid → booking is created
UI updates automatically
🎯 Project Goal

The goal of this project is to demonstrate how a simple rule-based system can:

Reduce human error
Improve fairness across divisions
Provide real-time visibility
Scale better than manual processes
