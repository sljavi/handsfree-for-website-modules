import { isMedia } from 'dom-element-types';
import $ from 'jquery';

const i18n = {
  en: {
    use: 'Use the command "select", "select video", "select audio" or "select media" over one of the following media content',
    audio: 'Audio',
    video: 'Video',
    forward: 'forward',
    forwardMedia: 'Forward media',
    rewind: 'rewind',
    rewindMedia: 'Rewind media',
  },
  es: {
    use: 'Usar el comando "seleccionar", "seleccionar video", "seleccionar audio" o "seleccionar multimedia" sobre uno de los siguientes contenidos multimedia',
    audio: 'Audio',
    video: 'Video',
    forward: 'adelantar',
    forwardMedia: 'Adelantar multimedia',
    rewind: 'rebobinar',
    rewindMedia: 'Rebobinar multimedia',
  },
  pt: {
    use: 'Use o comando "selecionar", "selecionar vídeo", "selecionar áudio" ou "selecionar mídia" em um dos seguintes conteúdos de mídia',
    audio: 'Áudio',
    video: 'Vídeo',
    forward: 'avançar',
    forwardMedia: 'Avançar mídia',
    rewind: 'retornar',
    rewindMedia: 'Retornar mídia',
  },
  yue: {
    use: '在以下的多媒體內容使用「選取」、「選取影片」、「選取音樂」或「選取多媒體」',
    audio: '音樂',
    video: '影片',
    forward: '向前移動',
    forwardMedia: '向前移動',
    rewind: '向後移動',
    rewindMedia: '向後移動',
  },
};

const getHtmlExample = language => `
  <p>${i18n[language].use}</p>
  <h4>${i18n[language].audio}</h4>
  <p class="box">
    <audio controls>
      <source src="https://handsfreeforweb.com/hfw-assets/audio.mp3" type="audio/mpeg">
    </audio>
  </p>
  <h4>${i18n[language].video}</h4>
  <p class="box">
    <video width="320" height="240" controls>
      <source src="https://handsfreeforweb.com/hfw-assets/video.mp4" type="video/mp4">
    </video>
  </p>`;

const defaultLapse = 30;

const timeLapses = [{
  name: 'thirty-seconds',
  en: 'thirty seconds',
  es: 'treinta segundos',
  pt: 'trinta segundos',
  yue: '三十秒',
  time: 30,
}, {
  name: 'one-minute',
  en: 'one minute',
  es: 'un minuto',
  pt: 'um minuto',
  yue: '一分鐘',
  time: 60,
}, {
  name: 'three-minutes',
  en: 'three minutes',
  es: 'tres minutos',
  pt: 'três minutos',
  yue: '三分鐘',
  time: 3 * 60,
}, {
  name: 'five-minutes',
  en: 'five minutes',
  es: 'cinco minutos',
  pt: 'cinco minutos',
  yue: '五分鐘',
  time: 5 * 60,
}, {
  name: 'ten-minutes',
  en: 'ten minutes',
  es: 'diez minutos',
  pt: 'dez minutos',
  yue: '十分鐘',
  time: 10 * 60,
}, {
  name: 'fifteen-minutes',
  en: 'fifteen minutes',
  es: 'quince minutos',
  pt: 'quinze minutos',
  yue: '十五分鐘',
  time: 15 * 60,
}, {
  name: 'twenty-minutes',
  en: 'twenty minutes',
  es: 'veinte minutos',
  pt: 'vinte minutos',
  yue: '二十分鐘',
  time: 20 * 60,
}, {
  name: 'thirty-minutes',
  en: 'thirty minutes',
  es: 'treinta minutos',
  pt: 'trinta minutos',
  yue: '三十分鐘',
  time: 30 * 60,
}, {
  name: 'forty-five-minutes',
  en: 'forty five minutes',
  es: 'cuarenta y cinco minutos',
  pt: 'quarenta e cinco minutos',
  yue: '四十五分鐘',
  time: 45 * 60,
}, {
  name: 'sixty-minutes',
  en: 'sixty minutes',
  es: 'sesenta minutos',
  pt: 'sessenta minutos',
  yue: '六十分鐘',
  time: 60 * 60,
}, {
  name: 'one-hour',
  en: 'one hour',
  es: 'una hora',
  pt: 'uma hora',
  yue: '一小時',
  time: 60 * 60,
}];

