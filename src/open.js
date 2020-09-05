import openUrl from './helpers/open-url';

function open({ commandName }) {
  openUrl(`https://duckduckgo.com/?q=%5C${encodeURIComponent(commandName)}`);
  return {
    commandWasExecuted: true,
  };
}

function openInNewTab({ commandName }) {
  openUrl(`https://duckduckgo.com/?q=%5C${encodeURIComponent(commandName)}`, true);
  return {
    commandWasExecuted: true,
  };
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
    }, {
      name: 'i18n-command.open-in-new-tab',
      help: 'i18n-help.open-in-new-tab',
      action: () => {},
      switchToContext: 'open-in-new-tab',
      group: 'i18n-group.open',
    }],
    i18n: {
      en: {
        'command.open': 'open',
        'help.open': 'Open a website',
        'group.open': 'Open',
        'command.open-in-new-tab': 'open in new tab',
        'help.open-in-new-tab': 'Open a website in a new tab',
      },
      es: {
        'command.open': 'abrir',
        'help.open': 'Abrir un sitio web',
        'group.open': 'Abrir',
        'command.open-in-new-tab': 'abrir en nueva pestaña',
        'help.open-in-new-tab': 'Abrir un sitio web en nueva pestaña',
      },
      pt: {
        'command.open': 'abrir',
        'help.open': 'Abra um Site',
        'group.open': 'Abrir',
        'command.open-in-new-tab': 'abrir em nova guia',
        'help.open-in-new-tab': 'Abra um site em uma nova guia',
      },
      yue: {
        'command.open': '開啟',
        'help.open': '開啟網頁',
        'group.open': '開啟',
        'command.open-in-new-tab': '在新標籤中打開',
        'help.open-in-new-tab': '在新標籤頁中打開網站',
      },
    },
  }, {
    context: 'open',
    name: 'i18n-name',
    commands: [{
      name: '*',
      help: 'i18n-help.*',
      group: 'i18n-group',
      action: open,
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
  }, {
    context: 'open-in-new-tab',
    name: 'i18n-name',
    commands: [{
      name: '*',
      help: 'i18n-help.*',
      group: 'i18n-group',
      action: openInNewTab,
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
      description: '你可以使用這個模組開啟網頁',
    },
  },
};
