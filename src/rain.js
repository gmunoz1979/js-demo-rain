/** 
 * Definimos las dimensiones del contenedor
 */
const maxHeight = 400;
const maxWidth  = 400;

const bgColor = '#000000';

(
  function(root) {
    'use strict';

    root.onload = function() {
      var cxt = getContext('rain');

      if (!cxt) {
        console.error('No se encontro contexto. No se puede seguir ejecutando la Aplicacion.');
        return;
      }

      var nextAngle    = 0,
          nextRainDrop = 0,
          curTime = new Date().getTime(),
          rm = RainDropManager,
          angle;

      var loop = function() {
        var dt  = (new Date().getTime() - curTime) / 1000;
        curTime = new Date().getTime();

        if (curTime > nextAngle) {
          angle = rm.getAngle();

          /** 
           * Entre 5 y 10 segundos cambiar el angulo
           * de las gotas.
           */
          nextAngle = getNextTime(5000, 10000);
        }

        if (curTime > nextRainDrop) {
          rm.add(
            new RainDrop(
              {
                cxt: cxt,
                x:         rm.getPositionX(),
                angle:     angle,
                maxHeight: maxHeight,
                maxWidth:  maxWidth,
                bgColor:   bgColor,
                type:      rm.getType()
              }
            )
          );

          /** 
           * Siguiente grupo de gotas
           */
          nextRainDrop = getNextTime(1, 20);
        }
        
        RainDropManager.update(dt);
        requestAnimationFrame(loop);
      }

      loop();
    }
  }
)(window);