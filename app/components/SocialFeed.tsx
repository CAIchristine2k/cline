import React from 'react';
import {Instagram, Heart, MessageCircle, Share} from 'lucide-react';

export function SocialFeed() {
  const socialPosts = [
    {
      id: 1,
      image: "/images/social-feed-1.jpeg",
      caption: "Training never stops. Championship mentality 💪 #SugarShane #BoxingLegend",
      likes: 15420,
      comments: 892,
      timeAgo: "2h"
    },
    {
      id: 2,
      image: "/images/social-feed-2.jpeg", 
      caption: "New collection dropping soon! Premium quality for champions 🥊✨",
      likes: 22150,
      comments: 1340,
      timeAgo: "1d"
    },
    {
      id: 3,
      image: "/images/social-feed-3.jpeg",
      caption: "Throwback to championship days. The hunger never dies 🏆",
      likes: 31800,
      comments: 2156,
      timeAgo: "3d"
    },
    {
      id: 4,
      image: "/images/social-feed-4.jpeg",
      caption: "Behind the scenes: Crafting excellence for the next generation 🥊",
      likes: 18900,
      comments: 967,
      timeAgo: "5d"
    }
  ];

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-gold-500/20 text-gold-500 text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Follow the Legend
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">SOCIAL</span>{' '}
            <span className="text-gold-500">FEED</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Stay connected with Sugar Shane's journey. Follow for exclusive behind-the-scenes content, 
            training tips, and championship insights.
          </p>
        </div>

        {/* Social Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {socialPosts.map((post) => (
            <div 
              key={post.id}
              className="group bg-black/60 backdrop-blur-sm border border-gray-700 hover:border-gold-500/50 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Post Image */}
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={post.image}
                  alt={`Social post ${post.id}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="h-12 w-12 text-white" />
                </div>

                {/* Time Badge */}
                <div className="absolute top-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-sm">
                  {post.timeAgo}
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                {/* Caption */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4 group-hover:text-white transition-colors duration-300">
                  {post.caption}
                </p>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments.toLocaleString()}</span>
                    </div>
                  </div>
                  <Share className="h-4 w-4 hover:text-gold-500 cursor-pointer transition-colors duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Follow Section */}
        <div className="bg-gradient-to-r from-gold-900/20 via-gold-500/10 to-gold-900/20 backdrop-blur-sm border border-gold-500/30 rounded-lg p-8 md:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Follow <span className="text-gold-500">@SugarShaneMosley</span>
            </h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Get exclusive access to training videos, behind-the-scenes content, and be the first 
              to know about new product launches and special events.
            </p>
            
            {/* Social Stats */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-gold-500">
                  2.1M
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  Followers
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-gold-500">
                  850
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  Posts
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-gold-500">
                  95K
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  Avg. Likes
                </div>
              </div>
            </div>

            {/* Follow Button */}
            <a
              href="https://instagram.com/sugarshanemosley"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-sm transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow on Instagram
            </a>
          </div>
        </div>

        {/* Hashtags */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['#SugarShane', '#BoxingLegend', '#ChampionGear', '#SugarShaneMosley', '#BoxingLife'].map((hashtag) => (
              <span 
                key={hashtag}
                className="bg-gray-800 hover:bg-gold-500/20 hover:text-gold-500 text-gray-400 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer"
              >
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl"></div>
    </section>
  );
}