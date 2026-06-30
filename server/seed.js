// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import Product from './models/Product.js';

// dotenv.config();

// const products = [
//   // ── Fruits ───────────────────────────────────────────────────────────────
//   {
//     name: 'Fresh Organic Apples',
//     price: 120,
//     category: 'Fruits',
//     image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
//     description: 'Crisp and juicy Himachal Pradesh apples grown without pesticides. Perfect for snacking and baking.',
//     stock: 80,
//     rating: 4.5,
//     unit: 'kg',
//   },
//   {
//     name: 'Alphonso Mangoes',
//     price: 280,
//     category: 'Fruits',
//     image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
//     description: 'King of mangoes — premium Alphonso variety from Ratnagiri, Maharashtra. Intensely sweet and aromatic.',
//     stock: 50,
//     rating: 4.9,
//     unit: 'kg',
//   },
//   {
//     name: 'Watermelon',
//     price: 35,
//     category: 'Fruits',
//     image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',
//     description: 'Sweet and hydrating farm-fresh watermelons. Great for summer refreshment.',
//     stock: 30,
//     rating: 4.6,
//     unit: 'piece',
//   },
//   {
//     name: 'Bananas',
//     price: 50,
//     category: 'Fruits',
//     image: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=400',
//     description: 'Naturally ripened Cavendish bananas — rich in potassium and perfect for energy.',
//     stock: 100,
//     rating: 4.4,
//     unit: 'dozen',
//   },
//   {
//     name: 'Strawberries',
//     price: 160,
//     category: 'Fruits',
//     image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
//     description: 'Plump and bright red strawberries from Mahabaleshwar, Maharashtra. Ideal for desserts and smoothies.',
//     stock: 40,
//     rating: 4.8,
//     unit: 'punnet',
//   },

//   // ── Vegetables ───────────────────────────────────────────────────────────
//   {
//     name: 'Farm Fresh Tomatoes',
//     price: 60,
//     category: 'Vegetables',
//     image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
//     description: 'Vine-ripened juicy tomatoes directly from local farms. Essential for curries, salads and soups.',
//     stock: 120,
//     rating: 4.7,
//     unit: 'kg',
//   },
//   {
//     name: 'Organic Spinach',
//     price: 45,
//     category: 'Vegetables',
//     image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
//     description: 'Tender dark green spinach leaves, freshly harvested. High in iron and vitamins.',
//     stock: 70,
//     rating: 4.3,
//     unit: 'bunch',
//   },
//   {
//     name: 'Broccoli',
//     price: 80,
//     category: 'Vegetables',
//     image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400',
//     description: 'Fresh green broccoli florets packed with fibre and antioxidants. Great for stir-fries and steaming.',
//     stock: 60,
//     rating: 4.5,
//     unit: 'kg',
//   },
//   {
//     name: 'Carrots',
//     price: 40,
//     category: 'Vegetables',
//     image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
//     description: 'Crunchy and naturally sweet orange carrots. Rich in beta-carotene — great raw or cooked.',
//     stock: 90,
//     rating: 4.4,
//     unit: 'kg',
//   },
//   {
//     name: 'Bell Peppers (Mixed)',
//     price: 95,
//     category: 'Vegetables',
//     image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
//     description: 'Colourful red, yellow and green bell peppers. Sweet and crunchy — perfect for salads and stir-fries.',
//     stock: 55,
//     rating: 4.6,
//     unit: 'kg',
//   },
//   {
//     name: 'Potatoes',
//     price: 30,
//     category: 'Vegetables',
//     image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
//     description: 'Fresh farm potatoes with smooth skin. Versatile for curries, fries, soups and more.',
//     stock: 150,
//     rating: 4.2,
//     unit: 'kg',
//   },
//   {
//     name: 'Onions',
//     price: 25,
//     category: 'Vegetables',
//     image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400',
//     description: 'Premium red onions from Nashik — the onion capital of India. Essential kitchen staple.',
//     stock: 200,
//     rating: 4.1,
//     unit: 'kg',
//   },
//   {
//     name: 'Cauliflower',
//     price: 50,
//     category: 'Vegetables',
//     image: 'https://images.unsplash.com/photo-1568584711271-6bf7d5a5d6f4?w=400',
//     description: 'Firm white cauliflower heads freshly picked. Great for aloo gobi, soups and roasting.',
//     stock: 65,
//     rating: 4.3,
//     unit: 'piece',
//   },

//   // ── Herbs ─────────────────────────────────────────────────────────────────
//   {
//     name: 'Fresh Basil',
//     price: 35,
//     category: 'Herbs',
//     image: 'https://images.unsplash.com/photo-1615551043360-33de8b5f410c?w=400',
//     description: 'Aromatic Italian basil leaves — fresh, fragrant and perfect for pasta, pesto and salads.',
//     stock: 45,
//     rating: 4.4,
//     unit: 'bunch',
//   },
//   {
//     name: 'Mint Leaves',
//     price: 20,
//     category: 'Herbs',
//     image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400',
//     description: 'Cool and refreshing fresh mint. Ideal for chutneys, drinks, raita and garnishes.',
//     stock: 80,
//     rating: 4.5,
//     unit: 'bunch',
//   },
//   {
//     name: 'Coriander (Dhania)',
//     price: 15,
//     category: 'Herbs',
//     image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400',
//     description: 'Fresh green coriander leaves — an essential garnish in Indian cooking. Vibrant and fragrant.',
//     stock: 100,
//     rating: 4.3,
//     unit: 'bunch',
//   },

//   // ── Organic ──────────────────────────────────────────────────────────────
//   {
//     name: 'Organic Avocado',
//     price: 150,
//     category: 'Organic',
//     image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
//     description: 'Creamy certified organic Hass avocados. Nutrient-dense and perfect for toast, salads and dips.',
//     stock: 35,
//     rating: 4.7,
//     unit: 'piece',
//   },
//   {
//     name: 'Organic Baby Greens',
//     price: 110,
//     category: 'Organic',
//     image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
//     description: 'Tender organic mixed baby greens — arugula, mizuna, kale and spinach. Packed with nutrients.',
//     stock: 40,
//     rating: 4.6,
//     unit: 'pack',
//   },

//   // ── Exotic ────────────────────────────────────────────────────────────────
//   {
//     name: 'Dragon Fruit',
//     price: 200,
//     category: 'Exotic',
//     image: 'https://images.unsplash.com/photo-1527325678964-54921661f888?w=400',
//     description: 'Vibrant pink dragon fruit with white speckled flesh. Mild sweet flavour, rich in vitamin C.',
//     stock: 25,
//     rating: 4.8,
//     unit: 'piece',
//   },
//   {
//     name: 'Kiwi Fruit',
//     price: 180,
//     category: 'Exotic',
//     image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400',
//     description: 'Imported premium kiwis with tangy-sweet bright green flesh. High in vitamin C and fibre.',
//     stock: 30,
//     rating: 4.7,
//     unit: 'pack',
//   },
// ];

// const seed = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log('✅ MongoDB connected');

//     // Clear existing products
//     await Product.deleteMany({});
//     console.log('🗑️  Cleared existing products');

//     // Insert demo products
//     const inserted = await Product.insertMany(products);
//     console.log(`🌱 Inserted ${inserted.length} products successfully!\n`);

//     inserted.forEach((p) => console.log(`  ✔ [${p.category}] ${p.name} — ₹${p.price}/${p.unit}`));

//     await mongoose.disconnect();
//     console.log('\n✅ Done! Seed complete.');
//   } catch (err) {
//     console.error('❌ Seed failed:', err.message);
//     process.exit(1);
//   }
// };

// seed();
