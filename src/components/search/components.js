import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../button/button'
import { StyledFilter, StyledToggle } from './components.styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { bool, func } from 'prop-types'

const SearchHit = ({ hit: {objectID, title, handle, sku, productType, vendor, images } }) => (

    <article key={objectID} className="flex flex-row">

        <Link className="w-2/5 m-auto" to={`/products/${handle}`} alt={title}>
        {images.slice(0, 1).map((image) => {
            return(<GatsbyImage image={image} alt={title}/>
        )})}
        </Link>

        <div className="flex flex-col w-3/5">

            <span className="py-2 font-semibold text-lg lg:text-xl leading-tight">{title}</span>

            <div className="flex flex-row items-center text-base lg:text-lg leading-tight">
                <span className="font-medium mr-1">Product Type:</span><span>{productType}</span>
            </div>

            <div className="flex flex-row items-center text-base lg:text-lg leading-tight">
                <span className="font-medium mr-1">Vendor:</span><span>{vendor}</span>
            </div>

            <div className="flex flex-row items-center text-base lg:text-lg leading-tight pb-2">
                <span className="font-medium mr-1">Model/Sku:</span><span>{sku}</span>
            </div>

            <Button
                className="mx-auto mb-2 mt-auto px-2 py-1 text-lg md:text-xl md:px-3 md:py-2"
                text="View Product"
                url={`/products/${handle}`}
            />

        </div>
        
    </article>

);

const FilterOverlay = ({children, className, open }) => {

    return(

        <StyledFilter open={open} className={className}>
            {children}
        </StyledFilter>

    )
}

FilterOverlay.propTypes = {
    open: bool.isRequired,
};

const FilterToggle = ({className, open, setOpen}) => {

    return(

        <div onClick={() => setOpen(!open)} onkeydown={() => setOpen(!open)} role="button" aria-pressed="false" tabindex="0" className={className}>
            <span className="text-lg md:text-xl font-semibold ml-auto mr-2">Search Filters</span>
            <StyledToggle open={open}>
                <FontAwesomeIcon icon={faArrowAltCircleRight} className="text-xl" />
            </StyledToggle>
        </div>
    )
}

FilterToggle.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
};

export { SearchHit, FilterOverlay, FilterToggle };