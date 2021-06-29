import React from "react"
import { Auth0Provider } from "../../services/auth"

const App = ({ element, location }) => {

  const onRedirectCallback = appState => {
    location.navigate(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }

  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      client_id={process.env.GATSBY_AUTH0_CLIENT_ID}
      redirect_uri="http://localhost:8000/account"
      cacheLocation='localstorage'
      onRedirectCallback={onRedirectCallback}
    >
      {element}
    </Auth0Provider>
  )
}

export default App