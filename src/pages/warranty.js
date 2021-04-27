import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Seo from '../components/seo/SEO'

const Warranty = () => {

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
                pageTitle="Warranty Information"
                pageDescription="Warranty Information for Adrenalize e-Commerce Products"
                pageKeywords="Warranty, Information, Adrenalize, e-Commerce"
                pageImage={data.siteID.logo.localFile.url}
                pageUrl={sharingUrl}
            />    

        </div>

    )
}

export default Warranty