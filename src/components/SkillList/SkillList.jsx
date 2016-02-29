import { PropTypes } from 'react'
import SkillItem from '../SkillItem/SkillItem'
require('./skill-list.scss')

// TODO: Add support for no skills
const SkillList = ({ skills }) => {
  return (
    <div className="skill-list">
      <span>Skills:</span>
      {skills.map(s => <SkillItem key={s.id} skill={s.name}/>)}
    </div>
  )
}

SkillList.propTypes = {
  skills: PropTypes.array.isRequired
}

export default SkillList
