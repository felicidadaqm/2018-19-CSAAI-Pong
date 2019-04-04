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
    this.y = this.y_init;
    this.dir = 1;
    this.yspeed = 0;

    this.reset = function() {
      this.y = this.y_init;
    },

    this.init = function(ctx) {
      this.ctx = ctx;
      this.reset();
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

  var raqueta1 = new raqueta(50, 200);
  var raqueta2 = new raqueta(550, 200);

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

var score = {
    scplayer1: 0,
    scplayer2: 0,
    winner : 0,

    init : function(ctx) {
      this.ctx = ctx;
    },

    draw : function() {
      ctx.font = "70px Arial";
      ctx.fillStyle = 'white'
      ctx.fillText(this.scplayer1, 250, 60);
      ctx.fillText(this.scplayer2, 320, 60);

      // Lineas verticales
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.setLineDash([20,15])
      ctx.moveTo(canvas.width/2, 0)
      ctx.lineTo(canvas.width/2, canvas.height)
      ctx.stroke();
    },

    update : function() {
      if (bola.x > canvas.width) {
        this.scplayer1 += 1;
        this.winner = 1;
        restart(this.winner, bola, raqueta1, raqueta2)
      } else if (bola.x < 0) {
        this.scplayer2 += 1;
        this.winner = 2;
        restart(this.winner, bola, raqueta1, raqueta2)
      }
    }
  }


  // Animamos la pelota
  var bola = {
    x : 0,
    y : 0,

    x_init : 300,
    y_init : 200,

    xspeed : 3,
    yspeed : 1,
    ang : 1,

    ctx: null,
    width : 3,
    height : 5,

    reset : function() {
      this.x = this.x_init;
      this.y = this.y_init;
      this.ang = 1;
    },

    init : function(ctx) {
      //console.log("Bola: Init");
      this.reset();
      this.ctx = ctx;
    },

    draw : function() {
      //console.log("Bola: Draw");
      ctx.beginPath();
      //-- Dibujar un circulo: coordenadas x,y del centro
      //-- Radio, Angulo inicial y angulo final
      ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
      //-- Dibujar el relleno
      ctx.fillStyle = 'white';
      ctx.fill()
    },

    update : function() {
      //console.log("Bola: Update");
      // Rebotando si choca contra y
      if (this.y < 0) {
        this.ang = this.ang * -1
      } else if (this.y > canvas.height) {
        this.ang = this.ang * -1
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

  function restart(winner, bola, raqueta1, raqueta2) {
    //Si la pelota sale del campo, reiniciamos
    bola.reset();
    raqueta1.reset();
    raqueta2.reset();

    if (winner == 1) {
      bola.xspeed = -1 * bola.xspeed;
    } else if (winner == 2) {
      bola.xspeed = -1 * bola.xspeed;
    }
  }

  bola.init(ctx);
  bola.draw();
  raqueta1.init(ctx);
  raqueta1.draw();
  raqueta2.init(ctx);
  raqueta2.draw();
  score.init(ctx);
  score.draw();

  var timer = null;
  var sacar = document.getElementById("sacar");

  sacar.onclick = () => {
    if (!timer) {
      // Lanzar timer si es que no estaba ya lanzado
      timer = setInterval(() => {
        // Cada 20ms, actualizamos bola
        bola.update()
        move_raqueta(raqueta1, raqueta2)
        // Borramos canvas
        ctx.clearRect(0,0,canvas.width, canvas.height);
        // Dibujo la bola
        bola.draw()
        raqueta1.draw()
        raqueta2.draw()
        score.update()
        score.draw()
        rebote(raqueta1, raqueta2, bola)
        // Condición de terminación
      }, 20);
    }
  }
}
