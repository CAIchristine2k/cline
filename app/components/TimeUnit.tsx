import React from 'react';

interface TimeUnitProps {
  value: number;
  label: string;
}

export default function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="bg-black/60 backdrop-blur-sm border border-primary/30 p-4 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
      <div className="text-primary text-3xl font-bold hero-stat-glow">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-white text-sm tracking-wider">
        {label.toUpperCase()}
      </div>
    </div>
  );
}