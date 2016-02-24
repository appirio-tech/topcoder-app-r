const MemberItem = React.createClass({

  render: function() {
    const name = this.props.name
    const skills = this.props.skills || []

    return <li>{name} has skills in {skills.join(', ')}.</li>
  }
})

export default MemberItem
