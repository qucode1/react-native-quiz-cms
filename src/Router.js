import React, { Fragment } from "react"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"

import Header from "./components/Header"
import Navigation from "./components/Navigation"

import Landing from "./components/Landing"
import Fallback from "./components/Fallback"
import Home from "./components/Home"
import About from "./components/About"
import Categories from "./components/Categories"

import { withContext } from "./utils/AppContext"

const styles = theme => ({
  withNav: {
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing.drawerWidth
    }
  },
  toolbar: theme.mixins.toolbar,
  main: {
    padding: theme.spacing.unit * 2
  }
})

const BaseRouter = props => {
  const isLoggedIn = props.context.state.userName
  return (
    <Router>
      <Fragment>
        <Header />
        {isLoggedIn && <Navigation />}
        <div className={props.classes.toolbar} />
        <main
          className={`${isLoggedIn && props.classes.withNav} ${
            props.classes.main
          }`}
        >
          <Switch>
            <Route exact path="/" component={isLoggedIn ? Home : Landing} />
            <Route
              exact
              path="/about"
              component={isLoggedIn ? About : Fallback}
            />
            <Route
              exact
              path="/categories"
              component={isLoggedIn ? Categories : Fallback}
            />
            <Route component={Fallback} />
          </Switch>
        </main>
      </Fragment>
    </Router>
  )
}

export default withStyles(styles)(withContext(BaseRouter))
