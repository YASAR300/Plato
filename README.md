# Dish Management Dashboard

A modern, full-stack Dish Management Dashboard application designed for real-time dish status updates, inventory management, and kitchen coordination.

## 🚀 Tech Stack

### Backend
- **Node.js & Express**: Fast, unopinionated, minimalist web framework.
- **Prisma ORM**: Next-generation Node.js and TypeScript ORM to interact with PostgreSQL.
- **PostgreSQL**: Robust, enterprise-grade relational database.
- **Socket.io**: Real-time bidirectional event-based communication.
- **Bcryptjs & JWT**: Secure password hashing and token-based authentication.

### Frontend
- **React (Vite)**: High-performance frontend library scaffolded with Vite.
- **Tailwind CSS v3**: Utility-first CSS framework for custom responsive styling.
- **Lucide React**: Premium icon library.
- **Socket.io-client**: Real-time integration with backend socket server.
- **Supabase Client & SSR**: Authentication and integration with Supabase features.

---

## 📂 Project Structure

```text
dish-dashboard/
├── backend/                  # Node.js + Express backend service
│   ├── prisma/               # Prisma schema & migrations
│   ├── routes/               # API endpoints routes
│   ├── controllers/          # Request handler functions
│   ├── middleware/           # Auth and validation middleware
│   ├── .env                  # Backend local environment config
│   ├── server.js             # Express server entry point
│   └── package.json          # Backend dependencies and scripts
│
└── frontend/                 # React frontend application
    ├── public/               # Static assets
    ├── src/
    │   ├── api/              # Axios API instances and requests
    │   ├── components/       # Reusable UI components
    │   ├── context/          # React Context providers (Auth, Socket)
    │   ├── pages/            # Application page components
    │   ├── App.jsx           # Main App component
    │   ├── index.css         # Tailwind directives & global styles
    │   └── main.jsx          # React DOM render entry point
    ├── .env                  # Frontend environment config
    ├── tailwind.config.js    # Tailwind v3 configurations
    └── package.json          # Frontend dependencies and scripts
```

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL instance running locally or hosted

### 1. Backend Setup
1. Open the `/backend` folder.
2. Ensure you have configured the `.env` file:
   ```env
   DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<db_name>?schema=public"
   JWT_SECRET="your_jwt_secret_key"
   CLIENT_URL="http://localhost:5173"
   PORT=5000
   ```
3. Run migrations and generate Prisma client:
   ```bash
   npx prisma db push
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open the `/frontend` folder.
2. Ensure you have configured the `.env` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://lmmsnnewjflobidzcmnr.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_VULK2KIPyO4yYi_DA2xf0Q_DFMLb17W
   VITE_SUPABASE_URL=https://lmmsnnewjflobidzcmnr.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_VULK2KIPyO4yYi_DA2xf0Q_DFMLb17W
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## 🔌 Socket Events

The application uses WebSockets (Socket.io) to publish real-time events. Typical events:
- `dish:status-update` - Fired when a dish is prepared, served, or runs out of stock.
- `dish:new-order` - Fired when a new dish order is placed.
