# LifeLink — Blood Bank Management Platform

A real-time MERN-stack platform for managing blood donations, donor eligibility, inventory tracking, and emergency blood requests.

## 🎯 Features

- **Donor Registration** — Register donors with health details
- **Eligibility Checking** — Automated screening (age, donation gap)
- **Donation Scheduling** — Book donation appointments
- **Real-Time Inventory** — Live blood unit tracking by blood group
- **Emergency Matching** — Instant blood allocation for hospital emergencies
- **Testing Status Tracking** — Monitor blood unit from collection to delivery
- **Responsive Dashboard** — Clean, dark-themed UI

## 🛠 Tech Stack

### Frontend
- React + Vite
- React Router (navigation)
- Axios (API calls)
- CSS3 (custom styling)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (authentication ready)
- CORS (cross-origin support)

### Database
- MongoDB (local or Atlas)

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB (running locally or Atlas connection)
- Git
- VS Code (or any code editor)

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone <repo-url>
cd lifelink
```

### 2. Install Dependencies
```bash
npm install
```

This installs dependencies for both `backend/` and `frontend/` (workspaces).

### 3. Environment Setup

Create `backend/.env`:


### 4. Start MongoDB

**On Windows:**
- MongoDB should be running as a service by default
- Or use MongoDB Compass

**On Mac:**
```bash
brew services start mongodb-community
```

### 5. Run the Project

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
Expected output: `Server running on port 5000`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
Expected output: `VITE v... ready in ... ms`

Open `http://localhost:5173` in your browser.
