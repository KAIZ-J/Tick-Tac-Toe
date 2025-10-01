const oBtn = document.getElementById("o-btn")
        let boxCheck = {}; let userTurn = true; let gameWon = false; let userCharacter = "X"; let pcCharacter = "O";
        let playedGames =parseInt(localStorage.getItem("playedGames")) || 0;  let wonGames=parseInt(localStorage.getItem("wonGames")) || 0; let lostGames=parseInt(localStorage.getItem("lostGames")) || 0; let drawGames=parseInt(localStorage.getItem("drawedGames")) || 0;
        const themeDialog=document.getElementById("theme-dialog")
        const customizeDialog=document.getElementById("customize-dialog")
        const diagonalCheckbox = document.getElementById("diagonal-win")
        let currentTheme=localStorage.getItem("currentTheme") || "Sand";
        [...document.querySelectorAll("option")].find(el=>el.value===currentTheme).selected=true;
         const boxContainer=document.getElementById("box-container")
        const resultContainer=document.getElementById("result-container")
        const home = document.getElementById("home")
        const xBtn = document.getElementById("x-btn");
       const statsDialog =  document.getElementById("stats-dialog")
        function themeChange(currentTheme){
             document.body.className="";
             document.body.classList.add(currentTheme)
        }
      
            themeChange(currentTheme)
         function changeTheme(elem){
            currentTheme=elem.value;
            localStorage.setItem("currentTheme",currentTheme)
        themeChange(currentTheme)
       }
        function openCustomizeDialog(){
            customizeDialog.showModal();
        }
        function openThemeDialog(){
            themeDialog.showModal()
        }
        function closeDialog(elem){
            elem.parentElement.close()
        }
       function openStatsDialog(){
        statsDialog.innerHTML=""
        statsDialog.innerHTML+=`<h2>Your All Time Stats</h2>
        <table border=1 style="text-align:center;width:100%" align=center>
         <tr> <td>Games Won</td> <td>${wonGames}</td> </tr> <tr> <td>Games Drawed</td> <td>${drawGames}</td> </tr> <tr> <td>Games Lost</td> <td>${lostGames}</td> </tr><tr> <td>Games Played</td> <td>${wonGames+drawGames+lostGames}</td> </tr>
        </table>`
        statsDialog.showModal();
        statsDialog.innerHTML+=`<br><button type="button" id="close" onclick="closeDialog(this)">Close</button>`
       }

        
        function updateCharacter(user,computer){
            if(user!==userCharacter){   
xBtn.classList.toggle("active")
oBtn.classList.toggle("active")

            }   
            userCharacter=user;
            pcCharacter=computer;
        }
        let winningNumbers=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        function diagonalFx(elem){
            if(diagonalCheckbox.checked===false){
                
         winningNumbers=winningNumbers.splice(0,6)
        
            };
            if(diagonalCheckbox.checked===true){
         winningNumbers=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    
         
            }
        }
        
        function addBoxes(cls){
            boxContainer.innerHTML="";
            boxCheck={};
            for(let i=1;i<10;i++){
                boxContainer.innerHTML+=`<button type="button" id="box-${i}" class="box" onclick="${cls}(this)"></button>`;
                document.getElementById(`box-${i}`).style.borderColor=`var(--text)`
              boxCheck[`box-${i}`]=true;
            }
        }


        ///to make the computer smart enough
        function pcTurnBestMove(){
            let num=-1;
            if(boxCheck[`box-${5}`]===true){
                num=5;
            };
            if(num===-1){
           for(let i=8;i>6;i--){
            let array = winningNumbers[i];
                let filteredArray = array.filter(item=>boxCheck[`box-${item+1}`]===false)
                let filteredArrayContent = filteredArray.map(item=>document.getElementById(`box-${item+1}`).textContent).join("");
                if(filteredArrayContent="O"){
                    num=array.find(item=>boxCheck[`box-${item+1}`]===true)+1;
                    break;
                }

            }
        }
        return num;
    }
    function checkIfAllEmpty(){
        let num=-1;
        if(Object.keys(boxCheck).every(a=>boxCheck[a]===true)){
            let array = [0,2,6,8]
            num=array[Math.floor(Math.random()*array.length)];
        }
        return num;
    }
    function onlyCharacter(){
        let num =-1;
        let generalArray = []
   for(let i=0;i<winningNumbers.length;i++){
    let array = winningNumbers[i];
    let filteredArray = array.filter(item=>boxCheck[`box-${item+1}`]===false)
    let filteredArrayContent = filteredArray.map(item=>document.getElementById(`box-${item+1}`).textContent).join("");
    if(filteredArrayContent="O"){
        let trueArray=array.filter(item=>boxCheck[`box-${item+1}`]===true)
  generalArray.push(trueArray)
    }
   }
  for(let j=0;;j++){
    if(boxCheck[`box-${generalArray[0][1]+1}`]===true)
    num=generalArray[0][1]
    break;
  }
  return num;
    }
    function centerCaptured(){
        let num =-1
        if(Object.keys(boxCheck).some(a=>boxCheck[a]===false ) && boxCheck[`box-5`]===true){
      num=4
        }
        return num;
    }
    function centerOrCorner(){
        let num=-1;
        if(boxCheck[`box-5`]===true){
            num=4;
        }
        else if(Object.keys(boxCheck).some(a=>boxCheck[a]===false) && boxCheck[`box-1`]===true){
            let array = [0,2,6,8]
            num=array[Math.floor(Math.random()*array.length)];
        }
        return num;
    }

    //ends here
       function pcBestMove(str){
        let num = -1;
  for(let i=0;i<winningNumbers.length;i++){
                let array = winningNumbers[i];
                let filteredArray = array.filter(item=>boxCheck[`box-${item+1}`]===false)
                let filteredArrayContent = filteredArray.map(item=>document.getElementById(`box-${item+1}`).textContent).join("")
                if(filteredArrayContent===str){
num=array.find(item=>boxCheck[`box-${item+1}`]===true);
break;
                };  
            }
            return num;
       }
        function pcChoiceNumber(){
            let num = pcBestMove(`${pcCharacter}${pcCharacter}`);
            if(num===-1){
                num=pcBestMove(`${userCharacter}${userCharacter}`)
                }; 
                if(num===-1){
                    num=centerCaptured();
                }
                if(num===-1){
                    num=checkIfAllEmpty();
                }
                 if(num===-1){
                    num=centerOrCorner();
                }
                 if(num===-1){
                num=onlyCharacter()
                }
               
                
           return num!==-1?num+1:Math.floor(Math.random()*9)+1;
        }
        function pcChoice(){
            let bool = Object.keys(boxCheck).some(a=>boxCheck[a]===true)
            if(bool){
for(let i=0;;i++){
                let j = pcChoiceNumber();
              if(boxCheck[`box-${j}`]===true){
               document.getElementById(`box-${j}`).textContent=pcCharacter;
               boxCheck[`box-${j}`]=false;
               break;
            }
            }
            }
              
        }
        function startGame(){
            home.style.display="none";
            boxContainer.style.display="grid";
            resultContainer.style.display="none";
            gameWon=false;
             addBoxes("addContent");
             if(userTurn===false){
               setTimeout(function(){
                pcChoice()
               },200) 
                userTurn=true;
             }
             else{
           userTurn=false
             }
             
        }
        function backHome(){
            resultContainer.style.display="none";
            home.style.display="block";
            gameWon=false;            
        }
        function addContent(elem){
     if(boxCheck[elem.id]===true && gameWon===false){
        elem.textContent=userCharacter;
        elem.style.color=`var(--primary)`;
        boxCheck[elem.id]=false;
        winCheck();
        if(gameWon===false){
        setTimeout(() => {
            pcChoice()
            winCheck()
            if(Object.keys(boxCheck).every(a=>boxCheck[a]===false) && gameWon===false){
  winMessage("tie")
                
     } 
        }, 200);
        
        }
     };
     if(Object.keys(boxCheck).every(a=>boxCheck[a]===false) && gameWon===false){
      setTimeout(function(){
winMessage("tie")
      },200)  
     }
        }
        function winCheck(){
            let buttons = [...document.querySelectorAll(".box")]
            let buttonsText = buttons.map(el=>el.textContent)
            for(let i=0;i<winningNumbers.length;i++){
                for(let z=0;z<1;z++){
                 if(buttonsText[winningNumbers[i][z]]===buttonsText[winningNumbers[i][z+1]] && buttonsText[winningNumbers[i][z+1]]===buttonsText[winningNumbers[i][z+2]] && buttonsText[winningNumbers[i][z]]!==""){
                    gameWon=true;
                    buttons[winningNumbers[i][z]].style.animation="scaleAnime .4s ease forwards";
                    buttons[winningNumbers[i][z+1]].style.animation="scaleAnime .4s ease forwards .4s"
                    buttons[winningNumbers[i][z+2]].style.animation="scaleAnime .4s ease forwards .8s"
                    setTimeout(function(){
               winMessage(buttonsText[winningNumbers[i][z]])
                    },1500)
                    
            }
                }
            }
           
        }
        function winMessage(winner){
         boxContainer.style.display="none";
         resultContainer.style.display="flex";
         if(winner===userCharacter){
            resultContainer.innerHTML=`<h2>User Won</h2>`;
            wonGames+=1;
            localStorage.setItem("wonGames",wonGames)
         }
         else if(winner===pcCharacter){
            resultContainer.innerHTML=`<h2>Computer Won</h2>`;
            lostGames+=1;
            localStorage.setItem("lostGames",lostGames)
         }
         else{
            resultContainer.innerHTML=`<h2>Draw</h2>`;
            drawGames+=1;
            localStorage.setItem("drawedGames",drawGames)
         }
         resultContainer.innerHTML+=`<div>
                <button type="button" id="backhome" onclick="backHome()">Home</button>
                <button type="button" id="try" onclick="startGame()">Play again</button>
                </div>`
        }
        //two player

        function startGameFriend(){
            playerFriendCharacter="X";
             home.style.display="none";
            boxContainer.style.display="grid";
            resultContainer.style.display="none";
            gameWon=false;
             addBoxes("addFriendInput");
        }
        let playerFriendCharacter="X"
         function addFriendInput(elem){
     if(boxCheck[elem.id]===true && gameWon===false){
        elem.textContent=playerFriendCharacter;
        if(playerFriendCharacter==="X"){
            playerFriendCharacter="O"
        }
        else{
            playerFriendCharacter="X"
        }
        boxCheck[elem.id]=false;
        winCheckFriend();
     };
     if(Object.keys(boxCheck).every(a=>boxCheck[a]===false) && gameWon===false){
      setTimeout(function(){
winMessageFriend("tie")
      },200)  
     }
        }
        function winCheckFriend(){
            let buttons = [...document.querySelectorAll(".box")]
            let buttonsText = buttons.map(el=>el.textContent)
            for(let i=0;i<winningNumbers.length;i++){
                for(let z=0;z<1;z++){
                 if(buttonsText[winningNumbers[i][z]]===buttonsText[winningNumbers[i][z+1]] && buttonsText[winningNumbers[i][z+1]]===buttonsText[winningNumbers[i][z+2]] && buttonsText[winningNumbers[i][z]]!==""){
                    gameWon=true;
                    buttons[winningNumbers[i][z]].style.animation="scaleAnime .4s ease forwards";
                    buttons[winningNumbers[i][z+1]].style.animation="scaleAnime .4s ease forwards .4s"
                    buttons[winningNumbers[i][z+2]].style.animation="scaleAnime .4s ease forwards .8s"
                    setTimeout(function(){
               winMessageFriend(buttonsText[winningNumbers[i][z]])
                    },1500)
                    
            }
                }
            }
           
        }
        function winMessageFriend(winner){
         boxContainer.style.display="none";
         resultContainer.style.display="flex";
         if(winner==="X" || winner==="O"){
resultContainer.innerHTML=`<h2>Player ${winner} Won</h2>`;
         }
         else{
          resultContainer.innerHTML=`<h2>Draw</h2>`;  
         }
            
          
         resultContainer.innerHTML+=`<div>
                <button type="button" id="backTohome" onclick="backHome()">Home</button>
                <button type="button" id="try" onclick="startGameFriend()">Play again</button>
                </div>`
        }