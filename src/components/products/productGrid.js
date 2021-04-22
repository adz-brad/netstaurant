import React from 'react'

const ProductGrid = ({children}) => {

    return(
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 py-5">
            {children}
        </ul>
    )
}

export default ProductGrid