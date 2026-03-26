let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector(".resetbtn");
let newgamebtn=document.querySelector("#newgame");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let cnt=0;

let turn0=true;

const winpatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const resetgame=()=>{
    turn0=true;
    cnt=0;
    enableboxes();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        console.log("box was clicked");
        if(turn0==true){
            box.innerText="O";
            turn0=false;
        }
        else{
            box.innerText="X";
            turn0=true;
        }
        cnt++;
        box.disabled=true;
        checkwinner();
    })
})

const disableboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showwinner=(winner)=>{
    msg.innerText=`Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}

const draw=()=>{
    resetgame();
}

const checkwinner=()=>{
    let hasWinner = false;
    for(let pattern of winpatterns){
        let pos0val=boxes[pattern[0]].innerText;
        let pos1val=boxes[pattern[1]].innerText;
        let pos2val=boxes[pattern[2]].innerText;
        if(pos0val!="" && pos1val!="" && pos2val!=""){
            if(pos0val===pos1val && pos1val===pos2val){
                showwinner(pos1val);
                hasWinner = true;
                return;
            }
        }
    }
    if(cnt===9 && !hasWinner){
        msg.innerText="It's a Draw!";
        msgcontainer.classList.remove("hide");
        disableboxes();
    }
}

newgamebtn.addEventListener("click", resetgame)

resetbtn.addEventListener("click", resetgame)