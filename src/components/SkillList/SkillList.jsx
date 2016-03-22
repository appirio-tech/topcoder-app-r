import React, { PropTypes } from 'react'
import SkillItem from './SkillItem'

import classNames from 'classnames'
require('./SkillList.scss')

const SkillList = ({ skills }) => {
  const skillListStyles = classNames(
    'skill-list',
    { 'no-skills': !skills.length }
  )

  skills = skills.map(s => <SkillItem key={s.id} skill={s}/>)

  return (
    <div className={skillListStyles}>
      <span>{skills.length ? 'Skills: ' : 'No Skills'}</span>

      {skills}
    </div>
  )
}

SkillList.propTypes = {
  skills: PropTypes.array.isRequired
}

export default SkillList
