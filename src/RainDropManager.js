RainDropManager = Singleton(
  {
    instances: {},

    colors: [
      '#483D8B',
      '#009ACD',
      '#00B2EE',
      '#97FFFF'
    ],

    add: function(instance) {
      if (this.instances[instance.id]) {
        return;
      }

      var self = this;
      instance.remove = function() { self.remove(instance); }

      this.instances[instance.id] = instance;
    },

    remove: function(instance) {
      delete this.instances[instance.id];
    },

    update: function() {
      for (var name in this.instances) {
        this.instances[name].update && this.instances[name].update();
      }
    },

    getPositionX: function() {
      var rnd  = 0,
          loop = 0,
          isValid = false,
          i = this.instances;

      while (!isValid) {
        rnd     = this.getRandom(1, maxWidth);
        isValid = true;

        for (var n in i) {
          if (i[n].x === rnd || (Math.abs(i[n].x - rnd) <= 8)) {
            isValid = false;
            break;
          }
        }

        if (++loop == 100) {
          isValid = true;
        }
      }

      return rnd;
    },

    getColor: function(speed) {
      return this.colors[speed - 6];
    },

    getSpeed: function() {
      return this.getRandom(6, 9);
    },

    getHeight: function(speed) {
      return ((speed - 6) * 10) + 90;
    },

    getRandom: function(min, max) {
      max = max - min + (min != 0 ? 1 : 0);
      return Math.floor((Math.random()*max)+min);
    }
  }
);