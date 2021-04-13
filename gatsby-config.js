require('dotenv').config()
 
module.exports = {
  siteMetadata: {
    title: `Gatsby React-Bootstrap Starter`,
    description: `Adrenalize Digital - Gatsby React-Bootstrap Starter`,
    keywords: '',
    siteUrl: '',
  },
  plugins: [
    'gatsby-plugin-mdx',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-algolia`,
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
        precision: 6,
      },
    },
  ],
}
