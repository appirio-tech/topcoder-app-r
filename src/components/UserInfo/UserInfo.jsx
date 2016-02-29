import { PropTypes } from 'react'

const UserInfo = ({ user }) => {
  // Render tracks or subtracks based on data
  return (
    <div>
      <p>Username: {user.username}</p>
      <p>Country: Bangladesh</p>
      <p>member since: 1935</p>
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserInfo
