function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

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

}
