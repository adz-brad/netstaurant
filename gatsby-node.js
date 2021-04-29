 const path = require('path')

 exports.createPages = async ({ actions: { createPage }, graphql }) => {

    const { data } = await graphql(
        `
            {
            collections: allShopifyCollection(filter: {products: {elemMatch: {availableForSale: {eq: true}}}}) {
                edges {
                  collection: node {
                    id
                    title
                    description
                    handle
                    image{
                      localFile{
                        url
                        childImageSharp {
                          gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: TRACED_SVG)
                        }
                      }
                    }
                    products {
                      title
                      shopifyId
                      description
                      descriptionHtml
                      productType
                      vendor
                      tags
                      handle
                      variants{
                        price
                      }
                      priceRange {
                        minVariantPrice {
                          amount
                        }
                      }
                      images {
                        localFile {
                          url
                          childImageSharp {
                            gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: TRACED_SVG)
                          }
                        }
                      }
                    }
                  }
                }
              },
              products: allShopifyProduct(filter: {availableForSale: {eq: true}}) {
                edges {
                  product: node {
                    title
                    vendor
                    description
                    descriptionHtml
                    shopifyId
                    handle
                    tags
                    productType
                    availableForSale
                    options {
                      id
                      name
                      values
                    }
                    variants {
                      id
                      title
                      price
                      weight
                      weightUnit
                      sku
                      availableForSale
                      shopifyId
                      selectedOptions {
                        name
                        value
                      }
                    }
                    priceRange {
                      minVariantPrice {
                        amount
                        currencyCode
                      }
                      maxVariantPrice {
                        amount
                        currencyCode
                      }
                    }
                    images {
                      localFile {
                        url
                        childImageSharp {
                          gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: TRACED_SVG)
                        }
                      }
                    }
                  }
                }
              },
              auctionItems: allGraphCmsAuctionItem {
                edges {
                  item: node {
                    productName
                    auctionStart
                    auctionEnd
                    productSlug
                    bidIncrement
                    productDescription{
                      text
                      markdownNode {
                        childMdx {
                          body
                        }
                      }
                    }
                    productImage{
                      localFile{
                        childImageSharp{
                          gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: TRACED_SVG)
                        }
                      }
                    }
                    updatedAt
                    remoteId
                    bids {
                      name
                      bidAmount
                    }
                  }
                }
              }
            }
        `
    )

    data.collections.edges.forEach(({ collection }) => {
        createPage({
            component: path.resolve('./src/templates/collection.js'),
            context: {
                collection,
            },
            path: `/${collection.handle}`,
        })
    })

    data.products.edges.forEach(({ product }) => {
        createPage({
          component: path.resolve('./src/templates/product.js'),
          context: {
            product,
          },
          path: `/products/${product.handle}`,
        })
    })

    data.auctionItems.edges.forEach(({ item }) => {
        createPage({
          component: path.resolve('./src/templates/auctionItem.js'),
          context: {
            item,
          },
          path: `/auction/${item.productSlug}`,
        })
    })

 }
