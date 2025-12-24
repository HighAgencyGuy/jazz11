import dress1 from '@/assets/products/dress-1.jpg';
import twopiece1 from '@/assets/products/twopiece-1.jpg';
import top1 from '@/assets/products/top-1.jpg';
import corporate1 from '@/assets/products/corporate-1.jpg';
import casual1 from '@/assets/products/casual-1.jpg';
import skirt1 from '@/assets/products/skirt-1.jpg';
import shoes1 from '@/assets/products/shoes-1.jpg';
import bag1 from '@/assets/products/bag-1.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  fabric: string;
  careNotes: string;
  fitNotes: string;
  images: string[];
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Burgundy Elegance Gown',
    price: 85000,
    category: 'Dresses',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Burgundy', 'Black'],
    description: 'A stunning floor-length burgundy gown with elegant draping and embellished shoulders. Perfect for special occasions and evening events.',
    fabric: 'Premium chiffon with satin lining',
    careNotes: 'Dry clean only. Store on padded hanger.',
    fitNotes: 'Fits true to size. Flows beautifully at the waist.',
    images: [dress1],
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Emerald Power Suit',
    price: 75000,
    category: 'Two-Piece Sets',
    sizes: ['S', 'M', 'L'],
    colors: ['Emerald Green', 'Navy'],
    description: 'Make a bold statement with this tailored emerald green two-piece suit. Contemporary cut with belted waist for a flattering silhouette.',
    fabric: 'Structured blend with stretch',
    careNotes: 'Dry clean recommended. Iron on medium heat.',
    fitNotes: 'Fitted at waist. Consider sizing up for relaxed fit.',
    images: [twopiece1],
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Golden Royale Blouse',
    price: 35000,
    category: 'Tops',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gold/Cream'],
    description: 'Exquisite cream blouse with intricate gold embroidery. A true statement piece that elevates any outfit.',
    fabric: 'Pure silk with gold thread embroidery',
    careNotes: 'Hand wash cold or dry clean. Do not wring.',
    fitNotes: 'Relaxed fit. Beautiful with high-waisted bottoms.',
    images: [top1],
    inStock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Executive Black Suit',
    price: 68000,
    category: 'Corporate Wear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Charcoal'],
    description: 'Command the boardroom with this impeccably tailored black power suit. Sharp lines and premium finish.',
    fabric: 'Italian wool blend',
    careNotes: 'Dry clean only. Steam for best results.',
    fitNotes: 'Tailored fit. True to size.',
    images: [corporate1],
    inStock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Terra Comfort Dress',
    price: 42000,
    category: 'Casual Wear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Terracotta', 'Olive', 'Navy'],
    description: 'Effortlessly elegant midi dress in warm terracotta. Perfect for weekend brunches or casual Fridays.',
    fabric: 'Soft cotton blend',
    careNotes: 'Machine wash gentle. Tumble dry low.',
    fitNotes: 'Relaxed flowy fit. Very comfortable.',
    images: [casual1],
    inStock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: '6',
    name: 'Wine A-Line Skirt',
    price: 28000,
    category: 'Skirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Wine', 'Black', 'Cream'],
    description: 'Classic A-line skirt in rich wine color. Versatile piece that works from office to evening.',
    fabric: 'Structured crepe',
    careNotes: 'Dry clean or hand wash cold.',
    fitNotes: 'Sits at natural waist. Knee length.',
    images: [skirt1],
    inStock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: '7',
    name: 'Nude Elegance Pumps',
    price: 45000,
    category: 'Shoes',
    sizes: ['37', '38', '39', '40', '41', '42'],
    colors: ['Nude', 'Black'],
    description: 'Sophisticated pointed-toe stilettos in classic nude. The perfect heel for every occasion.',
    fabric: 'Premium patent leather',
    careNotes: 'Wipe with soft cloth. Store in dust bag.',
    fitNotes: 'True to size. 4-inch heel.',
    images: [shoes1],
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '8',
    name: 'Bordeaux Kelly Bag',
    price: 95000,
    category: 'Bags',
    sizes: ['One Size'],
    colors: ['Bordeaux', 'Black', 'Tan'],
    description: 'Luxurious structured handbag with gold hardware. A timeless investment piece.',
    fabric: 'Italian full-grain leather',
    careNotes: 'Store with tissue paper. Condition monthly.',
    fitNotes: 'Medium size. Fits essentials plus tablet.',
    images: [bag1],
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
];

export const categories = [
  'All',
  'Dresses',
  'Two-Piece Sets',
  'Corporate Wear',
  'Casual Wear',
  'Tops',
  'Skirts',
  'Shoes',
  'Bags',
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
