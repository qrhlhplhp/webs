let table = document.getElementById("table");
let param = document.getElementById("param");
let score = document.getElementById("score");
const pass = document.getElementById("pass");
const sur = document.getElementById("sur");
const revo = document.getElementById("revo");
let yellow = 0;
let blue = 0;
let surdone = false;
let revodone = false;
let htable = "";

//[left, botleft, bottom, botright, right, topright, top, topleft]
//0->nill, 1->yellow, 2->blue
const movec = [[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1]];
let turn = 1

//make table
let stone = new Array(8);
for(let i = 0; i < 8; i++) {
    stone[i] = new Array(8).fill(0);
}

for (let i = 0; i < 8; ++i){
    htable += `<tr id="tr-${i}">`;
    for (let j = 0; j < 8; ++j){
        htable += `<td id="td-${i}-${j}"></td>`;
    }
    htable += "</tr>";
}
table.innerHTML = htable;

//set default-stone
function def(){
turn = 1;
yellow = 0;
blue = 0;
surdone = false;
revodone = false;
param.innerText = "Yellowman's turn";
score.innerText = ""
sur.innerText = "SURRENDER";
stone[3][3] = 1; stone[4][4] = 1;
stone[4][3] = 2; stone[3][4] = 2;
document.getElementById("td-3-3").innerHTML = "<div class=\"stone yellow\"></div>";
document.getElementById("td-4-4").innerHTML = "<div class=\"stone yellow\"></div>";
document.getElementById("td-4-3").innerHTML = "<div class=\"stone blue\"></div>";
document.getElementById("td-3-4").innerHTML = "<div class=\"stone blue\"></div>";
}
def();

//event to place stones
table.addEventListener('click', e =>{
    let coord = document.elementFromPoint(e.clientX, e.clientY);
    if(coord.tagName != "TD")return;
    if(surdone)return;
    if(revodone)return;
    const stonegen = coord.id.split("-");
    //position of the stone to put right now
    let x = Number(stonegen[1]);
    let y = Number(stonegen[2]);
    
    if(stone[x][y] == 0/*nill stone*/){
        let canPlace = false;
        for(let i = 0; i < 8; i++){
            let moved = 0;
            let doFlip = new Array();
            while(true){
                ++moved
                //stone[x-position + x-move (<- x-move-amount * x-move-counter)]
                const nowX = x + movec[i][0] * moved;
                const nowY = y + movec[i][1] * moved;
                if(nowX < 0 || nowX > 7 || nowY < 0 || nowY > 7) break;//change vector because there's wall!
                let nowStone = stone[nowX][nowY];
                if(nowStone !=turn && nowStone != 0){
                    doFlip.push([x + movec[i][0] * moved, y + movec[i][1] * moved]);
                    }else if(nowStone == turn && moved > 1){
                        canPlace = true;
                        for(let i = 0; i < doFlip.length; i++){
                            stone[doFlip[i][0]][doFlip[i][1]] = turn;
                            const doFlipCell = document.getElementById(`td-${doFlip[i][0]}-${doFlip[i][1]}`).children[0]; 
                            doFlipCell.classList.remove(turn != 1 ? "yellow" : "blue");
                            doFlipCell.classList.add(turn == 1 ? "yellow" : "blue");
                        }
                        break;
                    }else{
                        break;
                }
            }
        }
        if(!canPlace)return;
        stone[x][y] = turn;
        coord.innerHTML = `<div class="stone ${turn == 1 ? "yellow" : "blue"}"></div>`;
        change(1);
    }
});

//event to pass a turn
pass.addEventListener('click', e=>{
    if(surdone){
        return;
    }else if(revodone){
        change(2)
    }else{ 
        change(1)
    };
});

//event to end and reset a game
sur.addEventListener('click', e=>{
    if(surdone){
        search(reset);
        def();
    }else if(revodone){
        surdone = true;
        param.innerText = "Communists' victory"
        score.innerText = "10000-0";
        sur.innerText = "RESET";
    }else{
        surdone = true;
        search(surrender);
        sur.innerText = "RESET";
    };
});

//event to cause a revolution
revo.addEventListener('click', e=>{
    if(revodone)return;
    revodone = true;
    surdone = false;
    score.innerText = ""
    sur.innerText = "SURRENDER";
    search(revolution);
    }
);

function change(man){
    turn = (turn == 1 ? 2 : 1);
    param.innerText = (turn == 1 ? (man == 1 ? "Yellowman" : "Stalin") : (man == 1 ? "Blueman" : "Lenin")) + "'s turn";
}
function search(fx){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            fx(i,j);
        }
    }
}
function reset(i,j){
    stone[i][j] = 0;
    document.getElementById(`td-${i}-${j}`).innerHTML = "";
}
function revolution(i,j){
    stone[i][j] = 0;
    document.getElementById(`td-${i}-${j}`).innerHTML = `<div class="flag"></div>`;
    turn = 2;
    param.innerText = "Lenin's turn";
}
function surrender(i,j){
    switch(stone[i][j]){
        case 1: yellow++; break;
        case 2: blue++; break;
    }
    if(yellow > blue){
        param.innerText = "Yellowman's victory:";
        score.innerText = `${yellow}-${blue}`;
    }else if(yellow < blue){
        param.innerText = "Blueman's victory:";
        score.innerText = `${blue}-${yellow}`;
    }else if(yellow == blue){
        param.innerText = "Draw:";
        score.innerText = `${yellow}-${blue}`;
    }else{
        param.innerText = "HOW DARE YOU!!!";
        score.innerText = "THIS iS ERROR MESSAGE!!!";
    }
}

/* 2D-array reminder
stone = stone.map(line=>{
            return line.map(cell=>{
                return 0;
            });
        });
*/