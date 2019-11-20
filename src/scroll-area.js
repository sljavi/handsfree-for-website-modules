export default {
  name: 'i18n-name',
  description: 'i18n-description',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.scroll-area',
      group: 'i18n-group.scroll-area',
      help: 'i18n-help.scroll-area',
      action: ({ tools }) => {
        const allElementsOnPage = Array.from(document.getElementsByTagName('*'));
        const scrollableElements = allElementsOnPage.filter((element) => {
          const computedStyle = getComputedStyle(element);
          const canScrollNow = element.scrollHeight > element.clientHeight
              && (computedStyle.overflowY === 'auto' || computedStyle.overflowY === 'scroll');
          return canScrollNow;
        });

        for (let i = 0; i < scrollableElements.length; i++) {
          const scrollableElement = scrollableElements[i];
          if (!scrollableElement.classList.contains('hands-free-scrollable')) {
            scrollableElement.className += ' hands-free-scrollable';
          }
        }

        if (scrollableElements.length === 0) {
          return {
            context: 'scroll-area',
            selectedElement: tools.jQuery('html', 'body'),
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
        'command.scroll-area': '',
        'group.scroll-area': '',
        'help.scroll-area': '',
      },
      pt: {
        'command.scroll-area': '',
        'group.scroll-area': '',
        'help.scroll-area': '',
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
        tools.scroll.up(tools.jQuery(selectedElement));
      },
      group: 'i18n-group.up',
      help: 'i18n-help.up',
    }, {
      name: 'i18n-command.down',
      action: ({ selectedElement, tools }) => {
        tools.scroll.down(tools.jQuery(selectedElement));
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
      pt: {
        name: '',
        'command.up': '',
        'group.up': '',
        'help.up': '',
        'command.down': '',
        'group.down': '',
        'help.down': '',
      },
      es: {
        name: '',
        'command.up': '',
        'group.up': '',
        'help.up': '',
        'command.down': '',
        'group.down': '',
        'help.down': '',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Scroll area',
      description: 'When multiple scroll areas are available, allows you to pick a particular area to scroll',
    },
    es: {
      name: '',
      description: '',
    },
    pt: {
      name: '',
      description: '',

    },
  },
};
