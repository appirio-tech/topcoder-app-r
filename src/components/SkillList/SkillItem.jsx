import { PropTypes } from 'react'

require('./skill-item.scss')

const SkillItem = ({ skill }) =>
  <span className="skill-hash">#
    <span className="skill-text">{skill}</span>
  </span>

SkillItem.propTypes = {
  skill: PropTypes.string.isRequired
}

export default SkillItem
