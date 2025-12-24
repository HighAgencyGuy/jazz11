import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Package, Image, ShoppingCart, Settings, LogOut, Plus, Trash2, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { products } from '@/data/products';
import { galleryImages } from '@/data/gallery';

type AdminTab = 'products' | 'gallery' | 'orders' | 'settings';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simple password protection for demo (in production, use proper auth)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'jazz1111admin') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Helmet>
          <title>Admin Login | JAZZ 11/11</title>
        </Helmet>
        <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Card>
              <CardHeader className="text-center">
                <h1 className="font-serif text-2xl font-semibold">
                  JAZZ <span className="text-gold">11/11</span>
                </h1>
                <CardTitle className="text-lg font-normal text-muted-foreground">Admin Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine"
                    />
                    {error && <p className="text-destructive text-sm mt-2">{error}</p>}
                  </div>
                  <Button type="submit" className="w-full btn-wine" size="lg">
                    Login to Dashboard
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Demo password: jazz1111admin
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </>
    );
  }

  const tabs = [
    { id: 'products' as const, label: 'Products', icon: Package, count: products.length },
    { id: 'gallery' as const, label: 'Gallery', icon: Image, count: galleryImages.length },
    { id: 'orders' as const, label: 'Orders', icon: ShoppingCart, count: 0 },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | JAZZ 11/11</title>
      </Helmet>
      <div className="min-h-screen bg-secondary">
        {/* Top Bar */}
        <header className="bg-foreground text-primary-foreground px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <h1 className="font-serif text-xl font-semibold">
              JAZZ <span className="text-gold">11/11</span> Admin
            </h1>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsLoggedIn(false)}
              className="text-primary-foreground hover:text-gold"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-wine text-primary-foreground shadow-lg'
                    : 'bg-card hover:bg-secondary'
                }`}
              >
                <tab.icon className="w-6 h-6" />
                <span className="font-medium">{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-primary-foreground/20' : 'bg-muted'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl p-6"
          >
            {activeTab === 'products' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-medium">Products Manager</h2>
                  <Button className="btn-wine">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">
                  Currently showing demo products. Connect to database to manage real products.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Product</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-left py-3 px-4">Price</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 8).map((product) => (
                        <tr key={product.id} className="border-b hover:bg-secondary/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                          <td className="py-3 px-4">₦{product.price.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-medium">Gallery Manager</h2>
                  <Button className="btn-wine">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Images
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">
                  Currently showing demo images. Connect to storage to upload real images.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img src={image.src} alt={image.alt} className="w-full aspect-square object-cover rounded-lg" />
                      <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button size="icon" variant="secondary"><Edit className="w-4 h-4" /></Button>
                        <Button size="icon" variant="destructive"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{image.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="font-serif text-2xl font-medium mb-6">Orders</h2>
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Orders Yet</h3>
                  <p className="text-muted-foreground">
                    Orders will appear here when customers place them.<br />
                    Currently using WhatsApp for orders.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="font-serif text-2xl font-medium mb-6">Store Settings</h2>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">WhatsApp Number</label>
                        <input 
                          type="text" 
                          defaultValue="+234 814 114 2258" 
                          className="w-full mt-1 px-4 py-2 border rounded-lg"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email Address</label>
                        <input 
                          type="email" 
                          defaultValue="skihyh@gmail.com" 
                          className="w-full mt-1 px-4 py-2 border rounded-lg"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Location</label>
                        <input 
                          type="text" 
                          defaultValue="Karu, Abuja, Nigeria" 
                          className="w-full mt-1 px-4 py-2 border rounded-lg"
                          disabled
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        To edit these settings, please contact support.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">How to Use This Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Products:</strong> View all your products. Full editing requires database connection.</p>
                      <p><strong>Gallery:</strong> View gallery images. Upload new images when storage is connected.</p>
                      <p><strong>Orders:</strong> Track customer orders when order system is enabled.</p>
                      <p><strong>Settings:</strong> Manage store contact information and preferences.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Admin;
