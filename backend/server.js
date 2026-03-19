const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── DATA FILES ──────────────────────────────────────────────────
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, '[]');

const readOrders = () => JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
const writeOrders = (data) => fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2));

// ─── PRODUCTS (in-memory, add DB later) ─────────────────────────
const products = [
  { id: '1', name: 'iPhone 15 Pro', category: 'Telefonlar', price: 12999000, stock: 15, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80', description: 'Apple iPhone 15 Pro, 256GB, Titan rangida. A17 Pro chip, USB-C, ProMotion displey.' },
  { id: '2', name: 'Samsung Galaxy S24 Ultra', category: 'Telefonlar', price: 10499000, stock: 10, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80', description: 'Samsung Galaxy S24 Ultra, 512GB, S Pen bilan. 200MP kamera, AI funksiyalar.' },
  { id: '3', name: 'MacBook Air M3', category: 'Noutbuklar', price: 18999000, stock: 8, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80', description: 'Apple MacBook Air 13", M3 chip, 16GB RAM, 512GB SSD. 18 soat batareya.' },
  { id: '4', name: 'Dell XPS 15', category: 'Noutbuklar', price: 15499000, stock: 5, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80', description: 'Dell XPS 15, Intel i9, 32GB RAM, 1TB SSD, OLED displey.' },
  { id: '5', name: 'Sony WH-1000XM5', category: 'Quloqchinlar', price: 3299000, stock: 20, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80', description: 'Sony WH-1000XM5 simsiz quloqchin. Eng yaxshi ANC, 30 soat batareya.' },
  { id: '6', name: 'AirPods Pro 2', category: 'Quloqchinlar', price: 2899000, stock: 25, image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80', description: 'Apple AirPods Pro 2-avlod, USB-C. Adaptive Audio, Personalized Spatial Audio.' },
  { id: '7', name: 'iPad Pro 12.9"', category: 'Planshetlar', price: 14999000, stock: 7, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80', description: 'Apple iPad Pro 12.9", M2 chip, 256GB, WiFi + Cellular. Liquid Retina XDR.' },
  { id: '8', name: 'Samsung Galaxy Tab S9+', category: 'Planshetlar', price: 9999000, stock: 9, image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&q=80', description: 'Samsung Galaxy Tab S9+, 512GB, S Pen kiritilgan. Dynamic AMOLED 2X displey.' },
  { id: '9', name: 'Apple Watch Ultra 2', category: 'Soatlar', price: 5999000, stock: 12, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80', description: 'Apple Watch Ultra 2, Titanium, 49mm. GPS + Cellular, 60 soat batareya.' },
  { id: '10', name: 'Samsung Galaxy Watch 6', category: 'Soatlar', price: 2499000, stock: 18, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', description: 'Samsung Galaxy Watch 6 Classic, 47mm. Rotating bezel, BioActive sensor.' },
  { id: '11', name: 'PlayStation 5', category: "O'yin konsollari", price: 8999000, stock: 6, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&q=80', description: "Sony PlayStation 5 Disc Edition. 825GB SSD, DualSense controller, 4K gaming." },
  { id: '12', name: 'Xbox Series X', category: "O'yin konsollari", price: 7999000, stock: 6, image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&q=80', description: 'Microsoft Xbox Series X, 1TB SSD. 120fps, Quick Resume, Game Pass.' },
  { id: '13', name: 'LG OLED C3 65"', category: 'Televizorlar', price: 22999000, stock: 4, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f4834a?w=500&q=80', description: 'LG OLED evo C3, 65 dyuym, 4K Smart TV. Dolby Vision IQ, 120Hz, webOS.' },
  { id: '14', name: 'Canon EOS R6 Mark II', category: 'Kameralar', price: 32999000, stock: 3, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80', description: 'Canon EOS R6 Mark II, 24.2MP. 40fps elektron parda, In-Body stabilizatsiya.' },
  { id: '15', name: 'Dyson V15 Detect', category: 'Maishiy texnika', price: 5499000, stock: 11, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', description: "Dyson V15 Detect simsiz changyutgich. Lazer ko'rinishi, HEPA filtr, 60 min." },
];

// ─── PRODUCTS ROUTES ─────────────────────────────────────────────
app.get('/api/products', (req, res) => {
  const { category, search, sort } = req.query;
  let list = [...products];
  if (category && category !== 'Barchasi') list = list.filter(p => p.category === category);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
  if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  res.json(list);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Mahsulot topilmadi' });
  res.json(product);
});

app.get('/api/categories', (req, res) => {
  const cats = ['Barchasi', ...new Set(products.map(p => p.category))];
  res.json(cats);
});

// ─── ORDERS ROUTES ───────────────────────────────────────────────
// POST - create order
app.post('/api/orders', (req, res) => {
  const { firstName, lastName, phone, address, items, total } = req.body;

  // Validation
  if (!firstName?.trim()) return res.status(400).json({ error: 'Ism kiritilmagan' });
  if (!lastName?.trim()) return res.status(400).json({ error: 'Familya kiritilmagan' });
  if (!phone?.trim()) return res.status(400).json({ error: 'Telefon kiritilmagan' });
  if (!address?.trim()) return res.status(400).json({ error: 'Manzil kiritilmagan' });
  if (!items?.length) return res.status(400).json({ error: 'Savat bo\'m-bo\'sh' });

  const order = {
    id: uuidv4(),
    orderNumber: `TB-${Date.now().toString().slice(-6)}`,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    phone: phone.trim(),
    address: address.trim(),
    items,
    total,
    status: 'Yangi',
    createdAt: new Date().toISOString(),
  };

  const orders = readOrders();
  orders.push(order);
  writeOrders(orders);

  res.status(201).json({ success: true, orderId: order.id, orderNumber: order.orderNumber });
});

// GET - all orders (admin)
app.get('/api/orders', (req, res) => {
  const orders = readOrders();
  res.json(orders.slice().reverse());
});

// GET - single order
app.get('/api/orders/:id', (req, res) => {
  const orders = readOrders();
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Zakaz topilmadi' });
  res.json(order);
});

// PATCH - update order status
app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Yangi', 'Qabul qilindi', 'Yetkazilmoqda', 'Yetkazildi', 'Bekor qilindi'];
  if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Noto\'g\'ri status' });
  const orders = readOrders();
  const idx = orders.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Zakaz topilmadi' });
  orders[idx].status = status;
  orders[idx].updatedAt = new Date().toISOString();
  writeOrders(orders);
  res.json(orders[idx]);
});

// DELETE - cancel order
app.delete('/api/orders/:id', (req, res) => {
  const orders = readOrders();
  const idx = orders.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Zakaz topilmadi' });
  orders.splice(idx, 1);
  writeOrders(orders);
  res.json({ success: true });
});

// ─── STATS (admin dashboard) ─────────────────────────────────────
app.get('/api/stats', (req, res) => {
  const orders = readOrders();
  const total = orders.reduce((s, o) => s + (o.total || 0), 0);
  const byStatus = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});
  res.json({
    totalOrders: orders.length,
    totalRevenue: total,
    newOrders: byStatus['Yangi'] || 0,
    deliveredOrders: byStatus['Yetkazildi'] || 0,
    byStatus,
  });
});

app.get('/', (req, res) => res.json({ status: 'TexnoBozor API ishlayapti', version: '1.0.0' }));

app.listen(PORT, () => {
  console.log(`✅ Server ishga tushdi: http://localhost:${PORT}`);
  console.log(`📦 Mahsulotlar: ${products.length} ta`);
});
