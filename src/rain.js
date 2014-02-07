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

      var timeDeltaAngle = 0,
          timeDelta = 0,
          rm = RainDropManager,
          angle;

      var loop = function() {
        if (new Date().getTime() > timeDeltaAngle) {
          angle = rm.getAngle();

          /** 
           * Entre 5 y 10 segundos cambiar el angulo
           * de las gotas.
           */
          timeDeltaAngle = getNextTime(5000, 10000);
        }

        if (new Date().getTime() > timeDelta) {
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
          timeDelta = getNextTime(1, 20);
        }

        RainDropManager.update();
        requestAnimationFrame(loop);
      }

      loop();
    }
  }
)(window);