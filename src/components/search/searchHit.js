import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../button/button'

const SearchHit = ({ hit: {objectID, title, handle, tags, vendor, images } }) => (

    <article key={objectID} className="flex flex-col text-center">

    {images.slice(0, 1).map((image) => {
        return(<GatsbyImage image={image}/>
    )})}

        <span>{title}</span>
        <span>{vendor}</span>

        <Button
            className="py-2 px-5 text-white"
            text="View Product"
            url={`/products/${handle}`}
        />

    </article>

);

export default SearchHit;