import {type MetaFunction} from 'react-router';

export const meta: MetaFunction = () => {
  return [
    {title: 'Politique de Confidentialité | C\'Line Hair'},
    {
      name: 'description',
      content: 'Politique de confidentialité et protection des données personnelles - C\'Line Hair conforme RGPD',
    },
  ];
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Politique de Confidentialité
          </h1>

          <div className="text-gray-600 text-sm mb-8 text-center">
            Dernière mise à jour : 28 novembre 2025
          </div>

          <div className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">1. Introduction</h2>
              <p className="text-gray-700">
                La présente Politique de confidentialité décrit comment C'LINE collecte, utilise et protège vos données personnelles lorsque vous utilisez le site{' '}
                <a href="https://clinehair.com" className="text-primary hover:underline">https://clinehair.com</a>.
              </p>
              <p className="text-gray-700 mt-4">
                C'LINE s'engage à respecter le Règlement Général sur la Protection des Données (RGPD) et la loi « Informatique et Libertés ».
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">2. Responsable du traitement</h2>
              <ul className="list-none space-y-2 text-gray-700">
                <li><strong>C'LINE</strong></li>
                <li>SAS au capital de 2 000 €</li>
                <li>RCS Versailles : 952 413 375</li>
                <li>Siège social : 175 Rue du Président Roosevelt, 78100 Saint-Germain-en-Laye, France</li>
                <li>Email : <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a></li>
                <li>Téléphone : +33 6 52 21 93 25</li>
              </ul>
              <p className="text-gray-700 mt-4">
                La responsable du traitement est : <strong>Mme XU Lin, Présidente</strong>.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">3. Données que nous collectons</h2>
              <p className="text-gray-700 mb-4">
                Nous recueillons différentes catégories d'informations dans le cadre de notre activité :
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">a) Données fournies directement par vous</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Nom, prénom</li>
                <li>Adresse e-mail</li>
                <li>Adresse postale</li>
                <li>Numéro de téléphone</li>
                <li>Adresse de livraison / facturation</li>
                <li>Informations de commande</li>
                <li>Messages envoyés au service client</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">b) Données liées aux commandes</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Historique des achats</li>
                <li>Informations sur les produits commandés</li>
                <li>Numéro de suivi</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">c) Données de paiement</h3>
              <p className="text-gray-700">
                Traitement 100% sécurisé via Shopify Payments / Stripe.
                Nous n'avons <strong>jamais accès</strong> à vos numéros de carte bancaire.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">d) Données techniques</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Adresse IP</li>
                <li>Appareil et navigateur utilisé</li>
                <li>Pages consultées</li>
                <li>Temps passé</li>
                <li>Cookies et identifiants de session</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">e) Données marketing</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Préférences de communication</li>
                <li>Ouverture des emails</li>
                <li>Interactions avec les campagnes publicitaires</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">4. Finalités de la collecte</h2>
              <p className="text-gray-700 mb-4">Nous utilisons vos données pour :</p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">✔️ Exécuter vos commandes</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Traitement de la commande</li>
                    <li>Paiement</li>
                    <li>Livraison</li>
                    <li>Suivi de colis</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">✔️ Fournir le service client</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Réponse aux demandes</li>
                    <li>Gestion des retours</li>
                    <li>Assistance post-achat</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">✔️ Améliorer notre site et expérience client</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Statistiques</li>
                    <li>Analyse du comportement utilisateur</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">✔️ Marketing & communication</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Envoi d'offres promotionnelles</li>
                    <li>Notifications importantes</li>
                    <li>Relance panier abandonné</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">✔️ Respecter les obligations légales</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Lutte contre la fraude</li>
                    <li>Conservation comptable</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">5. Base légale du traitement</h2>
              <p className="text-gray-700 mb-4">
                Nous traitons vos données conformément aux bases légales suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Exécution du contrat</strong> (commandes)</li>
                <li><strong>Consentement</strong> (newsletters, cookies)</li>
                <li><strong>Intérêt légitime</strong> (statistiques, sécurité)</li>
                <li><strong>Obligation légale</strong> (comptabilité, fiscalité)</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">6. Partage de vos données</h2>
              <p className="text-gray-700 mb-4 font-semibold">
                Nous ne vendons <strong>jamais</strong> vos données.
              </p>
              <p className="text-gray-700 mb-4">
                Nous partageons uniquement avec des prestataires essentiels :
              </p>

              <h3 className="text-lg font-semibold text-black mt-6 mb-3">Partenaires techniques</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Shopify (site & paiement)</li>
                <li>Stripe (paiement sécurisé)</li>
                <li>Cloudflare (hébergement & sécurité)</li>
                <li>Google Analytics / Meta Ads (publicité et analyse)</li>
              </ul>

              <h3 className="text-lg font-semibold text-black mt-6 mb-3">Logistique & livraison</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Transporteurs (La Poste, Colissimo, DHL, Mondial Relay, etc.)</li>
              </ul>

              <p className="text-gray-700 mt-4">
                Chaque partenaire respecte les normes de sécurité et le RGPD.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">7. Durée de conservation</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Données clients :</strong> 3 ans après la dernière activité</li>
                <li><strong>Données de commande :</strong> 10 ans (obligation légale)</li>
                <li><strong>Emails marketing :</strong> jusqu'à désinscription</li>
                <li><strong>Cookies :</strong> 13 mois maximum</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Au-delà, les données sont supprimées ou anonymisées.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8 bg-primary/10 border-l-4 border-primary p-6 rounded">
              <h2 className="text-2xl font-bold text-black mb-4">8. Vos droits (RGPD)</h2>
              <p className="text-gray-700 mb-4">Vous disposez des droits suivants :</p>
              <ul className="list-none space-y-2 text-gray-700">
                <li>✔️ Droit d'accès</li>
                <li>✔️ Droit de rectification</li>
                <li>✔️ Droit de suppression (droit à l'oubli)</li>
                <li>✔️ Droit d'opposition</li>
                <li>✔️ Droit à la portabilité de vos données</li>
                <li>✔️ Droit de limitation du traitement</li>
                <li>✔️ Droit de retirer votre consentement à tout moment</li>
              </ul>

              <h3 className="text-lg font-semibold text-black mt-6 mb-3">Exercer vos droits :</h3>
              <p className="text-gray-700 mb-2">
                Écrire à : <a href="mailto:privacy@clinehair.com" className="text-primary hover:underline">privacy@clinehair.com</a>
              </p>
              <p className="text-gray-700">
                Ou : <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a>
              </p>
              <p className="text-gray-700 mt-4">
                Réponse sous <strong>30 jours maximum</strong>.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">9. Cookies</h2>
              <p className="text-gray-700 mb-4">Le site utilise des cookies pour :</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Améliorer la navigation</li>
                <li>Réaliser des statistiques</li>
                <li>Mémoriser le panier</li>
                <li>Personnaliser les offres</li>
              </ul>
              <p className="text-gray-700 mt-4">Vous pouvez :</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Accepter</li>
                <li>Refuser</li>
                <li>Paramétrer vos cookies dans votre navigateur</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">10. Sécurité des données</h2>
              <p className="text-gray-700 mb-4">C'LINE utilise des mesures de sécurité renforcées :</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>HTTPS / SSL</li>
                <li>Hébergement Cloudflare sécurisé</li>
                <li>Chiffrement Shopify</li>
                <li>Protection anti-DDoS</li>
                <li>Accès interne restreint</li>
              </ul>
              <p className="text-gray-700 mt-4 text-sm italic">
                Malgré ces mesures, aucune transmission n'est totalement sécurisée sur Internet.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">11. Transfert hors UE</h2>
              <p className="text-gray-700 mb-4">
                Certains partenaires (ex. Shopify, Cloudflare) sont basés hors UE.
                Les données transférées sont encadrées par :
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Clauses Contractuelles Types (CCT)</li>
                <li>Normes RGPD équivalentes</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">12. Modifications de la politique</h2>
              <p className="text-gray-700">
                Nous pouvons mettre à jour cette politique à tout moment.
                En cas de modification importante, vous serez informé par email ou notification sur le site.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">13. Contact</h2>
              <p className="text-gray-700 mb-4">Pour toute question relative à cette politique :</p>
              <ul className="list-none space-y-2 text-gray-700">
                <li>📧 <a href="mailto:privacy@clinehair.com" className="text-primary hover:underline">privacy@clinehair.com</a></li>
                <li>📧 <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a></li>
                <li>📍 175 Rue du Président Roosevelt, 78100 Saint-Germain-en-Laye, France</li>
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
