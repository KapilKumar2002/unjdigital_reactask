# React + TypeScript User Management App

A complete **React + TypeScript** CRUD application for managing users. This app mimics a Flutter counterpart and includes local caching using `localStorage`, paginated user listing with infinite scroll, and form-based user creation and editing.

---

## 🔧 Tech Stack

- **React** with **TypeScript**
- **Redux Toolkit** for state management
- **Redux Thunk** for async API calls
- **React Router DOM** for navigation
- **localStorage** for caching all user data
- **Custom CSS** for styling components

---

## ✨ Features

- 📜 **Paginated User List**: Infinite scroll using `IntersectionObserver`
- ➕ **Add New User**: Via FAB (Floating Action Button) to open a form
- 📝 **Edit User**: Pre-filled form with localStorage update
- 🔍 **Search Users**: Filter by name or email
- 👁️ **User Details View**
- 💾 **Caching with localStorage**: Data persists across reloads
- All **CRUD operations** are performed on **locally cached data**

---

## 🗂 Folder Structure

```bash
src/
├── app/                  # Redux store and slices
├── assets/               # Static assets (icons, images)
├── components/           # Shared/reusable UI components
│   ├── header/           # App header
│   ├── loader/           # Custom loading components
│   ├── UserCard.tsx      # Card layout for user preview
├── constants/            # Static constants
├── hooks/                # Custom hooks (like redux hooks)
├── pages/                # Route-based pages
│   ├── createUser/       # Add new user form
│   ├── editUser/         # Edit user form
│   ├── error/            # Error screen
│   ├── homepage/         # Home with user list and search
│   └── userDetails/      # Detailed user view
├── routes/               # App routing logic
│   ├── appRouter.tsx     # Main router
│   └── routePaths.ts     # All route paths
├── types/                # TypeScript types and interfaces
├── utils/                # Reusable utility functions
├── App.tsx               # App layout
├── index.css             # Global styles
└── main.tsx              # Entry point
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
https://github.com/KapilKumar2002/unjdigital_reactask
cd project
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Start the development server

```bash
yarn dev
# or
npm run dev
```

App will run at: `http://localhost:5173`

---

## 📌 Notes

- This project is read-only from backend (mock API)
- All mutations (Add/Edit) are done on `localStorage`
- On refresh, app loads from cache
- Uses `IntersectionObserver` for infinite scroll
- Bonus: Includes **search** functionality to filter users by name/email

---

## ✅ Summary

This project is a full-fledged **User Management App** built using React + TypeScript. It supports infinite scrolling, offline cache (localStorage), and client-side CRUD operations using Redux Toolkit and Thunks. Features like search, form validation, and dynamic routing make it a strong candidate for production-level web apps or frontend interview showcases.

---
