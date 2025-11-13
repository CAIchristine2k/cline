import {useConfig} from '~/utils/themeContext';
import {type MetaFunction, Link} from 'react-router';
import {getConfig} from '~/utils/config';
import CareerHighlights from '~/components/CareerHighlights';
import {ShoppingBag} from 'lucide-react';

export const meta: MetaFunction = () => {
  const config = getConfig();
  return [{title: `${config.brandName} | About ${config.influencerName}`}];
};

export default function About() {
  const config = useConfig();

  return (
    <div className="min-h-screen bg-white py-24">
      {/* Background decorative elements */}
      <div className="absolute -right-20 top-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -left-40 bottom-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      {/* Section Hero - Nouvelle première section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10 bg-white">
        <div className="relative container mx-auto px-4 z-20 py-20">
          <div className="max-w-3xl mx-auto bg-white/40 p-8 rounded-lg text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-black">L'HISTOIRE DE</span><br />
              <span className="tracking-wider hero-title-glow" style={{color: '#e6b000'}}>C'LINE HAIR</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl leading-relaxed mx-auto">
              Depuis plus de 20 ans, C'Line Hair sublime la beauté des femmes avec des perruques et extensions éthiques, durables et accessibles.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/collections/all"
                className="group bg-primary hover:bg-primary-400 text-black font-bold py-4 px-8 rounded-sm transition-all duration-300 flex items-center justify-center shadow-glow"
              >
                DÉCOUVRIR LA COLLECTION
                <ShoppingBag className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-16 mb-16 md:mb-24 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/60 backdrop-blur-sm border border-primary/30 p-4 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
                <div className="text-3xl font-bold hero-stat-glow" style={{color: '#e6b000'}}>20+</div>
                <div className="text-gray-800 text-sm tracking-wider">ANNÉES D'EXPERTISE</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm border border-primary/30 p-4 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
                <div className="text-3xl font-bold hero-stat-glow" style={{color: '#e6b000'}}>0</div>
                <div className="text-gray-800 text-sm tracking-wider">COMPROMIS SUR LA QUALITÉ</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm border border-primary/30 p-4 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
                <div className="text-3xl font-bold hero-stat-glow" style={{color: '#e6b000'}}>+50K</div>
                <div className="text-gray-800 text-sm tracking-wider">CLIENTES SATISFAITES</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm border border-primary/30 p-4 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
                <div className="text-3xl font-bold hero-stat-glow" style={{color: '#e6b000'}}>+300</div>
                <div className="text-gray-800 text-sm tracking-wider">PRODUITS</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse z-30 md:bottom-8">
            <span className="text-xs mb-2 tracking-widest" style={{color: '#ffb6c1'}}>FAITES DÉFILER</span>
            <div className="w-0.5 h-12 bg-primary"></div>
          </div>
        </div>
      </section>

      {/* Section 1: À propos */}
      <section id="about" className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="inline-block px-4 py-1 text-black text-sm font-bold tracking-wider uppercase mb-6 rounded-sm" style={{backgroundColor: '#e6b000'}}>
            À propos
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-black">L'HISTOIRE DE</span><br />
            <span className="text-primary tracking-wider">C'LINE HAIR</span>
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl mx-auto">
            Marque française née à Paris, C'Line Hair sublime depuis plus de 20 ans la beauté naturelle
            avec des perruques et extensions haut de gamme — éthiques, durables et accessibles.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Bloc 1 */}
            <div className="bg-white/60 backdrop-blur-sm border border-primary/30 p-6 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
              <h3 className="text-lg font-bold mb-3" style={{color: '#ffb6c1'}}>Le parcours</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                D'un atelier parisien à une référence de confiance : sélection de cheveux 100 % traçables,
                finitions soignées et contrôle qualité strict à chaque étape.
              </p>
            </div>

            {/* Bloc 2 */}
            <div className="bg-white/60 backdrop-blur-sm border border-primary/30 p-6 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
              <h3 className="text-lg font-bold mb-3" style={{color: '#ffb6c1'}}>Savoir-faire & innovation</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Finitions <strong>HD Lace</strong> invisibles, <strong>InvisiFit 360°</strong>, lignes naturelles et confort
                longue durée — un rendu réaliste, sans compromis entre qualité, éthique et style.
              </p>
            </div>

            {/* Bloc 3 */}
            <div className="bg-white/60 backdrop-blur-sm border border-primary/30 p-6 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
              <h3 className="text-lg font-bold mb-3" style={{color: '#ffb6c1'}}>Au-delà du produit</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Conseils personnalisés, service de pose pro et guide d'entretien. Notre collection exclusive
                est pensée pour la confiance au quotidien.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/collections/all"
              className="group text-black font-bold py-4 px-8 rounded-sm transition-all duration-300 flex items-center justify-center shadow-glow uppercase tracking-wider text-sm"
              style={{backgroundColor: '#e6b000'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d4a000'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e6b000'}
            >
              Découvrir la collection
            </Link>
            <Link
              to="/conseils"
              className="group bg-white border-2 text-black font-bold py-4 px-8 rounded-sm transition-all duration-300 flex items-center justify-center uppercase tracking-wider text-sm"
              style={{borderColor: '#e6b000', color: '#e6b000'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e6b000';
                e.currentTarget.style.color = 'black';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#e6b000';
              }}
            >
              Nos conseils d'entretien
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Valeurs C'Line Hair */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="text-black">NOS </span>
            <span className="text-primary">VALEURS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 01 Qualité & Excellence */}
            <div className="bg-white/60 backdrop-blur-sm border border-primary/30 p-8 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
              <div className="text-primary text-5xl font-extrabold mb-4 hero-stat-glow">01</div>
              <h3 className="text-xl font-bold mb-4 text-black tracking-wider">QUALITÉ & EXCELLENCE</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Cheveux sélectionnés avec soin, finitions HD Lace invisibles et contrôle qualité à chaque étape.
              </p>
            </div>

            {/* 02 Éthique & Transparence */}
            <div className="bg-white/60 backdrop-blur-sm border border-primary/30 p-8 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
              <div className="text-primary text-5xl font-extrabold mb-4 hero-stat-glow">02</div>
              <h3 className="text-xl font-bold mb-4 text-black tracking-wider">ÉTHIQUE & TRANSPARENCE</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Approvisionnement responsable, traçabilité de l'origine et respect des donateurs & communautés.
              </p>
            </div>

            {/* 03 Confort & Innovation */}
            <div className="bg-white/60 backdrop-blur-sm border border-primary/30 p-8 rounded-sm text-center transform transition-transform hover:scale-105 hover:border-primary/80">
              <div className="text-primary text-5xl font-extrabold mb-4 hero-stat-glow">03</div>
              <h3 className="text-xl font-bold mb-4 text-black tracking-wider">CONFORT & INNOVATION</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Technologies HD Lace 9×6 & InvisiFit 360°, légèreté, tenue sûre et rendu ultra-naturel au quotidien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Histoire de C'Line Hair (Career Highlights) */}
      <CareerHighlights />

      {/* Add the CSS styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .hero-stat-glow {
            text-shadow: 0 0 8px rgba(var(--color-primary-rgb), 0.3);
          }

          .shadow-glow {
            box-shadow: 0 4px 20px rgba(var(--color-primary-rgb), 0.25);
          }
        `,
        }}
      />
    </div>
  );
}
