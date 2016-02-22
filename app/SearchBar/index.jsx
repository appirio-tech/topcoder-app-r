import { PropTypes } from 'react'
import { connect } from 'react-redux'
import searchText from '../actions/searchText'

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
    this.props.searchText(event.target[0].value)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          type="text"
          placeholder="Competenze o persone"
          value={this.state.text}
          onChange={this.onInputChange}/>
        <button type="submit">Cerca</button>
        <p>loading: {this.props.loading.toString()}</p>
        <h1>search result: {this.props.foundValue}</h1>
      </form>
    )
  }
}

SearchBar.propTypes = {
  searchText: PropTypes.func.isRequired,
  loading   : PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    loading: state.searchForTerm.loading,
    foundValue: state.searchForTerm.results.name
  }
}

const actionsToBind = { searchText }

export default connect(mapStateToProps, actionsToBind)(SearchBar)
