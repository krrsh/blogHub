## Blog Hub, a Blog App

A full-stack web application built using the **MERN** stack (MongoDB, Express, React, Node.js), featuring secure **JWT-based authentication**, user-specific blog management, and responsive design.

## Features

-  User Registration & Login using JWT
-  Protected Routes (Frontend & Backend)
-  Create, Read, Update, Delete (CRUD) for blogs
-  User-specific blogs (Profile page)
-  Authors can only update their blogs
-  Responsive UI
-  Backend deployed on Render
-  Frontend deployed on Netlify

##  Tech Stack

**Frontend:**
- React
- React Router
- Axios

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Dotenv
- bcryptjs

---

## Authentication Flow

- After registration/login, a JWT token is returned.
- The frontend stores the token in  localStorage.
- Protected routes verify this token via `Authorization: Bearer <token>` header.
- Token is decoded on the backend using `jsonwebtoken` to authorize the request.

---

## Installation

### 1. Clone the Repo

---bash
git clone https://github.com/krrsh/blogHub.git
cd your-repo

## Backend setup

cd Server
npm install

###  Create a .env file in the Server directory and give values for

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

----

###  Start backend:

npm run dev (or) npm start

----

###  Setup frontend

cd ..
cd Client
npm install
npm run dev

