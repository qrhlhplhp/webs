let bachblock = document.getElementById("bachblock");
let demoblock = document.getElementById("demoblock");
let text = document.getElementById("text");
let expl = document.getElementById("expl");

bachblock.addEventListener('click', function(){
    if(text.innerText == "" || text.innerText == "DEAD..."){
        text.innerText = "SUCCESS!!!";
        text.style.color = "black";
        setTimeout(()=>{
            expl.innerText = "CLICK BACH TO GET HER DEAD";
        },3000);
    }else{
        text.innerText = "DEAD...";
        text.style.color = "red";
        expl.innerText = "CLICK BACH TO GET THEM CONNECTED AGAIN";
    }
    if(window.getComputedStyle(demoblock).display=="none"){
        demoblock.style.display = "block";
    }else{
        demoblock.style.display = "none";
    }
});