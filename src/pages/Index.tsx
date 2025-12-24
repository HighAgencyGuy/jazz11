import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import WhyJazzSection from '@/components/home/WhyJazzSection';
import GalleryPreview from '@/components/home/GalleryPreview';
import ReviewsSection from '@/components/home/ReviewsSection';
import VisitUsSection from '@/components/home/VisitUsSection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>JAZZ 11/11 | Premium Nigerian Women's Fashion Boutique | Karu, Abuja</title>
        <meta name="description" content="Discover curated Nigerian fashion for confident women at JAZZ 11/11. Shop elegant dresses, two-piece sets, corporate wear & more. Based in Karu, Abuja with fast delivery." />
        <meta name="keywords" content="Nigerian fashion, women's fashion Abuja, boutique Nigeria, African fashion, corporate wear, dresses, two-piece sets, Karu Abuja" />
      </Helmet>

      <Header />
      <main className="pt-16 md:pt-20">
        <HeroSection />
        <CategoriesSection />
        <NewArrivalsSection />
        <WhyJazzSection />
        <GalleryPreview />
        <ReviewsSection />
        <VisitUsSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
