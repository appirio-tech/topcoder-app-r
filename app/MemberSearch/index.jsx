// import TopMembersList from '../TopMembersList'
import MemberList from './MemberList'

const members = [
  {'name': 'nick', 'skills': ['JavaScript', 'React', 'Redux']},
  {'name': 'member2', 'skills': ['C++', 'C++++++++++', 'C']}
]

const MemberSearch = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Here</h1>

        <MemberList members={members} />
      </div>
    )
  }
})

export default MemberSearch
