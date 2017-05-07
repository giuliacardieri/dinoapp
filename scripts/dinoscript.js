(function() {
  //'use strict';
  var audios = {
    "1": {
        "name": "bruno",
        "file": "audio/KikiB.mp3",
        "offline": "false",
      }, 
    "2": {
        "name": "guilherme",
        "file": "audio/KikiG.mp3",
        "offline": "true",
      }, 
    "3": {
        "name": "michelangelo",
        "file": "audio/KikiM.mp3",
        "offline": "true",
      }, 
    "4": {
        "name": "raianne",
        "file": "audio/KikiR.mp3",
        "offline": "true",
      }, 
    "5": {
        "name": "raquel",
        "file": "audio/KikiI.mp3",
        "offline": "true",
      }, 
    "6": {
        "name": "caio mahin",
        "file": "audio/KikiC.mp3",
        "offline": "false",
      }, 
    "7": {
        "name": "felipe",
        "file": "audio/KikiF.mp3",
        "offline": "false",
      }, 
    "8": {
        "name": "staying alive",
        "file": "audio/KikiSA.mp3",
        "offline": "false",
      }, 
    "9": {
        "name": "jerome",
        "file": "audio/KikiJ.mp3",
        "offline": "true",
      }, 
    "10": {
        "name": "caio hideki",
        "file": "audio/KikiCH.mp3",
        "offline": "false",
      }, 
    "11": {
        "name": "carlos",
        "file": "audio/KikiCB.mp3",
        "offline": "false",
      }, 
    "12": {
        "name": "felix",
        "file": "audio/KikiL.mp3",
        "offline": "false",
      }, 
    "13": {
        "name": "elisa",
        "file": "audio/KikiE.mp3",
        "offline": "false",
      }, 
    "14": {
        "name": "giovana",
        "file": "audio/KikiGA.mp3",
      }, 
    "15": {
        "name": "nicole",
        "file": "audio/KikiN.mp3",
        "offline": "false",
      }, 
    "16": {
        "name": "tamires",
        "file": "audio/KikiT.mp3",
        "offline": "false",
      }, 
    "17": {
        "name": "vitoria",
        "file": "audio/KikiV.mp3",
      }, 
    "18": {
        "name": "yumi",
        "file": "audio/KikiY.mp3",
        "offline": "false",
      }, 
    "19": {
        "name": "guilherme feat bday",
        "file": "audio/KikiG2.mp3",
        "offline": "false",
      }, 
    "20": {
        "name": "giulia",
        "file": "audio/Kiki2.mp3",
        "offline": "false",
      }, 
    "21": {
        "name": "keiko",
        "file": "audio/KikiK.mp3",
        "offline": "false",
      }, 
    "22": {
        "name": "carol",
        "file": "audio/KikiAC.mp3",
        "offline": "false",
      }, 
    "23": {
        "name": "mission impokikible",
        "file": "audio/KikiMI.mp3",
        "offline": "false",
      }, 
    "24": {
        "name": "hakuna matata",
        "file": "audio/KikiHM.mp3",
        "offline": "false",
      }, 
    "25": {
        "name": "henrique",
        "file": "audio/KikiH.mp3",
        "offline": "false",
      },
  };

  var app = {
    dinoClosed: true,
    random: 0,
    audio: null,
  };    

  // preload the audio files that will be available offline
  // a new audio needs to be created before fetching the files when offline
  // otherwise it will not be played
  var preLoadAudios = function preLoadAudios () {
    for (var i = 1; i < Object.keys(audios).length + 1; i++){
        if (audios[i].offline === 'true')
            loading = new Audio(audios[i].file);
    }
  }

    // changes the dinossaur svg when you click on it
    var changeImage = function changeImage() {
        if (app.dinoClosed) {
            document.querySelector('.dino-open').classList.remove('hidden');
            document.querySelector('.dino-closed').classList.add('hidden');
            app.dinoClosed = false;
        } else {
            document.querySelector('.dino-closed').classList.remove('hidden');
            document.querySelector('.dino-open').classList.add('hidden');
            app.dinoClosed = true;
        }
    }
    // makes the dino say kiki
    var sayKiki = function sayKiki(test) {
        if (!app.dinoClosed) {
          // if (app.offline === false)
            app.random = parseInt(Math.random() * Object.keys(audios).length) + 1;
          // else {
          //   while (audios[app.random].offline !== true)
          //     app.random = parseInt(Math.random() * Object.keys(audios).length);
          // }
            app.audio = new Audio(audios[app.random].file);
            console.log('kiki playing is ' + audios[app.random].name);
            app.audio.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
            app.audio.play();
        } else
            app.audio.pause();
    }

    document.getElementById('dino-svg-wrapper').addEventListener('click', function() {
        changeImage();
        sayKiki();
    });

    preLoadAudios();
})();
