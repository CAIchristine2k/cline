import {useConfig} from '~/utils/themeContext';
import {type MetaFunction, Link} from 'react-router';
import {getConfig} from '~/utils/config';

export const meta: MetaFunction = () => {
  const config = getConfig();
  return [{title: `${config.brandName} | About ${config.influencerName}`}];
};

export default function About() {
  const config = useConfig();

  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            About
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The Story of{' '}
            <span className="text-primary">{config.influencerName}</span>
          </h1>
          <p className="text-text/80 max-w-3xl mx-auto leading-relaxed">
            {config.influencerTitle} and boxing legend with a career spanning
            decades.
          </p>
        </div>

        {/* Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">
              The Champion's Journey
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p>{config.influencerBio}</p>
              <p>
                Throughout his illustrious career, {config.influencerName} has
                faced the world's best boxers and established himself as one of
                the greatest fighters of his generation. His lightning-fast hand
                speed, technical precision, and relentless work ethic earned him
                the respect of fans and peers alike.
              </p>
              <p>
                Beyond his accomplishments in the ring, {config.influencerName}{' '}
                has become an entrepreneur and brand ambassador, bringing his
                championship mentality to new ventures. This exclusive
                collection represents the culmination of his boxing knowledge
                and passion for excellence.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden rounded-sm border border-primary/20">
              <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                <span className="text-primary-700 text-lg">
                  {config.influencerName} Portrait
                </span>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 w-3/4 h-3/4 bg-primary/5 -z-10 rounded-sm"></div>
            <div className="absolute -top-8 -right-8 w-1/2 h-1/2 bg-primary/5 -z-10 rounded-sm"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Championship <span className="text-primary">Values</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 backdrop-blur-sm border border-primary/10 p-6 rounded-sm">
              <div className="text-primary text-4xl font-bold mb-4">01</div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-text/80">
                Striving for perfection in every product, just as{' '}
                {config.influencerName} did in the ring.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-primary/10 p-6 rounded-sm">
              <div className="text-primary text-4xl font-bold mb-4">02</div>
              <h3 className="text-xl font-bold mb-2">Authenticity</h3>
              <p className="text-text/80">
                Every product reflects the true spirit and legacy of{' '}
                {config.influencerName}'s career.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-primary/10 p-6 rounded-sm">
              <div className="text-primary text-4xl font-bold mb-4">03</div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-text/80">
                Combining traditional boxing wisdom with modern technology and
                design.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Experience the legacy of {config.influencerName}
          </h2>
          <p className="text-text/80 max-w-2xl mx-auto mb-8">
            Browse our exclusive collection of premium products designed with
            the champion's touch.
          </p>
          <Link
            to="/collections/all"
            className="inline-block bg-primary hover:bg-primary-600 text-background font-bold py-3 px-8 rounded-sm transition-colors"
          >
            Shop the Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
