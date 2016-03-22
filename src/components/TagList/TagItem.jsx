import React, { PropTypes } from 'react'

import classNames from 'classnames'
require('./TagItem.scss')

const TagItem = ({ tag }) => {
  const tagItemStyles = classNames(
    'tag-text',
    { 'searched-tag': tag.searchedTag },
    { 'special-tag': tag.specialTag }
  )

  return (
    <span className="tag-item">#
      <span className={tagItemStyles}>{tag.name}</span>
    </span>
  )
}

TagItem.propTypes = {
  tag: PropTypes.object.isRequired
}

export default TagItem
