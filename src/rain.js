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

      var ct = new Date().getTime(),
          nt = 0;
          
      var rm = RainDropManager;

      var angle  = 90;

      var loop = function() {
        var tt = new Date().getTime();
        var dt = (tt - ct) / 1000;
        ct = tt;

        if (ct > nt) {
          rm.add(
            new RainDrop(
              {
                cxt: cxt,
                x:         rm.getPositionX(),
                angle:     -angle,
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
          nt = getNextTime(1, 20);
        }

        RainDropManager.update(dt);
        requestAnimationFrame(loop);
      }

      loop();
    }
  }
)(window);