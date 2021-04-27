import React, { useState, useRef, useEffect } from 'react'
import { useOnClickOutside } from '../../hooks/closeMenu'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { NavLogo, MenuToggle, NavMenu, CartToggle, CartOverlay } from './components'
import { StyledNav } from './components.styled'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faFacebookF as Facebook, faLinkedinIn as LinkedIn, faInstagram as Instagram, faPinterestP as Pinterest } from '@fortawesome/free-brands-svg-icons'
import { faSearch, faCommentDots } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

	const data = useStaticQuery(graphql`
	{
	graphCmsSiteId {
		title
		caption
		description
		logo {
		  localFile {
			childImageSharp {
			  gatsbyImageData(quality: 100, layout: CONSTRAINED, placeholder: TRACED_SVG)
			}
		  }
		}
	  },
	graphCmsNavigation(menuTitle: {eq: "Main Navigation"}) {
		menuCategories {
			title
			id
			categories {
				title
				id
				slug
			}
	  	}
	}
	}`)

	const siteID = data.graphCmsSiteId;
	const navigation = data.graphCmsNavigation;

	const [open, setOpen] = useState(false);
	const [cartOpen, setCartOpen] = useState(false);

	const node = useRef(); 
    useOnClickOutside(node, () => setOpen(false));

	const [scrolled, setScrolled] = React.useState(false);

    const handleScroll = () => {
        const offset=window.scrollY;
        if(offset > 100){
            setScrolled(true);
        }
        else{
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })

    let navbarClasses=['navbar'];
    if(scrolled){
        navbarClasses.push('scrolled');
    }
    
    if (typeof window !== "undefined") {
        require("smooth-scroll")('a[href*="#"]')
    }


    return(

		<StyledNav ref={node} className={`${navbarClasses.join(" ")} fixed top-0 left-0 z-30 flex flex-row items-center w-full bg-primary-700 px-3`}>

			<NavLogo
				title={siteID.title}
				caption={siteID.caption}
				logoImage={siteID.logo.localFile.childImageSharp.gatsbyImageData}
				homeUrl="/"
			/>

			<div className="flex flex-row items-center absolute right-3 lg:right-6">

				<Link to="/contact" alt="Link to Adrenalize e-Commerce Contact Page" aria-label="Link to Adrenalize e-Commerce Contact Page">
					<Icon icon={faCommentDots} className="text-white text-2xl lg:text-3xl m-1 lg:mx-2 transform hover:scale-105"/>
				</Link>

				<Link to="/search" alt="Link to Adrenalize e-Commerce Product Search Page" aria-label="Link to Adrenalize e-Commerce Product Search Page">
					<Icon icon={faSearch} className="text-white text-2xl lg:text-3xl m-1 lg:mx-2 transform hover:scale-105"/>
				</Link>

				<CartToggle open={cartOpen} setOpen={setCartOpen} />

				<MenuToggle open={open} setOpen={setOpen} />

			</div>

			<CartOverlay open={cartOpen} setOpen={setCartOpen} className="hidden cart-overlay fixed bottom-0 w-full z-50 shadow-lg rounded-sm border-2 bg-white p-2 md:p-3"/>

			<NavMenu open={open} setOpen={setOpen} className="hidden fixed left-0 bottom-0 w-full z-40 shadow-lg rounded-sm border-2 bg-white p-3">			

					{navigation.menuCategories.map((menuCategory) => {

						return(

							<div key={menuCategory.id}>

							<div className="border-b-2 border-primary-600">
								<span className="text-2xl md:text-3xl font-semibold">{menuCategory.title}</span>
							</div>

							<div className="flex flex-col py-2">

								{menuCategory.categories.map((category) =>{

									return(

										<Link key={category.id} className="hover:text-primary-600" to={`/${category.slug}`} alt={category.title} onClick={() => setOpen(!open)}>
											<span className="text-xl md:text-2xl ml-1 font-regular">{category.title}</span>
										</Link>

									)
								})}

							</div>				

							</div>
						)
					})}

				<div className="w-full">

				<div className="border-b border-primary-600 mb-2">
					<span className="text-xl font-regular">Find Us On Social Media</span>
				</div>

				<div className="flex flex-row items-center">
					<a href="https://www.facebook.com" alt="Link to Adrenalize e-Commerce Facebook Page" aria-label="Link to Adrenalize e-Commerce Facebook Page" className="hover:text-primary-500 mr-2"><Icon className="filter drop-shadow-lg" icon={Facebook} size="2x"/></a>
					<a href="https://www.instagram.com" alt="Link to Adrenalize e-Commerce Instagram Page" aria-label="Link to Adrenalize e-Commerce Instagram Page" className="hover:text-primary-500 mx-2"><Icon className="filter drop-shadow-lg" icon={Instagram} size="2x"/></a>
					<a href="https://www.pinterest.com" alt="Link to Adrenalize e-Commerce Pinterest Page" aria-label="Link to Adrenalize e-Commerce Pinterest Page" className="hover:text-primary-500 mx-2"><Icon className="filter drop-shadow-lg" icon={Pinterest} size="2x"/></a>
					<a href="https://www.linkedin.com" alt="Link to Adrenalize e-Commerce LinkedIn Profile" aria-label="Link to Adrenalize e-Commerce LinkedIn Profile" className="hover:text-primary-500 mx-2"><Icon className="filter drop-shadow-lg" icon={LinkedIn} size="2x"/></a>
				</div>

				</div>


			</NavMenu>

		</StyledNav>

    )
}

export default Navbar