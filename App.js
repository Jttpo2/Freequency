import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Fft } from './fft.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View style={styles.container}>
        <Fft style={styles.fft}/>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fft: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'skyblue'
  }
});
