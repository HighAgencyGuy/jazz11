import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GalleryImage {
  id?: string;
  src: string;
  alt: string;
  category: string;
}

interface GalleryModalProps {
  open: boolean;
  onClose: () => void;
  image?: GalleryImage | null;
  onSave: () => void;
}

const categories = ['Lookbook', 'Customers', 'Store'];

export function GalleryModal({ open, onClose, image, onSave }: GalleryModalProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<GalleryImage>({
    src: '',
    alt: '',
    category: '',
  });

  useEffect(() => {
    if (image) {
      setForm(image);
    } else {
      setForm({ src: '', alt: '', category: '' });
    }
  }, [image, open]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setForm(prev => ({ ...prev, src: publicUrl }));
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.src || !form.alt || !form.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (image?.id) {
        const { error } = await supabase
          .from('gallery')
          .update({
            src: form.src,
            alt: form.alt,
            category: form.category,
          })
          .eq('id', image.id);

        if (error) throw error;
        toast.success('Image updated successfully');
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert({
            src: form.src,
            alt: form.alt,
            category: form.category,
          });

        if (error) throw error;
        toast.success('Image added to gallery');
      }

      onSave();
      onClose();
    } catch (error: any) {
      toast.error('Failed to save: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{image ? 'Edit Gallery Image' : 'Upload New Image'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Image *</Label>
            <div className="mt-2">
              {form.src ? (
                <div className="relative">
                  <img src={form.src} alt="" className="w-full h-48 object-cover rounded" />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute bottom-2 right-2"
                    onClick={() => setForm(prev => ({ ...prev, src: '' }))}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <label className="w-full h-48 border-2 border-dashed border-muted-foreground rounded flex flex-col items-center justify-center cursor-pointer hover:bg-muted">
                  {uploading ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2" />
                      <span className="text-sm">Click to upload image</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="alt">Caption / Alt Text *</Label>
            <Input
              id="alt"
              value={form.alt}
              onChange={(e) => setForm(prev => ({ ...prev, alt: e.target.value }))}
              placeholder="Describe this image"
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={form.category} onValueChange={(v) => setForm(prev => ({ ...prev, category: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="btn-wine" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {image ? 'Update' : 'Add to Gallery'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
