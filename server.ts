import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// In-memory data store for server REST API
let serverQueue = [
  {
    id: 'pq-1',
    queueNumber: 1,
    name: 'Amadou Koulibaly',
    phone: '+221 77 862 70 52',
    status: 'in_progress',
    createdAt: '14:20',
  },
  {
    id: 'pq-2',
    queueNumber: 2,
    name: 'Fallou Gaye',
    phone: '+221 77 111 11 11',
    status: 'waiting',
    createdAt: '14:35',
  },
  {
    id: 'pq-3',
    queueNumber: 3,
    name: 'Amy Diop',
    phone: '+221 77 111 11 11',
    status: 'waiting',
    createdAt: '14:42',
  },
];

let serverHistory = [
  {
    id: 'ph-1',
    queueNumber: 15,
    name: 'Karim Fall',
    phone: '+221 77 222 33 44',
    status: 'served',
    createdAt: 'Hier, 14h36',
    timeLabel: 'Hier, 14h36',
  },
  {
    id: 'ph-2',
    queueNumber: 16,
    name: 'Bakary Diassy',
    phone: '+221 77 862 70 52',
    status: 'served',
    createdAt: 'Hier, 14h36',
    timeLabel: 'Hier, 14h36',
  },
];

let isQueueOpen = true;

