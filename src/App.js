import React from "react";
import './App.css';
class App extends React.Component {

  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
         {this.props.children}
      </div>
    )
  }
}


export default App;
