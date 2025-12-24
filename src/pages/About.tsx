import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import heroBanner from '@/assets/hero-banner.jpg';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | JAZZ 11/11 - Nigerian Fashion Boutique</title>
        <meta name="description" content="Learn about JAZZ 11/11, a premium Nigerian women's fashion boutique based in Karu, Abuja. Our story, mission, and commitment to African elegance." />
      </Helmet>

      <Header />
      <main className="pt-16 md:pt-20 bg-background">
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroBanner}
              alt="JAZZ 11/11 Fashion"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
          </div>
          
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-primary-foreground mb-6">
                Our Story
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Curated Nigerian fashion for the confident, modern woman.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-lg"
              >
                <h2 className="font-serif text-3xl font-medium text-foreground mb-6">
                  Bold Nigerian Styles for Confident Women
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  JAZZ 11/11 was born from a simple vision: to celebrate the elegance, 
                  confidence, and strength of Nigerian women through fashion. Based in 
                  the heart of Karu, Abuja, we've built a boutique that understands what 
                  the modern Nigerian woman needs in her wardrobe.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Every piece in our collection is carefully selected to ensure quality, 
                  style, and lasting elegance. From corporate power suits that command 
                  the boardroom to flowing dresses perfect for Sunday service or that 
                  special owambe, we curate fashion that fits your life.
                </p>

                <div className="my-12 p-8 bg-secondary rounded-xl">
                  <h3 className="font-serif text-2xl font-medium text-foreground mb-4">
                    Our Promise
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold mt-2" />
                      <span>Curated quality pieces that last beyond seasons</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold mt-2" />
                      <span>Fashion that celebrates Nigerian beauty and style</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold mt-2" />
                      <span>Personalized shopping experience with genuine care</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold mt-2" />
                      <span>Fast and reliable delivery across Abuja</span>
                    </li>
                  </ul>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Whether you're a young professional building your wardrobe, a seasoned 
                  executive looking for statement pieces, or simply a woman who appreciates 
                  fine fashion – JAZZ 11/11 welcomes you. We believe every woman deserves 
                  to feel confident and beautiful in what she wears.
                </p>

                <h3 className="font-serif text-2xl font-medium text-foreground mb-4 mt-12">
                  Visit Us
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  Our boutique in Karu, Abuja is more than a store – it's an experience. 
                  Come browse our collection, try on pieces, and let our team help you 
                  find your perfect look. We're open Monday to Saturday, 9am to 7pm, 
                  and Sundays from 12pm to 5pm.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-border"
              >
                <Link to="/shop">
                  <Button size="lg" className="btn-wine w-full sm:w-auto">
                    Shop Our Collection
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/2348012345678?text=Hello! I'd like to learn more about JAZZ 11/11."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="btn-outline-wine w-full sm:w-auto">
                    Chat with Us
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default About;
