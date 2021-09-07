const ipc = require('electron').ipcRenderer;
const Store = require('electron-store')
const AOS = require('aos')

AOS.init();

if(document.querySelector('#maxi')){
  document.querySelector('#maxi').addEventListener('click', () => {
    ipc.send('max');
  })
}

document.querySelector('#mini').addEventListener('click', () => {
  ipc.send('min');
})

document.querySelector('#x').addEventListener('click', () => {
  ipc.send('x');
})

const store = new Store();

if(document.querySelector('#button')){
  document.querySelector('#button').addEventListener('click', () => {
    var user = document.getElementById("username").value;
    if(!user){
      document.querySelector("#error").style.visibility='visible'
    }else{
      store.set('user', user);
      ipc.send('userexists');
    }
  })
}

let moods = ["happy","sad","anxious","mad"];
let struggles = ["time","done","care"];
let goals = ["sleep","addiction","finnish"];
var user_mood, user_struggle, user_goal
function removeSelect(arr) {
  arr.forEach(item=>{
    document.getElementById(item).classList.remove('active');
  })
}

function addSelect(arr,pos) {
  removeSelect(arr);
  document.getElementById(arr[pos]).classList.add('active');
}

if(document.querySelector('#intro-content2')){

  if(store.get('user')){
    document.querySelector('#un').textContent = store.get('user');
  }else {
    document.querySelector('#un').textContent = "UNDEFINED USER";
    console.log("UNDEFINED USER");
  }

  document.querySelector('#happy').addEventListener('click', () => {
    addSelect(moods,0);
    user_mood = moods[0];
  })

  document.querySelector('#sad').addEventListener('click', () => {
    addSelect(moods,1);
    user_mood = moods[1];
    store.set('mood',moods[1]);
  })

  document.querySelector('#anxious').addEventListener('click', () => {
    addSelect(moods,2);
    user_mood = moods[2];
  })

  document.querySelector('#mad').addEventListener('click', () => {
    addSelect(moods,3);
    user_mood = moods[3];
  })

  document.querySelector('#time').addEventListener('click', () => {
    addSelect(struggles,0);
    user_struggle = struggles[0];
  })

  document.querySelector('#done').addEventListener('click', () => {
    addSelect(struggles,1);
    user_struggle = struggles[1];
  })

  document.querySelector('#care').addEventListener('click', () => {
    addSelect(struggles,2);
    user_struggle = struggles[2];
  })

  document.querySelector('#sleep').addEventListener('click', () => {
    addSelect(goals,0);
    user_goal = goals[0];
  })

  document.querySelector('#addiction').addEventListener('click', () => {
    addSelect(goals,1);
    user_goal = goals[1];
  })

  document.querySelector('#finnish').addEventListener('click', () => {
    addSelect(goals,2);
    user_goal = goals[2];
  })

  document.querySelector('#button2').addEventListener('click', () => {
    store.set('mood',user_mood);
    store.set('struggle',user_struggle);
    store.set('goal',user_goal);
    ipc.send('userdone');

  })
}
