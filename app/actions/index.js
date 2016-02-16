import { skills } from '../data.js'

export const SEARCH_TEXT = 'SEARCH_TEXT'

function searchForText(text) {
  let result

  skills.((skill) => {
    if (skill.name.toLowerCase() === text.toLowerCase()) {
      result
    }
  })

  return {
    type: SEARCH_TEXT,
    text
  }
}

export default function searchMembersWithText(text) {
  return dispatch => {
    setTimeout(() => {
      dispatch(searchForText(text))
    }, 1000)
    Promise.a
  }
}
