(() => {
    console.log('Loaded');

    var supportsVideo = !!document.createElement('video').canPlayType;
    if (supportsVideo) {
    
    var videoContainer = document.querySelector('.videoContainer');
    var video = document.querySelector('video');
    var videoControls = document.querySelector('#controls');
    var playpause = document.querySelector('.playButton');
    var playIcon = playpause.querySelector('i');
    var volume = document.querySelector('.volume');
    var volumeBar = document.querySelector('.volume-bar');
    var mute = document.querySelector('.muteButton');
    var progress = document.querySelector('.progressBar');
    var progressBar = document.querySelector('.progress');
    var fullscreen = document.querySelector('.scale');
    var positionTime = document.querySelector('.currentTime');
    var videoDuration = document.querySelector('.totalTime')
        
    // Hide the default controls
    video.controls = false;

    // Display the user defined video controls
    videoControls.style.display = 'flex';

     // Check if the browser supports the Fullscreen API
     var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);

     // If the browser doesn't support the Fulscreen API then hide the fullscreen button
     if (!fullScreenEnabled) {
       fullscreen.style.display = 'none';
     }

    //Play Pause Video
     function _playPause(e) {
        if (video.paused || video.ended) video.play();
        else video.pause();
        //Change Play Pause Icon
        var icon = playpause.querySelector('[data-fa-i2svg]');
        icon.classList.toggle('fa-play')
        icon.classList.toggle('fa-pause');
     };

     //Get Video Duration
     function _videoDuration() {
        progress.setAttribute('max', video.duration);
     };

     //Video Time Update Progress Bar
     function _updateTime() {
        if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
        progress.value = video.currentTime;
        progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
        positionTime.innerHTML = video.currentTime.toString().toHHMMSS();
        videoDuration.innerHTML = video.duration.toString().toHHMMSS();
     };

     //Click Progress Bar to Change Video Time
     function _changeTime(e) {
        var pos = e.offsetX / progress.offsetWidth * video.duration;
		video.currentTime = pos;
     };

     //Change Volume
        function _changeVolume() {
            video.volume = volumeBar.value;
            var icon = document.querySelector('.volumeContainer [data-fa-i2svg]');

            if(video.volume < 0.5 && video.volume > 0) {
                icon.classList.toggle('fa-volume-down')
            } else if (video.volume >= 0.5) {
                icon.classList.toggle('fa-volume-up')
            } else if (video.volume === 0) {
                icon.classList.toggle('fa-volume-off')
        }
    };

    // Mute and Unmute
    function _toggleMute() {
        var icon = document.querySelector('.muteButton [data-fa-i2svg]');

        if (video.muted == false) {
			// Mute the video
			video.muted = true;

			// Update the button text
			icon.classList.toggle('fa-volume-off');
		} else {
			// Unmute the video
			video.muted = false;

			// Update the button text
			icon.classList.toggle('fa-volume-up');
		}
    };

     //Enter Fullscreen
     // Set the video container's fullscreen state
  	var setFullscreenData = function(state) {
        videoContainer.setAttribute('data-fullscreen', !!state);
    }

    // Checks if the document is currently in fullscreen mode
     var isFullScreen = function() {
         return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
     }

     // Fullscreen
     var _toggleFullScreen = function() {
         // If fullscreen mode is active...	
          if (isFullScreen()) {
              // ...exit fullscreen mode
              // (Note: this can only be called on document)
              if (document.exitFullscreen) {
                  document.exitFullscreen();
                video.style.width = "60%";
                video.style.height = "auto";
                video.style.marginTop = '10px';
              } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                video.style.width = "60%";
                video.style.height = "auto";
                video.style.marginTop = '10%';
              } else if (document.webkitCancelFullScreen)  {
                    document.webkitCancelFullScreen();
                video.style.width = "60%";
                video.style.height = "auto";
                video.style.marginTop = '10%';
              } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                    video.style.width = "60%";
                    video.style.height = "auto";
                    video.style.marginTop = '10%';
                    setFullscreenData(false);
              }
          }
          else {
            // ...otherwise enter fullscreen mode
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
            video.style.width = "100%";
            video.style.height = "100%";
            video.style.marginTop = '0';
        } else if (videoContainer.mozRequestFullScreen) {
            videoContainer.mozRequestFullScreen();
            video.style.width = "100%";
            video.style.height = "100%";
            video.style.marginTop = '0';            
        } else if (videoContainer.webkitRequestFullScreen) {
            videoContainer.webkitRequestFullScreen();
            video.style.width = "100%";
            video.style.height = "auto";
            video.style.marginTop = '0';
            video.style.display = "100%";
        } else if (videoContainer.msRequestFullscreen) { 
            videoContainer.msRequestFullscreen();
            setFullscreenData(true);
            video.style.marginTop = '0'; 
            video.style.height = "100%";
            video.style.width = "100%";
        }
    };
};	

String.prototype.toHHMMSS = function () {
	var sec_num = parseInt(this, 10);
	var minutes = Math.floor(sec_num / 60);
	var seconds = sec_num - (minutes * 60);

	if (seconds < 10) { seconds = "0" + seconds; }
	var time = minutes + ':' + seconds;
	return time;
};


    playpause.addEventListener('click', _playPause);
    video.addEventListener('click', _playPause);
    video.addEventListener('loadedmetadata', _videoDuration);
    video.addEventListener('timeupdate', _updateTime);
    progress.addEventListener('click', _changeTime);
    fullscreen.addEventListener('click', _toggleFullScreen);
    volumeBar.addEventListener('change', _changeVolume);
    mute.addEventListener('click', _toggleMute);

    };
})();
