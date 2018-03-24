(() => {
  console.log()

  	// capIt method => capitalize the first letter of any string
  String.prototype.capIt = function(){ return this.replace(this.charAt(), this.charAt().toUpperCase()); };

  let   sigils = document.querySelectorAll('.sigilContainer'),
        lightbox = document.querySelector('.lightbox'),
        volumeBar = document.querySelector('.volume-bar'),
        closeLightbox = document.querySelector('.close-lightbox'),
        unsupported = document.querySelector('.unsupported'),
        video = document.querySelector('video'),
        houseImages = document.querySelectorAll('#houseImages img'),
        description = document.querySelectorAll('.house-name'),
        houseInfo = document.querySelector('.house-info'),
        details = [
          {
            tagline: 'House Stark',
            info: 'House Stark Info',
          },{
            tagline: 'House Baratheon',
            info: 'House Baratheon Info',
          },{
            tagline: 'House Lannister',
            info: 'House Tully Info',
          },{
            tagline: 'House Tully',
            info: 'House Tully Info',
          },{
            tagline: 'House Greyjoy',
            info: 'House Greyjoy Info',
          },{
            tagline: 'House Arryn',
            info: 'House Arryn Info',
          }
        ],
        imageBanner = document.querySelector("#houseImages"),
        offSet = 600;
  const wait = time => new Promise((resolve) => setTimeout(resolve, time));

  imageBanner.style.right = "0px";

  function moveBanner() {
		imageBanner.style.right = (offSet * this.dataset.offset) + "px";
		let houseName = this.className.split(' ')[1].capIt();
    wait(500).then(() => {
      description.forEach(description => description.innerHTML = details[this.dataset.offset].tagline),
      houseInfo.innerHTML = details[this.dataset.offset].info;
  });
    wait(1000).then(() => loadMovie(houseName));
  }
  
  function loadMovie(house){
    mp4Test = video.canPlayType('video/mp4');
    webmTest = video.canPlayType('video/webm');
    if (mp4Test == "probably" || mp4Test == "maybe") {
      video.src = `video/House-${house}.mp4`;
    } else if (webmTest == "probably" || webmTest == "maybe") {
      video.src = `video/House-${house}.webm`;
    } else if (mp4Test == null && webmTest == null) {
      unsupported.innerHTML = `Your browser doesn't support HTML5 video.<a href="video/${house}.mp4">Download</a> the video instead.`
    };
    
    lightbox.classList.add('show-lightbox');
    video.volume = 0.5;
    volumeBar.value = 0.5;
    video.load();
    video.play();
    console.log(video.src)
  };

  function closeLBox(){
    lightbox.classList.remove('show-lightbox');
    video.pause();
    video.currentTime = 0;
  }

  sigils.forEach(sigil => sigil.addEventListener('click', moveBanner));
  closeLightbox.addEventListener('click', closeLBox);
  video.addEventListener('ended',closeLBox);

})();
