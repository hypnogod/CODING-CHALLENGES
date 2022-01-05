var canvas = document.getElementById("canvas1");
var context = canvas.getContext("2d");

var maxiterations = 100;

canvas.width = 920;
canvas.height = 920;

context.fillStyle = "red";
context.fillRect(0, 0, canvas.width, canvas.height);
var pixel = context.getImageData(0, 0, canvas.width, canvas.height);

// https://stackoverflow.com/questions/48802987/is-there-a-map-function-in-vanilla-javascript-like-p5-js
for (var y = 0; y < canvas.height; y++) {
  for (var x = 0; x < canvas.width; x++) {
    var a = mapRange(x, 0, canvas.width, -3, 2.5);
    var b = mapRange(y, 0, canvas.height, -3, 2.5);

    var ca = -0.835;
    var cb = -0.2321;

    

    var n = 0;

    while (n < maxiterations) {
      //
      var aa = a * a - b * b; // a^2 - b^2
      var bb = 2 * a * b; // 2ab
      a = aa + ca;
      b = bb + cb;
      if (a * a + b * b > 16) {
        break;
      }
      n++;
    }
    var color;
    var bright = mapRange(n, 0, maxiterations, 0, 1);
    bright = Math.sqrt(mapRange(Math.sqrt(bright), 0, 1, 0, 255));
    color = {
      r: mapRange(bright, 5, 14, 0, 255),
      g: 0,
      b: 0,
    };

    if (n == maxiterations) {
      color = {
        r: 0,
        g: 0,
        b: 0,
      };
    }

    var pix = (x + y * canvas.width) * 4;
    pixel.data[pix + 0] = color.r;
    pixel.data[pix + 1] = color.g;
    pixel.data[pix + 2] = color.b;
    pixel.data[pix + 3] = 255;
  }
}
context.putImageData(pixel, 0, 0);

function mapRange(value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value * (d - c);
}
