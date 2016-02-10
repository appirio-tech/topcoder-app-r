import { Component } from 'react'
import { connect } from 'react-redux'
import { updateText } from '../actions/index'
import { bindActionCreators } from 'redux'

class SearchReact extends Component {
  renderSearchTerm() {
    return this.props.term
  }



  render() {
    return (
      <div>
        <input />
        <h1>{this.renderSearchTerm()}</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    term: state.search.term
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateText }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchReact)
