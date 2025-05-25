import React from 'react';
import { cardStyles, accentStyles, inlineStyles } from '~/utils/styleUtils';

interface TimeUnitProps {
  value: number;
  label: string;
}

export default function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div 
      className={cardStyles.stat}
      style={inlineStyles.primaryWithOpacity(0.3)}
    >
      <div 
        className={`${accentStyles.primaryText} text-3xl font-bold ${accentStyles.glowText}`}
        style={inlineStyles.primaryText}
      >
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-white text-sm tracking-wider">
        {label.toUpperCase()}
      </div>
    </div>
  );
}