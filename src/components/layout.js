import React from 'react'
import Header from './header'
import Footer from './footer'

function Layout({ children, pageContext: { page } }) {
    return (

      <React.Fragment>
        <Header />
          <main>{children}</main>
        <Footer />
      </React.Fragment>
      
    )
  }
  
  export default Layout