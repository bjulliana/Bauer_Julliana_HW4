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
            info: 'Rulers of the North from the castle of Winterfell. Recently retook their lands from House Bolton, and currently preparing for the war against the Night King. Its current head is Lady Sansa Stark, who jointly rules the North with Warden Jon Snow.',
          },{
            tagline: 'House Baratheon',
            info: `Rulers of the Crownlands and Stormlands from the Red Keep and Storm's End, respectively. Extinct in actuality due to all mainline members being deceased but the bloodline is still alive, technically speaking, through Robert the Usurper's many bastard children. The line legally ended with the death of King Tommen I Baratheon, the bastard son of twins Queen Cersei Lannister and Ser Jaime Lannister, who was legally the last remaining Baratheon.`,
          },{
            tagline: 'House Lannister',
            info: `The current royal house of the Seven Kingdoms from the Red Keep of King's Landing in the Crownlands and rulers of the Westerlands from the castle of Casterly Rock. Its leadership is currently disputed by Queen Cersei I Lannister and Lord Tyrion Lannister.`,
          },{
            tagline: 'House Tully',
            info: `The former rulers of the Riverlands, ruling from Riverrun, until the Red Wedding. Riverrun is currently under House Lannister's control. Its current head is Edmure Tully, who remains a captive of House Lannister.`,
          },{
            tagline: 'House Greyjoy',
            info: 'Rulers of the Iron Islands from the castle of Pyke. Divided, with members supporting either the Lannister or Stark/Targaryen cause. Its leadership is currently disputed by King Euron Greyjoy and claimant Lady Yara Greyjoy.',
          },{
            tagline: 'House Arryn',
            info: 'Rulers of the Vale of Arryn from the castle of the Eyrie. It was integrated with the Kingdom of the North until King Jon Snow abdicated. They currently hold allegiance to House Targaryen. Its current head is Lord Robin Arryn.Info',
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
  };

  function closeLBox(){
    lightbox.classList.remove('show-lightbox');
    video.pause();
    video.currentTime = 0;
    video.load();
  }

  sigils.forEach(sigil => sigil.addEventListener('click', moveBanner));
  closeLightbox.addEventListener('click', closeLBox);
  video.addEventListener('ended',closeLBox);

})();
