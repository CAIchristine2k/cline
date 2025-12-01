import {type MetaFunction} from 'react-router';

export const meta: MetaFunction = () => {
  return [
    {title: 'Conditions Générales de Vente | C\'Line Hair'},
    {
      name: 'description',
      content: 'Conditions Générales de Vente (CGV) de C\'Line Hair - Perruques et extensions capillaires',
    },
  ];
};

export default function CGV() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Conditions Générales de Vente (CGV)
          </h1>

          <div className="text-gray-600 text-sm mb-8 text-center">
            Dernière mise à jour : 28 novembre 2025
          </div>

          <div className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">1. Préambule</h2>
              <p className="text-gray-700 mb-4">
                Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les commandes passées sur le site{' '}
                <a href="https://clinehair.com" className="text-primary hover:underline">https://clinehair.com</a>, édité par :
              </p>
              <ul className="list-none space-y-2 text-gray-700">
                <li><strong>C'LINE</strong></li>
                <li>SAS au capital de 2 000 €</li>
                <li>RCS Versailles : 952 413 375</li>
                <li>Siège social : 175 Rue du Président Roosevelt, 78100 Saint-Germain-en-Laye</li>
                <li>Email : <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a></li>
                <li>Téléphone : +33 6 52 21 93 25</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Toute commande implique l'acceptation pleine et entière des présentes CGV.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">2. Produits</h2>
              <p className="text-gray-700 mb-4">C'LINE HAIR propose à la vente :</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Perruques Lace Wig HD 100% cheveux humains</li>
                <li>Extensions capillaires (wefts, tapes, k-tips…)</li>
                <li>Bundles</li>
                <li>Frontales et closures</li>
                <li>Accessoires capillaires</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Chaque produit est accompagné d'une description détaillée. Les photos ne sont pas contractuelles, notamment en raison des variations de couleur selon les écrans.
              </p>
              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Authenticité des produits</h3>
              <p className="text-gray-700">
                Toutes les perruques et extensions « cheveux humains » proviennent de fournisseurs certifiés et sont traitées selon les normes européennes d'hygiène.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">3. Prix</h2>
              <p className="text-gray-700">
                Les prix sont indiqués en euros (€), toutes taxes comprises (TTC).
                C'LINE se réserve le droit de modifier ses tarifs à tout moment, mais le prix appliqué reste celui en vigueur au moment de la commande.
              </p>
              <p className="text-gray-700 mt-2">
                Les frais de livraison sont indiqués séparément lors de la commande.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">4. Commande</h2>
              <p className="text-gray-700 mb-4">
                Le client sélectionne les produits de son choix et valide sa commande après vérification.
                La validation de la commande constitue une acceptation des CGV.
              </p>
              <p className="text-gray-700 mb-2">C'LINE se réserve le droit de refuser toute commande en cas de :</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Litige en cours avec le client</li>
                <li>Suspicion de fraude</li>
                <li>Informations incomplètes ou erronées</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">5. Paiement</h2>
              <p className="text-gray-700 mb-4">Les paiements sont 100% sécurisés via :</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Shopify Payments</li>
                <li>Carte bancaire (Visa, Mastercard, Amex)</li>
                <li>Apple Pay / Google Pay</li>
                <li>Klarna (selon disponibilité)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Le paiement est débité immédiatement après validation de la commande.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">6. Livraison</h2>
              <h3 className="text-xl font-semibold text-black mb-3">Zones desservies</h3>
              <p className="text-gray-700">
                France métropolitaine, Europe, DOM-TOM et plusieurs destinations internationales.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Délais indicatifs</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>France : 2 à 5 jours ouvrés</li>
                <li>Europe : 3 à 7 jours ouvrés</li>
                <li>International : 5 à 14 jours ouvrés</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Les délais sont donnés à titre indicatif. Un retard ne peut engager la responsabilité de C'LINE.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Suivi de commande</h3>
              <p className="text-gray-700">
                Un numéro de suivi est envoyé par email dès l'expédition.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8 bg-red-50 border-l-4 border-red-500 p-6 rounded">
              <h2 className="text-2xl font-bold text-black mb-4">7. Rétractation & Retours</h2>

              <h3 className="text-xl font-semibold text-black mb-3">Droit légal de rétractation (14 jours)</h3>
              <p className="text-gray-700 mb-4">
                Conformément au Code de la consommation, le client dispose de 14 jours pour exercer son droit de rétractation.
              </p>

              <div className="bg-white p-4 rounded mb-4">
                <h4 className="font-bold text-red-600 mb-2">❗ IMPORTANT – Exceptions (Produits capillaires)</h4>
                <p className="text-gray-700 mb-2">Pour des raisons strictes d'hygiène :</p>
                <p className="font-bold text-red-600 mb-2">❌ Aucun retour ni échange n'est accepté pour :</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Perruques</li>
                  <li>Extensions</li>
                  <li>Frontales / closures</li>
                  <li>Produits capillaires déjà déballés</li>
                  <li>Produits portés, coiffés, coupés ou modifiés</li>
                </ul>

                <p className="font-bold text-green-600 mt-4 mb-2">✔️ Retour possible uniquement si :</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Le produit n'a pas été ouvert</li>
                  <li>Scellé intact</li>
                  <li>Jamais manipulé</li>
                  <li>Dans son emballage d'origine</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Procédure de retour</h3>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Envoyer une demande à : <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a></li>
                <li>Attendre l'autorisation de retour</li>
                <li>Renvoyer le produit à l'adresse indiquée</li>
                <li>Les frais de retour sont à la charge du client</li>
              </ol>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Remboursement</h3>
              <p className="text-gray-700">
                Effectué sous 14 jours après réception du produit conforme.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">8. Produits défectueux ou erreur de commande</h2>
              <p className="text-gray-700 mb-4">En cas de défaut avéré ou erreur de référence :</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>C'LINE prend en charge les frais de retour</li>
                <li>Un échange ou remboursement est proposé</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Toute anomalie doit être signalée dans les <strong>48h suivant la réception</strong>.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">9. Garanties</h2>
              <h3 className="text-xl font-semibold text-black mb-3">Garantie légale de conformité</h3>
              <p className="text-gray-700 mb-4">
                Applicable si le produit livré diffère de la description prévue (articles L217-4 et suivants du Code de la consommation).
              </p>

              <h3 className="text-xl font-semibold text-black mb-3">Garantie des vices cachés</h3>
              <p className="text-gray-700 mb-4">
                Valable dans les conditions légales.
              </p>

              <p className="text-gray-700 mb-2">Les garanties ne s'appliquent pas si le produit a été :</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Porté ou utilisé</li>
                <li>Coiffé, lavé, coloré, coupé</li>
                <li>Mal entretenu</li>
                <li>Exposé à la chaleur excessive (lisseurs, sèche-cheveux trop chauds…)</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">10. Responsabilité</h2>
              <p className="text-gray-700 mb-2">C'LINE ne saurait être tenue responsable :</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>D'une mauvaise utilisation du produit</li>
                <li>De dommages indirects</li>
                <li>D'un usage non conforme des appareils chauffants</li>
                <li>En cas de force majeure</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">11. Protection des données</h2>
              <p className="text-gray-700">
                Le traitement des données personnelles est détaillé dans la{' '}
                <a href="/pages/privacy-policy" className="text-primary hover:underline">Politique de confidentialité</a>.
                Conformément au RGPD, vous disposez de droits d'accès, rectification, suppression, opposition et portabilité.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">12. Propriété intellectuelle</h2>
              <p className="text-gray-700">
                Tous les éléments du site (images, vidéos, textes, logos, nom « C'LINE HAIR ») sont protégés par le droit d'auteur.
                Toute reproduction est interdite sans autorisation préalable.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">13. Litiges</h2>
              <p className="text-gray-700 mb-4">
                Les présentes CGV sont régies par le droit français.
                En cas de litige, une solution amiable sera privilégiée.
                En dernier recours, les tribunaux français seront compétents.
              </p>
              <p className="text-gray-700">
                Plateforme européenne de règlement des litiges :{' '}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">14. Contact</h2>
              <p className="text-gray-700 mb-4">Pour toute question :</p>
              <ul className="list-none space-y-2 text-gray-700">
                <li>📧 <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a></li>
                <li>📍 175 Rue du Président Roosevelt, 78100 Saint-Germain-en-Laye</li>
                <li>📞 +33 6 52 21 93 25</li>
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
