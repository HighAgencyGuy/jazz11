import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const handleWhatsAppCheckout = () => {
    const itemsList = items.map(item => `• ${item.product.name} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity} - ${formatPrice(item.product.price * item.quantity)}`).join('\n');
    const message = `Hello! I'd like to place an order:\n\n${itemsList}\n\nTotal: ${formatPrice(totalPrice)}\n\nPlease confirm availability and delivery details.`;
    window.open(`https://wa.me/2348012345678?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet><title>Cart | JAZZ 11/11</title></Helmet>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="font-serif text-2xl mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some beautiful pieces to get started.</p>
            <Link to="/shop"><Button className="btn-wine">Browse Collection<ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet><title>Cart ({items.length}) | JAZZ 11/11</title></Helmet>
      <Header />
      <main className="pt-20 min-h-screen bg-background">
        <section className="section-padding">
          <div className="container-custom">
            <h1 className="font-serif text-3xl md:text-4xl font-medium mb-8">Shopping Cart</h1>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => (
                  <motion.div key={item.product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 p-4 bg-card rounded-lg">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-32 object-cover rounded-lg" />
                    <div className="flex-1">
                      <Link to={`/product/${item.product.id}`} className="font-serif text-lg font-medium hover:text-wine">{item.product.name}</Link>
                      <p className="text-sm text-muted-foreground">{item.selectedSize} • {item.selectedColor}</p>
                      <p className="font-semibold mt-1">{formatPrice(item.product.price)}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border rounded-lg">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 hover:bg-secondary"><Minus className="w-4 h-4" /></button>
                          <span className="px-3">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 hover:bg-secondary"><Plus className="w-4 h-4" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                  </motion.div>
                ))}
              </div>
              <div className="bg-card p-6 rounded-lg h-fit sticky top-24">
                <h3 className="font-serif text-xl font-medium mb-4">Order Summary</h3>
                <div className="space-y-2 pb-4 border-b">
                  <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>Calculated at checkout</span></div>
                </div>
                <div className="flex justify-between font-semibold text-lg py-4"><span>Total</span><span>{formatPrice(totalPrice)}</span></div>
                <div className="space-y-3">
                  <Button onClick={handleWhatsAppCheckout} size="lg" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-primary-foreground">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Order via WhatsApp
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Fastest way to complete your order!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Cart;
