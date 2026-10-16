import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin, Search, Filter, Star, Calendar, Clock, ShieldCheck, Zap,
  Users, Trophy, MessageSquare, Heart, Share2, CheckCircle2, AlertTriangle,
  X, ChevronRight, ChevronLeft, Plus, Lock, RefreshCw, CreditCard,
  Smartphone, Building2, Terminal, Database, Server, Code2, Copy,
  Check, Sparkles, SlidersHorizontal, Navigation, Eye, Ban, Trash2,
  TrendingUp, IndianRupee, Percent, Award, Bell, UserCheck, HelpCircle,
  FileText, QrCode, ArrowUpRight, Layers, Activity, ShieldAlert, LogOut,
  Settings, Bookmark, Info, CheckSquare, Flame, Compass, User, Home,
  FlameKindling, Radio, Timer
} from 'lucide-react';

// ============================================================================
// INITIAL SEED DATA (INDIAN CITIES, TURFS, PITCHES, MATCHES, COMMUNITIES)
// ============================================================================

const CITIES = ['Nagpur', 'Mumbai', 'Bengaluru', 'Pune', 'Delhi NCR'];

const SPORTS_LIST = [
  { id: 'All', name: 'All Sports', icon: '⚡' },
  { id: 'Football', name: 'Football', icon: '⚽' },
  { id: 'Box Cricket', name: 'Box Cricket', icon: '🏏' },
  { id: 'Badminton', name: 'Badminton', icon: '🏸' },
  { id: 'Pickleball', name: 'Pickleball', icon: '🎾' },
  { id: 'Tennis', name: 'Tennis', icon: '🎾' },
];

const INITIAL_USERS = [
  {
    id: 'usr_rohan_01',
    name: 'Rohan Deshmukh',
    handle: '@rohan_striker',
    role: 'PLAYER',
    city: 'Nagpur',
    phone: '+91 98230 45112',
    email: 'rohan.deshmukh@arenaai.in',
    skillLevel: 'Intermediate',
    preferredSports: ['Football', 'Box Cricket', 'Pickleball'],
    reliabilityScore: 98,
    matchesPlayed: 42,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    walletBalance: 450,
  },
  {
    id: 'usr_aditi_02',
    name: 'Aditi Sharma',
    handle: '@aditi_smash',
    role: 'PLAYER',
    city: 'Mumbai',
    phone: '+91 98111 22334',
    email: 'aditi.sharma@arenaai.in',
    skillLevel: 'Pro',
    preferredSports: ['Badminton', 'Pickleball'],
    reliabilityScore: 100,
    matchesPlayed: 67,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    walletBalance: 1200,
  },
  {
    id: 'usr_vikram_owner',
    name: 'Vikramjit Singh',
    handle: '@vikram_arenas',
    role: 'OWNER',
    city: 'Nagpur',
    phone: '+91 97654 32109',
    email: 'vikram@greenfieldarenas.in',
    skillLevel: 'Intermediate',
    preferredSports: ['Football', 'Box Cricket'],
    reliabilityScore: 99,
    matchesPlayed: 19,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    walletBalance: 0,
  }
];

const INITIAL_TURFS = [
  {
    id: 'turf_ngp_01',
    name: 'Strikerz Pro Arena & Floodlight Club',
    city: 'Nagpur',
    area: 'Dharampeth / Law College Square',
    address: 'Plot 42, West High Court Road, Dharampeth, Nagpur 440010',
    distanceKm: 1.8,
    rating: 4.9,
    reviewsCount: 318,
    verified: true,
    featured: true,
    ownerId: 'usr_vikram_owner',
    sports: ['Football', 'Box Cricket', 'Pickleball'],
    basePrice: 1200,
    peakPrice: 1600,
    openHours: '06:00 AM - 01:00 AM',
    coords: { x: 48, y: 42 },
    images: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&auto=format&fit=crop&q=80'
    ],
    amenities: ['FIFA Quality Pro Turf', 'LED Floodlights 400 Lux', 'Shower & Changing Room', 'Free Parking', 'Chilled RO Water', 'Equipment Rental'],
    pitches: [
      { id: 'pitch_ngp_1a', name: 'Pitch A - 7v7 FIFA Bellin Turf', sport: 'Football', basePrice: 1400, peakPrice: 1800, dimensions: '110x70 ft' },
      { id: 'pitch_ngp_1b', name: 'Pitch B - 5v5 High-Net Box Arena', sport: 'Box Cricket', basePrice: 1200, peakPrice: 1500, dimensions: '90x55 ft' },
      { id: 'pitch_ngp_1c', name: 'Court C - Cushion Pro Pickleball', sport: 'Pickleball', basePrice: 600, peakPrice: 800, dimensions: '44x20 ft' }
    ],
    reviews: [
      { id: 'rev_1', user: 'Saurabh K.', rating: 5, date: '2 days ago', comment: 'Best bounce in Nagpur! Zero knee strain on the 50mm monofilament grass.' },
      { id: 'rev_2', user: 'Pranav M.', rating: 5, date: '1 week ago', comment: 'Floodlights are stadium grade. Instant entry with Arena AI QR code.' }
    ]
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
    verified: true,
    featured: false,
    ownerId: 'usr_vikram_owner',
    sports: ['Box Cricket', 'Badminton', 'Football'],
    basePrice: 900,
    peakPrice: 1300,
    openHours: '05:30 AM - 12:00 AM',
    coords: { x: 68, y: 66 },
    images: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1000&auto=format&fit=crop&q=80'
    ],
    amenities: ['32ft High Roof Net', 'BWF Yonex Synthetic Mats', 'Cafeteria', 'Live Dugout Seating', 'CCTV Monitored'],
    pitches: [
      { id: 'pitch_ngp_2a', name: 'Arena 1 - Mega Box Cricket Turf', sport: 'Box Cricket', basePrice: 1000, peakPrice: 1300, dimensions: '100x60 ft' },
      { id: 'pitch_ngp_2b', name: 'Court 1 - Yonex Pro Indoor Mat', sport: 'Badminton', basePrice: 450, peakPrice: 600, dimensions: 'Standard BWF' }
    ],
    reviews: [
      { id: 'rev_3', user: 'Nikhil W.', rating: 5, date: '4 days ago', comment: 'Super high ceiling for box cricket, no dead ball issues!' }
    ]
  },
  {
    id: 'turf_ngp_03',
    name: 'VCA Civil Lines Smash & Turf Club',
    city: 'Nagpur',
    area: 'Civil Lines / Sadar',
    address: 'Residency Road, Opposite Liberty Cinema, Sadar, Nagpur 440001',
    distanceKm: 2.5,
    rating: 4.8,
    reviewsCount: 245,
    verified: true,
    featured: true,
    ownerId: 'usr_vikram_owner',
    sports: ['Pickleball', 'Tennis', 'Football'],
    basePrice: 800,
    peakPrice: 1100,
    openHours: '06:00 AM - 11:00 PM',
    coords: { x: 34, y: 28 },
    images: [
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1000&auto=format&fit=crop&q=80'
    ],
    amenities: ['8-Layer Acrylic Court', 'Pro Paddles Included', 'Valet Parking', 'Sports Physio On-Call', 'Energy Drink Bar'],
    pitches: [
      { id: 'pitch_ngp_3a', name: 'Show Court 1 - USAPA Acrylic Pickleball', sport: 'Pickleball', basePrice: 700, peakPrice: 950, dimensions: '44x20 ft' },
      { id: 'pitch_ngp_3b', name: '5v5 FutPro Cage Turf', sport: 'Football', basePrice: 1100, peakPrice: 1400, dimensions: '85x50 ft' }
    ],
    reviews: []
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
    verified: true,
    featured: true,
    ownerId: 'usr_vikram_owner',
    sports: ['Football', 'Box Cricket', 'Pickleball'],
    basePrice: 2000,
    peakPrice: 2800,
    openHours: '06:00 AM - 02:00 AM',
    coords: { x: 26, y: 54 },
    images: [
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=1000&auto=format&fit=crop&q=80'
    ],
    amenities: ['Sea Breeze Rooftop', 'FIFA 60mm AstroTurf', 'GoPro Match Recording', 'Locker Rooms', 'Protein Shake Cafe'],
    pitches: [
      { id: 'pitch_mum_1a', name: 'SkyPitch 6v6 Arena', sport: 'Football', basePrice: 2000, peakPrice: 2800, dimensions: '105x65 ft' },
      { id: 'pitch_mum_1b', name: 'Bandra Pickleball Deck', sport: 'Pickleball', basePrice: 1100, peakPrice: 1500, dimensions: '44x20 ft' }
    ],
    reviews: []
  },
  {
    id: 'turf_blr_01',
    name: 'PlayArena HSR Layout SuperDome',
    city: 'Bengaluru',
    area: 'HSR Sector 2 / Sarjapur Road',
    address: '27th Main Road, Sector 2, HSR Layout, Bengaluru 560102',
    distanceKm: 2.1,
    rating: 4.8,
    reviewsCount: 640,
    verified: true,
    featured: true,
    ownerId: 'usr_vikram_owner',
    sports: ['Football', 'Badminton', 'Box Cricket', 'Pickleball'],
    basePrice: 1500,
    peakPrice: 2100,
    openHours: '05:00 AM - 01:00 AM',
    coords: { x: 58, y: 36 },
    images: [
      'https://images.unsplash.com/photo-1518605368461-1ee7e53f2f60?w=1000&auto=format&fit=crop&q=80'
    ],
    amenities: ['All-Weather Covered Dome', '12 BWF Badminton Courts', 'EV Fast Charging', 'Decathlon Pro Shop'],
    pitches: [
      { id: 'pitch_blr_1a', name: 'Dome Pitch 1 - 7v7 Football', sport: 'Football', basePrice: 1600, peakPrice: 2100, dimensions: '115x75 ft' },
      { id: 'pitch_blr_1b', name: 'Hybrid Box Cricket Cage', sport: 'Box Cricket', basePrice: 1400, peakPrice: 1900, dimensions: '95x60 ft' }
    ],
    reviews: []
  },
  {
    id: 'turf_pune_01',
    name: 'Koregaon Park Smash & Kick Club',
    city: 'Pune',
    area: 'Koregaon Park / Kalyani Nagar',
    address: 'Lane 7, North Main Road, Koregaon Park, Pune 411001',
    distanceKm: 1.5,
    rating: 4.8,
    reviewsCount: 280,
    verified: true,
    featured: false,
    ownerId: 'usr_vikram_owner',
    sports: ['Football', 'Pickleball', 'Tennis'],
    basePrice: 1300,
    peakPrice: 1700,
    openHours: '06:00 AM - 12:00 AM',
    coords: { x: 75, y: 48 },
    images: [
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1000&auto=format&fit=crop&q=80'
    ],
    amenities: ['European ShockPad Base', 'Specialty Coffee Lounge', 'Shower Suites', 'Racket Stringing'],
    pitches: [
      { id: 'pitch_pune_1a', name: 'KP 6v6 Arena', sport: 'Football', basePrice: 1300, peakPrice: 1700, dimensions: '100x60 ft' }
    ],
    reviews: []
  }
];

const TIME_SLOTS = [
  { id: '06:00', label: '06:00 AM - 07:00 AM', period: 'Morning', isPeak: false },
  { id: '07:00', label: '07:00 AM - 08:00 AM', period: 'Morning', isPeak: false },
  { id: '08:00', label: '08:00 AM - 09:00 AM', period: 'Morning', isPeak: false },
  { id: '16:00', label: '04:00 PM - 05:00 PM', period: 'Afternoon', isPeak: false },
  { id: '17:00', label: '05:00 PM - 06:00 PM', period: 'Evening', isPeak: false },
  { id: '18:00', label: '06:00 PM - 07:00 PM', period: 'Evening', isPeak: true },
  { id: '19:00', label: '07:00 PM - 08:00 PM', period: 'Prime Night', isPeak: true },
  { id: '20:00', label: '08:00 PM - 09:00 PM', period: 'Prime Night', isPeak: true },
  { id: '21:00', label: '09:00 PM - 10:00 PM', period: 'Prime Night', isPeak: true },
  { id: '22:00', label: '10:00 PM - 11:00 PM', period: 'Late Night', isPeak: true },
];

const COUPONS = {
  ARENA200: { code: 'ARENA200', discountType: 'FLAT', value: 200, minAmount: 1000, desc: 'Flat ₹200 OFF on turf bookings above ₹1,000' },
  STRIKE50: { code: 'STRIKE50', discountType: 'PERCENT', value: 15, maxCap: 350, minAmount: 600, desc: '15% OFF up to ₹350 on squad bookings' },
  NAGPUR10: { code: 'NAGPUR10', discountType: 'FLAT', value: 150, minAmount: 800, desc: 'Orange City Special: Flat ₹150 OFF' }
};

const INITIAL_BOOKINGS = [
  {
    id: 'BK-2026-8841',
    userId: 'usr_rohan_01',
    userName: 'Rohan Deshmukh',
    turfId: 'turf_ngp_01',
    turfName: 'Strikerz Pro Arena & Floodlight Club',
    city: 'Nagpur',
    pitchId: 'pitch_ngp_1a',
    pitchName: 'Pitch A - 7v7 FIFA Bellin Turf',
    sport: 'Football',
    date: '2026-10-16',
    slots: ['19:00', '20:00'],
    slotLabels: ['07:00 PM - 08:00 PM', '08:00 PM - 09:00 PM'],
    baseAmount: 3600,
    discount: 200,
    gstAmount: 612,
    convenienceFee: 49,
    totalPaid: 4061,
    couponUsed: 'ARENA200',
    bookingStatus: 'CONFIRMED',
    paymentStatus: 'CAPTURED',
    refundStatus: 'NONE',
    razorpayOrderId: 'order_P9xK72mLp091Qa',
    razorpayPaymentId: 'pay_P9xL11zWq882Bv',
    razorpaySignature: '8f9d2a1b6e4c703198a77b54c21e09f44d82e11a65c0098b1234a90f8c1d7e3b',
    createdAt: '2026-10-15 04:12 PM',
    linkedMatchId: 'match_101'
  },
  {
    id: 'BK-2026-8790',
    userId: 'usr_rohan_01',
    userName: 'Rohan Deshmukh',
    turfId: 'turf_ngp_02',
    turfName: 'Orange City Box Cricket & Badminton Hub',
    city: 'Nagpur',
    pitchId: 'pitch_ngp_2a',
    pitchName: 'Arena 1 - Mega Box Cricket Turf',
    sport: 'Box Cricket',
    date: '2026-10-17',
    slots: ['18:00'],
    slotLabels: ['06:00 PM - 07:00 PM'],
    baseAmount: 1300,
    discount: 0,
    gstAmount: 234,
    convenienceFee: 35,
    totalPaid: 1569,
    couponUsed: null,
    bookingStatus: 'CONFIRMED',
    paymentStatus: 'CAPTURED',
    refundStatus: 'NONE',
    razorpayOrderId: 'order_P8vM19kLp112Xz',
    razorpayPaymentId: 'pay_P8vN90mRt441Kp',
    razorpaySignature: '3a1c9f0e4b2d8765123490abcdef1234567890fedcba09876543211a2b3c4d5e',
    createdAt: '2026-10-14 08:45 PM',
    linkedMatchId: null
  }
];

const INITIAL_MATCHES = [
  {
    id: 'match_101',
    title: 'Friday Floodlight 7v7 High-Tempo Pickup',
    sport: 'Football',
    city: 'Nagpur',
    turfId: 'turf_ngp_01',
    turfName: 'Strikerz Pro Arena & Floodlight Club',
    pitchName: 'Pitch A - 7v7 FIFA Bellin Turf',
    linkedBookingId: 'BK-2026-8841',
    verifiedBooking: true,
    date: '2026-10-16',
    timeLabel: '07:00 PM - 09:00 PM',
    skillLevel: 'Intermediate',
    format: '7 vs 7',
    feePerPlayer: 290,
    maxPlayers: 14,
    hostId: 'usr_rohan_01',
    hostName: 'Rohan Deshmukh',
    approvalRequired: false,
    participants: [
      { id: 'usr_rohan_01', name: 'Rohan Deshmukh', role: 'Host', skill: 'Intermediate' },
      { id: 'p2', name: 'Atharva Joshi', role: 'Player', skill: 'Pro' },
      { id: 'p3', name: 'Siddharth Kale', role: 'Player', skill: 'Intermediate' },
      { id: 'p4', name: 'Kunal Bhasin', role: 'Player', skill: 'Intermediate' },
      { id: 'p5', name: 'Mayank Verma', role: 'Player', skill: 'Beginner' },
      { id: 'p6', name: 'Zaid Khan', role: 'Player', skill: 'Pro' },
      { id: 'p7', name: 'Devansh Rathi', role: 'Player', skill: 'Intermediate' },
      { id: 'p8', name: 'Omkar Gadkari', role: 'Player', skill: 'Intermediate' },
      { id: 'p9', name: 'Harshvardhan P.', role: 'Player', skill: 'Pro' },
      { id: 'p10', name: 'Tanmay Deshpande', role: 'Player', skill: 'Intermediate' },
      { id: 'p11', name: 'Yashwardhan S.', role: 'Player', skill: 'Intermediate' },
      { id: 'p12', name: 'Pratik Mohite', role: 'Player', skill: 'Intermediate' }
    ],
    waitlist: [],
    pendingRequests: []
  },
  {
    id: 'match_102',
    title: 'Weekend Box Cricket Super-Over Showdown',
    sport: 'Box Cricket',
    city: 'Nagpur',
    turfId: 'turf_ngp_02',
    turfName: 'Orange City Box Cricket & Badminton Hub',
    pitchName: 'Arena 1 - Mega Box Cricket Turf',
    linkedBookingId: 'BK-2026-8790',
    verifiedBooking: true,
    date: '2026-10-17',
    timeLabel: '06:00 PM - 07:00 PM',
    skillLevel: 'All Levels',
    format: '8 vs 8',
    feePerPlayer: 100,
    maxPlayers: 16,
    hostId: 'usr_rohan_01',
    hostName: 'Rohan Deshmukh',
    approvalRequired: true,
    participants: [
      { id: 'usr_rohan_01', name: 'Rohan Deshmukh', role: 'Host', skill: 'Intermediate' },
      { id: 'c2', name: 'Aniket Kulkarni', role: 'Player', skill: 'Pro' },
      { id: 'c3', name: 'Shreyas Iyer (Local)', role: 'Player', skill: 'Intermediate' },
      { id: 'c4', name: 'Gaurav Meshram', role: 'Player', skill: 'Beginner' },
      { id: 'c5', name: 'Varun Chavan', role: 'Player', skill: 'Intermediate' },
      { id: 'c6', name: 'Rohit Haldar', role: 'Player', skill: 'Pro' }
    ],
    waitlist: [],
    pendingRequests: [
      { id: 'req_99', name: 'Chinmay Gokhale', skill: 'Intermediate', reliability: 96 }
    ]
  },
  {
    id: 'match_103',
    title: 'DUPR 3.5+ Pro Pickleball King of the Court',
    sport: 'Pickleball',
    city: 'Nagpur',
    turfId: 'turf_ngp_03',
    turfName: 'VCA Civil Lines Smash & Turf Club',
    pitchName: 'Show Court 1 - USAPA Acrylic Pickleball',
    linkedBookingId: 'BK-2026-8612',
    verifiedBooking: true,
    date: '2026-10-16',
    timeLabel: '08:00 PM - 09:00 PM',
    skillLevel: 'Pro',
    format: 'Doubles Rotation (4 Players)',
    feePerPlayer: 240,
    maxPlayers: 4,
    hostId: 'usr_aditi_02',
    hostName: 'Aditi Sharma',
    approvalRequired: false,
    participants: [
      { id: 'usr_aditi_02', name: 'Aditi Sharma', role: 'Host', skill: 'Pro' },
      { id: 'pk2', name: 'Rishabh Jain', role: 'Player', skill: 'Pro' },
      { id: 'pk3', name: 'Meera Nair', role: 'Player', skill: 'Pro' },
      { id: 'pk4', name: 'Kabir Bedi', role: 'Player', skill: 'Pro' }
    ],
    waitlist: [
      { id: 'wl_1', name: 'Neeraj Chopra (Fan)', skill: 'Intermediate' }
    ],
    pendingRequests: []
  }
];

