import { useConfig } from '~/utils/themeContext';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'default' | 'dots' | 'pulse' | 'bars';
  color?: 'primary' | 'white' | 'gray';
}

export function LoadingSpinner({ 
  size = 'md', 
  className = '', 
  variant = 'default',
  color = 'primary'
}: LoadingSpinnerProps) {
  const config = useConfig();

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-primary',
    white: 'text-white',
    gray: 'text-gray-400'
  };

  if (variant === 'dots') {
    return (
      <div className={`flex space-x-1 ${className}`}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${sizeClasses[size]} ${colorClasses[color]} bg-current rounded-full animate-pulse`}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div 
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full bg-current animate-pulse ${className}`}
      />
    );
  }

  if (variant === 'bars') {
    return (
      <div className={`flex space-x-1 ${className}`}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-1 ${sizeClasses[size].split(' ')[1]} ${colorClasses[color]} bg-current animate-pulse`}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.8s'
            }}
          />
        ))}
      </div>
    );
  }

  // Default spinner
  return (
    <div 
      className={`${sizeClasses[size]} animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    >
      <svg 
        className={`${sizeClasses[size]} ${colorClasses[color]}`}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

// Skeleton loader for content
export function SkeletonLoader({ 
  lines = 3, 
  className = '',
  variant = 'text'
}: {
  lines?: number;
  className?: string;
  variant?: 'text' | 'card' | 'product';
}) {
  if (variant === 'card') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-gray-700/50 h-48 rounded-sm mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700/50 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (variant === 'product') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-gray-700/50 aspect-square rounded-sm mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/50 rounded w-full"></div>
          <div className="h-3 bg-gray-700/50 rounded w-2/3"></div>
          <div className="h-4 bg-gray-700/50 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <div 
          key={i}
          className="h-4 bg-gray-700/50 rounded"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
} 