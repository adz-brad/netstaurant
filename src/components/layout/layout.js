import React from 'react'
import { Header, PageWrapper, Footer } from './components'
import Navbar from '../../components/navigation/navbar'
import ContextProvider from '../../provider/ContextProvider'
import ADRLogo from '../../assets/images/ADRLogo.png'

function Layout({ children, pageContext: { page } }) {
    return (

      <ContextProvider>

        <Header>
          <Navbar/>
        </Header>

        <PageWrapper>
          {children}
            <Footer>
              <div className="h-20 w-full bg-primary-700 flex flex-row items-center justify-center p-5 text-white">
                <span className="">Powered by</span><img className="powered-by" src={ADRLogo} alt="Site Powered by Adrenalize Digital"/><span className="ml-5">© 2021 Adrenalize Digital</span>
              </div>
            </Footer>
        </PageWrapper>

      </ContextProvider>
      
    )
  }
  
  export default Layout