# 🍽️ FoodHub Backend API

This is the backend server for the FoodHub food delivery application. It handles authentication, user management, meals, orders, payments, and provider/admin functionalities.

---

## 🚀 Features

### 🔐 Authentication
- User registration and login
- Secure authentication using JWT
- Role-based access (User, Provider, Admin)

### 👤 User Features
- Browse meals
- Add meals to cart
- Place orders (Cash on Delivery / Online Payment)
- View order history

### 🧑‍🍳 Provider Features
- Manage kitchen profile
- Add, update, delete meals
- View and manage live orders
- Update order status (Placed → Preparing → Ready → Cancelled)

### 🛠️ Admin Features
- Manage users (ban/unban)
- Manage categories
- View all orders

### 💳 Payment Integration
- Stripe payment gateway integration
- Secure online payment processing

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- Stripe API

---

## 📁 Project Structure

```
src/
├── modules/
│ ├── auth/
│ ├── user/
│ ├── meal/
│ ├── order/
│ ├── provider/
│ └── admin/
├── middlewares/
├── utils/
├── config/
└── app.js
```

### 🔍 Modular Pattern

The project follows a **modular architecture**, where each feature (auth, meals, orders, etc.) is separated into its own module.

#### Benefits:
- Clean and scalable codebase
- Easy to maintain
- Easy to debug and extend
- Separation of concerns

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone <your-backend-repo-link>
cd backend
```

### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Setup environment variables

Create a .env file:

```bash
PORT=5000
DB_URI=your_mongodb_uri
JWT_SECRET=your_secret
STRIPE_SECRET=your_stripe_secret
```
### 4️⃣ Run the server
```bash
npm run dev
```
or

```bash
npm start
```
### 🌐 API Base URL
http://localhost:5000/api
### 📦 Key Functionalities
Auth APIs (login/register)
Meal APIs (CRUD)
Order APIs
Payment APIs
Admin control APIs
### ✅ Future Improvements
Real-time order tracking (WebSocket)
Notification system
Advanced analytics dashboard
### 👨‍💻 Author

Developed by Jawad Ibrahim Shopnil