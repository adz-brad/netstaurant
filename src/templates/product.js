import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../components/button/button'
import { SRLWrapper } from "simple-react-lightbox";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Product = ({ pageContext: { product } }) => {

    return(

        <div className="py-5 mx-auto w-full xl:w-4/5">

            <h1 className="text-4xl w-full text-center py-5">{product.title}</h1>

            <div className="flex flex-col lg:flex-row py-5">     

                <div className="gallery w-full lg:w-5/8">

                    <SRLWrapper>
                    
                        <div className="w-full p-5">

                            {product.images.slice(0, 1).map((image) => {

                            return(
                                <GatsbyImage image={image.localFile.childImageSharp.gatsbyImageData} className="w-full cursor-pointer rounded-sm shadow-md" alt={`${product.title} Image`} />
                            )
                            })}

                        </div>

                        <div className="grid grid-cols-4 gap-2 px-5">
                        
                            {product.images.slice(1, 5).map((image) => {

                            return(
                                <GatsbyImage image={image.localFile.childImageSharp.gatsbyImageData} className="cursor-pointer rounded-sm shadow-md" alt={`${product.title} Image`} />
                            )
                            })}

                        </div>

                    </SRLWrapper>
                    
                </div>

                <div className="flex flex-col w-full lg:w-3/8 p-5">

                    <h3 className="border-b-2 border-primary-600 pb-1 mb-5 text-3xl font-bold">Product Details</h3>
                    <div className="flex flex-row items-center pb-1"><span className="text-xl font-medium pr-3">Vendor:</span><span>{product.vendor}</span></div>
                    <div className="flex flex-row items-center pb-1"><span className="text-xl font-medium pr-3">Product Type:</span><span>{product.productType}</span></div>
                    <div className="flex flex-row items-center pb-3"><span className="text-xl font-medium pr-3">Model:</span><span>{product.id}</span></div>

                    <h3 className="border-b-2 border-primary-600 py-1 mb-5 text-3xl font-bold">Product Description</h3>

                    <div dangerouslySetInnerHTML={{__html: `${product.descriptionHtml}`}}/>

                    <span className="text-2xl font-medium text-green-600 text-center my-auto p-5">${product.priceRange.minVariantPrice.amount}</span>

                    <Button
                        className="my-3 p-3 mx-auto text-white text-2xl font-semibold rounded-md shadow-sm bg-primary-600 hover:bg-primary-700"
                        ariaLabel={`Add ${product.title} to the cart`}
                        text="Add To Cart"
                    />
                        
                </div>  
                
            </div>

                <Tabs className="flex flex-col text-center md:text-left md:p-5">

                    <TabList className="md:border-b-2 md:border-primary-600 pt-5 mb-5 text-3xl font-bold flex flex-col md:flex-row cursor-pointer">

                        <Tab className="flex flex-grow"><h4 className="m-auto text-2xl p-2">Product Specs</h4></Tab>
                        <Tab className="flex flex-grow"><h4 className="m-auto text-2xl p-2">Shipping</h4></Tab>
                        <Tab className="flex flex-grow"><h4 className="m-auto text-2xl p-2">Warranty</h4></Tab>
                        <Tab className="flex flex-grow"><h4 className="m-auto text-2xl p-2">Financing</h4></Tab>

                    </TabList>
         
                    <TabPanel className="text-xl">
                            Product Specifications
                    </TabPanel>

                    <TabPanel className="text-xl">
                            Shipping Information
                    </TabPanel>

                    <TabPanel className="text-xl">
                            Warranty Information
                    </TabPanel>

                    <TabPanel className="text-xl">
                            Financing Options
                    </TabPanel>

                </Tabs>
                   

        </div>
    )
}

export default Product