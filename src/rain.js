/**
 * Definimos las dimensiones del contenedor
 */
var MAXHEIGHT = 0;
var MAXWIDTH  = 0;
/**
 * Definimos color de fondo
 */
const BGCOLOR = '#000000';

/**
 * Definimos angulo inicial
 */
const ANGLE = -90;

function getAngle() {
  return {
    angle: RainDropManager.getAngle(),
    force: getRandom(500, 2000) / 1000.0,
    duration: getRandom(500, 1000),
    lock: false
  }
}

(
  function(root) {
    'use strict';

    root.onload = function() {
      var container = document.querySelector('.container');
      MAXHEIGHT = container.clientHeight;
      MAXWIDTH  = container.clientWidth;

      var canvas = document.querySelector('canvas');
      canvas.width  = MAXWIDTH;
      canvas.height = MAXHEIGHT;

      var cxt = getContext('rain');

      if (!cxt) {
        console.error('No se encontro contexto. No se puede seguir ejecutando la Aplicacion.');
        return;
      }

      var ct = new Date().getTime(),
          nt = 0;

      var rm = RainDropManager;

      var angle  = ANGLE,
          oAngle = getAngle();

      var factor = angle > oAngle.angle ? -1 : 1,
          tAngle;

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
                angle:     angle,
                maxHeight: MAXHEIGHT,
                maxWidth:  MAXWIDTH,
                bgColor:   BGCOLOR,
                type:      rm.getType()
              }
            )
          );

          if ((factor === 1 && oAngle.angle > angle) || (factor === -1 && angle > oAngle.angle)) {
            angle += (factor * dt * oAngle.force);
            tAngle = ct + oAngle.duration;
          }
          else {
            if (ct > tAngle) {
              if (oAngle.angle === ANGLE) {
                oAngle = getAngle();
                factor = angle > oAngle.angle ? -1 : 1;
              }
              else {
                oAngle.angle = ANGLE;
                oAngle.duration = getRandom(1000, 3000);
                oAngle.force = 2;
                factor = angle > oAngle.angle ? -1 : 1;
              }
            }
          }

          /**
           * Siguiente grupo de gotas
           */
          nt = getNextTime(1, 20);
        }

        RainDropManager.update(dt, angle);
        requestAnimationFrame(loop);
      }

      loop();
    }
  }
)(window);
