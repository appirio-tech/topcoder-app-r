// import Nav from '../Nav/Nav'
// <Nav />

require('./app.scss')

const App = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default App
