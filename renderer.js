const ipc = require('electron').ipcRenderer;

document.querySelector('#maxi').addEventListener('click', () => {
  ipc.send('max');
})

document.querySelector('#mini').addEventListener('click', () => {
  ipc.send('min');
})

document.querySelector('#x').addEventListener('click', () => {
  ipc.send('x');
})
