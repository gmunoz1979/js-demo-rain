RainDrop = Class(
  {
    id: null,
    y: 0,
    height: 0,
    width: 1,
    speed: 0,
    cxt: null,
    maxHeight: 0,
    maxWidth: 0,
    grd: null,
    angle: -90,
    radius: 0,
    rad: 0,
    xy1: null,
    xy2: null,
    type: 0,
    color: null,

    colors: [
      '#160d50',
      '#483D8B',
      '#009ACD',
      '#00B2EE',
      '#97FFFF'
    ],

    sizes: [
       40,
       60,
       80,
      100,
      120
    ],

    speeds: [
      200,
      300,
      400,
      500,
      600
    ],

    initialize: function(config) {
      apply(this, config);

      this.id     = getID();
      this.rad    = (Math.PI/180) * this.angle;
      this.color  = this.colors[this.type];
      this.height = this.sizes[this.type];
      this.speed  = this.speeds[this.type];

      this.xy1 = this.getXY(this.radius-this.height);
      this.xy2 = this.getXY(this.radius);
    },

    setAngle: function(angle) {
      if (angle === this.angle) {
        return;
      }

      this.angle = angle;
      this.rad   = (Math.PI/180) * this.angle;
    },

    getXY: function(radius) {
      return {
        y: this.y - Math.ceil(Math.sin(this.rad) * radius),
        x: this.x - Math.ceil(Math.cos(this.rad) * radius)
      }
    },

    clear: function() {     
      this.cxt.save();
      this.cxt.lineWidth = 2;
      this.cxt.strokeStyle = '#000000';
      this.cxt.beginPath();
      this.cxt.moveTo(this.xy1.x, this.xy1.y);
      this.cxt.lineTo(this.xy2.x, this.xy2.y);
      this.cxt.stroke();
      this.cxt.restore();
    },

    draw: function() {
      var xy1 = this.xy1 = this.getXY(this.radius-this.height),
          xy2 = this.xy2 = this.getXY(this.radius);

      var grad = this.cxt.createLinearGradient(xy1.x, xy1.y, xy2.x, xy2.y);
      grad.addColorStop(0, this.bgColor);
      grad.addColorStop(1, this.color);

      this.cxt.save();
      this.cxt.strokeStyle = grad;
      this.cxt.beginPath();
      this.cxt.moveTo(xy1.x, xy1.y);
      this.cxt.lineTo(xy2.x, xy2.y);
      this.cxt.stroke();
      this.cxt.restore();
    },

    update: function(dt) {
      this.clear();
      this.radius += dt * this.speed;

      if (this.xy1.x < 0 || this.xy1.x > this.maxWidth) {
        this.remove();
        return;
      }

      if (this.xy2.y < this.maxHeight) {
        this.draw();
        return;
      }

      this.remove();
    }
  }
);