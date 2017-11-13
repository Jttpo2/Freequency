import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, Alert} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {

    let pic = {
      uri: 'https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_1280.png'
    };

    _onPressButton() {
      Alert.alert('buttontap');
    }

    return (

      <View style={styles.container}>

        <View style={{
          flex: 0.5,
          flexDirection: 'column'
        }}
        >
          <TextInput
            style={{height: 40}}
            placeholder='k'
            onChangeText={(text) => this.setState({text})}
          />
          <Text style={{fontSize: 33}}>
            {this.state.text}
          </Text>
          <Button
            onPress={this._onPressButton}
            title='Tap'
          />
        </View>

      </View>
    );
  }
}


class Fft extends Component {
  render() {
    return (
      // <Text> Fft for {this.props.day} here</Text>

      <View style={{
        flex: 0.5,
        height: '50%'
      }}>
      <View style={{flex: 3, backgroundColor: 'skyblue'}} />
    </View>


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
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigRed: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30
  }
});
