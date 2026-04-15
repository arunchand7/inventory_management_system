# 🔐 Secure Inventory Management System (MERN Stack)

## 📌 Overview

It is a secure Inventory Management System and is developed with the MERN stack (MongoDB, Express, React, Node.js). This was initially a simple CRUD application that has been refined and augmented with several security measures to guard against typical web threats.

The project shows how security can be incorporated into a web application based on industry best practices.

---

## 🚀 Features

### 🔑 Core Features

* User Registration & Login
* Product Management (CRUD)
Role-Based Access Control (Admin/User)

---

### 🔐 Security Features

* JWT-based Authentication
* Role-Based Authorization (RBAC)
* Input Validation & Sanitization
* NoSQL Injection Prevention
The application will be equipped with Cross-site Scripting (XSS) Protection.
The CSRF protection (through CORS and token authentication) is also mitigated.
* Directory Traversal Protection
* Rate Limiting (Brute-force protection)
* Secure HTTP Headers (Helmet)
secret Environment Variables: These are the environment variables used by secrets.

---

## 🧱 Tech Stack

**Frontend**

* React.js

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB

**Security**

* Javascript Object Notation (JSON) Web Tokens (JWT)
* Helmet
* Express Validator
* Express Rate Limit

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone [your-repo-link]
cd [repo-folder]
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

|human|>## 🔐 Security Enhancements (Pre vs Post)

| Vulnerability       | Before            | After              |
| ------------------- | ----------------- | ------------------ |
|human|>|human|>|human|>|Not implemented | ✅ JWT-based auth.uth   |
| Authorization| ❌ No restrictions | ✅ RBAC implemented |nted |
|human|>|human|>|NoSQL Injection| ❌ Vulnerable ✅ Validated inputs|human|>|human|>|human|>|human|>||human|>||human|>||human|>||human|>||| inputs |
| XSS                 | ❌ Vulnerable      | ✅ Sanitized inputs |
| CSRF                | ⚠️ Possible       | ✅ Mitigated        |
|human|>|human|>|human|>|human|>|prevented|nted        |
| Rate Limiting | ❌ Not present | ✅ Implemented |lemented      |

---

## 🧪 Testing

The following were used to test the application:

* Postman (API testing)
* Browser DevTools
* Manual security testing

### ✔️ Security Tests Performed

* NoSQL Injection attacks
* XSS payload testing
* Unauthorized access attempts
* Role-based access testing
* Rate limiting validation
* directory traversal testing and CSRF.

---

## 📸 Screenshots

* Login Page
  <img width="1460" height="714" alt="image" src="https://github.com/user-attachments/assets/98fb4d23-e017-4e61-ac44-800d169ef746" />
* Admin Dashboard
  <img width="1470" height="716" alt="image" src="https://github.com/user-attachments/assets/d2aecd01-b037-4ecf-aaed-55420f9f9ae9" />
* Denies user role access.<|human|>* Access Denied (User Role)
  <img width="1469" height="642" alt="image" src="https://github.com/user-attachments/assets/86071d38-6e2e-4680-95f4-e2a664b7a9d2" />
* Injection Attack Blocked
  <img width="1465" height="792" alt="image" src="https://github.com/user-attachments/assets/09ca5608-7476-4d7c-823c-bf733bf54aff" />
* Rate Limiting Response
  <img width="1121" height="812" alt="image" src="https://github.com/user-attachments/assets/24298672-20ce-4bdd-b2de-21e3fd16db64" />


---

## 📊 Project Structure

```bash
root/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── app.js
│
├── frontend/
│   ├── src/
│   └── components/
│
└── README.md
```

---

## 🔮 Future Improvements

* HTTPS deployment
* Refresh token implementation
* Advanced logging & monitoring
* Docker deployment

---

## 👨‍💻 Author

**ARUN CHAND**
Student ID: 25126105

---

## 📄 License

This project is for academic purposes.
