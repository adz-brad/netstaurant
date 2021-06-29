import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Seo from '../components/seo/SEO'

const UsedInventory = () => {

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
                pageTitle="Used Product Inventory"
                pageDescription="Used products for sale on Netstaurant.ca"
                pageKeywords="Netstaurant, used products, restaurant equipment"
                pageImage={data.siteID.logo.localFile.url}
                pageUrl={sharingUrl}
            />

            <div className="border-b-2 border-primary-700 m-2 pb-1">
                <h1 className="text-3xl lg:text-5xl font-bold tracking-tight pb-2 font-headers">Used Equipment</h1>
                <p className="text-base md:text-lg leading-snug font-content">Browse our collection of top quality used restaurant equipment to find a great deal today!</p>
            </div> 

        </div>

    )
}

export default UsedInventory