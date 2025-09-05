
# 🦇 Noctify – Hostel Management Platform

Noctify is a web-based hostel management platform built to streamline student living by integrating essential features like expense tracking, exam scheduling, and real-time chat — all in one place. Designed to enhance both organization and social interaction among hostel residents.

---

## ✨ Features

* 🧾 **Expense Tracker**: Log and manage daily hostel expenses with ease.
* 📅 **Exam Scheduler**: Stay on top of upcoming academic events and deadlines.
* 💬 **Group Chat & Announcements**: Communicate with fellow students via real-time messaging and group chats.
* 🏠 **Room & Group Management**: Easily manage and assign students to rooms or discussion groups.
* 🔐 **Authentication System**: Secure login and registration using Firebase Authentication.
* ☁️ **Cloud Sync**: All data is stored and synced using Firebase Firestore and Cloud Functions.

---

## 🚀 Tech Stack

* **Frontend**: React.js + Tailwind CSS
* **Backend**: Firebase (Auth, Firestore, Hosting, Cloud Functions)
* **Deployment**: Firebase Hosting

---

## 🧠 Why Noctify?

Managing life in a hostel can be chaotic — from tracking shared expenses to staying updated with important schedules. Noctify solves these issues by bringing together functionality that students actually need, with a simple and modern interface.

---

## 📸 Screenshots

> *(Include some screenshots or a demo GIF here if available)*

---

## 🛠️ Setup & Installation

### Prerequisites:

* Node.js & npm
* Firebase CLI

### Installation:

```bash
# Clone the repo
git clone https://github.com/Varsha620/Noctify.git
cd Noctify

# Install dependencies
npm install

# Start the development server
npm run dev
```

> Make sure to set up your own Firebase project and configure `firebaseConfig.js` accordingly.

---

## 🔐 Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable:

   * Authentication (Email/Password)
   * Firestore Database
   * Hosting
3. Replace placeholder Firebase config in the project.

---

## 📁 Folder Structure

```
noctify/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── firebaseConfig.js
├── functions/  ← Firebase Cloud Functions
├── .firebaserc
├── firebase.json
└── README.md
```

---

## 📌 Future Enhancements

* Payment gateway integration
* Attendance & leave tracker
* Dark Mode 🌙

---

**Madew with ❤️ by VarshaSabu**

> *Looking to contribute? Feel free to fork and PR!*

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).

