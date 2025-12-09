import {useLoaderData, type MetaFunction} from 'react-router';
import {getConfig} from '~/utils/config';
import {useConfig} from '~/utils/themeContext';
import {ChevronDown} from 'lucide-react';
import {useState} from 'react';

export const meta: MetaFunction = () => {
  const config = getConfig();
  return [
    {title: `FAQ Produits | ${config.brandName}`},
    {
      name: 'description',
      content:
        'Questions fréquentes sur les perruques naturelles, synthétiques et tissages - Tout savoir sur nos produits',
    },
  ];
};

export async function loader() {
  const config = getConfig();
  return {config};
}

export default function FAQProduits() {
  const {config} = useLoaderData<typeof loader>();
  const themeConfig = useConfig();
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (questionId: string) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
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
            Questions Fréquentes
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4">
            <span className="text-black">FAQ</span>
            <br />
            <span className="text-primary tracking-wider">
              TOUT SAVOIR SUR VOS PRODUITS
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-lg px-4">
            Toutes les réponses à vos questions sur les perruques et tissages
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* ========== SECTION: TISSAGES ========== */}
          <div className="mb-12 md:mb-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-4">
                <span className="text-black">TISSAGES</span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base px-4">
                Tout ce que vous devez savoir sur les tissages
              </p>
            </div>

            {/* Q1: Durée tissage */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('tissage-1')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  🕒 Combien de temps dure un tissage ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'tissage-1' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'tissage-1'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Un tissage dure en moyenne <strong>4 à 8 semaines</strong>,
                  selon la pose et l'entretien.
                </p>
              </div>
            </div>

            {/* Q2: Réutiliser mèches */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('tissage-2')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  ♻️ Peut-on réutiliser les mèches ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'tissage-2' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'tissage-2'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Oui, <strong>si ce sont des mèches naturelles</strong>. Il
                  suffit de bien les laver, hydrater et stocker correctement.
                </p>
              </div>
            </div>

            {/* Q3: Abîme cheveux */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('tissage-3')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  💆‍♀️ Le tissage abîme-t-il les cheveux ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'tissage-3' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'tissage-3'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Non, à condition que la <strong>base soit bien faite</strong>{' '}
                  et que le <strong>cuir chevelu soit entretenu</strong>{' '}
                  régulièrement.
                </p>
              </div>
            </div>

            {/* Q4: Lavage */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('tissage-4')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  🧴 Peut-on se laver les cheveux avec un tissage ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'tissage-4' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'tissage-4'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Oui ! Utilisez un <strong>shampoing doux</strong>, massez
                  doucement le cuir chevelu et{' '}
                  <strong>séchez bien les racines</strong>.
                </p>
              </div>
            </div>

            {/* Q5: Chaleur */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('tissage-5')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  🔥 Peut-on lisser ou boucler les mèches ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'tissage-5' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'tissage-5'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Oui, <strong>si ce sont des mèches naturelles</strong>. Évitez
                  la chaleur sur les fibres synthétiques.
                </p>
              </div>
            </div>

            {/* Q6: Longueur */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('tissage-6')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  📏 Quelle longueur choisir ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'tissage-6' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'tissage-6'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <div className="space-y-2 text-sm md:text-base text-gray-700">
                  <p>Tout dépend de l'effet souhaité :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>14–16" → carré ou épaules</li>
                    <li>18–22" → mi-long</li>
                    <li>24–30"+ → long et volumineux</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Q7: Grattements */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('tissage-7')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  😣 Ça gratte, c'est normal ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'tissage-7' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'tissage-7'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Oui, les <strong>2 à 3 premiers jours</strong>. Si ça
                  persiste, <strong>hydratez le cuir chevelu</strong> à l'aide
                  d'une huile légère.
                </p>
              </div>
            </div>
          </div>

          {/* ========== SECTION: PERRUQUES SYNTHÉTIQUES ========== */}
          <div className="mb-12 md:mb-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-4">
                <span className="text-black">PERRUQUES SYNTHÉTIQUES</span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base px-4">
                Questions sur les perruques en fibres synthétiques
              </p>
            </div>

            {/* Q1: Chaleur synthétique */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('synth-1')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  🌡️ Peut-on boucler ou lisser une perruque synthétique ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'synth-1' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'synth-1'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Seulement si c'est une{' '}
                  <strong>fibre "heat-resistant"</strong> (résistante à la
                  chaleur). Sinon, <strong>pas de chaleur du tout</strong>.
                </p>
              </div>
            </div>

            {/* Q2: Température */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('synth-2')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  🔥 Quelle température maximale utiliser ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'synth-2' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'synth-2'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Ne dépassez pas <strong>150 à 180°C</strong>, et testez
                  toujours sur une petite mèche avant.
                </p>
              </div>
            </div>

            {/* Q3: Durée de vie */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('synth-3')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  ⏳ Quelle est la durée de vie d'une perruque synthétique ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'synth-3' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'synth-3'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  En moyenne <strong>3 à 6 mois</strong>, selon l'entretien et
                  la fréquence d'utilisation.
                </p>
              </div>
            </div>

            {/* Q4: Naturel */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('synth-4')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  💁🏽‍♀️ Est-ce qu'une perruque synthétique fait naturel ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'synth-4' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'synth-4'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Oui, si elle est <strong>bien posée, brossée</strong> et
                  légèrement{' '}
                  <strong>matifiée avec un spray anti-brillance</strong>.
                </p>
              </div>
            </div>

            {/* Q5: Dormir */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('synth-5')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  😴 Peut-on dormir avec ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'synth-5' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'synth-5'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Déconseillé ❌ — cela réduit considérablement sa durée de vie.
                </p>
              </div>
            </div>

            {/* Q6: Nœuds */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('synth-6')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  🪮 Comment éviter les nœuds ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'synth-6' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'synth-6'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Un <strong>brossage quotidien</strong>, un{' '}
                  <strong>spray démêlant</strong>, et un{' '}
                  <strong>rangement sur tête en mousse</strong> sont essentiels.
                </p>
              </div>
            </div>

            {/* Q7: Teindre */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('synth-7')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  🎨 Peut-on teindre une perruque synthétique ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'synth-7' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'synth-7'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Non. Les fibres <strong>ne prennent pas la couleur</strong>.
                </p>
              </div>
            </div>

            {/* Q8: Laver */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('synth-8')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  🫧 Comment la laver ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'synth-8' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'synth-8'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  À l'<strong>eau froide ou tiède</strong>, avec un{' '}
                  <strong>shampoing doux spécial fibres synthétiques</strong>.
                  Ne frottez pas.
                </p>
              </div>
            </div>
          </div>

          {/* ========== SECTION: PERRUQUES NATURELLES ========== */}
          <div className="mb-12 md:mb-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-4">
                <span className="text-black">PERRUQUES NATURELLES</span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base px-4">
                Questions sur les perruques en cheveux naturels
              </p>
            </div>

            {/* Q1: Coiffage naturel */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('nat-1')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  💇🏽‍♀️ Peut-on lisser, boucler ou colorer une perruque
                  naturelle ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'nat-1' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'nat-1'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Oui ! Ce sont de vrais cheveux : vous pouvez{' '}
                  <strong>coiffer, colorer, ou décolorer</strong> (de préférence
                  chez un professionnel).
                </p>
              </div>
            </div>

            {/* Q2: Durée */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('nat-2')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  ⏳ Combien de temps dure une perruque naturelle ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'nat-2' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'nat-2'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Jusqu'à <strong>2 à 3 ans</strong> avec un bon entretien
                  régulier.
                </p>
              </div>
            </div>

            {/* Q3: Dormir/Doucher */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('nat-3')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  😴 Peut-on dormir ou se doucher avec ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'nat-3' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'nat-3'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <div className="space-y-2 text-sm md:text-base text-gray-700">
                  <p>
                    <strong>Dormir :</strong> oui, si elle est attachée et
                    protégée par un bonnet en satin.
                  </p>
                  <p>
                    <strong>Douche :</strong> non, sauf si elle est cousue.
                  </p>
                </div>
              </div>
            </div>

            {/* Q4: Closure vs Frontal */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('nat-4')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  🧩 Quelle est la différence entre closure et frontal ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'nat-4' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'nat-4'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <div className="space-y-2 text-sm md:text-base text-gray-700">
                  <p>
                    <strong>Closure :</strong> simple à poser, ligne de
                    séparation limitée.
                  </p>
                  <p>
                    <strong>Frontal :</strong> rendu plus naturel, mais demande
                    plus d'entretien et de collage.
                  </p>
                </div>
              </div>
            </div>

            {/* Q5: Grattements */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('nat-5')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  🤔 Est-ce que ça gratte ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'nat-5' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'nat-5'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Normalement non. Assurez-vous que la perruque soit{' '}
                  <strong>bien ajustée</strong> et que les cheveux dessous
                  soient <strong>propres et secs</strong>.
                </p>
              </div>
            </div>

            {/* Q6: Rangement */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('nat-6')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  🧴 Comment ranger sa perruque naturelle ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'nat-6' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'nat-6'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Sur <strong>tête en mousse ou buste</strong>, ou dans son{' '}
                  <strong>filet + housse</strong> à l'abri de la chaleur et de
                  la poussière.
                </p>
              </div>
            </div>

            {/* Q7: Sport */}
            <div className="mb-4 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                className="w-full flex items-center justify-between gap-3 p-6 md:p-8 hover:bg-gray-50 transition-colors text-left"
                onClick={() => toggleQuestion('nat-7')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black">
                  🏃🏽‍♀️ Peut-on faire du sport avec ?
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${
                    openQuestion === 'nat-7' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 md:px-8 transition-all duration-300 ${
                  openQuestion === 'nat-7'
                    ? 'pb-6 md:pb-8 max-h-96'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-sm md:text-base text-gray-700">
                  Oui ! Privilégiez les <strong>bandes élastiques</strong>,{' '}
                  <strong>tresses</strong> ou un <strong>bonnet sport</strong>{' '}
                  pour éviter les frottements.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-10 md:mt-16 text-center bg-white border-2 border-primary/30 rounded-2xl p-6 md:p-8 shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4">
              Vous avez encore des questions ?
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              Notre équipe est là pour vous aider et répondre à toutes vos
              questions
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
