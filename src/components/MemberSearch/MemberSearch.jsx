import { Component } from 'react'
import NoResults from '../NoResults/NoResults'
// import TopMembersList from '../TopMemberList/TopMemberList'
import MemberList from '../MemberList/MemberList'
import { mockData } from '../../data'
require('./member-search-page.scss')

class MemberSearch extends Component {
  // Rename to MemberSearchView
  // move componentWillMount out into container and all action dispatching


  constructor(props) {
    super(props)

    const { query } = props.location
    this.searchTermFromQuery = query.q

    this.memberResults = mockData.users
  }

  componentWillMount() {
    console.log('*** componentWillMount activated ***')

    this.getMemberSearchResults()
  }

  getMemberSearchResults() {
    const searchTerm = this.searchTermFromQuery
    console.log(searchTerm)

  }

  render() {
    const members   = this.memberResults
    const isLoading = this.props.isLoading || false
    let memberSearchContent

    if (isLoading) {
      memberSearchContent = <h1>Loading members now...</h1>
    } else if (members) {
      memberSearchContent = <MemberList members={members} />
    } else {
      memberSearchContent = <NoResults entry="hello" />
    }

    return (
      <div className="member-search-page">
        {memberSearchContent}
      </div>
    )
  }
}

export default MemberSearch
