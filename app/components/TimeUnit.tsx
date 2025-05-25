interface TimeUnitProps {
  value: number;
  label: string;
}

export function TimeUnit({ value, label }: TimeUnitProps) {
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-black bg-opacity-70 border border-gold-500 rounded-lg p-3 w-16 md:w-20 h-16 md:h-20 flex items-center justify-center mb-1">
        <span className="text-2xl md:text-3xl font-bold text-white">{formatNumber(value)}</span>
      </div>
      <span className="text-xs uppercase text-gray-300">{label}</span>
    </div>
  );
}