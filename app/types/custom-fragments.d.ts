/**
 * Custom TypeScript definitions for product and collection fragments
 * These fragments are not auto-generated but are used throughout the codebase
 */

export interface ProductItemFragment {
  id: string;
  title: string;
  handle: string;
  description?: string;
  productType?: string;
  tags?: string[];
  featuredImage?: {
    id: string;
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  priceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants?: {
    nodes: Array<{
      id: string;
      title?: string;
      availableForSale: boolean;
      price?: {
        amount: string;
        currencyCode: string;
      };
      compareAtPrice?: {
        amount: string;
        currencyCode: string;
      } | null;
      selectedOptions?: Array<{
        name: string;
        value: string;
      }>;
    }>;
  };
}

export interface CollectionItemFragment {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: {
    id: string;
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
}
