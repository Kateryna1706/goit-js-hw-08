import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));
setTime();

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

function onPlay(data) {
  const currentTime = data.seconds;

  localStorage.setItem('videoplayer-current-time', currentTime);
}

function setTime() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player
      .setCurrentTime(savedTime)
      .then(function (seconds) {})
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

          default:
            // some other error occurred
            break;
        }
      });
  }
}
