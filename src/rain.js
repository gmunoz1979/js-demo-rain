/** 
 * Definimos las dimensiones del contenedor
 */
const maxHeight = 400;
const maxWidth  = 400;

const bgColor = '#000000';

function getContext() {
  var canvas = document.getElementById('rain');

  if (!canvas || !canvas.getContext) {
    console.error('Canvas no soporta la funcion getContext');
    return;
  }

  return canvas.getContext('2d');
}

(
  function(root) {
    'use strict';

    root.onload = function() {
      var cxt = getContext();

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

          var speed = rm.getSpeed();

          rm.add(
            new RainDrop(
              {
                cxt: cxt,
                x:         rm.getPositionX(),
                angle:     angle,
                maxHeight: maxHeight,
                maxWidth:  maxWidth,
                bgColor:   bgColor,
                speed:     speed,
                color:     rm.getColor(speed),
                height:    rm.getHeight(speed)
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