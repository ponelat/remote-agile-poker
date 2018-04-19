import React, { Component } from 'react';
import logo from './logo.svg';
import Shake from 'shake.js'
import './App.css';
import debounce from 'lodash/debounce'

class App extends Component {

  state = {
    showNumber: false
  }

  debToggle = debounce(() => {
    this.setState(state => {
      state.showNumber = true
    })
  }, 1000)

  componentDidMount() {
    var myShakeEvent = new Shake({
      threshold: 15, // optional shake strength threshold
      timeout: 1000 // optional, determines the frequency of event generation
    });

    myShakeEvent.start();

    window.addEventListener('shake', this.showNumber)
  }

  onChangeNum = (num) => (e) => {
    this.setState({number: num})
  }

  ready = (e) => {
    this.setState({ selectNumber: true, showNumber: false })
  }

  hideNumber = () => {
    this.setState({ showNumber: false})
  }

  showNumber = () => {
    this.setState({ showNumber: true })
  }

  again = (e) => {
    this.setState({ selectNumber: false })
  }

  render() {
    const { showNumber, selectNumber, number } = this.state
    return (
      <div className="App">
        <div className="josh">
          Points:
        </div>
          {selectNumber
           ? (
             <div>
                {showNumber ? (
                  <div className="number inverse">
                    {number}
                  </div>
                ) : null }
                <button onClick={this.again}>Again</button>
               { showNumber ? (
                <button onClick={this.hideNumber}>Hide Number</button>
               ): (
                 <span>
                  <button onClick={this.showNumber}>Show Number</button>
                  <h4>
                    <i>Or shake phone</i>
                  </h4>
                 </span>

               )}
                </div>
           ) :
           (
             <div>
               <h2>
                 Using: {number}
               </h2>

               {['?', 1, 2, 3, 5, 8, 13, 21].map( num => {
                 return <button onClick={this.onChangeNum(num)}>{num}</button>
                 })
               }
               <button onClick={this.ready}>Ready</button>
             </div>
           )
          }
      </div>
    );
  }
}

export default App;
