import lookbook1 from '@/assets/gallery/lookbook-1.jpg';
import lookbook2 from '@/assets/gallery/lookbook-2.jpg';
import store1 from '@/assets/gallery/store-1.jpg';

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
];

export const galleryCategories = [
  'All',
  'New Drop',
  'Photoshoot',
  'Customers',
  'Store',
  'Styling Ideas',
];
