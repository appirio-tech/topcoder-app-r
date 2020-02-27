import _ from 'lodash'
import fetch from 'isomorphic-fetch'

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

export function fetchJSON(url, options) {
  return fetch(url, options)
  .then(status)
  .then(json)
}

// Member Levels
export function memberLevelByRating(userRating) {
  const levelRatings = [0, 900, 1200, 1500, 2200]

  const userLevel = _.findLastIndex(levelRatings, (rating) => {
    if (userRating >= rating) {
      return true
    }
    return false
  })

  if (userLevel === -1) return 1

  return userLevel + 1
}

export function memberColorByLevel(userLevel) {
  const colorsByLevel = {
    1: '#A3A3AD',
    2: '#25C089',
    3: '#666EFF',
    4: '#FCB816',
    5: '#E6175C'
  }

  const color = colorsByLevel[userLevel] || colorsByLevel[1]

  return color
}

// Process member skills
export function sortSkillsByScoreAndTag(skills, tag, numSkillsToReturn = Infinity) {
  if (_.isEmpty(skills)) return []

  const sortedSkills = _.orderBy(skills, 'score', 'desc')

  // If the user has the tag, move it to the front
  if (tag) {
    const tagIndex = _.findIndex(sortedSkills, skill => {
      return skill.name === tag.name
    })

    if (tagIndex !== -1) {
      const tagSkill = sortedSkills.splice(tagIndex, 1)[0]
      tagSkill.searchedTag = true

      sortedSkills.unshift(tagSkill)
    }
  }

  return sortedSkills.slice(0, numSkillsToReturn)

}

// Subtrack Abbreviations
export function getSubtrackAbbreviation(subtrack) {
  const subtrackAbbreviations = {
    APPLICATION_FRONT_END_DESIGN  : 'FE',
    ARCHITECTURE                  : 'Ar',
    ASSEMBLY_COMPETITION          : 'As',
    BANNERS_OR_ICONS              : 'BI',
    BUG_HUNT                      : 'BH',
    CODE                          : 'Cd',
    COMPONENT_PRODUCTION          : 'Cp',
    CONCEPTUALIZATION             : 'Cn',
    CONTENT_CREATION              : 'CC',
    COPILOT                       : 'FS',
    COPILOT_POSTING               : 'CP',
    DEPLOYMENT                    : 'Dp',
    DESIGN                        : 'Ds',
    DESIGN_FIRST_2_FINISH         : 'F2F',
    DEVELOP_MARATHON_MATCH        : 'MM',
    DEVELOPMENT                   : 'Dv',
    FIRST_2_FINISH                : 'F2F',
    FRONT_END_FLASH               : 'Fl',
    GENERIC_SCORECARDS            : 'G',
    IDEA_GENERATION               : 'IG',
    LOGO_DESIGN                   : 'Lg',
    MARATHON_MATCH                : 'MM',
    PRINT_OR_PRESENTATION         : 'PP',
    PROCESS                       : 'Ps',
    REPORTING                     : 'Rp',
    RIA_BUILD_COMPETITION         : 'RB',
    RIA_COMPONENT_COMPETITION     : 'RC',
    SECURITY                      : 'Sc',
    SPEC_REVIEW                   : 'SR',
    SPECIFICATION                 : 'SPC',
    SRM                           : 'SRM',
    STUDIO_OTHER                  : 'O',
    TEST_SCENARIOS                : 'Ts',
    TEST_SUITES                   : 'TS',
    TESTING_COMPETITION           : 'Tg',
    UI_PROTOTYPE_COMPETITION      : 'Pr',
    WEB_DESIGNS                   : 'Wb',
    WIDGET_OR_MOBILE_SCREEN_DESIGN: 'Wg',
    WIREFRAMES                    : 'Wf'
  }

  const abbreviation = subtrackAbbreviations[subtrack] || 'O'

  return abbreviation
}

