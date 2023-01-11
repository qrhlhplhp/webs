let totype = document.getElementById("totype")
let typed = document.getElementById("typed")
let scorecounttext = document.getElementById("scorecounttext")
let scorecounter = 0
let timecounttext = document.getElementById("timecounttext")
let timecounter = 0
let intervalID = setInterval(timeclock, 1000)
let levelcounttext = document.getElementById("levelcounttext")
let lifecounttext = document.getElementById("lifecounttext")
let lifecounter = 0

//def
setToType()
timecounter = 20
timecounttext.innerText = timecounter
lifecounter = 5
lifecounttext.innerText = lifecounter
setcolor(timecounter)

window.document.onkeydown = function(event){
    if (event.key === 'Enter') {
        entered();
    }
}
//totype.document.onselectstart = () => false;

function entered(){
        if(typed.value == totype.innerText){
            scorecounttext.innerText = ++scorecounter
            levelcounttext.innerText = 1 + Math.ceil(scorecounter * 0.5)
            resetcolor()
            setToType()
            typed.value = ""
            timecountspeed()
            setTimeout(setcolor,5,timecounter);
        }else{
        }
}

//make an array with N characters
//make random numbers counterpart to character
//make the characters connected in the array
function setToType(){
    let charakind = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let randomStrings = Array.from(Array(Math.floor(Math.random()*20 + 10))).map(
        ()=>charakind[Math.floor(Math.random()*charakind.length)]
    ).join('');
totype.innerText = randomStrings;
}

function timeclock(){
    --timecounter
    if(timecounter != 0){
        timecounttext.style.color = "black"
        timecounttext.style.fontWeight = "normal"
        timecounttext.innerText = timecounter
    }else if(lifecounter - 1 != 0){
        lifecounttext.innerText = --lifecounter
        timecounttext.style.color = "red"
        timecounttext.style.fontWeight = "bold"
        timecounttext.innerText = "TIME OVER"
        resetcolor()
        timecountspeed()
        setTimeout(setcolor,1000,timecounter);
        setTimeout(setToType,1000);
        setTimeout(()=>typed.value = "",1000);
    }else{
        lifecounttext.innerText = --lifecounter
        timecounttext.style.color = "red"
        timecounttext.style.fontWeight = "bold"
        timecounttext.innerText = "GAME OVER"
        typed.value = ""
        clearInterval(intervalID)
    }
}

function timecountspeed(){
    //timelimit then
    timecounter = 21-Math.ceil(scorecounter * 0.5)
}
function setcolor(time){
    totype.style.animation = `karaoke ${time}s`
}
function resetcolor(){
    totype.style.animation = null
}
//window.requestAnimationFrame(callback);