import React, { Component, createContext } from "react"

const defaultContext = {
  userProfileToken: "",
  userId: "",
  userEmail: "",
  userName: ""
}

const AppContext = createContext(defaultContext)

const getSavedContext = async () => {
  try {
    const [userName, userId, userEmail, userProfileToken] = await Promise.all([
      localStorage.getItem("userName"),
      localStorage.getItem("userId"),
      localStorage.getItem("userEmail"),
      localStorage.getItem("userProfileToken")
    ])
    return {
      userName,
      userId,
      userEmail,
      userProfileToken
    }
  } catch (err) {
    console.error(err)
  }
}

export const withContext = Component => {
  const AppContextConsumer = props => (
    <AppContext.Consumer>
      {ctx => <Component {...props} context={ctx} />}
    </AppContext.Consumer>
  )
  return AppContextConsumer
}

export class AppContextProvider extends Component {
  state = { ...defaultContext }
  setContext = async (name, obj, toLocalStorage = false) => {
    this.setState({
      [name]: obj
    })
    const string = await JSON.stringify(obj)
    toLocalStorage && localStorage.setItem(name, string)
    return obj
  }
  resetContext = () => {
    this.setState(defaultContext)
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userId")
    localStorage.removeItem("userProfileToken")
  }
  async componentDidMount() {
    const savedContext = await getSavedContext()
    this.setState(prevState => ({
      userProfileToken:
        savedContext.userProfileToken || prevState.userProfileToken,
      userId: savedContext.userId || prevState.userId,
      userEmail: savedContext.userEmail || prevState.userEmail,
      userName: savedContext.userName || prevState.userName
    }))
  }
  render() {
    const { children } = this.props
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setContext: this.setContext,
          resetContext: this.resetContext
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}
