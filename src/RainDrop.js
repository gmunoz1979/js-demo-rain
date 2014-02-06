RainDrop = Class(
  {
    id: null,
    height: 0,
    width: 1,
    x: 0,
    y: 0,
    speed: 0,
    cxt: null,
    maxHeight: 0,
    maxWidth: 0,
    grd: null,    

    initialize: function(config) {
      apply(this, config);

      this.id = getID();
      this.y  = -this.height;
    },

    clear: function() {
      this.cxt.clearRect(this.x, this.y, this.width, this.height);
    },

    draw: function() {
      var x1 = this.x,
          y1 = this.y,
          x2 = this.x+this.width,
          y2 = this.y+this.height;

      var grad = this.cxt.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, this.bgColor);
      grad.addColorStop(1, this.color);

      this.cxt.save();
      this.cxt.fillStyle = grad;
      this.cxt.fillRect(this.x, this.y, this.width, this.height);
      this.cxt.restore();
    },

    update: function() {
      this.clear();
      this.y += this.speed;
      this.y <= this.maxHeight ? this.draw() : this.remove();
    }
  }
);