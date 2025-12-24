import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  images: string[];
  sizes: string[];
  in_stock: boolean;
  is_new: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  created_at: string;
}

export interface Settings {
  whatsapp: string;
  email: string;
  location: string;
}

export function useAdminData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [settings, setSettings] = useState<Settings>({ whatsapp: '', email: '', location: '' });
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load products');
      console.error(error);
    } else {
      setProducts(data || []);
    }
  };

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load gallery');
      console.error(error);
    } else {
      setGallery(data || []);
    }
  };

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('*');

    if (error) {
      toast.error('Failed to load settings');
      console.error(error);
    } else if (data) {
      const settingsObj: Settings = { whatsapp: '', email: '', location: '' };
      data.forEach(item => {
        if (item.key in settingsObj) {
          settingsObj[item.key as keyof Settings] = item.value;
        }
      });
      setSettings(settingsObj);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    const { error } = await supabase
      .from('settings')
      .update({ value })
      .eq('key', key);

    if (error) {
      toast.error('Failed to update setting');
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete product');
      throw error;
    }
    toast.success('Product deleted');
    fetchProducts();
  };

  const deleteGalleryImage = async (id: string) => {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete image');
      throw error;
    }
    toast.success('Image deleted');
    fetchGallery();
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchGallery(), fetchSettings()]);
      setLoading(false);
    };
    loadAll();
  }, []);

  return {
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
  };
}
