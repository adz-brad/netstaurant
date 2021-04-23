import React, { useEffect } from 'react'
import { StyledBody } from './components.styled'

const Header = ({ children }) => {
    return(
        <header>
            {children}
        </header>
    )
}

const PageWrapper = ({ children }) => {

    useEffect(() => window.scrollTo(0, 0), [])

    return(
        <StyledBody>
            <main>{children}</main>
        </StyledBody>
    )
}

const Footer = ({ children }) => {
    return(
        <footer>
            {children}
        </footer>
    )
}

export { Header, PageWrapper, Footer }