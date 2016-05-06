import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import NavBar from 'appirio-tech-react-components/components/NavBar/NavBar'
import { DOMAIN } from '../../config/constants'
import { fetchJSON } from '../../helpers'

class NavBarContainer extends Component {
  constructor(props) {
    super(props)
  }

  getSuggestions(searchTerm) {
    const tagsSuggestURL = `https://internal-api.topcoder-dev.com/v3/tags/_suggest/?q=${searchTerm}`

    return fetchJSON(tagsSuggestURL)
      .then(data => {
        const tags = _.get(data, 'result.content', [])
        const tagTexts = tags.map(tag => tag.text )

        return Promise.resolve(tagTexts)
      })
  }

  onSearch(searchTerm) {
    window.location.replace(`/search/challenges?q=${encodeURIComponent(searchTerm)}`)
  }

  render() {
    return (
      <NavBar
        domain={DOMAIN}
        username={this.props.username}
        userImage={this.props.photoURL}
        searchSuggestionsFunc={this.getSuggestions}
        onSearch={this.onSearch}
      />
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    username: user.username,
    photoURL: user.photoURL
  }
}

export default connect(mapStateToProps)(NavBarContainer)
