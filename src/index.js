import './style.css';

const HOST = process.env.HOST || null;

const tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const channels = [
  {
    title: 'Music',
    url: 'PLSZ1wOgDlKaC5IqiXrhIaTElxXKvXBI20',
  },
  {
    title: 'Nerdy',
    url: 'PLSZ1wOgDlKaCjrBEq1pZhkrKNuQ8ATCrt',
  },
  {
    title: 'lul',
    url: 'PLSZ1wOgDlKaCRCB5xwozf8JoWTQiv6o6w',
  },
];

let currentChannel = 0;
let player;

const shuffleAndPlay = () => {
  setTimeout(() => {
    player.setShuffle({ shufflePlaylist: 1 });
    setTimeout(() => {
      player.playVideoAt(0);
    }, 100);
  }, 1000);
};

const createPlayer = (playlistId) => {
  player = new YT.Player('player', { /* eslint-disable-line */
    playerVars: {
      listType: 'playlist',
      list: playlistId,
      controls: 0,
      disablekb: 1,
      iv_load_policy: 3,
      origin: HOST,
      rel: 0,
      showinfo: 0,
    },
    events: {
      onReady: shuffleAndPlay,
    },
  });
};

const playChannel = () => {
  player.cuePlaylist({
    listType: 'playlist',
    list: channels[currentChannel].url,
  });
  shuffleAndPlay();
};

const switchChannel = (n) => {
  if (n <= channels.length) {
    currentChannel = n - 1;
  }
  document.title = channels[currentChannel].title;
  playChannel();
};

const isDigit = (str) => {
  const digit = /\d/;
  return digit.test(str);
};

document.addEventListener('keypress', (event) => {
  const keyName = event.key;
  if (isDigit(keyName)) {
    const channelNum = Number(keyName);
    switchChannel(channelNum);
  }
});

global.onYouTubeIframeAPIReady = () => {
  document.title = channels[currentChannel].title;
  createPlayer(channels[currentChannel].url);
};

console.log(process.env.HOST);
