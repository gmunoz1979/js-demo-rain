RainDropManager = Singleton(
  {
    instances: {},

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

    update: function(dt) {
      for (var name in this.instances) {
        this.instances[name].update && this.instances[name].update(dt);
      }
    },

    getPositionX: function() {
      var rnd  = 0,
          loop = 0,
          isValid = false,
          i = this.instances;

      while (!isValid) {
        rnd     = getRandom(1, maxWidth);
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

    getAngle: function() {
      return -getRandom(85, 95);
    },

    getType: function() {
      return getRandom(0, 5);
    }
  }
);