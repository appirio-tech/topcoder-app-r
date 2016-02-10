import TopMembersList from '../TopMembersList'
import MemberList from './MemberList'

export default React.createClass({
  render: function() {
    return (
      <div>
        <TopMembersList />
        <MemberList />
      </div>
    )
  }
})
