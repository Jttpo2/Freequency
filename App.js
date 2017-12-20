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

          </Svg>
        </View>
      );
    }
  }

  function toBezierCurveSVGString(start, ctrl1, ctrl2, end) {
    return 'M ' + start.x + ' ' + start.y +
    'C' + ctrl1.x + ' ' + ctrl1.y + ' ' +
    ctrl2.x + ' ' + ctrl2.y + ' ' +
    end.x + ' ' + end.y;
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
