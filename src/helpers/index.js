import _ from 'lodash'

// Fetch helpers
export function status(response) {
  if (response.status >= 200 && response.status < 400) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

export function json(response) {
  return response.json()
}

// Miscellaneous
export function memberLevel(userRating) {
  const levelRatings = [0, 900, 1200, 1500, 2200]

  const userLevel = _.findLastIndex(levelRatings, (rating) => {
    if (userRating >= rating) {
      return true
    }
    return false
  })

  return userLevel + 1
}
