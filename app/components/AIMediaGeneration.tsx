import React from 'react';
import {useConfig} from '~/utils/themeContext';

export function AIMediaGeneration() {
  const config = useConfig();

  if (!config.showAIMediaGeneration || !config.aiMediaGeneration) {
    return null;
  }

  return (
    <section id="tips" className="py-20 bg-white">
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
            <div className="relative aspect-[4/3] md:aspect-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-black/50"></div>
              <img src="/images/cline3.jpg" alt="Astuces de pose C'Line Hair" className="w-full h-full object-cover" />
            </div>

            {/* contenu */}
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 text-black">Pose impeccable en 5 étapes</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-none w-8 h-8 rounded-full bg-primary/20 text-primary font-bold grid place-items-center mr-3">1</span>
                  <div>
                    <h4 className="text-black font-medium">Préparer le cuir chevelu</h4>
                    <p className="text-gray-600 text-sm">Nettoyer et sécher entièrement. Pas d'huiles juste avant la pose.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-none w-8 h-8 rounded-full bg-primary/20 text-primary font-bold grid place-items-center mr-3">2</span>
                  <div>
                    <h4 className="text-black font-medium">Adapter la base</h4>
                    <p className="text-gray-600 text-sm">Découper la lace au plus près de l'implantation. Tester l'ajustement.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-none w-8 h-8 rounded-full bg-primary/20 text-primary font-bold grid place-items-center mr-3">3</span>
                  <div>
                    <h4 className="text-black font-medium">Fixation contrôlée</h4>
                    <p className="text-gray-600 text-sm">Utiliser colle/gel adaptés, fines couches, laisser devenir translucide entre chaque.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-none w-8 h-8 rounded-full bg-primary/20 text-primary font-bold grid place-items-center mr-3">4</span>
                  <div>
                    <h4 className="text-black font-medium">Fondu naturel</h4>
                    <p className="text-gray-600 text-sm">Presser avec un band élastique 10–15 min, coiffer aux faibles chaleurs.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-none w-8 h-8 rounded-full bg-primary/20 text-primary font-bold grid place-items-center mr-3">5</span>
                  <div>
                    <h4 className="text-black font-medium">Finitions invisibles</h4>
                    <p className="text-gray-600 text-sm">Dégraisser l'excès, unifier avec poudre/teinte du cuir chevelu si besoin.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Entretien : Do / Don't */}
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-primary/20 border-t border-primary/20">
            <div className="p-8">
              <p className="text-black text-xs font-bold mb-4 tracking-widest">À FAIRE</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="mt-1 mr-3 w-2 h-2 rounded-full bg-primary"></span>
                  <p className="text-gray-700">Démêler des pointes vers les racines, matin &amp; soir.</p>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-3 w-2 h-2 rounded-full bg-primary"></span>
                  <p className="text-gray-700">Utiliser shampoing doux + après-shampoing hydratant (sans sulfates).</p>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-3 w-2 h-2 rounded-full bg-primary"></span>
                  <p className="text-gray-700">Sécher à l'air tiède, protéger la lace pendant le sommeil (bonnet/satin).</p>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-3 w-2 h-2 rounded-full bg-primary"></span>
                  <p className="text-gray-700">Faire un soin profond toutes les 2–3 semaines.</p>
                </li>
              </ul>
            </div>
            <div className="p-8">
              <p className="text-black text-xs font-bold mb-4 tracking-widest">À ÉVITER</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="mt-1 mr-3 w-2 h-2 rounded-full bg-gray-400"></span>
                  <p className="text-gray-600">Tirer sur la lace ou utiliser une chaleur élevée directement sur les nœuds.</p>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-3 w-2 h-2 rounded-full bg-gray-400"></span>
                  <p className="text-gray-600">Dormir avec les cheveux mouillés.</p>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-3 w-2 h-2 rounded-full bg-gray-400"></span>
                  <p className="text-gray-600">Produits gras en excès près de la ligne frontale (décolle la lace).</p>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-3 w-2 h-2 rounded-full bg-gray-400"></span>
                  <p className="text-gray-600">Brosses rigides : préférer brosse souple/petite brosse baby hair.</p>
                </li>
              </ul>
            </div>
          </div>

          {/* FAQ courte */}
          <div className="p-8 md:p-12 border-t border-primary/20">
            <h3 className="text-2xl font-bold mb-6 text-primary">Questions fréquentes</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-primary/5 border-2 border-primary/40 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
                <p className="text-primary font-bold mb-3 pb-2 border-b border-primary/30">Combien de temps tient une lace ?</p>
                <p className="text-gray-700 text-sm">De quelques jours à 2 semaines selon l'adhésif, l'entretien et l'activité.</p>
              </div>
              <div className="bg-primary/5 border-2 border-primary/40 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
                <p className="text-primary font-bold mb-3 pb-2 border-b border-primary/30">Puis-je faire du sport ?</p>
                <p className="text-gray-700 text-sm">Oui, bande de maintien + nettoyage des bords après transpiration.</p>
              </div>
              <div className="bg-primary/5 border-2 border-primary/40 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
                <p className="text-primary font-bold mb-3 pb-2 border-b border-primary/30">Quelle routine hebdo ?</p>
                <p className="text-gray-700 text-sm">Démêlage quotidien, lavage 1×/sem., soin profond toutes les 2–3 sem.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
