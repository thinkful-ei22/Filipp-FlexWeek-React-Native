import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {
    loggedIn: null
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB24_be2QYKZPGh69xBBV6NdmrMgA-gAZI',
      authDomain: 'authentication-a8c7b.firebaseapp.com',
      databaseURL: 'https://authentication-a8c7b.firebaseio.com',
      projectId: 'authentication-a8c7b',
      storageBucket: 'authentication-a8c7b.appspot.com',
      messagingSenderId: '1034281207471'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
        <CardSection>
          <Button buttonText={'Log Out'} onPress={() => firebase.auth().signOut()} />
        </CardSection>)
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication"/>
        {this.renderContent()}
      </View>
    );
  }
}

export default App;