import React, { Component } from 'react';
import { NativeModules, View, Text, TextInput, TouchableHighlight } from 'react-native';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '', hash: '' };
  }

  login() {
    //add a salt, hash with sha256
    NativeModules.Aes.sha256('salt123' + this.state.password)
      .then((hash) => { 
        axios.post('http://localhost:4040/login', {
          email: this.state.email,
          hash
        })
      .then((res) => {
        if (res.body === 'Match') this.onLogin();
      })
      .catch((err) => console.log(err));
    });
  }

  register() {
    //add a salt, hash with sha256
    NativeModules.Aes.sha256('salt123' + this.state.password)
      .then((hash) => { 
        axios.post('http://localhost:4040/register', {
          email: this.state.email,
          hash
        })
      .then((res) => this.onLogin())
      .catch((err) => console.log(err));
    });
  }

  render() {
    return (
      <View style={styles.formStyle}>
        <Text>Email: </Text>
        <TextInput
          style={{ height: 40, borderWidth: 1, paddingLeft: 10 }}
          placeholder="Enter email here"
          onChangeText={(email) => this.setState({ email })}
        />
        <Text>Password: </Text>
        <TextInput
          style={{ height: 40, borderWidth: 1, paddingLeft: 10 }}
          placeholder="Enter password here"
          onChangeText={(password) => this.setState({ password })}
        />
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={this.login.bind(this)}
            style={styles.loginStyle}
          >
            <Text style={{ fontSize: 22 }}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.register.bind(this)}
            style={styles.registerStyle}
          >
            <Text style={{ fontSize: 22 }}>Register</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttonContainer: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  loginStyle: {
    borderWidth: 1,
    backgroundColor: 'blue',
    borderRadius: 5,
    width: 90,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  registerStyle: {
    borderWidth: 1,
    backgroundColor: 'red',
    borderRadius: 5,
    width: 90,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  formStyle: {
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 40
  }
};

export default Login;
