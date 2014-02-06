/** 
 * Definimos las dimensiones del contenedor
 */
const maxHeight = 400;
const maxWidth  = 400;

const bgColor = '#000000';
const colors  = [
  '#4EB4BB',
  '#CACA6C',
  '#83BD99'
];

function getRandom(min, max) {
  max = max - min + (min != 0 ? 1 : 0);

  return Math.floor((Math.random()*max)+min);
}

function getSpeed() {
  return getRandom(5, 7);
}

function getHeight() {
  return getRandom(100, 120);
}

function getX() {
  return getRandom(1, maxWidth);
}

function getColor() {
  return colors[getRandom(0, colors.length)];
}

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

      var timeDelta = 0;
      var loop = function() {
        if (new Date().getTime() > timeDelta) {

          RainDropManager.add(
            new RainDrop(
              {
                cxt: cxt,
                maxHeight: maxHeight,
                maxWidth: maxWidth,
                bgColor: bgColor,
                color: getColor(),
                speed: getSpeed(),
                height: getHeight(),
                x: getX()
              }
            )
          );

          /** 
           * Siguiente grupo de gotas
           */
          timeDelta = new Date().getTime() + Math.floor((Math.random() * 100) + 1);
        }

        RainDropManager.update();

        requestAnimationFrame(loop);
      }

      loop();
    }
  }
)(window);