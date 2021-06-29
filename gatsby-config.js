require('dotenv').config()
 
module.exports = {
  siteMetadata: {
    title: `Netstaurant Restaurant Equipment`,
    description: `Online Restaurant Equipment Supply - Top Quality Products with Fast, Canada-wide Shipping`,
    keywords: 'Netstaurant, Online, Restaurant, Equipment, Supply',
    siteUrl: 'https://www.netstaurant.ca',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Netstaurant Restaurant Equipment',
        short_name: `Netstaurant`,
        background_color: `#B91C1C`,
        lang: `en`,
        theme_color: `#B91C1C`,
        start_url: '/',
        display: `standalone`,
        cache_busting_mode: 'none',
        icon:'src/assets/images/adrenalize-ecomm-logo.png',
        include_favicon: true,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    `gatsby-plugin-preact`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-mdx`,
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
