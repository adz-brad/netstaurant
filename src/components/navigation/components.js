import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { StyledToggle, StyledMenu, StyledCartOverlay } from './components.styled';
import { bool, func } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import StoreContext from '../context/StoreContext'
import LineItem from '../cart/LineItem'
  
    const NavLogo = ( { homeUrl, title, caption, logoImage }) => {

        return(
        
            <div className="py-2">

                <Link 
                    className="flex flex-row items-center"
                    to={homeUrl} 
                    alt="Home"
                >

                    <GatsbyImage 
                        className="w-16 lg:w-24"
                        image={logoImage} 
                        alt={`${title} Logo`} 
                    />

                    <div className="flex flex-col ml-3">
                        <h1 className="text-xl lg:text-4xl font-bold text-white leading-none">{title}</h1>
                        <h2 className="text-md lg:text-xl font-medium text-white leading-none">{caption}</h2>
                    </div>


                </Link>

            </div>
        
        )
    }

    const MenuToggle = ({open, setOpen}) => {
    
        return(

            <StyledToggle onClick={() => setOpen(!open)} open={open} className="toggle-button ml-3 flex lg:hidden" role="button" aria-label="Menu Toggle">
                <div />
                <div />
                <div />
            </StyledToggle>               
        )
    }

    MenuToggle.propTypes = {
        open: bool.isRequired,
        setOpen: func.isRequired,
    };

    const NavMenu =({className, children, open}) =>{

        return(
            
            <StyledMenu open={open} className={className}>
                    {children}           
            </StyledMenu>
        
        )
    }

    NavMenu.propTypes = {
        open: bool.isRequired,
    }

    const CartToggle = ({open, setOpen}) => {

        return(
            <FontAwesomeIcon icon={faShoppingCart} onClick={() => setOpen(!open)} open={open} className="text-white text-2xl lg:text-3xl m-1 cursor-pointer"/>
        )
    }

    CartToggle.propTypes = {
        open: bool.isRequired,
        setOpen: func.isRequired,
    };

    const CartOverlay = ({className, open, setOpen }) => {

        const {
            store: { checkout },
            
        } = useContext(StoreContext)
        
        const handleCheckout = () => {
            window.open(checkout.webUrl)
        }
        
        const line_items = checkout.lineItems.map(line_item => {
            return <LineItem key={line_item.id.toString()} line_item={line_item} />
        })

            return(

                <StyledCartOverlay open={open} className={className} >

                    <div className="border-b-2 border-primary-600 flex flex-row items-center">        
                        <h1 className="text-3xl md:text-4xl font-bold pb-1">Your Cart</h1>
                        <FontAwesomeIcon icon={faTimesCircle} onClick={() => setOpen(!open)} open={open} className="text-primary-600 text-xl md:text-2xl m-1 ml-auto cursor-pointer"/>
                    </div>

                    <div className="py-2">
                    {line_items}
                    </div>
            
                    <div className="mt-auto w-full pt-3 flex flex-col items-center">
                    
                        <div className="flex items-center">
                            <span className="mr-2 text-xl font-semibold">Subtotal: </span>
                            <span className="text-xl">${checkout.subtotalPrice}</span>
                        </div>
                
                        <div className="flex items-center">
                            <span className="mr-2 text-xl font-semibold">Taxes: </span>
                            <span className="text-xl">$ {checkout.totalTax}</span>
                        </div>
                
                        <div className="flex items-center">
                            <span className="mr-2 text-2xl font-bold">Total: </span>
                            <span className="text-2xl font-medium">${checkout.totalPrice}</span>
                        </div>
                
                        <div className="mx-auto pt-5">
                            <button className="button py-2 px-4 text-2xl md:text-3xl text-white leading-normal" onClick={handleCheckout} disabled={checkout.lineItems.length === 0}>Checkout</button>
                        </div>
            
                    </div>
        
                </StyledCartOverlay>

            )
        }

    CartOverlay.propTypes = {
        open: bool.isRequired,
        setOpen: func.isRequired,
    };


export { NavLogo, MenuToggle, NavMenu, CartToggle, CartOverlay }