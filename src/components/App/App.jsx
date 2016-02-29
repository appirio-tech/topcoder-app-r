import Nav from '../Nav/Nav'

const App = React.createClass({
  render: function() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    )
  }
})

export default App
