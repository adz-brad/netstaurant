import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Seo from '../components/seo/SEO'

const NotFoundPage = () => {

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

            <div className="text-center py-10">

                <Seo
                    pageTitle="404"
                    pageDescription="404. This Page Does Not Exist."
                    pageKeywords="404, Adrenalize e-Commerce, Page Not Found"
                    pageImage={data.siteID.logo.localFile.url}
                    pageUrl={sharingUrl}
                />
            
                <span className="text-2xl font-semibold">Hmm... looks like there's nothing here! Check back at a later date to see when we add new items to this collection.</span>
            
            </div>

    )
}

export default NotFoundPage