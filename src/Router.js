import React, { Fragment } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"

import Header from "./components/Header"
import Navigation from "./components/Navigation"

import Home from "./components/Home"
import About from "./components/About"
import Categories from "./components/Categories"

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

const BaseRouter = props => (
  <Router>
    <Fragment>
      <Header />
      <Navigation />
      <div className={props.classes.toolbar} />
      <main className={`${props.classes.withNav} ${props.classes.main}`}>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/categories" component={Categories} />
      </main>
    </Fragment>
  </Router>
)

export default withStyles(styles)(BaseRouter)
