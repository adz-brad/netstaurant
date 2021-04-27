import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
 
const Seo = ({ children, pageDescription, pageTitle, pageImage, pageUrl, pageKeywords }) => {
  
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
          siteUrl
          title
          keywords
        }
      }
    }
  `);

  const siteData = data.site.siteMetadata;

  return (

    <React.Fragment>

      <Helmet
        defaultTitle={siteData.title}
        htmlAttributes={{ lang: 'en' }}
        titleTemplate={`${siteData.title} | ${pageTitle}`}
      >

        <title>{pageTitle || pageDescription}</title>

        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />

        {/* FB Meta Tags */}

        <meta property="og:title" content={pageTitle}/>
        <meta property="og:description" content={pageDescription}/>
        <meta property="og:image" content={pageImage }/>
        <meta property="og:url" content={pageUrl} />

        {/* Twitter Meta Tags */}

        <meta name="twitter:title" content={pageTitle}/>
        <meta name="twitter:description" content={pageDescription}/>
        <meta name="twitter:image" content={pageImage}/>
        <meta name="twitter:card" content="summary_large_image"/>

        {children}
        
      </Helmet>
      
    </React.Fragment>

  );
}

export default Seo;
