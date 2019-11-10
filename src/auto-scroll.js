let scrolling;
let speed = 2;

function pageScroll() {
  window.scrollBy({
    top: speed,
    left: 0,
    behavior: 'smooth',
  });
  scrolling = setTimeout(pageScroll, 20);
}

function setup() {
  pageScroll();
  return { speed };
}

function stop() {
  clearTimeout(scrolling);
}

function faster() {
  if (speed <= 50) {
    speed += 1;
  }
  return { speed };
}

function slower() {
  if (speed >= 2) {
    speed -= 1;
  }
  return { speed };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-arrow-down',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.auto-scroll',
      action: () => {},
      group: 'i18n-group.auto-scroll',
      help: 'i18n-help.auto-scroll',
      switchToContext: 'autoScroll',
    }],
    i18n: {
      en: {
        'command.auto-scroll': 'auto scroll',
        'help.auto-scroll': 'Automatic scroll down',
        'group.auto-scroll': 'Scroll',
      },
      es: {
        'command.auto-scroll': 'bajar automáticamente',
        'help.auto-scroll': 'Desplaza hacia abajo automáticamente',
        'group.auto-scroll': 'Desplazarse hacia abajo',
      },
      pt: {
        'command.auto-scroll': 'rolagem automática',
        'help.auto-scroll': 'Rolagem Contínua',
        'group.auto-scroll': 'Rolar',
      },
    },
  }, {
    context: 'autoScroll',
    name: 'i18n-name',
    setup,
    commands: [{
      name: 'i18n-command.stop',
      action: stop,
      help: 'i18n-help.stop',
      group: 'i18n-group.stop',
      switchToContext: 'root',
    }, {
      name: 'i18n-command.faster',
      help: 'i18n-help.faster',
      action: faster,
      group: 'i18n-group.faster',
    }, {
      name: 'i18n-command.slower',
      action: slower,
      help: 'i18n-help.slower',
      group: 'i18n-group.slower',
    }],
    i18n: {
      en: {
        name: 'Auto Scrolling',
        'command.stop': 'stop',
        'help.stop': 'Stop scrolling',
        'group.stop': 'Control scrolling',
        'command.faster': 'faster',
        'help.faster': 'Increase scrolling speed',
        'group.faster': 'Control scrolling',
        'command.slower': 'slower',
        'help.slower': 'Decrease scrolling speed',
        'group.slower': 'Control scrolling',
        stop: 'Stop',
        faster: 'Faster',
        slower: 'Slower',
        speed: 'Speed',
      },
      es: {
        name: 'Desplazamiento Automático',
        'command.stop': 'detener',
        'help.stop': 'Detiene el desplazamiento',
        'group.stop': 'Controlar el desplazamiento',
        'command.faster': 'más rápido',
        'help.faster': 'Acelerar desplazamiento',
        'group.faster': 'Controlar el desplazamiento',
        'command.slower': 'más lento',
        'help.slower': 'Desacelerar el desplazamiento',
        'group.slower': 'Controlar el desplazamiento',
        stop: 'Detener',
        faster: 'Más Rápido',
        slower: 'Más Lento',
        speed: 'Velocidad',
      },
      pt: {
        name: 'Rolagem Automática',
        'command.stop': 'parar',
        'help.stop': 'Parar Rolagem',
        'group.stop': 'Controle de Rolagem',
        'command.faster': 'aumentar velocidade',
        'help.faster': 'Aumentar Velocidade de Rolagem',
        'group.faster': 'Controle de Rolagem',
        'command.slower': 'diminuir velocidade',
        'help.slower': 'Diminuir Velocidade de Rolagem',
        'group.slower': 'Controle de Rolagem',
        stop: 'Parar',
        faster: 'Aumentar Velocidade',
        slower: 'Diminuir Velocidade',
        speed: 'Velocidade',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Auto Scrolling',
      description: 'Useful to start a continue scroll down',
    },
    es: {
      name: 'Desplazarse Automáticamente',
      description: 'Comandos útiles para desplazarse hacia abajo automáticamente',
    },
    pt: {
      name: 'Rolagem Automática',
      description: 'Usado para iniciar uma Rolagem Contínua',
    },
  },
};
