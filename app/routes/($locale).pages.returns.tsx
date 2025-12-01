import {type MetaFunction} from 'react-router';

export const meta: MetaFunction = () => {
  return [
    {title: 'Politique de Retour | C\'Line Hair'},
    {
      name: 'description',
      content: 'Conditions de retour et d\'échange - C\'Line Hair',
    },
  ];
};

export default function Returns() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Politique de Retour & Remboursement
          </h1>

          <div className="text-gray-600 text-sm mb-8 text-center">
            Dernière mise à jour : 28 novembre 2025
          </div>

          <div className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">1. Droit de rétractation légal (14 jours)</h2>
              <p className="text-gray-700 mb-4">
                Conformément à l'article L221-18 du Code de la consommation, vous disposez d'un délai de <strong>14 jours</strong> à compter de la réception de votre commande pour exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalité.
              </p>
              <p className="text-gray-700">
                Cependant, ce droit de rétractation est soumis à des <strong>conditions strictes</strong> pour les produits capillaires (voir ci-dessous).
              </p>
            </section>

            {/* Section 2 - IMPORTANT */}
            <section className="mb-8 bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <h2 className="text-2xl font-bold text-black mb-4">2. ⚠️ EXCEPTIONS - Produits Capillaires (Hygiène)</h2>

              <p className="text-gray-700 mb-4">
                Conformément à l'article L221-28 du Code de la consommation, les produits scellés qui ont été descellés après la livraison et qui ne peuvent être renvoyés pour des raisons d'hygiène ou de protection de la santé <strong>ne peuvent pas faire l'objet d'une rétractation</strong>.
              </p>

              <div className="bg-white p-4 rounded mb-4">
                <h3 className="font-bold text-red-600 mb-3">❌ AUCUN RETOUR NI ÉCHANGE pour :</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Perruques déballées ou portées</li>
                  <li>Extensions capillaires ouvertes ou manipulées</li>
                  <li>Frontales et closures sorties de leur emballage</li>
                  <li>Produits coiffés, lavés, coupés ou modifiés</li>
                  <li>Produits dont le scellé de sécurité a été rompu</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded">
                <h3 className="font-bold text-green-600 mb-3">✅ RETOUR ACCEPTÉ uniquement si :</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Le produit n'a <strong>jamais été ouvert</strong></li>
                  <li>L'emballage d'origine est <strong>intact</strong> (scellé non rompu)</li>
                  <li>Le produit n'a <strong>jamais été porté, essayé ou manipulé</strong></li>
                  <li>Aucun contact avec les cheveux naturels</li>
                  <li>Tous les accessoires et étiquettes sont présents</li>
                </ul>
                <p className="text-gray-700 mt-4 text-sm italic">
                  Le retour doit être validé par notre service client <strong>avant tout renvoi</strong>.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">3. Comment effectuer un retour ?</h2>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Étape 1 : Demande de retour</h3>
              <p className="text-gray-700 mb-4">
                Envoyez un email à{' '}
                <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a>{' '}
                avec :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Votre numéro de commande</li>
                <li>Nom et prénom</li>
                <li>Produit(s) concerné(s)</li>
                <li>Motif du retour</li>
                <li>Photos du produit (encore scellé si applicable)</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Étape 2 : Validation</h3>
              <p className="text-gray-700">
                Notre équipe vérifiera si votre demande est éligible et vous enverra une <strong>autorisation de retour</strong> avec l'adresse de renvoi.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Étape 3 : Renvoi du produit</h3>
              <p className="text-gray-700 mb-4">
                Renvoyez le produit à l'adresse indiquée dans un emballage sécurisé :
              </p>
              <div className="bg-gray-100 p-4 rounded">
                <p className="text-gray-700 font-semibold">Adresse de retour :</p>
                <p className="text-gray-700">
                  C'LINE<br />
                  Service Retours<br />
                  175 Rue du Président Roosevelt<br />
                  78100 Saint-Germain-en-Laye<br />
                  France
                </p>
              </div>
              <p className="text-gray-700 mt-4 text-sm">
                ⚠️ Les frais de retour sont <strong>à votre charge</strong>, sauf en cas de produit défectueux ou d'erreur de notre part.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Étape 4 : Remboursement</h3>
              <p className="text-gray-700">
                Après réception et contrôle du produit retourné, nous procéderons au remboursement sous <strong>14 jours maximum</strong> par le même moyen de paiement utilisé lors de la commande.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">4. Produits défectueux ou erreur de commande</h2>

              <p className="text-gray-700 mb-4">
                Si vous recevez un produit <strong>défectueux</strong>, <strong>endommagé</strong> ou <strong>non conforme</strong> à votre commande :
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h3 className="font-bold text-green-700 mb-3">Dans ce cas, C'LINE prend en charge :</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>✅ Les frais de retour</li>
                  <li>✅ Un échange gratuit</li>
                  <li>✅ Un remboursement intégral</li>
                </ul>
              </div>

              <p className="text-gray-700 mt-6 mb-4">
                <strong>Délai de signalement :</strong> Vous devez signaler l'anomalie dans les <strong>48 heures</strong> suivant la réception de votre colis.
              </p>

              <p className="text-gray-700 mb-2">
                Contactez-nous avec :
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Photos du produit défectueux</li>
                <li>Photos de l'emballage</li>
                <li>Description précise du problème</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">5. Échanges</h2>
              <p className="text-gray-700">
                Les échanges ne sont possibles que dans les cas suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Produit défectueux</li>
                <li>Erreur de notre part (mauvais produit envoyé)</li>
                <li>Produit endommagé pendant le transport</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Pour un simple changement de taille, couleur ou modèle, vous devez effectuer un retour (si éligible) puis passer une nouvelle commande.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">6. Produits en promotion ou soldes</h2>
              <p className="text-gray-700">
                Les produits achetés en promotion ou pendant les soldes sont soumis aux <strong>mêmes conditions de retour</strong> que les produits à prix normal.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">7. Délais</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left">Action</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Délai</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Droit de rétractation</td>
                      <td className="border border-gray-300 px-4 py-3">14 jours après réception</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Signalement d'un défaut</td>
                      <td className="border border-gray-300 px-4 py-3">48 heures après réception</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Remboursement après retour</td>
                      <td className="border border-gray-300 px-4 py-3">14 jours maximum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">8. Contact Service Client</h2>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant un retour ou un remboursement :
              </p>
              <ul className="list-none space-y-2 text-gray-700">
                <li>📧 <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a></li>
                <li>📞 +33 6 52 21 93 25</li>
                <li>📍 C'LINE, 175 Rue du Président Roosevelt, 78100 Saint-Germain-en-Laye, France</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Horaires : Du lundi au vendredi, 9h00 - 18h00
              </p>
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
