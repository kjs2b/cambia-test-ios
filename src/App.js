import React, { Component } from 'react';
import { View } from 'react-native';
import Login from './components/Login';
import Checker from './components/Checker';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loggedIn: false };
    this.login = this.logIn.bind(this);
  }

  logIn() {
    this.setState({ loggedIn: true }) ;
  }

  render() {
    if (this.state.loggedIn !== null) {
      if (!this.state.loggedIn) {
        return (
          <Login onLogin={this.logIn} />
        );
      }
        return (
          <View>
            <Checker />
          </View>
        );
    }
  }
}

export default App;
