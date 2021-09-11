const ipc = require('electron').ipcRenderer;
const Store = require('electron-store')
const AOS = require('aos')


AOS.init();
const store = new Store('accessPropertiesByDotNotation',false);

//not for clock, only for settings purpouses
var d = new Date();
var h = d.getHours();
var day		= d.getDay();
var dia = d.getDate();
var m	= d.getMinutes();
var s	= d.getSeconds();
var mon	= d.getMonth() + 1;
var y = d.getFullYear();

function checkZero(i) {
  i = (i < 10) ? "0" + i : i;
  return i;
}

function getToday() {
  return dia  + '/' + mon + '/' + y;
}

if(document.querySelector('#maxi')){
  document.querySelector('#maxi').addEventListener('click', () => {
    ipc.send('max');
  })
  var sample = document.getElementById("sfx");
  sample.play();
  sample.volume = 0.2;
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

    var date	= new Date();
    var day		= date.getDay();
    var hrs		= date.getHours();
    var mins	= date.getMinutes();

    hrs	= hrs < 10 ? "0" + hrs : hrs;
    mins	= mins < 10 ? "0" + mins : mins;

    document.querySelector('#clock').textContent = weekDays[day] + ", " + hrs + ":" + mins;
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
    case 'anxious':
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
  var dayn = store.get('dayn');
  var moodtodayFlag = store.get('moodtoday.flag');
  var moodtodayDate = store.get('moodtoday.day');
  var moodList = store.get('moods');

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

  function moodListGet(i){
    switch (i) {
      case 1:
      return 'dayone';
      break;
      case 2:
      return 'daytwo';
      break;
      case 3:
      return 'daythree';
      break;
      case 4:
      return 'dayfour';
      break;
      case 5:
      return 'dayfive';
      break;
      case 6:
      return 'daysix';
      break;
      case 7:
      return 'dayseven';
      break;
    }
  }

  function mdSetter(md,mdimg,mood){
    switch (mood) {
      case 'happy':
      document.getElementById(mdimg).setAttribute("src","img/happy.png");
      document.getElementById(md).textContent = "happy";
      break;
      case 'mad':
      document.getElementById(md).setAttribute("src","img/mad.png");
      document.getElementById(md).textContent = "mad";
      break;
      case 'sad':
      document.getElementById(mdimg).setAttribute("src","img/sad.png");
      document.getElementById(md).textContent = "sad";
      break;
      case 'anxious':
      document.getElementById(mdimg).setAttribute("src","img/anxious.png");
      document.getElementById(md).textContent = "anxious";
      break;
    }
  }

  function mode(array){
    var modeMap = {},
    maxEl = array[0],
    maxCount = 1;

    for (var i = 0; i < array.length; i++) {
      var el = array[i];

      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;

      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      } else if (modeMap[el] == maxCount) {
        maxEl += " and " + el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }

  function insight(wklymood) {
    switch (wklymood) {
      case 'happy':
      return "There's nothing to add! You are feeling how you deserve to feel every day, happy. Whatever you are doing, keep on doing it and keep up the excellent work!";
      break;
      case 'sad':
      return "It is ok to feel sad. It is part of the journey to find happiness. Take a moment to yourself, and think about what is making you feel this way. Can you make something to make it better? If yes, then give it your best shot, and do what you got to do. However, if you're not able to, try to learn from it, trying your best to reach inner acceptance, and heal from it, because every time you're trying to leave something unwanted behind, you are making space for something far greater, that has yet to come.";
      break;
      case 'anxious':
      return "Feeling anxious is perfectly normal, whether it's because of something scary you'll have to experience, do, or make. But you have to remember why you have to do that, or what will come, as a result of those scary actions, because sometimes, the payoff is far greater than the leap you have to take. Don't let your fears hold you back, ever. Although, if you think the level of anxiety you are feeling is abnormal, you should seek a professional.";
      break;
      case 'mad':
      return "That feeling does not serve another purpose other than wasting your time and reducing significantly your chance to have peace of mind. Throughout your life, you will face lots of situations that may mess with your temper, and after putting some thought into it, you'll realise that most of the time, that will not affect you at all, so try to remain calm and putting your sanity above all. In the cases that indeed will affect you, always seek the safest and most well-thought solution, as it will not only avoid conflict but keeping your mind at peace.";
      break;
      case 'happy and sad' || 'sad and happy':
      return "Although you are feeling happy, there is still a trace of sadness inside of you. You are on the correct path, and clearly making good choices, but still, try and reach inside you to find what is causing all those unwanted feelings, and see why this emotional clash is happening. Just make sure to remember that confusion is part of our nature, and all starts to be well, when we are correct and stay truthful to ourselves.";
      break;
      case 'happy and mad' || 'mad and happy':
      return "Although you are feeling happy, there is a fire burning inside of you, and the smoke doesn't let you see the beauty of life to its fullest. Maybe something or someone is bothering you, but you can't in any way let that change you for the worse. Stay true to yourself, and great things will come, or in this case, will keep coming your way. Try to realise what is causing this uproar in your soul and take care of it as soon as you can, so you can enjoy a peaceful life.";
      break;
      case 'happy and anxious' || 'anxious and happy':
      return "Although you are feeling happy, something isn't quite right. Something is going on that makes it impossible for you to enjoy your life to the fullest. Remember that you cannot control everything, and you shouldn't take everything so serious. Don't let your fears and this constant state of preoccupation stress you out, and take your peace away from you. Look around, and enjoy the world around you, and you will realise that every little problem will eventually be solved. The only thing you should worry about is if you are enjoying your life.";
      break;
      case 'sad and anxious' || 'anxious and sad':
      return "Your current state can be a bit worrying, as you experienced two negative emotions that can seriously affect your quality of life. Take a moment to realise what makes you feel this way so that you can finally make a change for the better. You are holding onto something that is probably not worth it. However, you are afraid to let it go and getting hurt in the process. Make a retrospective, and try to understand what matters the most and what can you do (or stop doing) to contribute to your happiness, which is the most important thing, after all.";
      break;
      case 'mad and anxious' || 'anxious and mad':
      return "Your current state can be a bit worrying, as you experienced two negative emotions that can seriously affect your quality of life. Take a moment to realise what makes you feel this way so that you can finally make a change for the better. You are holding onto something that is probably not worth it. However, you are afraid to let it go and getting hurt in the process. Make a retrospective, and try to understand what matters the most and what can you do (or stop doing) to contribute to your happiness, which is the most important thing, after all.";
      break;
      case 'mad and sad' || 'sad and mad':
      return "that you saw or happened put you in this state of anger against the world, which may negatively affect your mental health. However, it's crucial to get to the bottom of the question and realise what's making you feel this way. Remember that the world isn't always fair, and things that may be upsetting happen every day. It's then your choice to let these things affect you, or take action, whereas that be by ignoring what can't be changed, achieving true peace, or doing everything you can to change that, making the world a better place.";
      break;
    }
  }

  if(dayn == 7){
    document.getElementById("available").style.visibility='visible';
  }

  if(getToday() == moodtodayDate){
    //moodtodayFlag = true;
  }

  if(!moodtodayFlag){
    document.querySelector('#mood-set').addEventListener('click', () => {
      document.getElementById("overlay").style.visibility='visible';
      document.body.classList.add("stop-scrolling");
      document.body.classList.remove("start-scrolling");

      if(dayn == 7){ //resume for mood panel
        document.getElementById("mood-resume-win").style.visibility='visible';
        //display moods
        var userMoodsArr = [];

        for (var i = 0; i < 7; i++) {
          var md = 'md' + (i+1).toString();
          var mdimg = md + 'img';
          console.log(md + ' - ' + mdimg +' - '+ moodList[moodListGet(i+1)]);
          mdSetter(md,mdimg,moodList[moodListGet(i+1)]);
          userMoodsArr[i] = moodList[moodListGet(i+1)];
        }

        var most = mode(userMoodsArr);
        console.log(most);
        document.getElementById("week-mood").textContent = most;
        document.getElementById("week-rec").textContent = insight(most);

        document.querySelector('#mood-resume-x').addEventListener('click', () => {
          document.getElementById("mood-resume-win").style.visibility='hidden';
          document.getElementById("overlay").style.visibility='hidden';
          document.getElementById("available").style.visibility='hidden';
          document.body.classList.remove("stop-scrolling");
          document.body.classList.add("start-scrolling");
          store.delete('dayn');
          store.delete('moods');
          store.set('moodtoday',false);
        })
      }else{
        document.getElementById("mood-set-win").style.visibility='visible';
      }

      document.querySelector('#happy').addEventListener('click', () => {

        if(!dayn){
          store.set('dayn',1);
          store.set('moods.dayone','happy');
          store.set('moodtoday.flag',true);
          store.set('moodtoday.day',getToday());
        }else if(dayn == 1 || dayn < 7){
          store.set('dayn', dayn += 1);
          moodSetter(dayn,'happy');
          store.set('moodtoday',true);
        }

        document.getElementById("mood-set-win").style.visibility='hidden';
        document.getElementById("overlay").style.visibility='hidden';
        document.body.classList.remove("stop-scrolling");
        document.body.classList.add("start-scrolling");
        document.getElementById("mood-set").style.visibility='hidden';
        document.getElementById("already").style.visibility='visible';
      })

      document.querySelector('#anxious').addEventListener('click', () => {

        if(!dayn){
          store.set('dayn',1);
          store.set('moods.dayone','anxious');
          store.set('moodtoday.flag',true);
          store.set('moodtoday.day',getToday());
        }else if(dayn == 1 || dayn < 7){
          store.set('dayn', dayn += 1);
          moodSetter(dayn,'anxious');
          store.set('moodtoday',true);
        }

        document.getElementById("mood-set-win").style.visibility='hidden';
        document.getElementById("overlay").style.visibility='hidden';
        document.body.classList.remove("stop-scrolling");
        document.body.classList.add("start-scrolling");
        document.getElementById("mood-set").style.visibility='hidden';
        document.getElementById("already").style.visibility='visible';
      })

      document.querySelector('#sad').addEventListener('click', () => {

        if(!dayn){
          store.set('dayn',1);
          store.set('moods.dayone','sad');
          store.set('moodtoday.flag',true);
          store.set('moodtoday.day',getToday());
        }else if(dayn == 1 || dayn < 7){
          store.set('dayn', dayn += 1);
          moodSetter(dayn,'sad');
          store.set('moodtoday',true);
        }

        document.getElementById("mood-set-win").style.visibility='hidden';
        document.getElementById("overlay").style.visibility='hidden';
        document.body.classList.remove("stop-scrolling");
        document.body.classList.add("start-scrolling");
        document.getElementById("mood-set").style.visibility='hidden';
        document.getElementById("already").style.visibility='visible';
      })

      document.querySelector('#mad').addEventListener('click', () => {

        if(!dayn){
          store.set('dayn',1);
          store.set('moods.dayone','mad');
          store.set('moodtoday.flag',true);
          store.set('moodtoday.day',getToday());
        }else if(dayn == 1 || dayn < 7){
          store.set('dayn', dayn += 1);
          moodSetter(dayn,'sad');
          store.set('moodtoday',true);
        }

        document.getElementById("mood-set-win").style.visibility='hidden';
        document.getElementById("overlay").style.visibility='hidden';
        document.body.classList.remove("stop-scrolling");
        document.body.classList.add("start-scrolling");
        document.getElementById("mood-set").style.visibility='hidden';
        document.getElementById("already").style.visibility='visible';
      })

    })
  }else{
    document.getElementById("already").style.visibility='visible';
    document.getElementById("mood-set").style.visibility='hidden';
  }

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
