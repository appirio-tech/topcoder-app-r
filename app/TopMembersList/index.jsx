import { connect } from 'react-redux'

const TopMemberList = (props) => {
  const topMembers = props.topMembers.map((topMember) => {
    return <li>{topMember.name + ', ' + topMember.skills[0]}</li>
  })

  return (
    <div className="top-members">
      <h1>Top Members with (TODO-skill or country name)</h1>
      <ul>{ topMembers }</ul>
    </div>
  )
}

function mapStateToProps(state) {
  state = [
    {name: 'nick', skills: ['JavaScript']},
    {name: 'sheldon', skills: ['Python']}
  ]

  return {
    topMembers: state.topMembers
  }
}

export default connect(mapStateToProps)(TopMemberList)
