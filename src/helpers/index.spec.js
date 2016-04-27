import chai from 'chai'
import jsdom from 'mocha-jsdom'
import _ from 'lodash'
import * as helpers from './index'

describe('Helper Functions', () => {
  describe('memberColorByLevel', () => {
    const memberLevelByRating = helpers.memberLevelByRating

    it('returns a level given a rating score', () => {
      memberLevelByRating(0).should.equal(1)
      memberLevelByRating(1).should.equal(1)
      memberLevelByRating(900).should.equal(2)
      memberLevelByRating(901).should.equal(2)
      memberLevelByRating(1200).should.equal(3)
      memberLevelByRating(1201).should.equal(3)
      memberLevelByRating(1500).should.equal(4)
      memberLevelByRating(1501).should.equal(4)
      memberLevelByRating(2200).should.equal(5)
      memberLevelByRating(Infinity).should.equal(5)
    })

    it('returns level 1 for any value not between 0 and Infinity', () => {
      memberLevelByRating(null).should.equal(1)
      memberLevelByRating('').should.equal(1)
      memberLevelByRating(-2).should.equal(1)
      memberLevelByRating().should.equal(1)
    })
  })

  describe('memberColorByLevel', () => {
    const memberColorByLevel = helpers.memberColorByLevel

    it('returns a unique color when given a number from 1-5', () => {
      const colors = []

      for (let i = 1; i <= 5; i++) {
        const color = memberColorByLevel(i)
        color.should.be.a('string')

        colors.push(color)
      }

      _.uniq(colors).length.should.equal(5)
    })

    it('returns level one for any other value', () => {
      const levelOneColor = memberColorByLevel(1)

      levelOneColor.should.equal(memberColorByLevel(0))
      levelOneColor.should.equal(memberColorByLevel())
      levelOneColor.should.equal(memberColorByLevel(6))
    })
  })

  describe('sortSkillsByScoreAndTag', () => {
    const sortSkillsByScoreAndTag = helpers.sortSkillsByScoreAndTag
    const skills = [
      { score: 80, name: 'JavaScript' },
      { score: 33, name: 'Python' },
      { score: 5, name: 'Node' }
    ]
    it('sorts skills by score in descending order', () => {
      const sortedSkills = sortSkillsByScoreAndTag(skills)
      sortedSkills.length.should.equal(3)

      sortedSkills[0].score.should.equal(80)
      sortedSkills[1].score.should.equal(33)
      sortedSkills[2].score.should.equal(5)
    })

    it('moves the tag to the front of the array', () => {
      const sortedSkillsAndTag = sortSkillsByScoreAndTag(skills, { name: 'Node' })
      sortedSkillsAndTag.length.should.equal(3)

      sortedSkillsAndTag[0].name.should.equal('Node')
      sortedSkillsAndTag[0].searchedTag.should.be.true

      sortedSkillsAndTag[1].name.should.equal('JavaScript')
      sortedSkillsAndTag[2].name.should.equal('Python')
    })

    it('returns the top n skills if given a number to return', () => {
      const sortedSkills = sortSkillsByScoreAndTag(skills, null, 2)
      sortedSkills.length.should.equal(2)

      sortedSkills[0].score.should.equal(80)
      sortedSkills[1].score.should.equal(33)
    })

    it('does not mutate the sorted array if the tag is not found', () => {
      const sortedSkills = sortSkillsByScoreAndTag(skills, { name: 'Java' })
      sortedSkills.length.should.equal(3)

      sortedSkills[0].score.should.equal(80)
      chai.should().not.exist(sortedSkills[0].searchedTag)
    })
  })

  describe('getSubtrackAbbreviation', () => {
    const getSubtrackAbbreviation = helpers.getSubtrackAbbreviation

    it('returns the subtrack code given the subtrack constant', () => {
      const code = getSubtrackAbbreviation('BUG_HUNT')

      code.should.equal('BH')
    })

    it('returns the default O for "other" if no subtrack is found', () => {
      const defaultCode = getSubtrackAbbreviation('mySubtrackName')

      defaultCode.should.equal('O')
    })
  })

  describe('getMostRecentSubtracks', () => {
    const getMostRecentSubtracks = helpers.getMostRecentSubtracks

    const memberStatsData = mockStatsData()

    it('compiles subtracks and copilot stats into an array', () => {
      getMostRecentSubtracks(memberStatsData).length.should.equal(5)
    })

    it('returns a subset of the stats', () => {
      getMostRecentSubtracks(memberStatsData, 3).length.should.equal(3)
    })

    it('adds copilot stats to the beginning of the array for qualifying copilots', () => {
      getMostRecentSubtracks(memberStatsData)[0].should.deep.equal({
        track: 'COPILOT',
        name: 'COPILOT',
        stat: helpers.getSubtrackStat(memberStatsData.COPILOT)
      })
    })

    it('does not add copilot stats if they have fewer than 80 fulfillment score', () => {
      const mockStats = mockStatsData()
      mockStats.COPILOT.fulfillment = 79.9

      const compiledStats = getMostRecentSubtracks(mockStats)

      compiledStats.length.should.equal(4)
      compiledStats[0].name.should.not.equal('COPILOT')
    })

    it('does not add copilot stats if they have fewer than 10 contests completed', () => {
      const mockStats = mockStatsData()
      mockStats.COPILOT.contests = 9

      const compiledStats = getMostRecentSubtracks(mockStats)

      compiledStats.length.should.equal(4)
      compiledStats[0].name.should.not.equal('COPILOT')
    })

    it('does not add copilot stats if they are not a copilot', () => {
      const mockStats = mockStatsData()
      mockStats.COPILOT = {}

      const compiledStats = getMostRecentSubtracks(mockStats)

      compiledStats.length.should.equal(4)
      compiledStats[0].name.should.not.equal('COPILOT')
    })

    it('sorts subtracks by mostRecentEventDate', () => {
      const compiledStats = getMostRecentSubtracks(memberStatsData)

      compiledStats.length.should.equal(5)
      compiledStats[1].name.should.equal('SRM')
      compiledStats[2].name.should.equal('WEB_DESIGNS')
      compiledStats[3].name.should.equal('CODE')
      compiledStats[4].name.should.equal('MARATHON_MATCH')
    })
  })

  describe('getSubtrackStat', () => {
    const getSubtrackStat = helpers.getSubtrackStat

    it('returns the fulfillment value if it exists', () => {
      getSubtrackStat({ fulfillment: 84.33 }).should.deep.equal({
        value: 84.33,
        type: 'fulfillment'
      })
    })

    it('returns rating if it exists', () => {
      getSubtrackStat({ rank: { rating: 50 } }).should.deep.equal({
        value: 50,
        type: 'rating'
      })
    })

    it('returns wins if neither fulfillment nor rating exist', () => {
      getSubtrackStat({ wins: 1000 }).should.deep.equal({
        value: 1000,
        type: 'wins'
      })
    })

    it('returns 0 wins as a default', () => {
      getSubtrackStat({}).should.deep.equal({
        value: 0,
        type: 'wins'
      })
    })
  })

  describe('isEndOfScreen', () => {
    jsdom()

    const isEndOfScreen = helpers.isEndOfScreen

    it('calls the callback with any number of arguments passed in', () => {
      window.innerHeight = 20
      window.scrollY     = 20

      document.body.offsetHeight = 0

      const myCallback = (...myArgs) => {
        myArgs.length.should.equal(3)
      }

      isEndOfScreen(myCallback, 1, 2, 3)
    })
  })

  describe('getRoundedPercentage', () => {
    const getRoundedPercentage = helpers.getRoundedPercentage

    it('returns a rounded number with % sign given a number', () => {
      getRoundedPercentage(0).should.equal('0%')
      getRoundedPercentage(1).should.equal('1%')
      getRoundedPercentage(3.49).should.equal('3%')
      getRoundedPercentage(3.5).should.equal('4%')
    })
    it('returns an empty string if input is not a number', () => {
      getRoundedPercentage('3.5').should.equal('')
    })
  })

  describe('numberWithCommas', () => {
    const numberWithCommas = helpers.numberWithCommas

    it('adds commas to numbers', () => {
      numberWithCommas(5).should.equal('5')
      numberWithCommas(5000).should.equal('5,000')
      numberWithCommas('1,234,000').should.equal('1,234,000')
    })
  })

  describe('singlePluralFormatter', () => {
    const singlePluralFormatter = helpers.singlePluralFormatter

    it('returns an empty string if there are zero items', () => {
      singlePluralFormatter(0).should.equal('')
    })

    it('returns 1 and a singluar noun if given the number 1', () => {
      singlePluralFormatter(1, 'nyan cat').should.equal('1 nyan cat')
    })

    it('returns any other number with the plural noun', () => {
      singlePluralFormatter(3, 'nyan cat').should.equal('3 nyan cats')
    })
  })

  describe('getSearchTagPreposition', () => {
    const getSearchTagPreposition = helpers.getSearchTagPreposition

    it('returns "in" as a default', () => {
      getSearchTagPreposition('myString').should.equal('in')
    })

    it('returns "in" for SKILL tag type', () => {
      getSearchTagPreposition('skill').should.equal('in')
      getSearchTagPreposition('SKILL').should.equal('in')
    })

    it('returns "from" for COUNTRY tag type', () => {
      getSearchTagPreposition('COUNTRY').should.equal('from')
    })
  })

  describe('mapTagToLeaderboardType', () => {
    const mapTagToLeaderboardType = helpers.mapTagToLeaderboardType

    it('maps "SKILLS" to "MEMBER_SKILL"', () => {
      mapTagToLeaderboardType('SKILLS').should.equal('MEMBER_SKILL')
    })

    it('returns undefined for any string not in the map', () => {
      chai.should().not.exist(mapTagToLeaderboardType('myString'))
    })
  })
})

function mockStatsData() {
  return {
    COPILOT: {
      contests: 24,
      fulfillment: 83.33
    },
    DATA_SCIENCE: {
      MARATHON_MATCH: {
        mostRecentEventDate: 1,
        rank: {
          rating: 500
        }
      },
      SRM: {
        mostRecentEventDate: 4,
        rank: {
          rating: 700
        }
      }
    },
    DESIGN: {
      subTracks: [{
        name: 'WEB_DESIGNS',
        mostRecentEventDate: 3,
        wins: 4
      }]
    },
    DEVELOP: {
      subTracks: [{
        name: 'CODE',
        mostRecentEventDate: 2,
        wins: 9
      }]
    }
  }
}
