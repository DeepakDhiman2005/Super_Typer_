let paraid = document.getElementById('paraid');
let inputid = document.getElementById('inputid');
let timebox = document.getElementById('timebox');
let minute = document.getElementById('in1');
let seconds = document.getElementById('in2');
let btn = document.getElementById("btn");
let wordsscore = document.getElementById('Tws');
let bodysel = document.querySelector('body');
let i=0; let j=0; let min; let sec; let total;
let totalwords; let newcontainer=0;

function lastmessage(words, total) {
    let wordsjson=[];
    if (localStorage.getItem('jsonitems') == null) {
        wordsjson.push([words, total]);
        localStorage.setItem('jsonitems', JSON.stringify(wordsjson));
    }else{
        let wordsjsonstr = localStorage.getItem('jsonitems');
        wordsjson = JSON.parse(wordsjsonstr);
        wordsjson.push([words, total]);
        localStorage.setItem('jsonitems', JSON.stringify(wordsjson));
    }
    update();
}

function update() {
    if (localStorage.getItem('jsonitems') == null) {
        let itemJsonArray = [];
        localStorage.setItem('jsonitems', JSON.stringify(itemJsonArray));
    }
    else {
        let itemJsonArrayStr = localStorage.getItem('jsonitems');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += ` 
            <div class="wordsscore-style" id="typingscore">
            <div class="wordsscore-style-top">
                <p>Number of words typed = ${element[0]}</p>
                <button id="btn2" onclick="deleted(${index})">Delete</button>
            </div>
                <p>Time taken = ${minute.value} minute ${seconds.value} Seconds</p>
                <p>wps = (words/5)/(minute*60+seconds) = `+element[1]+` wps</p>
            </div>
        `;
    });
    wordsscore.innerHTML = str;
}
update();

function deleted(itemIndex) {
    console.log("deleted", itemIndex);
    let itemJsonArrayStr = localStorage.getItem('jsonitems');
    let itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('jsonitems', JSON.stringify(itemJsonArray));
    update();
}

let wordcontainer;
btn.addEventListener('click', ()=>{
    min=minute.value; sec=seconds.value;
    // console.log("click "+min+' '+sec)
    let timer = setInterval(() => {
        if (min == 0 && sec == 0) {
            clearInterval(timer);
            timebox.innerHTML = `Time:- 0:0`;
            min=0; sec=0;
            total = ((i/5)/(minute.value*60+seconds.value));
            alert("Time-out! Your Typing speed: "+total+"/per sec");
            lastmessage(newcontainer, total);
        }
        else if(inputid.value.length == paraid.innerText.length){
            wordcontainer=inputid.innerText.length;
        }
        else if(min == 0 && sec == 0 && j >= 0){
            clearInterval(timer);
            timebox.innerHTML = `Time:- 0:0`;
            wordcontainer=wordcontainer+inputid.value.length;
            min=0; sec=0;
            total = ((newcontainer/5)/(minute.value*60+seconds.value));
            alert("Time-out! Your Typing speed: "+total+"/per sec");
            lastmessage(newcontainer, wordcontainer);
        }
        else{
            if (sec == 0) {
                sec=sec+60;
                min=min-1;
            }
            timebox.innerHTML = `Time:- ${min}:${sec}`;
            sec--;
        }
    }, 1000);
});

let para1 = `
Error maxime praesentium sapiente nihil quod, aut ea temporibus quis? 
Optio ullam distinctio neque nulla perferendis quibusdam tempore similique 
quia illo eius sunt harum, ipsam culpa dolores corporis laborum hic tempora? 
Itaque aliquam optio corrupti nobis. Numquam sed similique magni fuga ipsa.
`.split();

let para2 = `
Et eaque unde pariatur officiis quasi iusto voluptate voluptas fugiat, 
temporibus incidunt facere, reiciendis nam quaerat porro accusantium magnam
consectetur autem saepe repellat totam est excepturi commodi perspiciatis 
eprehenderit! Quas quia recusandae repellendus eius dolorem mollitia expedita velit,
est obcaecati suscipit quasi totam temporibus sit minus earum ducimus vitae libero.
`.split();

