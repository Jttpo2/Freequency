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

function createTestData(bands, maxDb) {
  const data =[];
  for (let i=0; i<bands; i++) {
    data.push(Math.random() * maxDb);
  }
  return data;
}

class Fft extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      maxDb: 140,
      bands: 31,
      smoothingFactor: 1, // Smoothing the bezier curve,
      //should be a function of distance between data points
      width: 500,
      height: 300
    };
    this.state.data = createTestData(this.state.bands, this.state.maxDb);
  }

  _getBezierCurveForSegment(start, pre, post, end) {
    // http://www.efg2.com/Lab/Graphics/Jean-YvesQueinecBezierCurves.htm

    let symmetricalStart = this._invertWithRespectTo(start, pre);
    let symmetricalEnd = this._invertWithRespectTo(end, post);

    let sym1a = Point.lerp(start, symmetricalStart, this.state.smoothingFactor);
    let sym1b = Point.lerp(start, sym1a, 0.5);

    let sym2a = Point.lerp(end, symmetricalEnd, this.state.smoothingFactor);
    let sym2b = Point.lerp(end, sym2a, 0.5);

    let middle = Point.lerp(start, end, 0.5);

    let controlPoint1 = Point.lerp(sym1b, middle, 0.5);
    let controlPoint2 = Point.lerp(sym2b, middle, 0.5);

    return this._toSVGString(
      start,
      controlPoint1,
      controlPoint2,
      end
    );

    // ctx.strokeStyle = lineColor;
    // ctx.moveTo(start.x, start.y);
    // ctx.bezierCurveTo(
    //   controlPoint1.x, controlPoint1.y,
    //   controlPoint2.x, controlPoint2.y,
    //   end.x, end.y
    // );
  };

  _toSVGString(start, ctrl1, ctrl2, end) {
    return 'M ' + start.x + ' ' + start.y +
    'C' + ctrl1.x + ' ' + ctrl1.y + ' ' +
    ctrl2.x + ' ' + ctrl2.y + ' ' +
    end.x + ' ' + end.y;
  };

  _invertWithRespectTo(base, pointToInvert) {
    let newX = (base.x - pointToInvert.x) + base.x;
    let newY = (base.y - pointToInvert.y) + base.y;
    return new Point(newX, newY);
  };

  _scaleTo(height, yValue) {
    return (height / this.state.maxDb) * yValue;
  };

  render() {
    // Scale xOff to canvas width
    let xOff = this.state.width/(this.state.data.length -1);

    // Points to render curve from, coordinates in svg-space
    let curvePoints = this.state.data.map(function(yValue, index) {
      return new Point(
        index * xOff,
        this._scaleTo(this.state.height, yValue)
      );
    }, this);

    let curveString = '';

    // First segment
    curveString += this._getBezierCurveForSegment(
      curvePoints[0],
      curvePoints[0],
      curvePoints[2],
      curvePoints[1]
    );

    // Middle segments
    for (let i=1; i<curvePoints.length-2; i++) {
      curveString += this._getBezierCurveForSegment(
        curvePoints[i],
        curvePoints[i-1],
        curvePoints[i+2],
        curvePoints[i+1]
      );
    }

    // Last segment
    curveString += this._getBezierCurveForSegment(
      curvePoints[curvePoints.length-2],
      curvePoints[curvePoints.length-3],
      curvePoints[curvePoints.length-1],
      curvePoints[curvePoints.length-1]
    );

    let curve = <Path
      d={curveString}
      fill='none'
      stroke='black'
    />

    // for (let i=0; i<this.state.data.length; i++) {
    //   {/*  Cubic Bezier curve */}
    //   curves.push(
    //     <Path
    //     d={toBezierCurveSVGString(
    //       new Point(0, 300),
    //       new Point(100, 150),
    //       new Point(400, 150),
    //       new Point(500, 300)
    //     )}
    //     // d='M 0 300 c 100 -150 400 -150 500 0'
    //     fill='none'
    //     stroke='black'
    //   />
    // )
    // }

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
            {curve}

          </Svg>
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
