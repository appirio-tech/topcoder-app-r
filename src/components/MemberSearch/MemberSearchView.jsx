import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import NoResults from '../NoResults/NoResults'
import ListContainer from '../ListContainer/ListContainer'
import MemberItem from '../MemberItem/MemberItem'
import TopMemberList from '../TopMemberList/TopMemberList'
import MemberList from '../MemberList/MemberList'

require('./member-search-view.scss')

const MemberSearchView = (props) => {
  const members    = props.usernameSearchResults
  const topMembers = props.topMemberSearchResults
  const isLoading  = props.loading

  let memberSearchContent
  let memberMatch

  if (!isLoading && members.length) {
    // FIXME: show complete count, not just the first 10
    const exactMemberMatch = members.splice(0, 1)[0]

    memberMatch = <MemberItem member={exactMemberMatch} showBio />
    memberSearchContent = (
      <ListContainer
        headerText={'Usernames matching (GET TAG FROM STATE)'}
        listCount={members.length}
      >
        <MemberList members={members} />
      </ListContainer>
    )
  } else if (!isLoading && !members.length) {
    // tranclude no results and use children on props
    memberSearchContent = <NoResults entry="ADD SEARCH TERM TO REDUX STATE" />
  } else {
    // FIXME: move to page wide, not just memberSearchContent
    memberSearchContent = <LoadingIndicator />
  }

  let topMemberContent

  if (topMembers.length) {
    topMemberContent = (
      <ListContainer headerText={'Top Members with (GET TAG FROM STATE)'}>
        <TopMemberList topMembers={topMembers} />
      </ListContainer>
    )
  }

  return (
    <div className="member-search-view">
      {memberMatch}
      {topMemberContent}
      {memberSearchContent}
    </div>
  )
}

export default MemberSearchView
