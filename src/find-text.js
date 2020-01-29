import _ from 'lodash';

let foundOne = false;

function find(text, previousIndex) {
  const found = window.find(text, false, previousIndex);
  if (found) {
    if (_.isElement(window.getSelection().anchorNode)) {
      find(text, previous);
    } else {
      foundOne = true;
    }
  } else if (foundOne) {
    window.getSelection().empty();
    find(text, previous);
  } else {
    window.getSelection().empty();
  }
}

function previous({ contextState }) {
  find(contextState.textToFind, true);
}

function next({ contextState }) {
  find(contextState.textToFind, false);
}

function setup() {
  foundOne = false;
  return {
    textToFind: '',
  };
}

function reviewCommand({ commandName, contextState }) {
  if (contextState.textToFind) {
    return {
      commandWasExecuted: false,
    };
  }
  find(commandName);
  return {
    commandWasExecuted: true,
    textToFind: commandName,
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-search',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.find-text',
      action: () => {},
      group: 'i18n-group.find-text',
      help: 'i18n-help.find-text',
      switchToContext: 'findText',
    }],
    i18n: {
      en: {
        'command.find-text': 'find text',
        'help.find-text': 'Displays text finder',
        'group.find-text': 'Search inside the page',
      },
      es: {
        'command.find-text': 'buscar texto',
        'help.find-text': 'Muestra un buscador',
        'group.find-text': 'Buscar dentro del sitio',
      },
      pt: {
        'command.find-text': 'encontrar palavras',
        'help.find-text': 'Exibe o localizador de texto',
        'group.find-text': 'Pesquisar dentro da página',
      },
      yue: {
        'command.find-text': '尋找文字',
        'help.find-text': '顯示文字搜尋器',
        'group.find-text': '在頁面內搜尋',
      },
    },
  }, {
    context: 'findText',
    name: 'i18n-name',
    setup,
    commands: [{
      name: 'i18n-command.previous',
      action: previous,
      group: 'i18n-group',
      help: 'i18n-help.previous',
    }, {
      name: 'i18n-command.next',
      action: next,
      group: 'i18n-group',
      help: 'i18n-help.next',
    }, {
      name: '*',
      help: 'i18n-help.*',
      group: 'i18n-group',
      action: reviewCommand,
    }],
    i18n: {
      en: {
        name: 'Text finder',
        'command.previous': 'previous',
        'help.previous': 'Find previous',
        'command.next': 'next',
        'help.next': 'Find next',
        'help.*': 'Say the words you want to search',
        group: 'Search inside the page',
        'search-params': 'Say the words you want to search',
        previous: 'Previous',
        next: 'Next',
        exit: 'Exit',
      },
      es: {
        name: 'Buscador de texto',
        group: 'Buscar dentro del sitio',
        'command.previous': 'anterior',
        'help.previous': 'Buscar anterior',
        'help.*': 'Indica el nombre de lo que desees buscar',
        'search-params': 'Indica el nombre de lo que desees buscar',
        'command.next': 'siguiente',
        'help.next': 'Buscar siguiente',
        previous: 'Anterior',
        next: 'Siguiente',
        exit: 'Salir',
      },
      pt: {
        name: 'Localizador de palavras',
        'command.previous': 'anterior',
        'help.previous': 'Localizar palavra anterior',
        'command.next': 'próximo',
        'help.next': 'Localizar próximo texto',
        'help.*': 'Diga as palavras que deseja pesquisar',
        group: 'Pesquisa dentro da página',
        'search-params': 'Diga as palavras que deseja pesquisar',
        previous: 'Anterior',
        next: 'Próximo',
        exit: 'Sair',
      },
      yue: {
        name: '文字搜尋器',
        'command.previous': '前一個',
        'help.previous': '尋找前一個',
        'command.next': '下一個',
        'help.next': '尋找下一個',
        'help.*': '讀出想搜尋的字詞',
        group: '在這頁面搜尋',
        'search-params': '讀出想搜尋的字詞',
        previous: '前一個',
        next: '下一個',
        exit: '離開',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Search text',
      description: 'Search text in the current page',
    },
    es: {
      name: 'Buscar texto',
      description: 'Buscador de texto en la página actual',
    },
    pt: {
      name: 'Pesquisar Texto',
      description: 'Pesquisa palavras na página atual',
    },
    yue: {
      name: '搜尋文字',
      description: '喺呢頁搜尋文字',
    },
  },
};
