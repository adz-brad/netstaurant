import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Search from '../components/search/search'
import Seo from '../components/seo/SEO'

const Products = () => {

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

    return(

        <div>

            <Seo
                pageTitle="Products"
                pageDescription="Products For Sale on Adrenalize e-Commerce"
                pageKeywords="Products, For Sale, Adrenalize, e-Commerce, Adrenalize e-Commerce"
                pageImage={data.siteID.logo.localFile.url}
                pageUrl={sharingUrl}
            />   

            <Search/>
             
        </div>
    )
}

export default Products