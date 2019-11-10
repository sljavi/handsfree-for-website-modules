function goForward() {
  window.history.forward();
}

function goBack() {
  window.history.back();
}

function reload() {
  window.location.reload();
}

function stop() {
  window.stop();
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-history',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.go-back',
      help: 'i18n-help.go-back',
      action: goBack,
      group: 'i18n-group',
    }, {
      name: 'i18n-command.go-forward',
      help: 'i18n-help.go-forward',
      action: goForward,
      group: 'i18n-group',
    }, {
      name: 'i18n-command.reload',
      help: 'i18n-help.reload',
      action: reload,
      group: 'i18n-group',
    }, {
      name: 'i18n-command.stop',
      help: 'i18n-help.stop',
      action: stop,
      group: 'i18n-group',
    }],
    i18n: {
      en: {
        group: 'Navigation',
        'command.go-back': 'go back',
        'help.go-back': 'Goes back in the browser history',
        'command.go-forward': 'go forward',
        'help.go-forward': 'Goes forward in the browser history',
        'command.reload': 'reload',
        'help.reload': 'Reloads the current page',
        'command.stop': 'stop',
        'help.stop': 'Stops the loading of the current page',
      },
      es: {
        group: 'Navegación',
        'command.go-back': 'atrás',
        'help.go-back': 'Ir al sitio anterior',
        'command.go-forward': 'adelante',
        'help.go-forward': 'Ir al sitio siguiente',
        'command.reload': 'actualizar',
        'help.reload': 'Recargar el sitio',
        'command.stop': 'parar',
        'help.stop': 'Detener la carga del sitio',
      },
      pt: {
        group: 'Navegação',
        'command.go-back': 'voltar',
        'help.go-back': 'Volta no Histórico do Navegador',
        'command.go-forward': 'vá em frente',
        'help.go-forward': 'Avança no Histórico do Navegador',
        'command.reload': 'recarregar',
        'help.reload': 'Recarregar a Página Atual',
        'command.stop': 'parar',
        'help.stop': 'Pára o carregamento da página atual',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Navigation',
      description: 'This module provides several commands to control the navigation. Such as: go back, go forward, reload and stop the web page loading.',
    },
    es: {
      name: 'Navegación',
      description: 'Este módulo provee varios comandos para controlar la navegación, por ejemplo, ir atrás, ir adelante, parar o actualizar la carga del sitio web',
    },
    pt: {
      name: 'Navegação',
      description: 'Este módulo fornece vários comandos para controlar a navegação. Tais como: voltar, avançar, recarregar e parar a página webge loading.',
    },
  },
};
