import React from 'react'
import { Header, PageWrapper } from './components'
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

      </ContextProvider>
      
    )
  }
  
  export default Layout