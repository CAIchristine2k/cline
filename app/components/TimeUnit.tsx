import React from 'react';

interface TimeUnitProps {
  value: number;
  label: string;
}

export default function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div 
      className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-sm p-4 text-center"
    >
      <div 
        className="text-primary text-3xl font-bold drop-shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"
      >
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-white text-sm tracking-wider">
        {label.toUpperCase()}
      </div>
    </div>
  );
}