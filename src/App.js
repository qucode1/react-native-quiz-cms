import React, { Component, Fragment } from "react"
import { AppContextProvider } from "./utils/AppContext"
import CssBaseline from "@material-ui/core/CssBaseline"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import cyan from "@material-ui/core/colors/cyan"
import amber from "@material-ui/core/colors/amber"
import logo from "./logo.svg"
import "./App.css"

import BaseRouter from "./Router"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: cyan["800"]
    },
    secondary: {
      main: amber["400"]
    }
  },
  spacing: {
    drawerWidth: "250px"
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppContextProvider>
          <BaseRouter />
        </AppContextProvider>
      </MuiThemeProvider>
    )
  }
}

export default App
