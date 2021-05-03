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
import LazyLoad from 'react-lazyload';
 
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
        subheader
        caption
        buttonText
        buttonLink
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
          shopifyId
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
  const landing = data.graphCmsLandingPage;

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
              <BgImage image={bgImage} className="landing-bg" loading="eager">
                <div className="landing-caption">
                  <h1 className="text-white font-bold text-3xl tracking-tight md:text-5xl lg:text-7xl filter drop-shadow-lg mt-auto border-b-2 lg:border-b-4 border-primary-700">{landing.header}</h1> 
                  <h2 className="text-white text-center font-medium text-xl md:text-2xl lg:text-3xl filter drop-shadow-lg py-1 leading-tight tracking-tight">{landing.subheader}</h2>
                  <span className="text-white font-normal text-lg md:text-xl py-4 max-w-6xl leading-tight font-content">{landing.caption}</span>
                  <Button className="my-auto px-4 py-2 lg:py-3 text-2xl lg:text-3xl font-medium shadow-lg" text={landing.buttonText} url={landing.buttonLink} />
                </div>                      
              </BgImage>          
            </div>


            <div className="flex flex-col justify-center px-1 py-3">

              <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-2 xl:grid-cols-4 cursor-pointer">

                <Link className="card" to="/products" alt="Link to Netstaurant products page">
                  <span className="card-header">Quality Products</span>
                  <Icon icon={faTags} className="card-icon"/>
                  <span className="card-caption">You're sure to find what you're looking for in our extensive selection of top-quality products.</span>
                </Link>

                <Link className="card" to="/faq" alt="Link to Netstaurant FAQ page">
                  <span className="card-header">Superior Service</span>
                  <Icon icon={faUserCheck} className="card-icon"/>
                  <span className="card-caption">We go beyond to ensure you have the best customer experience & support possible.</span>
                </Link>

                <Link className="card" to="/shipping" alt="Link to Netstaurant shipping information page">
                  <span className="card-header">Fast Shipping</span>
                  <Icon icon={faShippingFast} className="card-icon"/>
                  <span className="card-caption">Speedy shipping options to make sure you receive your products right when you need them.</span>
                </Link>

                <Link className="card" to="/financing" alt="Link to Netstaurant financing page">
                  <span className="card-header">Financing Available</span>
                  <Icon icon={faHandHoldingUsd} className="card-icon"/>
                  <span className="card-caption">We work together with top industry financiers to help make our products available to businesses of all types.</span>
                </Link>
                
              </div>

              <div className="p-2 lg:p-4 divide-primary-600 divide-y-2 mx-auto w-full">

                <div className="pb-1">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight pb-2">Featured Products</h1>
                    <p className="text-base md:text-lg lg:text-xl leading-snug font-content">Check out our latest selection of featured products!</p>
                </div>

                <ProductGrid>

                {data.products.nodes.map((product) => {

                    return(
                        

                          
                          <ProductCard
                              title={product.title}
                              image={product.images}
                              price={`${product.variants.map((variant) => variant.price)}`}
                              url={product.handle}
                              key={product.shopifyId}
                          />   

                                        
                    )
                })}

                </ProductGrid>
                
            </div>

            <div className="p-2 lg:p-4 divide-primary-600 divide-y-2 mx-auto w-full">

                <div className="pb-1">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight pb-2">Browse By Category</h1>
                    <p className="text-base md:text-lg lg:text-xl leading-snug font-content">Browse our product listings by category.</p>
                </div>

                <ProductGrid>

                {data.collections.nodes.map((collection) => {

                  return(

                    <LazyLoad key={collection.id} overflow={true}>
                      <Link className="md:m-2 p-2 rounded-md flex flex-col items-center transform hover:scale-105" to={collection.handle} alt={`Link to ${collection.title} page`}>
                          <GatsbyImage image={collection.image.localFile.childImageSharp.gatsbyImageData} className="rounded-md shadow-md w-full" alt={`${collection.title} Image`}/>
                          <span className="text-xl sm:text-2xl font-semibold tracking-tight py-2">{collection.title}</span>
                      </Link>
                    </LazyLoad>
                  )
                })}

                </ProductGrid>
                
            </div>

          </div>

      </React.Fragment>

    )
  }

export default Index
