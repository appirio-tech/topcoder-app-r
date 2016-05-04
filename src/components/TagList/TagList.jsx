import React, { PropTypes } from 'react'
import TagItem from './TagItem'

import classNames from 'classnames'
require('./TagList.scss')

const TagList = ({ tags, label, emptyMessage = '' }) => {
  const tagListStyles = classNames(
    'tag-list',
    { 'no-tags': !tags.length }
  )

  const tagLabelStyles = classNames(
    { 'tag-list-label': tags.length && label }
  )

  const tagLabel = tags.length && label ? label : null

  const noTagsMessage = !tags.length && emptyMessage ? emptyMessage : null

  tags = tags.map((t, i) => <TagItem key={i} tag={t}/>)

  return (
    <div className={tagListStyles}>
      <span className={tagLabelStyles}>{tagLabel}</span>

      <span>{noTagsMessage}</span>

      {tags}
    </div>
  )
}

TagList.propTypes = {
  tags        : PropTypes.array.isRequired,
  label       : PropTypes.string,
  emptyMessage: PropTypes.string
}

export default TagList
