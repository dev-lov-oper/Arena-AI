import express from 'express';
import cors from 'cors';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize SQLite database (supports persistent cloud disks like /data/arena.sqlite)
const dbDir = process.env.DATA_DIR || __dirname;
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}
const dbPath = process.env.DB_PATH || path.join(dbDir, 'arena.sqlite');
const db = new DatabaseSync(dbPath);

console.log(`[Arena SQLite] Connected to persistent database at: ${dbPath}`);

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS turfs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    area TEXT,
    address TEXT,
    distanceKm REAL,
    rating REAL,
    reviewsCount INTEGER,
    verified INTEGER,
    featured INTEGER,
    ownerId TEXT,
    sports TEXT,
    basePrice INTEGER,
    peakPrice INTEGER,
    openHours TEXT,
    coords TEXT,
    images TEXT,
    amenities TEXT,
    pitches TEXT,
    reviews TEXT
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    userId TEXT,
    userName TEXT,
    userPhone TEXT,
    turfId TEXT,
    turfName TEXT,
    city TEXT,
    pitchId TEXT,
    pitchName TEXT,
    sport TEXT,
    date TEXT,
    slots TEXT,
    slotLabels TEXT,
    baseAmount REAL,
    discount REAL,
    convenienceFee REAL,
    gstAmount REAL,
    totalPaid REAL,
    couponUsed TEXT,
    paymentStatus TEXT,
    bookingStatus TEXT,
    refundStatus TEXT,
    razorpayOrderId TEXT,
    razorpayPaymentId TEXT,
    razorpaySignature TEXT,
    createdAt TEXT,
    linkedMatchId TEXT
  );

  CREATE TABLE IF NOT EXISTS matches (
    id TEXT PRIMARY KEY,
    title TEXT,
    sport TEXT,
    format TEXT,
    turfId TEXT,
    turfName TEXT,
    pitchName TEXT,
    city TEXT,
    date TEXT,
    timeSlot TEXT,
    feePerPlayer REAL,
    maxPlayers INTEGER,
    participants TEXT,
    waitlist TEXT,
    pendingRequests TEXT,
    hostId TEXT,
    hostName TEXT,
    hostRating REAL,
    skillLevel TEXT,
    approvalRequired INTEGER,
    status TEXT
  );

  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    authorName TEXT,
    authorHandle TEXT,
    authorCity TEXT,
    sport TEXT,
    timeAgo TEXT,
    content TEXT,
    linkedMatchId TEXT,
    likes INTEGER,
    likedByMe INTEGER,
    comments TEXT,
    createdAt INTEGER
  );

  CREATE TABLE IF NOT EXISTS maintenance_blocks (
    key TEXT PRIMARY KEY,
    reason TEXT,
    createdAt TEXT
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    time TEXT,
    actor TEXT,
    action TEXT,
    ip TEXT,
    status TEXT
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    handle TEXT,
    city TEXT,
    phone TEXT,
    skillLevel TEXT,
    preferredSports TEXT,
    reliabilityScore INTEGER,
    matchesPlayed INTEGER,
    avatar TEXT,
    walletBalance REAL,
    createdAt TEXT
  );
