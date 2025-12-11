export function ProductGuarantees() {
  const guarantees = [
    {
      icon: '🚚',
      title: 'Livraison en 4 à 5j ouvrés',
      subtitle: 'Rapide et fiable',
    },
    {
      icon: '📦',
      title: 'Retours faciles',
      subtitle: 'Sans prise de tête',
    },
    {
      icon: '💳',
      title: 'Paiement 100 % sécurisé',
      subtitle: 'Protégé et flexible',
    },
    {
      icon: '⭐',
      title: 'Qualité premium garantie',
      subtitle: 'Contrôlée avec soin',
    },
  ];

  return (
    <div className="mt-6 space-y-4">
      {/* Guarantees Grid */}
      <div className="rounded-lg overflow-hidden">
        <div className="grid grid-cols-2 gap-0">
          {guarantees.map((item, index) => (
            <div
              key={index}
              className={`
                p-4 flex items-start gap-3
                ${index < 2 ? 'border-b border-gray-200' : ''}
                ${index % 2 === 0 ? 'border-r border-gray-200' : ''}
              `}
            >
              <div className="text-2xl flex-shrink-0">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs md:text-sm font-bold text-black leading-tight">
                  {item.title}
                </h4>
                <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods - Inside the border */}
        <div className="pt-4 pb-4 border-t border-gray-200">
          <div className="flex items-center justify-center px-2">
            <img
              src="/images/paiement.webp"
              alt="Méthodes de paiement acceptées"
              className="w-full max-w-[280px] h-auto object-contain"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
