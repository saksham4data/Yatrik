# Yatrik (Grey_Bus) - Your Complete Bus Companion

Yatrik is a full-stack platform providing real-time bus tracking, route searching, and schedule management. It is built using a modern **Three-Tier Architecture** utilizing React, Node.js (Express), and Supabase (PostgreSQL).

## 🚀 Tech Stack

### Frontend
- **Framework:** React + Vite
- **Routing:** React Router v6
- **Styling:** Vanilla CSS (Dark Theme, Glassmorphism)
- **State & Auth:** React Context + Supabase Auth
- **Icons:** FontAwesome

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL)
- **Security:** Row Level Security (RLS) + JWT Auth

---

## 🛠️ Project Setup

### 1. Database Configuration (Supabase)
1. Create a new Supabase project.
2. In the Supabase SQL Editor, copy and run the contents of `backend/supabase_schema.sql` to generate the necessary tables, relationships, and RLS policies.
3. Obtain your `Project URL` and `anon public key` from the API Settings.

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
PORT=5000
```

Seed the database with initial CSV data (Buses, Stops, Locations):
```bash
node scripts/seed.js
```

Start the Express API server:
```bash
npm start
```
*(The server will run on `http://localhost:5000`)*

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory for authentication and Supabase integration:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Start the Vite development server:
```bash
npm run dev
```
*(The React app will be available at `http://localhost:5173`)*

---

## 🔑 Key Features
- **Dynamic Route Searching:** Search for available buses between any source and destination city.
- **Real-Time Data:** View exact geographical coordinates and latest updated timestamps for your favorite buses.
- **User Authentication:** Fully integrated signup/login system powered by Supabase Auth with simulated OTP capabilities.
- **Persistent History:** The app tracks your recent searches securely in your local browser session.
- **Account Management:** Log in to save tracking history and manage your personal demographic profile.

---

## 📄 License
This project is open-source and available under the MIT License.
