require('dotenv').config()
 
module.exports = {
  siteMetadata: {
    title: `Gatsby React-Bootstrap Starter`,
    description: `Adrenalize Digital - Gatsby React-Bootstrap Starter`,
    keywords: 'Gatsy, React, Bootstrap, Starer',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: process.env.GATSBY_SHOPIFY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        downloadImages: true,
        verbose: false,
      },
    },
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({
            stage: 3,
            features: {
              "nesting-rules": true,
            },
          }),
        ],
        sassOptions: {
          precision: 6,
        },
      },
    },
  ],
}
