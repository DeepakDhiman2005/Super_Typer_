// A to Z words Typing Game!
let atoz = document.querySelector('div.atoz');
let inpid = document.getElementById("inpid");
let timer = document.getElementById('timer');
let characters = document.querySelectorAll('div.character'); let sec=60;
let i=0; let timerstart;  

let array=['A','B','C','D','E','F','G','H','I','J','K','L',
'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function startfunc() {
    let index=0;
    let characterprint = setInterval(() => {
        if (index == 25) {
          clearInterval(characterprint);
          // console.log('clear');
          characters = document.querySelectorAll('div.character');
          inpid.addEventListener('click', ()=>{
            inpid.style.backgroundColor = 'white';
            inputstart();
            timerfunc();
          });
        }
        atoz.innerHTML += `
        <div class="character">${array[index]}</div>
        `;
        index++
    }, 250);
}
startfunc();

function inputstart() {
  // console.log(characters);
  characters = document.querySelectorAll('div.character');
  inpid.addEventListener('keyup', (e)=>{
    if(e.key == 'Backspace'){
      if (inpid.value.length == 0) {
        inpid.value ="";
      }
      else if(inpid.value == ""){
        inpid.value="";
      }else{
        i--;
        if (i == -1) {
          i=0;
        }
        characters[i].style.display = 'flex';
      }
    }
    else if(e.key === "Enter"){
      if(inpid.value == "abcdefgijklmnopqrestuvwxyz"){
        alert("Game over! Your score "+"Time: "+(60-sec)+" Seconds And characters: "+inpid.value.length);
        clearInterval(timerstart);
        i=0; sec=0;
      }else{
        alert("Game over! Your score "+"Time: "+(60-sec)+" Seconds And characters: "+inpid.value.length);
        clearInterval(timerstart);
        i=0; sec=0;
      }
    }
    else{
      if (e.key.toUpperCase() == characters[i].innerText) {
        characters[i].style.display = 'none';
        i++;
      }else{
        i++;
      }
    }
  });
}

function timerfunc() {
  if (inpid.value === "") {
    timerstart = setInterval(() => {
      if (sec == 0) {
        clearInterval(timerstart);
        alert("Game over! Your score "+"Time: "+(60-sec)+" Seconds And characters: "+inpid.value.length);
        sec=60;
        i=0; sec=0;
      }
      timer.innerText = `Timer:- ${sec} Seconds`;
      sec--;
    }, 1000); 
  }
}