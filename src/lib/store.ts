
import { Product, Order, Category, ProductVariant } from './types';
import data from '@/app/lib/placeholder-images.json';

const getImg = (id: string) => data.placeholderImages.find(i => i.id === id)?.imageUrl || '';

let products: Product[] = [
  {
    id: 'p1',
    name: 'Midnight Jasmine',
    description: 'A seductive blend of night-blooming jasmine and warm amber, designed for those mysterious evenings.',
    category: 'Women',
    images: [getImg('perfume-1'), getImg('brand-story')],
    topNotes: ['Jasmine', 'Neroli'],
    middleNotes: ['Gardenia', 'Ylang-Ylang'],
    baseNotes: ['Amber', 'White Musk'],
    createdAt: new Date().toISOString(),
    variants: [
      { id: 'v1-1', productId: 'p1', size: '30ml', price: 85, stock: 15 },
      { id: 'v1-2', productId: 'p1', size: '50ml', price: 125, stock: 10 },
      { id: 'v1-3', productId: 'p1', size: '100ml', price: 195, stock: 5 },
    ]
  },
  {
    id: 'p2',
    name: 'Oud Imperial',
    description: 'The pinnacle of luxury. Rare oud wood harvested from ancient forests, balanced with spices and leather.',
    category: 'Unisex',
    images: [getImg('perfume-2')],
    topNotes: ['Saffron', 'Nutmeg'],
    middleNotes: ['Oud', 'Rose'],
    baseNotes: ['Leather', 'Vanilla', 'Sandalwood'],
    createdAt: new Date().toISOString(),
    variants: [
      { id: 'v2-1', productId: 'p2', size: '50ml', price: 210, stock: 8 },
      { id: 'v2-2', productId: 'p2', size: '100ml', price: 340, stock: 3 },
    ]
  },
  {
    id: 'p3',
    name: 'Coastal Breeze',
    description: 'Fresh, vibrant, and invigorating. Captures the essence of the Mediterranean shore at dawn.',
    category: 'Men',
    images: [getImg('perfume-3')],
    topNotes: ['Bergamot', 'Lemon'],
    middleNotes: ['Sea Salt', 'Sage'],
    baseNotes: ['Driftwood', 'Vetiver'],
    createdAt: new Date().toISOString(),
    variants: [
      { id: 'v3-1', productId: 'p3', size: '50ml', price: 95, stock: 20 },
      { id: 'v3-2', productId: 'p3', size: '100ml', price: 145, stock: 12 },
    ]
  }
];

let orders: Order[] = [];

export const ProductService = {
  getAll: () => products,
  getById: (id: string) => products.find(p => p.id === id),
  getByCategory: (cat: Category) => products.filter(p => p.category === cat),
  create: (p: Product) => { products.push(p); return p; },
  update: (id: string, updates: Partial<Product>) => {
    products = products.map(p => p.id === id ? { ...p, ...updates } : p);
  },
  delete: (id: string) => { products = products.filter(p => p.id !== id); }
};

export const OrderService = {
  getAll: () => orders,
  getById: (id: string) => orders.find(o => o.id === id),
  create: (o: Order) => { orders.unshift(o); return o; },
  updateStatus: (id: string, status: Order.status) => {
    orders = orders.map(o => o.id === id ? { ...o, status } : o);
  }
};
