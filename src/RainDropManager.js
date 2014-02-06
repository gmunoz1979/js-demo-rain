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

    update: function() {
      for (var name in this.instances) {
        this.instances[name].update && this.instances[name].update();
      }
    }
  }
);