# Grey Bus Project

Grey Bus is a Django-based web application for managing and tracking bus routes, schedules, and locations. 

## Features
- Search for buses by source and destination stops.
- Track real-time bus locations.
- View bus schedules.
- Manage user profiles and trackings.

## Project Structure
- `core/`: The main Django project configuration.
- `buses/`: The Django app handling buses, schedules, routes, and passenger tracking logic.
- `templates/`: HTML templates for the website's front-end.
- `static/`: Static files (CSS, JavaScript, Images).
- `data/`: Additional data related to the project.

## Requirements
To run this project, you need Python installed on your system along with the following packages:
- Django
- djangorestframework

See `requirements.txt` for details.

## Setup Instructions

1. **Clone the repository (if applicable)**
   ```bash
   git clone <repository_url>
   cd Grey_Bus
   ```

2. **Create and activate a virtual environment (recommended)**
   On Windows:
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```
   On macOS/Linux:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply database migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser (optional, for accessing the admin panel)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server**
   ```bash
   python manage.py runserver
   ```

7. **Access the website**
   Open your browser and navigate to `http://127.0.0.1:8000/`. You can access the admin panel at `http://127.0.0.1:8000/admin/`.
