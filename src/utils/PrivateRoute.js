import React from "react"
import { Route, Redirect } from "react-router-dom"
import { withContext } from "./AppContext"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = props.context.state.userName
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

export default withContext(PrivateRoute)
