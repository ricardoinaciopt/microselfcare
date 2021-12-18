const path = require('path')

module.exports = {
  "packagerConfig": {
    "icon": path.join(__dirname, "icon.ico")
  },
  "makers": [
    {
      "name": "@electron-forge/maker-squirrel",
      "config": {
        "name": "microselfcare",
        "iconUrl": "https://raw.githubusercontent.com/ricardoinaciopt/microselfcare/master/icon.ico",
        "loadingGif": path.join(__dirname, "img/load.gif"),
        "setupIcon": path.join(__dirname, "icon.ico")
      },
      "name": "@electron-forge/maker-zip"
    },
    {
      "name": "@electron-forge/maker-deb",
      "config": {}
    },
    {
      "name": "@electron-forge/maker-rpm",
      "config": {}
    }
  ]
}
