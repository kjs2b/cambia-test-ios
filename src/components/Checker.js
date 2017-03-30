import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import axios from 'axios';

class Checker extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getBills() {
    axios.get('http://localhost:4040/bills')
      .then((res) => this.setState({ bills: res.body.bills }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <TouchableHighlight
        style={Styles.buttonStyle}
        onPress={this.getBills}
      >
        <Text style={Styles.textStyle}>Find my billing discrepancy</Text>
      </TouchableHighlight>
      );
  }

}

const Styles = {
  buttonStyle: {
    marginTop: 75,
    marginLeft: 120,
    marginRight: 120,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: 'blue',
    height: 55
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center'
  }
};

export default Checker;