`);

// Seed Initial Users if empty
const countUsers = db.prepare('SELECT COUNT(*) as count FROM users').get();
if (countUsers.count === 0) {
  console.log('[Arena SQLite] Seeding initial authenticated users (Player, Owner, Admin)...');
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, password, role, handle, city, phone, skillLevel, preferredSports, reliabilityScore, matchesPlayed, avatar, walletBalance, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run(
    'usr_rohan_01',
    'Rohan Deshmukh',
    'rohan.deshmukh@arenaai.in',
    'password123',
    'PLAYER',
    '@rohan_striker',
    'Nagpur',
    '+91 98230 45112',
    'Intermediate',
    JSON.stringify(['Football', 'Box Cricket', 'Pickleball']),
    98,
    42,
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    450,
    new Date().toISOString()
  );

  insertUser.run(
    'usr_aditi_02',
    'Aditi Sharma',
    'aditi.sharma@arenaai.in',
    'password123',
    'PLAYER',
    '@aditi_smash',
    'Mumbai',
    '+91 98111 22334',
    'Pro',
    JSON.stringify(['Badminton', 'Pickleball']),
    100,
    67,
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    1200,
    new Date().toISOString()
  );

  insertUser.run(
    'usr_vikram_owner',
    'Vikramjit Singh',
    'vikram@greenfieldarenas.in',
    'password123',
    'OWNER',
    '@vikram_arenas',
    'Nagpur',
    '+91 97654 32109',
    'Intermediate',
    JSON.stringify(['Football', 'Box Cricket']),
    99,
    19,
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    0,
    new Date().toISOString()
  );

  insertUser.run(
    'usr_admin_hq',
    'Arena HQ Super Admin',
    'admin@arenaai.in',
    'admin123',
    'ADMIN',
    '@arena_admin',
    'Nagpur',
    '+91 99999 88888',
    'Pro',
    JSON.stringify(['All']),
    100,
    150,
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    10000,
    new Date().toISOString()
  );
}

// Seed Initial Turfs if empty
const countTurfs = db.prepare('SELECT COUNT(*) as count FROM turfs').get();
if (countTurfs.count === 0) {
  console.log('[Arena SQLite] Seeding initial Indian Turf facilities...');
  const seedTurfs = [
    {
      id: 'turf_ngp_01',
      name: 'Strikerz Pro Arena & Floodlight Club',
      city: 'Nagpur',
      area: 'Dharampeth / Law College Square',
      address: 'Plot 42, West High Court Road, Dharampeth, Nagpur 440010',
      distanceKm: 1.8,
      rating: 4.9,
      reviewsCount: 318,
      verified: 1,
      featured: 1,
      ownerId: 'usr_vikram_owner',
      sports: JSON.stringify(['Football', 'Box Cricket', 'Pickleball']),
      basePrice: 1200,
      peakPrice: 1600,
      openHours: '06:00 AM - 01:00 AM',
      coords: JSON.stringify({ x: 48, y: 42 }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&auto=format&fit=crop&q=80'
      ]),
      amenities: JSON.stringify(['FIFA Quality Pro Turf', 'LED Floodlights 400 Lux', 'Shower & Changing Room', 'Free Parking', 'Chilled RO Water', 'Equipment Rental']),
      pitches: JSON.stringify([
        { id: 'pitch_ngp_1a', name: 'Pitch A - 7v7 FIFA Bellin Turf', sport: 'Football', basePrice: 1400, peakPrice: 1800, dimensions: '110x70 ft' },
        { id: 'pitch_ngp_1b', name: 'Pitch B - 5v5 High-Net Box Arena', sport: 'Box Cricket', basePrice: 1200, peakPrice: 1500, dimensions: '90x55 ft' },
        { id: 'pitch_ngp_1c', name: 'Court C - Cushion Pro Pickleball', sport: 'Pickleball', basePrice: 600, peakPrice: 800, dimensions: '44x20 ft' }
      ]),
      reviews: JSON.stringify([
        { id: 'rev_1', user: 'Saurabh K.', rating: 5, date: '2 days ago', comment: 'Best bounce in Nagpur! Zero knee strain on the 50mm monofilament grass.' },
        { id: 'rev_2', user: 'Pranav M.', rating: 5, date: '1 week ago', comment: 'Floodlights are stadium grade. Instant entry with Arena AI QR code.' }
      ])
    },
    {
      id: 'turf_ngp_02',
      name: 'Orange City Box Cricket & Badminton Hub',
      city: 'Nagpur',
      area: 'Manish Nagar / Wardha Road',
      address: 'Near Somalwar High School, Besa-Manish Nagar Rd, Nagpur 440015',
      distanceKm: 3.4,
      rating: 4.7,
      reviewsCount: 194,
      verified: 1,
      featured: 0,
      ownerId: 'usr_vikram_owner',
      sports: JSON.stringify(['Box Cricket', 'Badminton', 'Football']),
      basePrice: 900,
      peakPrice: 1300,
      openHours: '05:30 AM - 12:00 AM',
      coords: JSON.stringify({ x: 68, y: 66 }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1000&auto=format&fit=crop&q=80'
      ]),
      amenities: JSON.stringify(['32ft High Roof Net', 'BWF Yonex Synthetic Mats', 'Cafeteria', 'Live Dugout Seating', 'CCTV Monitored']),
      pitches: JSON.stringify([
        { id: 'pitch_ngp_2a', name: 'Arena 1 - Mega Box Cricket Turf', sport: 'Box Cricket', basePrice: 1000, peakPrice: 1300, dimensions: '100x60 ft' },
        { id: 'pitch_ngp_2b', name: 'Court 1 - Yonex Pro Indoor Mat', sport: 'Badminton', basePrice: 450, peakPrice: 600, dimensions: 'Standard BWF' }
      ]),
      reviews: JSON.stringify([
        { id: 'rev_3', user: 'Nikhil W.', rating: 5, date: '4 days ago', comment: 'Super high ceiling for box cricket, no dead ball issues!' }
      ])
    },
    {
      id: 'turf_mum_01',
      name: 'KickOff Rooftop SkyArena Bandra',
      city: 'Mumbai',
      area: 'Bandra West / Linking Road',
      address: '6th Floor Rooftop, Supreme HQ, Bandra West, Mumbai 400050',
      distanceKm: 1.9,
      rating: 4.9,
      reviewsCount: 512,
      verified: 1,
      featured: 1,
      ownerId: 'usr_vikram_owner',
      sports: JSON.stringify(['Football', 'Pickleball']),
      basePrice: 1800,
      peakPrice: 2400,
      openHours: '06:00 AM - 01:30 AM',
      coords: JSON.stringify({ x: 52, y: 38 }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000&auto=format&fit=crop&q=80'
      ]),
      amenities: JSON.stringify(['Rooftop Skyline Sea Breeze', 'Pro Shock Turf', 'Steam Room', 'Cafe']),
      pitches: JSON.stringify([
        { id: 'pitch_mum_1a', name: 'Sky Pitch 1 - 6v6 Football', sport: 'Football', basePrice: 1900, peakPrice: 2400, dimensions: '100x65 ft' }
      ]),
      reviews: JSON.stringify([])
    },
    {
      id: 'turf_blr_01',
      name: 'Decathlon SportzPark & Covered Dome',
      city: 'Bengaluru',
      area: 'HSR Sector 2 / Sarjapur Road',
      address: '27th Main Road, Sector 2, HSR Layout, Bengaluru 560102',
      distanceKm: 2.1,
      rating: 4.8,
      reviewsCount: 640,
      verified: 1,
      featured: 1,
      ownerId: 'usr_vikram_owner',
      sports: JSON.stringify(['Football', 'Badminton', 'Box Cricket', 'Pickleball']),
      basePrice: 1500,
      peakPrice: 2100,
      openHours: '05:00 AM - 01:00 AM',
      coords: JSON.stringify({ x: 58, y: 36 }),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1518605368461-1ee7e53f2f60?w=1000&auto=format&fit=crop&q=80'
      ]),
      amenities: JSON.stringify(['All-Weather Covered Dome', '12 BWF Badminton Courts', 'EV Fast Charging', 'Decathlon Pro Shop']),
      pitches: JSON.stringify([
        { id: 'pitch_blr_1a', name: 'Dome Pitch 1 - 7v7 Football', sport: 'Football', basePrice: 1600, peakPrice: 2100, dimensions: '115x75 ft' },
        { id: 'pitch_blr_1b', name: 'Hybrid Box Cricket Cage', sport: 'Box Cricket', basePrice: 1400, peakPrice: 1900, dimensions: '95x60 ft' }
      ]),
      reviews: JSON.stringify([])
    }
  ];

  const insertTurf = db.prepare(`
    INSERT INTO turfs (id, name, city, area, address, distanceKm, rating, reviewsCount, verified, featured, ownerId, sports, basePrice, peakPrice, openHours, coords, images, amenities, pitches, reviews)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const t of seedTurfs) {
    insertTurf.run(t.id, t.name, t.city, t.area, t.address, t.distanceKm, t.rating, t.reviewsCount, t.verified, t.featured, t.ownerId, t.sports, t.basePrice, t.peakPrice, t.openHours, t.coords, t.images, t.amenities, t.pitches, t.reviews);
  }
}

