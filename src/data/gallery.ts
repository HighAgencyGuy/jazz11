import lookbook1 from '@/assets/gallery/lookbook-1.jpg';
import lookbook2 from '@/assets/gallery/lookbook-2.jpg';
import lookbook3 from '@/assets/gallery/lookbook-3.jpg';
import store1 from '@/assets/gallery/store-1.jpg';
import store2 from '@/assets/gallery/store-2.jpg';
import customer1 from '@/assets/gallery/customer-1.jpg';
import customer2 from '@/assets/gallery/customer-2.jpg';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  caption?: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: lookbook1,
    alt: 'African woman in elegant corporate dress with Abuja skyline',
    category: 'Photoshoot',
    caption: 'Golden Hour in Abuja',
  },
  {
    id: '2',
    src: lookbook2,
    alt: 'Nigerian woman in stylish two-piece outfit',
    category: 'New Drop',
    caption: 'Power Dressing Collection',
  },
  {
    id: '3',
    src: store1,
    alt: 'JAZZ 11/11 boutique interior',
    category: 'Store',
    caption: 'Visit Us in Karu, Abuja',
  },
  {
    id: '4',
    src: lookbook3,
    alt: 'Nigerian woman in stunning gold evening gown',
    category: 'Photoshoot',
    caption: 'Golden Goddess Collection',
  },
  {
    id: '5',
    src: customer1,
    alt: 'Happy customer shopping at JAZZ 11/11',
    category: 'Customers',
    caption: 'Our Beautiful Customers',
  },
  {
    id: '6',
    src: customer2,
    alt: 'Friends enjoying fashion shopping at JAZZ 11/11',
    category: 'Customers',
    caption: 'Fashion Friends',
  },
  {
    id: '7',
    src: store2,
    alt: 'JAZZ 11/11 boutique dress collection',
    category: 'Store',
    caption: 'Our Curated Collection',
  },
];

export const galleryCategories = [
  'All',
  'New Drop',
  'Photoshoot',
  'Customers',
  'Store',
  'Styling Ideas',
];
