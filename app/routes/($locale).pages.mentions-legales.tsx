import {type LoaderFunctionArgs} from 'react-router';
import {type MetaFunction} from 'react-router';

export const meta: MetaFunction = () => {
  return [
    {title: 'Mentions Légales | C\'Line Hair'},
    {
      name: 'description',
      content: 'Mentions légales du site C\'Line Hair - Informations légales et éditoriales',
    },
  ];
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header avec padding pour le fixed header */}
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Mentions Légales
          </h1>

          <div className="text-gray-600 text-sm mb-8 text-center">
            Dernière mise à jour : 28 novembre 2025
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">1. Éditeur du site</h2>
              <p className="text-gray-700 mb-4">
                Le site <a href="https://clinehair.com" className="text-primary hover:underline">https://clinehair.com</a> est édité par :
              </p>
              <ul className="list-none space-y-2 text-gray-700">
                <li><strong>Dénomination :</strong> C'LINE</li>
                <li><strong>Forme juridique :</strong> SAS</li>
                <li><strong>Capital social :</strong> 2 000 €</li>
                <li><strong>RCS :</strong> 952 413 375 R.C.S. Versailles</li>
                <li><strong>Siège social :</strong> 175 Rue du Président Roosevelt, 78100 Saint-Germain-en-Laye, France</li>
                <li><strong>Activité principale :</strong> Négoce de produits capillaires et cosmétiques, importation et exportation, vente en ligne et commercialisation d'extensions capillaires et accessoires</li>
                <li><strong>Présidente :</strong> Mme XU Lin</li>
                <li><strong>Email :</strong> <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a></li>
                <li><strong>Téléphone :</strong> +33 6 52 21 93 25</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">2. Directeur de la publication</h2>
              <ul className="list-none space-y-2 text-gray-700">
                <li><strong>Nom :</strong> Mme XU Lin</li>
                <li><strong>Contact :</strong> <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a></li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">3. Hébergeur du site</h2>
              <p className="text-gray-700 mb-4">Le site est hébergé par :</p>
              <ul className="list-none space-y-2 text-gray-700">
                <li><strong>Cloudflare, Inc.</strong></li>
                <li>101 Townsend Street, San Francisco, CA 94107, USA</li>
                <li>Site : <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cloudflare.com</a></li>
                <li>Téléphone : +1 (888) 993-5273</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">4. Propriété intellectuelle</h2>
              <p className="text-gray-700">
                Tous contenus (textes, images, logos, vidéos, code) sont protégés par le droit de la propriété intellectuelle.
                Toute reproduction, totale ou partielle, est interdite sans autorisation préalable écrite de C'LINE.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">5. Données personnelles (RGPD)</h2>
              <p className="text-gray-700">
                La collecte et le traitement des données personnelles sont réalisés conformément au Règlement Général sur la Protection des Données (RGPD).
                Vous disposez d'un droit d'accès, de rectification, de suppression, d'opposition et de portabilité de vos données.
              </p>
              <p className="text-gray-700 mt-2">
                Pour en savoir plus → voir la <a href="/pages/privacy-policy" className="text-primary hover:underline">Politique de confidentialité</a>.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">6. Cookies</h2>
              <p className="text-gray-700">
                Le site utilise des cookies techniques et analytiques pour améliorer votre expérience.
                Vous pouvez les gérer via les paramètres de votre navigateur.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">7. Responsabilité</h2>
              <p className="text-gray-700">
                C'LINE HAIR s'efforce de fournir des informations exactes et à jour, mais ne garantit pas l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur le site.
                C'LINE ne peut être tenue responsable des dommages directs ou indirects liés à l'utilisation du site.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">8. Liens hypertextes</h2>
              <p className="text-gray-700">
                Le site peut contenir des liens vers des sites externes. C'LINE décline toute responsabilité concernant le contenu de ces sites tiers.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">9. Droit applicable</h2>
              <p className="text-gray-700">
                Les présentes mentions légales sont régies par le droit français.
                En cas de litige, les tribunaux français seront seuls compétents, conformément aux règles de compétence en vigueur.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">10. Médiation de la consommation</h2>
              <p className="text-gray-700">
                Conformément aux dispositions du Code de la consommation concernant le règlement amiable des litiges, C'LINE adhère au Service du Médiateur du e-commerce de la FEVAD (Fédération du e-commerce et de la vente à distance).
              </p>
              <p className="text-gray-700 mt-2">
                Plateforme européenne de règlement des litiges : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://ec.europa.eu/consumers/odr</a>
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">11. Contact</h2>
              <p className="text-gray-700">Pour toute question concernant les mentions légales :</p>
              <ul className="list-none space-y-2 text-gray-700 mt-4">
                <li>📧 <a href="mailto:support@clinehair.com" className="text-primary hover:underline">support@clinehair.com</a></li>
                <li>📍 C'LINE, 175 Rue du Président Roosevelt, 78100 Saint-Germain-en-Laye</li>
              </ul>
            </section>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-8 mt-12 text-center text-gray-500 text-sm">
              © 2025 C'LINE. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
