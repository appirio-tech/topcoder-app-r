import TopMemberList from '../TopMemberList/TopMemberList'

require('./list-container.scss')

// FIXME: Add tag to state and reference tag in header
      // <h1>Top Members in ADD TAG TO STATE</h1>
const ListContainer = ({ topMembers }) => {
  return (
    <div className="list-container">
      <div className="list-header">
        <span className="header-text">Top Members with JavaScript</span>
      </div>

      <TopMemberList topMembers={topMembers}/>
    </div>
  )
}

export default ListContainer
