import { isTextInput } from 'dom-element-types';
import { getNumber, getNumbersUntil } from './helpers/number-helpers';
import { exit } from './introduce-text-common';
import introduceTextFreeSpeak, { introduceText } from './introduce-text-free-speak';
import { pressKeyboardKey } from './introduce-text-keyboard';

const i18n = {
  en: {
    use: 'Use the command "click" or "click text" over one of the following field texts then you will be able to introduce some text',
    singleLine: 'Single Line Text',
    multiLine: 'Multiline Text',
  },
  es: {
    use: 'Usar el comando "click" o "click texto" sobre uno de los siguientes campos de texto, luego podrás escribir en él',
    singleLine: 'Campo de Texto',
    multiLine: 'Campo de Texto Multilinea',
  },
  pt: {
    use: 'Use o comando "selecionar texto" ou "clique em texto" sobre um dos seguintes textos de campo, então é possível introduzir algum texto',
    singleLine: 'Texto monolinha',
    multiLine: 'Texto multilinhas',
  },
  yue: {
    use: '在以下文字欄位使用「點擊」或「點擊文字」指令，便可加入文字。',
    singleLine: '單行文字',
    multiLine: '多行文字',
  },
};

function getHtmlExample(lang) {
  return `
    <p>${i18n[lang].use}</p>
    <h4>${i18n[lang].singleLine}</h4>
    <p class="box">
      <input type="text" />
    </p>
    <h4>${i18n[lang].multiLine}</h4>
    <p class="box">
      <textarea></textarea>
    </p>`;
}

const openKeyboardCommandMap = [
  hideKeyboard,
  ...(introduceTextFreeSpeak.commands.map(cmd => cmd.action)),
  exit,
];

const closeKeyboardCommandMap = [
  displayKeyboard,
  ...(introduceTextFreeSpeak.commands.map(cmd => cmd.action)),
  exit,
];

function reviewCommand(params) {
  const {
    contextState, commandName, rootElement, selectedElement,
  } = params;
  const chars = commandName.split('');
  if (contextState.displayKeyboard && chars.length === 2 && chars[0] === '0' && getNumber(chars[1])) {
    return {
      ...openKeyboardCommandMap[getNumber(chars[1]) - 1](params),
      commandWasExecuted: true,
    };
  } if (!contextState.displayKeyboard && chars.length === 1 && getNumber(chars[0])) {
    return {
      ...closeKeyboardCommandMap[getNumber(chars[0]) - 1](params),
      commandWasExecuted: true,
    };
  }
  const number = getNumber(commandName);
  if (Number.isInteger(number) && contextState.displayKeyboard) {
    return pressKeyboardKey(contextState, number, rootElement, selectedElement);
  }
  return {
    ...introduceText(contextState, commandName, selectedElement),
    commandWasExecuted: true,
  };
}


function displayKeyboard() {
  return {
    displayKeyboard: true,
  };
}

function hideKeyboard() {
  return {
    displayKeyboard: false,
  };
}

function handleSwitchOnSelectElement(selectedElement) {
  return isTextInput(selectedElement);
}

