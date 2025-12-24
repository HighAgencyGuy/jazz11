import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | JAZZ 11/11 - Nigerian Fashion Boutique</title>
        <meta name="description" content="Get in touch with JAZZ 11/11. Visit our boutique in Karu, Abuja or contact us via WhatsApp, phone, or email." />
      </Helmet>

      <Header />
      <main className="pt-16 md:pt-20 bg-background min-h-screen">
        <section className="bg-secondary py-12 md:py-16">
          <div className="container-custom text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-3xl md:text-5xl font-medium text-foreground mb-4">
              Get in Touch
            </motion.h1>
            <p className="text-muted-foreground max-w-lg mx-auto">We'd love to hear from you. Reach out via WhatsApp for fastest response!</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div>
                  <h2 className="font-serif text-2xl font-medium mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4"><MapPin className="w-6 h-6 text-wine mt-1" /><div><p className="font-medium">Location</p><p className="text-muted-foreground">Karu, Abuja, Nigeria</p></div></div>
                    <div className="flex items-start gap-4"><Phone className="w-6 h-6 text-wine mt-1" /><div><p className="font-medium">Phone / WhatsApp</p><a href="tel:+2348141142258" className="text-muted-foreground hover:text-wine">+234 814 114 2258</a></div></div>
                    <div className="flex items-start gap-4"><Mail className="w-6 h-6 text-wine mt-1" /><div><p className="font-medium">Email</p><a href="mailto:skihyh@gmail.com" className="text-muted-foreground hover:text-wine">skihyh@gmail.com</a></div></div>
                    <div className="flex items-start gap-4"><Clock className="w-6 h-6 text-wine mt-1" /><div><p className="font-medium">Hours</p><p className="text-muted-foreground">Mon-Sat: 9am-7pm | Sun: 12pm-5pm</p></div></div>
                  </div>
                </div>
                <a href="https://wa.me/2348141142258" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-primary-foreground font-medium rounded-lg hover:bg-[#128C7E] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat on WhatsApp (Fastest)
                </a>
                <div className="rounded-xl overflow-hidden h-64"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126093.79725797995!2d7.383749449999999!3d9.081999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b87f75c9eaf%3A0x3d0b9b1c5e8c69c!2sKaru%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Location" /></div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="font-serif text-2xl font-medium mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  <Input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  <Textarea placeholder="Your Message" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                  <Button type="submit" size="lg" className="w-full btn-wine"><Send className="w-5 h-5 mr-2" />Send Message</Button>
                </form>
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

export default Contact;
