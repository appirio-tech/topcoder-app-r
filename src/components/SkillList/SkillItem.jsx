import React, { PropTypes } from 'react'

import classNames from 'classnames'
require('./SkillItem.scss')

const SkillItem = ({ skill }) => {
  const skillItemStyles = classNames(
    'skill-text',
    { 'searched-skill': skill.searchedSkill },
    { 'special-tag': skill.specialTag }
  )

  return (
    <span className="skill-item">#
      <span className={skillItemStyles}>{skill.name}</span>
    </span>
  )
}

SkillItem.propTypes = {
  skill: PropTypes.object.isRequired
}

export default SkillItem
