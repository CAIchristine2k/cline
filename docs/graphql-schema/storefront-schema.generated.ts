import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {[key: string]: unknown}, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | {[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: {input: string; output: string};
  String: {input: string; output: string};
  Boolean: {input: boolean; output: boolean};
  Int: {input: number; output: number};
  Float: {input: number; output: number};
  Color: {input: string; output: string};
  DateTime: {input: string; output: string};
  Decimal: {input: string; output: string};
  HTML: {input: string; output: string};
  ISO8601DateTime: {input: any; output: any};
  JSON: {input: any; output: any};
  URL: {input: string; output: string};
  UnsignedInt64: {input: any; output: any};
};

/**
 * A version of the API, as defined by [Shopify API versioning](https://shopify.dev/api/usage/versioning).
 * Versions are commonly referred to by their handle (for example, `2021-10`).
 *
 */
export type ApiVersion = {
  __typename?: 'ApiVersion';
  /** The human-readable name of the version. */
  displayName: Scalars['String']['output'];
  /** The unique identifier of an ApiVersion. All supported API versions have a date-based (YYYY-MM) or `unstable` handle. */
  handle: Scalars['String']['output'];
  /** Whether the version is actively supported by Shopify. Supported API versions are guaranteed to be stable. Unsupported API versions include unstable, release candidate, and end-of-life versions that are marked as unsupported. For more information, refer to [Versioning](https://shopify.dev/api/usage/versioning). */
  supported: Scalars['Boolean']['output'];
};

/**
 * The input fields for submitting Apple Pay payment method information for checkout.
 *
 */
export type ApplePayWalletContentInput = {
  /** The customer's billing address. */
  billingAddress: MailingAddressInput;
  /** The data for the Apple Pay wallet. */
  data: Scalars['String']['input'];
  /** The header data for the Apple Pay wallet. */
  header: ApplePayWalletHeaderInput;
  /** The last digits of the card used to create the payment. */
  lastDigits?: InputMaybe<Scalars['String']['input']>;
  /** The signature for the Apple Pay wallet. */
  signature: Scalars['String']['input'];
  /** The version for the Apple Pay wallet. */
  version: Scalars['String']['input'];
};

/**
 * The input fields for submitting wallet payment method information for checkout.
 *
 */
export type ApplePayWalletHeaderInput = {
  /** The application data for the Apple Pay wallet. */
  applicationData?: InputMaybe<Scalars['String']['input']>;
  /** The ephemeral public key for the Apple Pay wallet. */
  ephemeralPublicKey: Scalars['String']['input'];
  /** The public key hash for the Apple Pay wallet. */
  publicKeyHash: Scalars['String']['input'];
  /** The transaction ID for the Apple Pay wallet. */
  transactionId: Scalars['String']['input'];
};

/** Details about the gift card used on the checkout. */
export type AppliedGiftCard = Node & {
  __typename?: 'AppliedGiftCard';
  /** The amount that was taken from the gift card by applying it. */
  amountUsed: MoneyV2;
  /**
   * The amount that was taken from the gift card by applying it.
   * @deprecated Use `amountUsed` instead.
   */
  amountUsedV2: MoneyV2;
  /** The amount left on the gift card. */
  balance: MoneyV2;
  /**
   * The amount left on the gift card.
   * @deprecated Use `balance` instead.
   */
  balanceV2: MoneyV2;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The last characters of the gift card. */
  lastCharacters: Scalars['String']['output'];
  /** The amount that was applied to the checkout in its currency. */
  presentmentAmountUsed: MoneyV2;
};

/** An article in an online store blog. */
export type Article = HasMetafields &
  Node &
  OnlineStorePublishable &
  Trackable & {
    __typename?: 'Article';
    /**
     * The article's author.
     * @deprecated Use `authorV2` instead.
     */
    author: ArticleAuthor;
    /** The article's author. */
    authorV2?: Maybe<ArticleAuthor>;
    /** The blog that the article belongs to. */
    blog: Blog;
    /** List of comments posted on the article. */
    comments: CommentConnection;
    /** Stripped content of the article, single line with HTML tags removed. */
    content: Scalars['String']['output'];
    /** The content of the article, complete with HTML formatting. */
    contentHtml: Scalars['HTML']['output'];
    /** Stripped excerpt of the article, single line with HTML tags removed. */
    excerpt?: Maybe<Scalars['String']['output']>;
    /** The excerpt of the article, complete with HTML formatting. */
    excerptHtml?: Maybe<Scalars['HTML']['output']>;
    /** A human-friendly unique string for the Article automatically generated from its title. */
    handle: Scalars['String']['output'];
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The image associated with the article. */
    image?: Maybe<Image>;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield?: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
    onlineStoreUrl?: Maybe<Scalars['URL']['output']>;
    /** The date and time when the article was published. */
    publishedAt: Scalars['DateTime']['output'];
    /** The article’s SEO information. */
    seo?: Maybe<Seo>;
    /**
     * A categorization that a article can be tagged with.
     *
     */
    tags: Array<Scalars['String']['output']>;
    /** The article’s name. */
    title: Scalars['String']['output'];
    /** URL parameters to be added to a page URL to track the origin of on-site search traffic for [analytics reporting](https://help.shopify.com/manual/reports-and-analytics/shopify-reports/report-types/default-reports/behaviour-reports). Returns a result when accessed through the [search](https://shopify.dev/docs/api/storefront/current/queries/search) or [predictiveSearch](https://shopify.dev/docs/api/storefront/current/queries/predictiveSearch) queries, otherwise returns null. */
    trackingParameters?: Maybe<Scalars['String']['output']>;
  };

/** An article in an online store blog. */
export type ArticleCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An article in an online store blog. */
export type ArticleContentArgs = {
  truncateAt?: InputMaybe<Scalars['Int']['input']>;
};

/** An article in an online store blog. */
export type ArticleExcerptArgs = {
  truncateAt?: InputMaybe<Scalars['Int']['input']>;
};

/** An article in an online store blog. */
export type ArticleMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** An article in an online store blog. */
export type ArticleMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** The author of an article. */
export type ArticleAuthor = {
  __typename?: 'ArticleAuthor';
  /** The author's bio. */
  bio?: Maybe<Scalars['String']['output']>;
  /** The author’s email. */
  email: Scalars['String']['output'];
  /** The author's first name. */
  firstName: Scalars['String']['output'];
  /** The author's last name. */
  lastName: Scalars['String']['output'];
  /** The author's full name. */
  name: Scalars['String']['output'];
};

/**
 * An auto-generated type for paginating through multiple Articles.
 *
 */
export type ArticleConnection = {
  __typename?: 'ArticleConnection';
  /** A list of edges. */
  edges: Array<ArticleEdge>;
  /** A list of the nodes contained in ArticleEdge. */
  nodes: Array<Article>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Article and a cursor during pagination.
 *
 */
export type ArticleEdge = {
  __typename?: 'ArticleEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of ArticleEdge. */
  node: Article;
};

/** The set of valid sort keys for the Article query. */
export type ArticleSortKeys =
  /** Sort by the `author` value. */
  | 'AUTHOR'
  /** Sort by the `blog_title` value. */
  | 'BLOG_TITLE'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `published_at` value. */
  | 'PUBLISHED_AT'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** Represents a generic custom attribute, such as whether an order is a customer's first. */
export type Attribute = {
  __typename?: 'Attribute';
  /**
   * The key or name of the attribute. For example, `"customersFirstOrder"`.
   *
   */
  key: Scalars['String']['output'];
  /**
   * The value of the attribute. For example, `"true"`.
   *
   */
  value?: Maybe<Scalars['String']['output']>;
};

/** The input fields for an attribute. */
export type AttributeInput = {
  /** Key or name of the attribute. */
  key: Scalars['String']['input'];
  /** Value of the attribute. */
  value: Scalars['String']['input'];
};

/**
 * Automatic discount applications capture the intentions of a discount that was automatically applied.
 *
 */
export type AutomaticDiscountApplication = DiscountApplication & {
  __typename?: 'AutomaticDiscountApplication';
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the application. */
  title: Scalars['String']['output'];
  /** The value of the discount application. */
  value: PricingValue;
};

/** Represents a cart line common fields. */
export type BaseCartLine = {
  /** An attribute associated with the cart line. */
  attribute?: Maybe<Attribute>;
  /** The attributes associated with the cart line. Attributes are represented as key-value pairs. */
  attributes: Array<Attribute>;
  /** The cost of the merchandise that the buyer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout. */
  cost: CartLineCost;
  /** The discounts that have been applied to the cart line. */
  discountAllocations: Array<CartDiscountAllocation>;
  /**
   * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
   * @deprecated Use `cost` instead.
   */
  estimatedCost: CartLineEstimatedCost;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The merchandise that the buyer intends to purchase. */
  merchandise: Merchandise;
  /** The quantity of the merchandise that the customer intends to purchase. */
  quantity: Scalars['Int']['output'];
  /** The selling plan associated with the cart line and the effect that each selling plan has on variants when they're purchased. */
  sellingPlanAllocation?: Maybe<SellingPlanAllocation>;
};

/** Represents a cart line common fields. */
export type BaseCartLineAttributeArgs = {
  key: Scalars['String']['input'];
};

/**
 * An auto-generated type for paginating through multiple BaseCartLines.
 *
 */
export type BaseCartLineConnection = {
  __typename?: 'BaseCartLineConnection';
  /** A list of edges. */
  edges: Array<BaseCartLineEdge>;
  /** A list of the nodes contained in BaseCartLineEdge. */
  nodes: Array<BaseCartLine>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one BaseCartLine and a cursor during pagination.
 *
 */
export type BaseCartLineEdge = {
  __typename?: 'BaseCartLineEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of BaseCartLineEdge. */
  node: BaseCartLine;
};

/** An online store blog. */
export type Blog = HasMetafields &
  Node &
  OnlineStorePublishable & {
    __typename?: 'Blog';
    /** Find an article by its handle. */
    articleByHandle?: Maybe<Article>;
    /** List of the blog's articles. */
    articles: ArticleConnection;
    /** The authors who have contributed to the blog. */
    authors: Array<ArticleAuthor>;
    /**
     * A human-friendly unique string for the Blog automatically generated from its title.
     *
     */
    handle: Scalars['String']['output'];
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield?: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
    onlineStoreUrl?: Maybe<Scalars['URL']['output']>;
    /** The blog's SEO information. */
    seo?: Maybe<Seo>;
    /** The blogs’s title. */
    title: Scalars['String']['output'];
  };

/** An online store blog. */
export type BlogArticleByHandleArgs = {
  handle: Scalars['String']['input'];
};

/** An online store blog. */
export type BlogArticlesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ArticleSortKeys>;
};

/** An online store blog. */
export type BlogMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** An online store blog. */
export type BlogMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/**
 * An auto-generated type for paginating through multiple Blogs.
 *
 */
export type BlogConnection = {
  __typename?: 'BlogConnection';
  /** A list of edges. */
  edges: Array<BlogEdge>;
  /** A list of the nodes contained in BlogEdge. */
  nodes: Array<Blog>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Blog and a cursor during pagination.
 *
 */
export type BlogEdge = {
  __typename?: 'BlogEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of BlogEdge. */
  node: Blog;
};

/** The set of valid sort keys for the Blog query. */
export type BlogSortKeys =
  /** Sort by the `handle` value. */
  | 'HANDLE'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE';

/**
 * The store's [branding configuration](https://help.shopify.com/en/manual/promoting-marketing/managing-brand-assets).
 *
 */
export type Brand = {
  __typename?: 'Brand';
  /** The colors of the store's brand. */
  colors: BrandColors;
  /** The store's cover image. */
  coverImage?: Maybe<MediaImage>;
  /** The store's default logo. */
  logo?: Maybe<MediaImage>;
  /** The store's short description. */
  shortDescription?: Maybe<Scalars['String']['output']>;
  /** The store's slogan. */
  slogan?: Maybe<Scalars['String']['output']>;
  /** The store's preferred logo for square UI elements. */
  squareLogo?: Maybe<MediaImage>;
};

/**
 * A group of related colors for the shop's brand.
 *
 */
export type BrandColorGroup = {
  __typename?: 'BrandColorGroup';
  /** The background color. */
  background?: Maybe<Scalars['Color']['output']>;
  /** The foreground color. */
  foreground?: Maybe<Scalars['Color']['output']>;
};

/**
 * The colors of the shop's brand.
 *
 */
export type BrandColors = {
  __typename?: 'BrandColors';
  /** The shop's primary brand colors. */
  primary: Array<BrandColorGroup>;
  /** The shop's secondary brand colors. */
  secondary: Array<BrandColorGroup>;
};

/**
 * The input fields for obtaining the buyer's identity.
 *
 */
export type BuyerInput = {
  /** The identifier of the company location. */
  companyLocationId?: InputMaybe<Scalars['ID']['input']>;
  /** The customer access token retrieved from the [Customer Accounts API](https://shopify.dev/docs/api/customer#step-obtain-access-token). */
  customerAccessToken: Scalars['String']['input'];
};

/** Card brand, such as Visa or Mastercard, which can be used for payments. */
export type CardBrand =
  /** American Express. */
  | 'AMERICAN_EXPRESS'
  /** Diners Club. */
  | 'DINERS_CLUB'
  /** Discover. */
  | 'DISCOVER'
  /** JCB. */
  | 'JCB'
  /** Mastercard. */
  | 'MASTERCARD'
  /** Visa. */
  | 'VISA';

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type Cart = HasMetafields &
  Node & {
    __typename?: 'Cart';
    /** The gift cards that have been applied to the cart. */
    appliedGiftCards: Array<AppliedGiftCard>;
    /** An attribute associated with the cart. */
    attribute?: Maybe<Attribute>;
    /** The attributes associated with the cart. Attributes are represented as key-value pairs. */
    attributes: Array<Attribute>;
    /** Information about the buyer that's interacting with the cart. */
    buyerIdentity: CartBuyerIdentity;
    /** The URL of the checkout for the cart. */
    checkoutUrl: Scalars['URL']['output'];
    /** The estimated costs that the buyer will pay at checkout. The costs are subject to change and changes will be reflected at checkout. The `cost` field uses the `buyerIdentity` field to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing). */
    cost: CartCost;
    /** The date and time when the cart was created. */
    createdAt: Scalars['DateTime']['output'];
    /** The delivery properties of the cart. */
    delivery: CartDelivery;
    /**
     * The delivery groups available for the cart, based on the buyer identity default
     * delivery address preference or the default address of the logged-in customer.
     *
     */
    deliveryGroups: CartDeliveryGroupConnection;
    /** The discounts that have been applied to the entire cart. */
    discountAllocations: Array<CartDiscountAllocation>;
    /** The case-insensitive discount codes that the customer added at checkout. */
    discountCodes: Array<CartDiscountCode>;
    /**
     * The estimated costs that the buyer will pay at checkout. The estimated costs are subject to change and changes will be reflected at checkout. The `estimatedCost` field uses the `buyerIdentity` field to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing).
     * @deprecated Use `cost` instead.
     */
    estimatedCost: CartEstimatedCost;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** A list of lines containing information about the items the customer intends to purchase. */
    lines: BaseCartLineConnection;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield?: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** A note that's associated with the cart. For example, the note can be a personalized message to the buyer. */
    note?: Maybe<Scalars['String']['output']>;
    /** The total number of items in the cart. */
    totalQuantity: Scalars['Int']['output'];
    /** The date and time when the cart was updated. */
    updatedAt: Scalars['DateTime']['output'];
  };

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type CartAttributeArgs = {
  key: Scalars['String']['input'];
};

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type CartDeliveryGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  withCarrierRates?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type CartLinesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type CartMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type CartMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** A delivery address of the buyer that is interacting with the cart. */
export type CartAddress = CartDeliveryAddress;

/** The input fields to provide exactly one of a variety of delivery address types. */
export type CartAddressInput = {
  /** Copies details from the customer address to an address on this cart. */
  copyFromCustomerAddressId?: InputMaybe<Scalars['ID']['input']>;
  /** A delivery address stored on this cart. */
  deliveryAddress?: InputMaybe<CartDeliveryAddressInput>;
};

/** Return type for `cartAttributesUpdate` mutation. */
export type CartAttributesUpdatePayload = {
  __typename?: 'CartAttributesUpdatePayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** The discounts automatically applied to the cart line based on prerequisites that have been met. */
export type CartAutomaticDiscountAllocation = CartDiscountAllocation & {
  __typename?: 'CartAutomaticDiscountAllocation';
  /** The discount that have been applied on the cart line. */
  discountApplication: CartDiscountApplication;
  /** The discounted amount that has been applied to the cart line. */
  discountedAmount: MoneyV2;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the allocated discount. */
  title: Scalars['String']['output'];
};

/** Return type for `cartBillingAddressUpdate` mutation. */
export type CartBillingAddressUpdatePayload = {
  __typename?: 'CartBillingAddressUpdatePayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Represents information about the buyer that is interacting with the cart. */
export type CartBuyerIdentity = {
  __typename?: 'CartBuyerIdentity';
  /** The country where the buyer is located. */
  countryCode?: Maybe<CountryCode>;
  /** The customer account associated with the cart. */
  customer?: Maybe<Customer>;
  /**
   * An ordered set of delivery addresses tied to the buyer that is interacting with the cart.
   * The rank of the preferences is determined by the order of the addresses in the array. Preferences
   * can be used to populate relevant fields in the checkout flow.
   *
   * As of the `2025-01` release, `buyerIdentity.deliveryAddressPreferences` is deprecated.
   * Delivery addresses are now part of the `CartDelivery` object and managed with three new mutations:
   * - `cartDeliveryAddressAdd`
   * - `cartDeliveryAddressUpdate`
   * - `cartDeliveryAddressDelete`
   *
   * @deprecated Use `cart.delivery` instead.
   */
  deliveryAddressPreferences: Array<DeliveryAddress>;
  /** The email address of the buyer that's interacting with the cart. */
  email?: Maybe<Scalars['String']['output']>;
  /** The phone number of the buyer that's interacting with the cart. */
  phone?: Maybe<Scalars['String']['output']>;
  /**
   * A set of preferences tied to the buyer interacting with the cart. Preferences are used to prefill fields in at checkout to streamline information collection.
   * Preferences are not synced back to the cart if they are overwritten.
   *
   */
  preferences?: Maybe<CartPreferences>;
  /** The purchasing company associated with the cart. */
  purchasingCompany?: Maybe<PurchasingCompany>;
};

/**
 * Specifies the input fields to update the buyer information associated with a cart.
 * Buyer identity is used to determine
 * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * and should match the customer's shipping address.
 *
 */
export type CartBuyerIdentityInput = {
  /** The company location of the buyer that is interacting with the cart. */
  companyLocationId?: InputMaybe<Scalars['ID']['input']>;
  /** The country where the buyer is located. */
  countryCode?: InputMaybe<CountryCode>;
  /** The access token used to identify the customer associated with the cart. */
  customerAccessToken?: InputMaybe<Scalars['String']['input']>;
  /** The email address of the buyer that is interacting with the cart. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The phone number of the buyer that is interacting with the cart. */
  phone?: InputMaybe<Scalars['String']['input']>;
  /**
   * A set of preferences tied to the buyer interacting with the cart. Preferences are used to prefill fields in at checkout to streamline information collection.
   * Preferences are not synced back to the cart if they are overwritten.
   *
   */
  preferences?: InputMaybe<CartPreferencesInput>;
};

/** Return type for `cartBuyerIdentityUpdate` mutation. */
export type CartBuyerIdentityUpdatePayload = {
  __typename?: 'CartBuyerIdentityUpdatePayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/**
 * Represents how credit card details are provided for a direct payment.
 *
 */
export type CartCardSource =
  /**
   * The credit card was provided by a third party and vaulted on their system.
   * Using this value requires a separate permission from Shopify.
   *
   */
  'SAVED_CREDIT_CARD';

/** The discount that has been applied to the cart line using a discount code. */
export type CartCodeDiscountAllocation = CartDiscountAllocation & {
  __typename?: 'CartCodeDiscountAllocation';
  /** The code used to apply the discount. */
  code: Scalars['String']['output'];
  /** The discount that have been applied on the cart line. */
  discountApplication: CartDiscountApplication;
  /** The discounted amount that has been applied to the cart line. */
  discountedAmount: MoneyV2;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
};

/** The completion action to checkout a cart. */
export type CartCompletionAction = CompletePaymentChallenge;

/** The required completion action to checkout a cart. */
export type CartCompletionActionRequired = {
  __typename?: 'CartCompletionActionRequired';
  /** The action required to complete the cart completion attempt. */
  action?: Maybe<CartCompletionAction>;
  /** The ID of the cart completion attempt. */
  id: Scalars['String']['output'];
};

/** The result of a cart completion attempt. */
export type CartCompletionAttemptResult =
  | CartCompletionActionRequired
  | CartCompletionFailed
  | CartCompletionProcessing
  | CartCompletionSuccess;

/** A failed completion to checkout a cart. */
export type CartCompletionFailed = {
  __typename?: 'CartCompletionFailed';
  /** The errors that caused the checkout to fail. */
  errors: Array<CompletionError>;
  /** The ID of the cart completion attempt. */
  id: Scalars['String']['output'];
};

/** A cart checkout completion that's still processing. */
export type CartCompletionProcessing = {
  __typename?: 'CartCompletionProcessing';
  /** The ID of the cart completion attempt. */
  id: Scalars['String']['output'];
  /** The number of milliseconds to wait before polling again. */
  pollDelay: Scalars['Int']['output'];
};

/** A successful completion to checkout a cart and a created order. */
export type CartCompletionSuccess = {
  __typename?: 'CartCompletionSuccess';
  /** The date and time when the job completed. */
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The ID of the cart completion attempt. */
  id: Scalars['String']['output'];
  /** The ID of the order that's created in Shopify. */
  orderId: Scalars['ID']['output'];
  /** The URL of the order confirmation in Shopify. */
  orderUrl: Scalars['URL']['output'];
};

/**
 * The costs that the buyer will pay at checkout.
 * The cart cost uses [`CartBuyerIdentity`](https://shopify.dev/api/storefront/reference/cart/cartbuyeridentity) to determine
 * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing).
 *
 */
export type CartCost = {
  __typename?: 'CartCost';
  /** The estimated amount, before taxes and discounts, for the customer to pay at checkout. The checkout charge amount doesn't include any deferred payments that'll be paid at a later date. If the cart has no deferred payments, then the checkout charge amount is equivalent to `subtotalAmount`. */
  checkoutChargeAmount: MoneyV2;
  /** The amount, before taxes and cart-level discounts, for the customer to pay. */
  subtotalAmount: MoneyV2;
  /** Whether the subtotal amount is estimated. */
  subtotalAmountEstimated: Scalars['Boolean']['output'];
  /** The total amount for the customer to pay. */
  totalAmount: MoneyV2;
  /** Whether the total amount is estimated. */
  totalAmountEstimated: Scalars['Boolean']['output'];
  /**
   * The duty amount for the customer to pay at checkout.
   * @deprecated Tax and duty amounts are no longer available and will be removed in a future version.
   * Please see [the changelog](https://shopify.dev/changelog/tax-and-duties-are-deprecated-in-storefront-cart-api)
   * for more information.
   *
   */
  totalDutyAmount?: Maybe<MoneyV2>;
  /**
   * Whether the total duty amount is estimated.
   * @deprecated Tax and duty amounts are no longer available and will be removed in a future version.
   * Please see [the changelog](https://shopify.dev/changelog/tax-and-duties-are-deprecated-in-storefront-cart-api)
   * for more information.
   *
   */
  totalDutyAmountEstimated: Scalars['Boolean']['output'];
  /**
   * The tax amount for the customer to pay at checkout.
   * @deprecated Tax and duty amounts are no longer available and will be removed in a future version.
   * Please see [the changelog](https://shopify.dev/changelog/tax-and-duties-are-deprecated-in-storefront-cart-api)
   * for more information.
   *
   */
  totalTaxAmount?: Maybe<MoneyV2>;
  /**
   * Whether the total tax amount is estimated.
   * @deprecated Tax and duty amounts are no longer available and will be removed in a future version.
   * Please see [the changelog](https://shopify.dev/changelog/tax-and-duties-are-deprecated-in-storefront-cart-api)
   * for more information.
   *
   */
  totalTaxAmountEstimated: Scalars['Boolean']['output'];
};

/** Return type for `cartCreate` mutation. */
export type CartCreatePayload = {
  __typename?: 'CartCreatePayload';
  /** The new cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** The discounts automatically applied to the cart line based on prerequisites that have been met. */
export type CartCustomDiscountAllocation = CartDiscountAllocation & {
  __typename?: 'CartCustomDiscountAllocation';
  /** The discount that have been applied on the cart line. */
  discountApplication: CartDiscountApplication;
  /** The discounted amount that has been applied to the cart line. */
  discountedAmount: MoneyV2;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the allocated discount. */
  title: Scalars['String']['output'];
};

/**
 * The delivery properties of the cart.
 *
 */
export type CartDelivery = {
  __typename?: 'CartDelivery';
  /** Selectable addresses to present to the buyer on the cart. */
  addresses: Array<CartSelectableAddress>;
};

/**
 * The delivery properties of the cart.
 *
 */
export type CartDeliveryAddressesArgs = {
  selected?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents a mailing address for customers and shipping. */
export type CartDeliveryAddress = {
  __typename?: 'CartDeliveryAddress';
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']['output']>;
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   *
   */
  address2?: Maybe<Scalars['String']['output']>;
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']['output']>;
  /** The name of the customer's company or organization. */
  company?: Maybe<Scalars['String']['output']>;
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   *
   */
  countryCode?: Maybe<Scalars['String']['output']>;
  /** The first name of the customer. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** A formatted version of the address, customized by the provided arguments. */
  formatted: Array<Scalars['String']['output']>;
  /** A comma-separated list of the values for city, province, and country. */
  formattedArea?: Maybe<Scalars['String']['output']>;
  /** The last name of the customer. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** The latitude coordinate of the customer address. */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** The longitude coordinate of the customer address. */
  longitude?: Maybe<Scalars['Float']['output']>;
  /** The full name of the customer, based on firstName and lastName. */
  name?: Maybe<Scalars['String']['output']>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone?: Maybe<Scalars['String']['output']>;
  /**
   * The alphanumeric code for the region.
   *
   * For example, ON.
   *
   */
  provinceCode?: Maybe<Scalars['String']['output']>;
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars['String']['output']>;
};

/** Represents a mailing address for customers and shipping. */
export type CartDeliveryAddressFormattedArgs = {
  withCompany?: InputMaybe<Scalars['Boolean']['input']>;
  withName?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The input fields to create or update a cart address. */
export type CartDeliveryAddressInput = {
  /**
   * The first line of the address. Typically the street address or PO Box number.
   *
   */
  address1?: InputMaybe<Scalars['String']['input']>;
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   *
   */
  address2?: InputMaybe<Scalars['String']['input']>;
  /**
   * The name of the city, district, village, or town.
   *
   */
  city?: InputMaybe<Scalars['String']['input']>;
  /**
   * The name of the customer's company or organization.
   *
   */
  company?: InputMaybe<Scalars['String']['input']>;
  /** The name of the country. */
  countryCode?: InputMaybe<CountryCode>;
  /** The first name of the customer. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The last name of the customer. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** The region of the address, such as the province, state, or district. */
  provinceCode?: InputMaybe<Scalars['String']['input']>;
  /** The zip or postal code of the address. */
  zip?: InputMaybe<Scalars['String']['input']>;
};

/** Return type for `cartDeliveryAddressesAdd` mutation. */
export type CartDeliveryAddressesAddPayload = {
  __typename?: 'CartDeliveryAddressesAddPayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Return type for `cartDeliveryAddressesRemove` mutation. */
export type CartDeliveryAddressesRemovePayload = {
  __typename?: 'CartDeliveryAddressesRemovePayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Return type for `cartDeliveryAddressesUpdate` mutation. */
export type CartDeliveryAddressesUpdatePayload = {
  __typename?: 'CartDeliveryAddressesUpdatePayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Preferred location used to find the closest pick up point based on coordinates. */
export type CartDeliveryCoordinatesPreference = {
  __typename?: 'CartDeliveryCoordinatesPreference';
  /**
   * The two-letter code for the country of the preferred location.
   *
   * For example, US.
   *
   */
  countryCode: CountryCode;
  /** The geographic latitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points. */
  latitude: Scalars['Float']['output'];
  /** The geographic longitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points. */
  longitude: Scalars['Float']['output'];
};

/** Preferred location used to find the closest pick up point based on coordinates. */
export type CartDeliveryCoordinatesPreferenceInput = {
  /**
   * The two-letter code for the country of the preferred location.
   *
   * For example, US.
   *
   */
  countryCode: CountryCode;
  /** The geographic latitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points. */
  latitude: Scalars['Float']['input'];
  /** The geographic longitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points. */
  longitude: Scalars['Float']['input'];
};

/** Information about the options available for one or more line items to be delivered to a specific address. */
export type CartDeliveryGroup = {
  __typename?: 'CartDeliveryGroup';
  /** A list of cart lines for the delivery group. */
  cartLines: BaseCartLineConnection;
  /** The destination address for the delivery group. */
  deliveryAddress: MailingAddress;
  /** The delivery options available for the delivery group. */
  deliveryOptions: Array<CartDeliveryOption>;
  /** The type of merchandise in the delivery group. */
  groupType: CartDeliveryGroupType;
  /** The ID for the delivery group. */
  id: Scalars['ID']['output'];
  /** The selected delivery option for the delivery group. */
  selectedDeliveryOption?: Maybe<CartDeliveryOption>;
};

/** Information about the options available for one or more line items to be delivered to a specific address. */
export type CartDeliveryGroupCartLinesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * An auto-generated type for paginating through multiple CartDeliveryGroups.
 *
 */
export type CartDeliveryGroupConnection = {
  __typename?: 'CartDeliveryGroupConnection';
  /** A list of edges. */
  edges: Array<CartDeliveryGroupEdge>;
  /** A list of the nodes contained in CartDeliveryGroupEdge. */
  nodes: Array<CartDeliveryGroup>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one CartDeliveryGroup and a cursor during pagination.
 *
 */
export type CartDeliveryGroupEdge = {
  __typename?: 'CartDeliveryGroupEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of CartDeliveryGroupEdge. */
  node: CartDeliveryGroup;
};

/**
 * Defines what type of merchandise is in the delivery group.
 *
 */
export type CartDeliveryGroupType =
  /**
   * The delivery group only contains merchandise that is either a one time purchase or a first delivery of
   * subscription merchandise.
   *
   */
  | 'ONE_TIME_PURCHASE'
  /** The delivery group only contains subscription merchandise. */
  | 'SUBSCRIPTION';

/** The input fields for the cart's delivery properties. */
export type CartDeliveryInput = {
  /**
   * Selectable addresses to present to the buyer on the cart.
   *
   * The input must not contain more than `250` values.
   */
  addresses?: InputMaybe<Array<CartSelectableAddressInput>>;
};

/** Information about a delivery option. */
export type CartDeliveryOption = {
  __typename?: 'CartDeliveryOption';
  /** The code of the delivery option. */
  code?: Maybe<Scalars['String']['output']>;
  /** The method for the delivery option. */
  deliveryMethodType: DeliveryMethodType;
  /** The description of the delivery option. */
  description?: Maybe<Scalars['String']['output']>;
  /** The estimated cost for the delivery option. */
  estimatedCost: MoneyV2;
  /** The unique identifier of the delivery option. */
  handle: Scalars['String']['output'];
  /** The title of the delivery option. */
  title?: Maybe<Scalars['String']['output']>;
};

/**
 * A set of preferences tied to the buyer interacting with the cart. Preferences are used to prefill fields in at checkout to streamline information collection.
 * Preferences are not synced back to the cart if they are overwritten.
 *
 */
export type CartDeliveryPreference = {
  __typename?: 'CartDeliveryPreference';
  /** Preferred location used to find the closest pick up point based on coordinates. */
  coordinates?: Maybe<CartDeliveryCoordinatesPreference>;
  /** The preferred delivery methods such as shipping, local pickup or through pickup points. */
  deliveryMethod: Array<PreferenceDeliveryMethodType>;
  /**
   * The pickup handle prefills checkout fields with the location for either local pickup or pickup points delivery methods.
   * It accepts both location ID for local pickup and external IDs for pickup points.
   *
   */
  pickupHandle: Array<Scalars['String']['output']>;
};

/** Delivery preferences can be used to prefill the delivery section at checkout. */
export type CartDeliveryPreferenceInput = {
  /** The coordinates of a delivery location in order of preference. */
  coordinates?: InputMaybe<CartDeliveryCoordinatesPreferenceInput>;
  /**
   * The preferred delivery methods such as shipping, local pickup or through pickup points.
   *
   * The input must not contain more than `250` values.
   */
  deliveryMethod?: InputMaybe<Array<PreferenceDeliveryMethodType>>;
  /**
   * The pickup handle prefills checkout fields with the location for either local pickup or pickup points delivery methods.
   * It accepts both location ID for local pickup and external IDs for pickup points.
   *
   * The input must not contain more than `250` values.
   */
  pickupHandle?: InputMaybe<Array<Scalars['String']['input']>>;
};

/**
 * The input fields for submitting direct payment method information for checkout.
 *
 */
export type CartDirectPaymentMethodInput = {
  /** Indicates if the customer has accepted the subscription terms. Defaults to false. */
  acceptedSubscriptionTerms?: InputMaybe<Scalars['Boolean']['input']>;
  /** The customer's billing address. */
  billingAddress: MailingAddressInput;
  /** The source of the credit card payment. */
  cardSource?: InputMaybe<CartCardSource>;
  /** The session ID for the direct payment method used to create the payment. */
  sessionId: Scalars['String']['input'];
};

/** The discounts that have been applied to the cart line. */
export type CartDiscountAllocation = {
  /** The discount that have been applied on the cart line. */
  discountApplication: CartDiscountApplication;
  /** The discounted amount that has been applied to the cart line. */
  discountedAmount: MoneyV2;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
};

/**
 * The discount application capture the intentions of a discount source at
 *         the time of application.
 */
export type CartDiscountApplication = {
  __typename?: 'CartDiscountApplication';
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The value of the discount application. */
  value: PricingValue;
};

/** The discount codes applied to the cart. */
export type CartDiscountCode = {
  __typename?: 'CartDiscountCode';
  /** Whether the discount code is applicable to the cart's current contents. */
  applicable: Scalars['Boolean']['output'];
  /** The code for the discount. */
  code: Scalars['String']['output'];
};

/** Return type for `cartDiscountCodesUpdate` mutation. */
export type CartDiscountCodesUpdatePayload = {
  __typename?: 'CartDiscountCodesUpdatePayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Possible error codes that can be returned by `CartUserError`. */
export type CartErrorCode =
  /** The specified address field contains emojis. */
  | 'ADDRESS_FIELD_CONTAINS_EMOJIS'
  /** The specified address field contains HTML tags. */
  | 'ADDRESS_FIELD_CONTAINS_HTML_TAGS'
  /** The specified address field contains a URL. */
  | 'ADDRESS_FIELD_CONTAINS_URL'
  /** The specified address field does not match the expected pattern. */
  | 'ADDRESS_FIELD_DOES_NOT_MATCH_EXPECTED_PATTERN'
  /** The specified address field is required. */
  | 'ADDRESS_FIELD_IS_REQUIRED'
  /** The specified address field is too long. */
  | 'ADDRESS_FIELD_IS_TOO_LONG'
  /** The input value is invalid. */
  | 'INVALID'
  /** Company location not found or not allowed. */
  | 'INVALID_COMPANY_LOCATION'
  /** The delivery address was not found. */
  | 'INVALID_DELIVERY_ADDRESS_ID'
  /** Delivery group was not found in cart. */
  | 'INVALID_DELIVERY_GROUP'
  /** Delivery option was not valid. */
  | 'INVALID_DELIVERY_OPTION'
  /** The quantity must be a multiple of the specified increment. */
  | 'INVALID_INCREMENT'
  /** Merchandise line was not found in cart. */
  | 'INVALID_MERCHANDISE_LINE'
  /** The metafields were not valid. */
  | 'INVALID_METAFIELDS'
  /** The payment wasn't valid. */
  | 'INVALID_PAYMENT'
  /** Cannot update payment on an empty cart */
  | 'INVALID_PAYMENT_EMPTY_CART'
  /** The given zip code is invalid for the provided country. */
  | 'INVALID_ZIP_CODE_FOR_COUNTRY'
  /** The given zip code is invalid for the provided province. */
  | 'INVALID_ZIP_CODE_FOR_PROVINCE'
  /** The input value should be less than the maximum value allowed. */
  | 'LESS_THAN'
  /** The quantity must be below the specified maximum for the item. */
  | 'MAXIMUM_EXCEEDED'
  /** The quantity must be above the specified minimum for the item. */
  | 'MINIMUM_NOT_MET'
  /** The customer access token is required when setting a company location. */
  | 'MISSING_CUSTOMER_ACCESS_TOKEN'
  /** Missing discount code. */
  | 'MISSING_DISCOUNT_CODE'
  /** Missing note. */
  | 'MISSING_NOTE'
  /** The note length must be below the specified maximum. */
  | 'NOTE_TOO_LONG'
  /** Only one delivery address can be selected. */
  | 'ONLY_ONE_DELIVERY_ADDRESS_CAN_BE_SELECTED'
  /** The payment method is not supported. */
  | 'PAYMENT_METHOD_NOT_SUPPORTED'
  /** The given province cannot be found. */
  | 'PROVINCE_NOT_FOUND'
  /** Too many delivery addresses on Cart. */
  | 'TOO_MANY_DELIVERY_ADDRESSES'
  /** A general error occurred during address validation. */
  | 'UNSPECIFIED_ADDRESS_ERROR'
  /** Validation failed. */
  | 'VALIDATION_CUSTOM'
  /** The given zip code is unsupported. */
  | 'ZIP_CODE_NOT_SUPPORTED';

/** The estimated costs that the buyer will pay at checkout. The estimated cost uses [`CartBuyerIdentity`](https://shopify.dev/api/storefront/reference/cart/cartbuyeridentity) to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing). */
export type CartEstimatedCost = {
  __typename?: 'CartEstimatedCost';
  /** The estimated amount, before taxes and discounts, for the customer to pay at checkout. The checkout charge amount doesn't include any deferred payments that'll be paid at a later date. If the cart has no deferred payments, then the checkout charge amount is equivalent to`subtotal_amount`. */
  checkoutChargeAmount: MoneyV2;
  /** The estimated amount, before taxes and discounts, for the customer to pay. */
  subtotalAmount: MoneyV2;
  /** The estimated total amount for the customer to pay. */
  totalAmount: MoneyV2;
  /** The estimated duty amount for the customer to pay at checkout. */
  totalDutyAmount?: Maybe<MoneyV2>;
  /** The estimated tax amount for the customer to pay at checkout. */
  totalTaxAmount?: Maybe<MoneyV2>;
};

/**
 * The input fields for submitting a billing address without a selected payment method.
 *
 */
export type CartFreePaymentMethodInput = {
  /** The customer's billing address. */
  billingAddress: MailingAddressInput;
};

/** Return type for `cartGiftCardCodesRemove` mutation. */
export type CartGiftCardCodesRemovePayload = {
  __typename?: 'CartGiftCardCodesRemovePayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Return type for `cartGiftCardCodesUpdate` mutation. */
export type CartGiftCardCodesUpdatePayload = {
  __typename?: 'CartGiftCardCodesUpdatePayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** The input fields to create a cart. */
export type CartInput = {
  /**
   * An array of key-value pairs that contains additional information about the cart.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: InputMaybe<Array<AttributeInput>>;
  /**
   * The customer associated with the cart. Used to determine [international pricing]
   * (https://shopify.dev/custom-storefronts/internationalization/international-pricing).
   * Buyer identity should match the customer's shipping address.
   *
   */
  buyerIdentity?: InputMaybe<CartBuyerIdentityInput>;
  /** The delivery-related fields for the cart. */
  delivery?: InputMaybe<CartDeliveryInput>;
  /**
   * The case-insensitive discount codes that the customer added at checkout.
   *
   * The input must not contain more than `250` values.
   */
  discountCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * The case-insensitive gift card codes.
   *
   * The input must not contain more than `250` values.
   */
  giftCardCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * A list of merchandise lines to add to the cart.
   *
   * The input must not contain more than `250` values.
   */
  lines?: InputMaybe<Array<CartLineInput>>;
  /**
   * The metafields to associate with this cart.
   *
   * The input must not contain more than `250` values.
   */
  metafields?: InputMaybe<Array<CartInputMetafieldInput>>;
  /**
   * A note that's associated with the cart. For example, the note can be a personalized message to the buyer.
   *
   */
  note?: InputMaybe<Scalars['String']['input']>;
};

/** The input fields for a cart metafield value to set. */
export type CartInputMetafieldInput = {
  /** The key name of the metafield. */
  key: Scalars['String']['input'];
  /**
   * The type of data that the cart metafield stores.
   * The type of data must be a [supported type](https://shopify.dev/apps/metafields/types).
   *
   */
  type: Scalars['String']['input'];
  /**
   * The data to store in the cart metafield. The data is always stored as a string, regardless of the metafield's type.
   *
   */
  value: Scalars['String']['input'];
};

/** Represents information about the merchandise in the cart. */
export type CartLine = BaseCartLine &
  Node & {
    __typename?: 'CartLine';
    /** An attribute associated with the cart line. */
    attribute?: Maybe<Attribute>;
    /** The attributes associated with the cart line. Attributes are represented as key-value pairs. */
    attributes: Array<Attribute>;
    /** The cost of the merchandise that the buyer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout. */
    cost: CartLineCost;
    /** The discounts that have been applied to the cart line. */
    discountAllocations: Array<CartDiscountAllocation>;
    /**
     * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
     * @deprecated Use `cost` instead.
     */
    estimatedCost: CartLineEstimatedCost;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The merchandise that the buyer intends to purchase. */
    merchandise: Merchandise;
    /** The quantity of the merchandise that the customer intends to purchase. */
    quantity: Scalars['Int']['output'];
    /** The selling plan associated with the cart line and the effect that each selling plan has on variants when they're purchased. */
    sellingPlanAllocation?: Maybe<SellingPlanAllocation>;
  };

/** Represents information about the merchandise in the cart. */
export type CartLineAttributeArgs = {
  key: Scalars['String']['input'];
};

/** The cost of the merchandise line that the buyer will pay at checkout. */
export type CartLineCost = {
  __typename?: 'CartLineCost';
  /** The amount of the merchandise line. */
  amountPerQuantity: MoneyV2;
  /** The compare at amount of the merchandise line. */
  compareAtAmountPerQuantity?: Maybe<MoneyV2>;
  /** The cost of the merchandise line before line-level discounts. */
  subtotalAmount: MoneyV2;
  /** The total cost of the merchandise line. */
  totalAmount: MoneyV2;
};

/**
 * The estimated cost of the merchandise line that the buyer will pay at checkout.
 *
 */
export type CartLineEstimatedCost = {
  __typename?: 'CartLineEstimatedCost';
  /** The amount of the merchandise line. */
  amount: MoneyV2;
  /** The compare at amount of the merchandise line. */
  compareAtAmount?: Maybe<MoneyV2>;
  /** The estimated cost of the merchandise line before discounts. */
  subtotalAmount: MoneyV2;
  /** The estimated total cost of the merchandise line. */
  totalAmount: MoneyV2;
};

/** The input fields to create a merchandise line on a cart. */
export type CartLineInput = {
  /**
   * An array of key-value pairs that contains additional information about the merchandise line.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: InputMaybe<Array<AttributeInput>>;
  /** The ID of the merchandise that the buyer intends to purchase. */
  merchandiseId: Scalars['ID']['input'];
  /** The quantity of the merchandise. */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId?: InputMaybe<Scalars['ID']['input']>;
};

/** The input fields to update a line item on a cart. */
export type CartLineUpdateInput = {
  /**
   * An array of key-value pairs that contains additional information about the merchandise line.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: InputMaybe<Array<AttributeInput>>;
  /** The ID of the merchandise line. */
  id: Scalars['ID']['input'];
  /** The ID of the merchandise for the line item. */
  merchandiseId?: InputMaybe<Scalars['ID']['input']>;
  /** The quantity of the line item. */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId?: InputMaybe<Scalars['ID']['input']>;
};

/** Return type for `cartLinesAdd` mutation. */
export type CartLinesAddPayload = {
  __typename?: 'CartLinesAddPayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Return type for `cartLinesRemove` mutation. */
export type CartLinesRemovePayload = {
  __typename?: 'CartLinesRemovePayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Return type for `cartLinesUpdate` mutation. */
export type CartLinesUpdatePayload = {
  __typename?: 'CartLinesUpdatePayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** The input fields to delete a cart metafield. */
export type CartMetafieldDeleteInput = {
  /**
   * The key name of the cart metafield. Can either be a composite key (`namespace.key`) or a simple key
   *  that relies on the default app-reserved namespace.
   *
   */
  key: Scalars['String']['input'];
  /** The ID of the cart resource. */
  ownerId: Scalars['ID']['input'];
};

/** Return type for `cartMetafieldDelete` mutation. */
export type CartMetafieldDeletePayload = {
  __typename?: 'CartMetafieldDeletePayload';
  /** The ID of the deleted cart metafield. */
  deletedId?: Maybe<Scalars['ID']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<MetafieldDeleteUserError>;
};

/** The input fields for a cart metafield value to set. */
export type CartMetafieldsSetInput = {
  /** The key name of the cart metafield. */
  key: Scalars['String']['input'];
  /** The ID of the cart resource. */
  ownerId: Scalars['ID']['input'];
  /**
   * The type of data that the cart metafield stores.
   * The type of data must be a [supported type](https://shopify.dev/apps/metafields/types).
   *
   */
  type: Scalars['String']['input'];
  /**
   * The data to store in the cart metafield. The data is always stored as a string, regardless of the metafield's type.
   *
   */
  value: Scalars['String']['input'];
};

/** Return type for `cartMetafieldsSet` mutation. */
export type CartMetafieldsSetPayload = {
  __typename?: 'CartMetafieldsSetPayload';
  /** The list of cart metafields that were set. */
  metafields?: Maybe<Array<Metafield>>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<MetafieldsSetUserError>;
};

/** Return type for `cartNoteUpdate` mutation. */
export type CartNoteUpdatePayload = {
  __typename?: 'CartNoteUpdatePayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** An error occurred during the cart operation. */
export type CartOperationError = {
  __typename?: 'CartOperationError';
  /** The error code. */
  code: Scalars['String']['output'];
  /** The error message. */
  message?: Maybe<Scalars['String']['output']>;
};

/**
 * The input fields for updating the payment method that will be used to checkout.
 *
 */
export type CartPaymentInput = {
  /** The amount that the customer will be charged at checkout. */
  amount: MoneyInput;
  /**
   * The input fields to use when checking out a cart with a direct payment method (like a credit card).
   *
   */
  directPaymentMethod?: InputMaybe<CartDirectPaymentMethodInput>;
  /**
   * The input fields to use to checkout a cart without providing a payment method.
   * Use this payment method input if the total cost of the cart is 0.
   *
   */
  freePaymentMethod?: InputMaybe<CartFreePaymentMethodInput>;
  /**
   * An ID of the order placed on the originating platform.
   * Note that this value doesn't correspond to the Shopify Order ID.
   *
   */
  sourceIdentifier?: InputMaybe<Scalars['String']['input']>;
  /**
   * The input fields to use when checking out a cart with a wallet payment method (like Shop Pay or Apple Pay).
   *
   */
  walletPaymentMethod?: InputMaybe<CartWalletPaymentMethodInput>;
};

/** Return type for `cartPaymentUpdate` mutation. */
export type CartPaymentUpdatePayload = {
  __typename?: 'CartPaymentUpdatePayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/**
 * A set of preferences tied to the buyer interacting with the cart. Preferences are used to prefill fields in at checkout to streamline information collection.
 * Preferences are not synced back to the cart if they are overwritten.
 *
 */
export type CartPreferences = {
  __typename?: 'CartPreferences';
  /** Delivery preferences can be used to prefill the delivery section in at checkout. */
  delivery?: Maybe<CartDeliveryPreference>;
  /**
   * Wallet preferences are used to populate relevant payment fields in the checkout flow.
   * Accepted value: `["shop_pay"]`.
   *
   */
  wallet?: Maybe<Array<Scalars['String']['output']>>;
};

/** The input fields represent preferences for the buyer that is interacting with the cart. */
export type CartPreferencesInput = {
  /** Delivery preferences can be used to prefill the delivery section in at checkout. */
  delivery?: InputMaybe<CartDeliveryPreferenceInput>;
  /**
   * Wallet preferences are used to populate relevant payment fields in the checkout flow.
   * Accepted value: `["shop_pay"]`.
   *
   * The input must not contain more than `250` values.
   */
  wallet?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Return type for `cartPrepareForCompletion` mutation. */
export type CartPrepareForCompletionPayload = {
  __typename?: 'CartPrepareForCompletionPayload';
  /** The result of cart preparation for completion. */
  result?: Maybe<CartPrepareForCompletionResult>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
};

/** The result of cart preparation. */
export type CartPrepareForCompletionResult =
  | CartStatusNotReady
  | CartStatusReady
  | CartThrottled;

/**
 * A selectable delivery address for a cart.
 *
 */
export type CartSelectableAddress = {
  __typename?: 'CartSelectableAddress';
  /** The delivery address. */
  address: CartAddress;
  /** A unique identifier for the address, specific to this cart. */
  id: Scalars['ID']['output'];
  /** This delivery address will not be associated with the buyer after a successful checkout. */
  oneTimeUse: Scalars['Boolean']['output'];
  /** Sets exactly one address as pre-selected for the buyer. */
  selected: Scalars['Boolean']['output'];
};

/** The input fields for a selectable delivery address in a cart. */
export type CartSelectableAddressInput = {
  /** Exactly one kind of delivery address. */
  address: CartAddressInput;
  /** When true, this delivery address will not be associated with the buyer after a successful checkout. */
  oneTimeUse?: InputMaybe<Scalars['Boolean']['input']>;
  /** Sets exactly one address as pre-selected for the buyer. */
  selected?: InputMaybe<Scalars['Boolean']['input']>;
  /** Defines what kind of address validation is requested. */
  validationStrategy?: InputMaybe<DeliveryAddressValidationStrategy>;
};

/** The input fields to update a line item on a cart. */
export type CartSelectableAddressUpdateInput = {
  /** Exactly one kind of delivery address. */
  address?: InputMaybe<CartAddressInput>;
  /** The id of the selectable address. */
  id: Scalars['ID']['input'];
  /** When true, this delivery address will not be associated with the buyer after a successful checkout. */
  oneTimeUse?: InputMaybe<Scalars['Boolean']['input']>;
  /** Sets exactly one address as pre-selected for the buyer. */
  selected?: InputMaybe<Scalars['Boolean']['input']>;
  /** Defines what kind of address validation is requested. */
  validationStrategy?: InputMaybe<DeliveryAddressValidationStrategy>;
};

/**
 * The input fields for updating the selected delivery options for a delivery group.
 *
 */
export type CartSelectedDeliveryOptionInput = {
  /** The ID of the cart delivery group. */
  deliveryGroupId: Scalars['ID']['input'];
  /** The handle of the selected delivery option. */
  deliveryOptionHandle: Scalars['String']['input'];
};

/** Return type for `cartSelectedDeliveryOptionsUpdate` mutation. */
export type CartSelectedDeliveryOptionsUpdatePayload = {
  __typename?: 'CartSelectedDeliveryOptionsUpdatePayload';
  /** The updated cart. */
  cart?: Maybe<Cart>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
  /** A list of warnings that occurred during the mutation. */
  warnings: Array<CartWarning>;
};

/** Cart is not ready for payment update and completion. */
export type CartStatusNotReady = {
  __typename?: 'CartStatusNotReady';
  /** The result of cart preparation for completion. */
  cart?: Maybe<Cart>;
  /** The list of errors that caused the cart to not be ready for payment update and completion. */
  errors: Array<CartOperationError>;
};

/** Cart is ready for payment update and completion. */
export type CartStatusReady = {
  __typename?: 'CartStatusReady';
  /** The result of cart preparation for completion. */
  cart?: Maybe<Cart>;
};

/** Return type for `cartSubmitForCompletion` mutation. */
export type CartSubmitForCompletionPayload = {
  __typename?: 'CartSubmitForCompletionPayload';
  /** The result of cart submission for completion. */
  result?: Maybe<CartSubmitForCompletionResult>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<CartUserError>;
};

/** The result of cart submit completion. */
export type CartSubmitForCompletionResult =
  | SubmitAlreadyAccepted
  | SubmitFailed
  | SubmitSuccess
  | SubmitThrottled;

/**
 * Response signifying that the access to cart request is currently being throttled.
 * The client can retry after `poll_after`.
 *
 */
export type CartThrottled = {
  __typename?: 'CartThrottled';
  /** The polling delay. */
  pollAfter: Scalars['DateTime']['output'];
};

/** Represents an error that happens during execution of a cart mutation. */
export type CartUserError = DisplayableError & {
  __typename?: 'CartUserError';
  /** The error code. */
  code?: Maybe<CartErrorCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/**
 * The input fields for submitting wallet payment method information for checkout.
 *
 */
export type CartWalletPaymentMethodInput = {
  /** The payment method information for the Apple Pay wallet. */
  applePayWalletContent?: InputMaybe<ApplePayWalletContentInput>;
  /** The payment method information for the Shop Pay wallet. */
  shopPayWalletContent?: InputMaybe<ShopPayWalletContentInput>;
};

/** A warning that occurred during a cart mutation. */
export type CartWarning = {
  __typename?: 'CartWarning';
  /** The code of the warning. */
  code: CartWarningCode;
  /** The message text of the warning. */
  message: Scalars['String']['output'];
  /** The target of the warning. */
  target: Scalars['ID']['output'];
};

/** The code for the cart warning. */
export type CartWarningCode =
  /** A delivery address with the same details already exists on this cart. */
  | 'DUPLICATE_DELIVERY_ADDRESS'
  /** The merchandise does not have enough stock. */
  | 'MERCHANDISE_NOT_ENOUGH_STOCK'
  /** The merchandise is out of stock. */
  | 'MERCHANDISE_OUT_OF_STOCK'
  /** Gift cards are not available as a payment method. */
  | 'PAYMENTS_GIFT_CARDS_UNAVAILABLE';

/**
 * A filter used to view a subset of products in a collection matching a specific category value.
 *
 */
export type CategoryFilter = {
  /** The id of the category to filter on. */
  id: Scalars['String']['input'];
};

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type Collection = HasMetafields &
  Node &
  OnlineStorePublishable &
  Trackable & {
    __typename?: 'Collection';
    /** Stripped description of the collection, single line with HTML tags removed. */
    description: Scalars['String']['output'];
    /** The description of the collection, complete with HTML formatting. */
    descriptionHtml: Scalars['HTML']['output'];
    /**
     * A human-friendly unique string for the collection automatically generated from its title.
     * Limit of 255 characters.
     *
     */
    handle: Scalars['String']['output'];
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** Image associated with the collection. */
    image?: Maybe<Image>;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield?: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
    onlineStoreUrl?: Maybe<Scalars['URL']['output']>;
    /** List of products in the collection. */
    products: ProductConnection;
    /** The collection's SEO information. */
    seo: Seo;
    /** The collection’s name. Limit of 255 characters. */
    title: Scalars['String']['output'];
    /** URL parameters to be added to a page URL to track the origin of on-site search traffic for [analytics reporting](https://help.shopify.com/manual/reports-and-analytics/shopify-reports/report-types/default-reports/behaviour-reports). Returns a result when accessed through the [search](https://shopify.dev/docs/api/storefront/current/queries/search) or [predictiveSearch](https://shopify.dev/docs/api/storefront/current/queries/predictiveSearch) queries, otherwise returns null. */
    trackingParameters?: Maybe<Scalars['String']['output']>;
    /** The date and time when the collection was last modified. */
    updatedAt: Scalars['DateTime']['output'];
  };

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type CollectionDescriptionArgs = {
  truncateAt?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type CollectionMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type CollectionMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type CollectionProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<Array<ProductFilter>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ProductCollectionSortKeys>;
};

/**
 * An auto-generated type for paginating through multiple Collections.
 *
 */
export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  /** A list of edges. */
  edges: Array<CollectionEdge>;
  /** A list of the nodes contained in CollectionEdge. */
  nodes: Array<Collection>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total count of Collections. */
  totalCount: Scalars['UnsignedInt64']['output'];
};

/**
 * An auto-generated type which holds one Collection and a cursor during pagination.
 *
 */
export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of CollectionEdge. */
  node: Collection;
};

/** The set of valid sort keys for the Collection query. */
export type CollectionSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** A comment on an article. */
export type Comment = Node & {
  __typename?: 'Comment';
  /** The comment’s author. */
  author: CommentAuthor;
  /** Stripped content of the comment, single line with HTML tags removed. */
  content: Scalars['String']['output'];
  /** The content of the comment, complete with HTML formatting. */
  contentHtml: Scalars['HTML']['output'];
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
};

/** A comment on an article. */
export type CommentContentArgs = {
  truncateAt?: InputMaybe<Scalars['Int']['input']>;
};

/** The author of a comment. */
export type CommentAuthor = {
  __typename?: 'CommentAuthor';
  /** The author's email. */
  email: Scalars['String']['output'];
  /** The author’s name. */
  name: Scalars['String']['output'];
};

/**
 * An auto-generated type for paginating through multiple Comments.
 *
 */
export type CommentConnection = {
  __typename?: 'CommentConnection';
  /** A list of edges. */
  edges: Array<CommentEdge>;
  /** A list of the nodes contained in CommentEdge. */
  nodes: Array<Comment>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Comment and a cursor during pagination.
 *
 */
export type CommentEdge = {
  __typename?: 'CommentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of CommentEdge. */
  node: Comment;
};

/** Represents information about a company which is also a customer of the shop. */
export type Company = HasMetafields &
  Node & {
    __typename?: 'Company';
    /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company was created in Shopify. */
    createdAt: Scalars['DateTime']['output'];
    /** A unique externally-supplied ID for the company. */
    externalId?: Maybe<Scalars['String']['output']>;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield?: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The name of the company. */
    name: Scalars['String']['output'];
    /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company was last modified. */
    updatedAt: Scalars['DateTime']['output'];
  };

/** Represents information about a company which is also a customer of the shop. */
export type CompanyMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** Represents information about a company which is also a customer of the shop. */
export type CompanyMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** A company's main point of contact. */
export type CompanyContact = Node & {
  __typename?: 'CompanyContact';
  /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company contact was created in Shopify. */
  createdAt: Scalars['DateTime']['output'];
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The company contact's locale (language). */
  locale?: Maybe<Scalars['String']['output']>;
  /** The company contact's job title. */
  title?: Maybe<Scalars['String']['output']>;
  /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company contact was last modified. */
  updatedAt: Scalars['DateTime']['output'];
};

/** A company's location. */
export type CompanyLocation = HasMetafields &
  Node & {
    __typename?: 'CompanyLocation';
    /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company location was created in Shopify. */
    createdAt: Scalars['DateTime']['output'];
    /** A unique externally-supplied ID for the company. */
    externalId?: Maybe<Scalars['String']['output']>;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The preferred locale of the company location. */
    locale?: Maybe<Scalars['String']['output']>;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield?: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The name of the company location. */
    name: Scalars['String']['output'];
    /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company location was last modified. */
    updatedAt: Scalars['DateTime']['output'];
  };

/** A company's location. */
export type CompanyLocationMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** A company's location. */
export type CompanyLocationMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** The action for the 3DS payment redirect. */
export type CompletePaymentChallenge = {
  __typename?: 'CompletePaymentChallenge';
  /** The URL for the 3DS payment redirect. */
  redirectUrl?: Maybe<Scalars['URL']['output']>;
};

/** An error that occurred during a cart completion attempt. */
export type CompletionError = {
  __typename?: 'CompletionError';
  /** The error code. */
  code: CompletionErrorCode;
  /** The error message. */
  message?: Maybe<Scalars['String']['output']>;
};

/** The code of the error that occurred during a cart completion attempt. */
export type CompletionErrorCode =
  | 'ERROR'
  | 'INVENTORY_RESERVATION_ERROR'
  | 'PAYMENT_AMOUNT_TOO_SMALL'
  | 'PAYMENT_CALL_ISSUER'
  | 'PAYMENT_CARD_DECLINED'
  | 'PAYMENT_ERROR'
  | 'PAYMENT_GATEWAY_NOT_ENABLED_ERROR'
  | 'PAYMENT_INSUFFICIENT_FUNDS'
  | 'PAYMENT_INVALID_BILLING_ADDRESS'
  | 'PAYMENT_INVALID_CREDIT_CARD'
  | 'PAYMENT_INVALID_CURRENCY'
  | 'PAYMENT_INVALID_PAYMENT_METHOD'
  | 'PAYMENT_TRANSIENT_ERROR';

/** Represents information about the grouped merchandise in the cart. */
export type ComponentizableCartLine = BaseCartLine &
  Node & {
    __typename?: 'ComponentizableCartLine';
    /** An attribute associated with the cart line. */
    attribute?: Maybe<Attribute>;
    /** The attributes associated with the cart line. Attributes are represented as key-value pairs. */
    attributes: Array<Attribute>;
    /** The cost of the merchandise that the buyer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout. */
    cost: CartLineCost;
    /** The discounts that have been applied to the cart line. */
    discountAllocations: Array<CartDiscountAllocation>;
    /**
     * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
     * @deprecated Use `cost` instead.
     */
    estimatedCost: CartLineEstimatedCost;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The components of the line item. */
    lineComponents: Array<CartLine>;
    /** The merchandise that the buyer intends to purchase. */
    merchandise: Merchandise;
    /** The quantity of the merchandise that the customer intends to purchase. */
    quantity: Scalars['Int']['output'];
    /** The selling plan associated with the cart line and the effect that each selling plan has on variants when they're purchased. */
    sellingPlanAllocation?: Maybe<SellingPlanAllocation>;
  };

/** Represents information about the grouped merchandise in the cart. */
export type ComponentizableCartLineAttributeArgs = {
  key: Scalars['String']['input'];
};

/** Details for count of elements. */
export type Count = {
  __typename?: 'Count';
  /** Count of elements. */
  count: Scalars['Int']['output'];
  /** Precision of count, how exact is the value. */
  precision: CountPrecision;
};

/** The precision of the value returned by a count field. */
export type CountPrecision =
  /** The count is at least the value. A limit was reached. */
  | 'AT_LEAST'
  /** The count is exactly the value. */
  | 'EXACT';

/** A country. */
export type Country = {
  __typename?: 'Country';
  /** The languages available for the country. */
  availableLanguages: Array<Language>;
  /** The currency of the country. */
  currency: Currency;
  /** The ISO code of the country. */
  isoCode: CountryCode;
  /** The market that includes this country. */
  market?: Maybe<Market>;
  /** The name of the country. */
  name: Scalars['String']['output'];
  /** The unit system used in the country. */
  unitSystem: UnitSystem;
};

/**
 * The code designating a country/region, which generally follows ISO 3166-1 alpha-2 guidelines.
 * If a territory doesn't have a country code value in the `CountryCode` enum, then it might be considered a subdivision
 * of another country. For example, the territories associated with Spain are represented by the country code `ES`,
 * and the territories associated with the United States of America are represented by the country code `US`.
 *
 */
export type CountryCode =
  /** Ascension Island. */
  | 'AC'
  /** Andorra. */
  | 'AD'
  /** United Arab Emirates. */
  | 'AE'
  /** Afghanistan. */
  | 'AF'
  /** Antigua & Barbuda. */
  | 'AG'
  /** Anguilla. */
  | 'AI'
  /** Albania. */
  | 'AL'
  /** Armenia. */
  | 'AM'
  /** Netherlands Antilles. */
  | 'AN'
  /** Angola. */
  | 'AO'
  /** Argentina. */
  | 'AR'
  /** Austria. */
  | 'AT'
  /** Australia. */
  | 'AU'
  /** Aruba. */
  | 'AW'
  /** Åland Islands. */
  | 'AX'
  /** Azerbaijan. */
  | 'AZ'
  /** Bosnia & Herzegovina. */
  | 'BA'
  /** Barbados. */
  | 'BB'
  /** Bangladesh. */
  | 'BD'
  /** Belgium. */
  | 'BE'
  /** Burkina Faso. */
  | 'BF'
  /** Bulgaria. */
  | 'BG'
  /** Bahrain. */
  | 'BH'
  /** Burundi. */
  | 'BI'
  /** Benin. */
  | 'BJ'
  /** St. Barthélemy. */
  | 'BL'
  /** Bermuda. */
  | 'BM'
  /** Brunei. */
  | 'BN'
  /** Bolivia. */
  | 'BO'
  /** Caribbean Netherlands. */
  | 'BQ'
  /** Brazil. */
  | 'BR'
  /** Bahamas. */
  | 'BS'
  /** Bhutan. */
  | 'BT'
  /** Bouvet Island. */
  | 'BV'
  /** Botswana. */
  | 'BW'
  /** Belarus. */
  | 'BY'
  /** Belize. */
  | 'BZ'
  /** Canada. */
  | 'CA'
  /** Cocos (Keeling) Islands. */
  | 'CC'
  /** Congo - Kinshasa. */
  | 'CD'
  /** Central African Republic. */
  | 'CF'
  /** Congo - Brazzaville. */
  | 'CG'
  /** Switzerland. */
  | 'CH'
  /** Côte d’Ivoire. */
  | 'CI'
  /** Cook Islands. */
  | 'CK'
  /** Chile. */
  | 'CL'
  /** Cameroon. */
  | 'CM'
  /** China. */
  | 'CN'
  /** Colombia. */
  | 'CO'
  /** Costa Rica. */
  | 'CR'
  /** Cuba. */
  | 'CU'
  /** Cape Verde. */
  | 'CV'
  /** Curaçao. */
  | 'CW'
  /** Christmas Island. */
  | 'CX'
  /** Cyprus. */
  | 'CY'
  /** Czechia. */
  | 'CZ'
  /** Germany. */
  | 'DE'
  /** Djibouti. */
  | 'DJ'
  /** Denmark. */
  | 'DK'
  /** Dominica. */
  | 'DM'
  /** Dominican Republic. */
  | 'DO'
  /** Algeria. */
  | 'DZ'
  /** Ecuador. */
  | 'EC'
  /** Estonia. */
  | 'EE'
  /** Egypt. */
  | 'EG'
  /** Western Sahara. */
  | 'EH'
  /** Eritrea. */
  | 'ER'
  /** Spain. */
  | 'ES'
  /** Ethiopia. */
  | 'ET'
  /** Finland. */
  | 'FI'
  /** Fiji. */
  | 'FJ'
  /** Falkland Islands. */
  | 'FK'
  /** Faroe Islands. */
  | 'FO'
  /** France. */
  | 'FR'
  /** Gabon. */
  | 'GA'
  /** United Kingdom. */
  | 'GB'
  /** Grenada. */
  | 'GD'
  /** Georgia. */
  | 'GE'
  /** French Guiana. */
  | 'GF'
  /** Guernsey. */
  | 'GG'
  /** Ghana. */
  | 'GH'
  /** Gibraltar. */
  | 'GI'
  /** Greenland. */
  | 'GL'
  /** Gambia. */
  | 'GM'
  /** Guinea. */
  | 'GN'
  /** Guadeloupe. */
  | 'GP'
  /** Equatorial Guinea. */
  | 'GQ'
  /** Greece. */
  | 'GR'
  /** South Georgia & South Sandwich Islands. */
  | 'GS'
  /** Guatemala. */
  | 'GT'
  /** Guinea-Bissau. */
  | 'GW'
  /** Guyana. */
  | 'GY'
  /** Hong Kong SAR. */
  | 'HK'
  /** Heard & McDonald Islands. */
  | 'HM'
  /** Honduras. */
  | 'HN'
  /** Croatia. */
  | 'HR'
  /** Haiti. */
  | 'HT'
  /** Hungary. */
  | 'HU'
  /** Indonesia. */
  | 'ID'
  /** Ireland. */
  | 'IE'
  /** Israel. */
  | 'IL'
  /** Isle of Man. */
  | 'IM'
  /** India. */
  | 'IN'
  /** British Indian Ocean Territory. */
  | 'IO'
  /** Iraq. */
  | 'IQ'
  /** Iran. */
  | 'IR'
  /** Iceland. */
  | 'IS'
  /** Italy. */
  | 'IT'
  /** Jersey. */
  | 'JE'
  /** Jamaica. */
  | 'JM'
  /** Jordan. */
  | 'JO'
  /** Japan. */
  | 'JP'
  /** Kenya. */
  | 'KE'
  /** Kyrgyzstan. */
  | 'KG'
  /** Cambodia. */
  | 'KH'
  /** Kiribati. */
  | 'KI'
  /** Comoros. */
  | 'KM'
  /** St. Kitts & Nevis. */
  | 'KN'
  /** North Korea. */
  | 'KP'
  /** South Korea. */
  | 'KR'
  /** Kuwait. */
  | 'KW'
  /** Cayman Islands. */
  | 'KY'
  /** Kazakhstan. */
  | 'KZ'
  /** Laos. */
  | 'LA'
  /** Lebanon. */
  | 'LB'
  /** St. Lucia. */
  | 'LC'
  /** Liechtenstein. */
  | 'LI'
  /** Sri Lanka. */
  | 'LK'
  /** Liberia. */
  | 'LR'
  /** Lesotho. */
  | 'LS'
  /** Lithuania. */
  | 'LT'
  /** Luxembourg. */
  | 'LU'
  /** Latvia. */
  | 'LV'
  /** Libya. */
  | 'LY'
  /** Morocco. */
  | 'MA'
  /** Monaco. */
  | 'MC'
  /** Moldova. */
  | 'MD'
  /** Montenegro. */
  | 'ME'
  /** St. Martin. */
  | 'MF'
  /** Madagascar. */
  | 'MG'
  /** North Macedonia. */
  | 'MK'
  /** Mali. */
  | 'ML'
  /** Myanmar (Burma). */
  | 'MM'
  /** Mongolia. */
  | 'MN'
  /** Macao SAR. */
  | 'MO'
  /** Martinique. */
  | 'MQ'
  /** Mauritania. */
  | 'MR'
  /** Montserrat. */
  | 'MS'
  /** Malta. */
  | 'MT'
  /** Mauritius. */
  | 'MU'
  /** Maldives. */
  | 'MV'
  /** Malawi. */
  | 'MW'
  /** Mexico. */
  | 'MX'
  /** Malaysia. */
  | 'MY'
  /** Mozambique. */
  | 'MZ'
  /** Namibia. */
  | 'NA'
  /** New Caledonia. */
  | 'NC'
  /** Niger. */
  | 'NE'
  /** Norfolk Island. */
  | 'NF'
  /** Nigeria. */
  | 'NG'
  /** Nicaragua. */
  | 'NI'
  /** Netherlands. */
  | 'NL'
  /** Norway. */
  | 'NO'
  /** Nepal. */
  | 'NP'
  /** Nauru. */
  | 'NR'
  /** Niue. */
  | 'NU'
  /** New Zealand. */
  | 'NZ'
  /** Oman. */
  | 'OM'
  /** Panama. */
  | 'PA'
  /** Peru. */
  | 'PE'
  /** French Polynesia. */
  | 'PF'
  /** Papua New Guinea. */
  | 'PG'
  /** Philippines. */
  | 'PH'
  /** Pakistan. */
  | 'PK'
  /** Poland. */
  | 'PL'
  /** St. Pierre & Miquelon. */
  | 'PM'
  /** Pitcairn Islands. */
  | 'PN'
  /** Palestinian Territories. */
  | 'PS'
  /** Portugal. */
  | 'PT'
  /** Paraguay. */
  | 'PY'
  /** Qatar. */
  | 'QA'
  /** Réunion. */
  | 'RE'
  /** Romania. */
  | 'RO'
  /** Serbia. */
  | 'RS'
  /** Russia. */
  | 'RU'
  /** Rwanda. */
  | 'RW'
  /** Saudi Arabia. */
  | 'SA'
  /** Solomon Islands. */
  | 'SB'
  /** Seychelles. */
  | 'SC'
  /** Sudan. */
  | 'SD'
  /** Sweden. */
  | 'SE'
  /** Singapore. */
  | 'SG'
  /** St. Helena. */
  | 'SH'
  /** Slovenia. */
  | 'SI'
  /** Svalbard & Jan Mayen. */
  | 'SJ'
  /** Slovakia. */
  | 'SK'
  /** Sierra Leone. */
  | 'SL'
  /** San Marino. */
  | 'SM'
  /** Senegal. */
  | 'SN'
  /** Somalia. */
  | 'SO'
  /** Suriname. */
  | 'SR'
  /** South Sudan. */
  | 'SS'
  /** São Tomé & Príncipe. */
  | 'ST'
  /** El Salvador. */
  | 'SV'
  /** Sint Maarten. */
  | 'SX'
  /** Syria. */
  | 'SY'
  /** Eswatini. */
  | 'SZ'
  /** Tristan da Cunha. */
  | 'TA'
  /** Turks & Caicos Islands. */
  | 'TC'
  /** Chad. */
  | 'TD'
  /** French Southern Territories. */
  | 'TF'
  /** Togo. */
  | 'TG'
  /** Thailand. */
  | 'TH'
  /** Tajikistan. */
  | 'TJ'
  /** Tokelau. */
  | 'TK'
  /** Timor-Leste. */
  | 'TL'
  /** Turkmenistan. */
  | 'TM'
  /** Tunisia. */
  | 'TN'
  /** Tonga. */
  | 'TO'
  /** Türkiye. */
  | 'TR'
  /** Trinidad & Tobago. */
  | 'TT'
  /** Tuvalu. */
  | 'TV'
  /** Taiwan. */
  | 'TW'
  /** Tanzania. */
  | 'TZ'
  /** Ukraine. */
  | 'UA'
  /** Uganda. */
  | 'UG'
  /** U.S. Outlying Islands. */
  | 'UM'
  /** United States. */
  | 'US'
  /** Uruguay. */
  | 'UY'
  /** Uzbekistan. */
  | 'UZ'
  /** Vatican City. */
  | 'VA'
  /** St. Vincent & Grenadines. */
  | 'VC'
  /** Venezuela. */
  | 'VE'
  /** British Virgin Islands. */
  | 'VG'
  /** Vietnam. */
  | 'VN'
  /** Vanuatu. */
  | 'VU'
  /** Wallis & Futuna. */
  | 'WF'
  /** Samoa. */
  | 'WS'
  /** Kosovo. */
  | 'XK'
  /** Yemen. */
  | 'YE'
  /** Mayotte. */
  | 'YT'
  /** South Africa. */
  | 'ZA'
  /** Zambia. */
  | 'ZM'
  /** Zimbabwe. */
  | 'ZW'
  /** Unknown Region. */
  | 'ZZ';

/** The part of the image that should remain after cropping. */
export type CropRegion =
  /** Keep the bottom of the image. */
  | 'BOTTOM'
  /** Keep the center of the image. */
  | 'CENTER'
  /** Keep the left of the image. */
  | 'LEFT'
  /** Keep the right of the image. */
  | 'RIGHT'
  /** Keep the top of the image. */
  | 'TOP';

/** A currency. */
export type Currency = {
  __typename?: 'Currency';
  /** The ISO code of the currency. */
  isoCode: CurrencyCode;
  /** The name of the currency. */
  name: Scalars['String']['output'];
  /** The symbol of the currency. */
  symbol: Scalars['String']['output'];
};

/**
 * The three-letter currency codes that represent the world currencies used in
 * stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
 *
 */
export type CurrencyCode =
  /** United Arab Emirates Dirham (AED). */
  | 'AED'
  /** Afghan Afghani (AFN). */
  | 'AFN'
  /** Albanian Lek (ALL). */
  | 'ALL'
  /** Armenian Dram (AMD). */
  | 'AMD'
  /** Netherlands Antillean Guilder. */
  | 'ANG'
  /** Angolan Kwanza (AOA). */
  | 'AOA'
  /** Argentine Pesos (ARS). */
  | 'ARS'
  /** Australian Dollars (AUD). */
  | 'AUD'
  /** Aruban Florin (AWG). */
  | 'AWG'
  /** Azerbaijani Manat (AZN). */
  | 'AZN'
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  | 'BAM'
  /** Barbadian Dollar (BBD). */
  | 'BBD'
  /** Bangladesh Taka (BDT). */
  | 'BDT'
  /** Bulgarian Lev (BGN). */
  | 'BGN'
  /** Bahraini Dinar (BHD). */
  | 'BHD'
  /** Burundian Franc (BIF). */
  | 'BIF'
  /** Bermudian Dollar (BMD). */
  | 'BMD'
  /** Brunei Dollar (BND). */
  | 'BND'
  /** Bolivian Boliviano (BOB). */
  | 'BOB'
  /** Brazilian Real (BRL). */
  | 'BRL'
  /** Bahamian Dollar (BSD). */
  | 'BSD'
  /** Bhutanese Ngultrum (BTN). */
  | 'BTN'
  /** Botswana Pula (BWP). */
  | 'BWP'
  /** Belarusian Ruble (BYN). */
  | 'BYN'
  /** Belarusian Ruble (BYR). */
  | 'BYR'
  /** Belize Dollar (BZD). */
  | 'BZD'
  /** Canadian Dollars (CAD). */
  | 'CAD'
  /** Congolese franc (CDF). */
  | 'CDF'
  /** Swiss Francs (CHF). */
  | 'CHF'
  /** Chilean Peso (CLP). */
  | 'CLP'
  /** Chinese Yuan Renminbi (CNY). */
  | 'CNY'
  /** Colombian Peso (COP). */
  | 'COP'
  /** Costa Rican Colones (CRC). */
  | 'CRC'
  /** Cape Verdean escudo (CVE). */
  | 'CVE'
  /** Czech Koruny (CZK). */
  | 'CZK'
  /** Djiboutian Franc (DJF). */
  | 'DJF'
  /** Danish Kroner (DKK). */
  | 'DKK'
  /** Dominican Peso (DOP). */
  | 'DOP'
  /** Algerian Dinar (DZD). */
  | 'DZD'
  /** Egyptian Pound (EGP). */
  | 'EGP'
  /** Eritrean Nakfa (ERN). */
  | 'ERN'
  /** Ethiopian Birr (ETB). */
  | 'ETB'
  /** Euro (EUR). */
  | 'EUR'
  /** Fijian Dollars (FJD). */
  | 'FJD'
  /** Falkland Islands Pounds (FKP). */
  | 'FKP'
  /** United Kingdom Pounds (GBP). */
  | 'GBP'
  /** Georgian Lari (GEL). */
  | 'GEL'
  /** Ghanaian Cedi (GHS). */
  | 'GHS'
  /** Gibraltar Pounds (GIP). */
  | 'GIP'
  /** Gambian Dalasi (GMD). */
  | 'GMD'
  /** Guinean Franc (GNF). */
  | 'GNF'
  /** Guatemalan Quetzal (GTQ). */
  | 'GTQ'
  /** Guyanese Dollar (GYD). */
  | 'GYD'
  /** Hong Kong Dollars (HKD). */
  | 'HKD'
  /** Honduran Lempira (HNL). */
  | 'HNL'
  /** Croatian Kuna (HRK). */
  | 'HRK'
  /** Haitian Gourde (HTG). */
  | 'HTG'
  /** Hungarian Forint (HUF). */
  | 'HUF'
  /** Indonesian Rupiah (IDR). */
  | 'IDR'
  /** Israeli New Shekel (NIS). */
  | 'ILS'
  /** Indian Rupees (INR). */
  | 'INR'
  /** Iraqi Dinar (IQD). */
  | 'IQD'
  /** Iranian Rial (IRR). */
  | 'IRR'
  /** Icelandic Kronur (ISK). */
  | 'ISK'
  /** Jersey Pound. */
  | 'JEP'
  /** Jamaican Dollars (JMD). */
  | 'JMD'
  /** Jordanian Dinar (JOD). */
  | 'JOD'
  /** Japanese Yen (JPY). */
  | 'JPY'
  /** Kenyan Shilling (KES). */
  | 'KES'
  /** Kyrgyzstani Som (KGS). */
  | 'KGS'
  /** Cambodian Riel. */
  | 'KHR'
  /** Kiribati Dollar (KID). */
  | 'KID'
  /** Comorian Franc (KMF). */
  | 'KMF'
  /** South Korean Won (KRW). */
  | 'KRW'
  /** Kuwaiti Dinar (KWD). */
  | 'KWD'
  /** Cayman Dollars (KYD). */
  | 'KYD'
  /** Kazakhstani Tenge (KZT). */
  | 'KZT'
  /** Laotian Kip (LAK). */
  | 'LAK'
  /** Lebanese Pounds (LBP). */
  | 'LBP'
  /** Sri Lankan Rupees (LKR). */
  | 'LKR'
  /** Liberian Dollar (LRD). */
  | 'LRD'
  /** Lesotho Loti (LSL). */
  | 'LSL'
  /** Lithuanian Litai (LTL). */
  | 'LTL'
  /** Latvian Lati (LVL). */
  | 'LVL'
  /** Libyan Dinar (LYD). */
  | 'LYD'
  /** Moroccan Dirham. */
  | 'MAD'
  /** Moldovan Leu (MDL). */
  | 'MDL'
  /** Malagasy Ariary (MGA). */
  | 'MGA'
  /** Macedonia Denar (MKD). */
  | 'MKD'
  /** Burmese Kyat (MMK). */
  | 'MMK'
  /** Mongolian Tugrik. */
  | 'MNT'
  /** Macanese Pataca (MOP). */
  | 'MOP'
  /** Mauritanian Ouguiya (MRU). */
  | 'MRU'
  /** Mauritian Rupee (MUR). */
  | 'MUR'
  /** Maldivian Rufiyaa (MVR). */
  | 'MVR'
  /** Malawian Kwacha (MWK). */
  | 'MWK'
  /** Mexican Pesos (MXN). */
  | 'MXN'
  /** Malaysian Ringgits (MYR). */
  | 'MYR'
  /** Mozambican Metical. */
  | 'MZN'
  /** Namibian Dollar. */
  | 'NAD'
  /** Nigerian Naira (NGN). */
  | 'NGN'
  /** Nicaraguan Córdoba (NIO). */
  | 'NIO'
  /** Norwegian Kroner (NOK). */
  | 'NOK'
  /** Nepalese Rupee (NPR). */
  | 'NPR'
  /** New Zealand Dollars (NZD). */
  | 'NZD'
  /** Omani Rial (OMR). */
  | 'OMR'
  /** Panamian Balboa (PAB). */
  | 'PAB'
  /** Peruvian Nuevo Sol (PEN). */
  | 'PEN'
  /** Papua New Guinean Kina (PGK). */
  | 'PGK'
  /** Philippine Peso (PHP). */
  | 'PHP'
  /** Pakistani Rupee (PKR). */
  | 'PKR'
  /** Polish Zlotych (PLN). */
  | 'PLN'
  /** Paraguayan Guarani (PYG). */
  | 'PYG'
  /** Qatari Rial (QAR). */
  | 'QAR'
  /** Romanian Lei (RON). */
  | 'RON'
  /** Serbian dinar (RSD). */
  | 'RSD'
  /** Russian Rubles (RUB). */
  | 'RUB'
  /** Rwandan Franc (RWF). */
  | 'RWF'
  /** Saudi Riyal (SAR). */
  | 'SAR'
  /** Solomon Islands Dollar (SBD). */
  | 'SBD'
  /** Seychellois Rupee (SCR). */
  | 'SCR'
  /** Sudanese Pound (SDG). */
  | 'SDG'
  /** Swedish Kronor (SEK). */
  | 'SEK'
  /** Singapore Dollars (SGD). */
  | 'SGD'
  /** Saint Helena Pounds (SHP). */
  | 'SHP'
  /** Sierra Leonean Leone (SLL). */
  | 'SLL'
  /** Somali Shilling (SOS). */
  | 'SOS'
  /** Surinamese Dollar (SRD). */
  | 'SRD'
  /** South Sudanese Pound (SSP). */
  | 'SSP'
  /** Sao Tome And Principe Dobra (STD). */
  | 'STD'
  /** Sao Tome And Principe Dobra (STN). */
  | 'STN'
  /** Syrian Pound (SYP). */
  | 'SYP'
  /** Swazi Lilangeni (SZL). */
  | 'SZL'
  /** Thai baht (THB). */
  | 'THB'
  /** Tajikistani Somoni (TJS). */
  | 'TJS'
  /** Turkmenistani Manat (TMT). */
  | 'TMT'
  /** Tunisian Dinar (TND). */
  | 'TND'
  /** Tongan Pa'anga (TOP). */
  | 'TOP'
  /** Turkish Lira (TRY). */
  | 'TRY'
  /** Trinidad and Tobago Dollars (TTD). */
  | 'TTD'
  /** Taiwan Dollars (TWD). */
  | 'TWD'
  /** Tanzanian Shilling (TZS). */
  | 'TZS'
  /** Ukrainian Hryvnia (UAH). */
  | 'UAH'
  /** Ugandan Shilling (UGX). */
  | 'UGX'
  /** United States Dollars (USD). */
  | 'USD'
  /** Uruguayan Pesos (UYU). */
  | 'UYU'
  /** Uzbekistan som (UZS). */
  | 'UZS'
  /** Venezuelan Bolivares (VED). */
  | 'VED'
  /** Venezuelan Bolivares (VEF). */
  | 'VEF'
  /** Venezuelan Bolivares Soberanos (VES). */
  | 'VES'
  /** Vietnamese đồng (VND). */
  | 'VND'
  /** Vanuatu Vatu (VUV). */
  | 'VUV'
  /** Samoan Tala (WST). */
  | 'WST'
  /** Central African CFA Franc (XAF). */
  | 'XAF'
  /** East Caribbean Dollar (XCD). */
  | 'XCD'
  /** West African CFA franc (XOF). */
  | 'XOF'
  /** CFP Franc (XPF). */
  | 'XPF'
  /** Unrecognized currency. */
  | 'XXX'
  /** Yemeni Rial (YER). */
  | 'YER'
  /** South African Rand (ZAR). */
  | 'ZAR'
  /** Zambian Kwacha (ZMW). */
  | 'ZMW';

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type Customer = HasMetafields & {
  __typename?: 'Customer';
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing: Scalars['Boolean']['output'];
  /** A list of addresses for the customer. */
  addresses: MailingAddressConnection;
  /** The date and time when the customer was created. */
  createdAt: Scalars['DateTime']['output'];
  /** The customer’s default address. */
  defaultAddress?: Maybe<MailingAddress>;
  /** The customer’s name, email or phone number. */
  displayName: Scalars['String']['output'];
  /** The customer’s email address. */
  email?: Maybe<Scalars['String']['output']>;
  /** The customer’s first name. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** A unique ID for the customer. */
  id: Scalars['ID']['output'];
  /** The customer’s last name. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
  metafield?: Maybe<Metafield>;
  /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
  metafields: Array<Maybe<Metafield>>;
  /** The number of orders that the customer has made at the store in their lifetime. */
  numberOfOrders: Scalars['UnsignedInt64']['output'];
  /** The orders associated with the customer. */
  orders: OrderConnection;
  /** The customer’s phone number. */
  phone?: Maybe<Scalars['String']['output']>;
  /**
   * A comma separated list of tags that have been added to the customer.
   * Additional access scope required: unauthenticated_read_customer_tags.
   *
   */
  tags: Array<Scalars['String']['output']>;
  /** The date and time when the customer information was updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type CustomerAddressesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type CustomerMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type CustomerMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type CustomerOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<OrderSortKeys>;
};

/** A CustomerAccessToken represents the unique token required to make modifications to the customer object. */
export type CustomerAccessToken = {
  __typename?: 'CustomerAccessToken';
  /** The customer’s access token. */
  accessToken: Scalars['String']['output'];
  /** The date and time when the customer access token expires. */
  expiresAt: Scalars['DateTime']['output'];
};

/** The input fields required to create a customer access token. */
export type CustomerAccessTokenCreateInput = {
  /** The email associated to the customer. */
  email: Scalars['String']['input'];
  /** The login password to be used by the customer. */
  password: Scalars['String']['input'];
};

/** Return type for `customerAccessTokenCreate` mutation. */
export type CustomerAccessTokenCreatePayload = {
  __typename?: 'CustomerAccessTokenCreatePayload';
  /** The newly created customer access token object. */
  customerAccessToken?: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Return type for `customerAccessTokenCreateWithMultipass` mutation. */
export type CustomerAccessTokenCreateWithMultipassPayload = {
  __typename?: 'CustomerAccessTokenCreateWithMultipassPayload';
  /** An access token object associated with the customer. */
  customerAccessToken?: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
};

/** Return type for `customerAccessTokenDelete` mutation. */
export type CustomerAccessTokenDeletePayload = {
  __typename?: 'CustomerAccessTokenDeletePayload';
  /** The destroyed access token. */
  deletedAccessToken?: Maybe<Scalars['String']['output']>;
  /** ID of the destroyed customer access token. */
  deletedCustomerAccessTokenId?: Maybe<Scalars['String']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserError>;
};

/** Return type for `customerAccessTokenRenew` mutation. */
export type CustomerAccessTokenRenewPayload = {
  __typename?: 'CustomerAccessTokenRenewPayload';
  /** The renewed customer access token object. */
  customerAccessToken?: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserError>;
};

/** Return type for `customerActivateByUrl` mutation. */
export type CustomerActivateByUrlPayload = {
  __typename?: 'CustomerActivateByUrlPayload';
  /** The customer that was activated. */
  customer?: Maybe<Customer>;
  /** A new customer access token for the customer. */
  customerAccessToken?: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
};

/** The input fields to activate a customer. */
export type CustomerActivateInput = {
  /** The activation token required to activate the customer. */
  activationToken: Scalars['String']['input'];
  /** New password that will be set during activation. */
  password: Scalars['String']['input'];
};

/** Return type for `customerActivate` mutation. */
export type CustomerActivatePayload = {
  __typename?: 'CustomerActivatePayload';
  /** The customer object. */
  customer?: Maybe<Customer>;
  /** A newly created customer access token object for the customer. */
  customerAccessToken?: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Return type for `customerAddressCreate` mutation. */
export type CustomerAddressCreatePayload = {
  __typename?: 'CustomerAddressCreatePayload';
  /** The new customer address object. */
  customerAddress?: Maybe<MailingAddress>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Return type for `customerAddressDelete` mutation. */
export type CustomerAddressDeletePayload = {
  __typename?: 'CustomerAddressDeletePayload';
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /** ID of the deleted customer address. */
  deletedCustomerAddressId?: Maybe<Scalars['String']['output']>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Return type for `customerAddressUpdate` mutation. */
export type CustomerAddressUpdatePayload = {
  __typename?: 'CustomerAddressUpdatePayload';
  /** The customer’s updated mailing address. */
  customerAddress?: Maybe<MailingAddress>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** The input fields to create a new customer. */
export type CustomerCreateInput = {
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: InputMaybe<Scalars['Boolean']['input']>;
  /** The customer’s email. */
  email: Scalars['String']['input'];
  /** The customer’s first name. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The customer’s last name. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** The login password used by the customer. */
  password: Scalars['String']['input'];
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone?: InputMaybe<Scalars['String']['input']>;
};

/** Return type for `customerCreate` mutation. */
export type CustomerCreatePayload = {
  __typename?: 'CustomerCreatePayload';
  /** The created customer object. */
  customer?: Maybe<Customer>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Return type for `customerDefaultAddressUpdate` mutation. */
export type CustomerDefaultAddressUpdatePayload = {
  __typename?: 'CustomerDefaultAddressUpdatePayload';
  /** The updated customer object. */
  customer?: Maybe<Customer>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Possible error codes that can be returned by `CustomerUserError`. */
export type CustomerErrorCode =
  /** Customer already enabled. */
  | 'ALREADY_ENABLED'
  /** Input email contains an invalid domain name. */
  | 'BAD_DOMAIN'
  /** The input value is blank. */
  | 'BLANK'
  /** Input contains HTML tags. */
  | 'CONTAINS_HTML_TAGS'
  /** Input contains URL. */
  | 'CONTAINS_URL'
  /** Customer is disabled. */
  | 'CUSTOMER_DISABLED'
  /** The input value is invalid. */
  | 'INVALID'
  /** Multipass token is not valid. */
  | 'INVALID_MULTIPASS_REQUEST'
  /** Address does not exist. */
  | 'NOT_FOUND'
  /** Input password starts or ends with whitespace. */
  | 'PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE'
  /** The input value is already taken. */
  | 'TAKEN'
  /** Invalid activation token. */
  | 'TOKEN_INVALID'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** The input value is too short. */
  | 'TOO_SHORT'
  /** Unidentified customer. */
  | 'UNIDENTIFIED_CUSTOMER';

/** Return type for `customerRecover` mutation. */
export type CustomerRecoverPayload = {
  __typename?: 'CustomerRecoverPayload';
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Return type for `customerResetByUrl` mutation. */
export type CustomerResetByUrlPayload = {
  __typename?: 'CustomerResetByUrlPayload';
  /** The customer object which was reset. */
  customer?: Maybe<Customer>;
  /** A newly created customer access token object for the customer. */
  customerAccessToken?: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** The input fields to reset a customer's password. */
export type CustomerResetInput = {
  /** New password that will be set as part of the reset password process. */
  password: Scalars['String']['input'];
  /** The reset token required to reset the customer’s password. */
  resetToken: Scalars['String']['input'];
};

/** Return type for `customerReset` mutation. */
export type CustomerResetPayload = {
  __typename?: 'CustomerResetPayload';
  /** The customer object which was reset. */
  customer?: Maybe<Customer>;
  /** A newly created customer access token object for the customer. */
  customerAccessToken?: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** The input fields to update the Customer information. */
export type CustomerUpdateInput = {
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: InputMaybe<Scalars['Boolean']['input']>;
  /** The customer’s email. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The customer’s first name. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The customer’s last name. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** The login password used by the customer. */
  password?: InputMaybe<Scalars['String']['input']>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_. To remove the phone number, specify `null`.
   *
   */
  phone?: InputMaybe<Scalars['String']['input']>;
};

/** Return type for `customerUpdate` mutation. */
export type CustomerUpdatePayload = {
  __typename?: 'CustomerUpdatePayload';
  /** The updated customer object. */
  customer?: Maybe<Customer>;
  /**
   * The newly created customer access token. If the customer's password is updated, all previous access tokens
   * (including the one used to perform this mutation) become invalid, and a new token is generated.
   *
   */
  customerAccessToken?: Maybe<CustomerAccessToken>;
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<CustomerUserError>;
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>;
};

/** Represents an error that happens during execution of a customer mutation. */
export type CustomerUserError = DisplayableError & {
  __typename?: 'CustomerUserError';
  /** The error code. */
  code?: Maybe<CustomerErrorCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** A delivery address of the buyer that is interacting with the cart. */
export type DeliveryAddress = MailingAddress;

/**
 * The input fields for delivery address preferences.
 *
 */
export type DeliveryAddressInput = {
  /**
   * The ID of a customer address that is associated with the buyer that is interacting with the cart.
   *
   */
  customerAddressId?: InputMaybe<Scalars['ID']['input']>;
  /** A delivery address preference of a buyer that is interacting with the cart. */
  deliveryAddress?: InputMaybe<MailingAddressInput>;
  /** Defines what kind of address validation is requested. */
  deliveryAddressValidationStrategy?: InputMaybe<DeliveryAddressValidationStrategy>;
  /**
   * Whether the given delivery address is considered to be a one-time use address. One-time use addresses do not
   * get persisted to the buyer's personal addresses when checking out.
   *
   */
  oneTimeUse?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * Defines the types of available validation strategies for delivery addresses.
 *
 */
export type DeliveryAddressValidationStrategy =
  /** Only the country code is validated. */
  | 'COUNTRY_CODE_ONLY'
  /**
   * Strict validation is performed, i.e. all fields in the address are validated
   * according to Shopify's checkout rules. If the address fails validation, the cart will not be updated.
   *
   */
  | 'STRICT';

/** List of different delivery method types. */
export type DeliveryMethodType =
  /** Local Delivery. */
  | 'LOCAL'
  /** None. */
  | 'NONE'
  /** Shipping to a Pickup Point. */
  | 'PICKUP_POINT'
  /** Local Pickup. */
  | 'PICK_UP'
  /** Retail. */
  | 'RETAIL'
  /** Shipping. */
  | 'SHIPPING';

/** Digital wallet, such as Apple Pay, which can be used for accelerated checkouts. */
export type DigitalWallet =
  /** Android Pay. */
  | 'ANDROID_PAY'
  /** Apple Pay. */
  | 'APPLE_PAY'
  /** Google Pay. */
  | 'GOOGLE_PAY'
  /** Shopify Pay. */
  | 'SHOPIFY_PAY';

/**
 * An amount discounting the line that has been allocated by a discount.
 *
 */
export type DiscountAllocation = {
  __typename?: 'DiscountAllocation';
  /** Amount of discount allocated. */
  allocatedAmount: MoneyV2;
  /** The discount this allocated amount originated from. */
  discountApplication: DiscountApplication;
};

/**
 * Discount applications capture the intentions of a discount source at
 * the time of application.
 *
 */
export type DiscountApplication = {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The value of the discount application. */
  value: PricingValue;
};

/** The method by which the discount's value is allocated onto its entitled lines. */
export type DiscountApplicationAllocationMethod =
  /** The value is spread across all entitled lines. */
  | 'ACROSS'
  /** The value is applied onto every entitled line. */
  | 'EACH'
  /** The value is specifically applied onto a particular line. */
  | 'ONE';

/**
 * An auto-generated type for paginating through multiple DiscountApplications.
 *
 */
export type DiscountApplicationConnection = {
  __typename?: 'DiscountApplicationConnection';
  /** A list of edges. */
  edges: Array<DiscountApplicationEdge>;
  /** A list of the nodes contained in DiscountApplicationEdge. */
  nodes: Array<DiscountApplication>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one DiscountApplication and a cursor during pagination.
 *
 */
export type DiscountApplicationEdge = {
  __typename?: 'DiscountApplicationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of DiscountApplicationEdge. */
  node: DiscountApplication;
};

/**
 * The lines on the order to which the discount is applied, of the type defined by
 * the discount application's `targetType`. For example, the value `ENTITLED`, combined with a `targetType` of
 * `LINE_ITEM`, applies the discount on all line items that are entitled to the discount.
 * The value `ALL`, combined with a `targetType` of `SHIPPING_LINE`, applies the discount on all shipping lines.
 *
 */
export type DiscountApplicationTargetSelection =
  /** The discount is allocated onto all the lines. */
  | 'ALL'
  /** The discount is allocated onto only the lines that it's entitled for. */
  | 'ENTITLED'
  /** The discount is allocated onto explicitly chosen lines. */
  | 'EXPLICIT';

/**
 * The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards.
 *
 */
export type DiscountApplicationTargetType =
  /** The discount applies onto line items. */
  | 'LINE_ITEM'
  /** The discount applies onto shipping lines. */
  | 'SHIPPING_LINE';

/**
 * Discount code applications capture the intentions of a discount code at
 * the time that it is applied.
 *
 */
export type DiscountCodeApplication = DiscountApplication & {
  __typename?: 'DiscountCodeApplication';
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** Specifies whether the discount code was applied successfully. */
  applicable: Scalars['Boolean']['output'];
  /** The string identifying the discount code that was used at the time of application. */
  code: Scalars['String']['output'];
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The value of the discount application. */
  value: PricingValue;
};

/** Represents an error in the input of a mutation. */
export type DisplayableError = {
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Represents a web address. */
export type Domain = {
  __typename?: 'Domain';
  /** The host name of the domain (eg: `example.com`). */
  host: Scalars['String']['output'];
  /** Whether SSL is enabled or not. */
  sslEnabled: Scalars['Boolean']['output'];
  /** The URL of the domain (eg: `https://example.com`). */
  url: Scalars['URL']['output'];
};

/** Represents a video hosted outside of Shopify. */
export type ExternalVideo = Media &
  Node & {
    __typename?: 'ExternalVideo';
    /** A word or phrase to share the nature or contents of a media. */
    alt?: Maybe<Scalars['String']['output']>;
    /** The embed URL of the video for the respective host. */
    embedUrl: Scalars['URL']['output'];
    /**
     * The URL.
     * @deprecated Use `originUrl` instead.
     */
    embeddedUrl: Scalars['URL']['output'];
    /** The host of the external video. */
    host: MediaHost;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The media content type. */
    mediaContentType: MediaContentType;
    /** The origin URL of the video on the respective host. */
    originUrl: Scalars['URL']['output'];
    /** The presentation for a media. */
    presentation?: Maybe<MediaPresentation>;
    /** The preview image for the media. */
    previewImage?: Maybe<Image>;
  };

/** A filter that is supported on the parent field. */
export type Filter = {
  __typename?: 'Filter';
  /** A unique identifier. */
  id: Scalars['String']['output'];
  /** A human-friendly string for this filter. */
  label: Scalars['String']['output'];
  /**
   * Describes how to present the filter values.
   * Returns a value only for filters of type `LIST`. Returns null for other types.
   *
   */
  presentation?: Maybe<FilterPresentation>;
  /** An enumeration that denotes the type of data this filter represents. */
  type: FilterType;
  /** The list of values for this filter. */
  values: Array<FilterValue>;
};

/**
 * Defines how to present the filter values, specifies the presentation of the filter.
 *
 */
export type FilterPresentation =
  /** Image presentation, filter values display an image. */
  | 'IMAGE'
  /** Swatch presentation, filter values display color or image patterns. */
  | 'SWATCH'
  /** Text presentation, no additional visual display for filter values. */
  | 'TEXT';

/**
 * The type of data that the filter group represents.
 *
 * For more information, refer to [Filter products in a collection with the Storefront API]
 * (https://shopify.dev/custom-storefronts/products-collections/filter-products).
 *
 */
export type FilterType =
  /** A boolean value. */
  | 'BOOLEAN'
  /** A list of selectable values. */
  | 'LIST'
  /** A range of prices. */
  | 'PRICE_RANGE';

/** A selectable value within a filter. */
export type FilterValue = {
  __typename?: 'FilterValue';
  /** The number of results that match this filter value. */
  count: Scalars['Int']['output'];
  /** A unique identifier. */
  id: Scalars['String']['output'];
  /** The visual representation when the filter's presentation is `IMAGE`. */
  image?: Maybe<MediaImage>;
  /**
   * An input object that can be used to filter by this value on the parent field.
   *
   * The value is provided as a helper for building dynamic filtering UI. For
   * example, if you have a list of selected `FilterValue` objects, you can combine
   * their respective `input` values to use in a subsequent query.
   *
   */
  input: Scalars['JSON']['output'];
  /** A human-friendly string for this filter value. */
  label: Scalars['String']['output'];
  /** The visual representation when the filter's presentation is `SWATCH`. */
  swatch?: Maybe<Swatch>;
};

/** Represents a single fulfillment in an order. */
export type Fulfillment = {
  __typename?: 'Fulfillment';
  /** List of the fulfillment's line items. */
  fulfillmentLineItems: FulfillmentLineItemConnection;
  /** The name of the tracking company. */
  trackingCompany?: Maybe<Scalars['String']['output']>;
  /**
   * Tracking information associated with the fulfillment,
   * such as the tracking number and tracking URL.
   *
   */
  trackingInfo: Array<FulfillmentTrackingInfo>;
};

/** Represents a single fulfillment in an order. */
export type FulfillmentFulfillmentLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents a single fulfillment in an order. */
export type FulfillmentTrackingInfoArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents a single line item in a fulfillment. There is at most one fulfillment line item for each order line item. */
export type FulfillmentLineItem = {
  __typename?: 'FulfillmentLineItem';
  /** The associated order's line item. */
  lineItem: OrderLineItem;
  /** The amount fulfilled in this fulfillment. */
  quantity: Scalars['Int']['output'];
};

/**
 * An auto-generated type for paginating through multiple FulfillmentLineItems.
 *
 */
export type FulfillmentLineItemConnection = {
  __typename?: 'FulfillmentLineItemConnection';
  /** A list of edges. */
  edges: Array<FulfillmentLineItemEdge>;
  /** A list of the nodes contained in FulfillmentLineItemEdge. */
  nodes: Array<FulfillmentLineItem>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one FulfillmentLineItem and a cursor during pagination.
 *
 */
export type FulfillmentLineItemEdge = {
  __typename?: 'FulfillmentLineItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of FulfillmentLineItemEdge. */
  node: FulfillmentLineItem;
};

/** Tracking information associated with the fulfillment. */
export type FulfillmentTrackingInfo = {
  __typename?: 'FulfillmentTrackingInfo';
  /** The tracking number of the fulfillment. */
  number?: Maybe<Scalars['String']['output']>;
  /** The URL to track the fulfillment. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** The generic file resource lets you manage files in a merchant’s store. Generic files include any file that doesn’t fit into a designated type such as image or video. Example: PDF, JSON. */
export type GenericFile = Node & {
  __typename?: 'GenericFile';
  /** A word or phrase to indicate the contents of a file. */
  alt?: Maybe<Scalars['String']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The MIME type of the file. */
  mimeType?: Maybe<Scalars['String']['output']>;
  /** The size of the original file in bytes. */
  originalFileSize?: Maybe<Scalars['Int']['output']>;
  /** The preview image for the file. */
  previewImage?: Maybe<Image>;
  /** The URL of the file. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** The input fields used to specify a geographical location. */
export type GeoCoordinateInput = {
  /** The coordinate's latitude value. */
  latitude: Scalars['Float']['input'];
  /** The coordinate's longitude value. */
  longitude: Scalars['Float']['input'];
};

/** Represents information about the metafields associated to the specified resource. */
export type HasMetafields = {
  /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
  metafield?: Maybe<Metafield>;
  /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
  metafields: Array<Maybe<Metafield>>;
};

/** Represents information about the metafields associated to the specified resource. */
export type HasMetafieldsMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** Represents information about the metafields associated to the specified resource. */
export type HasMetafieldsMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** The input fields to identify a metafield on an owner resource by namespace and key. */
export type HasMetafieldsIdentifier = {
  /** The identifier for the metafield. */
  key: Scalars['String']['input'];
  /** The container the metafield belongs to. If omitted, the app-reserved namespace will be used. */
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an image resource. */
export type Image = {
  __typename?: 'Image';
  /** A word or phrase to share the nature or contents of an image. */
  altText?: Maybe<Scalars['String']['output']>;
  /** The original height of the image in pixels. Returns `null` if the image isn't hosted by Shopify. */
  height?: Maybe<Scalars['Int']['output']>;
  /** A unique ID for the image. */
  id?: Maybe<Scalars['ID']['output']>;
  /**
   * The location of the original image as a URL.
   *
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   *
   * @deprecated Use `url` instead.
   */
  originalSrc: Scalars['URL']['output'];
  /**
   * The location of the image as a URL.
   * @deprecated Use `url` instead.
   */
  src: Scalars['URL']['output'];
  /**
   * The location of the transformed image as a URL.
   *
   * All transformation arguments are considered "best-effort". If they can be applied to an image, they will be.
   * Otherwise any transformations which an image type doesn't support will be ignored.
   *
   * @deprecated Use `url(transform:)` instead
   */
  transformedSrc: Scalars['URL']['output'];
  /**
   * The location of the image as a URL.
   *
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   *
   * All transformation options are considered "best-effort". Any transformation that the original image type doesn't support will be ignored.
   *
   * If you need multiple variations of the same image, then you can use [GraphQL aliases](https://graphql.org/learn/queries/#aliases).
   *
   */
  url: Scalars['URL']['output'];
  /** The original width of the image in pixels. Returns `null` if the image isn't hosted by Shopify. */
  width?: Maybe<Scalars['Int']['output']>;
};

/** Represents an image resource. */
export type ImageTransformedSrcArgs = {
  crop?: InputMaybe<CropRegion>;
  maxHeight?: InputMaybe<Scalars['Int']['input']>;
  maxWidth?: InputMaybe<Scalars['Int']['input']>;
  preferredContentType?: InputMaybe<ImageContentType>;
  scale?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents an image resource. */
export type ImageUrlArgs = {
  transform?: InputMaybe<ImageTransformInput>;
};

/**
 * An auto-generated type for paginating through multiple Images.
 *
 */
export type ImageConnection = {
  __typename?: 'ImageConnection';
  /** A list of edges. */
  edges: Array<ImageEdge>;
  /** A list of the nodes contained in ImageEdge. */
  nodes: Array<Image>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** List of supported image content types. */
export type ImageContentType =
  /** A JPG image. */
  | 'JPG'
  /** A PNG image. */
  | 'PNG'
  /** A WEBP image. */
  | 'WEBP';

/**
 * An auto-generated type which holds one Image and a cursor during pagination.
 *
 */
export type ImageEdge = {
  __typename?: 'ImageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of ImageEdge. */
  node: Image;
};

/**
 * The available options for transforming an image.
 *
 * All transformation options are considered best effort. Any transformation that
 * the original image type doesn't support will be ignored.
 *
 */
export type ImageTransformInput = {
  /**
   * The region of the image to remain after cropping.
   * Must be used in conjunction with the `maxWidth` and/or `maxHeight` fields,
   * where the `maxWidth` and `maxHeight` aren't equal.
   * The `crop` argument should coincide with the smaller value. A smaller `maxWidth` indicates a `LEFT` or `RIGHT` crop, while
   * a smaller `maxHeight` indicates a `TOP` or `BOTTOM` crop. For example, `{
   * maxWidth: 5, maxHeight: 10, crop: LEFT }` will result
   * in an image with a width of 5 and height of 10, where the right side of the image is removed.
   *
   */
  crop?: InputMaybe<CropRegion>;
  /**
   * Image height in pixels between 1 and 5760.
   *
   */
  maxHeight?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Image width in pixels between 1 and 5760.
   *
   */
  maxWidth?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Convert the source image into the preferred content type.
   * Supported conversions: `.svg` to `.png`, any file type to `.jpg`, and any file type to `.webp`.
   *
   */
  preferredContentType?: InputMaybe<ImageContentType>;
  /**
   * Image size multiplier for high-resolution retina displays. Must be within 1..3.
   *
   */
  scale?: InputMaybe<Scalars['Int']['input']>;
};

/** Provide details about the contexts influenced by the @inContext directive on a field. */
export type InContextAnnotation = {
  __typename?: 'InContextAnnotation';
  description: Scalars['String']['output'];
  type: InContextAnnotationType;
};

/** This gives information about the type of context that impacts a field. For example, for a query with @inContext(language: "EN"), the type would point to the name: LanguageCode and kind: ENUM. */
export type InContextAnnotationType = {
  __typename?: 'InContextAnnotationType';
  kind: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

/** A language. */
export type Language = {
  __typename?: 'Language';
  /** The name of the language in the language itself. If the language uses capitalization, it is capitalized for a mid-sentence position. */
  endonymName: Scalars['String']['output'];
  /** The ISO code. */
  isoCode: LanguageCode;
  /** The name of the language in the current language. */
  name: Scalars['String']['output'];
};

/** Language codes supported by Shopify. */
export type LanguageCode =
  /** Afrikaans. */
  | 'AF'
  /** Akan. */
  | 'AK'
  /** Amharic. */
  | 'AM'
  /** Arabic. */
  | 'AR'
  /** Assamese. */
  | 'AS'
  /** Azerbaijani. */
  | 'AZ'
  /** Belarusian. */
  | 'BE'
  /** Bulgarian. */
  | 'BG'
  /** Bambara. */
  | 'BM'
  /** Bangla. */
  | 'BN'
  /** Tibetan. */
  | 'BO'
  /** Breton. */
  | 'BR'
  /** Bosnian. */
  | 'BS'
  /** Catalan. */
  | 'CA'
  /** Chechen. */
  | 'CE'
  /** Central Kurdish. */
  | 'CKB'
  /** Czech. */
  | 'CS'
  /** Church Slavic. */
  | 'CU'
  /** Welsh. */
  | 'CY'
  /** Danish. */
  | 'DA'
  /** German. */
  | 'DE'
  /** Dzongkha. */
  | 'DZ'
  /** Ewe. */
  | 'EE'
  /** Greek. */
  | 'EL'
  /** English. */
  | 'EN'
  /** Esperanto. */
  | 'EO'
  /** Spanish. */
  | 'ES'
  /** Estonian. */
  | 'ET'
  /** Basque. */
  | 'EU'
  /** Persian. */
  | 'FA'
  /** Fulah. */
  | 'FF'
  /** Finnish. */
  | 'FI'
  /** Filipino. */
  | 'FIL'
  /** Faroese. */
  | 'FO'
  /** French. */
  | 'FR'
  /** Western Frisian. */
  | 'FY'
  /** Irish. */
  | 'GA'
  /** Scottish Gaelic. */
  | 'GD'
  /** Galician. */
  | 'GL'
  /** Gujarati. */
  | 'GU'
  /** Manx. */
  | 'GV'
  /** Hausa. */
  | 'HA'
  /** Hebrew. */
  | 'HE'
  /** Hindi. */
  | 'HI'
  /** Croatian. */
  | 'HR'
  /** Hungarian. */
  | 'HU'
  /** Armenian. */
  | 'HY'
  /** Interlingua. */
  | 'IA'
  /** Indonesian. */
  | 'ID'
  /** Igbo. */
  | 'IG'
  /** Sichuan Yi. */
  | 'II'
  /** Icelandic. */
  | 'IS'
  /** Italian. */
  | 'IT'
  /** Japanese. */
  | 'JA'
  /** Javanese. */
  | 'JV'
  /** Georgian. */
  | 'KA'
  /** Kikuyu. */
  | 'KI'
  /** Kazakh. */
  | 'KK'
  /** Kalaallisut. */
  | 'KL'
  /** Khmer. */
  | 'KM'
  /** Kannada. */
  | 'KN'
  /** Korean. */
  | 'KO'
  /** Kashmiri. */
  | 'KS'
  /** Kurdish. */
  | 'KU'
  /** Cornish. */
  | 'KW'
  /** Kyrgyz. */
  | 'KY'
  /** Latin. */
  | 'LA'
  /** Luxembourgish. */
  | 'LB'
  /** Ganda. */
  | 'LG'
  /** Lingala. */
  | 'LN'
  /** Lao. */
  | 'LO'
  /** Lithuanian. */
  | 'LT'
  /** Luba-Katanga. */
  | 'LU'
  /** Latvian. */
  | 'LV'
  /** Malagasy. */
  | 'MG'
  /** Māori. */
  | 'MI'
  /** Macedonian. */
  | 'MK'
  /** Malayalam. */
  | 'ML'
  /** Mongolian. */
  | 'MN'
  /** Moldavian. */
  | 'MO'
  /** Marathi. */
  | 'MR'
  /** Malay. */
  | 'MS'
  /** Maltese. */
  | 'MT'
  /** Burmese. */
  | 'MY'
  /** Norwegian (Bokmål). */
  | 'NB'
  /** North Ndebele. */
  | 'ND'
  /** Nepali. */
  | 'NE'
  /** Dutch. */
  | 'NL'
  /** Norwegian Nynorsk. */
  | 'NN'
  /** Norwegian. */
  | 'NO'
  /** Oromo. */
  | 'OM'
  /** Odia. */
  | 'OR'
  /** Ossetic. */
  | 'OS'
  /** Punjabi. */
  | 'PA'
  /** Polish. */
  | 'PL'
  /** Pashto. */
  | 'PS'
  /** Portuguese. */
  | 'PT'
  /** Portuguese (Brazil). */
  | 'PT_BR'
  /** Portuguese (Portugal). */
  | 'PT_PT'
  /** Quechua. */
  | 'QU'
  /** Romansh. */
  | 'RM'
  /** Rundi. */
  | 'RN'
  /** Romanian. */
  | 'RO'
  /** Russian. */
  | 'RU'
  /** Kinyarwanda. */
  | 'RW'
  /** Sanskrit. */
  | 'SA'
  /** Sardinian. */
  | 'SC'
  /** Sindhi. */
  | 'SD'
  /** Northern Sami. */
  | 'SE'
  /** Sango. */
  | 'SG'
  /** Serbo-Croatian. */
  | 'SH'
  /** Sinhala. */
  | 'SI'
  /** Slovak. */
  | 'SK'
  /** Slovenian. */
  | 'SL'
  /** Shona. */
  | 'SN'
  /** Somali. */
  | 'SO'
  /** Albanian. */
  | 'SQ'
  /** Serbian. */
  | 'SR'
  /** Sundanese. */
  | 'SU'
  /** Swedish. */
  | 'SV'
  /** Swahili. */
  | 'SW'
  /** Tamil. */
  | 'TA'
  /** Telugu. */
  | 'TE'
  /** Tajik. */
  | 'TG'
  /** Thai. */
  | 'TH'
  /** Tigrinya. */
  | 'TI'
  /** Turkmen. */
  | 'TK'
  /** Tongan. */
  | 'TO'
  /** Turkish. */
  | 'TR'
  /** Tatar. */
  | 'TT'
  /** Uyghur. */
  | 'UG'
  /** Ukrainian. */
  | 'UK'
  /** Urdu. */
  | 'UR'
  /** Uzbek. */
  | 'UZ'
  /** Vietnamese. */
  | 'VI'
  /** Volapük. */
  | 'VO'
  /** Wolof. */
  | 'WO'
  /** Xhosa. */
  | 'XH'
  /** Yiddish. */
  | 'YI'
  /** Yoruba. */
  | 'YO'
  /** Chinese. */
  | 'ZH'
  /** Chinese (Simplified). */
  | 'ZH_CN'
  /** Chinese (Traditional). */
  | 'ZH_TW'
  /** Zulu. */
  | 'ZU';

/** Information about the localized experiences configured for the shop. */
export type Localization = {
  __typename?: 'Localization';
  /** The list of countries with enabled localized experiences. */
  availableCountries: Array<Country>;
  /** The list of languages available for the active country. */
  availableLanguages: Array<Language>;
  /** The country of the active localized experience. Use the `@inContext` directive to change this value. */
  country: Country;
  /** The language of the active localized experience. Use the `@inContext` directive to change this value. */
  language: Language;
  /** The market including the country of the active localized experience. Use the `@inContext` directive to change this value. */
  market: Market;
};

/** Represents a location where product inventory is held. */
export type Location = HasMetafields &
  Node & {
    __typename?: 'Location';
    /** The address of the location. */
    address: LocationAddress;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield?: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The name of the location. */
    name: Scalars['String']['output'];
  };

/** Represents a location where product inventory is held. */
export type LocationMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a location where product inventory is held. */
export type LocationMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/**
 * Represents the address of a location.
 *
 */
export type LocationAddress = {
  __typename?: 'LocationAddress';
  /** The first line of the address for the location. */
  address1?: Maybe<Scalars['String']['output']>;
  /** The second line of the address for the location. */
  address2?: Maybe<Scalars['String']['output']>;
  /** The city of the location. */
  city?: Maybe<Scalars['String']['output']>;
  /** The country of the location. */
  country?: Maybe<Scalars['String']['output']>;
  /** The country code of the location. */
  countryCode?: Maybe<Scalars['String']['output']>;
  /** A formatted version of the address for the location. */
  formatted: Array<Scalars['String']['output']>;
  /** The latitude coordinates of the location. */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** The longitude coordinates of the location. */
  longitude?: Maybe<Scalars['Float']['output']>;
  /** The phone number of the location. */
  phone?: Maybe<Scalars['String']['output']>;
  /** The province of the location. */
  province?: Maybe<Scalars['String']['output']>;
  /**
   * The code for the province, state, or district of the address of the location.
   *
   */
  provinceCode?: Maybe<Scalars['String']['output']>;
  /** The ZIP code of the location. */
  zip?: Maybe<Scalars['String']['output']>;
};

/**
 * An auto-generated type for paginating through multiple Locations.
 *
 */
export type LocationConnection = {
  __typename?: 'LocationConnection';
  /** A list of edges. */
  edges: Array<LocationEdge>;
  /** A list of the nodes contained in LocationEdge. */
  nodes: Array<Location>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Location and a cursor during pagination.
 *
 */
export type LocationEdge = {
  __typename?: 'LocationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of LocationEdge. */
  node: Location;
};

/** The set of valid sort keys for the Location query. */
export type LocationSortKeys =
  /** Sort by the `city` value. */
  | 'CITY'
  /** Sort by the `distance` value. */
  | 'DISTANCE'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `name` value. */
  | 'NAME';

/** Represents a mailing address for customers and shipping. */
export type MailingAddress = Node & {
  __typename?: 'MailingAddress';
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']['output']>;
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   *
   */
  address2?: Maybe<Scalars['String']['output']>;
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']['output']>;
  /** The name of the customer's company or organization. */
  company?: Maybe<Scalars['String']['output']>;
  /** The name of the country. */
  country?: Maybe<Scalars['String']['output']>;
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   *
   * @deprecated Use `countryCodeV2` instead.
   */
  countryCode?: Maybe<Scalars['String']['output']>;
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   *
   */
  countryCodeV2?: Maybe<CountryCode>;
  /** The first name of the customer. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** A formatted version of the address, customized by the provided arguments. */
  formatted: Array<Scalars['String']['output']>;
  /** A comma-separated list of the values for city, province, and country. */
  formattedArea?: Maybe<Scalars['String']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The last name of the customer. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** The latitude coordinate of the customer address. */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** The longitude coordinate of the customer address. */
  longitude?: Maybe<Scalars['Float']['output']>;
  /** The full name of the customer, based on firstName and lastName. */
  name?: Maybe<Scalars['String']['output']>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone?: Maybe<Scalars['String']['output']>;
  /** The region of the address, such as the province, state, or district. */
  province?: Maybe<Scalars['String']['output']>;
  /**
   * The alphanumeric code for the region.
   *
   * For example, ON.
   *
   */
  provinceCode?: Maybe<Scalars['String']['output']>;
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars['String']['output']>;
};

/** Represents a mailing address for customers and shipping. */
export type MailingAddressFormattedArgs = {
  withCompany?: InputMaybe<Scalars['Boolean']['input']>;
  withName?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * An auto-generated type for paginating through multiple MailingAddresses.
 *
 */
export type MailingAddressConnection = {
  __typename?: 'MailingAddressConnection';
  /** A list of edges. */
  edges: Array<MailingAddressEdge>;
  /** A list of the nodes contained in MailingAddressEdge. */
  nodes: Array<MailingAddress>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one MailingAddress and a cursor during pagination.
 *
 */
export type MailingAddressEdge = {
  __typename?: 'MailingAddressEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of MailingAddressEdge. */
  node: MailingAddress;
};

/** The input fields to create or update a mailing address. */
export type MailingAddressInput = {
  /**
   * The first line of the address. Typically the street address or PO Box number.
   *
   */
  address1?: InputMaybe<Scalars['String']['input']>;
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   *
   */
  address2?: InputMaybe<Scalars['String']['input']>;
  /**
   * The name of the city, district, village, or town.
   *
   */
  city?: InputMaybe<Scalars['String']['input']>;
  /**
   * The name of the customer's company or organization.
   *
   */
  company?: InputMaybe<Scalars['String']['input']>;
  /** The name of the country. */
  country?: InputMaybe<Scalars['String']['input']>;
  /** The first name of the customer. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The last name of the customer. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** The region of the address, such as the province, state, or district. */
  province?: InputMaybe<Scalars['String']['input']>;
  /** The zip or postal code of the address. */
  zip?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Manual discount applications capture the intentions of a discount that was manually created.
 *
 */
export type ManualDiscountApplication = DiscountApplication & {
  __typename?: 'ManualDiscountApplication';
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** The description of the application. */
  description?: Maybe<Scalars['String']['output']>;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the application. */
  title: Scalars['String']['output'];
  /** The value of the discount application. */
  value: PricingValue;
};

/** A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [the Shopify Markets conceptual overview](/docs/apps/markets). */
export type Market = HasMetafields &
  Node & {
    __typename?: 'Market';
    /**
     * A human-readable unique string for the market automatically generated from its title.
     *
     */
    handle: Scalars['String']['output'];
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield?: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
  };

/** A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [the Shopify Markets conceptual overview](/docs/apps/markets). */
export type MarketMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [the Shopify Markets conceptual overview](/docs/apps/markets). */
export type MarketMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** Represents a media interface. */
export type Media = {
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The media content type. */
  mediaContentType: MediaContentType;
  /** The presentation for a media. */
  presentation?: Maybe<MediaPresentation>;
  /** The preview image for the media. */
  previewImage?: Maybe<Image>;
};

/**
 * An auto-generated type for paginating through multiple Media.
 *
 */
export type MediaConnection = {
  __typename?: 'MediaConnection';
  /** A list of edges. */
  edges: Array<MediaEdge>;
  /** A list of the nodes contained in MediaEdge. */
  nodes: Array<Media>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** The possible content types for a media object. */
export type MediaContentType =
  /** An externally hosted video. */
  | 'EXTERNAL_VIDEO'
  /** A Shopify hosted image. */
  | 'IMAGE'
  /** A 3d model. */
  | 'MODEL_3D'
  /** A Shopify hosted video. */
  | 'VIDEO';

/**
 * An auto-generated type which holds one Media and a cursor during pagination.
 *
 */
export type MediaEdge = {
  __typename?: 'MediaEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of MediaEdge. */
  node: Media;
};

/** Host for a Media Resource. */
export type MediaHost =
  /** Host for Vimeo embedded videos. */
  | 'VIMEO'
  /** Host for YouTube embedded videos. */
  | 'YOUTUBE';

/** Represents a Shopify hosted image. */
export type MediaImage = Media &
  Node & {
    __typename?: 'MediaImage';
    /** A word or phrase to share the nature or contents of a media. */
    alt?: Maybe<Scalars['String']['output']>;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The image for the media. */
    image?: Maybe<Image>;
    /** The media content type. */
    mediaContentType: MediaContentType;
    /** The presentation for a media. */
    presentation?: Maybe<MediaPresentation>;
    /** The preview image for the media. */
    previewImage?: Maybe<Image>;
  };

/** A media presentation. */
export type MediaPresentation = Node & {
  __typename?: 'MediaPresentation';
  /** A JSON object representing a presentation view. */
  asJson?: Maybe<Scalars['JSON']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
};

/** A media presentation. */
export type MediaPresentationAsJsonArgs = {
  format: MediaPresentationFormat;
};

/** The possible formats for a media presentation. */
export type MediaPresentationFormat =
  /** A media image presentation. */
  | 'IMAGE'
  /** A model viewer presentation. */
  | 'MODEL_VIEWER';

/**
 * A [navigation menu](https://help.shopify.com/manual/online-store/menus-and-links) representing a hierarchy
 * of hyperlinks (items).
 *
 */
export type Menu = Node & {
  __typename?: 'Menu';
  /** The menu's handle. */
  handle: Scalars['String']['output'];
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The menu's child items. */
  items: Array<MenuItem>;
  /** The count of items on the menu. */
  itemsCount: Scalars['Int']['output'];
  /** The menu's title. */
  title: Scalars['String']['output'];
};

/** A menu item within a parent menu. */
export type MenuItem = Node & {
  __typename?: 'MenuItem';
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The menu item's child items. */
  items: Array<MenuItem>;
  /** The linked resource. */
  resource?: Maybe<MenuItemResource>;
  /** The ID of the linked resource. */
  resourceId?: Maybe<Scalars['ID']['output']>;
  /** The menu item's tags to filter a collection. */
  tags: Array<Scalars['String']['output']>;
  /** The menu item's title. */
  title: Scalars['String']['output'];
  /** The menu item's type. */
  type: MenuItemType;
  /** The menu item's URL. */
  url?: Maybe<Scalars['URL']['output']>;
};

/**
 * The list of possible resources a `MenuItem` can reference.
 *
 */
export type MenuItemResource =
  | Article
  | Blog
  | Collection
  | Metaobject
  | Page
  | Product
  | ShopPolicy;

/** A menu item type. */
export type MenuItemType =
  /** An article link. */
  | 'ARTICLE'
  /** A blog link. */
  | 'BLOG'
  /** A catalog link. */
  | 'CATALOG'
  /** A collection link. */
  | 'COLLECTION'
  /** A collection link. */
  | 'COLLECTIONS'
  /** A customer account page link. */
  | 'CUSTOMER_ACCOUNT_PAGE'
  /** A frontpage link. */
  | 'FRONTPAGE'
  /** An http link. */
  | 'HTTP'
  /** A metaobject page link. */
  | 'METAOBJECT'
  /** A page link. */
  | 'PAGE'
  /** A product link. */
  | 'PRODUCT'
  /** A search link. */
  | 'SEARCH'
  /** A shop policy link. */
  | 'SHOP_POLICY';

/** The merchandise to be purchased at checkout. */
export type Merchandise = ProductVariant;

/**
 * Metafields represent custom metadata attached to a resource. Metafields can be sorted into namespaces and are
 * comprised of keys, values, and value types.
 *
 */
export type Metafield = Node & {
  __typename?: 'Metafield';
  /** The date and time when the storefront metafield was created. */
  createdAt: Scalars['DateTime']['output'];
  /** The description of a metafield. */
  description?: Maybe<Scalars['String']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The unique identifier for the metafield within its namespace. */
  key: Scalars['String']['output'];
  /** The container for a group of metafields that the metafield is associated with. */
  namespace: Scalars['String']['output'];
  /** The type of resource that the metafield is attached to. */
  parentResource: MetafieldParentResource;
  /** Returns a reference object if the metafield's type is a resource reference. */
  reference?: Maybe<MetafieldReference>;
  /** A list of reference objects if the metafield's type is a resource reference list. */
  references?: Maybe<MetafieldReferenceConnection>;
  /**
   * The type name of the metafield.
   * Refer to the list of [supported types](https://shopify.dev/apps/metafields/definitions/types).
   *
   */
  type: Scalars['String']['output'];
  /** The date and time when the metafield was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  /** The data stored in the metafield. Always stored as a string, regardless of the metafield's type. */
  value: Scalars['String']['output'];
};

/**
 * Metafields represent custom metadata attached to a resource. Metafields can be sorted into namespaces and are
 * comprised of keys, values, and value types.
 *
 */
export type MetafieldReferencesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Possible error codes that can be returned by `MetafieldDeleteUserError`. */
export type MetafieldDeleteErrorCode =
  /** The owner ID is invalid. */
  | 'INVALID_OWNER'
  /** Metafield not found. */
  | 'METAFIELD_DOES_NOT_EXIST';

/** An error that occurs during the execution of cart metafield deletion. */
export type MetafieldDeleteUserError = DisplayableError & {
  __typename?: 'MetafieldDeleteUserError';
  /** The error code. */
  code?: Maybe<MetafieldDeleteErrorCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/**
 * A filter used to view a subset of products in a collection matching a specific metafield value.
 *
 * Only the following metafield types are currently supported:
 * - `number_integer`
 * - `number_decimal`
 * - `single_line_text_field`
 * - `boolean` as of 2022-04.
 *
 */
export type MetafieldFilter = {
  /** The key of the metafield to filter on. */
  key: Scalars['String']['input'];
  /** The namespace of the metafield to filter on. */
  namespace: Scalars['String']['input'];
  /** The value of the metafield. */
  value: Scalars['String']['input'];
};

/** A resource that the metafield belongs to. */
export type MetafieldParentResource =
  | Article
  | Blog
  | Cart
  | Collection
  | Company
  | CompanyLocation
  | Customer
  | Location
  | Market
  | Order
  | Page
  | Product
  | ProductVariant
  | SellingPlan
  | Shop;

/**
 * Returns the resource which is being referred to by a metafield.
 *
 */
export type MetafieldReference =
  | Collection
  | GenericFile
  | MediaImage
  | Metaobject
  | Model3d
  | Page
  | Product
  | ProductVariant
  | Video;

/**
 * An auto-generated type for paginating through multiple MetafieldReferences.
 *
 */
export type MetafieldReferenceConnection = {
  __typename?: 'MetafieldReferenceConnection';
  /** A list of edges. */
  edges: Array<MetafieldReferenceEdge>;
  /** A list of the nodes contained in MetafieldReferenceEdge. */
  nodes: Array<MetafieldReference>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one MetafieldReference and a cursor during pagination.
 *
 */
export type MetafieldReferenceEdge = {
  __typename?: 'MetafieldReferenceEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of MetafieldReferenceEdge. */
  node: MetafieldReference;
};

/** An error that occurs during the execution of `MetafieldsSet`. */
export type MetafieldsSetUserError = DisplayableError & {
  __typename?: 'MetafieldsSetUserError';
  /** The error code. */
  code?: Maybe<MetafieldsSetUserErrorCode>;
  /** The index of the array element that's causing the error. */
  elementIndex?: Maybe<Scalars['Int']['output']>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Possible error codes that can be returned by `MetafieldsSetUserError`. */
export type MetafieldsSetUserErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** The input value isn't included in the list. */
  | 'INCLUSION'
  /** The owner ID is invalid. */
  | 'INVALID_OWNER'
  /** The type is invalid. */
  | 'INVALID_TYPE'
  /** The value is invalid for metafield type or for definition options. */
  | 'INVALID_VALUE'
  /** The input value should be less than or equal to the maximum value allowed. */
  | 'LESS_THAN_OR_EQUAL_TO'
  /** The input value needs to be blank. */
  | 'PRESENT'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** The input value is too short. */
  | 'TOO_SHORT';

/** An instance of a user-defined model based on a MetaobjectDefinition. */
export type Metaobject = Node &
  OnlineStorePublishable & {
    __typename?: 'Metaobject';
    /** Accesses a field of the object by key. */
    field?: Maybe<MetaobjectField>;
    /**
     * All object fields with defined values.
     * Omitted object keys can be assumed null, and no guarantees are made about field order.
     *
     */
    fields: Array<MetaobjectField>;
    /** The unique handle of the metaobject. Useful as a custom ID. */
    handle: Scalars['String']['output'];
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The URL used for viewing the metaobject on the shop's Online Store. Returns `null` if the metaobject definition doesn't have the `online_store` capability. */
    onlineStoreUrl?: Maybe<Scalars['URL']['output']>;
    /**
     * The metaobject's SEO information. Returns `null` if the metaobject definition
     * doesn't have the `renderable` capability.
     *
     */
    seo?: Maybe<MetaobjectSeo>;
    /** The type of the metaobject. Defines the namespace of its associated metafields. */
    type: Scalars['String']['output'];
    /** The date and time when the metaobject was last updated. */
    updatedAt: Scalars['DateTime']['output'];
  };

/** An instance of a user-defined model based on a MetaobjectDefinition. */
export type MetaobjectFieldArgs = {
  key: Scalars['String']['input'];
};

/**
 * An auto-generated type for paginating through multiple Metaobjects.
 *
 */
export type MetaobjectConnection = {
  __typename?: 'MetaobjectConnection';
  /** A list of edges. */
  edges: Array<MetaobjectEdge>;
  /** A list of the nodes contained in MetaobjectEdge. */
  nodes: Array<Metaobject>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Metaobject and a cursor during pagination.
 *
 */
export type MetaobjectEdge = {
  __typename?: 'MetaobjectEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of MetaobjectEdge. */
  node: Metaobject;
};

/** Provides the value of a Metaobject field. */
export type MetaobjectField = {
  __typename?: 'MetaobjectField';
  /** The field key. */
  key: Scalars['String']['output'];
  /** A referenced object if the field type is a resource reference. */
  reference?: Maybe<MetafieldReference>;
  /** A list of referenced objects if the field type is a resource reference list. */
  references?: Maybe<MetafieldReferenceConnection>;
  /**
   * The type name of the field.
   * See the list of [supported types](https://shopify.dev/apps/metafields/definitions/types).
   *
   */
  type: Scalars['String']['output'];
  /** The field value. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Provides the value of a Metaobject field. */
export type MetaobjectFieldReferencesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The input fields used to retrieve a metaobject by handle. */
export type MetaobjectHandleInput = {
  /** The handle of the metaobject. */
  handle: Scalars['String']['input'];
  /** The type of the metaobject. */
  type: Scalars['String']['input'];
};

/** SEO information for a metaobject. */
export type MetaobjectSeo = {
  __typename?: 'MetaobjectSEO';
  /** The meta description. */
  description?: Maybe<MetaobjectField>;
  /** The SEO title. */
  title?: Maybe<MetaobjectField>;
};

/** Represents a Shopify hosted 3D model. */
export type Model3d = Media &
  Node & {
    __typename?: 'Model3d';
    /** A word or phrase to share the nature or contents of a media. */
    alt?: Maybe<Scalars['String']['output']>;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The media content type. */
    mediaContentType: MediaContentType;
    /** The presentation for a media. */
    presentation?: Maybe<MediaPresentation>;
    /** The preview image for the media. */
    previewImage?: Maybe<Image>;
    /** The sources for a 3d model. */
    sources: Array<Model3dSource>;
  };

/** Represents a source for a Shopify hosted 3d model. */
export type Model3dSource = {
  __typename?: 'Model3dSource';
  /** The filesize of the 3d model. */
  filesize: Scalars['Int']['output'];
  /** The format of the 3d model. */
  format: Scalars['String']['output'];
  /** The MIME type of the 3d model. */
  mimeType: Scalars['String']['output'];
  /** The URL of the 3d model. */
  url: Scalars['String']['output'];
};

/** The input fields for a monetary value with currency. */
export type MoneyInput = {
  /** Decimal money amount. */
  amount: Scalars['Decimal']['input'];
  /** Currency of the money. */
  currencyCode: CurrencyCode;
};

/**
 * A monetary value with currency.
 *
 */
export type MoneyV2 = {
  __typename?: 'MoneyV2';
  /** Decimal money amount. */
  amount: Scalars['Decimal']['output'];
  /** Currency of the money. */
  currencyCode: CurrencyCode;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Updates the attributes on a cart. */
  cartAttributesUpdate?: Maybe<CartAttributesUpdatePayload>;
  /** Updates the billing address on the cart. */
  cartBillingAddressUpdate?: Maybe<CartBillingAddressUpdatePayload>;
  /**
   * Updates customer information associated with a cart.
   * Buyer identity is used to determine
   * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
   * and should match the customer's shipping address.
   *
   */
  cartBuyerIdentityUpdate?: Maybe<CartBuyerIdentityUpdatePayload>;
  /** Creates a new cart. */
  cartCreate?: Maybe<CartCreatePayload>;
  /** Adds delivery addresses to the cart. */
  cartDeliveryAddressesAdd?: Maybe<CartDeliveryAddressesAddPayload>;
  /** Removes delivery addresses from the cart. */
  cartDeliveryAddressesRemove?: Maybe<CartDeliveryAddressesRemovePayload>;
  /** Updates one or more delivery addresses on a cart. */
  cartDeliveryAddressesUpdate?: Maybe<CartDeliveryAddressesUpdatePayload>;
  /** Updates the discount codes applied to the cart. */
  cartDiscountCodesUpdate?: Maybe<CartDiscountCodesUpdatePayload>;
  /** Removes the gift card codes applied to the cart. */
  cartGiftCardCodesRemove?: Maybe<CartGiftCardCodesRemovePayload>;
  /** Updates the gift card codes applied to the cart. */
  cartGiftCardCodesUpdate?: Maybe<CartGiftCardCodesUpdatePayload>;
  /** Adds a merchandise line to the cart. */
  cartLinesAdd?: Maybe<CartLinesAddPayload>;
  /** Removes one or more merchandise lines from the cart. */
  cartLinesRemove?: Maybe<CartLinesRemovePayload>;
  /** Updates one or more merchandise lines on a cart. */
  cartLinesUpdate?: Maybe<CartLinesUpdatePayload>;
  /** Deletes a cart metafield. */
  cartMetafieldDelete?: Maybe<CartMetafieldDeletePayload>;
  /**
   * Sets cart metafield values. Cart metafield values will be set regardless if they were previously created or not.
   *
   * Allows a maximum of 25 cart metafields to be set at a time.
   *
   */
  cartMetafieldsSet?: Maybe<CartMetafieldsSetPayload>;
  /** Updates the note on the cart. */
  cartNoteUpdate?: Maybe<CartNoteUpdatePayload>;
  /** Update the customer's payment method that will be used to checkout. */
  cartPaymentUpdate?: Maybe<CartPaymentUpdatePayload>;
  /** Prepare the cart for cart checkout completion. */
  cartPrepareForCompletion?: Maybe<CartPrepareForCompletionPayload>;
  /** Update the selected delivery options for a delivery group. */
  cartSelectedDeliveryOptionsUpdate?: Maybe<CartSelectedDeliveryOptionsUpdatePayload>;
  /** Submit the cart for checkout completion. */
  cartSubmitForCompletion?: Maybe<CartSubmitForCompletionPayload>;
  /**
   * Creates a customer access token.
   * The customer access token is required to modify the customer object in any way.
   *
   */
  customerAccessTokenCreate?: Maybe<CustomerAccessTokenCreatePayload>;
  /**
   * Creates a customer access token using a
   * [multipass token](https://shopify.dev/api/multipass) instead of email and
   * password. A customer record is created if the customer doesn't exist. If a customer
   * record already exists but the record is disabled, then the customer record is enabled.
   *
   */
  customerAccessTokenCreateWithMultipass?: Maybe<CustomerAccessTokenCreateWithMultipassPayload>;
  /** Permanently destroys a customer access token. */
  customerAccessTokenDelete?: Maybe<CustomerAccessTokenDeletePayload>;
  /**
   * Renews a customer access token.
   *
   * Access token renewal must happen *before* a token expires.
   * If a token has already expired, a new one should be created instead via `customerAccessTokenCreate`.
   *
   */
  customerAccessTokenRenew?: Maybe<CustomerAccessTokenRenewPayload>;
  /** Activates a customer. */
  customerActivate?: Maybe<CustomerActivatePayload>;
  /** Activates a customer with the activation url received from `customerCreate`. */
  customerActivateByUrl?: Maybe<CustomerActivateByUrlPayload>;
  /** Creates a new address for a customer. */
  customerAddressCreate?: Maybe<CustomerAddressCreatePayload>;
  /** Permanently deletes the address of an existing customer. */
  customerAddressDelete?: Maybe<CustomerAddressDeletePayload>;
  /** Updates the address of an existing customer. */
  customerAddressUpdate?: Maybe<CustomerAddressUpdatePayload>;
  /** Creates a new customer. */
  customerCreate?: Maybe<CustomerCreatePayload>;
  /** Updates the default address of an existing customer. */
  customerDefaultAddressUpdate?: Maybe<CustomerDefaultAddressUpdatePayload>;
  /**
   * Sends a reset password email to the customer. The reset password
   * email contains a reset password URL and token that you can pass to
   * the [`customerResetByUrl`](https://shopify.dev/api/storefront/latest/mutations/customerResetByUrl) or
   * [`customerReset`](https://shopify.dev/api/storefront/latest/mutations/customerReset) mutation to reset the
   * customer password.
   *
   * This mutation is throttled by IP. With private access,
   * you can provide a [`Shopify-Storefront-Buyer-IP`](https://shopify.dev/api/usage/authentication#optional-ip-header) instead of the request IP.
   * The header is case-sensitive and must be sent as `Shopify-Storefront-Buyer-IP`.
   *
   * Make sure that the value provided to `Shopify-Storefront-Buyer-IP` is trusted. Unthrottled access to this
   * mutation presents a security risk.
   *
   */
  customerRecover?: Maybe<CustomerRecoverPayload>;
  /**
   * "Resets a customer’s password with the token received from a reset password email. You can send a reset password email with the [`customerRecover`](https://shopify.dev/api/storefront/latest/mutations/customerRecover) mutation."
   *
   */
  customerReset?: Maybe<CustomerResetPayload>;
  /**
   * "Resets a customer’s password with the reset password URL received from a reset password email. You can send a reset password email with the [`customerRecover`](https://shopify.dev/api/storefront/latest/mutations/customerRecover) mutation."
   *
   */
  customerResetByUrl?: Maybe<CustomerResetByUrlPayload>;
  /** Updates an existing customer. */
  customerUpdate?: Maybe<CustomerUpdatePayload>;
  /** Create a new Shop Pay payment request session. */
  shopPayPaymentRequestSessionCreate?: Maybe<ShopPayPaymentRequestSessionCreatePayload>;
  /** Submits a Shop Pay payment request session. */
  shopPayPaymentRequestSessionSubmit?: Maybe<ShopPayPaymentRequestSessionSubmitPayload>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartAttributesUpdateArgs = {
  attributes: Array<AttributeInput>;
  cartId: Scalars['ID']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartBillingAddressUpdateArgs = {
  billingAddress?: InputMaybe<MailingAddressInput>;
  cartId: Scalars['ID']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartBuyerIdentityUpdateArgs = {
  buyerIdentity: CartBuyerIdentityInput;
  cartId: Scalars['ID']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartCreateArgs = {
  input?: InputMaybe<CartInput>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartDeliveryAddressesAddArgs = {
  addresses: Array<CartSelectableAddressInput>;
  cartId: Scalars['ID']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartDeliveryAddressesRemoveArgs = {
  addressIds: Array<Scalars['ID']['input']>;
  cartId: Scalars['ID']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartDeliveryAddressesUpdateArgs = {
  addresses: Array<CartSelectableAddressUpdateInput>;
  cartId: Scalars['ID']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartDiscountCodesUpdateArgs = {
  cartId: Scalars['ID']['input'];
  discountCodes?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartGiftCardCodesRemoveArgs = {
  appliedGiftCardIds: Array<Scalars['ID']['input']>;
  cartId: Scalars['ID']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartGiftCardCodesUpdateArgs = {
  cartId: Scalars['ID']['input'];
  giftCardCodes: Array<Scalars['String']['input']>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartLinesAddArgs = {
  cartId: Scalars['ID']['input'];
  lines: Array<CartLineInput>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartLinesRemoveArgs = {
  cartId: Scalars['ID']['input'];
  lineIds: Array<Scalars['ID']['input']>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartLinesUpdateArgs = {
  cartId: Scalars['ID']['input'];
  lines: Array<CartLineUpdateInput>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartMetafieldDeleteArgs = {
  input: CartMetafieldDeleteInput;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartMetafieldsSetArgs = {
  metafields: Array<CartMetafieldsSetInput>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartNoteUpdateArgs = {
  cartId: Scalars['ID']['input'];
  note: Scalars['String']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartPaymentUpdateArgs = {
  cartId: Scalars['ID']['input'];
  payment: CartPaymentInput;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartPrepareForCompletionArgs = {
  cartId: Scalars['ID']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartSelectedDeliveryOptionsUpdateArgs = {
  cartId: Scalars['ID']['input'];
  selectedDeliveryOptions: Array<CartSelectedDeliveryOptionInput>;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCartSubmitForCompletionArgs = {
  attemptToken: Scalars['String']['input'];
  cartId: Scalars['ID']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAccessTokenCreateArgs = {
  input: CustomerAccessTokenCreateInput;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAccessTokenCreateWithMultipassArgs = {
  multipassToken: Scalars['String']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAccessTokenDeleteArgs = {
  customerAccessToken: Scalars['String']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAccessTokenRenewArgs = {
  customerAccessToken: Scalars['String']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerActivateArgs = {
  id: Scalars['ID']['input'];
  input: CustomerActivateInput;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerActivateByUrlArgs = {
  activationUrl: Scalars['URL']['input'];
  password: Scalars['String']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAddressCreateArgs = {
  address: MailingAddressInput;
  customerAccessToken: Scalars['String']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAddressDeleteArgs = {
  customerAccessToken: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerAddressUpdateArgs = {
  address: MailingAddressInput;
  customerAccessToken: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerCreateArgs = {
  input: CustomerCreateInput;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerDefaultAddressUpdateArgs = {
  addressId: Scalars['ID']['input'];
  customerAccessToken: Scalars['String']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerRecoverArgs = {
  email: Scalars['String']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerResetArgs = {
  id: Scalars['ID']['input'];
  input: CustomerResetInput;
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerResetByUrlArgs = {
  password: Scalars['String']['input'];
  resetUrl: Scalars['URL']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationCustomerUpdateArgs = {
  customer: CustomerUpdateInput;
  customerAccessToken: Scalars['String']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationShopPayPaymentRequestSessionCreateArgs = {
  paymentRequest: ShopPayPaymentRequestInput;
  sourceIdentifier: Scalars['String']['input'];
};

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type MutationShopPayPaymentRequestSessionSubmitArgs = {
  idempotencyKey: Scalars['String']['input'];
  orderName?: InputMaybe<Scalars['String']['input']>;
  paymentRequest: ShopPayPaymentRequestInput;
  token: Scalars['String']['input'];
};

/**
 * An object with an ID field to support global identification, in accordance with the
 * [Relay specification](https://relay.dev/graphql/objectidentification.htm#sec-Node-Interface).
 * This interface is used by the [node](https://shopify.dev/api/admin-graphql/unstable/queries/node)
 * and [nodes](https://shopify.dev/api/admin-graphql/unstable/queries/nodes) queries.
 *
 */
export type Node = {
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
};

/** Represents a resource that can be published to the Online Store sales channel. */
export type OnlineStorePublishable = {
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<Scalars['URL']['output']>;
};

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type Order = HasMetafields &
  Node & {
    __typename?: 'Order';
    /** The address associated with the payment method. */
    billingAddress?: Maybe<MailingAddress>;
    /** The reason for the order's cancellation. Returns `null` if the order wasn't canceled. */
    cancelReason?: Maybe<OrderCancelReason>;
    /** The date and time when the order was canceled. Returns null if the order wasn't canceled. */
    canceledAt?: Maybe<Scalars['DateTime']['output']>;
    /** The code of the currency used for the payment. */
    currencyCode: CurrencyCode;
    /** The subtotal of line items and their discounts, excluding line items that have been removed. Does not contain order-level discounts, duties, shipping costs, or shipping discounts. Taxes aren't included unless the order is a taxes-included order. */
    currentSubtotalPrice: MoneyV2;
    /** The total cost of duties for the order, including refunds. */
    currentTotalDuties?: Maybe<MoneyV2>;
    /** The total amount of the order, including duties, taxes and discounts, minus amounts for line items that have been removed. */
    currentTotalPrice: MoneyV2;
    /** The total cost of shipping, excluding shipping lines that have been refunded or removed. Taxes aren't included unless the order is a taxes-included order. */
    currentTotalShippingPrice: MoneyV2;
    /** The total of all taxes applied to the order, excluding taxes for returned line items. */
    currentTotalTax: MoneyV2;
    /** A list of the custom attributes added to the order. For example, whether an order is a customer's first. */
    customAttributes: Array<Attribute>;
    /** The locale code in which this specific order happened. */
    customerLocale?: Maybe<Scalars['String']['output']>;
    /** The unique URL that the customer can use to access the order. */
    customerUrl?: Maybe<Scalars['URL']['output']>;
    /** Discounts that have been applied on the order. */
    discountApplications: DiscountApplicationConnection;
    /** Whether the order has had any edits applied or not. */
    edited: Scalars['Boolean']['output'];
    /** The customer's email address. */
    email?: Maybe<Scalars['String']['output']>;
    /** The financial status of the order. */
    financialStatus?: Maybe<OrderFinancialStatus>;
    /** The fulfillment status for the order. */
    fulfillmentStatus: OrderFulfillmentStatus;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** List of the order’s line items. */
    lineItems: OrderLineItemConnection;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield?: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /**
     * Unique identifier for the order that appears on the order.
     * For example, _#1000_ or _Store1001.
     *
     */
    name: Scalars['String']['output'];
    /** A unique numeric identifier for the order for use by shop owner and customer. */
    orderNumber: Scalars['Int']['output'];
    /** The total cost of duties charged at checkout. */
    originalTotalDuties?: Maybe<MoneyV2>;
    /** The total price of the order before any applied edits. */
    originalTotalPrice: MoneyV2;
    /** The customer's phone number for receiving SMS notifications. */
    phone?: Maybe<Scalars['String']['output']>;
    /**
     * The date and time when the order was imported.
     * This value can be set to dates in the past when importing from other systems.
     * If no value is provided, it will be auto-generated based on current date and time.
     *
     */
    processedAt: Scalars['DateTime']['output'];
    /** The address to where the order will be shipped. */
    shippingAddress?: Maybe<MailingAddress>;
    /**
     * The discounts that have been allocated onto the shipping line by discount applications.
     *
     */
    shippingDiscountAllocations: Array<DiscountAllocation>;
    /** The unique URL for the order's status page. */
    statusUrl: Scalars['URL']['output'];
    /** Price of the order before shipping and taxes. */
    subtotalPrice?: Maybe<MoneyV2>;
    /**
     * Price of the order before duties, shipping and taxes.
     * @deprecated Use `subtotalPrice` instead.
     */
    subtotalPriceV2?: Maybe<MoneyV2>;
    /** List of the order’s successful fulfillments. */
    successfulFulfillments?: Maybe<Array<Fulfillment>>;
    /** The sum of all the prices of all the items in the order, duties, taxes and discounts included (must be positive). */
    totalPrice: MoneyV2;
    /**
     * The sum of all the prices of all the items in the order, duties, taxes and discounts included (must be positive).
     * @deprecated Use `totalPrice` instead.
     */
    totalPriceV2: MoneyV2;
    /** The total amount that has been refunded. */
    totalRefunded: MoneyV2;
    /**
     * The total amount that has been refunded.
     * @deprecated Use `totalRefunded` instead.
     */
    totalRefundedV2: MoneyV2;
    /** The total cost of shipping. */
    totalShippingPrice: MoneyV2;
    /**
     * The total cost of shipping.
     * @deprecated Use `totalShippingPrice` instead.
     */
    totalShippingPriceV2: MoneyV2;
    /** The total cost of taxes. */
    totalTax?: Maybe<MoneyV2>;
    /**
     * The total cost of taxes.
     * @deprecated Use `totalTax` instead.
     */
    totalTaxV2?: Maybe<MoneyV2>;
  };

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type OrderDiscountApplicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type OrderLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type OrderMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type OrderMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type OrderSuccessfulFulfillmentsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents the reason for the order's cancellation. */
export type OrderCancelReason =
  /** The customer wanted to cancel the order. */
  | 'CUSTOMER'
  /** Payment was declined. */
  | 'DECLINED'
  /** The order was fraudulent. */
  | 'FRAUD'
  /** There was insufficient inventory. */
  | 'INVENTORY'
  /** The order was canceled for an unlisted reason. */
  | 'OTHER'
  /** Staff made an error. */
  | 'STAFF';

/**
 * An auto-generated type for paginating through multiple Orders.
 *
 */
export type OrderConnection = {
  __typename?: 'OrderConnection';
  /** A list of edges. */
  edges: Array<OrderEdge>;
  /** A list of the nodes contained in OrderEdge. */
  nodes: Array<Order>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total count of Orders. */
  totalCount: Scalars['UnsignedInt64']['output'];
};

/**
 * An auto-generated type which holds one Order and a cursor during pagination.
 *
 */
export type OrderEdge = {
  __typename?: 'OrderEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of OrderEdge. */
  node: Order;
};

/** Represents the order's current financial status. */
export type OrderFinancialStatus =
  /** Displayed as **Authorized**. */
  | 'AUTHORIZED'
  /** Displayed as **Paid**. */
  | 'PAID'
  /** Displayed as **Partially paid**. */
  | 'PARTIALLY_PAID'
  /** Displayed as **Partially refunded**. */
  | 'PARTIALLY_REFUNDED'
  /** Displayed as **Pending**. */
  | 'PENDING'
  /** Displayed as **Refunded**. */
  | 'REFUNDED'
  /** Displayed as **Voided**. */
  | 'VOIDED';

/** Represents the order's aggregated fulfillment status for display purposes. */
export type OrderFulfillmentStatus =
  /** Displayed as **Fulfilled**. All of the items in the order have been fulfilled. */
  | 'FULFILLED'
  /** Displayed as **In progress**. Some of the items in the order have been fulfilled, or a request for fulfillment has been sent to the fulfillment service. */
  | 'IN_PROGRESS'
  /** Displayed as **On hold**. All of the unfulfilled items in this order are on hold. */
  | 'ON_HOLD'
  /** Displayed as **Open**. None of the items in the order have been fulfilled. Replaced by "UNFULFILLED" status. */
  | 'OPEN'
  /** Displayed as **Partially fulfilled**. Some of the items in the order have been fulfilled. */
  | 'PARTIALLY_FULFILLED'
  /** Displayed as **Pending fulfillment**. A request for fulfillment of some items awaits a response from the fulfillment service. Replaced by "IN_PROGRESS" status. */
  | 'PENDING_FULFILLMENT'
  /** Displayed as **Restocked**. All of the items in the order have been restocked. Replaced by "UNFULFILLED" status. */
  | 'RESTOCKED'
  /** Displayed as **Scheduled**. All of the unfulfilled items in this order are scheduled for fulfillment at later time. */
  | 'SCHEDULED'
  /** Displayed as **Unfulfilled**. None of the items in the order have been fulfilled. */
  | 'UNFULFILLED';

/** Represents a single line in an order. There is one line item for each distinct product variant. */
export type OrderLineItem = {
  __typename?: 'OrderLineItem';
  /** The number of entries associated to the line item minus the items that have been removed. */
  currentQuantity: Scalars['Int']['output'];
  /** List of custom attributes associated to the line item. */
  customAttributes: Array<Attribute>;
  /** The discounts that have been allocated onto the order line item by discount applications. */
  discountAllocations: Array<DiscountAllocation>;
  /** The total price of the line item, including discounts, and displayed in the presentment currency. */
  discountedTotalPrice: MoneyV2;
  /** The total price of the line item, not including any discounts. The total price is calculated using the original unit price multiplied by the quantity, and it's displayed in the presentment currency. */
  originalTotalPrice: MoneyV2;
  /** The number of products variants associated to the line item. */
  quantity: Scalars['Int']['output'];
  /** The title of the product combined with title of the variant. */
  title: Scalars['String']['output'];
  /** The product variant object associated to the line item. */
  variant?: Maybe<ProductVariant>;
};

/**
 * An auto-generated type for paginating through multiple OrderLineItems.
 *
 */
export type OrderLineItemConnection = {
  __typename?: 'OrderLineItemConnection';
  /** A list of edges. */
  edges: Array<OrderLineItemEdge>;
  /** A list of the nodes contained in OrderLineItemEdge. */
  nodes: Array<OrderLineItem>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one OrderLineItem and a cursor during pagination.
 *
 */
export type OrderLineItemEdge = {
  __typename?: 'OrderLineItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of OrderLineItemEdge. */
  node: OrderLineItem;
};

/** The set of valid sort keys for the Order query. */
export type OrderSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `processed_at` value. */
  | 'PROCESSED_AT'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `total_price` value. */
  | 'TOTAL_PRICE';

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export type Page = HasMetafields &
  Node &
  OnlineStorePublishable &
  Trackable & {
    __typename?: 'Page';
    /** The description of the page, complete with HTML formatting. */
    body: Scalars['HTML']['output'];
    /** Summary of the page body. */
    bodySummary: Scalars['String']['output'];
    /** The timestamp of the page creation. */
    createdAt: Scalars['DateTime']['output'];
    /** A human-friendly unique string for the page automatically generated from its title. */
    handle: Scalars['String']['output'];
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield?: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
    onlineStoreUrl?: Maybe<Scalars['URL']['output']>;
    /** The page's SEO information. */
    seo?: Maybe<Seo>;
    /** The title of the page. */
    title: Scalars['String']['output'];
    /** URL parameters to be added to a page URL to track the origin of on-site search traffic for [analytics reporting](https://help.shopify.com/manual/reports-and-analytics/shopify-reports/report-types/default-reports/behaviour-reports). Returns a result when accessed through the [search](https://shopify.dev/docs/api/storefront/current/queries/search) or [predictiveSearch](https://shopify.dev/docs/api/storefront/current/queries/predictiveSearch) queries, otherwise returns null. */
    trackingParameters?: Maybe<Scalars['String']['output']>;
    /** The timestamp of the latest page update. */
    updatedAt: Scalars['DateTime']['output'];
  };

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export type PageMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export type PageMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/**
 * An auto-generated type for paginating through multiple Pages.
 *
 */
export type PageConnection = {
  __typename?: 'PageConnection';
  /** A list of edges. */
  edges: Array<PageEdge>;
  /** A list of the nodes contained in PageEdge. */
  nodes: Array<Page>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Page and a cursor during pagination.
 *
 */
export type PageEdge = {
  __typename?: 'PageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of PageEdge. */
  node: Page;
};

/**
 * Returns information about pagination in a connection, in accordance with the
 * [Relay specification](https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo).
 * For more information, please read our [GraphQL Pagination Usage Guide](https://shopify.dev/api/usage/pagination-graphql).
 *
 */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor corresponding to the last node in edges. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Whether there are more pages to fetch following the current page. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Whether there are any pages prior to the current page. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The cursor corresponding to the first node in edges. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The set of valid sort keys for the Page query. */
export type PageSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** Type for paginating through multiple sitemap's resources. */
export type PaginatedSitemapResources = {
  __typename?: 'PaginatedSitemapResources';
  /** Whether there are more pages to fetch following the current page. */
  hasNextPage: Scalars['Boolean']['output'];
  /**
   * List of sitemap resources for the current page.
   * Note: The number of items varies between 0 and 250 per page.
   *
   */
  items: Array<SitemapResourceInterface>;
};

/** Settings related to payments. */
export type PaymentSettings = {
  __typename?: 'PaymentSettings';
  /** List of the card brands which the business entity accepts. */
  acceptedCardBrands: Array<CardBrand>;
  /** The url pointing to the endpoint to vault credit cards. */
  cardVaultUrl: Scalars['URL']['output'];
  /** The country where the shop is located. When multiple business entities operate within the shop, then this will represent the country of the business entity that's serving the specified buyer context. */
  countryCode: CountryCode;
  /** The three-letter code for the shop's primary currency. */
  currencyCode: CurrencyCode;
  /**
   * A list of enabled currencies (ISO 4217 format) that the shop accepts.
   * Merchants can enable currencies from their Shopify Payments settings in the Shopify admin.
   *
   */
  enabledPresentmentCurrencies: Array<CurrencyCode>;
  /** The shop’s Shopify Payments account ID. */
  shopifyPaymentsAccountId?: Maybe<Scalars['String']['output']>;
  /** List of the digital wallets which the business entity supports. */
  supportedDigitalWallets: Array<DigitalWallet>;
};

/** Decides the distribution of results. */
export type PredictiveSearchLimitScope =
  /** Return results up to limit across all types. */
  | 'ALL'
  /** Return results up to limit per type. */
  | 'EACH';

/**
 * A predictive search result represents a list of products, collections, pages, articles, and query suggestions
 * that matches the predictive search query.
 *
 */
export type PredictiveSearchResult = {
  __typename?: 'PredictiveSearchResult';
  /** The articles that match the search query. */
  articles: Array<Article>;
  /** The articles that match the search query. */
  collections: Array<Collection>;
  /** The pages that match the search query. */
  pages: Array<Page>;
  /** The products that match the search query. */
  products: Array<Product>;
  /** The query suggestions that are relevant to the search query. */
  queries: Array<SearchQuerySuggestion>;
};

/** The types of search items to perform predictive search on. */
export type PredictiveSearchType =
  /** Returns matching articles. */
  | 'ARTICLE'
  /** Returns matching collections. */
  | 'COLLECTION'
  /** Returns matching pages. */
  | 'PAGE'
  /** Returns matching products. */
  | 'PRODUCT'
  /** Returns matching query strings. */
  | 'QUERY';

/** The preferred delivery methods such as shipping, local pickup or through pickup points. */
export type PreferenceDeliveryMethodType =
  /** A delivery method used to let buyers collect purchases at designated locations like parcel lockers. */
  | 'PICKUP_POINT'
  /** A delivery method used to let buyers receive items directly from a specific location within an area. */
  | 'PICK_UP'
  /** A delivery method used to send items directly to a buyer’s specified address. */
  | 'SHIPPING';

/**
 * The input fields for a filter used to view a subset of products in a collection matching a specific price range.
 *
 */
export type PriceRangeFilter = {
  /** The maximum price in the range. Empty indicates no max price. */
  max?: InputMaybe<Scalars['Float']['input']>;
  /** The minimum price in the range. Defaults to zero. */
  min?: InputMaybe<Scalars['Float']['input']>;
};

/** The value of the percentage pricing object. */
export type PricingPercentageValue = {
  __typename?: 'PricingPercentageValue';
  /** The percentage value of the object. */
  percentage: Scalars['Float']['output'];
};

/** The price value (fixed or percentage) for a discount application. */
export type PricingValue = MoneyV2 | PricingPercentageValue;

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type Product = HasMetafields &
  Node &
  OnlineStorePublishable &
  Trackable & {
    __typename?: 'Product';
    /**
     * A list of variants whose selected options differ with the provided selected options by one, ordered by variant id.
     * If selected options are not provided, adjacent variants to the first available variant is returned.
     *
     * Note that this field returns an array of variants. In most cases, the number of variants in this array will be low.
     * However, with a low number of options and a high number of values per option, the number of variants returned
     * here can be high. In such cases, it recommended to avoid using this field.
     *
     * This list of variants can be used in combination with the `options` field to build a rich variant picker that
     * includes variant availability or other variant information.
     *
     */
    adjacentVariants: Array<ProductVariant>;
    /** Indicates if at least one product variant is available for sale. */
    availableForSale: Scalars['Boolean']['output'];
    /** The category of a product from [Shopify's Standard Product Taxonomy](https://shopify.github.io/product-taxonomy/releases/unstable/?categoryId=sg-4-17-2-17). */
    category?: Maybe<TaxonomyCategory>;
    /** A list of [collections](/docs/api/storefront/latest/objects/Collection) that include the product. */
    collections: CollectionConnection;
    /** The [compare-at price range](https://help.shopify.com/manual/products/details/product-pricing/sale-pricing) of the product in the shop's default currency. */
    compareAtPriceRange: ProductPriceRange;
    /** The date and time when the product was created. */
    createdAt: Scalars['DateTime']['output'];
    /** A single-line description of the product, with [HTML tags](https://developer.mozilla.org/en-US/docs/Web/HTML) removed. */
    description: Scalars['String']['output'];
    /**
     * The description of the product, with
     * HTML tags. For example, the description might include
     * bold `<strong></strong>` and italic `<i></i>` text.
     *
     */
    descriptionHtml: Scalars['HTML']['output'];
    /**
     * An encoded string containing all option value combinations
     * with a corresponding variant that is currently available for sale.
     *
     * Integers represent option and values:
     * [0,1] represents option_value at array index 0 for the option at array index 0
     *
     * `:`, `,`, ` ` and `-` are control characters.
     * `:` indicates a new option. ex: 0:1 indicates value 0 for the option in position 1, value 1 for the option in position 2.
     * `,` indicates the end of a repeated prefix, mulitple consecutive commas indicate the end of multiple repeated prefixes.
     * ` ` indicates a gap in the sequence of option values. ex: 0 4 indicates option values in position 0 and 4 are present.
     * `-` indicates a continuous range of option values. ex: 0 1-3 4
     *
     * Decoding process:
     *
     * Example options: [Size, Color, Material]
     * Example values: [[Small, Medium, Large], [Red, Blue], [Cotton, Wool]]
     * Example encoded string: "0:0:0,1:0-1,,1:0:0-1,1:1,,2:0:1,1:0,,"
     *
     * Step 1: Expand ranges into the numbers they represent: "0:0:0,1:0 1,,1:0:0 1,1:1,,2:0:1,1:0,,"
     * Step 2: Expand repeated prefixes: "0:0:0,0:1:0 1,1:0:0 1,1:1:1,2:0:1,2:1:0,"
     * Step 3: Expand shared prefixes so data is encoded as a string: "0:0:0,0:1:0,0:1:1,1:0:0,1:0:1,1:1:1,2:0:1,2:1:0,"
     * Step 4: Map to options + option values to determine existing variants:
     *
     * [Small, Red, Cotton] (0:0:0), [Small, Blue, Cotton] (0:1:0), [Small, Blue, Wool] (0:1:1),
     * [Medium, Red, Cotton] (1:0:0), [Medium, Red, Wool] (1:0:1), [Medium, Blue, Wool] (1:1:1),
     * [Large, Red, Wool] (2:0:1), [Large, Blue, Cotton] (2:1:0).
     *
     *
     */
    encodedVariantAvailability?: Maybe<Scalars['String']['output']>;
    /**
     * An encoded string containing all option value combinations with a corresponding variant.
     *
     * Integers represent option and values:
     * [0,1] represents option_value at array index 0 for the option at array index 0
     *
     * `:`, `,`, ` ` and `-` are control characters.
     * `:` indicates a new option. ex: 0:1 indicates value 0 for the option in position 1, value 1 for the option in position 2.
     * `,` indicates the end of a repeated prefix, mulitple consecutive commas indicate the end of multiple repeated prefixes.
     * ` ` indicates a gap in the sequence of option values. ex: 0 4 indicates option values in position 0 and 4 are present.
     * `-` indicates a continuous range of option values. ex: 0 1-3 4
     *
     * Decoding process:
     *
     * Example options: [Size, Color, Material]
     * Example values: [[Small, Medium, Large], [Red, Blue], [Cotton, Wool]]
     * Example encoded string: "0:0:0,1:0-1,,1:0:0-1,1:1,,2:0:1,1:0,,"
     *
     * Step 1: Expand ranges into the numbers they represent: "0:0:0,1:0 1,,1:0:0 1,1:1,,2:0:1,1:0,,"
     * Step 2: Expand repeated prefixes: "0:0:0,0:1:0 1,1:0:0 1,1:1:1,2:0:1,2:1:0,"
     * Step 3: Expand shared prefixes so data is encoded as a string: "0:0:0,0:1:0,0:1:1,1:0:0,1:0:1,1:1:1,2:0:1,2:1:0,"
     * Step 4: Map to options + option values to determine existing variants:
     *
     * [Small, Red, Cotton] (0:0:0), [Small, Blue, Cotton] (0:1:0), [Small, Blue, Wool] (0:1:1),
     * [Medium, Red, Cotton] (1:0:0), [Medium, Red, Wool] (1:0:1), [Medium, Blue, Wool] (1:1:1),
     * [Large, Red, Wool] (2:0:1), [Large, Blue, Cotton] (2:1:0).
     *
     *
     */
    encodedVariantExistence?: Maybe<Scalars['String']['output']>;
    /**
     * The featured image for the product.
     *
     * This field is functionally equivalent to `images(first: 1)`.
     *
     */
    featuredImage?: Maybe<Image>;
    /**
     * A unique, human-readable string of the product's title.
     * A handle can contain letters, hyphens (`-`), and numbers, but no spaces.
     * The handle is used in the online store URL for the product.
     *
     */
    handle: Scalars['String']['output'];
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** List of images associated with the product. */
    images: ImageConnection;
    /** Whether the product is a gift card. */
    isGiftCard: Scalars['Boolean']['output'];
    /** The [media](/docs/apps/build/online-store/product-media) that are associated with the product. Valid media are images, 3D models, videos. */
    media: MediaConnection;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield?: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /**
     * The product's URL on the online store.
     * If `null`, then the product isn't published to the online store sales channel.
     *
     */
    onlineStoreUrl?: Maybe<Scalars['URL']['output']>;
    /** A list of product options. The limit is defined by the [shop's resource limits for product options](/docs/api/admin-graphql/latest/objects/Shop#field-resourcelimits) (`Shop.resourceLimits.maxProductOptions`). */
    options: Array<ProductOption>;
    /**
     * The minimum and maximum prices of a product, expressed in decimal numbers.
     * For example, if the product is priced between $10.00 and $50.00,
     * then the price range is $10.00 - $50.00.
     *
     */
    priceRange: ProductPriceRange;
    /**
     * The [product type](https://help.shopify.com/manual/products/details/product-type)
     * that merchants define.
     *
     */
    productType: Scalars['String']['output'];
    /** The date and time when the product was published to the channel. */
    publishedAt: Scalars['DateTime']['output'];
    /** Whether the product can only be purchased with a [selling plan](/docs/apps/build/purchase-options/subscriptions/selling-plans). Products that are sold on subscription (`requiresSellingPlan: true`) can be updated only for online stores. If you update a product to be subscription-only (`requiresSellingPlan:false`), then the product is unpublished from all channels, except the online store. */
    requiresSellingPlan: Scalars['Boolean']['output'];
    /**
     * Find an active product variant based on selected options, availability or the first variant.
     *
     * All arguments are optional. If no selected options are provided, the first available variant is returned.
     * If no variants are available, the first variant is returned.
     *
     */
    selectedOrFirstAvailableVariant?: Maybe<ProductVariant>;
    /** A list of all [selling plan groups](/docs/apps/build/purchase-options/subscriptions/selling-plans/build-a-selling-plan) that are associated with the product either directly, or through the product's variants. */
    sellingPlanGroups: SellingPlanGroupConnection;
    /**
     * The [SEO title and description](https://help.shopify.com/manual/promoting-marketing/seo/adding-keywords)
     * that are associated with a product.
     *
     */
    seo: Seo;
    /**
     * A comma-separated list of searchable keywords that are
     * associated with the product. For example, a merchant might apply the `sports`
     * and `summer` tags to products that are associated with sportwear for summer.
     * Updating `tags` overwrites any existing tags that were previously added to the product.
     * To add new tags without overwriting existing tags,
     * use the GraphQL Admin API's [`tagsAdd`](/docs/api/admin-graphql/latest/mutations/tagsadd)
     * mutation.
     *
     */
    tags: Array<Scalars['String']['output']>;
    /**
     * The name for the product that displays to customers. The title is used to construct the product's handle.
     * For example, if a product is titled "Black Sunglasses", then the handle is `black-sunglasses`.
     *
     */
    title: Scalars['String']['output'];
    /** The quantity of inventory that's in stock. */
    totalInventory?: Maybe<Scalars['Int']['output']>;
    /** URL parameters to be added to a page URL to track the origin of on-site search traffic for [analytics reporting](https://help.shopify.com/manual/reports-and-analytics/shopify-reports/report-types/default-reports/behaviour-reports). Returns a result when accessed through the [search](https://shopify.dev/docs/api/storefront/current/queries/search) or [predictiveSearch](https://shopify.dev/docs/api/storefront/current/queries/predictiveSearch) queries, otherwise returns null. */
    trackingParameters?: Maybe<Scalars['String']['output']>;
    /**
     * The date and time when the product was last modified.
     * A product's `updatedAt` value can change for different reasons. For example, if an order
     * is placed for a product that has inventory tracking set up, then the inventory adjustment
     * is counted as an update.
     *
     */
    updatedAt: Scalars['DateTime']['output'];
    /**
     * Find a product’s variant based on its selected options.
     * This is useful for converting a user’s selection of product options into a single matching variant.
     * If there is not a variant for the selected options, `null` will be returned.
     *
     */
    variantBySelectedOptions?: Maybe<ProductVariant>;
    /** A list of [variants](/docs/api/storefront/latest/objects/ProductVariant) that are associated with the product. */
    variants: ProductVariantConnection;
    /** The number of [variants](/docs/api/storefront/latest/objects/ProductVariant) that are associated with the product. */
    variantsCount?: Maybe<Count>;
    /** The name of the product's vendor. */
    vendor: Scalars['String']['output'];
  };

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductAdjacentVariantsArgs = {
  caseInsensitiveMatch?: InputMaybe<Scalars['Boolean']['input']>;
  ignoreUnknownOptions?: InputMaybe<Scalars['Boolean']['input']>;
  selectedOptions?: InputMaybe<Array<SelectedOptionInput>>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductCollectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductDescriptionArgs = {
  truncateAt?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductImagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ProductImageSortKeys>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductMediaArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ProductMediaSortKeys>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductOptionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductSelectedOrFirstAvailableVariantArgs = {
  caseInsensitiveMatch?: InputMaybe<Scalars['Boolean']['input']>;
  ignoreUnknownOptions?: InputMaybe<Scalars['Boolean']['input']>;
  selectedOptions?: InputMaybe<Array<SelectedOptionInput>>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductSellingPlanGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductVariantBySelectedOptionsArgs = {
  caseInsensitiveMatch?: InputMaybe<Scalars['Boolean']['input']>;
  ignoreUnknownOptions?: InputMaybe<Scalars['Boolean']['input']>;
  selectedOptions: Array<SelectedOptionInput>;
};

/**
 * The `Product` object lets you manage products in a merchant’s store.
 *
 * Products are the goods and services that merchants offer to customers.
 * They can include various details such as title, description, price, images, and options such as size or color.
 * You can use [product variants](/docs/api/storefront/latest/objects/ProductVariant)
 * to create or update different versions of the same product.
 * You can also add or update product [media](/docs/api/storefront/latest/interfaces/Media).
 * Products can be organized by grouping them into a [collection](/docs/api/storefront/latest/objects/Collection).
 *
 * Learn more about working with [products and collections](/docs/storefronts/headless/building-with-the-storefront-api/products-collections).
 *
 */
export type ProductVariantsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ProductVariantSortKeys>;
};

/** The set of valid sort keys for the ProductCollection query. */
export type ProductCollectionSortKeys =
  /** Sort by the `best-selling` value. */
  | 'BEST_SELLING'
  /** Sort by the `collection-default` value. */
  | 'COLLECTION_DEFAULT'
  /** Sort by the `created` value. */
  | 'CREATED'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `manual` value. */
  | 'MANUAL'
  /** Sort by the `price` value. */
  | 'PRICE'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE';

/**
 * An auto-generated type for paginating through multiple Products.
 *
 */
export type ProductConnection = {
  __typename?: 'ProductConnection';
  /** A list of edges. */
  edges: Array<ProductEdge>;
  /** A list of available filters. */
  filters: Array<Filter>;
  /** A list of the nodes contained in ProductEdge. */
  nodes: Array<Product>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one Product and a cursor during pagination.
 *
 */
export type ProductEdge = {
  __typename?: 'ProductEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of ProductEdge. */
  node: Product;
};

/**
 * The input fields for a filter used to view a subset of products in a collection.
 * By default, the `available` and `price` filters are enabled. Filters are customized with the Shopify Search & Discovery app.
 * Learn more about [customizing storefront filtering](https://help.shopify.com/manual/online-store/themes/customizing-themes/storefront-filters).
 *
 */
export type ProductFilter = {
  /** Filter on if the product is available for sale. */
  available?: InputMaybe<Scalars['Boolean']['input']>;
  /** A product category to filter on. */
  category?: InputMaybe<CategoryFilter>;
  /** A range of prices to filter with-in. */
  price?: InputMaybe<PriceRangeFilter>;
  /** A product metafield to filter on. */
  productMetafield?: InputMaybe<MetafieldFilter>;
  /** The product type to filter on. */
  productType?: InputMaybe<Scalars['String']['input']>;
  /** The product vendor to filter on. */
  productVendor?: InputMaybe<Scalars['String']['input']>;
  /** A product tag to filter on. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** A standard product attribute metafield to filter on. */
  taxonomyMetafield?: InputMaybe<TaxonomyMetafieldFilter>;
  /** A variant metafield to filter on. */
  variantMetafield?: InputMaybe<MetafieldFilter>;
  /** A variant option to filter on. */
  variantOption?: InputMaybe<VariantOptionFilter>;
};

/** The set of valid sort keys for the ProductImage query. */
export type ProductImageSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `position` value. */
  | 'POSITION'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** The set of valid sort keys for the ProductMedia query. */
export type ProductMediaSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `position` value. */
  | 'POSITION'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/**
 * Product property names like "Size", "Color", and "Material" that the customers can select.
 * Variants are selected based on permutations of these options.
 * 255 characters limit each.
 *
 */
export type ProductOption = Node & {
  __typename?: 'ProductOption';
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The product option’s name. */
  name: Scalars['String']['output'];
  /** The corresponding option value to the product option. */
  optionValues: Array<ProductOptionValue>;
  /**
   * The corresponding value to the product option name.
   * @deprecated Use `optionValues` instead.
   */
  values: Array<Scalars['String']['output']>;
};

/**
 * The product option value names. For example, "Red", "Blue", and "Green" for a "Color" option.
 *
 */
export type ProductOptionValue = Node & {
  __typename?: 'ProductOptionValue';
  /**
   * The product variant that combines this option value with the
   * lowest-position option values for all other options.
   *
   * This field will always return a variant, provided a variant including this option value exists.
   *
   */
  firstSelectableVariant?: Maybe<ProductVariant>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The name of the product option value. */
  name: Scalars['String']['output'];
  /** The swatch of the product option value. */
  swatch?: Maybe<ProductOptionValueSwatch>;
};

/**
 * The product option value swatch.
 *
 */
export type ProductOptionValueSwatch = {
  __typename?: 'ProductOptionValueSwatch';
  /** The swatch color. */
  color?: Maybe<Scalars['Color']['output']>;
  /** The swatch image. */
  image?: Maybe<Media>;
};

/** The price range of the product. */
export type ProductPriceRange = {
  __typename?: 'ProductPriceRange';
  /** The highest variant's price. */
  maxVariantPrice: MoneyV2;
  /** The lowest variant's price. */
  minVariantPrice: MoneyV2;
};

/**
 * The recommendation intent that is used to generate product recommendations.
 * You can use intent to generate product recommendations according to different strategies.
 *
 */
export type ProductRecommendationIntent =
  /** Offer customers products that are complementary to a product for which recommendations are to be fetched. An example is add-on products that display in a Pair it with section. */
  | 'COMPLEMENTARY'
  /** Offer customers a mix of products that are similar or complementary to a product for which recommendations are to be fetched. An example is substitutable products that display in a You may also like section. */
  | 'RELATED';

/** The set of valid sort keys for the Product query. */
export type ProductSortKeys =
  /** Sort by the `best_selling` value. */
  | 'BEST_SELLING'
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `price` value. */
  | 'PRICE'
  /** Sort by the `product_type` value. */
  | 'PRODUCT_TYPE'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT'
  /** Sort by the `vendor` value. */
  | 'VENDOR';

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariant = HasMetafields &
  Node & {
    __typename?: 'ProductVariant';
    /** Indicates if the product variant is available for sale. */
    availableForSale: Scalars['Boolean']['output'];
    /** The barcode (for example, ISBN, UPC, or GTIN) associated with the variant. */
    barcode?: Maybe<Scalars['String']['output']>;
    /** The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPrice` is higher than `price`. */
    compareAtPrice?: Maybe<MoneyV2>;
    /**
     * The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPriceV2` is higher than `priceV2`.
     * @deprecated Use `compareAtPrice` instead.
     */
    compareAtPriceV2?: Maybe<MoneyV2>;
    /**
     * List of bundles components included in the variant considering only fixed bundles.
     *
     */
    components: ProductVariantComponentConnection;
    /** Whether a product is out of stock but still available for purchase (used for backorders). */
    currentlyNotInStock: Scalars['Boolean']['output'];
    /**
     * List of bundles that include this variant considering only fixed bundles.
     *
     */
    groupedBy: ProductVariantConnection;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** Image associated with the product variant. This field falls back to the product image if no image is available. */
    image?: Maybe<Image>;
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield?: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** The product variant’s price. */
    price: MoneyV2;
    /**
     * The product variant’s price.
     * @deprecated Use `price` instead.
     */
    priceV2: MoneyV2;
    /** The product object that the product variant belongs to. */
    product: Product;
    /** The total sellable quantity of the variant for online sales channels. */
    quantityAvailable?: Maybe<Scalars['Int']['output']>;
    /** A list of quantity breaks for the product variant. */
    quantityPriceBreaks: QuantityPriceBreakConnection;
    /** The quantity rule for the product variant in a given context. */
    quantityRule: QuantityRule;
    /**
     * Whether a product variant requires components. The default value is `false`.
     * If `true`, then the product variant can only be purchased as a parent bundle with components.
     *
     */
    requiresComponents: Scalars['Boolean']['output'];
    /** Whether a customer needs to provide a shipping address when placing an order for the product variant. */
    requiresShipping: Scalars['Boolean']['output'];
    /** List of product options applied to the variant. */
    selectedOptions: Array<SelectedOption>;
    /** Represents an association between a variant and a selling plan. Selling plan allocations describe which selling plans are available for each variant, and what their impact is on pricing. */
    sellingPlanAllocations: SellingPlanAllocationConnection;
    /** The Shop Pay Installments pricing information for the product variant. */
    shopPayInstallmentsPricing?: Maybe<ShopPayInstallmentsProductVariantPricing>;
    /** The SKU (stock keeping unit) associated with the variant. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The in-store pickup availability of this variant by location. */
    storeAvailability: StoreAvailabilityConnection;
    /** Whether tax is charged when the product variant is sold. */
    taxable: Scalars['Boolean']['output'];
    /** The product variant’s title. */
    title: Scalars['String']['output'];
    /** The unit price value for the variant based on the variant's measurement. */
    unitPrice?: Maybe<MoneyV2>;
    /** The unit price measurement for the variant. */
    unitPriceMeasurement?: Maybe<UnitPriceMeasurement>;
    /** The weight of the product variant in the unit system specified with `weight_unit`. */
    weight?: Maybe<Scalars['Float']['output']>;
    /** Unit of measurement for weight. */
    weightUnit: WeightUnit;
  };

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantComponentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantGroupedByArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantQuantityPriceBreaksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantSellingPlanAllocationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ProductVariantStoreAvailabilityArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  near?: InputMaybe<GeoCoordinateInput>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * Represents a component of a bundle variant.
 *
 */
export type ProductVariantComponent = {
  __typename?: 'ProductVariantComponent';
  /** The product variant object that the component belongs to. */
  productVariant: ProductVariant;
  /** The quantity of component present in the bundle. */
  quantity: Scalars['Int']['output'];
};

/**
 * An auto-generated type for paginating through multiple ProductVariantComponents.
 *
 */
export type ProductVariantComponentConnection = {
  __typename?: 'ProductVariantComponentConnection';
  /** A list of edges. */
  edges: Array<ProductVariantComponentEdge>;
  /** A list of the nodes contained in ProductVariantComponentEdge. */
  nodes: Array<ProductVariantComponent>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one ProductVariantComponent and a cursor during pagination.
 *
 */
export type ProductVariantComponentEdge = {
  __typename?: 'ProductVariantComponentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of ProductVariantComponentEdge. */
  node: ProductVariantComponent;
};

/**
 * An auto-generated type for paginating through multiple ProductVariants.
 *
 */
export type ProductVariantConnection = {
  __typename?: 'ProductVariantConnection';
  /** A list of edges. */
  edges: Array<ProductVariantEdge>;
  /** A list of the nodes contained in ProductVariantEdge. */
  nodes: Array<ProductVariant>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one ProductVariant and a cursor during pagination.
 *
 */
export type ProductVariantEdge = {
  __typename?: 'ProductVariantEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of ProductVariantEdge. */
  node: ProductVariant;
};

/** The set of valid sort keys for the ProductVariant query. */
export type ProductVariantSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `position` value. */
  | 'POSITION'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `sku` value. */
  | 'SKU'
  /** Sort by the `title` value. */
  | 'TITLE';

/** Represents information about the buyer that is interacting with the cart. */
export type PurchasingCompany = {
  __typename?: 'PurchasingCompany';
  /** The company associated to the order or draft order. */
  company: Company;
  /** The company contact associated to the order or draft order. */
  contact?: Maybe<CompanyContact>;
  /** The company location associated to the order or draft order. */
  location: CompanyLocation;
};

/**
 * Quantity price breaks lets you offer different rates that are based on the
 * amount of a specific variant being ordered.
 *
 */
export type QuantityPriceBreak = {
  __typename?: 'QuantityPriceBreak';
  /**
   * Minimum quantity required to reach new quantity break price.
   *
   */
  minimumQuantity: Scalars['Int']['output'];
  /**
   * The price of variant after reaching the minimum quanity.
   *
   */
  price: MoneyV2;
};

/**
 * An auto-generated type for paginating through multiple QuantityPriceBreaks.
 *
 */
export type QuantityPriceBreakConnection = {
  __typename?: 'QuantityPriceBreakConnection';
  /** A list of edges. */
  edges: Array<QuantityPriceBreakEdge>;
  /** A list of the nodes contained in QuantityPriceBreakEdge. */
  nodes: Array<QuantityPriceBreak>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one QuantityPriceBreak and a cursor during pagination.
 *
 */
export type QuantityPriceBreakEdge = {
  __typename?: 'QuantityPriceBreakEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of QuantityPriceBreakEdge. */
  node: QuantityPriceBreak;
};

/**
 * The quantity rule for the product variant in a given context.
 *
 */
export type QuantityRule = {
  __typename?: 'QuantityRule';
  /**
   * The value that specifies the quantity increment between minimum and maximum of the rule.
   * Only quantities divisible by this value will be considered valid.
   *
   * The increment must be lower than or equal to the minimum and the maximum, and both minimum and maximum
   * must be divisible by this value.
   *
   */
  increment: Scalars['Int']['output'];
  /**
   * An optional value that defines the highest allowed quantity purchased by the customer.
   * If defined, maximum must be lower than or equal to the minimum and must be a multiple of the increment.
   *
   */
  maximum?: Maybe<Scalars['Int']['output']>;
  /**
   * The value that defines the lowest allowed quantity purchased by the customer.
   * The minimum must be a multiple of the quantity rule's increment.
   *
   */
  minimum: Scalars['Int']['output'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRoot = {
  __typename?: 'QueryRoot';
  /** Fetch a specific Article by its ID. */
  article?: Maybe<Article>;
  /** List of the shop's articles. */
  articles: ArticleConnection;
  /** Fetch a specific `Blog` by one of its unique attributes. */
  blog?: Maybe<Blog>;
  /**
   * Find a blog by its handle.
   * @deprecated Use `blog` instead.
   */
  blogByHandle?: Maybe<Blog>;
  /** List of the shop's blogs. */
  blogs: BlogConnection;
  /**
   * Retrieve a cart by its ID. For more information, refer to
   * [Manage a cart with the Storefront API](https://shopify.dev/custom-storefronts/cart/manage).
   *
   */
  cart?: Maybe<Cart>;
  /**
   * A poll for the status of the cart checkout completion and order creation.
   *
   */
  cartCompletionAttempt?: Maybe<CartCompletionAttemptResult>;
  /** Fetch a specific `Collection` by one of its unique attributes. */
  collection?: Maybe<Collection>;
  /**
   * Find a collection by its handle.
   * @deprecated Use `collection` instead.
   */
  collectionByHandle?: Maybe<Collection>;
  /** List of the shop’s collections. */
  collections: CollectionConnection;
  /**
   * The customer associated with the given access token. Tokens are obtained by using the
   * [`customerAccessTokenCreate` mutation](https://shopify.dev/docs/api/storefront/latest/mutations/customerAccessTokenCreate).
   *
   */
  customer?: Maybe<Customer>;
  /** Returns the localized experiences configured for the shop. */
  localization: Localization;
  /**
   * List of the shop's locations that support in-store pickup.
   *
   * When sorting by distance, you must specify a location via the `near` argument.
   *
   *
   */
  locations: LocationConnection;
  /** Retrieve a [navigation menu](https://help.shopify.com/manual/online-store/menus-and-links) by its handle. */
  menu?: Maybe<Menu>;
  /** Fetch a specific Metaobject by one of its unique identifiers. */
  metaobject?: Maybe<Metaobject>;
  /** All active metaobjects for the shop. */
  metaobjects: MetaobjectConnection;
  /** Returns a specific node by ID. */
  node?: Maybe<Node>;
  /** Returns the list of nodes with the given IDs. */
  nodes: Array<Maybe<Node>>;
  /** Fetch a specific `Page` by one of its unique attributes. */
  page?: Maybe<Page>;
  /**
   * Find a page by its handle.
   * @deprecated Use `page` instead.
   */
  pageByHandle?: Maybe<Page>;
  /** List of the shop's pages. */
  pages: PageConnection;
  /** Settings related to payments. */
  paymentSettings: PaymentSettings;
  /** List of the predictive search results. */
  predictiveSearch?: Maybe<PredictiveSearchResult>;
  /** Fetch a specific `Product` by one of its unique attributes. */
  product?: Maybe<Product>;
  /**
   * Find a product by its handle.
   * @deprecated Use `product` instead.
   */
  productByHandle?: Maybe<Product>;
  /**
   * Find recommended products related to a given `product_id`.
   * To learn more about how recommendations are generated, see
   * [*Showing product recommendations on product pages*](https://help.shopify.com/themes/development/recommended-products).
   *
   */
  productRecommendations?: Maybe<Array<Product>>;
  /**
   * Tags added to products.
   * Additional access scope required: unauthenticated_read_product_tags.
   *
   */
  productTags: StringConnection;
  /** List of product types for the shop's products that are published to your app. */
  productTypes: StringConnection;
  /** Returns a list of the shop's products. For storefront search, use the [`search`](https://shopify.dev/docs/api/storefront/latest/queries/search) query. */
  products: ProductConnection;
  /** The list of public Storefront API versions, including supported, release candidate and unstable versions. */
  publicApiVersions: Array<ApiVersion>;
  /** List of the search results. */
  search: SearchResultItemConnection;
  /** The shop associated with the storefront access token. */
  shop: Shop;
  /** Contains all fields required to generate sitemaps. */
  sitemap: Sitemap;
  /** A list of redirects for a shop. */
  urlRedirects: UrlRedirectConnection;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootArticleArgs = {
  id: Scalars['ID']['input'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootArticlesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ArticleSortKeys>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootBlogArgs = {
  handle?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootBlogByHandleArgs = {
  handle: Scalars['String']['input'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootBlogsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<BlogSortKeys>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootCartArgs = {
  id: Scalars['ID']['input'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootCartCompletionAttemptArgs = {
  attemptId: Scalars['String']['input'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootCollectionArgs = {
  handle?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootCollectionByHandleArgs = {
  handle: Scalars['String']['input'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootCollectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<CollectionSortKeys>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootCustomerArgs = {
  customerAccessToken: Scalars['String']['input'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootLocationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  near?: InputMaybe<GeoCoordinateInput>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<LocationSortKeys>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootMenuArgs = {
  handle: Scalars['String']['input'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootMetaobjectArgs = {
  handle?: InputMaybe<MetaobjectHandleInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootMetaobjectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootNodeArgs = {
  id: Scalars['ID']['input'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootPageArgs = {
  handle?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootPageByHandleArgs = {
  handle: Scalars['String']['input'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootPagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<PageSortKeys>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootPredictiveSearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  limitScope?: InputMaybe<PredictiveSearchLimitScope>;
  query: Scalars['String']['input'];
  searchableFields?: InputMaybe<Array<SearchableField>>;
  types?: InputMaybe<Array<PredictiveSearchType>>;
  unavailableProducts?: InputMaybe<SearchUnavailableProductsType>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootProductArgs = {
  handle?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootProductByHandleArgs = {
  handle: Scalars['String']['input'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootProductRecommendationsArgs = {
  intent?: InputMaybe<ProductRecommendationIntent>;
  productHandle?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootProductTagsArgs = {
  first: Scalars['Int']['input'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootProductTypesArgs = {
  first: Scalars['Int']['input'];
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ProductSortKeys>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootSearchArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  prefix?: InputMaybe<SearchPrefixQueryType>;
  productFilters?: InputMaybe<Array<ProductFilter>>;
  query: Scalars['String']['input'];
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<SearchSortKeys>;
  types?: InputMaybe<Array<SearchType>>;
  unavailableProducts?: InputMaybe<SearchUnavailableProductsType>;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootSitemapArgs = {
  type: SitemapType;
};

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type QueryRootUrlRedirectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** SEO information. */
export type Seo = {
  __typename?: 'SEO';
  /** The meta description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The SEO title. */
  title?: Maybe<Scalars['String']['output']>;
};

/**
 * Script discount applications capture the intentions of a discount that
 * was created by a Shopify Script.
 *
 */
export type ScriptDiscountApplication = DiscountApplication & {
  __typename?: 'ScriptDiscountApplication';
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the application as defined by the Script. */
  title: Scalars['String']['output'];
  /** The value of the discount application. */
  value: PricingValue;
};

/** Specifies whether to perform a partial word match on the last search term. */
export type SearchPrefixQueryType =
  /** Perform a partial word match on the last search term. */
  | 'LAST'
  /** Don't perform a partial word match on the last search term. */
  | 'NONE';

/** A search query suggestion. */
export type SearchQuerySuggestion = Trackable & {
  __typename?: 'SearchQuerySuggestion';
  /** The text of the search query suggestion with highlighted HTML tags. */
  styledText: Scalars['String']['output'];
  /** The text of the search query suggestion. */
  text: Scalars['String']['output'];
  /** URL parameters to be added to a page URL to track the origin of on-site search traffic for [analytics reporting](https://help.shopify.com/manual/reports-and-analytics/shopify-reports/report-types/default-reports/behaviour-reports). Returns a result when accessed through the [search](https://shopify.dev/docs/api/storefront/current/queries/search) or [predictiveSearch](https://shopify.dev/docs/api/storefront/current/queries/predictiveSearch) queries, otherwise returns null. */
  trackingParameters?: Maybe<Scalars['String']['output']>;
};

/**
 * A search result that matches the search query.
 *
 */
export type SearchResultItem = Article | Page | Product;

/**
 * An auto-generated type for paginating through multiple SearchResultItems.
 *
 */
export type SearchResultItemConnection = {
  __typename?: 'SearchResultItemConnection';
  /** A list of edges. */
  edges: Array<SearchResultItemEdge>;
  /** A list of the nodes contained in SearchResultItemEdge. */
  nodes: Array<SearchResultItem>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of available filters. */
  productFilters: Array<Filter>;
  /** The total number of results. */
  totalCount: Scalars['Int']['output'];
};

/**
 * An auto-generated type which holds one SearchResultItem and a cursor during pagination.
 *
 */
export type SearchResultItemEdge = {
  __typename?: 'SearchResultItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of SearchResultItemEdge. */
  node: SearchResultItem;
};

/** The set of valid sort keys for the search query. */
export type SearchSortKeys =
  /** Sort by the `price` value. */
  | 'PRICE'
  /** Sort by relevance to the search terms. */
  | 'RELEVANCE';

/** The types of search items to perform search within. */
export type SearchType =
  /** Returns matching articles. */
  | 'ARTICLE'
  /** Returns matching pages. */
  | 'PAGE'
  /** Returns matching products. */
  | 'PRODUCT';

/** Specifies whether to display results for unavailable products. */
export type SearchUnavailableProductsType =
  /** Exclude unavailable products. */
  | 'HIDE'
  /** Show unavailable products after all other matching results. This is the default. */
  | 'LAST'
  /** Show unavailable products in the order that they're found. */
  | 'SHOW';

/** Specifies the list of resource fields to search. */
export type SearchableField =
  /** Author of the page or article. */
  | 'AUTHOR'
  /** Body of the page or article or product description or collection description. */
  | 'BODY'
  /** Product type. */
  | 'PRODUCT_TYPE'
  /** Tag associated with the product or article. */
  | 'TAG'
  /** Title of the page or article or product title or collection title. */
  | 'TITLE'
  /** Variant barcode. */
  | 'VARIANTS_BARCODE'
  /** Variant SKU. */
  | 'VARIANTS_SKU'
  /** Variant title. */
  | 'VARIANTS_TITLE'
  /** Product vendor. */
  | 'VENDOR';

/**
 * Properties used by customers to select a product variant.
 * Products can have multiple options, like different sizes or colors.
 *
 */
export type SelectedOption = {
  __typename?: 'SelectedOption';
  /** The product option’s name. */
  name: Scalars['String']['output'];
  /** The product option’s value. */
  value: Scalars['String']['output'];
};

/** The input fields required for a selected option. */
export type SelectedOptionInput = {
  /** The product option’s name. */
  name: Scalars['String']['input'];
  /** The product option’s value. */
  value: Scalars['String']['input'];
};

/** Represents how products and variants can be sold and purchased. */
export type SellingPlan = HasMetafields & {
  __typename?: 'SellingPlan';
  /** The billing policy for the selling plan. */
  billingPolicy?: Maybe<SellingPlanBillingPolicy>;
  /** The initial payment due for the purchase. */
  checkoutCharge: SellingPlanCheckoutCharge;
  /** The delivery policy for the selling plan. */
  deliveryPolicy?: Maybe<SellingPlanDeliveryPolicy>;
  /** The description of the selling plan. */
  description?: Maybe<Scalars['String']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
  metafield?: Maybe<Metafield>;
  /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
  metafields: Array<Maybe<Metafield>>;
  /** The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'. */
  name: Scalars['String']['output'];
  /** The selling plan options available in the drop-down list in the storefront. For example, 'Delivery every week' or 'Delivery every 2 weeks' specifies the delivery frequency options for the product. Individual selling plans contribute their options to the associated selling plan group. For example, a selling plan group might have an option called `option1: Delivery every`. One selling plan in that group could contribute `option1: 2 weeks` with the pricing for that option, and another selling plan could contribute `option1: 4 weeks`, with different pricing. */
  options: Array<SellingPlanOption>;
  /** The price adjustments that a selling plan makes when a variant is purchased with a selling plan. */
  priceAdjustments: Array<SellingPlanPriceAdjustment>;
  /** Whether purchasing the selling plan will result in multiple deliveries. */
  recurringDeliveries: Scalars['Boolean']['output'];
};

/** Represents how products and variants can be sold and purchased. */
export type SellingPlanMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** Represents how products and variants can be sold and purchased. */
export type SellingPlanMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** Represents an association between a variant and a selling plan. Selling plan allocations describe the options offered for each variant, and the price of the variant when purchased with a selling plan. */
export type SellingPlanAllocation = {
  __typename?: 'SellingPlanAllocation';
  /** The checkout charge amount due for the purchase. */
  checkoutChargeAmount: MoneyV2;
  /** A list of price adjustments, with a maximum of two. When there are two, the first price adjustment goes into effect at the time of purchase, while the second one starts after a certain number of orders. A price adjustment represents how a selling plan affects pricing when a variant is purchased with a selling plan. Prices display in the customer's currency if the shop is configured for it. */
  priceAdjustments: Array<SellingPlanAllocationPriceAdjustment>;
  /** The remaining balance charge amount due for the purchase. */
  remainingBalanceChargeAmount: MoneyV2;
  /** A representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'. */
  sellingPlan: SellingPlan;
};

/**
 * An auto-generated type for paginating through multiple SellingPlanAllocations.
 *
 */
export type SellingPlanAllocationConnection = {
  __typename?: 'SellingPlanAllocationConnection';
  /** A list of edges. */
  edges: Array<SellingPlanAllocationEdge>;
  /** A list of the nodes contained in SellingPlanAllocationEdge. */
  nodes: Array<SellingPlanAllocation>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one SellingPlanAllocation and a cursor during pagination.
 *
 */
export type SellingPlanAllocationEdge = {
  __typename?: 'SellingPlanAllocationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of SellingPlanAllocationEdge. */
  node: SellingPlanAllocation;
};

/** The resulting prices for variants when they're purchased with a specific selling plan. */
export type SellingPlanAllocationPriceAdjustment = {
  __typename?: 'SellingPlanAllocationPriceAdjustment';
  /** The price of the variant when it's purchased without a selling plan for the same number of deliveries. For example, if a customer purchases 6 deliveries of $10.00 granola separately, then the price is 6 x $10.00 = $60.00. */
  compareAtPrice: MoneyV2;
  /** The effective price for a single delivery. For example, for a prepaid subscription plan that includes 6 deliveries at the price of $48.00, the per delivery price is $8.00. */
  perDeliveryPrice: MoneyV2;
  /** The price of the variant when it's purchased with a selling plan For example, for a prepaid subscription plan that includes 6 deliveries of $10.00 granola, where the customer gets 20% off, the price is 6 x $10.00 x 0.80 = $48.00. */
  price: MoneyV2;
  /** The resulting price per unit for the variant associated with the selling plan. If the variant isn't sold by quantity or measurement, then this field returns `null`. */
  unitPrice?: Maybe<MoneyV2>;
};

/** The selling plan billing policy. */
export type SellingPlanBillingPolicy = SellingPlanRecurringBillingPolicy;

/** The initial payment due for the purchase. */
export type SellingPlanCheckoutCharge = {
  __typename?: 'SellingPlanCheckoutCharge';
  /** The charge type for the checkout charge. */
  type: SellingPlanCheckoutChargeType;
  /** The charge value for the checkout charge. */
  value: SellingPlanCheckoutChargeValue;
};

/** The percentage value of the price used for checkout charge. */
export type SellingPlanCheckoutChargePercentageValue = {
  __typename?: 'SellingPlanCheckoutChargePercentageValue';
  /** The percentage value of the price used for checkout charge. */
  percentage: Scalars['Float']['output'];
};

/** The checkout charge when the full amount isn't charged at checkout. */
export type SellingPlanCheckoutChargeType =
  /** The checkout charge is a percentage of the product or variant price. */
  | 'PERCENTAGE'
  /** The checkout charge is a fixed price amount. */
  | 'PRICE';

/** The portion of the price to be charged at checkout. */
export type SellingPlanCheckoutChargeValue =
  | MoneyV2
  | SellingPlanCheckoutChargePercentageValue;

/**
 * An auto-generated type for paginating through multiple SellingPlans.
 *
 */
export type SellingPlanConnection = {
  __typename?: 'SellingPlanConnection';
  /** A list of edges. */
  edges: Array<SellingPlanEdge>;
  /** A list of the nodes contained in SellingPlanEdge. */
  nodes: Array<SellingPlan>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** The selling plan delivery policy. */
export type SellingPlanDeliveryPolicy = SellingPlanRecurringDeliveryPolicy;

/**
 * An auto-generated type which holds one SellingPlan and a cursor during pagination.
 *
 */
export type SellingPlanEdge = {
  __typename?: 'SellingPlanEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of SellingPlanEdge. */
  node: SellingPlan;
};

/** A fixed amount that's deducted from the original variant price. For example, $10.00 off. */
export type SellingPlanFixedAmountPriceAdjustment = {
  __typename?: 'SellingPlanFixedAmountPriceAdjustment';
  /** The money value of the price adjustment. */
  adjustmentAmount: MoneyV2;
};

/** A fixed price adjustment for a variant that's purchased with a selling plan. */
export type SellingPlanFixedPriceAdjustment = {
  __typename?: 'SellingPlanFixedPriceAdjustment';
  /** A new price of the variant when it's purchased with the selling plan. */
  price: MoneyV2;
};

/** Represents a selling method. For example, 'Subscribe and save' is a selling method where customers pay for goods or services per delivery. A selling plan group contains individual selling plans. */
export type SellingPlanGroup = {
  __typename?: 'SellingPlanGroup';
  /** A display friendly name for the app that created the selling plan group. */
  appName?: Maybe<Scalars['String']['output']>;
  /** The name of the selling plan group. */
  name: Scalars['String']['output'];
  /** Represents the selling plan options available in the drop-down list in the storefront. For example, 'Delivery every week' or 'Delivery every 2 weeks' specifies the delivery frequency options for the product. */
  options: Array<SellingPlanGroupOption>;
  /** A list of selling plans in a selling plan group. A selling plan is a representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'. */
  sellingPlans: SellingPlanConnection;
};

/** Represents a selling method. For example, 'Subscribe and save' is a selling method where customers pay for goods or services per delivery. A selling plan group contains individual selling plans. */
export type SellingPlanGroupSellingPlansArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * An auto-generated type for paginating through multiple SellingPlanGroups.
 *
 */
export type SellingPlanGroupConnection = {
  __typename?: 'SellingPlanGroupConnection';
  /** A list of edges. */
  edges: Array<SellingPlanGroupEdge>;
  /** A list of the nodes contained in SellingPlanGroupEdge. */
  nodes: Array<SellingPlanGroup>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one SellingPlanGroup and a cursor during pagination.
 *
 */
export type SellingPlanGroupEdge = {
  __typename?: 'SellingPlanGroupEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of SellingPlanGroupEdge. */
  node: SellingPlanGroup;
};

/**
 * Represents an option on a selling plan group that's available in the drop-down list in the storefront.
 *
 * Individual selling plans contribute their options to the associated selling plan group. For example, a selling plan group might have an option called `option1: Delivery every`. One selling plan in that group could contribute `option1: 2 weeks` with the pricing for that option, and another selling plan could contribute `option1: 4 weeks`, with different pricing.
 */
export type SellingPlanGroupOption = {
  __typename?: 'SellingPlanGroupOption';
  /** The name of the option. For example, 'Delivery every'. */
  name: Scalars['String']['output'];
  /** The values for the options specified by the selling plans in the selling plan group. For example, '1 week', '2 weeks', '3 weeks'. */
  values: Array<Scalars['String']['output']>;
};

/** Represents a valid selling plan interval. */
export type SellingPlanInterval =
  /** Day interval. */
  | 'DAY'
  /** Month interval. */
  | 'MONTH'
  /** Week interval. */
  | 'WEEK'
  /** Year interval. */
  | 'YEAR';

/** An option provided by a Selling Plan. */
export type SellingPlanOption = {
  __typename?: 'SellingPlanOption';
  /** The name of the option (ie "Delivery every"). */
  name?: Maybe<Scalars['String']['output']>;
  /** The value of the option (ie "Month"). */
  value?: Maybe<Scalars['String']['output']>;
};

/** A percentage amount that's deducted from the original variant price. For example, 10% off. */
export type SellingPlanPercentagePriceAdjustment = {
  __typename?: 'SellingPlanPercentagePriceAdjustment';
  /** The percentage value of the price adjustment. */
  adjustmentPercentage: Scalars['Float']['output'];
};

/** Represents by how much the price of a variant associated with a selling plan is adjusted. Each variant can have up to two price adjustments. If a variant has multiple price adjustments, then the first price adjustment applies when the variant is initially purchased. The second price adjustment applies after a certain number of orders (specified by the `orderCount` field) are made. If a selling plan doesn't have any price adjustments, then the unadjusted price of the variant is the effective price. */
export type SellingPlanPriceAdjustment = {
  __typename?: 'SellingPlanPriceAdjustment';
  /** The type of price adjustment. An adjustment value can have one of three types: percentage, amount off, or a new price. */
  adjustmentValue: SellingPlanPriceAdjustmentValue;
  /** The number of orders that the price adjustment applies to. If the price adjustment always applies, then this field is `null`. */
  orderCount?: Maybe<Scalars['Int']['output']>;
};

/** Represents by how much the price of a variant associated with a selling plan is adjusted. Each variant can have up to two price adjustments. */
export type SellingPlanPriceAdjustmentValue =
  | SellingPlanFixedAmountPriceAdjustment
  | SellingPlanFixedPriceAdjustment
  | SellingPlanPercentagePriceAdjustment;

/** The recurring billing policy for the selling plan. */
export type SellingPlanRecurringBillingPolicy = {
  __typename?: 'SellingPlanRecurringBillingPolicy';
  /** The billing frequency, it can be either: day, week, month or year. */
  interval: SellingPlanInterval;
  /** The number of intervals between billings. */
  intervalCount: Scalars['Int']['output'];
};

/** The recurring delivery policy for the selling plan. */
export type SellingPlanRecurringDeliveryPolicy = {
  __typename?: 'SellingPlanRecurringDeliveryPolicy';
  /** The delivery frequency, it can be either: day, week, month or year. */
  interval: SellingPlanInterval;
  /** The number of intervals between deliveries. */
  intervalCount: Scalars['Int']['output'];
};

/** Shop represents a collection of the general settings and information about the shop. */
export type Shop = HasMetafields &
  Node & {
    __typename?: 'Shop';
    /** The shop's branding configuration. */
    brand?: Maybe<Brand>;
    /** A description of the shop. */
    description?: Maybe<Scalars['String']['output']>;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** A [custom field](https://shopify.dev/docs/apps/build/custom-data), including its `namespace` and `key`, that's associated with a Shopify resource for the purposes of adding and storing additional information. */
    metafield?: Maybe<Metafield>;
    /** A list of [custom fields](/docs/apps/build/custom-data) that a merchant associates with a Shopify resource. */
    metafields: Array<Maybe<Metafield>>;
    /** A string representing the way currency is formatted when the currency isn’t specified. */
    moneyFormat: Scalars['String']['output'];
    /** The shop’s name. */
    name: Scalars['String']['output'];
    /** Settings related to payments. */
    paymentSettings: PaymentSettings;
    /** The primary domain of the shop’s Online Store. */
    primaryDomain: Domain;
    /** The shop’s privacy policy. */
    privacyPolicy?: Maybe<ShopPolicy>;
    /** The shop’s refund policy. */
    refundPolicy?: Maybe<ShopPolicy>;
    /** The shop’s shipping policy. */
    shippingPolicy?: Maybe<ShopPolicy>;
    /** Countries that the shop ships to. */
    shipsToCountries: Array<CountryCode>;
    /** The Shop Pay Installments pricing information for the shop. */
    shopPayInstallmentsPricing?: Maybe<ShopPayInstallmentsPricing>;
    /** The shop’s subscription policy. */
    subscriptionPolicy?: Maybe<ShopPolicyWithDefault>;
    /** The shop’s terms of service. */
    termsOfService?: Maybe<ShopPolicy>;
  };

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** The financing plan in Shop Pay Installments. */
export type ShopPayInstallmentsFinancingPlan = Node & {
  __typename?: 'ShopPayInstallmentsFinancingPlan';
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The maximum price to qualify for the financing plan. */
  maxPrice: MoneyV2;
  /** The minimum price to qualify for the financing plan. */
  minPrice: MoneyV2;
  /** The terms of the financing plan. */
  terms: Array<ShopPayInstallmentsFinancingPlanTerm>;
};

/** The payment frequency for a Shop Pay Installments Financing Plan. */
export type ShopPayInstallmentsFinancingPlanFrequency =
  /** Monthly payment frequency. */
  | 'MONTHLY'
  /** Weekly payment frequency. */
  | 'WEEKLY';

/** The terms of the financing plan in Shop Pay Installments. */
export type ShopPayInstallmentsFinancingPlanTerm = Node & {
  __typename?: 'ShopPayInstallmentsFinancingPlanTerm';
  /** The annual percentage rate (APR) of the financing plan. */
  apr: Scalars['Int']['output'];
  /** The payment frequency for the financing plan. */
  frequency: ShopPayInstallmentsFinancingPlanFrequency;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The number of installments for the financing plan. */
  installmentsCount?: Maybe<Count>;
  /** The type of loan for the financing plan. */
  loanType: ShopPayInstallmentsLoan;
};

/** The loan type for a Shop Pay Installments Financing Plan Term. */
export type ShopPayInstallmentsLoan =
  /** An interest-bearing loan type. */
  | 'INTEREST'
  /** A split-pay loan type. */
  | 'SPLIT_PAY'
  /** A zero-percent loan type. */
  | 'ZERO_PERCENT';

/** The result for a Shop Pay Installments pricing request. */
export type ShopPayInstallmentsPricing = {
  __typename?: 'ShopPayInstallmentsPricing';
  /** The financing plans available for the given price range. */
  financingPlans: Array<ShopPayInstallmentsFinancingPlan>;
  /** The maximum price to qualify for financing. */
  maxPrice: MoneyV2;
  /** The minimum price to qualify for financing. */
  minPrice: MoneyV2;
};

/** The shop pay installments pricing information for a product variant. */
export type ShopPayInstallmentsProductVariantPricing = Node & {
  __typename?: 'ShopPayInstallmentsProductVariantPricing';
  /** Whether the product variant is available. */
  available: Scalars['Boolean']['output'];
  /** Whether the product variant is eligible for Shop Pay Installments. */
  eligible: Scalars['Boolean']['output'];
  /** The full price of the product variant. */
  fullPrice: MoneyV2;
  /** The ID of the product variant. */
  id: Scalars['ID']['output'];
  /** The number of payment terms available for the product variant. */
  installmentsCount?: Maybe<Count>;
  /** The price per term for the product variant. */
  pricePerTerm: MoneyV2;
};

/** Represents a Shop Pay payment request. */
export type ShopPayPaymentRequest = {
  __typename?: 'ShopPayPaymentRequest';
  /** The delivery methods for the payment request. */
  deliveryMethods: Array<ShopPayPaymentRequestDeliveryMethod>;
  /** The discount codes for the payment request. */
  discountCodes: Array<Scalars['String']['output']>;
  /** The discounts for the payment request order. */
  discounts?: Maybe<Array<ShopPayPaymentRequestDiscount>>;
  /** The line items for the payment request. */
  lineItems: Array<ShopPayPaymentRequestLineItem>;
  /** The locale for the payment request. */
  locale: Scalars['String']['output'];
  /** The presentment currency for the payment request. */
  presentmentCurrency: CurrencyCode;
  /** The delivery method type for the payment request. */
  selectedDeliveryMethodType: ShopPayPaymentRequestDeliveryMethodType;
  /** The shipping address for the payment request. */
  shippingAddress?: Maybe<ShopPayPaymentRequestContactField>;
  /** The shipping lines for the payment request. */
  shippingLines: Array<ShopPayPaymentRequestShippingLine>;
  /** The subtotal amount for the payment request. */
  subtotal: MoneyV2;
  /** The total amount for the payment request. */
  total: MoneyV2;
  /** The total shipping price for the payment request. */
  totalShippingPrice?: Maybe<ShopPayPaymentRequestTotalShippingPrice>;
  /** The total tax for the payment request. */
  totalTax?: Maybe<MoneyV2>;
};

/** Represents a contact field for a Shop Pay payment request. */
export type ShopPayPaymentRequestContactField = {
  __typename?: 'ShopPayPaymentRequestContactField';
  /** The first address line of the contact field. */
  address1: Scalars['String']['output'];
  /** The second address line of the contact field. */
  address2?: Maybe<Scalars['String']['output']>;
  /** The city of the contact field. */
  city: Scalars['String']['output'];
  /** The company name of the contact field. */
  companyName?: Maybe<Scalars['String']['output']>;
  /** The country of the contact field. */
  countryCode: Scalars['String']['output'];
  /** The email of the contact field. */
  email?: Maybe<Scalars['String']['output']>;
  /** The first name of the contact field. */
  firstName: Scalars['String']['output'];
  /** The first name of the contact field. */
  lastName: Scalars['String']['output'];
  /** The phone number of the contact field. */
  phone?: Maybe<Scalars['String']['output']>;
  /** The postal code of the contact field. */
  postalCode?: Maybe<Scalars['String']['output']>;
  /** The province of the contact field. */
  provinceCode?: Maybe<Scalars['String']['output']>;
};

/** Represents a delivery method for a Shop Pay payment request. */
export type ShopPayPaymentRequestDeliveryMethod = {
  __typename?: 'ShopPayPaymentRequestDeliveryMethod';
  /** The amount for the delivery method. */
  amount: MoneyV2;
  /** The code of the delivery method. */
  code: Scalars['String']['output'];
  /** The detail about when the delivery may be expected. */
  deliveryExpectationLabel?: Maybe<Scalars['String']['output']>;
  /** The detail of the delivery method. */
  detail?: Maybe<Scalars['String']['output']>;
  /** The label of the delivery method. */
  label: Scalars['String']['output'];
  /** The maximum delivery date for the delivery method. */
  maxDeliveryDate?: Maybe<Scalars['ISO8601DateTime']['output']>;
  /** The minimum delivery date for the delivery method. */
  minDeliveryDate?: Maybe<Scalars['ISO8601DateTime']['output']>;
};

/** The input fields to create a delivery method for a Shop Pay payment request. */
export type ShopPayPaymentRequestDeliveryMethodInput = {
  /** The amount for the delivery method. */
  amount?: InputMaybe<MoneyInput>;
  /** The code of the delivery method. */
  code?: InputMaybe<Scalars['String']['input']>;
  /** The detail about when the delivery may be expected. */
  deliveryExpectationLabel?: InputMaybe<Scalars['String']['input']>;
  /** The detail of the delivery method. */
  detail?: InputMaybe<Scalars['String']['input']>;
  /** The label of the delivery method. */
  label?: InputMaybe<Scalars['String']['input']>;
  /** The maximum delivery date for the delivery method. */
  maxDeliveryDate?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  /** The minimum delivery date for the delivery method. */
  minDeliveryDate?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
};

/** Represents the delivery method type for a Shop Pay payment request. */
export type ShopPayPaymentRequestDeliveryMethodType =
  /** The delivery method type is pickup. */
  | 'PICKUP'
  /** The delivery method type is shipping. */
  | 'SHIPPING';

/** Represents a discount for a Shop Pay payment request. */
export type ShopPayPaymentRequestDiscount = {
  __typename?: 'ShopPayPaymentRequestDiscount';
  /** The amount of the discount. */
  amount: MoneyV2;
  /** The label of the discount. */
  label: Scalars['String']['output'];
};

/** The input fields to create a discount for a Shop Pay payment request. */
export type ShopPayPaymentRequestDiscountInput = {
  /** The amount of the discount. */
  amount?: InputMaybe<MoneyInput>;
  /** The label of the discount. */
  label?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an image for a Shop Pay payment request line item. */
export type ShopPayPaymentRequestImage = {
  __typename?: 'ShopPayPaymentRequestImage';
  /** The alt text of the image. */
  alt?: Maybe<Scalars['String']['output']>;
  /** The source URL of the image. */
  url: Scalars['String']['output'];
};

/** The input fields to create an image for a Shop Pay payment request. */
export type ShopPayPaymentRequestImageInput = {
  /** The alt text of the image. */
  alt?: InputMaybe<Scalars['String']['input']>;
  /** The source URL of the image. */
  url: Scalars['String']['input'];
};

/** The input fields represent a Shop Pay payment request. */
export type ShopPayPaymentRequestInput = {
  /**
   * The delivery methods for the payment request.
   *
   * The input must not contain more than `250` values.
   */
  deliveryMethods?: InputMaybe<Array<ShopPayPaymentRequestDeliveryMethodInput>>;
  /**
   * The discount codes for the payment request.
   *
   * The input must not contain more than `250` values.
   */
  discountCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * The discounts for the payment request order.
   *
   * The input must not contain more than `250` values.
   */
  discounts?: InputMaybe<Array<ShopPayPaymentRequestDiscountInput>>;
  /**
   * The line items for the payment request.
   *
   * The input must not contain more than `250` values.
   */
  lineItems?: InputMaybe<Array<ShopPayPaymentRequestLineItemInput>>;
  /** The locale for the payment request. */
  locale: Scalars['String']['input'];
  /** The encrypted payment method for the payment request. */
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  /** The presentment currency for the payment request. */
  presentmentCurrency: CurrencyCode;
  /** The delivery method type for the payment request. */
  selectedDeliveryMethodType?: InputMaybe<ShopPayPaymentRequestDeliveryMethodType>;
  /**
   * The shipping lines for the payment request.
   *
   * The input must not contain more than `250` values.
   */
  shippingLines?: InputMaybe<Array<ShopPayPaymentRequestShippingLineInput>>;
  /** The subtotal amount for the payment request. */
  subtotal: MoneyInput;
  /** The total amount for the payment request. */
  total: MoneyInput;
  /** The total shipping price for the payment request. */
  totalShippingPrice?: InputMaybe<ShopPayPaymentRequestTotalShippingPriceInput>;
  /** The total tax for the payment request. */
  totalTax?: InputMaybe<MoneyInput>;
};

/** Represents a line item for a Shop Pay payment request. */
export type ShopPayPaymentRequestLineItem = {
  __typename?: 'ShopPayPaymentRequestLineItem';
  /** The final item price for the line item. */
  finalItemPrice: MoneyV2;
  /** The final line price for the line item. */
  finalLinePrice: MoneyV2;
  /** The image of the line item. */
  image?: Maybe<ShopPayPaymentRequestImage>;
  /** The item discounts for the line item. */
  itemDiscounts?: Maybe<Array<ShopPayPaymentRequestDiscount>>;
  /** The label of the line item. */
  label: Scalars['String']['output'];
  /** The line discounts for the line item. */
  lineDiscounts?: Maybe<Array<ShopPayPaymentRequestDiscount>>;
  /** The original item price for the line item. */
  originalItemPrice?: Maybe<MoneyV2>;
  /** The original line price for the line item. */
  originalLinePrice?: Maybe<MoneyV2>;
  /** The quantity of the line item. */
  quantity: Scalars['Int']['output'];
  /** Whether the line item requires shipping. */
  requiresShipping?: Maybe<Scalars['Boolean']['output']>;
  /** The SKU of the line item. */
  sku?: Maybe<Scalars['String']['output']>;
};

/** The input fields to create a line item for a Shop Pay payment request. */
export type ShopPayPaymentRequestLineItemInput = {
  /** The final item price for the line item. */
  finalItemPrice?: InputMaybe<MoneyInput>;
  /** The final line price for the line item. */
  finalLinePrice?: InputMaybe<MoneyInput>;
  /** The image of the line item. */
  image?: InputMaybe<ShopPayPaymentRequestImageInput>;
  /**
   * The item discounts for the line item.
   *
   * The input must not contain more than `250` values.
   */
  itemDiscounts?: InputMaybe<Array<ShopPayPaymentRequestDiscountInput>>;
  /** The label of the line item. */
  label?: InputMaybe<Scalars['String']['input']>;
  /**
   * The line discounts for the line item.
   *
   * The input must not contain more than `250` values.
   */
  lineDiscounts?: InputMaybe<Array<ShopPayPaymentRequestDiscountInput>>;
  /** The original item price for the line item. */
  originalItemPrice?: InputMaybe<MoneyInput>;
  /** The original line price for the line item. */
  originalLinePrice?: InputMaybe<MoneyInput>;
  /** The quantity of the line item. */
  quantity: Scalars['Int']['input'];
  /** Whether the line item requires shipping. */
  requiresShipping?: InputMaybe<Scalars['Boolean']['input']>;
  /** The SKU of the line item. */
  sku?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a receipt for a Shop Pay payment request. */
export type ShopPayPaymentRequestReceipt = {
  __typename?: 'ShopPayPaymentRequestReceipt';
  /** The payment request object. */
  paymentRequest: ShopPayPaymentRequest;
  /** The processing status. */
  processingStatusType: Scalars['String']['output'];
  /** The token of the receipt. */
  token: Scalars['String']['output'];
};

/** Represents a Shop Pay payment request session. */
export type ShopPayPaymentRequestSession = {
  __typename?: 'ShopPayPaymentRequestSession';
  /** The checkout URL of the Shop Pay payment request session. */
  checkoutUrl: Scalars['URL']['output'];
  /** The payment request associated with the Shop Pay payment request session. */
  paymentRequest: ShopPayPaymentRequest;
  /** The source identifier of the Shop Pay payment request session. */
  sourceIdentifier: Scalars['String']['output'];
  /** The token of the Shop Pay payment request session. */
  token: Scalars['String']['output'];
};

/** Return type for `shopPayPaymentRequestSessionCreate` mutation. */
export type ShopPayPaymentRequestSessionCreatePayload = {
  __typename?: 'ShopPayPaymentRequestSessionCreatePayload';
  /** The new Shop Pay payment request session object. */
  shopPayPaymentRequestSession?: Maybe<ShopPayPaymentRequestSession>;
  /** Error codes for failed Shop Pay payment request session mutations. */
  userErrors: Array<UserErrorsShopPayPaymentRequestSessionUserErrors>;
};

/** Return type for `shopPayPaymentRequestSessionSubmit` mutation. */
export type ShopPayPaymentRequestSessionSubmitPayload = {
  __typename?: 'ShopPayPaymentRequestSessionSubmitPayload';
  /** The checkout on which the payment was applied. */
  paymentRequestReceipt?: Maybe<ShopPayPaymentRequestReceipt>;
  /** Error codes for failed Shop Pay payment request session mutations. */
  userErrors: Array<UserErrorsShopPayPaymentRequestSessionUserErrors>;
};

/** Represents a shipping line for a Shop Pay payment request. */
export type ShopPayPaymentRequestShippingLine = {
  __typename?: 'ShopPayPaymentRequestShippingLine';
  /** The amount for the shipping line. */
  amount: MoneyV2;
  /** The code of the shipping line. */
  code: Scalars['String']['output'];
  /** The label of the shipping line. */
  label: Scalars['String']['output'];
};

/** The input fields to create a shipping line for a Shop Pay payment request. */
export type ShopPayPaymentRequestShippingLineInput = {
  /** The amount for the shipping line. */
  amount?: InputMaybe<MoneyInput>;
  /** The code of the shipping line. */
  code?: InputMaybe<Scalars['String']['input']>;
  /** The label of the shipping line. */
  label?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a shipping total for a Shop Pay payment request. */
export type ShopPayPaymentRequestTotalShippingPrice = {
  __typename?: 'ShopPayPaymentRequestTotalShippingPrice';
  /** The discounts for the shipping total. */
  discounts: Array<ShopPayPaymentRequestDiscount>;
  /** The final total for the shipping total. */
  finalTotal: MoneyV2;
  /** The original total for the shipping total. */
  originalTotal?: Maybe<MoneyV2>;
};

/** The input fields to create a shipping total for a Shop Pay payment request. */
export type ShopPayPaymentRequestTotalShippingPriceInput = {
  /**
   * The discounts for the shipping total.
   *
   * The input must not contain more than `250` values.
   */
  discounts?: InputMaybe<Array<ShopPayPaymentRequestDiscountInput>>;
  /** The final total for the shipping total. */
  finalTotal?: InputMaybe<MoneyInput>;
  /** The original total for the shipping total. */
  originalTotal?: InputMaybe<MoneyInput>;
};

/**
 * The input fields for submitting Shop Pay payment method information for checkout.
 *
 */
export type ShopPayWalletContentInput = {
  /** The customer's billing address. */
  billingAddress: MailingAddressInput;
  /** Session token for transaction. */
  sessionToken: Scalars['String']['input'];
};

/** Policy that a merchant has configured for their store, such as their refund or privacy policy. */
export type ShopPolicy = Node & {
  __typename?: 'ShopPolicy';
  /** Policy text, maximum size of 64kb. */
  body: Scalars['String']['output'];
  /** Policy’s handle. */
  handle: Scalars['String']['output'];
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** Policy’s title. */
  title: Scalars['String']['output'];
  /** Public URL to the policy. */
  url: Scalars['URL']['output'];
};

/**
 * A policy for the store that comes with a default value, such as a subscription policy.
 * If the merchant hasn't configured a policy for their store, then the policy will return the default value.
 * Otherwise, the policy will return the merchant-configured value.
 *
 */
export type ShopPolicyWithDefault = {
  __typename?: 'ShopPolicyWithDefault';
  /** The text of the policy. Maximum size: 64KB. */
  body: Scalars['String']['output'];
  /** The handle of the policy. */
  handle: Scalars['String']['output'];
  /** The unique ID of the policy. A default policy doesn't have an ID. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The title of the policy. */
  title: Scalars['String']['output'];
  /** Public URL to the policy. */
  url: Scalars['URL']['output'];
};

/** Contains all fields required to generate sitemaps. */
export type Sitemap = {
  __typename?: 'Sitemap';
  /** The number of sitemap's pages for a given type. */
  pagesCount?: Maybe<Count>;
  /**
   * A list of sitemap's resources for a given type.
   *
   * Important Notes:
   *   - The number of items per page varies from 0 to 250.
   *   - Empty pages (0 items) may occur and do not necessarily indicate the end of results.
   *   - Always check `hasNextPage` to determine if more pages are available.
   *
   */
  resources?: Maybe<PaginatedSitemapResources>;
};

/** Contains all fields required to generate sitemaps. */
export type SitemapResourcesArgs = {
  page: Scalars['Int']['input'];
};

/** Represents a sitemap's image. */
export type SitemapImage = {
  __typename?: 'SitemapImage';
  /** Image's alt text. */
  alt?: Maybe<Scalars['String']['output']>;
  /** Path to the image. */
  filepath?: Maybe<Scalars['String']['output']>;
  /** The date and time when the image was updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** Represents a sitemap resource that is not a metaobject. */
export type SitemapResource = SitemapResourceInterface & {
  __typename?: 'SitemapResource';
  /** Resource's handle. */
  handle: Scalars['String']['output'];
  /** Resource's image. */
  image?: Maybe<SitemapImage>;
  /** Resource's title. */
  title?: Maybe<Scalars['String']['output']>;
  /** The date and time when the resource was updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** Represents the common fields for all sitemap resource types. */
export type SitemapResourceInterface = {
  /** Resource's handle. */
  handle: Scalars['String']['output'];
  /** The date and time when the resource was updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/**
 * A SitemapResourceMetaobject represents a metaobject with
 * [the `renderable` capability](https://shopify.dev/docs/apps/build/custom-data/metaobjects/use-metaobject-capabilities#render-metaobjects-as-web-pages).
 *
 */
export type SitemapResourceMetaobject = SitemapResourceInterface & {
  __typename?: 'SitemapResourceMetaobject';
  /** Resource's handle. */
  handle: Scalars['String']['output'];
  /** The URL handle for accessing pages of this metaobject type in the Online Store. */
  onlineStoreUrlHandle?: Maybe<Scalars['String']['output']>;
  /** The type of the metaobject. Defines the namespace of its associated metafields. */
  type: Scalars['String']['output'];
  /** The date and time when the resource was updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** The types of resources potentially present in a sitemap. */
export type SitemapType =
  /** Articles present in the sitemap. */
  | 'ARTICLE'
  /** Blogs present in the sitemap. */
  | 'BLOG'
  /** Collections present in the sitemap. */
  | 'COLLECTION'
  /**
   * Metaobjects present in the sitemap. Only metaobject types with the
   * [`renderable` capability](https://shopify.dev/docs/apps/build/custom-data/metaobjects/use-metaobject-capabilities#render-metaobjects-as-web-pages)
   * are included in sitemap.
   *
   */
  | 'METAOBJECT'
  /** Pages present in the sitemap. */
  | 'PAGE'
  /** Products present in the sitemap. */
  | 'PRODUCT';

/**
 * The availability of a product variant at a particular location.
 * Local pick-up must be enabled in the  store's shipping settings, otherwise this will return an empty result.
 *
 */
export type StoreAvailability = {
  __typename?: 'StoreAvailability';
  /** Whether the product variant is in-stock at this location. */
  available: Scalars['Boolean']['output'];
  /** The location where this product variant is stocked at. */
  location: Location;
  /** Returns the estimated amount of time it takes for pickup to be ready (Example: Usually ready in 24 hours). */
  pickUpTime: Scalars['String']['output'];
  /** The quantity of the product variant in-stock at this location. */
  quantityAvailable: Scalars['Int']['output'];
};

/**
 * An auto-generated type for paginating through multiple StoreAvailabilities.
 *
 */
export type StoreAvailabilityConnection = {
  __typename?: 'StoreAvailabilityConnection';
  /** A list of edges. */
  edges: Array<StoreAvailabilityEdge>;
  /** A list of the nodes contained in StoreAvailabilityEdge. */
  nodes: Array<StoreAvailability>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one StoreAvailability and a cursor during pagination.
 *
 */
export type StoreAvailabilityEdge = {
  __typename?: 'StoreAvailabilityEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of StoreAvailabilityEdge. */
  node: StoreAvailability;
};

/**
 * An auto-generated type for paginating through multiple Strings.
 *
 */
export type StringConnection = {
  __typename?: 'StringConnection';
  /** A list of edges. */
  edges: Array<StringEdge>;
  /** A list of the nodes contained in StringEdge. */
  nodes: Array<Scalars['String']['output']>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one String and a cursor during pagination.
 *
 */
export type StringEdge = {
  __typename?: 'StringEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of StringEdge. */
  node: Scalars['String']['output'];
};

/** An error that occurred during cart submit for completion. */
export type SubmissionError = {
  __typename?: 'SubmissionError';
  /** The error code. */
  code: SubmissionErrorCode;
  /** The error message. */
  message?: Maybe<Scalars['String']['output']>;
};

/** The code of the error that occurred during cart submit for completion. */
export type SubmissionErrorCode =
  | 'BUYER_IDENTITY_EMAIL_IS_INVALID'
  | 'BUYER_IDENTITY_EMAIL_REQUIRED'
  | 'BUYER_IDENTITY_PHONE_IS_INVALID'
  | 'DELIVERY_ADDRESS1_INVALID'
  | 'DELIVERY_ADDRESS1_REQUIRED'
  | 'DELIVERY_ADDRESS1_TOO_LONG'
  | 'DELIVERY_ADDRESS2_INVALID'
  | 'DELIVERY_ADDRESS2_REQUIRED'
  | 'DELIVERY_ADDRESS2_TOO_LONG'
  | 'DELIVERY_ADDRESS_REQUIRED'
  | 'DELIVERY_CITY_INVALID'
  | 'DELIVERY_CITY_REQUIRED'
  | 'DELIVERY_CITY_TOO_LONG'
  | 'DELIVERY_COMPANY_INVALID'
  | 'DELIVERY_COMPANY_REQUIRED'
  | 'DELIVERY_COMPANY_TOO_LONG'
  | 'DELIVERY_COUNTRY_REQUIRED'
  | 'DELIVERY_FIRST_NAME_INVALID'
  | 'DELIVERY_FIRST_NAME_REQUIRED'
  | 'DELIVERY_FIRST_NAME_TOO_LONG'
  | 'DELIVERY_INVALID_POSTAL_CODE_FOR_COUNTRY'
  | 'DELIVERY_INVALID_POSTAL_CODE_FOR_ZONE'
  | 'DELIVERY_LAST_NAME_INVALID'
  | 'DELIVERY_LAST_NAME_REQUIRED'
  | 'DELIVERY_LAST_NAME_TOO_LONG'
  | 'DELIVERY_NO_DELIVERY_AVAILABLE'
  | 'DELIVERY_NO_DELIVERY_AVAILABLE_FOR_MERCHANDISE_LINE'
  | 'DELIVERY_OPTIONS_PHONE_NUMBER_INVALID'
  | 'DELIVERY_OPTIONS_PHONE_NUMBER_REQUIRED'
  | 'DELIVERY_PHONE_NUMBER_INVALID'
  | 'DELIVERY_PHONE_NUMBER_REQUIRED'
  | 'DELIVERY_POSTAL_CODE_INVALID'
  | 'DELIVERY_POSTAL_CODE_REQUIRED'
  | 'DELIVERY_ZONE_NOT_FOUND'
  | 'DELIVERY_ZONE_REQUIRED_FOR_COUNTRY'
  | 'ERROR'
  | 'MERCHANDISE_LINE_LIMIT_REACHED'
  | 'MERCHANDISE_NOT_APPLICABLE'
  | 'MERCHANDISE_NOT_ENOUGH_STOCK_AVAILABLE'
  | 'MERCHANDISE_OUT_OF_STOCK'
  | 'MERCHANDISE_PRODUCT_NOT_PUBLISHED'
  | 'NO_DELIVERY_GROUP_SELECTED'
  | 'PAYMENTS_ADDRESS1_INVALID'
  | 'PAYMENTS_ADDRESS1_REQUIRED'
  | 'PAYMENTS_ADDRESS1_TOO_LONG'
  | 'PAYMENTS_ADDRESS2_INVALID'
  | 'PAYMENTS_ADDRESS2_REQUIRED'
  | 'PAYMENTS_ADDRESS2_TOO_LONG'
  | 'PAYMENTS_BILLING_ADDRESS_ZONE_NOT_FOUND'
  | 'PAYMENTS_BILLING_ADDRESS_ZONE_REQUIRED_FOR_COUNTRY'
  | 'PAYMENTS_CITY_INVALID'
  | 'PAYMENTS_CITY_REQUIRED'
  | 'PAYMENTS_CITY_TOO_LONG'
  | 'PAYMENTS_COMPANY_INVALID'
  | 'PAYMENTS_COMPANY_REQUIRED'
  | 'PAYMENTS_COMPANY_TOO_LONG'
  | 'PAYMENTS_COUNTRY_REQUIRED'
  | 'PAYMENTS_CREDIT_CARD_BASE_EXPIRED'
  | 'PAYMENTS_CREDIT_CARD_BASE_GATEWAY_NOT_SUPPORTED'
  | 'PAYMENTS_CREDIT_CARD_BASE_INVALID_START_DATE_OR_ISSUE_NUMBER_FOR_DEBIT'
  | 'PAYMENTS_CREDIT_CARD_BRAND_NOT_SUPPORTED'
  | 'PAYMENTS_CREDIT_CARD_FIRST_NAME_BLANK'
  | 'PAYMENTS_CREDIT_CARD_GENERIC'
  | 'PAYMENTS_CREDIT_CARD_LAST_NAME_BLANK'
  | 'PAYMENTS_CREDIT_CARD_MONTH_INCLUSION'
  | 'PAYMENTS_CREDIT_CARD_NAME_INVALID'
  | 'PAYMENTS_CREDIT_CARD_NUMBER_INVALID'
  | 'PAYMENTS_CREDIT_CARD_NUMBER_INVALID_FORMAT'
  | 'PAYMENTS_CREDIT_CARD_SESSION_ID'
  | 'PAYMENTS_CREDIT_CARD_VERIFICATION_VALUE_BLANK'
  | 'PAYMENTS_CREDIT_CARD_VERIFICATION_VALUE_INVALID_FOR_CARD_TYPE'
  | 'PAYMENTS_CREDIT_CARD_YEAR_EXPIRED'
  | 'PAYMENTS_CREDIT_CARD_YEAR_INVALID_EXPIRY_YEAR'
  | 'PAYMENTS_FIRST_NAME_INVALID'
  | 'PAYMENTS_FIRST_NAME_REQUIRED'
  | 'PAYMENTS_FIRST_NAME_TOO_LONG'
  | 'PAYMENTS_INVALID_POSTAL_CODE_FOR_COUNTRY'
  | 'PAYMENTS_INVALID_POSTAL_CODE_FOR_ZONE'
  | 'PAYMENTS_LAST_NAME_INVALID'
  | 'PAYMENTS_LAST_NAME_REQUIRED'
  | 'PAYMENTS_LAST_NAME_TOO_LONG'
  | 'PAYMENTS_METHOD_REQUIRED'
  | 'PAYMENTS_METHOD_UNAVAILABLE'
  | 'PAYMENTS_PHONE_NUMBER_INVALID'
  | 'PAYMENTS_PHONE_NUMBER_REQUIRED'
  | 'PAYMENTS_POSTAL_CODE_INVALID'
  | 'PAYMENTS_POSTAL_CODE_REQUIRED'
  | 'PAYMENTS_SHOPIFY_PAYMENTS_REQUIRED'
  | 'PAYMENTS_UNACCEPTABLE_PAYMENT_AMOUNT'
  | 'PAYMENTS_WALLET_CONTENT_MISSING'
  | 'TAXES_DELIVERY_GROUP_ID_NOT_FOUND'
  | 'TAXES_LINE_ID_NOT_FOUND'
  | 'TAXES_MUST_BE_DEFINED';

/** Cart submit for checkout completion is successful. */
export type SubmitAlreadyAccepted = {
  __typename?: 'SubmitAlreadyAccepted';
  /** The ID of the cart completion attempt that will be used for polling for the result. */
  attemptId: Scalars['String']['output'];
};

/** Cart submit for checkout completion failed. */
export type SubmitFailed = {
  __typename?: 'SubmitFailed';
  /** The URL of the checkout for the cart. */
  checkoutUrl?: Maybe<Scalars['URL']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  errors: Array<SubmissionError>;
};

/** Cart submit for checkout completion is already accepted. */
export type SubmitSuccess = {
  __typename?: 'SubmitSuccess';
  /** The ID of the cart completion attempt that will be used for polling for the result. */
  attemptId: Scalars['String']['output'];
  /** The url to which the buyer should be redirected after the cart is successfully submitted. */
  redirectUrl: Scalars['URL']['output'];
};

/** Cart submit for checkout completion is throttled. */
export type SubmitThrottled = {
  __typename?: 'SubmitThrottled';
  /**
   * UTC date time string that indicates the time after which clients should make their next
   * poll request. Any poll requests sent before this time will be ignored. Use this value to schedule the
   * next poll request.
   *
   */
  pollAfter: Scalars['DateTime']['output'];
};

/** Color and image for visual representation. */
export type Swatch = {
  __typename?: 'Swatch';
  /** The swatch color. */
  color?: Maybe<Scalars['Color']['output']>;
  /** The swatch image. */
  image?: Maybe<MediaImage>;
};

/**
 * The taxonomy category for the product.
 *
 */
export type TaxonomyCategory = Node & {
  __typename?: 'TaxonomyCategory';
  /** All parent nodes of the current taxonomy category. */
  ancestors: Array<TaxonomyCategory>;
  /** A static identifier for the taxonomy category. */
  id: Scalars['ID']['output'];
  /** The localized name of the taxonomy category. */
  name: Scalars['String']['output'];
};

/**
 * A filter used to view a subset of products in a collection matching a specific taxonomy metafield value.
 *
 */
export type TaxonomyMetafieldFilter = {
  /** The key of the metafield to filter on. */
  key: Scalars['String']['input'];
  /** The namespace of the metafield to filter on. */
  namespace: Scalars['String']['input'];
  /** The value of the metafield. */
  value: Scalars['String']['input'];
};

/** Represents a resource that you can track the origin of the search traffic. */
export type Trackable = {
  /** URL parameters to be added to a page URL to track the origin of on-site search traffic for [analytics reporting](https://help.shopify.com/manual/reports-and-analytics/shopify-reports/report-types/default-reports/behaviour-reports). Returns a result when accessed through the [search](https://shopify.dev/docs/api/storefront/current/queries/search) or [predictiveSearch](https://shopify.dev/docs/api/storefront/current/queries/predictiveSearch) queries, otherwise returns null. */
  trackingParameters?: Maybe<Scalars['String']['output']>;
};

/**
 * The measurement used to calculate a unit price for a product variant (e.g. $9.99 / 100ml).
 *
 */
export type UnitPriceMeasurement = {
  __typename?: 'UnitPriceMeasurement';
  /** The type of unit of measurement for the unit price measurement. */
  measuredType?: Maybe<UnitPriceMeasurementMeasuredType>;
  /** The quantity unit for the unit price measurement. */
  quantityUnit?: Maybe<UnitPriceMeasurementMeasuredUnit>;
  /** The quantity value for the unit price measurement. */
  quantityValue: Scalars['Float']['output'];
  /** The reference unit for the unit price measurement. */
  referenceUnit?: Maybe<UnitPriceMeasurementMeasuredUnit>;
  /** The reference value for the unit price measurement. */
  referenceValue: Scalars['Int']['output'];
};

/** The accepted types of unit of measurement. */
export type UnitPriceMeasurementMeasuredType =
  /** Unit of measurements representing areas. */
  | 'AREA'
  /** Unit of measurements representing lengths. */
  | 'LENGTH'
  /** Unit of measurements representing volumes. */
  | 'VOLUME'
  /** Unit of measurements representing weights. */
  | 'WEIGHT';

/** The valid units of measurement for a unit price measurement. */
export type UnitPriceMeasurementMeasuredUnit =
  /** 100 centiliters equals 1 liter. */
  | 'CL'
  /** 100 centimeters equals 1 meter. */
  | 'CM'
  /** Metric system unit of weight. */
  | 'G'
  /** 1 kilogram equals 1000 grams. */
  | 'KG'
  /** Metric system unit of volume. */
  | 'L'
  /** Metric system unit of length. */
  | 'M'
  /** Metric system unit of area. */
  | 'M2'
  /** 1 cubic meter equals 1000 liters. */
  | 'M3'
  /** 1000 milligrams equals 1 gram. */
  | 'MG'
  /** 1000 milliliters equals 1 liter. */
  | 'ML'
  /** 1000 millimeters equals 1 meter. */
  | 'MM';

/** Systems of weights and measures. */
export type UnitSystem =
  /** Imperial system of weights and measures. */
  | 'IMPERIAL_SYSTEM'
  /** Metric system of weights and measures. */
  | 'METRIC_SYSTEM';

/** A redirect on the online store. */
export type UrlRedirect = Node & {
  __typename?: 'UrlRedirect';
  /** The ID of the URL redirect. */
  id: Scalars['ID']['output'];
  /** The old path to be redirected from. When the user visits this path, they'll be redirected to the target location. */
  path: Scalars['String']['output'];
  /** The target location where the user will be redirected to. */
  target: Scalars['String']['output'];
};

/**
 * An auto-generated type for paginating through multiple UrlRedirects.
 *
 */
export type UrlRedirectConnection = {
  __typename?: 'UrlRedirectConnection';
  /** A list of edges. */
  edges: Array<UrlRedirectEdge>;
  /** A list of the nodes contained in UrlRedirectEdge. */
  nodes: Array<UrlRedirect>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one UrlRedirect and a cursor during pagination.
 *
 */
export type UrlRedirectEdge = {
  __typename?: 'UrlRedirectEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of UrlRedirectEdge. */
  node: UrlRedirect;
};

/** Represents an error in the input of a mutation. */
export type UserError = DisplayableError & {
  __typename?: 'UserError';
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Error codes for failed Shop Pay payment request session mutations. */
export type UserErrorsShopPayPaymentRequestSessionUserErrors =
  DisplayableError & {
    __typename?: 'UserErrorsShopPayPaymentRequestSessionUserErrors';
    /** The error code. */
    code?: Maybe<UserErrorsShopPayPaymentRequestSessionUserErrorsCode>;
    /** The path to the input field that caused the error. */
    field?: Maybe<Array<Scalars['String']['output']>>;
    /** The error message. */
    message: Scalars['String']['output'];
  };

/** Possible error codes that can be returned by `ShopPayPaymentRequestSessionUserErrors`. */
export type UserErrorsShopPayPaymentRequestSessionUserErrorsCode =
  /** Idempotency key has already been used. */
  | 'IDEMPOTENCY_KEY_ALREADY_USED'
  /** Payment request input is invalid. */
  | 'PAYMENT_REQUEST_INVALID_INPUT'
  /** Payment request not found. */
  | 'PAYMENT_REQUEST_NOT_FOUND';

/** The input fields for a filter used to view a subset of products in a collection matching a specific variant option. */
export type VariantOptionFilter = {
  /** The name of the variant option to filter on. */
  name: Scalars['String']['input'];
  /** The value of the variant option to filter on. */
  value: Scalars['String']['input'];
};

/** Represents a Shopify hosted video. */
export type Video = Media &
  Node & {
    __typename?: 'Video';
    /** A word or phrase to share the nature or contents of a media. */
    alt?: Maybe<Scalars['String']['output']>;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The media content type. */
    mediaContentType: MediaContentType;
    /** The presentation for a media. */
    presentation?: Maybe<MediaPresentation>;
    /** The preview image for the media. */
    previewImage?: Maybe<Image>;
    /** The sources for a video. */
    sources: Array<VideoSource>;
  };

/** Represents a source for a Shopify hosted video. */
export type VideoSource = {
  __typename?: 'VideoSource';
  /** The format of the video source. */
  format: Scalars['String']['output'];
  /** The height of the video. */
  height: Scalars['Int']['output'];
  /** The video MIME type. */
  mimeType: Scalars['String']['output'];
  /** The URL of the video. */
  url: Scalars['String']['output'];
  /** The width of the video. */
  width: Scalars['Int']['output'];
};

/** Units of measurement for weight. */
export type WeightUnit =
  /** Metric system unit of mass. */
  | 'GRAMS'
  /** 1 kilogram equals 1000 grams. */
  | 'KILOGRAMS'
  /** Imperial system unit of mass. */
  | 'OUNCES'
  /** 1 pound equals 16 ounces. */
  | 'POUNDS';

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    {[key in TKey]: TResult},
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    {[key in TKey]: TResult},
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  CartAddress: CartDeliveryAddress;
  CartCompletionAction: CompletePaymentChallenge;
  CartCompletionAttemptResult:
    | (Omit<CartCompletionActionRequired, 'action'> & {
        action?: Maybe<_RefType['CartCompletionAction']>;
      })
    | CartCompletionFailed
    | CartCompletionProcessing
    | CartCompletionSuccess;
  CartPrepareForCompletionResult:
    | (Omit<CartStatusNotReady, 'cart'> & {cart?: Maybe<_RefType['Cart']>})
    | (Omit<CartStatusReady, 'cart'> & {cart?: Maybe<_RefType['Cart']>})
    | CartThrottled;
  CartSubmitForCompletionResult:
    | SubmitAlreadyAccepted
    | SubmitFailed
    | SubmitSuccess
    | SubmitThrottled;
  DeliveryAddress: MailingAddress;
  MenuItemResource:
    | (Omit<Article, 'blog' | 'image' | 'metafield' | 'metafields'> & {
        blog: _RefType['Blog'];
        image?: Maybe<_RefType['Image']>;
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<
        Blog,
        'articleByHandle' | 'articles' | 'metafield' | 'metafields'
      > & {
        articleByHandle?: Maybe<_RefType['Article']>;
        articles: _RefType['ArticleConnection'];
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<Collection, 'image' | 'metafield' | 'metafields' | 'products'> & {
        image?: Maybe<_RefType['Image']>;
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
        products: _RefType['ProductConnection'];
      })
    | (Omit<Metaobject, 'field' | 'fields' | 'seo'> & {
        field?: Maybe<_RefType['MetaobjectField']>;
        fields: Array<_RefType['MetaobjectField']>;
        seo?: Maybe<_RefType['MetaobjectSEO']>;
      })
    | (Omit<Page, 'metafield' | 'metafields'> & {
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<
        Product,
        | 'adjacentVariants'
        | 'collections'
        | 'featuredImage'
        | 'images'
        | 'media'
        | 'metafield'
        | 'metafields'
        | 'options'
        | 'selectedOrFirstAvailableVariant'
        | 'sellingPlanGroups'
        | 'variantBySelectedOptions'
      > & {
        adjacentVariants: Array<_RefType['ProductVariant']>;
        collections: _RefType['CollectionConnection'];
        featuredImage?: Maybe<_RefType['Image']>;
        images: _RefType['ImageConnection'];
        media: _RefType['MediaConnection'];
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
        options: Array<_RefType['ProductOption']>;
        selectedOrFirstAvailableVariant?: Maybe<_RefType['ProductVariant']>;
        sellingPlanGroups: _RefType['SellingPlanGroupConnection'];
        variantBySelectedOptions?: Maybe<_RefType['ProductVariant']>;
      })
    | ShopPolicy;
  Merchandise: Omit<
    ProductVariant,
    | 'image'
    | 'metafield'
    | 'metafields'
    | 'product'
    | 'sellingPlanAllocations'
    | 'storeAvailability'
  > & {
    image?: Maybe<_RefType['Image']>;
    metafield?: Maybe<_RefType['Metafield']>;
    metafields: Array<Maybe<_RefType['Metafield']>>;
    product: _RefType['Product'];
    sellingPlanAllocations: _RefType['SellingPlanAllocationConnection'];
    storeAvailability: _RefType['StoreAvailabilityConnection'];
  };
  MetafieldParentResource:
    | (Omit<Article, 'blog' | 'image' | 'metafield' | 'metafields'> & {
        blog: _RefType['Blog'];
        image?: Maybe<_RefType['Image']>;
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<
        Blog,
        'articleByHandle' | 'articles' | 'metafield' | 'metafields'
      > & {
        articleByHandle?: Maybe<_RefType['Article']>;
        articles: _RefType['ArticleConnection'];
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<
        Cart,
        | 'buyerIdentity'
        | 'delivery'
        | 'deliveryGroups'
        | 'discountAllocations'
        | 'lines'
        | 'metafield'
        | 'metafields'
      > & {
        buyerIdentity: _RefType['CartBuyerIdentity'];
        delivery: _RefType['CartDelivery'];
        deliveryGroups: _RefType['CartDeliveryGroupConnection'];
        discountAllocations: Array<_RefType['CartDiscountAllocation']>;
        lines: _RefType['BaseCartLineConnection'];
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<Collection, 'image' | 'metafield' | 'metafields' | 'products'> & {
        image?: Maybe<_RefType['Image']>;
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
        products: _RefType['ProductConnection'];
      })
    | (Omit<Company, 'metafield' | 'metafields'> & {
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<CompanyLocation, 'metafield' | 'metafields'> & {
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<Customer, 'metafield' | 'metafields' | 'orders'> & {
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
        orders: _RefType['OrderConnection'];
      })
    | (Omit<Location, 'address' | 'metafield' | 'metafields'> & {
        address: _RefType['LocationAddress'];
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<Market, 'metafield' | 'metafields'> & {
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<
        Order,
        | 'discountApplications'
        | 'lineItems'
        | 'metafield'
        | 'metafields'
        | 'shippingDiscountAllocations'
        | 'successfulFulfillments'
      > & {
        discountApplications: _RefType['DiscountApplicationConnection'];
        lineItems: _RefType['OrderLineItemConnection'];
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
        shippingDiscountAllocations: Array<_RefType['DiscountAllocation']>;
        successfulFulfillments?: Maybe<Array<_RefType['Fulfillment']>>;
      })
    | (Omit<Page, 'metafield' | 'metafields'> & {
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<
        Product,
        | 'adjacentVariants'
        | 'collections'
        | 'featuredImage'
        | 'images'
        | 'media'
        | 'metafield'
        | 'metafields'
        | 'options'
        | 'selectedOrFirstAvailableVariant'
        | 'sellingPlanGroups'
        | 'variantBySelectedOptions'
      > & {
        adjacentVariants: Array<_RefType['ProductVariant']>;
        collections: _RefType['CollectionConnection'];
        featuredImage?: Maybe<_RefType['Image']>;
        images: _RefType['ImageConnection'];
        media: _RefType['MediaConnection'];
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
        options: Array<_RefType['ProductOption']>;
        selectedOrFirstAvailableVariant?: Maybe<_RefType['ProductVariant']>;
        sellingPlanGroups: _RefType['SellingPlanGroupConnection'];
        variantBySelectedOptions?: Maybe<_RefType['ProductVariant']>;
      })
    | (Omit<
        ProductVariant,
        | 'image'
        | 'metafield'
        | 'metafields'
        | 'product'
        | 'sellingPlanAllocations'
        | 'storeAvailability'
      > & {
        image?: Maybe<_RefType['Image']>;
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
        product: _RefType['Product'];
        sellingPlanAllocations: _RefType['SellingPlanAllocationConnection'];
        storeAvailability: _RefType['StoreAvailabilityConnection'];
      })
    | (Omit<
        SellingPlan,
        | 'billingPolicy'
        | 'checkoutCharge'
        | 'deliveryPolicy'
        | 'metafield'
        | 'metafields'
        | 'priceAdjustments'
      > & {
        billingPolicy?: Maybe<_RefType['SellingPlanBillingPolicy']>;
        checkoutCharge: _RefType['SellingPlanCheckoutCharge'];
        deliveryPolicy?: Maybe<_RefType['SellingPlanDeliveryPolicy']>;
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
        priceAdjustments: Array<_RefType['SellingPlanPriceAdjustment']>;
      })
    | (Omit<Shop, 'brand' | 'metafield' | 'metafields'> & {
        brand?: Maybe<_RefType['Brand']>;
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      });
  MetafieldReference:
    | (Omit<Collection, 'image' | 'metafield' | 'metafields' | 'products'> & {
        image?: Maybe<_RefType['Image']>;
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
        products: _RefType['ProductConnection'];
      })
    | (Omit<GenericFile, 'previewImage'> & {
        previewImage?: Maybe<_RefType['Image']>;
      })
    | (Omit<MediaImage, 'image' | 'previewImage'> & {
        image?: Maybe<_RefType['Image']>;
        previewImage?: Maybe<_RefType['Image']>;
      })
    | (Omit<Metaobject, 'field' | 'fields' | 'seo'> & {
        field?: Maybe<_RefType['MetaobjectField']>;
        fields: Array<_RefType['MetaobjectField']>;
        seo?: Maybe<_RefType['MetaobjectSEO']>;
      })
    | (Omit<Model3d, 'previewImage'> & {
        previewImage?: Maybe<_RefType['Image']>;
      })
    | (Omit<Page, 'metafield' | 'metafields'> & {
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<
        Product,
        | 'adjacentVariants'
        | 'collections'
        | 'featuredImage'
        | 'images'
        | 'media'
        | 'metafield'
        | 'metafields'
        | 'options'
        | 'selectedOrFirstAvailableVariant'
        | 'sellingPlanGroups'
        | 'variantBySelectedOptions'
      > & {
        adjacentVariants: Array<_RefType['ProductVariant']>;
        collections: _RefType['CollectionConnection'];
        featuredImage?: Maybe<_RefType['Image']>;
        images: _RefType['ImageConnection'];
        media: _RefType['MediaConnection'];
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
        options: Array<_RefType['ProductOption']>;
        selectedOrFirstAvailableVariant?: Maybe<_RefType['ProductVariant']>;
        sellingPlanGroups: _RefType['SellingPlanGroupConnection'];
        variantBySelectedOptions?: Maybe<_RefType['ProductVariant']>;
      })
    | (Omit<
        ProductVariant,
        | 'image'
        | 'metafield'
        | 'metafields'
        | 'product'
        | 'sellingPlanAllocations'
        | 'storeAvailability'
      > & {
        image?: Maybe<_RefType['Image']>;
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
        product: _RefType['Product'];
        sellingPlanAllocations: _RefType['SellingPlanAllocationConnection'];
        storeAvailability: _RefType['StoreAvailabilityConnection'];
      })
    | (Omit<Video, 'previewImage'> & {previewImage?: Maybe<_RefType['Image']>});
  PricingValue: MoneyV2 | PricingPercentageValue;
  SearchResultItem:
    | (Omit<Article, 'blog' | 'image' | 'metafield' | 'metafields'> & {
        blog: _RefType['Blog'];
        image?: Maybe<_RefType['Image']>;
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<Page, 'metafield' | 'metafields'> & {
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
      })
    | (Omit<
        Product,
        | 'adjacentVariants'
        | 'collections'
        | 'featuredImage'
        | 'images'
        | 'media'
        | 'metafield'
        | 'metafields'
        | 'options'
        | 'selectedOrFirstAvailableVariant'
        | 'sellingPlanGroups'
        | 'variantBySelectedOptions'
      > & {
        adjacentVariants: Array<_RefType['ProductVariant']>;
        collections: _RefType['CollectionConnection'];
        featuredImage?: Maybe<_RefType['Image']>;
        images: _RefType['ImageConnection'];
        media: _RefType['MediaConnection'];
        metafield?: Maybe<_RefType['Metafield']>;
        metafields: Array<Maybe<_RefType['Metafield']>>;
        options: Array<_RefType['ProductOption']>;
        selectedOrFirstAvailableVariant?: Maybe<_RefType['ProductVariant']>;
        sellingPlanGroups: _RefType['SellingPlanGroupConnection'];
        variantBySelectedOptions?: Maybe<_RefType['ProductVariant']>;
      });
  SellingPlanBillingPolicy: SellingPlanRecurringBillingPolicy;
  SellingPlanCheckoutChargeValue:
    | MoneyV2
    | SellingPlanCheckoutChargePercentageValue;
  SellingPlanDeliveryPolicy: SellingPlanRecurringDeliveryPolicy;
  SellingPlanPriceAdjustmentValue:
    | SellingPlanFixedAmountPriceAdjustment
    | SellingPlanFixedPriceAdjustment
    | SellingPlanPercentagePriceAdjustment;
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
  {
    BaseCartLine:
      | (Omit<
          CartLine,
          'discountAllocations' | 'merchandise' | 'sellingPlanAllocation'
        > & {
          discountAllocations: Array<_RefType['CartDiscountAllocation']>;
          merchandise: _RefType['Merchandise'];
          sellingPlanAllocation?: Maybe<_RefType['SellingPlanAllocation']>;
        })
      | (Omit<
          ComponentizableCartLine,
          | 'discountAllocations'
          | 'lineComponents'
          | 'merchandise'
          | 'sellingPlanAllocation'
        > & {
          discountAllocations: Array<_RefType['CartDiscountAllocation']>;
          lineComponents: Array<_RefType['CartLine']>;
          merchandise: _RefType['Merchandise'];
          sellingPlanAllocation?: Maybe<_RefType['SellingPlanAllocation']>;
        });
    CartDiscountAllocation:
      | (Omit<CartAutomaticDiscountAllocation, 'discountApplication'> & {
          discountApplication: _RefType['CartDiscountApplication'];
        })
      | (Omit<CartCodeDiscountAllocation, 'discountApplication'> & {
          discountApplication: _RefType['CartDiscountApplication'];
        })
      | (Omit<CartCustomDiscountAllocation, 'discountApplication'> & {
          discountApplication: _RefType['CartDiscountApplication'];
        });
    DiscountApplication:
      | (Omit<AutomaticDiscountApplication, 'value'> & {
          value: _RefType['PricingValue'];
        })
      | (Omit<DiscountCodeApplication, 'value'> & {
          value: _RefType['PricingValue'];
        })
      | (Omit<ManualDiscountApplication, 'value'> & {
          value: _RefType['PricingValue'];
        })
      | (Omit<ScriptDiscountApplication, 'value'> & {
          value: _RefType['PricingValue'];
        });
    DisplayableError:
      | CartUserError
      | CustomerUserError
      | MetafieldDeleteUserError
      | MetafieldsSetUserError
      | UserError
      | UserErrorsShopPayPaymentRequestSessionUserErrors;
    HasMetafields:
      | (Omit<Article, 'blog' | 'image' | 'metafield' | 'metafields'> & {
          blog: _RefType['Blog'];
          image?: Maybe<_RefType['Image']>;
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<
          Blog,
          'articleByHandle' | 'articles' | 'metafield' | 'metafields'
        > & {
          articleByHandle?: Maybe<_RefType['Article']>;
          articles: _RefType['ArticleConnection'];
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<
          Cart,
          | 'buyerIdentity'
          | 'delivery'
          | 'deliveryGroups'
          | 'discountAllocations'
          | 'lines'
          | 'metafield'
          | 'metafields'
        > & {
          buyerIdentity: _RefType['CartBuyerIdentity'];
          delivery: _RefType['CartDelivery'];
          deliveryGroups: _RefType['CartDeliveryGroupConnection'];
          discountAllocations: Array<_RefType['CartDiscountAllocation']>;
          lines: _RefType['BaseCartLineConnection'];
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<Collection, 'image' | 'metafield' | 'metafields' | 'products'> & {
          image?: Maybe<_RefType['Image']>;
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          products: _RefType['ProductConnection'];
        })
      | (Omit<Company, 'metafield' | 'metafields'> & {
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<CompanyLocation, 'metafield' | 'metafields'> & {
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<Customer, 'metafield' | 'metafields' | 'orders'> & {
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          orders: _RefType['OrderConnection'];
        })
      | (Omit<Location, 'address' | 'metafield' | 'metafields'> & {
          address: _RefType['LocationAddress'];
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<Market, 'metafield' | 'metafields'> & {
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<
          Order,
          | 'discountApplications'
          | 'lineItems'
          | 'metafield'
          | 'metafields'
          | 'shippingDiscountAllocations'
          | 'successfulFulfillments'
        > & {
          discountApplications: _RefType['DiscountApplicationConnection'];
          lineItems: _RefType['OrderLineItemConnection'];
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          shippingDiscountAllocations: Array<_RefType['DiscountAllocation']>;
          successfulFulfillments?: Maybe<Array<_RefType['Fulfillment']>>;
        })
      | (Omit<Page, 'metafield' | 'metafields'> & {
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<
          Product,
          | 'adjacentVariants'
          | 'collections'
          | 'featuredImage'
          | 'images'
          | 'media'
          | 'metafield'
          | 'metafields'
          | 'options'
          | 'selectedOrFirstAvailableVariant'
          | 'sellingPlanGroups'
          | 'variantBySelectedOptions'
        > & {
          adjacentVariants: Array<_RefType['ProductVariant']>;
          collections: _RefType['CollectionConnection'];
          featuredImage?: Maybe<_RefType['Image']>;
          images: _RefType['ImageConnection'];
          media: _RefType['MediaConnection'];
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          options: Array<_RefType['ProductOption']>;
          selectedOrFirstAvailableVariant?: Maybe<_RefType['ProductVariant']>;
          sellingPlanGroups: _RefType['SellingPlanGroupConnection'];
          variantBySelectedOptions?: Maybe<_RefType['ProductVariant']>;
        })
      | (Omit<
          ProductVariant,
          | 'image'
          | 'metafield'
          | 'metafields'
          | 'product'
          | 'sellingPlanAllocations'
          | 'storeAvailability'
        > & {
          image?: Maybe<_RefType['Image']>;
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          product: _RefType['Product'];
          sellingPlanAllocations: _RefType['SellingPlanAllocationConnection'];
          storeAvailability: _RefType['StoreAvailabilityConnection'];
        })
      | (Omit<
          SellingPlan,
          | 'billingPolicy'
          | 'checkoutCharge'
          | 'deliveryPolicy'
          | 'metafield'
          | 'metafields'
          | 'priceAdjustments'
        > & {
          billingPolicy?: Maybe<_RefType['SellingPlanBillingPolicy']>;
          checkoutCharge: _RefType['SellingPlanCheckoutCharge'];
          deliveryPolicy?: Maybe<_RefType['SellingPlanDeliveryPolicy']>;
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          priceAdjustments: Array<_RefType['SellingPlanPriceAdjustment']>;
        })
      | (Omit<Shop, 'brand' | 'metafield' | 'metafields'> & {
          brand?: Maybe<_RefType['Brand']>;
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        });
    Media:
      | (Omit<ExternalVideo, 'previewImage'> & {
          previewImage?: Maybe<_RefType['Image']>;
        })
      | (Omit<MediaImage, 'image' | 'previewImage'> & {
          image?: Maybe<_RefType['Image']>;
          previewImage?: Maybe<_RefType['Image']>;
        })
      | (Omit<Model3d, 'previewImage'> & {
          previewImage?: Maybe<_RefType['Image']>;
        })
      | (Omit<Video, 'previewImage'> & {
          previewImage?: Maybe<_RefType['Image']>;
        });
    Node:
      | AppliedGiftCard
      | (Omit<Article, 'blog' | 'image' | 'metafield' | 'metafields'> & {
          blog: _RefType['Blog'];
          image?: Maybe<_RefType['Image']>;
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<
          Blog,
          'articleByHandle' | 'articles' | 'metafield' | 'metafields'
        > & {
          articleByHandle?: Maybe<_RefType['Article']>;
          articles: _RefType['ArticleConnection'];
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<
          Cart,
          | 'buyerIdentity'
          | 'delivery'
          | 'deliveryGroups'
          | 'discountAllocations'
          | 'lines'
          | 'metafield'
          | 'metafields'
        > & {
          buyerIdentity: _RefType['CartBuyerIdentity'];
          delivery: _RefType['CartDelivery'];
          deliveryGroups: _RefType['CartDeliveryGroupConnection'];
          discountAllocations: Array<_RefType['CartDiscountAllocation']>;
          lines: _RefType['BaseCartLineConnection'];
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<
          CartLine,
          'discountAllocations' | 'merchandise' | 'sellingPlanAllocation'
        > & {
          discountAllocations: Array<_RefType['CartDiscountAllocation']>;
          merchandise: _RefType['Merchandise'];
          sellingPlanAllocation?: Maybe<_RefType['SellingPlanAllocation']>;
        })
      | (Omit<Collection, 'image' | 'metafield' | 'metafields' | 'products'> & {
          image?: Maybe<_RefType['Image']>;
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          products: _RefType['ProductConnection'];
        })
      | Comment
      | (Omit<Company, 'metafield' | 'metafields'> & {
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | CompanyContact
      | (Omit<CompanyLocation, 'metafield' | 'metafields'> & {
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<
          ComponentizableCartLine,
          | 'discountAllocations'
          | 'lineComponents'
          | 'merchandise'
          | 'sellingPlanAllocation'
        > & {
          discountAllocations: Array<_RefType['CartDiscountAllocation']>;
          lineComponents: Array<_RefType['CartLine']>;
          merchandise: _RefType['Merchandise'];
          sellingPlanAllocation?: Maybe<_RefType['SellingPlanAllocation']>;
        })
      | (Omit<ExternalVideo, 'previewImage'> & {
          previewImage?: Maybe<_RefType['Image']>;
        })
      | (Omit<GenericFile, 'previewImage'> & {
          previewImage?: Maybe<_RefType['Image']>;
        })
      | (Omit<Location, 'address' | 'metafield' | 'metafields'> & {
          address: _RefType['LocationAddress'];
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | MailingAddress
      | (Omit<Market, 'metafield' | 'metafields'> & {
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<MediaImage, 'image' | 'previewImage'> & {
          image?: Maybe<_RefType['Image']>;
          previewImage?: Maybe<_RefType['Image']>;
        })
      | MediaPresentation
      | (Omit<Menu, 'items'> & {items: Array<_RefType['MenuItem']>})
      | (Omit<MenuItem, 'items' | 'resource'> & {
          items: Array<_RefType['MenuItem']>;
          resource?: Maybe<_RefType['MenuItemResource']>;
        })
      | (Omit<Metafield, 'parentResource' | 'reference' | 'references'> & {
          parentResource: _RefType['MetafieldParentResource'];
          reference?: Maybe<_RefType['MetafieldReference']>;
          references?: Maybe<_RefType['MetafieldReferenceConnection']>;
        })
      | (Omit<Metaobject, 'field' | 'fields' | 'seo'> & {
          field?: Maybe<_RefType['MetaobjectField']>;
          fields: Array<_RefType['MetaobjectField']>;
          seo?: Maybe<_RefType['MetaobjectSEO']>;
        })
      | (Omit<Model3d, 'previewImage'> & {
          previewImage?: Maybe<_RefType['Image']>;
        })
      | (Omit<
          Order,
          | 'discountApplications'
          | 'lineItems'
          | 'metafield'
          | 'metafields'
          | 'shippingDiscountAllocations'
          | 'successfulFulfillments'
        > & {
          discountApplications: _RefType['DiscountApplicationConnection'];
          lineItems: _RefType['OrderLineItemConnection'];
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          shippingDiscountAllocations: Array<_RefType['DiscountAllocation']>;
          successfulFulfillments?: Maybe<Array<_RefType['Fulfillment']>>;
        })
      | (Omit<Page, 'metafield' | 'metafields'> & {
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<
          Product,
          | 'adjacentVariants'
          | 'collections'
          | 'featuredImage'
          | 'images'
          | 'media'
          | 'metafield'
          | 'metafields'
          | 'options'
          | 'selectedOrFirstAvailableVariant'
          | 'sellingPlanGroups'
          | 'variantBySelectedOptions'
        > & {
          adjacentVariants: Array<_RefType['ProductVariant']>;
          collections: _RefType['CollectionConnection'];
          featuredImage?: Maybe<_RefType['Image']>;
          images: _RefType['ImageConnection'];
          media: _RefType['MediaConnection'];
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          options: Array<_RefType['ProductOption']>;
          selectedOrFirstAvailableVariant?: Maybe<_RefType['ProductVariant']>;
          sellingPlanGroups: _RefType['SellingPlanGroupConnection'];
          variantBySelectedOptions?: Maybe<_RefType['ProductVariant']>;
        })
      | (Omit<ProductOption, 'optionValues'> & {
          optionValues: Array<_RefType['ProductOptionValue']>;
        })
      | (Omit<ProductOptionValue, 'firstSelectableVariant' | 'swatch'> & {
          firstSelectableVariant?: Maybe<_RefType['ProductVariant']>;
          swatch?: Maybe<_RefType['ProductOptionValueSwatch']>;
        })
      | (Omit<
          ProductVariant,
          | 'image'
          | 'metafield'
          | 'metafields'
          | 'product'
          | 'sellingPlanAllocations'
          | 'storeAvailability'
        > & {
          image?: Maybe<_RefType['Image']>;
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          product: _RefType['Product'];
          sellingPlanAllocations: _RefType['SellingPlanAllocationConnection'];
          storeAvailability: _RefType['StoreAvailabilityConnection'];
        })
      | (Omit<Shop, 'brand' | 'metafield' | 'metafields'> & {
          brand?: Maybe<_RefType['Brand']>;
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | ShopPayInstallmentsFinancingPlan
      | ShopPayInstallmentsFinancingPlanTerm
      | ShopPayInstallmentsProductVariantPricing
      | ShopPolicy
      | TaxonomyCategory
      | UrlRedirect
      | (Omit<Video, 'previewImage'> & {
          previewImage?: Maybe<_RefType['Image']>;
        });
    OnlineStorePublishable:
      | (Omit<Article, 'blog' | 'image' | 'metafield' | 'metafields'> & {
          blog: _RefType['Blog'];
          image?: Maybe<_RefType['Image']>;
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<
          Blog,
          'articleByHandle' | 'articles' | 'metafield' | 'metafields'
        > & {
          articleByHandle?: Maybe<_RefType['Article']>;
          articles: _RefType['ArticleConnection'];
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<Collection, 'image' | 'metafield' | 'metafields' | 'products'> & {
          image?: Maybe<_RefType['Image']>;
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          products: _RefType['ProductConnection'];
        })
      | (Omit<Metaobject, 'field' | 'fields' | 'seo'> & {
          field?: Maybe<_RefType['MetaobjectField']>;
          fields: Array<_RefType['MetaobjectField']>;
          seo?: Maybe<_RefType['MetaobjectSEO']>;
        })
      | (Omit<Page, 'metafield' | 'metafields'> & {
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<
          Product,
          | 'adjacentVariants'
          | 'collections'
          | 'featuredImage'
          | 'images'
          | 'media'
          | 'metafield'
          | 'metafields'
          | 'options'
          | 'selectedOrFirstAvailableVariant'
          | 'sellingPlanGroups'
          | 'variantBySelectedOptions'
        > & {
          adjacentVariants: Array<_RefType['ProductVariant']>;
          collections: _RefType['CollectionConnection'];
          featuredImage?: Maybe<_RefType['Image']>;
          images: _RefType['ImageConnection'];
          media: _RefType['MediaConnection'];
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          options: Array<_RefType['ProductOption']>;
          selectedOrFirstAvailableVariant?: Maybe<_RefType['ProductVariant']>;
          sellingPlanGroups: _RefType['SellingPlanGroupConnection'];
          variantBySelectedOptions?: Maybe<_RefType['ProductVariant']>;
        });
    SitemapResourceInterface: SitemapResource | SitemapResourceMetaobject;
    Trackable:
      | (Omit<Article, 'blog' | 'image' | 'metafield' | 'metafields'> & {
          blog: _RefType['Blog'];
          image?: Maybe<_RefType['Image']>;
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<Collection, 'image' | 'metafield' | 'metafields' | 'products'> & {
          image?: Maybe<_RefType['Image']>;
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          products: _RefType['ProductConnection'];
        })
      | (Omit<Page, 'metafield' | 'metafields'> & {
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
        })
      | (Omit<
          Product,
          | 'adjacentVariants'
          | 'collections'
          | 'featuredImage'
          | 'images'
          | 'media'
          | 'metafield'
          | 'metafields'
          | 'options'
          | 'selectedOrFirstAvailableVariant'
          | 'sellingPlanGroups'
          | 'variantBySelectedOptions'
        > & {
          adjacentVariants: Array<_RefType['ProductVariant']>;
          collections: _RefType['CollectionConnection'];
          featuredImage?: Maybe<_RefType['Image']>;
          images: _RefType['ImageConnection'];
          media: _RefType['MediaConnection'];
          metafield?: Maybe<_RefType['Metafield']>;
          metafields: Array<Maybe<_RefType['Metafield']>>;
          options: Array<_RefType['ProductOption']>;
          selectedOrFirstAvailableVariant?: Maybe<_RefType['ProductVariant']>;
          sellingPlanGroups: _RefType['SellingPlanGroupConnection'];
          variantBySelectedOptions?: Maybe<_RefType['ProductVariant']>;
        })
      | SearchQuerySuggestion;
  };

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ApiVersion: ResolverTypeWrapper<ApiVersion>;
  ApplePayWalletContentInput: ApplePayWalletContentInput;
  ApplePayWalletHeaderInput: ApplePayWalletHeaderInput;
  AppliedGiftCard: ResolverTypeWrapper<AppliedGiftCard>;
  Article: ResolverTypeWrapper<
    Omit<Article, 'blog' | 'image' | 'metafield' | 'metafields'> & {
      blog: ResolversTypes['Blog'];
      image?: Maybe<ResolversTypes['Image']>;
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
    }
  >;
  ArticleAuthor: ResolverTypeWrapper<ArticleAuthor>;
  ArticleConnection: ResolverTypeWrapper<
    Omit<ArticleConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['ArticleEdge']>;
      nodes: Array<ResolversTypes['Article']>;
    }
  >;
  ArticleEdge: ResolverTypeWrapper<
    Omit<ArticleEdge, 'node'> & {node: ResolversTypes['Article']}
  >;
  ArticleSortKeys: ArticleSortKeys;
  Attribute: ResolverTypeWrapper<Attribute>;
  AttributeInput: AttributeInput;
  AutomaticDiscountApplication: ResolverTypeWrapper<
    Omit<AutomaticDiscountApplication, 'value'> & {
      value: ResolversTypes['PricingValue'];
    }
  >;
  BaseCartLine: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['BaseCartLine']
  >;
  BaseCartLineConnection: ResolverTypeWrapper<
    Omit<BaseCartLineConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['BaseCartLineEdge']>;
      nodes: Array<ResolversTypes['BaseCartLine']>;
    }
  >;
  BaseCartLineEdge: ResolverTypeWrapper<
    Omit<BaseCartLineEdge, 'node'> & {node: ResolversTypes['BaseCartLine']}
  >;
  Blog: ResolverTypeWrapper<
    Omit<Blog, 'articleByHandle' | 'articles' | 'metafield' | 'metafields'> & {
      articleByHandle?: Maybe<ResolversTypes['Article']>;
      articles: ResolversTypes['ArticleConnection'];
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
    }
  >;
  BlogConnection: ResolverTypeWrapper<
    Omit<BlogConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['BlogEdge']>;
      nodes: Array<ResolversTypes['Blog']>;
    }
  >;
  BlogEdge: ResolverTypeWrapper<
    Omit<BlogEdge, 'node'> & {node: ResolversTypes['Blog']}
  >;
  BlogSortKeys: BlogSortKeys;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Brand: ResolverTypeWrapper<
    Omit<Brand, 'coverImage' | 'logo' | 'squareLogo'> & {
      coverImage?: Maybe<ResolversTypes['MediaImage']>;
      logo?: Maybe<ResolversTypes['MediaImage']>;
      squareLogo?: Maybe<ResolversTypes['MediaImage']>;
    }
  >;
  BrandColorGroup: ResolverTypeWrapper<BrandColorGroup>;
  BrandColors: ResolverTypeWrapper<BrandColors>;
  BuyerInput: BuyerInput;
  CardBrand: CardBrand;
  Cart: ResolverTypeWrapper<
    Omit<
      Cart,
      | 'buyerIdentity'
      | 'delivery'
      | 'deliveryGroups'
      | 'discountAllocations'
      | 'lines'
      | 'metafield'
      | 'metafields'
    > & {
      buyerIdentity: ResolversTypes['CartBuyerIdentity'];
      delivery: ResolversTypes['CartDelivery'];
      deliveryGroups: ResolversTypes['CartDeliveryGroupConnection'];
      discountAllocations: Array<ResolversTypes['CartDiscountAllocation']>;
      lines: ResolversTypes['BaseCartLineConnection'];
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
    }
  >;
  CartAddress: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['CartAddress']
  >;
  CartAddressInput: CartAddressInput;
  CartAttributesUpdatePayload: ResolverTypeWrapper<
    Omit<CartAttributesUpdatePayload, 'cart'> & {
      cart?: Maybe<ResolversTypes['Cart']>;
    }
  >;
  CartAutomaticDiscountAllocation: ResolverTypeWrapper<
    Omit<CartAutomaticDiscountAllocation, 'discountApplication'> & {
      discountApplication: ResolversTypes['CartDiscountApplication'];
    }
  >;
  CartBillingAddressUpdatePayload: ResolverTypeWrapper<
    Omit<CartBillingAddressUpdatePayload, 'cart'> & {
      cart?: Maybe<ResolversTypes['Cart']>;
    }
  >;
  CartBuyerIdentity: ResolverTypeWrapper<
    Omit<
      CartBuyerIdentity,
      'customer' | 'deliveryAddressPreferences' | 'purchasingCompany'
    > & {
      customer?: Maybe<ResolversTypes['Customer']>;
      deliveryAddressPreferences: Array<ResolversTypes['DeliveryAddress']>;
      purchasingCompany?: Maybe<ResolversTypes['PurchasingCompany']>;
    }
  >;
  CartBuyerIdentityInput: CartBuyerIdentityInput;
  CartBuyerIdentityUpdatePayload: ResolverTypeWrapper<
    Omit<CartBuyerIdentityUpdatePayload, 'cart'> & {
      cart?: Maybe<ResolversTypes['Cart']>;
    }
  >;
  CartCardSource: CartCardSource;
  CartCodeDiscountAllocation: ResolverTypeWrapper<
    Omit<CartCodeDiscountAllocation, 'discountApplication'> & {
      discountApplication: ResolversTypes['CartDiscountApplication'];
    }
  >;
  CartCompletionAction: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['CartCompletionAction']
  >;
  CartCompletionActionRequired: ResolverTypeWrapper<
    Omit<CartCompletionActionRequired, 'action'> & {
      action?: Maybe<ResolversTypes['CartCompletionAction']>;
    }
  >;
  CartCompletionAttemptResult: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['CartCompletionAttemptResult']
  >;
  CartCompletionFailed: ResolverTypeWrapper<CartCompletionFailed>;
  CartCompletionProcessing: ResolverTypeWrapper<CartCompletionProcessing>;
  CartCompletionSuccess: ResolverTypeWrapper<CartCompletionSuccess>;
  CartCost: ResolverTypeWrapper<CartCost>;
  CartCreatePayload: ResolverTypeWrapper<
    Omit<CartCreatePayload, 'cart'> & {cart?: Maybe<ResolversTypes['Cart']>}
  >;
  CartCustomDiscountAllocation: ResolverTypeWrapper<
    Omit<CartCustomDiscountAllocation, 'discountApplication'> & {
      discountApplication: ResolversTypes['CartDiscountApplication'];
    }
  >;
  CartDelivery: ResolverTypeWrapper<
    Omit<CartDelivery, 'addresses'> & {
      addresses: Array<ResolversTypes['CartSelectableAddress']>;
    }
  >;
  CartDeliveryAddress: ResolverTypeWrapper<CartDeliveryAddress>;
  CartDeliveryAddressInput: CartDeliveryAddressInput;
  CartDeliveryAddressesAddPayload: ResolverTypeWrapper<
    Omit<CartDeliveryAddressesAddPayload, 'cart'> & {
      cart?: Maybe<ResolversTypes['Cart']>;
    }
  >;
  CartDeliveryAddressesRemovePayload: ResolverTypeWrapper<
    Omit<CartDeliveryAddressesRemovePayload, 'cart'> & {
      cart?: Maybe<ResolversTypes['Cart']>;
    }
  >;
  CartDeliveryAddressesUpdatePayload: ResolverTypeWrapper<
    Omit<CartDeliveryAddressesUpdatePayload, 'cart'> & {
      cart?: Maybe<ResolversTypes['Cart']>;
    }
  >;
  CartDeliveryCoordinatesPreference: ResolverTypeWrapper<CartDeliveryCoordinatesPreference>;
  CartDeliveryCoordinatesPreferenceInput: CartDeliveryCoordinatesPreferenceInput;
  CartDeliveryGroup: ResolverTypeWrapper<
    Omit<CartDeliveryGroup, 'cartLines'> & {
      cartLines: ResolversTypes['BaseCartLineConnection'];
    }
  >;
  CartDeliveryGroupConnection: ResolverTypeWrapper<
    Omit<CartDeliveryGroupConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['CartDeliveryGroupEdge']>;
      nodes: Array<ResolversTypes['CartDeliveryGroup']>;
    }
  >;
  CartDeliveryGroupEdge: ResolverTypeWrapper<
    Omit<CartDeliveryGroupEdge, 'node'> & {
      node: ResolversTypes['CartDeliveryGroup'];
    }
  >;
  CartDeliveryGroupType: CartDeliveryGroupType;
  CartDeliveryInput: CartDeliveryInput;
  CartDeliveryOption: ResolverTypeWrapper<CartDeliveryOption>;
  CartDeliveryPreference: ResolverTypeWrapper<CartDeliveryPreference>;
  CartDeliveryPreferenceInput: CartDeliveryPreferenceInput;
  CartDirectPaymentMethodInput: CartDirectPaymentMethodInput;
  CartDiscountAllocation: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['CartDiscountAllocation']
  >;
  CartDiscountApplication: ResolverTypeWrapper<
    Omit<CartDiscountApplication, 'value'> & {
      value: ResolversTypes['PricingValue'];
    }
  >;
  CartDiscountCode: ResolverTypeWrapper<CartDiscountCode>;
  CartDiscountCodesUpdatePayload: ResolverTypeWrapper<
    Omit<CartDiscountCodesUpdatePayload, 'cart'> & {
      cart?: Maybe<ResolversTypes['Cart']>;
    }
  >;
  CartErrorCode: CartErrorCode;
  CartEstimatedCost: ResolverTypeWrapper<CartEstimatedCost>;
  CartFreePaymentMethodInput: CartFreePaymentMethodInput;
  CartGiftCardCodesRemovePayload: ResolverTypeWrapper<
    Omit<CartGiftCardCodesRemovePayload, 'cart'> & {
      cart?: Maybe<ResolversTypes['Cart']>;
    }
  >;
  CartGiftCardCodesUpdatePayload: ResolverTypeWrapper<
    Omit<CartGiftCardCodesUpdatePayload, 'cart'> & {
      cart?: Maybe<ResolversTypes['Cart']>;
    }
  >;
  CartInput: CartInput;
  CartInputMetafieldInput: CartInputMetafieldInput;
  CartLine: ResolverTypeWrapper<
    Omit<
      CartLine,
      'discountAllocations' | 'merchandise' | 'sellingPlanAllocation'
    > & {
      discountAllocations: Array<ResolversTypes['CartDiscountAllocation']>;
      merchandise: ResolversTypes['Merchandise'];
      sellingPlanAllocation?: Maybe<ResolversTypes['SellingPlanAllocation']>;
    }
  >;
  CartLineCost: ResolverTypeWrapper<CartLineCost>;
  CartLineEstimatedCost: ResolverTypeWrapper<CartLineEstimatedCost>;
  CartLineInput: CartLineInput;
  CartLineUpdateInput: CartLineUpdateInput;
  CartLinesAddPayload: ResolverTypeWrapper<
    Omit<CartLinesAddPayload, 'cart'> & {cart?: Maybe<ResolversTypes['Cart']>}
  >;
  CartLinesRemovePayload: ResolverTypeWrapper<
    Omit<CartLinesRemovePayload, 'cart'> & {
      cart?: Maybe<ResolversTypes['Cart']>;
    }
  >;
  CartLinesUpdatePayload: ResolverTypeWrapper<
    Omit<CartLinesUpdatePayload, 'cart'> & {
      cart?: Maybe<ResolversTypes['Cart']>;
    }
  >;
  CartMetafieldDeleteInput: CartMetafieldDeleteInput;
  CartMetafieldDeletePayload: ResolverTypeWrapper<CartMetafieldDeletePayload>;
  CartMetafieldsSetInput: CartMetafieldsSetInput;
  CartMetafieldsSetPayload: ResolverTypeWrapper<
    Omit<CartMetafieldsSetPayload, 'metafields'> & {
      metafields?: Maybe<Array<ResolversTypes['Metafield']>>;
    }
  >;
  CartNoteUpdatePayload: ResolverTypeWrapper<
    Omit<CartNoteUpdatePayload, 'cart'> & {cart?: Maybe<ResolversTypes['Cart']>}
  >;
  CartOperationError: ResolverTypeWrapper<CartOperationError>;
  CartPaymentInput: CartPaymentInput;
  CartPaymentUpdatePayload: ResolverTypeWrapper<
    Omit<CartPaymentUpdatePayload, 'cart'> & {
      cart?: Maybe<ResolversTypes['Cart']>;
    }
  >;
  CartPreferences: ResolverTypeWrapper<CartPreferences>;
  CartPreferencesInput: CartPreferencesInput;
  CartPrepareForCompletionPayload: ResolverTypeWrapper<
    Omit<CartPrepareForCompletionPayload, 'result'> & {
      result?: Maybe<ResolversTypes['CartPrepareForCompletionResult']>;
    }
  >;
  CartPrepareForCompletionResult: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['CartPrepareForCompletionResult']
  >;
  CartSelectableAddress: ResolverTypeWrapper<
    Omit<CartSelectableAddress, 'address'> & {
      address: ResolversTypes['CartAddress'];
    }
  >;
  CartSelectableAddressInput: CartSelectableAddressInput;
  CartSelectableAddressUpdateInput: CartSelectableAddressUpdateInput;
  CartSelectedDeliveryOptionInput: CartSelectedDeliveryOptionInput;
  CartSelectedDeliveryOptionsUpdatePayload: ResolverTypeWrapper<
    Omit<CartSelectedDeliveryOptionsUpdatePayload, 'cart'> & {
      cart?: Maybe<ResolversTypes['Cart']>;
    }
  >;
  CartStatusNotReady: ResolverTypeWrapper<
    Omit<CartStatusNotReady, 'cart'> & {cart?: Maybe<ResolversTypes['Cart']>}
  >;
  CartStatusReady: ResolverTypeWrapper<
    Omit<CartStatusReady, 'cart'> & {cart?: Maybe<ResolversTypes['Cart']>}
  >;
  CartSubmitForCompletionPayload: ResolverTypeWrapper<
    Omit<CartSubmitForCompletionPayload, 'result'> & {
      result?: Maybe<ResolversTypes['CartSubmitForCompletionResult']>;
    }
  >;
  CartSubmitForCompletionResult: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['CartSubmitForCompletionResult']
  >;
  CartThrottled: ResolverTypeWrapper<CartThrottled>;
  CartUserError: ResolverTypeWrapper<CartUserError>;
  CartWalletPaymentMethodInput: CartWalletPaymentMethodInput;
  CartWarning: ResolverTypeWrapper<CartWarning>;
  CartWarningCode: CartWarningCode;
  CategoryFilter: CategoryFilter;
  Collection: ResolverTypeWrapper<
    Omit<Collection, 'image' | 'metafield' | 'metafields' | 'products'> & {
      image?: Maybe<ResolversTypes['Image']>;
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
      products: ResolversTypes['ProductConnection'];
    }
  >;
  CollectionConnection: ResolverTypeWrapper<
    Omit<CollectionConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['CollectionEdge']>;
      nodes: Array<ResolversTypes['Collection']>;
    }
  >;
  CollectionEdge: ResolverTypeWrapper<
    Omit<CollectionEdge, 'node'> & {node: ResolversTypes['Collection']}
  >;
  CollectionSortKeys: CollectionSortKeys;
  Color: ResolverTypeWrapper<Scalars['Color']['output']>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentAuthor: ResolverTypeWrapper<CommentAuthor>;
  CommentConnection: ResolverTypeWrapper<CommentConnection>;
  CommentEdge: ResolverTypeWrapper<CommentEdge>;
  Company: ResolverTypeWrapper<
    Omit<Company, 'metafield' | 'metafields'> & {
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
    }
  >;
  CompanyContact: ResolverTypeWrapper<CompanyContact>;
  CompanyLocation: ResolverTypeWrapper<
    Omit<CompanyLocation, 'metafield' | 'metafields'> & {
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
    }
  >;
  CompletePaymentChallenge: ResolverTypeWrapper<CompletePaymentChallenge>;
  CompletionError: ResolverTypeWrapper<CompletionError>;
  CompletionErrorCode: CompletionErrorCode;
  ComponentizableCartLine: ResolverTypeWrapper<
    Omit<
      ComponentizableCartLine,
      | 'discountAllocations'
      | 'lineComponents'
      | 'merchandise'
      | 'sellingPlanAllocation'
    > & {
      discountAllocations: Array<ResolversTypes['CartDiscountAllocation']>;
      lineComponents: Array<ResolversTypes['CartLine']>;
      merchandise: ResolversTypes['Merchandise'];
      sellingPlanAllocation?: Maybe<ResolversTypes['SellingPlanAllocation']>;
    }
  >;
  Count: ResolverTypeWrapper<Count>;
  CountPrecision: CountPrecision;
  Country: ResolverTypeWrapper<
    Omit<Country, 'market'> & {market?: Maybe<ResolversTypes['Market']>}
  >;
  CountryCode: CountryCode;
  CropRegion: CropRegion;
  Currency: ResolverTypeWrapper<Currency>;
  CurrencyCode: CurrencyCode;
  Customer: ResolverTypeWrapper<
    Omit<Customer, 'metafield' | 'metafields' | 'orders'> & {
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
      orders: ResolversTypes['OrderConnection'];
    }
  >;
  CustomerAccessToken: ResolverTypeWrapper<CustomerAccessToken>;
  CustomerAccessTokenCreateInput: CustomerAccessTokenCreateInput;
  CustomerAccessTokenCreatePayload: ResolverTypeWrapper<CustomerAccessTokenCreatePayload>;
  CustomerAccessTokenCreateWithMultipassPayload: ResolverTypeWrapper<CustomerAccessTokenCreateWithMultipassPayload>;
  CustomerAccessTokenDeletePayload: ResolverTypeWrapper<CustomerAccessTokenDeletePayload>;
  CustomerAccessTokenRenewPayload: ResolverTypeWrapper<CustomerAccessTokenRenewPayload>;
  CustomerActivateByUrlPayload: ResolverTypeWrapper<
    Omit<CustomerActivateByUrlPayload, 'customer'> & {
      customer?: Maybe<ResolversTypes['Customer']>;
    }
  >;
  CustomerActivateInput: CustomerActivateInput;
  CustomerActivatePayload: ResolverTypeWrapper<
    Omit<CustomerActivatePayload, 'customer'> & {
      customer?: Maybe<ResolversTypes['Customer']>;
    }
  >;
  CustomerAddressCreatePayload: ResolverTypeWrapper<CustomerAddressCreatePayload>;
  CustomerAddressDeletePayload: ResolverTypeWrapper<CustomerAddressDeletePayload>;
  CustomerAddressUpdatePayload: ResolverTypeWrapper<CustomerAddressUpdatePayload>;
  CustomerCreateInput: CustomerCreateInput;
  CustomerCreatePayload: ResolverTypeWrapper<
    Omit<CustomerCreatePayload, 'customer'> & {
      customer?: Maybe<ResolversTypes['Customer']>;
    }
  >;
  CustomerDefaultAddressUpdatePayload: ResolverTypeWrapper<
    Omit<CustomerDefaultAddressUpdatePayload, 'customer'> & {
      customer?: Maybe<ResolversTypes['Customer']>;
    }
  >;
  CustomerErrorCode: CustomerErrorCode;
  CustomerRecoverPayload: ResolverTypeWrapper<CustomerRecoverPayload>;
  CustomerResetByUrlPayload: ResolverTypeWrapper<
    Omit<CustomerResetByUrlPayload, 'customer'> & {
      customer?: Maybe<ResolversTypes['Customer']>;
    }
  >;
  CustomerResetInput: CustomerResetInput;
  CustomerResetPayload: ResolverTypeWrapper<
    Omit<CustomerResetPayload, 'customer'> & {
      customer?: Maybe<ResolversTypes['Customer']>;
    }
  >;
  CustomerUpdateInput: CustomerUpdateInput;
  CustomerUpdatePayload: ResolverTypeWrapper<
    Omit<CustomerUpdatePayload, 'customer'> & {
      customer?: Maybe<ResolversTypes['Customer']>;
    }
  >;
  CustomerUserError: ResolverTypeWrapper<CustomerUserError>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']['output']>;
  DeliveryAddress: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['DeliveryAddress']
  >;
  DeliveryAddressInput: DeliveryAddressInput;
  DeliveryAddressValidationStrategy: DeliveryAddressValidationStrategy;
  DeliveryMethodType: DeliveryMethodType;
  DigitalWallet: DigitalWallet;
  DiscountAllocation: ResolverTypeWrapper<
    Omit<DiscountAllocation, 'discountApplication'> & {
      discountApplication: ResolversTypes['DiscountApplication'];
    }
  >;
  DiscountApplication: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['DiscountApplication']
  >;
  DiscountApplicationAllocationMethod: DiscountApplicationAllocationMethod;
  DiscountApplicationConnection: ResolverTypeWrapper<
    Omit<DiscountApplicationConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['DiscountApplicationEdge']>;
      nodes: Array<ResolversTypes['DiscountApplication']>;
    }
  >;
  DiscountApplicationEdge: ResolverTypeWrapper<
    Omit<DiscountApplicationEdge, 'node'> & {
      node: ResolversTypes['DiscountApplication'];
    }
  >;
  DiscountApplicationTargetSelection: DiscountApplicationTargetSelection;
  DiscountApplicationTargetType: DiscountApplicationTargetType;
  DiscountCodeApplication: ResolverTypeWrapper<
    Omit<DiscountCodeApplication, 'value'> & {
      value: ResolversTypes['PricingValue'];
    }
  >;
  DisplayableError: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['DisplayableError']
  >;
  Domain: ResolverTypeWrapper<Domain>;
  ExternalVideo: ResolverTypeWrapper<
    Omit<ExternalVideo, 'previewImage'> & {
      previewImage?: Maybe<ResolversTypes['Image']>;
    }
  >;
  Filter: ResolverTypeWrapper<
    Omit<Filter, 'values'> & {values: Array<ResolversTypes['FilterValue']>}
  >;
  FilterPresentation: FilterPresentation;
  FilterType: FilterType;
  FilterValue: ResolverTypeWrapper<
    Omit<FilterValue, 'image' | 'swatch'> & {
      image?: Maybe<ResolversTypes['MediaImage']>;
      swatch?: Maybe<ResolversTypes['Swatch']>;
    }
  >;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Fulfillment: ResolverTypeWrapper<
    Omit<Fulfillment, 'fulfillmentLineItems'> & {
      fulfillmentLineItems: ResolversTypes['FulfillmentLineItemConnection'];
    }
  >;
  FulfillmentLineItem: ResolverTypeWrapper<
    Omit<FulfillmentLineItem, 'lineItem'> & {
      lineItem: ResolversTypes['OrderLineItem'];
    }
  >;
  FulfillmentLineItemConnection: ResolverTypeWrapper<
    Omit<FulfillmentLineItemConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['FulfillmentLineItemEdge']>;
      nodes: Array<ResolversTypes['FulfillmentLineItem']>;
    }
  >;
  FulfillmentLineItemEdge: ResolverTypeWrapper<
    Omit<FulfillmentLineItemEdge, 'node'> & {
      node: ResolversTypes['FulfillmentLineItem'];
    }
  >;
  FulfillmentTrackingInfo: ResolverTypeWrapper<FulfillmentTrackingInfo>;
  GenericFile: ResolverTypeWrapper<
    Omit<GenericFile, 'previewImage'> & {
      previewImage?: Maybe<ResolversTypes['Image']>;
    }
  >;
  GeoCoordinateInput: GeoCoordinateInput;
  HTML: ResolverTypeWrapper<Scalars['HTML']['output']>;
  HasMetafields: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['HasMetafields']
  >;
  HasMetafieldsIdentifier: HasMetafieldsIdentifier;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ISO8601DateTime: ResolverTypeWrapper<Scalars['ISO8601DateTime']['output']>;
  Image: ResolverTypeWrapper<Image>;
  ImageConnection: ResolverTypeWrapper<
    Omit<ImageConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['ImageEdge']>;
      nodes: Array<ResolversTypes['Image']>;
    }
  >;
  ImageContentType: ImageContentType;
  ImageEdge: ResolverTypeWrapper<
    Omit<ImageEdge, 'node'> & {node: ResolversTypes['Image']}
  >;
  ImageTransformInput: ImageTransformInput;
  InContextAnnotation: ResolverTypeWrapper<InContextAnnotation>;
  InContextAnnotationType: ResolverTypeWrapper<InContextAnnotationType>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Language: ResolverTypeWrapper<Language>;
  LanguageCode: LanguageCode;
  Localization: ResolverTypeWrapper<
    Omit<Localization, 'availableCountries' | 'country' | 'market'> & {
      availableCountries: Array<ResolversTypes['Country']>;
      country: ResolversTypes['Country'];
      market: ResolversTypes['Market'];
    }
  >;
  Location: ResolverTypeWrapper<
    Omit<Location, 'address' | 'metafield' | 'metafields'> & {
      address: ResolversTypes['LocationAddress'];
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
    }
  >;
  LocationAddress: ResolverTypeWrapper<LocationAddress>;
  LocationConnection: ResolverTypeWrapper<
    Omit<LocationConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['LocationEdge']>;
      nodes: Array<ResolversTypes['Location']>;
    }
  >;
  LocationEdge: ResolverTypeWrapper<
    Omit<LocationEdge, 'node'> & {node: ResolversTypes['Location']}
  >;
  LocationSortKeys: LocationSortKeys;
  MailingAddress: ResolverTypeWrapper<MailingAddress>;
  MailingAddressConnection: ResolverTypeWrapper<MailingAddressConnection>;
  MailingAddressEdge: ResolverTypeWrapper<MailingAddressEdge>;
  MailingAddressInput: MailingAddressInput;
  ManualDiscountApplication: ResolverTypeWrapper<
    Omit<ManualDiscountApplication, 'value'> & {
      value: ResolversTypes['PricingValue'];
    }
  >;
  Market: ResolverTypeWrapper<
    Omit<Market, 'metafield' | 'metafields'> & {
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
    }
  >;
  Media: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Media']>;
  MediaConnection: ResolverTypeWrapper<
    Omit<MediaConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['MediaEdge']>;
      nodes: Array<ResolversTypes['Media']>;
    }
  >;
  MediaContentType: MediaContentType;
  MediaEdge: ResolverTypeWrapper<
    Omit<MediaEdge, 'node'> & {node: ResolversTypes['Media']}
  >;
  MediaHost: MediaHost;
  MediaImage: ResolverTypeWrapper<
    Omit<MediaImage, 'image' | 'previewImage'> & {
      image?: Maybe<ResolversTypes['Image']>;
      previewImage?: Maybe<ResolversTypes['Image']>;
    }
  >;
  MediaPresentation: ResolverTypeWrapper<MediaPresentation>;
  MediaPresentationFormat: MediaPresentationFormat;
  Menu: ResolverTypeWrapper<
    Omit<Menu, 'items'> & {items: Array<ResolversTypes['MenuItem']>}
  >;
  MenuItem: ResolverTypeWrapper<
    Omit<MenuItem, 'items' | 'resource'> & {
      items: Array<ResolversTypes['MenuItem']>;
      resource?: Maybe<ResolversTypes['MenuItemResource']>;
    }
  >;
  MenuItemResource: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['MenuItemResource']
  >;
  MenuItemType: MenuItemType;
  Merchandise: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['Merchandise']
  >;
  Metafield: ResolverTypeWrapper<
    Omit<Metafield, 'parentResource' | 'reference' | 'references'> & {
      parentResource: ResolversTypes['MetafieldParentResource'];
      reference?: Maybe<ResolversTypes['MetafieldReference']>;
      references?: Maybe<ResolversTypes['MetafieldReferenceConnection']>;
    }
  >;
  MetafieldDeleteErrorCode: MetafieldDeleteErrorCode;
  MetafieldDeleteUserError: ResolverTypeWrapper<MetafieldDeleteUserError>;
  MetafieldFilter: MetafieldFilter;
  MetafieldParentResource: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['MetafieldParentResource']
  >;
  MetafieldReference: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['MetafieldReference']
  >;
  MetafieldReferenceConnection: ResolverTypeWrapper<
    Omit<MetafieldReferenceConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['MetafieldReferenceEdge']>;
      nodes: Array<ResolversTypes['MetafieldReference']>;
    }
  >;
  MetafieldReferenceEdge: ResolverTypeWrapper<
    Omit<MetafieldReferenceEdge, 'node'> & {
      node: ResolversTypes['MetafieldReference'];
    }
  >;
  MetafieldsSetUserError: ResolverTypeWrapper<MetafieldsSetUserError>;
  MetafieldsSetUserErrorCode: MetafieldsSetUserErrorCode;
  Metaobject: ResolverTypeWrapper<
    Omit<Metaobject, 'field' | 'fields' | 'seo'> & {
      field?: Maybe<ResolversTypes['MetaobjectField']>;
      fields: Array<ResolversTypes['MetaobjectField']>;
      seo?: Maybe<ResolversTypes['MetaobjectSEO']>;
    }
  >;
  MetaobjectConnection: ResolverTypeWrapper<
    Omit<MetaobjectConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['MetaobjectEdge']>;
      nodes: Array<ResolversTypes['Metaobject']>;
    }
  >;
  MetaobjectEdge: ResolverTypeWrapper<
    Omit<MetaobjectEdge, 'node'> & {node: ResolversTypes['Metaobject']}
  >;
  MetaobjectField: ResolverTypeWrapper<
    Omit<MetaobjectField, 'reference' | 'references'> & {
      reference?: Maybe<ResolversTypes['MetafieldReference']>;
      references?: Maybe<ResolversTypes['MetafieldReferenceConnection']>;
    }
  >;
  MetaobjectHandleInput: MetaobjectHandleInput;
  MetaobjectSEO: ResolverTypeWrapper<
    Omit<MetaobjectSeo, 'description' | 'title'> & {
      description?: Maybe<ResolversTypes['MetaobjectField']>;
      title?: Maybe<ResolversTypes['MetaobjectField']>;
    }
  >;
  Model3d: ResolverTypeWrapper<
    Omit<Model3d, 'previewImage'> & {
      previewImage?: Maybe<ResolversTypes['Image']>;
    }
  >;
  Model3dSource: ResolverTypeWrapper<Model3dSource>;
  MoneyInput: MoneyInput;
  MoneyV2: ResolverTypeWrapper<MoneyV2>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  OnlineStorePublishable: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['OnlineStorePublishable']
  >;
  Order: ResolverTypeWrapper<
    Omit<
      Order,
      | 'discountApplications'
      | 'lineItems'
      | 'metafield'
      | 'metafields'
      | 'shippingDiscountAllocations'
      | 'successfulFulfillments'
    > & {
      discountApplications: ResolversTypes['DiscountApplicationConnection'];
      lineItems: ResolversTypes['OrderLineItemConnection'];
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
      shippingDiscountAllocations: Array<ResolversTypes['DiscountAllocation']>;
      successfulFulfillments?: Maybe<Array<ResolversTypes['Fulfillment']>>;
    }
  >;
  OrderCancelReason: OrderCancelReason;
  OrderConnection: ResolverTypeWrapper<
    Omit<OrderConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['OrderEdge']>;
      nodes: Array<ResolversTypes['Order']>;
    }
  >;
  OrderEdge: ResolverTypeWrapper<
    Omit<OrderEdge, 'node'> & {node: ResolversTypes['Order']}
  >;
  OrderFinancialStatus: OrderFinancialStatus;
  OrderFulfillmentStatus: OrderFulfillmentStatus;
  OrderLineItem: ResolverTypeWrapper<
    Omit<OrderLineItem, 'discountAllocations' | 'variant'> & {
      discountAllocations: Array<ResolversTypes['DiscountAllocation']>;
      variant?: Maybe<ResolversTypes['ProductVariant']>;
    }
  >;
  OrderLineItemConnection: ResolverTypeWrapper<
    Omit<OrderLineItemConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['OrderLineItemEdge']>;
      nodes: Array<ResolversTypes['OrderLineItem']>;
    }
  >;
  OrderLineItemEdge: ResolverTypeWrapper<
    Omit<OrderLineItemEdge, 'node'> & {node: ResolversTypes['OrderLineItem']}
  >;
  OrderSortKeys: OrderSortKeys;
  Page: ResolverTypeWrapper<
    Omit<Page, 'metafield' | 'metafields'> & {
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
    }
  >;
  PageConnection: ResolverTypeWrapper<
    Omit<PageConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['PageEdge']>;
      nodes: Array<ResolversTypes['Page']>;
    }
  >;
  PageEdge: ResolverTypeWrapper<
    Omit<PageEdge, 'node'> & {node: ResolversTypes['Page']}
  >;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PageSortKeys: PageSortKeys;
  PaginatedSitemapResources: ResolverTypeWrapper<
    Omit<PaginatedSitemapResources, 'items'> & {
      items: Array<ResolversTypes['SitemapResourceInterface']>;
    }
  >;
  PaymentSettings: ResolverTypeWrapper<PaymentSettings>;
  PredictiveSearchLimitScope: PredictiveSearchLimitScope;
  PredictiveSearchResult: ResolverTypeWrapper<
    Omit<
      PredictiveSearchResult,
      'articles' | 'collections' | 'pages' | 'products'
    > & {
      articles: Array<ResolversTypes['Article']>;
      collections: Array<ResolversTypes['Collection']>;
      pages: Array<ResolversTypes['Page']>;
      products: Array<ResolversTypes['Product']>;
    }
  >;
  PredictiveSearchType: PredictiveSearchType;
  PreferenceDeliveryMethodType: PreferenceDeliveryMethodType;
  PriceRangeFilter: PriceRangeFilter;
  PricingPercentageValue: ResolverTypeWrapper<PricingPercentageValue>;
  PricingValue: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['PricingValue']
  >;
  Product: ResolverTypeWrapper<
    Omit<
      Product,
      | 'adjacentVariants'
      | 'collections'
      | 'featuredImage'
      | 'images'
      | 'media'
      | 'metafield'
      | 'metafields'
      | 'options'
      | 'selectedOrFirstAvailableVariant'
      | 'sellingPlanGroups'
      | 'variantBySelectedOptions'
    > & {
      adjacentVariants: Array<ResolversTypes['ProductVariant']>;
      collections: ResolversTypes['CollectionConnection'];
      featuredImage?: Maybe<ResolversTypes['Image']>;
      images: ResolversTypes['ImageConnection'];
      media: ResolversTypes['MediaConnection'];
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
      options: Array<ResolversTypes['ProductOption']>;
      selectedOrFirstAvailableVariant?: Maybe<ResolversTypes['ProductVariant']>;
      sellingPlanGroups: ResolversTypes['SellingPlanGroupConnection'];
      variantBySelectedOptions?: Maybe<ResolversTypes['ProductVariant']>;
    }
  >;
  ProductCollectionSortKeys: ProductCollectionSortKeys;
  ProductConnection: ResolverTypeWrapper<
    Omit<ProductConnection, 'edges' | 'filters' | 'nodes'> & {
      edges: Array<ResolversTypes['ProductEdge']>;
      filters: Array<ResolversTypes['Filter']>;
      nodes: Array<ResolversTypes['Product']>;
    }
  >;
  ProductEdge: ResolverTypeWrapper<
    Omit<ProductEdge, 'node'> & {node: ResolversTypes['Product']}
  >;
  ProductFilter: ProductFilter;
  ProductImageSortKeys: ProductImageSortKeys;
  ProductMediaSortKeys: ProductMediaSortKeys;
  ProductOption: ResolverTypeWrapper<
    Omit<ProductOption, 'optionValues'> & {
      optionValues: Array<ResolversTypes['ProductOptionValue']>;
    }
  >;
  ProductOptionValue: ResolverTypeWrapper<
    Omit<ProductOptionValue, 'firstSelectableVariant' | 'swatch'> & {
      firstSelectableVariant?: Maybe<ResolversTypes['ProductVariant']>;
      swatch?: Maybe<ResolversTypes['ProductOptionValueSwatch']>;
    }
  >;
  ProductOptionValueSwatch: ResolverTypeWrapper<
    Omit<ProductOptionValueSwatch, 'image'> & {
      image?: Maybe<ResolversTypes['Media']>;
    }
  >;
  ProductPriceRange: ResolverTypeWrapper<ProductPriceRange>;
  ProductRecommendationIntent: ProductRecommendationIntent;
  ProductSortKeys: ProductSortKeys;
  ProductVariant: ResolverTypeWrapper<
    Omit<
      ProductVariant,
      | 'image'
      | 'metafield'
      | 'metafields'
      | 'product'
      | 'sellingPlanAllocations'
      | 'storeAvailability'
    > & {
      image?: Maybe<ResolversTypes['Image']>;
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
      product: ResolversTypes['Product'];
      sellingPlanAllocations: ResolversTypes['SellingPlanAllocationConnection'];
      storeAvailability: ResolversTypes['StoreAvailabilityConnection'];
    }
  >;
  ProductVariantComponent: ResolverTypeWrapper<
    Omit<ProductVariantComponent, 'productVariant'> & {
      productVariant: ResolversTypes['ProductVariant'];
    }
  >;
  ProductVariantComponentConnection: ResolverTypeWrapper<ProductVariantComponentConnection>;
  ProductVariantComponentEdge: ResolverTypeWrapper<ProductVariantComponentEdge>;
  ProductVariantConnection: ResolverTypeWrapper<
    Omit<ProductVariantConnection, 'nodes'> & {
      nodes: Array<ResolversTypes['ProductVariant']>;
    }
  >;
  ProductVariantEdge: ResolverTypeWrapper<
    Omit<ProductVariantEdge, 'node'> & {node: ResolversTypes['ProductVariant']}
  >;
  ProductVariantSortKeys: ProductVariantSortKeys;
  PurchasingCompany: ResolverTypeWrapper<
    Omit<PurchasingCompany, 'company' | 'location'> & {
      company: ResolversTypes['Company'];
      location: ResolversTypes['CompanyLocation'];
    }
  >;
  QuantityPriceBreak: ResolverTypeWrapper<QuantityPriceBreak>;
  QuantityPriceBreakConnection: ResolverTypeWrapper<QuantityPriceBreakConnection>;
  QuantityPriceBreakEdge: ResolverTypeWrapper<QuantityPriceBreakEdge>;
  QuantityRule: ResolverTypeWrapper<QuantityRule>;
  QueryRoot: ResolverTypeWrapper<{}>;
  SEO: ResolverTypeWrapper<Seo>;
  ScriptDiscountApplication: ResolverTypeWrapper<
    Omit<ScriptDiscountApplication, 'value'> & {
      value: ResolversTypes['PricingValue'];
    }
  >;
  SearchPrefixQueryType: SearchPrefixQueryType;
  SearchQuerySuggestion: ResolverTypeWrapper<SearchQuerySuggestion>;
  SearchResultItem: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['SearchResultItem']
  >;
  SearchResultItemConnection: ResolverTypeWrapper<
    Omit<SearchResultItemConnection, 'edges' | 'nodes' | 'productFilters'> & {
      edges: Array<ResolversTypes['SearchResultItemEdge']>;
      nodes: Array<ResolversTypes['SearchResultItem']>;
      productFilters: Array<ResolversTypes['Filter']>;
    }
  >;
  SearchResultItemEdge: ResolverTypeWrapper<
    Omit<SearchResultItemEdge, 'node'> & {
      node: ResolversTypes['SearchResultItem'];
    }
  >;
  SearchSortKeys: SearchSortKeys;
  SearchType: SearchType;
  SearchUnavailableProductsType: SearchUnavailableProductsType;
  SearchableField: SearchableField;
  SelectedOption: ResolverTypeWrapper<SelectedOption>;
  SelectedOptionInput: SelectedOptionInput;
  SellingPlan: ResolverTypeWrapper<
    Omit<
      SellingPlan,
      | 'billingPolicy'
      | 'checkoutCharge'
      | 'deliveryPolicy'
      | 'metafield'
      | 'metafields'
      | 'priceAdjustments'
    > & {
      billingPolicy?: Maybe<ResolversTypes['SellingPlanBillingPolicy']>;
      checkoutCharge: ResolversTypes['SellingPlanCheckoutCharge'];
      deliveryPolicy?: Maybe<ResolversTypes['SellingPlanDeliveryPolicy']>;
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
      priceAdjustments: Array<ResolversTypes['SellingPlanPriceAdjustment']>;
    }
  >;
  SellingPlanAllocation: ResolverTypeWrapper<
    Omit<SellingPlanAllocation, 'priceAdjustments' | 'sellingPlan'> & {
      priceAdjustments: Array<
        ResolversTypes['SellingPlanAllocationPriceAdjustment']
      >;
      sellingPlan: ResolversTypes['SellingPlan'];
    }
  >;
  SellingPlanAllocationConnection: ResolverTypeWrapper<
    Omit<SellingPlanAllocationConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['SellingPlanAllocationEdge']>;
      nodes: Array<ResolversTypes['SellingPlanAllocation']>;
    }
  >;
  SellingPlanAllocationEdge: ResolverTypeWrapper<
    Omit<SellingPlanAllocationEdge, 'node'> & {
      node: ResolversTypes['SellingPlanAllocation'];
    }
  >;
  SellingPlanAllocationPriceAdjustment: ResolverTypeWrapper<SellingPlanAllocationPriceAdjustment>;
  SellingPlanBillingPolicy: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['SellingPlanBillingPolicy']
  >;
  SellingPlanCheckoutCharge: ResolverTypeWrapper<
    Omit<SellingPlanCheckoutCharge, 'value'> & {
      value: ResolversTypes['SellingPlanCheckoutChargeValue'];
    }
  >;
  SellingPlanCheckoutChargePercentageValue: ResolverTypeWrapper<SellingPlanCheckoutChargePercentageValue>;
  SellingPlanCheckoutChargeType: SellingPlanCheckoutChargeType;
  SellingPlanCheckoutChargeValue: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['SellingPlanCheckoutChargeValue']
  >;
  SellingPlanConnection: ResolverTypeWrapper<
    Omit<SellingPlanConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['SellingPlanEdge']>;
      nodes: Array<ResolversTypes['SellingPlan']>;
    }
  >;
  SellingPlanDeliveryPolicy: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['SellingPlanDeliveryPolicy']
  >;
  SellingPlanEdge: ResolverTypeWrapper<
    Omit<SellingPlanEdge, 'node'> & {node: ResolversTypes['SellingPlan']}
  >;
  SellingPlanFixedAmountPriceAdjustment: ResolverTypeWrapper<SellingPlanFixedAmountPriceAdjustment>;
  SellingPlanFixedPriceAdjustment: ResolverTypeWrapper<SellingPlanFixedPriceAdjustment>;
  SellingPlanGroup: ResolverTypeWrapper<
    Omit<SellingPlanGroup, 'options' | 'sellingPlans'> & {
      options: Array<ResolversTypes['SellingPlanGroupOption']>;
      sellingPlans: ResolversTypes['SellingPlanConnection'];
    }
  >;
  SellingPlanGroupConnection: ResolverTypeWrapper<
    Omit<SellingPlanGroupConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['SellingPlanGroupEdge']>;
      nodes: Array<ResolversTypes['SellingPlanGroup']>;
    }
  >;
  SellingPlanGroupEdge: ResolverTypeWrapper<
    Omit<SellingPlanGroupEdge, 'node'> & {
      node: ResolversTypes['SellingPlanGroup'];
    }
  >;
  SellingPlanGroupOption: ResolverTypeWrapper<SellingPlanGroupOption>;
  SellingPlanInterval: SellingPlanInterval;
  SellingPlanOption: ResolverTypeWrapper<SellingPlanOption>;
  SellingPlanPercentagePriceAdjustment: ResolverTypeWrapper<SellingPlanPercentagePriceAdjustment>;
  SellingPlanPriceAdjustment: ResolverTypeWrapper<
    Omit<SellingPlanPriceAdjustment, 'adjustmentValue'> & {
      adjustmentValue: ResolversTypes['SellingPlanPriceAdjustmentValue'];
    }
  >;
  SellingPlanPriceAdjustmentValue: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['SellingPlanPriceAdjustmentValue']
  >;
  SellingPlanRecurringBillingPolicy: ResolverTypeWrapper<SellingPlanRecurringBillingPolicy>;
  SellingPlanRecurringDeliveryPolicy: ResolverTypeWrapper<SellingPlanRecurringDeliveryPolicy>;
  Shop: ResolverTypeWrapper<
    Omit<Shop, 'brand' | 'metafield' | 'metafields'> & {
      brand?: Maybe<ResolversTypes['Brand']>;
      metafield?: Maybe<ResolversTypes['Metafield']>;
      metafields: Array<Maybe<ResolversTypes['Metafield']>>;
    }
  >;
  ShopPayInstallmentsFinancingPlan: ResolverTypeWrapper<ShopPayInstallmentsFinancingPlan>;
  ShopPayInstallmentsFinancingPlanFrequency: ShopPayInstallmentsFinancingPlanFrequency;
  ShopPayInstallmentsFinancingPlanTerm: ResolverTypeWrapper<ShopPayInstallmentsFinancingPlanTerm>;
  ShopPayInstallmentsLoan: ShopPayInstallmentsLoan;
  ShopPayInstallmentsPricing: ResolverTypeWrapper<ShopPayInstallmentsPricing>;
  ShopPayInstallmentsProductVariantPricing: ResolverTypeWrapper<ShopPayInstallmentsProductVariantPricing>;
  ShopPayPaymentRequest: ResolverTypeWrapper<ShopPayPaymentRequest>;
  ShopPayPaymentRequestContactField: ResolverTypeWrapper<ShopPayPaymentRequestContactField>;
  ShopPayPaymentRequestDeliveryMethod: ResolverTypeWrapper<ShopPayPaymentRequestDeliveryMethod>;
  ShopPayPaymentRequestDeliveryMethodInput: ShopPayPaymentRequestDeliveryMethodInput;
  ShopPayPaymentRequestDeliveryMethodType: ShopPayPaymentRequestDeliveryMethodType;
  ShopPayPaymentRequestDiscount: ResolverTypeWrapper<ShopPayPaymentRequestDiscount>;
  ShopPayPaymentRequestDiscountInput: ShopPayPaymentRequestDiscountInput;
  ShopPayPaymentRequestImage: ResolverTypeWrapper<ShopPayPaymentRequestImage>;
  ShopPayPaymentRequestImageInput: ShopPayPaymentRequestImageInput;
  ShopPayPaymentRequestInput: ShopPayPaymentRequestInput;
  ShopPayPaymentRequestLineItem: ResolverTypeWrapper<ShopPayPaymentRequestLineItem>;
  ShopPayPaymentRequestLineItemInput: ShopPayPaymentRequestLineItemInput;
  ShopPayPaymentRequestReceipt: ResolverTypeWrapper<ShopPayPaymentRequestReceipt>;
  ShopPayPaymentRequestSession: ResolverTypeWrapper<ShopPayPaymentRequestSession>;
  ShopPayPaymentRequestSessionCreatePayload: ResolverTypeWrapper<ShopPayPaymentRequestSessionCreatePayload>;
  ShopPayPaymentRequestSessionSubmitPayload: ResolverTypeWrapper<ShopPayPaymentRequestSessionSubmitPayload>;
  ShopPayPaymentRequestShippingLine: ResolverTypeWrapper<ShopPayPaymentRequestShippingLine>;
  ShopPayPaymentRequestShippingLineInput: ShopPayPaymentRequestShippingLineInput;
  ShopPayPaymentRequestTotalShippingPrice: ResolverTypeWrapper<ShopPayPaymentRequestTotalShippingPrice>;
  ShopPayPaymentRequestTotalShippingPriceInput: ShopPayPaymentRequestTotalShippingPriceInput;
  ShopPayWalletContentInput: ShopPayWalletContentInput;
  ShopPolicy: ResolverTypeWrapper<ShopPolicy>;
  ShopPolicyWithDefault: ResolverTypeWrapper<ShopPolicyWithDefault>;
  Sitemap: ResolverTypeWrapper<
    Omit<Sitemap, 'resources'> & {
      resources?: Maybe<ResolversTypes['PaginatedSitemapResources']>;
    }
  >;
  SitemapImage: ResolverTypeWrapper<SitemapImage>;
  SitemapResource: ResolverTypeWrapper<SitemapResource>;
  SitemapResourceInterface: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['SitemapResourceInterface']
  >;
  SitemapResourceMetaobject: ResolverTypeWrapper<SitemapResourceMetaobject>;
  SitemapType: SitemapType;
  StoreAvailability: ResolverTypeWrapper<
    Omit<StoreAvailability, 'location'> & {location: ResolversTypes['Location']}
  >;
  StoreAvailabilityConnection: ResolverTypeWrapper<
    Omit<StoreAvailabilityConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['StoreAvailabilityEdge']>;
      nodes: Array<ResolversTypes['StoreAvailability']>;
    }
  >;
  StoreAvailabilityEdge: ResolverTypeWrapper<
    Omit<StoreAvailabilityEdge, 'node'> & {
      node: ResolversTypes['StoreAvailability'];
    }
  >;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringConnection: ResolverTypeWrapper<StringConnection>;
  StringEdge: ResolverTypeWrapper<StringEdge>;
  SubmissionError: ResolverTypeWrapper<SubmissionError>;
  SubmissionErrorCode: SubmissionErrorCode;
  SubmitAlreadyAccepted: ResolverTypeWrapper<SubmitAlreadyAccepted>;
  SubmitFailed: ResolverTypeWrapper<SubmitFailed>;
  SubmitSuccess: ResolverTypeWrapper<SubmitSuccess>;
  SubmitThrottled: ResolverTypeWrapper<SubmitThrottled>;
  Swatch: ResolverTypeWrapper<
    Omit<Swatch, 'image'> & {image?: Maybe<ResolversTypes['MediaImage']>}
  >;
  TaxonomyCategory: ResolverTypeWrapper<TaxonomyCategory>;
  TaxonomyMetafieldFilter: TaxonomyMetafieldFilter;
  Trackable: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['Trackable']
  >;
  URL: ResolverTypeWrapper<Scalars['URL']['output']>;
  UnitPriceMeasurement: ResolverTypeWrapper<UnitPriceMeasurement>;
  UnitPriceMeasurementMeasuredType: UnitPriceMeasurementMeasuredType;
  UnitPriceMeasurementMeasuredUnit: UnitPriceMeasurementMeasuredUnit;
  UnitSystem: UnitSystem;
  UnsignedInt64: ResolverTypeWrapper<Scalars['UnsignedInt64']['output']>;
  UrlRedirect: ResolverTypeWrapper<UrlRedirect>;
  UrlRedirectConnection: ResolverTypeWrapper<UrlRedirectConnection>;
  UrlRedirectEdge: ResolverTypeWrapper<UrlRedirectEdge>;
  UserError: ResolverTypeWrapper<UserError>;
  UserErrorsShopPayPaymentRequestSessionUserErrors: ResolverTypeWrapper<UserErrorsShopPayPaymentRequestSessionUserErrors>;
  UserErrorsShopPayPaymentRequestSessionUserErrorsCode: UserErrorsShopPayPaymentRequestSessionUserErrorsCode;
  VariantOptionFilter: VariantOptionFilter;
  Video: ResolverTypeWrapper<
    Omit<Video, 'previewImage'> & {
      previewImage?: Maybe<ResolversTypes['Image']>;
    }
  >;
  VideoSource: ResolverTypeWrapper<VideoSource>;
  WeightUnit: WeightUnit;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ApiVersion: ApiVersion;
  ApplePayWalletContentInput: ApplePayWalletContentInput;
  ApplePayWalletHeaderInput: ApplePayWalletHeaderInput;
  AppliedGiftCard: AppliedGiftCard;
  Article: Omit<Article, 'blog' | 'image' | 'metafield' | 'metafields'> & {
    blog: ResolversParentTypes['Blog'];
    image?: Maybe<ResolversParentTypes['Image']>;
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
  };
  ArticleAuthor: ArticleAuthor;
  ArticleConnection: Omit<ArticleConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['ArticleEdge']>;
    nodes: Array<ResolversParentTypes['Article']>;
  };
  ArticleEdge: Omit<ArticleEdge, 'node'> & {
    node: ResolversParentTypes['Article'];
  };
  Attribute: Attribute;
  AttributeInput: AttributeInput;
  AutomaticDiscountApplication: Omit<AutomaticDiscountApplication, 'value'> & {
    value: ResolversParentTypes['PricingValue'];
  };
  BaseCartLine: ResolversInterfaceTypes<ResolversParentTypes>['BaseCartLine'];
  BaseCartLineConnection: Omit<BaseCartLineConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['BaseCartLineEdge']>;
    nodes: Array<ResolversParentTypes['BaseCartLine']>;
  };
  BaseCartLineEdge: Omit<BaseCartLineEdge, 'node'> & {
    node: ResolversParentTypes['BaseCartLine'];
  };
  Blog: Omit<
    Blog,
    'articleByHandle' | 'articles' | 'metafield' | 'metafields'
  > & {
    articleByHandle?: Maybe<ResolversParentTypes['Article']>;
    articles: ResolversParentTypes['ArticleConnection'];
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
  };
  BlogConnection: Omit<BlogConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['BlogEdge']>;
    nodes: Array<ResolversParentTypes['Blog']>;
  };
  BlogEdge: Omit<BlogEdge, 'node'> & {node: ResolversParentTypes['Blog']};
  Boolean: Scalars['Boolean']['output'];
  Brand: Omit<Brand, 'coverImage' | 'logo' | 'squareLogo'> & {
    coverImage?: Maybe<ResolversParentTypes['MediaImage']>;
    logo?: Maybe<ResolversParentTypes['MediaImage']>;
    squareLogo?: Maybe<ResolversParentTypes['MediaImage']>;
  };
  BrandColorGroup: BrandColorGroup;
  BrandColors: BrandColors;
  BuyerInput: BuyerInput;
  Cart: Omit<
    Cart,
    | 'buyerIdentity'
    | 'delivery'
    | 'deliveryGroups'
    | 'discountAllocations'
    | 'lines'
    | 'metafield'
    | 'metafields'
  > & {
    buyerIdentity: ResolversParentTypes['CartBuyerIdentity'];
    delivery: ResolversParentTypes['CartDelivery'];
    deliveryGroups: ResolversParentTypes['CartDeliveryGroupConnection'];
    discountAllocations: Array<ResolversParentTypes['CartDiscountAllocation']>;
    lines: ResolversParentTypes['BaseCartLineConnection'];
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
  };
  CartAddress: ResolversUnionTypes<ResolversParentTypes>['CartAddress'];
  CartAddressInput: CartAddressInput;
  CartAttributesUpdatePayload: Omit<CartAttributesUpdatePayload, 'cart'> & {
    cart?: Maybe<ResolversParentTypes['Cart']>;
  };
  CartAutomaticDiscountAllocation: Omit<
    CartAutomaticDiscountAllocation,
    'discountApplication'
  > & {discountApplication: ResolversParentTypes['CartDiscountApplication']};
  CartBillingAddressUpdatePayload: Omit<
    CartBillingAddressUpdatePayload,
    'cart'
  > & {cart?: Maybe<ResolversParentTypes['Cart']>};
  CartBuyerIdentity: Omit<
    CartBuyerIdentity,
    'customer' | 'deliveryAddressPreferences' | 'purchasingCompany'
  > & {
    customer?: Maybe<ResolversParentTypes['Customer']>;
    deliveryAddressPreferences: Array<ResolversParentTypes['DeliveryAddress']>;
    purchasingCompany?: Maybe<ResolversParentTypes['PurchasingCompany']>;
  };
  CartBuyerIdentityInput: CartBuyerIdentityInput;
  CartBuyerIdentityUpdatePayload: Omit<
    CartBuyerIdentityUpdatePayload,
    'cart'
  > & {cart?: Maybe<ResolversParentTypes['Cart']>};
  CartCodeDiscountAllocation: Omit<
    CartCodeDiscountAllocation,
    'discountApplication'
  > & {discountApplication: ResolversParentTypes['CartDiscountApplication']};
  CartCompletionAction: ResolversUnionTypes<ResolversParentTypes>['CartCompletionAction'];
  CartCompletionActionRequired: Omit<CartCompletionActionRequired, 'action'> & {
    action?: Maybe<ResolversParentTypes['CartCompletionAction']>;
  };
  CartCompletionAttemptResult: ResolversUnionTypes<ResolversParentTypes>['CartCompletionAttemptResult'];
  CartCompletionFailed: CartCompletionFailed;
  CartCompletionProcessing: CartCompletionProcessing;
  CartCompletionSuccess: CartCompletionSuccess;
  CartCost: CartCost;
  CartCreatePayload: Omit<CartCreatePayload, 'cart'> & {
    cart?: Maybe<ResolversParentTypes['Cart']>;
  };
  CartCustomDiscountAllocation: Omit<
    CartCustomDiscountAllocation,
    'discountApplication'
  > & {discountApplication: ResolversParentTypes['CartDiscountApplication']};
  CartDelivery: Omit<CartDelivery, 'addresses'> & {
    addresses: Array<ResolversParentTypes['CartSelectableAddress']>;
  };
  CartDeliveryAddress: CartDeliveryAddress;
  CartDeliveryAddressInput: CartDeliveryAddressInput;
  CartDeliveryAddressesAddPayload: Omit<
    CartDeliveryAddressesAddPayload,
    'cart'
  > & {cart?: Maybe<ResolversParentTypes['Cart']>};
  CartDeliveryAddressesRemovePayload: Omit<
    CartDeliveryAddressesRemovePayload,
    'cart'
  > & {cart?: Maybe<ResolversParentTypes['Cart']>};
  CartDeliveryAddressesUpdatePayload: Omit<
    CartDeliveryAddressesUpdatePayload,
    'cart'
  > & {cart?: Maybe<ResolversParentTypes['Cart']>};
  CartDeliveryCoordinatesPreference: CartDeliveryCoordinatesPreference;
  CartDeliveryCoordinatesPreferenceInput: CartDeliveryCoordinatesPreferenceInput;
  CartDeliveryGroup: Omit<CartDeliveryGroup, 'cartLines'> & {
    cartLines: ResolversParentTypes['BaseCartLineConnection'];
  };
  CartDeliveryGroupConnection: Omit<
    CartDeliveryGroupConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['CartDeliveryGroupEdge']>;
    nodes: Array<ResolversParentTypes['CartDeliveryGroup']>;
  };
  CartDeliveryGroupEdge: Omit<CartDeliveryGroupEdge, 'node'> & {
    node: ResolversParentTypes['CartDeliveryGroup'];
  };
  CartDeliveryInput: CartDeliveryInput;
  CartDeliveryOption: CartDeliveryOption;
  CartDeliveryPreference: CartDeliveryPreference;
  CartDeliveryPreferenceInput: CartDeliveryPreferenceInput;
  CartDirectPaymentMethodInput: CartDirectPaymentMethodInput;
  CartDiscountAllocation: ResolversInterfaceTypes<ResolversParentTypes>['CartDiscountAllocation'];
  CartDiscountApplication: Omit<CartDiscountApplication, 'value'> & {
    value: ResolversParentTypes['PricingValue'];
  };
  CartDiscountCode: CartDiscountCode;
  CartDiscountCodesUpdatePayload: Omit<
    CartDiscountCodesUpdatePayload,
    'cart'
  > & {cart?: Maybe<ResolversParentTypes['Cart']>};
  CartEstimatedCost: CartEstimatedCost;
  CartFreePaymentMethodInput: CartFreePaymentMethodInput;
  CartGiftCardCodesRemovePayload: Omit<
    CartGiftCardCodesRemovePayload,
    'cart'
  > & {cart?: Maybe<ResolversParentTypes['Cart']>};
  CartGiftCardCodesUpdatePayload: Omit<
    CartGiftCardCodesUpdatePayload,
    'cart'
  > & {cart?: Maybe<ResolversParentTypes['Cart']>};
  CartInput: CartInput;
  CartInputMetafieldInput: CartInputMetafieldInput;
  CartLine: Omit<
    CartLine,
    'discountAllocations' | 'merchandise' | 'sellingPlanAllocation'
  > & {
    discountAllocations: Array<ResolversParentTypes['CartDiscountAllocation']>;
    merchandise: ResolversParentTypes['Merchandise'];
    sellingPlanAllocation?: Maybe<
      ResolversParentTypes['SellingPlanAllocation']
    >;
  };
  CartLineCost: CartLineCost;
  CartLineEstimatedCost: CartLineEstimatedCost;
  CartLineInput: CartLineInput;
  CartLineUpdateInput: CartLineUpdateInput;
  CartLinesAddPayload: Omit<CartLinesAddPayload, 'cart'> & {
    cart?: Maybe<ResolversParentTypes['Cart']>;
  };
  CartLinesRemovePayload: Omit<CartLinesRemovePayload, 'cart'> & {
    cart?: Maybe<ResolversParentTypes['Cart']>;
  };
  CartLinesUpdatePayload: Omit<CartLinesUpdatePayload, 'cart'> & {
    cart?: Maybe<ResolversParentTypes['Cart']>;
  };
  CartMetafieldDeleteInput: CartMetafieldDeleteInput;
  CartMetafieldDeletePayload: CartMetafieldDeletePayload;
  CartMetafieldsSetInput: CartMetafieldsSetInput;
  CartMetafieldsSetPayload: Omit<CartMetafieldsSetPayload, 'metafields'> & {
    metafields?: Maybe<Array<ResolversParentTypes['Metafield']>>;
  };
  CartNoteUpdatePayload: Omit<CartNoteUpdatePayload, 'cart'> & {
    cart?: Maybe<ResolversParentTypes['Cart']>;
  };
  CartOperationError: CartOperationError;
  CartPaymentInput: CartPaymentInput;
  CartPaymentUpdatePayload: Omit<CartPaymentUpdatePayload, 'cart'> & {
    cart?: Maybe<ResolversParentTypes['Cart']>;
  };
  CartPreferences: CartPreferences;
  CartPreferencesInput: CartPreferencesInput;
  CartPrepareForCompletionPayload: Omit<
    CartPrepareForCompletionPayload,
    'result'
  > & {result?: Maybe<ResolversParentTypes['CartPrepareForCompletionResult']>};
  CartPrepareForCompletionResult: ResolversUnionTypes<ResolversParentTypes>['CartPrepareForCompletionResult'];
  CartSelectableAddress: Omit<CartSelectableAddress, 'address'> & {
    address: ResolversParentTypes['CartAddress'];
  };
  CartSelectableAddressInput: CartSelectableAddressInput;
  CartSelectableAddressUpdateInput: CartSelectableAddressUpdateInput;
  CartSelectedDeliveryOptionInput: CartSelectedDeliveryOptionInput;
  CartSelectedDeliveryOptionsUpdatePayload: Omit<
    CartSelectedDeliveryOptionsUpdatePayload,
    'cart'
  > & {cart?: Maybe<ResolversParentTypes['Cart']>};
  CartStatusNotReady: Omit<CartStatusNotReady, 'cart'> & {
    cart?: Maybe<ResolversParentTypes['Cart']>;
  };
  CartStatusReady: Omit<CartStatusReady, 'cart'> & {
    cart?: Maybe<ResolversParentTypes['Cart']>;
  };
  CartSubmitForCompletionPayload: Omit<
    CartSubmitForCompletionPayload,
    'result'
  > & {result?: Maybe<ResolversParentTypes['CartSubmitForCompletionResult']>};
  CartSubmitForCompletionResult: ResolversUnionTypes<ResolversParentTypes>['CartSubmitForCompletionResult'];
  CartThrottled: CartThrottled;
  CartUserError: CartUserError;
  CartWalletPaymentMethodInput: CartWalletPaymentMethodInput;
  CartWarning: CartWarning;
  CategoryFilter: CategoryFilter;
  Collection: Omit<
    Collection,
    'image' | 'metafield' | 'metafields' | 'products'
  > & {
    image?: Maybe<ResolversParentTypes['Image']>;
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
    products: ResolversParentTypes['ProductConnection'];
  };
  CollectionConnection: Omit<CollectionConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['CollectionEdge']>;
    nodes: Array<ResolversParentTypes['Collection']>;
  };
  CollectionEdge: Omit<CollectionEdge, 'node'> & {
    node: ResolversParentTypes['Collection'];
  };
  Color: Scalars['Color']['output'];
  Comment: Comment;
  CommentAuthor: CommentAuthor;
  CommentConnection: CommentConnection;
  CommentEdge: CommentEdge;
  Company: Omit<Company, 'metafield' | 'metafields'> & {
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
  };
  CompanyContact: CompanyContact;
  CompanyLocation: Omit<CompanyLocation, 'metafield' | 'metafields'> & {
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
  };
  CompletePaymentChallenge: CompletePaymentChallenge;
  CompletionError: CompletionError;
  ComponentizableCartLine: Omit<
    ComponentizableCartLine,
    | 'discountAllocations'
    | 'lineComponents'
    | 'merchandise'
    | 'sellingPlanAllocation'
  > & {
    discountAllocations: Array<ResolversParentTypes['CartDiscountAllocation']>;
    lineComponents: Array<ResolversParentTypes['CartLine']>;
    merchandise: ResolversParentTypes['Merchandise'];
    sellingPlanAllocation?: Maybe<
      ResolversParentTypes['SellingPlanAllocation']
    >;
  };
  Count: Count;
  Country: Omit<Country, 'market'> & {
    market?: Maybe<ResolversParentTypes['Market']>;
  };
  Currency: Currency;
  Customer: Omit<Customer, 'metafield' | 'metafields' | 'orders'> & {
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
    orders: ResolversParentTypes['OrderConnection'];
  };
  CustomerAccessToken: CustomerAccessToken;
  CustomerAccessTokenCreateInput: CustomerAccessTokenCreateInput;
  CustomerAccessTokenCreatePayload: CustomerAccessTokenCreatePayload;
  CustomerAccessTokenCreateWithMultipassPayload: CustomerAccessTokenCreateWithMultipassPayload;
  CustomerAccessTokenDeletePayload: CustomerAccessTokenDeletePayload;
  CustomerAccessTokenRenewPayload: CustomerAccessTokenRenewPayload;
  CustomerActivateByUrlPayload: Omit<
    CustomerActivateByUrlPayload,
    'customer'
  > & {customer?: Maybe<ResolversParentTypes['Customer']>};
  CustomerActivateInput: CustomerActivateInput;
  CustomerActivatePayload: Omit<CustomerActivatePayload, 'customer'> & {
    customer?: Maybe<ResolversParentTypes['Customer']>;
  };
  CustomerAddressCreatePayload: CustomerAddressCreatePayload;
  CustomerAddressDeletePayload: CustomerAddressDeletePayload;
  CustomerAddressUpdatePayload: CustomerAddressUpdatePayload;
  CustomerCreateInput: CustomerCreateInput;
  CustomerCreatePayload: Omit<CustomerCreatePayload, 'customer'> & {
    customer?: Maybe<ResolversParentTypes['Customer']>;
  };
  CustomerDefaultAddressUpdatePayload: Omit<
    CustomerDefaultAddressUpdatePayload,
    'customer'
  > & {customer?: Maybe<ResolversParentTypes['Customer']>};
  CustomerRecoverPayload: CustomerRecoverPayload;
  CustomerResetByUrlPayload: Omit<CustomerResetByUrlPayload, 'customer'> & {
    customer?: Maybe<ResolversParentTypes['Customer']>;
  };
  CustomerResetInput: CustomerResetInput;
  CustomerResetPayload: Omit<CustomerResetPayload, 'customer'> & {
    customer?: Maybe<ResolversParentTypes['Customer']>;
  };
  CustomerUpdateInput: CustomerUpdateInput;
  CustomerUpdatePayload: Omit<CustomerUpdatePayload, 'customer'> & {
    customer?: Maybe<ResolversParentTypes['Customer']>;
  };
  CustomerUserError: CustomerUserError;
  DateTime: Scalars['DateTime']['output'];
  Decimal: Scalars['Decimal']['output'];
  DeliveryAddress: ResolversUnionTypes<ResolversParentTypes>['DeliveryAddress'];
  DeliveryAddressInput: DeliveryAddressInput;
  DiscountAllocation: Omit<DiscountAllocation, 'discountApplication'> & {
    discountApplication: ResolversParentTypes['DiscountApplication'];
  };
  DiscountApplication: ResolversInterfaceTypes<ResolversParentTypes>['DiscountApplication'];
  DiscountApplicationConnection: Omit<
    DiscountApplicationConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['DiscountApplicationEdge']>;
    nodes: Array<ResolversParentTypes['DiscountApplication']>;
  };
  DiscountApplicationEdge: Omit<DiscountApplicationEdge, 'node'> & {
    node: ResolversParentTypes['DiscountApplication'];
  };
  DiscountCodeApplication: Omit<DiscountCodeApplication, 'value'> & {
    value: ResolversParentTypes['PricingValue'];
  };
  DisplayableError: ResolversInterfaceTypes<ResolversParentTypes>['DisplayableError'];
  Domain: Domain;
  ExternalVideo: Omit<ExternalVideo, 'previewImage'> & {
    previewImage?: Maybe<ResolversParentTypes['Image']>;
  };
  Filter: Omit<Filter, 'values'> & {
    values: Array<ResolversParentTypes['FilterValue']>;
  };
  FilterValue: Omit<FilterValue, 'image' | 'swatch'> & {
    image?: Maybe<ResolversParentTypes['MediaImage']>;
    swatch?: Maybe<ResolversParentTypes['Swatch']>;
  };
  Float: Scalars['Float']['output'];
  Fulfillment: Omit<Fulfillment, 'fulfillmentLineItems'> & {
    fulfillmentLineItems: ResolversParentTypes['FulfillmentLineItemConnection'];
  };
  FulfillmentLineItem: Omit<FulfillmentLineItem, 'lineItem'> & {
    lineItem: ResolversParentTypes['OrderLineItem'];
  };
  FulfillmentLineItemConnection: Omit<
    FulfillmentLineItemConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['FulfillmentLineItemEdge']>;
    nodes: Array<ResolversParentTypes['FulfillmentLineItem']>;
  };
  FulfillmentLineItemEdge: Omit<FulfillmentLineItemEdge, 'node'> & {
    node: ResolversParentTypes['FulfillmentLineItem'];
  };
  FulfillmentTrackingInfo: FulfillmentTrackingInfo;
  GenericFile: Omit<GenericFile, 'previewImage'> & {
    previewImage?: Maybe<ResolversParentTypes['Image']>;
  };
  GeoCoordinateInput: GeoCoordinateInput;
  HTML: Scalars['HTML']['output'];
  HasMetafields: ResolversInterfaceTypes<ResolversParentTypes>['HasMetafields'];
  HasMetafieldsIdentifier: HasMetafieldsIdentifier;
  ID: Scalars['ID']['output'];
  ISO8601DateTime: Scalars['ISO8601DateTime']['output'];
  Image: Image;
  ImageConnection: Omit<ImageConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['ImageEdge']>;
    nodes: Array<ResolversParentTypes['Image']>;
  };
  ImageEdge: Omit<ImageEdge, 'node'> & {node: ResolversParentTypes['Image']};
  ImageTransformInput: ImageTransformInput;
  InContextAnnotation: InContextAnnotation;
  InContextAnnotationType: InContextAnnotationType;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Language: Language;
  Localization: Omit<
    Localization,
    'availableCountries' | 'country' | 'market'
  > & {
    availableCountries: Array<ResolversParentTypes['Country']>;
    country: ResolversParentTypes['Country'];
    market: ResolversParentTypes['Market'];
  };
  Location: Omit<Location, 'address' | 'metafield' | 'metafields'> & {
    address: ResolversParentTypes['LocationAddress'];
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
  };
  LocationAddress: LocationAddress;
  LocationConnection: Omit<LocationConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['LocationEdge']>;
    nodes: Array<ResolversParentTypes['Location']>;
  };
  LocationEdge: Omit<LocationEdge, 'node'> & {
    node: ResolversParentTypes['Location'];
  };
  MailingAddress: MailingAddress;
  MailingAddressConnection: MailingAddressConnection;
  MailingAddressEdge: MailingAddressEdge;
  MailingAddressInput: MailingAddressInput;
  ManualDiscountApplication: Omit<ManualDiscountApplication, 'value'> & {
    value: ResolversParentTypes['PricingValue'];
  };
  Market: Omit<Market, 'metafield' | 'metafields'> & {
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
  };
  Media: ResolversInterfaceTypes<ResolversParentTypes>['Media'];
  MediaConnection: Omit<MediaConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['MediaEdge']>;
    nodes: Array<ResolversParentTypes['Media']>;
  };
  MediaEdge: Omit<MediaEdge, 'node'> & {node: ResolversParentTypes['Media']};
  MediaImage: Omit<MediaImage, 'image' | 'previewImage'> & {
    image?: Maybe<ResolversParentTypes['Image']>;
    previewImage?: Maybe<ResolversParentTypes['Image']>;
  };
  MediaPresentation: MediaPresentation;
  Menu: Omit<Menu, 'items'> & {items: Array<ResolversParentTypes['MenuItem']>};
  MenuItem: Omit<MenuItem, 'items' | 'resource'> & {
    items: Array<ResolversParentTypes['MenuItem']>;
    resource?: Maybe<ResolversParentTypes['MenuItemResource']>;
  };
  MenuItemResource: ResolversUnionTypes<ResolversParentTypes>['MenuItemResource'];
  Merchandise: ResolversUnionTypes<ResolversParentTypes>['Merchandise'];
  Metafield: Omit<Metafield, 'parentResource' | 'reference' | 'references'> & {
    parentResource: ResolversParentTypes['MetafieldParentResource'];
    reference?: Maybe<ResolversParentTypes['MetafieldReference']>;
    references?: Maybe<ResolversParentTypes['MetafieldReferenceConnection']>;
  };
  MetafieldDeleteUserError: MetafieldDeleteUserError;
  MetafieldFilter: MetafieldFilter;
  MetafieldParentResource: ResolversUnionTypes<ResolversParentTypes>['MetafieldParentResource'];
  MetafieldReference: ResolversUnionTypes<ResolversParentTypes>['MetafieldReference'];
  MetafieldReferenceConnection: Omit<
    MetafieldReferenceConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['MetafieldReferenceEdge']>;
    nodes: Array<ResolversParentTypes['MetafieldReference']>;
  };
  MetafieldReferenceEdge: Omit<MetafieldReferenceEdge, 'node'> & {
    node: ResolversParentTypes['MetafieldReference'];
  };
  MetafieldsSetUserError: MetafieldsSetUserError;
  Metaobject: Omit<Metaobject, 'field' | 'fields' | 'seo'> & {
    field?: Maybe<ResolversParentTypes['MetaobjectField']>;
    fields: Array<ResolversParentTypes['MetaobjectField']>;
    seo?: Maybe<ResolversParentTypes['MetaobjectSEO']>;
  };
  MetaobjectConnection: Omit<MetaobjectConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['MetaobjectEdge']>;
    nodes: Array<ResolversParentTypes['Metaobject']>;
  };
  MetaobjectEdge: Omit<MetaobjectEdge, 'node'> & {
    node: ResolversParentTypes['Metaobject'];
  };
  MetaobjectField: Omit<MetaobjectField, 'reference' | 'references'> & {
    reference?: Maybe<ResolversParentTypes['MetafieldReference']>;
    references?: Maybe<ResolversParentTypes['MetafieldReferenceConnection']>;
  };
  MetaobjectHandleInput: MetaobjectHandleInput;
  MetaobjectSEO: Omit<MetaobjectSeo, 'description' | 'title'> & {
    description?: Maybe<ResolversParentTypes['MetaobjectField']>;
    title?: Maybe<ResolversParentTypes['MetaobjectField']>;
  };
  Model3d: Omit<Model3d, 'previewImage'> & {
    previewImage?: Maybe<ResolversParentTypes['Image']>;
  };
  Model3dSource: Model3dSource;
  MoneyInput: MoneyInput;
  MoneyV2: MoneyV2;
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  OnlineStorePublishable: ResolversInterfaceTypes<ResolversParentTypes>['OnlineStorePublishable'];
  Order: Omit<
    Order,
    | 'discountApplications'
    | 'lineItems'
    | 'metafield'
    | 'metafields'
    | 'shippingDiscountAllocations'
    | 'successfulFulfillments'
  > & {
    discountApplications: ResolversParentTypes['DiscountApplicationConnection'];
    lineItems: ResolversParentTypes['OrderLineItemConnection'];
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
    shippingDiscountAllocations: Array<
      ResolversParentTypes['DiscountAllocation']
    >;
    successfulFulfillments?: Maybe<Array<ResolversParentTypes['Fulfillment']>>;
  };
  OrderConnection: Omit<OrderConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['OrderEdge']>;
    nodes: Array<ResolversParentTypes['Order']>;
  };
  OrderEdge: Omit<OrderEdge, 'node'> & {node: ResolversParentTypes['Order']};
  OrderLineItem: Omit<OrderLineItem, 'discountAllocations' | 'variant'> & {
    discountAllocations: Array<ResolversParentTypes['DiscountAllocation']>;
    variant?: Maybe<ResolversParentTypes['ProductVariant']>;
  };
  OrderLineItemConnection: Omit<OrderLineItemConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['OrderLineItemEdge']>;
    nodes: Array<ResolversParentTypes['OrderLineItem']>;
  };
  OrderLineItemEdge: Omit<OrderLineItemEdge, 'node'> & {
    node: ResolversParentTypes['OrderLineItem'];
  };
  Page: Omit<Page, 'metafield' | 'metafields'> & {
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
  };
  PageConnection: Omit<PageConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['PageEdge']>;
    nodes: Array<ResolversParentTypes['Page']>;
  };
  PageEdge: Omit<PageEdge, 'node'> & {node: ResolversParentTypes['Page']};
  PageInfo: PageInfo;
  PaginatedSitemapResources: Omit<PaginatedSitemapResources, 'items'> & {
    items: Array<ResolversParentTypes['SitemapResourceInterface']>;
  };
  PaymentSettings: PaymentSettings;
  PredictiveSearchResult: Omit<
    PredictiveSearchResult,
    'articles' | 'collections' | 'pages' | 'products'
  > & {
    articles: Array<ResolversParentTypes['Article']>;
    collections: Array<ResolversParentTypes['Collection']>;
    pages: Array<ResolversParentTypes['Page']>;
    products: Array<ResolversParentTypes['Product']>;
  };
  PriceRangeFilter: PriceRangeFilter;
  PricingPercentageValue: PricingPercentageValue;
  PricingValue: ResolversUnionTypes<ResolversParentTypes>['PricingValue'];
  Product: Omit<
    Product,
    | 'adjacentVariants'
    | 'collections'
    | 'featuredImage'
    | 'images'
    | 'media'
    | 'metafield'
    | 'metafields'
    | 'options'
    | 'selectedOrFirstAvailableVariant'
    | 'sellingPlanGroups'
    | 'variantBySelectedOptions'
  > & {
    adjacentVariants: Array<ResolversParentTypes['ProductVariant']>;
    collections: ResolversParentTypes['CollectionConnection'];
    featuredImage?: Maybe<ResolversParentTypes['Image']>;
    images: ResolversParentTypes['ImageConnection'];
    media: ResolversParentTypes['MediaConnection'];
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
    options: Array<ResolversParentTypes['ProductOption']>;
    selectedOrFirstAvailableVariant?: Maybe<
      ResolversParentTypes['ProductVariant']
    >;
    sellingPlanGroups: ResolversParentTypes['SellingPlanGroupConnection'];
    variantBySelectedOptions?: Maybe<ResolversParentTypes['ProductVariant']>;
  };
  ProductConnection: Omit<ProductConnection, 'edges' | 'filters' | 'nodes'> & {
    edges: Array<ResolversParentTypes['ProductEdge']>;
    filters: Array<ResolversParentTypes['Filter']>;
    nodes: Array<ResolversParentTypes['Product']>;
  };
  ProductEdge: Omit<ProductEdge, 'node'> & {
    node: ResolversParentTypes['Product'];
  };
  ProductFilter: ProductFilter;
  ProductOption: Omit<ProductOption, 'optionValues'> & {
    optionValues: Array<ResolversParentTypes['ProductOptionValue']>;
  };
  ProductOptionValue: Omit<
    ProductOptionValue,
    'firstSelectableVariant' | 'swatch'
  > & {
    firstSelectableVariant?: Maybe<ResolversParentTypes['ProductVariant']>;
    swatch?: Maybe<ResolversParentTypes['ProductOptionValueSwatch']>;
  };
  ProductOptionValueSwatch: Omit<ProductOptionValueSwatch, 'image'> & {
    image?: Maybe<ResolversParentTypes['Media']>;
  };
  ProductPriceRange: ProductPriceRange;
  ProductVariant: Omit<
    ProductVariant,
    | 'image'
    | 'metafield'
    | 'metafields'
    | 'product'
    | 'sellingPlanAllocations'
    | 'storeAvailability'
  > & {
    image?: Maybe<ResolversParentTypes['Image']>;
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
    product: ResolversParentTypes['Product'];
    sellingPlanAllocations: ResolversParentTypes['SellingPlanAllocationConnection'];
    storeAvailability: ResolversParentTypes['StoreAvailabilityConnection'];
  };
  ProductVariantComponent: Omit<ProductVariantComponent, 'productVariant'> & {
    productVariant: ResolversParentTypes['ProductVariant'];
  };
  ProductVariantComponentConnection: ProductVariantComponentConnection;
  ProductVariantComponentEdge: ProductVariantComponentEdge;
  ProductVariantConnection: Omit<ProductVariantConnection, 'nodes'> & {
    nodes: Array<ResolversParentTypes['ProductVariant']>;
  };
  ProductVariantEdge: Omit<ProductVariantEdge, 'node'> & {
    node: ResolversParentTypes['ProductVariant'];
  };
  PurchasingCompany: Omit<PurchasingCompany, 'company' | 'location'> & {
    company: ResolversParentTypes['Company'];
    location: ResolversParentTypes['CompanyLocation'];
  };
  QuantityPriceBreak: QuantityPriceBreak;
  QuantityPriceBreakConnection: QuantityPriceBreakConnection;
  QuantityPriceBreakEdge: QuantityPriceBreakEdge;
  QuantityRule: QuantityRule;
  QueryRoot: {};
  SEO: Seo;
  ScriptDiscountApplication: Omit<ScriptDiscountApplication, 'value'> & {
    value: ResolversParentTypes['PricingValue'];
  };
  SearchQuerySuggestion: SearchQuerySuggestion;
  SearchResultItem: ResolversUnionTypes<ResolversParentTypes>['SearchResultItem'];
  SearchResultItemConnection: Omit<
    SearchResultItemConnection,
    'edges' | 'nodes' | 'productFilters'
  > & {
    edges: Array<ResolversParentTypes['SearchResultItemEdge']>;
    nodes: Array<ResolversParentTypes['SearchResultItem']>;
    productFilters: Array<ResolversParentTypes['Filter']>;
  };
  SearchResultItemEdge: Omit<SearchResultItemEdge, 'node'> & {
    node: ResolversParentTypes['SearchResultItem'];
  };
  SelectedOption: SelectedOption;
  SelectedOptionInput: SelectedOptionInput;
  SellingPlan: Omit<
    SellingPlan,
    | 'billingPolicy'
    | 'checkoutCharge'
    | 'deliveryPolicy'
    | 'metafield'
    | 'metafields'
    | 'priceAdjustments'
  > & {
    billingPolicy?: Maybe<ResolversParentTypes['SellingPlanBillingPolicy']>;
    checkoutCharge: ResolversParentTypes['SellingPlanCheckoutCharge'];
    deliveryPolicy?: Maybe<ResolversParentTypes['SellingPlanDeliveryPolicy']>;
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
    priceAdjustments: Array<ResolversParentTypes['SellingPlanPriceAdjustment']>;
  };
  SellingPlanAllocation: Omit<
    SellingPlanAllocation,
    'priceAdjustments' | 'sellingPlan'
  > & {
    priceAdjustments: Array<
      ResolversParentTypes['SellingPlanAllocationPriceAdjustment']
    >;
    sellingPlan: ResolversParentTypes['SellingPlan'];
  };
  SellingPlanAllocationConnection: Omit<
    SellingPlanAllocationConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['SellingPlanAllocationEdge']>;
    nodes: Array<ResolversParentTypes['SellingPlanAllocation']>;
  };
  SellingPlanAllocationEdge: Omit<SellingPlanAllocationEdge, 'node'> & {
    node: ResolversParentTypes['SellingPlanAllocation'];
  };
  SellingPlanAllocationPriceAdjustment: SellingPlanAllocationPriceAdjustment;
  SellingPlanBillingPolicy: ResolversUnionTypes<ResolversParentTypes>['SellingPlanBillingPolicy'];
  SellingPlanCheckoutCharge: Omit<SellingPlanCheckoutCharge, 'value'> & {
    value: ResolversParentTypes['SellingPlanCheckoutChargeValue'];
  };
  SellingPlanCheckoutChargePercentageValue: SellingPlanCheckoutChargePercentageValue;
  SellingPlanCheckoutChargeValue: ResolversUnionTypes<ResolversParentTypes>['SellingPlanCheckoutChargeValue'];
  SellingPlanConnection: Omit<SellingPlanConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['SellingPlanEdge']>;
    nodes: Array<ResolversParentTypes['SellingPlan']>;
  };
  SellingPlanDeliveryPolicy: ResolversUnionTypes<ResolversParentTypes>['SellingPlanDeliveryPolicy'];
  SellingPlanEdge: Omit<SellingPlanEdge, 'node'> & {
    node: ResolversParentTypes['SellingPlan'];
  };
  SellingPlanFixedAmountPriceAdjustment: SellingPlanFixedAmountPriceAdjustment;
  SellingPlanFixedPriceAdjustment: SellingPlanFixedPriceAdjustment;
  SellingPlanGroup: Omit<SellingPlanGroup, 'options' | 'sellingPlans'> & {
    options: Array<ResolversParentTypes['SellingPlanGroupOption']>;
    sellingPlans: ResolversParentTypes['SellingPlanConnection'];
  };
  SellingPlanGroupConnection: Omit<
    SellingPlanGroupConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['SellingPlanGroupEdge']>;
    nodes: Array<ResolversParentTypes['SellingPlanGroup']>;
  };
  SellingPlanGroupEdge: Omit<SellingPlanGroupEdge, 'node'> & {
    node: ResolversParentTypes['SellingPlanGroup'];
  };
  SellingPlanGroupOption: SellingPlanGroupOption;
  SellingPlanOption: SellingPlanOption;
  SellingPlanPercentagePriceAdjustment: SellingPlanPercentagePriceAdjustment;
  SellingPlanPriceAdjustment: Omit<
    SellingPlanPriceAdjustment,
    'adjustmentValue'
  > & {
    adjustmentValue: ResolversParentTypes['SellingPlanPriceAdjustmentValue'];
  };
  SellingPlanPriceAdjustmentValue: ResolversUnionTypes<ResolversParentTypes>['SellingPlanPriceAdjustmentValue'];
  SellingPlanRecurringBillingPolicy: SellingPlanRecurringBillingPolicy;
  SellingPlanRecurringDeliveryPolicy: SellingPlanRecurringDeliveryPolicy;
  Shop: Omit<Shop, 'brand' | 'metafield' | 'metafields'> & {
    brand?: Maybe<ResolversParentTypes['Brand']>;
    metafield?: Maybe<ResolversParentTypes['Metafield']>;
    metafields: Array<Maybe<ResolversParentTypes['Metafield']>>;
  };
  ShopPayInstallmentsFinancingPlan: ShopPayInstallmentsFinancingPlan;
  ShopPayInstallmentsFinancingPlanTerm: ShopPayInstallmentsFinancingPlanTerm;
  ShopPayInstallmentsPricing: ShopPayInstallmentsPricing;
  ShopPayInstallmentsProductVariantPricing: ShopPayInstallmentsProductVariantPricing;
  ShopPayPaymentRequest: ShopPayPaymentRequest;
  ShopPayPaymentRequestContactField: ShopPayPaymentRequestContactField;
  ShopPayPaymentRequestDeliveryMethod: ShopPayPaymentRequestDeliveryMethod;
  ShopPayPaymentRequestDeliveryMethodInput: ShopPayPaymentRequestDeliveryMethodInput;
  ShopPayPaymentRequestDiscount: ShopPayPaymentRequestDiscount;
  ShopPayPaymentRequestDiscountInput: ShopPayPaymentRequestDiscountInput;
  ShopPayPaymentRequestImage: ShopPayPaymentRequestImage;
  ShopPayPaymentRequestImageInput: ShopPayPaymentRequestImageInput;
  ShopPayPaymentRequestInput: ShopPayPaymentRequestInput;
  ShopPayPaymentRequestLineItem: ShopPayPaymentRequestLineItem;
  ShopPayPaymentRequestLineItemInput: ShopPayPaymentRequestLineItemInput;
  ShopPayPaymentRequestReceipt: ShopPayPaymentRequestReceipt;
  ShopPayPaymentRequestSession: ShopPayPaymentRequestSession;
  ShopPayPaymentRequestSessionCreatePayload: ShopPayPaymentRequestSessionCreatePayload;
  ShopPayPaymentRequestSessionSubmitPayload: ShopPayPaymentRequestSessionSubmitPayload;
  ShopPayPaymentRequestShippingLine: ShopPayPaymentRequestShippingLine;
  ShopPayPaymentRequestShippingLineInput: ShopPayPaymentRequestShippingLineInput;
  ShopPayPaymentRequestTotalShippingPrice: ShopPayPaymentRequestTotalShippingPrice;
  ShopPayPaymentRequestTotalShippingPriceInput: ShopPayPaymentRequestTotalShippingPriceInput;
  ShopPayWalletContentInput: ShopPayWalletContentInput;
  ShopPolicy: ShopPolicy;
  ShopPolicyWithDefault: ShopPolicyWithDefault;
  Sitemap: Omit<Sitemap, 'resources'> & {
    resources?: Maybe<ResolversParentTypes['PaginatedSitemapResources']>;
  };
  SitemapImage: SitemapImage;
  SitemapResource: SitemapResource;
  SitemapResourceInterface: ResolversInterfaceTypes<ResolversParentTypes>['SitemapResourceInterface'];
  SitemapResourceMetaobject: SitemapResourceMetaobject;
  StoreAvailability: Omit<StoreAvailability, 'location'> & {
    location: ResolversParentTypes['Location'];
  };
  StoreAvailabilityConnection: Omit<
    StoreAvailabilityConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['StoreAvailabilityEdge']>;
    nodes: Array<ResolversParentTypes['StoreAvailability']>;
  };
  StoreAvailabilityEdge: Omit<StoreAvailabilityEdge, 'node'> & {
    node: ResolversParentTypes['StoreAvailability'];
  };
  String: Scalars['String']['output'];
  StringConnection: StringConnection;
  StringEdge: StringEdge;
  SubmissionError: SubmissionError;
  SubmitAlreadyAccepted: SubmitAlreadyAccepted;
  SubmitFailed: SubmitFailed;
  SubmitSuccess: SubmitSuccess;
  SubmitThrottled: SubmitThrottled;
  Swatch: Omit<Swatch, 'image'> & {
    image?: Maybe<ResolversParentTypes['MediaImage']>;
  };
  TaxonomyCategory: TaxonomyCategory;
  TaxonomyMetafieldFilter: TaxonomyMetafieldFilter;
  Trackable: ResolversInterfaceTypes<ResolversParentTypes>['Trackable'];
  URL: Scalars['URL']['output'];
  UnitPriceMeasurement: UnitPriceMeasurement;
  UnsignedInt64: Scalars['UnsignedInt64']['output'];
  UrlRedirect: UrlRedirect;
  UrlRedirectConnection: UrlRedirectConnection;
  UrlRedirectEdge: UrlRedirectEdge;
  UserError: UserError;
  UserErrorsShopPayPaymentRequestSessionUserErrors: UserErrorsShopPayPaymentRequestSessionUserErrors;
  VariantOptionFilter: VariantOptionFilter;
  Video: Omit<Video, 'previewImage'> & {
    previewImage?: Maybe<ResolversParentTypes['Image']>;
  };
  VideoSource: VideoSource;
};

export type AccessRestrictedDirectiveArgs = {
  reason?: Maybe<Scalars['String']['input']>;
};

export type AccessRestrictedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = AccessRestrictedDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type DeferDirectiveArgs = {
  if?: Maybe<Scalars['Boolean']['input']>;
  label?: Maybe<Scalars['String']['input']>;
};

export type DeferDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = DeferDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type InContextDirectiveArgs = {
  buyer?: Maybe<BuyerInput>;
  country?: Maybe<CountryCode>;
  language?: Maybe<LanguageCode>;
  preferredLocationId?: Maybe<Scalars['ID']['input']>;
};

export type InContextDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = InContextDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ApiVersionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ApiVersion'] = ResolversParentTypes['ApiVersion'],
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  supported?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppliedGiftCardResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AppliedGiftCard'] = ResolversParentTypes['AppliedGiftCard'],
> = {
  amountUsed?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  amountUsedV2?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  balanceV2?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastCharacters?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  presentmentAmountUsed?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Article'] = ResolversParentTypes['Article'],
> = {
  author?: Resolver<ResolversTypes['ArticleAuthor'], ParentType, ContextType>;
  authorV2?: Resolver<
    Maybe<ResolversTypes['ArticleAuthor']>,
    ParentType,
    ContextType
  >;
  blog?: Resolver<ResolversTypes['Blog'], ParentType, ContextType>;
  comments?: Resolver<
    ResolversTypes['CommentConnection'],
    ParentType,
    ContextType,
    RequireFields<ArticleCommentsArgs, 'reverse'>
  >;
  content?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    Partial<ArticleContentArgs>
  >;
  contentHtml?: Resolver<ResolversTypes['HTML'], ParentType, ContextType>;
  excerpt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    Partial<ArticleExcerptArgs>
  >;
  excerptHtml?: Resolver<
    Maybe<ResolversTypes['HTML']>,
    ParentType,
    ContextType
  >;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<ArticleMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<ArticleMetafieldsArgs, 'identifiers'>
  >;
  onlineStoreUrl?: Resolver<
    Maybe<ResolversTypes['URL']>,
    ParentType,
    ContextType
  >;
  publishedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  seo?: Resolver<Maybe<ResolversTypes['SEO']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  trackingParameters?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleAuthorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ArticleAuthor'] = ResolversParentTypes['ArticleAuthor'],
> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ArticleConnection'] = ResolversParentTypes['ArticleConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['ArticleEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ArticleEdge'] = ResolversParentTypes['ArticleEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Attribute'] = ResolversParentTypes['Attribute'],
> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AutomaticDiscountApplicationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AutomaticDiscountApplication'] = ResolversParentTypes['AutomaticDiscountApplication'],
> = {
  allocationMethod?: Resolver<
    ResolversTypes['DiscountApplicationAllocationMethod'],
    ParentType,
    ContextType
  >;
  targetSelection?: Resolver<
    ResolversTypes['DiscountApplicationTargetSelection'],
    ParentType,
    ContextType
  >;
  targetType?: Resolver<
    ResolversTypes['DiscountApplicationTargetType'],
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['PricingValue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseCartLineResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BaseCartLine'] = ResolversParentTypes['BaseCartLine'],
> = {
  __resolveType: TypeResolveFn<
    'CartLine' | 'ComponentizableCartLine',
    ParentType,
    ContextType
  >;
  attribute?: Resolver<
    Maybe<ResolversTypes['Attribute']>,
    ParentType,
    ContextType,
    RequireFields<BaseCartLineAttributeArgs, 'key'>
  >;
  attributes?: Resolver<
    Array<ResolversTypes['Attribute']>,
    ParentType,
    ContextType
  >;
  cost?: Resolver<ResolversTypes['CartLineCost'], ParentType, ContextType>;
  discountAllocations?: Resolver<
    Array<ResolversTypes['CartDiscountAllocation']>,
    ParentType,
    ContextType
  >;
  estimatedCost?: Resolver<
    ResolversTypes['CartLineEstimatedCost'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  merchandise?: Resolver<
    ResolversTypes['Merchandise'],
    ParentType,
    ContextType
  >;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sellingPlanAllocation?: Resolver<
    Maybe<ResolversTypes['SellingPlanAllocation']>,
    ParentType,
    ContextType
  >;
};

export type BaseCartLineConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BaseCartLineConnection'] = ResolversParentTypes['BaseCartLineConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['BaseCartLineEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['BaseCartLine']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseCartLineEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BaseCartLineEdge'] = ResolversParentTypes['BaseCartLineEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['BaseCartLine'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlogResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Blog'] = ResolversParentTypes['Blog'],
> = {
  articleByHandle?: Resolver<
    Maybe<ResolversTypes['Article']>,
    ParentType,
    ContextType,
    RequireFields<BlogArticleByHandleArgs, 'handle'>
  >;
  articles?: Resolver<
    ResolversTypes['ArticleConnection'],
    ParentType,
    ContextType,
    RequireFields<BlogArticlesArgs, 'reverse' | 'sortKey'>
  >;
  authors?: Resolver<
    Array<ResolversTypes['ArticleAuthor']>,
    ParentType,
    ContextType
  >;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<BlogMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<BlogMetafieldsArgs, 'identifiers'>
  >;
  onlineStoreUrl?: Resolver<
    Maybe<ResolversTypes['URL']>,
    ParentType,
    ContextType
  >;
  seo?: Resolver<Maybe<ResolversTypes['SEO']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlogConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BlogConnection'] = ResolversParentTypes['BlogConnection'],
> = {
  edges?: Resolver<Array<ResolversTypes['BlogEdge']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Blog']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlogEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BlogEdge'] = ResolversParentTypes['BlogEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Blog'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BrandResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Brand'] = ResolversParentTypes['Brand'],
> = {
  colors?: Resolver<ResolversTypes['BrandColors'], ParentType, ContextType>;
  coverImage?: Resolver<
    Maybe<ResolversTypes['MediaImage']>,
    ParentType,
    ContextType
  >;
  logo?: Resolver<Maybe<ResolversTypes['MediaImage']>, ParentType, ContextType>;
  shortDescription?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  slogan?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  squareLogo?: Resolver<
    Maybe<ResolversTypes['MediaImage']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BrandColorGroupResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BrandColorGroup'] = ResolversParentTypes['BrandColorGroup'],
> = {
  background?: Resolver<
    Maybe<ResolversTypes['Color']>,
    ParentType,
    ContextType
  >;
  foreground?: Resolver<
    Maybe<ResolversTypes['Color']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BrandColorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BrandColors'] = ResolversParentTypes['BrandColors'],
> = {
  primary?: Resolver<
    Array<ResolversTypes['BrandColorGroup']>,
    ParentType,
    ContextType
  >;
  secondary?: Resolver<
    Array<ResolversTypes['BrandColorGroup']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Cart'] = ResolversParentTypes['Cart'],
> = {
  appliedGiftCards?: Resolver<
    Array<ResolversTypes['AppliedGiftCard']>,
    ParentType,
    ContextType
  >;
  attribute?: Resolver<
    Maybe<ResolversTypes['Attribute']>,
    ParentType,
    ContextType,
    RequireFields<CartAttributeArgs, 'key'>
  >;
  attributes?: Resolver<
    Array<ResolversTypes['Attribute']>,
    ParentType,
    ContextType
  >;
  buyerIdentity?: Resolver<
    ResolversTypes['CartBuyerIdentity'],
    ParentType,
    ContextType
  >;
  checkoutUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  cost?: Resolver<ResolversTypes['CartCost'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  delivery?: Resolver<ResolversTypes['CartDelivery'], ParentType, ContextType>;
  deliveryGroups?: Resolver<
    ResolversTypes['CartDeliveryGroupConnection'],
    ParentType,
    ContextType,
    RequireFields<CartDeliveryGroupsArgs, 'reverse' | 'withCarrierRates'>
  >;
  discountAllocations?: Resolver<
    Array<ResolversTypes['CartDiscountAllocation']>,
    ParentType,
    ContextType
  >;
  discountCodes?: Resolver<
    Array<ResolversTypes['CartDiscountCode']>,
    ParentType,
    ContextType
  >;
  estimatedCost?: Resolver<
    ResolversTypes['CartEstimatedCost'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lines?: Resolver<
    ResolversTypes['BaseCartLineConnection'],
    ParentType,
    ContextType,
    RequireFields<CartLinesArgs, 'reverse'>
  >;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<CartMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<CartMetafieldsArgs, 'identifiers'>
  >;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartAddress'] = ResolversParentTypes['CartAddress'],
> = {
  __resolveType: TypeResolveFn<'CartDeliveryAddress', ParentType, ContextType>;
};

export type CartAttributesUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartAttributesUpdatePayload'] = ResolversParentTypes['CartAttributesUpdatePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartAutomaticDiscountAllocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartAutomaticDiscountAllocation'] = ResolversParentTypes['CartAutomaticDiscountAllocation'],
> = {
  discountApplication?: Resolver<
    ResolversTypes['CartDiscountApplication'],
    ParentType,
    ContextType
  >;
  discountedAmount?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  targetType?: Resolver<
    ResolversTypes['DiscountApplicationTargetType'],
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartBillingAddressUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartBillingAddressUpdatePayload'] = ResolversParentTypes['CartBillingAddressUpdatePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartBuyerIdentityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartBuyerIdentity'] = ResolversParentTypes['CartBuyerIdentity'],
> = {
  countryCode?: Resolver<
    Maybe<ResolversTypes['CountryCode']>,
    ParentType,
    ContextType
  >;
  customer?: Resolver<
    Maybe<ResolversTypes['Customer']>,
    ParentType,
    ContextType
  >;
  deliveryAddressPreferences?: Resolver<
    Array<ResolversTypes['DeliveryAddress']>,
    ParentType,
    ContextType
  >;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferences?: Resolver<
    Maybe<ResolversTypes['CartPreferences']>,
    ParentType,
    ContextType
  >;
  purchasingCompany?: Resolver<
    Maybe<ResolversTypes['PurchasingCompany']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartBuyerIdentityUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartBuyerIdentityUpdatePayload'] = ResolversParentTypes['CartBuyerIdentityUpdatePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCodeDiscountAllocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartCodeDiscountAllocation'] = ResolversParentTypes['CartCodeDiscountAllocation'],
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discountApplication?: Resolver<
    ResolversTypes['CartDiscountApplication'],
    ParentType,
    ContextType
  >;
  discountedAmount?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  targetType?: Resolver<
    ResolversTypes['DiscountApplicationTargetType'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCompletionActionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartCompletionAction'] = ResolversParentTypes['CartCompletionAction'],
> = {
  __resolveType: TypeResolveFn<
    'CompletePaymentChallenge',
    ParentType,
    ContextType
  >;
};

export type CartCompletionActionRequiredResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartCompletionActionRequired'] = ResolversParentTypes['CartCompletionActionRequired'],
> = {
  action?: Resolver<
    Maybe<ResolversTypes['CartCompletionAction']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCompletionAttemptResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartCompletionAttemptResult'] = ResolversParentTypes['CartCompletionAttemptResult'],
> = {
  __resolveType: TypeResolveFn<
    | 'CartCompletionActionRequired'
    | 'CartCompletionFailed'
    | 'CartCompletionProcessing'
    | 'CartCompletionSuccess',
    ParentType,
    ContextType
  >;
};

export type CartCompletionFailedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartCompletionFailed'] = ResolversParentTypes['CartCompletionFailed'],
> = {
  errors?: Resolver<
    Array<ResolversTypes['CompletionError']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCompletionProcessingResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartCompletionProcessing'] = ResolversParentTypes['CartCompletionProcessing'],
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pollDelay?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCompletionSuccessResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartCompletionSuccess'] = ResolversParentTypes['CartCompletionSuccess'],
> = {
  completedAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  orderUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCostResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartCost'] = ResolversParentTypes['CartCost'],
> = {
  checkoutChargeAmount?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  subtotalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  subtotalAmountEstimated?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalAmountEstimated?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  totalDutyAmount?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalDutyAmountEstimated?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  totalTaxAmount?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalTaxAmountEstimated?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartCreatePayload'] = ResolversParentTypes['CartCreatePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartCustomDiscountAllocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartCustomDiscountAllocation'] = ResolversParentTypes['CartCustomDiscountAllocation'],
> = {
  discountApplication?: Resolver<
    ResolversTypes['CartDiscountApplication'],
    ParentType,
    ContextType
  >;
  discountedAmount?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  targetType?: Resolver<
    ResolversTypes['DiscountApplicationTargetType'],
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDelivery'] = ResolversParentTypes['CartDelivery'],
> = {
  addresses?: Resolver<
    Array<ResolversTypes['CartSelectableAddress']>,
    ParentType,
    ContextType,
    RequireFields<CartDeliveryAddressesArgs, 'selected'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDeliveryAddress'] = ResolversParentTypes['CartDeliveryAddress'],
> = {
  address1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  formatted?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<CartDeliveryAddressFormattedArgs, 'withCompany' | 'withName'>
  >;
  formattedArea?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provinceCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryAddressesAddPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDeliveryAddressesAddPayload'] = ResolversParentTypes['CartDeliveryAddressesAddPayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryAddressesRemovePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDeliveryAddressesRemovePayload'] = ResolversParentTypes['CartDeliveryAddressesRemovePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryAddressesUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDeliveryAddressesUpdatePayload'] = ResolversParentTypes['CartDeliveryAddressesUpdatePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryCoordinatesPreferenceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDeliveryCoordinatesPreference'] = ResolversParentTypes['CartDeliveryCoordinatesPreference'],
> = {
  countryCode?: Resolver<
    ResolversTypes['CountryCode'],
    ParentType,
    ContextType
  >;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryGroupResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDeliveryGroup'] = ResolversParentTypes['CartDeliveryGroup'],
> = {
  cartLines?: Resolver<
    ResolversTypes['BaseCartLineConnection'],
    ParentType,
    ContextType,
    RequireFields<CartDeliveryGroupCartLinesArgs, 'reverse'>
  >;
  deliveryAddress?: Resolver<
    ResolversTypes['MailingAddress'],
    ParentType,
    ContextType
  >;
  deliveryOptions?: Resolver<
    Array<ResolversTypes['CartDeliveryOption']>,
    ParentType,
    ContextType
  >;
  groupType?: Resolver<
    ResolversTypes['CartDeliveryGroupType'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  selectedDeliveryOption?: Resolver<
    Maybe<ResolversTypes['CartDeliveryOption']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryGroupConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDeliveryGroupConnection'] = ResolversParentTypes['CartDeliveryGroupConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['CartDeliveryGroupEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['CartDeliveryGroup']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryGroupEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDeliveryGroupEdge'] = ResolversParentTypes['CartDeliveryGroupEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['CartDeliveryGroup'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDeliveryOption'] = ResolversParentTypes['CartDeliveryOption'],
> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deliveryMethodType?: Resolver<
    ResolversTypes['DeliveryMethodType'],
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  estimatedCost?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDeliveryPreferenceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDeliveryPreference'] = ResolversParentTypes['CartDeliveryPreference'],
> = {
  coordinates?: Resolver<
    Maybe<ResolversTypes['CartDeliveryCoordinatesPreference']>,
    ParentType,
    ContextType
  >;
  deliveryMethod?: Resolver<
    Array<ResolversTypes['PreferenceDeliveryMethodType']>,
    ParentType,
    ContextType
  >;
  pickupHandle?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDiscountAllocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDiscountAllocation'] = ResolversParentTypes['CartDiscountAllocation'],
> = {
  __resolveType: TypeResolveFn<
    | 'CartAutomaticDiscountAllocation'
    | 'CartCodeDiscountAllocation'
    | 'CartCustomDiscountAllocation',
    ParentType,
    ContextType
  >;
  discountApplication?: Resolver<
    ResolversTypes['CartDiscountApplication'],
    ParentType,
    ContextType
  >;
  discountedAmount?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  targetType?: Resolver<
    ResolversTypes['DiscountApplicationTargetType'],
    ParentType,
    ContextType
  >;
};

export type CartDiscountApplicationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDiscountApplication'] = ResolversParentTypes['CartDiscountApplication'],
> = {
  allocationMethod?: Resolver<
    ResolversTypes['DiscountApplicationAllocationMethod'],
    ParentType,
    ContextType
  >;
  targetSelection?: Resolver<
    ResolversTypes['DiscountApplicationTargetSelection'],
    ParentType,
    ContextType
  >;
  targetType?: Resolver<
    ResolversTypes['DiscountApplicationTargetType'],
    ParentType,
    ContextType
  >;
  value?: Resolver<ResolversTypes['PricingValue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDiscountCodeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDiscountCode'] = ResolversParentTypes['CartDiscountCode'],
> = {
  applicable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartDiscountCodesUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartDiscountCodesUpdatePayload'] = ResolversParentTypes['CartDiscountCodesUpdatePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartEstimatedCostResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartEstimatedCost'] = ResolversParentTypes['CartEstimatedCost'],
> = {
  checkoutChargeAmount?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  subtotalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalDutyAmount?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalTaxAmount?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartGiftCardCodesRemovePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartGiftCardCodesRemovePayload'] = ResolversParentTypes['CartGiftCardCodesRemovePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartGiftCardCodesUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartGiftCardCodesUpdatePayload'] = ResolversParentTypes['CartGiftCardCodesUpdatePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLineResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartLine'] = ResolversParentTypes['CartLine'],
> = {
  attribute?: Resolver<
    Maybe<ResolversTypes['Attribute']>,
    ParentType,
    ContextType,
    RequireFields<CartLineAttributeArgs, 'key'>
  >;
  attributes?: Resolver<
    Array<ResolversTypes['Attribute']>,
    ParentType,
    ContextType
  >;
  cost?: Resolver<ResolversTypes['CartLineCost'], ParentType, ContextType>;
  discountAllocations?: Resolver<
    Array<ResolversTypes['CartDiscountAllocation']>,
    ParentType,
    ContextType
  >;
  estimatedCost?: Resolver<
    ResolversTypes['CartLineEstimatedCost'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  merchandise?: Resolver<
    ResolversTypes['Merchandise'],
    ParentType,
    ContextType
  >;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sellingPlanAllocation?: Resolver<
    Maybe<ResolversTypes['SellingPlanAllocation']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLineCostResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartLineCost'] = ResolversParentTypes['CartLineCost'],
> = {
  amountPerQuantity?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  compareAtAmountPerQuantity?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  subtotalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLineEstimatedCostResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartLineEstimatedCost'] = ResolversParentTypes['CartLineEstimatedCost'],
> = {
  amount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  compareAtAmount?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  subtotalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLinesAddPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartLinesAddPayload'] = ResolversParentTypes['CartLinesAddPayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLinesRemovePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartLinesRemovePayload'] = ResolversParentTypes['CartLinesRemovePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLinesUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartLinesUpdatePayload'] = ResolversParentTypes['CartLinesUpdatePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartMetafieldDeletePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartMetafieldDeletePayload'] = ResolversParentTypes['CartMetafieldDeletePayload'],
> = {
  deletedId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['MetafieldDeleteUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartMetafieldsSetPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartMetafieldsSetPayload'] = ResolversParentTypes['CartMetafieldsSetPayload'],
> = {
  metafields?: Resolver<
    Maybe<Array<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['MetafieldsSetUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartNoteUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartNoteUpdatePayload'] = ResolversParentTypes['CartNoteUpdatePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartOperationErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartOperationError'] = ResolversParentTypes['CartOperationError'],
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartPaymentUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartPaymentUpdatePayload'] = ResolversParentTypes['CartPaymentUpdatePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartPreferencesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartPreferences'] = ResolversParentTypes['CartPreferences'],
> = {
  delivery?: Resolver<
    Maybe<ResolversTypes['CartDeliveryPreference']>,
    ParentType,
    ContextType
  >;
  wallet?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartPrepareForCompletionPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartPrepareForCompletionPayload'] = ResolversParentTypes['CartPrepareForCompletionPayload'],
> = {
  result?: Resolver<
    Maybe<ResolversTypes['CartPrepareForCompletionResult']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartPrepareForCompletionResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartPrepareForCompletionResult'] = ResolversParentTypes['CartPrepareForCompletionResult'],
> = {
  __resolveType: TypeResolveFn<
    'CartStatusNotReady' | 'CartStatusReady' | 'CartThrottled',
    ParentType,
    ContextType
  >;
};

export type CartSelectableAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartSelectableAddress'] = ResolversParentTypes['CartSelectableAddress'],
> = {
  address?: Resolver<ResolversTypes['CartAddress'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  oneTimeUse?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartSelectedDeliveryOptionsUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartSelectedDeliveryOptionsUpdatePayload'] = ResolversParentTypes['CartSelectedDeliveryOptionsUpdatePayload'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  warnings?: Resolver<
    Array<ResolversTypes['CartWarning']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartStatusNotReadyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartStatusNotReady'] = ResolversParentTypes['CartStatusNotReady'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  errors?: Resolver<
    Array<ResolversTypes['CartOperationError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartStatusReadyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartStatusReady'] = ResolversParentTypes['CartStatusReady'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartSubmitForCompletionPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartSubmitForCompletionPayload'] = ResolversParentTypes['CartSubmitForCompletionPayload'],
> = {
  result?: Resolver<
    Maybe<ResolversTypes['CartSubmitForCompletionResult']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['CartUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartSubmitForCompletionResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartSubmitForCompletionResult'] = ResolversParentTypes['CartSubmitForCompletionResult'],
> = {
  __resolveType: TypeResolveFn<
    | 'SubmitAlreadyAccepted'
    | 'SubmitFailed'
    | 'SubmitSuccess'
    | 'SubmitThrottled',
    ParentType,
    ContextType
  >;
};

export type CartThrottledResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartThrottled'] = ResolversParentTypes['CartThrottled'],
> = {
  pollAfter?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartUserError'] = ResolversParentTypes['CartUserError'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['CartErrorCode']>,
    ParentType,
    ContextType
  >;
  field?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartWarningResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CartWarning'] = ResolversParentTypes['CartWarning'],
> = {
  code?: Resolver<ResolversTypes['CartWarningCode'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Collection'] = ResolversParentTypes['Collection'],
> = {
  description?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    Partial<CollectionDescriptionArgs>
  >;
  descriptionHtml?: Resolver<ResolversTypes['HTML'], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<CollectionMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<CollectionMetafieldsArgs, 'identifiers'>
  >;
  onlineStoreUrl?: Resolver<
    Maybe<ResolversTypes['URL']>,
    ParentType,
    ContextType
  >;
  products?: Resolver<
    ResolversTypes['ProductConnection'],
    ParentType,
    ContextType,
    RequireFields<CollectionProductsArgs, 'reverse' | 'sortKey'>
  >;
  seo?: Resolver<ResolversTypes['SEO'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  trackingParameters?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CollectionConnection'] = ResolversParentTypes['CollectionConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['CollectionEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['Collection']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<
    ResolversTypes['UnsignedInt64'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CollectionEdge'] = ResolversParentTypes['CollectionEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Collection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ColorScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Color'], any> {
  name: 'Color';
}

export type CommentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Comment'] = ResolversParentTypes['Comment'],
> = {
  author?: Resolver<ResolversTypes['CommentAuthor'], ParentType, ContextType>;
  content?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    Partial<CommentContentArgs>
  >;
  contentHtml?: Resolver<ResolversTypes['HTML'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentAuthorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CommentAuthor'] = ResolversParentTypes['CommentAuthor'],
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CommentConnection'] = ResolversParentTypes['CommentConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['CommentEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CommentEdge'] = ResolversParentTypes['CommentEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Company'] = ResolversParentTypes['Company'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  externalId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<CompanyMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<CompanyMetafieldsArgs, 'identifiers'>
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyContactResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyContact'] = ResolversParentTypes['CompanyContact'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyLocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyLocation'] = ResolversParentTypes['CompanyLocation'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  externalId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<CompanyLocationMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<CompanyLocationMetafieldsArgs, 'identifiers'>
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompletePaymentChallengeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompletePaymentChallenge'] = ResolversParentTypes['CompletePaymentChallenge'],
> = {
  redirectUrl?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompletionErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompletionError'] = ResolversParentTypes['CompletionError'],
> = {
  code?: Resolver<
    ResolversTypes['CompletionErrorCode'],
    ParentType,
    ContextType
  >;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ComponentizableCartLineResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ComponentizableCartLine'] = ResolversParentTypes['ComponentizableCartLine'],
> = {
  attribute?: Resolver<
    Maybe<ResolversTypes['Attribute']>,
    ParentType,
    ContextType,
    RequireFields<ComponentizableCartLineAttributeArgs, 'key'>
  >;
  attributes?: Resolver<
    Array<ResolversTypes['Attribute']>,
    ParentType,
    ContextType
  >;
  cost?: Resolver<ResolversTypes['CartLineCost'], ParentType, ContextType>;
  discountAllocations?: Resolver<
    Array<ResolversTypes['CartDiscountAllocation']>,
    ParentType,
    ContextType
  >;
  estimatedCost?: Resolver<
    ResolversTypes['CartLineEstimatedCost'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineComponents?: Resolver<
    Array<ResolversTypes['CartLine']>,
    ParentType,
    ContextType
  >;
  merchandise?: Resolver<
    ResolversTypes['Merchandise'],
    ParentType,
    ContextType
  >;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sellingPlanAllocation?: Resolver<
    Maybe<ResolversTypes['SellingPlanAllocation']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Count'] = ResolversParentTypes['Count'],
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  precision?: Resolver<
    ResolversTypes['CountPrecision'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Country'] = ResolversParentTypes['Country'],
> = {
  availableLanguages?: Resolver<
    Array<ResolversTypes['Language']>,
    ParentType,
    ContextType
  >;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  isoCode?: Resolver<ResolversTypes['CountryCode'], ParentType, ContextType>;
  market?: Resolver<Maybe<ResolversTypes['Market']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unitSystem?: Resolver<ResolversTypes['UnitSystem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrencyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Currency'] = ResolversParentTypes['Currency'],
> = {
  isoCode?: Resolver<ResolversTypes['CurrencyCode'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Customer'] = ResolversParentTypes['Customer'],
> = {
  acceptsMarketing?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  addresses?: Resolver<
    ResolversTypes['MailingAddressConnection'],
    ParentType,
    ContextType,
    RequireFields<CustomerAddressesArgs, 'reverse'>
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  defaultAddress?: Resolver<
    Maybe<ResolversTypes['MailingAddress']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<CustomerMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<CustomerMetafieldsArgs, 'identifiers'>
  >;
  numberOfOrders?: Resolver<
    ResolversTypes['UnsignedInt64'],
    ParentType,
    ContextType
  >;
  orders?: Resolver<
    ResolversTypes['OrderConnection'],
    ParentType,
    ContextType,
    RequireFields<CustomerOrdersArgs, 'reverse' | 'sortKey'>
  >;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAccessTokenResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerAccessToken'] = ResolversParentTypes['CustomerAccessToken'],
> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expiresAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAccessTokenCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerAccessTokenCreatePayload'] = ResolversParentTypes['CustomerAccessTokenCreatePayload'],
> = {
  customerAccessToken?: Resolver<
    Maybe<ResolversTypes['CustomerAccessToken']>,
    ParentType,
    ContextType
  >;
  customerUserErrors?: Resolver<
    Array<ResolversTypes['CustomerUserError']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAccessTokenCreateWithMultipassPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerAccessTokenCreateWithMultipassPayload'] = ResolversParentTypes['CustomerAccessTokenCreateWithMultipassPayload'],
> = {
  customerAccessToken?: Resolver<
    Maybe<ResolversTypes['CustomerAccessToken']>,
    ParentType,
    ContextType
  >;
  customerUserErrors?: Resolver<
    Array<ResolversTypes['CustomerUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAccessTokenDeletePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerAccessTokenDeletePayload'] = ResolversParentTypes['CustomerAccessTokenDeletePayload'],
> = {
  deletedAccessToken?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  deletedCustomerAccessTokenId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAccessTokenRenewPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerAccessTokenRenewPayload'] = ResolversParentTypes['CustomerAccessTokenRenewPayload'],
> = {
  customerAccessToken?: Resolver<
    Maybe<ResolversTypes['CustomerAccessToken']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerActivateByUrlPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerActivateByUrlPayload'] = ResolversParentTypes['CustomerActivateByUrlPayload'],
> = {
  customer?: Resolver<
    Maybe<ResolversTypes['Customer']>,
    ParentType,
    ContextType
  >;
  customerAccessToken?: Resolver<
    Maybe<ResolversTypes['CustomerAccessToken']>,
    ParentType,
    ContextType
  >;
  customerUserErrors?: Resolver<
    Array<ResolversTypes['CustomerUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerActivatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerActivatePayload'] = ResolversParentTypes['CustomerActivatePayload'],
> = {
  customer?: Resolver<
    Maybe<ResolversTypes['Customer']>,
    ParentType,
    ContextType
  >;
  customerAccessToken?: Resolver<
    Maybe<ResolversTypes['CustomerAccessToken']>,
    ParentType,
    ContextType
  >;
  customerUserErrors?: Resolver<
    Array<ResolversTypes['CustomerUserError']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAddressCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerAddressCreatePayload'] = ResolversParentTypes['CustomerAddressCreatePayload'],
> = {
  customerAddress?: Resolver<
    Maybe<ResolversTypes['MailingAddress']>,
    ParentType,
    ContextType
  >;
  customerUserErrors?: Resolver<
    Array<ResolversTypes['CustomerUserError']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAddressDeletePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerAddressDeletePayload'] = ResolversParentTypes['CustomerAddressDeletePayload'],
> = {
  customerUserErrors?: Resolver<
    Array<ResolversTypes['CustomerUserError']>,
    ParentType,
    ContextType
  >;
  deletedCustomerAddressId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAddressUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerAddressUpdatePayload'] = ResolversParentTypes['CustomerAddressUpdatePayload'],
> = {
  customerAddress?: Resolver<
    Maybe<ResolversTypes['MailingAddress']>,
    ParentType,
    ContextType
  >;
  customerUserErrors?: Resolver<
    Array<ResolversTypes['CustomerUserError']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerCreatePayload'] = ResolversParentTypes['CustomerCreatePayload'],
> = {
  customer?: Resolver<
    Maybe<ResolversTypes['Customer']>,
    ParentType,
    ContextType
  >;
  customerUserErrors?: Resolver<
    Array<ResolversTypes['CustomerUserError']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerDefaultAddressUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerDefaultAddressUpdatePayload'] = ResolversParentTypes['CustomerDefaultAddressUpdatePayload'],
> = {
  customer?: Resolver<
    Maybe<ResolversTypes['Customer']>,
    ParentType,
    ContextType
  >;
  customerUserErrors?: Resolver<
    Array<ResolversTypes['CustomerUserError']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerRecoverPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerRecoverPayload'] = ResolversParentTypes['CustomerRecoverPayload'],
> = {
  customerUserErrors?: Resolver<
    Array<ResolversTypes['CustomerUserError']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResetByUrlPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerResetByUrlPayload'] = ResolversParentTypes['CustomerResetByUrlPayload'],
> = {
  customer?: Resolver<
    Maybe<ResolversTypes['Customer']>,
    ParentType,
    ContextType
  >;
  customerAccessToken?: Resolver<
    Maybe<ResolversTypes['CustomerAccessToken']>,
    ParentType,
    ContextType
  >;
  customerUserErrors?: Resolver<
    Array<ResolversTypes['CustomerUserError']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResetPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerResetPayload'] = ResolversParentTypes['CustomerResetPayload'],
> = {
  customer?: Resolver<
    Maybe<ResolversTypes['Customer']>,
    ParentType,
    ContextType
  >;
  customerAccessToken?: Resolver<
    Maybe<ResolversTypes['CustomerAccessToken']>,
    ParentType,
    ContextType
  >;
  customerUserErrors?: Resolver<
    Array<ResolversTypes['CustomerUserError']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerUpdatePayload'] = ResolversParentTypes['CustomerUpdatePayload'],
> = {
  customer?: Resolver<
    Maybe<ResolversTypes['Customer']>,
    ParentType,
    ContextType
  >;
  customerAccessToken?: Resolver<
    Maybe<ResolversTypes['CustomerAccessToken']>,
    ParentType,
    ContextType
  >;
  customerUserErrors?: Resolver<
    Array<ResolversTypes['CustomerUserError']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerUserError'] = ResolversParentTypes['CustomerUserError'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['CustomerErrorCode']>,
    ParentType,
    ContextType
  >;
  field?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

export type DeliveryAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DeliveryAddress'] = ResolversParentTypes['DeliveryAddress'],
> = {
  __resolveType: TypeResolveFn<'MailingAddress', ParentType, ContextType>;
};

export type DiscountAllocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DiscountAllocation'] = ResolversParentTypes['DiscountAllocation'],
> = {
  allocatedAmount?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  discountApplication?: Resolver<
    ResolversTypes['DiscountApplication'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscountApplicationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DiscountApplication'] = ResolversParentTypes['DiscountApplication'],
> = {
  __resolveType: TypeResolveFn<
    | 'AutomaticDiscountApplication'
    | 'DiscountCodeApplication'
    | 'ManualDiscountApplication'
    | 'ScriptDiscountApplication',
    ParentType,
    ContextType
  >;
  allocationMethod?: Resolver<
    ResolversTypes['DiscountApplicationAllocationMethod'],
    ParentType,
    ContextType
  >;
  targetSelection?: Resolver<
    ResolversTypes['DiscountApplicationTargetSelection'],
    ParentType,
    ContextType
  >;
  targetType?: Resolver<
    ResolversTypes['DiscountApplicationTargetType'],
    ParentType,
    ContextType
  >;
  value?: Resolver<ResolversTypes['PricingValue'], ParentType, ContextType>;
};

export type DiscountApplicationConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DiscountApplicationConnection'] = ResolversParentTypes['DiscountApplicationConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['DiscountApplicationEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['DiscountApplication']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscountApplicationEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DiscountApplicationEdge'] = ResolversParentTypes['DiscountApplicationEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['DiscountApplication'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscountCodeApplicationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DiscountCodeApplication'] = ResolversParentTypes['DiscountCodeApplication'],
> = {
  allocationMethod?: Resolver<
    ResolversTypes['DiscountApplicationAllocationMethod'],
    ParentType,
    ContextType
  >;
  applicable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  targetSelection?: Resolver<
    ResolversTypes['DiscountApplicationTargetSelection'],
    ParentType,
    ContextType
  >;
  targetType?: Resolver<
    ResolversTypes['DiscountApplicationTargetType'],
    ParentType,
    ContextType
  >;
  value?: Resolver<ResolversTypes['PricingValue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisplayableErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DisplayableError'] = ResolversParentTypes['DisplayableError'],
> = {
  __resolveType: TypeResolveFn<
    | 'CartUserError'
    | 'CustomerUserError'
    | 'MetafieldDeleteUserError'
    | 'MetafieldsSetUserError'
    | 'UserError'
    | 'UserErrorsShopPayPaymentRequestSessionUserErrors',
    ParentType,
    ContextType
  >;
  field?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type DomainResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Domain'] = ResolversParentTypes['Domain'],
> = {
  host?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sslEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalVideoResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ExternalVideo'] = ResolversParentTypes['ExternalVideo'],
> = {
  alt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  embedUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  embeddedUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  host?: Resolver<ResolversTypes['MediaHost'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mediaContentType?: Resolver<
    ResolversTypes['MediaContentType'],
    ParentType,
    ContextType
  >;
  originUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  presentation?: Resolver<
    Maybe<ResolversTypes['MediaPresentation']>,
    ParentType,
    ContextType
  >;
  previewImage?: Resolver<
    Maybe<ResolversTypes['Image']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilterResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Filter'] = ResolversParentTypes['Filter'],
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  presentation?: Resolver<
    Maybe<ResolversTypes['FilterPresentation']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['FilterType'], ParentType, ContextType>;
  values?: Resolver<
    Array<ResolversTypes['FilterValue']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilterValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['FilterValue'] = ResolversParentTypes['FilterValue'],
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<
    Maybe<ResolversTypes['MediaImage']>,
    ParentType,
    ContextType
  >;
  input?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  swatch?: Resolver<Maybe<ResolversTypes['Swatch']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Fulfillment'] = ResolversParentTypes['Fulfillment'],
> = {
  fulfillmentLineItems?: Resolver<
    ResolversTypes['FulfillmentLineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<FulfillmentFulfillmentLineItemsArgs, 'reverse'>
  >;
  trackingCompany?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  trackingInfo?: Resolver<
    Array<ResolversTypes['FulfillmentTrackingInfo']>,
    ParentType,
    ContextType,
    Partial<FulfillmentTrackingInfoArgs>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentLineItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['FulfillmentLineItem'] = ResolversParentTypes['FulfillmentLineItem'],
> = {
  lineItem?: Resolver<ResolversTypes['OrderLineItem'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentLineItemConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['FulfillmentLineItemConnection'] = ResolversParentTypes['FulfillmentLineItemConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['FulfillmentLineItemEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['FulfillmentLineItem']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentLineItemEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['FulfillmentLineItemEdge'] = ResolversParentTypes['FulfillmentLineItemEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['FulfillmentLineItem'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentTrackingInfoResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['FulfillmentTrackingInfo'] = ResolversParentTypes['FulfillmentTrackingInfo'],
> = {
  number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenericFileResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['GenericFile'] = ResolversParentTypes['GenericFile'],
> = {
  alt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mimeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalFileSize?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  previewImage?: Resolver<
    Maybe<ResolversTypes['Image']>,
    ParentType,
    ContextType
  >;
  url?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface HtmlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['HTML'], any> {
  name: 'HTML';
}

export type HasMetafieldsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['HasMetafields'] = ResolversParentTypes['HasMetafields'],
> = {
  __resolveType: TypeResolveFn<
    | 'Article'
    | 'Blog'
    | 'Cart'
    | 'Collection'
    | 'Company'
    | 'CompanyLocation'
    | 'Customer'
    | 'Location'
    | 'Market'
    | 'Order'
    | 'Page'
    | 'Product'
    | 'ProductVariant'
    | 'SellingPlan'
    | 'Shop',
    ParentType,
    ContextType
  >;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<HasMetafieldsMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<HasMetafieldsMetafieldsArgs, 'identifiers'>
  >;
};

export interface Iso8601DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601DateTime'], any> {
  name: 'ISO8601DateTime';
}

export type ImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Image'] = ResolversParentTypes['Image'],
> = {
  altText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  originalSrc?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  src?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  transformedSrc?: Resolver<
    ResolversTypes['URL'],
    ParentType,
    ContextType,
    RequireFields<ImageTransformedSrcArgs, 'scale'>
  >;
  url?: Resolver<
    ResolversTypes['URL'],
    ParentType,
    ContextType,
    Partial<ImageUrlArgs>
  >;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ImageConnection'] = ResolversParentTypes['ImageConnection'],
> = {
  edges?: Resolver<Array<ResolversTypes['ImageEdge']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ImageEdge'] = ResolversParentTypes['ImageEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InContextAnnotationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['InContextAnnotation'] = ResolversParentTypes['InContextAnnotation'],
> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<
    ResolversTypes['InContextAnnotationType'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InContextAnnotationTypeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['InContextAnnotationType'] = ResolversParentTypes['InContextAnnotationType'],
> = {
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LanguageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Language'] = ResolversParentTypes['Language'],
> = {
  endonymName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isoCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocalizationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Localization'] = ResolversParentTypes['Localization'],
> = {
  availableCountries?: Resolver<
    Array<ResolversTypes['Country']>,
    ParentType,
    ContextType
  >;
  availableLanguages?: Resolver<
    Array<ResolversTypes['Language']>,
    ParentType,
    ContextType
  >;
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['Language'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Location'] = ResolversParentTypes['Location'],
> = {
  address?: Resolver<
    ResolversTypes['LocationAddress'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<LocationMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<LocationMetafieldsArgs, 'identifiers'>
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LocationAddress'] = ResolversParentTypes['LocationAddress'],
> = {
  address1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  formatted?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  province?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provinceCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LocationConnection'] = ResolversParentTypes['LocationConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['LocationEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<Array<ResolversTypes['Location']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LocationEdge'] = ResolversParentTypes['LocationEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MailingAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MailingAddress'] = ResolversParentTypes['MailingAddress'],
> = {
  address1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  countryCodeV2?: Resolver<
    Maybe<ResolversTypes['CountryCode']>,
    ParentType,
    ContextType
  >;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  formatted?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MailingAddressFormattedArgs, 'withCompany' | 'withName'>
  >;
  formattedArea?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  province?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provinceCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MailingAddressConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MailingAddressConnection'] = ResolversParentTypes['MailingAddressConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['MailingAddressEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['MailingAddress']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MailingAddressEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MailingAddressEdge'] = ResolversParentTypes['MailingAddressEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['MailingAddress'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManualDiscountApplicationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ManualDiscountApplication'] = ResolversParentTypes['ManualDiscountApplication'],
> = {
  allocationMethod?: Resolver<
    ResolversTypes['DiscountApplicationAllocationMethod'],
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  targetSelection?: Resolver<
    ResolversTypes['DiscountApplicationTargetSelection'],
    ParentType,
    ContextType
  >;
  targetType?: Resolver<
    ResolversTypes['DiscountApplicationTargetType'],
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['PricingValue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarketResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Market'] = ResolversParentTypes['Market'],
> = {
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<MarketMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<MarketMetafieldsArgs, 'identifiers'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Media'] = ResolversParentTypes['Media'],
> = {
  __resolveType: TypeResolveFn<
    'ExternalVideo' | 'MediaImage' | 'Model3d' | 'Video',
    ParentType,
    ContextType
  >;
  alt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mediaContentType?: Resolver<
    ResolversTypes['MediaContentType'],
    ParentType,
    ContextType
  >;
  presentation?: Resolver<
    Maybe<ResolversTypes['MediaPresentation']>,
    ParentType,
    ContextType
  >;
  previewImage?: Resolver<
    Maybe<ResolversTypes['Image']>,
    ParentType,
    ContextType
  >;
};

export type MediaConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MediaConnection'] = ResolversParentTypes['MediaConnection'],
> = {
  edges?: Resolver<Array<ResolversTypes['MediaEdge']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Media']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MediaEdge'] = ResolversParentTypes['MediaEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Media'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MediaImage'] = ResolversParentTypes['MediaImage'],
> = {
  alt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  mediaContentType?: Resolver<
    ResolversTypes['MediaContentType'],
    ParentType,
    ContextType
  >;
  presentation?: Resolver<
    Maybe<ResolversTypes['MediaPresentation']>,
    ParentType,
    ContextType
  >;
  previewImage?: Resolver<
    Maybe<ResolversTypes['Image']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaPresentationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MediaPresentation'] = ResolversParentTypes['MediaPresentation'],
> = {
  asJson?: Resolver<
    Maybe<ResolversTypes['JSON']>,
    ParentType,
    ContextType,
    RequireFields<MediaPresentationAsJsonArgs, 'format'>
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Menu'] = ResolversParentTypes['Menu'],
> = {
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['MenuItem']>, ParentType, ContextType>;
  itemsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MenuItem'] = ResolversParentTypes['MenuItem'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['MenuItem']>, ParentType, ContextType>;
  resource?: Resolver<
    Maybe<ResolversTypes['MenuItemResource']>,
    ParentType,
    ContextType
  >;
  resourceId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MenuItemType'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemResourceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MenuItemResource'] = ResolversParentTypes['MenuItemResource'],
> = {
  __resolveType: TypeResolveFn<
    | 'Article'
    | 'Blog'
    | 'Collection'
    | 'Metaobject'
    | 'Page'
    | 'Product'
    | 'ShopPolicy',
    ParentType,
    ContextType
  >;
};

export type MerchandiseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Merchandise'] = ResolversParentTypes['Merchandise'],
> = {
  __resolveType: TypeResolveFn<'ProductVariant', ParentType, ContextType>;
};

export type MetafieldResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Metafield'] = ResolversParentTypes['Metafield'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentResource?: Resolver<
    ResolversTypes['MetafieldParentResource'],
    ParentType,
    ContextType
  >;
  reference?: Resolver<
    Maybe<ResolversTypes['MetafieldReference']>,
    ParentType,
    ContextType
  >;
  references?: Resolver<
    Maybe<ResolversTypes['MetafieldReferenceConnection']>,
    ParentType,
    ContextType,
    Partial<MetafieldReferencesArgs>
  >;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetafieldDeleteUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetafieldDeleteUserError'] = ResolversParentTypes['MetafieldDeleteUserError'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['MetafieldDeleteErrorCode']>,
    ParentType,
    ContextType
  >;
  field?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetafieldParentResourceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetafieldParentResource'] = ResolversParentTypes['MetafieldParentResource'],
> = {
  __resolveType: TypeResolveFn<
    | 'Article'
    | 'Blog'
    | 'Cart'
    | 'Collection'
    | 'Company'
    | 'CompanyLocation'
    | 'Customer'
    | 'Location'
    | 'Market'
    | 'Order'
    | 'Page'
    | 'Product'
    | 'ProductVariant'
    | 'SellingPlan'
    | 'Shop',
    ParentType,
    ContextType
  >;
};

export type MetafieldReferenceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetafieldReference'] = ResolversParentTypes['MetafieldReference'],
> = {
  __resolveType: TypeResolveFn<
    | 'Collection'
    | 'GenericFile'
    | 'MediaImage'
    | 'Metaobject'
    | 'Model3d'
    | 'Page'
    | 'Product'
    | 'ProductVariant'
    | 'Video',
    ParentType,
    ContextType
  >;
};

export type MetafieldReferenceConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetafieldReferenceConnection'] = ResolversParentTypes['MetafieldReferenceConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['MetafieldReferenceEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['MetafieldReference']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetafieldReferenceEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetafieldReferenceEdge'] = ResolversParentTypes['MetafieldReferenceEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['MetafieldReference'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetafieldsSetUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetafieldsSetUserError'] = ResolversParentTypes['MetafieldsSetUserError'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['MetafieldsSetUserErrorCode']>,
    ParentType,
    ContextType
  >;
  elementIndex?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  field?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaobjectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Metaobject'] = ResolversParentTypes['Metaobject'],
> = {
  field?: Resolver<
    Maybe<ResolversTypes['MetaobjectField']>,
    ParentType,
    ContextType,
    RequireFields<MetaobjectFieldArgs, 'key'>
  >;
  fields?: Resolver<
    Array<ResolversTypes['MetaobjectField']>,
    ParentType,
    ContextType
  >;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  onlineStoreUrl?: Resolver<
    Maybe<ResolversTypes['URL']>,
    ParentType,
    ContextType
  >;
  seo?: Resolver<
    Maybe<ResolversTypes['MetaobjectSEO']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaobjectConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetaobjectConnection'] = ResolversParentTypes['MetaobjectConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['MetaobjectEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['Metaobject']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaobjectEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetaobjectEdge'] = ResolversParentTypes['MetaobjectEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Metaobject'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaobjectFieldResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetaobjectField'] = ResolversParentTypes['MetaobjectField'],
> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reference?: Resolver<
    Maybe<ResolversTypes['MetafieldReference']>,
    ParentType,
    ContextType
  >;
  references?: Resolver<
    Maybe<ResolversTypes['MetafieldReferenceConnection']>,
    ParentType,
    ContextType,
    Partial<MetaobjectFieldReferencesArgs>
  >;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaobjectSeoResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetaobjectSEO'] = ResolversParentTypes['MetaobjectSEO'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['MetaobjectField']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<
    Maybe<ResolversTypes['MetaobjectField']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Model3dResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Model3d'] = ResolversParentTypes['Model3d'],
> = {
  alt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mediaContentType?: Resolver<
    ResolversTypes['MediaContentType'],
    ParentType,
    ContextType
  >;
  presentation?: Resolver<
    Maybe<ResolversTypes['MediaPresentation']>,
    ParentType,
    ContextType
  >;
  previewImage?: Resolver<
    Maybe<ResolversTypes['Image']>,
    ParentType,
    ContextType
  >;
  sources?: Resolver<
    Array<ResolversTypes['Model3dSource']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Model3dSourceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Model3dSource'] = ResolversParentTypes['Model3dSource'],
> = {
  filesize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  format?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimeType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoneyV2Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MoneyV2'] = ResolversParentTypes['MoneyV2'],
> = {
  amount?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  currencyCode?: Resolver<
    ResolversTypes['CurrencyCode'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  cartAttributesUpdate?: Resolver<
    Maybe<ResolversTypes['CartAttributesUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCartAttributesUpdateArgs, 'attributes' | 'cartId'>
  >;
  cartBillingAddressUpdate?: Resolver<
    Maybe<ResolversTypes['CartBillingAddressUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCartBillingAddressUpdateArgs, 'cartId'>
  >;
  cartBuyerIdentityUpdate?: Resolver<
    Maybe<ResolversTypes['CartBuyerIdentityUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCartBuyerIdentityUpdateArgs,
      'buyerIdentity' | 'cartId'
    >
  >;
  cartCreate?: Resolver<
    Maybe<ResolversTypes['CartCreatePayload']>,
    ParentType,
    ContextType,
    Partial<MutationCartCreateArgs>
  >;
  cartDeliveryAddressesAdd?: Resolver<
    Maybe<ResolversTypes['CartDeliveryAddressesAddPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCartDeliveryAddressesAddArgs, 'addresses' | 'cartId'>
  >;
  cartDeliveryAddressesRemove?: Resolver<
    Maybe<ResolversTypes['CartDeliveryAddressesRemovePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCartDeliveryAddressesRemoveArgs,
      'addressIds' | 'cartId'
    >
  >;
  cartDeliveryAddressesUpdate?: Resolver<
    Maybe<ResolversTypes['CartDeliveryAddressesUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCartDeliveryAddressesUpdateArgs,
      'addresses' | 'cartId'
    >
  >;
  cartDiscountCodesUpdate?: Resolver<
    Maybe<ResolversTypes['CartDiscountCodesUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCartDiscountCodesUpdateArgs, 'cartId'>
  >;
  cartGiftCardCodesRemove?: Resolver<
    Maybe<ResolversTypes['CartGiftCardCodesRemovePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCartGiftCardCodesRemoveArgs,
      'appliedGiftCardIds' | 'cartId'
    >
  >;
  cartGiftCardCodesUpdate?: Resolver<
    Maybe<ResolversTypes['CartGiftCardCodesUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCartGiftCardCodesUpdateArgs,
      'cartId' | 'giftCardCodes'
    >
  >;
  cartLinesAdd?: Resolver<
    Maybe<ResolversTypes['CartLinesAddPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCartLinesAddArgs, 'cartId' | 'lines'>
  >;
  cartLinesRemove?: Resolver<
    Maybe<ResolversTypes['CartLinesRemovePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCartLinesRemoveArgs, 'cartId' | 'lineIds'>
  >;
  cartLinesUpdate?: Resolver<
    Maybe<ResolversTypes['CartLinesUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCartLinesUpdateArgs, 'cartId' | 'lines'>
  >;
  cartMetafieldDelete?: Resolver<
    Maybe<ResolversTypes['CartMetafieldDeletePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCartMetafieldDeleteArgs, 'input'>
  >;
  cartMetafieldsSet?: Resolver<
    Maybe<ResolversTypes['CartMetafieldsSetPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCartMetafieldsSetArgs, 'metafields'>
  >;
  cartNoteUpdate?: Resolver<
    Maybe<ResolversTypes['CartNoteUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCartNoteUpdateArgs, 'cartId' | 'note'>
  >;
  cartPaymentUpdate?: Resolver<
    Maybe<ResolversTypes['CartPaymentUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCartPaymentUpdateArgs, 'cartId' | 'payment'>
  >;
  cartPrepareForCompletion?: Resolver<
    Maybe<ResolversTypes['CartPrepareForCompletionPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCartPrepareForCompletionArgs, 'cartId'>
  >;
  cartSelectedDeliveryOptionsUpdate?: Resolver<
    Maybe<ResolversTypes['CartSelectedDeliveryOptionsUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCartSelectedDeliveryOptionsUpdateArgs,
      'cartId' | 'selectedDeliveryOptions'
    >
  >;
  cartSubmitForCompletion?: Resolver<
    Maybe<ResolversTypes['CartSubmitForCompletionPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCartSubmitForCompletionArgs,
      'attemptToken' | 'cartId'
    >
  >;
  customerAccessTokenCreate?: Resolver<
    Maybe<ResolversTypes['CustomerAccessTokenCreatePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCustomerAccessTokenCreateArgs, 'input'>
  >;
  customerAccessTokenCreateWithMultipass?: Resolver<
    Maybe<ResolversTypes['CustomerAccessTokenCreateWithMultipassPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCustomerAccessTokenCreateWithMultipassArgs,
      'multipassToken'
    >
  >;
  customerAccessTokenDelete?: Resolver<
    Maybe<ResolversTypes['CustomerAccessTokenDeletePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCustomerAccessTokenDeleteArgs, 'customerAccessToken'>
  >;
  customerAccessTokenRenew?: Resolver<
    Maybe<ResolversTypes['CustomerAccessTokenRenewPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCustomerAccessTokenRenewArgs, 'customerAccessToken'>
  >;
  customerActivate?: Resolver<
    Maybe<ResolversTypes['CustomerActivatePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCustomerActivateArgs, 'id' | 'input'>
  >;
  customerActivateByUrl?: Resolver<
    Maybe<ResolversTypes['CustomerActivateByUrlPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCustomerActivateByUrlArgs,
      'activationUrl' | 'password'
    >
  >;
  customerAddressCreate?: Resolver<
    Maybe<ResolversTypes['CustomerAddressCreatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCustomerAddressCreateArgs,
      'address' | 'customerAccessToken'
    >
  >;
  customerAddressDelete?: Resolver<
    Maybe<ResolversTypes['CustomerAddressDeletePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCustomerAddressDeleteArgs,
      'customerAccessToken' | 'id'
    >
  >;
  customerAddressUpdate?: Resolver<
    Maybe<ResolversTypes['CustomerAddressUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCustomerAddressUpdateArgs,
      'address' | 'customerAccessToken' | 'id'
    >
  >;
  customerCreate?: Resolver<
    Maybe<ResolversTypes['CustomerCreatePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCustomerCreateArgs, 'input'>
  >;
  customerDefaultAddressUpdate?: Resolver<
    Maybe<ResolversTypes['CustomerDefaultAddressUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCustomerDefaultAddressUpdateArgs,
      'addressId' | 'customerAccessToken'
    >
  >;
  customerRecover?: Resolver<
    Maybe<ResolversTypes['CustomerRecoverPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCustomerRecoverArgs, 'email'>
  >;
  customerReset?: Resolver<
    Maybe<ResolversTypes['CustomerResetPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCustomerResetArgs, 'id' | 'input'>
  >;
  customerResetByUrl?: Resolver<
    Maybe<ResolversTypes['CustomerResetByUrlPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCustomerResetByUrlArgs, 'password' | 'resetUrl'>
  >;
  customerUpdate?: Resolver<
    Maybe<ResolversTypes['CustomerUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCustomerUpdateArgs,
      'customer' | 'customerAccessToken'
    >
  >;
  shopPayPaymentRequestSessionCreate?: Resolver<
    Maybe<ResolversTypes['ShopPayPaymentRequestSessionCreatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationShopPayPaymentRequestSessionCreateArgs,
      'paymentRequest' | 'sourceIdentifier'
    >
  >;
  shopPayPaymentRequestSessionSubmit?: Resolver<
    Maybe<ResolversTypes['ShopPayPaymentRequestSessionSubmitPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationShopPayPaymentRequestSessionSubmitArgs,
      'idempotencyKey' | 'paymentRequest' | 'token'
    >
  >;
};

export type NodeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Node'] = ResolversParentTypes['Node'],
> = {
  __resolveType: TypeResolveFn<
    | 'AppliedGiftCard'
    | 'Article'
    | 'Blog'
    | 'Cart'
    | 'CartLine'
    | 'Collection'
    | 'Comment'
    | 'Company'
    | 'CompanyContact'
    | 'CompanyLocation'
    | 'ComponentizableCartLine'
    | 'ExternalVideo'
    | 'GenericFile'
    | 'Location'
    | 'MailingAddress'
    | 'Market'
    | 'MediaImage'
    | 'MediaPresentation'
    | 'Menu'
    | 'MenuItem'
    | 'Metafield'
    | 'Metaobject'
    | 'Model3d'
    | 'Order'
    | 'Page'
    | 'Product'
    | 'ProductOption'
    | 'ProductOptionValue'
    | 'ProductVariant'
    | 'Shop'
    | 'ShopPayInstallmentsFinancingPlan'
    | 'ShopPayInstallmentsFinancingPlanTerm'
    | 'ShopPayInstallmentsProductVariantPricing'
    | 'ShopPolicy'
    | 'TaxonomyCategory'
    | 'UrlRedirect'
    | 'Video',
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type OnlineStorePublishableResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OnlineStorePublishable'] = ResolversParentTypes['OnlineStorePublishable'],
> = {
  __resolveType: TypeResolveFn<
    'Article' | 'Blog' | 'Collection' | 'Metaobject' | 'Page' | 'Product',
    ParentType,
    ContextType
  >;
  onlineStoreUrl?: Resolver<
    Maybe<ResolversTypes['URL']>,
    ParentType,
    ContextType
  >;
};

export type OrderResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Order'] = ResolversParentTypes['Order'],
> = {
  billingAddress?: Resolver<
    Maybe<ResolversTypes['MailingAddress']>,
    ParentType,
    ContextType
  >;
  cancelReason?: Resolver<
    Maybe<ResolversTypes['OrderCancelReason']>,
    ParentType,
    ContextType
  >;
  canceledAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  currencyCode?: Resolver<
    ResolversTypes['CurrencyCode'],
    ParentType,
    ContextType
  >;
  currentSubtotalPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  currentTotalDuties?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  currentTotalPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  currentTotalShippingPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  currentTotalTax?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  customAttributes?: Resolver<
    Array<ResolversTypes['Attribute']>,
    ParentType,
    ContextType
  >;
  customerLocale?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  customerUrl?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  discountApplications?: Resolver<
    ResolversTypes['DiscountApplicationConnection'],
    ParentType,
    ContextType,
    RequireFields<OrderDiscountApplicationsArgs, 'reverse'>
  >;
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  financialStatus?: Resolver<
    Maybe<ResolversTypes['OrderFinancialStatus']>,
    ParentType,
    ContextType
  >;
  fulfillmentStatus?: Resolver<
    ResolversTypes['OrderFulfillmentStatus'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineItems?: Resolver<
    ResolversTypes['OrderLineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<OrderLineItemsArgs, 'reverse'>
  >;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<OrderMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<OrderMetafieldsArgs, 'identifiers'>
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  originalTotalDuties?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  originalTotalPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  processedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  shippingAddress?: Resolver<
    Maybe<ResolversTypes['MailingAddress']>,
    ParentType,
    ContextType
  >;
  shippingDiscountAllocations?: Resolver<
    Array<ResolversTypes['DiscountAllocation']>,
    ParentType,
    ContextType
  >;
  statusUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  subtotalPrice?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  subtotalPriceV2?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  successfulFulfillments?: Resolver<
    Maybe<Array<ResolversTypes['Fulfillment']>>,
    ParentType,
    ContextType,
    Partial<OrderSuccessfulFulfillmentsArgs>
  >;
  totalPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalPriceV2?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalRefunded?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalRefundedV2?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalShippingPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalShippingPriceV2?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalTax?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalTaxV2?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderConnection'] = ResolversParentTypes['OrderConnection'],
> = {
  edges?: Resolver<Array<ResolversTypes['OrderEdge']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<
    ResolversTypes['UnsignedInt64'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderEdge'] = ResolversParentTypes['OrderEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderLineItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderLineItem'] = ResolversParentTypes['OrderLineItem'],
> = {
  currentQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  customAttributes?: Resolver<
    Array<ResolversTypes['Attribute']>,
    ParentType,
    ContextType
  >;
  discountAllocations?: Resolver<
    Array<ResolversTypes['DiscountAllocation']>,
    ParentType,
    ContextType
  >;
  discountedTotalPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  originalTotalPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  variant?: Resolver<
    Maybe<ResolversTypes['ProductVariant']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderLineItemConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderLineItemConnection'] = ResolversParentTypes['OrderLineItemConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['OrderLineItemEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['OrderLineItem']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderLineItemEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderLineItemEdge'] = ResolversParentTypes['OrderLineItemEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['OrderLineItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Page'] = ResolversParentTypes['Page'],
> = {
  body?: Resolver<ResolversTypes['HTML'], ParentType, ContextType>;
  bodySummary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<PageMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<PageMetafieldsArgs, 'identifiers'>
  >;
  onlineStoreUrl?: Resolver<
    Maybe<ResolversTypes['URL']>,
    ParentType,
    ContextType
  >;
  seo?: Resolver<Maybe<ResolversTypes['SEO']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  trackingParameters?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PageConnection'] = ResolversParentTypes['PageConnection'],
> = {
  edges?: Resolver<Array<ResolversTypes['PageEdge']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Page']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PageEdge'] = ResolversParentTypes['PageEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Page'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo'],
> = {
  endCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedSitemapResourcesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaginatedSitemapResources'] = ResolversParentTypes['PaginatedSitemapResources'],
> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  items?: Resolver<
    Array<ResolversTypes['SitemapResourceInterface']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentSettingsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaymentSettings'] = ResolversParentTypes['PaymentSettings'],
> = {
  acceptedCardBrands?: Resolver<
    Array<ResolversTypes['CardBrand']>,
    ParentType,
    ContextType
  >;
  cardVaultUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  countryCode?: Resolver<
    ResolversTypes['CountryCode'],
    ParentType,
    ContextType
  >;
  currencyCode?: Resolver<
    ResolversTypes['CurrencyCode'],
    ParentType,
    ContextType
  >;
  enabledPresentmentCurrencies?: Resolver<
    Array<ResolversTypes['CurrencyCode']>,
    ParentType,
    ContextType
  >;
  shopifyPaymentsAccountId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  supportedDigitalWallets?: Resolver<
    Array<ResolversTypes['DigitalWallet']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PredictiveSearchResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PredictiveSearchResult'] = ResolversParentTypes['PredictiveSearchResult'],
> = {
  articles?: Resolver<
    Array<ResolversTypes['Article']>,
    ParentType,
    ContextType
  >;
  collections?: Resolver<
    Array<ResolversTypes['Collection']>,
    ParentType,
    ContextType
  >;
  pages?: Resolver<Array<ResolversTypes['Page']>, ParentType, ContextType>;
  products?: Resolver<
    Array<ResolversTypes['Product']>,
    ParentType,
    ContextType
  >;
  queries?: Resolver<
    Array<ResolversTypes['SearchQuerySuggestion']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PricingPercentageValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PricingPercentageValue'] = ResolversParentTypes['PricingPercentageValue'],
> = {
  percentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PricingValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PricingValue'] = ResolversParentTypes['PricingValue'],
> = {
  __resolveType: TypeResolveFn<
    'MoneyV2' | 'PricingPercentageValue',
    ParentType,
    ContextType
  >;
};

export type ProductResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Product'] = ResolversParentTypes['Product'],
> = {
  adjacentVariants?: Resolver<
    Array<ResolversTypes['ProductVariant']>,
    ParentType,
    ContextType,
    RequireFields<
      ProductAdjacentVariantsArgs,
      'caseInsensitiveMatch' | 'ignoreUnknownOptions'
    >
  >;
  availableForSale?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  category?: Resolver<
    Maybe<ResolversTypes['TaxonomyCategory']>,
    ParentType,
    ContextType
  >;
  collections?: Resolver<
    ResolversTypes['CollectionConnection'],
    ParentType,
    ContextType,
    RequireFields<ProductCollectionsArgs, 'reverse'>
  >;
  compareAtPriceRange?: Resolver<
    ResolversTypes['ProductPriceRange'],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    Partial<ProductDescriptionArgs>
  >;
  descriptionHtml?: Resolver<ResolversTypes['HTML'], ParentType, ContextType>;
  encodedVariantAvailability?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  encodedVariantExistence?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  featuredImage?: Resolver<
    Maybe<ResolversTypes['Image']>,
    ParentType,
    ContextType
  >;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<
    ResolversTypes['ImageConnection'],
    ParentType,
    ContextType,
    RequireFields<ProductImagesArgs, 'reverse' | 'sortKey'>
  >;
  isGiftCard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  media?: Resolver<
    ResolversTypes['MediaConnection'],
    ParentType,
    ContextType,
    RequireFields<ProductMediaArgs, 'reverse' | 'sortKey'>
  >;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<ProductMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<ProductMetafieldsArgs, 'identifiers'>
  >;
  onlineStoreUrl?: Resolver<
    Maybe<ResolversTypes['URL']>,
    ParentType,
    ContextType
  >;
  options?: Resolver<
    Array<ResolversTypes['ProductOption']>,
    ParentType,
    ContextType,
    Partial<ProductOptionsArgs>
  >;
  priceRange?: Resolver<
    ResolversTypes['ProductPriceRange'],
    ParentType,
    ContextType
  >;
  productType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publishedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  requiresSellingPlan?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  selectedOrFirstAvailableVariant?: Resolver<
    Maybe<ResolversTypes['ProductVariant']>,
    ParentType,
    ContextType,
    RequireFields<
      ProductSelectedOrFirstAvailableVariantArgs,
      'caseInsensitiveMatch' | 'ignoreUnknownOptions'
    >
  >;
  sellingPlanGroups?: Resolver<
    ResolversTypes['SellingPlanGroupConnection'],
    ParentType,
    ContextType,
    RequireFields<ProductSellingPlanGroupsArgs, 'reverse'>
  >;
  seo?: Resolver<ResolversTypes['SEO'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalInventory?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  trackingParameters?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  variantBySelectedOptions?: Resolver<
    Maybe<ResolversTypes['ProductVariant']>,
    ParentType,
    ContextType,
    RequireFields<
      ProductVariantBySelectedOptionsArgs,
      'caseInsensitiveMatch' | 'ignoreUnknownOptions' | 'selectedOptions'
    >
  >;
  variants?: Resolver<
    ResolversTypes['ProductVariantConnection'],
    ParentType,
    ContextType,
    RequireFields<ProductVariantsArgs, 'reverse' | 'sortKey'>
  >;
  variantsCount?: Resolver<
    Maybe<ResolversTypes['Count']>,
    ParentType,
    ContextType
  >;
  vendor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProductConnection'] = ResolversParentTypes['ProductConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['ProductEdge']>,
    ParentType,
    ContextType
  >;
  filters?: Resolver<Array<ResolversTypes['Filter']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProductEdge'] = ResolversParentTypes['ProductEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProductOption'] = ResolversParentTypes['ProductOption'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  optionValues?: Resolver<
    Array<ResolversTypes['ProductOptionValue']>,
    ParentType,
    ContextType
  >;
  values?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductOptionValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProductOptionValue'] = ResolversParentTypes['ProductOptionValue'],
> = {
  firstSelectableVariant?: Resolver<
    Maybe<ResolversTypes['ProductVariant']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  swatch?: Resolver<
    Maybe<ResolversTypes['ProductOptionValueSwatch']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductOptionValueSwatchResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProductOptionValueSwatch'] = ResolversParentTypes['ProductOptionValueSwatch'],
> = {
  color?: Resolver<Maybe<ResolversTypes['Color']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductPriceRangeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProductPriceRange'] = ResolversParentTypes['ProductPriceRange'],
> = {
  maxVariantPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  minVariantPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductVariantResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProductVariant'] = ResolversParentTypes['ProductVariant'],
> = {
  availableForSale?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  barcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  compareAtPrice?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  compareAtPriceV2?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  components?: Resolver<
    ResolversTypes['ProductVariantComponentConnection'],
    ParentType,
    ContextType,
    Partial<ProductVariantComponentsArgs>
  >;
  currentlyNotInStock?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  groupedBy?: Resolver<
    ResolversTypes['ProductVariantConnection'],
    ParentType,
    ContextType,
    Partial<ProductVariantGroupedByArgs>
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<ProductVariantMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<ProductVariantMetafieldsArgs, 'identifiers'>
  >;
  price?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  priceV2?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  quantityAvailable?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  quantityPriceBreaks?: Resolver<
    ResolversTypes['QuantityPriceBreakConnection'],
    ParentType,
    ContextType,
    Partial<ProductVariantQuantityPriceBreaksArgs>
  >;
  quantityRule?: Resolver<
    ResolversTypes['QuantityRule'],
    ParentType,
    ContextType
  >;
  requiresComponents?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  requiresShipping?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  selectedOptions?: Resolver<
    Array<ResolversTypes['SelectedOption']>,
    ParentType,
    ContextType
  >;
  sellingPlanAllocations?: Resolver<
    ResolversTypes['SellingPlanAllocationConnection'],
    ParentType,
    ContextType,
    RequireFields<ProductVariantSellingPlanAllocationsArgs, 'reverse'>
  >;
  shopPayInstallmentsPricing?: Resolver<
    Maybe<ResolversTypes['ShopPayInstallmentsProductVariantPricing']>,
    ParentType,
    ContextType
  >;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  storeAvailability?: Resolver<
    ResolversTypes['StoreAvailabilityConnection'],
    ParentType,
    ContextType,
    RequireFields<ProductVariantStoreAvailabilityArgs, 'reverse'>
  >;
  taxable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unitPrice?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  unitPriceMeasurement?: Resolver<
    Maybe<ResolversTypes['UnitPriceMeasurement']>,
    ParentType,
    ContextType
  >;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weightUnit?: Resolver<ResolversTypes['WeightUnit'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductVariantComponentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProductVariantComponent'] = ResolversParentTypes['ProductVariantComponent'],
> = {
  productVariant?: Resolver<
    ResolversTypes['ProductVariant'],
    ParentType,
    ContextType
  >;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductVariantComponentConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProductVariantComponentConnection'] = ResolversParentTypes['ProductVariantComponentConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['ProductVariantComponentEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['ProductVariantComponent']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductVariantComponentEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProductVariantComponentEdge'] = ResolversParentTypes['ProductVariantComponentEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['ProductVariantComponent'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductVariantConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProductVariantConnection'] = ResolversParentTypes['ProductVariantConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['ProductVariantEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['ProductVariant']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductVariantEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProductVariantEdge'] = ResolversParentTypes['ProductVariantEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ProductVariant'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchasingCompanyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PurchasingCompany'] = ResolversParentTypes['PurchasingCompany'],
> = {
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  contact?: Resolver<
    Maybe<ResolversTypes['CompanyContact']>,
    ParentType,
    ContextType
  >;
  location?: Resolver<
    ResolversTypes['CompanyLocation'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuantityPriceBreakResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['QuantityPriceBreak'] = ResolversParentTypes['QuantityPriceBreak'],
> = {
  minimumQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuantityPriceBreakConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['QuantityPriceBreakConnection'] = ResolversParentTypes['QuantityPriceBreakConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['QuantityPriceBreakEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['QuantityPriceBreak']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuantityPriceBreakEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['QuantityPriceBreakEdge'] = ResolversParentTypes['QuantityPriceBreakEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['QuantityPriceBreak'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuantityRuleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['QuantityRule'] = ResolversParentTypes['QuantityRule'],
> = {
  increment?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maximum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minimum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryRootResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['QueryRoot'] = ResolversParentTypes['QueryRoot'],
> = {
  article?: Resolver<
    Maybe<ResolversTypes['Article']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootArticleArgs, 'id'>
  >;
  articles?: Resolver<
    ResolversTypes['ArticleConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryRootArticlesArgs, 'reverse' | 'sortKey'>
  >;
  blog?: Resolver<
    Maybe<ResolversTypes['Blog']>,
    ParentType,
    ContextType,
    Partial<QueryRootBlogArgs>
  >;
  blogByHandle?: Resolver<
    Maybe<ResolversTypes['Blog']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootBlogByHandleArgs, 'handle'>
  >;
  blogs?: Resolver<
    ResolversTypes['BlogConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryRootBlogsArgs, 'reverse' | 'sortKey'>
  >;
  cart?: Resolver<
    Maybe<ResolversTypes['Cart']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootCartArgs, 'id'>
  >;
  cartCompletionAttempt?: Resolver<
    Maybe<ResolversTypes['CartCompletionAttemptResult']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootCartCompletionAttemptArgs, 'attemptId'>
  >;
  collection?: Resolver<
    Maybe<ResolversTypes['Collection']>,
    ParentType,
    ContextType,
    Partial<QueryRootCollectionArgs>
  >;
  collectionByHandle?: Resolver<
    Maybe<ResolversTypes['Collection']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootCollectionByHandleArgs, 'handle'>
  >;
  collections?: Resolver<
    ResolversTypes['CollectionConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryRootCollectionsArgs, 'reverse' | 'sortKey'>
  >;
  customer?: Resolver<
    Maybe<ResolversTypes['Customer']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootCustomerArgs, 'customerAccessToken'>
  >;
  localization?: Resolver<
    ResolversTypes['Localization'],
    ParentType,
    ContextType
  >;
  locations?: Resolver<
    ResolversTypes['LocationConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryRootLocationsArgs, 'reverse' | 'sortKey'>
  >;
  menu?: Resolver<
    Maybe<ResolversTypes['Menu']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootMenuArgs, 'handle'>
  >;
  metaobject?: Resolver<
    Maybe<ResolversTypes['Metaobject']>,
    ParentType,
    ContextType,
    Partial<QueryRootMetaobjectArgs>
  >;
  metaobjects?: Resolver<
    ResolversTypes['MetaobjectConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryRootMetaobjectsArgs, 'reverse' | 'type'>
  >;
  node?: Resolver<
    Maybe<ResolversTypes['Node']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootNodeArgs, 'id'>
  >;
  nodes?: Resolver<
    Array<Maybe<ResolversTypes['Node']>>,
    ParentType,
    ContextType,
    RequireFields<QueryRootNodesArgs, 'ids'>
  >;
  page?: Resolver<
    Maybe<ResolversTypes['Page']>,
    ParentType,
    ContextType,
    Partial<QueryRootPageArgs>
  >;
  pageByHandle?: Resolver<
    Maybe<ResolversTypes['Page']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootPageByHandleArgs, 'handle'>
  >;
  pages?: Resolver<
    ResolversTypes['PageConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryRootPagesArgs, 'reverse' | 'sortKey'>
  >;
  paymentSettings?: Resolver<
    ResolversTypes['PaymentSettings'],
    ParentType,
    ContextType
  >;
  predictiveSearch?: Resolver<
    Maybe<ResolversTypes['PredictiveSearchResult']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootPredictiveSearchArgs, 'query'>
  >;
  product?: Resolver<
    Maybe<ResolversTypes['Product']>,
    ParentType,
    ContextType,
    Partial<QueryRootProductArgs>
  >;
  productByHandle?: Resolver<
    Maybe<ResolversTypes['Product']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootProductByHandleArgs, 'handle'>
  >;
  productRecommendations?: Resolver<
    Maybe<Array<ResolversTypes['Product']>>,
    ParentType,
    ContextType,
    RequireFields<QueryRootProductRecommendationsArgs, 'intent'>
  >;
  productTags?: Resolver<
    ResolversTypes['StringConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryRootProductTagsArgs, 'first'>
  >;
  productTypes?: Resolver<
    ResolversTypes['StringConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryRootProductTypesArgs, 'first'>
  >;
  products?: Resolver<
    ResolversTypes['ProductConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryRootProductsArgs, 'reverse' | 'sortKey'>
  >;
  publicApiVersions?: Resolver<
    Array<ResolversTypes['ApiVersion']>,
    ParentType,
    ContextType
  >;
  search?: Resolver<
    ResolversTypes['SearchResultItemConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryRootSearchArgs, 'query' | 'reverse' | 'sortKey'>
  >;
  shop?: Resolver<ResolversTypes['Shop'], ParentType, ContextType>;
  sitemap?: Resolver<
    ResolversTypes['Sitemap'],
    ParentType,
    ContextType,
    RequireFields<QueryRootSitemapArgs, 'type'>
  >;
  urlRedirects?: Resolver<
    ResolversTypes['UrlRedirectConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryRootUrlRedirectsArgs, 'reverse'>
  >;
};

export type SeoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SEO'] = ResolversParentTypes['SEO'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScriptDiscountApplicationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ScriptDiscountApplication'] = ResolversParentTypes['ScriptDiscountApplication'],
> = {
  allocationMethod?: Resolver<
    ResolversTypes['DiscountApplicationAllocationMethod'],
    ParentType,
    ContextType
  >;
  targetSelection?: Resolver<
    ResolversTypes['DiscountApplicationTargetSelection'],
    ParentType,
    ContextType
  >;
  targetType?: Resolver<
    ResolversTypes['DiscountApplicationTargetType'],
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['PricingValue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchQuerySuggestionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SearchQuerySuggestion'] = ResolversParentTypes['SearchQuerySuggestion'],
> = {
  styledText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  trackingParameters?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SearchResultItem'] = ResolversParentTypes['SearchResultItem'],
> = {
  __resolveType: TypeResolveFn<
    'Article' | 'Page' | 'Product',
    ParentType,
    ContextType
  >;
};

export type SearchResultItemConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SearchResultItemConnection'] = ResolversParentTypes['SearchResultItemConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['SearchResultItemEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['SearchResultItem']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  productFilters?: Resolver<
    Array<ResolversTypes['Filter']>,
    ParentType,
    ContextType
  >;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultItemEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SearchResultItemEdge'] = ResolversParentTypes['SearchResultItemEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['SearchResultItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SelectedOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SelectedOption'] = ResolversParentTypes['SelectedOption'],
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlan'] = ResolversParentTypes['SellingPlan'],
> = {
  billingPolicy?: Resolver<
    Maybe<ResolversTypes['SellingPlanBillingPolicy']>,
    ParentType,
    ContextType
  >;
  checkoutCharge?: Resolver<
    ResolversTypes['SellingPlanCheckoutCharge'],
    ParentType,
    ContextType
  >;
  deliveryPolicy?: Resolver<
    Maybe<ResolversTypes['SellingPlanDeliveryPolicy']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<SellingPlanMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<SellingPlanMetafieldsArgs, 'identifiers'>
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<
    Array<ResolversTypes['SellingPlanOption']>,
    ParentType,
    ContextType
  >;
  priceAdjustments?: Resolver<
    Array<ResolversTypes['SellingPlanPriceAdjustment']>,
    ParentType,
    ContextType
  >;
  recurringDeliveries?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanAllocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanAllocation'] = ResolversParentTypes['SellingPlanAllocation'],
> = {
  checkoutChargeAmount?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  priceAdjustments?: Resolver<
    Array<ResolversTypes['SellingPlanAllocationPriceAdjustment']>,
    ParentType,
    ContextType
  >;
  remainingBalanceChargeAmount?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  sellingPlan?: Resolver<
    ResolversTypes['SellingPlan'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanAllocationConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanAllocationConnection'] = ResolversParentTypes['SellingPlanAllocationConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['SellingPlanAllocationEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['SellingPlanAllocation']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanAllocationEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanAllocationEdge'] = ResolversParentTypes['SellingPlanAllocationEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['SellingPlanAllocation'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanAllocationPriceAdjustmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanAllocationPriceAdjustment'] = ResolversParentTypes['SellingPlanAllocationPriceAdjustment'],
> = {
  compareAtPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  perDeliveryPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  price?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  unitPrice?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanBillingPolicyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanBillingPolicy'] = ResolversParentTypes['SellingPlanBillingPolicy'],
> = {
  __resolveType: TypeResolveFn<
    'SellingPlanRecurringBillingPolicy',
    ParentType,
    ContextType
  >;
};

export type SellingPlanCheckoutChargeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanCheckoutCharge'] = ResolversParentTypes['SellingPlanCheckoutCharge'],
> = {
  type?: Resolver<
    ResolversTypes['SellingPlanCheckoutChargeType'],
    ParentType,
    ContextType
  >;
  value?: Resolver<
    ResolversTypes['SellingPlanCheckoutChargeValue'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanCheckoutChargePercentageValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanCheckoutChargePercentageValue'] = ResolversParentTypes['SellingPlanCheckoutChargePercentageValue'],
> = {
  percentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanCheckoutChargeValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanCheckoutChargeValue'] = ResolversParentTypes['SellingPlanCheckoutChargeValue'],
> = {
  __resolveType: TypeResolveFn<
    'MoneyV2' | 'SellingPlanCheckoutChargePercentageValue',
    ParentType,
    ContextType
  >;
};

export type SellingPlanConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanConnection'] = ResolversParentTypes['SellingPlanConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['SellingPlanEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['SellingPlan']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanDeliveryPolicyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanDeliveryPolicy'] = ResolversParentTypes['SellingPlanDeliveryPolicy'],
> = {
  __resolveType: TypeResolveFn<
    'SellingPlanRecurringDeliveryPolicy',
    ParentType,
    ContextType
  >;
};

export type SellingPlanEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanEdge'] = ResolversParentTypes['SellingPlanEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['SellingPlan'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanFixedAmountPriceAdjustmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanFixedAmountPriceAdjustment'] = ResolversParentTypes['SellingPlanFixedAmountPriceAdjustment'],
> = {
  adjustmentAmount?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanFixedPriceAdjustmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanFixedPriceAdjustment'] = ResolversParentTypes['SellingPlanFixedPriceAdjustment'],
> = {
  price?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanGroupResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanGroup'] = ResolversParentTypes['SellingPlanGroup'],
> = {
  appName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<
    Array<ResolversTypes['SellingPlanGroupOption']>,
    ParentType,
    ContextType
  >;
  sellingPlans?: Resolver<
    ResolversTypes['SellingPlanConnection'],
    ParentType,
    ContextType,
    RequireFields<SellingPlanGroupSellingPlansArgs, 'reverse'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanGroupConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanGroupConnection'] = ResolversParentTypes['SellingPlanGroupConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['SellingPlanGroupEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['SellingPlanGroup']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanGroupEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanGroupEdge'] = ResolversParentTypes['SellingPlanGroupEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['SellingPlanGroup'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanGroupOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanGroupOption'] = ResolversParentTypes['SellingPlanGroupOption'],
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanOption'] = ResolversParentTypes['SellingPlanOption'],
> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanPercentagePriceAdjustmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanPercentagePriceAdjustment'] = ResolversParentTypes['SellingPlanPercentagePriceAdjustment'],
> = {
  adjustmentPercentage?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanPriceAdjustmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanPriceAdjustment'] = ResolversParentTypes['SellingPlanPriceAdjustment'],
> = {
  adjustmentValue?: Resolver<
    ResolversTypes['SellingPlanPriceAdjustmentValue'],
    ParentType,
    ContextType
  >;
  orderCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanPriceAdjustmentValueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanPriceAdjustmentValue'] = ResolversParentTypes['SellingPlanPriceAdjustmentValue'],
> = {
  __resolveType: TypeResolveFn<
    | 'SellingPlanFixedAmountPriceAdjustment'
    | 'SellingPlanFixedPriceAdjustment'
    | 'SellingPlanPercentagePriceAdjustment',
    ParentType,
    ContextType
  >;
};

export type SellingPlanRecurringBillingPolicyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanRecurringBillingPolicy'] = ResolversParentTypes['SellingPlanRecurringBillingPolicy'],
> = {
  interval?: Resolver<
    ResolversTypes['SellingPlanInterval'],
    ParentType,
    ContextType
  >;
  intervalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellingPlanRecurringDeliveryPolicyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SellingPlanRecurringDeliveryPolicy'] = ResolversParentTypes['SellingPlanRecurringDeliveryPolicy'],
> = {
  interval?: Resolver<
    ResolversTypes['SellingPlanInterval'],
    ParentType,
    ContextType
  >;
  intervalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Shop'] = ResolversParentTypes['Shop'],
> = {
  brand?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<ShopMetafieldArgs, 'key'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<ShopMetafieldsArgs, 'identifiers'>
  >;
  moneyFormat?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentSettings?: Resolver<
    ResolversTypes['PaymentSettings'],
    ParentType,
    ContextType
  >;
  primaryDomain?: Resolver<ResolversTypes['Domain'], ParentType, ContextType>;
  privacyPolicy?: Resolver<
    Maybe<ResolversTypes['ShopPolicy']>,
    ParentType,
    ContextType
  >;
  refundPolicy?: Resolver<
    Maybe<ResolversTypes['ShopPolicy']>,
    ParentType,
    ContextType
  >;
  shippingPolicy?: Resolver<
    Maybe<ResolversTypes['ShopPolicy']>,
    ParentType,
    ContextType
  >;
  shipsToCountries?: Resolver<
    Array<ResolversTypes['CountryCode']>,
    ParentType,
    ContextType
  >;
  shopPayInstallmentsPricing?: Resolver<
    Maybe<ResolversTypes['ShopPayInstallmentsPricing']>,
    ParentType,
    ContextType
  >;
  subscriptionPolicy?: Resolver<
    Maybe<ResolversTypes['ShopPolicyWithDefault']>,
    ParentType,
    ContextType
  >;
  termsOfService?: Resolver<
    Maybe<ResolversTypes['ShopPolicy']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayInstallmentsFinancingPlanResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayInstallmentsFinancingPlan'] = ResolversParentTypes['ShopPayInstallmentsFinancingPlan'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maxPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  minPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  terms?: Resolver<
    Array<ResolversTypes['ShopPayInstallmentsFinancingPlanTerm']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayInstallmentsFinancingPlanTermResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayInstallmentsFinancingPlanTerm'] = ResolversParentTypes['ShopPayInstallmentsFinancingPlanTerm'],
> = {
  apr?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  frequency?: Resolver<
    ResolversTypes['ShopPayInstallmentsFinancingPlanFrequency'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  installmentsCount?: Resolver<
    Maybe<ResolversTypes['Count']>,
    ParentType,
    ContextType
  >;
  loanType?: Resolver<
    ResolversTypes['ShopPayInstallmentsLoan'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayInstallmentsPricingResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayInstallmentsPricing'] = ResolversParentTypes['ShopPayInstallmentsPricing'],
> = {
  financingPlans?: Resolver<
    Array<ResolversTypes['ShopPayInstallmentsFinancingPlan']>,
    ParentType,
    ContextType
  >;
  maxPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  minPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayInstallmentsProductVariantPricingResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayInstallmentsProductVariantPricing'] = ResolversParentTypes['ShopPayInstallmentsProductVariantPricing'],
> = {
  available?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  eligible?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fullPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  installmentsCount?: Resolver<
    Maybe<ResolversTypes['Count']>,
    ParentType,
    ContextType
  >;
  pricePerTerm?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayPaymentRequest'] = ResolversParentTypes['ShopPayPaymentRequest'],
> = {
  deliveryMethods?: Resolver<
    Array<ResolversTypes['ShopPayPaymentRequestDeliveryMethod']>,
    ParentType,
    ContextType
  >;
  discountCodes?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  discounts?: Resolver<
    Maybe<Array<ResolversTypes['ShopPayPaymentRequestDiscount']>>,
    ParentType,
    ContextType
  >;
  lineItems?: Resolver<
    Array<ResolversTypes['ShopPayPaymentRequestLineItem']>,
    ParentType,
    ContextType
  >;
  locale?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  presentmentCurrency?: Resolver<
    ResolversTypes['CurrencyCode'],
    ParentType,
    ContextType
  >;
  selectedDeliveryMethodType?: Resolver<
    ResolversTypes['ShopPayPaymentRequestDeliveryMethodType'],
    ParentType,
    ContextType
  >;
  shippingAddress?: Resolver<
    Maybe<ResolversTypes['ShopPayPaymentRequestContactField']>,
    ParentType,
    ContextType
  >;
  shippingLines?: Resolver<
    Array<ResolversTypes['ShopPayPaymentRequestShippingLine']>,
    ParentType,
    ContextType
  >;
  subtotal?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalShippingPrice?: Resolver<
    Maybe<ResolversTypes['ShopPayPaymentRequestTotalShippingPrice']>,
    ParentType,
    ContextType
  >;
  totalTax?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestContactFieldResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayPaymentRequestContactField'] = ResolversParentTypes['ShopPayPaymentRequestContactField'],
> = {
  address1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  companyName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  countryCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  provinceCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestDeliveryMethodResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayPaymentRequestDeliveryMethod'] = ResolversParentTypes['ShopPayPaymentRequestDeliveryMethod'],
> = {
  amount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryExpectationLabel?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  detail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maxDeliveryDate?: Resolver<
    Maybe<ResolversTypes['ISO8601DateTime']>,
    ParentType,
    ContextType
  >;
  minDeliveryDate?: Resolver<
    Maybe<ResolversTypes['ISO8601DateTime']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestDiscountResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayPaymentRequestDiscount'] = ResolversParentTypes['ShopPayPaymentRequestDiscount'],
> = {
  amount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayPaymentRequestImage'] = ResolversParentTypes['ShopPayPaymentRequestImage'],
> = {
  alt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestLineItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayPaymentRequestLineItem'] = ResolversParentTypes['ShopPayPaymentRequestLineItem'],
> = {
  finalItemPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  finalLinePrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  image?: Resolver<
    Maybe<ResolversTypes['ShopPayPaymentRequestImage']>,
    ParentType,
    ContextType
  >;
  itemDiscounts?: Resolver<
    Maybe<Array<ResolversTypes['ShopPayPaymentRequestDiscount']>>,
    ParentType,
    ContextType
  >;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lineDiscounts?: Resolver<
    Maybe<Array<ResolversTypes['ShopPayPaymentRequestDiscount']>>,
    ParentType,
    ContextType
  >;
  originalItemPrice?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  originalLinePrice?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  requiresShipping?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestReceiptResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayPaymentRequestReceipt'] = ResolversParentTypes['ShopPayPaymentRequestReceipt'],
> = {
  paymentRequest?: Resolver<
    ResolversTypes['ShopPayPaymentRequest'],
    ParentType,
    ContextType
  >;
  processingStatusType?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestSessionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayPaymentRequestSession'] = ResolversParentTypes['ShopPayPaymentRequestSession'],
> = {
  checkoutUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  paymentRequest?: Resolver<
    ResolversTypes['ShopPayPaymentRequest'],
    ParentType,
    ContextType
  >;
  sourceIdentifier?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestSessionCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayPaymentRequestSessionCreatePayload'] = ResolversParentTypes['ShopPayPaymentRequestSessionCreatePayload'],
> = {
  shopPayPaymentRequestSession?: Resolver<
    Maybe<ResolversTypes['ShopPayPaymentRequestSession']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsShopPayPaymentRequestSessionUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestSessionSubmitPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayPaymentRequestSessionSubmitPayload'] = ResolversParentTypes['ShopPayPaymentRequestSessionSubmitPayload'],
> = {
  paymentRequestReceipt?: Resolver<
    Maybe<ResolversTypes['ShopPayPaymentRequestReceipt']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsShopPayPaymentRequestSessionUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestShippingLineResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayPaymentRequestShippingLine'] = ResolversParentTypes['ShopPayPaymentRequestShippingLine'],
> = {
  amount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayPaymentRequestTotalShippingPriceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayPaymentRequestTotalShippingPrice'] = ResolversParentTypes['ShopPayPaymentRequestTotalShippingPrice'],
> = {
  discounts?: Resolver<
    Array<ResolversTypes['ShopPayPaymentRequestDiscount']>,
    ParentType,
    ContextType
  >;
  finalTotal?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  originalTotal?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPolicyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPolicy'] = ResolversParentTypes['ShopPolicy'],
> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPolicyWithDefaultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPolicyWithDefault'] = ResolversParentTypes['ShopPolicyWithDefault'],
> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SitemapResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Sitemap'] = ResolversParentTypes['Sitemap'],
> = {
  pagesCount?: Resolver<
    Maybe<ResolversTypes['Count']>,
    ParentType,
    ContextType
  >;
  resources?: Resolver<
    Maybe<ResolversTypes['PaginatedSitemapResources']>,
    ParentType,
    ContextType,
    RequireFields<SitemapResourcesArgs, 'page'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SitemapImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SitemapImage'] = ResolversParentTypes['SitemapImage'],
> = {
  alt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  filepath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SitemapResourceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SitemapResource'] = ResolversParentTypes['SitemapResource'],
> = {
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<
    Maybe<ResolversTypes['SitemapImage']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SitemapResourceInterfaceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SitemapResourceInterface'] = ResolversParentTypes['SitemapResourceInterface'],
> = {
  __resolveType: TypeResolveFn<
    'SitemapResource' | 'SitemapResourceMetaobject',
    ParentType,
    ContextType
  >;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type SitemapResourceMetaobjectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SitemapResourceMetaobject'] = ResolversParentTypes['SitemapResourceMetaobject'],
> = {
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  onlineStoreUrlHandle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreAvailabilityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StoreAvailability'] = ResolversParentTypes['StoreAvailability'],
> = {
  available?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  pickUpTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantityAvailable?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreAvailabilityConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StoreAvailabilityConnection'] = ResolversParentTypes['StoreAvailabilityConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['StoreAvailabilityEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['StoreAvailability']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreAvailabilityEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StoreAvailabilityEdge'] = ResolversParentTypes['StoreAvailabilityEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['StoreAvailability'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StringConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StringConnection'] = ResolversParentTypes['StringConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['StringEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StringEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StringEdge'] = ResolversParentTypes['StringEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubmissionErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubmissionError'] = ResolversParentTypes['SubmissionError'],
> = {
  code?: Resolver<
    ResolversTypes['SubmissionErrorCode'],
    ParentType,
    ContextType
  >;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubmitAlreadyAcceptedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubmitAlreadyAccepted'] = ResolversParentTypes['SubmitAlreadyAccepted'],
> = {
  attemptId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubmitFailedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubmitFailed'] = ResolversParentTypes['SubmitFailed'],
> = {
  checkoutUrl?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  errors?: Resolver<
    Array<ResolversTypes['SubmissionError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubmitSuccessResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubmitSuccess'] = ResolversParentTypes['SubmitSuccess'],
> = {
  attemptId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  redirectUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubmitThrottledResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubmitThrottled'] = ResolversParentTypes['SubmitThrottled'],
> = {
  pollAfter?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SwatchResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Swatch'] = ResolversParentTypes['Swatch'],
> = {
  color?: Resolver<Maybe<ResolversTypes['Color']>, ParentType, ContextType>;
  image?: Resolver<
    Maybe<ResolversTypes['MediaImage']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxonomyCategoryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['TaxonomyCategory'] = ResolversParentTypes['TaxonomyCategory'],
> = {
  ancestors?: Resolver<
    Array<ResolversTypes['TaxonomyCategory']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrackableResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Trackable'] = ResolversParentTypes['Trackable'],
> = {
  __resolveType: TypeResolveFn<
    'Article' | 'Collection' | 'Page' | 'Product' | 'SearchQuerySuggestion',
    ParentType,
    ContextType
  >;
  trackingParameters?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
};

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UnitPriceMeasurementResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UnitPriceMeasurement'] = ResolversParentTypes['UnitPriceMeasurement'],
> = {
  measuredType?: Resolver<
    Maybe<ResolversTypes['UnitPriceMeasurementMeasuredType']>,
    ParentType,
    ContextType
  >;
  quantityUnit?: Resolver<
    Maybe<ResolversTypes['UnitPriceMeasurementMeasuredUnit']>,
    ParentType,
    ContextType
  >;
  quantityValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  referenceUnit?: Resolver<
    Maybe<ResolversTypes['UnitPriceMeasurementMeasuredUnit']>,
    ParentType,
    ContextType
  >;
  referenceValue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UnsignedInt64ScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt64'], any> {
  name: 'UnsignedInt64';
}

export type UrlRedirectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UrlRedirect'] = ResolversParentTypes['UrlRedirect'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlRedirectConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UrlRedirectConnection'] = ResolversParentTypes['UrlRedirectConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['UrlRedirectEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['UrlRedirect']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlRedirectEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UrlRedirectEdge'] = ResolversParentTypes['UrlRedirectEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['UrlRedirect'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserError'] = ResolversParentTypes['UserError'],
> = {
  field?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorsShopPayPaymentRequestSessionUserErrorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserErrorsShopPayPaymentRequestSessionUserErrors'] = ResolversParentTypes['UserErrorsShopPayPaymentRequestSessionUserErrors'],
> = {
  code?: Resolver<
    Maybe<
      ResolversTypes['UserErrorsShopPayPaymentRequestSessionUserErrorsCode']
    >,
    ParentType,
    ContextType
  >;
  field?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Video'] = ResolversParentTypes['Video'],
> = {
  alt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mediaContentType?: Resolver<
    ResolversTypes['MediaContentType'],
    ParentType,
    ContextType
  >;
  presentation?: Resolver<
    Maybe<ResolversTypes['MediaPresentation']>,
    ParentType,
    ContextType
  >;
  previewImage?: Resolver<
    Maybe<ResolversTypes['Image']>,
    ParentType,
    ContextType
  >;
  sources?: Resolver<
    Array<ResolversTypes['VideoSource']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoSourceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['VideoSource'] = ResolversParentTypes['VideoSource'],
> = {
  format?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mimeType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ApiVersion?: ApiVersionResolvers<ContextType>;
  AppliedGiftCard?: AppliedGiftCardResolvers<ContextType>;
  Article?: ArticleResolvers<ContextType>;
  ArticleAuthor?: ArticleAuthorResolvers<ContextType>;
  ArticleConnection?: ArticleConnectionResolvers<ContextType>;
  ArticleEdge?: ArticleEdgeResolvers<ContextType>;
  Attribute?: AttributeResolvers<ContextType>;
  AutomaticDiscountApplication?: AutomaticDiscountApplicationResolvers<ContextType>;
  BaseCartLine?: BaseCartLineResolvers<ContextType>;
  BaseCartLineConnection?: BaseCartLineConnectionResolvers<ContextType>;
  BaseCartLineEdge?: BaseCartLineEdgeResolvers<ContextType>;
  Blog?: BlogResolvers<ContextType>;
  BlogConnection?: BlogConnectionResolvers<ContextType>;
  BlogEdge?: BlogEdgeResolvers<ContextType>;
  Brand?: BrandResolvers<ContextType>;
  BrandColorGroup?: BrandColorGroupResolvers<ContextType>;
  BrandColors?: BrandColorsResolvers<ContextType>;
  Cart?: CartResolvers<ContextType>;
  CartAddress?: CartAddressResolvers<ContextType>;
  CartAttributesUpdatePayload?: CartAttributesUpdatePayloadResolvers<ContextType>;
  CartAutomaticDiscountAllocation?: CartAutomaticDiscountAllocationResolvers<ContextType>;
  CartBillingAddressUpdatePayload?: CartBillingAddressUpdatePayloadResolvers<ContextType>;
  CartBuyerIdentity?: CartBuyerIdentityResolvers<ContextType>;
  CartBuyerIdentityUpdatePayload?: CartBuyerIdentityUpdatePayloadResolvers<ContextType>;
  CartCodeDiscountAllocation?: CartCodeDiscountAllocationResolvers<ContextType>;
  CartCompletionAction?: CartCompletionActionResolvers<ContextType>;
  CartCompletionActionRequired?: CartCompletionActionRequiredResolvers<ContextType>;
  CartCompletionAttemptResult?: CartCompletionAttemptResultResolvers<ContextType>;
  CartCompletionFailed?: CartCompletionFailedResolvers<ContextType>;
  CartCompletionProcessing?: CartCompletionProcessingResolvers<ContextType>;
  CartCompletionSuccess?: CartCompletionSuccessResolvers<ContextType>;
  CartCost?: CartCostResolvers<ContextType>;
  CartCreatePayload?: CartCreatePayloadResolvers<ContextType>;
  CartCustomDiscountAllocation?: CartCustomDiscountAllocationResolvers<ContextType>;
  CartDelivery?: CartDeliveryResolvers<ContextType>;
  CartDeliveryAddress?: CartDeliveryAddressResolvers<ContextType>;
  CartDeliveryAddressesAddPayload?: CartDeliveryAddressesAddPayloadResolvers<ContextType>;
  CartDeliveryAddressesRemovePayload?: CartDeliveryAddressesRemovePayloadResolvers<ContextType>;
  CartDeliveryAddressesUpdatePayload?: CartDeliveryAddressesUpdatePayloadResolvers<ContextType>;
  CartDeliveryCoordinatesPreference?: CartDeliveryCoordinatesPreferenceResolvers<ContextType>;
  CartDeliveryGroup?: CartDeliveryGroupResolvers<ContextType>;
  CartDeliveryGroupConnection?: CartDeliveryGroupConnectionResolvers<ContextType>;
  CartDeliveryGroupEdge?: CartDeliveryGroupEdgeResolvers<ContextType>;
  CartDeliveryOption?: CartDeliveryOptionResolvers<ContextType>;
  CartDeliveryPreference?: CartDeliveryPreferenceResolvers<ContextType>;
  CartDiscountAllocation?: CartDiscountAllocationResolvers<ContextType>;
  CartDiscountApplication?: CartDiscountApplicationResolvers<ContextType>;
  CartDiscountCode?: CartDiscountCodeResolvers<ContextType>;
  CartDiscountCodesUpdatePayload?: CartDiscountCodesUpdatePayloadResolvers<ContextType>;
  CartEstimatedCost?: CartEstimatedCostResolvers<ContextType>;
  CartGiftCardCodesRemovePayload?: CartGiftCardCodesRemovePayloadResolvers<ContextType>;
  CartGiftCardCodesUpdatePayload?: CartGiftCardCodesUpdatePayloadResolvers<ContextType>;
  CartLine?: CartLineResolvers<ContextType>;
  CartLineCost?: CartLineCostResolvers<ContextType>;
  CartLineEstimatedCost?: CartLineEstimatedCostResolvers<ContextType>;
  CartLinesAddPayload?: CartLinesAddPayloadResolvers<ContextType>;
  CartLinesRemovePayload?: CartLinesRemovePayloadResolvers<ContextType>;
  CartLinesUpdatePayload?: CartLinesUpdatePayloadResolvers<ContextType>;
  CartMetafieldDeletePayload?: CartMetafieldDeletePayloadResolvers<ContextType>;
  CartMetafieldsSetPayload?: CartMetafieldsSetPayloadResolvers<ContextType>;
  CartNoteUpdatePayload?: CartNoteUpdatePayloadResolvers<ContextType>;
  CartOperationError?: CartOperationErrorResolvers<ContextType>;
  CartPaymentUpdatePayload?: CartPaymentUpdatePayloadResolvers<ContextType>;
  CartPreferences?: CartPreferencesResolvers<ContextType>;
  CartPrepareForCompletionPayload?: CartPrepareForCompletionPayloadResolvers<ContextType>;
  CartPrepareForCompletionResult?: CartPrepareForCompletionResultResolvers<ContextType>;
  CartSelectableAddress?: CartSelectableAddressResolvers<ContextType>;
  CartSelectedDeliveryOptionsUpdatePayload?: CartSelectedDeliveryOptionsUpdatePayloadResolvers<ContextType>;
  CartStatusNotReady?: CartStatusNotReadyResolvers<ContextType>;
  CartStatusReady?: CartStatusReadyResolvers<ContextType>;
  CartSubmitForCompletionPayload?: CartSubmitForCompletionPayloadResolvers<ContextType>;
  CartSubmitForCompletionResult?: CartSubmitForCompletionResultResolvers<ContextType>;
  CartThrottled?: CartThrottledResolvers<ContextType>;
  CartUserError?: CartUserErrorResolvers<ContextType>;
  CartWarning?: CartWarningResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  CollectionConnection?: CollectionConnectionResolvers<ContextType>;
  CollectionEdge?: CollectionEdgeResolvers<ContextType>;
  Color?: GraphQLScalarType;
  Comment?: CommentResolvers<ContextType>;
  CommentAuthor?: CommentAuthorResolvers<ContextType>;
  CommentConnection?: CommentConnectionResolvers<ContextType>;
  CommentEdge?: CommentEdgeResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  CompanyContact?: CompanyContactResolvers<ContextType>;
  CompanyLocation?: CompanyLocationResolvers<ContextType>;
  CompletePaymentChallenge?: CompletePaymentChallengeResolvers<ContextType>;
  CompletionError?: CompletionErrorResolvers<ContextType>;
  ComponentizableCartLine?: ComponentizableCartLineResolvers<ContextType>;
  Count?: CountResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  Currency?: CurrencyResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerAccessToken?: CustomerAccessTokenResolvers<ContextType>;
  CustomerAccessTokenCreatePayload?: CustomerAccessTokenCreatePayloadResolvers<ContextType>;
  CustomerAccessTokenCreateWithMultipassPayload?: CustomerAccessTokenCreateWithMultipassPayloadResolvers<ContextType>;
  CustomerAccessTokenDeletePayload?: CustomerAccessTokenDeletePayloadResolvers<ContextType>;
  CustomerAccessTokenRenewPayload?: CustomerAccessTokenRenewPayloadResolvers<ContextType>;
  CustomerActivateByUrlPayload?: CustomerActivateByUrlPayloadResolvers<ContextType>;
  CustomerActivatePayload?: CustomerActivatePayloadResolvers<ContextType>;
  CustomerAddressCreatePayload?: CustomerAddressCreatePayloadResolvers<ContextType>;
  CustomerAddressDeletePayload?: CustomerAddressDeletePayloadResolvers<ContextType>;
  CustomerAddressUpdatePayload?: CustomerAddressUpdatePayloadResolvers<ContextType>;
  CustomerCreatePayload?: CustomerCreatePayloadResolvers<ContextType>;
  CustomerDefaultAddressUpdatePayload?: CustomerDefaultAddressUpdatePayloadResolvers<ContextType>;
  CustomerRecoverPayload?: CustomerRecoverPayloadResolvers<ContextType>;
  CustomerResetByUrlPayload?: CustomerResetByUrlPayloadResolvers<ContextType>;
  CustomerResetPayload?: CustomerResetPayloadResolvers<ContextType>;
  CustomerUpdatePayload?: CustomerUpdatePayloadResolvers<ContextType>;
  CustomerUserError?: CustomerUserErrorResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Decimal?: GraphQLScalarType;
  DeliveryAddress?: DeliveryAddressResolvers<ContextType>;
  DiscountAllocation?: DiscountAllocationResolvers<ContextType>;
  DiscountApplication?: DiscountApplicationResolvers<ContextType>;
  DiscountApplicationConnection?: DiscountApplicationConnectionResolvers<ContextType>;
  DiscountApplicationEdge?: DiscountApplicationEdgeResolvers<ContextType>;
  DiscountCodeApplication?: DiscountCodeApplicationResolvers<ContextType>;
  DisplayableError?: DisplayableErrorResolvers<ContextType>;
  Domain?: DomainResolvers<ContextType>;
  ExternalVideo?: ExternalVideoResolvers<ContextType>;
  Filter?: FilterResolvers<ContextType>;
  FilterValue?: FilterValueResolvers<ContextType>;
  Fulfillment?: FulfillmentResolvers<ContextType>;
  FulfillmentLineItem?: FulfillmentLineItemResolvers<ContextType>;
  FulfillmentLineItemConnection?: FulfillmentLineItemConnectionResolvers<ContextType>;
  FulfillmentLineItemEdge?: FulfillmentLineItemEdgeResolvers<ContextType>;
  FulfillmentTrackingInfo?: FulfillmentTrackingInfoResolvers<ContextType>;
  GenericFile?: GenericFileResolvers<ContextType>;
  HTML?: GraphQLScalarType;
  HasMetafields?: HasMetafieldsResolvers<ContextType>;
  ISO8601DateTime?: GraphQLScalarType;
  Image?: ImageResolvers<ContextType>;
  ImageConnection?: ImageConnectionResolvers<ContextType>;
  ImageEdge?: ImageEdgeResolvers<ContextType>;
  InContextAnnotation?: InContextAnnotationResolvers<ContextType>;
  InContextAnnotationType?: InContextAnnotationTypeResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Language?: LanguageResolvers<ContextType>;
  Localization?: LocalizationResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  LocationAddress?: LocationAddressResolvers<ContextType>;
  LocationConnection?: LocationConnectionResolvers<ContextType>;
  LocationEdge?: LocationEdgeResolvers<ContextType>;
  MailingAddress?: MailingAddressResolvers<ContextType>;
  MailingAddressConnection?: MailingAddressConnectionResolvers<ContextType>;
  MailingAddressEdge?: MailingAddressEdgeResolvers<ContextType>;
  ManualDiscountApplication?: ManualDiscountApplicationResolvers<ContextType>;
  Market?: MarketResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  MediaConnection?: MediaConnectionResolvers<ContextType>;
  MediaEdge?: MediaEdgeResolvers<ContextType>;
  MediaImage?: MediaImageResolvers<ContextType>;
  MediaPresentation?: MediaPresentationResolvers<ContextType>;
  Menu?: MenuResolvers<ContextType>;
  MenuItem?: MenuItemResolvers<ContextType>;
  MenuItemResource?: MenuItemResourceResolvers<ContextType>;
  Merchandise?: MerchandiseResolvers<ContextType>;
  Metafield?: MetafieldResolvers<ContextType>;
  MetafieldDeleteUserError?: MetafieldDeleteUserErrorResolvers<ContextType>;
  MetafieldParentResource?: MetafieldParentResourceResolvers<ContextType>;
  MetafieldReference?: MetafieldReferenceResolvers<ContextType>;
  MetafieldReferenceConnection?: MetafieldReferenceConnectionResolvers<ContextType>;
  MetafieldReferenceEdge?: MetafieldReferenceEdgeResolvers<ContextType>;
  MetafieldsSetUserError?: MetafieldsSetUserErrorResolvers<ContextType>;
  Metaobject?: MetaobjectResolvers<ContextType>;
  MetaobjectConnection?: MetaobjectConnectionResolvers<ContextType>;
  MetaobjectEdge?: MetaobjectEdgeResolvers<ContextType>;
  MetaobjectField?: MetaobjectFieldResolvers<ContextType>;
  MetaobjectSEO?: MetaobjectSeoResolvers<ContextType>;
  Model3d?: Model3dResolvers<ContextType>;
  Model3dSource?: Model3dSourceResolvers<ContextType>;
  MoneyV2?: MoneyV2Resolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  OnlineStorePublishable?: OnlineStorePublishableResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderConnection?: OrderConnectionResolvers<ContextType>;
  OrderEdge?: OrderEdgeResolvers<ContextType>;
  OrderLineItem?: OrderLineItemResolvers<ContextType>;
  OrderLineItemConnection?: OrderLineItemConnectionResolvers<ContextType>;
  OrderLineItemEdge?: OrderLineItemEdgeResolvers<ContextType>;
  Page?: PageResolvers<ContextType>;
  PageConnection?: PageConnectionResolvers<ContextType>;
  PageEdge?: PageEdgeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PaginatedSitemapResources?: PaginatedSitemapResourcesResolvers<ContextType>;
  PaymentSettings?: PaymentSettingsResolvers<ContextType>;
  PredictiveSearchResult?: PredictiveSearchResultResolvers<ContextType>;
  PricingPercentageValue?: PricingPercentageValueResolvers<ContextType>;
  PricingValue?: PricingValueResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductConnection?: ProductConnectionResolvers<ContextType>;
  ProductEdge?: ProductEdgeResolvers<ContextType>;
  ProductOption?: ProductOptionResolvers<ContextType>;
  ProductOptionValue?: ProductOptionValueResolvers<ContextType>;
  ProductOptionValueSwatch?: ProductOptionValueSwatchResolvers<ContextType>;
  ProductPriceRange?: ProductPriceRangeResolvers<ContextType>;
  ProductVariant?: ProductVariantResolvers<ContextType>;
  ProductVariantComponent?: ProductVariantComponentResolvers<ContextType>;
  ProductVariantComponentConnection?: ProductVariantComponentConnectionResolvers<ContextType>;
  ProductVariantComponentEdge?: ProductVariantComponentEdgeResolvers<ContextType>;
  ProductVariantConnection?: ProductVariantConnectionResolvers<ContextType>;
  ProductVariantEdge?: ProductVariantEdgeResolvers<ContextType>;
  PurchasingCompany?: PurchasingCompanyResolvers<ContextType>;
  QuantityPriceBreak?: QuantityPriceBreakResolvers<ContextType>;
  QuantityPriceBreakConnection?: QuantityPriceBreakConnectionResolvers<ContextType>;
  QuantityPriceBreakEdge?: QuantityPriceBreakEdgeResolvers<ContextType>;
  QuantityRule?: QuantityRuleResolvers<ContextType>;
  QueryRoot?: QueryRootResolvers<ContextType>;
  SEO?: SeoResolvers<ContextType>;
  ScriptDiscountApplication?: ScriptDiscountApplicationResolvers<ContextType>;
  SearchQuerySuggestion?: SearchQuerySuggestionResolvers<ContextType>;
  SearchResultItem?: SearchResultItemResolvers<ContextType>;
  SearchResultItemConnection?: SearchResultItemConnectionResolvers<ContextType>;
  SearchResultItemEdge?: SearchResultItemEdgeResolvers<ContextType>;
  SelectedOption?: SelectedOptionResolvers<ContextType>;
  SellingPlan?: SellingPlanResolvers<ContextType>;
  SellingPlanAllocation?: SellingPlanAllocationResolvers<ContextType>;
  SellingPlanAllocationConnection?: SellingPlanAllocationConnectionResolvers<ContextType>;
  SellingPlanAllocationEdge?: SellingPlanAllocationEdgeResolvers<ContextType>;
  SellingPlanAllocationPriceAdjustment?: SellingPlanAllocationPriceAdjustmentResolvers<ContextType>;
  SellingPlanBillingPolicy?: SellingPlanBillingPolicyResolvers<ContextType>;
  SellingPlanCheckoutCharge?: SellingPlanCheckoutChargeResolvers<ContextType>;
  SellingPlanCheckoutChargePercentageValue?: SellingPlanCheckoutChargePercentageValueResolvers<ContextType>;
  SellingPlanCheckoutChargeValue?: SellingPlanCheckoutChargeValueResolvers<ContextType>;
  SellingPlanConnection?: SellingPlanConnectionResolvers<ContextType>;
  SellingPlanDeliveryPolicy?: SellingPlanDeliveryPolicyResolvers<ContextType>;
  SellingPlanEdge?: SellingPlanEdgeResolvers<ContextType>;
  SellingPlanFixedAmountPriceAdjustment?: SellingPlanFixedAmountPriceAdjustmentResolvers<ContextType>;
  SellingPlanFixedPriceAdjustment?: SellingPlanFixedPriceAdjustmentResolvers<ContextType>;
  SellingPlanGroup?: SellingPlanGroupResolvers<ContextType>;
  SellingPlanGroupConnection?: SellingPlanGroupConnectionResolvers<ContextType>;
  SellingPlanGroupEdge?: SellingPlanGroupEdgeResolvers<ContextType>;
  SellingPlanGroupOption?: SellingPlanGroupOptionResolvers<ContextType>;
  SellingPlanOption?: SellingPlanOptionResolvers<ContextType>;
  SellingPlanPercentagePriceAdjustment?: SellingPlanPercentagePriceAdjustmentResolvers<ContextType>;
  SellingPlanPriceAdjustment?: SellingPlanPriceAdjustmentResolvers<ContextType>;
  SellingPlanPriceAdjustmentValue?: SellingPlanPriceAdjustmentValueResolvers<ContextType>;
  SellingPlanRecurringBillingPolicy?: SellingPlanRecurringBillingPolicyResolvers<ContextType>;
  SellingPlanRecurringDeliveryPolicy?: SellingPlanRecurringDeliveryPolicyResolvers<ContextType>;
  Shop?: ShopResolvers<ContextType>;
  ShopPayInstallmentsFinancingPlan?: ShopPayInstallmentsFinancingPlanResolvers<ContextType>;
  ShopPayInstallmentsFinancingPlanTerm?: ShopPayInstallmentsFinancingPlanTermResolvers<ContextType>;
  ShopPayInstallmentsPricing?: ShopPayInstallmentsPricingResolvers<ContextType>;
  ShopPayInstallmentsProductVariantPricing?: ShopPayInstallmentsProductVariantPricingResolvers<ContextType>;
  ShopPayPaymentRequest?: ShopPayPaymentRequestResolvers<ContextType>;
  ShopPayPaymentRequestContactField?: ShopPayPaymentRequestContactFieldResolvers<ContextType>;
  ShopPayPaymentRequestDeliveryMethod?: ShopPayPaymentRequestDeliveryMethodResolvers<ContextType>;
  ShopPayPaymentRequestDiscount?: ShopPayPaymentRequestDiscountResolvers<ContextType>;
  ShopPayPaymentRequestImage?: ShopPayPaymentRequestImageResolvers<ContextType>;
  ShopPayPaymentRequestLineItem?: ShopPayPaymentRequestLineItemResolvers<ContextType>;
  ShopPayPaymentRequestReceipt?: ShopPayPaymentRequestReceiptResolvers<ContextType>;
  ShopPayPaymentRequestSession?: ShopPayPaymentRequestSessionResolvers<ContextType>;
  ShopPayPaymentRequestSessionCreatePayload?: ShopPayPaymentRequestSessionCreatePayloadResolvers<ContextType>;
  ShopPayPaymentRequestSessionSubmitPayload?: ShopPayPaymentRequestSessionSubmitPayloadResolvers<ContextType>;
  ShopPayPaymentRequestShippingLine?: ShopPayPaymentRequestShippingLineResolvers<ContextType>;
  ShopPayPaymentRequestTotalShippingPrice?: ShopPayPaymentRequestTotalShippingPriceResolvers<ContextType>;
  ShopPolicy?: ShopPolicyResolvers<ContextType>;
  ShopPolicyWithDefault?: ShopPolicyWithDefaultResolvers<ContextType>;
  Sitemap?: SitemapResolvers<ContextType>;
  SitemapImage?: SitemapImageResolvers<ContextType>;
  SitemapResource?: SitemapResourceResolvers<ContextType>;
  SitemapResourceInterface?: SitemapResourceInterfaceResolvers<ContextType>;
  SitemapResourceMetaobject?: SitemapResourceMetaobjectResolvers<ContextType>;
  StoreAvailability?: StoreAvailabilityResolvers<ContextType>;
  StoreAvailabilityConnection?: StoreAvailabilityConnectionResolvers<ContextType>;
  StoreAvailabilityEdge?: StoreAvailabilityEdgeResolvers<ContextType>;
  StringConnection?: StringConnectionResolvers<ContextType>;
  StringEdge?: StringEdgeResolvers<ContextType>;
  SubmissionError?: SubmissionErrorResolvers<ContextType>;
  SubmitAlreadyAccepted?: SubmitAlreadyAcceptedResolvers<ContextType>;
  SubmitFailed?: SubmitFailedResolvers<ContextType>;
  SubmitSuccess?: SubmitSuccessResolvers<ContextType>;
  SubmitThrottled?: SubmitThrottledResolvers<ContextType>;
  Swatch?: SwatchResolvers<ContextType>;
  TaxonomyCategory?: TaxonomyCategoryResolvers<ContextType>;
  Trackable?: TrackableResolvers<ContextType>;
  URL?: GraphQLScalarType;
  UnitPriceMeasurement?: UnitPriceMeasurementResolvers<ContextType>;
  UnsignedInt64?: GraphQLScalarType;
  UrlRedirect?: UrlRedirectResolvers<ContextType>;
  UrlRedirectConnection?: UrlRedirectConnectionResolvers<ContextType>;
  UrlRedirectEdge?: UrlRedirectEdgeResolvers<ContextType>;
  UserError?: UserErrorResolvers<ContextType>;
  UserErrorsShopPayPaymentRequestSessionUserErrors?: UserErrorsShopPayPaymentRequestSessionUserErrorsResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
  VideoSource?: VideoSourceResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  accessRestricted?: AccessRestrictedDirectiveResolver<any, any, ContextType>;
  defer?: DeferDirectiveResolver<any, any, ContextType>;
  inContext?: InContextDirectiveResolver<any, any, ContextType>;
};
