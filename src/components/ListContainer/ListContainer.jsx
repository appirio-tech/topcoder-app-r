import { PropTypes } from 'react'

require('./list-container.scss')

const ListContainer = ({ headerText, children, listCount }) => {
  listCount = <span className="list-count">{listCount}</span>

  return (
    <div className="list-container">
      <div className="list-header">
        <span className="header-text">{headerText}</span>
        {listCount}
      </div>

      {children}
    </div>
  )
}

ListContainer.propTypes = {
  headerText: PropTypes.string.isRequired,
  children  : PropTypes.object.isRequired,
  listCount : PropTypes.number
}

export default ListContainer
