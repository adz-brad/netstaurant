import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Seo from '../components/seo/SEO'

const Policies = () => {

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
                pageTitle="Policies"
                pageDescription="Policies for Adrenalize e-Commerce"
                pageKeywords="Policies, Adrenalize e-Commerce"
                pageImage={data.siteID.logo.localFile.url}
                pageUrl={sharingUrl}
            />  

        </div>
    )
}

export default Policies