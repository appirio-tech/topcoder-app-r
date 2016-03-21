import React, { Component } from 'react'
import { connect } from 'react-redux'
import MemberSearchView from '../components/MemberSearch/MemberSearchView'
import loadMemberSearch from '../actions/loadMemberSearch'
import { setSearchTerm } from '../actions/setSearchTerm'

class MemberSearch extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const searchTermFromQuery = this.props.location.query.q

    this.props.setSearchTerm(searchTermFromQuery)
    this.props.loadMemberSearch(searchTermFromQuery)
  }

  render() {
    return React.createElement(MemberSearchView, this.props)
  }
}

const mapStateToProps = ({ memberSearch, searchTerm }) => {
  return {
    loading: memberSearch.loading,

    usernameSearchResults : memberSearch.usernameSearchResults,
    totalUsernameMatches  : memberSearch.totalUsernameMatches,
    topMemberSearchResults: memberSearch.topMemberSearchResults,

    currentSearchTerm: searchTerm.currentSearchTerm,
    searchTermTag    : searchTerm.searchTermTag
  }
}

const actionsToBind = {
  loadMemberSearch,
  setSearchTerm
}

export default connect(mapStateToProps, actionsToBind)(MemberSearch)
