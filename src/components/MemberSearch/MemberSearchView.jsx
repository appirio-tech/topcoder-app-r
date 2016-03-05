import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import NoResults from '../NoResults/NoResults'
import TopMemberList from '../TopMemberList/TopMemberList'
import MemberList from '../MemberList/MemberList'

require('./member-search-view.scss')

const MemberSearchView = (props) => {
  const members    = props.usernameSearchResults
  const topMembers = props.topMemberSearchResults
  const isLoading  = props.loading

  let memberSearchContent

  if (!isLoading && members.length) {
    memberSearchContent = <MemberList members={members} />
  } else if (!isLoading && !members.length) {
    memberSearchContent = <NoResults entry="ADD SEARCH TERM TO REDUX STATE" />
  } else {
    memberSearchContent = <LoadingIndicator />
  }

  let topMemberContent

  if (topMembers.length) {
    topMemberContent = <TopMemberList topMembers={topMembers} />
  }

  return (
    <div className="member-search-view">
      {topMemberContent}
      {memberSearchContent}
    </div>
  )
}

export default MemberSearchView
      // <svg id="svg-icons" version="1.1">
      //   <defs>
      //     {/*<!-- Trophy icon -->*/}
      //     <symbol id="trophy-cup" viewBox="0 0 10 10">
      //       <title>Trophy Cup</title>
      //       <g transform="translate(-1762.000000, -752.000000)">
      //           <path d="M1762,755 C1762,755.790924 1763.0023,757.5 1765,757.5 C1764.80361,758.330917 1765.43166,758.486626 1766,759 C1766.1325,759.331619 1765.92624,760.065224 1766,761 L1764,761 L1764,762 L1770,762 L1770,761 L1768,761 C1768.07376,760.065224 1767.8675,759.331619 1768,759 C1768.56834,758.486626 1769.19639,758.330917 1769,757.5 C1770.99246,757.5 1772,755.794863 1772,755 L1772,752 L1762,752 L1762,755 Z M1763,755 L1763,753 L1764,753 L1764,756 C1763.44873,756 1763,755.32727 1763,755 L1763,755 Z M1771,755 C1771,755.32727 1770.55127,756 1770,756 L1770,753 L1771,753 L1771,755 L1771,755 Z" id="trofey-cup"></path>
      //       </g>
      //     </symbol>

      //     {/*<!-- Default User Icon -->*/}
      //     <symbol id="ico-user-default" viewBox="0 0 140 140">
      //       <title>Default User Icon</title>
      //       <mask id="user-circle-mask" fill="white">
      //           <rect id="user-circle" x="0.8" y="0.5" width="140" height="140" rx="306"></rect>
      //       </mask>
      //       <use id="Mask" fill="#F0F0F0" xlinkHref="#user-circle"></use>
      //       <path d="M118,137.142857 C118,141.487857 114.4985,145 110.166667,145 L31.8333333,145 C27.5093333,145 24,141.487857 24,137.142857 C24,121.428571 39.1418333,106.767143 54.6205,100.968571 C45.6826667,95.4292857 39.6666667,85.5921429 39.6666667,74.2857143 L39.6666667,66.4285714 C39.6666667,49.0721429 53.6961667,35 71,35 C88.3038333,35 102.333333,49.0721429 102.333333,66.4285714 L102.333333,74.2857143 C102.333333,85.5921429 96.3173333,95.4292857 87.3873333,100.968571 C102.858167,106.767143 118,121.428571 118,137.142857 L118,137.142857 Z" id="Shape" stroke="#A3A3AE" strokeWidth="3" opacity="0.2" fill="#A3A3AE" mask="url(#user-circle-mask)"></path>
      //     </symbol>

      //     {/*<!-- Level Designator -->*/}
      //     <symbol id="level-designator" viewBox="0 0 20 20">
      //       <title>Level Designator</title>
      //       <polygon stroke="#FFFFFF" transform="translate(9.250000, 8.934110) scale(-1, -1) translate(-9.250000, -8.934110) " points="7.5 0.676045494 18 3.36821993 14.5 12.5470132 7.5 17.1921745 0.5 12.5470132 0.5 4.80507775 "></polygon>
      //       <path d="M11.4649999,11.2229395 L13.6389129,12.3533743 L13.2041303,9.91859166 C13.1171738,9.6577221 13.2910868,9.30989601 13.4649999,9.13598297 L15.2041303,7.39685253 L12.7693477,7.04902645 C12.5084781,7.04902645 12.2476085,6.78815688 12.0736955,6.61424384 L11.0302172,4.35337427 L9.89978246,6.61424384 C9.81282594,6.8751134 9.55195638,7.04902645 9.29108681,7.04902645 L6.76934768,7.39685253 L8.50847811,9.13598297 C8.76934768,9.39685253 8.8563042,9.6577221 8.8563042,9.91859166 L8.42152159,12.3533743 L10.5954346,11.2229395 C10.8563042,11.0490264 11.2041303,11.0490264 11.4649999,11.2229395 L11.4649999,11.2229395 Z" fill="#FFFFFF"></path>
      //     </symbol>
      //   </defs>
      // </svg>