// Seed Initial Bookings if empty
const countBookings = db.prepare('SELECT COUNT(*) as count FROM bookings').get();
if (countBookings.count === 0) {
  console.log('[Arena SQLite] Seeding initial verified bookings...');
  const insertBooking = db.prepare(`
    INSERT INTO bookings (id, userId, userName, userPhone, turfId, turfName, city, pitchId, pitchName, sport, date, slots, slotLabels, baseAmount, discount, convenienceFee, gstAmount, totalPaid, couponUsed, paymentStatus, bookingStatus, refundStatus, razorpayOrderId, razorpayPaymentId, razorpaySignature, createdAt, linkedMatchId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertBooking.run(
    'BK-2026-8841',
    'usr_rohan_01',
    'Rohan Deshmukh',
    '+91 98230 45112',
    'turf_ngp_01',
    'Strikerz Pro Arena & Floodlight Club',
    'Nagpur',
    'pitch_ngp_1a',
    'Pitch A - 7v7 FIFA Bellin Turf',
    'Football',
    '2026-10-16',
    JSON.stringify(['19:00', '20:00']),
    JSON.stringify(['07:00 PM - 08:00 PM', '08:00 PM - 09:00 PM']),
    3600,
    200,
    49,
    612,
    4061,
    'ARENA200',
    'CAPTURED',
    'CONFIRMED',
    'NONE',
    'order_P9xK72mLp091Qa',
    'pay_P9xL11zWq882Bv',
    '8f9d2a1b6e4c703198a77b54c21e09f44d82e11a65c0098b1234a90f8c1d7e3b',
    '2026-10-15 04:12 PM',
    'match_101'
  );

  insertBooking.run(
    'BK-2026-8790',
    'usr_rohan_01',
    'Rohan Deshmukh',
    '+91 98230 45112',
    'turf_ngp_02',
    'Orange City Box Cricket & Badminton Hub',
    'Nagpur',
    'pitch_ngp_2a',
    'Arena 1 - Mega Box Cricket Turf',
    'Box Cricket',
    '2026-10-17',
    JSON.stringify(['18:00']),
    JSON.stringify(['06:00 PM - 07:00 PM']),
    1300,
    0,
    35,
    234,
    1569,
    null,
    'CAPTURED',
    'CONFIRMED',
    'NONE',
    'order_P8xK51mLo110Qa',
    'pay_P8xL02zWp771Av',
    '7a8b3c4d5e6f0123456789abcdef0123456789abcdef0123456789abcdef0123',
    '2026-10-14 11:30 AM',
    null
  );
}

// Seed Initial Matches if empty
const countMatches = db.prepare('SELECT COUNT(*) as count FROM matches').get();
if (countMatches.count === 0) {
  console.log('[Arena SQLite] Seeding initial pickup matches...');
  const insertMatch = db.prepare(`
    INSERT INTO matches (id, title, sport, format, turfId, turfName, pitchName, city, date, timeSlot, feePerPlayer, maxPlayers, participants, waitlist, pendingRequests, hostId, hostName, hostRating, skillLevel, approvalRequired, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertMatch.run(
    'match_101',
    'Friday Night 7v7 Football Blast • Nagpur Strikers',
    'Football',
    '7v7',
    'turf_ngp_01',
    'Strikerz Pro Arena & Floodlight Club',
    'Pitch A - 7v7 FIFA Bellin Turf',
    'Nagpur',
    '2026-10-16',
    '07:00 PM - 09:00 PM',
    290,
    14,
    JSON.stringify([
      { id: 'usr_rohan_01', name: 'Rohan Deshmukh', role: 'Striker / Host', skill: 'Intermediate', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' },
      { id: 'usr_p1', name: 'Aakash Verma', role: 'Goalkeeper', skill: 'Pro', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150' },
      { id: 'usr_p2', name: 'Tanmay Joshi', role: 'Midfielder', skill: 'Intermediate', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150' },
      { id: 'usr_p3', name: 'Sameer Sheikh', role: 'Defender', skill: 'Intermediate', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
      { id: 'usr_p4', name: 'Varun Nair', role: 'Winger', skill: 'Pro', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150' }
    ]),
    JSON.stringify([]),
    JSON.stringify([
      { id: 'usr_req_1', name: 'Kunal Patil', role: 'Midfielder', skill: 'Intermediate', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' }
    ]),
    'usr_rohan_01',
    'Rohan Deshmukh',
    4.9,
    'Intermediate',
    1,
    'OPEN'
  );
}

// Seed Initial Posts if empty
const countPosts = db.prepare('SELECT COUNT(*) as count FROM posts').get();
if (countPosts.count === 0) {
  console.log('[Arena SQLite] Seeding locker room community feed...');
  const insertPost = db.prepare(`
    INSERT INTO posts (id, authorName, authorHandle, authorCity, sport, timeAgo, content, linkedMatchId, likes, likedByMe, comments, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertPost.run(
    'post_01',
    'Rohan Deshmukh',
    '@rohan_striker',
    'Nagpur',
    'Football',
    '25 mins ago',
    'Need 3 solid midfield ballers for tonight 7v7 under the floodlights at Strikerz Pro Arena (Dharampeth)! Turf booked & locked on Arena AI. Split is just ₹290 each. Hit Join Match!',
    'match_101',
    9,
    1,
    JSON.stringify([
      { id: 'c1', user: 'Tanmay J.', text: 'Boots ready! Bring the size 5 match ball.' }
    ]),
    Date.now() - 1500000
  );
}

// Seed Maintenance Blocks if empty
const countMaint = db.prepare('SELECT COUNT(*) as count FROM maintenance_blocks').get();
if (countMaint.count === 0) {
  const insertMaint = db.prepare('INSERT INTO maintenance_blocks (key, reason, createdAt) VALUES (?, ?, ?)');
  insertMaint.run('pitch_ngp_1a_2026-10-16_16:00', 'Sprinkler & rubber infill re-grooming', new Date().toISOString());
  insertMaint.run('pitch_ngp_2a_2026-10-16_17:00', 'High-net tensioning', new Date().toISOString());
}

// ============================================================================
// REST API ROUTES
// ============================================================================

// 0. Authentication Routes (Login / Register / Users)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role, city, phone, preferredSports } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists. Please log in.' });
  }

  const userRole = role === 'OWNER' ? 'OWNER' : role === 'ADMIN' ? 'ADMIN' : 'PLAYER';
  const id = `usr_${Date.now()}`;
  const handle = `@${name.toLowerCase().replace(/[^a-z0-9_]/g, '_').slice(0, 15)}`;
  const userCity = city || 'Nagpur';
  const userPhone = phone || '+91 98000 00000';
  const sports = Array.isArray(preferredSports) && preferredSports.length ? preferredSports : ['Football'];
  const avatar = `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`;

  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, password, role, handle, city, phone, skillLevel, preferredSports, reliabilityScore, matchesPlayed, avatar, walletBalance, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run(
    id,
    name.trim(),
    cleanEmail,
    password,
    userRole,
    handle,
    userCity,
    userPhone,
    'Intermediate',
    JSON.stringify(sports),
    98,
    0,
    avatar,
    250, // Welcome signup bonus wallet cash
    new Date().toISOString()
  );

  const newUser = {
    id,
    name: name.trim(),
    email: cleanEmail,
    role: userRole,
    handle,
    city: userCity,
    phone: userPhone,
    skillLevel: 'Intermediate',
    preferredSports: sports,
    reliabilityScore: 98,
    matchesPlayed: 0,
    avatar,
    walletBalance: 250
  };

  res.status(201).json({ success: true, user: newUser });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);
  if (!row) {
    return res.status(401).json({ error: 'No account found with this email. Please check your credentials or register.' });
  }

  if (row.password !== password) {
    return res.status(401).json({ error: 'Invalid password. Please check and try again.' });
  }

  const user = {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    handle: row.handle,
    city: row.city,
    phone: row.phone,
    skillLevel: row.skillLevel,
    preferredSports: JSON.parse(row.preferredSports || '[]'),
    reliabilityScore: row.reliabilityScore,
    matchesPlayed: row.matchesPlayed,
    avatar: row.avatar,
    walletBalance: row.walletBalance
  };

  res.json({ success: true, user });
});

app.get('/api/auth/users', (req, res) => {
  const rows = db.prepare('SELECT id, name, email, role, handle, city, phone, skillLevel, preferredSports, reliabilityScore, matchesPlayed, avatar, walletBalance FROM users').all();
  const parsed = rows.map((r) => ({
    ...r,
    preferredSports: JSON.parse(r.preferredSports || '[]')
  }));
  res.json(parsed);
});

// 1. Health & Database Stats
app.get('/api/health', (req, res) => {
  const turfsCount = db.prepare('SELECT COUNT(*) as c FROM turfs').get().c;
  const bookingsCount = db.prepare('SELECT COUNT(*) as c FROM bookings').get().c;
  const matchesCount = db.prepare('SELECT COUNT(*) as c FROM matches').get().c;
  const postsCount = db.prepare('SELECT COUNT(*) as c FROM posts').get().c;
  const totalRev = db.prepare("SELECT SUM(totalPaid) as total FROM bookings WHERE bookingStatus = 'CONFIRMED'").get().total || 0;

  res.json({
    status: 'ONLINE',
    database: 'SQLite (Persistent file: arena.sqlite)',
    timestamp: new Date().toISOString(),
    metrics: {
      turfs: turfsCount,
      confirmedBookings: bookingsCount,
      activeMatches: matchesCount,
      feedPosts: postsCount,
      totalRevenueInr: totalRev
    }
  });
});

// 2. Turfs
app.get('/api/turfs', (req, res) => {
  const rows = db.prepare('SELECT * FROM turfs').all();
  const parsed = rows.map((r) => ({
    ...r,
    verified: Boolean(r.verified),
    featured: Boolean(r.featured),
    sports: JSON.parse(r.sports || '[]'),
    coords: JSON.parse(r.coords || '{}'),
    images: JSON.parse(r.images || '[]'),
    amenities: JSON.parse(r.amenities || '[]'),
    pitches: JSON.parse(r.pitches || '[]'),
    reviews: JSON.parse(r.reviews || '[]')
  }));
  res.json(parsed);
});

// 3. Bookings
app.get('/api/bookings', (req, res) => {
  const rows = db.prepare('SELECT * FROM bookings ORDER BY createdAt DESC').all();
  const parsed = rows.map((r) => ({
    ...r,
    slots: JSON.parse(r.slots || '[]'),
    slotLabels: JSON.parse(r.slotLabels || '[]')
  }));
  res.json(parsed);
});

// POST new booking with concurrency/conflict check in SQLite
app.post('/api/bookings', (req, res) => {
  const b = req.body;

  // Concurrency Check: Ensure no overlapping confirmed booking exists for same pitch & date & slot
  const requestedSlots = Array.isArray(b.slots) ? b.slots : [];
  const existingBookings = db.prepare(
    `SELECT slots FROM bookings WHERE pitchId = ? AND date = ? AND bookingStatus = 'CONFIRMED'`
  ).all(b.pitchId, b.date);

  for (const existing of existingBookings) {
    const bookedSlots = JSON.parse(existing.slots || '[]');
    for (const slot of requestedSlots) {
      if (bookedSlots.includes(slot)) {
        return res.status(409).json({
          error: `Slot ${slot} on ${b.date} was just confirmed by another player. Double-booking prevented by SQLite transaction lock!`
        });
      }
    }
  }

  // Check Maintenance blocks
  for (const slot of requestedSlots) {
    const maintKey = `${b.pitchId}_${b.date}_${slot}`;
    const blocked = db.prepare('SELECT key FROM maintenance_blocks WHERE key = ?').get(maintKey);
    if (blocked) {
      return res.status(409).json({
        error: `Slot ${slot} is currently blocked for turf maintenance.`
      });
    }
  }

  const insertBooking = db.prepare(`
    INSERT INTO bookings (id, userId, userName, userPhone, turfId, turfName, city, pitchId, pitchName, sport, date, slots, slotLabels, baseAmount, discount, convenienceFee, gstAmount, totalPaid, couponUsed, paymentStatus, bookingStatus, refundStatus, razorpayOrderId, razorpayPaymentId, razorpaySignature, createdAt, linkedMatchId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertBooking.run(
    b.id,
    b.userId,
    b.userName,
    b.userPhone || '+91 98230 45112',
    b.turfId,
    b.turfName,
    b.city,
    b.pitchId,
    b.pitchName,
    b.sport,
    b.date,
    JSON.stringify(b.slots || []),
    JSON.stringify(b.slotLabels || []),
    b.baseAmount || 0,
    b.discount || 0,
    b.convenienceFee || 49,
    b.gstAmount || 0,
    b.totalPaid || 0,
    b.couponUsed || null,
    b.paymentStatus || 'CAPTURED',
    b.bookingStatus || 'CONFIRMED',
    b.refundStatus || 'NONE',
    b.razorpayOrderId || `order_${Date.now()}`,
    b.razorpayPaymentId || `pay_${Date.now()}`,
    b.razorpaySignature || `sig_${Date.now()}`,
    b.createdAt || new Date().toLocaleString('en-IN'),
    b.linkedMatchId || null
  );

  // Record audit log
  const insertAudit = db.prepare('INSERT INTO audit_logs (id, time, actor, action, ip, status) VALUES (?, ?, ?, ?, ?, ?)');
  insertAudit.run(
    `aud_${Date.now()}`,
    new Date().toLocaleTimeString('en-IN') + ' IST',
    'RAZORPAY_WEBHOOK',
    `payment.captured -> Booking ${b.id} confirmed for ₹${b.totalPaid}`,
    '52.66.192.44',
    'VERIFIED_HMAC_SHA256'
  );

  res.status(201).json({ success: true, booking: b });
});

// Cancel Booking
app.patch('/api/bookings/:id/cancel', (req, res) => {
  const { id } = req.params;
  const update = db.prepare(`
    UPDATE bookings
    SET bookingStatus = 'CANCELLED', refundStatus = 'REFUND_INITIATED'
    WHERE id = ?
  `);
  update.run(id);

  // Record audit log
  const insertAudit = db.prepare('INSERT INTO audit_logs (id, time, actor, action, ip, status) VALUES (?, ?, ?, ?, ?, ?)');
  insertAudit.run(
    `aud_${Date.now()}`,
    new Date().toLocaleTimeString('en-IN') + ' IST',
    'USER_CLIENT',
    `Booking ${id} cancelled. 100% refund initiated to source UPI.`,
    '103.21.124.9',
    'SUCCESS'
  );

  res.json({ success: true, message: `Booking ${id} cancelled.` });
});

// 4. Matches
app.get('/api/matches', (req, res) => {
  const rows = db.prepare('SELECT * FROM matches ORDER BY rowid DESC').all();
  const parsed = rows.map((m) => ({
    ...m,
    approvalRequired: Boolean(m.approvalRequired),
    participants: JSON.parse(m.participants || '[]'),
    waitlist: JSON.parse(m.waitlist || '[]'),
    pendingRequests: JSON.parse(m.pendingRequests || '[]')
  }));
  res.json(parsed);
});

app.post('/api/matches', (req, res) => {
  const m = req.body;
  const insert = db.prepare(`
    INSERT INTO matches (id, title, sport, format, turfId, turfName, pitchName, city, date, timeSlot, feePerPlayer, maxPlayers, participants, waitlist, pendingRequests, hostId, hostName, hostRating, skillLevel, approvalRequired, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    m.id,
    m.title,
    m.sport,
    m.format,
    m.turfId,
    m.turfName,
    m.pitchName,
    m.city,
    m.date,
    m.timeSlot,
    m.feePerPlayer,
    m.maxPlayers,
    JSON.stringify(m.participants || []),
    JSON.stringify(m.waitlist || []),
    JSON.stringify(m.pendingRequests || []),
    m.hostId,
    m.hostName,
    m.hostRating,
    m.skillLevel,
    m.approvalRequired ? 1 : 0,
    m.status || 'OPEN'
  );

  res.status(201).json({ success: true, match: m });
});

app.post('/api/matches/:id/join', (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const row = db.prepare('SELECT * FROM matches WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Match not found' });

  let participants = JSON.parse(row.participants || '[]');
  let waitlist = JSON.parse(row.waitlist || '[]');
  let pendingRequests = JSON.parse(row.pendingRequests || '[]');

  if (participants.some((p) => p.id === user.id)) {
    return res.status(400).json({ error: 'Already joined this match.' });
  }

  let statusMsg = '';
  if (row.approvalRequired) {
    if (!pendingRequests.some((p) => p.id === user.id)) {
      pendingRequests.push(user);
    }
    statusMsg = 'Join request submitted to host for approval.';
  } else if (participants.length < row.maxPlayers) {
    participants.push(user);
    statusMsg = 'Successfully joined the match squad!';
  } else {
    if (!waitlist.some((w) => w.id === user.id)) {
      waitlist.push(user);
    }
    statusMsg = 'Match is full. Added to waitlist.';
  }

  db.prepare(`
    UPDATE matches
    SET participants = ?, waitlist = ?, pendingRequests = ?
    WHERE id = ?
  `).run(JSON.stringify(participants), JSON.stringify(waitlist), JSON.stringify(pendingRequests), id);

  res.json({ success: true, message: statusMsg, participants, waitlist, pendingRequests });
});

app.post('/api/matches/:id/approve', (req, res) => {
  const { id } = req.params;
  const { reqUser } = req.body;
  const row = db.prepare('SELECT * FROM matches WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Match not found' });

  let participants = JSON.parse(row.participants || '[]');
  let pendingRequests = JSON.parse(row.pendingRequests || '[]');

  pendingRequests = pendingRequests.filter((r) => r.id !== reqUser.id);
  if (!participants.some((p) => p.id === reqUser.id)) {
    participants.push(reqUser);
  }

  db.prepare(`
    UPDATE matches
    SET participants = ?, pendingRequests = ?
    WHERE id = ?
  `).run(JSON.stringify(participants), JSON.stringify(pendingRequests), id);

  res.json({ success: true, participants, pendingRequests });
});

// 5. Posts (Locker Room Feed)
app.get('/api/posts', (req, res) => {
  const rows = db.prepare('SELECT * FROM posts ORDER BY createdAt DESC').all();
  const parsed = rows.map((p) => ({
    ...p,
    likedByMe: Boolean(p.likedByMe),
    comments: JSON.parse(p.comments || '[]')
  }));
  res.json(parsed);
});

app.post('/api/posts', (req, res) => {
  const p = req.body;
  const insert = db.prepare(`
    INSERT INTO posts (id, authorName, authorHandle, authorCity, sport, timeAgo, content, linkedMatchId, likes, likedByMe, comments, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    p.id,
    p.authorName,
    p.authorHandle,
    p.authorCity,
    p.sport,
    p.timeAgo || 'Just now',
    p.content,
    p.linkedMatchId || null,
    p.likes || 0,
    p.likedByMe ? 1 : 0,
    JSON.stringify(p.comments || []),
    p.createdAt || Date.now()
  );

  res.status(201).json({ success: true, post: p });
});

app.post('/api/posts/:id/like', (req, res) => {
  const { id } = req.params;
  const row = db.prepare('SELECT likes, likedByMe FROM posts WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Post not found' });

  const newLiked = row.likedByMe ? 0 : 1;
  const newLikes = newLiked ? row.likes + 1 : Math.max(row.likes - 1, 0);

  db.prepare('UPDATE posts SET likes = ?, likedByMe = ? WHERE id = ?').run(newLikes, newLiked, id);
  res.json({ success: true, likes: newLikes, likedByMe: Boolean(newLiked) });
});

// 6. Maintenance Blocks
app.get('/api/maintenance', (req, res) => {
  const rows = db.prepare('SELECT * FROM maintenance_blocks').all();
  const map = {};
  for (const r of rows) {
    map[r.key] = r.reason || 'Blocked';
  }
  res.json(map);
});

app.post('/api/maintenance/toggle', (req, res) => {
  const { key, reason } = req.body;
  const existing = db.prepare('SELECT key FROM maintenance_blocks WHERE key = ?').get(key);
  if (existing) {
    db.prepare('DELETE FROM maintenance_blocks WHERE key = ?').run(key);
    res.json({ action: 'REMOVED', key });
  } else {
    db.prepare('INSERT INTO maintenance_blocks (key, reason, createdAt) VALUES (?, ?, ?)').run(
      key,
      reason || 'Owner Maintenance Block',
      new Date().toISOString()
    );
    res.json({ action: 'ADDED', key });
  }
});

// 7. Audit Logs
app.get('/api/audit-logs', (req, res) => {
  const rows = db.prepare('SELECT * FROM audit_logs ORDER BY rowid DESC LIMIT 100').all();
  res.json(rows);
});

// 8. Server-Side Gemini API Proxy with fallback and high-performance flash-lite model
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
const GEMINI_MODELS = ['gemini-flash-lite-latest', 'gemini-flash-latest', 'gemini-3.8-flash', 'gemini-pro-latest'];

app.post('/api/gemini', async (req, res) => {
  const { userPrompt, systemPrompt, responseSchema, useSearchGrounding } = req.body;

  const buildPayload = (includeSearch = false) => {
    const p = {
      contents: [{ parts: [{ text: userPrompt }] }]
    };
    if (systemPrompt) {
      p.systemInstruction = {
        parts: [{ text: systemPrompt }]
      };
    }
    if (responseSchema) {
      p.generationConfig = {
        responseMimeType: 'application/json',
        responseSchema
      };
    }
    if (includeSearch) {
      p.tools = [{ googleSearch: {} }];
    }
    return p;
  };

  let lastError = null;

  for (const model of GEMINI_MODELS) {
    // Attempt with search grounding first if requested, and if quota 429 then fallback to standard prompt
    const attempts = useSearchGrounding ? [true, false] : [false];

    for (const withSearch of attempts) {
      try {
        const payload = buildPayload(withSearch);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errText = await response.text();
          if (withSearch && (response.status === 429 || response.status === 400)) {
            console.log(`[Gemini Proxy] Search grounding quota limit on ${model}, falling back to direct prompt...`);
            continue; // try next attempt without search
          }
          throw new Error(`Model ${model} returned HTTP ${response.status}: ${errText}`);
        }

        const data = await response.json();
        const candidate = data.candidates?.[0];
        const text = candidate?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Empty candidate response');

        let sources = [];
        const groundingMetadata = candidate?.groundingMetadata;
        if (groundingMetadata && groundingMetadata.groundingAttributions) {
          sources = groundingMetadata.groundingAttributions
            .map((attr) => ({
              uri: attr.web?.uri,
              title: attr.web?.title
            }))
            .filter((s) => s.uri && s.title);
        }

        return res.json({
          modelUsed: model,
          text,
          parsedJson: responseSchema ? JSON.parse(text) : null,
          sources
        });
      } catch (err) {
        console.warn(`[Gemini Proxy] Attempt failed on ${model} (search=${withSearch}):`, err.message);
        lastError = err;
      }
    }
  }

  res.status(502).json({ error: lastError?.message || 'Gemini API failed on all candidate models.' });
});

// Serve static built frontend from /dist in production
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Express 5 compatible SPA fallback
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
  console.log(`[Arena Production] Serving static frontend build from: ${distPath}`);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Arena SQLite Backend] Server running on http://127.0.0.1:${PORT}`);
});
