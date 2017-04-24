 (function() {
  'use strict';

    var audio_context;
    var recorder;

    var startUserMedia = function startUserMedia(stream) {
      var input = audio_context.createMediaStreamSource(stream);;
      
      // instance the recorder
      recorder = new Recorder(input);
    };

    var createDownloadLink = function createDownloadLink() {
      recorder && recorder.exportWAV(function(blob) {
        var url = URL.createObjectURL(blob);
        var li = document.createElement('li');
        var au = document.createElement('audio');
        var hf = document.createElement('a');
        
        au.controls = true;
        au.src = url;
        hf.href = url;
        hf.download = new Date().toISOString() + '.wav';
        hf.innerHTML = hf.download;
        li.appendChild(au);
        li.appendChild(hf);
        document.querySelector('.audio-list').classList.remove('hidden');
        document.querySelector('.audio-list').appendChild(li);
      });
    };

    document.getElementsByClassName('btn-record')[0].addEventListener('click', function() {
      recorder && recorder.record();;
      document.querySelector('.btn-record').classList.add('hidden');
      document.querySelector('.btn-stop').classList.remove('hidden');
    });

    document.getElementsByClassName('btn-stop')[0].addEventListener('click', function() {
      recorder && recorder.stop();;
      document.querySelector('.btn-record').classList.remove('hidden');;
      document.querySelector('.btn-stop').classList.add('hidden');  

      // create WAV download link using audio data blob
      createDownloadLink();
      recorder.clear();
    });

      try {
        // webkit shim
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;
        
        audio_context = new AudioContext;
      } catch (e) {
        alert('No web audio support in this browser!');
      }
      
      navigator.getUserMedia({audio: true}, startUserMedia, function(e) {});

})();