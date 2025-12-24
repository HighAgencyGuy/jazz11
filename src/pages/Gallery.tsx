import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { galleryImages, galleryCategories } from '@/data/gallery';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Gallery | JAZZ 11/11 - Nigerian Fashion Lookbook</title>
        <meta name="description" content="Explore our lookbook featuring Nigerian fashion inspiration. See how our customers style their JAZZ 11/11 pieces." />
      </Helmet>

      <Header />
      <main className="pt-16 md:pt-20 min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="container-custom text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl md:text-5xl font-medium text-foreground mb-4"
            >
              The Lookbook
            </motion.h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Style inspiration from our boutique and customers.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {galleryCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-wine text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-muted'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry Grid */}
            <div className="masonry-grid">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="masonry-item"
                >
                  <button
                    onClick={() => setLightboxImage(image.src)}
                    className="block w-full rounded-lg overflow-hidden group"
                  >
                    <div className="relative">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-end justify-start p-4">
                        {image.caption && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-primary-foreground font-medium">{image.caption}</p>
                            <p className="text-primary-foreground/70 text-sm">{image.category}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No images in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
              onClick={() => setLightboxImage(null)}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 text-primary-foreground hover:text-gold transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={lightboxImage}
                alt="Gallery image"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Gallery;
