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

var id = 0;
function getID() { return 'rain-' + id++ };

(
  function(root) {
    'use strict';

    root.onload = function() {
      var cxt = getContext();

      if (!cxt) {
        console.error('No se encontro contexto. No se puede seguir ejecutando la Aplicacion.');
        return;
      }

      var rm = RainDropManager,
          timeDelta = 0;
      var loop = function() {
        if (new Date().getTime() > timeDelta) {

          var speed = rm.getSpeed();

          rm.add(
            new RainDrop(
              {
                cxt: cxt,
                x:         rm.getPositionX(),
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
          timeDelta = new Date().getTime() + Math.floor((Math.random() * 20) + 1);
        }

        RainDropManager.update();

        requestAnimationFrame(loop);
      }

      loop();
    }
  }
)(window);