# Yatrik - Live Bus Tracking Platform

Yatrik (formerly Grey Bus) is India's most advanced and reliable live bus tracking platform. Born out of the frustration of waiting at bus stops with no information, Yatrik brings transparency, safety, and predictability to millions of daily commuters.

## Features

- **Live Bus Tracking:** Connects directly to hardware GPS modules for flawless, continuous real-time tracking (10-20m accuracy, 10s updates).
- **Search by Route or Vehicle:** Easily look up your bus by Source/Destination or directly by Vehicle Number.
- **Smart Alerts & Safety:** Get notified instantly if your bus is delayed, taking a detour, or approaching your boarding point. Share live tracking links with family.
- **Government Official Partner:** Officially integrated with major State Road Transport Corporations (UPSRTC, RSRTC, KSRTC, HRTC, MSRTC, etc.).
- **User Dashboard:** Seamlessly track active trips, review past journey history, and bookmark your favorite daily routes or buses.
- **Modern UI / Dark Mode:** A premium, ad-free UI designed for modern devices, featuring native dark mode support to save battery during night travels.

## Tech Stack

- **Frontend:** React (Vite), React Router, Context API, Vanilla CSS.
- **Backend:** Django, Django REST Framework (DRF).

## Project Structure

- `frontend/`: The React-based SPA (Single Page Application) frontend.
- `core/`: The main Django project configuration.
- `buses/`: The Django app handling buses, schedules, routes, and passenger tracking logic.
- `data/`: Mock data or fixtures.

---

## Setup Instructions

### 1. Backend (Django)

1. **Create and activate a virtual environment:**
   On Windows:
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```
   On macOS/Linux:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Apply database migrations:**
   ```bash
   python manage.py migrate
   ```

4. **Run the development server:**
   ```bash
   python manage.py runserver
   ```
   *The Django backend will be available at `http://127.0.0.1:8000/`.*

### 2. Frontend (React + Vite)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Run the Vite development server:**
   ```bash
   npm run dev
   ```
   *The React frontend will be available at `http://localhost:5173/`.*

## Authentication Flow

Currently, the frontend uses a highly modular `AuthModalContext` to handle global authentication overlays (Sign Up, Log In, and Sidebar), seamlessly blocking protected actions (like searching for a bus without an account) and guiding the user through a customized 3-step registration wizard. Backend integration with DRF for JWT/Session auth is pending.
