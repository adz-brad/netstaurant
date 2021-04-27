import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Seo from '../components/seo/SEO'

const FAQ = () => {

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
                pageTitle="FAQ"
                pageDescription="Frequently Asked Questions About Adrenalize e-Commerce"
                pageKeywords="FAQ, Adrenalize e-Commerce"
                pageImage={data.siteID.logo.localFile.url}
                pageUrl={sharingUrl}
            />        

        </div>
    )
}

export default FAQ