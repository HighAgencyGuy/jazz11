import { motion } from 'framer-motion';
import { CheckCircle, Truck, MessageCircle, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: CheckCircle,
    title: 'Curated Quality',
    description: 'Every piece is handpicked for quality, style, and lasting elegance.',
  },
  {
    icon: Truck,
    title: 'Abuja-Friendly Delivery',
    description: 'Fast delivery across Abuja. Nationwide shipping also available.',
  },
  {
    icon: MessageCircle,
    title: 'Easy WhatsApp Orders',
    description: 'Prefer to chat? Order directly via WhatsApp — we respond fast!',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Nigerian Boutique',
    description: 'Serving confident women since our founding. 500+ happy customers.',
  },
];

const WhyJazzSection = () => {
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
            Why JAZZ 11/11?
          </h2>
          <div className="divider-gold" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4 group-hover:bg-wine transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-wine group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJazzSection;
