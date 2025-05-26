import React from 'react';
import { Instagram, Twitter, Facebook, Youtube, Music, ExternalLink } from 'lucide-react';
import { useConfig } from '~/utils/themeContext';

type Platform = 'instagram' | 'twitter' | 'facebook' | 'youtube' | 'tiktok';

interface SocialPost {
  id: number;
  platform: Platform;
  content: string;
  image: string;
  likes: number;
  date: string;
}

export function SocialFeed() {
  const config = useConfig();
  
  // Skip rendering if social feed section is disabled in config
  if (!config.showSocialFeed) {
    return null;
  }

  // Mock social posts - in a real implementation, these would come from social media APIs
  // The content references the influencer name from config
  const socialPosts: SocialPost[] = [
    {
      id: 1,
      platform: 'instagram',
      content: `Training the next generation of champions. The legacy continues! #${config.influencerName.replace(' ', '')} #Boxing`,
      image: '/images/product-1.png',
      likes: 15423,
      date: '2d ago'
    },
    {
      id: 2,
      platform: 'twitter',
      content: `Just announced! New limited edition gloves dropping next week. Stay tuned for early access! #${config.brandName}Collection`,
      image: '/images/product-2.png',
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
      platform: 'youtube',
      content: 'Honored to be featured in this month\'s Boxing Legacy magazine. Check out the full interview at the link in bio.',
      image: '/images/product-3.png',
      likes: 5621,
      date: '2w ago'
    }
  ];

  // Build social links from config
  const socialLinks = [];
  
  if (config.socialLinks.instagram) {
    socialLinks.push({ platform: 'Instagram', icon: Instagram, color: 'hover:text-pink-500', url: config.socialLinks.instagram });
  }
  if (config.socialLinks.twitter) {
    socialLinks.push({ platform: 'Twitter', icon: Twitter, color: 'hover:text-blue-400', url: config.socialLinks.twitter });
  }
  if (config.socialLinks.facebook) {
    socialLinks.push({ platform: 'Facebook', icon: Facebook, color: 'hover:text-blue-600', url: config.socialLinks.facebook });
  }
  if (config.socialLinks.youtube) {
    socialLinks.push({ platform: 'YouTube', icon: Youtube, color: 'hover:text-red-600', url: config.socialLinks.youtube });
  }
  if (config.socialLinks.tiktok) {
    socialLinks.push({ platform: 'TikTok', icon: Music, color: 'hover:text-teal-400', url: config.socialLinks.tiktok });
  }

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'instagram': return Instagram;
      case 'twitter': return Twitter;
      case 'facebook': return Facebook;
      case 'youtube': return Youtube;
      case 'tiktok': return Music;
      default: return Instagram;
    }
  };

  const getPlatformColor = (platform: Platform): string => {
    switch (platform) {
      case 'instagram': return 'text-pink-500';
      case 'twitter': return 'text-blue-400';
      case 'facebook': return 'text-blue-600';
      case 'youtube': return 'text-red-600';
      case 'tiktok': return 'text-teal-400';
      default: return '';
    }
  };

  const formatLikes = (likes: number): string => {
    return likes >= 1000 ? `${(likes / 1000).toFixed(1)}K` : likes.toString();
  };

  // Determine social handle from config - used in the section title
  const socialHandle = config.socialLinks.instagram
    ? config.socialLinks.instagram.split('/').pop() || config.influencerName.toUpperCase().replace(' ', '')
    : config.influencerName.toUpperCase().replace(' ', '');

  return (
    <section id="news" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            FOLLOW <span className="text-primary">@{socialHandle}</span>
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
              <div key={post.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg group border border-gray-800 hover:border-primary/30 transition-all duration-300">
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
          <div className="mt-12 flex flex-wrap justify-center gap-6">
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