function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");


  // Raquetas
  function raqueta(x_init, y_init) {
    this.color = "white";
    this.x_init = x_init;
    this.y_init = y_init;
    this.x = 0;
    this.y = 200;
    this.dir = 1;
    this.yspeed = 0;

    this.init = function(ctx) {
      this.ctx = ctx;
      //this.reset();
    };

    this.draw = function() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x_init, this.y, 10, 40);
    };

    this.update = function () {
      if (this.y < canvas.height) {
        this.y += this.dir * this.yspeed;
      } else if (this.y > 0) {
        this.y += this.dir * this.yspeed;
      } else {
        this.y = -1 * this.yspeed;
      }
  }
}

  var raqueta1 = new raqueta(50, 50);
  var raqueta2 = new raqueta(550, 300);

  function move_raqueta(raqueta1, raqueta2) {
    window.onkeydown = (e) => {
        e.preventDefault();
        console.log(e.key)
        switch (e.key) {
            case 'w':
                raqueta1.yspeed = -5;
                raqueta2.yspeed = 0;
                break;
            case 's':
                raqueta1.yspeed = 5;
                raqueta2.yspeed = 0;
                break;
            case 'ArrowUp':
                raqueta1.yspeed = 0;
                raqueta2.yspeed = -5;
                break;
            case 'ArrowDown':
                raqueta1.yspeed = 0;
                raqueta2.yspeed = 5;
                break;
            default:
                raqueta1.yspeed = 0;
                raqueta2.yspeed = 0;
                break;
        }
        raqueta1.update();
        raqueta2.update();
      }
    }



/*
  // Dibujamos el círculo
  ctx.beginPath();
  //-- Dibujar un circulo: coordenadas x,y del centro
  //-- Radio, Angulo inicial y angulo final
  ctx.arc(400, 250, 5, 0, 2 * Math.PI);
  //-- Dibujar el relleno
  ctx.fillStyle = 'white';
  ctx.fill()
*/

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


  // Animamos la pelota
  var bola = {

    x : 0,
    y : 0,

    x_init : 50,
    y_init : 50,

    xspeed : 3,
    yspeed : 1,
    ang : 1,

    ctx: null,
    width : 3,
    height : 5,

    reset : function() {
      this.x = this.x_init;
      this.y = this.y_init;
    },

    init : function(ctx) {
      //console.log("Bola: Init");
      this.reset();
      this.ctx = ctx;
    },

    draw : function() {
      //console.log("Bola: Draw");
      /*this.ctx.fillStyle = "white";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);*/
      ctx.beginPath();
      //-- Dibujar un circulo: coordenadas x,y del centro
      //-- Radio, Angulo inicial y angulo final
      ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
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
    },

    update : function() {
      //console.log("Bola: Update");
      if (this.x > canvas.width) {
        this.xspeed = (-1 * this.xspeed);
      } else if (this.x < 0) {
        this.xspeed = (this.xspeed * -1);
      }

      this.x = this.x + this.xspeed;
      this.y = this.y + this.yspeed * this.ang;

    }
  }

  function reboundAngle(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function rebote(raqueta1, raqueta2, bola) {
    // Rebote lazo izquierdo.
    if (bola.x <= raqueta1.x_init) {
      if (bola.y >= raqueta1.y && bola.y <= (raqueta1.y + 40)) {
        bola.ang =  reboundAngle(-2, 2)
        bola.xspeed = -1 * bola.xspeed
      }
    }

    // Rebote lado derecho
    if (bola.x >= raqueta2.x_init) {
      if(bola.y >= raqueta2.y && bola.y <= (raqueta2.y + 40)) {
        bola.ang =  reboundAngle(-2, 2)
        bola.xspeed = -1 * bola.xspeed;
      }
    }
  }

  bola.init(ctx);
  bola.draw();
  raqueta1.init(ctx);
  raqueta1.draw();
  raqueta2.init(ctx);
  raqueta2.draw();

  var timer = null;
  var sacar = document.getElementById("sacar");

  sacar.onclick = () => {
    if (!timer) {
      // Lanzar timer si es que no estaba ya lanzado
      timer = setInterval(() => {
        // Cada 20ms, actualizamos bola
        bola.update()
        //console.log(raqueta1.yspeed)
        move_raqueta(raqueta1, raqueta2)
        // Borramos canvas
        ctx.clearRect(0,0,canvas.width, canvas.height);
        // Dibujo la bola
        bola.draw()
        raqueta1.draw()
        raqueta2.draw()
        rebote(raqueta1, raqueta2, bola)
        // Condición de terminación
      }, 20);
    }
  }
}
