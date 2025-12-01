import {useLoaderData, type MetaFunction} from 'react-router';
import {getConfig} from '~/utils/config';
import {useConfig} from '~/utils/themeContext';
import {CheckCircle2, ChevronDown} from 'lucide-react';
import {useState} from 'react';

export const meta: MetaFunction = () => {
  const config = getConfig();
  return [
    {title: `Guide d'entretien | ${config.brandName}`},
    {
      name: 'description',
      content:
        "Conseils d'entretien pour vos perruques synthétiques - Lavage, séchage, coiffage et rangement",
    },
  ];
};

export async function loader() {
  const config = getConfig();
  return {config};
}

export default function GuideEntretien() {
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

      <div className="container mx-auto px-4 relative z-10 mt-24 md:mt-32 pt-6 md:pt-10">
        {/* Page Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block bg-primary text-black font-bold py-1.5 px-4 md:py-2 md:px-6 mb-4 md:mb-6 tracking-wider rounded-sm text-xs md:text-sm">
            Guide Complet
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4">
            <span className="text-black">GUIDE D'ENTRETIEN</span>
            <br />
            <span className="text-primary tracking-wider">
              DE VOS PERRUQUES
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-lg px-4">
            Suivez nos conseils pour préserver la beauté et la durée de vie de
            vos perruques naturelles et synthétiques
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* ========== SECTION: PERRUQUE NATURELLE ========== */}
          <div className="mb-12 md:mb-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-4">
                <span className="text-black">ENTRETIEN DE VOTRE</span>
                <br />
                <span className="text-primary tracking-wider">
                  PERRUQUE NATURELLE
                </span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base px-4">
                Les perruques en cheveux naturels nécessitent un soin
                particulier pour préserver leur beauté et leur douceur
              </p>
            </div>

            {/* Lavage - Naturelle */}
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
                    Lavage{' '}
                    <span className="text-xs md:text-sm font-normal text-gray-600">
                      (tous les 10 à 15 jours)
                    </span>
                  </h3>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 ${
                    openSection === 1 ? 'rotate-180' : ''
                  }`}
                />
              </div>

              <div className={`px-6 md:px-8 transition-all duration-300 ${
                openSection === 1 ? 'pb-6 md:pb-8 max-h-[2000px]' : 'max-h-0 overflow-hidden'
              }`}>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-700">
                      Démêlez délicatement la perruque avant le lavage.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-700">
                      Utilisez un shampoing doux sans sulfates et un
                      après-shampoing hydratant.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-700">
                      Lavez toujours dans le sens des longueurs, de la racine vers
                      les pointes, sans frotter.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-700">
                      Rincez à l'eau tiède jusqu'à ce que l'eau soit claire.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Séchage - Naturelle */}
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
                    Séchage
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
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-700">
                      Épongez délicatement l'excès d'eau avec une serviette (sans
                      frotter).
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-700">
                      Laissez sécher à l'air libre sur une tête en mousse.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-700">
                      Si besoin, utilisez un sèche-cheveux à basse température
                      uniquement.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Hydratation - Naturelle */}
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
                    Hydratation
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
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-700">
                      Appliquez régulièrement un sérum léger à base d'huile
                      d'argan ou de coco.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-700">
                      Évitez les produits trop riches qui peuvent alourdir ou
                      graisser la fibre.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Coiffage - Naturelle */}
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
                    Coiffage
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
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-700">
                      Utilisez une brosse souple adaptée aux cheveux naturels.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-700">
                      La chaleur est autorisée (maximum 180–200°C), toujours avec
                      un spray protecteur thermique.
                    </p>
                  </div>
                </div>

                <div className="mt-4 md:mt-6 bg-primary/10 border-l-4 border-primary p-3 md:p-4 rounded">
                  <p className="text-black text-xs md:text-sm">
                    💡 <span className="font-bold">Astuce :</span> Toujours
                    utiliser un spray protecteur de chaleur avant d'utiliser un
                    fer à lisser ou à boucler.
                  </p>
                </div>
              </div>
            </section>

            {/* Rangement - Naturelle */}
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
                    Rangement
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
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-700">
                      Conservez votre perruque sur une tête en mousse ou un buste
                      pour préserver sa forme.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-700">
                      Protégez-la avec un filet et une housse, à l'abri de la
                      poussière et de la chaleur.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ========== SECTION: PERRUQUE SYNTHÉTIQUE ========== */}
          <div className="mb-12 md:mb-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-4">
                <span className="text-black">ENTRETIEN DE VOTRE</span>
                <br />
                <span className="text-primary tracking-wider">
                  PERRUQUE SYNTHÉTIQUE
                </span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base px-4">
                Les perruques synthétiques demandent un entretien spécifique
                pour préserver leur forme et leur éclat
              </p>
            </div>

            {/* Section 1: Lavage */}
            <section className="mb-8 bg-white border-2 border-primary/20 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary text-black font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl">
                  1
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  Lavage{' '}
                  <span className="text-xs md:text-sm font-normal text-gray-600">
                    (toutes les 2 à 3 semaines)
                  </span>
                </h3>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    Brossez délicatement votre perruque avant le lavage.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    Remplissez un lavabo d'eau froide.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    Ajoutez un shampoing doux ou spécial fibres synthétiques.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    Laissez tremper environ 5 minutes sans frotter.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    Rincez soigneusement à l'eau froide.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    Terminez avec un spray démêlant adapté aux fibres.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Séchage */}
            <section className="mb-8 bg-white border-2 border-primary/20 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary text-black font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl">
                  2
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  Séchage
                </h3>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    Séchez toujours à l'air libre —{' '}
                    <span className="font-bold text-black">
                      jamais de chaleur directe
                    </span>
                    .
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    Posez la perruque sur une tête en mousse ou un support pour
                    conserver sa forme.
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-6 bg-amber-50 border-l-4 border-amber-500 p-3 md:p-4 rounded">
                <p className="text-amber-800 text-xs md:text-sm font-medium">
                  ⚠️ <span className="font-bold">Important :</span> Ne jamais
                  utiliser de sèche-cheveux ou source de chaleur directe sur une
                  perruque synthétique non heat-resistant.
                </p>
              </div>
            </section>

            {/* Section 3: Coiffage */}
            <section className="mb-8 bg-white border-2 border-primary/20 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary text-black font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl">
                  3
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  Coiffage
                </h3>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    Utilisez une brosse adaptée aux fibres synthétiques.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    Si la fibre est{' '}
                    <span className="font-bold text-primary">
                      heat-resistant
                    </span>
                    , limitez la chaleur entre 150 et 180°C maximum.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    Sinon, évitez toute source de chaleur.
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-6 bg-primary/10 border-l-4 border-primary p-3 md:p-4 rounded">
                <p className="text-black text-xs md:text-sm">
                  💡 <span className="font-bold">Astuce :</span> Vérifiez
                  toujours l'étiquette de votre perruque pour savoir si elle est
                  heat-resistant avant d'utiliser un appareil chauffant.
                </p>
              </div>
            </section>

            {/* Section 4: Réduire la brillance */}
            <section className="mb-8 bg-white border-2 border-primary/20 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary text-black font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl">
                  4
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  Réduire la brillance
                </h3>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    Utilisez un spray anti-brillance conçu pour les perruques.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    En cas d'effet trop brillant, un peu de talc pour bébé peut
                    aider.
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-6 bg-pink-50 border-l-4 border-l-primary-light p-3 md:p-4 rounded">
                <p className="text-pink-800 text-xs md:text-sm">
                  ✨ <span className="font-bold">Astuce pro :</span> Appliquez
                  le talc avec parcimonie et brossez délicatement pour un effet
                  naturel et mat.
                </p>
              </div>
            </section>

            {/* Section 5: Rangement */}
            <section className="mb-8 bg-white border-2 border-primary/20 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary text-black font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl">
                  5
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  Rangement
                </h3>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">
                    Rangez la perruque dans son filet et sa housse, à l'abri de
                    la chaleur et du soleil.
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-6 bg-blue-50 border-l-4 border-l-primary-light p-3 md:p-4 rounded">
                <p className="text-blue-800 text-xs md:text-sm">
                  🏠 <span className="font-bold">Conservation optimale :</span>{' '}
                  Un endroit sec, frais et à l'abri de la lumière directe
                  prolongera considérablement la durée de vie de votre perruque.
                </p>
              </div>
            </section>
          </div>

          {/* Summary Card */}
          <section className="bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 rounded-2xl p-6 md:p-8 shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 md:w-7 md:h-7 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Points clés à retenir
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                <h4 className="font-bold text-primary mb-2 text-sm md:text-base">
                  À FAIRE
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Laver avec des produits adaptés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Sécher à l'air libre</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Utiliser des produits spécifiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Ranger dans un endroit sec</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-red-200">
                <h4 className="font-bold text-red-600 mb-2 text-sm md:text-base">
                  À ÉVITER
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>Chaleur excessive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>Frotter les fibres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>Exposition au soleil prolongée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>Produits non adaptés</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-700 font-medium text-sm md:text-base">
                En suivant ces conseils, vos perruques {themeConfig.brandName}{' '}
                conserveront leur éclat et leur beauté pendant de nombreux mois
                ! ✨
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <div className="mt-10 md:mt-16 text-center bg-white border-2 border-primary/30 rounded-2xl p-6 md:p-8 shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4">
              Besoin d'aide ou de conseils personnalisés ?
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              Notre équipe est là pour vous accompagner dans l'entretien de vos
              perruques
            </p>
            <a
              href="/pages/contact"
              className="inline-flex items-center bg-primary hover:bg-primary-400 text-black font-bold py-3 px-6 md:px-8 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
