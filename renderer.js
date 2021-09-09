const ipc = require('electron').ipcRenderer;
const Store = require('electron-store')
const AOS = require('aos')


AOS.init();
const store = new Store('accessPropertiesByDotNotation',false);

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
    const weekDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday' ];
    var d = new Date();
    var h = d.getHours();
    var day		= d.getDay();
    var m	= d.getMinutes();

    console.log(h);
    if (h >= 21 && h < 23){
      document.getElementById("timeofday").textContent = "Hope you're having a nice night";
    }else if (h >= 18 && h < 21) {
      document.getElementById("timeofday").textContent = "Good evening to you";
    }else if (h >= 6 && h < 12) {
      document.getElementById("timeofday").textContent = "Have a wonderful morning";
    }else if (h >= 12 && h < 18) {
      document.getElementById("timeofday").textContent = "Good afternoon";
    }else{
      document.getElementById("timeofday").textContent = "Hope you're having a nice night";
    }

    h	= h < 10 ? "0" + h : h;
    m	= m < 10 ? "0" + m : m;

    document.querySelector( '#clock .day' ).innerHTML	= weekDays[day];
    document.querySelector( '#clock .hours' ).innerHTML	= h;
    document.querySelector( '#clock .minutes' ).innerHTML	= m;

    requestAnimationFrame(timeOfDay);
  }


  timeOfDay();
  document.getElementById("user").textContent = store.get('user');

  //stats
  switch (store.get('goal')) {
    case 'sleep':
    document.getElementById("user-goal").textContent = "sleep more & better.";
    break;
    case 'addiction':
    document.getElementById("user-goal").textContent = "quit an addiction.";
    break;
    case 'finnish':
    document.getElementById("user-goal").textContent = "finnish a project.";
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
    document.getElementById("mymood").textContent = "happy";
    document.getElementById("moodicon").setAttribute("src","img/happy.png");
    break;
    case 'sad':
    document.getElementById("user-mood").textContent = "sad.";
    document.getElementById("mymood").textContent = "sad";
    document.getElementById("moodicon").setAttribute("src","img/sad.png");
    break;
    case 'mad':
    document.getElementById("user-mood").textContent = "mad.";
    document.getElementById("mymood").textContent = "mad";
    document.getElementById("moodicon").setAttribute("src","img/mad.png");
    break;
    case 'angry':
    document.getElementById("user-mood").textContent = "anxious.";
    document.getElementById("mymood").textContent = "anxious";
    document.getElementById("moodicon").setAttribute("src","img/anxious.png");
    break;
  }

  //main stats window
  document.querySelector('#me').addEventListener('click', () => {
    document.getElementById("mystats").style.visibility='visible';
    document.getElementById("overlay").style.visibility='visible';
    document.body.classList.add("stop-scrolling");
    document.body.classList.remove("start-scrolling");
  })

  document.querySelector('#statx').addEventListener('click', () => {
    document.getElementById("mystats").style.visibility='hidden';
    document.getElementById("overlay").style.visibility='hidden';
    document.body.classList.remove("stop-scrolling");
    document.body.classList.add("start-scrolling");
  })

  //mood settings window

  function moodSetter(dayn,mood){
    switch (dayn) {
      case 2:
      store.set('moods.daytwo',mood);
      break;
      case 3:
      store.set('moods.daythree',mood);
      break;
      case 4:
      store.set('moods.dayfour',mood);
      break;
      case 5:
      store.set('moods.dayfive',mood);
      break;
      case 6:
      store.set('moods.daysix',mood);
      break;
      case 7:
      store.set('moods.dayseven',mood);
      break;
    }
  }

  document.querySelector('#mood-set').addEventListener('click', () => {
    document.getElementById("mood-set-win").style.visibility='visible';
    document.getElementById("overlay").style.visibility='visible';
    document.body.classList.add("stop-scrolling");
    document.body.classList.remove("start-scrolling");

    document.querySelector('#happy').addEventListener('click', () => {
      var dayn = store.get('dayn');
      if(!dayn){
        store.set('dayn',1);
        store.set('moods.dayone','happy');
      }else if(dayn == 1 || dayn < 7){
        store.set('dayn', dayn += 1);
        moodSetter(dayn,'happy');
      }else{
        store.delete('dayn');
      }

      document.getElementById("mood-set-win").style.visibility='hidden';
      document.getElementById("overlay").style.visibility='hidden';
      document.body.classList.remove("stop-scrolling");
      document.body.classList.add("start-scrolling");
      document.getElementById("mood-set").style.visibility='hidden';
      document.getElementById("already").style.visibility='visible';
    })

    document.querySelector('#anxious').addEventListener('click', () => {
      var dayn = store.get('dayn');
      if(!dayn){
        store.set('dayn',1);
        store.set('moods.dayone','anxious');
      }else if(dayn == 1 || dayn < 7){
        store.set('dayn', dayn += 1);
        moodSetter(dayn,'anxious');
      }else{
        store.delete('dayn');
      }

      document.getElementById("mood-set-win").style.visibility='hidden';
      document.getElementById("overlay").style.visibility='hidden';
      document.body.classList.remove("stop-scrolling");
      document.body.classList.add("start-scrolling");
      document.getElementById("mood-set").style.visibility='hidden';
      document.getElementById("already").style.visibility='visible';
    })

    document.querySelector('#sad').addEventListener('click', () => {
      var dayn = store.get('dayn');
      if(!dayn){
        store.set('dayn',1);
        store.set('moods.dayone','sad');
      }else if(dayn == 1 ||dayn < 7){
        store.set('dayn', dayn += 1);
        moodSetter(dayn,'sad');
      }else{
        store.delete('dayn');
      }

      document.getElementById("mood-set-win").style.visibility='hidden';
      document.getElementById("overlay").style.visibility='hidden';
      document.body.classList.remove("stop-scrolling");
      document.body.classList.add("start-scrolling");
      document.getElementById("mood-set").style.visibility='hidden';
      document.getElementById("already").style.visibility='visible';
    })

    document.querySelector('#mad').addEventListener('click', () => {
      var dayn = store.get('dayn');
      if(!dayn){
        store.set('dayn',1);
        store.set('moods.dayone','mad');
      }else if(dayn == 1 || dayn < 7){
        store.set('dayn', dayn += 1);
        moodSetter(dayn,'mad');
      }else{
        store.delete('dayn');
      }

      document.getElementById("mood-set-win").style.visibility='hidden';
      document.getElementById("overlay").style.visibility='hidden';
      document.body.classList.remove("stop-scrolling");
      document.body.classList.add("start-scrolling");
      document.getElementById("mood-set").style.visibility='hidden';
      document.getElementById("already").style.visibility='visible';
    })

  })

  document.querySelector('#mood-set-x').addEventListener('click', () => {
    document.getElementById("mood-set-win").style.visibility='hidden';
    document.getElementById("overlay").style.visibility='hidden';
    document.body.classList.remove("stop-scrolling");
    document.body.classList.add("start-scrolling");
  })

  //timer settings window
  document.querySelector('#time-set').addEventListener('click', () => {
    document.getElementById("time-set-win").style.visibility='visible';
    document.getElementById("overlay").style.visibility='visible';
    document.body.classList.add("stop-scrolling");
    document.body.classList.remove("start-scrolling");

    document.querySelector('#halfh').addEventListener('click', () => {
      store.set('timer', '30m');
      document.getElementById("time-set-win").style.visibility='hidden';
      document.getElementById("overlay").style.visibility='hidden';
      document.body.classList.remove("stop-scrolling");
      document.body.classList.add("start-scrolling");
      location.reload(true);
    })

    document.querySelector('#oneh').addEventListener('click', () => {
      store.set('timer', '1h');
      document.getElementById("time-set-win").style.visibility='hidden';
      document.getElementById("overlay").style.visibility='hidden';
      document.body.classList.remove("stop-scrolling");
      document.body.classList.add("start-scrolling");
      location.reload(true);
    })

    document.querySelector('#twoh').addEventListener('click', () => {
      store.set('timer', '2h');
      document.getElementById("time-set-win").style.visibility='hidden';
      document.getElementById("overlay").style.visibility='hidden';
      document.body.classList.remove("stop-scrolling");
      document.body.classList.add("start-scrolling");
      location.reload(true);
    })
  })

  document.querySelector('#time-set-x').addEventListener('click', () => {
    document.getElementById("time-set-win").style.visibility='hidden';
    document.getElementById("overlay").style.visibility='hidden';
    document.body.classList.remove("stop-scrolling");
    document.body.classList.add("start-scrolling");
  })

  if(store.get('timer')){
    switch (store.get('timer')) {
      case '30m':
      setInterval(function(){
        new Notification("Take a Break", {title: "Remember to rest",
        body: "Here is your reminder to rest a bit to make sure you are not overworking.", icon: "icon.ico", timeoutType: "never"}).onclick = () => console.log("timer snoozed")
      }, 1800000);
      break;
      case '1h':
      setInterval(function(){
        new Notification("Take a Break", {title: "Remember to rest",
        body: "Here is your reminder to rest a bit to make sure you are not overworking.", icon: "icon.ico", timeoutType: "never"}).onclick = () => console.log("timer snoozed")
      }, 3600000);
      break;
      case '2h':
      setInterval(function(){
        new Notification("Take a Break", {title: "Remember to rest",
        body: "Here is your reminder to rest a bit to make sure you are not overworking.", icon: "icon.ico", timeoutType: "never"}).onclick = () => console.log("timer snoozed")
      }, 7200000);
      break;
    }

    if(store.get('timer') == '30m'){
      document.getElementById("current-timer").textContent = "Active Timer: Every 30 minutes";
    }else if(store.get('timer') == '1h'){
      document.getElementById("current-timer").textContent = "Active Timer: Every hour";
    }else if(store.get('timer') == '2h'){
      document.getElementById("current-timer").textContent = "Active Timer: Every 2 hours";
    }
  }
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
