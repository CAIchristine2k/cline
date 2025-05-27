import React from 'react';
import { Link } from 'react-router';
import { Sparkles, Pencil, ArrowRight } from 'lucide-react';
import { CustomizableProductCard } from '~/components/CustomizableProductCard';
import { ProductCard } from '~/components/ProductCard';
import { useConfig } from '~/utils/themeContext';

interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price?: any;
  compareAtPrice?: any;
}

interface Product {
  id: string;
  title: string;
  handle: string;
  description?: string;
  tags?: string[];
  featuredImage?: any;
  priceRange: any;
  variants: {
    nodes: ProductVariant[];
  };
}

interface CustomizableProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showViewAllLink?: boolean;
  maxProducts?: number;
  useProductCard?: boolean;
}

export function CustomizableProductGrid({
  products,
  title,
  subtitle,
  showViewAllLink = true,
  maxProducts = 4,
  useProductCard = false,
}: CustomizableProductGridProps) {
  const config = useConfig();
  
  // Use config values for title and subtitle if not provided as props
  const displayTitle = title || config.customizableProducts?.title || "Customize Your Own";
  const displaySubtitle = subtitle || config.customizableProducts?.subtitle || "Create one-of-a-kind products featuring your own photos, text, and designs.";
  
  // Add detailed debug logging
  console.log("CustomizableProductGrid - All products:", products?.length || 0);
  products?.forEach((product, i) => {
    console.log(`Product ${i+1}: ${product.title}`);
    console.log(`  Handle: ${product.handle}`);
    console.log(`  Tags: ${product.tags?.join(', ') || 'No tags'}`);
    
    // Log all variants
    const variants = product.variants?.nodes || [];
    console.log(`  Variants (${variants.length}):`);
    variants.forEach((variant, j) => {
      console.log(`    Variant ${j+1}: ${variant.title}`);
    });
    
    // Check if customizable
    const hasCustomVariant = variants.some(
      variant => variant?.title?.toLowerCase() === 'custom'
    );
    
    if (hasCustomVariant) {
      console.log('  ✓ HAS CUSTOM VARIANT');
    } else {
      console.log('  ✗ NO CUSTOM VARIANT');
    }
  });
  
  // Log all variant titles for easier debugging
  const allVariantTitles = products?.flatMap(product => 
    product.variants?.nodes?.map(variant => variant.title) || []
  );
  console.log("All variant titles:", allVariantTitles);

  // IMPORTANT: Only filter products that have a "custom" variant
  const customizableProducts = products
    .filter(product => 
      product.variants?.nodes?.some(
        variant => variant?.title?.toLowerCase() === 'custom'
      )
    )
    .slice(0, maxProducts);

  // If no customizable products found, don't render anything
  if (customizableProducts.length === 0) {
    console.log('No customizable products found with "custom" variants');
    return null;
  }

  console.log(`Found ${customizableProducts.length} products with custom variants`);

  return (
    <section className="section-spacing-y bg-gradient-to-b from-black via-gray-900/95 to-black">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            <Sparkles className="inline-block w-4 h-4 mr-2" />
            {config.customizableProducts?.badgeText || "Personalization"}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            <span className="text-primary">{displayTitle.split(' ')[0]}</span> {displayTitle.split(' ').slice(1).join(' ')}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {displaySubtitle}
          </p>
        </div>

        {/* Demo showcase */}
        <div className="mb-16 max-w-5xl mx-auto bg-black/60 backdrop-blur-sm border border-primary/30 rounded-sm overflow-hidden shadow-glow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-3 text-white">{config.customizableProducts?.showcaseTitle || "Create Custom Products"} <span className="text-primary">{config.customizableProducts?.showcaseTitleHighlight || "Your Way"}</span></h3>
              <p className="text-gray-300 mb-6">
                {config.customizableProducts?.showcaseDescription || "Upload your photos, add text, and personalize our products with our easy-to-use design tool."}
              </p>
              <ul className="mb-6 space-y-3">
                {(config.customizableProducts?.features || [
                  "Upload your own photos",
                  "Add custom text and styling",
                  "Choose colors and designs"
                ]).map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 bg-primary/20 rounded-full p-1 mt-1 mr-3">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to={config.customizableProducts?.ctaLink || "/customize-products"} className="inline-flex items-center bg-primary hover:bg-primary-600 text-black font-bold py-3 px-6 rounded-sm transition-all duration-300">
                {config.customizableProducts?.ctaText || "Start Designing"} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="bg-black/30 p-4">
              <img 
                src={config.customizableProducts?.showcaseImage || "/images/customization-preview.jpg"} 
                alt={config.customizableProducts?.showcaseImageAlt || "Product customization preview"} 
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 card-spacing">
          {customizableProducts.map((product) => (
            <div key={product.id} className="h-full">
              {useProductCard ? (
                <ProductCard product={product} />
              ) : (
                <CustomizableProductCard product={product} />
              )}
            </div>
          ))}
        </div>

        {/* View all link */}
        {showViewAllLink && customizableProducts.length >= maxProducts && (
          <div className="text-center mt-12">
            <Link 
              to={config.customizableProducts?.viewAllLink || "/customize-products"} 
              className="inline-flex items-center group"
            >
              <span className="text-primary hover:text-primary-400 font-semibold text-lg">
                {config.customizableProducts?.viewAllText || "View All Customizable Products"}
              </span>
              <ArrowRight className="ml-2 w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
} 