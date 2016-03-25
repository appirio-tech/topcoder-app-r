import React, { PropTypes } from 'react'
import TagItem from './TagItem'

import classNames from 'classnames'
require('./TagList.scss')

const TagList = ({ tags, label, emptyMessage = '' }) => {
  const tagListStyles = classNames(
    'tag-list',
    { 'no-tags': !tags.length }
  )

  tags = tags.map((t, i) => <TagItem key={i} tag={t}/>)

  return (
    <div className={tagListStyles}>
      <span>{tags.length ? label + ': ' : emptyMessage}</span>

      {tags}
    </div>
  )
}

TagList.propTypes = {
  tags        : PropTypes.array.isRequired,
  label       : PropTypes.string.isRequired,
  emptyMessage: PropTypes.string.isRequired
}

export default TagList
