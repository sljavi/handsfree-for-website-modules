import $ from 'jquery';
import {
  getVisibleElementsInViewPort,
  isScrollable,
} from 'dom-element-types';
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

function scrollArea() {
  const allElementsOnPage = getVisibleElementsInViewPort('*');
  const scrollableElements = allElementsOnPage.filter(element => isScrollable(element));

  scrollableElements.forEach((scrollableElement) => {
    scrollableElement.classList.add('hands-free-scrollable');
  });

  if (scrollableElements.length === 0) {
    return {
      context: 'scroll-area',
      selectedElement: document.body,
    };
  }

  if (scrollableElements.length === 1) {
    return {
      context: 'scroll-area',
      selectedElement: scrollableElements[0],
    };
  }

  return {
    context: 'pickLabel',
    labels: '.hands-free-scrollable',
    selectedElementHandler: el => ({
      selectedElement: el,
    }),
  };
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
    }, {
      name: 'i18n-command.scroll-area',
      help: 'i18n-help.scroll-area',
      action: scrollArea,
      group: 'i18n-group.scroll-area',
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
        'command.scroll-area': 'Scroll area',
        'help.scroll-area': 'When multiple scroll areas are available, allows you to pick a particular area to scroll',
        'group.scroll-area': 'Scroll area',
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
        'command.scroll-area': 'Desplazar área',
        'help.scroll-area': 'Cuando múltiples áreas pueden desplazarse, permite seleccionar el área que se quiere desplazar',
        'group.scroll-area': 'Desplazar área',
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
        'command.scroll-area': 'Rolar área',
        'help.scroll-area': 'Quando houver diversas áreas de rolagem disponíveis, é possível selecionar uma área específica para rolar',
        'group.scroll-area': 'Rolar área',
      },
    },
  }, {
    context: 'scroll-area',
    name: 'i18n-name',
    switchOnSelectElement: el => el.classList.contains('hands-free-scrollable'),
    setup: () => ({ showCommandList: true }),
    commands: [{
      name: 'i18n-command.up',
      action: ({ selectedElement }) => {
        if ($(selectedElement).is('body')) {
          scroll.up($('html'), getDistance());
        } else {
          scroll.up($(selectedElement));
        }
      },
      group: 'i18n-group.up',
      help: 'i18n-help.up',
    }, {
      name: 'i18n-command.down',
      action: ({ selectedElement }) => {
        if ($(selectedElement).is('body')) {
          scroll.down($('html'), getDistance());
        } else {
          scroll.down($(selectedElement));
        }
      },
      group: 'i18n-group.down',
      help: 'i18n-help.down',
    }],
    i18n: {
      en: {
        name: 'Scroll Area',
        'command.up': 'Up',
        'group.up': 'Scroll Direction',
        'help.up': 'Scrolls a selected element up',
        'command.down': 'Down',
        'group.down': 'Scroll Direction',
        'help.down': 'Scrolls a selected element down',
      },
      es: {
        name: 'Desplazar área',
        'command.up': 'arriba',
        'group.up': 'Dirección de desplazamiento',
        'help.up': 'Desplaza hacia arriba el elemento seleccionado',
        'command.down': 'abajo',
        'group.down': 'Dirección de desplazamiento',
        'help.down': 'Desplaza hacia abajo el elemento seleccionado',
      },
      pt: {
        name: 'Área de rolagem',
        'command.up': 'Cima',
        'group.up': 'Sentido da rolagem',
        'help.up': 'Rolar para cima o elemento selecionado',
        'command.down': 'Baixo',
        'group.down': 'Sentido da rolagem',
        'help.down': 'Rolar para baixo o elemento selecionado',
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
