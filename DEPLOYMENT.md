# Arena AI — Deployment Guide

Arena AI is configured as a **single unified full-stack Node.js application** (Vite React frontend + Express backend with persistent SQLite). Both the frontend and API routes are served from a single container or server process.

---

## Architecture Overview

- **Frontend**: React 19 + TypeScript + Tailwind CSS (bundled to `/dist` via `npm run build`).
- **Backend**: Express 5 on Node.js 22 with native `node:sqlite` (DatabaseSync).
- **Database**: Persistent SQLite file (`arena.sqlite`), configurable via `DATA_DIR` or `DB_PATH`.
- **Port**: Configurable via `PORT` environment variable (defaults to `3001`).

---

## 1. Deploy with Docker & Docker Compose (Any VPS / Local)

### Using Docker Compose:
```bash
# Build and launch in background
docker compose up -d --build

# View real-time logs
docker compose logs -f

# Stop container
docker compose down
```

The database is automatically persisted in the `arena_ai_sqlite_data` Docker volume.

### Using Plain Docker:
```bash
# 1. Build image
docker build -t arena-ai .

# 2. Run with volume mount for SQLite
docker run -d \
  -p 3001:3001 \
  -v arena_data:/data \
  --name arena_ai \
  --restart unless-stopped \
  arena-ai
```

---

## 2. Deploy to Render (Recommended Free/Low-Cost Cloud)

A complete [render.yaml](file:///c:/Users/hp/.gemini/antigravity-ide/scratch/arena-ai/render.yaml) blueprint is included:

1. Push this repository to **GitHub** or **GitLab**.
2. Go to [Render Dashboard](https://dashboard.render.com).
3. Click **New +** -> **Blueprint**.
4. Select your repository. Render will automatically detect `render.yaml` and configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
   - **Persistent Disk**: `/var/data` (mounts `arena.sqlite` permanently so data is never lost across deploys).
   - **Health Check**: `/api/health`

---

## 3. Deploy to Railway

1. Push repository to GitHub.
2. Go to [Railway.app](https://railway.app).
3. Click **New Project** -> **Deploy from GitHub repo**.
4. Add a **Persistent Volume** mounted at `/data`.
5. Set Environment Variables:
   - `DATA_DIR`: `/data`
   - `DB_PATH`: `/data/arena.sqlite`
6. Railway automatically runs `npm install && npm run build` and `npm start`.

---

## 4. Deploy to Fly.io

A configured [fly.toml](file:///c:/Users/hp/.gemini/antigravity-ide/scratch/arena-ai/fly.toml) is included:

```bash
# 1. Install flyctl & authenticate
fly auth login

# 2. Create persistent volume for SQLite (1 GB)
fly volumes create arena_data --region sin --size 1

# 3. Deploy the application
fly deploy
```

---

## 5. Local Production Testing

To test the unified production bundle locally:

```bash
# 1. Build production client
npm run build

# 2. Start unified server
npm start
```
Open **http://localhost:3001** to access both the React frontend and live SQLite REST API.
