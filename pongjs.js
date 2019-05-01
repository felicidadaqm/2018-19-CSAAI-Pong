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
    this.vy = 1;
    this.speed = 5;

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
        this.y += this.dir * this.speed * this.vy;
      } else if (this.y > 0) {
        this.y += this.dir * this.speed * this.vy;
      } else {
        this.y = -1 * this.speed * this.vy;
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
                raqueta1.vy = -1;
                raqueta2.vy = 0;
                break;
            case 's':
                raqueta1.vy = 1;
                raqueta2.vy = 0;
                break;
            case 'ArrowUp':
                raqueta1.vy = 0;
                raqueta2.vy = -1;
                break;
            case 'ArrowDown':
                raqueta1.vy = 0;
                raqueta2.vy = 1;
                break;
            default:
                raqueta1.vy = 0;
                raqueta2.vy = 0;
                break;
        }
        raqueta1.update();
        raqueta2.update();
      }
    }

    var score = {
      scplayer1: 0,
      scplayer2: 0,
      winner : 0,

      reset : function() {
        this.scplayer1 = 0;
        this.scplayer2 = 0;
        this.winner = 0;
      },

      init : function(ctx) {
        this.ctx = ctx;
      },

      draw : function() {
        ctx.font = "70px Arial";
        ctx.fillStyle = 'white'
        ctx.fillText(this.scplayer1, 220, 60);
        ctx.fillText(this.scplayer2, 340, 60);

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

    xspeed : 5,
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
      ctx.beginPath();
      //-- Dibujar un circulo: coordenadas x,y del centro
      //-- Radio, Angulo inicial y angulo final
      ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
      //-- Dibujar el relleno
      ctx.fillStyle = 'white';
      ctx.fill()
    },

    update : function() {
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

  function check_options(bola, level) {
    switch (level) {
      case "E":
        bola.xspeed = 1;
        break;
      case "M":
        bola.xspeed = 3;
        break;
      case "H":
        bola.xspeed = 5;
        break
      default:
        bola.speed = 3;
        break
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
  var pointstw = document.querySelector('input[name="point"]:checked').value;
  var difficulty = document.querySelector('input[name="diff"]:checked').value;

  sacar.onclick = () => {
    pointstw = document.querySelector('input[name="point"]:checked').value;
    level = document.querySelector('input[name="diff"]:checked').value;
    check_options(bola, level)

    if (!timer) {
      // Lanzar timer si es que no estaba ya lanzado
      timer = setInterval(() => {
        // Cada 20ms, actualizamos bola
        bola.update()
        // Borramos canvas
        ctx.clearRect(0,0,canvas.width, canvas.height);
        // Dibujo la bola
        bola.draw()
        raqueta1.draw()
        raqueta2.draw()
        score.update()
        score.draw()

        move_raqueta(raqueta1, raqueta2)
        rebote(raqueta1, raqueta2, bola)

        // Condición de terminación
        if (pointstw != "inf") {
          if (pointstw == score.scplayer1 || pointstw == score.scplayer2) {
            clearInterval(timer)
            timer = null;
            ctx.clearRect(0,0,canvas.width, canvas.height);

            ctx.font = "50px Arial";
            ctx.fillStyle = 'white'
            ctx.fillText("GAME OVER", 150, 200);
            console.log(score.scplayer1)
            console.log(score.scplayer2)
            if (score.scplayer1 > score.scplayer2) {
              ctx.fillText("PLAYER 1 WINS", 125, 300);
            } else {
              ctx.fillText("PLAYER 2 WINS", 125, 300);
            }

            bola.reset()
            raqueta1.reset()
            raqueta2.reset()
            score.reset()

            bola.draw()
            raqueta1.draw()
            raqueta2.draw()
            score.draw()
          }
        }
      }, 20);
    }
  }
}
