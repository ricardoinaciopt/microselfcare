const ipc = require('electron').ipcRenderer;
const Store = require('electron-store')
const AOS = require('aos')


AOS.init();
const store = new Store();


new Notification("Take a Break", {title: "Remember to rest" , body: "Here is your reminder to rest a bit to make sure you are not overworking.", icon: "icon.ico", timeoutType: "never" })
.onclick = () => console.log("CLICK_MESSAGE")


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

if(document.querySelector('#timeofday')){
  function timeOfDay(){
    var d = new Date();
    var n = d.getHours();
    console.log(n);
    if (n >= 21 || n < 6){
      document.getElementById("timeofday").textContent = "Hope you're having a nice night";
    }else if (n >= 18 || n < 21) {
      document.getElementById("timeofday").textContent = "Good evening to you";
    }else if (n >= 6 || n < 12) {
      document.getElementById("timeofday").textContent = "Have a wonderful morning";
    }else if (n >= 12 || n < 18) {
      document.getElementById("timeofday").textContent = "Good afternoon";
    }
    setTimeout(timeOfDay, 3600000);
  }
  timeOfDay();
  document.getElementById("user").textContent = store.get('user');

  //stats
  switch (store.get('goal')) {
    case 'sleep':
    document.getElementById("user-goal").textContent = "to sleep better.";
    break;
    case 'addiction':
    document.getElementById("user-goal").textContent = "to quit an addiction.";
    break;
    case 'finnish':
    document.getElementById("user-goal").textContent = "to finnish a project.";
    break;
  }

  switch (store.get('struggle')) {
    case 'time':
    document.getElementById("user-struggle").textContent = "trouble at tracking time";
    break;
    case 'done':
    document.getElementById("user-struggle").textContent = "not getting things done.";
    break;
    case 'care':
    document.getElementById("user-struggle").textContent = "not taking good care of myself.";
    break;
  }

  switch (store.get('mood')) {
    case 'happy':
    document.getElementById("user-mood").textContent = "happy.";
    break;
    case 'sad':
    document.getElementById("user-mood").textContent = "sad.";
    break;
    case 'mad':
    document.getElementById("user-mood").textContent = "mad.";
    break;
    case 'angry':
    document.getElementById("user-mood").textContent = "anxious.";
    break;
  }

  document.querySelector('#me').addEventListener('click', () => {
    document.getElementById("mystats").style.visibility='visible';
    document.getElementById("overlay").style.visibility='visible';
  })

  document.querySelector('#statx').addEventListener('click', () => {
    document.getElementById("mystats").style.visibility='hidden';
    document.getElementById("overlay").style.visibility='hidden';
  })

}

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
