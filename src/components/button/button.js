import React from 'react'
import { Link } from 'gatsby'

const Button = ({ className, url, children, ariaLabel, text }) => {

    return(

        <Link
            className={`button ${className}`}
            to={url}
            role="button"
            aria-label={ariaLabel}
        >
            {text}{children}
        </Link>

    )
}

export default Button