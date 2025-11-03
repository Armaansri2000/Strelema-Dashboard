## Overview

This project demonstrates:
Login with JWT authentication
Protected admin dashboard
API integration with pagination and search
Logout and session persistence
Responsive design using TailwindCSS


 ## Setup

Clone repo & install dependencies → npm install
Run locally → npm run dev
Visit → http://localhost:5173
Backend → https://strelema-task.onrender.com


## Auth Flow

Login via phone and password
Token stored in localStorage
/admin route protected by token
Logout clears session and redirects to login

## Routing
/login → Login page
/admin → Protected dashboard
* → Not found page
Routing handled via React Router with a ProtectedRoute wrapper.


## Dashboard Features

Employee list fetched from backend
Pagination (10 per page)
Search by name or department
Logout button
Clean and responsive UI


## Tech Stack

React, Vite, TailwindCSS, Axios, React Router, Context API


## Test Login

Phone:admin@example.com 
Password: admin123