// Subtrack filtering
export function getMostRecentSubtracks(userStatsByTrack, numResults = Infinity) {
  let subtrackStats = []

  // If a user is a copilot with > 10 challenges and > 80% fulfillment,
  // add it to the list of subtracks
  const hasQualifyingFulfillment   = _.get(userStatsByTrack, 'COPILOT.fulfillment', 0) >= 80
  const hasQualifyingNumChallenges = _.get(userStatsByTrack, 'COPILOT.contests', 0) >= 10

  if (hasQualifyingFulfillment && hasQualifyingNumChallenges) {
    subtrackStats.push({
      track: 'COPILOT',
      name: 'COPILOT',
      stat: getSubtrackStat(userStatsByTrack.COPILOT)
    })
  }

  // Process subtracks in Data Science
  const marathonMatchStats = _.get(userStatsByTrack, 'DATA_SCIENCE.MARATHON_MATCH')
  const SRMStats           = _.get(userStatsByTrack, 'DATA_SCIENCE.SRM')

  if (marathonMatchStats && marathonMatchStats.mostRecentEventDate) {
    subtrackStats.push({
      track: 'DATA_SCIENCE',
      name: 'MARATHON_MATCH',
      mostRecentEventDate: marathonMatchStats.mostRecentEventDate,
      stat: getSubtrackStat(marathonMatchStats)
    })
  }

  if (SRMStats && SRMStats.mostRecentEventDate) {
    subtrackStats.push({
      track: 'DATA_SCIENCE',
      name: 'SRM',
      mostRecentEventDate: SRMStats.mostRecentEventDate,
      stat: getSubtrackStat(SRMStats)
    })
  }

  // Process subtracks in Develop and Design
  const designSubtracks  = _.get(userStatsByTrack, 'DESIGN.subTracks', [])
  const developSubtracks = _.get(userStatsByTrack, 'DEVELOP.subTracks', [])

  designSubtracks.forEach((subtrack) => {
    if (subtrack && subtrack.mostRecentEventDate) {
      subtrackStats.push({
        track: 'DESIGN',
        name: subtrack.name,
        mostRecentEventDate: subtrack.mostRecentEventDate,
        stat: getSubtrackStat(subtrack)
      })
    }
  })

  developSubtracks.forEach((subtrack) => {
    if (subtrack && subtrack.mostRecentEventDate) {
      subtrackStats.push({
        track: 'DEVELOP',
        name: subtrack.name,
        mostRecentEventDate: subtrack.mostRecentEventDate,
        stat: getSubtrackStat(subtrack)
      })
    }
  })

  // Filter out all subtracks with a value of 0 (wins, rating, etc.)
  subtrackStats = subtrackStats.filter(stat => {
    return stat.stat.value !== 0
  })

  const sortedSubtracks = subtrackStats.sort((a, b) => {
    return b.mostRecentEventDate - a.mostRecentEventDate
  })

  return sortedSubtracks.slice(0, numResults)
}

export function getSubtrackStat(subtrackStats) {
  if (subtrackStats.fulfillment) {
    return {
      value: subtrackStats.fulfillment,
      type: 'fulfillment'
    }
  }

  const subtrackRating = _.get(subtrackStats, 'rank.rating')

  if (subtrackRating) {
    return {
      value: subtrackRating,
      type: 'rating'
    }
  }

  return {
    value: subtrackStats.wins || 0,
    type: 'wins'
  }
}

// Detect end of the page on scroll
export function isEndOfScreen(callback, ...callbackArguments) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 400) {
    callback.apply(null, callbackArguments)
  }
}

// Miscellaneous helpers
export function getRoundedPercentage(number) {
  if (_.isFinite(number)) {
    const roundedNumber = Math.round(number)

    return String(roundedNumber) + '%'
  }

  return ''
}

export function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function singlePluralFormatter(num, noun) {
  switch (num) {
  case 0:
  case undefined:
  case null:
    return ''
  case 1:
    return `1 ${noun}`
  default:
    return `${num} ${noun}s`
  }
}

export function getSearchTagPreposition(tagType) {
  tagType = tagType.toUpperCase()

  switch (tagType) {
  case 'SKILL':
    return 'in'
  case 'COUNTRY':
    return 'from'
  case 'EVENT':
    return 'at the'
  default:
    return 'in'
  }
}

export function mapTagToLeaderboardType(tagDomain) {
  const tagToLeaderboardTypeMap = {
    SKILLS: 'MEMBER_SKILL'
  }

  return tagDomain ? tagToLeaderboardTypeMap[tagDomain.toUpperCase()] : null
}
