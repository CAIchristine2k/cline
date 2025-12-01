import {type MetaFunction} from 'react-router';

export const meta: MetaFunction = () => {
  return [
    {title: 'Politique de Livraison | C\'Line Hair'},
    {
      name: 'description',
      content: 'Informations sur les délais et modes de livraison - C\'Line Hair',
    },
  ];
};

export default function Shipping() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Politique de Livraison
          </h1>

          <div className="text-gray-600 text-sm mb-8 text-center">
            Dernière mise à jour : 28 novembre 2025
          </div>

          <div className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">1. Zones de livraison</h2>
              <p className="text-gray-700 mb-4">
                C'LINE HAIR livre dans les zones suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>France métropolitaine</li>
                <li>DOM-TOM (Guadeloupe, Martinique, Guyane, Réunion, Mayotte)</li>
                <li>Union Européenne (Belgique, Luxembourg, Allemagne, Italie, Espagne, etc.)</li>
                <li>International (États-Unis, Canada, Afrique, etc.)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Pour toute destination non listée, contactez-nous à{' '}
                <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a>
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">2. Délais de livraison</h2>

              <div className="bg-primary/10 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-black mb-4">🇫🇷 France Métropolitaine</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Standard :</strong> 2 à 5 jours ouvrés</li>
                  <li><strong>Express :</strong> 24-48h (selon disponibilité)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-black mb-4">🇪🇺 Union Européenne</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Belgique, Luxembourg :</strong> 3-5 jours ouvrés</li>
                  <li><strong>Allemagne, Italie, Espagne :</strong> 4-7 jours ouvrés</li>
                  <li><strong>Autres pays UE :</strong> 5-10 jours ouvrés</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-black mb-4">🌍 International</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>États-Unis, Canada :</strong> 5-10 jours ouvrés</li>
                  <li><strong>Afrique, Asie :</strong> 7-14 jours ouvrés</li>
                  <li><strong>Autres destinations :</strong> 10-21 jours ouvrés</li>
                </ul>
              </div>

              <p className="text-gray-700 text-sm italic mt-4">
                ⚠️ Les délais sont donnés à titre <strong>indicatif</strong> et peuvent varier selon les périodes (fêtes, soldes, etc.). Un retard de livraison ne peut engager la responsabilité de C'LINE.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">3. Frais de livraison</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left">Destination</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Frais Standard</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Livraison Gratuite</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">France métropolitaine</td>
                      <td className="border border-gray-300 px-4 py-3">4,90 €</td>
                      <td className="border border-gray-300 px-4 py-3">À partir de 50 €</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">DOM-TOM</td>
                      <td className="border border-gray-300 px-4 py-3">9,90 €</td>
                      <td className="border border-gray-300 px-4 py-3">À partir de 100 €</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Union Européenne</td>
                      <td className="border border-gray-300 px-4 py-3">7,90 €</td>
                      <td className="border border-gray-300 px-4 py-3">À partir de 75 €</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">International</td>
                      <td className="border border-gray-300 px-4 py-3">12,90 €</td>
                      <td className="border border-gray-300 px-4 py-3">À partir de 150 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 mt-4 text-sm">
                * Les frais exacts sont calculés automatiquement lors du passage de commande en fonction de votre adresse et du poids total.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">4. Modes de livraison</h2>
              <p className="text-gray-700 mb-4">
                Selon votre pays, nous utilisons les transporteurs suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>La Poste / Colissimo</strong> - France et DOM-TOM</li>
                <li><strong>Mondial Relay</strong> - France et Belgique (points relais)</li>
                <li><strong>DHL / UPS</strong> - Europe et International</li>
                <li><strong>Chronopost</strong> - Livraison express France</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">5. Suivi de commande</h2>
              <p className="text-gray-700 mb-4">
                Dès l'expédition de votre colis, vous recevrez :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Un email de confirmation d'expédition</li>
                <li>Un numéro de suivi (tracking)</li>
                <li>Un lien pour suivre votre colis en temps réel</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Vous pouvez également suivre votre commande directement dans votre espace client.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">6. Traitement des commandes</h2>
              <p className="text-gray-700">
                Toutes les commandes passées <strong>du lundi au vendredi avant 14h</strong> sont traitées le jour même.
                Les commandes passées après 14h ou le week-end seront traitées le jour ouvré suivant.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">7. Problème de livraison</h2>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Colis perdu ou endommagé</h3>
              <p className="text-gray-700 mb-4">
                Si votre colis est perdu ou arrive endommagé :
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Contactez-nous immédiatement à <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a></li>
                <li>Envoyez des photos du colis endommagé (si applicable)</li>
                <li>Nous ouvrirons une enquête auprès du transporteur</li>
                <li>Un renvoi ou remboursement sera proposé</li>
              </ol>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Erreur d'adresse</h3>
              <p className="text-gray-700">
                Si vous avez saisi une mauvaise adresse, contactez-nous <strong>dans les 24h</strong> suivant la commande.
                Au-delà, nous ne pourrons modifier l'adresse et les frais de réexpédition seront à votre charge.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Colis non récupéré</h3>
              <p className="text-gray-700">
                Si vous ne récupérez pas votre colis dans les délais impartis (bureau de poste, point relais),
                celui-ci nous sera retourné. Les frais de réexpédition seront à votre charge.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">8. Douanes et taxes (hors UE)</h2>
              <p className="text-gray-700">
                Pour les livraisons hors Union Européenne, des frais de douane et taxes locales peuvent s'appliquer.
                Ces frais sont <strong>à la charge du destinataire</strong> et ne sont pas inclus dans le prix de la commande.
              </p>
              <p className="text-gray-700 mt-2">
                C'LINE décline toute responsabilité en cas de refus ou retard lié aux formalités douanières.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">9. Contact</h2>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant la livraison de votre commande :
              </p>
              <ul className="list-none space-y-2 text-gray-700">
                <li>📧 <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a></li>
                <li>📞 +33 6 52 21 93 25</li>
                <li>📍 C'LINE, 175 Rue du Président Roosevelt, 78100 Saint-Germain-en-Laye</li>
              </ul>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-12 text-center text-gray-500 text-sm">
              © 2025 C'LINE. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
