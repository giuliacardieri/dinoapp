(function() {
  //'use strict';


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
