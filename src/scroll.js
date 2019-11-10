import $ from 'jquery';
import scroll from './helpers/scroll';

const LINE_HEIGHT = 14;

function getScrollContainer() {
  return $('html, body');
}

function getDistance() {
  return (window.innerHeight || document.documentElement.clientHeight) * 0.8;
}

function down() {
  scroll.down(getScrollContainer(), getDistance());
}

function up() {
  scroll.up(getScrollContainer(), getDistance());
}

function arrowDown() {
  scroll.down(getScrollContainer(), LINE_HEIGHT * 3);
}

function arrowUp() {
  scroll.up(getScrollContainer(), LINE_HEIGHT * 3);
}

function bottom() {
  scroll.bottom(getScrollContainer(), $(document).height());
}

function top() {
  scroll.top(getScrollContainer());
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-arrows',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.scroll-down',
      help: 'i18n-help.scroll-down',
      action: down,
      group: 'i18n-group.scroll',
    }, {
      name: 'i18n-command.scroll-up',
      help: 'i18n-help.scroll-up',
      action: up,
      group: 'i18n-group.scroll',
    }, {
      name: 'i18n-command.down',
      help: 'i18n-help.down',
      action: down,
      group: 'i18n-group.scroll',
    }, {
      name: 'i18n-command.up',
      help: 'i18n-help.up',
      action: up,
      group: 'i18n-group.scroll',
    }, {
      name: 'i18n-command.arrow-down',
      help: 'i18n-help.arrow-down',
      action: arrowDown,
      group: 'i18n-group.scroll',
    }, {
      name: 'i18n-command.arrow-up',
      help: 'i18n-help.arrow-up',
      action: arrowUp,
      group: 'i18n-group.scroll',
    }, {
      name: 'i18n-command.scroll-to-the-top',
      help: 'i18n-help.scroll-to-the-top',
      action: top,
      group: 'i18n-group.scroll',
    }, {
      name: 'i18n-command.scroll-to-the-bottom',
      help: 'i18n-help.scroll-to-the-bottom',
      action: bottom,
      group: 'i18n-group.scroll',
    }],
    i18n: {
      en: {
        'group.scroll': 'Scroll',
        'command.scroll-up': 'scroll up',
        'help.scroll-up': 'Performs a scroll up of the document',
        'command.scroll-down': 'scroll down',
        'help.scroll-down': 'Performs a scroll down of the document',
        'command.up': 'up',
        'help.up': 'Performs a scroll up of the document',
        'command.down': 'down',
        'help.down': 'Performs a scroll down of the document',
        'command.arrow-up': 'arrow up',
        'help.arrow-up': 'Performs a tiny scroll up',
        'command.arrow-down': 'arrow down',
        'help.arrow-down': 'Performs a tiny scroll down',
        'command.scroll-to-the-top': 'scroll to the top',
        'help.scroll-to-the-top': 'Performs a scroll up of the document until the beginning of it',
        'command.scroll-to-the-bottom': 'scroll to the bottom',
        'help.scroll-to-the-bottom': 'Performs a scroll down of the document until the end of it',
      },
      es: {
        'group.scroll': 'Desplazarse',
        'command.scroll-up': 'subir',
        'help.scroll-up': 'Desplazar el contenido hacia arriba',
        'command.scroll-down': 'bajar',
        'help.scroll-down': 'Desplazar el contenido hacia abajo',
        'command.up': 'desplazarse hacia arriba',
        'help.up': 'Desplazar el contenido hacia arriba',
        'command.down': 'desplazarse hacia abajo',
        'help.down': 'Desplazar el contenido hacia abajo',
        'command.arrow-up': 'subir una línea',
        'help.arrow-up': 'Desplazar el contenido hacia arriba una línea',
        'command.arrow-down': 'bajar una línea',
        'help.arrow-down': 'Desplazar el contenido hacia abajo una línea',
        'command.scroll-to-the-top': 'arriba',
        'help.scroll-to-the-top': 'Desplazar el contenido hasta el inicio',
        'command.scroll-to-the-bottom': 'abajo',
        'help.scroll-to-the-bottom': 'Desplazar el contenido hasta el final',
      },
      pt: {
        'group.scroll': 'Rolar',
        'command.scroll-up': 'rolar para cima ',
        'help.scroll-up': 'Executa uma rolagem para cima do documento',
        'command.scroll-down': 'rolar para baixo',
        'help.scroll-down': 'Executa uma rolagem para baixo do documento',
        'command.up': 'subir',
        'help.up': 'Executa uma rolagem para cima do documento',
        'command.down': 'descer',
        'help.down': 'Executa uma rolagem para baixo do documento',
        'command.arrow-up': 'seta para cima',
        'help.arrow-up': 'Executa uma pequena rolagem para cima',
        'command.arrow-down': 'seta para baixo',
        'help.arrow-down': 'Executa um pequeno deslocamento para baixo',
        'command.scroll-to-the-top': 'topo da página',
        'help.scroll-to-the-top': 'Executa uma rolagem para cima do documento até o começo dele',
        'command.scroll-to-the-bottom': 'final da página',
        'help.scroll-to-the-bottom': 'Executa uma rolagem para baixo do documento até o final dele',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Scroll the Page',
      description: 'Commands useful to scroll up and down the website.',
    },
    es: {
      name: 'Desplazarse en la Página',
      description: 'Comandos útiles para desplazarse hacia arriba y abajo dentro del sitio web.',
    },
    pt: {
      name: 'Rolar a página',
      description: 'Comandos úteis para rolar para cima e para baixo no site.',
    },
  },
};
