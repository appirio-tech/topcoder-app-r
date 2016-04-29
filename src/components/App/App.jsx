import React, { Component } from 'react'
import { connect } from 'react-redux'

require('./App.scss')

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

export default connect(mapStateToProps)(App)
