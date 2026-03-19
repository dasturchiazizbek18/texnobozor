# TexnoBozor — To'liq E-Commerce Loyiha

## Texnologiyalar
- **Frontend:** React 18 + Vite + React Router
- **Backend:** Node.js + Express
- **Ma'lumotlar:** JSON fayl (keyinroq MongoDB ga o'tkazish mumkin)

## Loyiha tuzilmasi
```
texnobozor/
  backend/
    server.js          ← Express REST API
    package.json
    data/
      orders.json      ← Zakazlar saqlanadi (avtomatik yaratiladi)
  frontend/
    src/
      App.jsx          ← Asosiy komponent, routing
      main.jsx         ← Entry point
      index.css        ← Global stillar
      api.js           ← Backend bilan aloqa (axios)
      context/
        CartContext.jsx ← Savat holati (React Context)
      components/
        Navbar.jsx      ← Yuqori navigatsiya
        BottomNav.jsx   ← Quyi navigatsiya (mobil)
        CartSidebar.jsx ← Savat paneli
        CheckoutModal.jsx ← Zakaz berish modali
        ProductCard.jsx ← Mahsulot kartasi
      pages/
        Home.jsx        ← Do'kon sahifasi
        Admin.jsx       ← Admin panel (zakazlar)
```

## O'rnatish

### 1. Backend
```bash
cd backend
npm install
npm start
# → http://localhost:5000
```

### 2. Frontend (yangi terminal)
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

## API Endpoints

| Method | URL | Tavsif |
|--------|-----|--------|
| GET | /api/products | Barcha mahsulotlar |
| GET | /api/products?category=X | Kategoriya filtri |
| GET | /api/products?search=X | Qidiruv |
| GET | /api/products/:id | Bitta mahsulot |
| GET | /api/categories | Kategoriyalar ro'yxati |
| POST | /api/orders | Yangi zakaz yaratish |
| GET | /api/orders | Barcha zakazlar |
| GET | /api/orders/:id | Bitta zakaz |
| PATCH | /api/orders/:id/status | Status yangilash |
| DELETE | /api/orders/:id | Zakaz o'chirish |
| GET | /api/stats | Statistika |

## Zakaz berish (POST /api/orders)
```json
{
  "firstName": "Ali",
  "lastName": "Karimov",
  "phone": "+998901234567",
  "address": "Toshkent, Chilonzor 5-kvartal, 12-uy",
  "items": [
    { "id": "1", "name": "iPhone 15 Pro", "qty": 1, "price": 12999000 }
  ],
  "total": 12999000
}
```

## Imkoniyatlar
- 15 mahsulot, 6 kategoriya
- Mahsulot qidiruv va filtrlash
- Savat (React Context bilan)
- Zakaz berish (ism, familya, telefon, manzil)
- Admin panel — zakazlarni ko'rish, status o'zgartirish, o'chirish
- Statistika kartalar
- To'liq mobil moslashuv (bottom nav, bottom sheet modal)
- React Router navigatsiya
