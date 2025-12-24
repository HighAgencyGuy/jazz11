import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const priceRanges = [
  { label: 'Under ₦30,000', min: 0, max: 30000 },
  { label: '₦30,000 - ₦50,000', min: 30000, max: 50000 },
  { label: '₦50,000 - ₦80,000', min: 50000, max: 80000 },
  { label: 'Over ₦80,000', min: 80000, max: Infinity },
];

const colors = ['Burgundy', 'Black', 'Emerald Green', 'Gold/Cream', 'Wine', 'Nude', 'Navy'];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showInStock, setShowInStock] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Price filter
    if (selectedPriceRange) {
      const range = priceRanges.find(r => r.label === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(p => p.price >= range.min && p.price < range.max);
      }
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => 
        p.colors.some(c => selectedColors.includes(c))
      );
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes.some(s => selectedSizes.includes(s))
      );
    }

    // In stock filter
    if (showInStock) {
      filtered = filtered.filter(p => p.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        filtered = filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  }, [selectedCategory, selectedPriceRange, selectedColors, selectedSizes, showInStock, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange(null);
    setSelectedColors([]);
    setSelectedSizes([]);
    setShowInStock(false);
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedPriceRange || selectedColors.length > 0 || selectedSizes.length > 0 || showInStock;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
                className="accent-wine"
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <label key={range.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange === range.label}
                onChange={() => setSelectedPriceRange(range.label)}
                className="accent-wine"
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h4 className="font-medium mb-3">Color</h4>
        <div className="space-y-2">
          {colors.map(color => (
            <div key={color} className="flex items-center gap-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedColors([...selectedColors, color]);
                  } else {
                    setSelectedColors(selectedColors.filter(c => c !== color));
                  }
                }}
              />
              <Label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="font-medium mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => {
                if (selectedSizes.includes(size)) {
                  setSelectedSizes(selectedSizes.filter(s => s !== size));
                } else {
                  setSelectedSizes([...selectedSizes, size]);
                }
              }}
              className={`px-3 py-1 text-sm rounded border transition-colors ${
                selectedSizes.includes(size)
                  ? 'bg-wine text-primary-foreground border-wine'
                  : 'border-border hover:border-wine'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="in-stock"
          checked={showInStock}
          onCheckedChange={(checked) => setShowInStock(!!checked)}
        />
        <Label htmlFor="in-stock" className="text-sm cursor-pointer">
          In Stock Only
        </Label>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Shop | JAZZ 11/11 - Nigerian Women's Fashion</title>
        <meta name="description" content="Browse our collection of elegant dresses, two-piece sets, corporate wear and more. Premium Nigerian fashion for the modern woman." />
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
              Our Collection
            </motion.h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Curated Nigerian fashion pieces for the confident, modern woman.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Filters */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <h3 className="font-serif text-lg font-medium mb-6">Filters</h3>
                  <FilterContent />
                </div>
              </aside>

              {/* Products */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  </p>

                  <div className="flex items-center gap-4">
                    {/* Mobile Filter */}
                    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                      <SheetTrigger asChild className="lg:hidden">
                        <Button variant="outline" size="sm">
                          <SlidersHorizontal className="w-4 h-4 mr-2" />
                          Filters
                          {hasActiveFilters && (
                            <span className="ml-2 w-5 h-5 rounded-full bg-wine text-primary-foreground text-xs flex items-center justify-center">
                              !
                            </span>
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80 overflow-y-auto">
                        <h3 className="font-serif text-lg font-medium mb-6">Filters</h3>
                        <FilterContent />
                      </SheetContent>
                    </Sheet>

                    {/* Sort */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low → High</SelectItem>
                        <SelectItem value="price-high">Price: High → Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedCategory !== 'All' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm">
                        {selectedCategory}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('All')} />
                      </span>
                    )}
                    {selectedPriceRange && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm">
                        {selectedPriceRange}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedPriceRange(null)} />
                      </span>
                    )}
                  </div>
                )}

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {filteredProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">No products match your filters.</p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
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

export default Shop;