function setup() {
  return {
    keyboard: 'general',
    displayKeyboard: false,
    textHistory: [],
    textHistoryPointer: -1,
    expandedCommands: getNumbersUntil(200),
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-keyboard-o',
  contexts: [{
    context: 'introduceText',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    setup,
    htmlExample: 'i18n-html-example',
    commands: [{
      name: '*',
      help: 'i18n-help.*',
      action: reviewCommand,
    }, {
      name: 'i18n-command.exit',
      help: 'i18n-help.exit',
      action: exit,
      group: 'i18n-group.exit',
      switchToContext: 'root',
    }, {
      name: 'i18n-command.display-keyboard',
      help: 'i18n-help.display-keyboard',
      action: displayKeyboard,
      group: 'i18n-group.display-keyboard',
    }, {
      name: 'i18n-command.hide-keyboard',
      help: 'i18n-help.hide-keyboard',
      action: hideKeyboard,
      group: 'i18n-group.hide-keyboard',
    },
    ...introduceTextFreeSpeak.commands,
    ],
    i18n: {
      en: {
        name: 'Introduce Text',
        'help.*': 'Introduces text into the selected text element',
        'command.exit': 'exit',
        'help.exit': 'Leaves the introduce text session',
        'group.exit': 'Leave session',
        'command.display-keyboard': 'keyboard',
        'help.display-keyboard': 'Shows a virtual keyboard',
        'group.display-keyboard': 'Keyboard',
        'command.hide-keyboard': 'hide keyboard',
        'help.hide-keyboard': 'Close the virtual keyboard',
        'group.hide-keyboard': 'Keyboard',
        'dictate-text': 'Dictate free text',
        submit: 'Submit',
        exit: 'Exit',
        'html-example': getHtmlExample('en'),
        '↤ bksp': '↤ bksp',
        'tab ↦': 'tab ↦',
        '↵ enter': '↵ enter',
        '⇧ shift': '⇧ shift',
        accept: 'accept',
        space: 'space',
        locale: 'en',
        keyboard: 'Keyboard',
        'hide-keyboard': 'Hide keyboard',
        remove: 'Remove',
        'remove-line': 'Remove line',
        'clean-up': 'Clean up',
        paste: 'Paste',
        redo: 'Redo',
        undo: 'Undo',
        ...introduceTextFreeSpeak.i18n.en,
      },
      es: {
        name: 'Ingresar texto',
        'help.*': 'Ingresar texto en el campo de texto seleccionado',
        'command.exit': 'salir',
        'help.exit': 'Salir de la sesión de introducción de texto',
        'group.exit': 'Salir de la sesión',
        'command.display-keyboard': 'teclado',
        'help.display-keyboard': 'Muestra un teclado virtual',
        'group.display-keyboard': 'Teclado',
        'command.hide-keyboard': 'ocultar teclado',
        'help.hide-keyboard': 'Cierra el teclado virtual',
        'group.hide-keyboard': 'Teclado',
        'dictate-text': 'Dictar texto libre',
        submit: 'Enviar',
        exit: 'Salir',
        'html-example': getHtmlExample('es'),
        '↤ bksp': '↤ bksp',
        'tab ↦': 'tab ↦',
        '↵ enter': '↵ enter',
        '⇧ shift': '⇧ shift',
        accept: 'aceptar',
        space: 'spacio',
        locale: 'es',
        keyboard: 'Teclado',
        'hide-keyboard': 'Ocultar teclado',
        remove: 'Borrar',
        'remove-line': 'Borrar linea',
        'clean-up': 'Borrar todo',
        paste: 'Pegar',
        redo: 'Deshacer',
        undo: 'Rehacer',
        ...introduceTextFreeSpeak.i18n.es,
      },
      pt: {
        name: 'Introduzir Texto',
        'help.*': 'Introduzir um texto no elemento selecionado',
        'command.exit': 'sair',
        'help.exit': 'Sai do modo de introdução de texto',
        'group.exit': 'Sair do modo',
        'command.display-keyboard': 'teclado',
        'help.display-keyboard': 'Mostra o teclado virtual',
        'group.display-keyboard': 'Teclado',
        'command.hide-keyboard': 'fechar teclado',
        'help.hide-keyboard': 'Fecha o teclado virtual',
        'group.hide-keyboard': 'Teclado',
        'dictate-text': 'Ditar texto',
        submit: 'Enviar',
        exit: 'Sair',
        '↤ bksp': '↤ bksp',
        'tab ↦': 'tab ↦',
        '↵ enter': '↵ enter',
        '⇧ shift': '⇧ shift',
        accept: 'aceitar',
        space: 'espaço',
        locale: 'pt',
        keyboard: 'Teclado',
        'hide-keyboard': 'Fechar teclado',
        remove: 'Remover',
        'remove-line': 'Remove a última linha',
        'clean-up': 'Limpar',
        paste: 'Colar',
        redo: 'Refazer',
        undo: 'Desfazer',
        'html-example': getHtmlExample('pt'),
        ...introduceTextFreeSpeak.i18n.pt,
      },
      yue: {
        name: '加入文字',
        'help.*': '在選取的文字欄位加入文字。',
        'command.exit': '離開',
        'help.exit': '離開加入文字的工作階段',
        'group.exit': '離開工作階段',
        'command.display-keyboard': '鍵盤',
        'help.display-keyboard': '顯示虛擬鍵盤',
        'group.display-keyboard': '鍵盤',
        'command.hide-keyboard': '隱藏鍵盤',
        'help.hide-keyboard': '關閉虛擬鍵盤',
        'group.hide-keyboard': '鍵盤',
        'dictate-text': '讀出文字',
        submit: '遞交',
        exit: '離開',
        'html-example': getHtmlExample('yue'),
        '↤ bksp': '↤ bksp',
        'tab ↦': 'tab ↦',
        '↵ enter': '↵ enter',
        '⇧ shift': '⇧ shift',
        accept: '接受',
        space: '空白鍵',
        locale: 'en',
        keyboard: '鍵盤',
        'hide-keyboard': '隱藏鍵盤',
        remove: '移除',
        'remove-line': '移除一行',
        'clean-up': '清除',
        paste: '貼上',
        redo: '重做',
        undo: '復原',
        ...introduceTextFreeSpeak.i18n.yue,
      },
    },
  }],
  i18n: {
    en: {
      name: 'Introduce Text',
      description: 'After click over a text field it allows you to introduce text',
    },
    es: {
      name: 'Introducir Texto',
      description: 'Luego de hacer click sobre un campo de texto te permite escribir en el',
    },
    pt: {
      name: 'Introduzir Texto',
      description: 'Após clicar sobre o campo de texto será possível introduzir um texto',
    },
    yue: {
      name: '加入文字',
      description: '點擊文字欄位後，可以加入文字。',
    },
  },
};
