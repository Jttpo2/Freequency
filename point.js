export class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    };

    copy(point) {
      this.x = point.x;
      this.y = point.y;
    }

    static lerp(start, end, amount) {
      return new Point(
        start.x * (1.0 - amount) + end.x * amount,
        start.y * (1.0 - amount) + end.y * amount,
      );
    }
  }
