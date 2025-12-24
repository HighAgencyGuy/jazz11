import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold">
              JAZZ <span className="text-gold">11/11</span>
            </h3>
            <p className="text-primary-foreground/70 leading-relaxed">
              Curated Nigerian fashion for the confident, modern woman. Based in Karu, Abuja.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/jazz1111"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com/@jazz1111"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/shop" className="text-primary-foreground/70 hover:text-gold transition-colors">Shop All</Link>
              <Link to="/gallery" className="text-primary-foreground/70 hover:text-gold transition-colors">Gallery</Link>
              <Link to="/about" className="text-primary-foreground/70 hover:text-gold transition-colors">About Us</Link>
              <Link to="/contact" className="text-primary-foreground/70 hover:text-gold transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">Policies</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/policies/delivery" className="text-primary-foreground/70 hover:text-gold transition-colors">Delivery Policy</Link>
              <Link to="/policies/returns" className="text-primary-foreground/70 hover:text-gold transition-colors">Returns & Exchange</Link>
              <Link to="/policies/privacy" className="text-primary-foreground/70 hover:text-gold transition-colors">Privacy Policy</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">Visit Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-gold" />
                <p className="text-primary-foreground/70">
                  Karu, Abuja<br />Nigeria
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold" />
                <a href="tel:+2348012345678" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  +234 801 234 5678
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold" />
                <a href="mailto:hello@jazz1111.com" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  hello@jazz1111.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 text-gold" />
                <p className="text-primary-foreground/70">
                  Mon - Sat: 9am - 7pm<br />
                  Sunday: 12pm - 5pm
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <p className="text-center text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} JAZZ 11/11. All rights reserved. Made with love in Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
