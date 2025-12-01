import {type MetaFunction} from 'react-router';
import {CreditCard, Shield, Lock, CheckCircle} from 'lucide-react';

export const meta: MetaFunction = () => {
  return [
    {title: 'Paiement Sécurisé | C\'Line Hair'},
    {
      name: 'description',
      content: 'Informations sur les méthodes de paiement sécurisées - C\'Line Hair',
    },
  ];
};

export default function SecurePayment() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Paiement 100% Sécurisé
          </h1>

          <div className="text-gray-600 text-sm mb-8 text-center">
            Dernière mise à jour : 28 novembre 2025
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-bold text-black mb-2">Sécurité SSL</h3>
              <p className="text-sm text-gray-600">Toutes les transactions sont chiffrées</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold text-black mb-2">Données Protégées</h3>
              <p className="text-sm text-gray-600">Vos informations ne sont jamais stockées</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-bold text-black mb-2">Conformité RGPD</h3>
              <p className="text-sm text-gray-600">Respect total de vos données</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">1. Moyens de paiement acceptés</h2>
              <p className="text-gray-700 mb-6">
                C'LINE HAIR accepte les moyens de paiement suivants pour garantir une expérience d'achat simple et sécurisée :
              </p>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cartes bancaires */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <CreditCard className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-lg font-semibold text-black">Cartes bancaires</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                    <li>Visa</li>
                    <li>Mastercard</li>
                    <li>American Express</li>
                    <li>Carte Bleue</li>
                  </ul>
                </div>

                {/* Paiement Express */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-black rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
                      A
                    </div>
                    <h3 className="text-lg font-semibold text-black">Paiement Express</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                    <li>Apple Pay</li>
                    <li>Google Pay</li>
                    <li>Shop Pay</li>
                  </ul>
                </div>

                {/* Paiement fractionné */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-pink-500 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
                      K
                    </div>
                    <h3 className="text-lg font-semibold text-black">Paiement en plusieurs fois</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                    <li>Klarna (sous réserve d'acceptation)</li>
                    <li>Paiement en 3x ou 4x</li>
                  </ul>
                </div>

                {/* Autre */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="w-6 h-6 text-green-600 mr-3" />
                    <h3 className="text-lg font-semibold text-black">Sécurité Maximale</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                    <li>3D Secure activé</li>
                    <li>Vérification bancaire</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">2. Technologie de cryptage</h2>
              <p className="text-gray-700 mb-4">
                Toutes les transactions effectuées sur <strong>clinehair.com</strong> sont sécurisées grâce au protocole <strong>SSL/TLS (Secure Socket Layer)</strong>.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                <h3 className="font-bold text-blue-900 mb-3">Qu'est-ce que le SSL ?</h3>
                <p className="text-gray-700 mb-4">
                  Le SSL est un système de sécurité qui chiffre toutes les données échangées entre votre navigateur et nos serveurs.
                  Cela signifie que :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Vos informations bancaires sont cryptées</li>
                  <li>Personne ne peut intercepter vos données</li>
                  <li>Vous pouvez reconnaître un site sécurisé au cadenas 🔒 dans la barre d'adresse</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">3. Protection 3D Secure</h2>
              <p className="text-gray-700 mb-4">
                Le système <strong>3D Secure</strong> (Verified by Visa, Mastercard SecureCode) ajoute une couche de sécurité supplémentaire lors de vos achats en ligne.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Comment fonctionne le 3D Secure ?</h3>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Lors du paiement, vous êtes redirigé vers la page sécurisée de votre banque</li>
                <li>Vous devez confirmer votre identité (code SMS, application bancaire, etc.)</li>
                <li>Une fois validé, le paiement est autorisé</li>
              </ol>

              <p className="text-gray-700 mt-4">
                Cette double vérification garantit que <strong>vous êtes bien le titulaire de la carte</strong> et protège contre les fraudes.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">4. Partenaires de paiement</h2>
              <p className="text-gray-700 mb-4">
                C'LINE HAIR s'appuie sur des partenaires de confiance reconnus mondialement pour traiter vos paiements :
              </p>

              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-black mb-2">Shopify Payments</h3>
                  <p className="text-gray-700 text-sm">
                    Solution de paiement intégrée utilisée par des millions de boutiques à travers le monde.
                    Certifiée PCI DSS Level 1 (la plus haute norme de sécurité dans l'industrie du paiement).
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-black mb-2">Stripe</h3>
                  <p className="text-gray-700 text-sm">
                    Plateforme de paiement sécurisée utilisée par Amazon, Google, et des milliers d'entreprises.
                    Chiffrement de bout en bout et conformité totale aux normes bancaires européennes.
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mt-6 text-sm italic">
                ⚠️ <strong>Important :</strong> C'LINE ne stocke jamais vos numéros de carte bancaire. Toutes les informations sont directement transmises à nos partenaires de paiement certifiés.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">5. Moment du débit</h2>
              <p className="text-gray-700">
                Le montant de votre commande est débité <strong>immédiatement</strong> après la validation de votre commande.
              </p>
              <p className="text-gray-700 mt-2">
                En cas de paiement refusé, vous serez immédiatement informé et aucune commande ne sera créée.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">6. Paiement en plusieurs fois (Klarna)</h2>
              <p className="text-gray-700 mb-4">
                Avec Klarna, vous pouvez payer en <strong>3 ou 4 fois sans frais</strong> (sous réserve d'acceptation).
              </p>

              <div className="bg-pink-50 border-l-4 border-pink-500 p-6 rounded">
                <h3 className="font-bold text-pink-900 mb-3">Comment ça marche ?</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Choisissez Klarna au moment du paiement</li>
                  <li>Remplissez un formulaire rapide</li>
                  <li>Recevez une réponse instantanée</li>
                  <li>Si accepté, payez en plusieurs mensualités sans frais</li>
                </ol>

                <p className="text-gray-700 mt-4 text-sm">
                  Les conditions d'acceptation dépendent de Klarna et peuvent varier selon votre profil.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">7. Que faire en cas de problème ?</h2>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Paiement refusé</h3>
              <p className="text-gray-700 mb-4">
                Si votre paiement est refusé, plusieurs raisons sont possibles :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Plafond de paiement atteint</li>
                <li>Informations bancaires incorrectes</li>
                <li>Carte expirée ou bloquée</li>
                <li>Protection 3D Secure non validée</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Dans ce cas, contactez votre banque ou utilisez un autre moyen de paiement.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">Prélèvement non reconnu</h3>
              <p className="text-gray-700 mb-4">
                Si vous constatez un prélèvement non reconnu sur votre compte :
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Vérifiez votre historique de commandes sur votre compte C'LINE</li>
                <li>Contactez-nous immédiatement : <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a></li>
                <li>Si nécessaire, faites opposition auprès de votre banque</li>
              </ol>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">8. Remboursements</h2>
              <p className="text-gray-700 mb-4">
                En cas de retour accepté ou d'annulation, le remboursement est effectué par le <strong>même moyen de paiement</strong> utilisé lors de la commande.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Carte bancaire :</strong> 3 à 10 jours ouvrés</li>
                <li><strong>Apple Pay / Google Pay :</strong> 3 à 5 jours ouvrés</li>
                <li><strong>Klarna :</strong> Selon les conditions Klarna</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Le délai peut varier selon votre banque. Consultez notre{' '}
                <a href="/pages/returns" className="text-primary hover:underline">Politique de Retour</a> pour plus de détails.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">9. Facturation</h2>
              <p className="text-gray-700">
                Une facture détaillée vous est envoyée par email dès la validation de votre commande.
                Vous pouvez également la télécharger depuis votre espace client.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">10. Contact</h2>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant le paiement ou la facturation :
              </p>
              <ul className="list-none space-y-2 text-gray-700">
                <li>📧 <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a></li>
                <li>📞 +33 6 52 21 93 25</li>
                <li>📍 C'LINE, 175 Rue du Président Roosevelt, 78100 Saint-Germain-en-Laye, France</li>
              </ul>
            </section>

            {/* Trust Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8 mt-12 text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-2xl font-bold text-black mb-4">Achetez en toute confiance</h3>
              <p className="text-gray-700 mb-4">
                Vos informations de paiement sont protégées par les technologies de sécurité les plus avancées du marché.
              </p>
              <p className="text-gray-700 font-semibold">
                100% Sécurisé • Conformité RGPD • Chiffrement SSL • 3D Secure
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8 mt-12 text-center text-gray-500 text-sm">
              © 2025 C'LINE. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
