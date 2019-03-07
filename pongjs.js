function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  window.onkeydown = (e) => {
    e.preventDefault();

    console.log(e.key);
    
    if (e.key == "a") {
      console.log("tecla a pressed")
    }
  }

/*
  // Raquetas
  ctx.fillStyle = "white";
  ctx.fillRect(50, 50, 10, 40);
  ctx.fillRect(500, 300, 10, 40);


  // Dibujamos el círculo
  ctx.beginPath();
  //-- Dibujar un circulo: coordenadas x,y del centro
  //-- Radio, Angulo inicial y angulo final
  ctx.arc(400, 250, 5, 0, 2 * Math.PI);
  //-- Dibujar el relleno
  ctx.fillStyle = 'white';
  ctx.fill()

  // Lineas verticales
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.setLineDash([20,15])
  ctx.moveTo(canvas.width/2, 0)
  ctx.lineTo(canvas.width/2, canvas.height)
  ctx.stroke();

  //  var y = 0;
  //  while (y <= 400)
  //  {
  //    ctx.fillStyle = "white";
  //    ctx.fillRect(300, y, 2, 15);
  //    y += 30;
  //  }

  // Poniendo letras
  ctx.font = "70px Arial";
  ctx.fillStyle = 'white'
  ctx.fillText("2", 250, 60);
  ctx.fillText("0", 320, 60);
*/

  // Animamos la pelota
  var bola = {

    x : 0,
    y : 0,

    x_init : 50,
    y_init : 50,

    xspeed : 10,
    yspeed : 1,

    ctx: null,
    width : 5,
    height : 5,

    reset : function() {
      this.x = this.x_init;
      this.y = this.y_init;
    },

    init : function(ctx) {
      console.log("Bola: Init");
      this.reset();
      this.ctx = ctx;
    },

    draw : function() {
      console.log("Bola: Draw");
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    update : function() {
      console.log("Bola: Update");
      this.x = this.x + this.xspeed;
      this. y = this.y + this.yspeed;
    }
  }

  bola.init(ctx);
  bola.draw();

  var timer = null;
  var sacar = document.getElementById("sacar");

  sacar.onclick = () => {
    if (!timer) {
      // Lanzar timer si es que no estaba ya lanzado
      timer = setInterval(() => {
        console.log("aiuda");
        // Cada 20ms, actualizamos bola
        bola.update()
        // Borramos canvas
        ctx.clearRect(0,0,canvas.width, canvas.height);
        // Dibujo la bola
        bola.draw()
        // Condición de terminación
        if (bola.x > canvas.width) {
          clearInterval(timer);
          timer = null;
          bola.reset();
          bola.draw();
        }
      }, 20);
    }
  }
}