let para3 = `
fugit veniam corporis, debitis iure commodi ea! Esse aliquid quasi reprehenderit illo. 
A at porro omnis maiores natus adipisci cumque tempore? Voluptas cupiditate nihil 
magni et libero quidem officia quae, eligendi veritatis fugiat iusto cumque mollitia quas. 
Praesentium provident ad quas mollitia.
`.split();

let para4 = `
Ab, laborum consequuntur nihil fugit exercitationem distinctio, 
similique possimus cupiditate tenetur neque inventore, ipsam impedit 
tempora at reprehenderit quis quia laudantium quos itaque provident sunt! 
Minima corporis earum quia. Neque eveniet maxime molestiae aliquid dignissimos 
a, voluptatem ex officia tempore eius explicabo obcaecati.
`.split();

let para5 = `
At minima architecto minus vel sit voluptas error nobis maiores quo 
blanditiis id eum praesentium, doloribus voluptatem, aliquid veniam 
quia incidunt laudantium quibusdam, accusamus rerum temporibus. 
Corrupti officiis ex id ipsum asperiores voluptatum maiores fugiat 
laborum consequatur, laudantium recusandae debitis mollitia voluptate.
`.split();

let arr = [para1, para2, para3, para4, para5];

paraid.innerText = `
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, nostrum.
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, nostrum.
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, nostrum.
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, nostrum.
`.split();

inputid.addEventListener('keyup', (e)=>{
    // console.log(e.key)
    if(e.key == 'Enter'){
        // console.log('Enter');
        if (inputid.value == paraid.innerText) {
            if (j == 4) {
                j=0; inputid.value="";
                paraid.innerText = arr[j];
                paraid.innerHTML = paraid.innerText.replace(paraid.innerText.substring(0,i),
                `${paraid.innerText.substring(0,i)}`);
            }else{
                paraid.innerText = arr[j];
                totalwords = i;
                inputid.value = ""; i=0;
                paraid.innerHTML = paraid.innerText.replace(paraid.innerText.substring(0,i),
                `${paraid.innerText.substring(0,i)}`);
                j++;
            }
        }else{
            alert('sorry: paragraph is not complete!');
        }
    }
    else if (inputid.value[i] == paraid.innerText[i]) {
        inputid.style.color = 'purple';
        paraid.innerHTML = paraid.innerText.replace(paraid.innerText.substring(0, i+1),
         `<mark>${paraid.innerText.substring(0, i+1)}</mark>`);
        newcontainer=newcontainer+1;
        i++;
    }
    else if(i <= -1){
        i=0;
    } 
    else if(e.key == 'Backspace'){
        if(inputid.value == ''){
            i=0;
            paraid.innerHTML = paraid.innerText.replace(paraid.innerText.substring(0,i),
            `${paraid.innerText.substring(0,i)}`);
        }else{
            inputid.style.color = 'green';
            paraid.innerHTML = paraid.innerText.replace(paraid.innerText.substring(0,i),
            `<mark>${paraid.innerText.substring(0,i)}</mark>`);
            newcontainer=newcontainer-1;
            i--;
        }
    }
    else{
        inputid.style.color = 'red';
        // console.log("key")
        paraid.innerHTML = paraid.innerText.replace(paraid.innerText.substring(0, i),
        `<mark>${paraid.innerText.substring(0, i)}</mark>`);
    }
});

// next games codes
let selectid = document.getElementById("selectid");
let btn3 = document.getElementById('btn3');
let intro = document.getElementById("intro");

btn3.addEventListener('click', ()=>{
    if(selectid.value == 'A to Z'){
        window.open('AtoZ.html');
    }
    else if(selectid.value == 'Typing'){
        intro.style.display = 'none';
        bodysel.style.overflow = 'scroll';
    }
    else{
        alert("sorry: "+selectid.value+" It is not avarible!")
    }
});