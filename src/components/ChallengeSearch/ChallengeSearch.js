// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// // import MemberSearchView from './MemberSearchView'

// class ChallengeSearch extends Component {
//   constructor(props) {
//     super(props)
//   }

//   // componentWillMount() {
//   //   const searchTermFromQuery = this.props.location.query.q

//   //   this.props.setSearchTerm(searchTermFromQuery)
//   //   this.props.loadMemberSearch(searchTermFromQuery)
//   // }

//   render() {
//     return React.createElement(MemberSearchView, this.props)
//   }
// }

// const mapStateToProps = ({ memberSearch, searchTerm }) => {
//   return {
//     loading: memberSearch.loading,
//     // usernameSearchResults: memberSearch.usernameSearchResults,
//     // topMemberSearchResults: memberSearch.topMemberSearchResults,

//     currentSearchTerm: searchTerm.currentSearchTerm,
//     searchTermTag: searchTerm.searchTermTag
//   }
// }

// const actionsToBind = {
//   // action creators
// }

// export default connect(mapStateToProps, actionsToBind)(ChallengeSearch)
