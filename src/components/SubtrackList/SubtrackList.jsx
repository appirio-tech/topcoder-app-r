import React, { PropTypes } from 'react'
import SubtrackItem from './SubtrackItem'

require('./SubtrackList.scss')

const SubtrackList = ({ subtracks }) => {
  return (
    <div className="subtracks-list">
      {subtracks.map((s, i) => <SubtrackItem key={i} subtrack={s} />)}
    </div>
  )
}

SubtrackList.propTypes = {
  subtracks: PropTypes.array.isRequired
}

export default SubtrackList
