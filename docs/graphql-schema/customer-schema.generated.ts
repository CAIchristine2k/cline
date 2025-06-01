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
  DateTime: {input: string; output: string};
  Decimal: {input: string; output: string};
  HTML: {input: string; output: string};
  ISO8601DateTime: {input: any; output: any};
  JSON: {input: any; output: any};
  URL: {input: string; output: string};
  UnsignedInt64: {input: any; output: any};
};

/** A sale that includes an additional fee charge. */
export type AdditionalFeeSale = Node &
  Sale & {
    __typename?: 'AdditionalFeeSale';
    /** The type of order action represented by the sale. */
    actionType: SaleActionType;
    /** The unique ID of the sale. */
    id: Scalars['ID']['output'];
    /** The type of line associated with the sale. */
    lineType: SaleLineType;
    /** The number of units ordered or intended to be returned. */
    quantity?: Maybe<Scalars['Int']['output']>;
    /** The individual taxes associated with the sale. */
    taxes: Array<SaleTax>;
    /** The total sale amount after taxes and discounts. */
    totalAmount: MoneyV2;
    /** The total amount of discounts allocated to the sale after taxes. */
    totalDiscountAmountAfterTaxes: MoneyV2;
    /** The total discounts allocated to the sale before taxes. */
    totalDiscountAmountBeforeTaxes: MoneyV2;
    /** The total tax amount for the sale. */
    totalTaxAmount: MoneyV2;
  };

/** The address form field. */
export type AddressFormField = {
  __typename?: 'AddressFormField';
  /** The mode of the address field. */
  mode: AddressFormFieldMode;
};

/** Defines the mode for an address form field. */
export type AddressFormFieldMode =
  /**
   * Indicates that the form field should be hidden from the UI.
   * Any values provided by the client will be ignored by the backend.
   */
  | 'IGNORED'
  /** Indicates that the form field is visible in the UI and can be left empty. */
  | 'OPTIONAL'
  /** Indicates that the form field is visible in the UI and requires a non-empty value. */
  | 'REQUIRED';

/** The settings for the address form. */
export type AddressFormSettings = {
  __typename?: 'AddressFormSettings';
  /** The setting for the Address2 form field. */
  address2: AddressFormField;
  /** Whether the address autocompletion is enabled. */
  addressAutocompletion: Scalars['Boolean']['output'];
  /** The setting for the Company form field. */
  company: AddressFormField;
  /** The setting for the First name form field. */
  firstName: AddressFormField;
  /** The setting for the Phone form field. */
  phone: AddressFormField;
};

/** A sale event that results in an adjustment to the order price. */
export type AdjustmentSale = Node &
  Sale & {
    __typename?: 'AdjustmentSale';
    /** The type of order action represented by the sale. */
    actionType: SaleActionType;
    /** The unique ID of the sale. */
    id: Scalars['ID']['output'];
    /** The type of line associated with the sale. */
    lineType: SaleLineType;
    /** The number of units ordered or intended to be returned. */
    quantity?: Maybe<Scalars['Int']['output']>;
    /** The individual taxes associated with the sale. */
    taxes: Array<SaleTax>;
    /** The total sale amount after taxes and discounts. */
    totalAmount: MoneyV2;
    /** The total amount of discounts allocated to the sale after taxes. */
    totalDiscountAmountAfterTaxes: MoneyV2;
    /** The total discounts allocated to the sale before taxes. */
    totalDiscountAmountBeforeTaxes: MoneyV2;
    /** The total tax amount for the sale. */
    totalTaxAmount: MoneyV2;
  };

/** The input fields for the billing address received from Apple Pay. */
export type ApplePayBillingAddressInput = {
  /** The first line of the address, typically the street address or PO Box number. */
  address1?: InputMaybe<Scalars['String']['input']>;
  /** The second line of the address, typically the apartment, suite, or unit number. */
  address2?: InputMaybe<Scalars['String']['input']>;
  /** The region of the address, such as the province, state, or district. */
  administrativeArea?: InputMaybe<Scalars['String']['input']>;
  /** The name of the country. */
  country?: InputMaybe<Scalars['String']['input']>;
  /** The two-letter code for the country of the address. */
  countryCode?: InputMaybe<CountryCode>;
  /** The family name of the customer. */
  familyName?: InputMaybe<Scalars['String']['input']>;
  /** The given name of the customer. */
  givenName?: InputMaybe<Scalars['String']['input']>;
  /** The name of the city, district, village, or town. */
  locality?: InputMaybe<Scalars['String']['input']>;
  /** The telephone number of the customer. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  /** The zip or postal code of the address. */
  postalCode?: InputMaybe<Scalars['String']['input']>;
};

/** Return type for `applePayCreditCardAdd` mutation. */
export type ApplePayCreditCardAddPayload = {
  __typename?: 'ApplePayCreditCardAddPayload';
  /** The newly added credit card. */
  creditCard?: Maybe<CustomerCreditCard>;
  /** If the card verification result is processing. When this is true, credit_card will be null. */
  processing?: Maybe<Scalars['Boolean']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsPaymentInstrumentUserErrors>;
};

/** Return type for `applePayCreditCardUpdate` mutation. */
export type ApplePayCreditCardUpdatePayload = {
  __typename?: 'ApplePayCreditCardUpdatePayload';
  /** The updated credit card. */
  creditCard?: Maybe<CustomerCreditCard>;
  /** If the card verification result is processing. When this is true, credit_card will be null. */
  processing?: Maybe<Scalars['Boolean']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsPaymentInstrumentUserErrors>;
};

/** Return type for `applePaySessionCreate` mutation. */
export type ApplePaySessionCreatePayload = {
  __typename?: 'ApplePaySessionCreatePayload';
  /** The object that contains the session data. */
  body?: Maybe<Scalars['String']['output']>;
  /** The ID for the created session. */
  id?: Maybe<Scalars['String']['output']>;
  /** Whether the session is ready. The `body` field is `null` while this value is `false`. */
  ready?: Maybe<Scalars['Boolean']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ApplePaySessionUserError>;
};

/** The error codes for failures to create Apple Pay sessions. */
export type ApplePaySessionUserError = DisplayableError & {
  __typename?: 'ApplePaySessionUserError';
  /** The error code. */
  code?: Maybe<ApplePaySessionUserErrorCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Possible error codes that can be returned by `ApplePaySessionUserError`. */
export type ApplePaySessionUserErrorCode =
  /** Apple Pay session could not be created. */
  | 'SESSION_COULD_NOT_BE_CREATED'
  /** Validation URL is not an Apple Pay gateway endpoint. */
  | 'VALIDATION_URL_IS_INVALID';

/** The configuration settings for the Apple Pay wallet. */
export type ApplePayWalletConfig = {
  __typename?: 'ApplePayWalletConfig';
  /** Supported card networks for Apple Pay. */
  supportedNetworks: Array<Scalars['String']['output']>;
};

/** The details about the gift card used on the checkout. */
export type AppliedGiftCard = Node & {
  __typename?: 'AppliedGiftCard';
  /** The amount deducted from the gift card. */
  amountUsed: MoneyV2;
  /** The remaining amount on the gift card. */
  balance: MoneyV2;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The last characters of the gift card. */
  lastCharacters: Scalars['String']['output'];
  /** The amount applied to the checkout in its currency. */
  presentmentAmountUsed: MoneyV2;
};

/** Represents a generic custom attribute, such as whether an order is a customer's first. */
export type Attribute = {
  __typename?: 'Attribute';
  /** The key or name of the attribute. For example, `"customersFirstOrder"`. */
  key: Scalars['String']['output'];
  /** The value of the attribute. For example, `"true"`. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Captures the intentions of a discount that was automatically applied. */
export type AutomaticDiscountApplication = DiscountApplication & {
  __typename?: 'AutomaticDiscountApplication';
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** The lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the application. */
  title: Scalars['String']['output'];
  /** The value of the discount application. */
  value: PricingValue;
};

/** A collection of available shipping rates for a checkout. */
export type AvailableShippingRates = {
  __typename?: 'AvailableShippingRates';
  /**
   * Whether the shipping rates are ready.
   * The `shippingRates` field is `null` when this value is `false`.
   * This field should be polled until its value becomes `true`.
   */
  ready: Scalars['Boolean']['output'];
  /** The fetched shipping rates. `null` until the `ready` field is `true`. */
  shippingRates?: Maybe<Array<ShippingRate>>;
};

/** The input fields required for updating a business contact. */
export type BusinessContactUpdateInput = {
  /** The first name of the business contact. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The last name of the business contact. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** The locale of the business contact. */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** The title of the business contact. */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Return type for `businessContactUpdate` mutation. */
export type BusinessContactUpdatePayload = {
  __typename?: 'BusinessContactUpdatePayload';
  /** The updated business contact information. */
  businessContact?: Maybe<CompanyContact>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsBusinessContactUserErrors>;
};

/** Possible error codes that can be returned by `BusinessCustomerUserError`. */
export type BusinessCustomerErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** Business location doesn't exist. */
  | 'BUSINESS_LOCATION_NOT_FOUND'
  /** Deleting the resource failed. */
  | 'FAILED_TO_DELETE'
  /** An internal error occurred. */
  | 'INTERNAL_ERROR'
  /** The input value is invalid. */
  | 'INVALID'
  /** The input is invalid. */
  | 'INVALID_INPUT'
  /** The number of resources exceeded the limit. */
  | 'LIMIT_REACHED'
  /** The input is empty. */
  | 'NO_INPUT'
  /** Permission denied. */
  | 'PERMISSION_DENIED'
  /** Missing a required field. */
  | 'REQUIRED'
  /** The resource wasn't found. */
  | 'RESOURCE_NOT_FOUND'
  /** The input value is already taken. */
  | 'TAKEN'
  /** The field value is too long. */
  | 'TOO_LONG'
  /** Unexpected type. */
  | 'UNEXPECTED_TYPE';

/** An error that happens during the execution of a business customer mutation. */
export type BusinessCustomerUserError = DisplayableError & {
  __typename?: 'BusinessCustomerUserError';
  /** The error code. */
  code?: Maybe<BusinessCustomerErrorCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Return type for `businessLocationCreditCardAdd` mutation. */
export type BusinessLocationCreditCardAddPayload = {
  __typename?: 'BusinessLocationCreditCardAddPayload';
  /** The newly added credit card. */
  creditCard?: Maybe<CustomerCreditCard>;
  /** The URL to redirect the customer to for completing the 3D Secure payment flow. */
  nextActionUrl?: Maybe<Scalars['URL']['output']>;
  /** If the card verification result is processing. When this is true, credit_card will be null. */
  processing?: Maybe<Scalars['Boolean']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsBusinessLocationPaymentInstrumentUserErrors>;
};

/** Return type for `businessLocationCreditCardUpdate` mutation. */
export type BusinessLocationCreditCardUpdatePayload = {
  __typename?: 'BusinessLocationCreditCardUpdatePayload';
  /** The updated credit card. */
  creditCard?: Maybe<CustomerCreditCard>;
  /** If the card verification result is processing. When this is true, credit_card will be null. */
  processing?: Maybe<Scalars['Boolean']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsBusinessLocationPaymentInstrumentUserErrors>;
};

/** Return type for `businessLocationPaymentInstrumentRemove` mutation. */
export type BusinessLocationPaymentInstrumentRemovePayload = {
  __typename?: 'BusinessLocationPaymentInstrumentRemovePayload';
  /** The ID of the removed payment instrument. */
  deletedPaymentInstrumentId?: Maybe<Scalars['ID']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsBusinessLocationPaymentInstrumentUserErrors>;
};

/** The configuration for the buyer's checkout. */
export type BuyerExperienceConfiguration = {
  __typename?: 'BuyerExperienceConfiguration';
  /** The deposit amount required for the order. */
  deposit?: Maybe<DepositConfiguration>;
  /**
   * Whether the buyer must pay at checkout or
   * can choose to pay at checkout or pay later using net terms.
   */
  payNowOnly: Scalars['Boolean']['output'];
  /** The merchant configured payment terms. */
  paymentTermsTemplate?: Maybe<PaymentTermsTemplate>;
};

/** The card payment details related to a transaction. */
export type CardPaymentDetails = {
  __typename?: 'CardPaymentDetails';
  /** The brand of the credit card used. */
  cardBrand: Scalars['String']['output'];
  /** The last four digits of the credit card used. */
  last4?: Maybe<Scalars['String']['output']>;
};

/** A container for information required to checkout items and pay. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type Checkout = Node & {
  __typename?: 'Checkout';
  /** The gift cards used on the checkout. */
  appliedGiftCards: Array<AppliedGiftCard>;
  /**
   * The available shipping rates for this Checkout.
   * Should only be used when checkout `requiresShipping` is `true` and
   * the shipping address is valid.
   */
  availableShippingRates?: Maybe<AvailableShippingRates>;
  /** The date and time when the checkout was created. */
  createdAt: Scalars['DateTime']['output'];
  /** The currency code for the checkout. */
  currencyCode: CurrencyCode;
  /** The extra information added to the checkout. */
  customAttributes: Array<Attribute>;
  /** The discounts applied on the checkout. */
  discountApplications: DiscountApplicationConnection;
  /** The email associated with this checkout. */
  email?: Maybe<Scalars['String']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** A list of line item objects, each containing information about an item in the checkout. */
  lineItems: CheckoutLineItemConnection;
  /**
   * The sum of all the prices of all the items in the checkout,
   * excluding duties, taxes, shipping, and discounts.
   */
  lineItemsSubtotalPrice: MoneyV2;
  /** The note associated with the checkout. */
  note?: Maybe<Scalars['String']['output']>;
  /** The amount left to be paid. This is equal to the cost of the line items, duties, taxes, and shipping, minus discounts and gift cards. */
  paymentDue: MoneyV2;
  /**
   * Whether the Checkout is ready and can be completed. Checkouts may
   * have asynchronous operations that can take time to finish. If you want
   * to complete a checkout or ensure all the fields are populated and up to
   * date, polling is required until the value is true.
   */
  ready: Scalars['Boolean']['output'];
  /** Whether the fulfillment requires shipping. */
  requiresShipping: Scalars['Boolean']['output'];
  /** The address where the line items will be shipped. */
  shippingAddress?: Maybe<CustomerMailingAddress>;
  /** The discounts allocated to the shipping line by discount applications. */
  shippingDiscountAllocations: Array<DiscountAllocation>;
  /** The selected shipping rate, transitioned to a `shipping_line` object. */
  shippingLine?: Maybe<ShippingRate>;
  /**
   * The configuration values used to initialize a Shop Pay checkout.
   * @deprecated This field is deprecated and will be removed in the future.
   */
  shopPayConfiguration?: Maybe<ShopPayConfiguration>;
  /** The price at checkout before duties, shipping, and taxes. */
  subtotalPrice: MoneyV2;
  /** Whether the checkout is tax exempt. */
  taxExempt: Scalars['Boolean']['output'];
  /** Whether taxes are included in the line item and shipping line prices. */
  taxesIncluded: Scalars['Boolean']['output'];
  /** The sum of all the duties applied to the line items in the checkout. */
  totalDuties?: Maybe<MoneyV2>;
  /**
   * The sum of all the prices of all the items in the checkout,
   * duties, taxes, and discounts included.
   */
  totalPrice: MoneyV2;
  /** The sum of all the taxes applied to the line items and shipping lines in the checkout. */
  totalTax: MoneyV2;
  /** The URL for the checkout, accessible from the web. */
  webUrl: Scalars['URL']['output'];
};

/** A container for information required to checkout items and pay. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CheckoutDiscountApplicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A container for information required to checkout items and pay. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CheckoutLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A line item in the checkout, grouped by variant and attributes. */
export type CheckoutLineItem = Node & {
  __typename?: 'CheckoutLineItem';
  /** An array of Key-Value pairs providing extra information about the line item. */
  customAttributes: Array<Attribute>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The price of the line item. */
  price?: Maybe<MoneyV2>;
  /** The quantity of the line item. */
  quantity: Scalars['Int']['output'];
  /** The title of the line item. Defaults to the product's title. */
  title: Scalars['String']['output'];
  /** The unit price of the line item. */
  unitPrice?: Maybe<MoneyV2>;
  /** The name of the variant. */
  variantTitle?: Maybe<Scalars['String']['output']>;
};

/** An auto-generated type for paginating through multiple CheckoutLineItems. */
export type CheckoutLineItemConnection = {
  __typename?: 'CheckoutLineItemConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<CheckoutLineItemEdge>;
  /** A list of nodes that are contained in CheckoutLineItemEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<CheckoutLineItem>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one CheckoutLineItem and a cursor during pagination. */
export type CheckoutLineItemEdge = {
  __typename?: 'CheckoutLineItemEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of CheckoutLineItemEdge. */
  node: CheckoutLineItem;
};

/** Represents a company's information. */
export type Company = HasMetafields &
  Node & {
    __typename?: 'Company';
    /** The list of company draft orders. */
    draftOrders: DraftOrderConnection;
    /** A unique externally-supplied ID for the company. */
    externalId?: Maybe<Scalars['String']['output']>;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The list of locations that the business of the business contact belongs to. */
    locations: CompanyLocationConnection;
    /** A metafield found by namespace and key. */
    metafield?: Maybe<Metafield>;
    /**
     * The metafields associated with the resource matching the
     * supplied list of namespaces and keys.
     */
    metafields: Array<Maybe<Metafield>>;
    /** The name of the company. */
    name: Scalars['String']['output'];
    /** The list of customer orders under the company. */
    orders: OrderConnection;
    /** The profile of the customer. */
    profile?: Maybe<CompanyContact>;
  };

/** Represents a company's information. */
export type CompanyDraftOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<DraftOrderByCompanySortKeys>;
};

/** Represents a company's information. */
export type CompanyLocationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<CompanyLocationSortKeys>;
};

/** Represents a company's information. */
export type CompanyMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

/** Represents a company's information. */
export type CompanyMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** Represents a company's information. */
export type CompanyOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<OrderByCompanySortKeys>;
};

/** The address of a company location, either billing or shipping. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CompanyAddress = Node & {
  __typename?: 'CompanyAddress';
  /** The first line of the address. It is typically the street address or PO Box number. */
  address1: Scalars['String']['output'];
  /** The second line of the address. It is typically the apartment, suite, or unit number. */
  address2?: Maybe<Scalars['String']['output']>;
  /** The city, district, village, or town. */
  city?: Maybe<Scalars['String']['output']>;
  /** The name of the company. */
  company: Scalars['String']['output'];
  /** The name of the company. */
  companyName: Scalars['String']['output'];
  /** The name of the country of the address. */
  country?: Maybe<Scalars['String']['output']>;
  /** The two-letter code for the country of the address, for example, US. */
  countryCode: CountryCode;
  /** The two-letter code for the country of the address, for example, US. */
  countryCodeV2: CountryCode;
  /**
   * The date and time (in [ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * when the company address was created.
   */
  createdAt: Scalars['DateTime']['output'];
  /** The first name of the recipient. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** The formatted version of the address. */
  formatted: Array<Scalars['String']['output']>;
  /** The formatted version of the address. */
  formattedAddress: Array<Scalars['String']['output']>;
  /** A comma-separated list of the city, province, and country values. */
  formattedArea?: Maybe<Scalars['String']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The last name of the recipient. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** The latitude coordinate of the address. */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** The longitude coordinate of the address. */
  longitude?: Maybe<Scalars['Float']['output']>;
  /** The unique phone number of the customer, formatted using the E.164 standard, for example, _+16135551111_. */
  phone?: Maybe<Scalars['String']['output']>;
  /** The region of the address, such as the province, state, or district. */
  province?: Maybe<Scalars['String']['output']>;
  /** The alphanumeric code for the region, for example, ON. */
  provinceCode?: Maybe<Scalars['String']['output']>;
  /** The identity of the recipient, for example, 'Receiving Department'. */
  recipient?: Maybe<Scalars['String']['output']>;
  /**
   * The date and time (in [ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * when the company address was last updated.
   */
  updatedAt: Scalars['DateTime']['output'];
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars['String']['output']>;
  /** The alphanumeric code for the region, for example, ON. */
  zoneCode?: Maybe<Scalars['String']['output']>;
};

/** The address of a company location, either billing or shipping. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CompanyAddressFormattedArgs = {
  withCompanyName?: InputMaybe<Scalars['Boolean']['input']>;
  withName?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The address of a company location, either billing or shipping. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CompanyAddressFormattedAddressArgs = {
  withCompanyName?: InputMaybe<Scalars['Boolean']['input']>;
  withName?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The input fields for creating or updating a company location address. */
export type CompanyAddressInput = {
  /** The first line of the address, typically the street address or PO Box number. */
  address1?: InputMaybe<Scalars['String']['input']>;
  /** The second line of the address, typically the number of the apartment, suite, or unit. */
  address2?: InputMaybe<Scalars['String']['input']>;
  /** The name of the city, district, village, or town. */
  city?: InputMaybe<Scalars['String']['input']>;
  /** The two-letter code for the country of the address. */
  countryCode?: InputMaybe<CountryCode>;
  /** The first name in the address. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The last name in the address. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** A unique phone number for the business location, formatted using the E.164 standard, for example, _+16135551111_. */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** The identity of the recipient, for example, 'Receiving Department'. */
  recipient?: InputMaybe<Scalars['String']['input']>;
  /** The zip or postal code of the address. */
  zip?: InputMaybe<Scalars['String']['input']>;
  /** The code for the region of the address, such as the province, state, or district, for example, QC for Quebec, Canada. */
  zoneCode?: InputMaybe<Scalars['String']['input']>;
};

/** The valid values for the address type of a company. */
export type CompanyAddressType =
  /** The address is a billing address. */
  | 'BILLING'
  /** The address is a shipping address. */
  | 'SHIPPING';

/** Represents the customer's contact information. */
export type CompanyContact = Node & {
  __typename?: 'CompanyContact';
  /** The information of the copmany contact's company. */
  company?: Maybe<Company>;
  /** The customer associated to this contact. */
  customer: Customer;
  /** The list of company contact's draft orders. */
  draftOrders: DraftOrderConnection;
  /** Whether the company contact has permissions on locations in the scope. */
  hasPermissionOnLocations: Scalars['Boolean']['output'];
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The list of locations that the company contact belongs to. */
  locations: CompanyLocationConnection;
  /** The list of company contact's orders. */
  orders: OrderConnection;
  /** The current status of the company contact. */
  status: CompanyContactStatusType;
  /** The list of tax exemptions applied to the company contact with additional details. */
  taxExemptionsDetails: Array<TaxExemptionDetails>;
  /** The job title of the company contact. */
  title?: Maybe<Scalars['String']['output']>;
};

/** Represents the customer's contact information. */
export type CompanyContactDraftOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<DraftOrderSortKeys>;
};

/** Represents the customer's contact information. */
export type CompanyContactHasPermissionOnLocationsArgs = {
  permissions: Array<PermittedOperation>;
  resource: ResourceType;
  scope: ContactPermissionLocationScopeType;
};

/** Represents the customer's contact information. */
export type CompanyContactLocationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<CompanyLocationSortKeys>;
};

/** Represents the customer's contact information. */
export type CompanyContactOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<OrderByContactSortKeys>;
};

/** An auto-generated type for paginating through multiple CompanyContacts. */
export type CompanyContactConnection = {
  __typename?: 'CompanyContactConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<CompanyContactEdge>;
  /** A list of nodes that are contained in CompanyContactEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<CompanyContact>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one CompanyContact and a cursor during pagination. */
export type CompanyContactEdge = {
  __typename?: 'CompanyContactEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of CompanyContactEdge. */
  node: CompanyContact;
};

/** A role for a company contact. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CompanyContactRole = Node & {
  __typename?: 'CompanyContactRole';
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The name of the role. */
  name: Scalars['String']['output'];
  /** The permissions on a specified resource. */
  resourcePermission: Array<PermittedOperation>;
  /** A list of permissions on all resources. */
  resourcePermissions: Array<ResourcePermission>;
};

/** A role for a company contact. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CompanyContactRoleResourcePermissionArgs = {
  resource: ResourceType;
};

/** Represents information about a company contact role assignment. */
export type CompanyContactRoleAssignment = Node & {
  __typename?: 'CompanyContactRoleAssignment';
  /** The company contact for whom this role is assigned. */
  contact: CompanyContact;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The role that's assigned. */
  role: CompanyContactRole;
};

/** An auto-generated type for paginating through multiple CompanyContactRoleAssignments. */
export type CompanyContactRoleAssignmentConnection = {
  __typename?: 'CompanyContactRoleAssignmentConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<CompanyContactRoleAssignmentEdge>;
  /** A list of nodes that are contained in CompanyContactRoleAssignmentEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<CompanyContactRoleAssignment>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one CompanyContactRoleAssignment and a cursor during pagination. */
export type CompanyContactRoleAssignmentEdge = {
  __typename?: 'CompanyContactRoleAssignmentEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of CompanyContactRoleAssignmentEdge. */
  node: CompanyContactRoleAssignment;
};

/** The set of valid sort keys for the CompanyContactRoleAssignment query. */
export type CompanyContactRoleAssignmentSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `location_name` value. */
  | 'LOCATION_NAME'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The set of valid sort keys for the CompanyContact query. */
export type CompanyContactSortKeys =
  /** Sort by the `company_id` value. */
  | 'COMPANY_ID'
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `email` value. */
  | 'EMAIL'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `name` value. */
  | 'NAME'
  /** Sort by the `name_email` value. */
  | 'NAME_EMAIL'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** A flag to describe the current status of a company contact. */
export type CompanyContactStatusType =
  /** The contact is disabled and removed from the company. */
  | 'DISABLED'
  /** The contact is enabled and active. */
  | 'ENABLED';

/** Represents a company's business location. */
export type CompanyLocation = HasMetafields &
  Node & {
    __typename?: 'CompanyLocation';
    /** The billing address of the company location. */
    billingAddress?: Maybe<CompanyAddress>;
    /** The configuration of the buyer's B2B checkout. */
    buyerExperienceConfiguration?: Maybe<BuyerExperienceConfiguration>;
    /** The list of contacts under a particular business location. */
    contacts: CompanyContactConnection;
    /** The credit card corresponding to the provided ID. */
    creditCard?: Maybe<CustomerCreditCard>;
    /** The list of stored credit cards. */
    creditCards: CustomerCreditCardConnection;
    /** The list of company draft orders. */
    draftOrders: DraftOrderConnection;
    /** A unique externally-supplied ID for the location. */
    externalId?: Maybe<Scalars['String']['output']>;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The market that includes the location's shipping address. If the shipping address is empty, the shop's primary market is returned. */
    market: Market;
    /** A metafield found by namespace and key. */
    metafield?: Maybe<Metafield>;
    /**
     * The metafields associated with the resource matching the
     * supplied list of namespaces and keys.
     */
    metafields: Array<Maybe<Metafield>>;
    /** The name of the company location. */
    name: Scalars['String']['output'];
    /** The list of customer orders under the company. */
    orders: OrderConnection;
    /** The list of roles assigned to this location. */
    roleAssignments: CompanyContactRoleAssignmentConnection;
    /** The shipping address of the company location. */
    shippingAddress?: Maybe<CompanyAddress>;
    /** The list of tax exemptions applied to the location. */
    taxExemptions: Array<TaxExemption>;
    /** The list of tax exemptions applied to the location with additional details. */
    taxExemptionsDetails: Array<TaxExemptionDetails>;
    /** The tax id of the company location. */
    taxIdentifier?: Maybe<Scalars['String']['output']>;
  };

/** Represents a company's business location. */
export type CompanyLocationContactsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<CompanyContactSortKeys>;
};

/** Represents a company's business location. */
export type CompanyLocationCreditCardArgs = {
  id: Scalars['ID']['input'];
};

/** Represents a company's business location. */
export type CompanyLocationCreditCardsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents a company's business location. */
export type CompanyLocationDraftOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<DraftOrderByLocationSortKeys>;
};

/** Represents a company's business location. */
export type CompanyLocationMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

/** Represents a company's business location. */
export type CompanyLocationMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** Represents a company's business location. */
export type CompanyLocationOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<OrderByLocationSortKeys>;
};

/** Represents a company's business location. */
export type CompanyLocationRoleAssignmentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<CompanyContactRoleAssignmentSortKeys>;
};

/** Return type for `companyLocationAssignAddress` mutation. */
export type CompanyLocationAssignAddressPayload = {
  __typename?: 'CompanyLocationAssignAddressPayload';
  /** The list of updated addresses on the company location. */
  addresses?: Maybe<Array<CompanyAddress>>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<BusinessCustomerUserError>;
};

/** An auto-generated type for paginating through multiple CompanyLocations. */
export type CompanyLocationConnection = {
  __typename?: 'CompanyLocationConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<CompanyLocationEdge>;
  /** A list of nodes that are contained in CompanyLocationEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<CompanyLocation>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one CompanyLocation and a cursor during pagination. */
export type CompanyLocationEdge = {
  __typename?: 'CompanyLocationEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of CompanyLocationEdge. */
  node: CompanyLocation;
};

/** The set of valid sort keys for the CompanyLocation query. */
export type CompanyLocationSortKeys =
  /** Sort by the `company_and_location_name` value. */
  | 'COMPANY_AND_LOCATION_NAME'
  /** Sort by the `company_id` value. */
  | 'COMPANY_ID'
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `name` value. */
  | 'NAME'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** Defines the extent of locations for which a contact holds permissions on a resource. */
export type ContactPermissionLocationScopeType =
  /** The contact has permission on all locations. */
  | 'ALL'
  /** The contact has permission for at least one location. */
  | 'ANY'
  /** The contact has no permission on any location. */
  | 'NONE'
  /** The contact has permission on only one location. */
  | 'ONE';

/** Details for count of elements. */
export type Count = {
  __typename?: 'Count';
  /** The count of elements. */
  count: Scalars['Int']['output'];
  /** The count's precision, or the exactness of the value. */
  precision: CountPrecision;
};

/** The precision of the value returned by a count field. */
export type CountPrecision =
  /** The count is at least the value. A limit was imposed and reached. */
  | 'AT_LEAST'
  /** The count is exactly the value. */
  | 'EXACT';

/**
 * The code designating a country/region, which generally follows ISO 3166-1 alpha-2 guidelines.
 * If a territory doesn't have a country code value in the `CountryCode` enum, then it might be considered a subdivision
 * of another country. For example, the territories associated with Spain are represented by the country code `ES`,
 * and the territories associated with the United States of America are represented by the country code `US`.
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

/** Return type for `creditCardAdd` mutation. */
export type CreditCardAddPayload = {
  __typename?: 'CreditCardAddPayload';
  /** The newly added credit card. */
  creditCard?: Maybe<CustomerCreditCard>;
  /** The URL to which the customer should be redirected to complete the 3D Secure payment flow. */
  nextActionUrl?: Maybe<Scalars['URL']['output']>;
  /** If the card verification result is processing. When this is true, credit_card will be null. */
  processing?: Maybe<Scalars['Boolean']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsPaymentInstrumentUserErrors>;
};

/** Return type for `creditCardUpdate` mutation. */
export type CreditCardUpdatePayload = {
  __typename?: 'CreditCardUpdatePayload';
  /** The updated credit card. */
  creditCard?: Maybe<CustomerCreditCard>;
  /** If the card verification result is processing. When this is true, `credit_card` will be null. */
  processing?: Maybe<Scalars['Boolean']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsPaymentInstrumentUserErrors>;
};

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

/**
 * The three-letter currency codes that represent the world currencies used in stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
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

/** Represents the personal information of a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type Customer = HasMetafields &
  HasStoreCreditAccounts &
  Node & {
    __typename?: 'Customer';
    /** The addresses associated with the customer. */
    addresses: CustomerAddressConnection;
    /** The list of wallet payment configs for providers that the payment method accepts. */
    availableWalletPaymentConfigs: Array<WalletPaymentConfig>;
    /** The list of contacts the customer is associated with. */
    companyContacts: CompanyContactConnection;
    /** The date and time when the customer was created. */
    createdAt: Scalars['DateTime']['output'];
    /** The date and time when the customer was created. */
    creationDate: Scalars['DateTime']['output'];
    /** A Credit Card resource identified by ID. */
    creditCard?: Maybe<CustomerCreditCard>;
    /** The stored Credit Cards associated with the customer. */
    creditCards: CustomerCreditCardConnection;
    /** The default address of the customer. */
    defaultAddress?: Maybe<CustomerAddress>;
    /** The full name of the customer, based on the first_name and last_name values. If these aren't available, it falls back to the customer's email address, and if that isn't available, the customer's phone number. */
    displayName: Scalars['String']['output'];
    /** The Draft Orders associated with the customer. */
    draftOrders: DraftOrderConnection;
    /** The email address of the customer. */
    emailAddress?: Maybe<CustomerEmailAddress>;
    /** The first name of the customer. */
    firstName?: Maybe<Scalars['String']['output']>;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The URL to the avatar image of the customer. */
    imageUrl: Scalars['URL']['output'];
    /** The customer's most recently updated, incomplete checkout. */
    lastIncompleteCheckout?: Maybe<Checkout>;
    /** The last name of the customer. */
    lastName?: Maybe<Scalars['String']['output']>;
    /** A metafield found by namespace and key. */
    metafield?: Maybe<Metafield>;
    /**
     * The metafields associated with the resource matching the
     * supplied list of namespaces and keys.
     */
    metafields: Array<Maybe<Metafield>>;
    /** The orders associated with the customer. */
    orders: OrderConnection;
    /** A PayPal Billing Agreement resource. */
    paypalBillingAgreement?: Maybe<PaypalBillingAgreement>;
    /** The phone number of the customer. */
    phoneNumber?: Maybe<CustomerPhoneNumber>;
    /** A Return identified by ID. */
    return?: Maybe<Return>;
    /** A list of the owner resource's store credit accounts. Store credit accounts are not shown for shops with store credit disabled at checkout. */
    storeCreditAccounts: StoreCreditAccountConnection;
    /** A Subscription Contract resource identified by ID. */
    subscriptionContract?: Maybe<SubscriptionContract>;
    /** The Subscription Contracts associated with the customer. */
    subscriptionContracts: SubscriptionContractConnection;
    /** A comma-separated list of tags that have been added to the customer. */
    tags: Array<Scalars['String']['output']>;
    /** The list of tax exemptions applied to the customer with additional details. */
    taxExemptionsDetails: Array<TaxExemptionDetails>;
  };

/** Represents the personal information of a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerAddressesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  skipDefault?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents the personal information of a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerCompanyContactsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents the personal information of a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerCreditCardArgs = {
  id: Scalars['ID']['input'];
};

/** Represents the personal information of a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerCreditCardsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents the personal information of a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerDraftOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<DraftOrderSortKeys>;
};

/** Represents the personal information of a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

/** Represents the personal information of a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** Represents the personal information of a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<OrderSortKeys>;
};

/** Represents the personal information of a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerReturnArgs = {
  id: Scalars['ID']['input'];
};

/** Represents the personal information of a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerStoreCreditAccountsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};

/** Represents the personal information of a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerSubscriptionContractArgs = {
  id: Scalars['ID']['input'];
};

/** Represents the personal information of a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerSubscriptionContractsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<SubscriptionContractsSortKeys>;
};

/**
 * Represents a customer's mailing address.
 * For example, a customer's default address and an order's billing address are both mailing addresses.
 * Apps using the Customer Account API must meet the
 * protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data).
 */
export type CustomerAddress = Node & {
  __typename?: 'CustomerAddress';
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']['output']>;
  /** The second line of the address. This is typically the apartment, suite, or unit number. */
  address2?: Maybe<Scalars['String']['output']>;
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']['output']>;
  /** The name of the customer's company or organization. */
  company?: Maybe<Scalars['String']['output']>;
  /** The name of the country. */
  country?: Maybe<Scalars['String']['output']>;
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
  /** The full name of the customer, based on firstName and lastName. */
  name?: Maybe<Scalars['String']['output']>;
  /**
   * The customer's unique phone number.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   */
  phoneNumber?: Maybe<Scalars['String']['output']>;
  /** The region of the address, such as the province, state, or district. */
  province?: Maybe<Scalars['String']['output']>;
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   */
  territoryCode?: Maybe<CountryCode>;
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars['String']['output']>;
  /**
   * The alphanumeric code for the region.
   *
   * For example, ON.
   */
  zoneCode?: Maybe<Scalars['String']['output']>;
};

/**
 * Represents a customer's mailing address.
 * For example, a customer's default address and an order's billing address are both mailing addresses.
 * Apps using the Customer Account API must meet the
 * protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data).
 */
export type CustomerAddressFormattedArgs = {
  withCompany?: InputMaybe<Scalars['Boolean']['input']>;
  withName?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An auto-generated type for paginating through multiple CustomerAddresses. */
export type CustomerAddressConnection = {
  __typename?: 'CustomerAddressConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<CustomerAddressEdge>;
  /** A list of nodes that are contained in CustomerAddressEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<CustomerAddress>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** Return type for `customerAddressCreate` mutation. */
export type CustomerAddressCreatePayload = {
  __typename?: 'CustomerAddressCreatePayload';
  /** The created customer address. */
  customerAddress?: Maybe<CustomerAddress>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsCustomerAddressUserErrors>;
};

/** Return type for `customerAddressDelete` mutation. */
export type CustomerAddressDeletePayload = {
  __typename?: 'CustomerAddressDeletePayload';
  /** The ID of the deleted address. */
  deletedAddressId?: Maybe<Scalars['ID']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsCustomerAddressUserErrors>;
};

/** An auto-generated type which holds one CustomerAddress and a cursor during pagination. */
export type CustomerAddressEdge = {
  __typename?: 'CustomerAddressEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of CustomerAddressEdge. */
  node: CustomerAddress;
};

/** The input fields to create or update a mailing address. */
export type CustomerAddressInput = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: InputMaybe<Scalars['String']['input']>;
  /** The second line of the address. Typically the apartment, suite, or unit number. */
  address2?: InputMaybe<Scalars['String']['input']>;
  /** The name of the city, district, village, or town. */
  city?: InputMaybe<Scalars['String']['input']>;
  /** The name of the customer's company or organization. */
  company?: InputMaybe<Scalars['String']['input']>;
  /** The first name of the customer. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The last name of the customer. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** The customer's unique phone number, formatted using E.164 standard. For example, _+16135551111_. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  /**
   * The country code, in ISO 3166-1 format. Accepts either a two-letter [alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2),
   * a three-letter [alpha-3 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3), or a three-digit [numeric code](https://en.wikipedia.org/wiki/ISO_3166-1_numeric).
   * For example, `US`,  `USA`, or `840` represents the United States.
   */
  territoryCode?: InputMaybe<Scalars['String']['input']>;
  /** The zip or postal code of the address. */
  zip?: InputMaybe<Scalars['String']['input']>;
  /**
   * The alphanumeric code for the region of the address, such as the province, state, or district.
   * For example, 'ON' for Ontario, Canada.
   */
  zoneCode?: InputMaybe<Scalars['String']['input']>;
};

/** Return type for `customerAddressUpdate` mutation. */
export type CustomerAddressUpdatePayload = {
  __typename?: 'CustomerAddressUpdatePayload';
  /** The updated address. */
  customerAddress?: Maybe<CustomerAddress>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsCustomerAddressUserErrors>;
};

/** The credit card payment instrument. */
export type CustomerCreditCard = Node &
  PaymentInstrument & {
    __typename?: 'CustomerCreditCard';
    /** The billing address associated with the credit card. */
    billingAddress?: Maybe<PaymentInstrumentBillingAddress>;
    /** The brand of the credit card. */
    brand: Scalars['String']['output'];
    /** Whether the credit card is the default payment method. */
    default: Scalars['Boolean']['output'];
    /** Whether the credit card is about to expire. */
    expiresSoon: Scalars['Boolean']['output'];
    /** The expiry month of the credit card. */
    expiryMonth: Scalars['Int']['output'];
    /** The expiry year of the credit card. */
    expiryYear: Scalars['Int']['output'];
    /** The BIN number of the credit card. */
    firstDigits?: Maybe<Scalars['String']['output']>;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The last 4 digits of the credit card. */
    lastDigits: Scalars['String']['output'];
    /** The masked credit card number, displaying only the last 4 digits. */
    maskedNumber: Scalars['String']['output'];
    /** The name of the card holder. */
    name: Scalars['String']['output'];
    /** The list of open draft orders of an associated credit card. */
    openDraftOrders: DraftOrderConnection;
    /** The list of pending orders associated with this credit card. */
    pendingOrders: OrderConnection;
    /** Whether this credit card has permission to be shown at checkout for future purchases. */
    permissionToShowAtCheckout: Scalars['Boolean']['output'];
    /** The list of subscription contracts charged against this credit card. */
    subscriptionContracts: SubscriptionContractConnection;
    /** The last 4 digits of the Device Account Number. */
    virtualLastDigits?: Maybe<Scalars['String']['output']>;
    /** The type of wallet, if the credit card is associated with a wallet. */
    walletType?: Maybe<PaymentInstrumentWalletType>;
  };

/** The credit card payment instrument. */
export type CustomerCreditCardOpenDraftOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The credit card payment instrument. */
export type CustomerCreditCardPendingOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The credit card payment instrument. */
export type CustomerCreditCardSubscriptionContractsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<SubscriptionContractsSortKeys>;
};

/** An auto-generated type for paginating through multiple CustomerCreditCards. */
export type CustomerCreditCardConnection = {
  __typename?: 'CustomerCreditCardConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<CustomerCreditCardEdge>;
  /** A list of nodes that are contained in CustomerCreditCardEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<CustomerCreditCard>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one CustomerCreditCard and a cursor during pagination. */
export type CustomerCreditCardEdge = {
  __typename?: 'CustomerCreditCardEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of CustomerCreditCardEdge. */
  node: CustomerCreditCard;
};

/** An email address associated with a customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerEmailAddress = {
  __typename?: 'CustomerEmailAddress';
  /** The email address of the customer. */
  emailAddress?: Maybe<Scalars['String']['output']>;
  /** The customer's subscription status for email marketing. */
  marketingState: EmailMarketingState;
};

/** Return type for `customerEmailMarketingOptIn` mutation. */
export type CustomerEmailMarketingOptInPayload = {
  __typename?: 'CustomerEmailMarketingOptInPayload';
  /** The customer who was force subscribed to email marketing. */
  customerEmailAddress?: Maybe<CustomerEmailAddress>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsCustomerEmailMarketingOptInUserErrors>;
};

/** Return type for `customerEmailMarketingSubscribe` mutation. */
export type CustomerEmailMarketingSubscribePayload = {
  __typename?: 'CustomerEmailMarketingSubscribePayload';
  /** The customer's email address that's subscribed to the email marketing. */
  emailAddress?: Maybe<CustomerEmailAddress>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsCustomerEmailMarketingUserErrors>;
};

/** Return type for `customerEmailMarketingUnsubscribe` mutation. */
export type CustomerEmailMarketingUnsubscribePayload = {
  __typename?: 'CustomerEmailMarketingUnsubscribePayload';
  /** The customer's email address that's unsubscribed from the email marketing. */
  emailAddress?: Maybe<CustomerEmailAddress>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsCustomerEmailMarketingUserErrors>;
};

/**
 * Represents a customer's mailing address.
 * For example, a customer's default address and an order's billing address are both mailing addresses.
 */
export type CustomerMailingAddress = Node & {
  __typename?: 'CustomerMailingAddress';
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']['output']>;
  /** The second line of the address. This is typically the apartment, suite, or unit number. */
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
   */
  countryCode?: Maybe<Scalars['String']['output']>;
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   */
  countryCodeV2?: Maybe<CountryCode>;
  /** Indicates whether the address is the default address or not. */
  defaultAddress: Scalars['Boolean']['output'];
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
  /** The latitude coordinate of the customer's address. */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** The longitude coordinate of the customer's address. */
  longitude?: Maybe<Scalars['Float']['output']>;
  /** The full name of the customer, based on firstName and lastName. */
  name?: Maybe<Scalars['String']['output']>;
  /**
   * The customer's unique phone number.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   */
  phone?: Maybe<Scalars['String']['output']>;
  /**
   * The customer's unique phone number.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   */
  phoneNumber?: Maybe<Scalars['String']['output']>;
  /** The region of the address, such as the province, state, or district. */
  province?: Maybe<Scalars['String']['output']>;
  /**
   * The alphanumeric code for the region.
   *
   * For example, ON.
   */
  provinceCode?: Maybe<Scalars['String']['output']>;
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   */
  territoryCode?: Maybe<CountryCode>;
  /** Indicates whether the address was geolocated and is a valid address. The field returns `false` if the verification failed, or if the job to verify this address was never started. */
  verified: Scalars['Boolean']['output'];
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars['String']['output']>;
  /**
   * The alphanumeric code for the region.
   *
   * For example, ON.
   */
  zoneCode?: Maybe<Scalars['String']['output']>;
};

/**
 * Represents a customer's mailing address.
 * For example, a customer's default address and an order's billing address are both mailing addresses.
 */
export type CustomerMailingAddressFormattedArgs = {
  withCompany?: InputMaybe<Scalars['Boolean']['input']>;
  withName?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The input fields to create or update a mailing address. */
export type CustomerMailingAddressInput = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: InputMaybe<Scalars['String']['input']>;
  /** The second line of the address. Typically the apartment, suite, or unit number. */
  address2?: InputMaybe<Scalars['String']['input']>;
  /** The name of the city, district, village, or town. */
  city?: InputMaybe<Scalars['String']['input']>;
  /** The name of the customer's company or organization. */
  company?: InputMaybe<Scalars['String']['input']>;
  /** The two-letter code for the country of the address. */
  countryCode?: InputMaybe<CountryCode>;
  /** The first name of the customer. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The last name of the customer. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** The customer's unique phone number, formatted using E.164 standard. For example, _+16135551111_. */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** The customer's unique phone number, formatted using E.164 standard. For example, _+16135551111_. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  /** The two-letter code for the country of the address. */
  territoryCode?: InputMaybe<Scalars['String']['input']>;
  /** The zip or postal code of the address. */
  zip?: InputMaybe<Scalars['String']['input']>;
  /**
   * The code for the region of the address, such as the province,
   * state, or district. For example, QC for Quebec, Canada.
   */
  zoneCode?: InputMaybe<Scalars['String']['input']>;
};

/** Defines the phone number of the customer. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type CustomerPhoneNumber = {
  __typename?: 'CustomerPhoneNumber';
  /** Indicates whether the customer has subscribed to SMS marketing material. */
  marketingState: SmsMarketingState;
  /** The customer's phone number. */
  phoneNumber: Scalars['String']['output'];
};

/** The input fields to update a customer's personal information. */
export type CustomerUpdateInput = {
  /** The customer's first name. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The customer's last name. */
  lastName?: InputMaybe<Scalars['String']['input']>;
};

/** Return type for `customerUpdate` mutation. */
export type CustomerUpdatePayload = {
  __typename?: 'CustomerUpdatePayload';
  /** The customer's personal information that has been updated. */
  customer?: Maybe<Customer>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsCustomerUserErrors>;
};

/** The different types of delivery option groups. */
export type DeliveryOptionGroupType =
  /** A one-time purchase. */
  | 'ONE_TIME_PURCHASE'
  /** A subscription. */
  | 'SUBSCRIPTION';

/** Configuration of the deposit. */
export type DepositConfiguration = DepositPercentage;

/** A percentage deposit. */
export type DepositPercentage = {
  __typename?: 'DepositPercentage';
  /** The percentage value of the deposit. */
  percentage: Scalars['Float']['output'];
};

/** Represents an amount discounting the line that has been allocated by a discount. */
export type DiscountAllocation = {
  __typename?: 'DiscountAllocation';
  /** The amount of discount allocated. */
  allocatedAmount: MoneyV2;
  /** The discount from which this allocated amount originated. */
  discountApplication: DiscountApplication;
};

/** Captures the intentions of a discount source at the time of application. */
export type DiscountApplication = {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** The lines of targetType that the discount is allocated over. */
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

/** An auto-generated type for paginating through multiple DiscountApplications. */
export type DiscountApplicationConnection = {
  __typename?: 'DiscountApplicationConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<DiscountApplicationEdge>;
  /** A list of nodes that are contained in DiscountApplicationEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<DiscountApplication>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one DiscountApplication and a cursor during pagination. */
export type DiscountApplicationEdge = {
  __typename?: 'DiscountApplicationEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of DiscountApplicationEdge. */
  node: DiscountApplication;
};

/**
 * The lines on the order to which the discount is applied, of the type defined by
 * the discount application's `targetType`. For example, the value `ENTITLED`, combined with a `targetType` of
 * `LINE_ITEM`, applies the discount on all line items that are entitled to the discount.
 * The value `ALL`, combined with a `targetType` of `SHIPPING_LINE`, applies the discount on all shipping lines.
 */
export type DiscountApplicationTargetSelection =
  /** The discount is allocated onto all the lines. */
  | 'ALL'
  /** The discount is allocated onto only the lines that it's entitled for. */
  | 'ENTITLED'
  /** The discount is allocated onto explicitly chosen lines. */
  | 'EXPLICIT';

/** The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards. */
export type DiscountApplicationTargetType =
  /** The discount applies onto line items. */
  | 'LINE_ITEM'
  /** The discount applies onto shipping lines. */
  | 'SHIPPING_LINE';

/** The type of the discount application. */
export type DiscountApplicationType =
  /** Automatic discount application type. */
  | 'AUTOMATIC'
  /** Discount code discount application type. */
  | 'DISCOUNT_CODE'
  /** Manual discount application type. */
  | 'MANUAL'
  /** Script discount application type. */
  | 'SCRIPT';

/** Captures the intentions of a discount code at the time that it is applied. */
export type DiscountCodeApplication = DiscountApplication & {
  __typename?: 'DiscountCodeApplication';
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** The string identifying the discount code used at the time of application. */
  code: Scalars['String']['output'];
  /** The lines of targetType that the discount is allocated over. */
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

/** A unique string representing the address of a Shopify store on the Internet. */
export type Domain = Node & {
  __typename?: 'Domain';
  /** The host name of the domain (for example, `example.com`). */
  host: Scalars['String']['output'];
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The host of the primary domain that this domain redirects to (for example, `example.com`). */
  redirectHost?: Maybe<Scalars['String']['output']>;
  /** The URL of the domain (for example, `example.com`). */
  url: Scalars['URL']['output'];
};

/** A draft order for the customer. Any fields related to money are in the presentment currency. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type DraftOrder = Node & {
  __typename?: 'DraftOrder';
  /** The billing address of the customer. */
  billingAddress?: Maybe<CustomerAddress>;
  /** Whether the customer who made the draft order has an associated enabled contact. */
  contactExists: Scalars['Boolean']['output'];
  /** The date and time when the draft order was created in Shopify. */
  createdAt: Scalars['DateTime']['output'];
  /** The three-letter code for the currency of the store at the time that the invoice is sent. */
  currencyCode: CurrencyCode;
  /** The customer who placed the order. */
  customer?: Maybe<Customer>;
  /** The discount information for the draft order. */
  discountInformation: DraftOrderDiscountInformation;
  /** The email address of the customer, which is used to send notifications to. */
  email?: Maybe<Scalars['String']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** Whether the draft order is created from the online store and is open. */
  inReview: Scalars['Boolean']['output'];
  /** The link to the checkout, which is sent to the customer in the invoice email. */
  invoiceUrl?: Maybe<Scalars['URL']['output']>;
  /** The merchandise lines marked as fees with total value, aggregated by title. */
  legacyAggregatedMerchandiseTermsAsFees: Array<LegacyAggregatedMerchandiseTermsAsFees>;
  /** Whether or not products marked as fees should be rendered as money lines. */
  legacyRepresentProductsAsFees: Scalars['Boolean']['output'];
  /** The subtotal of the line items (doesn't include shipping charges, shipping discounts, taxes, or fees). */
  legacySubtotalWithoutFees: MoneyV2;
  /** The list of the line items in the draft order. */
  lineItems: DraftOrderLineItemConnection;
  /** The summary of draft order line items quantity. */
  lineItemsSummary?: Maybe<DraftOrderLineItemsSummary>;
  /** The unique identifier for the draft order, which is unique within the store. For example, _#D1223_. */
  name: Scalars['String']['output'];
  /** The order that was created from this draft order. */
  order?: Maybe<Order>;
  /** The phone number assigned to the draft order. */
  phone?: Maybe<Scalars['String']['output']>;
  /** The purchasing entity for the draft order. */
  purchasingEntity?: Maybe<PurchasingEntity>;
  /** Whether the draft order requires shipping or not. */
  requiresShipping: Scalars['Boolean']['output'];
  /** The shipping address of the customer. */
  shippingAddress?: Maybe<CustomerAddress>;
  /** The status of the draft order. */
  status: DraftOrderStatus;
  /** The subtotal of the line items (doesn't include shipping charges, shipping discounts, or taxes). */
  subtotalPrice: MoneyV2;
  /** The subtotal of the line items (doesn't include shipping charges, taxes, or any discounts). */
  subtotalPriceBeforeDiscounts: MoneyV2;
  /** Indicates whether the draft order is tax exempt. */
  taxExempt: Scalars['Boolean']['output'];
  /** Whether the line item prices include taxes. */
  taxesIncluded: Scalars['Boolean']['output'];
  /** The total price of line items for this draft order. */
  totalLineItemsPrice: MoneyV2;
  /** The total amount of the draft order (includes taxes, shipping charges, and discounts). */
  totalPrice: MoneyV2;
  /** The total shipping charge for the draft order. */
  totalShippingPrice: MoneyV2;
  /** The total amount of taxes for the draft order. */
  totalTax: MoneyV2;
  /** The total weight (in grams) of the draft order. */
  totalWeight: Scalars['UnsignedInt64']['output'];
  /**
   * The date and time when the draft order was last changed.
   * The format is YYYY-MM-DD HH:mm:ss (for example, 2016-02-05 17:04:01).
   */
  updatedAt: Scalars['DateTime']['output'];
};

/** A draft order for the customer. Any fields related to money are in the presentment currency. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type DraftOrderLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The order-level discount applied to a draft order. */
export type DraftOrderAppliedDiscount = {
  __typename?: 'DraftOrderAppliedDiscount';
  /** The amount of money discounted. */
  discountValue: MoneyV2;
  /** The name of the order-level discount. */
  title?: Maybe<Scalars['String']['output']>;
};

/** The set of valid sort keys for the DraftOrderByCompany query. */
export type DraftOrderByCompanySortKeys =
  /** Sort by the `customer_name` value. */
  | 'CUSTOMER_NAME'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `number` value. */
  | 'NUMBER'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE'
  /** Sort by the `status` value. */
  | 'STATUS'
  /** Sort by the `total_price` value. */
  | 'TOTAL_PRICE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The set of valid sort keys for the DraftOrderByLocation query. */
export type DraftOrderByLocationSortKeys =
  /** Sort by the `customer_name` value. */
  | 'CUSTOMER_NAME'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `number` value. */
  | 'NUMBER'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE'
  /** Sort by the `status` value. */
  | 'STATUS'
  /** Sort by the `total_price` value. */
  | 'TOTAL_PRICE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** An auto-generated type for paginating through multiple DraftOrders. */
export type DraftOrderConnection = {
  __typename?: 'DraftOrderConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<DraftOrderEdge>;
  /** A list of nodes that are contained in DraftOrderEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<DraftOrder>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** The discount information associated with a draft order. */
export type DraftOrderDiscountInformation = {
  __typename?: 'DraftOrderDiscountInformation';
  /** The order-level discount applied to the draft order. */
  appliedDiscount?: Maybe<DraftOrderAppliedDiscount>;
  /** The total discounts applied to the draft order. */
  totalDiscounts: MoneyV2;
};

/** An auto-generated type which holds one DraftOrder and a cursor during pagination. */
export type DraftOrderEdge = {
  __typename?: 'DraftOrderEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of DraftOrderEdge. */
  node: DraftOrder;
};

/** A line item included in a draft order. */
export type DraftOrderLineItem = Node & {
  __typename?: 'DraftOrderLineItem';
  /** The discount information for the draft order line item. */
  discountInformation: DraftOrderLineItemDiscountInformation;
  /** The total price of the line item after discounts have been applied. */
  discountedTotal: MoneyV2;
  /** The discounted total divided by the quantity, resulting in the value of the discount per unit. */
  discountedUnitPrice: MoneyV2;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The image associated with the line item. */
  image?: Maybe<Image>;
  /** Whether this is line item is marked as a fee. */
  legacyFee: Scalars['Boolean']['output'];
  /** The fee's description, if this line item has been marked as a fee. */
  legacyFeeDescription?: Maybe<Scalars['String']['output']>;
  /** The fee's title, if this line item has been marked as a fee. */
  legacyFeeTitle?: Maybe<Scalars['String']['output']>;
  /** The name of the product. */
  name: Scalars['String']['output'];
  /** The total price of the line item, based on the original unit price of the variant multiplied by the quantity. This total doesn't include any discounts. */
  originalTotal: MoneyV2;
  /** The price of the variant without any discounts applied. */
  originalUnitPrice: MoneyV2;
  /** The quantity of this variant item in the draft order. */
  quantity: Scalars['Int']['output'];
  /** Whether the variant requires physical shipping. */
  requiresShipping: Scalars['Boolean']['output'];
  /** The SKU number of the variant. */
  sku?: Maybe<Scalars['String']['output']>;
  /** Whether the variant is taxable. */
  taxable: Scalars['Boolean']['output'];
  /** The title of the product or variant. This only applies to custom line items. */
  title: Scalars['String']['output'];
  /** The name of the product variant. */
  variantTitle?: Maybe<Scalars['String']['output']>;
  /** The name of the vendor of the variant. */
  vendor?: Maybe<Scalars['String']['output']>;
  /** The weight of the line item, including the unit and value. */
  weight?: Maybe<Weight>;
};

/** An auto-generated type for paginating through multiple DraftOrderLineItems. */
export type DraftOrderLineItemConnection = {
  __typename?: 'DraftOrderLineItemConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<DraftOrderLineItemEdge>;
  /** A list of nodes that are contained in DraftOrderLineItemEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<DraftOrderLineItem>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** The discount information for the draft order line item. */
export type DraftOrderLineItemDiscountInformation = {
  __typename?: 'DraftOrderLineItemDiscountInformation';
  /** The discount's name that displays to merchants in the Shopify admin and to customers. */
  title?: Maybe<Scalars['String']['output']>;
  /** The total discount applied to the line item. */
  totalDiscount: MoneyV2;
};

/** An auto-generated type which holds one DraftOrderLineItem and a cursor during pagination. */
export type DraftOrderLineItemEdge = {
  __typename?: 'DraftOrderLineItemEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of DraftOrderLineItemEdge. */
  node: DraftOrderLineItem;
};

/** The quantitative summary of the line items in a specific draft order. */
export type DraftOrderLineItemsSummary = {
  __typename?: 'DraftOrderLineItemsSummary';
  /** The total number of line items in the draft order. */
  lineItemCount: Scalars['Int']['output'];
  /** The total quantity of all legacy fee line items in the draft order. */
  totalQuantityOfLegacyFeeLineItems: Scalars['Int']['output'];
  /** The total quantity of all line items in the draft order. */
  totalQuantityOfLineItems: Scalars['Int']['output'];
};

/** The set of valid sort keys for the DraftOrder query. */
export type DraftOrderSortKeys =
  /** Sort by the `customer_name` value. */
  | 'CUSTOMER_NAME'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `number` value. */
  | 'NUMBER'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE'
  /** Sort by the `status` value. */
  | 'STATUS'
  /** Sort by the `total_price` value. */
  | 'TOTAL_PRICE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The valid statuses for a draft order. */
export type DraftOrderStatus =
  /** The draft order has been paid. */
  | 'COMPLETED'
  /** An invoice for the draft order has been sent to the customer. */
  | 'INVOICE_SENT'
  /** The draft order is open. It has not been paid, and an invoice hasn't been sent. */
  | 'OPEN';

/** A sale that includes a duty charge. */
export type DutySale = Node &
  Sale & {
    __typename?: 'DutySale';
    /** The type of order action represented by the sale. */
    actionType: SaleActionType;
    /** The unique ID of the sale. */
    id: Scalars['ID']['output'];
    /** The type of line associated with the sale. */
    lineType: SaleLineType;
    /** The number of units ordered or intended to be returned. */
    quantity?: Maybe<Scalars['Int']['output']>;
    /** The individual taxes associated with the sale. */
    taxes: Array<SaleTax>;
    /** The total sale amount after taxes and discounts. */
    totalAmount: MoneyV2;
    /** The total amount of discounts allocated to the sale after taxes. */
    totalDiscountAmountAfterTaxes: MoneyV2;
    /** The total discounts allocated to the sale before taxes. */
    totalDiscountAmountBeforeTaxes: MoneyV2;
    /** The total tax amount for the sale. */
    totalTaxAmount: MoneyV2;
  };

/** Represents the possible email marketing states for a customer. */
export type EmailMarketingState =
  /** The customer’s email marketing state is invalid. */
  | 'INVALID'
  /** The customer isn't subscribed to email marketing. */
  | 'NOT_SUBSCRIBED'
  /** The customer is in the process of subscribing to email marketing. */
  | 'PENDING'
  /** The customer's personal data has been erased. This value is internally-set and read-only. */
  | 'REDACTED'
  /** The customer is subscribed to email marketing. */
  | 'SUBSCRIBED'
  /** The customer is not currently subscribed to email marketing but was previously subscribed. */
  | 'UNSUBSCRIBED';

/** Tokens used by ui extensions to query various APIs. */
export type ExtensionApiTokens = {
  __typename?: 'ExtensionApiTokens';
  /** The token for querying the storefront API. */
  storefrontApi?: Maybe<ExtensionStorefrontApiToken>;
};

/** Ephemeral token used by ui extensions to query the storefront API. */
export type ExtensionStorefrontApiToken = {
  __typename?: 'ExtensionStorefrontApiToken';
  /** The expiration time of the token. */
  expiresAt: Scalars['ISO8601DateTime']['output'];
  /** The ephemeral token used for querying the storefront API. */
  token: Scalars['String']['output'];
};

/** A sale associated with a fee. */
export type FeeSale = Node &
  Sale & {
    __typename?: 'FeeSale';
    /** The type of order action represented by the sale. */
    actionType: SaleActionType;
    /** The unique ID of the sale. */
    id: Scalars['ID']['output'];
    /** The type of line associated with the sale. */
    lineType: SaleLineType;
    /** The number of units ordered or intended to be returned. */
    quantity?: Maybe<Scalars['Int']['output']>;
    /** The individual taxes associated with the sale. */
    taxes: Array<SaleTax>;
    /** The total sale amount after taxes and discounts. */
    totalAmount: MoneyV2;
    /** The total amount of discounts allocated to the sale after taxes. */
    totalDiscountAmountAfterTaxes: MoneyV2;
    /** The total discounts allocated to the sale before taxes. */
    totalDiscountAmountBeforeTaxes: MoneyV2;
    /** The total tax amount for the sale. */
    totalTaxAmount: MoneyV2;
  };

/** Represents a single fulfillment in an order. */
export type Fulfillment = Node & {
  __typename?: 'Fulfillment';
  /** The date and time when the fulfillment was created. */
  createdAt: Scalars['DateTime']['output'];
  /** The estimated delivery time of this fulfillment. */
  estimatedDeliveryAt?: Maybe<Scalars['DateTime']['output']>;
  /** A collection of fulfillment events. */
  events: FulfillmentEventConnection;
  /** The line items in the fulfillment. */
  fulfillmentLineItems: FulfillmentLineItemConnection;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** Whether the fulfillment is picked up locally. */
  isPickedUp: Scalars['Boolean']['output'];
  /** The latest shipment status for the fulfillment. */
  latestShipmentStatus?: Maybe<FulfillmentEventStatus>;
  /** The pickup address for the fulfillment. */
  pickupAddress?: Maybe<PickupAddress>;
  /** Whether any line items in the fulfillment require shipping. */
  requiresShipping: Scalars['Boolean']['output'];
  /** The status of the fulfillment. */
  status?: Maybe<FulfillmentStatus>;
  /** The tracking information associated with the fulfillment. */
  trackingInformation: Array<TrackingInformation>;
  /** The date and time when the fulfillment was updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** Represents a single fulfillment in an order. */
export type FulfillmentEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<FulfillmentEventSortKeys>;
};

/** Represents a single fulfillment in an order. */
export type FulfillmentFulfillmentLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An auto-generated type for paginating through multiple Fulfillments. */
export type FulfillmentConnection = {
  __typename?: 'FulfillmentConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<FulfillmentEdge>;
  /** A list of nodes that are contained in FulfillmentEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<Fulfillment>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one Fulfillment and a cursor during pagination. */
export type FulfillmentEdge = {
  __typename?: 'FulfillmentEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of FulfillmentEdge. */
  node: Fulfillment;
};

/** An event that occurred for a fulfillment. */
export type FulfillmentEvent = Node & {
  __typename?: 'FulfillmentEvent';
  /** The time when this fulfillment event occurred. */
  happenedAt: Scalars['DateTime']['output'];
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The status of the fulfillment event. */
  status: FulfillmentEventStatus;
};

/** An auto-generated type for paginating through multiple FulfillmentEvents. */
export type FulfillmentEventConnection = {
  __typename?: 'FulfillmentEventConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<FulfillmentEventEdge>;
  /** A list of nodes that are contained in FulfillmentEventEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<FulfillmentEvent>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one FulfillmentEvent and a cursor during pagination. */
export type FulfillmentEventEdge = {
  __typename?: 'FulfillmentEventEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of FulfillmentEventEdge. */
  node: FulfillmentEvent;
};

/** The set of valid sort keys for the FulfillmentEvent query. */
export type FulfillmentEventSortKeys =
  /** Sort by the `happened_at` value. */
  | 'HAPPENED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE';

/** The status of a fulfillment event. */
export type FulfillmentEventStatus =
  /** A delivery was attempted. */
  | 'ATTEMPTED_DELIVERY'
  /** The fulfillment has been picked up by the carrier. */
  | 'CARRIER_PICKED_UP'
  /** The fulfillment is confirmed. */
  | 'CONFIRMED'
  /** The fulfillment is delayed. */
  | 'DELAYED'
  /** The fulfillment was successfully delivered. */
  | 'DELIVERED'
  /** The fulfillment request failed. */
  | 'FAILURE'
  /** The fulfillment is in transit. */
  | 'IN_TRANSIT'
  /** A purchased shipping label has been printed. */
  | 'LABEL_PRINTED'
  /** A shipping label has been purchased. */
  | 'LABEL_PURCHASED'
  /** The fulfillment is out for delivery. */
  | 'OUT_FOR_DELIVERY'
  /** The fulfillment was successfully picked up. */
  | 'PICKED_UP'
  /** The fulfillment is ready to be picked up. */
  | 'READY_FOR_PICKUP';

/** Represents a line item from an order that's included in a fulfillment. */
export type FulfillmentLineItem = Node & {
  __typename?: 'FulfillmentLineItem';
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The line item associated with the order. */
  lineItem: LineItem;
  /** The number of line items in the fulfillment. */
  quantity?: Maybe<Scalars['Int']['output']>;
};

/** An auto-generated type for paginating through multiple FulfillmentLineItems. */
export type FulfillmentLineItemConnection = {
  __typename?: 'FulfillmentLineItemConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<FulfillmentLineItemEdge>;
  /** A list of nodes that are contained in FulfillmentLineItemEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<FulfillmentLineItem>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one FulfillmentLineItem and a cursor during pagination. */
export type FulfillmentLineItemEdge = {
  __typename?: 'FulfillmentLineItemEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of FulfillmentLineItemEdge. */
  node: FulfillmentLineItem;
};

/** The set of valid sort keys for the Fulfillment query. */
export type FulfillmentSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE';

/** The status of a fulfillment. */
export type FulfillmentStatus =
  /** The fulfillment was canceled. */
  | 'CANCELLED'
  /** There was an error with the fulfillment request. */
  | 'ERROR'
  /** The fulfillment request failed. */
  | 'FAILURE'
  /** The third-party fulfillment service has acknowledged the fulfillment and is processing it. */
  | 'OPEN'
  /** Shopify has created the fulfillment and is waiting for the third-party fulfillment service to transition it to `open` or `success`. */
  | 'PENDING'
  /** The fulfillment was completed successfully. */
  | 'SUCCESS';

/** The gift card payment details related to a transaction. */
export type GiftCardDetails = {
  __typename?: 'GiftCardDetails';
  /** The balance of the gift card in shop and presentment currencies. */
  balance: MoneyV2;
  /** The last characters of the gift card. */
  last4: Scalars['String']['output'];
};

/** A sale associated with a gift card. */
export type GiftCardSale = Node &
  Sale & {
    __typename?: 'GiftCardSale';
    /** The type of order action represented by the sale. */
    actionType: SaleActionType;
    /** The unique ID of the sale. */
    id: Scalars['ID']['output'];
    /** The line item associated with the sale. */
    lineItem: LineItem;
    /** The type of line associated with the sale. */
    lineType: SaleLineType;
    /** The number of units ordered or intended to be returned. */
    quantity?: Maybe<Scalars['Int']['output']>;
    /** The individual taxes associated with the sale. */
    taxes: Array<SaleTax>;
    /** The total sale amount after taxes and discounts. */
    totalAmount: MoneyV2;
    /** The total amount of discounts allocated to the sale after taxes. */
    totalDiscountAmountAfterTaxes: MoneyV2;
    /** The total discounts allocated to the sale before taxes. */
    totalDiscountAmountBeforeTaxes: MoneyV2;
    /** The total tax amount for the sale. */
    totalTaxAmount: MoneyV2;
  };

/** The input fields for the billing address received from Google Pay. */
export type GooglePayBillingAddressInput = {
  /** The first line of the address, typically the street address or PO Box number. */
  address1?: InputMaybe<Scalars['String']['input']>;
  /** The second line of the address, typically the apartment, suite, or unit number. */
  address2?: InputMaybe<Scalars['String']['input']>;
  /** The region of the address, such as the province, state, or district. */
  administrativeArea?: InputMaybe<Scalars['String']['input']>;
  /** The two-letter code for the country of the address. */
  countryCode?: InputMaybe<CountryCode>;
  /** The name of the city, district, village, or town. */
  locality?: InputMaybe<Scalars['String']['input']>;
  /** The name of the customer. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The telephone number of the customer. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  /** The zip or postal code of the address. */
  postalCode?: InputMaybe<Scalars['String']['input']>;
};

/** Return type for `googlePayCreditCardAdd` mutation. */
export type GooglePayCreditCardAddPayload = {
  __typename?: 'GooglePayCreditCardAddPayload';
  /** The updated credit card. */
  creditCard?: Maybe<CustomerCreditCard>;
  /** If the card verification result is processing. When this is true, credit_card will be null. */
  processing?: Maybe<Scalars['Boolean']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsPaymentInstrumentUserErrors>;
};

/** Return type for `googlePayCreditCardUpdate` mutation. */
export type GooglePayCreditCardUpdatePayload = {
  __typename?: 'GooglePayCreditCardUpdatePayload';
  /** The updated credit card. */
  creditCard?: Maybe<CustomerCreditCard>;
  /** If the card verification result is processing. When this is true, credit_card will be null. */
  processing?: Maybe<Scalars['Boolean']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsPaymentInstrumentUserErrors>;
};

/** The configuration settings for the Google Pay wallet. */
export type GooglePayWalletConfig = {
  __typename?: 'GooglePayWalletConfig';
  /** The authentication methods allowed by Google Pay. */
  allowedAuthMethods: Array<Scalars['String']['output']>;
  /** The card networks accepted by Google Pay. */
  allowedCardNetworks: Array<Scalars['String']['output']>;
  /** The Auth JWT used for Google Pay requests. */
  authJwt: Scalars['String']['output'];
  /** The current operating environment (TEST or PRODUCTION). */
  environment: Scalars['String']['output'];
  /** The gateway name for Google Pay. */
  gateway: Scalars['String']['output'];
  /** The gateway merchant ID for Google Pay. */
  gatewayMerchantId: Scalars['String']['output'];
  /** The merchant ID for Google Pay. */
  merchantId: Scalars['String']['output'];
  /** The merchant name for Google Pay. */
  merchantName: Scalars['String']['output'];
  /** The merchant origin for Google Pay. */
  merchantOrigin: Scalars['String']['output'];
};

/**
 * Represents a summary of the current version of data in a resource.
 *
 * The `compare_digest` field can be used as input for mutations that implement a compare-and-swap mechanism.
 */
export type HasCompareDigest = {
  /** The data stored in the resource, represented as a digest. */
  compareDigest: Scalars['String']['output'];
};

/** The information about the metafields associated with the specified resource. */
export type HasMetafields = {
  /** A metafield found by namespace and key. */
  metafield?: Maybe<Metafield>;
  /**
   * The metafields associated with the resource matching the
   * supplied list of namespaces and keys.
   */
  metafields: Array<Maybe<Metafield>>;
};

/** The information about the metafields associated with the specified resource. */
export type HasMetafieldsMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

/** The information about the metafields associated with the specified resource. */
export type HasMetafieldsMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** The input fields to identify a metafield on an owner resource by namespace and key. */
export type HasMetafieldsIdentifier = {
  /** The identifier for the metafield. */
  key: Scalars['String']['input'];
  /** A container for a set of metafields. */
  namespace: Scalars['String']['input'];
};

/** Represents information about the store credit accounts associated to the specified owner. */
export type HasStoreCreditAccounts = {
  /** A list of the owner resource's store credit accounts. Store credit accounts are not shown for shops with store credit disabled at checkout. */
  storeCreditAccounts: StoreCreditAccountConnection;
};

/** Represents information about the store credit accounts associated to the specified owner. */
export type HasStoreCreditAccountsStoreCreditAccountsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
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

/** List of supported image content types. */
export type ImageContentType =
  /** A JPG image. */
  | 'JPG'
  /** A PNG image. */
  | 'PNG'
  /** A WEBP image. */
  | 'WEBP';

/**
 * The available options for transforming an image.
 *
 * All transformation options are considered best effort. Any transformation that the original image type doesn't support will be ignored.
 */
export type ImageTransformInput = {
  /**
   * The region of the image to remain after cropping.
   * Must be used in conjunction with the `maxWidth` and/or `maxHeight` fields, where the `maxWidth` and `maxHeight` aren't equal.
   * The `crop` argument should coincide with the smaller value. A smaller `maxWidth` indicates a `LEFT` or `RIGHT` crop, while
   * a smaller `maxHeight` indicates a `TOP` or `BOTTOM` crop. For example, `{ maxWidth: 5, maxHeight: 10, crop: LEFT }` will result
   * in an image with a width of 5 and height of 10, where the right side of the image is removed.
   */
  crop?: InputMaybe<CropRegion>;
  /** Image height in pixels between 1 and 5760. */
  maxHeight?: InputMaybe<Scalars['Int']['input']>;
  /** Image width in pixels between 1 and 5760. */
  maxWidth?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Convert the source image into the preferred content type.
   * Supported conversions: `.svg` to `.png`, any file type to `.jpg`, and any file type to `.webp`.
   */
  preferredContentType?: InputMaybe<ImageContentType>;
  /** Image size multiplier for high-resolution retina displays. Must be within 1..3. */
  scale?: InputMaybe<Scalars['Int']['input']>;
};

/** An object representing a product marked as a fee, aggregated by title. */
export type LegacyAggregatedMerchandiseTermsAsFees = Node & {
  __typename?: 'LegacyAggregatedMerchandiseTermsAsFees';
  /** The description of the fee line, as provided by the _legacy_product_as_fee_description line item property. */
  description?: Maybe<Scalars['String']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The title of the fee line, as provided by the _legacy_product_as_fee_title line item property. */
  title: Scalars['String']['output'];
  /** The total value of all the products with the same title. */
  total: MoneyV2;
};

/** A single line item in an order. */
export type LineItem = Node & {
  __typename?: 'LineItem';
  /** The total price of the line item, calculated by multiplying the current unit price of the variant by the quantity, expressed in presentment currencies. */
  currentTotalPrice?: Maybe<MoneyV2>;
  /** The list of custom attributes associated with the line item. */
  customAttributes: Array<Attribute>;
  /** The discounts that have been allocated onto the line item by discount applications. */
  discountAllocations: Array<DiscountAllocation>;
  /** The discount information for the line item. */
  discountInformation: Array<LineItemDiscountInformation>;
  /** Whether the line item represents the purchase of a gift card. */
  giftCard: Scalars['Boolean']['output'];
  /** The line item group associated to the line item. */
  group?: Maybe<LineItemGroup>;
  /** The title of the line item group associated with the line item. */
  groupTitle?: Maybe<Scalars['String']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The image object associated with the line item. */
  image?: Maybe<Image>;
  /** Whether this is line item is marked as a fee. */
  legacyFee: Scalars['Boolean']['output'];
  /** The fee's description, if this line item has been marked as a fee. */
  legacyFeeDescription?: Maybe<Scalars['String']['output']>;
  /** The fee's title, if this line item has been marked as a fee. */
  legacyFeeTitle?: Maybe<Scalars['String']['output']>;
  /** The name of the product. */
  name: Scalars['String']['output'];
  /** The title of the line item variant. */
  presentmentTitle?: Maybe<Scalars['String']['output']>;
  /** The product variant price without any discounts applied, in presentment currencies. */
  price?: Maybe<MoneyV2>;
  /** The product's ID. */
  productId?: Maybe<Scalars['ID']['output']>;
  /** The product's type. */
  productType?: Maybe<Scalars['String']['output']>;
  /** The number of variant items ordered. */
  quantity: Scalars['Int']['output'];
  /** The quantity of the line item, minus the refunded quantity. */
  refundableQuantity: Scalars['Int']['output'];
  /** Whether physical shipping is required for the variant. */
  requiresShipping: Scalars['Boolean']['output'];
  /** The selling plan details associated with the line item. */
  sellingPlan?: Maybe<LineItemSellingPlan>;
  /** The SKU number of the variant. */
  sku?: Maybe<Scalars['String']['output']>;
  /** The discounts that have been allocated onto the line item, ignoring returns. */
  soldDiscountInformation: Array<LineItemDiscountInformation>;
  /** The total price of the line item, ignoring returns, with discounts included. */
  soldDiscountedTotalPrice?: Maybe<MoneyV2>;
  /** The quantity of sold line item, ignoring returns. */
  soldQuantity?: Maybe<Scalars['Int']['output']>;
  /** The total price of the line item, ignoring returns, before discounts. */
  soldTotalPrice?: Maybe<MoneyV2>;
  /** The reasons that the customer can return this line item. */
  supportedReturnReasons: Array<ReturnSupportedReason>;
  /** The title of the product or variant. This field only applies to custom line items. */
  title: Scalars['String']['output'];
  /** The total of the discount allocations on this line item, resulting from discounts applied specifically to this line item. */
  totalDiscount: MoneyV2;
  /** The total price of the line item, calculated by multiplying the current unit price of the variant by the quantity, expressed in presentment currencies. */
  totalPrice?: Maybe<MoneyV2>;
  /** The total price of the line item, calculated by multiplying the unit price of the variant (before any discounts) by the quantity, expressed in presentment currencies. */
  totalPriceBeforeDiscounts?: Maybe<MoneyV2>;
  /** The total price of the line item, calculated by multiplying the unit price of the variant (after line item discounts) by the quantity, expressed in presentment currencies. */
  totalPriceWithDiscounts?: Maybe<MoneyV2>;
  /** The unit price of the line item in presentment currencies. */
  unitPrice?: Maybe<UnitPrice>;
  /** The ID of the variant. */
  variantId?: Maybe<Scalars['ID']['output']>;
  /** The options of the product variant. */
  variantOptions?: Maybe<Array<LineItemVariantOption>>;
  /** The name of the variant. */
  variantTitle?: Maybe<Scalars['String']['output']>;
  /** The product's vendor. */
  vendor?: Maybe<Scalars['String']['output']>;
};

/** An auto-generated type for paginating through multiple LineItems. */
export type LineItemConnection = {
  __typename?: 'LineItemConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<LineItemEdge>;
  /** A list of nodes that are contained in LineItemEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<LineItem>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** The information about the line item category for the order. */
export type LineItemContainer =
  | RemainingLineItemContainer
  | UnfulfilledDigitalLineItemContainer
  | UnfulfilledGiftCardLineItemContainer
  | UnfulfilledLineItemContainer
  | UnfulfilledPhysicalLineItemContainer;

/** The information about the line item in the line item container. */
export type LineItemContainerLineItem = Node & {
  __typename?: 'LineItemContainerLineItem';
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The line item associated with the container. */
  lineItem: LineItem;
  /** The number of units yet to be fulfilled. */
  remainingQuantity: Scalars['Int']['output'];
  /** The total number of units in this fulfillment. */
  totalQuantity: Scalars['Int']['output'];
};

/** An auto-generated type for paginating through multiple LineItemContainerLineItems. */
export type LineItemContainerLineItemConnection = {
  __typename?: 'LineItemContainerLineItemConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<LineItemContainerLineItemEdge>;
  /** A list of nodes that are contained in LineItemContainerLineItemEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<LineItemContainerLineItem>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one LineItemContainerLineItem and a cursor during pagination. */
export type LineItemContainerLineItemEdge = {
  __typename?: 'LineItemContainerLineItemEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of LineItemContainerLineItemEdge. */
  node: LineItemContainerLineItem;
};

/** The discount information for a specific line item. */
export type LineItemDiscountInformation = {
  __typename?: 'LineItemDiscountInformation';
  /** The value of the applied discount. */
  discountValue: MoneyV2;
  /** The discount's name that displays to merchants in the Shopify admin and to customers. */
  title?: Maybe<Scalars['String']['output']>;
};

/** An auto-generated type which holds one LineItem and a cursor during pagination. */
export type LineItemEdge = {
  __typename?: 'LineItemEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of LineItemEdge. */
  node: LineItem;
};

/** A line item group to which a line item belongs to. */
export type LineItemGroup = Node & {
  __typename?: 'LineItemGroup';
  /** The total price of the line item group, calculated by aggregating the current total price of its line item components. */
  currentTotalPrice?: Maybe<MoneyV2>;
  /** The discount information for the line item group. */
  discountInformation?: Maybe<Array<LineItemDiscountInformation>>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The image of the line item group variant or the product image if the variant has no image. */
  image?: Maybe<Image>;
  /** The number of line item groups ordered. */
  quantity: Scalars['Int']['output'];
  /** The title of the line item group. */
  title: Scalars['String']['output'];
  /** The total price of the line item group, calculated by aggregating the total price before discounts of its line item components. */
  totalPriceBeforeDiscounts?: Maybe<MoneyV2>;
};

/** The selling plan for a line item. */
export type LineItemSellingPlan = {
  __typename?: 'LineItemSellingPlan';
  /** The name of the selling plan for display purposes. */
  name: Scalars['String']['output'];
  /** The ID of the selling plan associated with the line item. */
  sellingPlanId?: Maybe<Scalars['ID']['output']>;
};

/** The line item's variant option. */
export type LineItemVariantOption = {
  __typename?: 'LineItemVariantOption';
  /** The name of the option. */
  name: Scalars['String']['output'];
  /** The value of the option. */
  value: Scalars['String']['output'];
};

/** Captures the intentions of a discount that was manually created. */
export type ManualDiscountApplication = DiscountApplication & {
  __typename?: 'ManualDiscountApplication';
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** The description of the application. */
  description?: Maybe<Scalars['String']['output']>;
  /** The lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the application. */
  title: Scalars['String']['output'];
  /** The value of the discount application. */
  value: PricingValue;
};

/**
 * A market, which is a group of one or more regions targeted for international sales.
 * A market allows configuration of a distinct, localized shopping experience for customers from a specific area of the world.
 */
export type Market = Node & {
  __typename?: 'Market';
  /** The short, human-readable unique identifier for the market. */
  handle: Scalars['String']['output'];
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /**
   * The web presence of the market, defining its SEO strategy. This can be a different domain,
   * subdomain, or subfolders of the primary domain. Each web presence comprises one or more
   * language variants. If a market doesn't have its own web presence, then the market is accessible on the
   * shop’s primary domain using [country
   * selectors](https://shopify.dev/themes/internationalization/multiple-currencies-languages#the-country-selector).
   */
  webPresence?: Maybe<MarketWebPresence>;
};

/**
 * The web presence of the market, defining its SEO strategy. This can be a different domain
 * (e.g. `example.ca`), subdomain (e.g. `ca.example.com`), or subfolders of the primary
 * domain (e.g. `example.com/en-ca`). Each web presence comprises one or more language
 * variants. If a market does not have its own web presence, it is accessible on the shop’s
 * primary domain via [country
 * selectors](https://shopify.dev/themes/internationalization/multiple-currencies-languages#the-country-selector).
 *
 * Note: while the domain/subfolders defined by a market’s web presence are not applicable to
 * custom storefronts, which must manage their own domains and routing, the languages chosen
 * here do govern [the languages available on the Storefront
 * API](https://shopify.dev/custom-storefronts/internationalization/multiple-languages) for the countries in
 * this market.
 */
export type MarketWebPresence = Node & {
  __typename?: 'MarketWebPresence';
  /**
   * The domain of the web presence.
   * This field will be null if `subfolderSuffix` isn't null.
   */
  domain?: Maybe<Domain>;
  /** A globally-unique identifier. */
  id: Scalars['ID']['output'];
  /** The list of root URLs for each of the web presence’s locales. */
  rootUrls: Array<MarketWebPresenceRootUrl>;
  /** The market-specific suffix of the subfolders defined by the web presence. Example: in `/en-us` the subfolder suffix is `us`. This field will be null if `domain` isn't null. */
  subfolderSuffix?: Maybe<Scalars['String']['output']>;
};

/** The URL for the homepage of the online store in the context of a particular market and a particular locale. */
export type MarketWebPresenceRootUrl = {
  __typename?: 'MarketWebPresenceRootUrl';
  /** The locale in which the storefront loads. */
  locale: Scalars['String']['output'];
  /** The URL of the homepage. */
  url: Scalars['URL']['output'];
};

/**
 * The custom metadata attached to a resource. Metafields can be sorted into namespaces and are
 * comprised of keys, values, and value types.
 */
export type Metafield = HasCompareDigest &
  Node & {
    __typename?: 'Metafield';
    /** The data stored in the resource, represented as a digest. */
    compareDigest: Scalars['String']['output'];
    /** The date and time when the metafield was created. */
    createdAt: Scalars['DateTime']['output'];
    /** The description of a metafield. */
    description?: Maybe<Scalars['String']['output']>;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The data stored in the metafield in JSON format. */
    jsonValue: Scalars['JSON']['output'];
    /** The key name for a metafield. */
    key: Scalars['String']['output'];
    /** The namespace for a metafield. */
    namespace: Scalars['String']['output'];
    /**
     * The type name of the metafield.
     * See the list of [supported types](https://shopify.dev/apps/metafields/definitions/types).
     */
    type: Scalars['String']['output'];
    /** The date and time when the metafield was updated. */
    updatedAt: Scalars['DateTime']['output'];
    /** The value of a metafield. */
    value: Scalars['String']['output'];
  };

/** Identifies a metafield by its owner resource, namespace, and key. */
export type MetafieldIdentifier = {
  __typename?: 'MetafieldIdentifier';
  /** The key of the metafield. */
  key: Scalars['String']['output'];
  /** The namespace of the metafield. */
  namespace: Scalars['String']['output'];
  /** GID of the owner resource that the metafield belongs to. */
  ownerId: Scalars['ID']['output'];
};

/** The input fields that identify metafields. */
export type MetafieldIdentifierInput = {
  /** The key of the metafield. */
  key: Scalars['String']['input'];
  /** The namespace of the metafield. */
  namespace: Scalars['String']['input'];
  /** The unique ID of the resource that the metafield is attached to. */
  ownerId: Scalars['ID']['input'];
};

/** Value type to describe the Metafield value. */
export type MetafieldValueType =
  /** A boolean metafield. */
  | 'BOOLEAN'
  /** A float. */
  | 'FLOAT'
  /** An integer. */
  | 'INTEGER'
  /** A JSON string. */
  | 'JSON_STRING'
  /** A string. */
  | 'STRING';

/** Return type for `metafieldsDelete` mutation. */
export type MetafieldsDeletePayload = {
  __typename?: 'MetafieldsDeletePayload';
  /** List of metafield identifiers that were deleted, null if the corresponding metafield isn't found. */
  deletedMetafields?: Maybe<Array<Maybe<MetafieldIdentifier>>>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<MetafieldsDeleteUserError>;
};

/** An error that occurs during the execution of `MetafieldsDelete`. */
export type MetafieldsDeleteUserError = DisplayableError & {
  __typename?: 'MetafieldsDeleteUserError';
  /** The error code. */
  code?: Maybe<MetafieldsDeleteUserErrorCode>;
  /** The index of the array element that's causing the error. */
  elementIndex?: Maybe<Scalars['Int']['output']>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Possible error codes that can be returned by `MetafieldsDeleteUserError`. */
export type MetafieldsDeleteUserErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** Owner type can't be used in this mutation. */
  | 'DISALLOWED_OWNER_TYPE'
  /** The input value is invalid. */
  | 'INVALID'
  /** The metafield delete operation failed. */
  | 'METAFIELD_DELETE_FAILED'
  /** The record with the ID used as the input value couldn't be found. */
  | 'NOT_FOUND';

/** The input fields for a metafield value to set. */
export type MetafieldsSetInput = {
  /** The `compareDigest` value obtained from a previous query. Provide this with updates to ensure the metafield is modified safely. */
  compareDigest?: InputMaybe<Scalars['String']['input']>;
  /**
   * The unique identifier for a metafield within its namespace.
   * Must be 2-64 characters long and can contain alphanumeric, hyphen, and underscore characters.
   */
  key: Scalars['String']['input'];
  /**
   * The container for a group of metafields that the metafield is or will be associated with. Used in tandem
   * with `key` to lookup a metafield on a resource, preventing conflicts with other metafields with the
   * same `key`.
   * Must be 3-255 characters long and can contain alphanumeric, hyphen, and underscore characters.
   */
  namespace: Scalars['String']['input'];
  /** The unique ID of the resource that the metafield is attached to. */
  ownerId: Scalars['ID']['input'];
  /**
   * The type of data that is stored in the metafield.
   * The type must be one of the [supported types](https://shopify.dev/apps/metafields/types).
   * Required when there is no corresponding definition for the given `namespace`, `key`, and
   * owner resource type (derived from `ownerId`).
   */
  type?: InputMaybe<Scalars['String']['input']>;
  /** The data stored in the metafield. Always stored as a string, regardless of the metafield's type. */
  value: Scalars['String']['input'];
};

/** Return type for `metafieldsSet` mutation. */
export type MetafieldsSetPayload = {
  __typename?: 'MetafieldsSetPayload';
  /** The list of metafields that were set. */
  metafields?: Maybe<Array<Metafield>>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<MetafieldsSetUserError>;
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
  /** ApiPermission metafields can only be created or updated by the app owner. */
  | 'APP_NOT_AUTHORIZED'
  /** The input value is blank. */
  | 'BLANK'
  /** Owner type can't be used in this mutation. */
  | 'DISALLOWED_OWNER_TYPE'
  /** The input value isn't included in the list. */
  | 'INCLUSION'
  /** The compareDigest is invalid. */
  | 'INVALID_COMPARE_DIGEST'
  /** The type is invalid. */
  | 'INVALID_TYPE'
  /** The value is invalid for metafield type or for definition options. */
  | 'INVALID_VALUE'
  /** The input value should be less than or equal to the maximum value allowed. */
  | 'LESS_THAN_OR_EQUAL_TO'
  /** The input value needs to be blank. */
  | 'PRESENT'
  /** The metafield has been modified since it was loaded. */
  | 'STALE_OBJECT'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** The input value is too short. */
  | 'TOO_SHORT';

/**
 * A collection of monetary values in their respective currencies. Typically used in the context of multi-currency pricing and transactions,
 * when an amount in the shop's currency is converted to the customer's currency of choice (the presentment currency).
 */
export type MoneyBag = {
  __typename?: 'MoneyBag';
  /** Amount in presentment currency. */
  presentmentMoney: MoneyV2;
  /** Amount in shop currency. */
  shopMoney: MoneyV2;
};

/** A monetary value with currency. */
export type MoneyV2 = {
  __typename?: 'MoneyV2';
  /** Decimal money amount. */
  amount: Scalars['Decimal']['output'];
  /** Currency of the money. */
  currencyCode: CurrencyCode;
};

/** This is the schema's entry point for all mutation operations. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Adds a new credit card using Apple Pay. */
  applePayCreditCardAdd?: Maybe<ApplePayCreditCardAddPayload>;
  /** Updates a credit card using Apple Pay. */
  applePayCreditCardUpdate?: Maybe<ApplePayCreditCardUpdatePayload>;
  /** Creates a new Apple Pay session. */
  applePaySessionCreate?: Maybe<ApplePaySessionCreatePayload>;
  /** Updates the information for a business contact. */
  businessContactUpdate?: Maybe<BusinessContactUpdatePayload>;
  /** Adds a new credit card to the available payment methods of a customer. */
  businessLocationCreditCardAdd?: Maybe<BusinessLocationCreditCardAddPayload>;
  /** Updates the details of a credit card for a customer. */
  businessLocationCreditCardUpdate?: Maybe<BusinessLocationCreditCardUpdatePayload>;
  /** Removes a payment instrument from a customer. */
  businessLocationPaymentInstrumentRemove?: Maybe<BusinessLocationPaymentInstrumentRemovePayload>;
  /** Updates an address on a company location. */
  companyLocationAssignAddress?: Maybe<CompanyLocationAssignAddressPayload>;
  /** Adds a new credit card to a customer's list of available payment methods. */
  creditCardAdd?: Maybe<CreditCardAddPayload>;
  /** Updates the details of a customer's credit card. */
  creditCardUpdate?: Maybe<CreditCardUpdatePayload>;
  /** Creates a new address for a customer. */
  customerAddressCreate?: Maybe<CustomerAddressCreatePayload>;
  /** Deletes a specific address for a customer. */
  customerAddressDelete?: Maybe<CustomerAddressDeletePayload>;
  /** Updates a specific address for a customer. */
  customerAddressUpdate?: Maybe<CustomerAddressUpdatePayload>;
  /** Subscribes the customer's email to marketing. */
  customerEmailMarketingOptIn?: Maybe<CustomerEmailMarketingOptInPayload>;
  /** Subscribes the customer to email marketing. */
  customerEmailMarketingSubscribe?: Maybe<CustomerEmailMarketingSubscribePayload>;
  /** Unsubscribes the customer from email marketing. */
  customerEmailMarketingUnsubscribe?: Maybe<CustomerEmailMarketingUnsubscribePayload>;
  /** Updates the customer's personal information. */
  customerUpdate?: Maybe<CustomerUpdatePayload>;
  /** Adds a new credit card by using Google Pay. */
  googlePayCreditCardAdd?: Maybe<GooglePayCreditCardAddPayload>;
  /** Updates a credit card using Google Pay. */
  googlePayCreditCardUpdate?: Maybe<GooglePayCreditCardUpdatePayload>;
  /** Deletes multiple metafields in bulk. */
  metafieldsDelete?: Maybe<MetafieldsDeletePayload>;
  /**
   * Sets metafield values. Metafield values will be set regardless if they were previously created or not.
   *
   * Allows a maximum of 25 metafields to be set at a time.
   *
   * This operation is atomic, meaning no changes are persisted if an error is encountered.
   *
   * As of `2024-07`, this operation supports compare-and-set functionality to better handle concurrent requests.
   * If `compareDigest` is set for any metafield, the mutation will only set that metafield if the persisted metafield value matches the digest used on `compareDigest`.
   * If the metafield doesn't exist yet, but you want to guarantee that the operation will run in a safe manner, set `compareDigest` to `null`.
   * The `compareDigest` value can be acquired by querying the metafield object and selecting `compareDigest` as a field.
   * If the `compareDigest` value does not match the digest for the persisted value, the mutation will return an error.
   * You can opt out of write guarantees by not sending `compareDigest` in the request.
   */
  metafieldsSet?: Maybe<MetafieldsSetPayload>;
  /** Request a new return on behalf of a customer. */
  orderRequestReturn?: Maybe<OrderRequestReturnPayload>;
  /** Removes a payment instrument from a customer's account. */
  paymentInstrumentRemove?: Maybe<PaymentInstrumentRemovePayload>;
  /** Updates a customer's default payment instrument. */
  paymentInstrumentUpdateDefault?: Maybe<PaymentInstrumentUpdateDefaultPayload>;
  /** Connects a customer's PayPal account for use as a payment method. */
  paypalAccountEnable?: Maybe<PaypalAccountEnablePayload>;
  /** Creates a PayPal Express token. */
  paypalTokenCreate?: Maybe<PaypalTokenCreatePayload>;
  /** Resends a gift card to the customer. */
  resendGiftCard?: Maybe<ResendGiftCardPayload>;
  /** Provides a URL that enables the customer to update a Shop Pay credit card. */
  shopPayCreditCardGetUpdateUrl?: Maybe<ShopPayCreditCardGetUpdateUrlPayload>;
  /**
   * Exchanges the Customer Access Token, provided in the Authorization header, into a Storefront Customer Access Token.
   * Renew this token each time you update the Customer Access Token found in the Authorization header.
   * @deprecated The `storefrontCustomerAccessTokenCreate` is deprecated and will be removed in a future version. Please see [the changelog](https://shopify.dev/changelog/deprecation-of-storefrontcustomeraccesstokencreate-mutation) for more information.
   */
  storefrontCustomerAccessTokenCreate?: Maybe<StorefrontCustomerAccessTokenCreatePayload>;
  /** Skips a Subscription Billing Cycle. */
  subscriptionBillingCycleSkip?: Maybe<SubscriptionBillingCycleSkipPayload>;
  /** Unskips a Subscription Billing Cycle. */
  subscriptionBillingCycleUnskip?: Maybe<SubscriptionBillingCycleUnskipPayload>;
  /** Activates a Subscription Contract. Contract status must be either active, paused, or failed. */
  subscriptionContractActivate?: Maybe<SubscriptionContractActivatePayload>;
  /** Cancels a Subscription Contract. */
  subscriptionContractCancel?: Maybe<SubscriptionContractCancelPayload>;
  /** Changes the payment instrument used for future billing cycles of a Subscription Contract. */
  subscriptionContractChangePaymentInstrument?: Maybe<SubscriptionContractChangePaymentInstrumentPayload>;
  /** Fetches the available delivery options for a Subscription Contract. */
  subscriptionContractFetchDeliveryOptions?: Maybe<SubscriptionContractFetchDeliveryOptionsPayload>;
  /** Pauses a Subscription Contract. */
  subscriptionContractPause?: Maybe<SubscriptionContractPausePayload>;
  /** Selects an option from a delivery options result and updates the delivery method on a Subscription Contract. */
  subscriptionContractSelectDeliveryMethod?: Maybe<SubscriptionContractSelectDeliveryMethodPayload>;
};

/** This is the schema's entry point for all mutation operations. */
export type MutationApplePayCreditCardAddArgs = {
  applePayTokenizedCard: Scalars['String']['input'];
  billingAddress: ApplePayBillingAddressInput;
  displayLastDigits?: InputMaybe<Scalars['String']['input']>;
};

/** This is the schema's entry point for all mutation operations. */
export type MutationApplePayCreditCardUpdateArgs = {
  applePayTokenizedCard: Scalars['String']['input'];
  billingAddress: ApplePayBillingAddressInput;
  displayLastDigits?: InputMaybe<Scalars['String']['input']>;
  paymentMethodId: Scalars['ID']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationApplePaySessionCreateArgs = {
  resourceId: Scalars['String']['input'];
  validationUrl: Scalars['String']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationBusinessContactUpdateArgs = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
  input: BusinessContactUpdateInput;
};

/** This is the schema's entry point for all mutation operations. */
export type MutationBusinessLocationCreditCardAddArgs = {
  billingAddress: CustomerMailingAddressInput;
  companyLocationId: Scalars['ID']['input'];
  sessionId: Scalars['String']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationBusinessLocationCreditCardUpdateArgs = {
  billingAddress: CustomerMailingAddressInput;
  companyLocationId: Scalars['ID']['input'];
  paymentMethodId: Scalars['ID']['input'];
  sessionId: Scalars['String']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationBusinessLocationPaymentInstrumentRemoveArgs = {
  companyLocationId: Scalars['ID']['input'];
  paymentInstrumentId: Scalars['ID']['input'];
  replacementPaymentInstrumentId?: InputMaybe<Scalars['ID']['input']>;
};

/** This is the schema's entry point for all mutation operations. */
export type MutationCompanyLocationAssignAddressArgs = {
  address: CompanyAddressInput;
  addressTypes: Array<CompanyAddressType>;
  locationId: Scalars['ID']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationCreditCardAddArgs = {
  billingAddress: CustomerMailingAddressInput;
  default?: InputMaybe<Scalars['Boolean']['input']>;
  sessionId: Scalars['String']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationCreditCardUpdateArgs = {
  billingAddress: CustomerMailingAddressInput;
  paymentMethodId: Scalars['ID']['input'];
  sessionId: Scalars['String']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationCustomerAddressCreateArgs = {
  address: CustomerAddressInput;
  defaultAddress?: InputMaybe<Scalars['Boolean']['input']>;
};

/** This is the schema's entry point for all mutation operations. */
export type MutationCustomerAddressDeleteArgs = {
  addressId: Scalars['ID']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationCustomerAddressUpdateArgs = {
  address?: InputMaybe<CustomerAddressInput>;
  addressId: Scalars['ID']['input'];
  defaultAddress?: InputMaybe<Scalars['Boolean']['input']>;
};

/** This is the schema's entry point for all mutation operations. */
export type MutationCustomerUpdateArgs = {
  input: CustomerUpdateInput;
};

/** This is the schema's entry point for all mutation operations. */
export type MutationGooglePayCreditCardAddArgs = {
  billingAddress: GooglePayBillingAddressInput;
  googlePayTokenizedCard: Scalars['String']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationGooglePayCreditCardUpdateArgs = {
  billingAddress: GooglePayBillingAddressInput;
  googlePayTokenizedCard: Scalars['String']['input'];
  paymentMethodId: Scalars['ID']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationMetafieldsDeleteArgs = {
  metafields: Array<MetafieldIdentifierInput>;
};

/** This is the schema's entry point for all mutation operations. */
export type MutationMetafieldsSetArgs = {
  metafields: Array<MetafieldsSetInput>;
};

/** This is the schema's entry point for all mutation operations. */
export type MutationOrderRequestReturnArgs = {
  orderId: Scalars['ID']['input'];
  requestedLineItems: Array<RequestedLineItemInput>;
};

/** This is the schema's entry point for all mutation operations. */
export type MutationPaymentInstrumentRemoveArgs = {
  paymentInstrumentId: Scalars['ID']['input'];
  replacementPaymentInstrumentId?: InputMaybe<Scalars['ID']['input']>;
};

/** This is the schema's entry point for all mutation operations. */
export type MutationPaymentInstrumentUpdateDefaultArgs = {
  default: Scalars['Boolean']['input'];
  paymentInstrumentId: Scalars['ID']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationPaypalAccountEnableArgs = {
  paypalPayerId: Scalars['String']['input'];
  paypalToken: Scalars['String']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationResendGiftCardArgs = {
  orderId: Scalars['ID']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationShopPayCreditCardGetUpdateUrlArgs = {
  paymentMethodId: Scalars['ID']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationSubscriptionBillingCycleSkipArgs = {
  billingCycleInput: SubscriptionBillingCycleInput;
};

/** This is the schema's entry point for all mutation operations. */
export type MutationSubscriptionBillingCycleUnskipArgs = {
  billingCycleInput: SubscriptionBillingCycleInput;
};

/** This is the schema's entry point for all mutation operations. */
export type MutationSubscriptionContractActivateArgs = {
  subscriptionContractId: Scalars['ID']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationSubscriptionContractCancelArgs = {
  subscriptionContractId: Scalars['ID']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationSubscriptionContractChangePaymentInstrumentArgs = {
  paymentInstrumentId: Scalars['ID']['input'];
  subscriptionContractId: Scalars['ID']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationSubscriptionContractFetchDeliveryOptionsArgs = {
  address?: InputMaybe<CustomerAddressInput>;
  deliveryAddress?: InputMaybe<CustomerMailingAddressInput>;
  subscriptionContractId: Scalars['ID']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationSubscriptionContractPauseArgs = {
  subscriptionContractId: Scalars['ID']['input'];
};

/** This is the schema's entry point for all mutation operations. */
export type MutationSubscriptionContractSelectDeliveryMethodArgs = {
  deliveryMethodInput: SubscriptionDeliveryMethodInput;
  subscriptionContractId: Scalars['ID']['input'];
  subscriptionDeliveryOptionsResultToken: Scalars['String']['input'];
};

/**
 * An object with an ID field to support global identification, in accordance with the
 * [Relay specification](https://relay.dev/graphql/objectidentification.htm#sec-Node-Interface).
 * This interface is used by the [node](https://shopify.dev/api/admin-graphql/unstable/queries/node)
 * and [nodes](https://shopify.dev/api/admin-graphql/unstable/queries/nodes) queries.
 */
export type Node = {
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
};

/** A customer’s completed request to purchase one or more products from a shop. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type Order = HasMetafields &
  Node & {
    __typename?: 'Order';
    /** A list of sales agreements associated with the order. */
    agreements: SalesAgreementConnection;
    /** The mailing address provided by the customer. Not all orders have a mailing address. */
    billingAddress?: Maybe<CustomerAddress>;
    /** The reason for the cancellation of the order. Returns `null` if the order wasn't canceled. */
    cancelReason?: Maybe<OrderCancelReason>;
    /**
     * The date and time when the order was canceled.
     * Returns `null` if the order wasn't canceled.
     */
    cancelledAt?: Maybe<Scalars['DateTime']['output']>;
    /** The checkout token associated with this order. */
    checkoutToken?: Maybe<Scalars['String']['output']>;
    /**
     * A randomly generated alpha-numeric identifier for the order that may be shown to the customer
     * instead of the sequential order name. For example, "XPAV284CT", "R50KELTJP" or "35PKUN0UJ".
     * This value isn't guaranteed to be unique.
     */
    confirmationNumber?: Maybe<Scalars['String']['output']>;
    /** The date and time when the order was created. */
    createdAt: Scalars['DateTime']['output'];
    /** The shop currency when the order was placed. */
    currencyCode: CurrencyCode;
    /** The list of custom attributes associated with the order. */
    customAttributes: Array<Attribute>;
    /** The customer who placed the order. */
    customer?: Maybe<Customer>;
    /** The locale code representing the region where this specific order was placed. */
    customerLocale?: Maybe<Scalars['String']['output']>;
    /** The discounts that have been applied to the order. */
    discountApplications: DiscountApplicationConnection;
    /** The discount information for the order, including line-level discount applications. */
    discountInformation: OrderDiscountInformation;
    /** The draft order associated with the order. */
    draftOrder?: Maybe<DraftOrder>;
    /** The name of the associated draft order. */
    draftOrderName?: Maybe<Scalars['String']['output']>;
    /** The edit summary of the order. */
    editSummary?: Maybe<OrderEditSummary>;
    /** Whether the order has been edited or not. */
    edited: Scalars['Boolean']['output'];
    /** The email address of the customer. */
    email?: Maybe<Scalars['String']['output']>;
    /** The financial status of the order. */
    financialStatus?: Maybe<OrderFinancialStatus>;
    /** The fulfillment status of the order. */
    fulfillmentStatus: OrderFulfillmentStatus;
    /** The fulfillments associated with the order. */
    fulfillments: FulfillmentConnection;
    /** Whether the customer has an email address. */
    hasEmail: Scalars['Boolean']['output'];
    /** Whether the order has multiple fulfillments. */
    hasMultipleFulfillments: Scalars['Boolean']['output'];
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The delivery or estimated delivery date of the latest fulfillment. */
    latestFulfillmentDeliveryDate?: Maybe<Scalars['DateTime']['output']>;
    /** The merchandise lines marked as fees with total value, aggregated by title. */
    legacyAggregatedMerchandiseTermsAsFees: Array<LegacyAggregatedMerchandiseTermsAsFees>;
    /** Whether or not products marked as fees should be rendered as money lines. */
    legacyRepresentProductsAsFees: Scalars['Boolean']['output'];
    /** The price of the order before duties, shipping, taxes, and fees. */
    legacySubtotalWithoutFees?: Maybe<MoneyV2>;
    /** The list of the order's line item containers (e.g., Unfulfilled). */
    lineItemContainers: Array<LineItemContainer>;
    /** The list of line items of the order. */
    lineItems: LineItemConnection;
    /** The summary of the quantity of line items for the order. */
    lineItemsSummary?: Maybe<OrderLineItemsSummary>;
    /** The name of the fulfillment location assigned at the time of order creation. */
    locationName?: Maybe<Scalars['String']['output']>;
    /** The market that includes the order's shipping address. Or the shop's primary market if the shipping address is empty. */
    market: Market;
    /** A metafield found by namespace and key. */
    metafield?: Maybe<Metafield>;
    /**
     * The metafields associated with the resource matching the
     * supplied list of namespaces and keys.
     */
    metafields: Array<Maybe<Metafield>>;
    /**
     * The identifier for the order that appears on the order.
     * For example, _#1000_ or _Store1001.
     */
    name: Scalars['String']['output'];
    /** The order's notes. */
    note?: Maybe<Scalars['String']['output']>;
    /** A unique numeric identifier for the order, used by both the shop owner and customer. */
    number: Scalars['Int']['output'];
    /** The list of metafields associated with the order receipt. */
    orderReceiptMetafields: Array<Metafield>;
    /** The payment information for the order. */
    paymentInformation?: Maybe<OrderPaymentInformation>;
    /** Represents the merchant configured payment terms. */
    paymentTermsTemplate?: Maybe<PaymentTermsTemplate>;
    /** The phone number of the customer for SMS notifications. */
    phone?: Maybe<Scalars['String']['output']>;
    /** The pickup information for the order. */
    pickupInformation?: Maybe<OrderPickupInformation>;
    /** The purchase order number of the order. */
    poNumber?: Maybe<Scalars['String']['output']>;
    /**
     * The date and time when the order was processed.
     * This value can be set to dates in the past when importing from other systems.
     * If no value is provided, it will be auto-generated based on current date and time.
     */
    processedAt: Scalars['DateTime']['output'];
    /** The purchasing entity for the order. */
    purchasingEntity?: Maybe<PurchasingEntity>;
    /** A list of refunds associated with the order. */
    refunds: Array<Refund>;
    /** The path to recreate the order in the cart and redirect to checkout. Will return nil if the line item count exceeds 100. */
    reorderPath?: Maybe<Scalars['String']['output']>;
    /** Whether the order requires shipping. */
    requiresShipping: Scalars['Boolean']['output'];
    /** A Return identified by ID. */
    return?: Maybe<Return>;
    /** The list of returns for the order with pagination. */
    returns: ReturnConnection;
    /** The mailing address to which the order items are shipped. */
    shippingAddress?: Maybe<CustomerAddress>;
    /** The discounts that have been allocated onto the shipping line by discount applications. */
    shippingDiscountAllocations: Array<DiscountAllocation>;
    /** A summary of all shipping costs on the order. */
    shippingLine?: Maybe<ShippingLine>;
    /** The list of shipping line groups for the order. */
    shippingLineGroups: Array<OrderShippingLineGroup>;
    /** A summary of the shipping titles for the order. */
    shippingTitle?: Maybe<Scalars['String']['output']>;
    /** The various fields for subscribing to order updates via Shop Pay. */
    shopAppLinksAndResources?: Maybe<ShopAppLinksAndResources>;
    /** The totals and quantities for the order, ignoring returns. */
    soldInformation: OrderSoldInformation;
    /** The unique URL for the status page of the order. */
    statusPageUrl: Scalars['URL']['output'];
    /** The customer Subscription Contracts associated with the order. */
    subscriptionContracts?: Maybe<SubscriptionContractConnection>;
    /** The price of the order before duties, shipping, and taxes. */
    subtotal?: Maybe<MoneyV2>;
    /** The price of the order before order-level discounts, duties, shipping. It includes taxes in  tax-inclusive orders. */
    subtotalBeforeDiscounts?: Maybe<MoneyV2>;
    /** A list of tax invoices associated with the order. */
    taxInvoices: Array<TaxInvoice>;
    /** The total cost of shipping after discounts. */
    totalDiscountedShipping: MoneyV2;
    /** The total amount of duties after returns. */
    totalDuties?: Maybe<MoneyV2>;
    /** The total duties and duties status. */
    totalDutiesSummary?: Maybe<OrderDutiesSummary>;
    /** The total amount of the order (including taxes and discounts) minus the amounts for line items that have been returned. */
    totalPrice: MoneyV2;
    /** The total amount refunded. */
    totalRefunded: MoneyV2;
    /** The total cost of shipping. */
    totalShipping: MoneyV2;
    /** The total cost of taxes. */
    totalTax?: Maybe<MoneyV2>;
    /** The total value of tips. */
    totalTip?: Maybe<MoneyV2>;
    /** A list of transactions associated with the order. */
    transactions: Array<OrderTransaction>;
    /** The date and time when the order was last updated. */
    updatedAt: Scalars['DateTime']['output'];
  };

/** A customer’s completed request to purchase one or more products from a shop. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type OrderAgreementsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A customer’s completed request to purchase one or more products from a shop. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type OrderDiscountApplicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A customer’s completed request to purchase one or more products from a shop. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type OrderFulfillmentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<FulfillmentSortKeys>;
};

/** A customer’s completed request to purchase one or more products from a shop. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type OrderLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A customer’s completed request to purchase one or more products from a shop. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type OrderMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

/** A customer’s completed request to purchase one or more products from a shop. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type OrderMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** A customer’s completed request to purchase one or more products from a shop. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type OrderReturnArgs = {
  id: Scalars['ID']['input'];
};

/** A customer’s completed request to purchase one or more products from a shop. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type OrderReturnsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ReturnSortKeys>;
};

/** A customer’s completed request to purchase one or more products from a shop. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
export type OrderSubscriptionContractsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<SubscriptionContractsSortKeys>;
};

/**
 * The possible order action types for a
 * [sales agreement](https://shopify.dev/api/admin-graphql/latest/interfaces/salesagreement).
 */
export type OrderActionType =
  /** An order with a purchase or charge. */
  | 'ORDER'
  /** An edit to the order. */
  | 'ORDER_EDIT'
  /** A refund on the order. */
  | 'REFUND'
  /** A return on the order. */
  | 'RETURN'
  /** An unknown agreement action. Represents new actions that may be added in future versions. */
  | 'UNKNOWN';

/** An agreement associated with an order placement. */
export type OrderAgreement = Node &
  SalesAgreement & {
    __typename?: 'OrderAgreement';
    /** The date and time when the agreement occurred. */
    happenedAt: Scalars['DateTime']['output'];
    /** The unique ID for the agreement. */
    id: Scalars['ID']['output'];
    /** The order associated with the agreement. */
    order: Order;
    /** The reason the agreement was created. */
    reason: OrderActionType;
    /** The sales associated with the agreement. */
    sales: SaleConnection;
  };

/** An agreement associated with an order placement. */
export type OrderAgreementSalesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The information about all discounts applied to a specific order. */
export type OrderAllDiscounts = {
  __typename?: 'OrderAllDiscounts';
  /** The type of the discount application. */
  discountApplicationType: DiscountApplicationType;
  /** The value of the applied discount. */
  discountValue: MoneyV2;
  /** The type of line to which the discount applies. */
  targetType: DiscountApplicationTargetType;
  /** The discount's name that displays to merchants in the Shopify admin and to customers. */
  title?: Maybe<Scalars['String']['output']>;
};

/** The set of valid sort keys for the OrderByCompany query. */
export type OrderByCompanySortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `order_number` value. */
  | 'ORDER_NUMBER'
  /** Sort by the `processed_at` value. */
  | 'PROCESSED_AT'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE'
  /** Sort by the `total_price` value. */
  | 'TOTAL_PRICE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The set of valid sort keys for the OrderByContact query. */
export type OrderByContactSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `order_number` value. */
  | 'ORDER_NUMBER'
  /** Sort by the `processed_at` value. */
  | 'PROCESSED_AT'
  /** Sort by the `purchasing_company_location_name` value. */
  | 'PURCHASING_COMPANY_LOCATION_NAME'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE'
  /** Sort by the `total_price` value. */
  | 'TOTAL_PRICE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The set of valid sort keys for the OrderByLocation query. */
export type OrderByLocationSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `order_number` value. */
  | 'ORDER_NUMBER'
  /** Sort by the `processed_at` value. */
  | 'PROCESSED_AT'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE'
  /** Sort by the `total_price` value. */
  | 'TOTAL_PRICE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The reason for the cancellation of the order. */
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

/** An auto-generated type for paginating through multiple Orders. */
export type OrderConnection = {
  __typename?: 'OrderConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<OrderEdge>;
  /** A list of nodes that are contained in OrderEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<Order>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An order that redacts data if the requester does not have authorization to view it. */
export type OrderDetailsPageOrder = Order | PublicOrder;

/** The disount information for a specific order. */
export type OrderDiscountInformation = {
  __typename?: 'OrderDiscountInformation';
  /** The discount information for the order, including line_level discount applications. */
  allAppliedDiscounts: Array<OrderAllDiscounts>;
  /** The order level discount information for the order. */
  allOrderLevelAppliedDiscounts: Array<OrderAllDiscounts>;
  /** The order level discount information for the order. */
  allOrderLevelAppliedDiscountsOnSoldItems: Array<OrderAllDiscounts>;
  /** Total discounts for the order. */
  totalDiscounts: MoneyV2;
  /** The current order-level discount amount after all order updates. */
  totalOrderLevelAppliedDiscounts: MoneyV2;
};

/** The status of duties for the order. */
export type OrderDutiesStatusType =
  /** The order is being shipped from another country, so duties and taxes may be charged on delivery. */
  | 'DUTIES_ERROR'
  /** The order is being shipped from another country, so duties have been added to the order total. */
  | 'DUTIES_OK'
  /** The order is being shipped from another country. Duties are not charged on orders of this value. */
  | 'DUTIES_ZERO';

/** The summary of duties associated with an order. */
export type OrderDutiesSummary = {
  __typename?: 'OrderDutiesSummary';
  /** The total amount of duties for the order. */
  totalDuties?: Maybe<MoneyV2>;
  /** The status of duties for the order. */
  totalDutiesStatus?: Maybe<OrderDutiesStatusType>;
};

/** An auto-generated type which holds one Order and a cursor during pagination. */
export type OrderEdge = {
  __typename?: 'OrderEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of OrderEdge. */
  node: Order;
};

/** An agreement related to an edit of the order. */
export type OrderEditAgreement = Node &
  SalesAgreement & {
    __typename?: 'OrderEditAgreement';
    /** The date and time when the agreement occurred. */
    happenedAt: Scalars['DateTime']['output'];
    /** The unique ID for the agreement. */
    id: Scalars['ID']['output'];
    /** The reason the agreement was created. */
    reason: OrderActionType;
    /** The sales associated with the agreement. */
    sales: SaleConnection;
  };

/** An agreement related to an edit of the order. */
export type OrderEditAgreementSalesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The edit summary associated with an order. */
export type OrderEditSummary = {
  __typename?: 'OrderEditSummary';
  /** The edit changes of the order. */
  changes: Array<OrderEditSummaryChange>;
  /** The date and time of the latest edit. */
  latestHappenedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** A change in the edit summary of an order. */
export type OrderEditSummaryChange = Node & {
  __typename?: 'OrderEditSummaryChange';
  /** The quantity delta of the change. */
  delta: Scalars['Int']['output'];
  /** The handle that describes the change type. */
  handle?: Maybe<Scalars['String']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The line item associated with the change. */
  lineItem: LineItem;
};

/** Represents the order's current financial status. */
export type OrderFinancialStatus =
  /** Displayed as **Authorized**. */
  | 'AUTHORIZED'
  /** Displayed as **Expired**. */
  | 'EXPIRED'
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

/** The aggregation of each order's active fulfillments and opened fulfillment orders for display purposes. */
export type OrderFulfillmentStatus =
  /** Attempted to deliver the fulfillment. */
  | 'ATTEMPTED_TO_DELIVER'
  /** The order is confirmed. */
  | 'CONFIRMED'
  /** Every physical fulfillment of the order has been successfully delivered. */
  | 'DELIVERED'
  /** The order has one fulfillment in transit. */
  | 'IN_TRANSIT'
  /** This order has multiple physical fulfillments with differing statuses. */
  | 'MULTIPLE_SHIPMENTS'
  /** The order has one fulfillment on its way. */
  | 'ON_ITS_WAY'
  /** The order has one fulfillment out for delivery. */
  | 'OUT_FOR_DELIVERY'
  /** The order has been picked up. */
  | 'PICKED_UP'
  /** The order has one fulfillment being prepared for shipping. */
  | 'PREPARING_FOR_SHIPPING'
  /** The order is ready to be picked up. */
  | 'READY_FOR_PICKUP'
  /** There was a problem with the fulfillment. */
  | 'THERE_WAS_A_PROBLEM';

/** The quantitative information about the line items of a specific order. */
export type OrderLineItemsSummary = {
  __typename?: 'OrderLineItemsSummary';
  /** The number of line items in the order. */
  lineItemCount: Scalars['Int']['output'];
  /** The total quantity of all legacy fees in the order. */
  totalQuantityOfLegacyFeesLineItems: Scalars['Int']['output'];
  /** The total quantity of all line items in the order. */
  totalQuantityOfLineItems: Scalars['Int']['output'];
  /** The total quantity of all tips in the order. */
  totalQuantityOfTipLineItems: Scalars['Int']['output'];
};

/** The summary of payment status information for the order. */
export type OrderPaymentInformation = {
  __typename?: 'OrderPaymentInformation';
  /** The URL for collecting a payment on the order. */
  paymentCollectionUrl?: Maybe<Scalars['URL']['output']>;
  /** The financial status of the order. */
  paymentStatus?: Maybe<OrderPaymentStatus>;
  /** The payment terms linked with the order. */
  paymentTerms?: Maybe<PaymentTerms>;
  /** The total amount that's yet to be transacted for the order. */
  totalOutstandingAmount: MoneyV2;
  /** The total amount that has been paid for the order before any refund. */
  totalPaidAmount: MoneyV2;
};

/** The current payment status of the order. */
export type OrderPaymentStatus =
  /** The payment has been authorized. */
  | 'AUTHORIZED'
  /** The payment has expired. */
  | 'EXPIRED'
  /** The payment has been paid. */
  | 'PAID'
  /** The payment has been partially paid. */
  | 'PARTIALLY_PAID'
  /** The payment has been partially refunded. */
  | 'PARTIALLY_REFUNDED'
  /** The payment is pending. */
  | 'PENDING'
  /** The payment has been refunded. */
  | 'REFUNDED'
  /** The payment has been voided. */
  | 'VOIDED';

/** The pickup information associated with an order. */
export type OrderPickupInformation = {
  __typename?: 'OrderPickupInformation';
  /** The pickup address for the order. */
  address?: Maybe<PickupAddress>;
  /** The date and time when the pickup order was created. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The pickup status for the order. */
  status?: Maybe<PickupStatus>;
  /** The date and time when the pickup order was updated. */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Return type for `orderRequestReturn` mutation. */
export type OrderRequestReturnPayload = {
  __typename?: 'OrderRequestReturnPayload';
  /** The return request that has been made. */
  return?: Maybe<Return>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ReturnUserError>;
};

/** The group including the shipping lines of the order. */
export type OrderShippingLineGroup = {
  __typename?: 'OrderShippingLineGroup';
  /** The type of the shipping group. */
  groupType: DeliveryOptionGroupType;
  /** The price of the shipping method after discounts. */
  lineAmountAfterDiscounts: MoneyV2;
};

/** A summary that regroups totals for an order, including the line items that have been returned. */
export type OrderSoldInformation = {
  __typename?: 'OrderSoldInformation';
  /** The total quantity of line items in the order, including the quantities for line items that have been returned. */
  quantity: Scalars['Int']['output'];
  /** The total quantity of line items in the order that were refunded, even if the totalRefunded amount was zero. */
  refundedQuantity: Scalars['Int']['output'];
  /** The total amount of the order (before shipping and discounts), including the amounts for line items that have been returned. */
  subtotal?: Maybe<MoneyV2>;
  /** The total amount of the order (including taxes and discounts), including the amounts for line items that have been returned. */
  total?: Maybe<MoneyV2>;
  /** The total discount amount for the order, including the amounts for line items that have been returned. */
  totalDiscount?: Maybe<MoneyV2>;
  /** The total tax amount of the order, including the amounts for line items that have been returned. */
  totalTaxes?: Maybe<MoneyV2>;
};

/** The set of valid sort keys for the Order query. */
export type OrderSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `order_number` value. */
  | 'ORDER_NUMBER'
  /** Sort by the `processed_at` value. */
  | 'PROCESSED_AT'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE'
  /** Sort by the `total_price` value. */
  | 'TOTAL_PRICE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** A payment transaction within an order context. */
export type OrderTransaction = Node &
  PaymentIcon & {
    __typename?: 'OrderTransaction';
    /** The date and time when the transaction was created. */
    createdAt: Scalars['DateTime']['output'];
    /** The gift card details for the transaction. */
    giftCardDetails?: Maybe<GiftCardDetails>;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The kind of the transaction. */
    kind?: Maybe<OrderTransactionKind>;
    /** The payment details for the transaction. */
    paymentDetails?: Maybe<PaymentDetails>;
    /** The payment icon to display for the transaction. */
    paymentIcon?: Maybe<PaymentIconImage>;
    /** The date and time when the transaction was processed. */
    processedAt?: Maybe<Scalars['DateTime']['output']>;
    /** The status of the transaction. */
    status?: Maybe<OrderTransactionStatus>;
    /** The amount and currency of the transaction in shop and presentment currencies. */
    transactionAmount: MoneyBag;
    /** The ID of the parent transaction. */
    transactionParentId?: Maybe<Scalars['String']['output']>;
    /** The type of the transaction. */
    type: OrderTransactionType;
    /** The details of the transaction type. */
    typeDetails?: Maybe<TransactionTypeDetails>;
  };

/** The kind of order transaction. */
export type OrderTransactionKind =
  /** An authorization transaction. */
  | 'AUTHORIZATION'
  /** A capture transaction. */
  | 'CAPTURE'
  /** A card approval transaction. */
  | 'CARD_APPROVAL'
  /** A card decline transaction. */
  | 'CARD_DECLINE'
  /** A change transaction. */
  | 'CHANGE'
  /** An EMV authorization transaction. */
  | 'EMV_AUTHORIZATION'
  /** A refund transaction. */
  | 'REFUND'
  /** A refund EMV initiate transaction. */
  | 'REFUND_EMV_INITIATE'
  /** A sale transaction. */
  | 'SALE'
  /** A suggested refund transaction. */
  | 'SUGGESTED_REFUND'
  /** A void transaction. */
  | 'VOID';

/** Represents the status of an order transaction. */
export type OrderTransactionStatus =
  /** The transaction has an error. */
  | 'ERROR'
  /** The transaction has failed. */
  | 'FAILURE'
  /** The transaction is pending. */
  | 'PENDING'
  /** The transaction is pending authentication. */
  | 'PENDING_AUTHENTICATION'
  /** The transaction is successful. */
  | 'SUCCESS';

/** The type of order transaction. */
export type OrderTransactionType =
  /** A bank deposit transaction. */
  | 'BANK_DEPOSIT'
  /** A card transaction. */
  | 'CARD'
  /** A cash on delivery transaction. */
  | 'CASH_ON_DELIVERY'
  /** A custom payment transaction. */
  | 'CUSTOM'
  /** A gift card transaction. */
  | 'GIFT_CARD'
  /** A generic manual transaction. */
  | 'MANUAL'
  /** A money order transaction. */
  | 'MONEY_ORDER'
  /** A Shopify installments transaction. */
  | 'SHOPIFY_INSTALLMENTS'
  /** A store credit transaction. */
  | 'STORE_CREDIT';

/**
 * Returns information about pagination in a connection, in accordance with the
 * [Relay specification](https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo).
 * For more information, please read our [GraphQL Pagination Usage Guide](https://shopify.dev/api/usage/pagination-graphql).
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

/** Payment details related to a transaction. */
export type PaymentDetails = CardPaymentDetails;

/** The payment icon to display for the transaction. */
export type PaymentIcon = {
  /** The payment icon to display for the transaction. */
  paymentIcon?: Maybe<PaymentIconImage>;
};

/** Represents an image resource. */
export type PaymentIconImage = Node & {
  __typename?: 'PaymentIconImage';
  /** A word or phrase to share the nature or contents of an image. */
  altText?: Maybe<Scalars['String']['output']>;
  /** The original height of the image in pixels. Returns `null` if the image isn't hosted by Shopify. */
  height?: Maybe<Scalars['Int']['output']>;
  /** A unique non-nullable ID for the image. */
  id: Scalars['ID']['output'];
  /**
   * The location of the original image as a URL.
   *
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
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
   */
  url: Scalars['URL']['output'];
  /** The original width of the image in pixels. Returns `null` if the image isn't hosted by Shopify. */
  width?: Maybe<Scalars['Int']['output']>;
};

/** Represents an image resource. */
export type PaymentIconImageTransformedSrcArgs = {
  crop?: InputMaybe<CropRegion>;
  maxHeight?: InputMaybe<Scalars['Int']['input']>;
  maxWidth?: InputMaybe<Scalars['Int']['input']>;
  preferredContentType?: InputMaybe<ImageContentType>;
  scale?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents an image resource. */
export type PaymentIconImageUrlArgs = {
  transform?: InputMaybe<ImageTransformInput>;
};

/** A payment instrument. */
export type PaymentInstrument = {
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
};

/** The billing address associated with a credit card payment instrument. */
export type PaymentInstrumentBillingAddress = {
  __typename?: 'PaymentInstrumentBillingAddress';
  /** The first line of the address, typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']['output']>;
  /** The second line of the address, typically the apartment, suite, or unit number. */
  address2?: Maybe<Scalars['String']['output']>;
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']['output']>;
  /** The name of the country. */
  country?: Maybe<Scalars['String']['output']>;
  /** The two-letter code for the country of the address, for example, US. */
  countryCode?: Maybe<CountryCode>;
  /** The first name in the address. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** The last name in the address. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** The region of the address, such as the province, state, or district. */
  province?: Maybe<Scalars['String']['output']>;
  /** The alphanumeric code for the region, for example, ON. */
  provinceCode?: Maybe<Scalars['String']['output']>;
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars['String']['output']>;
};

/** Return type for `paymentInstrumentRemove` mutation. */
export type PaymentInstrumentRemovePayload = {
  __typename?: 'PaymentInstrumentRemovePayload';
  /** The ID of the deleted payment instrument. */
  deletedPaymentInstrumentId?: Maybe<Scalars['ID']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsPaymentInstrumentUserErrors>;
};

/** Return type for `paymentInstrumentUpdateDefault` mutation. */
export type PaymentInstrumentUpdateDefaultPayload = {
  __typename?: 'PaymentInstrumentUpdateDefaultPayload';
  /** The ID of the updated payment instrument. */
  updatedPaymentInstrumentId?: Maybe<Scalars['ID']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsPaymentInstrumentUserErrors>;
};

/** The types of credit card wallets. */
export type PaymentInstrumentWalletType =
  /** The credit card is an Apple Pay wallet. */
  | 'APPLE_PAY'
  /** The credit card is a Google Pay wallet. */
  | 'GOOGLE_PAY'
  /** The credit card is a Shop Pay wallet. */
  | 'SHOP_PAY';

/** A single payment schedule defined in the payment terms. */
export type PaymentSchedule = Node & {
  __typename?: 'PaymentSchedule';
  /**
   * The amount owed for this payment schedule.
   * @deprecated Use `totalBalance` instead.
   */
  amount: MoneyV2;
  /** Whether the payment has been completed. */
  completed: Scalars['Boolean']['output'];
  /** The date and time when the payment schedule was paid or fulfilled. */
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The date and time when the payment schedule is due. */
  dueAt?: Maybe<Scalars['DateTime']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
};

/** An auto-generated type for paginating through multiple PaymentSchedules. */
export type PaymentScheduleConnection = {
  __typename?: 'PaymentScheduleConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<PaymentScheduleEdge>;
  /** A list of nodes that are contained in PaymentScheduleEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<PaymentSchedule>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one PaymentSchedule and a cursor during pagination. */
export type PaymentScheduleEdge = {
  __typename?: 'PaymentScheduleEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of PaymentScheduleEdge. */
  node: PaymentSchedule;
};

/** The payment terms associated with an order or draft order. */
export type PaymentTerms = Node & {
  __typename?: 'PaymentTerms';
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The next due date if this is the NET or FIXED type of payment terms. */
  nextDueAt?: Maybe<Scalars['DateTime']['output']>;
  /** Whether the payment terms have overdue payment schedules. */
  overdue: Scalars['Boolean']['output'];
  /** The list of schedules associated with the payment terms. */
  paymentSchedules: PaymentScheduleConnection;
  /** The name of the payment terms template that was used to create the payment terms. */
  paymentTermsName: Scalars['String']['output'];
  /** The type of the payment terms template that was used to create the payment terms. */
  paymentTermsType: PaymentTermsType;
};

/** The payment terms associated with an order or draft order. */
export type PaymentTermsPaymentSchedulesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The template for payment terms. */
export type PaymentTermsTemplate = Node & {
  __typename?: 'PaymentTermsTemplate';
  /** The description of the payment terms template. */
  description: Scalars['String']['output'];
  /** The number of days between the issue date and due date for net-type payment terms. */
  dueInDays?: Maybe<Scalars['Int']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The name of the payment terms template. */
  name: Scalars['String']['output'];
  /** The type of the payment terms template. */
  paymentTermsType: PaymentTermsType;
  /** The translated name of the payment terms template. */
  translatedName: Scalars['String']['output'];
};

/** The type of a payment terms or a payment terms template. */
export type PaymentTermsType =
  /** The payment terms or payment terms template is fixed type (due on a specified date). */
  | 'FIXED'
  /** The payment terms or payment terms template is due upon fulfillment. */
  | 'FULFILLMENT'
  /** The payment terms or payment terms template is net type (due a number of days after issue). */
  | 'NET'
  /** The payment terms or payment terms template is due upon receipt. */
  | 'RECEIPT'
  /** The type of the payment terms or payment terms template is unknown. */
  | 'UNKNOWN';

/** Return type for `paypalAccountEnable` mutation. */
export type PaypalAccountEnablePayload = {
  __typename?: 'PaypalAccountEnablePayload';
  /** The newly established PayPal billing agreement. */
  paypalBillingAgreement?: Maybe<PaypalBillingAgreement>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsPaypalTokenUserErrors>;
};

/** A payment method using a PayPal billing agreement. */
export type PaypalBillingAgreement = Node &
  PaymentInstrument & {
    __typename?: 'PaypalBillingAgreement';
    /** The billing address associated with the payment method. */
    billingAddress?: Maybe<PaymentInstrumentBillingAddress>;
    /** The globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The email address associated with the PayPal account. */
    paypalAccountEmail?: Maybe<Scalars['String']['output']>;
    /** The list of pending orders associated with this PayPal billing agreement. */
    pendingOrders: OrderConnection;
    /** The list of subscription contracts charged using this PayPal billing agreement. */
    subscriptionContracts: SubscriptionContractConnection;
  };

/** A payment method using a PayPal billing agreement. */
export type PaypalBillingAgreementPendingOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A payment method using a PayPal billing agreement. */
export type PaypalBillingAgreementSubscriptionContractsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<SubscriptionContractsSortKeys>;
};

/** Return type for `paypalTokenCreate` mutation. */
export type PaypalTokenCreatePayload = {
  __typename?: 'PaypalTokenCreatePayload';
  /** The created PayPal Express token. */
  token?: Maybe<Scalars['String']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsPaypalTokenUserErrors>;
};

/** The operations that can be performed on a B2B resource. */
export type PermittedOperation =
  /** The permission to add a resource. */
  | 'ADD'
  /** All permissions for a resource. */
  | 'ALL'
  /** The permission to delete a resource. */
  | 'DELETE'
  /** The permission to edit a resource. */
  | 'EDIT'
  /** The permission to use a resource. */
  | 'USE'
  /** The permission to view a resource. */
  | 'VIEW';

/** The address of a pickup location. */
export type PickupAddress = {
  __typename?: 'PickupAddress';
  /** The street address for the pickup location. */
  address1: Scalars['String']['output'];
  /** Any additional address information for the pickup location. */
  address2?: Maybe<Scalars['String']['output']>;
  /** The city of the pickup location. */
  city: Scalars['String']['output'];
  /** The country code for the pickup location. */
  countryCode: CountryCode;
  /** The phone number for the pickup location. */
  phone?: Maybe<Scalars['String']['output']>;
  /** The ZIP code for the pickup location. */
  zip?: Maybe<Scalars['String']['output']>;
  /** The province code for the pickup location. */
  zoneCode?: Maybe<Scalars['String']['output']>;
};

/** The status of the order's pickup. */
export type PickupStatus =
  /** The pickup of the order has been confirmed. */
  | 'CLOSED'
  /** The order has been picked up. */
  | 'IN_PROGRESS'
  /** The order is ready for pick up. */
  | 'OPEN';

/** Represents the value of the percentage pricing object. */
export type PricingPercentageValue = {
  __typename?: 'PricingPercentageValue';
  /** The percentage value of the object. */
  percentage: Scalars['Float']['output'];
};

/** The price value (fixed or percentage) for a discount application. */
export type PricingValue = MoneyV2 | PricingPercentageValue;

/** A sale associated with a product. */
export type ProductSale = Node &
  Sale & {
    __typename?: 'ProductSale';
    /** The type of order action represented by the sale. */
    actionType: SaleActionType;
    /** The unique ID of the sale. */
    id: Scalars['ID']['output'];
    /** The line item for the associated sale. */
    lineItem: LineItem;
    /** The type of line associated with the sale. */
    lineType: SaleLineType;
    /** The number of units ordered or intended to be returned. */
    quantity?: Maybe<Scalars['Int']['output']>;
    /** The individual taxes associated with the sale. */
    taxes: Array<SaleTax>;
    /** The total sale amount after taxes and discounts. */
    totalAmount: MoneyV2;
    /** The total amount of discounts allocated to the sale after taxes. */
    totalDiscountAmountAfterTaxes: MoneyV2;
    /** The total discounts allocated to the sale before taxes. */
    totalDiscountAmountBeforeTaxes: MoneyV2;
    /** The total tax amount for the sale. */
    totalTaxAmount: MoneyV2;
  };

/** The data that about an order that is visible to anyone with the order ID. */
export type PublicOrder = Node & {
  __typename?: 'PublicOrder';
  /**
   * The date and time when the order was canceled.
   * Returns `null` if the order wasn't canceled.
   */
  cancelledAt?: Maybe<Scalars['DateTime']['output']>;
  /**
   * A randomly generated alpha-numeric identifier for the order that may be shown to the customer
   * instead of the sequential order name. For example, "XPAV284CT", "R50KELTJP" or "35PKUN0UJ".
   * This value isn't guaranteed to be unique.
   */
  confirmationNumber?: Maybe<Scalars['String']['output']>;
  /** The discount information for the order, including line-level discount applications. */
  discountInformation: OrderDiscountInformation;
  /** The name of the associated draft order. */
  draftOrderName?: Maybe<Scalars['String']['output']>;
  /** The edit summary of the order. */
  editSummary?: Maybe<OrderEditSummary>;
  /** The financial status of the order. */
  financialStatus?: Maybe<OrderFinancialStatus>;
  /** The fulfillment status of the order. */
  fulfillmentStatus: OrderFulfillmentStatus;
  /** The fulfillments associated with the order. */
  fulfillments: FulfillmentConnection;
  /** Whether the customer has an email address. */
  hasEmail: Scalars['Boolean']['output'];
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The merchandise lines marked as fees with total value, aggregated by title. */
  legacyAggregatedMerchandiseTermsAsFees: Array<LegacyAggregatedMerchandiseTermsAsFees>;
  /** Whether or not products marked as fees should be rendered as money lines. */
  legacyRepresentProductsAsFees: Scalars['Boolean']['output'];
  /** The price of the order before duties, shipping, taxes, and fees. */
  legacySubtotalWithoutFees?: Maybe<MoneyV2>;
  /** The list of the order's line item containers (e.g., Unfulfilled). */
  lineItemContainers: Array<LineItemContainer>;
  /** The list of line items of the order. */
  lineItems: LineItemConnection;
  /** The market that includes the order's shipping address. Or the shop's primary market if the shipping address is empty. */
  market: Market;
  /**
   * The identifier for the order that appears on the order.
   * For example, _#1000_ or _Store1001.
   */
  name: Scalars['String']['output'];
  /** The payment information for the order. */
  paymentInformation?: Maybe<OrderPaymentInformation>;
  /** The pickup information for the order. */
  pickupInformation?: Maybe<OrderPickupInformation>;
  /** The purchase order number of the order. */
  poNumber?: Maybe<Scalars['String']['output']>;
  /**
   * The date and time when the order was processed.
   * This value can be set to dates in the past when importing from other systems.
   * If no value is provided, it will be auto-generated based on current date and time.
   */
  processedAt: Scalars['DateTime']['output'];
  /** A list of refunds associated with the order. */
  refunds: Array<Refund>;
  /** The path to recreate the order in the cart and redirect to checkout. Will return nil if the line item count exceeds 100. */
  reorderPath?: Maybe<Scalars['String']['output']>;
  /** Whether the order requires shipping. */
  requiresShipping: Scalars['Boolean']['output'];
  /** A Return identified by ID. */
  return?: Maybe<Return>;
  /** The list of returns for the order with pagination. */
  returns: ReturnConnection;
  /** The list of shipping line groups for the order. */
  shippingLineGroups: Array<OrderShippingLineGroup>;
  /** The totals and quantities for the order, ignoring returns. */
  soldInformation: OrderSoldInformation;
  /** The price of the order before duties, shipping, and taxes. */
  subtotal?: Maybe<MoneyV2>;
  /** The price of the order before order-level discounts, duties, shipping. It includes taxes in  tax-inclusive orders. */
  subtotalBeforeDiscounts?: Maybe<MoneyV2>;
  /** The total cost of shipping after discounts. */
  totalDiscountedShipping: MoneyV2;
  /** The total amount of duties after returns. */
  totalDuties?: Maybe<MoneyV2>;
  /** The total duties and duties status. */
  totalDutiesSummary?: Maybe<OrderDutiesSummary>;
  /** The total amount of the order (including taxes and discounts) minus the amounts for line items that have been returned. */
  totalPrice: MoneyV2;
  /** The total amount refunded. */
  totalRefunded: MoneyV2;
  /** The total cost of shipping. */
  totalShipping: MoneyV2;
  /** The total cost of taxes. */
  totalTax?: Maybe<MoneyV2>;
  /** The total value of tips. */
  totalTip?: Maybe<MoneyV2>;
  /** A list of transactions associated with the order. */
  transactions: Array<OrderTransaction>;
};

/** The data that about an order that is visible to anyone with the order ID. */
export type PublicOrderFulfillmentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<FulfillmentSortKeys>;
};

/** The data that about an order that is visible to anyone with the order ID. */
export type PublicOrderLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The data that about an order that is visible to anyone with the order ID. */
export type PublicOrderReturnArgs = {
  id: Scalars['ID']['input'];
};

/** The data that about an order that is visible to anyone with the order ID. */
export type PublicOrderReturnsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ReturnSortKeys>;
};

/** The information of the purchasing company for an order or draft order. */
export type PurchasingCompany = {
  __typename?: 'PurchasingCompany';
  /** The company associated with the order or draft order. */
  company: Company;
  /** The company contact associated with the order or draft order. */
  contact?: Maybe<CompanyContact>;
  /** The company location associated with the order or draft order. */
  location: CompanyLocation;
};

/** Represents information about the purchasing entity for the order or draft order. */
export type PurchasingEntity = Customer | PurchasingCompany;

/** This acts as the public, top-level API from which all queries start. */
export type QueryRoot = {
  __typename?: 'QueryRoot';
  /** The information of the customer's company. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
  company?: Maybe<Company>;
  /** The Location corresponding to the provided ID. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
  companyLocation?: Maybe<CompanyLocation>;
  /** Returns the Customer resource. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
  customer: Customer;
  /** Returns a draft order resource by ID. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
  draftOrder?: Maybe<DraftOrder>;
  /** The API tokens for UI extensions. */
  extensionApiTokens?: Maybe<ExtensionApiTokens>;
  /** Returns an Order resource by ID. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
  order?: Maybe<Order>;
  /** An Order resource identified by ID. */
  orderDetailsPageOrder?: Maybe<OrderDetailsPageOrder>;
  /** Returns the information about the shop. Apps using the Customer Account API must meet the protected customer data [requirements](https://shopify.dev/docs/apps/launch/protected-customer-data). */
  shop: Shop;
  /**
   * Public metafields for Shop, Order, Customer, Company, CompanyLocation, Product, and ProductVariant.
   * Shop metafields are always fetched if there is a match for the given namespace and key pairs.
   * Product and ProductVariant are only fetched if resource_ids are provided and there is a match for the
   * namespace and key. Either filters or extensionIds is needed. If both are provided, filters will be used.
   * This is restricted to development shops for local UI extension development purposes only.
   */
  uiExtensionMetafields: Array<UiExtensionMetafield>;
  /** A session token for an UI extension. */
  uiExtensionSessionToken?: Maybe<UiExtensionSessionToken>;
};

/** This acts as the public, top-level API from which all queries start. */
export type QueryRootCompanyArgs = {
  id: Scalars['ID']['input'];
};

/** This acts as the public, top-level API from which all queries start. */
export type QueryRootCompanyLocationArgs = {
  id: Scalars['ID']['input'];
};

/** This acts as the public, top-level API from which all queries start. */
export type QueryRootDraftOrderArgs = {
  id: Scalars['ID']['input'];
};

/** This acts as the public, top-level API from which all queries start. */
export type QueryRootExtensionApiTokensArgs = {
  appId: Scalars['ID']['input'];
  extensionType?: InputMaybe<Scalars['String']['input']>;
};

/** This acts as the public, top-level API from which all queries start. */
export type QueryRootOrderArgs = {
  id: Scalars['ID']['input'];
};

/** This acts as the public, top-level API from which all queries start. */
export type QueryRootOrderDetailsPageOrderArgs = {
  id: Scalars['ID']['input'];
};

/** This acts as the public, top-level API from which all queries start. */
export type QueryRootUiExtensionMetafieldsArgs = {
  filters?: InputMaybe<Array<UiExtensionMetafieldFilterInput>>;
  orderId?: InputMaybe<Scalars['ID']['input']>;
  resourceIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** This acts as the public, top-level API from which all queries start. */
export type QueryRootUiExtensionSessionTokenArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  extensionActivationId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** The record of refunds issued to a customer. */
export type Refund = Node & {
  __typename?: 'Refund';
  /** The date and time when the refund was created. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The name of the return, if the refund was issued from a return. */
  returnName?: Maybe<Scalars['String']['output']>;
  /** The total amount refunded across all transactions, in presentment currencies. */
  totalRefunded: MoneyV2;
  /** The date and time when the refund was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** An agreement for refunding all or a portion of the order between the merchant and the customer. */
export type RefundAgreement = Node &
  SalesAgreement & {
    __typename?: 'RefundAgreement';
    /** The date and time when the agreement occurred. */
    happenedAt: Scalars['DateTime']['output'];
    /** The unique ID for the agreement. */
    id: Scalars['ID']['output'];
    /** The reason the agreement was created. */
    reason: OrderActionType;
    /** The refund that's associated with the agreement. */
    refund: Refund;
    /** The sales associated with the agreement. */
    sales: SaleConnection;
  };

/** An agreement for refunding all or a portion of the order between the merchant and the customer. */
export type RefundAgreementSalesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The information about the line items container for items that have not been refunded or removed. */
export type RemainingLineItemContainer = {
  __typename?: 'RemainingLineItemContainer';
  /** A unique ID for the container. */
  id: Scalars['ID']['output'];
  /** The line items contained within this container. */
  lineItems: RemainingLineItemContainerLineItemConnection;
};

/** The information about the line items container for items that have not been refunded or removed. */
export type RemainingLineItemContainerLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The information about the line item in the line item container. */
export type RemainingLineItemContainerLineItem = Node & {
  __typename?: 'RemainingLineItemContainerLineItem';
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The line item associated with the container. */
  lineItem: LineItem;
};

/** An auto-generated type for paginating through multiple RemainingLineItemContainerLineItems. */
export type RemainingLineItemContainerLineItemConnection = {
  __typename?: 'RemainingLineItemContainerLineItemConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<RemainingLineItemContainerLineItemEdge>;
  /** A list of nodes that are contained in RemainingLineItemContainerLineItemEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<RemainingLineItemContainerLineItem>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one RemainingLineItemContainerLineItem and a cursor during pagination. */
export type RemainingLineItemContainerLineItemEdge = {
  __typename?: 'RemainingLineItemContainerLineItemEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of RemainingLineItemContainerLineItemEdge. */
  node: RemainingLineItemContainerLineItem;
};

/** The input fields for a line item requested for return. */
export type RequestedLineItemInput = {
  /**
   * A note from the customer explaining the item to be returned.
   * For instance, the note can detail issues with the item for the merchant's information.
   * Maximum length: 300 characters.
   */
  customerNote?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the line item that the customer wants to return. */
  lineItemId: Scalars['ID']['input'];
  /** The quantity of the line item that the customer wants to return. */
  quantity: Scalars['Int']['input'];
  /** The reason for returning the item. */
  returnReason: ReturnReason;
};

/** Return type for `resendGiftCard` mutation. */
export type ResendGiftCardPayload = {
  __typename?: 'ResendGiftCardPayload';
  /** The ID of the order that resends the gift cards. */
  orderId?: Maybe<Scalars['ID']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsResendGiftCardErrors>;
};

/** Represents permissions on resources. */
export type ResourcePermission = {
  __typename?: 'ResourcePermission';
  /** The operations permitted on the resource. */
  permittedOperations: Array<PermittedOperation>;
  /** The name of the resource. */
  resource: ResourceType;
};

/** The B2B resource types. */
export type ResourceType =
  /** The Business Profile resource type. */
  | 'BUSINESS_PROFILE'
  /** The Company resource type. */
  | 'COMPANY'
  /** The Company Contact resource type. */
  | 'COMPANY_CONTACT'
  /** The Company Contact Role resource type. */
  | 'COMPANY_CONTACT_ROLE'
  /** The Company Location resource type. */
  | 'COMPANY_LOCATION'
  /** The Company Location Billing Address resource type. */
  | 'COMPANY_LOCATION_BILLING_ADDRESS'
  /** The Company Location Shipping Address resource type. */
  | 'COMPANY_LOCATION_SHIPPING_ADDRESS'
  /** The Company Tax Exemption resource type. */
  | 'COMPANY_TAX_EXEMPTION'
  /** The Draft Order resource type. */
  | 'DRAFT_ORDER'
  /** The Order resource type. */
  | 'ORDER'
  /** The Payment Method resource type. */
  | 'PAYMENT_METHOD';

/** A product return. */
export type Return = Node & {
  __typename?: 'Return';
  /** The date when the return was closed. */
  closedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The date when the return was created. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The additional details about why the merchant declined the return request. */
  decline?: Maybe<ReturnDecline>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The name assigned to the return. */
  name: Scalars['String']['output'];
  /** The line items associated with the return. */
  returnLineItems: ReturnLineItemConnection;
  /** The list of reverse deliveries associated with the return. */
  reverseDeliveries: ReverseDeliveryConnection;
  /** The current status of the `Return`. */
  status: ReturnStatus;
  /** The timeline events related to the return. */
  timelineEvents: Array<TimelineEvent>;
  /** The date when the return was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** A product return. */
export type ReturnReturnLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A product return. */
export type ReturnReverseDeliveriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An agreement between the merchant and customer for a return. */
export type ReturnAgreement = Node &
  SalesAgreement & {
    __typename?: 'ReturnAgreement';
    /** The date and time when the agreement occurred. */
    happenedAt: Scalars['DateTime']['output'];
    /** The unique ID for the agreement. */
    id: Scalars['ID']['output'];
    /** The reason the agreement was created. */
    reason: OrderActionType;
    /** The return associated with the agreement. */
    return: Return;
    /** The sales associated with the agreement. */
    sales: SaleConnection;
  };

/** An agreement between the merchant and customer for a return. */
export type ReturnAgreementSalesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An auto-generated type for paginating through multiple Returns. */
export type ReturnConnection = {
  __typename?: 'ReturnConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<ReturnEdge>;
  /** A list of nodes that are contained in ReturnEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<Return>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** The merchant's reason for declining the customer's return request. */
export type ReturnDecline = {
  __typename?: 'ReturnDecline';
  /** The merchant's message to the customer explaining why their return request was declined. */
  note?: Maybe<Scalars['String']['output']>;
  /** The reason the return request was declined. */
  reason: ReturnDeclineReason;
};

/** The specific reason for the merchant declining a customer's return request. */
export type ReturnDeclineReason =
  /** The return request was declined because it contains items from a final sale. */
  | 'FINAL_SALE'
  /** The return request was declined due to another reason. */
  | 'OTHER'
  /** The return request was declined because the return period has ended. */
  | 'RETURN_PERIOD_ENDED';

/** An auto-generated type which holds one Return and a cursor during pagination. */
export type ReturnEdge = {
  __typename?: 'ReturnEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of ReturnEdge. */
  node: Return;
};

/** Possible error codes that can be returned by `ReturnUserError`. */
export type ReturnErrorCode =
  /** The requested resource already exists. */
  | 'ALREADY_EXISTS'
  /** The input value is blank. */
  | 'BLANK'
  /** A requested resource could not be created. */
  | 'CREATION_FAILED'
  /** The input value should be equal to the value allowed. */
  | 'EQUAL_TO'
  /** A required feature is not enabled. */
  | 'FEATURE_NOT_ENABLED'
  /** The input value should be greater than the minimum allowed value. */
  | 'GREATER_THAN'
  /** The input value should be greater than or equal to the minimum value allowed. */
  | 'GREATER_THAN_OR_EQUAL_TO'
  /** The input value isn't included in the list. */
  | 'INCLUSION'
  /** Unexpected internal error happened. */
  | 'INTERNAL_ERROR'
  /** The input value is invalid. */
  | 'INVALID'
  /** A resource was not in the correct state for the operation to succeed. */
  | 'INVALID_STATE'
  /** The input value should be less than the maximum value allowed. */
  | 'LESS_THAN'
  /** The input value should be less than or equal to the maximum value allowed. */
  | 'LESS_THAN_OR_EQUAL_TO'
  /** A requested notification could not be sent. */
  | 'NOTIFICATION_FAILED'
  /** A request is not authorized. */
  | 'NOT_AUTHORIZED'
  /** The input value is not a number. */
  | 'NOT_A_NUMBER'
  /** A requested item is not editable. */
  | 'NOT_EDITABLE'
  /** A requested item could not be found. */
  | 'NOT_FOUND'
  /** The input value needs to be blank. */
  | 'PRESENT'
  /** The input value is already taken. */
  | 'TAKEN'
  /** The input value is too big. */
  | 'TOO_BIG'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** Too many arguments provided. */
  | 'TOO_MANY_ARGUMENTS'
  /** The input value is too short. */
  | 'TOO_SHORT'
  /** The input value is the wrong length. */
  | 'WRONG_LENGTH';

/** A line item that has been returned. */
export type ReturnLineItem = Node & {
  __typename?: 'ReturnLineItem';
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The related line item that has been returned. */
  lineItem: LineItem;
  /** The line item quantity that has been returned. */
  quantity: Scalars['Int']['output'];
  /** The reason the line item quantity was returned. */
  returnReason: ReturnReason;
};

/** An auto-generated type for paginating through multiple ReturnLineItems. */
export type ReturnLineItemConnection = {
  __typename?: 'ReturnLineItemConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<ReturnLineItemEdge>;
  /** A list of nodes that are contained in ReturnLineItemEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<ReturnLineItem>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one ReturnLineItem and a cursor during pagination. */
export type ReturnLineItemEdge = {
  __typename?: 'ReturnLineItemEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of ReturnLineItemEdge. */
  node: ReturnLineItem;
};

/** The reason for returning the item. */
export type ReturnReason =
  /** The color of the item didn't meet expectations. */
  | 'COLOR'
  /** The item was damaged or defective. */
  | 'DEFECTIVE'
  /** The item was not as described. */
  | 'NOT_AS_DESCRIBED'
  /** Other reason not listed. */
  | 'OTHER'
  /** The size of the item was too large. */
  | 'SIZE_TOO_LARGE'
  /** The size of the item was too small. */
  | 'SIZE_TOO_SMALL'
  /** The style of the item didn't meet expectations. */
  | 'STYLE'
  /** The reason is unknown. */
  | 'UNKNOWN'
  /** The customer changed their mind about the item. */
  | 'UNWANTED'
  /** The customer received the wrong item. */
  | 'WRONG_ITEM';

/** The set of valid sort keys for the Return query. */
export type ReturnSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE';

/** The current status of a `Return`. */
export type ReturnStatus =
  /** The `Return` has been canceled by the user. */
  | 'CANCELED'
  /** The `Return` has been successfully completed. */
  | 'CLOSED'
  /** The `Return` request was declined. */
  | 'DECLINED'
  /** The `Return` is currently in progress. */
  | 'OPEN'
  /** The `Return` has been requested by the user. */
  | 'REQUESTED';

/** The supported reason for returning a line item. */
export type ReturnSupportedReason = {
  __typename?: 'ReturnSupportedReason';
  /** The standardized return reason (e.g. `DEFECTIVE` or `UNWANTED`) for returning the line item. */
  reason: ReturnReason;
  /** The localized, display text for the return reason. */
  title: Scalars['String']['output'];
};

/** The errors that occur during the execution of a return mutation. */
export type ReturnUserError = DisplayableError & {
  __typename?: 'ReturnUserError';
  /** The error code. */
  code?: Maybe<ReturnErrorCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/**
 * A reverse delivery represents a package being sent back by a buyer to a merchant post-fulfillment.
 * This could occur when a buyer requests a return and the merchant provides a shipping label.
 * The reverse delivery includes the context of the items being returned, the method of return
 * (for example, a shipping label), and the current status of the delivery (tracking information).
 */
export type ReverseDelivery = Node & {
  __typename?: 'ReverseDelivery';
  /** Whether the label was generated by the customer. */
  customerGeneratedLabel: Scalars['Boolean']['output'];
  /** The deliverable linked with the reverse delivery. */
  deliverable?: Maybe<ReverseDeliveryDeliverable>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
};

/** An auto-generated type for paginating through multiple ReverseDeliveries. */
export type ReverseDeliveryConnection = {
  __typename?: 'ReverseDeliveryConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<ReverseDeliveryEdge>;
  /** A list of nodes that are contained in ReverseDeliveryEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<ReverseDelivery>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** The method and associated details of a reverse delivery. */
export type ReverseDeliveryDeliverable = ReverseDeliveryShippingDeliverable;

/** An auto-generated type which holds one ReverseDelivery and a cursor during pagination. */
export type ReverseDeliveryEdge = {
  __typename?: 'ReverseDeliveryEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of ReverseDeliveryEdge. */
  node: ReverseDelivery;
};

/** The return label information for a reverse delivery. */
export type ReverseDeliveryLabel = {
  __typename?: 'ReverseDeliveryLabel';
  /** The date and time when the reverse delivery label was created. */
  createdAt: Scalars['DateTime']['output'];
  /** A publicly accessible link for downloading the label image. */
  publicFileUrl?: Maybe<Scalars['URL']['output']>;
  /** The date and time when the reverse delivery label was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** A set of shipping deliverables for reverse delivery. */
export type ReverseDeliveryShippingDeliverable = {
  __typename?: 'ReverseDeliveryShippingDeliverable';
  /** The return label that's attached to the reverse delivery. */
  label?: Maybe<ReverseDeliveryLabel>;
  /** The tracking information for the reverse delivery. */
  tracking?: Maybe<ReverseDeliveryTracking>;
};

/** The tracking information for a reverse delivery. */
export type ReverseDeliveryTracking = {
  __typename?: 'ReverseDeliveryTracking';
  /** The name of the delivery service provider, in a format that's suitable for display purposes. */
  carrierName?: Maybe<Scalars['String']['output']>;
  /** The identifier that the courier uses to track the shipment. */
  trackingNumber?: Maybe<Scalars['String']['output']>;
  /** The URL used to track the shipment. */
  trackingUrl?: Maybe<Scalars['URL']['output']>;
};

/**
 * A record of an individual sale associated with a sales agreement. Every monetary value in an order's sales data is represented in the smallest unit of the currency.
 * When amounts are divided across multiple line items, such as taxes or order discounts, the amounts might not divide evenly across all of the line items on the order.
 * To address this, the remaining currency units that couldn't be divided evenly are allocated one at a time, starting with the first line item, until they are all accounted for.
 * In aggregate, the values sum up correctly. In isolation, one line item might have a different tax or discount amount than another line item of the same price, before taxes and discounts.
 * This is because the amount could not be divided evenly across the items. The allocation of currency units across line items is immutable. After they are allocated, currency units are never reallocated or redistributed among the line items.
 */
export type Sale = {
  /** The type of order action represented by the sale. */
  actionType: SaleActionType;
  /** The unique ID of the sale. */
  id: Scalars['ID']['output'];
  /** The type of line associated with the sale. */
  lineType: SaleLineType;
  /** The number of units ordered or intended to be returned. */
  quantity?: Maybe<Scalars['Int']['output']>;
  /** The individual taxes associated with the sale. */
  taxes: Array<SaleTax>;
  /** The total sale amount after taxes and discounts. */
  totalAmount: MoneyV2;
  /** The total amount of discounts allocated to the sale after taxes. */
  totalDiscountAmountAfterTaxes: MoneyV2;
  /** The total discounts allocated to the sale before taxes. */
  totalDiscountAmountBeforeTaxes: MoneyV2;
  /** The total tax amount for the sale. */
  totalTaxAmount: MoneyV2;
};

/** An order action type associated with a sale. */
export type SaleActionType =
  /** A purchase or charge. */
  | 'ORDER'
  /** A removal or return. */
  | 'RETURN'
  /** An unidentified order action. Represents new actions that may be added in future versions. */
  | 'UNKNOWN'
  /** A change to the price, taxes, or discounts for a previous purchase. */
  | 'UPDATE';

/** An auto-generated type for paginating through multiple Sales. */
export type SaleConnection = {
  __typename?: 'SaleConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<SaleEdge>;
  /** A list of nodes that are contained in SaleEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<Sale>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one Sale and a cursor during pagination. */
export type SaleEdge = {
  __typename?: 'SaleEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of SaleEdge. */
  node: Sale;
};

/**
 * The possible line types of a sale record. A sale can be an adjustment, which occurs when a refund is issued for a line item that is either more or less than the total value of the line item.
 * Examples include restocking fees and goodwill payments. In such cases, Shopify generates a sales agreement with sale records for each line item that is returned or refunded, and an additional sale record for the adjustment, for example a restocking fee.
 * The sale records for the returned or refunded items represent the reversal of the original line item sale value. The additional adjustment sale record represents the difference between the original total value of all line items that were refunded, and the actual amount refunded.
 */
export type SaleLineType =
  /** An additional fee. */
  | 'ADDITIONAL_FEE'
  /** A sale adjustment. */
  | 'ADJUSTMENT'
  /** A duty charge. */
  | 'DUTY'
  /** A fee charge. */
  | 'FEE'
  /** A gift card. */
  | 'GIFT_CARD'
  /** A product that was purchased, returned, or exchanged. */
  | 'PRODUCT'
  /** A shipping charge. */
  | 'SHIPPING'
  /** A tip given by the customer. */
  | 'TIP'
  /** An unknown sale line type. This represents new types that may be added in future versions. */
  | 'UNKNOWN';

/** The tax allocated to a sale from a single tax line. */
export type SaleTax = Node & {
  __typename?: 'SaleTax';
  /** The portion of the total tax amount on the related sale that's from the associated tax line. */
  amount: MoneyV2;
  /** The unique ID for the sale tax. */
  id: Scalars['ID']['output'];
  /** The tax line associated with the sale. */
  taxLine: TaxLine;
};

/** A contract between a merchant and a customer to do business. Shopify creates a sales agreement whenever an order is placed, edited, or refunded. A sales agreement has one or more sales records, which provide itemized details about the initial agreement or subsequent changes made to the order. For example, when a customer places an order, Shopify creates the order, generates a sales agreement, and records a sale for each line item purchased in the order. A sale record is specific to a type of order line. Order lines can represent different things such as a purchased product, a tip added by a customer, shipping costs collected at checkout, and more. */
export type SalesAgreement = {
  /** The date and time when the agreement occurred. */
  happenedAt: Scalars['DateTime']['output'];
  /** The unique ID for the agreement. */
  id: Scalars['ID']['output'];
  /** The reason the agreement was created. */
  reason: OrderActionType;
  /** The sales associated with the agreement. */
  sales: SaleConnection;
};

/** A contract between a merchant and a customer to do business. Shopify creates a sales agreement whenever an order is placed, edited, or refunded. A sales agreement has one or more sales records, which provide itemized details about the initial agreement or subsequent changes made to the order. For example, when a customer places an order, Shopify creates the order, generates a sales agreement, and records a sale for each line item purchased in the order. A sale record is specific to a type of order line. Order lines can represent different things such as a purchased product, a tip added by a customer, shipping costs collected at checkout, and more. */
export type SalesAgreementSalesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An auto-generated type for paginating through multiple SalesAgreements. */
export type SalesAgreementConnection = {
  __typename?: 'SalesAgreementConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<SalesAgreementEdge>;
  /** A list of nodes that are contained in SalesAgreementEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<SalesAgreement>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one SalesAgreement and a cursor during pagination. */
export type SalesAgreementEdge = {
  __typename?: 'SalesAgreementEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of SalesAgreementEdge. */
  node: SalesAgreement;
};

/** Captures the intentions of a discount that was created by a Shopify Script. */
export type ScriptDiscountApplication = DiscountApplication & {
  __typename?: 'ScriptDiscountApplication';
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** The lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the application as defined by the Script. */
  title: Scalars['String']['output'];
  /** The value of the discount application. */
  value: PricingValue;
};

/** Represents the shipping details that the customer chose for their order. */
export type ShippingLine = {
  __typename?: 'ShippingLine';
  /** A unique identifier for the shipping rate. */
  handle?: Maybe<Scalars['String']['output']>;
  /** The pre-tax shipping price without any discounts applied. */
  originalPrice: MoneyV2;
  /** The title of the shipping line. */
  title: Scalars['String']['output'];
};

/** A sale associated with a shipping charge. */
export type ShippingLineSale = Node &
  Sale & {
    __typename?: 'ShippingLineSale';
    /** The type of order action represented by the sale. */
    actionType: SaleActionType;
    /** The unique ID of the sale. */
    id: Scalars['ID']['output'];
    /** The type of line associated with the sale. */
    lineType: SaleLineType;
    /** The number of units ordered or intended to be returned. */
    quantity?: Maybe<Scalars['Int']['output']>;
    /** The individual taxes associated with the sale. */
    taxes: Array<SaleTax>;
    /** The total sale amount after taxes and discounts. */
    totalAmount: MoneyV2;
    /** The total amount of discounts allocated to the sale after taxes. */
    totalDiscountAmountAfterTaxes: MoneyV2;
    /** The total discounts allocated to the sale before taxes. */
    totalDiscountAmountBeforeTaxes: MoneyV2;
    /** The total tax amount for the sale. */
    totalTaxAmount: MoneyV2;
  };

/** A shipping rate to be applied to a checkout. */
export type ShippingRate = {
  __typename?: 'ShippingRate';
  /** The human-readable unique identifier for this shipping rate. */
  handle: Scalars['String']['output'];
  /** The price of this shipping rate. */
  price: MoneyV2;
  /** The title of this shipping rate. */
  title: Scalars['String']['output'];
};

/** A collection of the general information about the shop. */
export type Shop = HasMetafields &
  Node & {
    __typename?: 'Shop';
    /** Returns the settings for the address form. */
    addressFormSettings: AddressFormSettings;
    /** The email of the shop. */
    email: Scalars['String']['output'];
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** A metafield found by namespace and key. */
    metafield?: Maybe<Metafield>;
    /**
     * The metafields associated with the resource matching the
     * supplied list of namespaces and keys.
     */
    metafields: Array<Maybe<Metafield>>;
    /** The shop's .myshopify.com domain name. */
    myshopifyDomain: Scalars['String']['output'];
    /** The name of the shop. */
    name: Scalars['String']['output'];
    /** The list of all legal policies associated with the shop. */
    shopPolicies: Array<ShopPolicy>;
    /** The URL of the shop's online store. */
    url: Scalars['URL']['output'];
  };

/** A collection of the general information about the shop. */
export type ShopMetafieldArgs = {
  key: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
};

/** A collection of the general information about the shop. */
export type ShopMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>;
};

/** The shop app links and resources for an order. */
export type ShopAppLinksAndResources = {
  __typename?: 'ShopAppLinksAndResources';
  /** Whether the the buyer is associated to Shop App. */
  buyerHasShopApp: Scalars['Boolean']['output'];
  /** Whether the the buyer is associated to Shop Pay. */
  buyerHasShopPay: Scalars['Boolean']['output'];
  /** Whether or not the track order updates button should be rendered. */
  canTrackOrderUpdates: Scalars['Boolean']['output'];
  /** Whether or not showing the installments highlight is eligible. */
  installmentsHighlightEligible: Scalars['Boolean']['output'];
  /** The URL to the mobile Shop App. */
  mobileUrl: Scalars['URL']['output'];
  /** The attribution details related to the mobile url. */
  mobileUrlAttributionPayload: Scalars['String']['output'];
  /** The various options that exist for subscribing to order updates. */
  orderUpdateOptions: Array<Scalars['String']['output']>;
  /** The URL to the Shop App QR code. */
  qrCodeUrl: Scalars['URL']['output'];
  /** Whether or not Shop App eligible. */
  shopAppEligible: Scalars['Boolean']['output'];
  /** Whether QR code should be hidden. */
  shopAppQrCodeKillswitch: Scalars['Boolean']['output'];
  /** The URL to the Shop Pay Installments reminders. */
  shopInstallmentsMobileUrl: Scalars['URL']['output'];
  /** The URL to view the Shop Pay Installments schedules in the mobile Shop App. */
  shopInstallmentsViewSchedules: Scalars['URL']['output'];
  /** Whether the order was a shop pay order. */
  shopPayOrder: Scalars['Boolean']['output'];
};

/** The configuration values used to initialize a Shop Pay checkout. */
export type ShopPayConfiguration = {
  __typename?: 'ShopPayConfiguration';
  /** Whether the checkout is a checkout one session. */
  checkoutOne: Scalars['Boolean']['output'];
  /** The URL parameters containing an encrypted blob used by Shop Pay's backend. */
  transactionParams: Scalars['String']['output'];
  /** The URL from which the Shop Pay checkout can be completed. */
  transactionUrl: Scalars['URL']['output'];
};

/** Return type for `shopPayCreditCardGetUpdateUrl` mutation. */
export type ShopPayCreditCardGetUpdateUrlPayload = {
  __typename?: 'ShopPayCreditCardGetUpdateUrlPayload';
  /** The URL to which the customer should be redirected to update their Shop Pay credit card. */
  updateShopPayCreditCardUrl?: Maybe<Scalars['URL']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsPaymentInstrumentUserErrors>;
};

/** A policy that a merchant has configured for their store, such as their refund or privacy policy. */
export type ShopPolicy = Node & {
  __typename?: 'ShopPolicy';
  /** The text of the policy. The maximum size is 512kb. */
  body: Scalars['HTML']['output'];
  /** The handle of the policy. */
  handle: Scalars['String']['output'];
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The title of the policy. */
  title: Scalars['String']['output'];
  /** The public URL to the policy. */
  url: Scalars['URL']['output'];
};

/** Defines the valid SMS marketing states for a customer’s phone number. */
export type SmsMarketingState =
  /** The customer has not subscribed to SMS marketing. */
  | 'NOT_SUBSCRIBED'
  /** The customer is in the process of subscribing to SMS marketing. */
  | 'PENDING'
  /** The customer's personal data has been erased. This value is internally-set and read-only. */
  | 'REDACTED'
  /** The customer has subscribed to SMS marketing. */
  | 'SUBSCRIBED'
  /** The customer is not currently subscribed to SMS marketing but was previously subscribed. */
  | 'UNSUBSCRIBED';

/**
 * A store credit account contains a monetary balance that can be redeemed at checkout for purchases in the shop.
 * The account is held in the specified currency and has an owner that cannot be transferred.
 *
 * The account balance is redeemable at checkout only when the owner is authenticated via [new customer accounts authentication](https://shopify.dev/docs/api/customer).
 */
export type StoreCreditAccount = Node & {
  __typename?: 'StoreCreditAccount';
  /** The current balance of the store credit account. */
  balance: MoneyV2;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The transaction history of the store credit account. */
  transactions: StoreCreditAccountTransactionConnection;
};

/**
 * A store credit account contains a monetary balance that can be redeemed at checkout for purchases in the shop.
 * The account is held in the specified currency and has an owner that cannot be transferred.
 *
 * The account balance is redeemable at checkout only when the owner is authenticated via [new customer accounts authentication](https://shopify.dev/docs/api/customer).
 */
export type StoreCreditAccountTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<TransactionSortKeys>;
};

/** An auto-generated type for paginating through multiple StoreCreditAccounts. */
export type StoreCreditAccountConnection = {
  __typename?: 'StoreCreditAccountConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<StoreCreditAccountEdge>;
  /** A list of nodes that are contained in StoreCreditAccountEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<StoreCreditAccount>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** A credit transaction which increases the store credit account balance. */
export type StoreCreditAccountCreditTransaction = Node &
  StoreCreditAccountTransaction & {
    __typename?: 'StoreCreditAccountCreditTransaction';
    /** The store credit account that the transaction belongs to. */
    account: StoreCreditAccount;
    /** The amount of the transaction. */
    amount: MoneyV2;
    /** The balance of the account after the transaction. */
    balanceAfterTransaction: MoneyV2;
    /** The date and time when the transaction was created. */
    createdAt: Scalars['DateTime']['output'];
    /**
     * The time at which the transaction expires.
     * Debit transactions will always spend the soonest expiring credit first.
     */
    expiresAt?: Maybe<Scalars['DateTime']['output']>;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /**
     * The remaining amount of the credit.
     * The remaining amount will decrease when a debit spends this credit. It may also increase if that debit is subsequently reverted.
     * In the event that the credit expires, the remaining amount will represent the amount that remained as the expiry ocurred.
     */
    remainingAmount: MoneyV2;
  };

/**
 * A debit revert transaction which increases the store credit account balance.
 * Debit revert transactions are created automatically when a [store credit account debit transaction](https://shopify.dev/api/admin-graphql/latest/objects/StoreCreditAccountDebitTransaction) is reverted.
 *
 * Store credit account debit transactions are reverted when an order is cancelled, refunded or in the event of a payment failure at checkout.
 * The amount added to the balance is equal to the amount reverted on the original credit.
 */
export type StoreCreditAccountDebitRevertTransaction = Node &
  StoreCreditAccountTransaction & {
    __typename?: 'StoreCreditAccountDebitRevertTransaction';
    /** The store credit account that the transaction belongs to. */
    account: StoreCreditAccount;
    /** The amount of the transaction. */
    amount: MoneyV2;
    /** The balance of the account after the transaction. */
    balanceAfterTransaction: MoneyV2;
    /** The date and time when the transaction was created. */
    createdAt: Scalars['DateTime']['output'];
    /** The reverted debit transaction. */
    debitTransaction: StoreCreditAccountDebitTransaction;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
  };

/** A debit transaction which decreases the store credit account balance. */
export type StoreCreditAccountDebitTransaction = Node &
  StoreCreditAccountTransaction & {
    __typename?: 'StoreCreditAccountDebitTransaction';
    /** The store credit account that the transaction belongs to. */
    account: StoreCreditAccount;
    /** The amount of the transaction. */
    amount: MoneyV2;
    /** The balance of the account after the transaction. */
    balanceAfterTransaction: MoneyV2;
    /** The date and time when the transaction was created. */
    createdAt: Scalars['DateTime']['output'];
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
  };

/** An auto-generated type which holds one StoreCreditAccount and a cursor during pagination. */
export type StoreCreditAccountEdge = {
  __typename?: 'StoreCreditAccountEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of StoreCreditAccountEdge. */
  node: StoreCreditAccount;
};

/**
 * An expiration transaction which decreases the store credit account balance.
 * Expiration transactions are created automatically when a [store credit account credit transaction](https://shopify.dev/api/admin-graphql/latest/objects/StoreCreditAccountCreditTransaction) expires.
 *
 * The amount subtracted from the balance is equal to the remaining amount of the credit transaction.
 */
export type StoreCreditAccountExpirationTransaction =
  StoreCreditAccountTransaction & {
    __typename?: 'StoreCreditAccountExpirationTransaction';
    /** The store credit account that the transaction belongs to. */
    account: StoreCreditAccount;
    /** The amount of the transaction. */
    amount: MoneyV2;
    /** The balance of the account after the transaction. */
    balanceAfterTransaction: MoneyV2;
    /** The date and time when the transaction was created. */
    createdAt: Scalars['DateTime']['output'];
    /** The credit transaction which expired. */
    creditTransaction: StoreCreditAccountCreditTransaction;
  };

/** Interface for a store credit account transaction. */
export type StoreCreditAccountTransaction = {
  /** The store credit account that the transaction belongs to. */
  account: StoreCreditAccount;
  /** The amount of the transaction. */
  amount: MoneyV2;
  /** The balance of the account after the transaction. */
  balanceAfterTransaction: MoneyV2;
  /** The date and time when the transaction was created. */
  createdAt: Scalars['DateTime']['output'];
};

/** An auto-generated type for paginating through multiple StoreCreditAccountTransactions. */
export type StoreCreditAccountTransactionConnection = {
  __typename?: 'StoreCreditAccountTransactionConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<StoreCreditAccountTransactionEdge>;
  /** A list of nodes that are contained in StoreCreditAccountTransactionEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<StoreCreditAccountTransaction>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one StoreCreditAccountTransaction and a cursor during pagination. */
export type StoreCreditAccountTransactionEdge = {
  __typename?: 'StoreCreditAccountTransactionEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of StoreCreditAccountTransactionEdge. */
  node: StoreCreditAccountTransaction;
};

/** Return type for `storefrontCustomerAccessTokenCreate` mutation. */
export type StorefrontCustomerAccessTokenCreatePayload = {
  __typename?: 'StorefrontCustomerAccessTokenCreatePayload';
  /** The created access token. */
  customerAccessToken?: Maybe<Scalars['String']['output']>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<UserErrorsStorefrontCustomerAccessTokenCreateUserErrors>;
};

/** Represents a subscription anchor. */
export type SubscriptionAnchor =
  | SubscriptionMonthDayAnchor
  | SubscriptionWeekDayAnchor
  | SubscriptionYearDayAnchor;

/** The billing cycle of a subscription. */
export type SubscriptionBillingCycle = {
  __typename?: 'SubscriptionBillingCycle';
  /** The expected date of the billing attempt. */
  billingAttemptExpectedDate: Scalars['DateTime']['output'];
  /** The end date of the billing cycle. */
  cycleEndAt: Scalars['DateTime']['output'];
  /** The index of the billing cycle. */
  cycleIndex: Scalars['Int']['output'];
  /** The start date of the billing cycle. */
  cycleStartAt: Scalars['DateTime']['output'];
  /** Whether the billing cycle was edited. */
  edited: Scalars['Boolean']['output'];
  /** Whether the billing cycle was skipped. */
  skipped: Scalars['Boolean']['output'];
  /** The status of the billing cycle. */
  status: SubscriptionBillingCycleBillingCycleStatus;
};

/** The possible statuses of a subscription billing cycle. */
export type SubscriptionBillingCycleBillingCycleStatus =
  /** The billing cycle has been billed. */
  | 'BILLED'
  /** The billing cycle has not been billed. */
  | 'UNBILLED';

/** An auto-generated type for paginating through multiple SubscriptionBillingCycles. */
export type SubscriptionBillingCycleConnection = {
  __typename?: 'SubscriptionBillingCycleConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<SubscriptionBillingCycleEdge>;
  /** A list of nodes that are contained in SubscriptionBillingCycleEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<SubscriptionBillingCycle>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one SubscriptionBillingCycle and a cursor during pagination. */
export type SubscriptionBillingCycleEdge = {
  __typename?: 'SubscriptionBillingCycleEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of SubscriptionBillingCycleEdge. */
  node: SubscriptionBillingCycle;
};

/** The input fields for specifying the subscription contract and selecting the associated billing cycle. */
export type SubscriptionBillingCycleInput = {
  /** The ID of the subscription contract associated with the billing cycle. */
  contractId: Scalars['ID']['input'];
  /** Selects the billing cycle by date or index. */
  selector: SubscriptionBillingCycleSelector;
};

/** The input fields to select a SubscriptionBillingCycle by either date or index. */
export type SubscriptionBillingCycleSelector = {
  /** The date to select a billing cycle. */
  date?: InputMaybe<Scalars['DateTime']['input']>;
  /** The index to select a billing cycle. */
  index?: InputMaybe<Scalars['Int']['input']>;
};

/** Return type for `subscriptionBillingCycleSkip` mutation. */
export type SubscriptionBillingCycleSkipPayload = {
  __typename?: 'SubscriptionBillingCycleSkipPayload';
  /** The updated billing cycle. */
  billingCycle?: Maybe<SubscriptionBillingCycle>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<SubscriptionBillingCycleSkipUserError>;
};

/** An error that occurs during the execution of `SubscriptionBillingCycleSkip`. */
export type SubscriptionBillingCycleSkipUserError = DisplayableError & {
  __typename?: 'SubscriptionBillingCycleSkipUserError';
  /** The error code. */
  code?: Maybe<SubscriptionBillingCycleSkipUserErrorCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Possible error codes that can be returned by `SubscriptionBillingCycleSkipUserError`. */
export type SubscriptionBillingCycleSkipUserErrorCode =
  /** The input value is invalid. */
  'INVALID';

/** Return type for `subscriptionBillingCycleUnskip` mutation. */
export type SubscriptionBillingCycleUnskipPayload = {
  __typename?: 'SubscriptionBillingCycleUnskipPayload';
  /** The updated billing cycle. */
  billingCycle?: Maybe<SubscriptionBillingCycle>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<SubscriptionBillingCycleUnskipUserError>;
};

/** An error that occurs during the execution of `SubscriptionBillingCycleUnskip`. */
export type SubscriptionBillingCycleUnskipUserError = DisplayableError & {
  __typename?: 'SubscriptionBillingCycleUnskipUserError';
  /** The error code. */
  code?: Maybe<SubscriptionBillingCycleUnskipUserErrorCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Possible error codes that can be returned by `SubscriptionBillingCycleUnskipUserError`. */
export type SubscriptionBillingCycleUnskipUserErrorCode =
  /** The input value is invalid. */
  'INVALID';

/** The set of valid sort keys for the SubscriptionBillingCycles query. */
export type SubscriptionBillingCyclesSortKeys =
  /** Sort by the `cycle_end_at` value. */
  | 'CYCLE_END_AT'
  /** Sort by the `cycle_index` value. */
  | 'CYCLE_INDEX'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE';

/** The billing policy of a subscription. */
export type SubscriptionBillingPolicy = {
  __typename?: 'SubscriptionBillingPolicy';
  /** The anchor dates for calculating billing intervals. */
  anchors: Array<SubscriptionAnchor>;
  /** The type of interval associated with this schedule (e.g. Monthly, Weekly, etc). */
  interval: SubscriptionInterval;
  /** The number of intervals between invoices. */
  intervalCount?: Maybe<Count>;
  /** The maximum number of cycles after which the subscription ends. */
  maxCycles?: Maybe<Scalars['Int']['output']>;
  /** The minimum number of cycles required for the subscription. */
  minCycles?: Maybe<Scalars['Int']['output']>;
};

/** A Subscription Contract. */
export type SubscriptionContract = Node &
  SubscriptionContractBase & {
    __typename?: 'SubscriptionContract';
    /** Whether the subscription contract is eligible for customer actions. */
    appEligibleForCustomerActions: Scalars['Boolean']['output'];
    /** The billing policy associated with the subscription contract. */
    billingPolicy: SubscriptionBillingPolicy;
    /** The date and time when the subscription contract was created. */
    createdAt: Scalars['DateTime']['output'];
    /** The currency used for the subscription contract. */
    currencyCode: CurrencyCode;
    /** A list of custom attributes to be added to the generated orders. */
    customAttributes: Array<Attribute>;
    /** The delivery method for each billing of the subscription contract. */
    deliveryMethod?: Maybe<SubscriptionDeliveryMethod>;
    /** The delivery policy associated with the subscription contract. */
    deliveryPolicy: SubscriptionDeliveryPolicy;
    /** The delivery price for each billing of the subscription contract. */
    deliveryPrice: MoneyV2;
    /** A globally-unique ID. */
    id: Scalars['ID']['output'];
    /** The last billing error type of the contract. */
    lastBillingAttemptErrorType?: Maybe<SubscriptionContractLastBillingErrorType>;
    /** The current status of the last payment. */
    lastPaymentStatus?: Maybe<SubscriptionContractLastPaymentStatus>;
    /** The number of lines associated with the subscription contract. */
    lineCount: Scalars['Int']['output'];
    /** A list of subscription lines associated with the subscription contract. */
    lines: SubscriptionLineConnection;
    /** The number of lines associated with the subscription contract. */
    linesCount?: Maybe<Count>;
    /** The next billing date for the subscription contract. */
    nextBillingDate?: Maybe<Scalars['DateTime']['output']>;
    /** A note that will be applied to the generated orders. */
    note?: Maybe<Scalars['String']['output']>;
    /** A list of the subscription contract's orders. */
    orders: OrderConnection;
    /** The order from which the contract originated. */
    originOrder?: Maybe<Order>;
    /** The payment instrument being charged for this subscription contract. */
    paymentInstrument?: Maybe<PaymentInstrument>;
    /** An estimate of the breakdown of the amounts that will be charged in the next billing attempt. */
    priceBreakdownEstimate?: Maybe<SubscriptionPriceBreakdown>;
    /** The revision ID of the contract. */
    revisionId: Scalars['UnsignedInt64']['output'];
    /** The current status of the subscription contract. */
    status: SubscriptionContractSubscriptionStatus;
    /** The upcoming billing cycles on the subscription contract. */
    upcomingBillingCycles: SubscriptionBillingCycleConnection;
    /** The date and time when the subscription contract was updated. */
    updatedAt: Scalars['DateTime']['output'];
  };

/** A Subscription Contract. */
export type SubscriptionContractLinesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A Subscription Contract. */
export type SubscriptionContractOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A Subscription Contract. */
export type SubscriptionContractUpcomingBillingCyclesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<SubscriptionBillingCyclesSortKeys>;
};

/** Return type for `subscriptionContractActivate` mutation. */
export type SubscriptionContractActivatePayload = {
  __typename?: 'SubscriptionContractActivatePayload';
  /** The activated Subscription Contract. */
  contract?: Maybe<SubscriptionContract>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<SubscriptionContractStatusUpdateUserError>;
};

/** The common fields of a subscription contract. */
export type SubscriptionContractBase = {
  /** Whether the subscription contract is eligible for customer actions. */
  appEligibleForCustomerActions: Scalars['Boolean']['output'];
  /** The currency used for the subscription contract. */
  currencyCode: CurrencyCode;
  /** A list of custom attributes to be added to the generated orders. */
  customAttributes: Array<Attribute>;
  /** The delivery method for each billing of the subscription contract. */
  deliveryMethod?: Maybe<SubscriptionDeliveryMethod>;
  /** The delivery price for each billing of the subscription contract. */
  deliveryPrice: MoneyV2;
  /** The number of lines associated with the subscription contract. */
  lineCount: Scalars['Int']['output'];
  /** A list of subscription lines associated with the subscription contract. */
  lines: SubscriptionLineConnection;
  /** The number of lines associated with the subscription contract. */
  linesCount?: Maybe<Count>;
  /** A note that will be applied to the generated orders. */
  note?: Maybe<Scalars['String']['output']>;
  /** A list of the subscription contract's orders. */
  orders: OrderConnection;
  /** An estimate of the breakdown of the amounts that will be charged in the next billing attempt. */
  priceBreakdownEstimate?: Maybe<SubscriptionPriceBreakdown>;
  /** The date and time when the subscription contract was updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** The common fields of a subscription contract. */
export type SubscriptionContractBaseLinesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The common fields of a subscription contract. */
export type SubscriptionContractBaseOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Return type for `subscriptionContractCancel` mutation. */
export type SubscriptionContractCancelPayload = {
  __typename?: 'SubscriptionContractCancelPayload';
  /** The canceled Subscription Contract. */
  contract?: Maybe<SubscriptionContract>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<SubscriptionContractStatusUpdateUserError>;
};

/** Return type for `subscriptionContractChangePaymentInstrument` mutation. */
export type SubscriptionContractChangePaymentInstrumentPayload = {
  __typename?: 'SubscriptionContractChangePaymentInstrumentPayload';
  /** The updated Subscription Contract after the payment instrument change. */
  contract?: Maybe<SubscriptionContract>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<SubscriptionContractUserError>;
};

/** An auto-generated type for paginating through multiple SubscriptionContracts. */
export type SubscriptionContractConnection = {
  __typename?: 'SubscriptionContractConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<SubscriptionContractEdge>;
  /** A list of nodes that are contained in SubscriptionContractEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<SubscriptionContract>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one SubscriptionContract and a cursor during pagination. */
export type SubscriptionContractEdge = {
  __typename?: 'SubscriptionContractEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of SubscriptionContractEdge. */
  node: SubscriptionContract;
};

/** Return type for `subscriptionContractFetchDeliveryOptions` mutation. */
export type SubscriptionContractFetchDeliveryOptionsPayload = {
  __typename?: 'SubscriptionContractFetchDeliveryOptionsPayload';
  /** The available delivery options for a given delivery address. Returns `null` for pending requests. */
  deliveryOptionsResult?: Maybe<SubscriptionDeliveryOptionsResult>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<SubscriptionContractUserError>;
};

/** The possible values of the last billing error on a subscription contract. */
export type SubscriptionContractLastBillingErrorType =
  /** Subscription billing attempt error due to customer error. */
  | 'CUSTOMER_ERROR'
  /** Subscription billing attempt error due to inventory error. */
  | 'INVENTORY_ERROR'
  /** All other billing attempt errors. */
  | 'OTHER'
  /** Subscription billing attempt error due to payment error. */
  | 'PAYMENT_ERROR';

/** The status of the last payment on a subscription contract. */
export type SubscriptionContractLastPaymentStatus =
  /** A failed subscription billing attempt. */
  | 'FAILED'
  /** A successful subscription billing attempt. */
  | 'SUCCEEDED';

/** Return type for `subscriptionContractPause` mutation. */
export type SubscriptionContractPausePayload = {
  __typename?: 'SubscriptionContractPausePayload';
  /** The updated Subscription Contract after the pause operation. */
  contract?: Maybe<SubscriptionContract>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<SubscriptionContractStatusUpdateUserError>;
};

/** Return type for `subscriptionContractSelectDeliveryMethod` mutation. */
export type SubscriptionContractSelectDeliveryMethodPayload = {
  __typename?: 'SubscriptionContractSelectDeliveryMethodPayload';
  /** The updated subscription contract object. */
  contract?: Maybe<SubscriptionContract>;
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<SubscriptionContractUserError>;
};

/** Possible error codes that can be returned by `SubscriptionContractStatusUpdateUserError`. */
export type SubscriptionContractStatusUpdateErrorCode =
  /** Subscription contract status cannot be changed once failed. */
  | 'CONTRACT_FAILED'
  /** Subscription contract status cannot be changed once terminated. */
  | 'CONTRACT_TERMINATED'
  /** Subscription contract has a future contract or schedule edit. */
  | 'HAS_FUTURE_EDITS'
  /** The input value is invalid. */
  | 'INVALID'
  /** Subscription contract does not exist. */
  | 'SUBSCRIPTION_CONTRACT_DOES_NOT_EXIST';

/** The error codes for failed subscription contract mutations. */
export type SubscriptionContractStatusUpdateUserError = DisplayableError & {
  __typename?: 'SubscriptionContractStatusUpdateUserError';
  /** The error code. */
  code?: Maybe<SubscriptionContractStatusUpdateErrorCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** The status of a subscription. */
export type SubscriptionContractSubscriptionStatus =
  /** The contract is active and is continuing per its policies. */
  | 'ACTIVE'
  /** The contract was ended by an unplanned customer action. */
  | 'CANCELLED'
  /** The contract has ended per the expected circumstances. All billing and delivery cycles of the subscriptions have been executed. */
  | 'EXPIRED'
  /** The contract has ended because billing failed and no further billing attempts are expected. */
  | 'FAILED'
  /** The contract is temporarily paused and is expected to resume in the future. */
  | 'PAUSED'
  /** The contract has expired due to inactivity. */
  | 'STALE';

/** The error codes for failed subscription contract mutations. */
export type SubscriptionContractUserError = DisplayableError & {
  __typename?: 'SubscriptionContractUserError';
  /** The error code. */
  code?: Maybe<SubscriptionContractUserErrorCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Possible error codes that can be returned by `SubscriptionContractUserError`. */
export type SubscriptionContractUserErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** Subscription contract has a future contract or schedule edit. */
  | 'HAS_FUTURE_EDITS'
  /** The input value is invalid. */
  | 'INVALID'
  /** Payment instrument does not exist. */
  | 'PAYMENT_INSTRUMENT_DOES_NOT_EXIST'
  /** Subscription contract does not exist. */
  | 'SUBSCRIPTION_CONTRACT_DOES_NOT_EXIST';

/** The set of valid sort keys for the SubscriptionContracts query. */
export type SubscriptionContractsSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  | 'RELEVANCE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The delivery method to use to deliver the physical goods to the customer. */
export type SubscriptionDeliveryMethod =
  | SubscriptionDeliveryMethodLocalDelivery
  | SubscriptionDeliveryMethodPickup
  | SubscriptionDeliveryMethodShipping;

/**
 * Specifies delivery method fields for a subscription contract.
 * This is an input union: one, and only one, field can be provided.
 * The field provided will determine which delivery method is to be used.
 */
export type SubscriptionDeliveryMethodInput = {
  /** The input fields for the local delivery method. */
  localDelivery?: InputMaybe<SubscriptionDeliveryMethodLocalDeliveryInput>;
  /** The input fields for the pickup delivery method. */
  pickup?: InputMaybe<SubscriptionDeliveryMethodPickupInput>;
  /** The input fields for the shipping delivery method. */
  shipping?: InputMaybe<SubscriptionDeliveryMethodShippingInput>;
};

/** The local delivery method, including a mailing address and a local delivery option. */
export type SubscriptionDeliveryMethodLocalDelivery = {
  __typename?: 'SubscriptionDeliveryMethodLocalDelivery';
  /** The delivery address. */
  address: SubscriptionMailingAddress;
  /** The local delivery method details. */
  localDeliveryOption: SubscriptionDeliveryMethodLocalDeliveryOption;
};

/** The input fields for a local delivery method. */
export type SubscriptionDeliveryMethodLocalDeliveryInput = {
  /** The address to deliver to. */
  address?: InputMaybe<CustomerMailingAddressInput>;
  /** The address to deliver to. */
  deliveryAddress?: InputMaybe<CustomerAddressInput>;
  /** The delivery instructions that the customer can provide to the merchant. */
  instructions?: InputMaybe<Scalars['String']['input']>;
  /**
   * The phone number that the customer must provide to the merchant.
   * Formatted using E.164 standard. For example, `+16135551111`.
   */
  phone: Scalars['String']['input'];
};

/** The delivery option selected for a subscription contract. */
export type SubscriptionDeliveryMethodLocalDeliveryOption = {
  __typename?: 'SubscriptionDeliveryMethodLocalDeliveryOption';
  /** The description of the delivery option shown to the customer. */
  description?: Maybe<Scalars['String']['output']>;
  /** The delivery instructions provided by the customer to the merchant. */
  instructions?: Maybe<Scalars['String']['output']>;
  /**
   * The phone number of the customer provided to the merchant.
   * Formatted using E.164 standard. For example, `+16135551111`.
   */
  phone: Scalars['String']['output'];
  /** The displayed title of the delivery option. */
  presentmentTitle?: Maybe<Scalars['String']['output']>;
  /** The title of the delivery option. */
  title?: Maybe<Scalars['String']['output']>;
};

/** A delivery method with a pickup option. */
export type SubscriptionDeliveryMethodPickup = {
  __typename?: 'SubscriptionDeliveryMethodPickup';
  /** The details of the pickup delivery method. */
  pickupOption: SubscriptionDeliveryMethodPickupOption;
};

/** The input fields for a pickup delivery method. */
export type SubscriptionDeliveryMethodPickupInput = {
  /** The ID of the pickup location. */
  locationId: Scalars['ID']['input'];
};

/** Represents the selected pickup option on a subscription contract. */
export type SubscriptionDeliveryMethodPickupOption = {
  __typename?: 'SubscriptionDeliveryMethodPickupOption';
  /** The details displayed to the customer to describe the pickup option. */
  description?: Maybe<Scalars['String']['output']>;
  /** The address where the customer will pick up the merchandise. */
  pickupAddress: PickupAddress;
  /** The presentment title of the pickup option. */
  presentmentTitle?: Maybe<Scalars['String']['output']>;
  /** The title of the pickup option. */
  title?: Maybe<Scalars['String']['output']>;
};

/** The shipping delivery method, including a mailing address and a shipping option. */
export type SubscriptionDeliveryMethodShipping = {
  __typename?: 'SubscriptionDeliveryMethodShipping';
  /** The address for shipping. */
  address: SubscriptionMailingAddress;
  /** The details of the shipping method. */
  shippingOption: SubscriptionDeliveryMethodShippingOption;
};

/** The input fields for a shipping delivery method. */
export type SubscriptionDeliveryMethodShippingInput = {
  /** The address to ship to. */
  address?: InputMaybe<CustomerMailingAddressInput>;
  /** The address to ship to. */
  shippingAddress?: InputMaybe<CustomerAddressInput>;
};

/** The selected shipping option on a subscription contract. */
export type SubscriptionDeliveryMethodShippingOption = {
  __typename?: 'SubscriptionDeliveryMethodShippingOption';
  /** The description of the shipping option. */
  description?: Maybe<Scalars['String']['output']>;
  /** The presentment title of the shipping option. */
  presentmentTitle?: Maybe<Scalars['String']['output']>;
  /** The title of the shipping option. */
  title?: Maybe<Scalars['String']['output']>;
};

/** The delivery option for a subscription contract. */
export type SubscriptionDeliveryOption =
  | SubscriptionLocalDeliveryOption
  | SubscriptionPickupOption
  | SubscriptionShippingOption;

/** The result of the query that fetches delivery options for the subscription contract. */
export type SubscriptionDeliveryOptionsResult =
  | SubscriptionDeliveryOptionsResultFailure
  | SubscriptionDeliveryOptionsResultSuccess;

/** A failed result indicating unavailability of delivery options for the subscription contract. */
export type SubscriptionDeliveryOptionsResultFailure = {
  __typename?: 'SubscriptionDeliveryOptionsResultFailure';
  /** The reason for the failure. */
  message?: Maybe<Scalars['String']['output']>;
};

/** A successful result containing the available delivery options for the subscription contract. */
export type SubscriptionDeliveryOptionsResultSuccess = {
  __typename?: 'SubscriptionDeliveryOptionsResultSuccess';
  /** The available delivery options. */
  deliveryOptions: Array<SubscriptionDeliveryOption>;
  /** The token associated with the successful result of delivery options. */
  token: Scalars['String']['output'];
};

/** The delivery policy of a subscription. */
export type SubscriptionDeliveryPolicy = {
  __typename?: 'SubscriptionDeliveryPolicy';
  /** The anchor dates for calculating delivery intervals. */
  anchors: Array<SubscriptionAnchor>;
  /** The type of interval associated with this schedule (e.g. Monthly, Weekly, etc). */
  interval: SubscriptionInterval;
  /** The number of intervals between deliveries. */
  intervalCount?: Maybe<Count>;
};

/** Defines valid subscription intervals. */
export type SubscriptionInterval =
  /** Represents a day interval. */
  | 'DAY'
  /** Represents a month interval. */
  | 'MONTH'
  /** Represents a week interval. */
  | 'WEEK'
  /** Represents a year interval. */
  | 'YEAR';

/** A line item in a subscription. */
export type SubscriptionLine = {
  __typename?: 'SubscriptionLine';
  /** The current price per unit for the subscription line in the contract's currency. */
  currentPrice: MoneyV2;
  /** The custom attributes associated with the line item. */
  customAttributes: Array<Attribute>;
  /** The unique ID of the line item. */
  id: Scalars['ID']['output'];
  /** The image associated with the product variant. */
  image?: Maybe<Image>;
  /** The total price of the line item after all discounts have been applied. */
  lineDiscountedPrice: MoneyV2;
  /** The name of the product. */
  name: Scalars['String']['output'];
  /**
   * The URL of the product in the online store.
   * A value of `null` indicates that the product isn't published in the Online Store sales channel.
   */
  onlineStoreUrl?: Maybe<Scalars['URL']['output']>;
  /** The quantity of the unit selected for the subscription line. */
  quantity: Scalars['Int']['output'];
  /** Whether the product variant requires shipping. */
  requiresShipping: Scalars['Boolean']['output'];
  /** The SKU of the product variant associated with the subscription line. */
  sku?: Maybe<Scalars['String']['output']>;
  /** Whether the product variant is taxable. */
  taxable: Scalars['Boolean']['output'];
  /** The title of the product associated with the subscription line. */
  title: Scalars['String']['output'];
  /** The image associated with the product variant. */
  variantImage?: Maybe<Image>;
  /** The title of the product variant associated with the subscription line. */
  variantTitle?: Maybe<Scalars['String']['output']>;
};

/** An auto-generated type for paginating through multiple SubscriptionLines. */
export type SubscriptionLineConnection = {
  __typename?: 'SubscriptionLineConnection';
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<SubscriptionLineEdge>;
  /** A list of nodes that are contained in SubscriptionLineEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<SubscriptionLine>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one SubscriptionLine and a cursor during pagination. */
export type SubscriptionLineEdge = {
  __typename?: 'SubscriptionLineEdge';
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: Scalars['String']['output'];
  /** The item at the end of SubscriptionLineEdge. */
  node: SubscriptionLine;
};

/** A local delivery option for a subscription contract. */
export type SubscriptionLocalDeliveryOption = {
  __typename?: 'SubscriptionLocalDeliveryOption';
  /** The code of the local delivery option. */
  code: Scalars['String']['output'];
  /** The description of the local delivery option. */
  description?: Maybe<Scalars['String']['output']>;
  /** Whether a phone number is required for the local delivery option. */
  phoneRequired: Scalars['Boolean']['output'];
  /** The presentment title of the local delivery option. */
  presentmentTitle?: Maybe<Scalars['String']['output']>;
  /** The price of the local delivery option. */
  price: MoneyV2;
  /** The title of the local delivery option. */
  title: Scalars['String']['output'];
};

/** The mailing address on a subscription. */
export type SubscriptionMailingAddress = {
  __typename?: 'SubscriptionMailingAddress';
  /** The first line of the address, typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']['output']>;
  /** The second line of the address, typically the apartment, suite, or unit number. */
  address2?: Maybe<Scalars['String']['output']>;
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']['output']>;
  /** The name of the customer's company or organization. */
  company?: Maybe<Scalars['String']['output']>;
  /** The name of the country. */
  country?: Maybe<Scalars['String']['output']>;
  /**
   * The two-letter code for the country of the address.
   * For example, US.
   */
  countryCode?: Maybe<CountryCode>;
  /** The first name of the customer. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** The last name of the customer. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** The full name of the customer, based on the first name and last name. */
  name?: Maybe<Scalars['String']['output']>;
  /** A unique phone number for the customer, formatted using the E.164 standard. For example, _+16135551111_. */
  phone?: Maybe<Scalars['String']['output']>;
  /** The region of the address, such as the province, state, or district. */
  province?: Maybe<Scalars['String']['output']>;
  /**
   * The alphanumeric code for the region.
   * For example, ON.
   */
  provinceCode?: Maybe<Scalars['String']['output']>;
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars['String']['output']>;
};

/** Represents an anchor specifying a day of the month. */
export type SubscriptionMonthDayAnchor = {
  __typename?: 'SubscriptionMonthDayAnchor';
  /** Day of the month (1-31). */
  dayOfMonth: Scalars['Int']['output'];
};

/** A pickup option to deliver a subscription contract. */
export type SubscriptionPickupOption = {
  __typename?: 'SubscriptionPickupOption';
  /** The code of the pickup option. */
  code: Scalars['String']['output'];
  /** The description of the pickup option. */
  description?: Maybe<Scalars['String']['output']>;
  /** The ID of the pickup location. */
  locationId: Scalars['ID']['output'];
  /** Whether a phone number is required for the pickup option. */
  phoneRequired: Scalars['Boolean']['output'];
  /** The address where the customer will pick up the merchandise. */
  pickupAddress: PickupAddress;
  /** The estimated amount of time it takes for the pickup to be ready. For example, "Usually ready in 24 hours". */
  pickupTime: Scalars['String']['output'];
  /** The presentment title of the pickup option. */
  presentmentTitle?: Maybe<Scalars['String']['output']>;
  /** The price of the pickup option. */
  price: MoneyV2;
  /** The title of the pickup option. */
  title: Scalars['String']['output'];
};

/** Represents the breakdown of prices to be charges in the billing attempt. */
export type SubscriptionPriceBreakdown = {
  __typename?: 'SubscriptionPriceBreakdown';
  /**
   * The sum of the prices for all line items after discounts.
   * If taxesIncluded is true, then the subtotal also includes tax.
   */
  subtotalPrice: MoneyV2;
  /** Whether taxes are included in the subtotal price. */
  taxesIncluded: Scalars['Boolean']['output'];
  /**
   * The total amount discounted.
   * This includes both order and line level discounts.
   */
  totalDiscounts: MoneyV2;
  /** The total price. This includes taxes and discounts. */
  totalPrice: MoneyV2;
  /** The total shipping amount before discounts and returns. */
  totalShippingPrice: MoneyV2;
  /** The total tax amount. */
  totalTax: MoneyV2;
};

/** A shipping option to deliver a subscription contract. */
export type SubscriptionShippingOption = {
  __typename?: 'SubscriptionShippingOption';
  /** The code of the shipping option. */
  code: Scalars['String']['output'];
  /** The description of the shipping option. */
  description?: Maybe<Scalars['String']['output']>;
  /** Whether a phone number is required for the shipping option. */
  phoneRequired: Scalars['Boolean']['output'];
  /** The presentment title of the shipping option. */
  presentmentTitle?: Maybe<Scalars['String']['output']>;
  /** The price of the shipping option. */
  price: MoneyV2;
  /** The title of the shipping option. */
  title: Scalars['String']['output'];
};

/** Represents an anchor specifying a day of the week. */
export type SubscriptionWeekDayAnchor = {
  __typename?: 'SubscriptionWeekDayAnchor';
  /** Day of the week (1-7, where 1 is Monday). */
  dayOfWeek: Scalars['Int']['output'];
};

/** Represents an anchor specifying a specific day and month of the year. */
export type SubscriptionYearDayAnchor = {
  __typename?: 'SubscriptionYearDayAnchor';
  /** Day of the month (1-31). Specifies the exact day within the given month. */
  dayOfMonth: Scalars['Int']['output'];
  /** Month of the year (1-12). Specifies the month in which the day occurs. */
  month: Scalars['Int']['output'];
};

/** The available tax exemptions for a customer. */
export type TaxExemption =
  /** This customer is exempt from GST taxes for holding a valid exemption. The business customer should provide their GST number and account for the GST. */
  | 'AUSTRALIA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in British Columbia. */
  | 'CA_BC_COMMERCIAL_FISHERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid CONTRACTOR_EXEMPTION in British Columbia. */
  | 'CA_BC_CONTRACTOR_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid PRODUCTION_AND_MACHINERY_EXEMPTION in British Columbia. */
  | 'CA_BC_PRODUCTION_AND_MACHINERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in British Columbia. */
  | 'CA_BC_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid SUB_CONTRACTOR_EXEMPTION in British Columbia. */
  | 'CA_BC_SUB_CONTRACTOR_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid DIPLOMAT_EXEMPTION in Canada. */
  | 'CA_DIPLOMAT_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in Manitoba. */
  | 'CA_MB_COMMERCIAL_FISHERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid FARMER_EXEMPTION in Manitoba. */
  | 'CA_MB_FARMER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Manitoba. */
  | 'CA_MB_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in Nova Scotia. */
  | 'CA_NS_COMMERCIAL_FISHERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid FARMER_EXEMPTION in Nova Scotia. */
  | 'CA_NS_FARMER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid PURCHASE_EXEMPTION in Ontario. */
  | 'CA_ON_PURCHASE_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in Prince Edward Island. */
  | 'CA_PE_COMMERCIAL_FISHERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in Saskatchewan. */
  | 'CA_SK_COMMERCIAL_FISHERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid CONTRACTOR_EXEMPTION in Saskatchewan. */
  | 'CA_SK_CONTRACTOR_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid FARMER_EXEMPTION in Saskatchewan. */
  | 'CA_SK_FARMER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid PRODUCTION_AND_MACHINERY_EXEMPTION in Saskatchewan. */
  | 'CA_SK_PRODUCTION_AND_MACHINERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Saskatchewan. */
  | 'CA_SK_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid SUB_CONTRACTOR_EXEMPTION in Saskatchewan. */
  | 'CA_SK_SUB_CONTRACTOR_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid STATUS_CARD_EXEMPTION in Canada. */
  | 'CA_STATUS_CARD_EXEMPTION'
  /** This customer is exempt from VAT for purchases within the EU that is shipping from outside of customer's country. */
  | 'EU_REVERSE_CHARGE_EXEMPTION_RULE'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Alaska. */
  | 'US_AK_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Alabama. */
  | 'US_AL_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Arkansas. */
  | 'US_AR_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Arizona. */
  | 'US_AZ_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in California. */
  | 'US_CA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Colorado. */
  | 'US_CO_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Connecticut. */
  | 'US_CT_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Washington DC. */
  | 'US_DC_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Delaware. */
  | 'US_DE_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Florida. */
  | 'US_FL_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Georgia. */
  | 'US_GA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Hawaii. */
  | 'US_HI_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Iowa. */
  | 'US_IA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Idaho. */
  | 'US_ID_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Illinois. */
  | 'US_IL_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Indiana. */
  | 'US_IN_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Kansas. */
  | 'US_KS_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Kentucky. */
  | 'US_KY_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Louisiana. */
  | 'US_LA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Massachusetts. */
  | 'US_MA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Maryland. */
  | 'US_MD_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Maine. */
  | 'US_ME_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Michigan. */
  | 'US_MI_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Minnesota. */
  | 'US_MN_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Missouri. */
  | 'US_MO_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Mississippi. */
  | 'US_MS_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Montana. */
  | 'US_MT_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in North Carolina. */
  | 'US_NC_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in North Dakota. */
  | 'US_ND_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Nebraska. */
  | 'US_NE_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in New Hampshire. */
  | 'US_NH_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in New Jersey. */
  | 'US_NJ_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in New Mexico. */
  | 'US_NM_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Nevada. */
  | 'US_NV_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in New York. */
  | 'US_NY_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Ohio. */
  | 'US_OH_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Oklahoma. */
  | 'US_OK_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Oregon. */
  | 'US_OR_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Pennsylvania. */
  | 'US_PA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Rhode Island. */
  | 'US_RI_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in South Carolina. */
  | 'US_SC_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in South Dakota. */
  | 'US_SD_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Tennessee. */
  | 'US_TN_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Texas. */
  | 'US_TX_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Utah. */
  | 'US_UT_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Virginia. */
  | 'US_VA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Vermont. */
  | 'US_VT_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Washington. */
  | 'US_WA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Wisconsin. */
  | 'US_WI_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in West Virginia. */
  | 'US_WV_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Wyoming. */
  | 'US_WY_RESELLER_EXEMPTION';

/** The detailed information about tax exemptions that can be applied to customers. */
export type TaxExemptionDetails = {
  __typename?: 'TaxExemptionDetails';
  /** Whether the tax exemption can be applied on tax lines. */
  applicable: Scalars['Boolean']['output'];
  /** An identifier that groups exemptions. */
  exemptionGroup: Scalars['String']['output'];
  /** The translated display name of the tax exemption group. */
  exemptionGroupName: Scalars['String']['output'];
  /** The translated display name of the tax exemption when grouped. */
  groupedName: Scalars['String']['output'];
  /** The translated display name of the tax exemption. */
  name: Scalars['String']['output'];
  /** The code of the tax region this exemption applies to. If null, it applies in all regions. */
  taxRegionCode?: Maybe<TaxRegionCode>;
  /** The unique type of the exemption. */
  type: TaxExemption;
};

/** A tax invoice on an order. */
export type TaxInvoice = {
  __typename?: 'TaxInvoice';
  /** The time zone of the destination address of the tax invoice. */
  buyerTimeZone: Scalars['String']['output'];
  /** The datetime of when the tax invoice was created. */
  createdAt: Scalars['DateTime']['output'];
  /** The invoice number of the tax invoice. */
  invoiceNumber: Scalars['String']['output'];
  /** The current processing status of the tax invoice. */
  status: TaxInvoiceStatus;
  /** The url to download the tax invoice. */
  url: Scalars['URL']['output'];
};

/** The current processing status of the tax invoices. */
export type TaxInvoiceStatus =
  /** The tax invoice has been created. */
  | 'PROCESSED'
  /** The tax invoice is being created. */
  | 'PROCESSING';

/** The details about a single tax applied to the associated line item. */
export type TaxLine = Node & {
  __typename?: 'TaxLine';
  /** Whether the channel that submitted the tax line is responsible for remitting it. */
  channelLiable: Scalars['Boolean']['output'];
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The tax amount in shop and presentment currencies, calculated after discounts and before returns. */
  priceSet: MoneyV2;
  /** The proportion of the line item price represented by the tax, expressed as a decimal. */
  rate?: Maybe<Scalars['Float']['output']>;
  /** The proportion of the line item price represented by the tax, expressed as a percentage. */
  ratePercentage?: Maybe<Scalars['Float']['output']>;
  /** The origin of the tax. */
  source?: Maybe<Scalars['String']['output']>;
  /** The name of the applied tax. */
  title: Scalars['String']['output'];
};

/** The ISO 3166-1 alpha-2 codes that distinguish a region where common tax rules apply. */
export type TaxRegionCode =
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
  /** European Union. */
  | 'EU'
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
  | 'ZW';

/** The events that chronicle resource activities available to the customer. */
export type TimelineEvent = Node & {
  __typename?: 'TimelineEvent';
  /** The date and time when the event occurred. */
  happenedAt: Scalars['DateTime']['output'];
  /** The unique ID for the timeline event. */
  id: Scalars['ID']['output'];
  /** Additional details about the event. */
  message?: Maybe<Scalars['String']['output']>;
  /** The subtitle of the event. */
  subtitle?: Maybe<Scalars['String']['output']>;
  /** The title of the event. */
  title: Scalars['String']['output'];
};

/** A sale that is associated with a tip. */
export type TipSale = Node &
  Sale & {
    __typename?: 'TipSale';
    /** The type of order action represented by the sale. */
    actionType: SaleActionType;
    /** The unique ID of the sale. */
    id: Scalars['ID']['output'];
    /** The line item associated with the sale. */
    lineItem: LineItem;
    /** The type of line associated with the sale. */
    lineType: SaleLineType;
    /** The number of units ordered or intended to be returned. */
    quantity?: Maybe<Scalars['Int']['output']>;
    /** The individual taxes associated with the sale. */
    taxes: Array<SaleTax>;
    /** The total sale amount after taxes and discounts. */
    totalAmount: MoneyV2;
    /** The total amount of discounts allocated to the sale after taxes. */
    totalDiscountAmountAfterTaxes: MoneyV2;
    /** The total discounts allocated to the sale before taxes. */
    totalDiscountAmountBeforeTaxes: MoneyV2;
    /** The total tax amount for the sale. */
    totalTaxAmount: MoneyV2;
  };

/** Represents the tracking information for a fulfillment. */
export type TrackingInformation = {
  __typename?: 'TrackingInformation';
  /** The name of the tracking company. */
  company?: Maybe<Scalars['String']['output']>;
  /** The tracking number for the fulfillment. */
  number?: Maybe<Scalars['String']['output']>;
  /** The URLs to track the fulfillment. */
  url?: Maybe<Scalars['URL']['output']>;
};

/** The set of valid sort keys for the Transaction query. */
export type TransactionSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `expires_at` value. */
  | 'EXPIRES_AT';

/** The details related to the transaction type. */
export type TransactionTypeDetails = {
  __typename?: 'TransactionTypeDetails';
  /** The message of the transaction type. */
  message?: Maybe<Scalars['String']['output']>;
  /** The name of the transaction type. */
  name?: Maybe<Scalars['String']['output']>;
};

/**
 * The custom data attached to a resource. Metafields can be sorted into namespaces and are
 * comprised of keys, values, and value types.
 */
export type UiExtensionMetafield = Node & {
  __typename?: 'UiExtensionMetafield';
  /** The description of a metafield. */
  description?: Maybe<Scalars['String']['output']>;
  /** A globally-unique ID. */
  id: Scalars['ID']['output'];
  /** The key name for a metafield. */
  key: Scalars['String']['output'];
  /** The namespace for a metafield. */
  namespace: Scalars['String']['output'];
  /** The owner ID for a metafield. */
  ownerId: Scalars['ID']['output'];
  /**
   * The type name of the metafield.
   * See the list of [supported types](https://shopify.dev/apps/metafields/definitions/types).
   */
  type: Scalars['String']['output'];
  /** The value of a metafield. */
  value: Scalars['String']['output'];
  /**
   * Represents the metafield value type.
   * @deprecated `valueType` is deprecated and replaced by `type`.
   */
  valueType: MetafieldValueType;
};

/** The input fields for filtering ui extension metafields. */
export type UiExtensionMetafieldFilterInput = {
  /** A metafield key. */
  key: Scalars['String']['input'];
  /** A metafield namespace. */
  namespace: Scalars['String']['input'];
};

/** A session token for a UI extension. */
export type UiExtensionSessionToken = {
  __typename?: 'UiExtensionSessionToken';
  /** The second count until the session token expires. */
  expiresIn: Scalars['Int']['output'];
  /** The value of the UI extension session token. */
  value: Scalars['String']['output'];
};

/** The information about the container for unfulfilled digital line items (excluding gift cards). */
export type UnfulfilledDigitalLineItemContainer =
  UnfulfilledLineItemContainerCommonFields & {
    __typename?: 'UnfulfilledDigitalLineItemContainer';
    /** The line items within this container. */
    lineItems: LineItemContainerLineItemConnection;
  };

/** The information about the container for unfulfilled digital line items (excluding gift cards). */
export type UnfulfilledDigitalLineItemContainerLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The information about the container for unfulfilled gift card type line items. */
export type UnfulfilledGiftCardLineItemContainer =
  UnfulfilledLineItemContainerCommonFields & {
    __typename?: 'UnfulfilledGiftCardLineItemContainer';
    /** The line items within this container. */
    lineItems: LineItemContainerLineItemConnection;
  };

/** The information about the container for unfulfilled gift card type line items. */
export type UnfulfilledGiftCardLineItemContainerLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The information about the container for unfulfilled line items. */
export type UnfulfilledLineItemContainer =
  UnfulfilledLineItemContainerCommonFields & {
    __typename?: 'UnfulfilledLineItemContainer';
    /** The translated state of the line item container (for example, `Unfulfilled`). */
    displayableState: Scalars['String']['output'];
    /** The line items within this container. */
    lineItems: LineItemContainerLineItemConnection;
    /** The state of the line item container (for example, `unfulfilled`). */
    state: Scalars['String']['output'];
  };

/** The information about the container for unfulfilled line items. */
export type UnfulfilledLineItemContainerLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The common fields for containers of unfulfilled line items series. */
export type UnfulfilledLineItemContainerCommonFields = {
  /** The line items within this container. */
  lineItems: LineItemContainerLineItemConnection;
};

/** The common fields for containers of unfulfilled line items series. */
export type UnfulfilledLineItemContainerCommonFieldsLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The information about the container for unfulfilled physical type line items. */
export type UnfulfilledPhysicalLineItemContainer =
  UnfulfilledLineItemContainerCommonFields & {
    __typename?: 'UnfulfilledPhysicalLineItemContainer';
    /** The line items within this container. */
    lineItems: LineItemContainerLineItemConnection;
  };

/** The information about the container for unfulfilled physical type line items. */
export type UnfulfilledPhysicalLineItemContainerLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The unit price of the line component. For example, "$9.99 / 100ml". */
export type UnitPrice = {
  __typename?: 'UnitPrice';
  /** The unit measurement. For example, "$9.99 / 100ml". */
  measurement: UnitPriceMeasurement;
  /** The unit price of the variant. For example, "$1 per xy" where price is "$1". */
  price: MoneyV2;
};

/** The unit price measurement of the line component. For example, "$9.99 / 100ml". */
export type UnitPriceMeasurement = {
  __typename?: 'UnitPriceMeasurement';
  /** The reference unit for the unit price measurement. For example, "$9.99 / 100ml" where the reference unit is "ml". */
  referenceUnit: UnitPriceMeasurementUnit;
  /** The reference value for the unit price measurement. For example, "$9.99 / 100ml" where the reference value is "100". */
  referenceValue: Scalars['Int']['output'];
};

/** The valid units of measurement for a unit price measurement. */
export type UnitPriceMeasurementUnit =
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

/** This represents new sale types that have been added in future API versions. You may update to a more recent API version to receive additional details about this sale. */
export type UnknownSale = Node &
  Sale & {
    __typename?: 'UnknownSale';
    /** The type of order action represented by the sale. */
    actionType: SaleActionType;
    /** The unique ID of the sale. */
    id: Scalars['ID']['output'];
    /** The line type assocated with the sale. */
    lineType: SaleLineType;
    /** The number of units ordered or intended to be returned. */
    quantity?: Maybe<Scalars['Int']['output']>;
    /** The individual taxes associated with the sale. */
    taxes: Array<SaleTax>;
    /** The total sale amount after taxes and discounts. */
    totalAmount: MoneyV2;
    /** The total amount of discounts allocated to the sale after taxes. */
    totalDiscountAmountAfterTaxes: MoneyV2;
    /** The total discounts allocated to the sale before taxes. */
    totalDiscountAmountBeforeTaxes: MoneyV2;
    /** The total tax amount for the sale. */
    totalTaxAmount: MoneyV2;
  };

/** The error codes for failed business contact mutations. */
export type UserErrorsBusinessContactUserErrors = DisplayableError & {
  __typename?: 'UserErrorsBusinessContactUserErrors';
  /** The error code. */
  code?: Maybe<UserErrorsBusinessContactUserErrorsCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Possible error codes that can be returned by `UserErrorsBusinessContactUserErrors`. */
export type UserErrorsBusinessContactUserErrorsCode =
  /** Business contact was not found. */
  | 'BUSINESS_CONTACT_NOT_FOUND'
  /** Business contact update input argument is empty. */
  | 'BUSINESS_CONTACT_UPDATE_INPUT_ARGUMENT_EMPTY'
  /** Business contact field is too long. */
  | 'TOO_LONG';

/** The error codes for failed payment instrument mutations. */
export type UserErrorsBusinessLocationPaymentInstrumentUserErrors =
  DisplayableError & {
    __typename?: 'UserErrorsBusinessLocationPaymentInstrumentUserErrors';
    /** The error code. */
    code?: Maybe<UserErrorsBusinessLocationPaymentInstrumentUserErrorsCode>;
    /** The path to the input field that caused the error. */
    field?: Maybe<Array<Scalars['String']['output']>>;
    /** The error message. */
    message: Scalars['String']['output'];
  };

/** Possible error codes that can be returned by `UserErrorsBusinessLocationPaymentInstrumentUserErrors`. */
export type UserErrorsBusinessLocationPaymentInstrumentUserErrorsCode =
  /** Address1 field is missing. */
  | 'ADDRESS1_MISSING'
  /** Address argument is empty. */
  | 'ADDRESS_ARGUMENT_EMPTY'
  /** The card's brand is not supported. */
  | 'BRAND_NOT_SUPPORTED'
  /** Cannot replace a payment instrument with itself. */
  | 'CANNOT_REPLACE_PAYMENT_INSTRUMENT_WITH_ITSELF'
  /** City field is missing. */
  | 'CITY_MISSING'
  /** Company location ID does not exist. */
  | 'COMPANY_LOCATION_ID_DOES_NOT_EXIST'
  /** Country Code field is missing. */
  | 'COUNTRY_CODE_MISSING'
  /** The card was declined. */
  | 'DECLINED'
  /** The card is expired. */
  | 'EXPIRED'
  /** The card's first name is missing. */
  | 'FIRST_NAME_BLANK'
  /** An error occured. */
  | 'GENERIC_ERROR'
  /** The address is incorrect. */
  | 'INCORRECT'
  /** Address field is not valid. */
  | 'INVALID'
  /** Invalid for country. */
  | 'INVALID_FOR_COUNTRY'
  /** Invalid for country and province. */
  | 'INVALID_FOR_COUNTRY_AND_PROVINCE'
  /** Invalid province in country. */
  | 'INVALID_PROVINCE_IN_COUNTRY'
  /** The card's start date or issue number is invalid. */
  | 'INVALID_START_DATE_OR_ISSUE_NUMBER_FOR_DEBIT'
  /** Invalid state in country. */
  | 'INVALID_STATE_IN_COUNTRY'
  /** The card's last name is missing. */
  | 'LAST_NAME_BLANK'
  /** The card's month is invalid. */
  | 'MONTH_INVALID'
  /** The card's name is invalid. */
  | 'NAME_INVALID'
  /** The card's number is invalid. */
  | 'NUMBER_INVALID'
  /** Payment instrument ID does not exist. */
  | 'PAYMENT_INSTRUMENT_ID_DOES_NOT_EXIST'
  /** This payment instrument is already on file. */
  | 'PAYMENT_INSTRUMENT_TAKEN'
  /** Phone number is not valid. */
  | 'PHONE_NUMBER_NOT_VALID'
  /** The field is required. */
  | 'REQUIRED'
  /** This test card cannot be used for real transactions. */
  | 'TEST_MODE_LIVE_CARD'
  /** Address field is too long. */
  | 'TOO_LONG'
  /** Too many payment instrument updates. */
  | 'UPDATE_LIMIT_EXCEEDED'
  /** The card's verification value is missing. */
  | 'VERIFICATION_VALUE_BLANK'
  /** The card's verification value is incorrect. */
  | 'VERIFICATION_VALUE_INCORRECT'
  /** The card's verification value is invalid. */
  | 'VERIFICATION_VALUE_INVALID_FOR_CARD_TYPE'
  /** The card's year is invalid. */
  | 'YEAR_INVALID'
  /** The address's zip code is incorrect. */
  | 'ZIP_INCORRECT'
  /** Zone Code field is missing. */
  | 'ZONE_CODE_MISSING';

/** The error codes that are provided for failed address mutations. */
export type UserErrorsCustomerAddressUserErrors = DisplayableError & {
  __typename?: 'UserErrorsCustomerAddressUserErrors';
  /** The error code. */
  code?: Maybe<UserErrorsCustomerAddressUserErrorsCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Possible error codes that can be returned by `UserErrorsCustomerAddressUserErrors`. */
export type UserErrorsCustomerAddressUserErrorsCode =
  /** The Address1 field is missing. */
  | 'ADDRESS1_MISSING'
  /** The provided address argument is empty. */
  | 'ADDRESS_ARGUMENT_EMPTY'
  /** The provided address ID doesn't exist. */
  | 'ADDRESS_ID_DOES_NOT_EXIST'
  /** The provided country doesn't exist. */
  | 'COUNTRY_NOT_EXIST'
  /** The provided customer address already exists. */
  | 'CUSTOMER_ADDRESS_ALREADY_EXISTS'
  /** The default address of the customer can't be deleted before setting another one as default. */
  | 'DELETING_CUSTOMER_DEFAULT_ADDRESS_NOT_ALLOWED'
  /** Demoting the default address of the customer isn't allowed. */
  | 'DEMOTING_CUSTOMER_DEFAULT_ADDRESS_NOT_ALLOWED'
  /** The provided address field isn't valid. */
  | 'INVALID'
  /** The provided value is invalid for the country. */
  | 'INVALID_FOR_COUNTRY'
  /** The provided value is invalid for the country and province. */
  | 'INVALID_FOR_COUNTRY_AND_PROVINCE'
  /** The provided Territory Code isn't valid. */
  | 'INVALID_TERRITORY_CODE'
  /** The provided phone number isn't valid. */
  | 'PHONE_NUMBER_NOT_VALID'
  /** The field is required. */
  | 'REQUIRED'
  /** The Territory Code field is missing. */
  | 'TERRITORY_CODE_MISSING'
  /** The provided address field is too long. */
  | 'TOO_LONG'
  /** The Zone Code field is missing. */
  | 'ZONE_CODE_MISSING';

/** Provides error codes for failed marketing opt-in mutations. */
export type UserErrorsCustomerEmailMarketingOptInUserErrors =
  DisplayableError & {
    __typename?: 'UserErrorsCustomerEmailMarketingOptInUserErrors';
    /** The error code. */
    code?: Maybe<UserErrorsCustomerEmailMarketingOptInUserErrorsCode>;
    /** The path to the input field that caused the error. */
    field?: Maybe<Array<Scalars['String']['output']>>;
    /** The error message. */
    message: Scalars['String']['output'];
  };

/** Possible error codes that can be returned by `UserErrorsCustomerEmailMarketingOptInUserErrors`. */
export type UserErrorsCustomerEmailMarketingOptInUserErrorsCode =
  /** The customer is already subscribed. */
  | 'CUSTOMER_ALREADY_SUBSCRIBED'
  /** The customer does not have an email address. */
  | 'EMAIL_ADDRESS_NOT_FOUND'
  /** There was an error. */
  | 'FAILED';

/** Provides error codes for marketing subscribe mutations. */
export type UserErrorsCustomerEmailMarketingUserErrors = DisplayableError & {
  __typename?: 'UserErrorsCustomerEmailMarketingUserErrors';
  /** The error code. */
  code?: Maybe<UserErrorsCustomerEmailMarketingUserErrorsCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Possible error codes that can be returned by `UserErrorsCustomerEmailMarketingUserErrors`. */
export type UserErrorsCustomerEmailMarketingUserErrorsCode =
  /** The customer is already subscribed. */
  | 'CUSTOMER_ALREADY_SUBSCRIBED'
  /** The customer does not have an email address. */
  | 'EMAIL_ADDRESS_NOT_FOUND'
  /** Subscription failed. */
  | 'FAILED_TO_SUBSCRIBE'
  /** Unsubscription failed. */
  | 'FAILED_TO_UNSUBSCRIBE';

/** Provides error codes for failed personal information mutations. */
export type UserErrorsCustomerUserErrors = DisplayableError & {
  __typename?: 'UserErrorsCustomerUserErrors';
  /** The error code. */
  code?: Maybe<UserErrorsCustomerUserErrorsCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Possible error codes that can be returned by `UserErrorsCustomerUserErrors`. */
export type UserErrorsCustomerUserErrorsCode =
  /** The customer does not exist. */
  | 'CUSTOMER_DOES_NOT_EXIST'
  /** The personal information input argument is empty. */
  | 'CUSTOMER_INPUT_ARGUMENT_EMPTY'
  /** The personal information field is not valid. */
  | 'INVALID'
  /** The personal information field is too long. */
  | 'TOO_LONG';

/** The error codes for failed payment instrument mutations. */
export type UserErrorsPaymentInstrumentUserErrors = DisplayableError & {
  __typename?: 'UserErrorsPaymentInstrumentUserErrors';
  /** The error code. */
  code?: Maybe<UserErrorsPaymentInstrumentUserErrorsCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Possible error codes that can be returned by `UserErrorsPaymentInstrumentUserErrors`. */
export type UserErrorsPaymentInstrumentUserErrorsCode =
  /** Address1 field is missing. */
  | 'ADDRESS1_MISSING'
  /** Address argument is empty. */
  | 'ADDRESS_ARGUMENT_EMPTY'
  /** The card's brand is not supported. */
  | 'BRAND_NOT_SUPPORTED'
  /** Cannot find Shop Pay order for redirection. */
  | 'CANNOT_REDIRECT_TO_SHOP_PAY'
  /** Cannot replace a payment instrument with itself. */
  | 'CANNOT_REPLACE_PAYMENT_INSTRUMENT_WITH_ITSELF'
  /** City field is missing. */
  | 'CITY_MISSING'
  /** Country Code field is missing. */
  | 'COUNTRY_CODE_MISSING'
  /** The card was declined. */
  | 'DECLINED'
  /** The card is expired. */
  | 'EXPIRED'
  /** The card's first name is missing. */
  | 'FIRST_NAME_BLANK'
  /** An error occured. */
  | 'GENERIC_ERROR'
  /** The address is incorrect. */
  | 'INCORRECT'
  /** Address field is not valid. */
  | 'INVALID'
  /** Invalid for country. */
  | 'INVALID_FOR_COUNTRY'
  /** Invalid for country and province. */
  | 'INVALID_FOR_COUNTRY_AND_PROVINCE'
  /** Invalid province in country. */
  | 'INVALID_PROVINCE_IN_COUNTRY'
  /** The card's start date or issue number is invalid. */
  | 'INVALID_START_DATE_OR_ISSUE_NUMBER_FOR_DEBIT'
  /** Invalid state in country. */
  | 'INVALID_STATE_IN_COUNTRY'
  /** The card's last name is missing. */
  | 'LAST_NAME_BLANK'
  /** The card's month is invalid. */
  | 'MONTH_INVALID'
  /** The card's name is invalid. */
  | 'NAME_INVALID'
  /** The card's number is invalid. */
  | 'NUMBER_INVALID'
  /** Payment instrument ID does not exist. */
  | 'PAYMENT_INSTRUMENT_ID_DOES_NOT_EXIST'
  /** This payment instrument is already on file. */
  | 'PAYMENT_INSTRUMENT_TAKEN'
  /** Phone number is not valid. */
  | 'PHONE_NUMBER_NOT_VALID'
  /** The field is required. */
  | 'REQUIRED'
  /** This test card cannot be used for real transactions. */
  | 'TEST_MODE_LIVE_CARD'
  /** Address field is too long. */
  | 'TOO_LONG'
  /** Payment instrument type is not supported for this operation. */
  | 'UNSUPPORTED_PAYMENT_INSTRUMENT_TYPE'
  /** Too many payment instrument updates. */
  | 'UPDATE_LIMIT_EXCEEDED'
  /** The card's verification value is missing. */
  | 'VERIFICATION_VALUE_BLANK'
  /** The card's verification value is incorrect. */
  | 'VERIFICATION_VALUE_INCORRECT'
  /** The card's verification value is invalid. */
  | 'VERIFICATION_VALUE_INVALID_FOR_CARD_TYPE'
  /** The card's year is invalid. */
  | 'YEAR_INVALID'
  /** The address's zip code is incorrect. */
  | 'ZIP_INCORRECT'
  /** Zone Code field is missing. */
  | 'ZONE_CODE_MISSING';

/** The error codes for failed PayPal token mutations. */
export type UserErrorsPaypalTokenUserErrors = DisplayableError & {
  __typename?: 'UserErrorsPaypalTokenUserErrors';
  /** The error code. */
  code?: Maybe<UserErrorsPaypalTokenUserErrorsCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Possible error codes that can be returned by `UserErrorsPaypalTokenUserErrors`. */
export type UserErrorsPaypalTokenUserErrorsCode =
  /** PayPal Express gateway is not enabled. */
  | 'PAYPAL_EXPRESS_GATEWAY_NOT_ENABLED'
  /** PayPal account does not support reference transactions. */
  | 'REFERENCE_TRANSACTIONS_NOT_ENABLED'
  /** PayPal Express token could not be created. */
  | 'TOKEN_COULD_NOT_BE_CREATED';

/** The error codes for failed resending gift card mutations. */
export type UserErrorsResendGiftCardErrors = DisplayableError & {
  __typename?: 'UserErrorsResendGiftCardErrors';
  /** The error code. */
  code?: Maybe<UserErrorsResendGiftCardErrorsCode>;
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>;
  /** The error message. */
  message: Scalars['String']['output'];
};

/** Possible error codes that can be returned by `UserErrorsResendGiftCardErrors`. */
export type UserErrorsResendGiftCardErrorsCode =
  /** No gift card is associated with the order. */
  | 'GIFT_CARD_NOT_FOUND_FOR_ORDER'
  /** This order does not exist. */
  | 'ORDER_NOT_FOUND';

/** Error codes for failed Storefront Customer Access Token mutation. */
export type UserErrorsStorefrontCustomerAccessTokenCreateUserErrors =
  DisplayableError & {
    __typename?: 'UserErrorsStorefrontCustomerAccessTokenCreateUserErrors';
    /** The error code. */
    code?: Maybe<UserErrorsStorefrontCustomerAccessTokenCreateUserErrorsCode>;
    /** The path to the input field that caused the error. */
    field?: Maybe<Array<Scalars['String']['output']>>;
    /** The error message. */
    message: Scalars['String']['output'];
  };

/** Possible error codes that can be returned by `UserErrorsStorefrontCustomerAccessTokenCreateUserErrors`. */
export type UserErrorsStorefrontCustomerAccessTokenCreateUserErrorsCode =
  /** The customer does not exist. */
  'CUSTOMER_DOES_NOT_EXIST';

/** The configuration used for Payment Wallets. */
export type WalletPaymentConfig = ApplePayWalletConfig | GooglePayWalletConfig;

/** A weight, which includes a numeric value and a unit of measurement. */
export type Weight = {
  __typename?: 'Weight';
  /** The unit of measurement for `value`. */
  unit: WeightUnit;
  /** The weight value using the unit system specified with `unit`. */
  value: Scalars['Float']['output'];
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
  DepositConfiguration: DepositPercentage;
  LineItemContainer:
    | (Omit<RemainingLineItemContainer, 'lineItems'> & {
        lineItems: _RefType['RemainingLineItemContainerLineItemConnection'];
      })
    | (Omit<UnfulfilledDigitalLineItemContainer, 'lineItems'> & {
        lineItems: _RefType['LineItemContainerLineItemConnection'];
      })
    | (Omit<UnfulfilledGiftCardLineItemContainer, 'lineItems'> & {
        lineItems: _RefType['LineItemContainerLineItemConnection'];
      })
    | (Omit<UnfulfilledLineItemContainer, 'lineItems'> & {
        lineItems: _RefType['LineItemContainerLineItemConnection'];
      })
    | (Omit<UnfulfilledPhysicalLineItemContainer, 'lineItems'> & {
        lineItems: _RefType['LineItemContainerLineItemConnection'];
      });
  OrderDetailsPageOrder:
    | (Omit<
        Order,
        | 'agreements'
        | 'billingAddress'
        | 'customer'
        | 'discountApplications'
        | 'draftOrder'
        | 'editSummary'
        | 'fulfillments'
        | 'lineItemContainers'
        | 'lineItems'
        | 'purchasingEntity'
        | 'return'
        | 'returns'
        | 'shippingAddress'
        | 'shippingDiscountAllocations'
        | 'subscriptionContracts'
        | 'transactions'
      > & {
        agreements: _RefType['SalesAgreementConnection'];
        billingAddress?: Maybe<_RefType['CustomerAddress']>;
        customer?: Maybe<_RefType['Customer']>;
        discountApplications: _RefType['DiscountApplicationConnection'];
        draftOrder?: Maybe<_RefType['DraftOrder']>;
        editSummary?: Maybe<_RefType['OrderEditSummary']>;
        fulfillments: _RefType['FulfillmentConnection'];
        lineItemContainers: Array<_RefType['LineItemContainer']>;
        lineItems: _RefType['LineItemConnection'];
        purchasingEntity?: Maybe<_RefType['PurchasingEntity']>;
        return?: Maybe<_RefType['Return']>;
        returns: _RefType['ReturnConnection'];
        shippingAddress?: Maybe<_RefType['CustomerAddress']>;
        shippingDiscountAllocations: Array<_RefType['DiscountAllocation']>;
        subscriptionContracts?: Maybe<
          _RefType['SubscriptionContractConnection']
        >;
        transactions: Array<_RefType['OrderTransaction']>;
      })
    | (Omit<
        PublicOrder,
        | 'editSummary'
        | 'fulfillments'
        | 'lineItemContainers'
        | 'lineItems'
        | 'return'
        | 'returns'
        | 'transactions'
      > & {
        editSummary?: Maybe<_RefType['OrderEditSummary']>;
        fulfillments: _RefType['FulfillmentConnection'];
        lineItemContainers: Array<_RefType['LineItemContainer']>;
        lineItems: _RefType['LineItemConnection'];
        return?: Maybe<_RefType['Return']>;
        returns: _RefType['ReturnConnection'];
        transactions: Array<_RefType['OrderTransaction']>;
      });
  PaymentDetails: CardPaymentDetails;
  PricingValue: MoneyV2 | PricingPercentageValue;
  PurchasingEntity:
    | (Omit<
        Customer,
        | 'availableWalletPaymentConfigs'
        | 'companyContacts'
        | 'creditCard'
        | 'defaultAddress'
        | 'draftOrders'
        | 'lastIncompleteCheckout'
        | 'orders'
        | 'paypalBillingAgreement'
        | 'return'
        | 'storeCreditAccounts'
        | 'subscriptionContract'
        | 'subscriptionContracts'
      > & {
        availableWalletPaymentConfigs: Array<_RefType['WalletPaymentConfig']>;
        companyContacts: _RefType['CompanyContactConnection'];
        creditCard?: Maybe<_RefType['CustomerCreditCard']>;
        defaultAddress?: Maybe<_RefType['CustomerAddress']>;
        draftOrders: _RefType['DraftOrderConnection'];
        lastIncompleteCheckout?: Maybe<_RefType['Checkout']>;
        orders: _RefType['OrderConnection'];
        paypalBillingAgreement?: Maybe<_RefType['PaypalBillingAgreement']>;
        return?: Maybe<_RefType['Return']>;
        storeCreditAccounts: _RefType['StoreCreditAccountConnection'];
        subscriptionContract?: Maybe<_RefType['SubscriptionContract']>;
        subscriptionContracts: _RefType['SubscriptionContractConnection'];
      })
    | (Omit<PurchasingCompany, 'company' | 'contact' | 'location'> & {
        company: _RefType['Company'];
        contact?: Maybe<_RefType['CompanyContact']>;
        location: _RefType['CompanyLocation'];
      });
  ReverseDeliveryDeliverable: ReverseDeliveryShippingDeliverable;
  SubscriptionAnchor:
    | SubscriptionMonthDayAnchor
    | SubscriptionWeekDayAnchor
    | SubscriptionYearDayAnchor;
  SubscriptionDeliveryMethod:
    | SubscriptionDeliveryMethodLocalDelivery
    | SubscriptionDeliveryMethodPickup
    | SubscriptionDeliveryMethodShipping;
  SubscriptionDeliveryOption:
    | SubscriptionLocalDeliveryOption
    | SubscriptionPickupOption
    | SubscriptionShippingOption;
  SubscriptionDeliveryOptionsResult:
    | SubscriptionDeliveryOptionsResultFailure
    | (Omit<SubscriptionDeliveryOptionsResultSuccess, 'deliveryOptions'> & {
        deliveryOptions: Array<_RefType['SubscriptionDeliveryOption']>;
      });
  WalletPaymentConfig: ApplePayWalletConfig | GooglePayWalletConfig;
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
  {
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
      | ApplePaySessionUserError
      | BusinessCustomerUserError
      | MetafieldsDeleteUserError
      | MetafieldsSetUserError
      | ReturnUserError
      | SubscriptionBillingCycleSkipUserError
      | SubscriptionBillingCycleUnskipUserError
      | SubscriptionContractStatusUpdateUserError
      | SubscriptionContractUserError
      | UserErrorsBusinessContactUserErrors
      | UserErrorsBusinessLocationPaymentInstrumentUserErrors
      | UserErrorsCustomerAddressUserErrors
      | UserErrorsCustomerEmailMarketingOptInUserErrors
      | UserErrorsCustomerEmailMarketingUserErrors
      | UserErrorsCustomerUserErrors
      | UserErrorsPaymentInstrumentUserErrors
      | UserErrorsPaypalTokenUserErrors
      | UserErrorsResendGiftCardErrors
      | UserErrorsStorefrontCustomerAccessTokenCreateUserErrors;
    HasCompareDigest: Metafield;
    HasMetafields:
      | (Omit<Company, 'draftOrders' | 'locations' | 'orders' | 'profile'> & {
          draftOrders: _RefType['DraftOrderConnection'];
          locations: _RefType['CompanyLocationConnection'];
          orders: _RefType['OrderConnection'];
          profile?: Maybe<_RefType['CompanyContact']>;
        })
      | (Omit<
          CompanyLocation,
          | 'billingAddress'
          | 'buyerExperienceConfiguration'
          | 'contacts'
          | 'creditCard'
          | 'draftOrders'
          | 'orders'
          | 'shippingAddress'
        > & {
          billingAddress?: Maybe<_RefType['CompanyAddress']>;
          buyerExperienceConfiguration?: Maybe<
            _RefType['BuyerExperienceConfiguration']
          >;
          contacts: _RefType['CompanyContactConnection'];
          creditCard?: Maybe<_RefType['CustomerCreditCard']>;
          draftOrders: _RefType['DraftOrderConnection'];
          orders: _RefType['OrderConnection'];
          shippingAddress?: Maybe<_RefType['CompanyAddress']>;
        })
      | (Omit<
          Customer,
          | 'availableWalletPaymentConfigs'
          | 'companyContacts'
          | 'creditCard'
          | 'defaultAddress'
          | 'draftOrders'
          | 'lastIncompleteCheckout'
          | 'orders'
          | 'paypalBillingAgreement'
          | 'return'
          | 'storeCreditAccounts'
          | 'subscriptionContract'
          | 'subscriptionContracts'
        > & {
          availableWalletPaymentConfigs: Array<_RefType['WalletPaymentConfig']>;
          companyContacts: _RefType['CompanyContactConnection'];
          creditCard?: Maybe<_RefType['CustomerCreditCard']>;
          defaultAddress?: Maybe<_RefType['CustomerAddress']>;
          draftOrders: _RefType['DraftOrderConnection'];
          lastIncompleteCheckout?: Maybe<_RefType['Checkout']>;
          orders: _RefType['OrderConnection'];
          paypalBillingAgreement?: Maybe<_RefType['PaypalBillingAgreement']>;
          return?: Maybe<_RefType['Return']>;
          storeCreditAccounts: _RefType['StoreCreditAccountConnection'];
          subscriptionContract?: Maybe<_RefType['SubscriptionContract']>;
          subscriptionContracts: _RefType['SubscriptionContractConnection'];
        })
      | (Omit<
          Order,
          | 'agreements'
          | 'billingAddress'
          | 'customer'
          | 'discountApplications'
          | 'draftOrder'
          | 'editSummary'
          | 'fulfillments'
          | 'lineItemContainers'
          | 'lineItems'
          | 'purchasingEntity'
          | 'return'
          | 'returns'
          | 'shippingAddress'
          | 'shippingDiscountAllocations'
          | 'subscriptionContracts'
          | 'transactions'
        > & {
          agreements: _RefType['SalesAgreementConnection'];
          billingAddress?: Maybe<_RefType['CustomerAddress']>;
          customer?: Maybe<_RefType['Customer']>;
          discountApplications: _RefType['DiscountApplicationConnection'];
          draftOrder?: Maybe<_RefType['DraftOrder']>;
          editSummary?: Maybe<_RefType['OrderEditSummary']>;
          fulfillments: _RefType['FulfillmentConnection'];
          lineItemContainers: Array<_RefType['LineItemContainer']>;
          lineItems: _RefType['LineItemConnection'];
          purchasingEntity?: Maybe<_RefType['PurchasingEntity']>;
          return?: Maybe<_RefType['Return']>;
          returns: _RefType['ReturnConnection'];
          shippingAddress?: Maybe<_RefType['CustomerAddress']>;
          shippingDiscountAllocations: Array<_RefType['DiscountAllocation']>;
          subscriptionContracts?: Maybe<
            _RefType['SubscriptionContractConnection']
          >;
          transactions: Array<_RefType['OrderTransaction']>;
        })
      | Shop;
    HasStoreCreditAccounts: Omit<
      Customer,
      | 'availableWalletPaymentConfigs'
      | 'companyContacts'
      | 'creditCard'
      | 'defaultAddress'
      | 'draftOrders'
      | 'lastIncompleteCheckout'
      | 'orders'
      | 'paypalBillingAgreement'
      | 'return'
      | 'storeCreditAccounts'
      | 'subscriptionContract'
      | 'subscriptionContracts'
    > & {
      availableWalletPaymentConfigs: Array<_RefType['WalletPaymentConfig']>;
      companyContacts: _RefType['CompanyContactConnection'];
      creditCard?: Maybe<_RefType['CustomerCreditCard']>;
      defaultAddress?: Maybe<_RefType['CustomerAddress']>;
      draftOrders: _RefType['DraftOrderConnection'];
      lastIncompleteCheckout?: Maybe<_RefType['Checkout']>;
      orders: _RefType['OrderConnection'];
      paypalBillingAgreement?: Maybe<_RefType['PaypalBillingAgreement']>;
      return?: Maybe<_RefType['Return']>;
      storeCreditAccounts: _RefType['StoreCreditAccountConnection'];
      subscriptionContract?: Maybe<_RefType['SubscriptionContract']>;
      subscriptionContracts: _RefType['SubscriptionContractConnection'];
    };
    Node:
      | AdditionalFeeSale
      | AdjustmentSale
      | AppliedGiftCard
      | (Omit<
          Checkout,
          | 'appliedGiftCards'
          | 'discountApplications'
          | 'shippingDiscountAllocations'
        > & {
          appliedGiftCards: Array<_RefType['AppliedGiftCard']>;
          discountApplications: _RefType['DiscountApplicationConnection'];
          shippingDiscountAllocations: Array<_RefType['DiscountAllocation']>;
        })
      | CheckoutLineItem
      | (Omit<Company, 'draftOrders' | 'locations' | 'orders' | 'profile'> & {
          draftOrders: _RefType['DraftOrderConnection'];
          locations: _RefType['CompanyLocationConnection'];
          orders: _RefType['OrderConnection'];
          profile?: Maybe<_RefType['CompanyContact']>;
        })
      | CompanyAddress
      | (Omit<
          CompanyContact,
          'company' | 'customer' | 'draftOrders' | 'locations' | 'orders'
        > & {
          company?: Maybe<_RefType['Company']>;
          customer: _RefType['Customer'];
          draftOrders: _RefType['DraftOrderConnection'];
          locations: _RefType['CompanyLocationConnection'];
          orders: _RefType['OrderConnection'];
        })
      | CompanyContactRole
      | (Omit<CompanyContactRoleAssignment, 'contact'> & {
          contact: _RefType['CompanyContact'];
        })
      | (Omit<
          CompanyLocation,
          | 'billingAddress'
          | 'buyerExperienceConfiguration'
          | 'contacts'
          | 'creditCard'
          | 'draftOrders'
          | 'orders'
          | 'shippingAddress'
        > & {
          billingAddress?: Maybe<_RefType['CompanyAddress']>;
          buyerExperienceConfiguration?: Maybe<
            _RefType['BuyerExperienceConfiguration']
          >;
          contacts: _RefType['CompanyContactConnection'];
          creditCard?: Maybe<_RefType['CustomerCreditCard']>;
          draftOrders: _RefType['DraftOrderConnection'];
          orders: _RefType['OrderConnection'];
          shippingAddress?: Maybe<_RefType['CompanyAddress']>;
        })
      | (Omit<
          Customer,
          | 'availableWalletPaymentConfigs'
          | 'companyContacts'
          | 'creditCard'
          | 'defaultAddress'
          | 'draftOrders'
          | 'lastIncompleteCheckout'
          | 'orders'
          | 'paypalBillingAgreement'
          | 'return'
          | 'storeCreditAccounts'
          | 'subscriptionContract'
          | 'subscriptionContracts'
        > & {
          availableWalletPaymentConfigs: Array<_RefType['WalletPaymentConfig']>;
          companyContacts: _RefType['CompanyContactConnection'];
          creditCard?: Maybe<_RefType['CustomerCreditCard']>;
          defaultAddress?: Maybe<_RefType['CustomerAddress']>;
          draftOrders: _RefType['DraftOrderConnection'];
          lastIncompleteCheckout?: Maybe<_RefType['Checkout']>;
          orders: _RefType['OrderConnection'];
          paypalBillingAgreement?: Maybe<_RefType['PaypalBillingAgreement']>;
          return?: Maybe<_RefType['Return']>;
          storeCreditAccounts: _RefType['StoreCreditAccountConnection'];
          subscriptionContract?: Maybe<_RefType['SubscriptionContract']>;
          subscriptionContracts: _RefType['SubscriptionContractConnection'];
        })
      | CustomerAddress
      | (Omit<
          CustomerCreditCard,
          | 'billingAddress'
          | 'openDraftOrders'
          | 'pendingOrders'
          | 'subscriptionContracts'
        > & {
          billingAddress?: Maybe<_RefType['PaymentInstrumentBillingAddress']>;
          openDraftOrders: _RefType['DraftOrderConnection'];
          pendingOrders: _RefType['OrderConnection'];
          subscriptionContracts: _RefType['SubscriptionContractConnection'];
        })
      | CustomerMailingAddress
      | Domain
      | (Omit<
          DraftOrder,
          | 'billingAddress'
          | 'customer'
          | 'order'
          | 'purchasingEntity'
          | 'shippingAddress'
        > & {
          billingAddress?: Maybe<_RefType['CustomerAddress']>;
          customer?: Maybe<_RefType['Customer']>;
          order?: Maybe<_RefType['Order']>;
          purchasingEntity?: Maybe<_RefType['PurchasingEntity']>;
          shippingAddress?: Maybe<_RefType['CustomerAddress']>;
        })
      | DraftOrderLineItem
      | DutySale
      | FeeSale
      | (Omit<Fulfillment, 'fulfillmentLineItems'> & {
          fulfillmentLineItems: _RefType['FulfillmentLineItemConnection'];
        })
      | FulfillmentEvent
      | (Omit<FulfillmentLineItem, 'lineItem'> & {
          lineItem: _RefType['LineItem'];
        })
      | (Omit<GiftCardSale, 'lineItem'> & {lineItem: _RefType['LineItem']})
      | LegacyAggregatedMerchandiseTermsAsFees
      | (Omit<LineItem, 'discountAllocations'> & {
          discountAllocations: Array<_RefType['DiscountAllocation']>;
        })
      | (Omit<LineItemContainerLineItem, 'lineItem'> & {
          lineItem: _RefType['LineItem'];
        })
      | LineItemGroup
      | Market
      | MarketWebPresence
      | Metafield
      | (Omit<
          Order,
          | 'agreements'
          | 'billingAddress'
          | 'customer'
          | 'discountApplications'
          | 'draftOrder'
          | 'editSummary'
          | 'fulfillments'
          | 'lineItemContainers'
          | 'lineItems'
          | 'purchasingEntity'
          | 'return'
          | 'returns'
          | 'shippingAddress'
          | 'shippingDiscountAllocations'
          | 'subscriptionContracts'
          | 'transactions'
        > & {
          agreements: _RefType['SalesAgreementConnection'];
          billingAddress?: Maybe<_RefType['CustomerAddress']>;
          customer?: Maybe<_RefType['Customer']>;
          discountApplications: _RefType['DiscountApplicationConnection'];
          draftOrder?: Maybe<_RefType['DraftOrder']>;
          editSummary?: Maybe<_RefType['OrderEditSummary']>;
          fulfillments: _RefType['FulfillmentConnection'];
          lineItemContainers: Array<_RefType['LineItemContainer']>;
          lineItems: _RefType['LineItemConnection'];
          purchasingEntity?: Maybe<_RefType['PurchasingEntity']>;
          return?: Maybe<_RefType['Return']>;
          returns: _RefType['ReturnConnection'];
          shippingAddress?: Maybe<_RefType['CustomerAddress']>;
          shippingDiscountAllocations: Array<_RefType['DiscountAllocation']>;
          subscriptionContracts?: Maybe<
            _RefType['SubscriptionContractConnection']
          >;
          transactions: Array<_RefType['OrderTransaction']>;
        })
      | (Omit<OrderAgreement, 'order' | 'sales'> & {
          order: _RefType['Order'];
          sales: _RefType['SaleConnection'];
        })
      | (Omit<OrderEditAgreement, 'sales'> & {
          sales: _RefType['SaleConnection'];
        })
      | (Omit<OrderEditSummaryChange, 'lineItem'> & {
          lineItem: _RefType['LineItem'];
        })
      | (Omit<OrderTransaction, 'giftCardDetails' | 'paymentDetails'> & {
          giftCardDetails?: Maybe<_RefType['GiftCardDetails']>;
          paymentDetails?: Maybe<_RefType['PaymentDetails']>;
        })
      | PaymentIconImage
      | PaymentSchedule
      | PaymentTerms
      | PaymentTermsTemplate
      | (Omit<
          PaypalBillingAgreement,
          'billingAddress' | 'pendingOrders' | 'subscriptionContracts'
        > & {
          billingAddress?: Maybe<_RefType['PaymentInstrumentBillingAddress']>;
          pendingOrders: _RefType['OrderConnection'];
          subscriptionContracts: _RefType['SubscriptionContractConnection'];
        })
      | (Omit<ProductSale, 'lineItem'> & {lineItem: _RefType['LineItem']})
      | (Omit<
          PublicOrder,
          | 'editSummary'
          | 'fulfillments'
          | 'lineItemContainers'
          | 'lineItems'
          | 'return'
          | 'returns'
          | 'transactions'
        > & {
          editSummary?: Maybe<_RefType['OrderEditSummary']>;
          fulfillments: _RefType['FulfillmentConnection'];
          lineItemContainers: Array<_RefType['LineItemContainer']>;
          lineItems: _RefType['LineItemConnection'];
          return?: Maybe<_RefType['Return']>;
          returns: _RefType['ReturnConnection'];
          transactions: Array<_RefType['OrderTransaction']>;
        })
      | Refund
      | (Omit<RefundAgreement, 'sales'> & {sales: _RefType['SaleConnection']})
      | (Omit<RemainingLineItemContainerLineItem, 'lineItem'> & {
          lineItem: _RefType['LineItem'];
        })
      | (Omit<Return, 'decline' | 'returnLineItems' | 'reverseDeliveries'> & {
          decline?: Maybe<_RefType['ReturnDecline']>;
          returnLineItems: _RefType['ReturnLineItemConnection'];
          reverseDeliveries: _RefType['ReverseDeliveryConnection'];
        })
      | (Omit<ReturnAgreement, 'return' | 'sales'> & {
          return: _RefType['Return'];
          sales: _RefType['SaleConnection'];
        })
      | (Omit<ReturnLineItem, 'lineItem'> & {lineItem: _RefType['LineItem']})
      | (Omit<ReverseDelivery, 'deliverable'> & {
          deliverable?: Maybe<_RefType['ReverseDeliveryDeliverable']>;
        })
      | SaleTax
      | ShippingLineSale
      | Shop
      | ShopPolicy
      | (Omit<StoreCreditAccount, 'transactions'> & {
          transactions: _RefType['StoreCreditAccountTransactionConnection'];
        })
      | (Omit<StoreCreditAccountCreditTransaction, 'account'> & {
          account: _RefType['StoreCreditAccount'];
        })
      | (Omit<
          StoreCreditAccountDebitRevertTransaction,
          'account' | 'debitTransaction'
        > & {
          account: _RefType['StoreCreditAccount'];
          debitTransaction: _RefType['StoreCreditAccountDebitTransaction'];
        })
      | (Omit<StoreCreditAccountDebitTransaction, 'account'> & {
          account: _RefType['StoreCreditAccount'];
        })
      | (Omit<
          SubscriptionContract,
          | 'billingPolicy'
          | 'deliveryMethod'
          | 'deliveryPolicy'
          | 'orders'
          | 'originOrder'
          | 'paymentInstrument'
        > & {
          billingPolicy: _RefType['SubscriptionBillingPolicy'];
          deliveryMethod?: Maybe<_RefType['SubscriptionDeliveryMethod']>;
          deliveryPolicy: _RefType['SubscriptionDeliveryPolicy'];
          orders: _RefType['OrderConnection'];
          originOrder?: Maybe<_RefType['Order']>;
          paymentInstrument?: Maybe<_RefType['PaymentInstrument']>;
        })
      | TaxLine
      | TimelineEvent
      | (Omit<TipSale, 'lineItem'> & {lineItem: _RefType['LineItem']})
      | UiExtensionMetafield
      | UnknownSale;
    PaymentIcon: Omit<
      OrderTransaction,
      'giftCardDetails' | 'paymentDetails'
    > & {
      giftCardDetails?: Maybe<_RefType['GiftCardDetails']>;
      paymentDetails?: Maybe<_RefType['PaymentDetails']>;
    };
    PaymentInstrument:
      | (Omit<
          CustomerCreditCard,
          | 'billingAddress'
          | 'openDraftOrders'
          | 'pendingOrders'
          | 'subscriptionContracts'
        > & {
          billingAddress?: Maybe<_RefType['PaymentInstrumentBillingAddress']>;
          openDraftOrders: _RefType['DraftOrderConnection'];
          pendingOrders: _RefType['OrderConnection'];
          subscriptionContracts: _RefType['SubscriptionContractConnection'];
        })
      | (Omit<
          PaypalBillingAgreement,
          'billingAddress' | 'pendingOrders' | 'subscriptionContracts'
        > & {
          billingAddress?: Maybe<_RefType['PaymentInstrumentBillingAddress']>;
          pendingOrders: _RefType['OrderConnection'];
          subscriptionContracts: _RefType['SubscriptionContractConnection'];
        });
    Sale:
      | AdditionalFeeSale
      | AdjustmentSale
      | DutySale
      | FeeSale
      | (Omit<GiftCardSale, 'lineItem'> & {lineItem: _RefType['LineItem']})
      | (Omit<ProductSale, 'lineItem'> & {lineItem: _RefType['LineItem']})
      | ShippingLineSale
      | (Omit<TipSale, 'lineItem'> & {lineItem: _RefType['LineItem']})
      | UnknownSale;
    SalesAgreement:
      | (Omit<OrderAgreement, 'order' | 'sales'> & {
          order: _RefType['Order'];
          sales: _RefType['SaleConnection'];
        })
      | (Omit<OrderEditAgreement, 'sales'> & {
          sales: _RefType['SaleConnection'];
        })
      | (Omit<RefundAgreement, 'sales'> & {sales: _RefType['SaleConnection']})
      | (Omit<ReturnAgreement, 'return' | 'sales'> & {
          return: _RefType['Return'];
          sales: _RefType['SaleConnection'];
        });
    StoreCreditAccountTransaction:
      | (Omit<StoreCreditAccountCreditTransaction, 'account'> & {
          account: _RefType['StoreCreditAccount'];
        })
      | (Omit<
          StoreCreditAccountDebitRevertTransaction,
          'account' | 'debitTransaction'
        > & {
          account: _RefType['StoreCreditAccount'];
          debitTransaction: _RefType['StoreCreditAccountDebitTransaction'];
        })
      | (Omit<StoreCreditAccountDebitTransaction, 'account'> & {
          account: _RefType['StoreCreditAccount'];
        })
      | (Omit<
          StoreCreditAccountExpirationTransaction,
          'account' | 'creditTransaction'
        > & {
          account: _RefType['StoreCreditAccount'];
          creditTransaction: _RefType['StoreCreditAccountCreditTransaction'];
        });
    SubscriptionContractBase: Omit<
      SubscriptionContract,
      | 'billingPolicy'
      | 'deliveryMethod'
      | 'deliveryPolicy'
      | 'orders'
      | 'originOrder'
      | 'paymentInstrument'
    > & {
      billingPolicy: _RefType['SubscriptionBillingPolicy'];
      deliveryMethod?: Maybe<_RefType['SubscriptionDeliveryMethod']>;
      deliveryPolicy: _RefType['SubscriptionDeliveryPolicy'];
      orders: _RefType['OrderConnection'];
      originOrder?: Maybe<_RefType['Order']>;
      paymentInstrument?: Maybe<_RefType['PaymentInstrument']>;
    };
    UnfulfilledLineItemContainerCommonFields:
      | (Omit<UnfulfilledDigitalLineItemContainer, 'lineItems'> & {
          lineItems: _RefType['LineItemContainerLineItemConnection'];
        })
      | (Omit<UnfulfilledGiftCardLineItemContainer, 'lineItems'> & {
          lineItems: _RefType['LineItemContainerLineItemConnection'];
        })
      | (Omit<UnfulfilledLineItemContainer, 'lineItems'> & {
          lineItems: _RefType['LineItemContainerLineItemConnection'];
        })
      | (Omit<UnfulfilledPhysicalLineItemContainer, 'lineItems'> & {
          lineItems: _RefType['LineItemContainerLineItemConnection'];
        });
  };

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AdditionalFeeSale: ResolverTypeWrapper<AdditionalFeeSale>;
  AddressFormField: ResolverTypeWrapper<AddressFormField>;
  AddressFormFieldMode: AddressFormFieldMode;
  AddressFormSettings: ResolverTypeWrapper<AddressFormSettings>;
  AdjustmentSale: ResolverTypeWrapper<AdjustmentSale>;
  ApplePayBillingAddressInput: ApplePayBillingAddressInput;
  ApplePayCreditCardAddPayload: ResolverTypeWrapper<
    Omit<ApplePayCreditCardAddPayload, 'creditCard'> & {
      creditCard?: Maybe<ResolversTypes['CustomerCreditCard']>;
    }
  >;
  ApplePayCreditCardUpdatePayload: ResolverTypeWrapper<
    Omit<ApplePayCreditCardUpdatePayload, 'creditCard'> & {
      creditCard?: Maybe<ResolversTypes['CustomerCreditCard']>;
    }
  >;
  ApplePaySessionCreatePayload: ResolverTypeWrapper<ApplePaySessionCreatePayload>;
  ApplePaySessionUserError: ResolverTypeWrapper<ApplePaySessionUserError>;
  ApplePaySessionUserErrorCode: ApplePaySessionUserErrorCode;
  ApplePayWalletConfig: ResolverTypeWrapper<ApplePayWalletConfig>;
  AppliedGiftCard: ResolverTypeWrapper<AppliedGiftCard>;
  Attribute: ResolverTypeWrapper<Attribute>;
  AutomaticDiscountApplication: ResolverTypeWrapper<
    Omit<AutomaticDiscountApplication, 'value'> & {
      value: ResolversTypes['PricingValue'];
    }
  >;
  AvailableShippingRates: ResolverTypeWrapper<AvailableShippingRates>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BusinessContactUpdateInput: BusinessContactUpdateInput;
  BusinessContactUpdatePayload: ResolverTypeWrapper<
    Omit<BusinessContactUpdatePayload, 'businessContact'> & {
      businessContact?: Maybe<ResolversTypes['CompanyContact']>;
    }
  >;
  BusinessCustomerErrorCode: BusinessCustomerErrorCode;
  BusinessCustomerUserError: ResolverTypeWrapper<BusinessCustomerUserError>;
  BusinessLocationCreditCardAddPayload: ResolverTypeWrapper<
    Omit<BusinessLocationCreditCardAddPayload, 'creditCard'> & {
      creditCard?: Maybe<ResolversTypes['CustomerCreditCard']>;
    }
  >;
  BusinessLocationCreditCardUpdatePayload: ResolverTypeWrapper<
    Omit<BusinessLocationCreditCardUpdatePayload, 'creditCard'> & {
      creditCard?: Maybe<ResolversTypes['CustomerCreditCard']>;
    }
  >;
  BusinessLocationPaymentInstrumentRemovePayload: ResolverTypeWrapper<BusinessLocationPaymentInstrumentRemovePayload>;
  BuyerExperienceConfiguration: ResolverTypeWrapper<
    Omit<BuyerExperienceConfiguration, 'deposit'> & {
      deposit?: Maybe<ResolversTypes['DepositConfiguration']>;
    }
  >;
  CardPaymentDetails: ResolverTypeWrapper<CardPaymentDetails>;
  Checkout: ResolverTypeWrapper<
    Omit<
      Checkout,
      | 'appliedGiftCards'
      | 'discountApplications'
      | 'shippingDiscountAllocations'
    > & {
      appliedGiftCards: Array<ResolversTypes['AppliedGiftCard']>;
      discountApplications: ResolversTypes['DiscountApplicationConnection'];
      shippingDiscountAllocations: Array<ResolversTypes['DiscountAllocation']>;
    }
  >;
  CheckoutLineItem: ResolverTypeWrapper<CheckoutLineItem>;
  CheckoutLineItemConnection: ResolverTypeWrapper<CheckoutLineItemConnection>;
  CheckoutLineItemEdge: ResolverTypeWrapper<CheckoutLineItemEdge>;
  Company: ResolverTypeWrapper<
    Omit<Company, 'draftOrders' | 'locations' | 'orders' | 'profile'> & {
      draftOrders: ResolversTypes['DraftOrderConnection'];
      locations: ResolversTypes['CompanyLocationConnection'];
      orders: ResolversTypes['OrderConnection'];
      profile?: Maybe<ResolversTypes['CompanyContact']>;
    }
  >;
  CompanyAddress: ResolverTypeWrapper<CompanyAddress>;
  CompanyAddressInput: CompanyAddressInput;
  CompanyAddressType: CompanyAddressType;
  CompanyContact: ResolverTypeWrapper<
    Omit<
      CompanyContact,
      'company' | 'customer' | 'draftOrders' | 'locations' | 'orders'
    > & {
      company?: Maybe<ResolversTypes['Company']>;
      customer: ResolversTypes['Customer'];
      draftOrders: ResolversTypes['DraftOrderConnection'];
      locations: ResolversTypes['CompanyLocationConnection'];
      orders: ResolversTypes['OrderConnection'];
    }
  >;
  CompanyContactConnection: ResolverTypeWrapper<
    Omit<CompanyContactConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['CompanyContactEdge']>;
      nodes: Array<ResolversTypes['CompanyContact']>;
    }
  >;
  CompanyContactEdge: ResolverTypeWrapper<
    Omit<CompanyContactEdge, 'node'> & {node: ResolversTypes['CompanyContact']}
  >;
  CompanyContactRole: ResolverTypeWrapper<CompanyContactRole>;
  CompanyContactRoleAssignment: ResolverTypeWrapper<
    Omit<CompanyContactRoleAssignment, 'contact'> & {
      contact: ResolversTypes['CompanyContact'];
    }
  >;
  CompanyContactRoleAssignmentConnection: ResolverTypeWrapper<CompanyContactRoleAssignmentConnection>;
  CompanyContactRoleAssignmentEdge: ResolverTypeWrapper<CompanyContactRoleAssignmentEdge>;
  CompanyContactRoleAssignmentSortKeys: CompanyContactRoleAssignmentSortKeys;
  CompanyContactSortKeys: CompanyContactSortKeys;
  CompanyContactStatusType: CompanyContactStatusType;
  CompanyLocation: ResolverTypeWrapper<
    Omit<
      CompanyLocation,
      | 'billingAddress'
      | 'buyerExperienceConfiguration'
      | 'contacts'
      | 'creditCard'
      | 'draftOrders'
      | 'orders'
      | 'shippingAddress'
    > & {
      billingAddress?: Maybe<ResolversTypes['CompanyAddress']>;
      buyerExperienceConfiguration?: Maybe<
        ResolversTypes['BuyerExperienceConfiguration']
      >;
      contacts: ResolversTypes['CompanyContactConnection'];
      creditCard?: Maybe<ResolversTypes['CustomerCreditCard']>;
      draftOrders: ResolversTypes['DraftOrderConnection'];
      orders: ResolversTypes['OrderConnection'];
      shippingAddress?: Maybe<ResolversTypes['CompanyAddress']>;
    }
  >;
  CompanyLocationAssignAddressPayload: ResolverTypeWrapper<
    Omit<CompanyLocationAssignAddressPayload, 'addresses'> & {
      addresses?: Maybe<Array<ResolversTypes['CompanyAddress']>>;
    }
  >;
  CompanyLocationConnection: ResolverTypeWrapper<
    Omit<CompanyLocationConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['CompanyLocationEdge']>;
      nodes: Array<ResolversTypes['CompanyLocation']>;
    }
  >;
  CompanyLocationEdge: ResolverTypeWrapper<
    Omit<CompanyLocationEdge, 'node'> & {
      node: ResolversTypes['CompanyLocation'];
    }
  >;
  CompanyLocationSortKeys: CompanyLocationSortKeys;
  ContactPermissionLocationScopeType: ContactPermissionLocationScopeType;
  Count: ResolverTypeWrapper<Count>;
  CountPrecision: CountPrecision;
  CountryCode: CountryCode;
  CreditCardAddPayload: ResolverTypeWrapper<
    Omit<CreditCardAddPayload, 'creditCard'> & {
      creditCard?: Maybe<ResolversTypes['CustomerCreditCard']>;
    }
  >;
  CreditCardUpdatePayload: ResolverTypeWrapper<
    Omit<CreditCardUpdatePayload, 'creditCard'> & {
      creditCard?: Maybe<ResolversTypes['CustomerCreditCard']>;
    }
  >;
  CropRegion: CropRegion;
  CurrencyCode: CurrencyCode;
  Customer: ResolverTypeWrapper<
    Omit<
      Customer,
      | 'availableWalletPaymentConfigs'
      | 'companyContacts'
      | 'creditCard'
      | 'defaultAddress'
      | 'draftOrders'
      | 'lastIncompleteCheckout'
      | 'orders'
      | 'paypalBillingAgreement'
      | 'return'
      | 'storeCreditAccounts'
      | 'subscriptionContract'
      | 'subscriptionContracts'
    > & {
      availableWalletPaymentConfigs: Array<
        ResolversTypes['WalletPaymentConfig']
      >;
      companyContacts: ResolversTypes['CompanyContactConnection'];
      creditCard?: Maybe<ResolversTypes['CustomerCreditCard']>;
      defaultAddress?: Maybe<ResolversTypes['CustomerAddress']>;
      draftOrders: ResolversTypes['DraftOrderConnection'];
      lastIncompleteCheckout?: Maybe<ResolversTypes['Checkout']>;
      orders: ResolversTypes['OrderConnection'];
      paypalBillingAgreement?: Maybe<ResolversTypes['PaypalBillingAgreement']>;
      return?: Maybe<ResolversTypes['Return']>;
      storeCreditAccounts: ResolversTypes['StoreCreditAccountConnection'];
      subscriptionContract?: Maybe<ResolversTypes['SubscriptionContract']>;
      subscriptionContracts: ResolversTypes['SubscriptionContractConnection'];
    }
  >;
  CustomerAddress: ResolverTypeWrapper<CustomerAddress>;
  CustomerAddressConnection: ResolverTypeWrapper<
    Omit<CustomerAddressConnection, 'nodes'> & {
      nodes: Array<ResolversTypes['CustomerAddress']>;
    }
  >;
  CustomerAddressCreatePayload: ResolverTypeWrapper<
    Omit<CustomerAddressCreatePayload, 'customerAddress'> & {
      customerAddress?: Maybe<ResolversTypes['CustomerAddress']>;
    }
  >;
  CustomerAddressDeletePayload: ResolverTypeWrapper<CustomerAddressDeletePayload>;
  CustomerAddressEdge: ResolverTypeWrapper<
    Omit<CustomerAddressEdge, 'node'> & {
      node: ResolversTypes['CustomerAddress'];
    }
  >;
  CustomerAddressInput: CustomerAddressInput;
  CustomerAddressUpdatePayload: ResolverTypeWrapper<
    Omit<CustomerAddressUpdatePayload, 'customerAddress'> & {
      customerAddress?: Maybe<ResolversTypes['CustomerAddress']>;
    }
  >;
  CustomerCreditCard: ResolverTypeWrapper<
    Omit<
      CustomerCreditCard,
      | 'billingAddress'
      | 'openDraftOrders'
      | 'pendingOrders'
      | 'subscriptionContracts'
    > & {
      billingAddress?: Maybe<ResolversTypes['PaymentInstrumentBillingAddress']>;
      openDraftOrders: ResolversTypes['DraftOrderConnection'];
      pendingOrders: ResolversTypes['OrderConnection'];
      subscriptionContracts: ResolversTypes['SubscriptionContractConnection'];
    }
  >;
  CustomerCreditCardConnection: ResolverTypeWrapper<
    Omit<CustomerCreditCardConnection, 'nodes'> & {
      nodes: Array<ResolversTypes['CustomerCreditCard']>;
    }
  >;
  CustomerCreditCardEdge: ResolverTypeWrapper<
    Omit<CustomerCreditCardEdge, 'node'> & {
      node: ResolversTypes['CustomerCreditCard'];
    }
  >;
  CustomerEmailAddress: ResolverTypeWrapper<CustomerEmailAddress>;
  CustomerEmailMarketingOptInPayload: ResolverTypeWrapper<CustomerEmailMarketingOptInPayload>;
  CustomerEmailMarketingSubscribePayload: ResolverTypeWrapper<CustomerEmailMarketingSubscribePayload>;
  CustomerEmailMarketingUnsubscribePayload: ResolverTypeWrapper<CustomerEmailMarketingUnsubscribePayload>;
  CustomerMailingAddress: ResolverTypeWrapper<CustomerMailingAddress>;
  CustomerMailingAddressInput: CustomerMailingAddressInput;
  CustomerPhoneNumber: ResolverTypeWrapper<CustomerPhoneNumber>;
  CustomerUpdateInput: CustomerUpdateInput;
  CustomerUpdatePayload: ResolverTypeWrapper<
    Omit<CustomerUpdatePayload, 'customer'> & {
      customer?: Maybe<ResolversTypes['Customer']>;
    }
  >;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']['output']>;
  DeliveryOptionGroupType: DeliveryOptionGroupType;
  DepositConfiguration: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['DepositConfiguration']
  >;
  DepositPercentage: ResolverTypeWrapper<DepositPercentage>;
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
  DiscountApplicationType: DiscountApplicationType;
  DiscountCodeApplication: ResolverTypeWrapper<
    Omit<DiscountCodeApplication, 'value'> & {
      value: ResolversTypes['PricingValue'];
    }
  >;
  DisplayableError: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['DisplayableError']
  >;
  Domain: ResolverTypeWrapper<Domain>;
  DraftOrder: ResolverTypeWrapper<
    Omit<
      DraftOrder,
      | 'billingAddress'
      | 'customer'
      | 'order'
      | 'purchasingEntity'
      | 'shippingAddress'
    > & {
      billingAddress?: Maybe<ResolversTypes['CustomerAddress']>;
      customer?: Maybe<ResolversTypes['Customer']>;
      order?: Maybe<ResolversTypes['Order']>;
      purchasingEntity?: Maybe<ResolversTypes['PurchasingEntity']>;
      shippingAddress?: Maybe<ResolversTypes['CustomerAddress']>;
    }
  >;
  DraftOrderAppliedDiscount: ResolverTypeWrapper<DraftOrderAppliedDiscount>;
  DraftOrderByCompanySortKeys: DraftOrderByCompanySortKeys;
  DraftOrderByLocationSortKeys: DraftOrderByLocationSortKeys;
  DraftOrderConnection: ResolverTypeWrapper<
    Omit<DraftOrderConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['DraftOrderEdge']>;
      nodes: Array<ResolversTypes['DraftOrder']>;
    }
  >;
  DraftOrderDiscountInformation: ResolverTypeWrapper<DraftOrderDiscountInformation>;
  DraftOrderEdge: ResolverTypeWrapper<
    Omit<DraftOrderEdge, 'node'> & {node: ResolversTypes['DraftOrder']}
  >;
  DraftOrderLineItem: ResolverTypeWrapper<DraftOrderLineItem>;
  DraftOrderLineItemConnection: ResolverTypeWrapper<DraftOrderLineItemConnection>;
  DraftOrderLineItemDiscountInformation: ResolverTypeWrapper<DraftOrderLineItemDiscountInformation>;
  DraftOrderLineItemEdge: ResolverTypeWrapper<DraftOrderLineItemEdge>;
  DraftOrderLineItemsSummary: ResolverTypeWrapper<DraftOrderLineItemsSummary>;
  DraftOrderSortKeys: DraftOrderSortKeys;
  DraftOrderStatus: DraftOrderStatus;
  DutySale: ResolverTypeWrapper<DutySale>;
  EmailMarketingState: EmailMarketingState;
  ExtensionApiTokens: ResolverTypeWrapper<ExtensionApiTokens>;
  ExtensionStorefrontApiToken: ResolverTypeWrapper<ExtensionStorefrontApiToken>;
  FeeSale: ResolverTypeWrapper<FeeSale>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Fulfillment: ResolverTypeWrapper<
    Omit<Fulfillment, 'fulfillmentLineItems'> & {
      fulfillmentLineItems: ResolversTypes['FulfillmentLineItemConnection'];
    }
  >;
  FulfillmentConnection: ResolverTypeWrapper<
    Omit<FulfillmentConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['FulfillmentEdge']>;
      nodes: Array<ResolversTypes['Fulfillment']>;
    }
  >;
  FulfillmentEdge: ResolverTypeWrapper<
    Omit<FulfillmentEdge, 'node'> & {node: ResolversTypes['Fulfillment']}
  >;
  FulfillmentEvent: ResolverTypeWrapper<FulfillmentEvent>;
  FulfillmentEventConnection: ResolverTypeWrapper<FulfillmentEventConnection>;
  FulfillmentEventEdge: ResolverTypeWrapper<FulfillmentEventEdge>;
  FulfillmentEventSortKeys: FulfillmentEventSortKeys;
  FulfillmentEventStatus: FulfillmentEventStatus;
  FulfillmentLineItem: ResolverTypeWrapper<
    Omit<FulfillmentLineItem, 'lineItem'> & {
      lineItem: ResolversTypes['LineItem'];
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
  FulfillmentSortKeys: FulfillmentSortKeys;
  FulfillmentStatus: FulfillmentStatus;
  GiftCardDetails: ResolverTypeWrapper<GiftCardDetails>;
  GiftCardSale: ResolverTypeWrapper<
    Omit<GiftCardSale, 'lineItem'> & {lineItem: ResolversTypes['LineItem']}
  >;
  GooglePayBillingAddressInput: GooglePayBillingAddressInput;
  GooglePayCreditCardAddPayload: ResolverTypeWrapper<
    Omit<GooglePayCreditCardAddPayload, 'creditCard'> & {
      creditCard?: Maybe<ResolversTypes['CustomerCreditCard']>;
    }
  >;
  GooglePayCreditCardUpdatePayload: ResolverTypeWrapper<
    Omit<GooglePayCreditCardUpdatePayload, 'creditCard'> & {
      creditCard?: Maybe<ResolversTypes['CustomerCreditCard']>;
    }
  >;
  GooglePayWalletConfig: ResolverTypeWrapper<GooglePayWalletConfig>;
  HTML: ResolverTypeWrapper<Scalars['HTML']['output']>;
  HasCompareDigest: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['HasCompareDigest']
  >;
  HasMetafields: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['HasMetafields']
  >;
  HasMetafieldsIdentifier: HasMetafieldsIdentifier;
  HasStoreCreditAccounts: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['HasStoreCreditAccounts']
  >;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ISO8601DateTime: ResolverTypeWrapper<Scalars['ISO8601DateTime']['output']>;
  Image: ResolverTypeWrapper<Image>;
  ImageContentType: ImageContentType;
  ImageTransformInput: ImageTransformInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  LegacyAggregatedMerchandiseTermsAsFees: ResolverTypeWrapper<LegacyAggregatedMerchandiseTermsAsFees>;
  LineItem: ResolverTypeWrapper<
    Omit<LineItem, 'discountAllocations'> & {
      discountAllocations: Array<ResolversTypes['DiscountAllocation']>;
    }
  >;
  LineItemConnection: ResolverTypeWrapper<
    Omit<LineItemConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['LineItemEdge']>;
      nodes: Array<ResolversTypes['LineItem']>;
    }
  >;
  LineItemContainer: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['LineItemContainer']
  >;
  LineItemContainerLineItem: ResolverTypeWrapper<
    Omit<LineItemContainerLineItem, 'lineItem'> & {
      lineItem: ResolversTypes['LineItem'];
    }
  >;
  LineItemContainerLineItemConnection: ResolverTypeWrapper<
    Omit<LineItemContainerLineItemConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['LineItemContainerLineItemEdge']>;
      nodes: Array<ResolversTypes['LineItemContainerLineItem']>;
    }
  >;
  LineItemContainerLineItemEdge: ResolverTypeWrapper<
    Omit<LineItemContainerLineItemEdge, 'node'> & {
      node: ResolversTypes['LineItemContainerLineItem'];
    }
  >;
  LineItemDiscountInformation: ResolverTypeWrapper<LineItemDiscountInformation>;
  LineItemEdge: ResolverTypeWrapper<
    Omit<LineItemEdge, 'node'> & {node: ResolversTypes['LineItem']}
  >;
  LineItemGroup: ResolverTypeWrapper<LineItemGroup>;
  LineItemSellingPlan: ResolverTypeWrapper<LineItemSellingPlan>;
  LineItemVariantOption: ResolverTypeWrapper<LineItemVariantOption>;
  ManualDiscountApplication: ResolverTypeWrapper<
    Omit<ManualDiscountApplication, 'value'> & {
      value: ResolversTypes['PricingValue'];
    }
  >;
  Market: ResolverTypeWrapper<Market>;
  MarketWebPresence: ResolverTypeWrapper<MarketWebPresence>;
  MarketWebPresenceRootUrl: ResolverTypeWrapper<MarketWebPresenceRootUrl>;
  Metafield: ResolverTypeWrapper<Metafield>;
  MetafieldIdentifier: ResolverTypeWrapper<MetafieldIdentifier>;
  MetafieldIdentifierInput: MetafieldIdentifierInput;
  MetafieldValueType: MetafieldValueType;
  MetafieldsDeletePayload: ResolverTypeWrapper<MetafieldsDeletePayload>;
  MetafieldsDeleteUserError: ResolverTypeWrapper<MetafieldsDeleteUserError>;
  MetafieldsDeleteUserErrorCode: MetafieldsDeleteUserErrorCode;
  MetafieldsSetInput: MetafieldsSetInput;
  MetafieldsSetPayload: ResolverTypeWrapper<MetafieldsSetPayload>;
  MetafieldsSetUserError: ResolverTypeWrapper<MetafieldsSetUserError>;
  MetafieldsSetUserErrorCode: MetafieldsSetUserErrorCode;
  MoneyBag: ResolverTypeWrapper<MoneyBag>;
  MoneyV2: ResolverTypeWrapper<MoneyV2>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  Order: ResolverTypeWrapper<
    Omit<
      Order,
      | 'agreements'
      | 'billingAddress'
      | 'customer'
      | 'discountApplications'
      | 'draftOrder'
      | 'editSummary'
      | 'fulfillments'
      | 'lineItemContainers'
      | 'lineItems'
      | 'purchasingEntity'
      | 'return'
      | 'returns'
      | 'shippingAddress'
      | 'shippingDiscountAllocations'
      | 'subscriptionContracts'
      | 'transactions'
    > & {
      agreements: ResolversTypes['SalesAgreementConnection'];
      billingAddress?: Maybe<ResolversTypes['CustomerAddress']>;
      customer?: Maybe<ResolversTypes['Customer']>;
      discountApplications: ResolversTypes['DiscountApplicationConnection'];
      draftOrder?: Maybe<ResolversTypes['DraftOrder']>;
      editSummary?: Maybe<ResolversTypes['OrderEditSummary']>;
      fulfillments: ResolversTypes['FulfillmentConnection'];
      lineItemContainers: Array<ResolversTypes['LineItemContainer']>;
      lineItems: ResolversTypes['LineItemConnection'];
      purchasingEntity?: Maybe<ResolversTypes['PurchasingEntity']>;
      return?: Maybe<ResolversTypes['Return']>;
      returns: ResolversTypes['ReturnConnection'];
      shippingAddress?: Maybe<ResolversTypes['CustomerAddress']>;
      shippingDiscountAllocations: Array<ResolversTypes['DiscountAllocation']>;
      subscriptionContracts?: Maybe<
        ResolversTypes['SubscriptionContractConnection']
      >;
      transactions: Array<ResolversTypes['OrderTransaction']>;
    }
  >;
  OrderActionType: OrderActionType;
  OrderAgreement: ResolverTypeWrapper<
    Omit<OrderAgreement, 'order' | 'sales'> & {
      order: ResolversTypes['Order'];
      sales: ResolversTypes['SaleConnection'];
    }
  >;
  OrderAllDiscounts: ResolverTypeWrapper<OrderAllDiscounts>;
  OrderByCompanySortKeys: OrderByCompanySortKeys;
  OrderByContactSortKeys: OrderByContactSortKeys;
  OrderByLocationSortKeys: OrderByLocationSortKeys;
  OrderCancelReason: OrderCancelReason;
  OrderConnection: ResolverTypeWrapper<
    Omit<OrderConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['OrderEdge']>;
      nodes: Array<ResolversTypes['Order']>;
    }
  >;
  OrderDetailsPageOrder: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['OrderDetailsPageOrder']
  >;
  OrderDiscountInformation: ResolverTypeWrapper<OrderDiscountInformation>;
  OrderDutiesStatusType: OrderDutiesStatusType;
  OrderDutiesSummary: ResolverTypeWrapper<OrderDutiesSummary>;
  OrderEdge: ResolverTypeWrapper<
    Omit<OrderEdge, 'node'> & {node: ResolversTypes['Order']}
  >;
  OrderEditAgreement: ResolverTypeWrapper<
    Omit<OrderEditAgreement, 'sales'> & {
      sales: ResolversTypes['SaleConnection'];
    }
  >;
  OrderEditSummary: ResolverTypeWrapper<
    Omit<OrderEditSummary, 'changes'> & {
      changes: Array<ResolversTypes['OrderEditSummaryChange']>;
    }
  >;
  OrderEditSummaryChange: ResolverTypeWrapper<
    Omit<OrderEditSummaryChange, 'lineItem'> & {
      lineItem: ResolversTypes['LineItem'];
    }
  >;
  OrderFinancialStatus: OrderFinancialStatus;
  OrderFulfillmentStatus: OrderFulfillmentStatus;
  OrderLineItemsSummary: ResolverTypeWrapper<OrderLineItemsSummary>;
  OrderPaymentInformation: ResolverTypeWrapper<OrderPaymentInformation>;
  OrderPaymentStatus: OrderPaymentStatus;
  OrderPickupInformation: ResolverTypeWrapper<OrderPickupInformation>;
  OrderRequestReturnPayload: ResolverTypeWrapper<
    Omit<OrderRequestReturnPayload, 'return'> & {
      return?: Maybe<ResolversTypes['Return']>;
    }
  >;
  OrderShippingLineGroup: ResolverTypeWrapper<OrderShippingLineGroup>;
  OrderSoldInformation: ResolverTypeWrapper<OrderSoldInformation>;
  OrderSortKeys: OrderSortKeys;
  OrderTransaction: ResolverTypeWrapper<
    Omit<OrderTransaction, 'giftCardDetails' | 'paymentDetails'> & {
      giftCardDetails?: Maybe<ResolversTypes['GiftCardDetails']>;
      paymentDetails?: Maybe<ResolversTypes['PaymentDetails']>;
    }
  >;
  OrderTransactionKind: OrderTransactionKind;
  OrderTransactionStatus: OrderTransactionStatus;
  OrderTransactionType: OrderTransactionType;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PaymentDetails: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['PaymentDetails']
  >;
  PaymentIcon: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['PaymentIcon']
  >;
  PaymentIconImage: ResolverTypeWrapper<PaymentIconImage>;
  PaymentInstrument: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['PaymentInstrument']
  >;
  PaymentInstrumentBillingAddress: ResolverTypeWrapper<PaymentInstrumentBillingAddress>;
  PaymentInstrumentRemovePayload: ResolverTypeWrapper<PaymentInstrumentRemovePayload>;
  PaymentInstrumentUpdateDefaultPayload: ResolverTypeWrapper<PaymentInstrumentUpdateDefaultPayload>;
  PaymentInstrumentWalletType: PaymentInstrumentWalletType;
  PaymentSchedule: ResolverTypeWrapper<PaymentSchedule>;
  PaymentScheduleConnection: ResolverTypeWrapper<PaymentScheduleConnection>;
  PaymentScheduleEdge: ResolverTypeWrapper<PaymentScheduleEdge>;
  PaymentTerms: ResolverTypeWrapper<PaymentTerms>;
  PaymentTermsTemplate: ResolverTypeWrapper<PaymentTermsTemplate>;
  PaymentTermsType: PaymentTermsType;
  PaypalAccountEnablePayload: ResolverTypeWrapper<
    Omit<PaypalAccountEnablePayload, 'paypalBillingAgreement'> & {
      paypalBillingAgreement?: Maybe<ResolversTypes['PaypalBillingAgreement']>;
    }
  >;
  PaypalBillingAgreement: ResolverTypeWrapper<
    Omit<
      PaypalBillingAgreement,
      'billingAddress' | 'pendingOrders' | 'subscriptionContracts'
    > & {
      billingAddress?: Maybe<ResolversTypes['PaymentInstrumentBillingAddress']>;
      pendingOrders: ResolversTypes['OrderConnection'];
      subscriptionContracts: ResolversTypes['SubscriptionContractConnection'];
    }
  >;
  PaypalTokenCreatePayload: ResolverTypeWrapper<PaypalTokenCreatePayload>;
  PermittedOperation: PermittedOperation;
  PickupAddress: ResolverTypeWrapper<PickupAddress>;
  PickupStatus: PickupStatus;
  PricingPercentageValue: ResolverTypeWrapper<PricingPercentageValue>;
  PricingValue: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['PricingValue']
  >;
  ProductSale: ResolverTypeWrapper<
    Omit<ProductSale, 'lineItem'> & {lineItem: ResolversTypes['LineItem']}
  >;
  PublicOrder: ResolverTypeWrapper<
    Omit<
      PublicOrder,
      | 'editSummary'
      | 'fulfillments'
      | 'lineItemContainers'
      | 'lineItems'
      | 'return'
      | 'returns'
      | 'transactions'
    > & {
      editSummary?: Maybe<ResolversTypes['OrderEditSummary']>;
      fulfillments: ResolversTypes['FulfillmentConnection'];
      lineItemContainers: Array<ResolversTypes['LineItemContainer']>;
      lineItems: ResolversTypes['LineItemConnection'];
      return?: Maybe<ResolversTypes['Return']>;
      returns: ResolversTypes['ReturnConnection'];
      transactions: Array<ResolversTypes['OrderTransaction']>;
    }
  >;
  PurchasingCompany: ResolverTypeWrapper<
    Omit<PurchasingCompany, 'company' | 'contact' | 'location'> & {
      company: ResolversTypes['Company'];
      contact?: Maybe<ResolversTypes['CompanyContact']>;
      location: ResolversTypes['CompanyLocation'];
    }
  >;
  PurchasingEntity: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['PurchasingEntity']
  >;
  QueryRoot: ResolverTypeWrapper<{}>;
  Refund: ResolverTypeWrapper<Refund>;
  RefundAgreement: ResolverTypeWrapper<
    Omit<RefundAgreement, 'sales'> & {sales: ResolversTypes['SaleConnection']}
  >;
  RemainingLineItemContainer: ResolverTypeWrapper<
    Omit<RemainingLineItemContainer, 'lineItems'> & {
      lineItems: ResolversTypes['RemainingLineItemContainerLineItemConnection'];
    }
  >;
  RemainingLineItemContainerLineItem: ResolverTypeWrapper<
    Omit<RemainingLineItemContainerLineItem, 'lineItem'> & {
      lineItem: ResolversTypes['LineItem'];
    }
  >;
  RemainingLineItemContainerLineItemConnection: ResolverTypeWrapper<
    Omit<RemainingLineItemContainerLineItemConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['RemainingLineItemContainerLineItemEdge']>;
      nodes: Array<ResolversTypes['RemainingLineItemContainerLineItem']>;
    }
  >;
  RemainingLineItemContainerLineItemEdge: ResolverTypeWrapper<
    Omit<RemainingLineItemContainerLineItemEdge, 'node'> & {
      node: ResolversTypes['RemainingLineItemContainerLineItem'];
    }
  >;
  RequestedLineItemInput: RequestedLineItemInput;
  ResendGiftCardPayload: ResolverTypeWrapper<ResendGiftCardPayload>;
  ResourcePermission: ResolverTypeWrapper<ResourcePermission>;
  ResourceType: ResourceType;
  Return: ResolverTypeWrapper<
    Omit<Return, 'decline' | 'returnLineItems' | 'reverseDeliveries'> & {
      decline?: Maybe<ResolversTypes['ReturnDecline']>;
      returnLineItems: ResolversTypes['ReturnLineItemConnection'];
      reverseDeliveries: ResolversTypes['ReverseDeliveryConnection'];
    }
  >;
  ReturnAgreement: ResolverTypeWrapper<
    Omit<ReturnAgreement, 'return' | 'sales'> & {
      return: ResolversTypes['Return'];
      sales: ResolversTypes['SaleConnection'];
    }
  >;
  ReturnConnection: ResolverTypeWrapper<
    Omit<ReturnConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['ReturnEdge']>;
      nodes: Array<ResolversTypes['Return']>;
    }
  >;
  ReturnDecline: ResolverTypeWrapper<ReturnDecline>;
  ReturnDeclineReason: ReturnDeclineReason;
  ReturnEdge: ResolverTypeWrapper<
    Omit<ReturnEdge, 'node'> & {node: ResolversTypes['Return']}
  >;
  ReturnErrorCode: ReturnErrorCode;
  ReturnLineItem: ResolverTypeWrapper<
    Omit<ReturnLineItem, 'lineItem'> & {lineItem: ResolversTypes['LineItem']}
  >;
  ReturnLineItemConnection: ResolverTypeWrapper<
    Omit<ReturnLineItemConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['ReturnLineItemEdge']>;
      nodes: Array<ResolversTypes['ReturnLineItem']>;
    }
  >;
  ReturnLineItemEdge: ResolverTypeWrapper<
    Omit<ReturnLineItemEdge, 'node'> & {node: ResolversTypes['ReturnLineItem']}
  >;
  ReturnReason: ReturnReason;
  ReturnSortKeys: ReturnSortKeys;
  ReturnStatus: ReturnStatus;
  ReturnSupportedReason: ResolverTypeWrapper<ReturnSupportedReason>;
  ReturnUserError: ResolverTypeWrapper<ReturnUserError>;
  ReverseDelivery: ResolverTypeWrapper<
    Omit<ReverseDelivery, 'deliverable'> & {
      deliverable?: Maybe<ResolversTypes['ReverseDeliveryDeliverable']>;
    }
  >;
  ReverseDeliveryConnection: ResolverTypeWrapper<
    Omit<ReverseDeliveryConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['ReverseDeliveryEdge']>;
      nodes: Array<ResolversTypes['ReverseDelivery']>;
    }
  >;
  ReverseDeliveryDeliverable: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['ReverseDeliveryDeliverable']
  >;
  ReverseDeliveryEdge: ResolverTypeWrapper<
    Omit<ReverseDeliveryEdge, 'node'> & {
      node: ResolversTypes['ReverseDelivery'];
    }
  >;
  ReverseDeliveryLabel: ResolverTypeWrapper<ReverseDeliveryLabel>;
  ReverseDeliveryShippingDeliverable: ResolverTypeWrapper<ReverseDeliveryShippingDeliverable>;
  ReverseDeliveryTracking: ResolverTypeWrapper<ReverseDeliveryTracking>;
  Sale: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Sale']>;
  SaleActionType: SaleActionType;
  SaleConnection: ResolverTypeWrapper<
    Omit<SaleConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['SaleEdge']>;
      nodes: Array<ResolversTypes['Sale']>;
    }
  >;
  SaleEdge: ResolverTypeWrapper<
    Omit<SaleEdge, 'node'> & {node: ResolversTypes['Sale']}
  >;
  SaleLineType: SaleLineType;
  SaleTax: ResolverTypeWrapper<SaleTax>;
  SalesAgreement: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['SalesAgreement']
  >;
  SalesAgreementConnection: ResolverTypeWrapper<
    Omit<SalesAgreementConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['SalesAgreementEdge']>;
      nodes: Array<ResolversTypes['SalesAgreement']>;
    }
  >;
  SalesAgreementEdge: ResolverTypeWrapper<
    Omit<SalesAgreementEdge, 'node'> & {node: ResolversTypes['SalesAgreement']}
  >;
  ScriptDiscountApplication: ResolverTypeWrapper<
    Omit<ScriptDiscountApplication, 'value'> & {
      value: ResolversTypes['PricingValue'];
    }
  >;
  ShippingLine: ResolverTypeWrapper<ShippingLine>;
  ShippingLineSale: ResolverTypeWrapper<ShippingLineSale>;
  ShippingRate: ResolverTypeWrapper<ShippingRate>;
  Shop: ResolverTypeWrapper<Shop>;
  ShopAppLinksAndResources: ResolverTypeWrapper<ShopAppLinksAndResources>;
  ShopPayConfiguration: ResolverTypeWrapper<ShopPayConfiguration>;
  ShopPayCreditCardGetUpdateUrlPayload: ResolverTypeWrapper<ShopPayCreditCardGetUpdateUrlPayload>;
  ShopPolicy: ResolverTypeWrapper<ShopPolicy>;
  SmsMarketingState: SmsMarketingState;
  StoreCreditAccount: ResolverTypeWrapper<
    Omit<StoreCreditAccount, 'transactions'> & {
      transactions: ResolversTypes['StoreCreditAccountTransactionConnection'];
    }
  >;
  StoreCreditAccountConnection: ResolverTypeWrapper<
    Omit<StoreCreditAccountConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['StoreCreditAccountEdge']>;
      nodes: Array<ResolversTypes['StoreCreditAccount']>;
    }
  >;
  StoreCreditAccountCreditTransaction: ResolverTypeWrapper<
    Omit<StoreCreditAccountCreditTransaction, 'account'> & {
      account: ResolversTypes['StoreCreditAccount'];
    }
  >;
  StoreCreditAccountDebitRevertTransaction: ResolverTypeWrapper<
    Omit<
      StoreCreditAccountDebitRevertTransaction,
      'account' | 'debitTransaction'
    > & {
      account: ResolversTypes['StoreCreditAccount'];
      debitTransaction: ResolversTypes['StoreCreditAccountDebitTransaction'];
    }
  >;
  StoreCreditAccountDebitTransaction: ResolverTypeWrapper<
    Omit<StoreCreditAccountDebitTransaction, 'account'> & {
      account: ResolversTypes['StoreCreditAccount'];
    }
  >;
  StoreCreditAccountEdge: ResolverTypeWrapper<
    Omit<StoreCreditAccountEdge, 'node'> & {
      node: ResolversTypes['StoreCreditAccount'];
    }
  >;
  StoreCreditAccountExpirationTransaction: ResolverTypeWrapper<
    Omit<
      StoreCreditAccountExpirationTransaction,
      'account' | 'creditTransaction'
    > & {
      account: ResolversTypes['StoreCreditAccount'];
      creditTransaction: ResolversTypes['StoreCreditAccountCreditTransaction'];
    }
  >;
  StoreCreditAccountTransaction: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['StoreCreditAccountTransaction']
  >;
  StoreCreditAccountTransactionConnection: ResolverTypeWrapper<
    Omit<StoreCreditAccountTransactionConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['StoreCreditAccountTransactionEdge']>;
      nodes: Array<ResolversTypes['StoreCreditAccountTransaction']>;
    }
  >;
  StoreCreditAccountTransactionEdge: ResolverTypeWrapper<
    Omit<StoreCreditAccountTransactionEdge, 'node'> & {
      node: ResolversTypes['StoreCreditAccountTransaction'];
    }
  >;
  StorefrontCustomerAccessTokenCreatePayload: ResolverTypeWrapper<StorefrontCustomerAccessTokenCreatePayload>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SubscriptionAnchor: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['SubscriptionAnchor']
  >;
  SubscriptionBillingCycle: ResolverTypeWrapper<SubscriptionBillingCycle>;
  SubscriptionBillingCycleBillingCycleStatus: SubscriptionBillingCycleBillingCycleStatus;
  SubscriptionBillingCycleConnection: ResolverTypeWrapper<SubscriptionBillingCycleConnection>;
  SubscriptionBillingCycleEdge: ResolverTypeWrapper<SubscriptionBillingCycleEdge>;
  SubscriptionBillingCycleInput: SubscriptionBillingCycleInput;
  SubscriptionBillingCycleSelector: SubscriptionBillingCycleSelector;
  SubscriptionBillingCycleSkipPayload: ResolverTypeWrapper<SubscriptionBillingCycleSkipPayload>;
  SubscriptionBillingCycleSkipUserError: ResolverTypeWrapper<SubscriptionBillingCycleSkipUserError>;
  SubscriptionBillingCycleSkipUserErrorCode: SubscriptionBillingCycleSkipUserErrorCode;
  SubscriptionBillingCycleUnskipPayload: ResolverTypeWrapper<SubscriptionBillingCycleUnskipPayload>;
  SubscriptionBillingCycleUnskipUserError: ResolverTypeWrapper<SubscriptionBillingCycleUnskipUserError>;
  SubscriptionBillingCycleUnskipUserErrorCode: SubscriptionBillingCycleUnskipUserErrorCode;
  SubscriptionBillingCyclesSortKeys: SubscriptionBillingCyclesSortKeys;
  SubscriptionBillingPolicy: ResolverTypeWrapper<
    Omit<SubscriptionBillingPolicy, 'anchors'> & {
      anchors: Array<ResolversTypes['SubscriptionAnchor']>;
    }
  >;
  SubscriptionContract: ResolverTypeWrapper<
    Omit<
      SubscriptionContract,
      | 'billingPolicy'
      | 'deliveryMethod'
      | 'deliveryPolicy'
      | 'orders'
      | 'originOrder'
      | 'paymentInstrument'
    > & {
      billingPolicy: ResolversTypes['SubscriptionBillingPolicy'];
      deliveryMethod?: Maybe<ResolversTypes['SubscriptionDeliveryMethod']>;
      deliveryPolicy: ResolversTypes['SubscriptionDeliveryPolicy'];
      orders: ResolversTypes['OrderConnection'];
      originOrder?: Maybe<ResolversTypes['Order']>;
      paymentInstrument?: Maybe<ResolversTypes['PaymentInstrument']>;
    }
  >;
  SubscriptionContractActivatePayload: ResolverTypeWrapper<
    Omit<SubscriptionContractActivatePayload, 'contract'> & {
      contract?: Maybe<ResolversTypes['SubscriptionContract']>;
    }
  >;
  SubscriptionContractBase: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['SubscriptionContractBase']
  >;
  SubscriptionContractCancelPayload: ResolverTypeWrapper<
    Omit<SubscriptionContractCancelPayload, 'contract'> & {
      contract?: Maybe<ResolversTypes['SubscriptionContract']>;
    }
  >;
  SubscriptionContractChangePaymentInstrumentPayload: ResolverTypeWrapper<
    Omit<SubscriptionContractChangePaymentInstrumentPayload, 'contract'> & {
      contract?: Maybe<ResolversTypes['SubscriptionContract']>;
    }
  >;
  SubscriptionContractConnection: ResolverTypeWrapper<
    Omit<SubscriptionContractConnection, 'edges' | 'nodes'> & {
      edges: Array<ResolversTypes['SubscriptionContractEdge']>;
      nodes: Array<ResolversTypes['SubscriptionContract']>;
    }
  >;
  SubscriptionContractEdge: ResolverTypeWrapper<
    Omit<SubscriptionContractEdge, 'node'> & {
      node: ResolversTypes['SubscriptionContract'];
    }
  >;
  SubscriptionContractFetchDeliveryOptionsPayload: ResolverTypeWrapper<
    Omit<
      SubscriptionContractFetchDeliveryOptionsPayload,
      'deliveryOptionsResult'
    > & {
      deliveryOptionsResult?: Maybe<
        ResolversTypes['SubscriptionDeliveryOptionsResult']
      >;
    }
  >;
  SubscriptionContractLastBillingErrorType: SubscriptionContractLastBillingErrorType;
  SubscriptionContractLastPaymentStatus: SubscriptionContractLastPaymentStatus;
  SubscriptionContractPausePayload: ResolverTypeWrapper<
    Omit<SubscriptionContractPausePayload, 'contract'> & {
      contract?: Maybe<ResolversTypes['SubscriptionContract']>;
    }
  >;
  SubscriptionContractSelectDeliveryMethodPayload: ResolverTypeWrapper<
    Omit<SubscriptionContractSelectDeliveryMethodPayload, 'contract'> & {
      contract?: Maybe<ResolversTypes['SubscriptionContract']>;
    }
  >;
  SubscriptionContractStatusUpdateErrorCode: SubscriptionContractStatusUpdateErrorCode;
  SubscriptionContractStatusUpdateUserError: ResolverTypeWrapper<SubscriptionContractStatusUpdateUserError>;
  SubscriptionContractSubscriptionStatus: SubscriptionContractSubscriptionStatus;
  SubscriptionContractUserError: ResolverTypeWrapper<SubscriptionContractUserError>;
  SubscriptionContractUserErrorCode: SubscriptionContractUserErrorCode;
  SubscriptionContractsSortKeys: SubscriptionContractsSortKeys;
  SubscriptionDeliveryMethod: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['SubscriptionDeliveryMethod']
  >;
  SubscriptionDeliveryMethodInput: SubscriptionDeliveryMethodInput;
  SubscriptionDeliveryMethodLocalDelivery: ResolverTypeWrapper<SubscriptionDeliveryMethodLocalDelivery>;
  SubscriptionDeliveryMethodLocalDeliveryInput: SubscriptionDeliveryMethodLocalDeliveryInput;
  SubscriptionDeliveryMethodLocalDeliveryOption: ResolverTypeWrapper<SubscriptionDeliveryMethodLocalDeliveryOption>;
  SubscriptionDeliveryMethodPickup: ResolverTypeWrapper<SubscriptionDeliveryMethodPickup>;
  SubscriptionDeliveryMethodPickupInput: SubscriptionDeliveryMethodPickupInput;
  SubscriptionDeliveryMethodPickupOption: ResolverTypeWrapper<SubscriptionDeliveryMethodPickupOption>;
  SubscriptionDeliveryMethodShipping: ResolverTypeWrapper<SubscriptionDeliveryMethodShipping>;
  SubscriptionDeliveryMethodShippingInput: SubscriptionDeliveryMethodShippingInput;
  SubscriptionDeliveryMethodShippingOption: ResolverTypeWrapper<SubscriptionDeliveryMethodShippingOption>;
  SubscriptionDeliveryOption: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['SubscriptionDeliveryOption']
  >;
  SubscriptionDeliveryOptionsResult: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['SubscriptionDeliveryOptionsResult']
  >;
  SubscriptionDeliveryOptionsResultFailure: ResolverTypeWrapper<SubscriptionDeliveryOptionsResultFailure>;
  SubscriptionDeliveryOptionsResultSuccess: ResolverTypeWrapper<
    Omit<SubscriptionDeliveryOptionsResultSuccess, 'deliveryOptions'> & {
      deliveryOptions: Array<ResolversTypes['SubscriptionDeliveryOption']>;
    }
  >;
  SubscriptionDeliveryPolicy: ResolverTypeWrapper<
    Omit<SubscriptionDeliveryPolicy, 'anchors'> & {
      anchors: Array<ResolversTypes['SubscriptionAnchor']>;
    }
  >;
  SubscriptionInterval: SubscriptionInterval;
  SubscriptionLine: ResolverTypeWrapper<SubscriptionLine>;
  SubscriptionLineConnection: ResolverTypeWrapper<SubscriptionLineConnection>;
  SubscriptionLineEdge: ResolverTypeWrapper<SubscriptionLineEdge>;
  SubscriptionLocalDeliveryOption: ResolverTypeWrapper<SubscriptionLocalDeliveryOption>;
  SubscriptionMailingAddress: ResolverTypeWrapper<SubscriptionMailingAddress>;
  SubscriptionMonthDayAnchor: ResolverTypeWrapper<SubscriptionMonthDayAnchor>;
  SubscriptionPickupOption: ResolverTypeWrapper<SubscriptionPickupOption>;
  SubscriptionPriceBreakdown: ResolverTypeWrapper<SubscriptionPriceBreakdown>;
  SubscriptionShippingOption: ResolverTypeWrapper<SubscriptionShippingOption>;
  SubscriptionWeekDayAnchor: ResolverTypeWrapper<SubscriptionWeekDayAnchor>;
  SubscriptionYearDayAnchor: ResolverTypeWrapper<SubscriptionYearDayAnchor>;
  TaxExemption: TaxExemption;
  TaxExemptionDetails: ResolverTypeWrapper<TaxExemptionDetails>;
  TaxInvoice: ResolverTypeWrapper<TaxInvoice>;
  TaxInvoiceStatus: TaxInvoiceStatus;
  TaxLine: ResolverTypeWrapper<TaxLine>;
  TaxRegionCode: TaxRegionCode;
  TimelineEvent: ResolverTypeWrapper<TimelineEvent>;
  TipSale: ResolverTypeWrapper<
    Omit<TipSale, 'lineItem'> & {lineItem: ResolversTypes['LineItem']}
  >;
  TrackingInformation: ResolverTypeWrapper<TrackingInformation>;
  TransactionSortKeys: TransactionSortKeys;
  TransactionTypeDetails: ResolverTypeWrapper<TransactionTypeDetails>;
  URL: ResolverTypeWrapper<Scalars['URL']['output']>;
  UiExtensionMetafield: ResolverTypeWrapper<UiExtensionMetafield>;
  UiExtensionMetafieldFilterInput: UiExtensionMetafieldFilterInput;
  UiExtensionSessionToken: ResolverTypeWrapper<UiExtensionSessionToken>;
  UnfulfilledDigitalLineItemContainer: ResolverTypeWrapper<
    Omit<UnfulfilledDigitalLineItemContainer, 'lineItems'> & {
      lineItems: ResolversTypes['LineItemContainerLineItemConnection'];
    }
  >;
  UnfulfilledGiftCardLineItemContainer: ResolverTypeWrapper<
    Omit<UnfulfilledGiftCardLineItemContainer, 'lineItems'> & {
      lineItems: ResolversTypes['LineItemContainerLineItemConnection'];
    }
  >;
  UnfulfilledLineItemContainer: ResolverTypeWrapper<
    Omit<UnfulfilledLineItemContainer, 'lineItems'> & {
      lineItems: ResolversTypes['LineItemContainerLineItemConnection'];
    }
  >;
  UnfulfilledLineItemContainerCommonFields: ResolverTypeWrapper<
    ResolversInterfaceTypes<ResolversTypes>['UnfulfilledLineItemContainerCommonFields']
  >;
  UnfulfilledPhysicalLineItemContainer: ResolverTypeWrapper<
    Omit<UnfulfilledPhysicalLineItemContainer, 'lineItems'> & {
      lineItems: ResolversTypes['LineItemContainerLineItemConnection'];
    }
  >;
  UnitPrice: ResolverTypeWrapper<UnitPrice>;
  UnitPriceMeasurement: ResolverTypeWrapper<UnitPriceMeasurement>;
  UnitPriceMeasurementUnit: UnitPriceMeasurementUnit;
  UnknownSale: ResolverTypeWrapper<UnknownSale>;
  UnsignedInt64: ResolverTypeWrapper<Scalars['UnsignedInt64']['output']>;
  UserErrorsBusinessContactUserErrors: ResolverTypeWrapper<UserErrorsBusinessContactUserErrors>;
  UserErrorsBusinessContactUserErrorsCode: UserErrorsBusinessContactUserErrorsCode;
  UserErrorsBusinessLocationPaymentInstrumentUserErrors: ResolverTypeWrapper<UserErrorsBusinessLocationPaymentInstrumentUserErrors>;
  UserErrorsBusinessLocationPaymentInstrumentUserErrorsCode: UserErrorsBusinessLocationPaymentInstrumentUserErrorsCode;
  UserErrorsCustomerAddressUserErrors: ResolverTypeWrapper<UserErrorsCustomerAddressUserErrors>;
  UserErrorsCustomerAddressUserErrorsCode: UserErrorsCustomerAddressUserErrorsCode;
  UserErrorsCustomerEmailMarketingOptInUserErrors: ResolverTypeWrapper<UserErrorsCustomerEmailMarketingOptInUserErrors>;
  UserErrorsCustomerEmailMarketingOptInUserErrorsCode: UserErrorsCustomerEmailMarketingOptInUserErrorsCode;
  UserErrorsCustomerEmailMarketingUserErrors: ResolverTypeWrapper<UserErrorsCustomerEmailMarketingUserErrors>;
  UserErrorsCustomerEmailMarketingUserErrorsCode: UserErrorsCustomerEmailMarketingUserErrorsCode;
  UserErrorsCustomerUserErrors: ResolverTypeWrapper<UserErrorsCustomerUserErrors>;
  UserErrorsCustomerUserErrorsCode: UserErrorsCustomerUserErrorsCode;
  UserErrorsPaymentInstrumentUserErrors: ResolverTypeWrapper<UserErrorsPaymentInstrumentUserErrors>;
  UserErrorsPaymentInstrumentUserErrorsCode: UserErrorsPaymentInstrumentUserErrorsCode;
  UserErrorsPaypalTokenUserErrors: ResolverTypeWrapper<UserErrorsPaypalTokenUserErrors>;
  UserErrorsPaypalTokenUserErrorsCode: UserErrorsPaypalTokenUserErrorsCode;
  UserErrorsResendGiftCardErrors: ResolverTypeWrapper<UserErrorsResendGiftCardErrors>;
  UserErrorsResendGiftCardErrorsCode: UserErrorsResendGiftCardErrorsCode;
  UserErrorsStorefrontCustomerAccessTokenCreateUserErrors: ResolverTypeWrapper<UserErrorsStorefrontCustomerAccessTokenCreateUserErrors>;
  UserErrorsStorefrontCustomerAccessTokenCreateUserErrorsCode: UserErrorsStorefrontCustomerAccessTokenCreateUserErrorsCode;
  WalletPaymentConfig: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['WalletPaymentConfig']
  >;
  Weight: ResolverTypeWrapper<Weight>;
  WeightUnit: WeightUnit;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdditionalFeeSale: AdditionalFeeSale;
  AddressFormField: AddressFormField;
  AddressFormSettings: AddressFormSettings;
  AdjustmentSale: AdjustmentSale;
  ApplePayBillingAddressInput: ApplePayBillingAddressInput;
  ApplePayCreditCardAddPayload: Omit<
    ApplePayCreditCardAddPayload,
    'creditCard'
  > & {creditCard?: Maybe<ResolversParentTypes['CustomerCreditCard']>};
  ApplePayCreditCardUpdatePayload: Omit<
    ApplePayCreditCardUpdatePayload,
    'creditCard'
  > & {creditCard?: Maybe<ResolversParentTypes['CustomerCreditCard']>};
  ApplePaySessionCreatePayload: ApplePaySessionCreatePayload;
  ApplePaySessionUserError: ApplePaySessionUserError;
  ApplePayWalletConfig: ApplePayWalletConfig;
  AppliedGiftCard: AppliedGiftCard;
  Attribute: Attribute;
  AutomaticDiscountApplication: Omit<AutomaticDiscountApplication, 'value'> & {
    value: ResolversParentTypes['PricingValue'];
  };
  AvailableShippingRates: AvailableShippingRates;
  Boolean: Scalars['Boolean']['output'];
  BusinessContactUpdateInput: BusinessContactUpdateInput;
  BusinessContactUpdatePayload: Omit<
    BusinessContactUpdatePayload,
    'businessContact'
  > & {businessContact?: Maybe<ResolversParentTypes['CompanyContact']>};
  BusinessCustomerUserError: BusinessCustomerUserError;
  BusinessLocationCreditCardAddPayload: Omit<
    BusinessLocationCreditCardAddPayload,
    'creditCard'
  > & {creditCard?: Maybe<ResolversParentTypes['CustomerCreditCard']>};
  BusinessLocationCreditCardUpdatePayload: Omit<
    BusinessLocationCreditCardUpdatePayload,
    'creditCard'
  > & {creditCard?: Maybe<ResolversParentTypes['CustomerCreditCard']>};
  BusinessLocationPaymentInstrumentRemovePayload: BusinessLocationPaymentInstrumentRemovePayload;
  BuyerExperienceConfiguration: Omit<
    BuyerExperienceConfiguration,
    'deposit'
  > & {deposit?: Maybe<ResolversParentTypes['DepositConfiguration']>};
  CardPaymentDetails: CardPaymentDetails;
  Checkout: Omit<
    Checkout,
    'appliedGiftCards' | 'discountApplications' | 'shippingDiscountAllocations'
  > & {
    appliedGiftCards: Array<ResolversParentTypes['AppliedGiftCard']>;
    discountApplications: ResolversParentTypes['DiscountApplicationConnection'];
    shippingDiscountAllocations: Array<
      ResolversParentTypes['DiscountAllocation']
    >;
  };
  CheckoutLineItem: CheckoutLineItem;
  CheckoutLineItemConnection: CheckoutLineItemConnection;
  CheckoutLineItemEdge: CheckoutLineItemEdge;
  Company: Omit<Company, 'draftOrders' | 'locations' | 'orders' | 'profile'> & {
    draftOrders: ResolversParentTypes['DraftOrderConnection'];
    locations: ResolversParentTypes['CompanyLocationConnection'];
    orders: ResolversParentTypes['OrderConnection'];
    profile?: Maybe<ResolversParentTypes['CompanyContact']>;
  };
  CompanyAddress: CompanyAddress;
  CompanyAddressInput: CompanyAddressInput;
  CompanyContact: Omit<
    CompanyContact,
    'company' | 'customer' | 'draftOrders' | 'locations' | 'orders'
  > & {
    company?: Maybe<ResolversParentTypes['Company']>;
    customer: ResolversParentTypes['Customer'];
    draftOrders: ResolversParentTypes['DraftOrderConnection'];
    locations: ResolversParentTypes['CompanyLocationConnection'];
    orders: ResolversParentTypes['OrderConnection'];
  };
  CompanyContactConnection: Omit<
    CompanyContactConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['CompanyContactEdge']>;
    nodes: Array<ResolversParentTypes['CompanyContact']>;
  };
  CompanyContactEdge: Omit<CompanyContactEdge, 'node'> & {
    node: ResolversParentTypes['CompanyContact'];
  };
  CompanyContactRole: CompanyContactRole;
  CompanyContactRoleAssignment: Omit<
    CompanyContactRoleAssignment,
    'contact'
  > & {contact: ResolversParentTypes['CompanyContact']};
  CompanyContactRoleAssignmentConnection: CompanyContactRoleAssignmentConnection;
  CompanyContactRoleAssignmentEdge: CompanyContactRoleAssignmentEdge;
  CompanyLocation: Omit<
    CompanyLocation,
    | 'billingAddress'
    | 'buyerExperienceConfiguration'
    | 'contacts'
    | 'creditCard'
    | 'draftOrders'
    | 'orders'
    | 'shippingAddress'
  > & {
    billingAddress?: Maybe<ResolversParentTypes['CompanyAddress']>;
    buyerExperienceConfiguration?: Maybe<
      ResolversParentTypes['BuyerExperienceConfiguration']
    >;
    contacts: ResolversParentTypes['CompanyContactConnection'];
    creditCard?: Maybe<ResolversParentTypes['CustomerCreditCard']>;
    draftOrders: ResolversParentTypes['DraftOrderConnection'];
    orders: ResolversParentTypes['OrderConnection'];
    shippingAddress?: Maybe<ResolversParentTypes['CompanyAddress']>;
  };
  CompanyLocationAssignAddressPayload: Omit<
    CompanyLocationAssignAddressPayload,
    'addresses'
  > & {addresses?: Maybe<Array<ResolversParentTypes['CompanyAddress']>>};
  CompanyLocationConnection: Omit<
    CompanyLocationConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['CompanyLocationEdge']>;
    nodes: Array<ResolversParentTypes['CompanyLocation']>;
  };
  CompanyLocationEdge: Omit<CompanyLocationEdge, 'node'> & {
    node: ResolversParentTypes['CompanyLocation'];
  };
  Count: Count;
  CreditCardAddPayload: Omit<CreditCardAddPayload, 'creditCard'> & {
    creditCard?: Maybe<ResolversParentTypes['CustomerCreditCard']>;
  };
  CreditCardUpdatePayload: Omit<CreditCardUpdatePayload, 'creditCard'> & {
    creditCard?: Maybe<ResolversParentTypes['CustomerCreditCard']>;
  };
  Customer: Omit<
    Customer,
    | 'availableWalletPaymentConfigs'
    | 'companyContacts'
    | 'creditCard'
    | 'defaultAddress'
    | 'draftOrders'
    | 'lastIncompleteCheckout'
    | 'orders'
    | 'paypalBillingAgreement'
    | 'return'
    | 'storeCreditAccounts'
    | 'subscriptionContract'
    | 'subscriptionContracts'
  > & {
    availableWalletPaymentConfigs: Array<
      ResolversParentTypes['WalletPaymentConfig']
    >;
    companyContacts: ResolversParentTypes['CompanyContactConnection'];
    creditCard?: Maybe<ResolversParentTypes['CustomerCreditCard']>;
    defaultAddress?: Maybe<ResolversParentTypes['CustomerAddress']>;
    draftOrders: ResolversParentTypes['DraftOrderConnection'];
    lastIncompleteCheckout?: Maybe<ResolversParentTypes['Checkout']>;
    orders: ResolversParentTypes['OrderConnection'];
    paypalBillingAgreement?: Maybe<
      ResolversParentTypes['PaypalBillingAgreement']
    >;
    return?: Maybe<ResolversParentTypes['Return']>;
    storeCreditAccounts: ResolversParentTypes['StoreCreditAccountConnection'];
    subscriptionContract?: Maybe<ResolversParentTypes['SubscriptionContract']>;
    subscriptionContracts: ResolversParentTypes['SubscriptionContractConnection'];
  };
  CustomerAddress: CustomerAddress;
  CustomerAddressConnection: Omit<CustomerAddressConnection, 'nodes'> & {
    nodes: Array<ResolversParentTypes['CustomerAddress']>;
  };
  CustomerAddressCreatePayload: Omit<
    CustomerAddressCreatePayload,
    'customerAddress'
  > & {customerAddress?: Maybe<ResolversParentTypes['CustomerAddress']>};
  CustomerAddressDeletePayload: CustomerAddressDeletePayload;
  CustomerAddressEdge: Omit<CustomerAddressEdge, 'node'> & {
    node: ResolversParentTypes['CustomerAddress'];
  };
  CustomerAddressInput: CustomerAddressInput;
  CustomerAddressUpdatePayload: Omit<
    CustomerAddressUpdatePayload,
    'customerAddress'
  > & {customerAddress?: Maybe<ResolversParentTypes['CustomerAddress']>};
  CustomerCreditCard: Omit<
    CustomerCreditCard,
    | 'billingAddress'
    | 'openDraftOrders'
    | 'pendingOrders'
    | 'subscriptionContracts'
  > & {
    billingAddress?: Maybe<
      ResolversParentTypes['PaymentInstrumentBillingAddress']
    >;
    openDraftOrders: ResolversParentTypes['DraftOrderConnection'];
    pendingOrders: ResolversParentTypes['OrderConnection'];
    subscriptionContracts: ResolversParentTypes['SubscriptionContractConnection'];
  };
  CustomerCreditCardConnection: Omit<CustomerCreditCardConnection, 'nodes'> & {
    nodes: Array<ResolversParentTypes['CustomerCreditCard']>;
  };
  CustomerCreditCardEdge: Omit<CustomerCreditCardEdge, 'node'> & {
    node: ResolversParentTypes['CustomerCreditCard'];
  };
  CustomerEmailAddress: CustomerEmailAddress;
  CustomerEmailMarketingOptInPayload: CustomerEmailMarketingOptInPayload;
  CustomerEmailMarketingSubscribePayload: CustomerEmailMarketingSubscribePayload;
  CustomerEmailMarketingUnsubscribePayload: CustomerEmailMarketingUnsubscribePayload;
  CustomerMailingAddress: CustomerMailingAddress;
  CustomerMailingAddressInput: CustomerMailingAddressInput;
  CustomerPhoneNumber: CustomerPhoneNumber;
  CustomerUpdateInput: CustomerUpdateInput;
  CustomerUpdatePayload: Omit<CustomerUpdatePayload, 'customer'> & {
    customer?: Maybe<ResolversParentTypes['Customer']>;
  };
  DateTime: Scalars['DateTime']['output'];
  Decimal: Scalars['Decimal']['output'];
  DepositConfiguration: ResolversUnionTypes<ResolversParentTypes>['DepositConfiguration'];
  DepositPercentage: DepositPercentage;
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
  DraftOrder: Omit<
    DraftOrder,
    | 'billingAddress'
    | 'customer'
    | 'order'
    | 'purchasingEntity'
    | 'shippingAddress'
  > & {
    billingAddress?: Maybe<ResolversParentTypes['CustomerAddress']>;
    customer?: Maybe<ResolversParentTypes['Customer']>;
    order?: Maybe<ResolversParentTypes['Order']>;
    purchasingEntity?: Maybe<ResolversParentTypes['PurchasingEntity']>;
    shippingAddress?: Maybe<ResolversParentTypes['CustomerAddress']>;
  };
  DraftOrderAppliedDiscount: DraftOrderAppliedDiscount;
  DraftOrderConnection: Omit<DraftOrderConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['DraftOrderEdge']>;
    nodes: Array<ResolversParentTypes['DraftOrder']>;
  };
  DraftOrderDiscountInformation: DraftOrderDiscountInformation;
  DraftOrderEdge: Omit<DraftOrderEdge, 'node'> & {
    node: ResolversParentTypes['DraftOrder'];
  };
  DraftOrderLineItem: DraftOrderLineItem;
  DraftOrderLineItemConnection: DraftOrderLineItemConnection;
  DraftOrderLineItemDiscountInformation: DraftOrderLineItemDiscountInformation;
  DraftOrderLineItemEdge: DraftOrderLineItemEdge;
  DraftOrderLineItemsSummary: DraftOrderLineItemsSummary;
  DutySale: DutySale;
  ExtensionApiTokens: ExtensionApiTokens;
  ExtensionStorefrontApiToken: ExtensionStorefrontApiToken;
  FeeSale: FeeSale;
  Float: Scalars['Float']['output'];
  Fulfillment: Omit<Fulfillment, 'fulfillmentLineItems'> & {
    fulfillmentLineItems: ResolversParentTypes['FulfillmentLineItemConnection'];
  };
  FulfillmentConnection: Omit<FulfillmentConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['FulfillmentEdge']>;
    nodes: Array<ResolversParentTypes['Fulfillment']>;
  };
  FulfillmentEdge: Omit<FulfillmentEdge, 'node'> & {
    node: ResolversParentTypes['Fulfillment'];
  };
  FulfillmentEvent: FulfillmentEvent;
  FulfillmentEventConnection: FulfillmentEventConnection;
  FulfillmentEventEdge: FulfillmentEventEdge;
  FulfillmentLineItem: Omit<FulfillmentLineItem, 'lineItem'> & {
    lineItem: ResolversParentTypes['LineItem'];
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
  GiftCardDetails: GiftCardDetails;
  GiftCardSale: Omit<GiftCardSale, 'lineItem'> & {
    lineItem: ResolversParentTypes['LineItem'];
  };
  GooglePayBillingAddressInput: GooglePayBillingAddressInput;
  GooglePayCreditCardAddPayload: Omit<
    GooglePayCreditCardAddPayload,
    'creditCard'
  > & {creditCard?: Maybe<ResolversParentTypes['CustomerCreditCard']>};
  GooglePayCreditCardUpdatePayload: Omit<
    GooglePayCreditCardUpdatePayload,
    'creditCard'
  > & {creditCard?: Maybe<ResolversParentTypes['CustomerCreditCard']>};
  GooglePayWalletConfig: GooglePayWalletConfig;
  HTML: Scalars['HTML']['output'];
  HasCompareDigest: ResolversInterfaceTypes<ResolversParentTypes>['HasCompareDigest'];
  HasMetafields: ResolversInterfaceTypes<ResolversParentTypes>['HasMetafields'];
  HasMetafieldsIdentifier: HasMetafieldsIdentifier;
  HasStoreCreditAccounts: ResolversInterfaceTypes<ResolversParentTypes>['HasStoreCreditAccounts'];
  ID: Scalars['ID']['output'];
  ISO8601DateTime: Scalars['ISO8601DateTime']['output'];
  Image: Image;
  ImageTransformInput: ImageTransformInput;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  LegacyAggregatedMerchandiseTermsAsFees: LegacyAggregatedMerchandiseTermsAsFees;
  LineItem: Omit<LineItem, 'discountAllocations'> & {
    discountAllocations: Array<ResolversParentTypes['DiscountAllocation']>;
  };
  LineItemConnection: Omit<LineItemConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['LineItemEdge']>;
    nodes: Array<ResolversParentTypes['LineItem']>;
  };
  LineItemContainer: ResolversUnionTypes<ResolversParentTypes>['LineItemContainer'];
  LineItemContainerLineItem: Omit<LineItemContainerLineItem, 'lineItem'> & {
    lineItem: ResolversParentTypes['LineItem'];
  };
  LineItemContainerLineItemConnection: Omit<
    LineItemContainerLineItemConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['LineItemContainerLineItemEdge']>;
    nodes: Array<ResolversParentTypes['LineItemContainerLineItem']>;
  };
  LineItemContainerLineItemEdge: Omit<LineItemContainerLineItemEdge, 'node'> & {
    node: ResolversParentTypes['LineItemContainerLineItem'];
  };
  LineItemDiscountInformation: LineItemDiscountInformation;
  LineItemEdge: Omit<LineItemEdge, 'node'> & {
    node: ResolversParentTypes['LineItem'];
  };
  LineItemGroup: LineItemGroup;
  LineItemSellingPlan: LineItemSellingPlan;
  LineItemVariantOption: LineItemVariantOption;
  ManualDiscountApplication: Omit<ManualDiscountApplication, 'value'> & {
    value: ResolversParentTypes['PricingValue'];
  };
  Market: Market;
  MarketWebPresence: MarketWebPresence;
  MarketWebPresenceRootUrl: MarketWebPresenceRootUrl;
  Metafield: Metafield;
  MetafieldIdentifier: MetafieldIdentifier;
  MetafieldIdentifierInput: MetafieldIdentifierInput;
  MetafieldsDeletePayload: MetafieldsDeletePayload;
  MetafieldsDeleteUserError: MetafieldsDeleteUserError;
  MetafieldsSetInput: MetafieldsSetInput;
  MetafieldsSetPayload: MetafieldsSetPayload;
  MetafieldsSetUserError: MetafieldsSetUserError;
  MoneyBag: MoneyBag;
  MoneyV2: MoneyV2;
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  Order: Omit<
    Order,
    | 'agreements'
    | 'billingAddress'
    | 'customer'
    | 'discountApplications'
    | 'draftOrder'
    | 'editSummary'
    | 'fulfillments'
    | 'lineItemContainers'
    | 'lineItems'
    | 'purchasingEntity'
    | 'return'
    | 'returns'
    | 'shippingAddress'
    | 'shippingDiscountAllocations'
    | 'subscriptionContracts'
    | 'transactions'
  > & {
    agreements: ResolversParentTypes['SalesAgreementConnection'];
    billingAddress?: Maybe<ResolversParentTypes['CustomerAddress']>;
    customer?: Maybe<ResolversParentTypes['Customer']>;
    discountApplications: ResolversParentTypes['DiscountApplicationConnection'];
    draftOrder?: Maybe<ResolversParentTypes['DraftOrder']>;
    editSummary?: Maybe<ResolversParentTypes['OrderEditSummary']>;
    fulfillments: ResolversParentTypes['FulfillmentConnection'];
    lineItemContainers: Array<ResolversParentTypes['LineItemContainer']>;
    lineItems: ResolversParentTypes['LineItemConnection'];
    purchasingEntity?: Maybe<ResolversParentTypes['PurchasingEntity']>;
    return?: Maybe<ResolversParentTypes['Return']>;
    returns: ResolversParentTypes['ReturnConnection'];
    shippingAddress?: Maybe<ResolversParentTypes['CustomerAddress']>;
    shippingDiscountAllocations: Array<
      ResolversParentTypes['DiscountAllocation']
    >;
    subscriptionContracts?: Maybe<
      ResolversParentTypes['SubscriptionContractConnection']
    >;
    transactions: Array<ResolversParentTypes['OrderTransaction']>;
  };
  OrderAgreement: Omit<OrderAgreement, 'order' | 'sales'> & {
    order: ResolversParentTypes['Order'];
    sales: ResolversParentTypes['SaleConnection'];
  };
  OrderAllDiscounts: OrderAllDiscounts;
  OrderConnection: Omit<OrderConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['OrderEdge']>;
    nodes: Array<ResolversParentTypes['Order']>;
  };
  OrderDetailsPageOrder: ResolversUnionTypes<ResolversParentTypes>['OrderDetailsPageOrder'];
  OrderDiscountInformation: OrderDiscountInformation;
  OrderDutiesSummary: OrderDutiesSummary;
  OrderEdge: Omit<OrderEdge, 'node'> & {node: ResolversParentTypes['Order']};
  OrderEditAgreement: Omit<OrderEditAgreement, 'sales'> & {
    sales: ResolversParentTypes['SaleConnection'];
  };
  OrderEditSummary: Omit<OrderEditSummary, 'changes'> & {
    changes: Array<ResolversParentTypes['OrderEditSummaryChange']>;
  };
  OrderEditSummaryChange: Omit<OrderEditSummaryChange, 'lineItem'> & {
    lineItem: ResolversParentTypes['LineItem'];
  };
  OrderLineItemsSummary: OrderLineItemsSummary;
  OrderPaymentInformation: OrderPaymentInformation;
  OrderPickupInformation: OrderPickupInformation;
  OrderRequestReturnPayload: Omit<OrderRequestReturnPayload, 'return'> & {
    return?: Maybe<ResolversParentTypes['Return']>;
  };
  OrderShippingLineGroup: OrderShippingLineGroup;
  OrderSoldInformation: OrderSoldInformation;
  OrderTransaction: Omit<
    OrderTransaction,
    'giftCardDetails' | 'paymentDetails'
  > & {
    giftCardDetails?: Maybe<ResolversParentTypes['GiftCardDetails']>;
    paymentDetails?: Maybe<ResolversParentTypes['PaymentDetails']>;
  };
  PageInfo: PageInfo;
  PaymentDetails: ResolversUnionTypes<ResolversParentTypes>['PaymentDetails'];
  PaymentIcon: ResolversInterfaceTypes<ResolversParentTypes>['PaymentIcon'];
  PaymentIconImage: PaymentIconImage;
  PaymentInstrument: ResolversInterfaceTypes<ResolversParentTypes>['PaymentInstrument'];
  PaymentInstrumentBillingAddress: PaymentInstrumentBillingAddress;
  PaymentInstrumentRemovePayload: PaymentInstrumentRemovePayload;
  PaymentInstrumentUpdateDefaultPayload: PaymentInstrumentUpdateDefaultPayload;
  PaymentSchedule: PaymentSchedule;
  PaymentScheduleConnection: PaymentScheduleConnection;
  PaymentScheduleEdge: PaymentScheduleEdge;
  PaymentTerms: PaymentTerms;
  PaymentTermsTemplate: PaymentTermsTemplate;
  PaypalAccountEnablePayload: Omit<
    PaypalAccountEnablePayload,
    'paypalBillingAgreement'
  > & {
    paypalBillingAgreement?: Maybe<
      ResolversParentTypes['PaypalBillingAgreement']
    >;
  };
  PaypalBillingAgreement: Omit<
    PaypalBillingAgreement,
    'billingAddress' | 'pendingOrders' | 'subscriptionContracts'
  > & {
    billingAddress?: Maybe<
      ResolversParentTypes['PaymentInstrumentBillingAddress']
    >;
    pendingOrders: ResolversParentTypes['OrderConnection'];
    subscriptionContracts: ResolversParentTypes['SubscriptionContractConnection'];
  };
  PaypalTokenCreatePayload: PaypalTokenCreatePayload;
  PickupAddress: PickupAddress;
  PricingPercentageValue: PricingPercentageValue;
  PricingValue: ResolversUnionTypes<ResolversParentTypes>['PricingValue'];
  ProductSale: Omit<ProductSale, 'lineItem'> & {
    lineItem: ResolversParentTypes['LineItem'];
  };
  PublicOrder: Omit<
    PublicOrder,
    | 'editSummary'
    | 'fulfillments'
    | 'lineItemContainers'
    | 'lineItems'
    | 'return'
    | 'returns'
    | 'transactions'
  > & {
    editSummary?: Maybe<ResolversParentTypes['OrderEditSummary']>;
    fulfillments: ResolversParentTypes['FulfillmentConnection'];
    lineItemContainers: Array<ResolversParentTypes['LineItemContainer']>;
    lineItems: ResolversParentTypes['LineItemConnection'];
    return?: Maybe<ResolversParentTypes['Return']>;
    returns: ResolversParentTypes['ReturnConnection'];
    transactions: Array<ResolversParentTypes['OrderTransaction']>;
  };
  PurchasingCompany: Omit<
    PurchasingCompany,
    'company' | 'contact' | 'location'
  > & {
    company: ResolversParentTypes['Company'];
    contact?: Maybe<ResolversParentTypes['CompanyContact']>;
    location: ResolversParentTypes['CompanyLocation'];
  };
  PurchasingEntity: ResolversUnionTypes<ResolversParentTypes>['PurchasingEntity'];
  QueryRoot: {};
  Refund: Refund;
  RefundAgreement: Omit<RefundAgreement, 'sales'> & {
    sales: ResolversParentTypes['SaleConnection'];
  };
  RemainingLineItemContainer: Omit<RemainingLineItemContainer, 'lineItems'> & {
    lineItems: ResolversParentTypes['RemainingLineItemContainerLineItemConnection'];
  };
  RemainingLineItemContainerLineItem: Omit<
    RemainingLineItemContainerLineItem,
    'lineItem'
  > & {lineItem: ResolversParentTypes['LineItem']};
  RemainingLineItemContainerLineItemConnection: Omit<
    RemainingLineItemContainerLineItemConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<
      ResolversParentTypes['RemainingLineItemContainerLineItemEdge']
    >;
    nodes: Array<ResolversParentTypes['RemainingLineItemContainerLineItem']>;
  };
  RemainingLineItemContainerLineItemEdge: Omit<
    RemainingLineItemContainerLineItemEdge,
    'node'
  > & {node: ResolversParentTypes['RemainingLineItemContainerLineItem']};
  RequestedLineItemInput: RequestedLineItemInput;
  ResendGiftCardPayload: ResendGiftCardPayload;
  ResourcePermission: ResourcePermission;
  Return: Omit<Return, 'decline' | 'returnLineItems' | 'reverseDeliveries'> & {
    decline?: Maybe<ResolversParentTypes['ReturnDecline']>;
    returnLineItems: ResolversParentTypes['ReturnLineItemConnection'];
    reverseDeliveries: ResolversParentTypes['ReverseDeliveryConnection'];
  };
  ReturnAgreement: Omit<ReturnAgreement, 'return' | 'sales'> & {
    return: ResolversParentTypes['Return'];
    sales: ResolversParentTypes['SaleConnection'];
  };
  ReturnConnection: Omit<ReturnConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['ReturnEdge']>;
    nodes: Array<ResolversParentTypes['Return']>;
  };
  ReturnDecline: ReturnDecline;
  ReturnEdge: Omit<ReturnEdge, 'node'> & {node: ResolversParentTypes['Return']};
  ReturnLineItem: Omit<ReturnLineItem, 'lineItem'> & {
    lineItem: ResolversParentTypes['LineItem'];
  };
  ReturnLineItemConnection: Omit<
    ReturnLineItemConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['ReturnLineItemEdge']>;
    nodes: Array<ResolversParentTypes['ReturnLineItem']>;
  };
  ReturnLineItemEdge: Omit<ReturnLineItemEdge, 'node'> & {
    node: ResolversParentTypes['ReturnLineItem'];
  };
  ReturnSupportedReason: ReturnSupportedReason;
  ReturnUserError: ReturnUserError;
  ReverseDelivery: Omit<ReverseDelivery, 'deliverable'> & {
    deliverable?: Maybe<ResolversParentTypes['ReverseDeliveryDeliverable']>;
  };
  ReverseDeliveryConnection: Omit<
    ReverseDeliveryConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['ReverseDeliveryEdge']>;
    nodes: Array<ResolversParentTypes['ReverseDelivery']>;
  };
  ReverseDeliveryDeliverable: ResolversUnionTypes<ResolversParentTypes>['ReverseDeliveryDeliverable'];
  ReverseDeliveryEdge: Omit<ReverseDeliveryEdge, 'node'> & {
    node: ResolversParentTypes['ReverseDelivery'];
  };
  ReverseDeliveryLabel: ReverseDeliveryLabel;
  ReverseDeliveryShippingDeliverable: ReverseDeliveryShippingDeliverable;
  ReverseDeliveryTracking: ReverseDeliveryTracking;
  Sale: ResolversInterfaceTypes<ResolversParentTypes>['Sale'];
  SaleConnection: Omit<SaleConnection, 'edges' | 'nodes'> & {
    edges: Array<ResolversParentTypes['SaleEdge']>;
    nodes: Array<ResolversParentTypes['Sale']>;
  };
  SaleEdge: Omit<SaleEdge, 'node'> & {node: ResolversParentTypes['Sale']};
  SaleTax: SaleTax;
  SalesAgreement: ResolversInterfaceTypes<ResolversParentTypes>['SalesAgreement'];
  SalesAgreementConnection: Omit<
    SalesAgreementConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['SalesAgreementEdge']>;
    nodes: Array<ResolversParentTypes['SalesAgreement']>;
  };
  SalesAgreementEdge: Omit<SalesAgreementEdge, 'node'> & {
    node: ResolversParentTypes['SalesAgreement'];
  };
  ScriptDiscountApplication: Omit<ScriptDiscountApplication, 'value'> & {
    value: ResolversParentTypes['PricingValue'];
  };
  ShippingLine: ShippingLine;
  ShippingLineSale: ShippingLineSale;
  ShippingRate: ShippingRate;
  Shop: Shop;
  ShopAppLinksAndResources: ShopAppLinksAndResources;
  ShopPayConfiguration: ShopPayConfiguration;
  ShopPayCreditCardGetUpdateUrlPayload: ShopPayCreditCardGetUpdateUrlPayload;
  ShopPolicy: ShopPolicy;
  StoreCreditAccount: Omit<StoreCreditAccount, 'transactions'> & {
    transactions: ResolversParentTypes['StoreCreditAccountTransactionConnection'];
  };
  StoreCreditAccountConnection: Omit<
    StoreCreditAccountConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['StoreCreditAccountEdge']>;
    nodes: Array<ResolversParentTypes['StoreCreditAccount']>;
  };
  StoreCreditAccountCreditTransaction: Omit<
    StoreCreditAccountCreditTransaction,
    'account'
  > & {account: ResolversParentTypes['StoreCreditAccount']};
  StoreCreditAccountDebitRevertTransaction: Omit<
    StoreCreditAccountDebitRevertTransaction,
    'account' | 'debitTransaction'
  > & {
    account: ResolversParentTypes['StoreCreditAccount'];
    debitTransaction: ResolversParentTypes['StoreCreditAccountDebitTransaction'];
  };
  StoreCreditAccountDebitTransaction: Omit<
    StoreCreditAccountDebitTransaction,
    'account'
  > & {account: ResolversParentTypes['StoreCreditAccount']};
  StoreCreditAccountEdge: Omit<StoreCreditAccountEdge, 'node'> & {
    node: ResolversParentTypes['StoreCreditAccount'];
  };
  StoreCreditAccountExpirationTransaction: Omit<
    StoreCreditAccountExpirationTransaction,
    'account' | 'creditTransaction'
  > & {
    account: ResolversParentTypes['StoreCreditAccount'];
    creditTransaction: ResolversParentTypes['StoreCreditAccountCreditTransaction'];
  };
  StoreCreditAccountTransaction: ResolversInterfaceTypes<ResolversParentTypes>['StoreCreditAccountTransaction'];
  StoreCreditAccountTransactionConnection: Omit<
    StoreCreditAccountTransactionConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['StoreCreditAccountTransactionEdge']>;
    nodes: Array<ResolversParentTypes['StoreCreditAccountTransaction']>;
  };
  StoreCreditAccountTransactionEdge: Omit<
    StoreCreditAccountTransactionEdge,
    'node'
  > & {node: ResolversParentTypes['StoreCreditAccountTransaction']};
  StorefrontCustomerAccessTokenCreatePayload: StorefrontCustomerAccessTokenCreatePayload;
  String: Scalars['String']['output'];
  SubscriptionAnchor: ResolversUnionTypes<ResolversParentTypes>['SubscriptionAnchor'];
  SubscriptionBillingCycle: SubscriptionBillingCycle;
  SubscriptionBillingCycleConnection: SubscriptionBillingCycleConnection;
  SubscriptionBillingCycleEdge: SubscriptionBillingCycleEdge;
  SubscriptionBillingCycleInput: SubscriptionBillingCycleInput;
  SubscriptionBillingCycleSelector: SubscriptionBillingCycleSelector;
  SubscriptionBillingCycleSkipPayload: SubscriptionBillingCycleSkipPayload;
  SubscriptionBillingCycleSkipUserError: SubscriptionBillingCycleSkipUserError;
  SubscriptionBillingCycleUnskipPayload: SubscriptionBillingCycleUnskipPayload;
  SubscriptionBillingCycleUnskipUserError: SubscriptionBillingCycleUnskipUserError;
  SubscriptionBillingPolicy: Omit<SubscriptionBillingPolicy, 'anchors'> & {
    anchors: Array<ResolversParentTypes['SubscriptionAnchor']>;
  };
  SubscriptionContract: Omit<
    SubscriptionContract,
    | 'billingPolicy'
    | 'deliveryMethod'
    | 'deliveryPolicy'
    | 'orders'
    | 'originOrder'
    | 'paymentInstrument'
  > & {
    billingPolicy: ResolversParentTypes['SubscriptionBillingPolicy'];
    deliveryMethod?: Maybe<ResolversParentTypes['SubscriptionDeliveryMethod']>;
    deliveryPolicy: ResolversParentTypes['SubscriptionDeliveryPolicy'];
    orders: ResolversParentTypes['OrderConnection'];
    originOrder?: Maybe<ResolversParentTypes['Order']>;
    paymentInstrument?: Maybe<ResolversParentTypes['PaymentInstrument']>;
  };
  SubscriptionContractActivatePayload: Omit<
    SubscriptionContractActivatePayload,
    'contract'
  > & {contract?: Maybe<ResolversParentTypes['SubscriptionContract']>};
  SubscriptionContractBase: ResolversInterfaceTypes<ResolversParentTypes>['SubscriptionContractBase'];
  SubscriptionContractCancelPayload: Omit<
    SubscriptionContractCancelPayload,
    'contract'
  > & {contract?: Maybe<ResolversParentTypes['SubscriptionContract']>};
  SubscriptionContractChangePaymentInstrumentPayload: Omit<
    SubscriptionContractChangePaymentInstrumentPayload,
    'contract'
  > & {contract?: Maybe<ResolversParentTypes['SubscriptionContract']>};
  SubscriptionContractConnection: Omit<
    SubscriptionContractConnection,
    'edges' | 'nodes'
  > & {
    edges: Array<ResolversParentTypes['SubscriptionContractEdge']>;
    nodes: Array<ResolversParentTypes['SubscriptionContract']>;
  };
  SubscriptionContractEdge: Omit<SubscriptionContractEdge, 'node'> & {
    node: ResolversParentTypes['SubscriptionContract'];
  };
  SubscriptionContractFetchDeliveryOptionsPayload: Omit<
    SubscriptionContractFetchDeliveryOptionsPayload,
    'deliveryOptionsResult'
  > & {
    deliveryOptionsResult?: Maybe<
      ResolversParentTypes['SubscriptionDeliveryOptionsResult']
    >;
  };
  SubscriptionContractPausePayload: Omit<
    SubscriptionContractPausePayload,
    'contract'
  > & {contract?: Maybe<ResolversParentTypes['SubscriptionContract']>};
  SubscriptionContractSelectDeliveryMethodPayload: Omit<
    SubscriptionContractSelectDeliveryMethodPayload,
    'contract'
  > & {contract?: Maybe<ResolversParentTypes['SubscriptionContract']>};
  SubscriptionContractStatusUpdateUserError: SubscriptionContractStatusUpdateUserError;
  SubscriptionContractUserError: SubscriptionContractUserError;
  SubscriptionDeliveryMethod: ResolversUnionTypes<ResolversParentTypes>['SubscriptionDeliveryMethod'];
  SubscriptionDeliveryMethodInput: SubscriptionDeliveryMethodInput;
  SubscriptionDeliveryMethodLocalDelivery: SubscriptionDeliveryMethodLocalDelivery;
  SubscriptionDeliveryMethodLocalDeliveryInput: SubscriptionDeliveryMethodLocalDeliveryInput;
  SubscriptionDeliveryMethodLocalDeliveryOption: SubscriptionDeliveryMethodLocalDeliveryOption;
  SubscriptionDeliveryMethodPickup: SubscriptionDeliveryMethodPickup;
  SubscriptionDeliveryMethodPickupInput: SubscriptionDeliveryMethodPickupInput;
  SubscriptionDeliveryMethodPickupOption: SubscriptionDeliveryMethodPickupOption;
  SubscriptionDeliveryMethodShipping: SubscriptionDeliveryMethodShipping;
  SubscriptionDeliveryMethodShippingInput: SubscriptionDeliveryMethodShippingInput;
  SubscriptionDeliveryMethodShippingOption: SubscriptionDeliveryMethodShippingOption;
  SubscriptionDeliveryOption: ResolversUnionTypes<ResolversParentTypes>['SubscriptionDeliveryOption'];
  SubscriptionDeliveryOptionsResult: ResolversUnionTypes<ResolversParentTypes>['SubscriptionDeliveryOptionsResult'];
  SubscriptionDeliveryOptionsResultFailure: SubscriptionDeliveryOptionsResultFailure;
  SubscriptionDeliveryOptionsResultSuccess: Omit<
    SubscriptionDeliveryOptionsResultSuccess,
    'deliveryOptions'
  > & {
    deliveryOptions: Array<ResolversParentTypes['SubscriptionDeliveryOption']>;
  };
  SubscriptionDeliveryPolicy: Omit<SubscriptionDeliveryPolicy, 'anchors'> & {
    anchors: Array<ResolversParentTypes['SubscriptionAnchor']>;
  };
  SubscriptionLine: SubscriptionLine;
  SubscriptionLineConnection: SubscriptionLineConnection;
  SubscriptionLineEdge: SubscriptionLineEdge;
  SubscriptionLocalDeliveryOption: SubscriptionLocalDeliveryOption;
  SubscriptionMailingAddress: SubscriptionMailingAddress;
  SubscriptionMonthDayAnchor: SubscriptionMonthDayAnchor;
  SubscriptionPickupOption: SubscriptionPickupOption;
  SubscriptionPriceBreakdown: SubscriptionPriceBreakdown;
  SubscriptionShippingOption: SubscriptionShippingOption;
  SubscriptionWeekDayAnchor: SubscriptionWeekDayAnchor;
  SubscriptionYearDayAnchor: SubscriptionYearDayAnchor;
  TaxExemptionDetails: TaxExemptionDetails;
  TaxInvoice: TaxInvoice;
  TaxLine: TaxLine;
  TimelineEvent: TimelineEvent;
  TipSale: Omit<TipSale, 'lineItem'> & {
    lineItem: ResolversParentTypes['LineItem'];
  };
  TrackingInformation: TrackingInformation;
  TransactionTypeDetails: TransactionTypeDetails;
  URL: Scalars['URL']['output'];
  UiExtensionMetafield: UiExtensionMetafield;
  UiExtensionMetafieldFilterInput: UiExtensionMetafieldFilterInput;
  UiExtensionSessionToken: UiExtensionSessionToken;
  UnfulfilledDigitalLineItemContainer: Omit<
    UnfulfilledDigitalLineItemContainer,
    'lineItems'
  > & {lineItems: ResolversParentTypes['LineItemContainerLineItemConnection']};
  UnfulfilledGiftCardLineItemContainer: Omit<
    UnfulfilledGiftCardLineItemContainer,
    'lineItems'
  > & {lineItems: ResolversParentTypes['LineItemContainerLineItemConnection']};
  UnfulfilledLineItemContainer: Omit<
    UnfulfilledLineItemContainer,
    'lineItems'
  > & {lineItems: ResolversParentTypes['LineItemContainerLineItemConnection']};
  UnfulfilledLineItemContainerCommonFields: ResolversInterfaceTypes<ResolversParentTypes>['UnfulfilledLineItemContainerCommonFields'];
  UnfulfilledPhysicalLineItemContainer: Omit<
    UnfulfilledPhysicalLineItemContainer,
    'lineItems'
  > & {lineItems: ResolversParentTypes['LineItemContainerLineItemConnection']};
  UnitPrice: UnitPrice;
  UnitPriceMeasurement: UnitPriceMeasurement;
  UnknownSale: UnknownSale;
  UnsignedInt64: Scalars['UnsignedInt64']['output'];
  UserErrorsBusinessContactUserErrors: UserErrorsBusinessContactUserErrors;
  UserErrorsBusinessLocationPaymentInstrumentUserErrors: UserErrorsBusinessLocationPaymentInstrumentUserErrors;
  UserErrorsCustomerAddressUserErrors: UserErrorsCustomerAddressUserErrors;
  UserErrorsCustomerEmailMarketingOptInUserErrors: UserErrorsCustomerEmailMarketingOptInUserErrors;
  UserErrorsCustomerEmailMarketingUserErrors: UserErrorsCustomerEmailMarketingUserErrors;
  UserErrorsCustomerUserErrors: UserErrorsCustomerUserErrors;
  UserErrorsPaymentInstrumentUserErrors: UserErrorsPaymentInstrumentUserErrors;
  UserErrorsPaypalTokenUserErrors: UserErrorsPaypalTokenUserErrors;
  UserErrorsResendGiftCardErrors: UserErrorsResendGiftCardErrors;
  UserErrorsStorefrontCustomerAccessTokenCreateUserErrors: UserErrorsStorefrontCustomerAccessTokenCreateUserErrors;
  WalletPaymentConfig: ResolversUnionTypes<ResolversParentTypes>['WalletPaymentConfig'];
  Weight: Weight;
};

export type AdditionalFeeSaleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AdditionalFeeSale'] = ResolversParentTypes['AdditionalFeeSale'],
> = {
  actionType?: Resolver<
    ResolversTypes['SaleActionType'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineType?: Resolver<ResolversTypes['SaleLineType'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxes?: Resolver<Array<ResolversTypes['SaleTax']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalDiscountAmountAfterTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalDiscountAmountBeforeTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalTaxAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressFormFieldResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AddressFormField'] = ResolversParentTypes['AddressFormField'],
> = {
  mode?: Resolver<
    ResolversTypes['AddressFormFieldMode'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressFormSettingsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AddressFormSettings'] = ResolversParentTypes['AddressFormSettings'],
> = {
  address2?: Resolver<
    ResolversTypes['AddressFormField'],
    ParentType,
    ContextType
  >;
  addressAutocompletion?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  company?: Resolver<
    ResolversTypes['AddressFormField'],
    ParentType,
    ContextType
  >;
  firstName?: Resolver<
    ResolversTypes['AddressFormField'],
    ParentType,
    ContextType
  >;
  phone?: Resolver<ResolversTypes['AddressFormField'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdjustmentSaleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AdjustmentSale'] = ResolversParentTypes['AdjustmentSale'],
> = {
  actionType?: Resolver<
    ResolversTypes['SaleActionType'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineType?: Resolver<ResolversTypes['SaleLineType'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxes?: Resolver<Array<ResolversTypes['SaleTax']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalDiscountAmountAfterTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalDiscountAmountBeforeTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalTaxAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplePayCreditCardAddPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ApplePayCreditCardAddPayload'] = ResolversParentTypes['ApplePayCreditCardAddPayload'],
> = {
  creditCard?: Resolver<
    Maybe<ResolversTypes['CustomerCreditCard']>,
    ParentType,
    ContextType
  >;
  processing?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsPaymentInstrumentUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplePayCreditCardUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ApplePayCreditCardUpdatePayload'] = ResolversParentTypes['ApplePayCreditCardUpdatePayload'],
> = {
  creditCard?: Resolver<
    Maybe<ResolversTypes['CustomerCreditCard']>,
    ParentType,
    ContextType
  >;
  processing?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsPaymentInstrumentUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplePaySessionCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ApplePaySessionCreatePayload'] = ResolversParentTypes['ApplePaySessionCreatePayload'],
> = {
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ready?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['ApplePaySessionUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplePaySessionUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ApplePaySessionUserError'] = ResolversParentTypes['ApplePaySessionUserError'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['ApplePaySessionUserErrorCode']>,
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

export type ApplePayWalletConfigResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ApplePayWalletConfig'] = ResolversParentTypes['ApplePayWalletConfig'],
> = {
  supportedNetworks?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppliedGiftCardResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AppliedGiftCard'] = ResolversParentTypes['AppliedGiftCard'],
> = {
  amountUsed?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastCharacters?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  presentmentAmountUsed?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
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

export type AvailableShippingRatesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AvailableShippingRates'] = ResolversParentTypes['AvailableShippingRates'],
> = {
  ready?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shippingRates?: Resolver<
    Maybe<Array<ResolversTypes['ShippingRate']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BusinessContactUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BusinessContactUpdatePayload'] = ResolversParentTypes['BusinessContactUpdatePayload'],
> = {
  businessContact?: Resolver<
    Maybe<ResolversTypes['CompanyContact']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsBusinessContactUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BusinessCustomerUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BusinessCustomerUserError'] = ResolversParentTypes['BusinessCustomerUserError'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['BusinessCustomerErrorCode']>,
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

export type BusinessLocationCreditCardAddPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BusinessLocationCreditCardAddPayload'] = ResolversParentTypes['BusinessLocationCreditCardAddPayload'],
> = {
  creditCard?: Resolver<
    Maybe<ResolversTypes['CustomerCreditCard']>,
    ParentType,
    ContextType
  >;
  nextActionUrl?: Resolver<
    Maybe<ResolversTypes['URL']>,
    ParentType,
    ContextType
  >;
  processing?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<
      ResolversTypes['UserErrorsBusinessLocationPaymentInstrumentUserErrors']
    >,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BusinessLocationCreditCardUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BusinessLocationCreditCardUpdatePayload'] = ResolversParentTypes['BusinessLocationCreditCardUpdatePayload'],
> = {
  creditCard?: Resolver<
    Maybe<ResolversTypes['CustomerCreditCard']>,
    ParentType,
    ContextType
  >;
  processing?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<
      ResolversTypes['UserErrorsBusinessLocationPaymentInstrumentUserErrors']
    >,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BusinessLocationPaymentInstrumentRemovePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BusinessLocationPaymentInstrumentRemovePayload'] = ResolversParentTypes['BusinessLocationPaymentInstrumentRemovePayload'],
> = {
  deletedPaymentInstrumentId?: Resolver<
    Maybe<ResolversTypes['ID']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<
      ResolversTypes['UserErrorsBusinessLocationPaymentInstrumentUserErrors']
    >,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuyerExperienceConfigurationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BuyerExperienceConfiguration'] = ResolversParentTypes['BuyerExperienceConfiguration'],
> = {
  deposit?: Resolver<
    Maybe<ResolversTypes['DepositConfiguration']>,
    ParentType,
    ContextType
  >;
  payNowOnly?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  paymentTermsTemplate?: Resolver<
    Maybe<ResolversTypes['PaymentTermsTemplate']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CardPaymentDetailsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CardPaymentDetails'] = ResolversParentTypes['CardPaymentDetails'],
> = {
  cardBrand?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last4?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Checkout'] = ResolversParentTypes['Checkout'],
> = {
  appliedGiftCards?: Resolver<
    Array<ResolversTypes['AppliedGiftCard']>,
    ParentType,
    ContextType
  >;
  availableShippingRates?: Resolver<
    Maybe<ResolversTypes['AvailableShippingRates']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currencyCode?: Resolver<
    ResolversTypes['CurrencyCode'],
    ParentType,
    ContextType
  >;
  customAttributes?: Resolver<
    Array<ResolversTypes['Attribute']>,
    ParentType,
    ContextType
  >;
  discountApplications?: Resolver<
    ResolversTypes['DiscountApplicationConnection'],
    ParentType,
    ContextType,
    RequireFields<CheckoutDiscountApplicationsArgs, 'reverse'>
  >;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineItems?: Resolver<
    ResolversTypes['CheckoutLineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<CheckoutLineItemsArgs, 'reverse'>
  >;
  lineItemsSubtotalPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentDue?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  ready?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  requiresShipping?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  shippingAddress?: Resolver<
    Maybe<ResolversTypes['CustomerMailingAddress']>,
    ParentType,
    ContextType
  >;
  shippingDiscountAllocations?: Resolver<
    Array<ResolversTypes['DiscountAllocation']>,
    ParentType,
    ContextType
  >;
  shippingLine?: Resolver<
    Maybe<ResolversTypes['ShippingRate']>,
    ParentType,
    ContextType
  >;
  shopPayConfiguration?: Resolver<
    Maybe<ResolversTypes['ShopPayConfiguration']>,
    ParentType,
    ContextType
  >;
  subtotalPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  taxExempt?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  taxesIncluded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalDuties?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalTax?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  webUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutLineItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CheckoutLineItem'] = ResolversParentTypes['CheckoutLineItem'],
> = {
  customAttributes?: Resolver<
    Array<ResolversTypes['Attribute']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['MoneyV2']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unitPrice?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  variantTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutLineItemConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CheckoutLineItemConnection'] = ResolversParentTypes['CheckoutLineItemConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['CheckoutLineItemEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['CheckoutLineItem']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutLineItemEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CheckoutLineItemEdge'] = ResolversParentTypes['CheckoutLineItemEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['CheckoutLineItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Company'] = ResolversParentTypes['Company'],
> = {
  draftOrders?: Resolver<
    ResolversTypes['DraftOrderConnection'],
    ParentType,
    ContextType,
    RequireFields<CompanyDraftOrdersArgs, 'reverse' | 'sortKey'>
  >;
  externalId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locations?: Resolver<
    ResolversTypes['CompanyLocationConnection'],
    ParentType,
    ContextType,
    RequireFields<CompanyLocationsArgs, 'reverse' | 'sortKey'>
  >;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<CompanyMetafieldArgs, 'key' | 'namespace'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<CompanyMetafieldsArgs, 'identifiers'>
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<
    ResolversTypes['OrderConnection'],
    ParentType,
    ContextType,
    RequireFields<CompanyOrdersArgs, 'reverse' | 'sortKey'>
  >;
  profile?: Resolver<
    Maybe<ResolversTypes['CompanyContact']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyAddress'] = ResolversParentTypes['CompanyAddress'],
> = {
  address1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  companyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<
    ResolversTypes['CountryCode'],
    ParentType,
    ContextType
  >;
  countryCodeV2?: Resolver<
    ResolversTypes['CountryCode'],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  formatted?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<CompanyAddressFormattedArgs, 'withCompanyName' | 'withName'>
  >;
  formattedAddress?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<
      CompanyAddressFormattedAddressArgs,
      'withCompanyName' | 'withName'
    >
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
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  province?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provinceCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  recipient?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zoneCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyContactResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyContact'] = ResolversParentTypes['CompanyContact'],
> = {
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  draftOrders?: Resolver<
    ResolversTypes['DraftOrderConnection'],
    ParentType,
    ContextType,
    RequireFields<CompanyContactDraftOrdersArgs, 'reverse' | 'sortKey'>
  >;
  hasPermissionOnLocations?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      CompanyContactHasPermissionOnLocationsArgs,
      'permissions' | 'resource' | 'scope'
    >
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locations?: Resolver<
    ResolversTypes['CompanyLocationConnection'],
    ParentType,
    ContextType,
    RequireFields<CompanyContactLocationsArgs, 'reverse' | 'sortKey'>
  >;
  orders?: Resolver<
    ResolversTypes['OrderConnection'],
    ParentType,
    ContextType,
    RequireFields<CompanyContactOrdersArgs, 'reverse' | 'sortKey'>
  >;
  status?: Resolver<
    ResolversTypes['CompanyContactStatusType'],
    ParentType,
    ContextType
  >;
  taxExemptionsDetails?: Resolver<
    Array<ResolversTypes['TaxExemptionDetails']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyContactConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyContactConnection'] = ResolversParentTypes['CompanyContactConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['CompanyContactEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['CompanyContact']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyContactEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyContactEdge'] = ResolversParentTypes['CompanyContactEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['CompanyContact'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyContactRoleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyContactRole'] = ResolversParentTypes['CompanyContactRole'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resourcePermission?: Resolver<
    Array<ResolversTypes['PermittedOperation']>,
    ParentType,
    ContextType,
    RequireFields<CompanyContactRoleResourcePermissionArgs, 'resource'>
  >;
  resourcePermissions?: Resolver<
    Array<ResolversTypes['ResourcePermission']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyContactRoleAssignmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyContactRoleAssignment'] = ResolversParentTypes['CompanyContactRoleAssignment'],
> = {
  contact?: Resolver<ResolversTypes['CompanyContact'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  role?: Resolver<
    ResolversTypes['CompanyContactRole'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyContactRoleAssignmentConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyContactRoleAssignmentConnection'] = ResolversParentTypes['CompanyContactRoleAssignmentConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['CompanyContactRoleAssignmentEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['CompanyContactRoleAssignment']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyContactRoleAssignmentEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyContactRoleAssignmentEdge'] = ResolversParentTypes['CompanyContactRoleAssignmentEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['CompanyContactRoleAssignment'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyLocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyLocation'] = ResolversParentTypes['CompanyLocation'],
> = {
  billingAddress?: Resolver<
    Maybe<ResolversTypes['CompanyAddress']>,
    ParentType,
    ContextType
  >;
  buyerExperienceConfiguration?: Resolver<
    Maybe<ResolversTypes['BuyerExperienceConfiguration']>,
    ParentType,
    ContextType
  >;
  contacts?: Resolver<
    ResolversTypes['CompanyContactConnection'],
    ParentType,
    ContextType,
    RequireFields<CompanyLocationContactsArgs, 'reverse' | 'sortKey'>
  >;
  creditCard?: Resolver<
    Maybe<ResolversTypes['CustomerCreditCard']>,
    ParentType,
    ContextType,
    RequireFields<CompanyLocationCreditCardArgs, 'id'>
  >;
  creditCards?: Resolver<
    ResolversTypes['CustomerCreditCardConnection'],
    ParentType,
    ContextType,
    RequireFields<CompanyLocationCreditCardsArgs, 'reverse'>
  >;
  draftOrders?: Resolver<
    ResolversTypes['DraftOrderConnection'],
    ParentType,
    ContextType,
    RequireFields<CompanyLocationDraftOrdersArgs, 'reverse' | 'sortKey'>
  >;
  externalId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<CompanyLocationMetafieldArgs, 'key' | 'namespace'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<CompanyLocationMetafieldsArgs, 'identifiers'>
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<
    ResolversTypes['OrderConnection'],
    ParentType,
    ContextType,
    RequireFields<CompanyLocationOrdersArgs, 'reverse' | 'sortKey'>
  >;
  roleAssignments?: Resolver<
    ResolversTypes['CompanyContactRoleAssignmentConnection'],
    ParentType,
    ContextType,
    RequireFields<CompanyLocationRoleAssignmentsArgs, 'reverse' | 'sortKey'>
  >;
  shippingAddress?: Resolver<
    Maybe<ResolversTypes['CompanyAddress']>,
    ParentType,
    ContextType
  >;
  taxExemptions?: Resolver<
    Array<ResolversTypes['TaxExemption']>,
    ParentType,
    ContextType
  >;
  taxExemptionsDetails?: Resolver<
    Array<ResolversTypes['TaxExemptionDetails']>,
    ParentType,
    ContextType
  >;
  taxIdentifier?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyLocationAssignAddressPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyLocationAssignAddressPayload'] = ResolversParentTypes['CompanyLocationAssignAddressPayload'],
> = {
  addresses?: Resolver<
    Maybe<Array<ResolversTypes['CompanyAddress']>>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['BusinessCustomerUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyLocationConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyLocationConnection'] = ResolversParentTypes['CompanyLocationConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['CompanyLocationEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['CompanyLocation']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyLocationEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CompanyLocationEdge'] = ResolversParentTypes['CompanyLocationEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['CompanyLocation'], ParentType, ContextType>;
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

export type CreditCardAddPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CreditCardAddPayload'] = ResolversParentTypes['CreditCardAddPayload'],
> = {
  creditCard?: Resolver<
    Maybe<ResolversTypes['CustomerCreditCard']>,
    ParentType,
    ContextType
  >;
  nextActionUrl?: Resolver<
    Maybe<ResolversTypes['URL']>,
    ParentType,
    ContextType
  >;
  processing?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsPaymentInstrumentUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreditCardUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CreditCardUpdatePayload'] = ResolversParentTypes['CreditCardUpdatePayload'],
> = {
  creditCard?: Resolver<
    Maybe<ResolversTypes['CustomerCreditCard']>,
    ParentType,
    ContextType
  >;
  processing?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsPaymentInstrumentUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Customer'] = ResolversParentTypes['Customer'],
> = {
  addresses?: Resolver<
    ResolversTypes['CustomerAddressConnection'],
    ParentType,
    ContextType,
    RequireFields<CustomerAddressesArgs, 'reverse' | 'skipDefault'>
  >;
  availableWalletPaymentConfigs?: Resolver<
    Array<ResolversTypes['WalletPaymentConfig']>,
    ParentType,
    ContextType
  >;
  companyContacts?: Resolver<
    ResolversTypes['CompanyContactConnection'],
    ParentType,
    ContextType,
    RequireFields<CustomerCompanyContactsArgs, 'reverse'>
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creditCard?: Resolver<
    Maybe<ResolversTypes['CustomerCreditCard']>,
    ParentType,
    ContextType,
    RequireFields<CustomerCreditCardArgs, 'id'>
  >;
  creditCards?: Resolver<
    ResolversTypes['CustomerCreditCardConnection'],
    ParentType,
    ContextType,
    RequireFields<CustomerCreditCardsArgs, 'reverse'>
  >;
  defaultAddress?: Resolver<
    Maybe<ResolversTypes['CustomerAddress']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  draftOrders?: Resolver<
    ResolversTypes['DraftOrderConnection'],
    ParentType,
    ContextType,
    RequireFields<CustomerDraftOrdersArgs, 'reverse' | 'sortKey'>
  >;
  emailAddress?: Resolver<
    Maybe<ResolversTypes['CustomerEmailAddress']>,
    ParentType,
    ContextType
  >;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  lastIncompleteCheckout?: Resolver<
    Maybe<ResolversTypes['Checkout']>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<CustomerMetafieldArgs, 'key' | 'namespace'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<CustomerMetafieldsArgs, 'identifiers'>
  >;
  orders?: Resolver<
    ResolversTypes['OrderConnection'],
    ParentType,
    ContextType,
    RequireFields<CustomerOrdersArgs, 'reverse' | 'sortKey'>
  >;
  paypalBillingAgreement?: Resolver<
    Maybe<ResolversTypes['PaypalBillingAgreement']>,
    ParentType,
    ContextType
  >;
  phoneNumber?: Resolver<
    Maybe<ResolversTypes['CustomerPhoneNumber']>,
    ParentType,
    ContextType
  >;
  return?: Resolver<
    Maybe<ResolversTypes['Return']>,
    ParentType,
    ContextType,
    RequireFields<CustomerReturnArgs, 'id'>
  >;
  storeCreditAccounts?: Resolver<
    ResolversTypes['StoreCreditAccountConnection'],
    ParentType,
    ContextType,
    Partial<CustomerStoreCreditAccountsArgs>
  >;
  subscriptionContract?: Resolver<
    Maybe<ResolversTypes['SubscriptionContract']>,
    ParentType,
    ContextType,
    RequireFields<CustomerSubscriptionContractArgs, 'id'>
  >;
  subscriptionContracts?: Resolver<
    ResolversTypes['SubscriptionContractConnection'],
    ParentType,
    ContextType,
    RequireFields<CustomerSubscriptionContractsArgs, 'reverse' | 'sortKey'>
  >;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  taxExemptionsDetails?: Resolver<
    Array<ResolversTypes['TaxExemptionDetails']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerAddress'] = ResolversParentTypes['CustomerAddress'],
> = {
  address1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  formatted?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<CustomerAddressFormattedArgs, 'withCompany' | 'withName'>
  >;
  formattedArea?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  province?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  territoryCode?: Resolver<
    Maybe<ResolversTypes['CountryCode']>,
    ParentType,
    ContextType
  >;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zoneCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAddressConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerAddressConnection'] = ResolversParentTypes['CustomerAddressConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['CustomerAddressEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['CustomerAddress']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAddressCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerAddressCreatePayload'] = ResolversParentTypes['CustomerAddressCreatePayload'],
> = {
  customerAddress?: Resolver<
    Maybe<ResolversTypes['CustomerAddress']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsCustomerAddressUserErrors']>,
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
  deletedAddressId?: Resolver<
    Maybe<ResolversTypes['ID']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsCustomerAddressUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAddressEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerAddressEdge'] = ResolversParentTypes['CustomerAddressEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['CustomerAddress'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerAddressUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerAddressUpdatePayload'] = ResolversParentTypes['CustomerAddressUpdatePayload'],
> = {
  customerAddress?: Resolver<
    Maybe<ResolversTypes['CustomerAddress']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsCustomerAddressUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerCreditCardResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerCreditCard'] = ResolversParentTypes['CustomerCreditCard'],
> = {
  billingAddress?: Resolver<
    Maybe<ResolversTypes['PaymentInstrumentBillingAddress']>,
    ParentType,
    ContextType
  >;
  brand?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  default?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  expiresSoon?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  expiryMonth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  expiryYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  firstDigits?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastDigits?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maskedNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openDraftOrders?: Resolver<
    ResolversTypes['DraftOrderConnection'],
    ParentType,
    ContextType,
    RequireFields<CustomerCreditCardOpenDraftOrdersArgs, 'reverse'>
  >;
  pendingOrders?: Resolver<
    ResolversTypes['OrderConnection'],
    ParentType,
    ContextType,
    RequireFields<CustomerCreditCardPendingOrdersArgs, 'reverse'>
  >;
  permissionToShowAtCheckout?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  subscriptionContracts?: Resolver<
    ResolversTypes['SubscriptionContractConnection'],
    ParentType,
    ContextType,
    RequireFields<
      CustomerCreditCardSubscriptionContractsArgs,
      'reverse' | 'sortKey'
    >
  >;
  virtualLastDigits?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  walletType?: Resolver<
    Maybe<ResolversTypes['PaymentInstrumentWalletType']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerCreditCardConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerCreditCardConnection'] = ResolversParentTypes['CustomerCreditCardConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['CustomerCreditCardEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['CustomerCreditCard']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerCreditCardEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerCreditCardEdge'] = ResolversParentTypes['CustomerCreditCardEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['CustomerCreditCard'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerEmailAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerEmailAddress'] = ResolversParentTypes['CustomerEmailAddress'],
> = {
  emailAddress?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  marketingState?: Resolver<
    ResolversTypes['EmailMarketingState'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerEmailMarketingOptInPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerEmailMarketingOptInPayload'] = ResolversParentTypes['CustomerEmailMarketingOptInPayload'],
> = {
  customerEmailAddress?: Resolver<
    Maybe<ResolversTypes['CustomerEmailAddress']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsCustomerEmailMarketingOptInUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerEmailMarketingSubscribePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerEmailMarketingSubscribePayload'] = ResolversParentTypes['CustomerEmailMarketingSubscribePayload'],
> = {
  emailAddress?: Resolver<
    Maybe<ResolversTypes['CustomerEmailAddress']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsCustomerEmailMarketingUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerEmailMarketingUnsubscribePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerEmailMarketingUnsubscribePayload'] = ResolversParentTypes['CustomerEmailMarketingUnsubscribePayload'],
> = {
  emailAddress?: Resolver<
    Maybe<ResolversTypes['CustomerEmailAddress']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsCustomerEmailMarketingUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerMailingAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerMailingAddress'] = ResolversParentTypes['CustomerMailingAddress'],
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
  defaultAddress?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  formatted?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<
      CustomerMailingAddressFormattedArgs,
      'withCompany' | 'withName'
    >
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
  phoneNumber?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  province?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provinceCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  territoryCode?: Resolver<
    Maybe<ResolversTypes['CountryCode']>,
    ParentType,
    ContextType
  >;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zoneCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerPhoneNumberResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CustomerPhoneNumber'] = ResolversParentTypes['CustomerPhoneNumber'],
> = {
  marketingState?: Resolver<
    ResolversTypes['SmsMarketingState'],
    ParentType,
    ContextType
  >;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsCustomerUserErrors']>,
    ParentType,
    ContextType
  >;
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

export type DepositConfigurationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DepositConfiguration'] = ResolversParentTypes['DepositConfiguration'],
> = {
  __resolveType: TypeResolveFn<'DepositPercentage', ParentType, ContextType>;
};

export type DepositPercentageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DepositPercentage'] = ResolversParentTypes['DepositPercentage'],
> = {
  percentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
    | 'ApplePaySessionUserError'
    | 'BusinessCustomerUserError'
    | 'MetafieldsDeleteUserError'
    | 'MetafieldsSetUserError'
    | 'ReturnUserError'
    | 'SubscriptionBillingCycleSkipUserError'
    | 'SubscriptionBillingCycleUnskipUserError'
    | 'SubscriptionContractStatusUpdateUserError'
    | 'SubscriptionContractUserError'
    | 'UserErrorsBusinessContactUserErrors'
    | 'UserErrorsBusinessLocationPaymentInstrumentUserErrors'
    | 'UserErrorsCustomerAddressUserErrors'
    | 'UserErrorsCustomerEmailMarketingOptInUserErrors'
    | 'UserErrorsCustomerEmailMarketingUserErrors'
    | 'UserErrorsCustomerUserErrors'
    | 'UserErrorsPaymentInstrumentUserErrors'
    | 'UserErrorsPaypalTokenUserErrors'
    | 'UserErrorsResendGiftCardErrors'
    | 'UserErrorsStorefrontCustomerAccessTokenCreateUserErrors',
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  redirectHost?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftOrderResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DraftOrder'] = ResolversParentTypes['DraftOrder'],
> = {
  billingAddress?: Resolver<
    Maybe<ResolversTypes['CustomerAddress']>,
    ParentType,
    ContextType
  >;
  contactExists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currencyCode?: Resolver<
    ResolversTypes['CurrencyCode'],
    ParentType,
    ContextType
  >;
  customer?: Resolver<
    Maybe<ResolversTypes['Customer']>,
    ParentType,
    ContextType
  >;
  discountInformation?: Resolver<
    ResolversTypes['DraftOrderDiscountInformation'],
    ParentType,
    ContextType
  >;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inReview?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  invoiceUrl?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  legacyAggregatedMerchandiseTermsAsFees?: Resolver<
    Array<ResolversTypes['LegacyAggregatedMerchandiseTermsAsFees']>,
    ParentType,
    ContextType
  >;
  legacyRepresentProductsAsFees?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  legacySubtotalWithoutFees?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  lineItems?: Resolver<
    ResolversTypes['DraftOrderLineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<DraftOrderLineItemsArgs, 'reverse'>
  >;
  lineItemsSummary?: Resolver<
    Maybe<ResolversTypes['DraftOrderLineItemsSummary']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  purchasingEntity?: Resolver<
    Maybe<ResolversTypes['PurchasingEntity']>,
    ParentType,
    ContextType
  >;
  requiresShipping?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  shippingAddress?: Resolver<
    Maybe<ResolversTypes['CustomerAddress']>,
    ParentType,
    ContextType
  >;
  status?: Resolver<
    ResolversTypes['DraftOrderStatus'],
    ParentType,
    ContextType
  >;
  subtotalPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  subtotalPriceBeforeDiscounts?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  taxExempt?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  taxesIncluded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalLineItemsPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalShippingPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalTax?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalWeight?: Resolver<
    ResolversTypes['UnsignedInt64'],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftOrderAppliedDiscountResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DraftOrderAppliedDiscount'] = ResolversParentTypes['DraftOrderAppliedDiscount'],
> = {
  discountValue?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftOrderConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DraftOrderConnection'] = ResolversParentTypes['DraftOrderConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['DraftOrderEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['DraftOrder']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftOrderDiscountInformationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DraftOrderDiscountInformation'] = ResolversParentTypes['DraftOrderDiscountInformation'],
> = {
  appliedDiscount?: Resolver<
    Maybe<ResolversTypes['DraftOrderAppliedDiscount']>,
    ParentType,
    ContextType
  >;
  totalDiscounts?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftOrderEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DraftOrderEdge'] = ResolversParentTypes['DraftOrderEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['DraftOrder'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftOrderLineItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DraftOrderLineItem'] = ResolversParentTypes['DraftOrderLineItem'],
> = {
  discountInformation?: Resolver<
    ResolversTypes['DraftOrderLineItemDiscountInformation'],
    ParentType,
    ContextType
  >;
  discountedTotal?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  discountedUnitPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  legacyFee?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  legacyFeeDescription?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  legacyFeeTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalTotal?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  originalUnitPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  requiresShipping?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  taxable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  variantTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  vendor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Weight']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftOrderLineItemConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DraftOrderLineItemConnection'] = ResolversParentTypes['DraftOrderLineItemConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['DraftOrderLineItemEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['DraftOrderLineItem']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftOrderLineItemDiscountInformationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DraftOrderLineItemDiscountInformation'] = ResolversParentTypes['DraftOrderLineItemDiscountInformation'],
> = {
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalDiscount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftOrderLineItemEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DraftOrderLineItemEdge'] = ResolversParentTypes['DraftOrderLineItemEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['DraftOrderLineItem'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftOrderLineItemsSummaryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DraftOrderLineItemsSummary'] = ResolversParentTypes['DraftOrderLineItemsSummary'],
> = {
  lineItemCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalQuantityOfLegacyFeeLineItems?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >;
  totalQuantityOfLineItems?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DutySaleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DutySale'] = ResolversParentTypes['DutySale'],
> = {
  actionType?: Resolver<
    ResolversTypes['SaleActionType'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineType?: Resolver<ResolversTypes['SaleLineType'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxes?: Resolver<Array<ResolversTypes['SaleTax']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalDiscountAmountAfterTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalDiscountAmountBeforeTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalTaxAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExtensionApiTokensResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ExtensionApiTokens'] = ResolversParentTypes['ExtensionApiTokens'],
> = {
  storefrontApi?: Resolver<
    Maybe<ResolversTypes['ExtensionStorefrontApiToken']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExtensionStorefrontApiTokenResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ExtensionStorefrontApiToken'] = ResolversParentTypes['ExtensionStorefrontApiToken'],
> = {
  expiresAt?: Resolver<
    ResolversTypes['ISO8601DateTime'],
    ParentType,
    ContextType
  >;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeeSaleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['FeeSale'] = ResolversParentTypes['FeeSale'],
> = {
  actionType?: Resolver<
    ResolversTypes['SaleActionType'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineType?: Resolver<ResolversTypes['SaleLineType'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxes?: Resolver<Array<ResolversTypes['SaleTax']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalDiscountAmountAfterTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalDiscountAmountBeforeTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalTaxAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Fulfillment'] = ResolversParentTypes['Fulfillment'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  estimatedDeliveryAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  events?: Resolver<
    ResolversTypes['FulfillmentEventConnection'],
    ParentType,
    ContextType,
    RequireFields<FulfillmentEventsArgs, 'reverse' | 'sortKey'>
  >;
  fulfillmentLineItems?: Resolver<
    ResolversTypes['FulfillmentLineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<FulfillmentFulfillmentLineItemsArgs, 'reverse'>
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isPickedUp?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  latestShipmentStatus?: Resolver<
    Maybe<ResolversTypes['FulfillmentEventStatus']>,
    ParentType,
    ContextType
  >;
  pickupAddress?: Resolver<
    Maybe<ResolversTypes['PickupAddress']>,
    ParentType,
    ContextType
  >;
  requiresShipping?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  status?: Resolver<
    Maybe<ResolversTypes['FulfillmentStatus']>,
    ParentType,
    ContextType
  >;
  trackingInformation?: Resolver<
    Array<ResolversTypes['TrackingInformation']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['FulfillmentConnection'] = ResolversParentTypes['FulfillmentConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['FulfillmentEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['Fulfillment']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['FulfillmentEdge'] = ResolversParentTypes['FulfillmentEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Fulfillment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentEventResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['FulfillmentEvent'] = ResolversParentTypes['FulfillmentEvent'],
> = {
  happenedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<
    ResolversTypes['FulfillmentEventStatus'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentEventConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['FulfillmentEventConnection'] = ResolversParentTypes['FulfillmentEventConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['FulfillmentEventEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['FulfillmentEvent']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentEventEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['FulfillmentEventEdge'] = ResolversParentTypes['FulfillmentEventEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['FulfillmentEvent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentLineItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['FulfillmentLineItem'] = ResolversParentTypes['FulfillmentLineItem'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineItem?: Resolver<ResolversTypes['LineItem'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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

export type GiftCardDetailsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['GiftCardDetails'] = ResolversParentTypes['GiftCardDetails'],
> = {
  balance?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  last4?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardSaleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['GiftCardSale'] = ResolversParentTypes['GiftCardSale'],
> = {
  actionType?: Resolver<
    ResolversTypes['SaleActionType'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineItem?: Resolver<ResolversTypes['LineItem'], ParentType, ContextType>;
  lineType?: Resolver<ResolversTypes['SaleLineType'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxes?: Resolver<Array<ResolversTypes['SaleTax']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalDiscountAmountAfterTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalDiscountAmountBeforeTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalTaxAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GooglePayCreditCardAddPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['GooglePayCreditCardAddPayload'] = ResolversParentTypes['GooglePayCreditCardAddPayload'],
> = {
  creditCard?: Resolver<
    Maybe<ResolversTypes['CustomerCreditCard']>,
    ParentType,
    ContextType
  >;
  processing?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsPaymentInstrumentUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GooglePayCreditCardUpdatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['GooglePayCreditCardUpdatePayload'] = ResolversParentTypes['GooglePayCreditCardUpdatePayload'],
> = {
  creditCard?: Resolver<
    Maybe<ResolversTypes['CustomerCreditCard']>,
    ParentType,
    ContextType
  >;
  processing?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsPaymentInstrumentUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GooglePayWalletConfigResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['GooglePayWalletConfig'] = ResolversParentTypes['GooglePayWalletConfig'],
> = {
  allowedAuthMethods?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  allowedCardNetworks?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  authJwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  environment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gateway?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gatewayMerchantId?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  merchantId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  merchantName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  merchantOrigin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface HtmlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['HTML'], any> {
  name: 'HTML';
}

export type HasCompareDigestResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['HasCompareDigest'] = ResolversParentTypes['HasCompareDigest'],
> = {
  __resolveType: TypeResolveFn<'Metafield', ParentType, ContextType>;
  compareDigest?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type HasMetafieldsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['HasMetafields'] = ResolversParentTypes['HasMetafields'],
> = {
  __resolveType: TypeResolveFn<
    'Company' | 'CompanyLocation' | 'Customer' | 'Order' | 'Shop',
    ParentType,
    ContextType
  >;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<HasMetafieldsMetafieldArgs, 'key' | 'namespace'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<HasMetafieldsMetafieldsArgs, 'identifiers'>
  >;
};

export type HasStoreCreditAccountsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['HasStoreCreditAccounts'] = ResolversParentTypes['HasStoreCreditAccounts'],
> = {
  __resolveType: TypeResolveFn<'Customer', ParentType, ContextType>;
  storeCreditAccounts?: Resolver<
    ResolversTypes['StoreCreditAccountConnection'],
    ParentType,
    ContextType,
    Partial<HasStoreCreditAccountsStoreCreditAccountsArgs>
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

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LegacyAggregatedMerchandiseTermsAsFeesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LegacyAggregatedMerchandiseTermsAsFees'] = ResolversParentTypes['LegacyAggregatedMerchandiseTermsAsFees'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LineItem'] = ResolversParentTypes['LineItem'],
> = {
  currentTotalPrice?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
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
  discountInformation?: Resolver<
    Array<ResolversTypes['LineItemDiscountInformation']>,
    ParentType,
    ContextType
  >;
  giftCard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  group?: Resolver<
    Maybe<ResolversTypes['LineItemGroup']>,
    ParentType,
    ContextType
  >;
  groupTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  legacyFee?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  legacyFeeDescription?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  legacyFeeTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  presentmentTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  price?: Resolver<Maybe<ResolversTypes['MoneyV2']>, ParentType, ContextType>;
  productId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  productType?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  refundableQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  requiresShipping?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  sellingPlan?: Resolver<
    Maybe<ResolversTypes['LineItemSellingPlan']>,
    ParentType,
    ContextType
  >;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  soldDiscountInformation?: Resolver<
    Array<ResolversTypes['LineItemDiscountInformation']>,
    ParentType,
    ContextType
  >;
  soldDiscountedTotalPrice?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  soldQuantity?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  soldTotalPrice?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  supportedReturnReasons?: Resolver<
    Array<ResolversTypes['ReturnSupportedReason']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalDiscount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalPrice?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalPriceBeforeDiscounts?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalPriceWithDiscounts?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  unitPrice?: Resolver<
    Maybe<ResolversTypes['UnitPrice']>,
    ParentType,
    ContextType
  >;
  variantId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  variantOptions?: Resolver<
    Maybe<Array<ResolversTypes['LineItemVariantOption']>>,
    ParentType,
    ContextType
  >;
  variantTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  vendor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineItemConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LineItemConnection'] = ResolversParentTypes['LineItemConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['LineItemEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<Array<ResolversTypes['LineItem']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineItemContainerResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LineItemContainer'] = ResolversParentTypes['LineItemContainer'],
> = {
  __resolveType: TypeResolveFn<
    | 'RemainingLineItemContainer'
    | 'UnfulfilledDigitalLineItemContainer'
    | 'UnfulfilledGiftCardLineItemContainer'
    | 'UnfulfilledLineItemContainer'
    | 'UnfulfilledPhysicalLineItemContainer',
    ParentType,
    ContextType
  >;
};

export type LineItemContainerLineItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LineItemContainerLineItem'] = ResolversParentTypes['LineItemContainerLineItem'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineItem?: Resolver<ResolversTypes['LineItem'], ParentType, ContextType>;
  remainingQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineItemContainerLineItemConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LineItemContainerLineItemConnection'] = ResolversParentTypes['LineItemContainerLineItemConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['LineItemContainerLineItemEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['LineItemContainerLineItem']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineItemContainerLineItemEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LineItemContainerLineItemEdge'] = ResolversParentTypes['LineItemContainerLineItemEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['LineItemContainerLineItem'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineItemDiscountInformationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LineItemDiscountInformation'] = ResolversParentTypes['LineItemDiscountInformation'],
> = {
  discountValue?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineItemEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LineItemEdge'] = ResolversParentTypes['LineItemEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['LineItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineItemGroupResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LineItemGroup'] = ResolversParentTypes['LineItemGroup'],
> = {
  currentTotalPrice?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  discountInformation?: Resolver<
    Maybe<Array<ResolversTypes['LineItemDiscountInformation']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalPriceBeforeDiscounts?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineItemSellingPlanResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LineItemSellingPlan'] = ResolversParentTypes['LineItemSellingPlan'],
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sellingPlanId?: Resolver<
    Maybe<ResolversTypes['ID']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineItemVariantOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LineItemVariantOption'] = ResolversParentTypes['LineItemVariantOption'],
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  webPresence?: Resolver<
    Maybe<ResolversTypes['MarketWebPresence']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarketWebPresenceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MarketWebPresence'] = ResolversParentTypes['MarketWebPresence'],
> = {
  domain?: Resolver<Maybe<ResolversTypes['Domain']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rootUrls?: Resolver<
    Array<ResolversTypes['MarketWebPresenceRootUrl']>,
    ParentType,
    ContextType
  >;
  subfolderSuffix?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarketWebPresenceRootUrlResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MarketWebPresenceRootUrl'] = ResolversParentTypes['MarketWebPresenceRootUrl'],
> = {
  locale?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetafieldResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Metafield'] = ResolversParentTypes['Metafield'],
> = {
  compareDigest?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jsonValue?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetafieldIdentifierResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetafieldIdentifier'] = ResolversParentTypes['MetafieldIdentifier'],
> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetafieldsDeletePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetafieldsDeletePayload'] = ResolversParentTypes['MetafieldsDeletePayload'],
> = {
  deletedMetafields?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['MetafieldIdentifier']>>>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['MetafieldsDeleteUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetafieldsDeleteUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetafieldsDeleteUserError'] = ResolversParentTypes['MetafieldsDeleteUserError'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['MetafieldsDeleteUserErrorCode']>,
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

export type MetafieldsSetPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MetafieldsSetPayload'] = ResolversParentTypes['MetafieldsSetPayload'],
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

export type MoneyBagResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MoneyBag'] = ResolversParentTypes['MoneyBag'],
> = {
  presentmentMoney?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  shopMoney?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
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
  applePayCreditCardAdd?: Resolver<
    Maybe<ResolversTypes['ApplePayCreditCardAddPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationApplePayCreditCardAddArgs,
      'applePayTokenizedCard' | 'billingAddress'
    >
  >;
  applePayCreditCardUpdate?: Resolver<
    Maybe<ResolversTypes['ApplePayCreditCardUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationApplePayCreditCardUpdateArgs,
      'applePayTokenizedCard' | 'billingAddress' | 'paymentMethodId'
    >
  >;
  applePaySessionCreate?: Resolver<
    Maybe<ResolversTypes['ApplePaySessionCreatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationApplePaySessionCreateArgs,
      'resourceId' | 'validationUrl'
    >
  >;
  businessContactUpdate?: Resolver<
    Maybe<ResolversTypes['BusinessContactUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationBusinessContactUpdateArgs, 'input'>
  >;
  businessLocationCreditCardAdd?: Resolver<
    Maybe<ResolversTypes['BusinessLocationCreditCardAddPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationBusinessLocationCreditCardAddArgs,
      'billingAddress' | 'companyLocationId' | 'sessionId'
    >
  >;
  businessLocationCreditCardUpdate?: Resolver<
    Maybe<ResolversTypes['BusinessLocationCreditCardUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationBusinessLocationCreditCardUpdateArgs,
      'billingAddress' | 'companyLocationId' | 'paymentMethodId' | 'sessionId'
    >
  >;
  businessLocationPaymentInstrumentRemove?: Resolver<
    Maybe<ResolversTypes['BusinessLocationPaymentInstrumentRemovePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationBusinessLocationPaymentInstrumentRemoveArgs,
      'companyLocationId' | 'paymentInstrumentId'
    >
  >;
  companyLocationAssignAddress?: Resolver<
    Maybe<ResolversTypes['CompanyLocationAssignAddressPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCompanyLocationAssignAddressArgs,
      'address' | 'addressTypes' | 'locationId'
    >
  >;
  creditCardAdd?: Resolver<
    Maybe<ResolversTypes['CreditCardAddPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCreditCardAddArgs,
      'billingAddress' | 'default' | 'sessionId'
    >
  >;
  creditCardUpdate?: Resolver<
    Maybe<ResolversTypes['CreditCardUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCreditCardUpdateArgs,
      'billingAddress' | 'paymentMethodId' | 'sessionId'
    >
  >;
  customerAddressCreate?: Resolver<
    Maybe<ResolversTypes['CustomerAddressCreatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCustomerAddressCreateArgs,
      'address' | 'defaultAddress'
    >
  >;
  customerAddressDelete?: Resolver<
    Maybe<ResolversTypes['CustomerAddressDeletePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCustomerAddressDeleteArgs, 'addressId'>
  >;
  customerAddressUpdate?: Resolver<
    Maybe<ResolversTypes['CustomerAddressUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCustomerAddressUpdateArgs,
      'addressId' | 'defaultAddress'
    >
  >;
  customerEmailMarketingOptIn?: Resolver<
    Maybe<ResolversTypes['CustomerEmailMarketingOptInPayload']>,
    ParentType,
    ContextType
  >;
  customerEmailMarketingSubscribe?: Resolver<
    Maybe<ResolversTypes['CustomerEmailMarketingSubscribePayload']>,
    ParentType,
    ContextType
  >;
  customerEmailMarketingUnsubscribe?: Resolver<
    Maybe<ResolversTypes['CustomerEmailMarketingUnsubscribePayload']>,
    ParentType,
    ContextType
  >;
  customerUpdate?: Resolver<
    Maybe<ResolversTypes['CustomerUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationCustomerUpdateArgs, 'input'>
  >;
  googlePayCreditCardAdd?: Resolver<
    Maybe<ResolversTypes['GooglePayCreditCardAddPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationGooglePayCreditCardAddArgs,
      'billingAddress' | 'googlePayTokenizedCard'
    >
  >;
  googlePayCreditCardUpdate?: Resolver<
    Maybe<ResolversTypes['GooglePayCreditCardUpdatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationGooglePayCreditCardUpdateArgs,
      'billingAddress' | 'googlePayTokenizedCard' | 'paymentMethodId'
    >
  >;
  metafieldsDelete?: Resolver<
    Maybe<ResolversTypes['MetafieldsDeletePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationMetafieldsDeleteArgs, 'metafields'>
  >;
  metafieldsSet?: Resolver<
    Maybe<ResolversTypes['MetafieldsSetPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationMetafieldsSetArgs, 'metafields'>
  >;
  orderRequestReturn?: Resolver<
    Maybe<ResolversTypes['OrderRequestReturnPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationOrderRequestReturnArgs,
      'orderId' | 'requestedLineItems'
    >
  >;
  paymentInstrumentRemove?: Resolver<
    Maybe<ResolversTypes['PaymentInstrumentRemovePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationPaymentInstrumentRemoveArgs, 'paymentInstrumentId'>
  >;
  paymentInstrumentUpdateDefault?: Resolver<
    Maybe<ResolversTypes['PaymentInstrumentUpdateDefaultPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationPaymentInstrumentUpdateDefaultArgs,
      'default' | 'paymentInstrumentId'
    >
  >;
  paypalAccountEnable?: Resolver<
    Maybe<ResolversTypes['PaypalAccountEnablePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationPaypalAccountEnableArgs,
      'paypalPayerId' | 'paypalToken'
    >
  >;
  paypalTokenCreate?: Resolver<
    Maybe<ResolversTypes['PaypalTokenCreatePayload']>,
    ParentType,
    ContextType
  >;
  resendGiftCard?: Resolver<
    Maybe<ResolversTypes['ResendGiftCardPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationResendGiftCardArgs, 'orderId'>
  >;
  shopPayCreditCardGetUpdateUrl?: Resolver<
    Maybe<ResolversTypes['ShopPayCreditCardGetUpdateUrlPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationShopPayCreditCardGetUpdateUrlArgs, 'paymentMethodId'>
  >;
  storefrontCustomerAccessTokenCreate?: Resolver<
    Maybe<ResolversTypes['StorefrontCustomerAccessTokenCreatePayload']>,
    ParentType,
    ContextType
  >;
  subscriptionBillingCycleSkip?: Resolver<
    Maybe<ResolversTypes['SubscriptionBillingCycleSkipPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationSubscriptionBillingCycleSkipArgs, 'billingCycleInput'>
  >;
  subscriptionBillingCycleUnskip?: Resolver<
    Maybe<ResolversTypes['SubscriptionBillingCycleUnskipPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSubscriptionBillingCycleUnskipArgs,
      'billingCycleInput'
    >
  >;
  subscriptionContractActivate?: Resolver<
    Maybe<ResolversTypes['SubscriptionContractActivatePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSubscriptionContractActivateArgs,
      'subscriptionContractId'
    >
  >;
  subscriptionContractCancel?: Resolver<
    Maybe<ResolversTypes['SubscriptionContractCancelPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSubscriptionContractCancelArgs,
      'subscriptionContractId'
    >
  >;
  subscriptionContractChangePaymentInstrument?: Resolver<
    Maybe<ResolversTypes['SubscriptionContractChangePaymentInstrumentPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSubscriptionContractChangePaymentInstrumentArgs,
      'paymentInstrumentId' | 'subscriptionContractId'
    >
  >;
  subscriptionContractFetchDeliveryOptions?: Resolver<
    Maybe<ResolversTypes['SubscriptionContractFetchDeliveryOptionsPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSubscriptionContractFetchDeliveryOptionsArgs,
      'subscriptionContractId'
    >
  >;
  subscriptionContractPause?: Resolver<
    Maybe<ResolversTypes['SubscriptionContractPausePayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSubscriptionContractPauseArgs,
      'subscriptionContractId'
    >
  >;
  subscriptionContractSelectDeliveryMethod?: Resolver<
    Maybe<ResolversTypes['SubscriptionContractSelectDeliveryMethodPayload']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSubscriptionContractSelectDeliveryMethodArgs,
      | 'deliveryMethodInput'
      | 'subscriptionContractId'
      | 'subscriptionDeliveryOptionsResultToken'
    >
  >;
};

export type NodeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Node'] = ResolversParentTypes['Node'],
> = {
  __resolveType: TypeResolveFn<
    | 'AdditionalFeeSale'
    | 'AdjustmentSale'
    | 'AppliedGiftCard'
    | 'Checkout'
    | 'CheckoutLineItem'
    | 'Company'
    | 'CompanyAddress'
    | 'CompanyContact'
    | 'CompanyContactRole'
    | 'CompanyContactRoleAssignment'
    | 'CompanyLocation'
    | 'Customer'
    | 'CustomerAddress'
    | 'CustomerCreditCard'
    | 'CustomerMailingAddress'
    | 'Domain'
    | 'DraftOrder'
    | 'DraftOrderLineItem'
    | 'DutySale'
    | 'FeeSale'
    | 'Fulfillment'
    | 'FulfillmentEvent'
    | 'FulfillmentLineItem'
    | 'GiftCardSale'
    | 'LegacyAggregatedMerchandiseTermsAsFees'
    | 'LineItem'
    | 'LineItemContainerLineItem'
    | 'LineItemGroup'
    | 'Market'
    | 'MarketWebPresence'
    | 'Metafield'
    | 'Order'
    | 'OrderAgreement'
    | 'OrderEditAgreement'
    | 'OrderEditSummaryChange'
    | 'OrderTransaction'
    | 'PaymentIconImage'
    | 'PaymentSchedule'
    | 'PaymentTerms'
    | 'PaymentTermsTemplate'
    | 'PaypalBillingAgreement'
    | 'ProductSale'
    | 'PublicOrder'
    | 'Refund'
    | 'RefundAgreement'
    | 'RemainingLineItemContainerLineItem'
    | 'Return'
    | 'ReturnAgreement'
    | 'ReturnLineItem'
    | 'ReverseDelivery'
    | 'SaleTax'
    | 'ShippingLineSale'
    | 'Shop'
    | 'ShopPolicy'
    | 'StoreCreditAccount'
    | 'StoreCreditAccountCreditTransaction'
    | 'StoreCreditAccountDebitRevertTransaction'
    | 'StoreCreditAccountDebitTransaction'
    | 'SubscriptionContract'
    | 'TaxLine'
    | 'TimelineEvent'
    | 'TipSale'
    | 'UiExtensionMetafield'
    | 'UnknownSale',
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type OrderResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Order'] = ResolversParentTypes['Order'],
> = {
  agreements?: Resolver<
    ResolversTypes['SalesAgreementConnection'],
    ParentType,
    ContextType,
    RequireFields<OrderAgreementsArgs, 'reverse'>
  >;
  billingAddress?: Resolver<
    Maybe<ResolversTypes['CustomerAddress']>,
    ParentType,
    ContextType
  >;
  cancelReason?: Resolver<
    Maybe<ResolversTypes['OrderCancelReason']>,
    ParentType,
    ContextType
  >;
  cancelledAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  checkoutToken?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  confirmationNumber?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currencyCode?: Resolver<
    ResolversTypes['CurrencyCode'],
    ParentType,
    ContextType
  >;
  customAttributes?: Resolver<
    Array<ResolversTypes['Attribute']>,
    ParentType,
    ContextType
  >;
  customer?: Resolver<
    Maybe<ResolversTypes['Customer']>,
    ParentType,
    ContextType
  >;
  customerLocale?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  discountApplications?: Resolver<
    ResolversTypes['DiscountApplicationConnection'],
    ParentType,
    ContextType,
    RequireFields<OrderDiscountApplicationsArgs, 'reverse'>
  >;
  discountInformation?: Resolver<
    ResolversTypes['OrderDiscountInformation'],
    ParentType,
    ContextType
  >;
  draftOrder?: Resolver<
    Maybe<ResolversTypes['DraftOrder']>,
    ParentType,
    ContextType
  >;
  draftOrderName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  editSummary?: Resolver<
    Maybe<ResolversTypes['OrderEditSummary']>,
    ParentType,
    ContextType
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
  fulfillments?: Resolver<
    ResolversTypes['FulfillmentConnection'],
    ParentType,
    ContextType,
    RequireFields<OrderFulfillmentsArgs, 'reverse' | 'sortKey'>
  >;
  hasEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasMultipleFulfillments?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latestFulfillmentDeliveryDate?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  legacyAggregatedMerchandiseTermsAsFees?: Resolver<
    Array<ResolversTypes['LegacyAggregatedMerchandiseTermsAsFees']>,
    ParentType,
    ContextType
  >;
  legacyRepresentProductsAsFees?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  legacySubtotalWithoutFees?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  lineItemContainers?: Resolver<
    Array<ResolversTypes['LineItemContainer']>,
    ParentType,
    ContextType
  >;
  lineItems?: Resolver<
    ResolversTypes['LineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<OrderLineItemsArgs, 'reverse'>
  >;
  lineItemsSummary?: Resolver<
    Maybe<ResolversTypes['OrderLineItemsSummary']>,
    ParentType,
    ContextType
  >;
  locationName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<OrderMetafieldArgs, 'key' | 'namespace'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<OrderMetafieldsArgs, 'identifiers'>
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  orderReceiptMetafields?: Resolver<
    Array<ResolversTypes['Metafield']>,
    ParentType,
    ContextType
  >;
  paymentInformation?: Resolver<
    Maybe<ResolversTypes['OrderPaymentInformation']>,
    ParentType,
    ContextType
  >;
  paymentTermsTemplate?: Resolver<
    Maybe<ResolversTypes['PaymentTermsTemplate']>,
    ParentType,
    ContextType
  >;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pickupInformation?: Resolver<
    Maybe<ResolversTypes['OrderPickupInformation']>,
    ParentType,
    ContextType
  >;
  poNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  processedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  purchasingEntity?: Resolver<
    Maybe<ResolversTypes['PurchasingEntity']>,
    ParentType,
    ContextType
  >;
  refunds?: Resolver<Array<ResolversTypes['Refund']>, ParentType, ContextType>;
  reorderPath?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  requiresShipping?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  return?: Resolver<
    Maybe<ResolversTypes['Return']>,
    ParentType,
    ContextType,
    RequireFields<OrderReturnArgs, 'id'>
  >;
  returns?: Resolver<
    ResolversTypes['ReturnConnection'],
    ParentType,
    ContextType,
    RequireFields<OrderReturnsArgs, 'reverse' | 'sortKey'>
  >;
  shippingAddress?: Resolver<
    Maybe<ResolversTypes['CustomerAddress']>,
    ParentType,
    ContextType
  >;
  shippingDiscountAllocations?: Resolver<
    Array<ResolversTypes['DiscountAllocation']>,
    ParentType,
    ContextType
  >;
  shippingLine?: Resolver<
    Maybe<ResolversTypes['ShippingLine']>,
    ParentType,
    ContextType
  >;
  shippingLineGroups?: Resolver<
    Array<ResolversTypes['OrderShippingLineGroup']>,
    ParentType,
    ContextType
  >;
  shippingTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  shopAppLinksAndResources?: Resolver<
    Maybe<ResolversTypes['ShopAppLinksAndResources']>,
    ParentType,
    ContextType
  >;
  soldInformation?: Resolver<
    ResolversTypes['OrderSoldInformation'],
    ParentType,
    ContextType
  >;
  statusPageUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  subscriptionContracts?: Resolver<
    Maybe<ResolversTypes['SubscriptionContractConnection']>,
    ParentType,
    ContextType,
    RequireFields<OrderSubscriptionContractsArgs, 'reverse' | 'sortKey'>
  >;
  subtotal?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  subtotalBeforeDiscounts?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  taxInvoices?: Resolver<
    Array<ResolversTypes['TaxInvoice']>,
    ParentType,
    ContextType
  >;
  totalDiscountedShipping?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalDuties?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalDutiesSummary?: Resolver<
    Maybe<ResolversTypes['OrderDutiesSummary']>,
    ParentType,
    ContextType
  >;
  totalPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalRefunded?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalShipping?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalTax?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalTip?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  transactions?: Resolver<
    Array<ResolversTypes['OrderTransaction']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderAgreementResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderAgreement'] = ResolversParentTypes['OrderAgreement'],
> = {
  happenedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['OrderActionType'], ParentType, ContextType>;
  sales?: Resolver<
    ResolversTypes['SaleConnection'],
    ParentType,
    ContextType,
    RequireFields<OrderAgreementSalesArgs, 'reverse'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderAllDiscountsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderAllDiscounts'] = ResolversParentTypes['OrderAllDiscounts'],
> = {
  discountApplicationType?: Resolver<
    ResolversTypes['DiscountApplicationType'],
    ParentType,
    ContextType
  >;
  discountValue?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  targetType?: Resolver<
    ResolversTypes['DiscountApplicationTargetType'],
    ParentType,
    ContextType
  >;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderDetailsPageOrderResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderDetailsPageOrder'] = ResolversParentTypes['OrderDetailsPageOrder'],
> = {
  __resolveType: TypeResolveFn<
    'Order' | 'PublicOrder',
    ParentType,
    ContextType
  >;
};

export type OrderDiscountInformationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderDiscountInformation'] = ResolversParentTypes['OrderDiscountInformation'],
> = {
  allAppliedDiscounts?: Resolver<
    Array<ResolversTypes['OrderAllDiscounts']>,
    ParentType,
    ContextType
  >;
  allOrderLevelAppliedDiscounts?: Resolver<
    Array<ResolversTypes['OrderAllDiscounts']>,
    ParentType,
    ContextType
  >;
  allOrderLevelAppliedDiscountsOnSoldItems?: Resolver<
    Array<ResolversTypes['OrderAllDiscounts']>,
    ParentType,
    ContextType
  >;
  totalDiscounts?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalOrderLevelAppliedDiscounts?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderDutiesSummaryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderDutiesSummary'] = ResolversParentTypes['OrderDutiesSummary'],
> = {
  totalDuties?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalDutiesStatus?: Resolver<
    Maybe<ResolversTypes['OrderDutiesStatusType']>,
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

export type OrderEditAgreementResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderEditAgreement'] = ResolversParentTypes['OrderEditAgreement'],
> = {
  happenedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['OrderActionType'], ParentType, ContextType>;
  sales?: Resolver<
    ResolversTypes['SaleConnection'],
    ParentType,
    ContextType,
    RequireFields<OrderEditAgreementSalesArgs, 'reverse'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderEditSummaryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderEditSummary'] = ResolversParentTypes['OrderEditSummary'],
> = {
  changes?: Resolver<
    Array<ResolversTypes['OrderEditSummaryChange']>,
    ParentType,
    ContextType
  >;
  latestHappenedAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderEditSummaryChangeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderEditSummaryChange'] = ResolversParentTypes['OrderEditSummaryChange'],
> = {
  delta?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  handle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineItem?: Resolver<ResolversTypes['LineItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderLineItemsSummaryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderLineItemsSummary'] = ResolversParentTypes['OrderLineItemsSummary'],
> = {
  lineItemCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalQuantityOfLegacyFeesLineItems?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >;
  totalQuantityOfLineItems?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >;
  totalQuantityOfTipLineItems?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderPaymentInformationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderPaymentInformation'] = ResolversParentTypes['OrderPaymentInformation'],
> = {
  paymentCollectionUrl?: Resolver<
    Maybe<ResolversTypes['URL']>,
    ParentType,
    ContextType
  >;
  paymentStatus?: Resolver<
    Maybe<ResolversTypes['OrderPaymentStatus']>,
    ParentType,
    ContextType
  >;
  paymentTerms?: Resolver<
    Maybe<ResolversTypes['PaymentTerms']>,
    ParentType,
    ContextType
  >;
  totalOutstandingAmount?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalPaidAmount?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderPickupInformationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderPickupInformation'] = ResolversParentTypes['OrderPickupInformation'],
> = {
  address?: Resolver<
    Maybe<ResolversTypes['PickupAddress']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  status?: Resolver<
    Maybe<ResolversTypes['PickupStatus']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderRequestReturnPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderRequestReturnPayload'] = ResolversParentTypes['OrderRequestReturnPayload'],
> = {
  return?: Resolver<Maybe<ResolversTypes['Return']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['ReturnUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderShippingLineGroupResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderShippingLineGroup'] = ResolversParentTypes['OrderShippingLineGroup'],
> = {
  groupType?: Resolver<
    ResolversTypes['DeliveryOptionGroupType'],
    ParentType,
    ContextType
  >;
  lineAmountAfterDiscounts?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderSoldInformationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderSoldInformation'] = ResolversParentTypes['OrderSoldInformation'],
> = {
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  refundedQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  subtotal?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  total?: Resolver<Maybe<ResolversTypes['MoneyV2']>, ParentType, ContextType>;
  totalDiscount?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalTaxes?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderTransactionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrderTransaction'] = ResolversParentTypes['OrderTransaction'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  giftCardDetails?: Resolver<
    Maybe<ResolversTypes['GiftCardDetails']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kind?: Resolver<
    Maybe<ResolversTypes['OrderTransactionKind']>,
    ParentType,
    ContextType
  >;
  paymentDetails?: Resolver<
    Maybe<ResolversTypes['PaymentDetails']>,
    ParentType,
    ContextType
  >;
  paymentIcon?: Resolver<
    Maybe<ResolversTypes['PaymentIconImage']>,
    ParentType,
    ContextType
  >;
  processedAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  status?: Resolver<
    Maybe<ResolversTypes['OrderTransactionStatus']>,
    ParentType,
    ContextType
  >;
  transactionAmount?: Resolver<
    ResolversTypes['MoneyBag'],
    ParentType,
    ContextType
  >;
  transactionParentId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    ResolversTypes['OrderTransactionType'],
    ParentType,
    ContextType
  >;
  typeDetails?: Resolver<
    Maybe<ResolversTypes['TransactionTypeDetails']>,
    ParentType,
    ContextType
  >;
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

export type PaymentDetailsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaymentDetails'] = ResolversParentTypes['PaymentDetails'],
> = {
  __resolveType: TypeResolveFn<'CardPaymentDetails', ParentType, ContextType>;
};

export type PaymentIconResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaymentIcon'] = ResolversParentTypes['PaymentIcon'],
> = {
  __resolveType: TypeResolveFn<'OrderTransaction', ParentType, ContextType>;
  paymentIcon?: Resolver<
    Maybe<ResolversTypes['PaymentIconImage']>,
    ParentType,
    ContextType
  >;
};

export type PaymentIconImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaymentIconImage'] = ResolversParentTypes['PaymentIconImage'],
> = {
  altText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  originalSrc?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  src?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  transformedSrc?: Resolver<
    ResolversTypes['URL'],
    ParentType,
    ContextType,
    RequireFields<PaymentIconImageTransformedSrcArgs, 'scale'>
  >;
  url?: Resolver<
    ResolversTypes['URL'],
    ParentType,
    ContextType,
    Partial<PaymentIconImageUrlArgs>
  >;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentInstrumentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaymentInstrument'] = ResolversParentTypes['PaymentInstrument'],
> = {
  __resolveType: TypeResolveFn<
    'CustomerCreditCard' | 'PaypalBillingAgreement',
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PaymentInstrumentBillingAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaymentInstrumentBillingAddress'] = ResolversParentTypes['PaymentInstrumentBillingAddress'],
> = {
  address1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<
    Maybe<ResolversTypes['CountryCode']>,
    ParentType,
    ContextType
  >;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  province?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provinceCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentInstrumentRemovePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaymentInstrumentRemovePayload'] = ResolversParentTypes['PaymentInstrumentRemovePayload'],
> = {
  deletedPaymentInstrumentId?: Resolver<
    Maybe<ResolversTypes['ID']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsPaymentInstrumentUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentInstrumentUpdateDefaultPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaymentInstrumentUpdateDefaultPayload'] = ResolversParentTypes['PaymentInstrumentUpdateDefaultPayload'],
> = {
  updatedPaymentInstrumentId?: Resolver<
    Maybe<ResolversTypes['ID']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsPaymentInstrumentUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentScheduleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaymentSchedule'] = ResolversParentTypes['PaymentSchedule'],
> = {
  amount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  completedAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  dueAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentScheduleConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaymentScheduleConnection'] = ResolversParentTypes['PaymentScheduleConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['PaymentScheduleEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['PaymentSchedule']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentScheduleEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaymentScheduleEdge'] = ResolversParentTypes['PaymentScheduleEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PaymentSchedule'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentTermsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaymentTerms'] = ResolversParentTypes['PaymentTerms'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nextDueAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  overdue?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  paymentSchedules?: Resolver<
    ResolversTypes['PaymentScheduleConnection'],
    ParentType,
    ContextType,
    RequireFields<PaymentTermsPaymentSchedulesArgs, 'reverse'>
  >;
  paymentTermsName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  paymentTermsType?: Resolver<
    ResolversTypes['PaymentTermsType'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentTermsTemplateResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaymentTermsTemplate'] = ResolversParentTypes['PaymentTermsTemplate'],
> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dueInDays?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentTermsType?: Resolver<
    ResolversTypes['PaymentTermsType'],
    ParentType,
    ContextType
  >;
  translatedName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaypalAccountEnablePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaypalAccountEnablePayload'] = ResolversParentTypes['PaypalAccountEnablePayload'],
> = {
  paypalBillingAgreement?: Resolver<
    Maybe<ResolversTypes['PaypalBillingAgreement']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsPaypalTokenUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaypalBillingAgreementResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaypalBillingAgreement'] = ResolversParentTypes['PaypalBillingAgreement'],
> = {
  billingAddress?: Resolver<
    Maybe<ResolversTypes['PaymentInstrumentBillingAddress']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  paypalAccountEmail?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  pendingOrders?: Resolver<
    ResolversTypes['OrderConnection'],
    ParentType,
    ContextType,
    RequireFields<PaypalBillingAgreementPendingOrdersArgs, 'reverse'>
  >;
  subscriptionContracts?: Resolver<
    ResolversTypes['SubscriptionContractConnection'],
    ParentType,
    ContextType,
    RequireFields<
      PaypalBillingAgreementSubscriptionContractsArgs,
      'reverse' | 'sortKey'
    >
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaypalTokenCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PaypalTokenCreatePayload'] = ResolversParentTypes['PaypalTokenCreatePayload'],
> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsPaypalTokenUserErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PickupAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PickupAddress'] = ResolversParentTypes['PickupAddress'],
> = {
  address1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryCode?: Resolver<
    ResolversTypes['CountryCode'],
    ParentType,
    ContextType
  >;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zoneCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type ProductSaleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProductSale'] = ResolversParentTypes['ProductSale'],
> = {
  actionType?: Resolver<
    ResolversTypes['SaleActionType'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineItem?: Resolver<ResolversTypes['LineItem'], ParentType, ContextType>;
  lineType?: Resolver<ResolversTypes['SaleLineType'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxes?: Resolver<Array<ResolversTypes['SaleTax']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalDiscountAmountAfterTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalDiscountAmountBeforeTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalTaxAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicOrderResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PublicOrder'] = ResolversParentTypes['PublicOrder'],
> = {
  cancelledAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  confirmationNumber?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  discountInformation?: Resolver<
    ResolversTypes['OrderDiscountInformation'],
    ParentType,
    ContextType
  >;
  draftOrderName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  editSummary?: Resolver<
    Maybe<ResolversTypes['OrderEditSummary']>,
    ParentType,
    ContextType
  >;
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
  fulfillments?: Resolver<
    ResolversTypes['FulfillmentConnection'],
    ParentType,
    ContextType,
    RequireFields<PublicOrderFulfillmentsArgs, 'reverse' | 'sortKey'>
  >;
  hasEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  legacyAggregatedMerchandiseTermsAsFees?: Resolver<
    Array<ResolversTypes['LegacyAggregatedMerchandiseTermsAsFees']>,
    ParentType,
    ContextType
  >;
  legacyRepresentProductsAsFees?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  legacySubtotalWithoutFees?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  lineItemContainers?: Resolver<
    Array<ResolversTypes['LineItemContainer']>,
    ParentType,
    ContextType
  >;
  lineItems?: Resolver<
    ResolversTypes['LineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<PublicOrderLineItemsArgs, 'reverse'>
  >;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentInformation?: Resolver<
    Maybe<ResolversTypes['OrderPaymentInformation']>,
    ParentType,
    ContextType
  >;
  pickupInformation?: Resolver<
    Maybe<ResolversTypes['OrderPickupInformation']>,
    ParentType,
    ContextType
  >;
  poNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  processedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  refunds?: Resolver<Array<ResolversTypes['Refund']>, ParentType, ContextType>;
  reorderPath?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  requiresShipping?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  return?: Resolver<
    Maybe<ResolversTypes['Return']>,
    ParentType,
    ContextType,
    RequireFields<PublicOrderReturnArgs, 'id'>
  >;
  returns?: Resolver<
    ResolversTypes['ReturnConnection'],
    ParentType,
    ContextType,
    RequireFields<PublicOrderReturnsArgs, 'reverse' | 'sortKey'>
  >;
  shippingLineGroups?: Resolver<
    Array<ResolversTypes['OrderShippingLineGroup']>,
    ParentType,
    ContextType
  >;
  soldInformation?: Resolver<
    ResolversTypes['OrderSoldInformation'],
    ParentType,
    ContextType
  >;
  subtotal?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  subtotalBeforeDiscounts?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalDiscountedShipping?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalDuties?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalDutiesSummary?: Resolver<
    Maybe<ResolversTypes['OrderDutiesSummary']>,
    ParentType,
    ContextType
  >;
  totalPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalRefunded?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalShipping?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalTax?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  totalTip?: Resolver<
    Maybe<ResolversTypes['MoneyV2']>,
    ParentType,
    ContextType
  >;
  transactions?: Resolver<
    Array<ResolversTypes['OrderTransaction']>,
    ParentType,
    ContextType
  >;
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

export type PurchasingEntityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PurchasingEntity'] = ResolversParentTypes['PurchasingEntity'],
> = {
  __resolveType: TypeResolveFn<
    'Customer' | 'PurchasingCompany',
    ParentType,
    ContextType
  >;
};

export type QueryRootResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['QueryRoot'] = ResolversParentTypes['QueryRoot'],
> = {
  company?: Resolver<
    Maybe<ResolversTypes['Company']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootCompanyArgs, 'id'>
  >;
  companyLocation?: Resolver<
    Maybe<ResolversTypes['CompanyLocation']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootCompanyLocationArgs, 'id'>
  >;
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  draftOrder?: Resolver<
    Maybe<ResolversTypes['DraftOrder']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootDraftOrderArgs, 'id'>
  >;
  extensionApiTokens?: Resolver<
    Maybe<ResolversTypes['ExtensionApiTokens']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootExtensionApiTokensArgs, 'appId'>
  >;
  order?: Resolver<
    Maybe<ResolversTypes['Order']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootOrderArgs, 'id'>
  >;
  orderDetailsPageOrder?: Resolver<
    Maybe<ResolversTypes['OrderDetailsPageOrder']>,
    ParentType,
    ContextType,
    RequireFields<QueryRootOrderDetailsPageOrderArgs, 'id'>
  >;
  shop?: Resolver<ResolversTypes['Shop'], ParentType, ContextType>;
  uiExtensionMetafields?: Resolver<
    Array<ResolversTypes['UiExtensionMetafield']>,
    ParentType,
    ContextType,
    Partial<QueryRootUiExtensionMetafieldsArgs>
  >;
  uiExtensionSessionToken?: Resolver<
    Maybe<ResolversTypes['UiExtensionSessionToken']>,
    ParentType,
    ContextType,
    Partial<QueryRootUiExtensionSessionTokenArgs>
  >;
};

export type RefundResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Refund'] = ResolversParentTypes['Refund'],
> = {
  createdAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  returnName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  totalRefunded?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RefundAgreementResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['RefundAgreement'] = ResolversParentTypes['RefundAgreement'],
> = {
  happenedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['OrderActionType'], ParentType, ContextType>;
  refund?: Resolver<ResolversTypes['Refund'], ParentType, ContextType>;
  sales?: Resolver<
    ResolversTypes['SaleConnection'],
    ParentType,
    ContextType,
    RequireFields<RefundAgreementSalesArgs, 'reverse'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemainingLineItemContainerResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['RemainingLineItemContainer'] = ResolversParentTypes['RemainingLineItemContainer'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineItems?: Resolver<
    ResolversTypes['RemainingLineItemContainerLineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<RemainingLineItemContainerLineItemsArgs, 'reverse'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemainingLineItemContainerLineItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['RemainingLineItemContainerLineItem'] = ResolversParentTypes['RemainingLineItemContainerLineItem'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineItem?: Resolver<ResolversTypes['LineItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemainingLineItemContainerLineItemConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['RemainingLineItemContainerLineItemConnection'] = ResolversParentTypes['RemainingLineItemContainerLineItemConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['RemainingLineItemContainerLineItemEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['RemainingLineItemContainerLineItem']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemainingLineItemContainerLineItemEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['RemainingLineItemContainerLineItemEdge'] = ResolversParentTypes['RemainingLineItemContainerLineItemEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['RemainingLineItemContainerLineItem'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResendGiftCardPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ResendGiftCardPayload'] = ResolversParentTypes['ResendGiftCardPayload'],
> = {
  orderId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsResendGiftCardErrors']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResourcePermissionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ResourcePermission'] = ResolversParentTypes['ResourcePermission'],
> = {
  permittedOperations?: Resolver<
    Array<ResolversTypes['PermittedOperation']>,
    ParentType,
    ContextType
  >;
  resource?: Resolver<ResolversTypes['ResourceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Return'] = ResolversParentTypes['Return'],
> = {
  closedAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  decline?: Resolver<
    Maybe<ResolversTypes['ReturnDecline']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  returnLineItems?: Resolver<
    ResolversTypes['ReturnLineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<ReturnReturnLineItemsArgs, 'reverse'>
  >;
  reverseDeliveries?: Resolver<
    ResolversTypes['ReverseDeliveryConnection'],
    ParentType,
    ContextType,
    RequireFields<ReturnReverseDeliveriesArgs, 'reverse'>
  >;
  status?: Resolver<ResolversTypes['ReturnStatus'], ParentType, ContextType>;
  timelineEvents?: Resolver<
    Array<ResolversTypes['TimelineEvent']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnAgreementResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReturnAgreement'] = ResolversParentTypes['ReturnAgreement'],
> = {
  happenedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['OrderActionType'], ParentType, ContextType>;
  return?: Resolver<ResolversTypes['Return'], ParentType, ContextType>;
  sales?: Resolver<
    ResolversTypes['SaleConnection'],
    ParentType,
    ContextType,
    RequireFields<ReturnAgreementSalesArgs, 'reverse'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReturnConnection'] = ResolversParentTypes['ReturnConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['ReturnEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<Array<ResolversTypes['Return']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnDeclineResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReturnDecline'] = ResolversParentTypes['ReturnDecline'],
> = {
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<
    ResolversTypes['ReturnDeclineReason'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReturnEdge'] = ResolversParentTypes['ReturnEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Return'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnLineItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReturnLineItem'] = ResolversParentTypes['ReturnLineItem'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineItem?: Resolver<ResolversTypes['LineItem'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returnReason?: Resolver<
    ResolversTypes['ReturnReason'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnLineItemConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReturnLineItemConnection'] = ResolversParentTypes['ReturnLineItemConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['ReturnLineItemEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['ReturnLineItem']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnLineItemEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReturnLineItemEdge'] = ResolversParentTypes['ReturnLineItemEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ReturnLineItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnSupportedReasonResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReturnSupportedReason'] = ResolversParentTypes['ReturnSupportedReason'],
> = {
  reason?: Resolver<ResolversTypes['ReturnReason'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReturnUserError'] = ResolversParentTypes['ReturnUserError'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['ReturnErrorCode']>,
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

export type ReverseDeliveryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReverseDelivery'] = ResolversParentTypes['ReverseDelivery'],
> = {
  customerGeneratedLabel?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  deliverable?: Resolver<
    Maybe<ResolversTypes['ReverseDeliveryDeliverable']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReverseDeliveryConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReverseDeliveryConnection'] = ResolversParentTypes['ReverseDeliveryConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['ReverseDeliveryEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['ReverseDelivery']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReverseDeliveryDeliverableResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReverseDeliveryDeliverable'] = ResolversParentTypes['ReverseDeliveryDeliverable'],
> = {
  __resolveType: TypeResolveFn<
    'ReverseDeliveryShippingDeliverable',
    ParentType,
    ContextType
  >;
};

export type ReverseDeliveryEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReverseDeliveryEdge'] = ResolversParentTypes['ReverseDeliveryEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ReverseDelivery'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReverseDeliveryLabelResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReverseDeliveryLabel'] = ResolversParentTypes['ReverseDeliveryLabel'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  publicFileUrl?: Resolver<
    Maybe<ResolversTypes['URL']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReverseDeliveryShippingDeliverableResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReverseDeliveryShippingDeliverable'] = ResolversParentTypes['ReverseDeliveryShippingDeliverable'],
> = {
  label?: Resolver<
    Maybe<ResolversTypes['ReverseDeliveryLabel']>,
    ParentType,
    ContextType
  >;
  tracking?: Resolver<
    Maybe<ResolversTypes['ReverseDeliveryTracking']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReverseDeliveryTrackingResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ReverseDeliveryTracking'] = ResolversParentTypes['ReverseDeliveryTracking'],
> = {
  carrierName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  trackingNumber?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  trackingUrl?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Sale'] = ResolversParentTypes['Sale'],
> = {
  __resolveType: TypeResolveFn<
    | 'AdditionalFeeSale'
    | 'AdjustmentSale'
    | 'DutySale'
    | 'FeeSale'
    | 'GiftCardSale'
    | 'ProductSale'
    | 'ShippingLineSale'
    | 'TipSale'
    | 'UnknownSale',
    ParentType,
    ContextType
  >;
  actionType?: Resolver<
    ResolversTypes['SaleActionType'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineType?: Resolver<ResolversTypes['SaleLineType'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxes?: Resolver<Array<ResolversTypes['SaleTax']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalDiscountAmountAfterTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalDiscountAmountBeforeTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalTaxAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
};

export type SaleConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SaleConnection'] = ResolversParentTypes['SaleConnection'],
> = {
  edges?: Resolver<Array<ResolversTypes['SaleEdge']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Sale']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SaleEdge'] = ResolversParentTypes['SaleEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Sale'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleTaxResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SaleTax'] = ResolversParentTypes['SaleTax'],
> = {
  amount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  taxLine?: Resolver<ResolversTypes['TaxLine'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SalesAgreementResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SalesAgreement'] = ResolversParentTypes['SalesAgreement'],
> = {
  __resolveType: TypeResolveFn<
    | 'OrderAgreement'
    | 'OrderEditAgreement'
    | 'RefundAgreement'
    | 'ReturnAgreement',
    ParentType,
    ContextType
  >;
  happenedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['OrderActionType'], ParentType, ContextType>;
  sales?: Resolver<
    ResolversTypes['SaleConnection'],
    ParentType,
    ContextType,
    RequireFields<SalesAgreementSalesArgs, 'reverse'>
  >;
};

export type SalesAgreementConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SalesAgreementConnection'] = ResolversParentTypes['SalesAgreementConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['SalesAgreementEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['SalesAgreement']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SalesAgreementEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SalesAgreementEdge'] = ResolversParentTypes['SalesAgreementEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['SalesAgreement'], ParentType, ContextType>;
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

export type ShippingLineResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShippingLine'] = ResolversParentTypes['ShippingLine'],
> = {
  handle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingLineSaleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShippingLineSale'] = ResolversParentTypes['ShippingLineSale'],
> = {
  actionType?: Resolver<
    ResolversTypes['SaleActionType'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineType?: Resolver<ResolversTypes['SaleLineType'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxes?: Resolver<Array<ResolversTypes['SaleTax']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalDiscountAmountAfterTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalDiscountAmountBeforeTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalTaxAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingRateResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShippingRate'] = ResolversParentTypes['ShippingRate'],
> = {
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Shop'] = ResolversParentTypes['Shop'],
> = {
  addressFormSettings?: Resolver<
    ResolversTypes['AddressFormSettings'],
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metafield?: Resolver<
    Maybe<ResolversTypes['Metafield']>,
    ParentType,
    ContextType,
    RequireFields<ShopMetafieldArgs, 'key' | 'namespace'>
  >;
  metafields?: Resolver<
    Array<Maybe<ResolversTypes['Metafield']>>,
    ParentType,
    ContextType,
    RequireFields<ShopMetafieldsArgs, 'identifiers'>
  >;
  myshopifyDomain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shopPolicies?: Resolver<
    Array<ResolversTypes['ShopPolicy']>,
    ParentType,
    ContextType
  >;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopAppLinksAndResourcesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopAppLinksAndResources'] = ResolversParentTypes['ShopAppLinksAndResources'],
> = {
  buyerHasShopApp?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  buyerHasShopPay?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  canTrackOrderUpdates?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  installmentsHighlightEligible?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  mobileUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  mobileUrlAttributionPayload?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  orderUpdateOptions?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  qrCodeUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  shopAppEligible?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  shopAppQrCodeKillswitch?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  shopInstallmentsMobileUrl?: Resolver<
    ResolversTypes['URL'],
    ParentType,
    ContextType
  >;
  shopInstallmentsViewSchedules?: Resolver<
    ResolversTypes['URL'],
    ParentType,
    ContextType
  >;
  shopPayOrder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayConfigurationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayConfiguration'] = ResolversParentTypes['ShopPayConfiguration'],
> = {
  checkoutOne?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  transactionParams?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  transactionUrl?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopPayCreditCardGetUpdateUrlPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ShopPayCreditCardGetUpdateUrlPayload'] = ResolversParentTypes['ShopPayCreditCardGetUpdateUrlPayload'],
> = {
  updateShopPayCreditCardUrl?: Resolver<
    Maybe<ResolversTypes['URL']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['UserErrorsPaymentInstrumentUserErrors']>,
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
  body?: Resolver<ResolversTypes['HTML'], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreCreditAccountResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StoreCreditAccount'] = ResolversParentTypes['StoreCreditAccount'],
> = {
  balance?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transactions?: Resolver<
    ResolversTypes['StoreCreditAccountTransactionConnection'],
    ParentType,
    ContextType,
    RequireFields<StoreCreditAccountTransactionsArgs, 'reverse' | 'sortKey'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreCreditAccountConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StoreCreditAccountConnection'] = ResolversParentTypes['StoreCreditAccountConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['StoreCreditAccountEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['StoreCreditAccount']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreCreditAccountCreditTransactionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StoreCreditAccountCreditTransaction'] = ResolversParentTypes['StoreCreditAccountCreditTransaction'],
> = {
  account?: Resolver<
    ResolversTypes['StoreCreditAccount'],
    ParentType,
    ContextType
  >;
  amount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  balanceAfterTransaction?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  expiresAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  remainingAmount?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreCreditAccountDebitRevertTransactionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StoreCreditAccountDebitRevertTransaction'] = ResolversParentTypes['StoreCreditAccountDebitRevertTransaction'],
> = {
  account?: Resolver<
    ResolversTypes['StoreCreditAccount'],
    ParentType,
    ContextType
  >;
  amount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  balanceAfterTransaction?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  debitTransaction?: Resolver<
    ResolversTypes['StoreCreditAccountDebitTransaction'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreCreditAccountDebitTransactionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StoreCreditAccountDebitTransaction'] = ResolversParentTypes['StoreCreditAccountDebitTransaction'],
> = {
  account?: Resolver<
    ResolversTypes['StoreCreditAccount'],
    ParentType,
    ContextType
  >;
  amount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  balanceAfterTransaction?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreCreditAccountEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StoreCreditAccountEdge'] = ResolversParentTypes['StoreCreditAccountEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['StoreCreditAccount'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreCreditAccountExpirationTransactionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StoreCreditAccountExpirationTransaction'] = ResolversParentTypes['StoreCreditAccountExpirationTransaction'],
> = {
  account?: Resolver<
    ResolversTypes['StoreCreditAccount'],
    ParentType,
    ContextType
  >;
  amount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  balanceAfterTransaction?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creditTransaction?: Resolver<
    ResolversTypes['StoreCreditAccountCreditTransaction'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreCreditAccountTransactionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StoreCreditAccountTransaction'] = ResolversParentTypes['StoreCreditAccountTransaction'],
> = {
  __resolveType: TypeResolveFn<
    | 'StoreCreditAccountCreditTransaction'
    | 'StoreCreditAccountDebitRevertTransaction'
    | 'StoreCreditAccountDebitTransaction'
    | 'StoreCreditAccountExpirationTransaction',
    ParentType,
    ContextType
  >;
  account?: Resolver<
    ResolversTypes['StoreCreditAccount'],
    ParentType,
    ContextType
  >;
  amount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  balanceAfterTransaction?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type StoreCreditAccountTransactionConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StoreCreditAccountTransactionConnection'] = ResolversParentTypes['StoreCreditAccountTransactionConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['StoreCreditAccountTransactionEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['StoreCreditAccountTransaction']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreCreditAccountTransactionEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StoreCreditAccountTransactionEdge'] = ResolversParentTypes['StoreCreditAccountTransactionEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['StoreCreditAccountTransaction'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorefrontCustomerAccessTokenCreatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StorefrontCustomerAccessTokenCreatePayload'] = ResolversParentTypes['StorefrontCustomerAccessTokenCreatePayload'],
> = {
  customerAccessToken?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<
      ResolversTypes['UserErrorsStorefrontCustomerAccessTokenCreateUserErrors']
    >,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionAnchorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionAnchor'] = ResolversParentTypes['SubscriptionAnchor'],
> = {
  __resolveType: TypeResolveFn<
    | 'SubscriptionMonthDayAnchor'
    | 'SubscriptionWeekDayAnchor'
    | 'SubscriptionYearDayAnchor',
    ParentType,
    ContextType
  >;
};

export type SubscriptionBillingCycleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionBillingCycle'] = ResolversParentTypes['SubscriptionBillingCycle'],
> = {
  billingAttemptExpectedDate?: Resolver<
    ResolversTypes['DateTime'],
    ParentType,
    ContextType
  >;
  cycleEndAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  cycleIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cycleStartAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skipped?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<
    ResolversTypes['SubscriptionBillingCycleBillingCycleStatus'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionBillingCycleConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionBillingCycleConnection'] = ResolversParentTypes['SubscriptionBillingCycleConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['SubscriptionBillingCycleEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['SubscriptionBillingCycle']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionBillingCycleEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionBillingCycleEdge'] = ResolversParentTypes['SubscriptionBillingCycleEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['SubscriptionBillingCycle'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionBillingCycleSkipPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionBillingCycleSkipPayload'] = ResolversParentTypes['SubscriptionBillingCycleSkipPayload'],
> = {
  billingCycle?: Resolver<
    Maybe<ResolversTypes['SubscriptionBillingCycle']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['SubscriptionBillingCycleSkipUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionBillingCycleSkipUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionBillingCycleSkipUserError'] = ResolversParentTypes['SubscriptionBillingCycleSkipUserError'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['SubscriptionBillingCycleSkipUserErrorCode']>,
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

export type SubscriptionBillingCycleUnskipPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionBillingCycleUnskipPayload'] = ResolversParentTypes['SubscriptionBillingCycleUnskipPayload'],
> = {
  billingCycle?: Resolver<
    Maybe<ResolversTypes['SubscriptionBillingCycle']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['SubscriptionBillingCycleUnskipUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionBillingCycleUnskipUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionBillingCycleUnskipUserError'] = ResolversParentTypes['SubscriptionBillingCycleUnskipUserError'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['SubscriptionBillingCycleUnskipUserErrorCode']>,
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

export type SubscriptionBillingPolicyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionBillingPolicy'] = ResolversParentTypes['SubscriptionBillingPolicy'],
> = {
  anchors?: Resolver<
    Array<ResolversTypes['SubscriptionAnchor']>,
    ParentType,
    ContextType
  >;
  interval?: Resolver<
    ResolversTypes['SubscriptionInterval'],
    ParentType,
    ContextType
  >;
  intervalCount?: Resolver<
    Maybe<ResolversTypes['Count']>,
    ParentType,
    ContextType
  >;
  maxCycles?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minCycles?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionContractResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionContract'] = ResolversParentTypes['SubscriptionContract'],
> = {
  appEligibleForCustomerActions?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  billingPolicy?: Resolver<
    ResolversTypes['SubscriptionBillingPolicy'],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currencyCode?: Resolver<
    ResolversTypes['CurrencyCode'],
    ParentType,
    ContextType
  >;
  customAttributes?: Resolver<
    Array<ResolversTypes['Attribute']>,
    ParentType,
    ContextType
  >;
  deliveryMethod?: Resolver<
    Maybe<ResolversTypes['SubscriptionDeliveryMethod']>,
    ParentType,
    ContextType
  >;
  deliveryPolicy?: Resolver<
    ResolversTypes['SubscriptionDeliveryPolicy'],
    ParentType,
    ContextType
  >;
  deliveryPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastBillingAttemptErrorType?: Resolver<
    Maybe<ResolversTypes['SubscriptionContractLastBillingErrorType']>,
    ParentType,
    ContextType
  >;
  lastPaymentStatus?: Resolver<
    Maybe<ResolversTypes['SubscriptionContractLastPaymentStatus']>,
    ParentType,
    ContextType
  >;
  lineCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lines?: Resolver<
    ResolversTypes['SubscriptionLineConnection'],
    ParentType,
    ContextType,
    RequireFields<SubscriptionContractLinesArgs, 'reverse'>
  >;
  linesCount?: Resolver<
    Maybe<ResolversTypes['Count']>,
    ParentType,
    ContextType
  >;
  nextBillingDate?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orders?: Resolver<
    ResolversTypes['OrderConnection'],
    ParentType,
    ContextType,
    RequireFields<SubscriptionContractOrdersArgs, 'reverse'>
  >;
  originOrder?: Resolver<
    Maybe<ResolversTypes['Order']>,
    ParentType,
    ContextType
  >;
  paymentInstrument?: Resolver<
    Maybe<ResolversTypes['PaymentInstrument']>,
    ParentType,
    ContextType
  >;
  priceBreakdownEstimate?: Resolver<
    Maybe<ResolversTypes['SubscriptionPriceBreakdown']>,
    ParentType,
    ContextType
  >;
  revisionId?: Resolver<
    ResolversTypes['UnsignedInt64'],
    ParentType,
    ContextType
  >;
  status?: Resolver<
    ResolversTypes['SubscriptionContractSubscriptionStatus'],
    ParentType,
    ContextType
  >;
  upcomingBillingCycles?: Resolver<
    ResolversTypes['SubscriptionBillingCycleConnection'],
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionContractUpcomingBillingCyclesArgs,
      'reverse' | 'sortKey'
    >
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionContractActivatePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionContractActivatePayload'] = ResolversParentTypes['SubscriptionContractActivatePayload'],
> = {
  contract?: Resolver<
    Maybe<ResolversTypes['SubscriptionContract']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['SubscriptionContractStatusUpdateUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionContractBaseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionContractBase'] = ResolversParentTypes['SubscriptionContractBase'],
> = {
  __resolveType: TypeResolveFn<'SubscriptionContract', ParentType, ContextType>;
  appEligibleForCustomerActions?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  currencyCode?: Resolver<
    ResolversTypes['CurrencyCode'],
    ParentType,
    ContextType
  >;
  customAttributes?: Resolver<
    Array<ResolversTypes['Attribute']>,
    ParentType,
    ContextType
  >;
  deliveryMethod?: Resolver<
    Maybe<ResolversTypes['SubscriptionDeliveryMethod']>,
    ParentType,
    ContextType
  >;
  deliveryPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  lineCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lines?: Resolver<
    ResolversTypes['SubscriptionLineConnection'],
    ParentType,
    ContextType,
    RequireFields<SubscriptionContractBaseLinesArgs, 'reverse'>
  >;
  linesCount?: Resolver<
    Maybe<ResolversTypes['Count']>,
    ParentType,
    ContextType
  >;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orders?: Resolver<
    ResolversTypes['OrderConnection'],
    ParentType,
    ContextType,
    RequireFields<SubscriptionContractBaseOrdersArgs, 'reverse'>
  >;
  priceBreakdownEstimate?: Resolver<
    Maybe<ResolversTypes['SubscriptionPriceBreakdown']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type SubscriptionContractCancelPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionContractCancelPayload'] = ResolversParentTypes['SubscriptionContractCancelPayload'],
> = {
  contract?: Resolver<
    Maybe<ResolversTypes['SubscriptionContract']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['SubscriptionContractStatusUpdateUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionContractChangePaymentInstrumentPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionContractChangePaymentInstrumentPayload'] = ResolversParentTypes['SubscriptionContractChangePaymentInstrumentPayload'],
> = {
  contract?: Resolver<
    Maybe<ResolversTypes['SubscriptionContract']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['SubscriptionContractUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionContractConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionContractConnection'] = ResolversParentTypes['SubscriptionContractConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['SubscriptionContractEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['SubscriptionContract']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionContractEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionContractEdge'] = ResolversParentTypes['SubscriptionContractEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes['SubscriptionContract'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionContractFetchDeliveryOptionsPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionContractFetchDeliveryOptionsPayload'] = ResolversParentTypes['SubscriptionContractFetchDeliveryOptionsPayload'],
> = {
  deliveryOptionsResult?: Resolver<
    Maybe<ResolversTypes['SubscriptionDeliveryOptionsResult']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['SubscriptionContractUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionContractPausePayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionContractPausePayload'] = ResolversParentTypes['SubscriptionContractPausePayload'],
> = {
  contract?: Resolver<
    Maybe<ResolversTypes['SubscriptionContract']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['SubscriptionContractStatusUpdateUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionContractSelectDeliveryMethodPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionContractSelectDeliveryMethodPayload'] = ResolversParentTypes['SubscriptionContractSelectDeliveryMethodPayload'],
> = {
  contract?: Resolver<
    Maybe<ResolversTypes['SubscriptionContract']>,
    ParentType,
    ContextType
  >;
  userErrors?: Resolver<
    Array<ResolversTypes['SubscriptionContractUserError']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionContractStatusUpdateUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionContractStatusUpdateUserError'] = ResolversParentTypes['SubscriptionContractStatusUpdateUserError'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['SubscriptionContractStatusUpdateErrorCode']>,
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

export type SubscriptionContractUserErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionContractUserError'] = ResolversParentTypes['SubscriptionContractUserError'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['SubscriptionContractUserErrorCode']>,
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

export type SubscriptionDeliveryMethodResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionDeliveryMethod'] = ResolversParentTypes['SubscriptionDeliveryMethod'],
> = {
  __resolveType: TypeResolveFn<
    | 'SubscriptionDeliveryMethodLocalDelivery'
    | 'SubscriptionDeliveryMethodPickup'
    | 'SubscriptionDeliveryMethodShipping',
    ParentType,
    ContextType
  >;
};

export type SubscriptionDeliveryMethodLocalDeliveryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionDeliveryMethodLocalDelivery'] = ResolversParentTypes['SubscriptionDeliveryMethodLocalDelivery'],
> = {
  address?: Resolver<
    ResolversTypes['SubscriptionMailingAddress'],
    ParentType,
    ContextType
  >;
  localDeliveryOption?: Resolver<
    ResolversTypes['SubscriptionDeliveryMethodLocalDeliveryOption'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionDeliveryMethodLocalDeliveryOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionDeliveryMethodLocalDeliveryOption'] = ResolversParentTypes['SubscriptionDeliveryMethodLocalDeliveryOption'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  instructions?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  presentmentTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionDeliveryMethodPickupResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionDeliveryMethodPickup'] = ResolversParentTypes['SubscriptionDeliveryMethodPickup'],
> = {
  pickupOption?: Resolver<
    ResolversTypes['SubscriptionDeliveryMethodPickupOption'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionDeliveryMethodPickupOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionDeliveryMethodPickupOption'] = ResolversParentTypes['SubscriptionDeliveryMethodPickupOption'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  pickupAddress?: Resolver<
    ResolversTypes['PickupAddress'],
    ParentType,
    ContextType
  >;
  presentmentTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionDeliveryMethodShippingResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionDeliveryMethodShipping'] = ResolversParentTypes['SubscriptionDeliveryMethodShipping'],
> = {
  address?: Resolver<
    ResolversTypes['SubscriptionMailingAddress'],
    ParentType,
    ContextType
  >;
  shippingOption?: Resolver<
    ResolversTypes['SubscriptionDeliveryMethodShippingOption'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionDeliveryMethodShippingOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionDeliveryMethodShippingOption'] = ResolversParentTypes['SubscriptionDeliveryMethodShippingOption'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  presentmentTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionDeliveryOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionDeliveryOption'] = ResolversParentTypes['SubscriptionDeliveryOption'],
> = {
  __resolveType: TypeResolveFn<
    | 'SubscriptionLocalDeliveryOption'
    | 'SubscriptionPickupOption'
    | 'SubscriptionShippingOption',
    ParentType,
    ContextType
  >;
};

export type SubscriptionDeliveryOptionsResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionDeliveryOptionsResult'] = ResolversParentTypes['SubscriptionDeliveryOptionsResult'],
> = {
  __resolveType: TypeResolveFn<
    | 'SubscriptionDeliveryOptionsResultFailure'
    | 'SubscriptionDeliveryOptionsResultSuccess',
    ParentType,
    ContextType
  >;
};

export type SubscriptionDeliveryOptionsResultFailureResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionDeliveryOptionsResultFailure'] = ResolversParentTypes['SubscriptionDeliveryOptionsResultFailure'],
> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionDeliveryOptionsResultSuccessResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionDeliveryOptionsResultSuccess'] = ResolversParentTypes['SubscriptionDeliveryOptionsResultSuccess'],
> = {
  deliveryOptions?: Resolver<
    Array<ResolversTypes['SubscriptionDeliveryOption']>,
    ParentType,
    ContextType
  >;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionDeliveryPolicyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionDeliveryPolicy'] = ResolversParentTypes['SubscriptionDeliveryPolicy'],
> = {
  anchors?: Resolver<
    Array<ResolversTypes['SubscriptionAnchor']>,
    ParentType,
    ContextType
  >;
  interval?: Resolver<
    ResolversTypes['SubscriptionInterval'],
    ParentType,
    ContextType
  >;
  intervalCount?: Resolver<
    Maybe<ResolversTypes['Count']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionLineResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionLine'] = ResolversParentTypes['SubscriptionLine'],
> = {
  currentPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  customAttributes?: Resolver<
    Array<ResolversTypes['Attribute']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  lineDiscountedPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  onlineStoreUrl?: Resolver<
    Maybe<ResolversTypes['URL']>,
    ParentType,
    ContextType
  >;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  requiresShipping?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  taxable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  variantImage?: Resolver<
    Maybe<ResolversTypes['Image']>,
    ParentType,
    ContextType
  >;
  variantTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionLineConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionLineConnection'] = ResolversParentTypes['SubscriptionLineConnection'],
> = {
  edges?: Resolver<
    Array<ResolversTypes['SubscriptionLineEdge']>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Array<ResolversTypes['SubscriptionLine']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionLineEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionLineEdge'] = ResolversParentTypes['SubscriptionLineEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['SubscriptionLine'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionLocalDeliveryOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionLocalDeliveryOption'] = ResolversParentTypes['SubscriptionLocalDeliveryOption'],
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  phoneRequired?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  presentmentTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  price?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionMailingAddressResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionMailingAddress'] = ResolversParentTypes['SubscriptionMailingAddress'],
> = {
  address1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<
    Maybe<ResolversTypes['CountryCode']>,
    ParentType,
    ContextType
  >;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type SubscriptionMonthDayAnchorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionMonthDayAnchor'] = ResolversParentTypes['SubscriptionMonthDayAnchor'],
> = {
  dayOfMonth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionPickupOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionPickupOption'] = ResolversParentTypes['SubscriptionPickupOption'],
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  locationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  phoneRequired?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pickupAddress?: Resolver<
    ResolversTypes['PickupAddress'],
    ParentType,
    ContextType
  >;
  pickupTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  presentmentTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  price?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionPriceBreakdownResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionPriceBreakdown'] = ResolversParentTypes['SubscriptionPriceBreakdown'],
> = {
  subtotalPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  taxesIncluded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalDiscounts?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalPrice?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalShippingPrice?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalTax?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionShippingOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionShippingOption'] = ResolversParentTypes['SubscriptionShippingOption'],
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  phoneRequired?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  presentmentTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  price?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionWeekDayAnchorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionWeekDayAnchor'] = ResolversParentTypes['SubscriptionWeekDayAnchor'],
> = {
  dayOfWeek?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionYearDayAnchorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['SubscriptionYearDayAnchor'] = ResolversParentTypes['SubscriptionYearDayAnchor'],
> = {
  dayOfMonth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  month?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxExemptionDetailsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['TaxExemptionDetails'] = ResolversParentTypes['TaxExemptionDetails'],
> = {
  applicable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  exemptionGroup?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exemptionGroupName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  groupedName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taxRegionCode?: Resolver<
    Maybe<ResolversTypes['TaxRegionCode']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['TaxExemption'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxInvoiceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['TaxInvoice'] = ResolversParentTypes['TaxInvoice'],
> = {
  buyerTimeZone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  invoiceNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<
    ResolversTypes['TaxInvoiceStatus'],
    ParentType,
    ContextType
  >;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxLineResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['TaxLine'] = ResolversParentTypes['TaxLine'],
> = {
  channelLiable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  priceSet?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  rate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ratePercentage?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimelineEventResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['TimelineEvent'] = ResolversParentTypes['TimelineEvent'],
> = {
  happenedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subtitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TipSaleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['TipSale'] = ResolversParentTypes['TipSale'],
> = {
  actionType?: Resolver<
    ResolversTypes['SaleActionType'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineItem?: Resolver<ResolversTypes['LineItem'], ParentType, ContextType>;
  lineType?: Resolver<ResolversTypes['SaleLineType'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxes?: Resolver<Array<ResolversTypes['SaleTax']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalDiscountAmountAfterTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalDiscountAmountBeforeTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalTaxAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrackingInformationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['TrackingInformation'] = ResolversParentTypes['TrackingInformation'],
> = {
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionTypeDetailsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['TransactionTypeDetails'] = ResolversParentTypes['TransactionTypeDetails'],
> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UiExtensionMetafieldResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UiExtensionMetafield'] = ResolversParentTypes['UiExtensionMetafield'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueType?: Resolver<
    ResolversTypes['MetafieldValueType'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UiExtensionSessionTokenResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UiExtensionSessionToken'] = ResolversParentTypes['UiExtensionSessionToken'],
> = {
  expiresIn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnfulfilledDigitalLineItemContainerResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UnfulfilledDigitalLineItemContainer'] = ResolversParentTypes['UnfulfilledDigitalLineItemContainer'],
> = {
  lineItems?: Resolver<
    ResolversTypes['LineItemContainerLineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<UnfulfilledDigitalLineItemContainerLineItemsArgs, 'reverse'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnfulfilledGiftCardLineItemContainerResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UnfulfilledGiftCardLineItemContainer'] = ResolversParentTypes['UnfulfilledGiftCardLineItemContainer'],
> = {
  lineItems?: Resolver<
    ResolversTypes['LineItemContainerLineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<UnfulfilledGiftCardLineItemContainerLineItemsArgs, 'reverse'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnfulfilledLineItemContainerResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UnfulfilledLineItemContainer'] = ResolversParentTypes['UnfulfilledLineItemContainer'],
> = {
  displayableState?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  lineItems?: Resolver<
    ResolversTypes['LineItemContainerLineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<UnfulfilledLineItemContainerLineItemsArgs, 'reverse'>
  >;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnfulfilledLineItemContainerCommonFieldsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UnfulfilledLineItemContainerCommonFields'] = ResolversParentTypes['UnfulfilledLineItemContainerCommonFields'],
> = {
  __resolveType: TypeResolveFn<
    | 'UnfulfilledDigitalLineItemContainer'
    | 'UnfulfilledGiftCardLineItemContainer'
    | 'UnfulfilledLineItemContainer'
    | 'UnfulfilledPhysicalLineItemContainer',
    ParentType,
    ContextType
  >;
  lineItems?: Resolver<
    ResolversTypes['LineItemContainerLineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<
      UnfulfilledLineItemContainerCommonFieldsLineItemsArgs,
      'reverse'
    >
  >;
};

export type UnfulfilledPhysicalLineItemContainerResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UnfulfilledPhysicalLineItemContainer'] = ResolversParentTypes['UnfulfilledPhysicalLineItemContainer'],
> = {
  lineItems?: Resolver<
    ResolversTypes['LineItemContainerLineItemConnection'],
    ParentType,
    ContextType,
    RequireFields<UnfulfilledPhysicalLineItemContainerLineItemsArgs, 'reverse'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnitPriceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UnitPrice'] = ResolversParentTypes['UnitPrice'],
> = {
  measurement?: Resolver<
    ResolversTypes['UnitPriceMeasurement'],
    ParentType,
    ContextType
  >;
  price?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnitPriceMeasurementResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UnitPriceMeasurement'] = ResolversParentTypes['UnitPriceMeasurement'],
> = {
  referenceUnit?: Resolver<
    ResolversTypes['UnitPriceMeasurementUnit'],
    ParentType,
    ContextType
  >;
  referenceValue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnknownSaleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UnknownSale'] = ResolversParentTypes['UnknownSale'],
> = {
  actionType?: Resolver<
    ResolversTypes['SaleActionType'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineType?: Resolver<ResolversTypes['SaleLineType'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxes?: Resolver<Array<ResolversTypes['SaleTax']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  totalDiscountAmountAfterTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalDiscountAmountBeforeTaxes?: Resolver<
    ResolversTypes['MoneyV2'],
    ParentType,
    ContextType
  >;
  totalTaxAmount?: Resolver<ResolversTypes['MoneyV2'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UnsignedInt64ScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt64'], any> {
  name: 'UnsignedInt64';
}

export type UserErrorsBusinessContactUserErrorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserErrorsBusinessContactUserErrors'] = ResolversParentTypes['UserErrorsBusinessContactUserErrors'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['UserErrorsBusinessContactUserErrorsCode']>,
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

export type UserErrorsBusinessLocationPaymentInstrumentUserErrorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserErrorsBusinessLocationPaymentInstrumentUserErrors'] = ResolversParentTypes['UserErrorsBusinessLocationPaymentInstrumentUserErrors'],
> = {
  code?: Resolver<
    Maybe<
      ResolversTypes['UserErrorsBusinessLocationPaymentInstrumentUserErrorsCode']
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

export type UserErrorsCustomerAddressUserErrorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserErrorsCustomerAddressUserErrors'] = ResolversParentTypes['UserErrorsCustomerAddressUserErrors'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['UserErrorsCustomerAddressUserErrorsCode']>,
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

export type UserErrorsCustomerEmailMarketingOptInUserErrorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserErrorsCustomerEmailMarketingOptInUserErrors'] = ResolversParentTypes['UserErrorsCustomerEmailMarketingOptInUserErrors'],
> = {
  code?: Resolver<
    Maybe<
      ResolversTypes['UserErrorsCustomerEmailMarketingOptInUserErrorsCode']
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

export type UserErrorsCustomerEmailMarketingUserErrorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserErrorsCustomerEmailMarketingUserErrors'] = ResolversParentTypes['UserErrorsCustomerEmailMarketingUserErrors'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['UserErrorsCustomerEmailMarketingUserErrorsCode']>,
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

export type UserErrorsCustomerUserErrorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserErrorsCustomerUserErrors'] = ResolversParentTypes['UserErrorsCustomerUserErrors'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['UserErrorsCustomerUserErrorsCode']>,
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

export type UserErrorsPaymentInstrumentUserErrorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserErrorsPaymentInstrumentUserErrors'] = ResolversParentTypes['UserErrorsPaymentInstrumentUserErrors'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['UserErrorsPaymentInstrumentUserErrorsCode']>,
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

export type UserErrorsPaypalTokenUserErrorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserErrorsPaypalTokenUserErrors'] = ResolversParentTypes['UserErrorsPaypalTokenUserErrors'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['UserErrorsPaypalTokenUserErrorsCode']>,
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

export type UserErrorsResendGiftCardErrorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserErrorsResendGiftCardErrors'] = ResolversParentTypes['UserErrorsResendGiftCardErrors'],
> = {
  code?: Resolver<
    Maybe<ResolversTypes['UserErrorsResendGiftCardErrorsCode']>,
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

export type UserErrorsStorefrontCustomerAccessTokenCreateUserErrorsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserErrorsStorefrontCustomerAccessTokenCreateUserErrors'] = ResolversParentTypes['UserErrorsStorefrontCustomerAccessTokenCreateUserErrors'],
> = {
  code?: Resolver<
    Maybe<
      ResolversTypes['UserErrorsStorefrontCustomerAccessTokenCreateUserErrorsCode']
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

export type WalletPaymentConfigResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['WalletPaymentConfig'] = ResolversParentTypes['WalletPaymentConfig'],
> = {
  __resolveType: TypeResolveFn<
    'ApplePayWalletConfig' | 'GooglePayWalletConfig',
    ParentType,
    ContextType
  >;
};

export type WeightResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Weight'] = ResolversParentTypes['Weight'],
> = {
  unit?: Resolver<ResolversTypes['WeightUnit'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AdditionalFeeSale?: AdditionalFeeSaleResolvers<ContextType>;
  AddressFormField?: AddressFormFieldResolvers<ContextType>;
  AddressFormSettings?: AddressFormSettingsResolvers<ContextType>;
  AdjustmentSale?: AdjustmentSaleResolvers<ContextType>;
  ApplePayCreditCardAddPayload?: ApplePayCreditCardAddPayloadResolvers<ContextType>;
  ApplePayCreditCardUpdatePayload?: ApplePayCreditCardUpdatePayloadResolvers<ContextType>;
  ApplePaySessionCreatePayload?: ApplePaySessionCreatePayloadResolvers<ContextType>;
  ApplePaySessionUserError?: ApplePaySessionUserErrorResolvers<ContextType>;
  ApplePayWalletConfig?: ApplePayWalletConfigResolvers<ContextType>;
  AppliedGiftCard?: AppliedGiftCardResolvers<ContextType>;
  Attribute?: AttributeResolvers<ContextType>;
  AutomaticDiscountApplication?: AutomaticDiscountApplicationResolvers<ContextType>;
  AvailableShippingRates?: AvailableShippingRatesResolvers<ContextType>;
  BusinessContactUpdatePayload?: BusinessContactUpdatePayloadResolvers<ContextType>;
  BusinessCustomerUserError?: BusinessCustomerUserErrorResolvers<ContextType>;
  BusinessLocationCreditCardAddPayload?: BusinessLocationCreditCardAddPayloadResolvers<ContextType>;
  BusinessLocationCreditCardUpdatePayload?: BusinessLocationCreditCardUpdatePayloadResolvers<ContextType>;
  BusinessLocationPaymentInstrumentRemovePayload?: BusinessLocationPaymentInstrumentRemovePayloadResolvers<ContextType>;
  BuyerExperienceConfiguration?: BuyerExperienceConfigurationResolvers<ContextType>;
  CardPaymentDetails?: CardPaymentDetailsResolvers<ContextType>;
  Checkout?: CheckoutResolvers<ContextType>;
  CheckoutLineItem?: CheckoutLineItemResolvers<ContextType>;
  CheckoutLineItemConnection?: CheckoutLineItemConnectionResolvers<ContextType>;
  CheckoutLineItemEdge?: CheckoutLineItemEdgeResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  CompanyAddress?: CompanyAddressResolvers<ContextType>;
  CompanyContact?: CompanyContactResolvers<ContextType>;
  CompanyContactConnection?: CompanyContactConnectionResolvers<ContextType>;
  CompanyContactEdge?: CompanyContactEdgeResolvers<ContextType>;
  CompanyContactRole?: CompanyContactRoleResolvers<ContextType>;
  CompanyContactRoleAssignment?: CompanyContactRoleAssignmentResolvers<ContextType>;
  CompanyContactRoleAssignmentConnection?: CompanyContactRoleAssignmentConnectionResolvers<ContextType>;
  CompanyContactRoleAssignmentEdge?: CompanyContactRoleAssignmentEdgeResolvers<ContextType>;
  CompanyLocation?: CompanyLocationResolvers<ContextType>;
  CompanyLocationAssignAddressPayload?: CompanyLocationAssignAddressPayloadResolvers<ContextType>;
  CompanyLocationConnection?: CompanyLocationConnectionResolvers<ContextType>;
  CompanyLocationEdge?: CompanyLocationEdgeResolvers<ContextType>;
  Count?: CountResolvers<ContextType>;
  CreditCardAddPayload?: CreditCardAddPayloadResolvers<ContextType>;
  CreditCardUpdatePayload?: CreditCardUpdatePayloadResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerAddress?: CustomerAddressResolvers<ContextType>;
  CustomerAddressConnection?: CustomerAddressConnectionResolvers<ContextType>;
  CustomerAddressCreatePayload?: CustomerAddressCreatePayloadResolvers<ContextType>;
  CustomerAddressDeletePayload?: CustomerAddressDeletePayloadResolvers<ContextType>;
  CustomerAddressEdge?: CustomerAddressEdgeResolvers<ContextType>;
  CustomerAddressUpdatePayload?: CustomerAddressUpdatePayloadResolvers<ContextType>;
  CustomerCreditCard?: CustomerCreditCardResolvers<ContextType>;
  CustomerCreditCardConnection?: CustomerCreditCardConnectionResolvers<ContextType>;
  CustomerCreditCardEdge?: CustomerCreditCardEdgeResolvers<ContextType>;
  CustomerEmailAddress?: CustomerEmailAddressResolvers<ContextType>;
  CustomerEmailMarketingOptInPayload?: CustomerEmailMarketingOptInPayloadResolvers<ContextType>;
  CustomerEmailMarketingSubscribePayload?: CustomerEmailMarketingSubscribePayloadResolvers<ContextType>;
  CustomerEmailMarketingUnsubscribePayload?: CustomerEmailMarketingUnsubscribePayloadResolvers<ContextType>;
  CustomerMailingAddress?: CustomerMailingAddressResolvers<ContextType>;
  CustomerPhoneNumber?: CustomerPhoneNumberResolvers<ContextType>;
  CustomerUpdatePayload?: CustomerUpdatePayloadResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Decimal?: GraphQLScalarType;
  DepositConfiguration?: DepositConfigurationResolvers<ContextType>;
  DepositPercentage?: DepositPercentageResolvers<ContextType>;
  DiscountAllocation?: DiscountAllocationResolvers<ContextType>;
  DiscountApplication?: DiscountApplicationResolvers<ContextType>;
  DiscountApplicationConnection?: DiscountApplicationConnectionResolvers<ContextType>;
  DiscountApplicationEdge?: DiscountApplicationEdgeResolvers<ContextType>;
  DiscountCodeApplication?: DiscountCodeApplicationResolvers<ContextType>;
  DisplayableError?: DisplayableErrorResolvers<ContextType>;
  Domain?: DomainResolvers<ContextType>;
  DraftOrder?: DraftOrderResolvers<ContextType>;
  DraftOrderAppliedDiscount?: DraftOrderAppliedDiscountResolvers<ContextType>;
  DraftOrderConnection?: DraftOrderConnectionResolvers<ContextType>;
  DraftOrderDiscountInformation?: DraftOrderDiscountInformationResolvers<ContextType>;
  DraftOrderEdge?: DraftOrderEdgeResolvers<ContextType>;
  DraftOrderLineItem?: DraftOrderLineItemResolvers<ContextType>;
  DraftOrderLineItemConnection?: DraftOrderLineItemConnectionResolvers<ContextType>;
  DraftOrderLineItemDiscountInformation?: DraftOrderLineItemDiscountInformationResolvers<ContextType>;
  DraftOrderLineItemEdge?: DraftOrderLineItemEdgeResolvers<ContextType>;
  DraftOrderLineItemsSummary?: DraftOrderLineItemsSummaryResolvers<ContextType>;
  DutySale?: DutySaleResolvers<ContextType>;
  ExtensionApiTokens?: ExtensionApiTokensResolvers<ContextType>;
  ExtensionStorefrontApiToken?: ExtensionStorefrontApiTokenResolvers<ContextType>;
  FeeSale?: FeeSaleResolvers<ContextType>;
  Fulfillment?: FulfillmentResolvers<ContextType>;
  FulfillmentConnection?: FulfillmentConnectionResolvers<ContextType>;
  FulfillmentEdge?: FulfillmentEdgeResolvers<ContextType>;
  FulfillmentEvent?: FulfillmentEventResolvers<ContextType>;
  FulfillmentEventConnection?: FulfillmentEventConnectionResolvers<ContextType>;
  FulfillmentEventEdge?: FulfillmentEventEdgeResolvers<ContextType>;
  FulfillmentLineItem?: FulfillmentLineItemResolvers<ContextType>;
  FulfillmentLineItemConnection?: FulfillmentLineItemConnectionResolvers<ContextType>;
  FulfillmentLineItemEdge?: FulfillmentLineItemEdgeResolvers<ContextType>;
  GiftCardDetails?: GiftCardDetailsResolvers<ContextType>;
  GiftCardSale?: GiftCardSaleResolvers<ContextType>;
  GooglePayCreditCardAddPayload?: GooglePayCreditCardAddPayloadResolvers<ContextType>;
  GooglePayCreditCardUpdatePayload?: GooglePayCreditCardUpdatePayloadResolvers<ContextType>;
  GooglePayWalletConfig?: GooglePayWalletConfigResolvers<ContextType>;
  HTML?: GraphQLScalarType;
  HasCompareDigest?: HasCompareDigestResolvers<ContextType>;
  HasMetafields?: HasMetafieldsResolvers<ContextType>;
  HasStoreCreditAccounts?: HasStoreCreditAccountsResolvers<ContextType>;
  ISO8601DateTime?: GraphQLScalarType;
  Image?: ImageResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LegacyAggregatedMerchandiseTermsAsFees?: LegacyAggregatedMerchandiseTermsAsFeesResolvers<ContextType>;
  LineItem?: LineItemResolvers<ContextType>;
  LineItemConnection?: LineItemConnectionResolvers<ContextType>;
  LineItemContainer?: LineItemContainerResolvers<ContextType>;
  LineItemContainerLineItem?: LineItemContainerLineItemResolvers<ContextType>;
  LineItemContainerLineItemConnection?: LineItemContainerLineItemConnectionResolvers<ContextType>;
  LineItemContainerLineItemEdge?: LineItemContainerLineItemEdgeResolvers<ContextType>;
  LineItemDiscountInformation?: LineItemDiscountInformationResolvers<ContextType>;
  LineItemEdge?: LineItemEdgeResolvers<ContextType>;
  LineItemGroup?: LineItemGroupResolvers<ContextType>;
  LineItemSellingPlan?: LineItemSellingPlanResolvers<ContextType>;
  LineItemVariantOption?: LineItemVariantOptionResolvers<ContextType>;
  ManualDiscountApplication?: ManualDiscountApplicationResolvers<ContextType>;
  Market?: MarketResolvers<ContextType>;
  MarketWebPresence?: MarketWebPresenceResolvers<ContextType>;
  MarketWebPresenceRootUrl?: MarketWebPresenceRootUrlResolvers<ContextType>;
  Metafield?: MetafieldResolvers<ContextType>;
  MetafieldIdentifier?: MetafieldIdentifierResolvers<ContextType>;
  MetafieldsDeletePayload?: MetafieldsDeletePayloadResolvers<ContextType>;
  MetafieldsDeleteUserError?: MetafieldsDeleteUserErrorResolvers<ContextType>;
  MetafieldsSetPayload?: MetafieldsSetPayloadResolvers<ContextType>;
  MetafieldsSetUserError?: MetafieldsSetUserErrorResolvers<ContextType>;
  MoneyBag?: MoneyBagResolvers<ContextType>;
  MoneyV2?: MoneyV2Resolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderAgreement?: OrderAgreementResolvers<ContextType>;
  OrderAllDiscounts?: OrderAllDiscountsResolvers<ContextType>;
  OrderConnection?: OrderConnectionResolvers<ContextType>;
  OrderDetailsPageOrder?: OrderDetailsPageOrderResolvers<ContextType>;
  OrderDiscountInformation?: OrderDiscountInformationResolvers<ContextType>;
  OrderDutiesSummary?: OrderDutiesSummaryResolvers<ContextType>;
  OrderEdge?: OrderEdgeResolvers<ContextType>;
  OrderEditAgreement?: OrderEditAgreementResolvers<ContextType>;
  OrderEditSummary?: OrderEditSummaryResolvers<ContextType>;
  OrderEditSummaryChange?: OrderEditSummaryChangeResolvers<ContextType>;
  OrderLineItemsSummary?: OrderLineItemsSummaryResolvers<ContextType>;
  OrderPaymentInformation?: OrderPaymentInformationResolvers<ContextType>;
  OrderPickupInformation?: OrderPickupInformationResolvers<ContextType>;
  OrderRequestReturnPayload?: OrderRequestReturnPayloadResolvers<ContextType>;
  OrderShippingLineGroup?: OrderShippingLineGroupResolvers<ContextType>;
  OrderSoldInformation?: OrderSoldInformationResolvers<ContextType>;
  OrderTransaction?: OrderTransactionResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PaymentDetails?: PaymentDetailsResolvers<ContextType>;
  PaymentIcon?: PaymentIconResolvers<ContextType>;
  PaymentIconImage?: PaymentIconImageResolvers<ContextType>;
  PaymentInstrument?: PaymentInstrumentResolvers<ContextType>;
  PaymentInstrumentBillingAddress?: PaymentInstrumentBillingAddressResolvers<ContextType>;
  PaymentInstrumentRemovePayload?: PaymentInstrumentRemovePayloadResolvers<ContextType>;
  PaymentInstrumentUpdateDefaultPayload?: PaymentInstrumentUpdateDefaultPayloadResolvers<ContextType>;
  PaymentSchedule?: PaymentScheduleResolvers<ContextType>;
  PaymentScheduleConnection?: PaymentScheduleConnectionResolvers<ContextType>;
  PaymentScheduleEdge?: PaymentScheduleEdgeResolvers<ContextType>;
  PaymentTerms?: PaymentTermsResolvers<ContextType>;
  PaymentTermsTemplate?: PaymentTermsTemplateResolvers<ContextType>;
  PaypalAccountEnablePayload?: PaypalAccountEnablePayloadResolvers<ContextType>;
  PaypalBillingAgreement?: PaypalBillingAgreementResolvers<ContextType>;
  PaypalTokenCreatePayload?: PaypalTokenCreatePayloadResolvers<ContextType>;
  PickupAddress?: PickupAddressResolvers<ContextType>;
  PricingPercentageValue?: PricingPercentageValueResolvers<ContextType>;
  PricingValue?: PricingValueResolvers<ContextType>;
  ProductSale?: ProductSaleResolvers<ContextType>;
  PublicOrder?: PublicOrderResolvers<ContextType>;
  PurchasingCompany?: PurchasingCompanyResolvers<ContextType>;
  PurchasingEntity?: PurchasingEntityResolvers<ContextType>;
  QueryRoot?: QueryRootResolvers<ContextType>;
  Refund?: RefundResolvers<ContextType>;
  RefundAgreement?: RefundAgreementResolvers<ContextType>;
  RemainingLineItemContainer?: RemainingLineItemContainerResolvers<ContextType>;
  RemainingLineItemContainerLineItem?: RemainingLineItemContainerLineItemResolvers<ContextType>;
  RemainingLineItemContainerLineItemConnection?: RemainingLineItemContainerLineItemConnectionResolvers<ContextType>;
  RemainingLineItemContainerLineItemEdge?: RemainingLineItemContainerLineItemEdgeResolvers<ContextType>;
  ResendGiftCardPayload?: ResendGiftCardPayloadResolvers<ContextType>;
  ResourcePermission?: ResourcePermissionResolvers<ContextType>;
  Return?: ReturnResolvers<ContextType>;
  ReturnAgreement?: ReturnAgreementResolvers<ContextType>;
  ReturnConnection?: ReturnConnectionResolvers<ContextType>;
  ReturnDecline?: ReturnDeclineResolvers<ContextType>;
  ReturnEdge?: ReturnEdgeResolvers<ContextType>;
  ReturnLineItem?: ReturnLineItemResolvers<ContextType>;
  ReturnLineItemConnection?: ReturnLineItemConnectionResolvers<ContextType>;
  ReturnLineItemEdge?: ReturnLineItemEdgeResolvers<ContextType>;
  ReturnSupportedReason?: ReturnSupportedReasonResolvers<ContextType>;
  ReturnUserError?: ReturnUserErrorResolvers<ContextType>;
  ReverseDelivery?: ReverseDeliveryResolvers<ContextType>;
  ReverseDeliveryConnection?: ReverseDeliveryConnectionResolvers<ContextType>;
  ReverseDeliveryDeliverable?: ReverseDeliveryDeliverableResolvers<ContextType>;
  ReverseDeliveryEdge?: ReverseDeliveryEdgeResolvers<ContextType>;
  ReverseDeliveryLabel?: ReverseDeliveryLabelResolvers<ContextType>;
  ReverseDeliveryShippingDeliverable?: ReverseDeliveryShippingDeliverableResolvers<ContextType>;
  ReverseDeliveryTracking?: ReverseDeliveryTrackingResolvers<ContextType>;
  Sale?: SaleResolvers<ContextType>;
  SaleConnection?: SaleConnectionResolvers<ContextType>;
  SaleEdge?: SaleEdgeResolvers<ContextType>;
  SaleTax?: SaleTaxResolvers<ContextType>;
  SalesAgreement?: SalesAgreementResolvers<ContextType>;
  SalesAgreementConnection?: SalesAgreementConnectionResolvers<ContextType>;
  SalesAgreementEdge?: SalesAgreementEdgeResolvers<ContextType>;
  ScriptDiscountApplication?: ScriptDiscountApplicationResolvers<ContextType>;
  ShippingLine?: ShippingLineResolvers<ContextType>;
  ShippingLineSale?: ShippingLineSaleResolvers<ContextType>;
  ShippingRate?: ShippingRateResolvers<ContextType>;
  Shop?: ShopResolvers<ContextType>;
  ShopAppLinksAndResources?: ShopAppLinksAndResourcesResolvers<ContextType>;
  ShopPayConfiguration?: ShopPayConfigurationResolvers<ContextType>;
  ShopPayCreditCardGetUpdateUrlPayload?: ShopPayCreditCardGetUpdateUrlPayloadResolvers<ContextType>;
  ShopPolicy?: ShopPolicyResolvers<ContextType>;
  StoreCreditAccount?: StoreCreditAccountResolvers<ContextType>;
  StoreCreditAccountConnection?: StoreCreditAccountConnectionResolvers<ContextType>;
  StoreCreditAccountCreditTransaction?: StoreCreditAccountCreditTransactionResolvers<ContextType>;
  StoreCreditAccountDebitRevertTransaction?: StoreCreditAccountDebitRevertTransactionResolvers<ContextType>;
  StoreCreditAccountDebitTransaction?: StoreCreditAccountDebitTransactionResolvers<ContextType>;
  StoreCreditAccountEdge?: StoreCreditAccountEdgeResolvers<ContextType>;
  StoreCreditAccountExpirationTransaction?: StoreCreditAccountExpirationTransactionResolvers<ContextType>;
  StoreCreditAccountTransaction?: StoreCreditAccountTransactionResolvers<ContextType>;
  StoreCreditAccountTransactionConnection?: StoreCreditAccountTransactionConnectionResolvers<ContextType>;
  StoreCreditAccountTransactionEdge?: StoreCreditAccountTransactionEdgeResolvers<ContextType>;
  StorefrontCustomerAccessTokenCreatePayload?: StorefrontCustomerAccessTokenCreatePayloadResolvers<ContextType>;
  SubscriptionAnchor?: SubscriptionAnchorResolvers<ContextType>;
  SubscriptionBillingCycle?: SubscriptionBillingCycleResolvers<ContextType>;
  SubscriptionBillingCycleConnection?: SubscriptionBillingCycleConnectionResolvers<ContextType>;
  SubscriptionBillingCycleEdge?: SubscriptionBillingCycleEdgeResolvers<ContextType>;
  SubscriptionBillingCycleSkipPayload?: SubscriptionBillingCycleSkipPayloadResolvers<ContextType>;
  SubscriptionBillingCycleSkipUserError?: SubscriptionBillingCycleSkipUserErrorResolvers<ContextType>;
  SubscriptionBillingCycleUnskipPayload?: SubscriptionBillingCycleUnskipPayloadResolvers<ContextType>;
  SubscriptionBillingCycleUnskipUserError?: SubscriptionBillingCycleUnskipUserErrorResolvers<ContextType>;
  SubscriptionBillingPolicy?: SubscriptionBillingPolicyResolvers<ContextType>;
  SubscriptionContract?: SubscriptionContractResolvers<ContextType>;
  SubscriptionContractActivatePayload?: SubscriptionContractActivatePayloadResolvers<ContextType>;
  SubscriptionContractBase?: SubscriptionContractBaseResolvers<ContextType>;
  SubscriptionContractCancelPayload?: SubscriptionContractCancelPayloadResolvers<ContextType>;
  SubscriptionContractChangePaymentInstrumentPayload?: SubscriptionContractChangePaymentInstrumentPayloadResolvers<ContextType>;
  SubscriptionContractConnection?: SubscriptionContractConnectionResolvers<ContextType>;
  SubscriptionContractEdge?: SubscriptionContractEdgeResolvers<ContextType>;
  SubscriptionContractFetchDeliveryOptionsPayload?: SubscriptionContractFetchDeliveryOptionsPayloadResolvers<ContextType>;
  SubscriptionContractPausePayload?: SubscriptionContractPausePayloadResolvers<ContextType>;
  SubscriptionContractSelectDeliveryMethodPayload?: SubscriptionContractSelectDeliveryMethodPayloadResolvers<ContextType>;
  SubscriptionContractStatusUpdateUserError?: SubscriptionContractStatusUpdateUserErrorResolvers<ContextType>;
  SubscriptionContractUserError?: SubscriptionContractUserErrorResolvers<ContextType>;
  SubscriptionDeliveryMethod?: SubscriptionDeliveryMethodResolvers<ContextType>;
  SubscriptionDeliveryMethodLocalDelivery?: SubscriptionDeliveryMethodLocalDeliveryResolvers<ContextType>;
  SubscriptionDeliveryMethodLocalDeliveryOption?: SubscriptionDeliveryMethodLocalDeliveryOptionResolvers<ContextType>;
  SubscriptionDeliveryMethodPickup?: SubscriptionDeliveryMethodPickupResolvers<ContextType>;
  SubscriptionDeliveryMethodPickupOption?: SubscriptionDeliveryMethodPickupOptionResolvers<ContextType>;
  SubscriptionDeliveryMethodShipping?: SubscriptionDeliveryMethodShippingResolvers<ContextType>;
  SubscriptionDeliveryMethodShippingOption?: SubscriptionDeliveryMethodShippingOptionResolvers<ContextType>;
  SubscriptionDeliveryOption?: SubscriptionDeliveryOptionResolvers<ContextType>;
  SubscriptionDeliveryOptionsResult?: SubscriptionDeliveryOptionsResultResolvers<ContextType>;
  SubscriptionDeliveryOptionsResultFailure?: SubscriptionDeliveryOptionsResultFailureResolvers<ContextType>;
  SubscriptionDeliveryOptionsResultSuccess?: SubscriptionDeliveryOptionsResultSuccessResolvers<ContextType>;
  SubscriptionDeliveryPolicy?: SubscriptionDeliveryPolicyResolvers<ContextType>;
  SubscriptionLine?: SubscriptionLineResolvers<ContextType>;
  SubscriptionLineConnection?: SubscriptionLineConnectionResolvers<ContextType>;
  SubscriptionLineEdge?: SubscriptionLineEdgeResolvers<ContextType>;
  SubscriptionLocalDeliveryOption?: SubscriptionLocalDeliveryOptionResolvers<ContextType>;
  SubscriptionMailingAddress?: SubscriptionMailingAddressResolvers<ContextType>;
  SubscriptionMonthDayAnchor?: SubscriptionMonthDayAnchorResolvers<ContextType>;
  SubscriptionPickupOption?: SubscriptionPickupOptionResolvers<ContextType>;
  SubscriptionPriceBreakdown?: SubscriptionPriceBreakdownResolvers<ContextType>;
  SubscriptionShippingOption?: SubscriptionShippingOptionResolvers<ContextType>;
  SubscriptionWeekDayAnchor?: SubscriptionWeekDayAnchorResolvers<ContextType>;
  SubscriptionYearDayAnchor?: SubscriptionYearDayAnchorResolvers<ContextType>;
  TaxExemptionDetails?: TaxExemptionDetailsResolvers<ContextType>;
  TaxInvoice?: TaxInvoiceResolvers<ContextType>;
  TaxLine?: TaxLineResolvers<ContextType>;
  TimelineEvent?: TimelineEventResolvers<ContextType>;
  TipSale?: TipSaleResolvers<ContextType>;
  TrackingInformation?: TrackingInformationResolvers<ContextType>;
  TransactionTypeDetails?: TransactionTypeDetailsResolvers<ContextType>;
  URL?: GraphQLScalarType;
  UiExtensionMetafield?: UiExtensionMetafieldResolvers<ContextType>;
  UiExtensionSessionToken?: UiExtensionSessionTokenResolvers<ContextType>;
  UnfulfilledDigitalLineItemContainer?: UnfulfilledDigitalLineItemContainerResolvers<ContextType>;
  UnfulfilledGiftCardLineItemContainer?: UnfulfilledGiftCardLineItemContainerResolvers<ContextType>;
  UnfulfilledLineItemContainer?: UnfulfilledLineItemContainerResolvers<ContextType>;
  UnfulfilledLineItemContainerCommonFields?: UnfulfilledLineItemContainerCommonFieldsResolvers<ContextType>;
  UnfulfilledPhysicalLineItemContainer?: UnfulfilledPhysicalLineItemContainerResolvers<ContextType>;
  UnitPrice?: UnitPriceResolvers<ContextType>;
  UnitPriceMeasurement?: UnitPriceMeasurementResolvers<ContextType>;
  UnknownSale?: UnknownSaleResolvers<ContextType>;
  UnsignedInt64?: GraphQLScalarType;
  UserErrorsBusinessContactUserErrors?: UserErrorsBusinessContactUserErrorsResolvers<ContextType>;
  UserErrorsBusinessLocationPaymentInstrumentUserErrors?: UserErrorsBusinessLocationPaymentInstrumentUserErrorsResolvers<ContextType>;
  UserErrorsCustomerAddressUserErrors?: UserErrorsCustomerAddressUserErrorsResolvers<ContextType>;
  UserErrorsCustomerEmailMarketingOptInUserErrors?: UserErrorsCustomerEmailMarketingOptInUserErrorsResolvers<ContextType>;
  UserErrorsCustomerEmailMarketingUserErrors?: UserErrorsCustomerEmailMarketingUserErrorsResolvers<ContextType>;
  UserErrorsCustomerUserErrors?: UserErrorsCustomerUserErrorsResolvers<ContextType>;
  UserErrorsPaymentInstrumentUserErrors?: UserErrorsPaymentInstrumentUserErrorsResolvers<ContextType>;
  UserErrorsPaypalTokenUserErrors?: UserErrorsPaypalTokenUserErrorsResolvers<ContextType>;
  UserErrorsResendGiftCardErrors?: UserErrorsResendGiftCardErrorsResolvers<ContextType>;
  UserErrorsStorefrontCustomerAccessTokenCreateUserErrors?: UserErrorsStorefrontCustomerAccessTokenCreateUserErrorsResolvers<ContextType>;
  WalletPaymentConfig?: WalletPaymentConfigResolvers<ContextType>;
  Weight?: WeightResolvers<ContextType>;
};
