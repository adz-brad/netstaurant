import React from 'react'
import ProductGrid from '../components/products/productGrid'
import ProductCard from '../components/products/productCard'
import Seo from '../components/seo/SEO'

const Collection = ({ pageContext: { collection } } ) => {

    const sharingUrl = typeof window !== 'undefined' ? window.location.href : '';

    return(

        <div className="p-2 lg:p-4 divide-primary-600 divide-y-2 mx-auto w-full">

            <Seo
                pageTitle={collection.title}
                pageDescription={collection.description}
                pageKeywords={`${collection.title}, products`}
                pageImage={collection.image === null ? "No Image" : `${collection.image.localFile.url}`}
                pageUrl={sharingUrl}
            />

            <div className="pb-1">
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-medium pb-2">{collection.title}</h1>
                <p className="text-base md:text-lg leading-snug">{collection.description}</p>
            </div>

            <ProductGrid>

            {collection.products.map((product) => {


                return(

                    <React.Fragment>
                    
                    <ProductCard
                        title={product.title}
                        image={product.images}
                        price={`${product.variants.map((variant) => variant.price )}`}
                        url={product.handle}
                        key={product.shopifyId}
                    />   

                    </React.Fragment>                        
                )
            })}

            </ProductGrid>
            
        </div>
    
    )
}


export default Collection