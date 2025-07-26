# 📝 Task & Habit Tracker

> ⚠️ This project was developed solely for the purpose of a technical assessment/exam.

A full-stack Task and Habit management application built with modern technologies like **Next.js**, **Node.js**, and **Jotai**. It supports user authentication, CRUD operations for tasks and habits, and a clean dashboard interface with a responsive layout.

---

## 🚀 Project Overview

This project is a productivity tool that allows users to:

- ✅ Create, update, complete, and delete tasks
- 🔁 Add recurring habits with daily, weekly, or monthly frequencies
- 👤 Authenticate via secure login with token handling
- 📊 View and manage their activities on a responsive dashboard
- ☁️ Store data in a backend database using RESTful APIs

It was built with clean architecture in mind, separating backend and frontend concerns, and making use of modular components and state management.

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 15**
- **React 19**
- **Tailwind CSS v4**
- **ShadCN UI**
- **Jotai** for state management
- **TypeScript** for type safety
- **Axios** for HTTP requests
- **Sonner** for toast notifications

### Backend

- **Node.js** with **Express.js**
- **Prisma** ORM
- **PostgreSQL**
- **JWT** for authentication
- **express-validator** for input validation

---

## 🧪 Security & Testing Approach

### 🔒 Security

- **JWT Authentication**: Tokens are issued upon login and validated for every request.
- **Jotai State Management**: Secure, in-memory token storage (no `localStorage`) to reduce XSS risk.
- **Route Protection**: Auto-redirect unauthenticated users away from `/dashboard`.
- **Input Validation**: `express-validator` used to validate task and habit fields (e.g., required `title`, valid `date` format).
- **Sanitization**: All inputs are stripped of unsafe values before processing.

### ✅ Testing (Manual)

- UI tested through form inputs, validation states, and toggle interactions
- All CRUD endpoints tested against valid and invalid data
- Token expiration and redirect logic verified by simulating login/logout flow

---

## 🧰 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-habit-tracker.git
cd task-habit-tracker
```

### 2. Setup the backend

```bash
cd server
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

Make sure to set your environment variables in a `.env` file:

# For local development, we're using SQLite

just simple use this Value on
DATABASE_URL="file:./dev.db"

```env
DATABASE_URL=your_postgres_url
JWT_SECRET=your_jwt_secret
```

### 3. Setup the frontend

```bash
cd client
npm install
npm run dev
```

Environment variables for the frontend go in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 📦 Features

- Responsive grid layout for Tasks & Habits
- Editable and toggleable tasks
- Habit frequency options (daily/weekly/monthly)
- Authentication-aware layout with sidebar and greeting
- Toast-based notifications

---

## 📌 Future Enhancements

- Schedule-based habit reminders
- Drag-and-drop task sorting
- Unit/integration testing via Playwright or Jest

---
