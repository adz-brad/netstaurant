import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import AuctionCard from '../components/auction/auctionCard'
import Seo from '../components/seo/SEO'


const Auction = () => {

    const data = useStaticQuery(graphql`
    {
        siteID: graphCmsSiteId {
            logo {
            localFile {
                url
                }
            }
        },
        auctionItems: allGraphCmsAuctionItem {
            nodes{
                productName
                auctionStart
                auctionEnd
                productSlug
                bidIncrement
                productDescription{
                    text
                    markdownNode {
                        childMdx {
                            body
                        }
                    }
                    }
                productImage{
                    localFile{
                        childImageSharp{
                            gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: TRACED_SVG)
                        }
                    }
                }
                updatedAt
                remoteId
                bids {
                    name
                    bidAmount
                }
            }
        }
    }
	`)

    const sharingUrl = typeof window !== 'undefined' ? window.location.href : '';

    return(

        <div>

            <Seo
                pageTitle="Live Auction"
                pageDescription="Live Product Auction on Adrenalize e-Commerce"
                pageKeywords="Auction, Live, Products, For Sale, Adrenalize, e-Commerce, Adrenalize e-Commerce"
                pageImage={data.siteID.logo.localFile.url}
                pageUrl={sharingUrl}
            />   

            <h1 className="text-3xl font-bold border-b-2 border-primary-700 pb-1 m-2">Adrenalize e-Commerce Live Auction</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2">

                {data.auctionItems.nodes.map((auctionItem) => {

                    return(

                        <AuctionCard
                            itemName={auctionItem.productName}
                            itemImage={auctionItem.productImage.localFile.childImageSharp.gatsbyImageData}
                            itemLink={auctionItem.productSlug}
                            itemID={auctionItem.remoteId}
                            auctionEnd={auctionItem.auctionEnd}
                        />

                    )
                })}

            </div>
             
        </div>
    )
}

export default Auction