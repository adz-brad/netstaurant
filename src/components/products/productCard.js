import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../button/button'

const ProductCard = ({className, title, image, price, url, key}) => {

    return(

        <li key={key} className={`m-2 p-2 w-auto flex flex-col items-center rounded-sm shadow-md ${className}`}>

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
            
            <span className="text-center pt-3 font-bold text-xl">{title}</span>
            
            <span className="p-3 mt-auto font-medium text-2xl text-green-600">$ {price}</span>

            <Button
                className="mt-auto mb-3 p-2 text-white"
                url={`/products/${url}`}
                ariaLabel={`Link to ${title} product page`}
                text="View Product"
            />
            
        </li>

    )
}

export default ProductCard

