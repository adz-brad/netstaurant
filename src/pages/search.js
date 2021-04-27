import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Search from '../components/search/search'
import Seo from '../components/seo/SEO'

const SearchPage = () => {

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

        <div className="w-full h-full m-0">

            <Seo
                pageTitle="Product Search"
                pageDescription="Product Search for Adrenalize e-Commerce Products"
                pageKeywords="Search, Products, Adrenalize, e-Commerce"
                pageImage={data.siteID.logo.localFile.url}
                pageUrl={sharingUrl}
            />        

            <Search/>

        </div>
    )
}

export default SearchPage