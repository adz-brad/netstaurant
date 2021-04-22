const algoliaQuery = `
    {
        products: allShopifyProduct {
            nodes {
                objectID: shopifyId
                title
                shopifyId
                vendor
                productType
                tags
                handle
                descriptionHtml
                images{
                    localFile{
                        childImageSharp{
                            gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: BLURRED)
                        }
                    }
                }
                variants{
                    price
                    sku
                }
            }
        }
    }
`;

module.exports = algoliaQuery;