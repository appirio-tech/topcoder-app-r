import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChallengeSearchView from './ChallengeSearchView'

class ChallengeSearch extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // const searchTermFromQuery = this.props.location.query.q || ''
    this.query = this.props.location.query.q

    // this.props.setSearchTerm(searchTermFromQuery)
    // this.props.loadMemberSearch(searchTermFromQuery)
  }

  render() {
    return React.createElement(ChallengeSearchView, this.props)
  }
}

const mapStateToProps = () => {
  return {
    challengeData: require('./mockDataForChallenges').default
    // loading: memberSearch.loading,
    // // usernameSearchResults: memberSearch.usernameSearchResults,
    // // topMemberSearchResults: memberSearch.topMemberSearchResults,

    // currentSearchTerm: searchTerm.currentSearchTerm,
    // searchTermTag: searchTerm.searchTermTag
  }
}

// const actionsToBind = {
//   // action creators
// }

export default connect(mapStateToProps/*, actionsToBind*/)(ChallengeSearch)
