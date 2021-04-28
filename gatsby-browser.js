import React from 'react'
import SimpleReactLightbox from 'simple-react-lightbox'
import Layout from './src/components/layout/layout'
import './src/styles/global.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-fetch'

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
        <SimpleReactLightbox>
            {element}
            <ToastContainer/>  
        </SimpleReactLightbox>
      </ApolloProvider>
  )
}

export { wrapPageElement, wrapRootElement }