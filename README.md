# 📚 BookVault — Your Personal Digital Bookshelf

> A full-stack digital bookshelf web app where users can track their reading, write reviews, upvote books, and manage their personal library securely.

---

## 🌐 Live Website

🔗 [BookVault Live Demo](https://book-vault-abdullahalnoman003.netlify.app)

---

## 🎯 Purpose

BookVault is designed to help readers **organize**, **review**, and **share** their book collections. Built with **React**, **Node.js**, **MongoDB**, and **Firebase Authentication**, it provides a seamless user experience with secure features and an aesthetic UI.

---

## 🧩 Features

### 🔐 Authentication
- 🔑 Email/Password & Google login (Firebase Auth)
- 🔒 Protected Routes (JWT via Firebase Access Token)
- ✅ Validation with real-time feedback using SweetAlert2

### 📖 Bookshelf Management
- ➕ Add Book (Private)
- ✏️ Update Book (Owner Only)
- ❌ Delete Book (Owner Only)
- 📚 View All Books
- 🔍 Filter Using (Reading Status)

### 🧾 Book Details Page
- 🧠 Full details with upvote & reading status tracker
- 💬 Review system (one per user, editable & deletable)
- 📈 Dynamic reading status updates: `Want to Read` → `Reading` → `Read`

### 🏠 Home Page
- 🎞️ Carousel Slider with 3+ slides
- 🔥 Popular Books (top-upvoted)
- 🧠 Featured Categories
- 🧩 Extra Sections with Framer Motion animation

### 👤 Profile Page
- 📊 Pie Chart Summary by Category
- 📚 User’s Book Summary
- 🧑‍💼 Name, Email, and Photo

### 💬 Review System
- 📝 Add/Edit/Delete Reviews
- 👀 Show all reviews per book

---

## 🧪 Tech Stack & Libraries

### 🌍 Frontend
- ⚛️ React
- 💨 Tailwind CSS
- 🚀 Framer Motion
- 🔁 React Router
- 🔐 Firebase Authentication
- 📡 Axios

### 🛠️ Backend
- 🟢 Node.js
- ⚙️ Express.js
- 🍃 MongoDB (native driver)
- 🔐 Firebase Admin SDK (for Access Token verification)

---

## 🔐 Protected Routes

| Route              | Access Level     |
|-------------------|------------------|
| `/add-book`        | Authenticated    |
| `/my-books`        | Authenticated    |
| `/update-book/:id` | Owner only       |
| `/profile`         | Authenticated    |
| `/delete-book/:id` | Owner only       |
| `/add-review`      | Authenticated    |
| `/update-review`   | Review owner only|

All protected APIs use Firebase Access Token sent as a `Bearer` token in HTTP-only cookies.

---
## 🔑 Environment Variables

**Client .env**
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
...
```

**Server .env**
```env
PORT=3000
DB_USER=your_user
DB_PASSWORD=your_password

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_firebase_email
```

---

## ✅ Deployment

- 🌐 Frontend: [Netlify](https://book-vault-abdullahalnoman003.netlify.app/)
- 🖥 Backend: [Vercel](https://book-vault-server-six.vercel.app/)
- 🔐 Firebase: Authentication + Admin SDK
- ☁️ MongoDB Atlas


---

## 🧠 Learnings & Highlights

- 🔐 Implemented secure auth with Firebase Admin SDK + JWT
- 🔄 Protected private routes on both client & server
- 💬 Managed CRUD for user reviews with access control
- ✨ Applied animation & responsive design for better UX
- 📊 Visualized reading stats using charts

---

## ⚙️ NPM Packages Used

```bash
npm install tailwindcss react-router axios firebase framer-motion sweetalert2 lottie-react react-icons react-tooltip recharts swiper
```

---

## 📜 License

This project is licensed under the MIT License — feel free to fork, star ⭐, and contribute!

---

### 🚀 Ready to dive in?

> Star ⭐ this repo, clone it, and start building your bookshelf today!

## 🧑‍💻 Developer

**👨‍🎓 Abdullah Al Noman**  
🔗 [LinkedIn](https://www.linkedin.com/in/abdullahalnoman003) •  
🔗 [Github](https://github.com/abdullahalnoman003) •  


### Random Quote
> 💡 _“A reader lives a thousand lives before he dies. The man who never reads lives only one.”_ — George R.R. Martin