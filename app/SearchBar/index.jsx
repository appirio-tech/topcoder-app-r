import { connect } from 'react-redux'
import { updateText } from '../actions'
import { bindActionCreators } from 'redux'
import find from

class SearchReact extends React.Component {
  constructor(props) {
    super(props)

    this.state = { term: '' }

    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange(event) {
    this.setState({ term: event.target.value})
  }

  onFormSubmit(event) {
    event.preventDefault()

  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          type="text"
          placeholder="Search ye here"
          value={this.state.term}
          onChange={this.onInputChange}/>
        <button type="submit">Submit</button>
        <h1>{this.state.term}</h1>
      </form>
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
