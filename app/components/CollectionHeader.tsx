import React from 'react';
import {Grid, Filter} from 'lucide-react';
import type {LandingPageConfig} from '~/utils/config';

interface CollectionHeaderProps {
  collection: {
    title: string;
    description?: string | null;
    products: {
      nodes: any[];
    };
  };
  config: LandingPageConfig;
}

export function CollectionHeader({ collection }: CollectionHeaderProps) {
  return (
    <>
      {/* Collection Header */}
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1 bg-gold-500/20 text-gold-500 text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
          Collection
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg">
            {collection.description}
          </p>
        )}
      </div>

      {/* Collection Tools */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">
            {collection.products.nodes.length} products
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-sm transition-colors duration-300 border border-gray-600">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-sm transition-colors duration-300 border border-gray-600">
            <Grid className="h-4 w-4" />
            <span>Sort</span>
          </button>
        </div>
      </div>
    </>
  );
}