function play({ selectedElement }) {
  selectedElement.play();
}

function pause({ selectedElement }) {
  selectedElement.pause();
}

function stop({ selectedElement }) {
  pause({ selectedElement });
  selectedElement.currentTime = 0;
}

function unmute({ contextState, selectedElement }) {
  selectedElement.volume = contextState.unmute;
  return {};
}

function mute({ selectedElement }) {
  let newState;
  if (selectedElement.volume > 0) {
    newState = {
      unmute: selectedElement.volume,
    };
    selectedElement.volume = 0;
  } else {
    newState = unmute({ selectedElement });
  }
  return newState;
}

function volumeUp({ selectedElement }) {
  let newVolume = selectedElement.volume + 0.25;
  if (newVolume > 1) {
    newVolume = 1;
  }
  selectedElement.volume = newVolume;
}

function volumeDown({ selectedElement }) {
  let newVolume = selectedElement.volume - 0.25;
  if (newVolume < 0) {
    newVolume = 0;
  }
  selectedElement.volume = newVolume;
  return {
    unmute: 0.50,
  };
}

function rewind(selectedElement, time = defaultLapse) {
  let currentTime = selectedElement.currentTime - time;
  if (currentTime < 0) {
    currentTime = 0;
  }
  selectedElement.currentTime = currentTime;
}

function forward(selectedElement, time = defaultLapse) {
  let currentTime = selectedElement.currentTime + time;
  if (currentTime > selectedElement.duration) {
    currentTime = selectedElement.duration;
  }
  selectedElement.currentTime = currentTime;
}

function fullscreen({ selectedElement }) {
  $(selectedElement).addClass('make-video-fullscreen');
  const videoPlayer = $('.html5-video-player');
  if (videoPlayer) {
    videoPlayer.addClass('move-to-the-front');
  }
  return {
    fullscreen: true,
  };
}

function rewindActions() {
  return timeLapses.map(timeLapse => ({
    name: `i18n-command.rewind-${timeLapse.name}`,
    help: `i18n-help.rewind-${timeLapse.name}`,
    action: ({ selectedElement }) => rewind(selectedElement, timeLapse.time),
    group: 'i18n-group.rewind',
  }));
}

function rewindI18n(language) {
  const map = {};
  timeLapses.forEach((timeLapse) => {
    map[`command.rewind-${timeLapse.name}`] = `${i18n[language].rewind} ${timeLapse[language]}`;
    map[`help.rewind-${timeLapse.name}`] = `${i18n[language].rewindMedia} ${timeLapse[language]}`;
  });
  return map;
}

function forwardActions() {
  return timeLapses.map(timeLapse => ({
    name: `i18n-command.forward-${timeLapse.name}`,
    help: `i18n-help.forward-${timeLapse.name}`,
    action: ({ selectedElement }) => forward(selectedElement, timeLapse.time),
    group: 'i18n-group.forward',
  }));
}

function teardown({ selectedElement }) {
  $(selectedElement).removeClass('make-video-fullscreen');
  const videoPlayer = $('.html5-video-player');
  if (videoPlayer) {
    videoPlayer.removeClass('move-to-the-front');
  }
}

function forwardI18n(language) {
  const map = {};
  timeLapses.forEach((timeLapse) => {
    map[`command.forward-${timeLapse.name}`] = `${i18n[language].forward} ${timeLapse[language]}`;
    map[`help.forward-${timeLapse.name}`] = `${i18n[language].forwardMedia} ${timeLapse[language]}`;
  });
  return map;
}