const salonsList = [
  {
    id: 'king-barber-1',
    name: 'King Barber',
    location: 'Mermoz, Dakar',
    address: 'Rue MZ 45, Mermoz',
    city: 'Dakar, Sénégal',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&auto=format&fit=crop&q=80',
    waitingCount: 15,
    isOpen: true,
    phone: '+221 33 824 10 20',
    website: 'https://kingbarber.sn',
    rating: 4.9,
    reviewCount: 128,
    category: 'Barber & Salon',
  },
  {
    id: 'king-barber-2',
    name: 'King Barber',
    location: 'Fann Résidence, Dakar',
    address: 'Avenue Cheikh Anta Diop',
    city: 'Dakar, Sénégal',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&auto=format&fit=crop&q=80',
    waitingCount: 8,
    isOpen: true,
    phone: '+221 77 123 45 67',
    website: 'https://kingbarber.sn',
    rating: 4.8,
    reviewCount: 94,
    category: 'Barbier',
  },
  {
    id: 'king-barber-3',
    name: 'King Barber Prestige',
    location: 'Almadies, Dakar',
    address: 'Route des Almadies',
    city: 'Dakar, Sénégal',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&auto=format&fit=crop&q=80',
    waitingCount: 5,
    isOpen: true,
    phone: '+221 78 456 78 90',
    website: 'https://kingbarber.sn',
    rating: 5.0,
    reviewCount: 210,
    category: 'Barber & Spa',
  },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health Check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Fotolou Backend API',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      isQueueOpen,
      activeQueueLength: serverQueue.length,
    });
  });

  // API Route: Auth - Send OTP
  app.post('/api/auth/otp/send', (req, res) => {
    const { phone } = req.body || {};
    if (!phone) {
      return res.status(400).json({ error: 'Numéro de téléphone requis' });
    }
    // Simulation OTP (Production gateway SMS)
    res.json({
      success: true,
      message: 'Code OTP envoyé par SMS',
      phone,
      demoCode: '123456',
    });
  });

  // API Route: Auth - Verify OTP
  app.post('/api/auth/otp/verify', (req, res) => {
    const { phone, otp } = req.body || {};
    if (!phone || !otp) {
      return res.status(400).json({ error: 'Téléphone et code OTP requis' });
    }

    res.json({
      success: true,
      token: `jwt_fotolou_${Date.now()}`,
      user: {
        id: 'usr_diassy',
        name: 'Bakary Diassy',
        phone,
        role: 'client',
      },
    });
  });

  // API Route: Auth - OAuth login
  app.post('/api/auth/oauth', (req, res) => {
    const { provider } = req.body || {};
    res.json({
      success: true,
      token: `jwt_fotolou_oauth_${Date.now()}`,
      user: {
        id: 'usr_diassy',
        name: 'Bakary Diassy',
        phone: '+221 77 862 70 52',
        role: 'client',
        provider: provider || 'google',
      },
    });
  });

  // API Route: Salons List
  app.get('/api/salons', (_req, res) => {
    res.json({
      success: true,
      salons: salonsList,
      total: salonsList.length,
    });
  });

  // API Route: Salon Details
  app.get('/api/salons/:id', (req, res) => {
    const salon = salonsList.find((s) => s.id === req.params.id) || salonsList[0];
    res.json({
      success: true,
      salon,
      liveQueueCount: serverQueue.length,
      isOpen: isQueueOpen,
    });
  });

  // API Route: Pro Queue - Get Current Queue & History
  app.get('/api/pro/queue', (_req, res) => {
    res.json({
      success: true,
      isOpen: isQueueOpen,
      queue: serverQueue,
      history: serverHistory,
      stats: {
        waiting: serverQueue.length,
        inProgress: serverQueue.filter((c) => c.status === 'in_progress').length,
        servedToday: serverHistory.filter((c) => c.status === 'served').length + 24,
      },
    });
  });

  // API Route: Pro Queue - Serve Client
  app.post('/api/pro/queue/serve', (req, res) => {
    const { clientId } = req.body || {};
    const client = serverQueue.find((c) => c.id === clientId);
    if (client) {
      serverQueue = serverQueue.filter((c) => c.id !== clientId);
      serverHistory = [
        {
          ...client,
          status: 'served',
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timeLabel: 'À l\'instant',
        },
        ...serverHistory,
      ];
    }
    res.json({
      success: true,
      queue: serverQueue,
      history: serverHistory,
    });
  });

  // API Route: Pro Queue - Skip Client
  app.post('/api/pro/queue/skip', (req, res) => {
    const { clientId } = req.body || {};
    const client = serverQueue.find((c) => c.id === clientId);
    if (client) {
      serverQueue = serverQueue.filter((c) => c.id !== clientId);
      serverQueue.push({ ...client, status: 'waiting' });
    }
    res.json({
      success: true,
      queue: serverQueue,
    });
  });

  // API Route: Pro Queue - Add Client Manually
  app.post('/api/pro/queue/add', (req, res) => {
    const { name, phone } = req.body || {};
    const nextNumber = serverQueue.length > 0
      ? Math.max(...serverQueue.map((c) => c.queueNumber)) + 1
      : 1;

    const newClient = {
      id: `pq-${Date.now()}`,
      queueNumber: nextNumber,
      name: name || 'Nouveau Client',
      phone: phone || '+221 77 000 00 00',
      status: serverQueue.length === 0 ? 'in_progress' : 'waiting',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    serverQueue.push(newClient);
    res.json({
      success: true,
      newClient,
      queue: serverQueue,
    });
  });

  // API Route: Pro Queue - Toggle Open/Close
  app.post('/api/pro/queue/toggle', (_req, res) => {
    isQueueOpen = !isQueueOpen;
    res.json({
      success: true,
      isQueueOpen,
    });
  });

  // API Route: Shop Products
  app.get('/api/shop/products', (_req, res) => {
    res.json({
      success: true,
      products: [
        {
          id: 'prod-1',
          name: 'Huile à Barbe Bio Premium',
          brand: 'King Barber Care',
          price: 12500,
          originalPrice: 15000,
          category: 'Huiles',
          image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&auto=format&fit=crop&q=80',
          rating: 4.9,
          reviewsCount: 38,
          inStock: true,
        },
        {
          id: 'prod-2',
          name: 'Cire Coiffante Mat Hold',
          brand: 'Dakar Grooming',
          price: 8000,
          category: 'Coiffage',
          image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&auto=format&fit=crop&q=80',
          rating: 4.8,
          reviewsCount: 22,
          inStock: true,
        },
        {
          id: 'prod-3',
          name: 'Shampoing Purifiant Menthe',
          brand: 'King Barber Care',
          price: 9500,
          category: 'Soins',
          image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80',
          rating: 4.7,
          reviewsCount: 19,
          inStock: true,
        },
      ],
    });
  });

  // Vite middleware for development vs Static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Fotolou Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
