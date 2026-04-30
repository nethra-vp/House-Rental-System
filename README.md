# StayEase | Modern House Rental System

StayEase is a modern, full-stack house rental platform designed for seamless property browsing, booking, and rental management.

**Live Demo:** [https://house-rental-system-seven.vercel.app/](house-rental-system-seven.vercel.app)

---

## 🚀 Features

### For Users
- **Property Explorer**: Browse houses with filters for location, price, and availability.
- **Easy Booking**: Select date ranges and book properties with real-time availability checks.
- **My Bookings**: View, manage, and cancel your reservations.
- **Flexible Stay Options**: Choose properties based on rooms and accommodation capacity.
- **Simulated Payments**: Dummy payment system with multiple options (UPI/Card/Cash).

### For Admins
- **Admin Dashboard**: Monitor total revenue, available properties, and bookings.
- **Property Management**: Add, update, and delete house listings (villa, flat, duplex, penthouse, etc.).
- **Booking Management**: Track all bookings and update status (Confirmed/Completed/Cancelled).
- **Revenue Tracking**: View payment records and overall earnings.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Lucide Icons  
- **Backend**: Next.js Server Actions & API Routes  
- **Database**: MongoDB Atlas with Mongoose ODM  
- **Deployment**: Vercel  

---

## ⚙️ Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nethra-vp/House_Rental_System.git
   cd house-rental-system
   

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file and add your MongoDB connection string:
   ```env
   MONGODB_URI=your_mongodb_atlas_uri
   ```

4. **Seed the Database**:
   ```bash
   node seed.js
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```
