import Nav from '../Nav/Nav'

const App = (props) => {
  return (
    <div>
      <Nav />
      {props.children}
    </div>
  )
}

export default App
