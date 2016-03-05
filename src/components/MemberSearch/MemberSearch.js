import { Component } from 'react'
import { connect } from 'react-redux'
import MemberSearchView from './MemberSearchView'
import loadMemberSearch from '../../actions/loadMemberSearch'

class MemberSearch extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    debugger
    const searchTermFromQuery = this.props.location.query.q

    this.getMemberSearchResults(searchTermFromQuery)
  }

  getMemberSearchResults(searchTerm) {
    this.props.loadMemberSearch(searchTerm)
  }

  render() {
    return React.createElement(MemberSearchView, this.props)
  }
}

const mapStateToProps = ({ memberSearch }) => {
  return {
    loading: memberSearch.loading,
    usernameSearchResults: memberSearch.usernameSearchResults,
    topMemberSearchResults: memberSearch.topMemberSearchResults
  }
}

const actionsToBind = {
  loadMemberSearch
}

export default connect(mapStateToProps, actionsToBind)(MemberSearch)
