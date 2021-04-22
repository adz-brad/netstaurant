import React from 'react'
import ProductGrid from '../components/products/productGrid'
import ProductCard from '../components/products/productCard'

const Collection = ({ pageContext: { collection } } ) => {

    return(

        <div className="p-5 divide-primary-600 divide-y-2 mx-auto w-full">

            <div className="pb-1">
                <h1 className="text-5xl pb-2">{collection.title}</h1>
                <p className="text-lg">{collection.description}</p>
            </div>

            <ProductGrid>

            {collection.products.map((product) => {


                return(

                    <React.Fragment>
                    
                    <ProductCard
                        title={product.title}
                        description={product.description}
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