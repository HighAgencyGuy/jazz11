import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Package, Image, ShoppingCart, Settings, LogOut, Plus, Trash2, Edit, Eye, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminData, Product, GalleryImage } from '@/hooks/useAdminData';
import { ProductModal } from '@/components/admin/ProductModal';
import { GalleryModal } from '@/components/admin/GalleryModal';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type AdminTab = 'products' | 'gallery' | 'orders' | 'settings';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Modal states
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  
  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'product' | 'gallery'; id: string } | null>(null);
  
  // Settings form
  const [settingsForm, setSettingsForm] = useState({ whatsapp: '', email: '', location: '' });
  const [savingSettings, setSavingSettings] = useState(false);

  const {
    products,
    gallery,
    settings,
    loading,
    fetchProducts,
    fetchGallery,
    fetchSettings,
    updateSetting,
    deleteProduct,
    deleteGalleryImage,
  } = useAdminData();

  // Sync settings form when settings load
  useState(() => {
    if (settings.whatsapp || settings.email || settings.location) {
      setSettingsForm(settings);
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'jazz1111admin') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductModalOpen(true);
  };

  const handleAddGalleryImage = () => {
    setEditingImage(null);
    setGalleryModalOpen(true);
  };

  const handleEditGalleryImage = (image: GalleryImage) => {
    setEditingImage(image);
    setGalleryModalOpen(true);
  };

  const handleDeleteConfirm = (type: 'product' | 'gallery', id: string) => {
    setDeleteTarget({ type, id });
    setDeleteDialogOpen(true);
  };

  const handleDeleteExecute = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === 'product') {
        await deleteProduct(deleteTarget.id);
      } else {
        await deleteGalleryImage(deleteTarget.id);
      }
    } catch (error) {
      console.error(error);
    }
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      await Promise.all([
        updateSetting('whatsapp', settingsForm.whatsapp),
        updateSetting('email', settingsForm.email),
        updateSetting('location', settingsForm.location),
      ]);
      toast.success('Settings saved successfully');
      fetchSettings();
    } catch (error) {
      console.error(error);
    } finally {
      setSavingSettings(false);
    }
  };

  // Update settings form when data loads
  if (settings.whatsapp && !settingsForm.whatsapp) {
    setSettingsForm(settings);
  }

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
    { id: 'gallery' as const, label: 'Gallery', icon: Image, count: gallery.length },
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

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-wine" />
            </div>
          )}

          {/* Content Area */}
          {!loading && (
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
                    <Button className="btn-wine" onClick={handleAddProduct}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                  {products.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Products Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start by adding your first product.
                      </p>
                      <Button className="btn-wine" onClick={handleAddProduct}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </div>
                  ) : (
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
                          {products.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-secondary/50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  {product.images[0] ? (
                                    <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                  ) : (
                                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                                      <Package className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                  )}
                                  <span className="font-medium">{product.name}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                              <td className="py-3 px-4">₦{Number(product.price).toLocaleString()}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  product.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleEditProduct(product)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-destructive"
                                    onClick={() => handleDeleteConfirm('product', product.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'gallery' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl font-medium">Gallery Manager</h2>
                    <Button className="btn-wine" onClick={handleAddGalleryImage}>
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Images
                    </Button>
                  </div>
                  {gallery.length === 0 ? (
                    <div className="text-center py-12">
                      <Image className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Gallery Images Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start by uploading your first image.
                      </p>
                      <Button className="btn-wine" onClick={handleAddGalleryImage}>
                        <Plus className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {gallery.map((image) => (
                        <div key={image.id} className="relative group">
                          <img src={image.src} alt={image.alt} className="w-full aspect-square object-cover rounded-lg" />
                          <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                            <Button 
                              size="icon" 
                              variant="secondary"
                              onClick={() => handleEditGalleryImage(image)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="destructive"
                              onClick={() => handleDeleteConfirm('gallery', image.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{image.category}</p>
                        </div>
                      ))}
                    </div>
                  )}
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
                          <Label htmlFor="whatsapp">WhatsApp Number</Label>
                          <Input 
                            id="whatsapp"
                            type="text" 
                            value={settingsForm.whatsapp}
                            onChange={(e) => setSettingsForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                            placeholder="+234 XXX XXX XXXX"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email"
                            type="email" 
                            value={settingsForm.email}
                            onChange={(e) => setSettingsForm(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="email@example.com"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location"
                            type="text" 
                            value={settingsForm.location}
                            onChange={(e) => setSettingsForm(prev => ({ ...prev, location: e.target.value }))}
                            placeholder="Store address"
                            className="mt-1"
                          />
                        </div>
                        <Button 
                          className="btn-wine" 
                          onClick={handleSaveSettings}
                          disabled={savingSettings}
                        >
                          {savingSettings ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          ) : (
                            <Save className="w-4 h-4 mr-2" />
                          )}
                          Save Settings
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">How to Use This Dashboard</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground space-y-2">
                        <p><strong>Products:</strong> Add, edit, and manage your product catalog with images and pricing.</p>
                        <p><strong>Gallery:</strong> Upload and organize images for your lookbook and store gallery.</p>
                        <p><strong>Orders:</strong> Track customer orders when order system is enabled.</p>
                        <p><strong>Settings:</strong> Update store contact information and preferences.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ProductModal
        open={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        product={editingProduct}
        onSave={fetchProducts}
      />
      
      <GalleryModal
        open={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        image={editingImage}
        onSave={fetchGallery}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this {deleteTarget?.type}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteExecute} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Admin;
