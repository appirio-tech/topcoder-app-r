const DefaultUserAvatarIcon = ({ width, height }) => {
  return (
    <svg className="default-avatar" width={ width || '141px' } height={ height || '141px' } viewBox="0 0 141 141" version="1.1">
      <defs>
        <rect id="path-1" x="0.8" y="0.5" width="140" height="140" rx="306"></rect>
      </defs>
      <g id="Assets" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd" >
        <g transform="translate(-205.000000, -203.000000)" id="ico-user-default">
          <g transform="translate(205.000000, 203.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1"></use>
            </mask>
            <use id="Mask" fill="#F0F0F0" xlinkHref="#path-1"></use>
              <path d="M118,137.142857 C118,141.487857 114.4985,145 110.166667,145 L31.8333333,145 C27.5093333,145 24,141.487857 24,137.142857 C24,121.428571 39.1418333,106.767143 54.6205,100.968571 C45.6826667,95.4292857 39.6666667,85.5921429 39.6666667,74.2857143 L39.6666667,66.4285714 C39.6666667,49.0721429 53.6961667,35 71,35 C88.3038333,35 102.333333,49.0721429 102.333333,66.4285714 L102.333333,74.2857143 C102.333333,85.5921429 96.3173333,95.4292857 87.3873333,100.968571 C102.858167,106.767143 118,121.428571 118,137.142857 L118,137.142857 Z" id="Shape" stroke="#A3A3AE" strokeWidth="3" opacity="0.2" fill="#A3A3AE" mask="url(#mask-2)"></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default DefaultUserAvatarIcon

