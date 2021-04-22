import React from 'react'
import { Header, PageWrapper, Footer } from './components'
import Navbar from '../../components/navigation/navbar'
import ContextProvider from '../../provider/ContextProvider'

function Layout({ children, pageContext: { page } }) {
    return (

      <ContextProvider>

        <Header>
          <Navbar/>
        </Header>

        <PageWrapper>
          {children}
        </PageWrapper>
        

        <Footer>
        </Footer>

      </ContextProvider>
      
    )
  }
  
  export default Layout