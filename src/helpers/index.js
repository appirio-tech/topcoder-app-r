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

// Member Levels
export function memberLevelByRating(userRating) {
  const levelRatings = [0, 900, 1200, 1500, 2200]

  const userLevel = _.findLastIndex(levelRatings, (rating) => {
    if (userRating >= rating) {
      return true
    }
    return false
  })

  return userLevel + 1
}

export function memberColorByLevel(userLevel) {
  const colorsByLevel = {
    1: '#9D9FA0',
    2: '#69C329',
    3: '#616BD5',
    4: '#FCD617',
    5: '#EF3A3A'
  }

  const color = colorsByLevel[userLevel] || colorsByLevel[1]

  return color
}

// Subtrack Abbreviations
export function getSubtrackAbbreviation(subtrack) {
  const subtrackAbbreviations = {
    APPLICATION_FRONT_END_DESIGN  : 'A',
    ARCHITECTURE                  : 'A',
    ASSEMBLY_COMPETITION          : 'AC',
    BANNERS_OR_ICONS              : 'BI',
    BUG_HUNT                      : 'BH',
    CODE                          : 'C',
    CONCEPTUALIZATION             : 'C',
    CONTENT_CREATION              : 'CC',
    COPILOT                       : 'FS',
    COPILOT_POSTING               : 'CP',
    DESIGN                        : 'D',
    DESIGN_FIRST_2_FINISH         : 'DF2F',
    DEVELOPMENT                   : 'Dev',
    FIRST_2_FINISH                : 'FF',
    IDEA_GENERATION               : 'IG',
    MARATHON_MATCH                : 'MM',
    OTHER                         : 'O',
    PRINT_OR_PRESENTATION         : 'PR',
    SPECIFICATION                 : 'SPC',
    SRM                           : 'SRM',
    TEST_SUITES                   : 'TS',
    UI_PROTOTYPE_COMPETITION      : 'P',
    WEB_DESIGNS                   : 'W',
    WIDGET_OR_MOBILE_SCREEN_DESIGN: 'WI',
    WIREFRAMES                    : 'WF'
  }

  const abbreviation = subtrackAbbreviations[subtrack] || '?'

  return abbreviation
}

// Subtrack filtering
export function getMostRecentSubtracks(userStatsByTrack, numResults = Infinity) {
  const subtrackStats = []

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

  if (marathonMatchStats.mostRecentEventDate) {
    subtrackStats.push({
      track: 'DATA_SCIENCE',
      name: 'MARATHON_MATCH',
      mostRecentEventDate: marathonMatchStats.mostRecentEventDate,
      stat: getSubtrackStat(marathonMatchStats)
    })
  }

  if (SRMStats.mostRecentEventDate) {
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
    if (subtrack.mostRecentEventDate) {
      subtrackStats.push({
        track: 'DESIGN',
        name: subtrack.name,
        mostRecentEventDate: subtrack.mostRecentEventDate,
        stat: getSubtrackStat(subtrack)
      })
    }
  })

  developSubtracks.forEach((subtrack) => {
    if (subtrack.mostRecentEventDate) {
      subtrackStats.push({
        track: 'DEVELOP',
        name: subtrack.name,
        mostRecentEventDate: subtrack.mostRecentEventDate,
        stat: getSubtrackStat(subtrack)
      })
    }
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
