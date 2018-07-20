import React, { Fragment } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { withStyles, withTheme } from "@material-ui/core/styles"
import Hidden from "@material-ui/core/Hidden"

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

const Header = props => {
  return (
    <AppBar position="fixed">
      <Toolbar
        className={`${props.classes.toolbar} ${props.classes.withNav} ${
          props.classes.header
        }`}
      >
        <Hidden mdUp>
          <IconButton
            color="inherit"
            // style={{ color: props.theme.palette.primary.contrastText }}
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography color="inherit" variant="title">
          Web Dev Quiz CMS
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default withTheme()(withStyles(styles)(Header))
