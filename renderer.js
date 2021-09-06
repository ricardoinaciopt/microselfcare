const ipc = require('electron').ipcRenderer;
const Store = require('electron-store')
document.querySelector('#maxi').addEventListener('click', () => {
  ipc.send('max');
})

document.querySelector('#mini').addEventListener('click', () => {
  ipc.send('min');
})

document.querySelector('#x').addEventListener('click', () => {
  ipc.send('x');
})

const store = new Store();
  document.querySelector('#button').addEventListener('click', () => {
    var user = document.getElementById("username").value;
    if(!user){
      document.querySelector("#error").style.visibility='visible'
    }else{
      store.set('user',user);
      ipc.send('userexists');
    }
  })
