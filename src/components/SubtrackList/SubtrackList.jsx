import React, { PropTypes } from 'react'
import SubtrackItem from './SubtrackItem'

require('./subtrack-list.scss')

const SubtrackList = ({ subtracks }) => {
  return (
    <div className="subtracks-list">
      {subtracks.map(s => <SubtrackItem key={s.name} subtrack={s} />)}
    </div>
  )
}

SubtrackList.propTypes = {
  subtracks: PropTypes.array.isRequired
}

export default SubtrackList
