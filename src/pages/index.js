import React from "react"
import { graphql, useStaticQuery } from 'gatsby'
import Seo from '../components/seo/SEO'
 
const Index = () => {

  const data = useStaticQuery(graphql`
  {
      siteID: graphCmsSiteId {
          logo {
          localFile {
              url
              }
          }
      }
  }
`)

  const sharingUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (

      <div className="">

          <Seo
              pageTitle="Adrenalize e-Commerce"
              pageDescription="Home Page for Adrenalize e-Commerce"
              pageKeywords="Home, Adrenalize e-Commerce"
              pageImage={data.siteID.logo.localFile.url}
              pageUrl={sharingUrl}
            />   
                
      </div>

    )
  }

export default Index
