# Job Application Tracker

A full-stack MERN web application that helps job seekers track their applications, with a real-time global chat room built in.

---

## Overview

Job Application Tracker is a MERN (MongoDB, Express, React, Node.js) web application designed to help users manage their job search in one place. Users register for a personal account, log in securely, and can add, view, update, and delete job applications. A live dashboard shows real-time stats about their job search progress. A global chat room ("Career Room") lets multiple logged-in users communicate in real time.

### How all requirements are met

| Requirement | Implementation |
|---|---|
| **Frontend – React** | Built with Vite + React 19; pages for Dashboard (Home), Apply, Tracker, Chat, Login, Register, Landing |
| **Backend – Node.js + Express** | Express 5 server in `/server`; modular route files under `/routes`; middleware under `/middleware` |
| **Database – MongoDB** | Mongoose ODM; three models: `User`, `Application`, `Message` |
| **REST API** | Full CRUD for applications (`/applications`); register/login endpoints (`/users`) with appropriate status codes and error handling |
| **Authentication** | JWT tokens issued on login/register; `bcryptjs` password hashing; `auth` middleware protects all application routes; each user only sees their own data |
| **Complete UI** | Responsive dashboard with live stats, color-coded status badges, active nav states, empty-state messaging, inline validation, error feedback, consistent design system via CSS variables, Nielsen usability principles applied throughout |
| **Real-time communication** | Socket.io on the same HTTP server; `send_message` / `receive_message` events; last 50 messages loaded from MongoDB on connect; messages persist across sessions; works across multiple users simultaneously |

---

## Documentation

### Prerequisites

- Node.js v18+
- MongoDB running locally on port `27017`
- npm

### Project Structure

```
job-tracker/
├── client/                  ← React frontend (Vite)
│   ├── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── User.jsx     ← Landing page (Login / Register)
│   │   │   ├── Home.jsx     ← Dashboard with live stats
│   │   │   ├── Apply.jsx    ← Add new application form
│   │   │   ├── Tracker.jsx  ← View / update / delete applications
│   │   │   ├── GlobalChat.jsx ← Real-time chat room
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── css/
│   │   │   ├── styles.css   ← Global design system
│   │   │   ├── home.css     ← Dashboard styles
│   │   │   ├── apply.css    ← Form styles
│   │   │   └── tracker.css  ← Table and badge styles
│   │   ├── App.jsx          ← Routes, nav, socket setup
│   │   └── main.jsx
│   └── package.json
└── server/                  ← Express backend
    ├── models/
    │   ├── User.js
    │   ├── Application.js
    │   └── Message.js
    ├── routes/
    │   ├── applications.js  ← CRUD routes
    │   └── login.js         ← Register / login routes
    ├── middleware/
    │   └── auth.js          ← JWT verification middleware
    ├── server.js
    └── package.json
```

### Setup & Running

**1. Unzip the project**

**2. Start MongoDB**
```bash
mongod
```

**3. Set up the server**
```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:
```
JWT_SECRET=your_secret_key_here
```

Start the server:
```bash
npm run dev     
# or
npm start       
```
Server runs on `http://localhost:8080`. You should see:
```
Server running on http://localhost:8080
MongoDB Connected
```

**4. Set up the client** (new terminal)
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173`

### Using the App

1. Open `http://localhost:5173` — you'll see the landing page with Login and Register options.
2. Click **Register**, enter a username and password — you are taken directly to your **Dashboard**.
3. The **Dashboard** shows:
   - A welcome banner with a motivational quote
   - A response rate ring (% of applications that led to interviews or offers)
   - Live stat cards: Total, Pending, Interviewing, Offer Received, Rejected
   - Quick action buttons to navigate the app
4. Click **Apply** in the nav to log a new job application (company, position, date, status, notes).
5. Click **Tracker** to see all your applications in a table:
   - Color-coded status badges (blue = Applied, purple = Interviewing, green = Offer, red = Rejected)
   - Click any badge to change the status inline
   - Delete applications with a confirmation prompt
6. Click **Chat** to open the Career Room — a real-time global chat. Open the app in a second browser tab, register a second user, and messages will appear live in both tabs. Chat history is saved.
7. Your username is displayed in the nav. Click **Logout** to sign out.

### API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/users/register` | No | Register a new user, returns JWT |
| POST | `/users/login` | No | Login, returns JWT |
| GET | `/applications` | Yes | Get all applications for the logged-in user |
| POST | `/applications` | Yes | Add a new application |
| GET | `/applications/:id` | Yes | Get a single application |
| PUT | `/applications/:id` | Yes | Update an application |
| DELETE | `/applications/:id` | Yes | Delete an application |

### Socket.io Events

| Event | Direction | Description |
|---|---|---|
| `message_history` | Server → Client | Sends last 50 persisted messages on connect |
| `send_message` | Client → Server | User sends a new chat message |
| `receive_message` | Server → All Clients | Broadcasts the new message to all connected users |

---

## Reflection

### Overview of Submitted Content

The submission is a fully functional MERN job application tracking platform. The frontend is a single-page React application using React Router for client-side navigation. The backend is a Node.js + Express REST API with three Mongoose models (`User`, `Application`, `Message`). Authentication is JWT-based with bcrypt password hashing and a reusable `auth` middleware that protects all application routes.

Beyond the core requirements, the app includes a live stats dashboard on the home page that fetches the user's applications and displays counts by status along with a response rate ring chart built in SVG. The Tracker uses color-coded status badges instead of plain dropdowns, making the status of each application immediately visible at a glance. The real-time chat persists messages to MongoDB so history is retained across sessions and page refreshes.

### Challenges

- **Integrating Socket.io alongside Express** required wrapping the Express app in a Node.js `http.createServer()` instance so both could share port 8080 without conflict.
- **Managing auth state on the frontend** without a state management library like Redux meant lifting `token` and `username` into `App.jsx` and passing them as props — this required careful planning of the component tree and prop flow.
- **Persisting chat history** was an extension beyond a basic Socket.io implementation. Saving messages to MongoDB with `{ timestamps: true }` and replaying the last 50 on connection required iteration to get the sort order and emission timing right.
- **Live dashboard stats** required fetching application data inside the Home component and computing counts client-side, then rendering an SVG donut chart for the response rate without any external charting library.

### Successes

- The authentication flow is clean end-to-end: passwords are hashed before saving, JWT tokens are verified on every protected request, and each user's applications are completely isolated from others'.
- The dashboard gives users an immediate, meaningful summary of their job search without any extra navigation — this directly addresses the Nielsen usability heuristic of keeping users informed about system status.
- The color-coded status badge system in the Tracker makes application statuses scannable at a glance, and the click-to-edit interaction keeps the UI uncluttered while still being fully functional.
- Real-time chat works across multiple users and browser sessions simultaneously, with history preserved between logins.