import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, Alert, Dimensions } from 'react-native';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

import { Point } from './point.js';

export class Fft extends Component {
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
    this.state.data = Fft._createTestData(this.state.bands, this.state.maxDb);
  }

  static _createTestData(bands, maxDb) {
    const data =[];
    for (let i=0; i<bands; i++) {
      data.push(Math.random() * maxDb);
    }
    return data;
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

  _getFirstCurveSegmentString(curvePoints) {
    return this._getBezierCurveForSegment(
      curvePoints[0],
      curvePoints[0],
      curvePoints[2],
      curvePoints[1]
    );
  }

  _getMiddleCurveSegments(curvePoints) {
    let curveString = '';
    for (let i=1; i<curvePoints.length-2; i++) {
      curveString += this._getBezierCurveForSegment(
        curvePoints[i],
        curvePoints[i-1],
        curvePoints[i+2],
        curvePoints[i+1]
      );
    }
    return curveString;
  }

  _getEndSegmentCurveString(curvePoints) {
    let curveString = '';
    curveString += this._getBezierCurveForSegment(
      curvePoints[curvePoints.length-2],
      curvePoints[curvePoints.length-3],
      curvePoints[curvePoints.length-1],
      curvePoints[curvePoints.length-1]
    );
    return curveString;
  }

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
    curveString += this._getFirstCurveSegmentString(curvePoints);
    curveString += this._getMiddleCurveSegments(curvePoints);
    curveString += this._getEndSegmentCurveString(curvePoints);

    let curve = <Path
      d={curveString}
      fill='none'
      stroke='black'
    />

    return (
      <Svg width='500' height='300'
        style={{
          backgroundColor: 'grey'
        }}
        >
          {curve}
        </Svg>
      );
    }
  }
