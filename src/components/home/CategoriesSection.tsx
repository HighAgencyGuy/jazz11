import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import dress1 from '@/assets/products/dress-1.jpg';
import twopiece1 from '@/assets/products/twopiece-1.jpg';
import corporate1 from '@/assets/products/corporate-1.jpg';
import casual1 from '@/assets/products/casual-1.jpg';
import top1 from '@/assets/products/top-1.jpg';
import skirt1 from '@/assets/products/skirt-1.jpg';
import shoes1 from '@/assets/products/shoes-1.jpg';
import bag1 from '@/assets/products/bag-1.jpg';

const categories = [
  { name: 'Dresses', image: dress1, count: 24 },
  { name: 'Two-Piece Sets', image: twopiece1, count: 18 },
  { name: 'Corporate Wear', image: corporate1, count: 15 },
  { name: 'Casual Wear', image: casual1, count: 20 },
  { name: 'Tops', image: top1, count: 32 },
  { name: 'Skirts', image: skirt1, count: 12 },
  { name: 'Shoes', image: shoes1, count: 16 },
  { name: 'Bags', image: bag1, count: 10 },
];

const CategoriesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
            Shop by Category
          </h2>
          <div className="divider-gold" />
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Explore our carefully curated collections designed for the modern Nigerian woman.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group block relative overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-lg md:text-xl font-medium text-primary-foreground">
                    {category.name}
                  </h3>
                  <p className="text-sm text-primary-foreground/70">
                    {category.count} items
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
