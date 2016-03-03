import { PropTypes } from 'react'
import SkillItem from './SkillItem'
require('./skill-list.scss')

// TODO: Add support for no skills
// FIXME: Show only 4-5 skills based on what???
const SkillList = ({ skills }) => {
  return (
    <div className="skill-list">
      <span>Skills:</span>

      {skills.slice(0,4).map(s => <SkillItem key={s.id} skill={s.name}/>)}
    </div>
  )
}

SkillList.propTypes = {
  skills: PropTypes.array.isRequired
}

export default SkillList
