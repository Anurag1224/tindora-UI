# Tindora UI

Live Demo: [Live](http://56.228.35.105/login)

A React + Vite powered frontend for **Tindora** — a real‑time social / connection / chat platform.

---

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
- [Scripts](#scripts)  
- [State & Data Flow](#state--data-flow)  
- [Socket / Real‑Time Integration](#socket--real-time-integration) 
- [Contributing](#Contributing) 
- [License](#license)  

---
## 📌 About

This UI is the **frontend client** for the **Tindora App**, designed to provide users with a seamless social and communication experience. It enables users to:

- Connect with other users  
- Send and accept friend requests  
- Chat in real time via WebSocket (Socket.io)  
- Share updates through a personal feed  
- View and edit their profile information  

The application works in conjunction with a backend service (REST API + WebSocket) to deliver a dynamic, real-time social platform.


---

## Features

- User authentication: login & signup  
- Edit profile  
- Browse connection requests, accept/decline  
- View and manage connections  
- Real‑time chat between connected users  
- Feed / timeline of posts or updates  
- Responsive UI (mobile & desktop)  
- Dynamic UI updates based on socket events  

---

## Tech Stack

- **Framework / Build**: React + Vite  
- **Styling**: Tailwind CSS + DaisyUI  
- **State Management**: Redux Toolkit  
- **Routing**: React Router DOM  
- **HTTP Client**: Axios  
- **Real‑Time**: Socket.IO client  
- **Icons**: React Icons  
- **Linting / Code Quality**: ESLint  

---

## Project Structure
   ```
   ├── public
   │   └── heart.png
   ├── src
   │   ├── components
   │   │   ├── Body.jsx
   │   │   ├── Chat.jsx
   │   │   ├── Connections.jsx
   │   │   ├── EditProfile.jsx
   │   │   ├── Feed.jsx
   │   │   ├── Footer.jsx
   │   │   ├── Login.jsx
   │   │   ├── NavBar.jsx
   │   │   ├── Profile.jsx
   │   │   ├── Requests.jsx
   │   │   └── SignUp.jsx
   │   ├── utils
   │   │   ├── appStore.js
   │   │   ├── connectionSlice.js
   │   │   ├── constants.js
   │   │   ├── feedSlice.js
   │   │   ├── requesrSlice.js
   │   │   ├── socket.js
   │   │   └── userSlice.js
   │   ├── App.jsx
   │   ├── index.css
   │   └── main.jsx
   ├── index.html
   ├── vite.config.js
   ├── eslint.config.js
   ├── package.json
   └── .gitignore
```
Here are some key parts:

### 📁 Directory & File Structure

#### `src/components/` — Main UI Components

- **Login / SignUp** – Handles authentication and user session setup  
- **NavBar** – Navigation header linking to all major routes  
- **Feed** – Displays posts or activity from connections  
- **Connections** – List of users connected with the current user  
- **Requests** – Interface to accept or send friend requests  
- **Chat** – Real-time chat UI powered by Socket.io  
- **EditProfile** – Editable user info and profile settings  
- **UserCard** – Reusable card UI for showing user information  

#### `src/utils/` — Utility Logic & Redux State

- `appStore.js` — Configures Redux store and middleware  
- `socket.js` — Initializes a shared Socket.IO client instance  
- `constants.js` — Contains shared constants (API base URLs, event names)  
- `userSlice.js` — Redux slice for user state  
- `feedSlice.js` — Redux slice for feed/posts  
- `connectionSlice.js` — Redux slice for managing connections  
- `requestSlice.js` — Redux slice for handling requests  

#### Root Files

- `main.jsx` — Entry point; wraps `<App />` with Redux `Provider` and React Router  
- `App.jsx` — Top-level component that defines routes and layout  

---

## Getting Started

### Prerequisites

- Node.js (recommended v16+ or latest LTS)  
- npm (or yarn)  

### Installation Steps

1. Clone the repository  
   ```bash
   git clone https://github.com/Anurag1224/tindora-UI.git
   cd tindora-UI

2. Install dependencies
    ```bash
    npm install 

3. Configure environment / constants
    - In src/utils/constants.js, update the API base URL and socket URL to point to your backend / live server.
    - Optionally manage environment variables (e.g. via .env file) if you want staging / production separation.

4. Run the app in development mode
    npm run dev

5. Open your browser to http://localhost:3000

---

## Script

| Script            | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start development server (via Vite) |
| `npm run build`   | Build production version            |
| `npm run preview` | Preview built production build      |
| `npm run lint`    | Run linting checks (ESLint)         |

---

## State & Data Flow

    - Redux Toolkit slices (userSlice, feedSlice, connectionSlice, requestSlice) manage domain-specific state.

    - In appStore.js, these are combined into the global store with middleware.

    - Components use useSelector to access state and useDispatch to issue actions.

    - Axios is used inside slices or thunks to make HTTP calls to backend APIs.

    - State updates (e.g. new requests, accepted connections) propagate to UI.

---

## Socket / Real‑Time Integration
   
    - The socket.js file creates and exports a single Socket.IO client instance.

    - Components import this socket and register event listeners (for e.g. new messages, request updates)

    - UI reacts instantly to socket events (incoming chat, connection request, etc.)

    - Components can also emit socket events (e.g. sending a message)

    - This architecture allows real-time updates without needing to constantly poll the server.

## Contributing

    - Want to contribute? You're welcome! Here’s how:
    - Report bugs
    - Suggest features
    - Submit pull requests
    - Improve UI components
    - Add documentation

## License

This project is licensed under the MIT License. See the LICENSE
 file for more details.

