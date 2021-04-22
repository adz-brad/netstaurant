require('dotenv').config()
 
module.exports = {
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
    FAST_REFRESH: true,
  },
  siteMetadata: {
    title: `Gatsby React-Bootstrap Starter`,
    description: `Adrenalize Digital - Gatsby React-Bootstrap Starter`,
    keywords: 'Gatsy, React, Bootstrap, Starer',
    siteUrl: 'http://localhost:8000',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: process.env.GATSBY_SHOPIFY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        downloadImages: true,
        verbose: false,
      },
    },
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GATSBY_GRAPHCMS_ENDPOINT,
        token: process.env.GATSBY_GRAPHCMS_TOKEN,
        buildMarkdownNodes: true,
        downloadLocalImages: true,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_API_KEY,
        queries: [
          {
            query: require('./src/utils/algoliaQuery'),
            transformer: require('./src/utils/algoliaTransformer'),
          },
        ],
      }
    },
  ],
}