const INITIAL_COMMUNITIES = [
  {
    id: 'comm_1',
    name: 'Nagpur 7v7 Night Footballers',
    city: 'Nagpur',
    sport: 'Football',
    membersCount: 1420,
    privacy: 'PUBLIC',
    joined: true,
    desc: 'Daily pickup games at Dharampeth, Civil Lines, and Wardha Road turfs. Strict no-flaking policy.'
  },
  {
    id: 'comm_2',
    name: 'Vidarbha Box Cricket Premier Squads',
    city: 'Nagpur',
    sport: 'Box Cricket',
    membersCount: 890,
    privacy: 'PUBLIC',
    joined: true,
    desc: 'Weekend tournaments, corporate leagues, and night box cricket matches across Nagpur.'
  },
  {
    id: 'comm_3',
    name: 'India Pickleball & Padel Club (Nagpur/BOM/BLR)',
    city: 'All Cities',
    sport: 'Pickleball',
    membersCount: 3150,
    privacy: 'PRIVATE',
    joined: false,
    desc: 'DUPR-rated sessions, paddle swaps, and verified acrylic court bookings.'
  }
];

const INITIAL_POSTS = [
  {
    id: 'post_1',
    authorName: 'Rohan Deshmukh',
    authorHandle: '@rohan_striker',
    authorCity: 'Nagpur',
    sport: 'Football',
    timeAgo: '25 mins ago',
    content: 'Need 2 solid defenders or a GK for tonight’s 7:00 PM - 9:00 PM session at Strikerz Pro Arena (Dharampeth)! Pitch A is already booked & confirmed (#BK-2026-8841). ₹290/head split. Drop in via the match card!',
    linkedMatchId: 'match_101',
    likes: 24,
    likedByMe: false,
    comments: [
      { id: 'cm_1', user: 'Atharva Joshi', text: 'I am bringing bibs and a FIFA Pro ball tonight!' },
      { id: 'cm_2', user: 'Zaid Khan', text: 'Can play CB, joining right now.' }
    ]
  },
  {
    id: 'post_2',
    authorName: 'Aditi Sharma',
    authorHandle: '@aditi_smash',
    authorCity: 'Mumbai',
    sport: 'Pickleball',
    timeAgo: '2 hours ago',
    content: 'Tried the new 8-layer USAPA acrylic courts at VCA Civil Lines Club while visiting Nagpur. Zero dead spots and great LED lighting! Who is up for a Sunday morning mixed doubles mixer?',
    linkedMatchId: null,
    likes: 49,
    likedByMe: true,
    comments: [
      { id: 'cm_3', user: 'Meera Nair', text: 'Count me in for Sunday 7 AM!' }
    ]
  }
];

// ============================================================================
// PRODUCTION CODE BLUEPRINTS FOR ARCHITECTURE TAB
// ============================================================================

const CODE_BLUEPRINTS = {
  postgres: {
    title: '01_schema_and_concurrency.sql',
    subtitle: 'PostgreSQL 16 Schema + GiST Exclusion Constraints + Double-Booking Prevention',
    language: 'sql',
    code: `-- ============================================================================
-- ARENA AI POSTGRESQL NORMALIZED SCHEMA (INR / CONCURRENCY SAFE)
-- Prevents race conditions & double-booking at the database engine level
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

CREATE TYPE user_role AS ENUM ('PLAYER', 'OWNER', 'ADMIN');
CREATE TYPE booking_status AS ENUM ('HOLD_PENDING', 'CONFIRMED', 'CANCELLED', 'EXPIRED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED');
CREATE TYPE refund_status AS ENUM ('NONE', 'INITIATED', 'PROCESSED', 'FAILED');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    role user_role NOT NULL DEFAULT 'PLAYER',
    skill_level VARCHAR(30) DEFAULT 'Intermediate',
    preferred_sports TEXT[] DEFAULT '{}',
    reliability_score SMALLINT DEFAULT 100 CHECK (reliability_score BETWEEN 0 AND 100),
    is_blocked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE turfs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    name VARCHAR(180) NOT NULL,
    city VARCHAR(80) NOT NULL,
    address TEXT NOT NULL,
    latitude NUMERIC(9,6) NOT NULL,
    longitude NUMERIC(9,6) NOT NULL,
    amenities TEXT[] NOT NULL DEFAULT '{}',
    kyc_verified BOOLEAN NOT NULL DEFAULT FALSE,
    commission_pct NUMERIC(4,2) NOT NULL DEFAULT 8.00,
    rating NUMERIC(3,2) DEFAULT 5.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE pitches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    turf_id UUID NOT NULL REFERENCES turfs(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    sport VARCHAR(60) NOT NULL,
    base_price_inr INTEGER NOT NULL CHECK (base_price_inr > 0),
    peak_price_inr INTEGER NOT NULL CHECK (peak_price_inr >= base_price_inr),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code VARCHAR(24) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    pitch_id UUID NOT NULL REFERENCES pitches(id),
    booking_date DATE NOT NULL,
    slot_time TSTZRANGE NOT NULL,
    base_amount_paise BIGINT NOT NULL,
    discount_paise BIGINT NOT NULL DEFAULT 0,
    gst_paise BIGINT NOT NULL,
    convenience_fee_paise BIGINT NOT NULL,
    total_payable_paise BIGINT NOT NULL,
    booking_status booking_status NOT NULL DEFAULT 'HOLD_PENDING',
    payment_status payment_status NOT NULL DEFAULT 'PENDING',
    refund_status refund_status NOT NULL DEFAULT 'NONE',
    hold_expires_at TIMESTAMPTZ NOT NULL,
    razorpay_order_id VARCHAR(80) UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- HARD DATABASE-LEVEL EXCLUSION CONSTRAINT:
    -- Guarantees two active bookings can NEVER overlap on the same pitch + time range
    CONSTRAINT no_overlapping_pitch_bookings
    EXCLUDE USING gist (
        pitch_id WITH =,
        slot_time WITH &&
    ) WHERE (booking_status IN ('HOLD_PENDING', 'CONFIRMED'))
);

-- Link community matches strictly to CONFIRMED bookings (No fake slot reservations)
CREATE TABLE community_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID NOT NULL REFERENCES users(id),
    booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    title VARCHAR(160) NOT NULL,
    sport VARCHAR(60) NOT NULL,
    skill_level VARCHAR(40) NOT NULL,
    max_players SMALLINT NOT NULL CHECK (max_players BETWEEN 2 AND 30),
    fee_per_player_inr INTEGER NOT NULL DEFAULT 0,
    approval_required BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`
  },
  fastapi: {
    title: '02_booking_engine_service.py',
    subtitle: 'FastAPI Booking Engine + Redis Distributed Lock + Razorpay HMAC Verification',
    language: 'python',
    code: `# ============================================================================
# FASTAPI BOOKING & PAYMENT ENGINE (app/services/booking_engine.py)
# Redis TTL Slot Hold + PostgreSQL SELECT FOR UPDATE + Razorpay Signature Check
# ============================================================================

import hmac
import hashlib
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, Header, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text
from sqlalchemy.exc import IntegrityError
import redis.asyncio as redis
import razorpay

router = APIRouter(prefix="/api/v1/bookings", tags=["Bookings & Payments"])

HOLD_TTL_SECONDS = 300  # 5-minute checkout lock in Redis & PostgreSQL
GST_RATE = 0.18         # 18% GST calculated strictly on server

async def acquire_redis_slot_locks(redis_client: redis.Redis, pitch_id: str, date_str: str, slots: list[str], user_id: str):
    """Atomically locks requested slots in Redis using SET NX EX 300."""
    acquired_keys = []
    try:
        for slot in slots:
            lock_key = f"hold:pitch:{pitch_id}:{date_str}:{slot}"
            locked = await redis_client.set(lock_key, user_id, nx=True, ex=HOLD_TTL_SECONDS)
            if not locked:
                current_holder = await redis_client.get(lock_key)
                if current_holder and current_holder.decode() != user_id:
                    raise HTTPException(
                        status_code=status.HTTP_409_CONFLICT,
                        detail=f"Slot {slot} is currently held in checkout by another player."
                    )
            acquired_keys.append(lock_key)
        return acquired_keys
    except Exception:
        for k in acquired_keys:
            await redis_client.delete(k)
        raise

@router.post("/initiate-hold", status_code=status.HTTP_201_CREATED)
async def initiate_slot_hold(
    payload: dict,
    db: AsyncSession = Depends(get_db),
    redis_client: redis.Redis = Depends(get_redis),
    current_user = Depends(get_current_user)
):
    # 1. Acquire fast Redis distributed lock (5 min TTL)
    await acquire_redis_slot_locks(
        redis_client, payload["pitch_id"], payload["date"], payload["slots"], str(current_user.id)
    )

    # 2. Begin Serializable/Row-Locked DB Transaction & calculate server-side pricing
    async with db.begin():
        pitch_stmt = select(Pitch).where(Pitch.id == payload["pitch_id"]).with_for_update()
        pitch = (await db.execute(pitch_stmt)).scalar_one_or_none()
        if not pitch or not pitch.is_active:
            raise HTTPException(status_code=404, detail="Pitch unavailable")

        base_inr = sum(
            pitch.peak_price_inr if int(s.split(":")[0]) >= 18 else pitch.base_price_inr
            for s in payload["slots"]
        )
        discount_inr = await calculate_coupon_discount(db, payload.get("coupon_code"), base_inr)
        taxable_inr = max(base_inr - discount_inr, 0)
        gst_inr = round(taxable_inr * GST_RATE)
        convenience_inr = 49
        total_paise = (taxable_inr + gst_inr + convenience_inr) * 100

        # 3. Create Razorpay Order via Server SDK
        rzp_order = rzp_client.order.create({
            "amount": total_paise,
            "currency": "INR",
            "receipt": f"ARENA_{int(datetime.now().timestamp())}",
            "payment_capture": 1
        })

        try:
            booking = Booking(
                user_id=current_user.id,
                pitch_id=pitch.id,
                booking_date=payload["date"],
                slot_time=build_tstzrange(payload["date"], payload["slots"]),
                base_amount_paise=base_inr * 100,
                discount_paise=discount_inr * 100,
                gst_paise=gst_inr * 100,
                convenience_fee_paise=convenience_inr * 100,
                total_payable_paise=total_paise,
                booking_status="HOLD_PENDING",
                payment_status="PENDING",
                hold_expires_at=datetime.now(timezone.utc) + timedelta(seconds=HOLD_TTL_SECONDS),
                razorpay_order_id=rzp_order["id"]
            )
            db.add(booking)
            await db.flush()
        except IntegrityError:
            # Caught by PostgreSQL GiST exclusion constraint 'no_overlapping_pitch_bookings'
            raise HTTPException(status_code=409, detail="Slot already booked by a concurrent transaction.")

    return {"booking_id": booking.id, "razorpay_order_id": rzp_order["id"], "amount_paise": total_paise}

@router.post("/webhooks/razorpay")
async def razorpay_webhook_handler(
    request: Request,
    x_razorpay_signature: str = Header(None),
    db: AsyncSession = Depends(get_db)
):
    """Idempotent Razorpay Webhook Handler with HMAC-SHA256 verification."""
    raw_body = await request.body()
    expected_sig = hmac.new(
        settings.RAZORPAY_WEBHOOK_SECRET.encode(),
        raw_body,
        hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(expected_sig, x_razorpay_signature or ""):
        raise HTTPException(status_code=400, detail="Invalid Razorpay webhook signature")

    event = await request.json()
    event_id = request.headers.get("x-razorpay-event-id")

    # Idempotency check: ignore duplicate webhook deliveries
    async with db.begin():
        exists = await db.execute(select(WebhookEvent).where(WebhookEvent.event_id == event_id))
        if exists.scalar_one_or_none():
            return {"status": "duplicate_ignored"}

        db.add(WebhookEvent(event_id=event_id, payload=event))
        if event["event"] == "payment.captured":
            order_id = event["payload"]["payment"]["entity"]["order_id"]
            booking = (await db.execute(
                select(Booking).where(Booking.razorpay_order_id == order_id).with_for_update()
            )).scalar_one()
            booking.booking_status = "CONFIRMED"
            booking.payment_status = "CAPTURED"
    return {"status": "ok"}`
  },
  pytest: {
    title: '03_test_concurrency_and_payments.py',
    subtitle: 'Pytest Async Concurrency Suite (10 Simultaneous Checkout Requests)',
    language: 'python',
    code: `# ============================================================================
# AUTOMATED CONCURRENCY & PAYMENT INTEGRITY TESTS (tests/test_concurrency.py)
# Verifies zero double-bookings when 10 players tap 'Book Now' at the exact ms
# ============================================================================

import asyncio
import hmac
import hashlib
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_10_concurrent_slot_booking_attempts_only_one_succeeds(async_client: AsyncClient, test_pitch, player_tokens):
    """
    Fires 10 simultaneous POST /api/v1/bookings/initiate-hold requests for the
    exact same pitch, date (2026-10-16), and prime slot (19:00 - 20:00).
    Asserts HTTP 201 for exactly 1 player and HTTP 409 Conflict for the other 9.
    """
    payload = {
        "pitch_id": str(test_pitch.id),
        "date": "2026-10-16",
        "slots": ["19:00"],
        "coupon_code": "ARENA200"
    }

    async def attempt_booking(token: str):
        return await async_client.post(
            "/api/v1/bookings/initiate-hold",
            json=payload,
            headers={"Authorization": f"Bearer {token}"}
        )

    responses = await asyncio.gather(*(attempt_booking(t) for t in player_tokens[:10]))
    status_codes = [r.status_code for r in responses]

    assert status_codes.count(201) == 1, "Exactly ONE player must acquire the slot hold"
    assert status_codes.count(409) == 9, "All other 9 concurrent requests must be rejected with 409 Conflict"

@pytest.mark.asyncio
async def test_idempotent_razorpay_webhook_and_signature_verification(async_client: AsyncClient, held_booking):
    webhook_body = f'{{"event":"payment.captured","payload":{{"payment":{{"entity":{{"order_id":"{held_booking.razorpay_order_id}"}}}}}}}}'.encode()
    valid_sig = hmac.new(b"test_webhook_secret", webhook_body, hashlib.sha256).hexdigest()

    # 1. Tampered signature must fail with 400
    bad_res = await async_client.post(
        "/api/v1/bookings/webhooks/razorpay",
        content=webhook_body,
        headers={"X-Razorpay-Signature": "deadbeef_invalid", "X-Razorpay-Event-Id": "evt_001"}
    )
    assert bad_res.status_code == 400

    # 2. Valid webhook confirms booking; duplicate replay returns duplicate_ignored
    res1 = await async_client.post(
        "/api/v1/bookings/webhooks/razorpay",
        content=webhook_body,
        headers={"X-Razorpay-Signature": valid_sig, "X-Razorpay-Event-Id": "evt_001"}
    )
    res2 = await async_client.post(
        "/api/v1/bookings/webhooks/razorpay",
        content=webhook_body,
        headers={"X-Razorpay-Signature": valid_sig, "X-Razorpay-Event-Id": "evt_001"}
    )
    assert res1.json()["status"] == "ok"
    assert res2.json()["status"] == "duplicate_ignored"`
  },
  reactnative: {
    title: '04_Expo_SlotCheckoutScreen.tsx',
    subtitle: 'React Native (Expo + TypeScript) Mobile Checkout & Razorpay SDK Screen',
    language: 'tsx',
    code: `// ============================================================================
// EXPO REACT NATIVE + TYPESCRIPT SCREEN (src/screens/SlotCheckoutScreen.tsx)
// Handles real-time Redis TTL countdown & Razorpay Native Checkout Sheet
// ============================================================================

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { api } from '../services/api';

export const SlotCheckoutScreen = ({ route, navigation }: any) => {
  const { pitchId, date, selectedSlots, couponCode } = route.params;
  const [holdData, setHoldData] = useState<any>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(300);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const acquireHold = async () => {
      try {
        const res = await api.post('/v1/bookings/initiate-hold', {
          pitch_id: pitchId,
          date,
          slots: selectedSlots,
          coupon_code: couponCode,
        });
        setHoldData(res.data);
        setLoading(false);
        timer = setInterval(() => {
          setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
      } catch (err: any) {
        navigation.goBack();
      }
    };
    acquireHold();
    return () => clearInterval(timer);
  }, []);

  const handleRazorpayPay = async () => {
    const options = {
      description: 'Arena AI Verified Slot Booking',
      image: 'https://arenaai.in/logo.png',
      currency: 'INR',
      key: process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID!,
      amount: holdData.amount_paise,
      name: 'Arena AI Sports Tech Pvt Ltd',
      order_id: holdData.razorpay_order_id,
      theme: { color: '#22C55E' },
    };

    const paymentData = await RazorpayCheckout.open(options);
    // Verify cryptographic signature strictly on FastAPI backend
    await api.post('/v1/bookings/verify-payment', {
      booking_id: holdData.booking_id,
      razorpay_order_id: paymentData.razorpay_order_id,
      razorpay_payment_id: paymentData.razorpay_payment_id,
      razorpay_signature: paymentData.razorpay_signature,
    });
    navigation.replace('BookingReceipt', { bookingId: holdData.booking_id });
  };

  if (loading) return <ActivityIndicator size="large" color="#22C55E" />;

  return (
    <View style={styles.container}>
      <Text style={styles.timerBadge}>
        Redis Hold Active: {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
      </Text>
      <TouchableOpacity style={styles.payButton} onPress={handleRazorpayPay}>
        <Text style={styles.payText}>Pay ₹{(holdData.amount_paise / 100).toLocaleString('en-IN')} via Razorpay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#030712', padding: 20, justifyContent: 'center' },
  timerBadge: { color: '#22C55E', fontSize: 16, fontWeight: '700', marginBottom: 20 },
  payButton: { backgroundColor: '#22C55E', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  payText: { color: '#030712', fontSize: 16, fontWeight: '800' },
});`
  }
};

