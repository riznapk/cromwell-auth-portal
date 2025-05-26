# Cromwell Auth Portal

A full-stack authentication portal built with React, Express.js, and PostgreSQL.

## Prerequisites

- Node.js (v18 or higher) [https://nodejs.org/en/download](https://nodejs.org/en/download)
- Docker and Docker Compose [https://www.docker.com/get-started/](https://www.docker.com/get-started/)
- npm or yarn package manager

## Project Structure

The project consists of two main parts:

- `frontend/`: React application built with Vite
- `backend/`: Express.js API with PostgreSQL database

## Getting Started

### 1. Environment Variables Setup

Before starting the backend services, create a `.env` file inside the backend directory by copying the example file:

```bash
cd backend/express-api
cp .env.example .env
```

### 2. Start the Backend Services

Navigate to the backend directory and start the Docker containers:

```bash
cd backend
docker compose up --build -d ⁠
```

This will start:

- PostgreSQL database on port 5432
- Express API server on port 3000
- Prisma Studio on port 5555 (for database management)
  ```bash
  docker exec -it express_api /bin/sh       # Log into the Express API container
  npx prisma studio                         # Start Prisma Studio (optional, for inspecting data)
  ```

### 3. Start the Frontend Development Server

Open a new terminal, navigate to the frontend directory, and run:

```bash
cd frontend
npm install    # Install dependencies
npm run dev    # Start development server
```

The frontend development server will start on port 5173.

### 4. Testing the Frontend Application

Open a new terminal, navigate to the frontend directory, and run:

```bash
cd frontend
npm run test       # Run unit test cases
npm run test:ui    # Run unit tests on vitest ui
```

The frontend development server will start on port 5173.

## Accessing the Application

- Frontend Application: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000](http://localhost:3000)
- Prisma Studio: [http://localhost:5555](http://localhost:5555)

## Database Configuration

The PostgreSQL database is configured with the following credentials:

- Database: authdatabase
- Username: authuser
- Password: authpassword
- Port: 5432

## Stopping the Application

To stop the backend services:

```bash
cd backend
docker-compose down
```

To stop the frontend development server, press `Ctrl+C` in the terminal where it's running.
