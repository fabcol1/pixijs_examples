class KeyBoardKey {
  constructor(value, press, release) {
    this.value = value;
    this.isDown = false;
    this.isUp = true;
    this.press = press;
    this.release = release;

    this.downListener = this._downHandler.bind(this);
    this.upListener = this._upHandler.bind(this);

    window.addEventListener('keydown', this.downListener, false);
    window.addEventListener('keyup', this.upListener, false);
  }

  //The `downHandler`
  _downHandler(event) {
    console.log(this.press);
    if (event.key === this.value) {
      if (this.isUp && this.press) this.press();
      this.isDown = true;
      this.isUp = false;
      event.preventDefault();
    }
  }

  //The `upHandler`
  _upHandler(event) {
    if (event.key === this.value) {
      if (this.isDown && this.release) this.release();
      this.isDown = false;
      this.isUp = true;
      event.preventDefault();
    }
  }

  // Detach event listeners
  unsubscribe() {
    window.removeEventListener('keydown', this.downListener);
    window.removeEventListener('keyup', this.upListener);
  }
}

export default KeyBoardKey;