function handleSwitchOnSelectElement(selectedElement) {
  return isMedia(selectedElement);
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-music',
  contexts: [{
    context: 'media',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    htmlExample: 'i18n-html-example',
    teardown,
    commands: [{
      name: 'i18n-command.play',
      action: play,
      help: 'i18n-help.play',
      group: 'i18n-group.play',
    }, {
      name: 'i18n-command.pause',
      help: 'i18n-help.pause',
      action: pause,
      group: 'i18n-group.pause',
    }, {
      name: 'i18n-command.stop',
      action: stop,
      help: 'i18n-help.stop',
      group: 'i18n-group.stop',
    }, {
      name: 'i18n-command.mute',
      action: mute,
      help: 'i18n-help.mute',
      group: 'i18n-group.mute',
    }, {
      name: 'i18n-command.volume-up',
      action: volumeUp,
      help: 'i18n-help.volume-up',
      group: 'i18n-group.volume-up',
    }, {
      name: 'i18n-command.volume-down',
      action: volumeDown,
      help: 'i18n-help.volume-down',
      group: 'i18n-group.volume-down',
    }, {
      name: 'i18n-command.fullscreen',
      action: fullscreen,
      help: 'i18n-help.fullscreen',
      group: 'i18n-group.fullscreen',
    }, {
      name: 'i18n-command.rewind',
      help: 'i18n-help.rewind',
      action: ({ selectedElement }) => rewind(selectedElement),
      group: 'i18n-group.rewind',
    }, {
      name: 'i18n-command.forward',
      action: ({ selectedElement }) => forward(selectedElement),
      help: 'i18n-help.forward',
      group: 'i18n-group.forward',
    },
    ...rewindActions(),
    ...forwardActions(),
    ],
    i18n: {
      en: {
        name: 'Media Actions',
        'command.play': 'play',
        'help.play': 'Play media',
        'group.play': 'Control media content',
        'command.pause': 'pause',
        'help.pause': 'Pause media',
        'group.pause': 'Control media content',
        'command.stop': 'stop',
        'help.stop': 'Stop media',
        'group.stop': 'Control media content',
        'command.mute': 'mute',
        'help.mute': 'Mutes media',
        'group.mute': 'Control volume',
        'command.volume-up': 'volume up',
        'help.volume-up': 'Increases volume level',
        'group.volume-up': 'Control volume',
        'command.volume-down': 'volume down',
        'help.volume-down': 'Decreases volume level',
        'group.volume-down': 'Control volume',
        'command.fullscreen': 'fullscreen',
        'help.fullscreen': 'Makes the video fullscreen',
        'group.fullscreen': 'Fullscreen',
        'command.rewind': 'rewind',
        'help.rewind': 'Rewind media 30 seconds',
        'group.rewind': 'Control media content',
        'command.forward': 'forward',
        'help.forward': 'Forward media 30 seconds',
        'group.forward': 'Control media content',
        play: 'Play',
        pause: 'Pause',
        stop: 'Stop',
        mute: 'Mute',
        'volume-up': 'Volume Up',
        'volume-down': 'Volume Down',
        rewind: 'Rewind',
        forward: 'Forward',
        fullscreen: 'Fullscreen',
        exit: 'Exit',
        'html-example': getHtmlExample('en'),
        ...rewindI18n('en'),
        ...forwardI18n('en'),
      },
      es: {
        name: 'Opciones de multimedia',
        'command.play': 'reproducir',
        'help.play': 'Reproducir',
        'group.play': 'Control de contenido',
        'command.pause': 'pausar',
        'help.pause': 'Pausar',
        'group.pause': 'Control de contenido',
        'command.stop': 'parar',
        'help.stop': 'Parar',
        'group.stop': 'Control de contenido',
        'command.mute': 'silencio',
        'help.mute': 'Silenciar',
        'group.mute': 'Control de volumen',
        'command.volume-up': 'subir volumen',
        'help.volume-up': 'Incrementar volumen',
        'group.volume-up': 'Control de volumen',
        'command.volume-down': 'bajar volumen',
        'help.volume-down': 'Disminuir volumen',
        'group.volume-down': 'Control de volumen',
        'command.fullscreen': 'maximizar',
        'help.fullscreen': 'Ver video en pantalla completsa',
        'group.fullscreen': 'Maximizar',
        'command.rewind': 'rebobinar',
        'help.rewind': 'Rebobinar 30 segundos',
        'group.rewind': 'Control de contenido',
        'command.forward': 'adelantar',
        'help.forward': 'Adelantar  30 segundos',
        'group.forward': 'Control de contenido',
        play: 'Reproducir',
        pause: 'Pausar',
        stop: 'Parar',
        mute: 'Silencio',
        'volume-up': 'Subir volumen',
        'volume-down': 'Bajar volumen',
        rewind: 'Rebobinar',
        forward: 'Adelantar',
        fullscreen: 'Maximizar',
        exit: 'Salir',
        'html-example': getHtmlExample('es'),
        ...rewindI18n('es'),
        ...forwardI18n('es'),
      },
      pt: {
        name: 'Funções de multimídia',
        'command.play': 'play',
        'help.play': 'Inicia a reprodução',
        'group.play': 'Controle de multimídia',
        'command.pause': 'pausar',
        'help.pause': 'Pausa a reprodução',
        'group.pause': 'Controle de multimídia',
        'command.stop': 'parar',
        'help.stop': 'Paraa reprodução de  multimídias',
        'group.stop': 'Controle de multimídia',
        'command.mute': 'silenciar',
        'help.mute': 'Silencia a reprodução',
        'group.mute': 'Controle de volume',
        'command.volume-up': 'aumentar volume',
        'help.volume-up': 'Aumenta o volume de multimídias',
        'group.volume-up': 'Controle do volume',
        'command.volume-down': 'abaixar volume',
        'help.volume-down': 'Abaixa o volume de multimídias',
        'group.volume-down': 'Controle do volume',
        'command.fullscreen': 'tela cheia',
        'help.fullscreen': 'Deixa o vídeo em tela cheia',
        'group.fullscreen': 'Tela cheia',
        'command.rewind': 'retornar',
        'help.rewind': 'Retorna a mídia em 30 segundos',
        'group.rewind': 'Controle de multimídia',
        'command.forward': 'avançar',
        'help.forward': 'Avança a mídia em 30 segundos',
        'group.forward': 'Controle de multimídia',
        play: 'Play',
        pause: 'Pausar',
        stop: 'Parar',
        mute: 'Silenciar',
        'volume-up': 'Aumentar Volume',
        'volume-down': 'Abaixar Volume',
        rewind: 'Retornar',
        forward: 'Avançar',
        fullscreen: 'Tela Cheia',
        exit: 'Sair',
        'html-example': getHtmlExample('pt'),
        ...rewindI18n('pt'),
        ...forwardI18n('pt'),
      },
      yue: {
        name: '多媒體動作',
        'command.play': '播放',
        'help.play': '播放影片或音樂',
        'group.play': '控制影片或音樂',
        'command.pause': '暫停',
        'help.pause': '暫停播放',
        'group.pause': '控制影片或音樂',
        'command.stop': '停止',
        'help.stop': '停止播放',
        'group.stop': '控制影片或音樂',
        'command.mute': '靜音',
        'help.mute': '設為靜音',
        'group.mute': '控制音量',
        'command.volume-up': '增加音量',
        'help.volume-up': '增加音量',
        'group.volume-up': '控制音量',
        'command.volume-down': '降低音量',
        'help.volume-down': '降低音量',
        'group.volume-down': '音量控制',
        'command.fullscreen': '全屏幕',
        'help.fullscreen': '將影片設為全屏幕',
        'group.fullscreen': '全屏幕',
        'command.rewind': '向後移動',
        'help.rewind': '後退30秒',
        'group.rewind': '控制影片或音樂',
        'command.forward': '向前移動',
        'help.forward': '前進30秒',
        'group.forward': '控制影片或音樂',
        play: '播放',
        pause: '暫停',
        stop: '停止',
        mute: '靜音',
        'volume-up': '增加音量',
        'volume-down': '降低音量',
        rewind: 'Rewind',
        forward: 'Forward',
        fullscreen: '全屏幕',
        exit: '離開',
        'html-example': getHtmlExample('yue'),
        ...rewindI18n('yue'),
        ...forwardI18n('yue'),
      },
    },
  }],
  i18n: {
    en: {
      name: 'Media Options',
      description: 'After select a video or a sound player it allows you to perform several actions',
    },
    es: {
      name: 'Opciones de Multimedia',
      description: 'Luego de seleccionar un video o un reproductor de sonido habilita a realizar varias acciones',
    },
    pt: {
      name: 'Funções de multimídia',
      description: 'Após selecionar um vídeo ou um áudio, é possível executar várias ações.',
    },
    yue: {
      name: '多媒體選項',
      description: '選取影片或聲音播放器後，你可以進行不同動作',
    },
  },
};
