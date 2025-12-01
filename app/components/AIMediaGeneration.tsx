import React, {useState, useEffect, useRef} from 'react';
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
    <section ref={sectionRef} id="tips" className="pb-20 lg:py-20 bg-white">
      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-4">
            Conseils d'experte
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Astuces pour la <span className="text-primary">pose</span> &amp; l'<span className="text-primary">entretien</span>
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Tout ce qu'il faut savoir pour une pose impeccable et une tenue longue durée de vos extensions et perruques.
          </p>
        </div>

        {/* Étapes de pose */}
        <div className="max-w-6xl mx-auto bg-white border border-primary/20 rounded-xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0">
            {/* visuel */}
            <div className="relative aspect-[4/3] md:aspect-auto p-4 flex items-center justify-center">
              <img
                {...getImageWithFallback(MARKETING_ASSETS.tips, null)}
                alt="Astuces de pose C'Line Hair"
                className="max-w-[80%] max-h-[400px] object-contain"
              />
            </div>

            {/* contenu */}
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 text-black">Pose impeccable en 5 étapes</h3>
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li
                    key={index}
                    className={`flex items-start transition-all duration-700 ease-out ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{transitionDelay: `${index * 150}ms`}}
                  >
                    <span className="flex-none w-8 h-8 rounded-full bg-primary/20 text-primary font-bold grid place-items-center mr-3">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-black font-medium">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Entretien : Do / Don't */}
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-primary/20 border-t border-primary/20">
            <div className="p-8">
              <p className="text-black text-xs font-bold mb-4 tracking-widest">À FAIRE</p>
              <ul className="space-y-3 text-sm">
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
                    <span className="mt-1 mr-3 w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8">
              <p className="text-black text-xs font-bold mb-4 tracking-widest">À ÉVITER</p>
              <ul className="space-y-3 text-sm">
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
                    <span className="mt-1 mr-3 w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <p className="text-gray-600">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQ courte */}
          <div className="p-8 md:p-12 border-t border-primary/20">
            <h3 className="text-2xl font-bold mb-6 text-primary">Questions fréquentes</h3>
            <div className="grid md:grid-cols-3 gap-6">
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
                  className={`bg-primary/5 border-2 border-primary/40 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-700 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{transitionDelay: `${(index + 5) * 150}ms`}}
                >
                  <p className="text-primary font-bold mb-3 pb-2 border-b border-primary/30">{faq.question}</p>
                  <p className="text-gray-700 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
