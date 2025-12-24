-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  in_stock BOOLEAN NOT NULL DEFAULT true,
  is_new BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create settings table
CREATE TABLE public.settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Public read access for products and gallery (storefront)
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Anyone can view gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Anyone can view settings" ON public.settings FOR SELECT USING (true);

-- Admin write access (using simple approach for demo - in production use proper auth)
CREATE POLICY "Allow all inserts for products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all updates for products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow all deletes for products" ON public.products FOR DELETE USING (true);

CREATE POLICY "Allow all inserts for gallery" ON public.gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all updates for gallery" ON public.gallery FOR UPDATE USING (true);
CREATE POLICY "Allow all deletes for gallery" ON public.gallery FOR DELETE USING (true);

CREATE POLICY "Allow all inserts for settings" ON public.settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all updates for settings" ON public.settings FOR UPDATE USING (true);

-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Storage policies for media bucket
CREATE POLICY "Public can view media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Anyone can upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');
CREATE POLICY "Anyone can update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media');
CREATE POLICY "Anyone can delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media');

-- Insert default settings
INSERT INTO public.settings (key, value) VALUES 
  ('whatsapp', '+234 814 114 2258'),
  ('email', 'skihyh@gmail.com'),
  ('location', 'Karu, Abuja, Nigeria');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();