import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class App extends React.Component {
  render() {

    let pic = {
      uri: 'https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_1280.png'
    };
    return (
      <View>
      <Blink text='Blinky' /> 
      </View>
      );
  }
}


class Fft extends Component {
  render() {
    return (
      <Text> Fft for {this.props.day} here</Text>
      );
  }
}

class Blink extends Component {
  constructor(props){
    super(props);
    this.state = {showText: true};

    setInterval(() => {
      this.setState(previousState => {
        return {
          showText: !previousState.showText 
        }
      });
    }, 1000);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text style={styles.bigRed}>{display}</Text>
      );
  }
}

const styles = StyleSheet.create( {
  bigRed: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30
  }
});