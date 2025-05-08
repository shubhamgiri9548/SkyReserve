# ✈️ Airplane Booking System - Backend

A full-featured backend for a flight booking system built with **Node.js**, **Express**, **MongoDB**, and **Razorpay**. Includes payment processing, invoice generation, OTP-based 2FA, and admin analytics.

---

## 🔧 Tech Stack

- **Backend Framework**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + OTP-based 2FA (via Nodemailer)
- **Payments**: Razorpay Integration
- **PDF Generation**: PDFKit
- **Environment Variables**: dotenv
- **Email Service**: Nodemailer

---

## 📁 Folder Structure


---

## ⚙️ Features

### ✅ User
- Signup / Login
- OTP-based 2FA login via email

### ✈️ Flights
- Create & manage flights (Admin)
- View all flights
- Real-time seat availability

### 🧾 Booking
- Book flights
- View user-specific bookings

### 💳 Payments
- Razorpay payment integration
- Payment verification
- Automatic invoice generation (PDF)

### 📈 Admin Dashboard
- Total bookings, users, revenue
- Occupancy analytics

---

## 🔐 Environment Variables (.env)

 📬 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | /api/v1/auth/register | Register user |
| `POST` | /api/v1/auth/login | Login user |
| `POST` | /api/v1/auth/send-otp | Send OTP |
| `POST` | /api/v1/auth/login-otp | Login with OTP |
| `GET`  | /api/v1/flights | Get all flights |
| `POST` | /api/v1/flights | Create flight (Admin) |
| `POST` | /api/v1/bookings | Book a flight |
| `POST` | /api/v1/payment/capture | Create Razorpay order |
| `POST` | /api/v1/payment/verify | Verify payment |
| `GET`  | /api/v1/invoice/:bookingId | Generate PDF invoice |
| `GET`  | /api/v1/admin/stats | Admin dashboard stats |

✍️ Author
Shubham Giri

