class Math2 {
  /* Inclusive Min, Esclusive min */
  static randomInt(min, max) {
    const minVal = Math.ceil(min);
    const maxVal = Math.floor(max);
    return Math.floor(Math.random() * (maxVal - minVal)) + minVal; //Inclusive min Esclusive max
  }

  static distance(pointA, pointB) {
    return Math.sqrt(
      Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2)
    );
  }
}
export default Math2;
