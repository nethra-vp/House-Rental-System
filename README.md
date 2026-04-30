# DriveFlow | Premium Vehicle Rental System

DriveFlow is a modern, full-stack vehicle rental platform designed for seamless car browsing, booking, and fleet management.

**Live Demo:** [https://vehicle-rental-system-drive-flow.vercel.app/](https://vehicle-rental-system-drive-flow.vercel.app/)

## 🚀 Features

### For Users
- **Modern Fleet Browser**: Explore premium vehicles with filters for location and price.
- **Seamless Booking**: Real-time availability checks and instant booking flow.
- **My Bookings**: Manage your active rentals and view your journey history.
- **Simulated Payments**: Integrated mock payment gateway for a complete experience.

### For Admins
- **Interactive Dashboard**: Track total revenue, fleet size, and active bookings at a glance.
- **Fleet Management**: Full CRUD operations to add, edit, or remove vehicles from the inventory.
- **Booking Records**: Monitor all customer reservations and update their status (Confirmed/Completed/Cancelled).
- **Revenue Tracking**: Automated financial reporting that updates in real-time.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Lucide Icons
- **Backend**: Next.js Server Actions & API Routes
- **Database**: MongoDB Atlas with Mongoose ODM
- **Deployment**: Vercel

## ⚙️ Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nethra-vp/Vehicle_Rental_System.git
   cd vehicle-rental-system
   ```

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