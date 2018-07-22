import React, { Component, Fragment } from "react"
import { withContext } from "../utils/AppContext"

class Categories extends Component {
  state = {
    categories: []
  }
  async componentDidMount() {
    const categories = await fetch(
      "https://dev-quiz.now.sh/categories?populate=true",
      {
        method: "get",
        headers: {
          profile_token: this.props.context.state.userProfileToken
        }
      }
    ).then(res => res.json())
    console.log(categories)
    this.setState({ categories })
  }
  render() {
    return (
      <div>
        <h2>Categories</h2>
        {this.state.categories.map(categ => (
          <Fragment key={categ._id}>
            <h3>{categ.name}</h3>
            <h4>Questions:</h4>
            {categ.questions.map(question => (
              <p key={question._id}>{question.title}</p>
            ))}
          </Fragment>
        ))}
      </div>
    )
  }
}

export default withContext(Categories)
