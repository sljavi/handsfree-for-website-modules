import $ from 'jquery';
import {
  getVisibleElementsInViewPort,
  isScrollable,
} from 'dom-element-types';
import scroll from './helpers/scroll';

function getDistance() {
  return (window.innerHeight || document.documentElement.clientHeight) * 0.8;
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-arrows',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.scroll-area',
      group: 'i18n-group.scroll-area',
      help: 'i18n-help.scroll-area',
      action: () => {
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
      },
    }],
    i18n: {
      en: {
        'command.scroll-area': 'scroll area',
        'group.scroll-area': 'scroll area',
        'help.scroll-area': 'scroll a particular area on a page',
      },
      es: {
        'command.scroll-area': 'desplazar área',
        'group.scroll-area': 'desplazar área',
        'help.scroll-area': 'desplazar un área de la página',
      },
      pt: {
        'command.scroll-area': 'Área de rolagem',
        'group.scroll-area': 'Área de rolagem',
        'help.scroll-area': 'Rolar uma área específica em uma página da web',
      },
    },
  }, {
    context: 'scroll-area',
    name: 'i18n-name',
    switchOnSelectElement: el => el.classList.contains('hands-free-scrollable'),
    setup: () => ({ showCommandList: true }),
    commands: [{
      name: 'i18n-command.up',
      action: ({ selectedElement, tools }) => {
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
      action: ({ selectedElement, tools }) => {
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
        'command.up': 'Acima',
        'group.up': 'Acima',
        'help.up': 'Rola um elemento selecionado para cima',
        'command.down': 'Baixo',
        'group.down': 'Direção da rolagem',
        'help.down': 'Rola um elemento selecionado para baixo',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Scroll area',
      description: 'When multiple scroll areas are available, allows you to pick a particular area to scroll',
    },
    es: {
      name: 'Desplazar área',
      description: 'Cuando múltiples áreas pueden desplazarse, permite seleccionar el área que se quiere desplazar',
    },
    pt: {
      name: 'Área de rolagem',
      description: 'Quando várias áreas de rolagem estão disponíveis, permite escolher uma área específica para rolagem',

    },
  },
};
