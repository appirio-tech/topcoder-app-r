import React from 'react'
// import Nav from '../Nav/Nav'
// <Nav />

require('./App.scss')

const App = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default App
