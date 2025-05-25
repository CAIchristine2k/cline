import React from 'react';
import { Instagram, Twitter, Facebook, ExternalLink } from 'lucide-react';
import type { LandingPageConfig } from '~/lib/config';

interface SocialFeedProps {
  config: LandingPageConfig;
}

type Platform = 'instagram' | 'twitter' | 'facebook';

interface SocialPost {
  id: number;
  platform: Platform;
  content: string;
  image: string;
  likes: number;
  date: string;
}

export default function SocialFeed({ config }: SocialFeedProps) {
  // Mock social posts - in a real implementation, these would come from social media APIs
  const socialPosts: SocialPost[] = [
    {
      id: 1,
      platform: 'instagram',
      content: `Training the next generation of champions. The legacy continues! #${config.influencerName.replace(' ', '')} #Boxing`,
      image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDMwMTF8MHwxfHNlYXJjaHwzfHxib3hpbmclMjBob29kaWUlMjBzcG9ydHN3ZWFyfGVufDB8MHx8fDE3NDc4NjQ1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 15423,
      date: '2d ago'
    },
    {
      id: 2,
      platform: 'twitter',
      content: `Just announced! New limited edition gloves dropping next week. Stay tuned for early access! #${config.brandName}Collection`,
      image: 'https://images.unsplash.com/photo-1622599518895-be813cc42628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDMwMTF8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYm94aW5nJTIwZ2xvdmVzfGVufDB8MHx8fDE3NDc4NjQ1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 8742,
      date: '5d ago'
    },
    {
      id: 3,
      platform: 'instagram',
      content: `Throwback to one of my favorite moments in the ring. What's your favorite ${config.influencerName} fight? Comment below! 👇`,
      image: config.influencerImage,
      likes: 23156,
      date: '1w ago'
    },
    {
      id: 4,
      platform: 'facebook',
      content: 'Honored to be featured in this month\'s Boxing Legacy magazine. Check out the full interview at the link in bio.',
      image: 'https://images.unsplash.com/photo-1652169916747-17834febef96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDMwMTF8MHwxfHNlYXJjaHwzfHxhdGhsZXRpYyUyMG1hbiUyMGJveGluZ3xlbnwwfDB8fHwxNzQ3ODY0NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 5621,
      date: '2w ago'
    }
  ];

  const socialLinks = [
    { platform: 'Instagram', icon: Instagram, color: 'hover:text-pink-500', url: config.socialLinks.instagram },
    { platform: 'Twitter', icon: Twitter, color: 'hover:text-blue-400', url: config.socialLinks.twitter },
    { platform: 'Facebook', icon: Facebook, color: 'hover:text-blue-600', url: config.socialLinks.facebook }
  ].filter(link => link.url); // Only show links that are configured

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'instagram': return Instagram;
      case 'twitter': return Twitter;
      case 'facebook': return Facebook;
      default: return Instagram;
    }
  };

  const getPlatformColor = (platform: Platform): string => {
    switch (platform) {
      case 'instagram': return 'text-pink-500';
      case 'twitter': return 'text-blue-400';
      case 'facebook': return 'text-blue-600';
      default: return '';
    }
  };

  const formatLikes = (likes: number): string => {
    return likes.toLocaleString();
  };

  return (
    <section id="news" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            FOLLOW <span className="text-primary">@{config.influencerName.toUpperCase().replace(' ', '')}</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Stay connected with {config.influencerName} on social media for exclusive content, behind-the-scenes footage, and the
            latest product announcements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPosts.map((post) => {
            const IconComponent = getPlatformIcon(post.platform);
            return (
              <div key={post.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={`Social post ${post.id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <a 
                      href="#view-post"
                      className="text-white text-sm font-medium flex items-center hover:text-primary transition-colors"
                    >
                      View Post
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <IconComponent 
                        className={`h-5 w-5 ${getPlatformColor(post.platform)}`}
                      />
                      <span className="ml-2 text-sm text-gray-400">{post.date}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {formatLikes(post.likes)} likes
                    </div>
                  </div>

                  <p className="text-gray-200 text-sm line-clamp-3">
                    {post.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {socialLinks.length > 0 && (
          <div className="mt-12 flex justify-center space-x-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a 
                  key={social.platform} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white transition-colors flex items-center font-medium ${social.color}`}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="ml-2">{social.platform}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}