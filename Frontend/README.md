# Frontend – SocialNest

This folder contains the frontend of the SocialNest application, built using React JS and Vite.

It provides the user interface for authentication, viewing posts, interacting with the feed, managing profiles, and creating new posts.

---

## 🚀 Features

- User Login & Registration UI
- JWT Authentication handling (via backend)
- View posts from multiple users (Feed)
- Like & Dislike posts
- User Profile page (bio, profile photo, posts)
- Create new posts
- Multi-account support (switch accounts)

---

## 🛠 Tech Stack

- React JS
- Vite
- Axios
- HTML, CSS

---

## 📂 Folder Structure
src/
├── components/ → Reusable UI components
├── pages/ → Main pages (Login, Feed, Profile)
├── services/ → API calls (Axios)
├── App.jsx → Main app component
├── main.jsx → Entry point

## ⚙️ Setup
cd frontend
npm install
npm run dev


---

## 🔗 API Communication

- Uses Axios to call Django REST APIs
- Sends JWT tokens in requests
- Handles authentication and protected routes

---

## 🚧 Improvements

- UI enhancements
- Add comments feature
- Improve responsiveness