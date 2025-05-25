import React from 'react';
import {Trophy, Target, Star, Calendar, Award, Zap} from 'lucide-react';

export function CareerHighlights() {
  const achievements = [
    {
      icon: Trophy,
      title: "WBC Welterweight Champion",
      year: "2000-2002",
      description: "Defeated Oscar De La Hoya to claim the WBC welterweight title"
    },
    {
      icon: Award,
      title: "WBA & WBC Light Middleweight Champion", 
      year: "2003-2005",
      description: "Unified light middleweight titles with victories over Fernando Vargas"
    },
    {
      icon: Star,
      title: "WBA Welterweight Champion",
      year: "2006-2008", 
      description: "Reclaimed welterweight glory with dominant performances"
    },
    {
      icon: Target,
      title: "Ring Magazine Fighter of the Year",
      year: "2000",
      description: "Recognized as the best pound-for-pound fighter"
    }
  ];

  const stats = [
    { label: "Professional Record", value: "49-10-1", icon: Zap },
    { label: "Knockouts", value: "30", icon: Target },
    { label: "World Titles", value: "3 Divisions", icon: Trophy },
    { label: "Career Span", value: "1993-2016", icon: Calendar }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-gold-500/20 text-gold-500 text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Boxing Legacy
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">CHAMPIONSHIP</span>{' '}
            <span className="text-gold-500">LEGACY</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            From lightweight to light middleweight, Sugar Shane Mosley dominated three weight divisions 
            with lightning-fast hands and championship heart. Witness the journey of a true boxing legend.
          </p>
        </div>

        {/* Career Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="bg-black/60 backdrop-blur-sm border border-gray-700 hover:border-gold-500/50 rounded-lg p-6 text-center transition-all duration-300 hover:transform hover:scale-105"
              >
                <IconComponent className="h-8 w-8 text-gold-500 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-gold-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Career Highlights */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Career Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-gold-500/20 to-transparent border border-gold-500/30">
              <img 
                src="/images/career-highlight.jpeg" 
                alt="Sugar Shane Mosley Career Highlights"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {/* Career Quote Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <blockquote className="text-white text-lg font-semibold italic mb-3">
                  "I always believed in my speed and power. That combination made me dangerous in any weight class."
                </blockquote>
                <cite className="text-gold-500 font-bold">- Sugar Shane Mosley</cite>
              </div>
            </div>
          </div>

          {/* Achievements List */}
          <div className="space-y-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={index}
                  className="group bg-black/40 backdrop-blur-sm border border-gray-700 hover:border-gold-500/50 rounded-lg p-6 transition-all duration-300 hover:bg-black/60"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gold-500/20 rounded-lg p-3 group-hover:bg-gold-500/30 transition-colors duration-300">
                      <IconComponent className="h-6 w-6 text-gold-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-gold-500 transition-colors duration-300">
                          {achievement.title}
                        </h3>
                        <span className="text-gold-500 font-bold text-sm bg-gold-500/20 px-3 py-1 rounded-sm">
                          {achievement.year}
                        </span>
                      </div>
                      <p className="text-gray-400 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fighting Style Section */}
        <div className="bg-gradient-to-r from-gold-900/20 via-gold-500/10 to-gold-900/20 backdrop-blur-sm border border-gold-500/30 rounded-lg p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The <span className="text-gold-500">Sugar</span> Style
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Zap className="h-10 w-10 text-gold-500 mx-auto" />
              <h4 className="text-xl font-bold text-white">Lightning Speed</h4>
              <p className="text-gray-300">
                Blazing fast hands that could land combinations before opponents could react
              </p>
            </div>
            <div className="space-y-3">
              <Target className="h-10 w-10 text-gold-500 mx-auto" />
              <h4 className="text-xl font-bold text-white">Precision Power</h4>
              <p className="text-gray-300">
                Perfect accuracy combined with devastating knockout power
              </p>
            </div>
            <div className="space-y-3">
              <Trophy className="h-10 w-10 text-gold-500 mx-auto" />
              <h4 className="text-xl font-bold text-white">Championship Heart</h4>
              <p className="text-gray-300">
                Unwavering determination that carried him through three weight divisions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl"></div>
    </section>
  );
}