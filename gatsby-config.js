require('dotenv').config()
 
module.exports = {
  flags: {
    FAST_DEV: true,
    FAST_REFRESH: true,
  },
  siteMetadata: {
    title: `Adrenalize eCommerce Starter`,
    description: `Adrenalize Digital - Gatsby-Tailwind-Shopify e-Commerce Starter`,
    keywords: 'Gatsby, Tailwind, Shopify, Starter',
    siteUrl: 'https://www.adrenalizedigital.ca',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Adrenalize e-Commerce',
        short_name: `Adrenalize e-Commerce`,
        background_color: `#111`,
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
