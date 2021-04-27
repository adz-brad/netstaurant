import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { StyledToggle, StyledMenu, StyledCartOverlay } from './components.styled';
import reduce from 'lodash/reduce'
import { bool, func } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import StoreContext from '../context/StoreContext'
import LineItem from '../cart/LineItem'

const useQuantity = () => {
	const { store: {checkout} } = useContext(StoreContext)
	const items = checkout ? checkout.lineItems : []
	const total = reduce(items, (acc, item) => acc + item.quantity, 0)
	return [total !== 0, total]
}
  
    const NavLogo = ( { homeUrl, title, caption, logoImage }) => {

        return(
        
            <div className="py-2">

                <Link 
                    className="flex flex-row items-center"
                    to={homeUrl} 
                    alt="Link to Adrenalize e-Commerce Home Page"
                >

                    <GatsbyImage 
                        className="w-12 sm:w-16 lg:w-24 mr-1"
                        image={logoImage} 
                        alt={`${title} Logo`} 
                    />

                    <div className="flex flex-col ml-2 sm:ml-3">
                        <h1 className="text-lg sm:text-xl lg:text-4xl font-bold text-white leading-none">{title}</h1>
                        <h2 className="text-base sm:text-md lg:text-xl font-medium text-white leading-none">{caption}</h2>
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

        const [hasItems, quantity] = useQuantity()

        return(

            <div className="relative flex flex-row items-center justify-center w-8">

            <FontAwesomeIcon icon={faShoppingCart} onClick={() => setOpen(!open)} open={open} className="text-white text-2xl lg:text-3xl m-1 lg:ml-3 cursor-pointer absolute transform hover:scale-105"/>
            
            {hasItems &&
                <div className="absolute mb-5 -right-1 z-20 bg-white border border-primary-700 shadow-md rounded-full leading-none px-1 text-xs font-bold text-primary-700 lg:leading-tight lg:px-2 lg:text-base lg:font-extrabold lg:mb-6 lg:-right-2">
                    {quantity}
                </div>
            }

            </div>
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
                            <span className="mr-2 text-2xl font-bold">Subtotal: </span>
                            <span className="text-2xl font-medium">${checkout.subtotalPrice}</span>
                        </div>

                        <div className="italic mt-2">
                            Taxes + Shipping Costs calculated at checkout.
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