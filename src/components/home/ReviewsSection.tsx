import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Adaeze O.',
    location: 'Maitama, Abuja',
    rating: 5,
    text: 'JAZZ 11/11 never disappoints! The quality of their two-piece sets is unmatched. I always get compliments at work.',
    date: 'November 2024',
  },
  {
    id: 2,
    name: 'Funke A.',
    location: 'Wuse 2, Abuja',
    rating: 5,
    text: 'Finally found a boutique that understands Nigerian women\'s fashion needs. Fast delivery and beautiful packaging too!',
    date: 'October 2024',
  },
  {
    id: 3,
    name: 'Chidinma E.',
    location: 'Garki, Abuja',
    rating: 5,
    text: 'The dresses are absolutely stunning. Perfect for owambe season. Will definitely be back for more!',
    date: 'December 2024',
  },
];

const ReviewsSection = () => {
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
            What Our Customers Say
          </h2>
          <div className="divider-gold" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-soft relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gold/30" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              
              <p className="text-foreground mb-4 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="pt-4 border-t border-border">
                <p className="font-medium text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
