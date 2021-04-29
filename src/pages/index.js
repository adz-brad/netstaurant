import React from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { BgImage } from "gbimage-bridge"
import Seo from '../components/seo/SEO'
import Button from '../components/button/button'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTags, faUserCheck, faShippingFast, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../components/products/productCard'
import ProductGrid from '../components/products/productGrid'
 
const Index = () => {

  const data = useStaticQuery(graphql`
  {
      siteID: graphCmsSiteId {
          logo {
          localFile {
              url
              }
          }
      },
      graphCmsLandingPage {
        header
        caption
        image{
          localFile{
            childImageSharp{
              gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
      },
      products: allShopifyProduct(filter: {availableForSale: {eq: true}}) {
        nodes {
            title
            handle 
            shopifyId
            variants {
              price
            }
            images {
              localFile {
                url
                childImageSharp {
                  gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: TRACED_SVG)
                }
              }
            }
          }
      },
      collections: allShopifyCollection(
        filter: {title: {in: ["Cooking Equipment", "Refrigeration", "Beverage", "Food Prep", "Dishwashing", "Storage", "Workspaces", "Smallwares"]}}) {
        nodes {
          title
          handle
          image {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      },
  }
`)

  const bgImage = getImage(data.graphCmsLandingPage.image.localFile.childImageSharp.gatsbyImageData);

  const sharingUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (

      <React.Fragment>

          <Seo
              pageTitle="Adrenalize e-Commerce"
              pageDescription="Home Page for Adrenalize e-Commerce"
              pageKeywords="Home, Adrenalize e-Commerce"
              pageImage={data.siteID.logo.localFile.url}
              pageUrl={sharingUrl}
          />


            <div className="landing">            
              <BgImage image={bgImage} className="landing-bg">
                <div className="landing-caption">
                  <h1 className="text-white font-bold text-7xl filter drop-shadow-lg mt-auto border-b-4 border-primary-700">{data.graphCmsLandingPage.header}</h1> 
                  <h2 className="text-white font-medium text-3xl filter drop-shadow-lg">Welcome to your business' new home on the web!</h2>
                  <span className="text-white font-normal text-xl py-4 max-w-6xl">We're so happy you chose to work with us, because just like you, we're in the business of helping others. At Adrenalize Digital, we build more than just websites - we build highly-functinal digital commerce apps that are designed to deliver. So go on then, have a look around and let us know what you think! </span>
                  <Button className="my-auto px-4 py-3 text-3xl font-medium shadow-lg" text="Find Out More"/>
                </div>                      
              </BgImage>          
            </div>


            <div className="flex flex-col justify-center p-2">

              <div className="grid grid-cols-2 lg:grid-cols-4 cursor-pointer">

                <div className="card">
                  <span className="card-header">Quality Products</span>
                  <Icon icon={faTags} className="card-icon"/>
                  <span className="card-caption">You're sure to find what you're looking for in our extensive selection of top-quality products.</span>
                </div>

                <div className="card">
                  <span className="card-header">Superior Service</span>
                  <Icon icon={faUserCheck} className="card-icon"/>
                  <span className="card-caption">We go beyond to ensure you have the best customer experience & support possible.</span>
                </div>

                <div className="card">
                  <span className="card-header">Fast Shipping</span>
                  <Icon icon={faShippingFast} className="card-icon"/>
                  <span className="card-caption">Speedy shipping options to make sure you receive your products right when you need them.</span>
                </div>

                <div className="card">
                  <span className="card-header">Financing Available</span>
                  <Icon icon={faHandHoldingUsd} className="card-icon"/>
                  <span className="card-caption">We work together with top industry financiers to help make our products available to businesses of all types.</span>
                </div>
                
              </div>

              <div className="p-2 lg:p-4 divide-primary-600 divide-y-2 mx-auto w-full">

                <div className="pb-1">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-medium pb-2">Featured Products</h1>
                    <p className="text-base md:text-lg lg:text-xl leading-snug">Check out our latest selection of featured products!</p>
                </div>

                <ProductGrid>

                {data.products.nodes.map((product) => {

                    return(

                        <React.Fragment>
                        
                        <ProductCard
                            title={product.title}
                            image={product.images}
                            price={`${product.variants.map((variant) => variant.price)}`}
                            url={product.handle}
                            key={product.shopifyId}
                        />   

                        </React.Fragment>                        
                    )
                })}

                </ProductGrid>
                
            </div>

            <div className="p-2 lg:p-4 divide-primary-600 divide-y-2 mx-auto w-full">

                <div className="pb-1">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-medium pb-2">Browse By Category</h1>
                </div>

                <ProductGrid>

                {data.collections.nodes.map((collection) => {

                  return(
                    <Link className="m-2 p-2 rounded-md flex flex-col items-center transform hover:scale-105" to={collection.handle} alt="">
                        <GatsbyImage image={collection.image.localFile.childImageSharp.gatsbyImageData} className="rounded-md shadow-md w-full" alt=""/>
                        <span className="text-xl font-medium">{collection.title}</span>
                    </Link>
                  )
                })}

                </ProductGrid>
                
            </div>

          </div>

      </React.Fragment>

    )
  }

export default Index
