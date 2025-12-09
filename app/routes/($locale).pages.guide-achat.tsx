import {useLoaderData, type MetaFunction} from 'react-router';
import {getConfig} from '~/utils/config';
import {useConfig} from '~/utils/themeContext';
import {CheckCircle2, ChevronDown} from 'lucide-react';
import {useState} from 'react';

export const meta: MetaFunction = () => {
  const config = getConfig();
  return [
    {title: `Guide d'achat | ${config.brandName}`},
    {
      name: 'description',
      content:
        "Guide complet pour choisir votre perruque - Types, textures, longueurs et conseils d'achat",
    },
  ];
};

export async function loader() {
  const config = getConfig();
  return {config};
}

export default function GuideAchat() {
  const {config} = useLoaderData<typeof loader>();
  const themeConfig = useConfig();
  const [openSection, setOpenSection] = useState<number | null>(1);

  const toggleSection = (sectionNumber: number) => {
    setOpenSection(openSection === sectionNumber ? null : sectionNumber);
  };

  return (
    <div className="pt-4 bg-gradient-to-b from-white via-white/95 to-white min-h-screen relative">
      {/* Background decorative elements */}
      <div className="absolute -right-20 top-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-40 bottom-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10 pt-20 md:pt-24">
        {/* Page Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block bg-primary text-black font-bold py-1.5 px-4 md:py-2 md:px-6 mb-4 md:mb-6 tracking-wider rounded-sm text-xs md:text-sm">
            Guide Complet
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4">
            <span className="text-black">GUIDE D'ACHAT</span>
            <br />
            <span className="text-primary tracking-wider">PERRUQUES & ACCESSOIRES</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
            Tout ce que vous devez savoir pour choisir la perruque parfaite selon vos besoins, votre style et votre budget
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Section 1: Les types de perruques */}
          <section className="mb-8 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div
              className="flex items-center justify-between gap-3 p-6 md:p-8 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection(1)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary text-black font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl">
                  1
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  Les types de perruques
                </h3>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-primary transition-transform duration-300 ${
                  openSection === 1 ? 'rotate-180' : ''
                }`}
              />
            </div>

            <div className={`px-6 md:px-8 transition-all duration-300 ${
              openSection === 1 ? 'pb-6 md:pb-8 max-h-[3000px]' : 'max-h-0 overflow-hidden'
            }`}>
              <div className="space-y-6 md:space-y-8">
                {/* Perruque naturelle */}
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                  <h4 className="text-lg md:text-xl font-bold text-black mb-3">Perruque naturelle</h4>
                  <p className="text-sm md:text-base text-black mb-4">
                    Fabriquée à partir de vrais cheveux humains, elle offre un rendu ultra-réaliste et une grande liberté de coiffage (lissage, boucles, coloration).
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm md:text-base text-black"><span className="font-semibold">Avantages :</span> aspect naturel, durable, réutilisable</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm md:text-base text-black"><span className="font-semibold">Entretien :</span> comme vos propres cheveux (shampoing doux, sérum, soin hydratant)</p>
                    </div>
                  </div>
                </div>

                {/* Perruque synthétique */}
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                  <h4 className="text-lg md:text-xl font-bold text-black mb-3">Perruque synthétique</h4>
                  <p className="text-sm md:text-base text-black mb-4">
                    Composée de fibres artificielles, elle garde sa forme même après le lavage.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm md:text-base text-black"><span className="font-semibold">Avantages :</span> prix plus abordable, prête à porter</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm md:text-base text-black"><span className="font-semibold">Entretien :</span> lavage à l'eau froide, pas de chaleur sauf pour les fibres "heat-resistant"</p>
                    </div>
                  </div>
                </div>

                {/* Perruque HD Lace */}
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                  <h4 className="text-lg md:text-xl font-bold text-black mb-3">Perruque HD Lace</h4>
                  <p className="text-sm md:text-base text-black mb-4">
                    La "High Definition Lace" est une dentelle fine et transparente qui imite parfaitement le cuir chevelu.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm md:text-base text-black"><span className="font-semibold">Avantages :</span> effet fondu invisible, confort, légèreté</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm md:text-base text-black"><span className="font-semibold">Idéale pour :</span> un rendu naturel et discret</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Les tissages (Bundles) */}
          <section className="mb-8 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div
              className="flex items-center justify-between gap-3 p-6 md:p-8 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection(2)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary text-black font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl">
                  2
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  Les tissages (Bundles)
                </h3>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-primary transition-transform duration-300 ${
                  openSection === 2 ? 'rotate-180' : ''
                }`}
              />
            </div>

            <div className={`px-6 md:px-8 transition-all duration-300 ${
              openSection === 2 ? 'pb-6 md:pb-8 max-h-[2000px]' : 'max-h-0 overflow-hidden'
            }`}>
              <div className="space-y-4">
                <p className="text-sm md:text-base text-black">
                  Les bundles sont des mèches de cheveux vendues en paquets, idéales pour les poses à couture ou pour créer votre propre perruque.
                </p>

                <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-black mb-3">Quantité recommandée :</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm md:text-base text-black">2 à 3 paquets pour un carré court</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm md:text-base text-black">3 à 4 paquets pour une chevelure longue ou volumineuse</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-6 bg-pink-50 border-l-4 border-pink-500 p-3 md:p-4 rounded">
                  <p className="text-pink-800 text-xs md:text-sm">
                    <span className="font-bold">Astuce :</span> plus les cheveux sont longs, plus il faut de paquets pour obtenir du volume.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Les closures & frontales */}
          <section className="mb-8 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div
              className="flex items-center justify-between gap-3 p-6 md:p-8 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection(3)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary text-black font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl">
                  3
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  Les closures & frontales
                </h3>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-primary transition-transform duration-300 ${
                  openSection === 3 ? 'rotate-180' : ''
                }`}
              />
            </div>

            <div className={`px-6 md:px-8 transition-all duration-300 ${
              openSection === 3 ? 'pb-6 md:pb-8 max-h-[2000px]' : 'max-h-0 overflow-hidden'
            }`}>
              <div className="space-y-6">
                {/* Closure */}
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                  <h4 className="text-lg md:text-xl font-bold text-black mb-3">Closure (4x4, 5x5, 6x6)</h4>
                  <p className="text-sm md:text-base text-black mb-4">
                    Petite pièce de lace placée sur le haut de la tête. Elle permet une finition naturelle sans coller tout le contour.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-black"><span className="font-semibold">Avantage :</span> entretien facile, look naturel, idéal pour débutantes</p>
                  </div>
                </div>

                {/* Frontale */}
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                  <h4 className="text-lg md:text-xl font-bold text-black mb-3">Frontale (13x4, 13x6)</h4>
                  <p className="text-sm md:text-base text-black mb-4">
                    Plus large, elle couvre toute la ligne frontale et permet des coiffures vers l'arrière.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm md:text-base text-black"><span className="font-semibold">Avantage :</span> rendu ultra-naturel, liberté de coiffage</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm md:text-base text-black"><span className="font-semibold">Entretien :</span> demande un peu plus de technique pour la pose et la colle</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Les textures de cheveux */}
          <section className="mb-8 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div
              className="flex items-center justify-between gap-3 p-6 md:p-8 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection(4)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary text-black font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl">
                  4
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  Les textures de cheveux
                </h3>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-primary transition-transform duration-300 ${
                  openSection === 4 ? 'rotate-180' : ''
                }`}
              />
            </div>

            <div className={`px-6 md:px-8 transition-all duration-300 ${
              openSection === 4 ? 'pb-6 md:pb-8 max-h-[2000px]' : 'max-h-0 overflow-hidden'
            }`}>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-black">
                    <span className="font-semibold">Lisse (Straight) :</span> pour un look chic et soigné
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-black">
                    <span className="font-semibold">Body Wave :</span> ondulations légères, effet glamour
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-black">
                    <span className="font-semibold">Deep Wave / Water Wave :</span> boucles définies et pleines de mouvement
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-black">
                    <span className="font-semibold">Curly / Kinky Curly :</span> boucles serrées, effet naturel et volumineux
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-6 bg-pink-50 border-l-4 border-pink-500 p-3 md:p-4 rounded">
                <p className="text-pink-800 text-xs md:text-sm">
                  <span className="font-bold">Astuce :</span> choisissez la texture la plus proche de votre type de cheveux pour un rendu harmonieux.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: La longueur idéale */}
          <section className="mb-8 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div
              className="flex items-center justify-between gap-3 p-6 md:p-8 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection(5)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary text-black font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl">
                  5
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  La longueur idéale
                </h3>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-primary transition-transform duration-300 ${
                  openSection === 5 ? 'rotate-180' : ''
                }`}
              />
            </div>

            <div className={`px-6 md:px-8 transition-all duration-300 ${
              openSection === 5 ? 'pb-6 md:pb-8 max-h-[2000px]' : 'max-h-0 overflow-hidden'
            }`}>
              <div className="space-y-4">
                <p className="text-sm md:text-base text-black">
                  Les longueurs sont mesurées en tirant la mèche bien droite.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-black">
                      <span className="font-semibold">Court : 8" à 12"</span> → effet carré ou bob
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-black">
                      <span className="font-semibold">Moyen : 14" à 18"</span> → look naturel et facile à entretenir
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-black">
                      <span className="font-semibold">Long : 20" à 30"</span> → effet glamour et sophistiqué
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: L'entretien (rapide) */}
          <section className="mb-8 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div
              className="flex items-center justify-between gap-3 p-6 md:p-8 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection(6)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary text-black font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl">
                  6
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  L'entretien (rapide)
                </h3>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-primary transition-transform duration-300 ${
                  openSection === 6 ? 'rotate-180' : ''
                }`}
              />
            </div>

            <div className={`px-6 md:px-8 transition-all duration-300 ${
              openSection === 6 ? 'pb-6 md:pb-8 max-h-[2000px]' : 'max-h-0 overflow-hidden'
            }`}>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-black">
                    <span className="font-semibold">Cheveux naturels :</span> shampoing doux sans sulfate, hydratation régulière, protection thermique avant chaleur
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-black">
                    <span className="font-semibold">Cheveux synthétiques :</span> lavage à l'eau froide, pas de chaleur directe, spray démêlant spécial fibre
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-black">
                    <span className="font-semibold">Rangement :</span> sur tête en mousse ou dans sa housse, à l'abri de la chaleur et de l'humidité
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Nos conseils de pro */}
          <section className="mb-8 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div
              className="flex items-center justify-between gap-3 p-6 md:p-8 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection(7)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary text-black font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl">
                  7
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  Nos conseils de pro
                </h3>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-primary transition-transform duration-300 ${
                  openSection === 7 ? 'rotate-180' : ''
                }`}
              />
            </div>

            <div className={`px-6 md:px-8 transition-all duration-300 ${
              openSection === 7 ? 'pb-6 md:pb-8 max-h-[2000px]' : 'max-h-0 overflow-hidden'
            }`}>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-black">
                    Pour un premier achat, préférez une closure : plus simple à poser et à entretenir
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-black">
                    Si vous aimez changer souvent de look, optez pour une perruque naturelle lisse
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-black">
                    Pour un effet "salon", choisissez une frontale HD Lace
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-black">
                    N'oubliez pas : plus la lace est fine, plus le rendu est naturel !
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <div className="mt-12 md:mt-16 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 p-6 md:p-10 rounded-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Besoin d'aide ?
            </h3>
            <p className="text-black text-sm md:text-base mb-6 max-w-2xl mx-auto">
              Notre équipe est là pour vous conseiller ! Contactez-nous sur le chat du site ou par message Instagram pour une recommandation personnalisée selon votre style et votre budget.
            </p>
            <a
              href="https://www.instagram.com/c_line.cheveux/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
