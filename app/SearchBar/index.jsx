import { connect } from 'react-redux'
import { updateText } from '../actions'
import { bindActionCreators } from 'redux'

class SearchReact extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.term}
          onChange={(e) => this.props.updateText(e.target.value)}/>
        <h1>{this.props.term}</h1>
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
