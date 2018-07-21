import React, { Component, Fragment } from "react"

import { GoogleLogin, GoogleLogout } from "react-google-login"
import jwtDecode from "jwt-decode"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { withStyles, withTheme } from "@material-ui/core/styles"
import Hidden from "@material-ui/core/Hidden"

import { withContext } from "../utils/AppContext"

const styles = theme => ({
  withNav: {
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing.drawerWidth
    }
  },
  toolbar: theme.mixins.toolbar,
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
})

class Header extends Component {
  state = {
    isLoggedIn: false
  }
  componentDidMount() {
    this.setState({ isLoggedIn: !!localStorage.getItem("userName") })
  }
  onGoogleLogin = async googleUser => {
    try {
      const { profileToken, error } = await fetch(
        `https://dev-quiz.now.sh/users/${googleUser.googleId}/token`,
        {
          method: "get",
          headers: {
            id_token: googleUser.tokenId
          }
        }
      ).then(res => res.json())
      if (error) throw error
      const { role } = await jwtDecode(profileToken)
      if (role === "admin") {
        await Promise.all([
          this.props.context.setContext("userProfileToken", profileToken, true),
          this.props.context.setContext(
            "userName",
            googleUser.profileObj.name,
            true
          ),
          this.props.context.setContext(
            "userId",
            googleUser.profileObj.googleId,
            true
          ),
          this.props.context.setContext(
            "userEmail",
            googleUser.profileObj.email,
            true
          )
        ])
      } else console.log("User not authorized. role:", role)
    } catch (err) {
      console.error(err)
    }
  }
  onLogout = () => {
    this.props.context.resetContext()
  }
  onFailure = ({ error }) => {
    console.log("google login error", error)
  }
  render() {
    const isLoggedIn = this.props.context.state.userName
    return (
      <AppBar position="fixed">
        <Toolbar
          className={`${this.props.classes.toolbar} ${isLoggedIn &&
            this.props.classes.withNav} ${this.props.classes.header}`}
        >
          {isLoggedIn && (
            <Hidden mdUp>
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
            </Hidden>
          )}
          <Typography color="inherit" variant="title">
            Web Dev Quiz CMS
          </Typography>
          {isLoggedIn ? (
            <Button color="inherit">
              <GoogleLogout
                buttonText="Logout"
                onLogoutSuccess={this.onLogout}
                tag="div"
                style={{ backgroundColor: "none" }}
              />
            </Button>
          ) : (
            <Button color="inherit">
              <GoogleLogin
                clientId="118749511788-anrvoro31o6s88lmtttj3lvfs8jom77g.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.onGoogleLogin}
                onFailure={this.onFailure}
                scope="profile email openId"
                tag="div"
                style={{ backgroundColor: "none" }}
              />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withTheme()(withStyles(styles)(withContext(Header)))