// ============================================================================
// HELPER UTILITIES
// ============================================================================

const formatINR = (amount) => {
  return '₹' + Number(amount || 0).toLocaleString('en-IN');
};

const generateCryptoHex = (seedStr) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  const base = (h >>> 0).toString(16).padStart(8, '0');
  return `${base}e94a7c21b08f3d6e${base}91a4c8d207f53e1a${base}`;
};

// ============================================================================
// GEMINI LLM API HELPER (EXPONENTIAL BACKOFF + SEARCH GROUNDING + JSON SCHEMA)
// ============================================================================

const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = 'gemini-flash-lite-latest';

async function callGeminiAPI({
  userPrompt,
  systemPrompt = 'You are Arena AI, an elite sports concierge, match tactician, and facility analytics AI.',
  useSearchGrounding = false,
  responseSchema = null
}) {
  // 1. Try Backend Proxy with auto model fallback and search grounding recovery
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userPrompt, systemPrompt, responseSchema, useSearchGrounding })
    });
    if (res.ok) {
      const data = await res.json();
      return {
        text: data.text,
        parsedJson: data.parsedJson,
        sources: data.sources || []
      };
    }
  } catch (backendErr) {
    console.warn('[Arena AI] Backend proxy unavailable, attempting direct Google Gemini API call:', backendErr);
  }

  // 2. Direct client call with user's verified Gemini API key
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    }
  };

  if (responseSchema) {
    payload.generationConfig = {
      responseMimeType: 'application/json',
      responseSchema
    };
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errText}`);
  }

  const result = await response.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Empty response from Gemini API');
  }

  return {
    text,
    parsedJson: responseSchema ? JSON.parse(text) : null,
    sources: []
  };
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Persistent Auth State from SQLite & localStorage
  const [authUser, setAuthUser] = useState(() => {
    try {
      const saved = localStorage.getItem('arena_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Top-level Role/Portal mode: 'PLAYER' | 'OWNER' | 'ADMIN' | 'ARCHITECTURE'
  const [portalMode, setPortalMode] = useState(() => {
    try {
      const saved = localStorage.getItem('arena_auth_user');
      if (saved) {
        const u = JSON.parse(saved);
        return u.role === 'OWNER' ? 'OWNER' : u.role === 'ADMIN' ? 'ADMIN' : 'PLAYER';
      }
    } catch {}
    return 'PLAYER';
  });

  // Player Bottom Navigation Tab: 'HOME' | 'EXPLORE' | 'COMMUNITY' | 'BOOKINGS' | 'PROFILE'
  const [playerTab, setPlayerTab] = useState('HOME');

  // Active logged-in user
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUserId, setCurrentUserId] = useState(() => {
    try {
      const saved = localStorage.getItem('arena_auth_user');
      return saved ? JSON.parse(saved).id : 'usr_rohan_01';
    } catch {
      return 'usr_rohan_01';
    }
  });

  const currentUser = useMemo(
    () => authUser || users.find((u) => u.id === currentUserId) || users[0],
    [authUser, users, currentUserId]
  );

  // Auth Form State (Login / Register)
  const [authTab, setAuthTab] = useState('LOGIN'); // 'LOGIN' | 'REGISTER'
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState('PLAYER');
  const [registerCity, setRegisterCity] = useState('Nagpur');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerSports, setRegisterSports] = useState(['Football']);
  const [authLoading, setAuthLoading] = useState(false);
  const [personaSwitcherOpen, setPersonaSwitcherOpen] = useState(false);

  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!loginEmail || !loginPassword) {
      showToast('Please enter both email and password.', 'warning');
      return;
    }
    setAuthLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Login failed. Please check credentials.', 'error');
        return;
      }
      setAuthUser(data.user);
      localStorage.setItem('arena_auth_user', JSON.stringify(data.user));
      setPortalMode(data.user.role === 'OWNER' ? 'OWNER' : data.user.role === 'ADMIN' ? 'ADMIN' : 'PLAYER');
      setCurrentUserId(data.user.id);
      showToast(`Welcome back, ${data.user.name}! Logged in as ${data.user.role}.`, 'success');
    } catch (err) {
      showToast('Login server error. Please try again.', 'error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      showToast('Please fill all required registration fields.', 'warning');
      return;
    }
    setAuthLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
          role: registerRole,
          city: registerCity,
          phone: registerPhone,
          preferredSports: registerSports
        })
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Registration failed.', 'error');
        return;
      }
      setAuthUser(data.user);
      localStorage.setItem('arena_auth_user', JSON.stringify(data.user));
      setPortalMode(data.user.role === 'OWNER' ? 'OWNER' : data.user.role === 'ADMIN' ? 'ADMIN' : 'PLAYER');
      setCurrentUserId(data.user.id);
      showToast(`Account created! Welcome to Arena AI, ${data.user.name}.`, 'success');
    } catch (err) {
      showToast('Registration server error. Please try again.', 'error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail, demoPassword) => {
    setAuthLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demoEmail, password: demoPassword })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setAuthUser(data.user);
        localStorage.setItem('arena_auth_user', JSON.stringify(data.user));
        setPortalMode(data.user.role === 'OWNER' ? 'OWNER' : data.user.role === 'ADMIN' ? 'ADMIN' : 'PLAYER');
        setCurrentUserId(data.user.id);
        setPersonaSwitcherOpen(false);
        showToast(`Signed in as ${data.user.name} (${data.user.role})!`, 'success');
      } else {
        showToast('Demo login error', 'error');
      }
    } catch (e) {
      showToast('Demo login error', 'error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.removeItem('arena_auth_user');
    setPersonaSwitcherOpen(false);
    showToast('Signed out successfully.', 'info');
  };

  // Global Application State
  const [selectedCity, setSelectedCity] = useState('Nagpur');
  const [selectedSport, setSelectedSport] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState(3000);
  const [onlyFloodlights, setOnlyFloodlights] = useState(false);
  const [exploreViewMode, setExploreViewMode] = useState('SPLIT'); // 'LIST' | 'MAP' | 'SPLIT'

  const [turfs, setTurfs] = useState(INITIAL_TURFS);
  const [favorites, setFavorites] = useState(['turf_ngp_01', 'turf_ngp_03']);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [matches, setMatches] = useState(INITIAL_MATCHES);
  const [communities, setCommunities] = useState(INITIAL_COMMUNITIES);
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // Blocked maintenance slots & external concurrent holds
  // Format key: `${pitchId}_${date}_${slotId}`
  const [maintenanceBlocks, setMaintenanceBlocks] = useState({
    'pitch_ngp_1a_2026-10-16_16:00': 'Roller & Brushing Maintenance',
    'pitch_ngp_2a_2026-10-16_17:00': 'Floodlight Bulb Upgrade'
  });

  // Active Turf Detail Modal & Slot Hold State
  const [activeTurfId, setActiveTurfId] = useState(null);
  const [selectedPitchId, setSelectedPitchId] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2026-10-16');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [holdTimerSeconds, setHoldTimerSeconds] = useState(0);
  const [couponInput, setCouponInput] = useState('ARENA200');
  const [appliedCoupon, setAppliedCoupon] = useState(COUPONS.ARENA200);
  const [squadSplitCount, setSquadSplitCount] = useState(10);

  // Concurrency Test Log inside Booking Modal
  const [concurrencyLogs, setConcurrencyLogs] = useState([]);

  // Razorpay Checkout Modal State
  const [razorpayModalOpen, setRazorpayModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiApp, setUpiApp] = useState('GPay');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Digital Receipt Modal State
  const [activeReceiptBooking, setActiveReceiptBooking] = useState(null);

  // Host Match Modal State
  const [hostMatchModalOpen, setHostMatchModalOpen] = useState(false);
  const [newMatchForm, setNewMatchForm] = useState({
    title: 'Late Night 6v6 Turf Showdown',
    bookingId: 'BK-2026-8841',
    skillLevel: 'Intermediate',
    format: '6 vs 6',
    maxPlayers: 12,
    feePerPlayer: 250,
    approvalRequired: false
  });

  // Notifications & Toasts
  const [toast, setToast] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'Booking Confirmed (#BK-2026-8841)', desc: 'Strikerz Pro Arena Pitch A locked for Oct 16, 7:00 PM.', time: '10m ago', unread: true },
    { id: 'n2', title: 'Match Almost Full (12/14)', desc: '2 spots left in Friday Floodlight 7v7 Pickup.', time: '1h ago', unread: true }
  ]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  // Admin & Audit Logs
  const [platformCommission, setPlatformCommission] = useState(8.0);
  const [auditLogs, setAuditLogs] = useState([
    { id: 'aud_1', time: '14:38:12 IST', actor: 'SYSTEM_WEBHOOK', action: 'RAZORPAY_SIGNATURE_VERIFIED', target: 'order_P9xK72mLp091Qa', status: 'SUCCESS' },
    { id: 'aud_2', time: '14:21:05 IST', actor: 'REDIS_LOCK_ENGINE', action: 'ACQUIRE_SLOT_TTL_300S', target: 'hold:pitch:pitch_ngp_1a:2026-10-16:19:00', status: 'LOCKED' },
    { id: 'aud_3', time: '13:55:40 IST', actor: 'ADMIN_SUPER', action: 'VERIFY_FACILITY_KYC', target: 'Strikerz Pro Arena (Nagpur)', status: 'APPROVED' }
  ]);

  // Code Inspector Tab state
  const [activeCodeTab, setActiveCodeTab] = useState('postgres');
  const [copiedCode, setCopiedCode] = useState(false);

  // SQLite Real Database Connection & Live Sync
  const [sqliteConnected, setSqliteConnected] = useState(false);
  const [dbMetrics, setDbMetrics] = useState(null);

  useEffect(() => {
    async function syncWithSQLiteDatabase() {
      try {
        const [hRes, tRes, bRes, mRes, pRes, maintRes, aRes] = await Promise.all([
          fetch('/api/health'),
          fetch('/api/turfs'),
          fetch('/api/bookings'),
          fetch('/api/matches'),
          fetch('/api/posts'),
          fetch('/api/maintenance'),
          fetch('/api/audit-logs')
        ]);

        if (hRes.ok) {
          const hData = await hRes.json();
          setSqliteConnected(true);
          setDbMetrics(hData.metrics);
        }
        if (tRes.ok) {
          const tData = await tRes.json();
          if (Array.isArray(tData) && tData.length > 0) setTurfs(tData);
        }
        if (bRes.ok) {
          const bData = await bRes.json();
          if (Array.isArray(bData) && bData.length > 0) setBookings(bData);
        }
        if (mRes.ok) {
          const mData = await mRes.json();
          if (Array.isArray(mData) && mData.length > 0) setMatches(mData);
        }
        if (pRes.ok) {
          const pData = await pRes.json();
          if (Array.isArray(pData) && pData.length > 0) setPosts(pData);
        }
        if (maintRes.ok) {
          const maintData = await maintRes.json();
          if (maintData && typeof maintData === 'object') setMaintenanceBlocks(maintData);
        }
        if (aRes.ok) {
          const aData = await aRes.json();
          if (Array.isArray(aData) && aData.length > 0) setAuditLogs(aData);
        }
      } catch (err) {
        console.warn('[Arena SQLite] Could not reach backend server, operating with local state fallback:', err);
      }
    }
    syncWithSQLiteDatabase();
  }, []);

  // ============================================================================
  // GEMINI AI FEATURE STATES
  // ============================================================================
  const [aiConciergePrompt, setAiConciergePrompt] = useState(
    'We are 12 friends in Nagpur looking for a floodlight 7v7 football turf tonight around 7 PM under ₹1,800/hr. Also check live Nagpur evening weather!'
  );
  const [aiConciergeLoading, setAiConciergeLoading] = useState(false);
  const [aiConciergeUseSearch, setAiConciergeUseSearch] = useState(true);
  const [aiConciergeResult, setAiConciergeResult] = useState(null);

  const [aiTeamSplitMatchId, setAiTeamSplitMatchId] = useState(null);
  const [aiTeamSplitLoading, setAiTeamSplitLoading] = useState(false);
  const [aiTeamSplitResults, setAiTeamSplitResults] = useState({});

  const [aiHypeLoading, setAiHypeLoading] = useState(false);

  const [aiOwnerInsightsLoading, setAiOwnerInsightsLoading] = useState(false);
  const [aiOwnerInsights, setAiOwnerInsights] = useState(null);

  const [aiPitchScoutLoading, setAiPitchScoutLoading] = useState(false);
  const [aiPitchScoutData, setAiPitchScoutData] = useState(null);

  const [aiCoachLoading, setAiCoachLoading] = useState(false);
  const [aiCoachPlan, setAiCoachPlan] = useState(null);

  const [aiAdminAuditLoading, setAiAdminAuditLoading] = useState(false);
  const [aiAdminAuditReport, setAiAdminAuditReport] = useState(null);

  // Helper to trigger clean toast notifications (No alert/confirm!)
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Redis TTL Countdown Effect when slots are selected
  useEffect(() => {
    if (selectedSlots.length === 0) {
      setHoldTimerSeconds(0);
      return;
    }
    setHoldTimerSeconds(300); // 5 minutes Redis TTL
    const interval = setInterval(() => {
      setHoldTimerSeconds((prev) => {
        if (prev <= 1) {
          setSelectedSlots([]);
          showToast('Redis 5-minute slot hold expired! Slots released back to live pool.', 'warning');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedSlots.length, selectedPitchId, selectedDate]);

  // Filtered Turfs for Player Discovery
  const filteredTurfs = useMemo(() => {
    return turfs.filter((t) => {
      const matchCity = selectedCity === 'All Cities' || t.city === selectedCity;
      const matchSport = selectedSport === 'All' || t.sports.includes(selectedSport);
      const matchSearch =
        !searchQuery.trim() ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.sports.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchPrice = t.basePrice <= maxPriceFilter;
      const matchLights = !onlyFloodlights || t.amenities.some((a) => a.toLowerCase().includes('Light') || a.toLowerCase().includes('floodlight') || a.toLowerCase().includes('dome'));
      return matchCity && matchSport && matchSearch && matchPrice && matchLights;
    });
  }, [turfs, selectedCity, selectedSport, searchQuery, maxPriceFilter, onlyFloodlights]);

  const activeTurf = useMemo(
    () => turfs.find((t) => t.id === activeTurfId) || null,
    [turfs, activeTurfId]
  );

  const activePitch = useMemo(() => {
    if (!activeTurf) return null;
    return activeTurf.pitches.find((p) => p.id === selectedPitchId) || activeTurf.pitches[0];
  }, [activeTurf, selectedPitchId]);

  // Open Turf Booking Drawer
  const openTurfDetail = (turf) => {
    setActiveTurfId(turf.id);
    setSelectedPitchId(turf.pitches[0]?.id || null);
    setSelectedSlots([]);
    setConcurrencyLogs([]);
    setAiPitchScoutData(null);
  };

  // Check if a specific slot on a pitch + date is already booked or blocked
  const getSlotStatus = (pitchId, dateStr, slotId) => {
    if (!pitchId) return 'AVAILABLE';
    const maintKey = `${pitchId}_${dateStr}_${slotId}`;
    if (maintenanceBlocks[maintKey]) return 'MAINTENANCE';

    const isBooked = bookings.some(
      (b) =>
        b.pitchId === pitchId &&
        b.date === dateStr &&
        b.bookingStatus === 'CONFIRMED' &&
        b.slots.includes(slotId)
    );
    if (isBooked) return 'BOOKED';

    if (selectedSlots.includes(slotId)) return 'HELD_BY_ME';
    return 'AVAILABLE';
  };

  // Toggle Slot Selection (Acquires simulated Redis lock)
  const toggleSlotSelection = (slotId) => {
    if (!activePitch) return;
    const status = getSlotStatus(activePitch.id, selectedDate, slotId);
    if (status === 'BOOKED' || status === 'MAINTENANCE') {
      showToast(`Slot ${slotId} is unavailable (${status}).`, 'error');
      return;
    }

    setSelectedSlots((prev) => {
      const exists = prev.includes(slotId);
      const next = exists ? prev.filter((s) => s !== slotId) : [...prev, slotId].sort();
      if (!exists) {
        const lockKey = `hold:pitch:${activePitch.id}:${selectedDate}:${slotId}`;
        setAuditLogs((logs) => [
          {
            id: `aud_${Date.now()}`,
            time: new Date().toLocaleTimeString('en-IN') + ' IST',
            actor: currentUser.handle,
            action: 'REDIS_SET_NX_EX_300',
            target: lockKey,
            status: 'LOCKED'
          },
          ...logs
        ]);
      }
      return next;
    });
  };

  // Server-Side Price Calculation Simulation
  const pricingSummary = useMemo(() => {
    if (!activePitch || selectedSlots.length === 0) {
      return { baseTotal: 0, discount: 0, taxable: 0, gst: 0, convenienceFee: 0, finalTotal: 0, perPlayer: 0 };
    }
    const baseTotal = selectedSlots.reduce((acc, slotId) => {
      const slotObj = TIME_SLOTS.find((s) => s.id === slotId);
      const price = slotObj?.isPeak ? activePitch.peakPrice : activePitch.basePrice;
      return acc + price;
    }, 0);

    let discount = 0;
    if (appliedCoupon && baseTotal >= appliedCoupon.minAmount) {
      if (appliedCoupon.discountType === 'FLAT') {
        discount = appliedCoupon.value;
      } else if (appliedCoupon.discountType === 'PERCENT') {
        discount = Math.min(Math.round((baseTotal * appliedCoupon.value) / 100), appliedCoupon.maxCap || 500);
      }
    }

    const taxable = Math.max(baseTotal - discount, 0);
    const gst = Math.round(taxable * 0.18); // 18% GST
    const convenienceFee = 49;
    const finalTotal = taxable + gst + convenienceFee;
    const perPlayer = Math.ceil(finalTotal / Math.max(squadSplitCount, 1));

    return { baseTotal, discount, taxable, gst, convenienceFee, finalTotal, perPlayer };
  }, [activePitch, selectedSlots, appliedCoupon, squadSplitCount]);

  // Apply Coupon Handler
  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(COUPONS[code]);
      showToast(`Coupon ${code} applied! Server recalculated discount.`, 'success');
    } else {
      setAppliedCoupon(null);
      showToast(`Invalid coupon code "${code}". Try ARENA200, STRIKE50, or NAGPUR10.`, 'error');
    }
  };

  // Simulate Concurrent User Double-Booking Attack
  const simulateConcurrentAttempt = () => {
    if (!activePitch || selectedSlots.length === 0) {
      showToast('Select at least 1 time slot first to test Redis + PostgreSQL concurrency protection!', 'warning');
      return;
    }
    const targetSlot = selectedSlots[0];
    const lockKey = `hold:pitch:${activePitch.id}:${selectedDate}:${targetSlot}`;
    const newEntry = {
      id: `race_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-IN'),
      attacker: 'usr_concurrent_99 (@rahul_kicker)',
      slot: targetSlot,
      redisResult: `REJECTED (Key ${lockKey} locked by ${currentUser.id}, TTL ${holdTimerSeconds}s remaining)`,
      pgConstraint: 'EXCLUDE USING gist (pitch_id WITH =, slot_time WITH &&) -> HTTP 409 CONFLICT'
    };
    setConcurrencyLogs((prev) => [newEntry, ...prev]);
    setAuditLogs((logs) => [
      {
        id: `aud_${Date.now()}`,
        time: new Date().toLocaleTimeString('en-IN') + ' IST',
        actor: '@rahul_kicker',
        action: 'CONCURRENT_BOOKING_BLOCKED_409',
        target: lockKey,
        status: 'BLOCKED'
      },
      ...logs
    ]);
    showToast(`Blocked concurrent booking attempt on ${targetSlot} with HTTP 409 Conflict!`, 'success');
  };

  // Complete Razorpay Checkout & Cryptographic Signature Verification
  const handleCompleteRazorpayPayment = () => {
    if (!activeTurf || !activePitch || selectedSlots.length === 0) return;
    setPaymentProcessing(true);

    setTimeout(() => {
      const orderId = `order_Rzp${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      const paymentId = `pay_Rzp${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      const signature = generateCryptoHex(`${orderId}|${paymentId}`);
      const bookingId = `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const slotLabels = selectedSlots.map(
        (sId) => TIME_SLOTS.find((t) => t.id === sId)?.label || sId
      );

      const newBooking = {
        id: bookingId,
        userId: currentUser.id,
        userName: currentUser.name,
        turfId: activeTurf.id,
        turfName: activeTurf.name,
        city: activeTurf.city,
        pitchId: activePitch.id,
        pitchName: activePitch.name,
        sport: activePitch.sport,
        date: selectedDate,
        slots: [...selectedSlots],
        slotLabels,
        baseAmount: pricingSummary.baseTotal,
        discount: pricingSummary.discount,
        gstAmount: pricingSummary.gst,
        convenienceFee: pricingSummary.convenienceFee,
        totalPaid: pricingSummary.finalTotal,
        couponUsed: appliedCoupon?.code || null,
        bookingStatus: 'CONFIRMED',
        paymentStatus: 'CAPTURED',
        refundStatus: 'NONE',
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
        createdAt: 'Just now',
        linkedMatchId: null
      };

      setBookings((prev) => [newBooking, ...prev]);
      setAuditLogs((logs) => [
        {
          id: `aud_${Date.now()}`,
          time: new Date().toLocaleTimeString('en-IN') + ' IST',
          actor: 'RAZORPAY_WEBHOOK',
          action: 'HMAC_SHA256_VERIFIED_CAPTURED',
          target: `${bookingId} (${formatINR(pricingSummary.finalTotal)})`,
          status: 'SUCCESS'
        },
        ...logs
      ]);

      // Persist to real SQLite database
      fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      })
        .then(async (res) => {
          if (!res.ok) {
            const errData = await res.json();
            showToast(errData.error || 'Conflict detected in SQLite database', 'error');
          } else {
            console.log('[Arena SQLite] Booking successfully written to arena.sqlite');
          }
        })
        .catch((err) => console.warn('[Arena SQLite] Booking persist error:', err));

      setPaymentProcessing(false);
      setRazorpayModalOpen(false);
      setSelectedSlots([]);
      setActiveTurfId(null);
      setActiveReceiptBooking(newBooking);
      setPlayerTab('BOOKINGS');
      showToast(`Booking ${bookingId} Confirmed! Saved to SQLite database.`, 'success');
    }, 1100);
  };

  // Cancel Booking & Trigger Automated Refund State Machine
  const handleCancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          bookingStatus: 'CANCELLED',
          refundStatus: 'PROCESSED'
        };
      })
    );
    if (activeReceiptBooking?.id === bookingId) {
      setActiveReceiptBooking((prev) => ({
        ...prev,
        bookingStatus: 'CANCELLED',
        refundStatus: 'PROCESSED'
      }));
    }

    // Persist cancellation to SQLite database
    fetch(`/api/bookings/${bookingId}/cancel`, { method: 'PATCH' }).catch((e) =>
      console.warn('[Arena SQLite] Cancel persist error:', e)
    );

    showToast(`Booking ${bookingId} cancelled. Updated in SQLite database.`, 'warning');
  };

  // Join or Request Match Participation (Concurrency & Waitlist Aware)
  const handleJoinMatch = (matchId) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;
        const alreadyIn = m.participants.some((p) => p.id === currentUser.id);
        const alreadyWaitlisted = m.waitlist.some((w) => w.id === currentUser.id);
        const alreadyPending = m.pendingRequests.some((r) => r.id === currentUser.id);

        if (alreadyIn || alreadyWaitlisted || alreadyPending) {
          showToast('You are already registered or on the waitlist for this match!', 'warning');
          return m;
        }

        if (m.approvalRequired) {
          showToast('Host approval requested! Host will review your reliability score.', 'success');
          return {
            ...m,
            pendingRequests: [
              ...m.pendingRequests,
              { id: currentUser.id, name: currentUser.name, skill: currentUser.skillLevel, reliability: currentUser.reliabilityScore }
            ]
          };
        }

        if (m.participants.length >= m.maxPlayers) {
          showToast('Match is full! Added you to the Priority Auto-Waitlist.', 'warning');
          return {
            ...m,
            waitlist: [...m.waitlist, { id: currentUser.id, name: currentUser.name, skill: currentUser.skillLevel }]
          };
        }

        showToast(`Joined "${m.title}"! Spot confirmed.`, 'success');
        return {
          ...m,
          participants: [
            ...m.participants,
            { id: currentUser.id, name: currentUser.name, role: 'Player', skill: currentUser.skillLevel }
          ]
        };
      })
    );
  };

  // Approve Pending Match Player Request
  const handleApproveParticipant = (matchId, reqUser) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;
        return {
          ...m,
          pendingRequests: m.pendingRequests.filter((r) => r.id !== reqUser.id),
          participants: [...m.participants, { id: reqUser.id, name: reqUser.name, role: 'Player', skill: reqUser.skill }]
        };
      })
    );
    showToast(`Approved ${reqUser.name} into the match squad!`, 'success');
  };

  // Create New Match Linked to a Confirmed Booking
  const handleCreateLinkedMatch = (e) => {
    e.preventDefault();
    const chosenBooking = bookings.find(
      (b) => b.id === newMatchForm.bookingId && b.bookingStatus === 'CONFIRMED'
    );
    if (!chosenBooking) {
      showToast('Matches can only be linked to a CONFIRMED turf booking!', 'error');
      return;
    }

    const createdMatch = {
      id: `match_${Date.now()}`,
      title: newMatchForm.title,
      sport: chosenBooking.sport,
      city: chosenBooking.city,
      turfId: chosenBooking.turfId,
      turfName: chosenBooking.turfName,
      pitchName: chosenBooking.pitchName,
      linkedBookingId: chosenBooking.id,
      verifiedBooking: true,
      date: chosenBooking.date,
      timeLabel: chosenBooking.slotLabels.join(', '),
      skillLevel: newMatchForm.skillLevel,
      format: newMatchForm.format,
      feePerPlayer: Number(newMatchForm.feePerPlayer),
      maxPlayers: Number(newMatchForm.maxPlayers),
      hostId: currentUser.id,
      hostName: currentUser.name,
      approvalRequired: newMatchForm.approvalRequired,
      participants: [
        { id: currentUser.id, name: currentUser.name, role: 'Host', skill: currentUser.skillLevel }
      ],
      waitlist: [],
      pendingRequests: []
    };

    setMatches((prev) => [createdMatch, ...prev]);
    setHostMatchModalOpen(false);

    // Persist new match to SQLite
    fetch('/api/matches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createdMatch)
    }).catch((e) => console.warn('[Arena SQLite] Match persist error:', e));

    showToast(`Match hosted and saved to SQLite (Linked to #${chosenBooking.id})!`, 'success');
  };

  // Copy Code Blueprint
  const handleCopyBlueprint = () => {
    const codeText = CODE_BLUEPRINTS[activeCodeTab]?.code || '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeText);
    }
    setCopiedCode(true);
    showToast(`Copied ${CODE_BLUEPRINTS[activeCodeTab].title} to clipboard!`, 'success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // ============================================================================
  // GEMINI AI ACTION HANDLERS
  // ============================================================================

  // 1. AI Smart Turf Concierge & Live Weather Grounding
  const handleAskAiConcierge = async (customQuery) => {
    const queryToUse = typeof customQuery === 'string' ? customQuery : aiConciergePrompt;
    if (!queryToUse.trim()) {
      showToast('Please enter a question for the Arena AI Concierge!', 'warning');
      return;
    }
    setAiConciergeLoading(true);
    try {
      const cityTurfsContext = turfs
        .filter((t) => selectedCity === 'All Cities' || t.city === selectedCity)
        .map(
          (t) =>
            `- ${t.name} (${t.area}, ${t.city}): Sports=${t.sports.join('/')}, Base=₹${t.basePrice}/hr, Peak=₹${t.peakPrice}/hr, Rating=${t.rating}, Amenities=${t.amenities.join(', ')}`
        )
        .join('\n');

      const systemPrompt = `You are Arena AI Concierge for Indian sports players.
Available verified turfs in ${selectedCity}:
${cityTurfsContext}
Available coupons: ARENA200 (Flat ₹200 OFF above ₹1000), STRIKE50 (15% OFF up to ₹350), NAGPUR10 (Flat ₹150 OFF).
Provide a crisp, energetic, practical recommendation in 3-4 short bullet points with exact INR (₹) cost-split calculations, best coupon to apply, and weather/turf suitability advice.`;

      const res = await callGeminiAPI({
        userPrompt: queryToUse,
        systemPrompt,
        useSearchGrounding: aiConciergeUseSearch
      });

      setAiConciergeResult({
        text: res.text,
        sources: res.sources || [],
        timestamp: new Date().toLocaleTimeString('en-IN')
      });
      showToast('Arena AI Concierge generated recommendations!', 'success');
    } catch (error) {
      showToast('Arena AI Concierge encountered a temporary issue. Please try again.', 'error');
    } finally {
      setAiConciergeLoading(false);
    }
  };

  // 2. AI Balanced Team Generator (Structured JSON Schema)
  const handleGenerateAiBalancedTeams = async (match) => {
    setAiTeamSplitMatchId(match.id);
    setAiTeamSplitLoading(true);
    try {
      const rosterList = match.participants
        .map((p, idx) => `${idx + 1}. ${p.name} (Skill: ${p.skill}, Role: ${p.role})`)
        .join('\n');

      const schema = {
        type: 'OBJECT',
        properties: {
          teamAlphaName: { type: 'STRING' },
          teamBetaName: { type: 'STRING' },
          balanceScore: { type: 'STRING' },
          teamAlpha: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                name: { type: 'STRING' },
                skill: { type: 'STRING' },
                suggestedPosition: { type: 'STRING' }
              },
              propertyOrdering: ['name', 'skill', 'suggestedPosition']
            }
          },
          teamBeta: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                name: { type: 'STRING' },
                skill: { type: 'STRING' },
                suggestedPosition: { type: 'STRING' }
              },
              propertyOrdering: ['name', 'skill', 'suggestedPosition']
            }
          },
          tacticalSummary: { type: 'STRING' }
        },
        propertyOrdering: [
          'teamAlphaName',
          'teamBetaName',
          'balanceScore',
          'teamAlpha',
          'teamBeta',
          'tacticalSummary'
        ]
      };

      const prompt = `Split the following ${match.participants.length} players for "${match.title}" (${match.sport}, Format: ${match.format}) at ${match.turfName} into two fair, skill-balanced teams. Assign each player a realistic tactical position for ${match.sport}.
Players:
${rosterList}`;

      const res = await callGeminiAPI({
        userPrompt: prompt,
        systemPrompt: 'You are an expert sports matchmaker. Always divide players into two equally balanced teams based on their skill levels (Pro, Intermediate, Beginner).',
        responseSchema: schema
      });

      if (res.parsedJson) {
        setAiTeamSplitResults((prev) => ({
          ...prev,
          [match.id]: res.parsedJson
        }));
        showToast(`AI balanced ${match.participants.length} players into two fair squads!`, 'success');
      }
    } catch (error) {
      showToast('Could not generate AI team split right now. Please retry.', 'error');
    } finally {
      setAiTeamSplitLoading(false);
    }
  };

  // 3. AI Match Hype & WhatsApp Invite Generator
  const handleGenerateMatchHypePost = async () => {
    setAiHypeLoading(true);
    try {
      const chosenBooking =
        bookings.find((b) => b.id === newMatchForm.bookingId) || bookings[0];
      const prompt = `Write a short, high-energy Indian sports community announcement (with a touch of friendly Hinglish and emojis) inviting players to join our pickup match:
- Match Title: ${newMatchForm.title}
- Sport: ${chosenBooking?.sport || 'Football'}
- Venue: ${chosenBooking?.turfName || 'Strikerz Pro Arena'} (${chosenBooking?.city || selectedCity})
- Date & Slots: ${chosenBooking?.date || selectedDate}, ${chosenBooking?.slotLabels?.join(' ') || '7:00 PM'}
- Verified Booking ID: #${chosenBooking?.id || 'BK-2026-8841'}
- Skill Level: ${newMatchForm.skillLevel}
- Split Fee: ₹${newMatchForm.feePerPlayer}/player for ${newMatchForm.maxPlayers} players max.
Keep it under 380 characters so it's ready to post on the Locker Room Feed and WhatsApp groups.`;

      const res = await callGeminiAPI({
        userPrompt: prompt,
        systemPrompt: 'You write catchy, authentic Indian turf sports announcements.'
      });

      const generatedPost = {
        id: `post_ai_${Date.now()}`,
        authorName: currentUser.name,
        authorHandle: currentUser.handle,
        authorCity: currentUser.city,
        sport: chosenBooking?.sport || 'Football',
        timeAgo: 'Just now • 🔥 Arena AI Drafted',
        content: res.text.trim(),
        linkedMatchId: 'match_101',
        likes: 1,
        likedByMe: true,
        comments: []
      };

      setPosts((prev) => [generatedPost, ...prev]);

      // Persist AI drafted post to SQLite
      fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generatedPost)
      }).catch((e) => console.warn('[Arena SQLite] Post persist error:', e));

      showToast('🔥 Arena AI drafted & saved your Match Hype invite to SQLite Locker Room Feed!', 'success');
    } catch (error) {
      showToast('Failed to generate AI match announcement.', 'error');
    } finally {
      setAiHypeLoading(false);
    }
  };

  // 4. AI Turf Owner Revenue & Dynamic Pricing Strategist (Structured JSON)
  const handleGenerateOwnerAiStrategy = async (ownerTurf) => {
    setAiOwnerInsightsLoading(true);
    try {
      const schema = {
        type: 'OBJECT',
        properties: {
          projectedWeeklyUpsideInr: { type: 'NUMBER' },
          headlineSummary: { type: 'STRING' },
          recommendations: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                slotWindow: { type: 'STRING' },
                actionTitle: { type: 'STRING' },
                suggestedPriceInr: { type: 'NUMBER' },
                SuggestedCoupon: { type: 'STRING' },
                rationale: { type: 'STRING' }
              },
              propertyOrdering: ['slotWindow', 'actionTitle', 'suggestedPriceInr', 'SuggestedCoupon', 'rationale']
            }
          }
        },
        propertyOrdering: ['projectedWeeklyUpsideInr', 'headlineSummary', 'recommendations']
      };

      const pitchDetails = ownerTurf.pitches
        .map((p) => `${p.name} (${p.sport}): Off-Peak ₹${p.basePrice}/hr, Peak ₹${p.peakPrice}/hr`)
        .join('; ');

      const prompt = `Analyze this Indian sports facility and recommend 3 concrete dynamic pricing & promotional actions:
Facility: ${ownerTurf.name}, ${ownerTurf.area}, ${ownerTurf.city}
Pitches: ${pitchDetails}
Current Prime Occupancy (6 PM - 11 PM): 88.5%
Current Morning/Afternoon Occupancy (6 AM - 5 PM): 34.0%
Active Bookings Count: ${bookings.length}`;

      const res = await callGeminiAPI({
        userPrompt: prompt,
        systemPrompt: 'You are a revenue optimization AI for Indian sports turf owners. Provide realistic INR pricing recommendations.',
        responseSchema: schema
      });

      if (res.parsedJson) {
        setAiOwnerInsights(res.parsedJson);
        showToast('⚡ Arena AI Revenue Strategist generated dynamic pricing insights!', 'success');
      }
    } catch (error) {
      showToast('Could not generate AI Owner Insights right now.', 'error');
    } finally {
      setAiOwnerInsightsLoading(false);
    }
  };

  // 5. AI Pitch & Slot Scout + WhatsApp UPI Split Generator (Turf Checkout Modal)
  const handleRunAiPitchScout = async () => {
    if (!activeTurf || !activePitch) return;
    setAiPitchScoutLoading(true);
    try {
      const schema = {
        type: 'OBJECT',
        properties: {
          footwearRecommendation: { type: 'STRING' },
          lightingAndSurfaceVerdict: { type: 'STRING' },
          tacticalTipForDimensions: { type: 'STRING' },
          whatsappUpiSplitMessage: { type: 'STRING' }
        },
        propertyOrdering: [
          'footwearRecommendation',
          'lightingAndSurfaceVerdict',
          'tacticalTipForDimensions',
          'whatsappUpiSplitMessage'
        ]
      };

      const slotText =
        selectedSlots.length > 0
          ? selectedSlots.join(', ')
          : '19:00 (Prime Floodlight Window)';

      const prompt = `Provide a pre-booking scouting report and WhatsApp UPI split collection message for this Indian sports booking:
- Turf: ${activeTurf.name}, ${activeTurf.area}, ${activeTurf.city}
- Pitch: ${activePitch.name} (Sport: ${activePitch.sport}, Dimensions: ${activePitch.dimensions})
- Amenities: ${activeTurf.amenities.join(', ')}
- Date & Slots: ${selectedDate}, Slots: ${slotText}
- Total Payable: ₹${pricingSummary.finalTotal || activePitch.peakPrice} split among ${squadSplitCount} players (₹${pricingSummary.perPlayer || Math.ceil(activePitch.peakPrice / squadSplitCount)} per player).`;

      const res = await callGeminiAPI({
        userPrompt: prompt,
        systemPrompt:
          'You are an expert Indian turf specialist. Give practical footwear/equipment advice, tactical advice for the exact pitch dimensions, and a catchy Hinglish WhatsApp UPI split message.',
        responseSchema: schema
      });

      if (res.parsedJson) {
        setAiPitchScoutData(res.parsedJson);
        showToast('⚡ Arena AI Pitch Scout analyzed surface & generated UPI split message!', 'success');
      }
    } catch (error) {
      showToast('Could not run AI Pitch Scout right now.', 'error');
    } finally {
      setAiPitchScoutLoading(false);
    }
  };

  // 6. AI Personal Sports Coach & Progression Plan (Profile Tab)
  const handleGenerateAiCoachPlan = async () => {
    setAiCoachLoading(true);
    try {
      const schema = {
        type: 'OBJECT',
        properties: {
          playerArchetype: { type: 'STRING' },
          nextSkillMilestone: { type: 'STRING' },
          injuryPreventionTip: { type: 'STRING' },
          weeklyDrills: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                day: { type: 'STRING' },
                sportFocus: { type: 'STRING' },
                drillName: { type: 'STRING' },
                durationMins: { type: 'NUMBER' },
                keyBenefit: { type: 'STRING' }
              },
              propertyOrdering: ['day', 'sportFocus', 'drillName', 'durationMins', 'keyBenefit']
            }
          }
        },
        propertyOrdering: ['playerArchetype', 'nextSkillMilestone', 'injuryPreventionTip', 'weeklyDrills']
      };

      const prompt = `Create a personalized 3-session weekly turf training and injury-prevention plan for this Indian recreational athlete:
- Player: ${currentUser.name} (${currentUser.city})
- Current Skill Level: ${currentUser.skillLevel}
- Preferred Sports: ${currentUser.preferredSports.join(', ')}
- Matches Played: ${currentUser.matchesPlayed}, Reliability Score: ${currentUser.reliabilityScore}%`;

      const res = await callGeminiAPI({
        userPrompt: prompt,
        systemPrompt:
          'You are a high-performance Indian sports & turf fitness coach. Provide realistic artificial-turf knee/ankle care and skill drills.',
        responseSchema: schema
      });

      if (res.parsedJson) {
        setAiCoachPlan(res.parsedJson);
        showToast(`⚡ Arena AI Coach built a custom training plan for ${currentUser.name}!`, 'success');
      }
    } catch (error) {
      showToast('Could not generate AI Coach Plan right now.', 'error');
    } finally {
      setAiCoachLoading(false);
    }
  };

  // 7. AI Admin Security, Dispute & Audit Log Analyzer (Admin Control Center)
  const handleRunAdminAiAudit = async () => {
    setAiAdminAuditLoading(true);
    try {
      const schema = {
        type: 'OBJECT',
        properties: {
          securityHealthScore: { type: 'NUMBER' },
          executiveSummary: { type: 'STRING' },
          findings: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                category: { type: 'STRING' },
                severity: { type: 'STRING' },
                observation: { type: 'STRING' },
                recommendedAction: { type: 'STRING' }
              },
              propertyOrdering: ['category', 'severity', 'observation', 'recommendedAction']
            }
          }
        },
        propertyOrdering: ['securityHealthScore', 'executiveSummary', 'findings']
      };

      const logSnapshot = auditLogs
        .slice(0, 8)
        .map((l) => `[${l.time}] Actor=${l.actor} Action=${l.action} Target=${l.target} Status=${l.status}`)
        .join('\n');

      const bookingSnapshot = bookings
        .map((b) => `#${b.id}: ${b.turfName}, Status=${b.bookingStatus}, Pay=${b.paymentStatus}, Refund=${b.refundStatus}, Total=₹${b.totalPaid}`)
        .join('\n');

      const prompt = `Review the live Arena AI platform audit log and booking ledger below. Identify concurrency attack patterns, webhook verification health, and refund/dispute recommendations:
Audit Logs:
${logSnapshot}

Bookings Ledger:
${bookingSnapshot}`;

      const res = await callGeminiAPI({
        userPrompt: prompt,
        systemPrompt:
          'You are a Principal DevSecOps & Marketplace Risk AI Analyst for an Indian sports booking platform.',
        responseSchema: schema
      });

      if (res.parsedJson) {
        setAiAdminAuditReport(res.parsedJson);
        showToast('⚡ Arena AI Security & Dispute Auditor completed analysis!', 'success');
      }
    } catch (error) {
      showToast('Could not complete AI Admin Audit analysis right now.', 'error');
    } finally {
      setAiAdminAuditLoading(false);
    }
  };

  // ============================================================================
  // RENDER SUB-VIEWS FOR PLAYER APP (5 TABS: HOME, EXPLORE, COMMUNITY, BOOKINGS, PROFILE)
  // ============================================================================

  const renderPlayerHomeTab = () => {
    const myConfirmedBookings = bookings.filter((b) => b.bookingStatus === 'CONFIRMED');
    return (
      <div className="space-y-6 pb-24">
        {/* Hero Banner with Live City & Quick Filters */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-950 via-zinc-900 to-black border border-emerald-500/30 p-6 md:p-8 shadow-[0_0_50px_rgba(34,197,94,0.15)]">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute right-1/3 bottom-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-black tracking-wider uppercase shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                <Flame className="w-3.5 h-3.5 text-emerald-400 animate-bounce" /> INDIA'S #1 AI TURF & SQUAD PLATFORM
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase italic">
                DOMINATE THE PITCH IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{selectedCity}</span>
              </h1>
              <p className="text-zinc-400 text-sm font-medium">
                Instant Redis-locked turf slots, cryptographic Razorpay verification, and AI-powered match balancing.
              </p>
            </div>

            {/* Active Booking Mini-Card */}
            {myConfirmedBookings[0] && (
              <div
                onClick={() => setActiveReceiptBooking(myConfirmedBookings[0])}
                className="cursor-pointer group bg-zinc-900/90 hover:bg-zinc-900 border border-emerald-500/50 rounded-2xl p-4 min-w-[280px] transition-all shadow-xl hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between text-xs text-emerald-400 font-black mb-1">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> MATCH LOCKED
                  </span>
                  <QrCode className="w-4 h-4 group-hover:scale-110 transition-transform text-emerald-400" />
                </div>
                <p className="text-white font-black text-sm truncate uppercase">{myConfirmedBookings[0].turfName}</p>
                <p className="text-emerald-300 text-xs mt-0.5 font-semibold">{myConfirmedBookings[0].pitchName}</p>
                <div className="mt-2.5 pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-bold">{myConfirmedBookings[0].date} • {myConfirmedBookings[0].slots[0]}</span>
                  <span className="text-emerald-400 font-black flex items-center gap-1">Pass <ChevronRight className="w-3.5 h-3.5" /></span>
                </div>
              </div>
            )}
          </div>

          {/* Search & Sport Pills Bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search turfs in ${selectedCity} (e.g., Dharampeth, Box Cricket, Pickleball)...`}
                className="w-full pl-10 pr-4 py-3 bg-black/80 border border-zinc-800 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition shadow-inner"
              />
            </div>
            <button
              onClick={() => setPlayerTab('EXPLORE')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-black font-black text-sm flex items-center justify-center gap-2 transition shadow-[0_0_20px_rgba(34,197,94,0.4)] uppercase tracking-wider"
            >
              <Compass className="w-4 h-4" /> Live Radar Map
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {SPORTS_LIST.map((sp) => {
              const active = selectedSport === sp.id;
              return (
                <button
                  key={sp.id}
                  onClick={() => setSelectedSport(sp.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition ${
                    active
                      ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-105'
                      : 'bg-zinc-900/90 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  <span>{sp.icon}</span> {sp.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Instant Promo & Coupon Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.values(COUPONS).map((cp) => {
            return (
              <div
                key={cp.code}
                onClick={() => {
                  setCouponInput(cp.code);
                  setAppliedCoupon(cp);
                  showToast(`Pre-applied coupon ${cp.code} for your next checkout!`, 'success');
                }}
                className="cursor-pointer bg-zinc-900/80 hover:bg-zinc-900 border border-dashed border-emerald-500/40 rounded-2xl p-4 flex items-center justify-between transition group hover:border-emerald-400"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-black uppercase tracking-wider">
                      {cp.code}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">Tap to Apply</span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-1 font-semibold">{cp.desc}</p>
                </div>
                <Percent className="w-5 h-5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
              </div>
            );
          })}
        </div>

        {/* Arena AI Turf Concierge & Live Weather Grounding */}
        <div className="bg-gradient-to-br from-zinc-900 via-neutral-950 to-black border border-emerald-500/40 rounded-3xl p-6 shadow-[0_0_30px_rgba(34,197,94,0.1)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-white uppercase italic tracking-wider">
                    Arena AI Concierge & Live Weather Grounding
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase">
                    gemini-3-flash-preview
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-medium">
                  Ask in natural language for turf comparisons, per-player INR split math, or live Google Search weather checks in {selectedCity}.
                </p>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-zinc-300 bg-black/90 border border-zinc-800 px-3.5 py-2 rounded-xl cursor-pointer self-start sm:self-auto font-semibold">
              <input
                type="checkbox"
                checked={aiConciergeUseSearch}
                onChange={(e) => setAiConciergeUseSearch(e.target.checked)}
                className="accent-emerald-500"
              />
              <span>Google Search Weather Grounding</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={aiConciergePrompt}
              onChange={(e) => setAiConciergePrompt(e.target.value)}
              placeholder="Ask Arena AI: e.g., Best covered turf in Nagpur if it rains tonight for 10 players..."
              className="flex-1 px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 shadow-inner"
            />
            <button
              disabled={aiConciergeLoading}
              onClick={() => handleAskAiConcierge()}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 transition shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              {aiConciergeLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Consulting AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Ask AI Concierge
                </>
              )}
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap gap-2">
            {[
              `Check live weather in ${selectedCity} tonight & suggest best floodlight turf`,
              `Cheapest Box Cricket turf in ${selectedCity} for 16 players with coupon math`,
              `Best USAPA Pickleball court in ${selectedCity} for DUPR 3.5+ doubles`
            ].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setAiConciergePrompt(q);
                  handleAskAiConcierge(q);
                }}
                className="text-[11px] px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-semibold transition"
              >
                ⚡ {q}
              </button>
            ))}
          </div>

          {aiConciergeResult && (
            <div className="bg-black/90 border border-zinc-800 rounded-2xl p-5 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between text-[11px] text-emerald-400 font-black tracking-wider uppercase">
                <span>⚡ ARENA AI CONCIERGE RESPONSE ({aiConciergeResult.timestamp})</span>
                <button
                  onClick={() => setAiConciergeResult(null)}
                  className="text-zinc-500 hover:text-white"
                >
                  Clear
                </button>
              </div>
              <div className="text-xs sm:text-sm text-zinc-200 whitespace-pre-line leading-relaxed font-medium">
                {aiConciergeResult.text}
              </div>
              {aiConciergeResult.sources && aiConciergeResult.sources.length > 0 && (
                <div className="pt-3 border-t border-zinc-800/80">
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block mb-1.5">
                    Verified Google Search Grounding Sources:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {aiConciergeResult.sources.slice(0, 4).map((src, i) => (
                      <a
                        key={i}
                        href={src.uri}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-cyan-300 hover:underline flex items-center gap-1 font-semibold"
                      >
                        {src.title} <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Featured Turfs Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-black text-white uppercase italic tracking-wider flex items-center gap-2">
                <Flame className="w-5 h-5 text-emerald-400 animate-pulse" /> Verified Arenas in {selectedCity}
              </h2>
              <p className="text-xs text-zinc-400 font-medium">Instant slot lock • Certified floodlights & turf bounce</p>
            </div>
            <button
              onClick={() => setPlayerTab('EXPLORE')}
              className="text-xs font-black text-emerald-400 hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              View All ({filteredTurfs.length}) <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {filteredTurfs.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">
              <p className="text-zinc-300 font-bold">No turfs match your current filter in {selectedCity}.</p>
              <button
                onClick={() => {
                  setSelectedCity('All Cities');
                  setSelectedSport('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-5 py-2.5 rounded-2xl bg-emerald-500 text-black text-xs font-black uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTurfs.map((turf) => {
                const isFav = favorites.includes(turf.id);
                return (
                  <div
                    key={turf.id}
                    className="group bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={turf.images[0]}
                          alt={turf.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                          {turf.verified && (
                            <span className="px-3 py-1 rounded-full bg-black/90 backdrop-blur-md border border-emerald-500/50 text-emerald-400 text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> FIFA Pro
                            </span>
                          )}
                          <span className="px-3 py-1 rounded-full bg-black/90 backdrop-blur-md text-zinc-200 text-[11px] font-bold">
                            {turf.distanceKm} km
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFavorites((prev) =>
                              prev.includes(turf.id) ? prev.filter((id) => id !== turf.id) : [...prev, turf.id]
                            );
                          }}
                          className="absolute top-3.5 right-3.5 p-2.5 rounded-full bg-black/80 text-white hover:text-rose-400 transition shadow-lg"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {turf.sports.map((s) => (
                              <span
                                key={s}
                                className="px-2.5 py-1 rounded-lg bg-black/90 border border-zinc-700 text-[10px] font-black uppercase tracking-wider text-zinc-200 shadow-md"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black shadow-md">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {turf.rating} ({turf.reviewsCount})
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition line-clamp-1 uppercase tracking-tight">
                          {turf.name}
                        </h3>
                        <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1.5 font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {turf.area}, {turf.city}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {turf.amenities.slice(0, 3).map((am) => (
                            <span key={am} className="text-[11px] px-2.5 py-1 rounded-lg bg-black/60 text-zinc-400 font-medium border border-zinc-800">
                              ✓ {am}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block">Rate / Hour</span>
                        <span className="text-lg font-black text-white">
                          {formatINR(turf.basePrice)}
                        </span>
                      </div>
                      <button
                        onClick={() => openTurfDetail(turf)}
                        className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,197,94,0.3)] transition"
                      >
                        Book Slots <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Live Pickup Matches Looking for Players */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-black text-white uppercase italic tracking-wider flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" /> Live Pickup Matches Ready to Join
              </h2>
              <p className="text-xs text-zinc-400 font-medium">Every match below is linked to a pre-paid, confirmed turf booking</p>
            </div>
            <button
              onClick={() => setPlayerTab('COMMUNITY')}
              className="text-xs font-black text-emerald-400 hover:underline uppercase tracking-wider"
            >
              Community Hub →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {matches.slice(0, 3).map((m) => {
              const spotsLeft = Math.max(m.maxPlayers - m.participants.length, 0);
              return (
                <div key={m.id} className="bg-black/80 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between shadow-md">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black uppercase text-[10px] tracking-wider">
                        {m.sport} • {m.format}
                      </span>
                      <span className="text-cyan-400 font-mono text-[11px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> #{m.linkedBookingId}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">{m.title}</h4>
                    <p className="text-xs text-zinc-400 mt-1 font-medium">{m.turfName}</p>
                    <p className="text-xs text-zinc-300 mt-1 font-bold">{m.date} • {m.timeLabel}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-white">{formatINR(m.feePerPlayer)}/player</span>
                      <span className="block text-[10px] text-amber-400 font-bold uppercase">
                        {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full (Waitlist Open)'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleJoinMatch(m.id)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider"
                    >
                      {spotsLeft > 0 ? (m.approvalRequired ? 'Request Spot' : 'Join Squad') : 'Join Waitlist'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // EXPLORE TAB (Interactive Custom Map + Filters + Split View)
  const renderPlayerExploreTab = () => {
    return (
      <div className="space-y-5 pb-24">
        {/* Filter Controls Header */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-black border border-zinc-800 rounded-2xl px-3.5 py-2.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-xs font-bold text-white focus:outline-none uppercase"
              >
                <option value="All Cities" className="bg-zinc-900">All Indian Cities</option>
                {CITIES.map((c) => (
                  <option key={c} value={c} className="bg-zinc-900">{c}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-black border border-zinc-800 rounded-2xl px-3.5 py-2.5">
              <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-zinc-400 font-semibold">Max/hr:</span>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-24 accent-emerald-500"
              />
              <span className="text-xs font-black text-emerald-400">{formatINR(maxPriceFilter)}</span>
            </div>

            <button
              onClick={() => setOnlyFloodlights(!onlyFloodlights)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider border transition flex items-center gap-2 ${
                onlyFloodlights
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                  : 'bg-black border-zinc-800 text-zinc-400'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" /> Floodlights Only
            </button>
          </div>

          <div className="flex items-center bg-black p-1.5 rounded-2xl border border-zinc-800">
            {['SPLIT', 'MAP', 'LIST'].map((mode) => (
              <button
                key={mode}
                onClick={() => setExploreViewMode(mode)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                  exploreViewMode === mode ? 'bg-emerald-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {mode === 'SPLIT' ? 'Split Radar' : mode === 'MAP' ? 'Full Map' : 'List'}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Map + Turf List Split Container */}
        <div className={`grid gap-6 ${exploreViewMode === 'SPLIT' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
          {(exploreViewMode === 'SPLIT' || exploreViewMode === 'MAP') && (
            <div className={`${exploreViewMode === 'SPLIT' ? 'lg:col-span-7' : ''} bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden relative min-h-[460px] flex flex-col justify-between p-5 shadow-2xl`}>
              {/* Custom SVG Dark Sports Radar Map */}
              <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <path d="M 0 180 Q 240 160 520 240 T 900 190" fill="none" stroke="#3f3f46" strokeWidth="4" />
                <path d="M 180 0 Q 260 220 290 480" fill="none" stroke="#3f3f46" strokeWidth="3" />
                <path d="M 450 0 L 380 480" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 6" />
                <circle cx="50%" cy="50%" r="130" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="50%" cy="50%" r="220" fill="none" stroke="#22c55e" strokeWidth="0.6" strokeDasharray="4 4" />
              </svg>

              {/* Top Map Overlay Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-black/90 backdrop-blur-md border border-zinc-800 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg">
                  <Navigation className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-black text-white uppercase tracking-wider">
                    Live Arena Radar • {selectedCity} ({filteredTurfs.length} Venues)
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-black uppercase tracking-wider">
                  Tap any ₹ Pin to book
                </span>
              </div>

              {/* Interactive Turf Price Pins */}
              <div className="relative z-10 flex-1 my-6">
                {filteredTurfs.map((turf) => (
                  <button
                    key={turf.id}
                    onClick={() => openTurfDetail(turf)}
                    style={{ left: `${turf.coords.x}%`, top: `${turf.coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                  >
                    <div className="px-3.5 py-2 rounded-2xl bg-emerald-500 hover:bg-white text-black font-black text-xs shadow-[0_0_20px_rgba(34,197,94,0.5)] flex items-center gap-1.5 border-2 border-black transition-transform group-hover:scale-125">
                      <span>{formatINR(turf.basePrice)}</span>
                      <span className="text-[10px] bg-black text-emerald-400 px-2 py-0.5 rounded-full">★{turf.rating}</span>
                    </div>
                    <div className="mt-1.5 px-2.5 py-0.5 rounded-xl bg-black/95 border border-zinc-700 text-[10px] text-white font-bold uppercase tracking-wider whitespace-nowrap shadow-xl">
                      {turf.name.split(' ')[0]} {turf.name.split(' ')[1]}
                    </div>
                  </button>
                ))}
              </div>

              {/* Bottom Map Legend */}
              <div className="relative z-10 bg-black/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400 font-bold">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping" /> Live Slot Available
                  </span>
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <ShieldCheck className="w-4 h-4" /> KYC Verified
                  </span>
                </div>
                <span>5km Radius Active</span>
              </div>
            </div>
          )}

          {(exploreViewMode === 'SPLIT' || exploreViewMode === 'LIST') && (
            <div className={`${exploreViewMode === 'SPLIT' ? 'lg:col-span-5 max-h-[520px] overflow-y-auto pr-1' : 'grid grid-cols-1 md:grid-cols-2 gap-4'} space-y-3.5`}>
              {filteredTurfs.map((turf) => (
                <div
                  key={turf.id}
                  onClick={() => openTurfDetail(turf)}
                  className="cursor-pointer bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-emerald-500/60 rounded-3xl p-4 flex gap-4 transition shadow-lg group"
                >
                  <img
                    src={turf.images[0]}
                    alt={turf.name}
                    className="w-24 h-24 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black tracking-widest uppercase text-emerald-400">{turf.city} • {turf.distanceKm} km</span>
                        <span className="text-xs font-black text-amber-400 flex items-center gap-0.5">
                          ★ {turf.rating}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-white truncate uppercase tracking-tight mt-0.5">{turf.name}</h4>
                      <p className="text-xs text-zinc-400 truncate font-medium">{turf.area}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800">
                      <span className="text-sm font-black text-white">
                        {formatINR(turf.basePrice)}<span className="text-[10px] text-zinc-400 font-normal">/hr</span>
                      </span>
                      <span className="text-xs font-black text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
                        Slots <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // COMMUNITY TAB (Matches, Waitlists, Feed, Public/Private Groups)
  const renderPlayerCommunityTab = () => {
    return (
      <div className="space-y-6 pb-24">
        {/* Community Header Banner */}
        <div className="bg-gradient-to-r from-zinc-900 via-neutral-950 to-black border border-emerald-500/30 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-2xl">
          <div>
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Verified Sports Networking</span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 uppercase italic tracking-tight">
              Squads & Verified Pickup Matches
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-medium max-w-xl">
              Anti-fake guarantee: Matches can only be created by linking an active, paid Arena AI booking code.
            </p>
          </div>
          <button
            onClick={() => setHostMatchModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-[0_0_20px_rgba(34,197,94,0.4)] transition"
          >
            <Plus className="w-4 h-4" /> Host Match from Booking
          </button>
        </div>

        {/* Active Matches Grid */}
        <div>
          <h3 className="text-base font-black text-white uppercase italic tracking-wider mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-400" /> Live Match Rosters & AI Team Builder
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {matches.map((m) => {
              const spotsLeft = Math.max(m.maxPlayers - m.participants.length, 0);
              const progressPct = Math.min(100, Math.round((m.participants.length / m.maxPlayers) * 100));
              return (
                <div key={m.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider">
                        {m.sport} • {m.skillLevel}
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Linked #{m.linkedBookingId}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-white uppercase tracking-tight">{m.title}</h4>
                    <p className="text-xs text-zinc-400 mt-1 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {m.turfName} ({m.pitchName})
                    </p>
                    <p className="text-xs text-zinc-300 mt-1 font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {m.date} • {m.timeLabel}
                    </p>

                    {/* Capacity Bar */}
                    <div className="mt-4 bg-black/80 rounded-2xl p-3.5 border border-zinc-800">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-zinc-300 font-bold">
                          Roster: {m.participants.length}/{m.maxPlayers} Players
                        </span>
                        <span className="text-emerald-400 font-black uppercase">
                          {spotsLeft > 0 ? `${spotsLeft} open` : `Full (${m.waitlist.length} waitlisted)`}
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-zinc-800 overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {m.participants.slice(0, 5).map((p) => (
                          <span key={p.id} className="text-[10px] px-2.5 py-1 rounded-lg bg-zinc-950 text-zinc-300 border border-zinc-800 font-bold">
                            {p.name.split(' ')[0]} ({p.skill[0]})
                          </span>
                        ))}
                        {m.participants.length > 5 && (
                          <span className="text-[10px] px-2.5 py-1 rounded-lg bg-zinc-950 text-emerald-400 font-black">
                            +{m.participants.length - 5} more
                          </span>
                        )}
                      </div>

                      {/* Host Approval Queue if any */}
                      {m.pendingRequests.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-zinc-800">
                          <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider block mb-1.5">
                            Pending Approval ({m.pendingRequests.length}):
                          </span>
                          {m.pendingRequests.map((req) => (
                            <div key={req.id} className="flex items-center justify-between text-xs bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-800">
                              <span className="text-zinc-200 font-medium">{req.name} ({req.reliability}% Rel.)</span>
                              <button
                                onClick={() => handleApproveParticipant(m.id, req)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500 text-black font-black text-[11px] uppercase"
                              >
                                Approve
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Gemini AI Balanced Team Splitter Output */}
                      {aiTeamSplitResults[m.id] && (
                        <div className="mt-4 pt-3 border-t border-emerald-500/40 space-y-2.5 bg-zinc-950 p-3 rounded-2xl border border-emerald-500/20">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5" /> AI Balanced Lineups
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black">
                              Fairness: {aiTeamSplitResults[m.id].balanceScore}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="bg-black p-2.5 rounded-xl border border-zinc-800">
                              <p className="font-black text-cyan-400 uppercase mb-1">{aiTeamSplitResults[m.id].teamAlphaName}</p>
                              {aiTeamSplitResults[m.id].teamAlpha?.map((pl, idx) => (
                                <p key={idx} className="text-zinc-300 truncate font-semibold">
                                  • {pl.name.split(' ')[0]} <span className="text-zinc-500">({pl.suggestedPosition})</span>
                                </p>
                              ))}
                            </div>
                            <div className="bg-black p-2.5 rounded-xl border border-zinc-800">
                              <p className="font-black text-amber-400 uppercase mb-1">{aiTeamSplitResults[m.id].teamBetaName}</p>
                              {aiTeamSplitResults[m.id].teamBeta?.map((pl, idx) => (
                                <p key={idx} className="text-zinc-300 truncate font-semibold">
                                  • {pl.name.split(' ')[0]} <span className="text-zinc-500">({pl.suggestedPosition})</span>
                                </p>
                              ))}
                            </div>
                          </div>
                          <p className="text-[10px] text-zinc-400 italic font-medium">
                            {aiTeamSplitResults[m.id].tacticalSummary}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-zinc-800 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block">Split Fee</span>
                      <span className="text-sm font-black text-white">{formatINR(m.feePerPlayer)} / player</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={aiTeamSplitLoading && aiTeamSplitMatchId === m.id}
                        onClick={() => handleGenerateAiBalancedTeams(m)}
                        className="px-3 py-2 rounded-xl bg-black hover:bg-zinc-800 text-emerald-400 border border-emerald-500/40 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition"
                        title="Use Gemini Structured JSON output to split roster into balanced teams"
                      >
                        {aiTeamSplitLoading && aiTeamSplitMatchId === m.id ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5" />
                        )}
                        AI Teams
                      </button>
                      <button
                        onClick={() => handleJoinMatch(m.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition shadow-md"
                      >
                        {spotsLeft > 0 ? (m.approvalRequired ? 'Request Join' : 'Join Match') : 'Waitlist'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community Groups & Social Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Public & Private Clubs */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-black text-white uppercase italic tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Active Sport Communities
            </h3>
            {communities.map((c) => (
              <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-2.5 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-black text-emerald-400 border border-zinc-800">
                    {c.sport} • {c.privacy}
                  </span>
                  <span className="text-xs text-zinc-400 font-bold">{c.membersCount.toLocaleString('en-IN')} members</span>
                </div>
                <h4 className="text-sm font-black text-white uppercase tracking-tight">{c.name}</h4>
                <p className="text-xs text-zinc-400 font-medium">{c.desc}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setCommunities((prev) =>
                        prev.map((item) => (item.id === c.id ? { ...item, joined: !item.joined } : item))
                      );
                      showToast(c.joined ? `Left ${c.name}` : `Joined ${c.name}!`, 'success');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                      c.joined
                        ? 'bg-black text-emerald-400 border border-emerald-500/40'
                        : 'bg-emerald-500 text-black shadow-md'
                    }`}
                  >
                    {c.joined ? '✓ Member' : c.privacy === 'PRIVATE' ? 'Request Access' : 'Join Club'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Community Discussion & Match Feed */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-base font-black text-white uppercase italic tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" /> Locker Room Feed & Match Broadcasts
            </h3>
            {posts.map((post) => (
              <div key={post.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-black text-white uppercase tracking-tight">{post.authorName}</span>
                    <span className="text-xs text-zinc-400 ml-2 font-medium">{post.authorHandle} • {post.timeAgo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-black text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-zinc-800">
                      {post.sport}
                    </span>
                    <button
                      onClick={() => showToast('Post reported to Admin Moderation Queue.', 'warning')}
                      title="Report or Block User"
                      className="text-zinc-500 hover:text-rose-400 p-1"
                    >
                      <ShieldAlert className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">{post.content}</p>
                <div className="flex items-center gap-5 pt-3 border-t border-zinc-800 text-xs text-zinc-400 font-bold">
                  <button
                    onClick={() =>
                      setPosts((prev) =>
                        prev.map((p) =>
                          p.id === post.id
                            ? { ...p, likedByMe: !p.likedByMe, likes: p.likedByMe ? p.likes - 1 : p.likes + 1 }
                            : p
                        )
                      )
                    }
                    className={`flex items-center gap-1.5 uppercase tracking-wider ${post.likedByMe ? 'text-emerald-400 font-black' : 'hover:text-white'}`}
                  >
                    <Heart className={`w-4 h-4 ${post.likedByMe ? 'fill-emerald-400 text-emerald-400' : ''}`} /> {post.likes} Likes
                  </button>
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4" /> {post.comments.length} Comments
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // BOOKINGS TAB (History, Status Badges, Cancellations, QR Pass)
  const renderPlayerBookingsTab = () => {
    return (
      <div className="space-y-5 pb-24">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-tight">My Turf Bookings & QR Passes</h2>
            <p className="text-xs text-zinc-400 font-medium">Separate Booking, Razorpay Payment & Refund state tracking</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-zinc-800">
                  <span className="font-mono text-xs font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
                    #{b.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                        b.bookingStatus === 'CONFIRMED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      {b.paymentStatus}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-black text-white uppercase tracking-tight mt-3.5">{b.turfName}</h3>
                <p className="text-xs text-emerald-400 font-black uppercase tracking-wider mt-0.5">{b.pitchName} ({b.sport})</p>
                <div className="mt-3 space-y-1.5 text-xs text-zinc-300 font-semibold">
                  <p>Date: <span className="text-white font-black">{b.date}</span></p>
                  <p>Slots: <span className="text-white font-black">{b.slotLabels.join(' | ')}</span></p>
                  <p className="text-[10px] text-zinc-500 font-mono truncate">
                    Razorpay Order: {b.razorpayOrderId}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block">Total Paid (incl. GST)</span>
                  <span className="text-lg font-black text-white">{formatINR(b.totalPaid)}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {b.bookingStatus === 'CONFIRMED' && (
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="px-3.5 py-2 rounded-2xl bg-black hover:bg-rose-500/20 text-rose-400 border border-zinc-800 text-xs font-black uppercase tracking-wider transition"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => setActiveReceiptBooking(b)}
                    className="px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                  >
                    <QrCode className="w-4 h-4" /> QR Pass
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // PROFILE TAB (Switch Demo Users, Skill Level, Sports Preferences)
  const renderPlayerProfileTab = () => {
    return (
      <div className="space-y-6 pb-24 max-w-3xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">{currentUser.name}</h2>
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider">
                  {currentUser.skillLevel}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-semibold mt-0.5">{currentUser.handle} • {currentUser.phone}</p>
              <p className="text-xs text-emerald-400 font-black tracking-wider uppercase mt-2">
                Reliability: {currentUser.reliabilityScore}% • {currentUser.matchesPlayed} Verified Matches
              </p>
            </div>
          </div>

          <div className="bg-black border border-zinc-800 rounded-2xl p-4 w-full sm:w-auto">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Switch Demo Account (RBAC):</label>
            <select
              value={currentUserId}
              onChange={(e) => {
                setCurrentUserId(e.target.value);
                showToast('Switched active player profile!', 'success');
              }}
              className="bg-zinc-900 text-white text-xs font-bold px-3 py-2 rounded-xl border border-zinc-700 w-full uppercase"
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.city} - {u.skillLevel})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <h3 className="text-base font-black text-white uppercase italic tracking-wider">Preferred Sports & Skill Level</h3>
          <div className="flex flex-wrap gap-2.5">
            {SPORTS_LIST.filter((s) => s.id !== 'All').map((sp) => {
              const active = currentUser.preferredSports.includes(sp.id);
              return (
                <button
                  key={sp.id}
                  onClick={() => {
                    setUsers((prev) =>
                      prev.map((u) => {
                        if (u.id !== currentUser.id) return u;
                        const exists = u.preferredSports.includes(sp.id);
                        return {
                          ...u,
                          preferredSports: exists
                            ? u.preferredSports.filter((item) => item !== sp.id)
                            : [...u.preferredSports, sp.id]
                        };
                      })
                    );
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider border transition ${
                    active
                      ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                      : 'bg-black text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {sp.icon} {sp.name} {active ? '✓' : '+'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gemini AI Personal Sports Coach & Progression Plan */}
        <div className="bg-gradient-to-br from-zinc-900 via-neutral-950 to-black border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
                <h3 className="text-base font-black text-white uppercase italic tracking-wider">
                  Arena AI Personal Turf Coach & Injury-Prevention Plan
                </h3>
              </div>
              <p className="text-xs text-zinc-400 font-medium mt-1">
                Custom weekly drills and artificial-turf joint care tailored to {currentUser.name} ({currentUser.preferredSports.join(', ')} • {currentUser.skillLevel}).
              </p>
            </div>
            <button
              disabled={aiCoachLoading}
              onClick={handleGenerateAiCoachPlan}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              {aiCoachLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Building Plan...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate AI Coach Plan
                </>
              )}
            </button>
          </div>

          {aiCoachPlan && (
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black/90 border border-zinc-800 rounded-2xl p-4 shadow-md">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">Player Archetype</span>
                  <p className="text-sm font-black text-white uppercase tracking-tight mt-1">{aiCoachPlan.playerArchetype}</p>
                  <p className="text-xs text-zinc-400 font-medium mt-1">Next Milestone: {aiCoachPlan.nextSkillMilestone}</p>
                </div>
                <div className="bg-black/90 border border-zinc-800 rounded-2xl p-4 shadow-md">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 block">Turf Joint & Muscle Care</span>
                  <p className="text-xs text-zinc-200 font-medium mt-1 leading-relaxed">{aiCoachPlan.injuryPreventionTip}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiCoachPlan.weeklyDrills?.map((d, idx) => (
                  <div key={idx} className="bg-black border border-zinc-800 rounded-2xl p-4 space-y-2 shadow-md">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-black text-emerald-400 uppercase tracking-wider">{d.day} • {d.sportFocus}</span>
                      <span className="text-zinc-400 font-bold">{d.durationMins} mins</span>
                    </div>
                    <h4 className="text-xs font-black text-white uppercase">{d.drillName}</h4>
                    <p className="text-[11px] text-zinc-400 font-medium">{d.keyBenefit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================================================
  // RENDER TURF OWNER DASHBOARD
  // ============================================================================

  const renderOwnerDashboard = () => {
    const totalRevenue = bookings
      .filter((b) => b.bookingStatus === 'CONFIRMED')
      .reduce((acc, b) => acc + b.totalPaid, 0);

    const ownerTurf = turfs[0];
    const ownerPitch = ownerTurf.pitches[0];

    return (
      <div className="space-y-6 pb-16">
        <div className="bg-gradient-to-r from-neutral-950 via-zinc-900 to-black border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-2xl">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-widest">
              TURF PARTNER MANAGEMENT CONSOLE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight mt-2">
              {ownerTurf.name} — Owner HQ
            </h1>
            <p className="text-xs text-zinc-400 font-medium mt-1 max-w-xl">
              Manage dynamic INR slot pricing, block slots for roller maintenance, and track real-time Razorpay settlements.
            </p>
          </div>
          <div className="bg-black border border-emerald-500/40 px-5 py-3 rounded-2xl shadow-lg">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Facility KYC Status</span>
            <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5 uppercase mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> GST & Title Verified
            </span>
          </div>
        </div>

        {/* Owner KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-xl">
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Gross Collections (INR)</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">{formatINR(totalRevenue + 48500)}</p>
            <span className="text-[11px] text-emerald-400 font-bold">+18.4% vs last week</span>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-xl">
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Prime Floodlight Occupancy</span>
            <p className="text-2xl font-black text-white mt-1">88.5%</p>
            <span className="text-[11px] text-zinc-400 font-medium">6:00 PM - 11:00 PM slots</span>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-xl">
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Confirmed Bookings</span>
            <p className="text-2xl font-black text-white mt-1">{bookings.length + 34}</p>
            <span className="text-[11px] text-cyan-400 font-bold">0 Double-Bookings (GiST Active)</span>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-xl">
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Razorpay T+1 Payout</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">{formatINR(44620)}</p>
            <span className="text-[11px] text-zinc-400 font-medium">Auto-routed via Razorpay Route</span>
          </div>
        </div>

        {/* Gemini AI Owner Revenue & Dynamic Pricing Strategist */}
        <div className="bg-gradient-to-br from-zinc-900 via-neutral-950 to-black border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
                <h3 className="text-base font-black text-white uppercase italic tracking-wider">
                  Arena AI Dynamic Pricing & Occupancy Strategist
                </h3>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase">
                  Structured JSON Schema
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-medium mt-1">
                Analyze off-peak dead hours and floodlight demand at {ownerTurf.name} to maximize weekly INR yield.
              </p>
            </div>
            <button
              disabled={aiOwnerInsightsLoading}
              onClick={() => handleGenerateOwnerAiStrategy(ownerTurf)}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              {aiOwnerInsightsLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Yield...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate AI Pricing Strategy
                </>
              )}
            </button>
          </div>

          {aiOwnerInsights && (
            <div className="space-y-4 pt-3 border-t border-zinc-800">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-black px-4 py-3 rounded-2xl border border-zinc-800 shadow-inner">
                <span className="text-xs text-zinc-200 font-bold">{aiOwnerInsights.headlineSummary}</span>
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                  Est. Weekly Upside: +{formatINR(aiOwnerInsights.projectedWeeklyUpsideInr)}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiOwnerInsights.recommendations?.map((rec, i) => (
                  <div key={i} className="bg-black border border-zinc-800 rounded-2xl p-4 space-y-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-emerald-400 uppercase">{rec.slotWindow}</span>
                      <span className="text-xs font-black text-white">{formatINR(rec.suggestedPriceInr)}/hr</span>
                    </div>
                    <h4 className="text-xs font-black text-white uppercase">{rec.actionTitle}</h4>
                    <p className="text-[11px] text-zinc-400 font-medium">{rec.rationale}</p>
                    <div className="pt-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        Promo: {rec.SuggestedCoupon}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Interactive Maintenance Slot Blocker & Dynamic Pricing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white uppercase italic tracking-wider">
                  Live Slot Maintenance Blocker ({ownerPitch.name})
                </h3>
                <p className="text-xs text-zinc-400 font-medium">
                  Click any slot on 2026-10-16 to toggle Maintenance Block (reflected instantly in Player App)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TIME_SLOTS.map((slot) => {
                const maintKey = `${ownerPitch.id}_2026-10-16_${slot.id}`;
                const isBlocked = Boolean(maintenanceBlocks[maintKey]);
                const isBooked = bookings.some(
                  (b) =>
                    b.pitchId === ownerPitch.id &&
                    b.date === '2026-10-16' &&
                    b.bookingStatus === 'CONFIRMED' &&
                    b.slots.includes(slot.id)
                );

                return (
                  <button
                    key={slot.id}
                    onClick={() => {
                      if (isBooked) {
                        showToast('Cannot block a slot that already has a CONFIRMED player booking!', 'error');
                        return;
                      }
                      setMaintenanceBlocks((prev) => {
                        const copy = { ...prev };
                        if (copy[maintKey]) {
                          delete copy[maintKey];
                          showToast(`Re-opened ${slot.label} for public player booking.`, 'success');
                        } else {
                          copy[maintKey] = 'Owner Scheduled Turf Maintenance';
                          showToast(`Blocked ${slot.label} for maintenance!`, 'warning');
                        }
                        return copy;
                      });
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition shadow-sm ${
                      isBooked
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                        : isBlocked
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                        : 'bg-black border-zinc-800 text-zinc-200 hover:border-emerald-500'
                    }`}
                  >
                    <div className="text-xs font-black uppercase">{slot.id} ({slot.period})</div>
                    <div className="text-[10px] mt-1 font-bold uppercase tracking-wider">
                      {isBooked ? '✓ Booked' : isBlocked ? '🛠 Maintenance' : 'Available (Tap)'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pitch Dynamic Pricing Editor */}
          <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-black text-white uppercase italic tracking-wider">Pitch & Floodlight Rates (INR)</h3>
            {ownerTurf.pitches.map((p) => (
              <div key={p.id} className="bg-black border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white uppercase">{p.name}</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black uppercase">{p.sport}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block">Off-Peak (₹/hr)</label>
                    <input
                      type="number"
                      value={p.basePrice}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setTurfs((prev) =>
                          prev.map((t) =>
                            t.id !== ownerTurf.id
                              ? t
                              : {
                                  ...t,
                                  pitches: t.pitches.map((item) => (item.id === p.id ? { ...item, basePrice: val } : item))
                                }
                          )
                        );
                      }}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-black text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block">Peak Light (₹/hr)</label>
                    <input
                      type="number"
                      value={p.peakPrice}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setTurfs((prev) =>
                          prev.map((t) =>
                            t.id !== ownerTurf.id
                              ? t
                              : {
                                  ...t,
                                  pitches: t.pitches.map((item) => (item.id === p.id ? { ...item, peakPrice: val } : item))
                                }
                          )
                        );
                      }}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-black text-emerald-400"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // RENDER ADMIN CONTROL CENTER
  // ============================================================================

  const renderAdminControlCenter = () => {
    return (
      <div className="space-y-6 pb-16">
        <div className="bg-gradient-to-r from-neutral-950 via-zinc-900 to-black border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-2xl">
          <div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest">
              SUPER ADMIN & GOVERNANCE PORTAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight mt-2">
              Arena AI Security & Audit Center
            </h1>
            <p className="text-xs text-zinc-400 font-medium mt-1 max-w-xl">
              Monitor Razorpay webhook idempotency, Redis lock events, facility KYC approvals, and platform commissions.
            </p>
          </div>
          <div className="bg-black border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Platform Commission (%)</label>
              <input
                type="number"
                step="0.5"
                value={platformCommission}
                onChange={(e) => setPlatformCommission(Number(e.target.value))}
                className="w-24 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs font-black text-emerald-400"
              />
            </div>
            <button
              onClick={() => showToast(`Updated platform commission to ${platformCommission}%`, 'success')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 text-black font-black text-xs uppercase tracking-wider shadow-md"
            >
              Save
            </button>
          </div>
        </div>

        {/* Gemini AI Security, Concurrency & Refund Dispute Auditor */}
        <div className="bg-gradient-to-br from-zinc-900 via-neutral-950 to-black border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
                <h3 className="text-base font-black text-white uppercase italic tracking-wider">
                  Arena AI Security, Concurrency & Dispute Auditor
                </h3>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase">
                  Structured JSON Risk Engine
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-medium mt-1">
                Inspect live Redis lock blocks, Razorpay HMAC webhook events, and refund ledgers using Gemini LLM.
              </p>
            </div>
            <button
              disabled={aiAdminAuditLoading}
              onClick={handleRunAdminAiAudit}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              {aiAdminAuditLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Auditing Ledger...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Run AI Security & Dispute Audit
                </>
              )}
            </button>
          </div>

          {aiAdminAuditReport && (
            <div className="space-y-4 pt-3 border-t border-zinc-800">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-black px-4 py-3.5 rounded-2xl border border-zinc-800 shadow-inner">
                <span className="text-xs text-zinc-200 font-bold">{aiAdminAuditReport.executiveSummary}</span>
                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider">
                  Security Score: {aiAdminAuditReport.securityHealthScore}/100
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiAdminAuditReport.findings?.map((f, i) => (
                  <div key={i} className="bg-black border border-zinc-800 rounded-2xl p-4 space-y-2 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-cyan-400 uppercase">{f.category}</span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-900 text-emerald-300 font-black uppercase">
                        {f.severity}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-200 font-semibold">{f.observation}</p>
                    <p className="text-[11px] text-zinc-400 font-medium">Action: {f.recommendedAction}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Cryptographic & Concurrency Audit Trail */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-black text-white uppercase italic tracking-wider flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" /> Immutable System & Payment Audit Log
              </h3>
              <p className="text-xs text-zinc-400 font-medium">
                Real-time stream of Redis TTL slot holds, PostgreSQL GiST conflict blocks, and Razorpay HMAC webhooks
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 font-black uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Actor / Service</th>
                  <th className="py-3 px-4">Event Action</th>
                  <th className="py-3 px-4">Resource / Lock Key</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 font-mono text-[11px]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-black/50 transition">
                    <td className="py-3 px-4 text-zinc-400">{log.time}</td>
                    <td className="py-3 px-4 text-white font-bold">{log.actor}</td>
                    <td className="py-3 px-4 text-cyan-300 font-semibold">{log.action}</td>
                    <td className="py-3 px-4 text-zinc-300 truncate max-w-xs">{log.target}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                          log.status === 'BLOCKED'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // RENDER FULL-STACK CODE & ARCHITECTURE BLUEPRINT VIEW
  // ============================================================================

  const renderArchitectureView = () => {
    const activeDoc = CODE_BLUEPRINTS[activeCodeTab];
    return (
      <div className="space-y-6 pb-16">
        <div className="bg-gradient-to-r from-neutral-950 via-zinc-900 to-black border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-widest">
                PRODUCTION SYSTEM ARCHITECTURE & SOURCE CODE
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight mt-2">
                FastAPI + PostgreSQL 16 + Redis + Razorpay + Expo TS
              </h1>
              <p className="text-xs text-zinc-400 font-medium mt-1 max-w-2xl">
                Inspect and copy backend transactional booking engines, PostgreSQL GiST exclusion constraints, Razorpay webhook verification, and Pytest concurrency tests.
              </p>
            </div>
            <button
              onClick={handleCopyBlueprint}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 self-start shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedCode ? 'Copied File!' : 'Copy Current File'}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {Object.entries(CODE_BLUEPRINTS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveCodeTab(key)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2 ${
                  activeCodeTab === key
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'bg-black text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <Code2 className="w-4 h-4" /> {item.title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-black border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-zinc-900 px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-black text-emerald-400">{activeDoc.title}</span>
              <span className="text-xs text-zinc-400 ml-3 hidden sm:inline font-medium">{activeDoc.subtitle}</span>
            </div>
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded-lg bg-black text-zinc-300 border border-zinc-800">
              {activeDoc.language}
            </span>
          </div>
          <pre className="p-6 text-xs font-mono text-zinc-200 overflow-x-auto leading-relaxed">
            <code>{activeDoc.code}</code>
          </pre>
        </div>
      </div>
    );
  };

  // ============================================================================
  // AUTHENTICATION SCREEN (LOGIN & REGISTER WITH SQLITE PERSISTENCE)
  // ============================================================================
  const renderAuthScreen = () => {
    return (
      <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-8 relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs font-black uppercase tracking-widest text-emerald-400 mb-4 shadow-xl">
            <Sparkles className="w-4 h-4" /> Real SQLite & Gemini 3.8 / Flash
          </div>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-300 flex items-center justify-center font-black text-black text-xl shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              AI
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white m-0">
              ARENA<span className="text-emerald-400">.AI</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium">
            Next-Gen Turf Booking, Concurrency Locks & Sports Community OS
          </p>
        </div>

        {/* Auth Box Container */}
        <div className="w-full max-w-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
          {/* Quick Demo 1-Click Access */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
                ⚡ 1-Click Persona Sign-In:
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                Instant SQLite Auth
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('rohan.deshmukh@arenaai.in', 'password123')}
                className="p-3 rounded-2xl bg-black/60 hover:bg-emerald-500/15 border border-zinc-800 hover:border-emerald-500/50 transition flex items-center gap-3 text-left group"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt=""
                  className="w-8 h-8 rounded-xl object-cover border border-emerald-500/40"
                />
                <div>
                  <div className="text-xs font-black text-zinc-200 group-hover:text-emerald-300">Rohan D.</div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase">Player (Nagpur)</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('vikram@greenfieldarenas.in', 'password123')}
                className="p-3 rounded-2xl bg-black/60 hover:bg-amber-500/15 border border-zinc-800 hover:border-amber-500/50 transition flex items-center gap-3 text-left group"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt=""
                  className="w-8 h-8 rounded-xl object-cover border border-amber-500/40"
                />
                <div>
                  <div className="text-xs font-black text-zinc-200 group-hover:text-amber-300">Vikramjit S.</div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase">Turf Owner</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin@arenaai.in', 'admin123')}
                className="p-3 rounded-2xl bg-black/60 hover:bg-violet-500/15 border border-zinc-800 hover:border-violet-500/50 transition flex items-center gap-3 text-left group"
              >
                <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-zinc-200 group-hover:text-violet-300">HQ Admin</div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase">Super Admin</div>
                </div>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-zinc-800 w-full" />
            <span className="bg-zinc-900 px-3 text-[10px] font-black uppercase text-zinc-500 tracking-widest absolute">
              Or Use Credentials
            </span>
          </div>

          {/* Tab Switcher: Sign In vs Register */}
          <div className="flex bg-black/60 p-1.5 rounded-2xl border border-zinc-800">
            <button
              type="button"
              onClick={() => setAuthTab('LOGIN')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                authTab === 'LOGIN' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthTab('REGISTER')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                authTab === 'REGISTER' ? 'bg-emerald-500 text-black shadow-md' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          {authTab === 'LOGIN' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. rohan.deshmukh@arenaai.in"
                  className="w-full bg-black/70 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
                    Password
                  </label>
                  <span className="text-[10px] text-zinc-500">(Default: password123)</span>
                </div>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/70 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-widest transition shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {authLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                Sign In to Arena AI
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1.5">
                  Account Type / Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegisterRole('PLAYER')}
                    className={`py-2.5 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                      registerRole === 'PLAYER'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-black/60 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Player / Athlete
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegisterRole('OWNER')}
                    className={`py-2.5 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                      registerRole === 'OWNER'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-black/60 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" /> Turf Facility Owner
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="e.g. Saurabh Kulkarni"
                  className="w-full bg-black/70 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="saurabh@gmail.com"
                    className="w-full bg-black/70 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full bg-black/70 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1.5">
                    City
                  </label>
                  <select
                    value={registerCity}
                    onChange={(e) => setRegisterCity(e.target.value)}
                    className="w-full bg-black/70 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition uppercase font-bold"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c} className="bg-zinc-900">{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1.5">
                    Phone (WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    placeholder="+91 98230 00000"
                    className="w-full bg-black/70 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-widest transition shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {authLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Create Account & Join Arena AI
              </button>
            </form>
          )}

          <div className="text-center pt-2">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              Real SQLite Persistent Database: <span className="text-zinc-400 font-mono">arena.sqlite</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  // If not authenticated, show the Arena AI Login & Registration Screen
  if (!authUser) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
        {/* Top Global Toast Notification */}
        {toast && (
          <div className="fixed top-4 right-4 z-50 max-w-md animate-bounce">
            <div
              className={`px-5 py-3.5 rounded-2xl shadow-2xl border flex items-center gap-3 text-xs font-black uppercase tracking-wider ${
                toast.type === 'error'
                  ? 'bg-rose-950/95 border-rose-500 text-rose-200 shadow-[0_0_25px_rgba(244,63,94,0.4)]'
                  : toast.type === 'warning'
                  ? 'bg-amber-950/95 border-amber-500 text-amber-200 shadow-[0_0_25px_rgba(245,158,11,0.4)]'
                  : 'bg-zinc-900/95 border-emerald-500 text-emerald-300 shadow-[0_0_25px_rgba(34,197,94,0.4)]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{toast.message}</span>
              <button onClick={() => setToast(null)} className="ml-2 text-zinc-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
        {renderAuthScreen()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Global Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 max-w-md animate-bounce">
          <div
            className={`px-5 py-3.5 rounded-2xl shadow-2xl border flex items-center gap-3 text-xs font-black uppercase tracking-wider ${
              toast.type === 'error'
                ? 'bg-rose-950/95 border-rose-500 text-rose-200 shadow-[0_0_25px_rgba(244,63,94,0.4)]'
                : toast.type === 'warning'
                ? 'bg-amber-950/95 border-amber-500 text-amber-200 shadow-[0_0_25px_rgba(245,158,11,0.4)]'
                : 'bg-zinc-900/95 border-emerald-500 text-emerald-300 shadow-[0_0_25px_rgba(34,197,94,0.4)]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 text-zinc-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation & Role Switcher Header */}
      <header className="sticky top-0 z-30 bg-black/90 backdrop-blur-2xl border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Brand Logo & City Picker */}
          <div className="flex items-center gap-5">
            <div
              onClick={() => {
                setPortalMode('PLAYER');
                setPlayerTab('HOME');
              }}
              className="cursor-pointer flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-transform">
                AI
              </div>
              <div>
                <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                  ARENA<span className="text-emerald-400">.AI</span>
                </span>
                <span className="block text-[9px] font-black tracking-widest text-zinc-400 -mt-1 uppercase">
                  ELITE SPORTS & TURF OS
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-2xl shadow-inner">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-xs font-bold text-zinc-200 focus:outline-none uppercase"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city} className="bg-zinc-900">
                    {city}
                  </option>
                ))}
                <option value="All Cities" className="bg-zinc-900">All Cities</option>
              </select>
            </div>

            {/* Live SQLite & Gemini Badges */}
            <div className="hidden xl:flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
                sqliteConnected 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400'
              }`}>
                <Database className="w-3.5 h-3.5" />
                <span>SQLite: {sqliteConnected ? 'arena.sqlite (Live)' : 'Connecting...'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-violet-500/10 border border-violet-500/30 text-violet-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gemini 3.8 / Flash: Live</span>
              </div>
            </div>
          </div>

          {/* Role-Bifurcated Portal Mode Indicator & Specs */}
          <div className="flex items-center gap-2">
            {currentUser.role === 'PLAYER' && (
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-2xl shadow-inner">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-black uppercase text-emerald-300 tracking-wider">Player App</span>
              </div>
            )}

            {currentUser.role === 'OWNER' && (
              <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-2xl shadow-inner">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black uppercase text-amber-300 tracking-wider">Turf Owner Portal</span>
              </div>
            )}

            {currentUser.role === 'ADMIN' && (
              <div className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 px-3.5 py-2 rounded-2xl shadow-inner">
                <ShieldCheck className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-black uppercase text-violet-300 tracking-wider">Super Admin HQ</span>
              </div>
            )}


            {/* Quick Demo Persona Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPersonaSwitcherOpen(!personaSwitcherOpen)}
                className="px-3 py-2 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm"
              >
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Switch Role</span>
                <ChevronRight className={`w-3 h-3 transition ${personaSwitcherOpen ? 'rotate-90' : ''}`} />
              </button>

              {personaSwitcherOpen && (
                <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-64 bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl p-3 z-50 space-y-2">
                  <div className="text-[10px] font-black uppercase text-zinc-400 px-2 py-1">
                    Switch Active Persona
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('rohan.deshmukh@arenaai.in', 'password123')}
                    className="w-full p-2.5 rounded-2xl hover:bg-emerald-500/15 border border-zinc-800 hover:border-emerald-500/40 flex items-center gap-2.5 text-left transition"
                  >
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-xs font-black text-white">Rohan Deshmukh</div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase">Player View</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('vikram@greenfieldarenas.in', 'password123')}
                    className="w-full p-2.5 rounded-2xl hover:bg-amber-500/15 border border-zinc-800 hover:border-amber-500/40 flex items-center gap-2.5 text-left transition"
                  >
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-black text-white">Vikramjit Singh</div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase">Turf Owner View</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('admin@arenaai.in', 'admin123')}
                    className="w-full p-2.5 rounded-2xl hover:bg-violet-500/15 border border-zinc-800 hover:border-violet-500/40 flex items-center gap-2.5 text-left transition"
                  >
                    <ShieldCheck className="w-4 h-4 text-violet-400" />
                    <div>
                      <div className="text-xs font-black text-white">Arena HQ Admin</div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase">Admin HQ View</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right User Profile, Notifications & Sign Out */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-emerald-400 relative transition shadow-md"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </button>
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-white pb-2 border-b border-zinc-800">
                    <span>Push Notifications</span>
                    <button onClick={() => setShowNotifDropdown(false)} className="text-zinc-400">✕</button>
                  </div>
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 rounded-2xl bg-black border border-zinc-800 shadow-sm">
                      <p className="text-xs font-black text-emerald-400 uppercase">{n.title}</p>
                      <p className="text-[11px] text-zinc-300 mt-1 font-medium">{n.desc}</p>
                      <span className="text-[10px] text-zinc-500 font-bold">{n.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              onClick={() => {
                if (currentUser.role === 'PLAYER') {
                  setPortalMode('PLAYER');
                  setPlayerTab('PROFILE');
                }
              }}
              className="flex items-center gap-2.5 bg-zinc-900 border border-zinc-800 pl-2.5 pr-4 py-1.5 rounded-2xl shadow-md"
            >
              <img src={currentUser.avatar} alt="" className="w-7 h-7 rounded-xl object-cover border border-emerald-500" />
              <div className="hidden md:block text-left">
                <span className="block text-xs font-black text-zinc-200 uppercase tracking-tight leading-none">
                  {currentUser.name.split(' ')[0]}
                </span>
                <span className="block text-[9px] font-black uppercase text-emerald-400 tracking-wider mt-0.5">
                  {currentUser.role}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-zinc-900 hover:bg-rose-500/15 border border-zinc-800 hover:border-rose-500/50 text-zinc-400 hover:text-rose-400 transition text-xs font-black uppercase tracking-wider shadow-md"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 pt-6">
        {portalMode === 'PLAYER' && (
          <>
            {playerTab === 'HOME' && renderPlayerHomeTab()}
            {playerTab === 'EXPLORE' && renderPlayerExploreTab()}
            {playerTab === 'COMMUNITY' && renderPlayerCommunityTab()}
            {playerTab === 'BOOKINGS' && renderPlayerBookingsTab()}
            {playerTab === 'PROFILE' && renderPlayerProfileTab()}
          </>
        )}
        {portalMode === 'OWNER' && renderOwnerDashboard()}
        {portalMode === 'ADMIN' && renderAdminControlCenter()}
        {portalMode === 'ARCHITECTURE' && renderArchitectureView()}
      </main>

      {/* Mobile-First 5-Tab Bottom Navigation Bar (Visible in Player Mode) */}
      {portalMode === 'PLAYER' && (
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-2xl border-t border-zinc-800 px-3 py-2.5">
          <div className="max-w-lg mx-auto grid grid-cols-5 gap-1.5">
            {[
              { id: 'HOME', label: 'Home', icon: Home },
              { id: 'EXPLORE', label: 'Explore', icon: Compass },
              { id: 'COMMUNITY', label: 'Community', icon: Users },
              { id: 'BOOKINGS', label: 'Bookings', icon: Calendar },
              { id: 'PROFILE', label: 'Profile', icon: User }
            ].map((tab) => {
              const IconComp = tab.icon;
              const active = playerTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setPlayerTab(tab.id)}
                  className={`flex flex-col items-center justify-center py-2 rounded-2xl transition ${
                    active ? 'text-emerald-400 bg-emerald-500/15 font-black shadow-inner scale-105' : 'text-zinc-400 hover:text-zinc-200 font-semibold'
                  }`}
                >
                  <IconComp className="w-5 h-5" />
                  <span className="text-[10px] mt-1 uppercase tracking-wider">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* ==================================================================== */}
      {/* MODAL 1: DETAILED TURF & REDIS CONCURRENCY SLOT SELECTION DRAWER     */}
      {/* ==================================================================== */}
      {activeTurf && activePitch && (
        <div className="fixed inset-0 z-40 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.9)] p-5 sm:p-8 space-y-6">
            {/* Top Bar */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-5">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider">
                    {activeTurf.city} • ★ {activeTurf.rating}
                  </span>
                  <span className="text-xs text-zinc-400 font-bold">{activeTurf.openHours}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 uppercase italic tracking-tight">{activeTurf.name}</h2>
                <p className="text-xs text-zinc-400 font-medium">{activeTurf.address}</p>
              </div>
              <button
                onClick={() => setActiveTurfId(null)}
                className="p-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 7 Cols: Pitch Selector, Date Picker, Live Slot Grid & Concurrency Simulator */}
              <div className="lg:col-span-7 space-y-5">
                {/* Step 1: Select Playing Area / Pitch */}
                <div>
                  <label className="text-xs font-black text-zinc-300 uppercase tracking-widest block mb-2.5">
                    1. Select Playing Pitch / Court
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeTurf.pitches.map((pitch) => {
                      const isSelected = pitch.id === activePitch.id;
                      return (
                        <button
                          key={pitch.id}
                          onClick={() => {
                            setSelectedPitchId(pitch.id);
                            setSelectedSlots([]);
                          }}
                          className={`p-4 rounded-2xl border text-left transition shadow-md ${
                            isSelected
                              ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                              : 'bg-black border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-emerald-400 uppercase">{pitch.sport}</span>
                            <span className="text-[10px] text-zinc-400 font-bold">{pitch.dimensions}</span>
                          </div>
                          <p className="text-xs font-black text-white uppercase mt-1">{pitch.name}</p>
                          <p className="text-[11px] text-zinc-400 mt-1 font-semibold">
                            Day: {formatINR(pitch.basePrice)} • Peak: {formatINR(pitch.peakPrice)}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Date Picker */}
                <div>
                  <label className="text-xs font-black text-zinc-300 uppercase tracking-widest block mb-2.5">
                    2. Select Date
                  </label>
                  <div className="flex gap-2.5 overflow-x-auto pb-1">
                    {[
                      { date: '2026-10-16', label: 'Today, 16 Oct' },
                      { date: '2026-10-17', label: 'Sat, 17 Oct' },
                      { date: '2026-10-18', label: 'Sun, 18 Oct' },
                      { date: '2026-10-19', label: 'Mon, 19 Oct' }
                    ].map((d) => (
                      <button
                        key={d.date}
                        onClick={() => {
                          setSelectedDate(d.date);
                          setSelectedSlots([]);
                        }}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider border whitespace-nowrap transition shadow-sm ${
                          selectedDate === d.date
                            ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                            : 'bg-black text-zinc-300 border-zinc-800'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Real-Time Time-Slot Grid */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-black text-zinc-300 uppercase tracking-widest">
                      3. Select Time Slots (Real-Time Redis TTL)
                    </label>
                    {holdTimerSeconds > 0 && (
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 font-mono text-xs font-black flex items-center gap-1.5 shadow-md">
                        <Lock className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> TTL: {Math.floor(holdTimerSeconds / 60)}:
                        {String(holdTimerSeconds % 60).padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TIME_SLOTS.map((slot) => {
                      const status = getSlotStatus(activePitch.id, selectedDate, slot.id);
                      const price = slot.isPeak ? activePitch.peakPrice : activePitch.basePrice;
                      return (
                        <button
                          key={slot.id}
                          disabled={status === 'BOOKED' || status === 'MAINTENANCE'}
                          onClick={() => toggleSlotSelection(slot.id)}
                          className={`p-3.5 rounded-2xl border text-left transition relative shadow-md ${
                            status === 'HELD_BY_ME'
                              ? 'bg-emerald-500 text-black border-emerald-300 font-black shadow-[0_0_20px_rgba(34,197,94,0.5)] scale-105'
                              : status === 'BOOKED'
                              ? 'bg-zinc-900/40 border-zinc-800 text-zinc-600 cursor-not-allowed'
                              : status === 'MAINTENANCE'
                              ? 'bg-amber-950/30 border-amber-800/50 text-amber-500/70 cursor-not-allowed'
                              : 'bg-black border-zinc-800 text-zinc-200 hover:border-emerald-500/60'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-black">
                            <span>{slot.id}</span>
                            <span>{formatINR(price)}</span>
                          </div>
                          <div className="text-[10px] mt-1 opacity-80 font-bold">{slot.label}</div>
                          <div className="mt-2 text-[10px] font-black uppercase tracking-wider">
                            {status === 'HELD_BY_ME'
                              ? '🔒 Held by You'
                              : status === 'BOOKED'
                              ? '✗ Booked'
                              : status === 'MAINTENANCE'
                              ? '🛠 Maint.'
                              : slot.isPeak
                              ? '⚡ Peak Floodlight'
                              : 'Available'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Concurrency Race-Condition Simulator Box */}
                <div className="bg-black border border-zinc-800 rounded-3xl p-5 space-y-3 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Database className="w-4 h-4" /> Concurrency & Double-Booking Guard Test
                      </span>
                      <p className="text-[11px] text-zinc-400 font-medium">
                        Simulate a simultaneous player request to verify Redis `SET NX EX 300` & PostgreSQL `EXCLUDE USING gist`.
                      </p>
                    </div>
                    <button
                      onClick={simulateConcurrentAttempt}
                      className="px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase tracking-wider shrink-0 shadow-md"
                    >
                      Simulate Clash Attack
                    </button>
                  </div>

                  {concurrencyLogs.length > 0 && (
                    <div className="mt-2 space-y-2 max-h-32 overflow-y-auto font-mono text-[11px]">
                      {concurrencyLogs.map((log) => (
                        <div key={log.id} className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 shadow-sm">
                          [{log.timestamp}] {log.attacker} → <strong>{log.redisResult}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right 5 Cols: Server-Side Price Breakdown, Coupons, Squad Split & Checkout */}
              <div className="lg:col-span-5 bg-black border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-2xl">
                <div className="space-y-4">
                  <h3 className="text-base font-black text-white uppercase italic tracking-wider border-b border-zinc-800 pb-3">
                    Server-Calculated Checkout Summary
                  </h3>

                  {/* Coupon Input */}
                  <div>
                    <label className="text-xs text-zinc-400 font-bold block mb-1.5 uppercase tracking-wider">Promo Code (ARENA200, STRIKE50, NAGPUR10)</label>
                    <div className="flex gap-2.5">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-700 text-xs font-mono font-black text-white uppercase shadow-inner"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-black text-xs uppercase tracking-wider shadow-md"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Line Item Breakdown */}
                  <div className="space-y-2.5 text-xs pt-2 font-semibold">
                    <div className="flex justify-between text-zinc-300">
                      <span>Base Pitch Fee ({selectedSlots.length} hr)</span>
                      <span className="font-bold text-white">{formatINR(pricingSummary.baseTotal)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Coupon Discount ({appliedCoupon?.code || 'None'})</span>
                      <span>- {formatINR(pricingSummary.discount)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>GST (18% Govt. Tax)</span>
                      <span>{formatINR(pricingSummary.gst)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Platform Convenience Fee</span>
                      <span>{formatINR(pricingSummary.convenienceFee)}</span>
                    </div>
                    <div className="pt-3 border-t border-zinc-800 flex justify-between text-base font-black text-white">
                      <span>Total Payable</span>
                      <span className="text-emerald-400">{formatINR(pricingSummary.finalTotal)}</span>
                    </div>
                  </div>

                  {/* Squad Cost Splitter */}
                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-2.5 shadow-inner">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-300 font-bold uppercase tracking-wider">Squad Split ({squadSplitCount} players):</span>
                      <span className="text-emerald-400 font-black text-sm">
                        {formatINR(pricingSummary.perPlayer)} / head
                      </span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="22"
                      value={squadSplitCount}
                      onChange={(e) => setSquadSplitCount(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  {/* Gemini AI Pitch Scout & WhatsApp UPI Split Generator */}
                  <div className="bg-zinc-950 border border-emerald-500/40 rounded-2xl p-4 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 animate-spin" /> AI Pitch Scout & UPI Splitter
                        </span>
                        <p className="text-[10px] text-zinc-400 font-medium">
                          Stud recommendations & ready-to-share WhatsApp UPI collection message
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={aiPitchScoutLoading}
                        onClick={handleRunAiPitchScout}
                        className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-400/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0 shadow-md"
                      >
                        {aiPitchScoutLoading ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5" />
                        )}
                        Scout
                      </button>
                    </div>

                    {aiPitchScoutData && (
                      <div className="space-y-2 pt-2 border-t border-zinc-800 text-[11px]">
                        <p className="text-zinc-200 font-medium">
                          <strong className="text-emerald-400 uppercase">Footwear:</strong> {aiPitchScoutData.footwearRecommendation}
                        </p>
                        <p className="text-zinc-300 font-medium">
                          <strong className="text-cyan-400 uppercase">Surface/Lights:</strong> {aiPitchScoutData.lightingAndSurfaceVerdict}
                        </p>
                        <p className="text-zinc-400 font-medium">
                          <strong className="text-amber-400 uppercase">Tactics:</strong> {aiPitchScoutData.tacticalTipForDimensions}
                        </p>
                        <div className="mt-2.5 p-3 rounded-xl bg-black border border-zinc-800 flex items-center justify-between gap-2 shadow-inner">
                          <span className="text-[10px] text-zinc-300 font-mono line-clamp-2">
                            {aiPitchScoutData.whatsappUpiSplitMessage}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (navigator.clipboard) {
                                navigator.clipboard.writeText(aiPitchScoutData.whatsappUpiSplitMessage);
                              }
                              showToast('Copied WhatsApp UPI split request to clipboard!', 'success');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-black text-[10px] uppercase tracking-wider shrink-0 shadow-md"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    disabled={selectedSlots.length === 0}
                    onClick={() => setRazorpayModalOpen(true)}
                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition ${
                      selectedSlots.length > 0
                        ? 'bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-black shadow-[0_0_25px_rgba(34,197,94,0.5)] scale-[1.02]'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    {selectedSlots.length > 0
                      ? `Proceed to Razorpay (${formatINR(pricingSummary.finalTotal)})`
                      : 'Select Time Slot to Book'}
                  </button>
                  <p className="text-[10px] text-center text-zinc-500 font-bold uppercase tracking-widest">
                    100% Refundable up to 4 hrs before kickoff • 256-bit HMAC Verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 2: RAZORPAY CHECKOUT & WEBHOOK SIGNATURE SIMULATOR             */}
      {/* ==================================================================== */}
      {razorpayModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/9ைக்கு backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-md w-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
            <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-black p-5 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-400 text-black font-black flex items-center justify-center shadow-lg">
                  RZP
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight">Razorpay Trusted Checkout</h3>
                  <p className="text-xs text-zinc-400 font-bold">Arena AI Sports Tech Pvt. Ltd.</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block">Payable</span>
                <span className="text-lg font-black text-emerald-400">{formatINR(pricingSummary.finalTotal)}</span>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-3 gap-2.5">
                {['UPI', 'CARD', 'NETBANKING'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    className={`py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider border transition ${
                      paymentMethod === m
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                        : 'bg-black border-zinc-800 text-zinc-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {paymentMethod === 'UPI' && (
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">Select Instant UPI App:</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['GPay', 'PhonePe', 'Paytm'].map((app) => (
                      <button
                        key={app}
                        onClick={() => setUpiApp(app)}
                        className={`p-3 rounded-2xl border text-xs font-black uppercase tracking-wider transition ${
                          upiApp === app
                            ? 'bg-zinc-900 border-emerald-500 text-white shadow-md'
                            : 'bg-black border-zinc-800 text-zinc-400'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-black border border-zinc-800 rounded-2xl p-3.5 text-[11px] font-mono text-zinc-400 space-y-1 shadow-inner">
                <p className="text-emerald-400 font-black uppercase">Server Security Pipeline:</p>
                <p>1. Verify `razorpay_order_id` + `razorpay_payment_id`</p>
                <p>2. Compute HMAC-SHA256 with secret key</p>
                <p>3. Commit PostgreSQL transaction & release Redis hold</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setRazorpayModalOpen(false)}
                  className="px-4 py-3 rounded-2xl bg-zinc-900 text-zinc-400 text-xs font-black uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  disabled={paymentProcessing}
                  onClick={handleCompleteRazorpayPayment}
                  className="flex-1 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                >
                  {paymentProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Verifying HMAC...
                    </>
                  ) : (
                    <>Pay {formatINR(pricingSummary.finalTotal)} & Lock Slot</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 3: DIGITAL QR BOOKING RECEIPT                                  */}
      {/* ==================================================================== */}
      {activeReceiptBooking && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-xs font-mono font-black text-emerald-400 uppercase tracking-widest">VERIFIED DIGITAL GATE PASS</span>
                <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Booking #{activeReceiptBooking.id}</h3>
              </div>
              <button
                onClick={() => setActiveReceiptBooking(null)}
                className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center py-3">
              <div className="p-5 bg-white rounded-3xl shadow-2xl flex flex-col items-center">
                <QrCode className="w-32 h-32 text-black" />
                <span className="text-[10px] font-mono font-black text-black mt-2 tracking-widest">
                  {activeReceiptBooking.razorpayOrderId}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs bg-black p-4.5 rounded-3xl border border-zinc-800 shadow-inner font-semibold">
              <div className="flex justify-between">
                <span className="text-zinc-400">Venue:</span>
                <span className="font-black text-white text-right uppercase">{activeReceiptBooking.turfName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Pitch:</span>
                <span className="font-black text-emerald-400 uppercase">{activeReceiptBooking.pitchName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Date & Time:</span>
                <span className="font-black text-white">
                  {activeReceiptBooking.date} ({activeReceiptBooking.slots.join(', ')})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Paid (incl. GST):</span>
                <span className="font-black text-emerald-400">{formatINR(activeReceiptBooking.totalPaid)}</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-500 break-all">
                HMAC-SHA256: {activeReceiptBooking.razorpaySignature}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setNewMatchForm((prev) => ({ ...prev, bookingId: activeReceiptBooking.id }));
                  setActiveReceiptBooking(null);
                  setHostMatchModalOpen(true);
                }}
                className="flex-1 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider shadow-md"
              >
                Host Community Match
              </button>
              <button
                onClick={() => setActiveReceiptBooking(null)}
                className="px-5 py-3 rounded-2xl bg-zinc-900 text-zinc-300 font-black text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 4: HOST COMMUNITY MATCH LINKED TO CONFIRMED BOOKING            */}
      {/* ==================================================================== */}
      {hostMatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateLinkedMatch}
            className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">ANTI-FAKE MATCH VERIFICATION</span>
                <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Host Match from Booking</h3>
              </div>
              <button
                type="button"
                onClick={() => setHostMatchModalOpen(false)}
                className="p-2 rounded-xl bg-zinc-900 text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1.5">Select Confirmed Turf Booking</label>
              <select
                value={newMatchForm.bookingId}
                onChange={(e) => setNewMatchForm({ ...newMatchForm, bookingId: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-xs font-black text-emerald-400 uppercase shadow-inner"
              >
                {bookings
                  .filter((b) => b.bookingStatus === 'CONFIRMED')
                  .map((b) => (
                    <option key={b.id} value={b.id}>
                      #{b.id} — {b.turfName} ({b.date}, {b.slots.join(', ')})
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1.5">Match Title</label>
              <input
                type="text"
                required
                value={newMatchForm.title}
                onChange={(e) => setNewMatchForm({ ...newMatchForm, title: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-xs font-semibold text-white uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1.5">Skill Level</label>
                <select
                  value={newMatchForm.skillLevel}
                  onChange={(e) => setNewMatchForm({ ...newMatchForm, skillLevel: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-xs font-bold text-white uppercase"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Pro</option>
                  <option>All Levels</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1.5">Max Players</label>
                <input
                  type="number"
                  min="4"
                  max="24"
                  value={newMatchForm.maxPlayers}
                  onChange={(e) => setNewMatchForm({ ...newMatchForm, maxPlayers: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-xs font-bold text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1.5">Split Fee / Player (₹)</label>
                <input
                  type="number"
                  value={newMatchForm.feePerPlayer}
                  onChange={(e) => setNewMatchForm({ ...newMatchForm, feePerPlayer: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-xs font-bold text-white"
                />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 text-xs text-zinc-300 font-bold uppercase tracking-wider cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newMatchForm.approvalRequired}
                    onChange={(e) => setNewMatchForm({ ...newMatchForm, approvalRequired: e.target.checked })}
                    className="accent-emerald-500"
                  />
                  Require Approval
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                disabled={aiHypeLoading}
                onClick={handleGenerateMatchHypePost}
                className="flex-1 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/40 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
              >
                {aiHypeLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Drafting Hype...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" /> AI Draft Hype Post
                  </>
                )}
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              >
                Publish Match
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}