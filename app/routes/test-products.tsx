import React from 'react';
import {Link} from 'react-router';
import {useConfig} from '~/utils/themeContext';

// Mock products for testing
const mockProducts = [
  {
    id: 'mock-1',
    title: 'Test T-Shirt',
    handle: 'test-tshirt',
    description: 'A test t-shirt with customization option',
    tags: ['apparel', 'test'],
    featuredImage: {
      id: 'img-1',
      url: '/images/customization-preview.jpg',
      altText: 'Test T-Shirt',
      width: 500,
      height: 500,
    },
    priceRange: {
      minVariantPrice: {
        amount: '29.99',
        currencyCode: 'USD',
      },
      maxVariantPrice: {
        amount: '39.99',
        currencyCode: 'USD',
      },
    },
    variants: {
      nodes: [
        {
          id: 'variant-1',
          title: 'Small',
          availableForSale: true,
          price: {
            amount: '29.99',
            currencyCode: 'USD',
          },
        },
        {
          id: 'variant-2',
          title: 'Medium',
          availableForSale: true,
          price: {
            amount: '29.99',
            currencyCode: 'USD',
          },
        },
        {
          id: 'variant-3',
          title: 'Custom',
          availableForSale: true,
          price: {
            amount: '39.99',
            currencyCode: 'USD',
          },
        },
      ],
    },
    images: {
      nodes: [
        {
          url: '/images/customization-preview.jpg',
          altText: 'Test T-Shirt',
          width: 500,
          height: 500,
        },
      ],
    },
  },
  {
    id: 'mock-2',
    title: 'Test Hoodie',
    handle: 'test-hoodie',
    description: 'A test hoodie with customization option',
    tags: ['apparel', 'test'],
    featuredImage: {
      id: 'img-2',
      url: '/images/customization-preview.jpg',
      altText: 'Test Hoodie',
      width: 500,
      height: 500,
    },
    priceRange: {
      minVariantPrice: {
        amount: '49.99',
        currencyCode: 'USD',
      },
      maxVariantPrice: {
        amount: '59.99',
        currencyCode: 'USD',
      },
    },
    variants: {
      nodes: [
        {
          id: 'variant-4',
          title: 'Small',
          availableForSale: true,
          price: {
            amount: '49.99',
            currencyCode: 'USD',
          },
        },
        {
          id: 'variant-5',
          title: 'Medium',
          availableForSale: true,
          price: {
            amount: '49.99',
            currencyCode: 'USD',
          },
        },
        {
          id: 'variant-6',
          title: 'Custom',
          availableForSale: true,
          price: {
            amount: '59.99',
            currencyCode: 'USD',
          },
        },
      ],
    },
    images: {
      nodes: [
        {
          url: '/images/customization-preview.jpg',
          altText: 'Test Hoodie',
          width: 500,
          height: 500,
        },
      ],
    },
  },
];

export default function TestProducts() {
  const config = useConfig();

  return (
    <div className="py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Test Products</h1>

      <div className="mb-8">
        <p className="mb-4">
          Mock products available for testing customization:
        </p>
        <ul className="list-disc pl-6 mb-6">
          {mockProducts.map((product) => (
            <li key={product.id} className="mb-2">
              <strong>{product.title}</strong> - Variants:{' '}
              {product.variants.nodes.map((v) => v.title).join(', ')}
              {product.variants.nodes.some((v) => v.title === 'Custom') && (
                <span className="text-green-500 ml-2">
                  (Has Custom Variant)
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="bg-black/40 backdrop-blur-sm border border-primary/30 p-4 rounded-sm mb-6">
          <h2 className="text-xl font-bold mb-2">How to Test</h2>
          <p className="mb-4">
            Copy these mock products into your component for testing. Use the
            code below in your component:
          </p>
          <pre className="bg-gray-800 p-4 rounded-sm overflow-x-auto text-sm">
            {`
// Import this mock data
const mockProducts = ${JSON.stringify(mockProducts, null, 2)};

// Use it in your component
<CustomizableProductGrid products={mockProducts} />
            `}
          </pre>
        </div>
      </div>

      <div className="flex space-x-4">
        <Link
          to="/"
          className="inline-block bg-primary text-black px-4 py-2 rounded-sm"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
