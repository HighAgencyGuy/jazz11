import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

const VisitUsSection = () => {
  return (
    <section className="section-padding bg-foreground text-primary-foreground">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-medium">
              Visit Our Boutique
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed">
              Experience the JAZZ 11/11 collection in person. Our friendly team is ready 
              to help you find the perfect pieces for any occasion.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-gold mt-1" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-primary-foreground/70">Karu, Abuja, Nigeria</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-gold mt-1" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+2348012345678" className="text-primary-foreground/70 hover:text-gold transition-colors">
                    +234 801 234 5678
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-gold mt-1" />
                <div>
                  <p className="font-medium">Opening Hours</p>
                  <p className="text-primary-foreground/70">Mon - Sat: 9am - 7pm</p>
                  <p className="text-primary-foreground/70">Sunday: 12pm - 5pm</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/2348012345678?text=Hello! I'd like to schedule a visit to your boutique."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-foreground font-medium rounded-lg hover:bg-gold-light transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Schedule Visit via WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden h-80 md:h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126093.79725797995!2d7.383749449999999!3d9.081999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b87f75c9eaf%3A0x3d0b9b1c5e8c69c!2sKaru%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="JAZZ 11/11 Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisitUsSection;
