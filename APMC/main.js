let calcul = document.getElementById("calcul");
let goki = document.getElementById("goki");
let buri = document.getElementById("buri");
let apu = document.getElementById("apu");
let popu = document.getElementById("popu");
let apm = document.getElementById("apm");

apu.innerText = 10;
popu.innerText = 3;
apm.innerText = 10 / 3;

calcul.addEventListener('click', calculate);

window.document.onkeydown = function(event){
    if (event.key === 'Enter') {
        calculate();
    }
}

function calculate(){
    apu.innerText = goki.value == "" ? 0 : goki.value;
    popu.innerText = buri.value == "" ? 0 : buri.value;
    if(buri.value == 0)
        apm.innerText = "you";
    else
        apm.innerText = goki.value / buri.value;
}