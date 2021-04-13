import React from 'react'
import Layout from './src/components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './src/styles/main.scss'

export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
  };

  export const wrapRootElement = ({ element }) => {
    return(
    <MDXProvider>{element}</MDXProvider>
    )
  };