let cnv = document.getElementById('canvas'),
    ctx = cnv.getContext('2d'),
    pancil = 10,
    defaultPancil = 10,
    circle = document.getElementById('circle'),
    savedCoords = [],
    color = document.getElementById('color'),
    mouse = false,
    timePlaySavedCoords = 10,
    clearInput = document.getElementById('clear');

cnv.width = window.innerWidth;
cnv.height = window.innerHeight;




//Будущий код!!!
// ctx.beginPath();
// ctx.scale(2,2);
// ctx.moveTo(100, 100);
// ctx.lineTo(50, 150);
// ctx.lineTo(150, 150);
// ctx.closePath();
// ctx.fill();

//прямоугольник
// ctx.beginPath();
// ctx.fillRect(c.clientX, c.clientY, 20, 20);
// ctx.fill();

//text background gradient
// var grad = ctx.createRadialGradient(75, 50, 0, 50, 50, 100);
// grad.addColorStop('.50', 'red');
// grad.addColorStop('.70', 'green');
// grad.addColorStop('.30', 'blue');
// ctx.fillStyle = grad;
// ctx.font = '30px sans-serif';
// // ctx.textAlign ='center'; 
// ctx.fillText('Eldiar312', 100, 100);
//Будущий код!!!



//click clear button function!!!
clearInput.addEventListener('click', () => clear() )
circle.addEventListener('keyup', () => pancil = circle.value )


//clear!!!
function clear() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  ctx.beginPath();
  ctx.fillStyle = color;
}

//save!!!
function save() {
  localStorage.setItem('savedCoords', JSON.stringify(savedCoords));
}

//saved Color
function savedColor() {
  localStorage.setItem('savedColor', color.value); 
}

//saved Circle Size
function cirlceSize() {
  localStorage.setItem('sevedCirlceSize', pancil);
}

//play saved coords!!!
function play() {
  var timer = setInterval(() => {
    if ( !savedCoords.length ) {
      clearInterval(timer);
      ctx.beginPath();
      return
    }

    const crd = savedCoords.shift(),
      c = {
        clientX: crd['0'],
        clientY: crd['1']
      };

    ctx.strokeStyle = localStorage.getItem('savedColor');
    ctx.lineWidth = localStorage.getItem('sevedCirlceSize') * 2;
    ctx.lineTo(c.clientX, c.clientY);
    ctx.stroke();

    ctx.fillStyle = localStorage.getItem('savedColor');
    ctx.beginPath();
    ctx.arc(c.clientX, c.clientY, localStorage.getItem('sevedCirlceSize'), 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(c.clientX, c.clientY);
  }, timePlaySavedCoords)
}



//комбинация клавишь
document.addEventListener('keydown', ( k ) => {
  //sved coords
  if ( k.keyCode == 83 ) {
  save()
  savedColor()
  cirlceSize()
  console.log('savedCoords')
  console.log('savedColor')
  }

  //play!!! saved coords
  if ( k.keyCode == 82 ) {
  savedCoords = JSON.parse(localStorage.getItem('savedCoords'))
  localStorage.getItem('savedColor')
  localStorage.getItem('sevedCirlceSize')
  clear()
  play()
  console.log('playing')
  }

  //clear code
  if ( k.keyCode == 67 ) {
  clear()
  console.log('clear')
  }
});
//комбинация клавишь





//mouse code
cnv.addEventListener('mousedown', () => {
  mouse = true
})

cnv.addEventListener('mouseup', () => {
  mouse = false
  savedCoords.push('mouseUp')
  ctx.beginPath()
})

cnv.addEventListener('mousemove', c => {
  if (mouse) {
    savedCoords.push([c.clientX, c.clientY])

    ctx.strokeStyle = color.value;
    ctx.lineWidth = pancil * 2;
    ctx.lineTo(c.clientX, c.clientY);
    ctx.stroke()

    ctx.fillStyle = color.value;
    ctx.beginPath();
    ctx.arc(c.clientX, c.clientY, pancil, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(c.clientX, c.clientY);
  }
})