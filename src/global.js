export function exit({ contextState }) {
  return {
    commandWasExecuted: true,
    showHelp: false,
    showHelpBar: false,
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-globe',
  contexts: [{
    context: 'global',
    commands: [{
      name: 'i18n-command.exit',
      help: 'i18n-help.exit',
      group: 'i18n-group.exit',
      action: exit,
      switchToContext: 'root',
    }],
    i18n: {
      en: {
        'command-not-available': 'is a command not available',
        'command-not-available-help': 'Say "Help" to see all the commands',
        'command.exit': 'exit',
        'help.exit': 'Leaves the command session',
        'group.exit': 'Leave the current operation',
        'allowed-commands': 'Allowed Commands',
      },
      es: {
        'command-not-available': 'es un comando no disponible',
        'command-not-available-help': 'Menciona "Ayuda" para ver todos los comandos',
        'command.exit': 'salir',
        'help.exit': 'Salir de la sesión actual',
        'group.exit': 'Salir',
        'allowed-commands': 'Comandos Habilitados',
      },
      pt: {
        'command-not-available': 'é um comando não válido',
        'command-not-available-help': 'Diga "Ajuda" para ver todos os comandos',
        'command.exit': 'sair',
        'help.exit': 'Deixa a sessão de comando',
        'group.exit': 'Deixe a operação atual',
        'allowed-commands': 'Comandos Permitidos',
      },
      zh: {
        'command-not-available': '命令不可用',
        'command-not-available-help': '命令不可用',
        'command.exit': '出口',
        'help.exit': '离开命令会话',
        'group.exit': '退出当前操作',
        'allowed-commands': '允许的命令',
      },
    },
  }, {
    context: 'root',
    name: 'i18n-name',
    commands: [],
    i18n: {
      en: {
        name: 'root',
      },
      es: {
        name: 'principal',
      },
      pt: {
        name: 'origem',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Global Context',
      description: 'This especial module provides only global commands and translations',
    },
    es: {
      name: 'Contexto General',
      description: 'Este módulo especial provee exclusivamente traducciones y comandos generales para todos los contextos',
    },
    pt: {
      name: 'Contexto Global',
      description: 'Este módulo especial fornece apenas comandos e traduções globais',
    },
    zh: {
      name: '全球背景',
      description: '该特殊模块仅提供全局命令和翻译',
    },
  },
};
