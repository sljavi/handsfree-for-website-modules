import openUrl from './helpers/open-url';
import { searchSomething } from './search';

function reviewCommand({ commandName }) {
  if (commandName.includes('.')) {
    openUrl(`http://${commandName.replace(/ /g, '')}`);
    return {
      commandWasExecuted: true,
    };
  }
  return searchSomething({ commandName });
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-external-link',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.open',
      help: 'i18n-help.open',
      action: () => {},
      switchToContext: 'open',
      group: 'i18n-group.open',
    }],
    i18n: {
      en: {
        'command.open': 'open',
        'help.open': 'Open a website',
        'group.open': 'Open',
      },
      es: {
        'command.open': 'abrir',
        'help.open': 'Abrir un sitio web',
        'group.open': 'Abrir',
      },
      pt: {
        'command.open': 'abrir',
        'help.open': 'Abra um Site',
        'group.open': 'Abrir',
      },
      yue: {
        'command.open': '開啟',
        'help.open': '開啟網頁',
        'group.open': '開啟',
      },
    },
  }, {
    context: 'open',
    name: 'i18n-name',
    commands: [{
      name: '*',
      help: 'i18n-help.*',
      group: 'i18n-group',
      action: reviewCommand,
      switchToContext: 'root',
    }],
    i18n: {
      en: {
        name: 'Open',
        'help.*': 'Say the name of the site you want to open',
        group: 'Open',
        'open-params': 'Say the name of the site you want to open',
        exit: 'Exit',
      },
      es: {
        name: 'Abrir',
        'help.*': 'Solicita la dirección a cargar',
        group: 'Abrir',
        'open-params': 'Indica el nombre del sitio que quieres abrir',
        exit: 'Salir',
      },
      pt: {
        name: 'Abrir',
        'help.*': 'Diga o nome do site que você deseja abrir',
        group: 'Abrir',
        'open-params': 'Diga o nome do site que você deseja abrir',
        exit: 'Sair',
      },
      yue: {
        name: '開啟',
        'help.*': '讀出你想開啟的網站名稱',
        group: '開啟',
        'open-params': '讀出你想開啟的網站名稱',
        exit: '離開',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Open a website',
      description: 'This module allows you to open websites.',
    },
    es: {
      name: 'Abrir un sitio web',
      description: 'Este módulo permite acceder a un sitio web.',
    },
    pt: {
      name: 'Abrir um Site',
      description: 'Este módulo permite que você abra sites.',
    },
    yue: {
      name: '開啟網頁',
      description: '你可以使用這個模組開啟網頁。',
    },
  },
};
