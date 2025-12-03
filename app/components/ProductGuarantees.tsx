export function ProductGuarantees() {
  const guarantees = [
    {
      icon: '🚚',
      title: 'Livraison en 4 à 9 jours ouvrables',
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
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {guarantees.map((item, index) => (
            <div
              key={index}
              className={`
                p-4 flex items-start gap-3
                ${index < 2 ? 'border-b border-gray-200' : ''}
                ${index % 2 === 0 ? 'md:border-r border-gray-200' : ''}
              `}
            >
              <div className="text-2xl flex-shrink-0">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-black leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods - Inside the border */}
        <div className="pt-4 pb-4 border-t border-gray-200">
          <p className="text-gray-600 text-xs text-center mb-3">Moyens de paiement acceptés</p>
          <div className="flex flex-wrap items-center justify-center gap-2 px-4">
            {/* Klarna */}
            <div className="h-8 px-3 flex items-center justify-center bg-primary-light rounded-md">
              <span className="font-bold text-black text-xs">klarna</span>
            </div>

            {/* American Express */}
            <div className="h-8 px-3 flex items-center justify-center bg-white border border-gray-300 rounded-md">
              <img src="/images/amexnew.png" alt="American Express" className="h-full w-auto object-contain py-1" />
            </div>

            {/* Apple Pay */}
            <div className="h-8 px-3 flex items-center justify-center bg-white border border-gray-300 rounded-md">
              <img src="/images/apple-pay.png" alt="Apple Pay" className="h-5 w-auto object-contain" />
            </div>

            {/* Google Pay */}
            <div className="h-8 px-3 flex items-center justify-center bg-white border border-gray-300 rounded-md">
              <img src="/images/google-pay.png" alt="Google Pay" className="h-5 w-auto object-contain" />
            </div>

            {/* Mastercard SVG */}
            <div className="h-8 px-2 flex items-center justify-center bg-white rounded-md border border-gray-200">
              <svg className="h-5 w-8" viewBox="0 0 40 24">
                <circle cx="12" cy="12" r="10" fill="#0099DF" />
                <circle cx="28" cy="12" r="10" fill="#ED0006" fillOpacity="0.85" />
              </svg>
            </div>

            {/* Mastercard Image */}
            <div className="h-8 px-3 flex items-center justify-center bg-white rounded-md border border-gray-300">
              <img src="/images/mastercard.png" alt="Mastercard" className="h-5 w-auto object-contain" />
            </div>

            {/* PayPal */}
            <div className="h-8 px-3 flex items-center justify-center bg-[#0070BA] rounded-md">
              <span className="font-bold text-white text-xs">PayPal</span>
            </div>

            {/* Shop Pay */}
            <div className="h-8 px-3 flex items-center justify-center bg-white border border-gray-300 rounded-md">
              <img src="/images/shopp.webp" alt="Shop Pay" className="h-full w-auto object-contain py-1" />
            </div>

            {/* Visa */}
            <div className="h-8 px-3 flex items-center justify-center bg-white border border-gray-300 rounded-md">
              <img src="/images/visaa.webp" alt="Visa" className="h-full w-auto object-contain py-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
