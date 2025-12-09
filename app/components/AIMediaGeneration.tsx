import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router';
import {useConfig} from '~/utils/themeContext';
import {MARKETING_ASSETS, getImageWithFallback} from '~/utils/assetsConfig';

export function AIMediaGeneration() {
  const config = useConfig();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {threshold: 0.1}
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (!config.showAIMediaGeneration || !config.aiMediaGeneration) {
    return null;
  }

  const steps = [
    {
      title: "Préparer le cuir chevelu",
      description: "Nettoyer et sécher entièrement. Pas d'huiles juste avant la pose."
    },
    {
      title: "Adapter la base",
      description: "Découper la lace au plus près de l'implantation. Tester l'ajustement."
    },
    {
      title: "Fixation contrôlée",
      description: "Utiliser colle/gel adaptés, fines couches, laisser devenir translucide entre chaque."
    },
    {
      title: "Fondu naturel",
      description: "Presser avec un band élastique 10–15 min, coiffer aux faibles chaleurs."
    },
    {
      title: "Finitions invisibles",
      description: "Dégraisser l'excès, unifier avec poudre/teinte du cuir chevelu si besoin."
    }
  ];

  return (
    <section ref={sectionRef} id="tips" className="pb-8 lg:py-20 bg-white border-t-0 shadow-none">
      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto px-2">
          <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-3 sm:mb-4">
            Conseils d'experte
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-black">
            Astuces pour la <span className="text-primary">pose</span> &amp; l'<span className="text-primary">entretien</span>
          </h2>
          {/* Image mobile uniquement */}
          <div className="md:hidden flex justify-center mb-4">
            <img
              src="/images/astuce.png"
              alt="Conseils de pose C'Line Hair"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
          </div>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
            Tout ce qu'il faut savoir pour une pose impeccable et une tenue longue durée de vos extensions et perruques.
          </p>
          <Link
            to="/pages/guide-entretien"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            NOS CONSEILS
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Étapes de pose */}
        <div className="max-w-6xl mx-auto bg-white border border-primary/20 rounded-xl overflow-hidden shadow-2xl hidden md:block">
          <div className="grid md:grid-cols-2 gap-0">
            {/* visuel */}
            <div className="relative aspect-[4/3] md:aspect-auto p-2 sm:p-4 flex items-center justify-center w-full">
              <img
                {...getImageWithFallback(MARKETING_ASSETS.tips, null)}
                alt="Astuces de pose C'Line Hair"
                className="max-w-[90%] md:max-w-[80%] max-h-[300px] sm:max-h-[400px] object-contain"
              />
            </div>

            {/* contenu */}
            <div className="hidden md:block p-4 sm:p-6 md:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-black pr-2">Pose impeccable en 5 étapes</h3>
              <ol className="space-y-3 sm:space-y-4">
                {steps.map((step, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-2 transition-all duration-700 ease-out ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{transitionDelay: `${index * 150}ms`}}
                  >
                    <span className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 text-xs sm:text-sm rounded-full bg-primary/20 text-primary font-bold grid place-items-center">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="text-black font-medium text-xs sm:text-sm md:text-base mb-0.5">{step.title}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed" style={{wordBreak: 'break-word'}}>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Entretien : Do / Don't */}
          <div className="grid md:grid-cols-2">
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
              <p className="text-black text-xs font-bold mb-2 sm:mb-3 md:mb-4 tracking-widest">À FAIRE</p>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 text-xs md:text-sm">
                {[
                  "Démêler des pointes vers les racines, matin & soir.",
                  "Utiliser shampoing doux + après-shampoing hydratant (sans sulfates).",
                  "Sécher à l'air tiède, protéger la lace pendant le sommeil (bonnet/satin).",
                  "Faire un soin profond toutes les 2–3 semaines."
                ].map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-start transition-all duration-700 ease-out ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-8'
                    }`}
                    style={{transitionDelay: `${(index + 8) * 100}ms`}}
                  >
                    <span className="mt-0.5 sm:mt-1 mr-2 sm:mr-3 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary flex-shrink-0"></span>
                    <p className="text-gray-700 flex-1 min-w-0 break-words leading-relaxed pr-2">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
              <p className="text-black text-xs font-bold mb-2 sm:mb-3 md:mb-4 tracking-widest">À ÉVITER</p>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 text-xs md:text-sm">
                {[
                  "Tirer sur la lace ou utiliser une chaleur élevée directement sur les nœuds.",
                  "Dormir avec les cheveux mouillés.",
                  "Produits gras en excès près de la ligne frontale (décolle la lace).",
                  "Brosses rigides : préférer brosse souple/petite brosse baby hair."
                ].map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-start transition-all duration-700 ease-out ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-8'
                    }`}
                    style={{transitionDelay: `${(index + 8) * 100}ms`}}
                  >
                    <span className="mt-0.5 sm:mt-1 mr-2 sm:mr-3 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <p className="text-gray-600 flex-1 min-w-0 break-words leading-relaxed pr-2">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQ courte */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-12">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-primary">Questions fréquentes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {[
                {
                  question: "Combien de temps tient une lace ?",
                  answer: "De quelques jours à 2 semaines selon l'adhésif, l'entretien et l'activité."
                },
                {
                  question: "Puis-je faire du sport ?",
                  answer: "Oui, bande de maintien + nettoyage des bords après transpiration."
                },
                {
                  question: "Quelle routine hebdo ?",
                  answer: "Démêlage quotidien, lavage 1×/sem., soin profond toutes les 2–3 sem."
                }
              ].map((faq, index) => (
                <div
                  key={index}
                  className={`bg-primary/5 border-2 border-primary/40 rounded-lg p-2.5 sm:p-3 md:p-5 shadow-md hover:shadow-lg transition-all duration-700 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{transitionDelay: `${(index + 5) * 150}ms`}}
                >
                  <p className="text-primary font-bold mb-1.5 sm:mb-2 md:mb-3 pb-1 sm:pb-2 text-xs sm:text-sm md:text-base break-words">{faq.question}</p>
                  <p className="text-gray-700 text-xs md:text-sm break-words leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
