import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  // ── Fruits ────────────────────────────────────────────────────────────────
  {
    name: 'Fresh Alphonso Mangoes',
    price: 280,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80',
    description: 'King of Mangoes — premium Ratnagiri Alphonso. Extremely sweet, rich, creamy, and aromatic texture.',
    stock: 50,
    rating: 4.9,
    unit: 'kg',
  },
  {
    name: 'Royal Gala Apples',
    price: 180,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80',
    description: 'Crisp, sweet, and locally sourced Himachal apples. High in dietary fibre and antioxidants.',
    stock: 80,
    rating: 4.6,
    unit: 'kg',
  },
  {
    name: 'Red Seedless Grapes',
    price: 140,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500&auto=format&fit=crop&q=80',
    description: 'Sweet and juicy seedless red grapes, freshly plucked. Great for healthy snacking or fresh salads.',
    stock: 65,
    rating: 4.5,
    unit: 'kg',
  },

  // ── Dairy ─────────────────────────────────────────────────────────────────
  {
    name: 'Fresh Farm Paneer',
    price: 160,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80',
    description: 'Soft and delicious cottage cheese made from pure pasteurized farm milk. 100% natural with no preservatives.',
    stock: 40,
    rating: 4.8,
    unit: '500g',
  },
  {
    name: 'Organic Desi Cow Milk',
    price: 75,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
    description: 'Pure, raw A2 desi cow milk. Rich in essential nutrients and delivered fresh within hours of milking.',
    stock: 120,
    rating: 4.7,
    unit: 'litre',
  },
  {
    name: 'Pure Golden Ghee',
    price: 650,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80',
    description: 'Traditional Bilona method cow ghee. Extremely aromatic, healthy, and granular, perfect for daily meals.',
    stock: 35,
    rating: 4.9,
    unit: 'kg',
  },

  // ── Vegetables ────────────────────────────────────────────────────────────
  {
    name: 'Vine-Ripened Tomatoes',
    price: 50,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
    description: 'Plump, juicy, and vine-ripened tomatoes directly from local farms. Essential for every kitchen cooking.',
    stock: 100,
    rating: 4.4,
    unit: 'kg',
  },
  {
    name: 'Fresh Green Broccoli',
    price: 90,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&auto=format&fit=crop&q=80',
    description: 'Nutrient-rich, premium quality green broccoli florets. Great source of vitamins, fibre, and minerals.',
    stock: 60,
    rating: 4.5,
    unit: 'kg',
  },
  {
    name: 'Organic Spinach (Palak)',
    price: 30,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80',
    description: 'Fresh, leafy green spinach bunches grown organically. Rich in iron, potassium, and vitamins.',
    stock: 75,
    rating: 4.6,
    unit: 'bunch',
  },

  // ── Grains ────────────────────────────────────────────────────────────────
  {
    name: 'Premium Basmati Rice',
    price: 140,
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
    description: 'Extra-long grain aromatic basmati rice. Aged to perfection to give you fluffy, separate grains when cooked.',
    stock: 150,
    rating: 4.8,
    unit: 'kg',
  },
  {
    name: 'Organic Whole Wheat Atta',
    price: 65,
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80',
    description: 'Stone-ground whole wheat flour. High fibre content ensures soft, healthy, and delicious rotis/chapatis.',
    stock: 200,
    rating: 4.6,
    unit: 'kg',
  },
  {
    name: 'Pearl Millet (Bajra)',
    price: 45,
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&auto=format&fit=crop&q=80',
    description: 'Nutritious gluten-free organic Bajra grains. Highly recommended for winters and balanced diets.',
    stock: 90,
    rating: 4.3,
    unit: 'kg',
  },

  // ── Beverages ─────────────────────────────────────────────────────────────
  {
    name: 'Tender Coconut Water',
    price: 55,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80',
    description: 'Naturally refreshing and sweet tender coconut water. Loaded with essential electrolytes.',
    stock: 80,
    rating: 4.9,
    unit: 'piece',
  },
  {
    name: 'Organic Green Tea Leaves',
    price: 199,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=80',
    description: 'Hand-picked organic green tea leaves from Darjeeling. Excellent antioxidant profile and fresh aroma.',
    stock: 45,
    rating: 4.5,
    unit: 'pack',
  },
  {
    name: 'Cold-Pressed Apple Juice',
    price: 120,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=80',
    description: '100% pure cold-pressed juice of sweet apples. No added sugar, water, or chemical preservatives.',
    stock: 60,
    rating: 4.6,
    unit: 'litre',
  },

  // ── Herbs ─────────────────────────────────────────────────────────────────
  {
    name: 'Fresh Coriander (Dhania)',
    price: 15,
    category: 'Herbs',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=500&auto=format&fit=crop&q=80',
    description: 'Fresh, bright green coriander leaves. Perfect for garnishing and preparation of spicy green chutneys.',
    stock: 150,
    rating: 4.7,
    unit: 'bunch',
  },
  {
    name: 'Fresh Mint Leaves (Pudina)',
    price: 20,
    category: 'Herbs',
    image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=500&auto=format&fit=crop&q=80',
    description: 'Cool and refreshing mint leaves. Great for cooking biryani, mint-chutney, or adding to summer drinks.',
    stock: 100,
    rating: 4.6,
    unit: 'bunch',
  },
  {
    name: 'Sweet Italian Basil',
    price: 40,
    category: 'Herbs',
    image: 'https://images.unsplash.com/photo-1615551043360-33de8b5f410c?w=500&auto=format&fit=crop&q=80',
    description: 'Aromatic sweet basil leaves. Highly essential for authentic pizzas, pasta sauces, and fresh pesto.',
    stock: 55,
    rating: 4.4,
    unit: 'bunch',
  },

  // ── Organic ───────────────────────────────────────────────────────────────
  {
    name: 'Organic Hass Avocados',
    price: 199,
    category: 'Organic',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80',
    description: 'Buttery, rich, and nutrient-dense organic Hass avocados. Certified organic grade product.',
    stock: 30,
    rating: 4.8,
    unit: 'piece',
  },
  {
    name: 'Organic Raw Chia Seeds',
    price: 150,
    category: 'Organic',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop&q=80',
    description: 'Premium quality organic raw chia seeds. Extremely high in Omega-3, fibre, and energy profiles.',
    stock: 70,
    rating: 4.5,
    unit: 'pack',
  },
  {
    name: 'Organic Wild Honey',
    price: 320,
    category: 'Organic',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80',
    description: 'Raw, unfiltered wild honey collected from dense forest hives. Retains all natural pollen benefits.',
    stock: 40,
    rating: 4.9,
    unit: '500g',
  },

  // ── Exotic ────────────────────────────────────────────────────────────────
  {
    name: 'Pink Dragon Fruit',
    price: 120,
    category: 'Exotic',
    image: 'https://images.unsplash.com/photo-1527325678964-54921661f888?w=500&auto=format&fit=crop&q=80',
    description: 'Vibrant exotic dragon fruit with beautiful speckled white/pink flesh. Refreshing sweet taste.',
    stock: 35,
    rating: 4.7,
    unit: 'piece',
  },
  {
    name: 'Premium Blueberries',
    price: 250,
    category: 'Exotic',
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=500&auto=format&fit=crop&q=80',
    description: 'Imported fresh premium blueberries. Sweet, tangy, and extremely rich in antioxidant compounds.',
    stock: 25,
    rating: 4.8,
    unit: 'pack',
  },
  {
    name: 'Thai Lemongrass Stalks',
    price: 60,
    category: 'Exotic',
    image: 'https://images.unsplash.com/photo-1595971295024-551041433b1e?w=500&auto=format&fit=crop&q=80',
    description: 'Fresh and highly aromatic lemongrass stalks. Perfect for Thai green curries, soups, and herbal tea infusions.',
    stock: 50,
    rating: 4.4,
    unit: '250g',
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert demo products
    const inserted = await Product.insertMany(products);
    console.log(`🌱 Inserted ${inserted.length} products successfully!\n`);

    inserted.forEach((p) => console.log(`  ✔ [${p.category}] ${p.name} — ₹${p.price}/${p.unit}`));

    await mongoose.disconnect();
    console.log('\n✅ Done! Seed complete.');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
