class Panel {
  constructor(x, y) {
    this.x;
    this.y;
    this.color = 0;
    this.visits = 1;
  }

  Paint(c) {
    this.color = c;
    this.visits++;
  }
}

module.exports = Panel;
