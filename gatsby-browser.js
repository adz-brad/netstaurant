import React from 'react'
import SimpleReactLightbox from 'simple-react-lightbox'
import Layout from './src/components/layout/layout'
import './src/styles/global.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ApolloClient, ApolloProvider, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-fetch'
import { MDXProvider } from '@mdx-js/react'
import { Location } from "@reach/router"
import App from "./src/components/auth/app"

const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}

const graphCmsLink = new HttpLink({
  uri: process.env.GATSBY_GRAPHCMS_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.GATSBY_GRAPHCMS_TOKEN}`,
  },
  fetch,
});

const shopifyLink = new HttpLink({
  uri: `https://${process.env.GATSBY_SHOPIFY_SHOP_NAME}.myshopify.com/api/2021-04/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token':
        process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
      'Accept' : 'application/graphql'
    },
    fetch,
  });


const apolloClient = new ApolloClient ({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === "graphCms",
    graphCmsLink,
    shopifyLink
  ),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
}

const wrapRootElement = ({ element }) => {
  return (
    
      <ApolloProvider client={apolloClient}>
        <MDXProvider>
          <SimpleReactLightbox>
          <Location>
          {location => <App element={element} location={location} />}
          </Location>
            <ToastContainer/>  
          </SimpleReactLightbox>
        </MDXProvider>
      </ApolloProvider>

  )
}

export { wrapPageElement, wrapRootElement, onServiceWorkerUpdateReady }