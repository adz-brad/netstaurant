import React from 'react'
import SimpleReactLightbox from 'simple-react-lightbox'
import Layout from './src/components/layout/layout'
import './src/styles/global.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
  };

export const wrapRootElement = ({ element }) => {
  return (
 
      <SimpleReactLightbox>
           {element}
           <ToastContainer/>  
      </SimpleReactLightbox>
  )
}