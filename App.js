import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, Alert, Dimensions } from 'react-native';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

let pointColor = '#007700';



export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View style={styles.container}>
        {/* <ButtonTextTest /> */}
        <Fft />
      </View>
    );
  }
}

class Fft extends Component {
  constructor(props) {
    super(props);

    this.state = {data: []};
  }

  _createTestData() {
    const data =[];

    for (let x=0; x<=31; x++) {
      const rand = Math.random();
      const y = rand * 100;
      data.push(y);
    }
    return data;
  }


  render() {
    // let {height, width} = Dimensions.get('window');
    // let height = 100;
    // const height = Dimensions.get('window').heigth;
    const width = 400;
    const height = 200;
    return (

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'skyblue'
        }}>
        <Svg width='500' height='300'
          style={{
            backgroundColor: 'grey'
          }}
          >
            {/*  Cubic Bezier curve */}
            <Path
              d={toBezierCurveSVGString(
                new Point(0, 300),
                new Point(100, 150),
                new Point(400, 150),
                new Point(500, 300)
              )}
              // d='M 0 300 c 100 -150 400 -150 500 0'
              fill='none'
              stroke='black'
            />



            {/* <Circle
              cx='50%'
              cy='50%'
              r='100'
              stroke='black'
              strokeWeight='2.5'
              fill='grey'
            /> */}


          </Svg>
        </View>
      );
    }
  }

  function toBezierCurveSVGString(start, ctrl1, ctrl2, end) {
    return 'M ' + start.x + ' ' + start.y +
    'C' + ctrl1.x + ' ' + ctrl2.y + ' ' +
    end.x + ' ' + end.y;
  }

  class ButtonTextTest extends React.Component {
    constructor(props) {
      super(props);
      this.state = {text: ''};
    }

    _onPressButton() {
      Alert.alert('buttontap');
    }

    render() {
      let pic = {
        uri: 'https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_1280.png'
      };

      return (

        <View
          style={{
            flex: 0.7,
            width: '80%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'grey'
          }}>
          <TextInput
            style={{
              height: 40
            }}
            placeholder='ksfas'
            onChangeText={(text) => this.setState({text})}
          />
          <Text
            style={{
              fontSize: 50
            }}>
            {this.state.text}
          </Text>
          <Button
            onPress={this._onPressButton}
            title='Tap'
          />
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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });


  class Point {
    constructor(x, y, color = pointColor) {
      this.x = x;
      this.y = y;
      this.radius = 5;
      this.color = color;
    };

    display() {
      ctx.strokeStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      ctx.stroke();
    }

    copy(point) {
      this.x = point.x;
      this.y = point.y;
      this.radius = point.radius;
      this.color = point.color;
    }

    static lerp(start, end, amount) {
      return new Point(
        start.x * (1.0 - amount) + end.x * amount,
        start.y * (1.0 - amount) + end.y * amount,
      );
    }
  }
