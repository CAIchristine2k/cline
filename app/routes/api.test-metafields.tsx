import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  // Test query to check if metafields are returned
  const TEST_QUERY = `#graphql
    query TestMetafields @inContext(language: FR) {
      products(first: 1, query: "title:MELODIE OR title:TAYLOR") {
        nodes {
          id
          title
          variants(first: 3) {
            nodes {
              id
              title
              selectedOptions {
                name
                value
              }
              # Test MULTIPLE possible metafields
              couleurCustom: metafield(namespace: "custom", key: "couleur") {
                namespace
                key
                value
                type
                reference {
                  ... on Metaobject {
                    id
                    type
                    handle
                    fields {
                      key
                      value
                      type
                      reference {
                        ... on MediaImage {
                          id
                          image {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
              couleurShopify: metafield(namespace: "shopify", key: "couleur") {
                namespace
                key
                value
                type
                reference {
                  ... on Metaobject {
                    id
                    type
                    handle
                    fields {
                      key
                      value
                      type
                      reference {
                        ... on MediaImage {
                          id
                          image {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
              colorPattern: metafield(namespace: "custom", key: "color_pattern") {
                namespace
                key
                value
                type
                reference {
                  ... on Metaobject {
                    id
                    type
                    handle
                    fields {
                      key
                      value
                      type
                      reference {
                        ... on MediaImage {
                          id
                          image {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
              variantImgs: metafield(namespace: "custom", key: "variant_imgs") {
                namespace
                key
                value
                type
                reference {
                  ... on Metaobject {
                    id
                    type
                    handle
                    fields {
                      key
                      value
                      type
                      reference {
                        ... on MediaImage {
                          id
                          image {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const result = await storefront.query(TEST_QUERY);

    return new Response(JSON.stringify(result, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({error: String(error)}, null, 2), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
