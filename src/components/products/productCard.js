import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../button/button'

const ProductCard = ({className, title, image, price, url, key}) => {

    return(

        <li key={key} className={`p-1 w-auto flex flex-col items-center rounded-sm shadow-md transform hover:scale-105 ${className}`}>

            <Link 
            to={`/products/${url}`}
            role="button"
            aria-label={`Link to ${title} product page`}
            >

                {image.slice(0, 1).map((image) => {

                return(
                    <GatsbyImage image={image.localFile.childImageSharp.gatsbyImageData} className="w-full" alt={`${title} Image`} />
                )
                })}

            </Link>
            
            <span className="text-center pt-3 font-semibold text-lg lg:text-xl leading-tight">{title}</span>
            
            <span className="p-3 mt-auto font-medium text-xl lg:text-2xl text-green-600">$ {price}</span>

            <Button
                className="mt-auto mb-3 px-2 py-1 text-lg md:text-xl md:px-3 md:py-2"
                url={`/products/${url}`}
                ariaLabel={`Link to ${title} product page`}
                text="View Product"
            />
            
        </li>

    )
}

export default ProductCard

