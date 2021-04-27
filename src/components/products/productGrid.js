import React from 'react'

const ProductGrid = ({children}) => {

    return(
        <ul className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 lg:gap-3 py-5">
            {children}
        </ul>
    )
}

export default ProductGrid