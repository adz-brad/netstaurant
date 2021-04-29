import React from 'react'
import SimpleReactLightbox from 'simple-react-lightbox'
import Layout from './src/components/layout/layout'
import './src/styles/global.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-fetch'
import { MDXProvider } from '@mdx-js/react'

const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}

const httpLink = new HttpLink({
  uri: process.env.GATSBY_GRAPHCMS_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.GATSBY_GRAPHCMS_TOKEN}`,
  },
  fetch,
});

const apolloClient = new ApolloClient ({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
  };

const wrapRootElement = ({ element }) => {
  return (
      <ApolloProvider client={apolloClient}>
        <MDXProvider>
          <SimpleReactLightbox>
              {element}
              <ToastContainer/>  
          </SimpleReactLightbox>
        </MDXProvider>
      </ApolloProvider>
  )
}

export { wrapPageElement, wrapRootElement, onServiceWorkerUpdateReady }