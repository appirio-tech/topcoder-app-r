// import { PropTypes } from 'react'
import MemberItem from './MemberItem'

const MemberList = React.createClass({
  render: function() {
    const members = this.props.members

    return (
      <div className="members-list">
        <h1>Members: {/*this.members.length */}</h1>

        <ul>
          {members.map(member => <MemberItem key={member.name} member={member} />)}
        </ul>
      </div>
    )
  }
})

// MemberList.PropTypes = {
//   members: PropTypes.arrayOf(PropTypes.object)
// }

export default MemberList
