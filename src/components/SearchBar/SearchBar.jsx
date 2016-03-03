import { PropTypes } from 'react'
import { connect } from 'react-redux'
// import searchForMembers from '../../actions/searchForMembers'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = { text: '', results: { name: '' } }

    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmit  = this.onFormSubmit.bind(this)
  }

  onInputChange(event) {
    this.setState({ text: event.target.value })
  }

  onFormSubmit(event) {
    event.preventDefault()
    // this.props.searchForMembers(event.target[0].value)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          type="text"
          placeholder="Competenze o persone"
          value={this.state.text}
          onChange={this.onInputChange}
        />

        <button type="submit">Cerca</button>

        <p>loading: {this.props.loading.toString()}</p>

        <h1>search result: {this.props.foundValue}</h1>
      </form>
    )
  }
}

SearchBar.propTypes = {
  loading   : PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    loading: state.searchForMembers.loading,
    foundValue: state.searchForMembers.results.name
  }
}

// const actionsToBind = { searchForMembers }

export default connect(mapStateToProps)(SearchBar)
