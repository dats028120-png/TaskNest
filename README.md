# TaskNest

> A full-stack task management web application built with React, Node.js, Express, and MongoDB Atlas.

![TaskNest](https://img.shields.io/badge/TaskNest-v1.0.0-6C63FF?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)

## Features

- **JWT Authentication** — Secure register & login with token-based sessions
- **Full CRUD Task Management** — Create, view, update, and delete tasks
- **Task Priority Levels** — Low / Medium / High with color-coded visual indicators
- **Task Status Tracking** — Pending / Completed with status badges
- **Due Dates** — Set deadlines with overdue highlighting in red
- **Dashboard Statistics** — Overview of total, pending, completed, and high-priority counts
- **Search & Filter** — Filter by status, priority, sort, and full-text search
- **Responsive Dark UI** — Dark luxury design with glowing task cards
- **JWT 401 Handling** — Automatic redirect to login on session expiry

## Tech Stack

| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend    | React 18, Vite, Tailwind CSS v3, React Router v6, Axios |
| Backend     | Node.js, Express.js, express-async-handler       |
| Database    | MongoDB Atlas, Mongoose                          |
| Auth        | JWT (jsonwebtoken), bcryptjs                     |
| UI          | lucide-react icons, react-hot-toast, date-fns    |

## Project Structure

```
TaskNest/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── api/taskApi.js     # Axios instance + all API calls
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # AuthContext (JWT state)
│   │   ├── hooks/             # useAuth, useTasks
│   │   ├── pages/             # LoginPage, RegisterPage, DashboardPage, TasksPage
│   │   └── utils/             # dateUtils (date-fns)
│   └── tailwind.config.js
│
├── server/                    # Node/Express backend
│   ├── config/db.js           # MongoDB Atlas connection
│   ├── controllers/           # authController, taskController
│   ├── middleware/            # authMiddleware (JWT), errorMiddleware
│   ├── models/                # User.js, Task.js (Mongoose schemas)
│   ├── routes/                # authRoutes, taskRoutes
│   ├── utils/generateToken.js # JWT signing utility
│   └── server.js              # Express app entry point
│
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (free tier works)
- npm or yarn

### Backend Setup

```bash
cd server
npm install
cp .env.example .env   # Fill in your values (see below)
npm run dev            # Starts nodemon on port 5000
```

### Frontend Setup

```bash
cd client
npm install
npm run dev            # Starts Vite on port 3000
```

### Environment Variables (`server/.env`)

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

> ⚠️ Never commit your `.env` file to version control.

## API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint              | Description                          | Auth     |
|--------|-----------------------|--------------------------------------|----------|
| POST   | `/api/auth/register`  | Register new user, returns JWT       | Public   |
| POST   | `/api/auth/login`     | Login, returns JWT                   | Public   |
| GET    | `/api/auth/me`        | Get current user profile             | Protected |

### Task Routes (`/api/tasks`) — All Protected

| Method | Endpoint             | Description                                              |
|--------|----------------------|----------------------------------------------------------|
| GET    | `/api/tasks`         | Get all user tasks (filter: status, priority, search, sort) |
| POST   | `/api/tasks`         | Create a new task                                        |
| GET    | `/api/tasks/stats`   | Dashboard stats (total, pending, completed, by priority) |
| GET    | `/api/tasks/:id`     | Get single task (ownership check)                        |
| PUT    | `/api/tasks/:id`     | Update task (ownership check)                            |
| DELETE | `/api/tasks/:id`     | Delete task (ownership check)                            |

### Query Parameters for `GET /api/tasks`

| Param    | Type   | Values                              |
|----------|--------|-------------------------------------|
| status   | string | `Pending` \| `Completed`           |
| priority | string | `Low` \| `Medium` \| `High`        |
| search   | string | Regex search on task title          |
| sort     | string | `oldest` \| `dueDate` \| `priority` \| `title` |

## Design System

| Token         | Value     | Usage                          |
|---------------|-----------|--------------------------------|
| `--color-bg`  | `#0A0A0F` | Page background                |
| `--color-surface` | `#111118` | Cards / panels             |
| `--color-accent` | `#6C63FF` | Primary CTA / indigo       |
| `--color-success` | `#22D3A5` | Completed / Low priority  |
| `--color-warning` | `#F5A623` | Medium priority / Pending |
| `--color-danger` | `#FF4D6D` | High priority / Delete    |

## License

MIT © 2026 TaskNest
