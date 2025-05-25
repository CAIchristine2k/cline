import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction, Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {getConfig} from '~/lib/config';
import {ArrowLeft, Calendar, User} from 'lucide-react';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const config = getConfig();
  return [{title: `${config.brandName} | ${data?.article.title ?? ''}`}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  request,
  params,
}: LoaderFunctionArgs) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const [{blog}] = await Promise.all([
    context.storefront.query(ARTICLE_QUERY, {
      variables: {blogHandle, articleHandle},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(
    request,
    {
      handle: articleHandle,
      data: blog.articleByHandle,
    },
    {
      handle: blogHandle,
      data: blog,
    },
  );

  const article = blog.articleByHandle;

  return {article};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  // Get configuration
  const config = getConfig();

  return {
    config: {
      ...config,
      theme: config.influencerName.toLowerCase().replace(/\s+/g, '-'),
    },
  };
}

export default function Article() {
  const {article, config} = useLoaderData<typeof loader>();
  const {title, image, contentHtml, author} = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <div data-theme={config.theme} className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to={`/blogs/${article.blog?.handle || 'news'}`}
            className="inline-flex items-center text-gold-500 hover:text-gold-400 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-gold-500/20 text-gold-500 text-sm font-bold tracking-wider uppercase mb-6 rounded-sm">
              Article
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {title}
            </h1>

            <div className="flex items-center justify-center text-gray-400 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              <time dateTime={article.publishedAt}>{publishedDate}</time>
              {author && (
                <>
                  <span className="mx-3">•</span>
                  <User className="w-4 h-4 mr-2" />
                  <span>{author.name}</span>
                </>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {image && (
            <div className="mb-12 rounded-sm overflow-hidden">
              <Image
                data={image}
                sizes="(max-width: 768px) 100vw, 80vw"
                loading="eager"
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{__html: contentHtml}}
              className="text-gray-300 leading-relaxed [&>h1]:text-white [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-8 [&>h2]:text-white [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-6 [&>h3]:text-white [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-3 [&>h3]:mt-5 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:mb-4 [&>ul]:pl-6 [&>li]:mb-2 [&>li]:text-gray-300 [&>blockquote]:border-l-4 [&>blockquote]:border-gold-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gold-300 [&>blockquote]:bg-gold-900/10 [&>blockquote]:py-4 [&>blockquote]:my-6 [&>a]:text-gold-500 [&>a]:hover:text-gold-400 [&>a]:transition-colors [&>a]:duration-300"
            />
          </div>

          {/* Share Section */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="bg-gradient-to-r from-gold-900/20 via-gold-500/10 to-gold-900/20 border border-gold-500/30 rounded-sm p-8 text-center">
              <h3 className="text-xl font-bold text-gold-500 mb-4">
                Enjoyed This Article?
              </h3>
              <p className="text-gray-300 mb-6">
                Stay updated with the latest insights and training tips from{' '}
                {config.influencerName}.
              </p>
              <Link
                to="/blogs"
                className="inline-flex items-center bg-gold-500 hover:bg-gold-400 text-black font-bold py-3 px-6 rounded-sm transition-all duration-300 uppercase tracking-wider"
              >
                Read More Articles
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      handle
      articleByHandle(handle: $articleHandle) {
        handle
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
        blog {
          handle
        }
      }
    }
  }
` as const;
