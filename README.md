# 🏟️ Arena AI — Next-Gen Sports Turf Booking & Matchmaking Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-Render-22c55e?style=for-the-badge&logo=render&logoColor=white)](https://arena-ai-doru.onrender.com/)
[![React 19](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js 22](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express 5](https://img.shields.io/badge/Express-5.3-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![SQLite Native](https://img.shields.io/badge/SQLite-node:sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://nodejs.org/api/sqlite.html)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-3.8_Flash-8E75C2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)

> **🌐 Live Deployed Application**: [https://arena-ai-doru.onrender.com/](https://arena-ai-doru.onrender.com/)

**Arena AI** is a production-ready, full-stack sports tech application designed for the high-velocity Indian sports turf ecosystem (Football, Box Cricket, Badminton, Pickleball, and Tennis). It bridges turf facility owners with passionate players through instant slot reservations, zero-race-condition booking locks, community matchmaking squads, and Google Gemini AI sports intelligence.

---

## ⚡ Live URL & Quick Access

- **Production URL**: [https://arena-ai-doru.onrender.com/](https://arena-ai-doru.onrender.com/)
- **Health Check Endpoint**: [https://arena-ai-doru.onrender.com/api/health](https://arena-ai-doru.onrender.com/api/health)

### 🔑 Demo Accounts (Pre-Seeded)

The database includes ready-to-use persona accounts:

| Role | Name | Email | Password | Primary Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Player** | Rohan Deshmukh | `rohan.deshmukh@arenaai.in` | `password123` | Turf booking, join squads, community feed, wallet |
| **Player (Pro)** | Aditi Sharma | `aditi.sharma@arenaai.in` | `password123` | Badminton & pickleball squads, match host |
| **Turf Owner** | Vikramjit Singh | `vikram@greenfieldarenas.in` | `password123` | Slot management, maintenance block, revenue dashboard |
| **Super Admin** | Arena HQ Admin | `admin@arenaai.in` | `admin123` | Platform GMV, KYC turf approvals, security audit logs |

---

## 🌟 Key Features by Persona

### 🏃 1. Player Portal
- **City & Sport Discovery**: Browse verified arenas across top Indian hubs (**Nagpur, Mumbai, Bengaluru, Pune, Delhi NCR**) filtered by Football, Box Cricket, Badminton, Pickleball, and Tennis.
- **Interactive Pitch & Slot Booking**: Real-time calendar slot selector, morning/evening/peak pricing indicators, dynamic GST and convenience fee calculation.
- **Promo Codes & Wallet**: Instant discounts via coupons (`ARENA50`, `FIRSTMATCH`) and seed bonus cash wallet integration.
- **Simulated Razorpay Checkout**: Complete mock payment gateway flow with UPI, Debit Cards, Netbanking, instant HMAC SHA-256 digital booking passes, and verifiable QR codes.
- **Community Matchmaking ("Locker Room")**:
  - Discover open pickup games, host matches, set player limits, and accept/reject squad join requests.
  - Social sports feed to share post-match photos, hype reels, and discuss game tactics.
- **Instant Cancellation & Refund**: Self-serve booking cancellations with audit logging and simulated UPI refund processing.

### 🏢 2. Turf Owner Dashboard
- **Revenue & Booking Analytics**: Real-time gross merchandise value (GMV), net earnings after 8% platform fee, confirmed bookings count, and utilization rates.
- **Slot Maintenance Locker**: Instant toggle to block pitch slots for watering, rubber infill grooming, light maintenance, or private offline bookings.
- **Pitch Schedule Matrix**: Visual bird's-eye view of booked vs. available vs. maintenance slots.

### 🛡️ 3. Super Admin & Compliance Portal
- **Platform Health & Metrics**: Total registered players, active turf facilities, system uptime, and aggregate revenue.
- **Facility Verification**: KYC status auditing and badge management.
- **Security Audit Logs**: Track cryptographic webhook receipts (`payment.captured`), HMAC-SHA256 signature verifications, cancellation records, and IP tracking.

### 🧠 4. Google Gemini AI Sports Concierge
- **Match Strategy & Team Balancer**: Ask Gemini for tactical 5-a-side football formations or box cricket batting orders based on player skill levels.
- **Real-Time Search Grounding**: Optional search grounding for weather advisories, turf footwear guidelines, and tournament regulations.
- **Multi-Model Fallback Engine**: Resilient server-side proxy cascading across `gemini-flash-lite-latest`, `gemini-flash-latest`, and `gemini-3.8-flash`.

### 🏗️ 5. Production Architecture & Blueprints
- Live interactive blueprints inside the app displaying:
  - **PostgreSQL 16 GiST Exclusion Constraints**: Engine-level double-booking prevention (`no_overlapping_pitch_bookings`).
  - **FastAPI + Redis TTL Lock Engine**: Microsecond distributed locking for slot holding.
  - **Razorpay Idempotent Webhook Handler**: Secure cryptographic payment processing.
  - **React Native (Expo) Screen**: Mobile checkout flow integration.

---

## 📐 System Architecture

Arena AI is designed as a **unified single-container production architecture** for performance, rapid zero-downtime deployment, and cost efficiency.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT / BROWSER                                │
│          React 19 + TypeScript + Tailwind CSS v4 + Lucide Icons        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST / JSON
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    NODE.JS 22 UNIFIED BACKEND SERVER                   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                 Express 5 REST API Router                      │   │
│   │   • /api/auth/*         • /api/turfs        • /api/bookings    │   │
│   │   • /api/matches        • /api/posts        • /api/gemini      │   │
│   │   • /api/maintenance    • /api/audit-logs   • /api/health      │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
│                                   │                                    │
│   ┌───────────────────────────────▼────────────────────────────────┐   │
│   │            node:sqlite (DatabaseSync) Engine                   │   │
│   │       • WAL Mode & Synchronous Transactions                    │   │
│   │       • Atomic Concurrency Checking for Bookings               │   │
│   │       • Mountable Persistent Disk (/var/data/arena.sqlite)     │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                   │                                    │
│   ┌───────────────────────────────▼────────────────────────────────┐   │
│   │                   Google Gemini AI Proxy                       │   │
│   │       • Server-side API key isolation                          │   │
│   │       • Multi-tier fallback (Flash-Lite ➔ Flash ➔ 3.8)         │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite 6 | High-speed reactive UI with strict types |
| **Styling** | Tailwind CSS v4, Lucide React | Modern dark-mode sports glassmorphism |
| **Backend** | Node.js 22, Express 5 | High-throughput asynchronous REST server |
| **Database** | `node:sqlite` (DatabaseSync) | Native high-performance embedded SQLite database |
| **AI Integration** | Google Gemini API (REST) | Sports intelligence with search grounding |
| **Deployment** | Render, Docker, Fly.io, Railway | Production cloud hosting with persistent disks |

---

## 🔌 API Reference

### Health & Metrics
- `GET /api/health` — Real-time database metrics, total bookings, confirmed revenue, and system status.

### Authentication
- `POST /api/auth/register` — Create new Player, Owner, or Admin user with initial wallet cash.
- `POST /api/auth/login` — Authenticate user and receive profile data.
- `GET /api/auth/users` — List platform users (excluding password hashes).

### Turfs & Pitches
- `GET /api/turfs` — List all sports arenas with amenities, pricing, coordinates, and pitches.

### Bookings (Concurrency Safe)
- `GET /api/bookings` — Retrieve all user and arena bookings sorted by creation time.
- `POST /api/bookings` — Atomically book a slot. Validates against existing confirmed bookings and active maintenance blocks to guarantee **zero double-bookings**.
- `PATCH /api/bookings/:id/cancel` — Cancel reservation, trigger 100% simulated refund, and append to audit log.

### Community Matches & Squads
- `GET /api/matches` — List open games, participants, waitlists, and host details.
- `POST /api/matches` — Host a new match tied to a confirmed turf slot.
- `POST /api/matches/:id/join` — Join squad, queue in approval list, or join waitlist if full.
- `POST /api/matches/:id/approve` — Host approves pending squad request.

### Locker Room Feed
- `GET /api/posts` — Retrieve community feed posts and discussion threads.
- `POST /api/posts` — Share match updates, shoutouts, or game recaps.
- `POST /api/posts/:id/like` — Toggle like count.

### Operations & Security
- `GET /api/maintenance` — Map of currently blocked maintenance slots.
- `POST /api/maintenance/toggle` — Add or remove a maintenance hold on a slot.
- `GET /api/audit-logs` — Security and payment webhook logs with timestamps and IP records.
- `POST /api/gemini` — Proxy prompt queries to Google Gemini models with optional JSON schemas and search grounding.

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js**: `v22.0.0` or higher (required for native `node:sqlite`)
- **npm**: `v10.0.0` or higher

### 1. Clone Repository
```bash
git clone https://github.com/dev-lov-oper/Arena-AI.git
cd Arena-AI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:
```env
PORT=3001
DATA_DIR=.
DB_PATH=./arena.sqlite
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run in Development Mode
Run the Vite development client with Hot Module Replacement:
```bash
npm run dev
```

### 5. Run Full-Stack Production Server Locally
```bash
# Build the client bundle to /dist
npm run build

# Start the unified Node.js server
npm start
```
Navigate to `http://localhost:3001` in your browser.

---

## 🚀 Cloud Deployment Options

### Option 1: Render (Live Deployment Platform)
The repository includes an automated [render.yaml](render.yaml) blueprint:
1. Fork or push this repository to GitHub.
2. In the [Render Dashboard](https://dashboard.render.com), click **New +** ➔ **Blueprint**.
3. Connect your repository. Render automatically reads `render.yaml`:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
   - **Persistent Disk**: Mounted at `/var/data` to persist `arena.sqlite` permanently.
   - **Health Check**: `/api/health`

### Option 2: Docker & Docker Compose
A production multi-stage [Dockerfile](Dockerfile) and [docker-compose.yml](docker-compose.yml) are provided:

```bash
# Build and run with persistent volume
docker compose up -d --build

# Inspect real-time server logs
docker compose logs -f

# Shut down
docker compose down
```

### Option 3: Fly.io
Use the pre-configured [fly.toml](fly.toml):
```bash
# 1. Login to Fly.io
fly auth login

# 2. Create persistent 1GB volume for SQLite database
fly volumes create arena_data --region sin --size 1

# 3. Deploy
fly deploy
```

---

## 🗄️ Database & Concurrency Protection

Arena AI implements **multi-tier double-booking prevention**:

1. **SQLite Native Transaction Guard (`server.js`)**:
   During `POST /api/bookings`, the server queries all active confirmed bookings for the target pitch and date within an atomic statement. If any requested slot is already occupied or blocked by turf maintenance, the transaction is rejected with `HTTP 409 Conflict`.

2. **Enterprise PostgreSQL Schema (`01_schema_and_concurrency.sql`)**:
   For large-scale multi-region setups, the included blueprint demonstrates PostgreSQL GiST exclusion constraints:
   ```sql
   CONSTRAINT no_overlapping_pitch_bookings
   EXCLUDE USING gist (
       pitch_id WITH =,
       slot_time WITH &&
   ) WHERE (booking_status IN ('HOLD_PENDING', 'CONFIRMED'));
   ```

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute for personal and commercial applications.
