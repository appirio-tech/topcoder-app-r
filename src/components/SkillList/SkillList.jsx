import { PropTypes } from 'react'
import SkillItem from './SkillItem'

import classNames from 'classnames'
require('./skill-list.scss')

// FIXME: Show only 4-5 skills based on what???
// backend should return?
const SkillList = ({ skills }) => {
  const skillListStyles = classNames(
    'skill-list',
    { 'no-skills': !skills.length }
  )

  skills = skills.slice(0,4).map(s => <SkillItem key={s.id} skill={s.name}/>)

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
