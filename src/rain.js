/** 
 * Definimos las dimensiones del contenedor
 */
const MAXHEIGHT = 400;
const MAXWIDTH  = 400;
/**
 * Definimos color de fondo
 */
const BGCOLOR = '#000000';

/**
 * Definimos angulo inicial
 */
const ANGLE = 90;

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

      var angle = ANGLE;

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
                maxHeight: MAXHEIGHT,
                maxWidth:  MAXWIDTH,
                bgColor:   BGCOLOR,
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