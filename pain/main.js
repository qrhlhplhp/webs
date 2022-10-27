const button = document.getElementById("button");
const canvas = document.getElementById("canvas");
const title = document.getElementById("title");
const head = document.getElementById("head");
const colorele = document.getElementById("colorele");
const rangele = document.getElementById("rangele");
const save = document.getElementById("save");
const ctx = canvas.getContext("2d");
let power = 1920 / canvas.clientWidth;
let isDrawing = false;
let x = 0;
let y = 0;
let t =false;
let color = "#000000";
let bold = 50;
let image = new Image();

canvas.width = 1920;
canvas.height = 1080;
image.src = "the pain.jpg";
image.onload = () => {
    pain();
}

const start =e => {
    if(e.type=="mousedown"){
        x = e.offsetX * power;
        y = e.offsetY * power;
    }else{
        x = fixPosX(e.touches[0].pageX);
        y = fixPosY(e.touches[0].pageY);
    }
    isDrawing = true;
  };
const move =  e => {
    if (isDrawing === true) {
        if(e.type=="mousemove"){
            drawLine(ctx, x, y, e.offsetX * power, e.offsetY * power);
            x = e.offsetX * power;
            y = e.offsetY * power;
        }else{
            e.preventDefault();
            drawLine(ctx, x, y, fixPosX(e.touches[0].pageX), fixPosY(e.touches[0].pageY));
            x = fixPosX(e.touches[0].pageX);
            y = fixPosY(e.touches[0].pageY);
        }    
    }
  };
const end = e => {
    if (isDrawing === true) {
        if(e.type=="mouseup"){
            drawLine(ctx, x, y, e.offsetX * power, e.offsetY * power);
        }
      x = 0;
      y = 0;
      isDrawing = false;
    }
  };

colorele.addEventListener('change', e => {
    color = e.target.value;
});

rangele.addEventListener('change', e => {
    bold = e.target.value;
});

save.addEventListener("click",()=>{
    let element = document.createElement('a');
    element.href = canvas.toDataURL('image/png');
    element.download = title.innerText + '.png';
    element.target = '_blank';
    element.click();
});

button.addEventListener('click',()=>{
    if(!t){
        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('touchstart', start);
        canvas.addEventListener('mousemove', move);
        canvas.addEventListener('touchmove', move);
        window.addEventListener('mouseup', end);
        window.addEventListener('touchend', end);
        window.addEventListener('touchcancel', end);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        title.innerText = "Paint";
        head.innerText = "This is a PAINT TOOL";
        t = true;
    }else{
        canvas.removeEventListener('mousedown', start);
        canvas.removeEventListener('touchstart', start);
        canvas.removeEventListener('mousemove', move);
        canvas.removeEventListener('touchmove', move);
        window.removeEventListener('mouseup', end);
        window.removeEventListener('touchend', end);
        window.removeEventListener('touchcancel', end);
        pain();
        title.innerText = "Pain"
        head.innerText = "This is a PAIN TOOL"
        t = false;
    }
} );

  window.onresize = () =>{
    power = 1920 / canvas.clientWidth;
  };
  
function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = bold;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
  
function fixPosX(posX){
    const bcr = canvas.getBoundingClientRect();
    return (posX - bcr.left - window.pageXOffset) * power;
}
function fixPosY(posY){
    const bcr = canvas.getBoundingClientRect();
    return (posY - bcr.top - window.pageYOffset) * power;
}
function pain(){
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}