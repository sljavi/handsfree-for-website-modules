import { getVisibleElementsInViewPort } from 'dom-element-types';
import { getNumber, getNumbersUntil } from './helpers/number-helpers';

function pickPointedElement(number, contextState) {
  const element = getVisibleElementsInViewPort(contextState.labels)[number - 1];
  if (element) {
    return {
      ...contextState.selectedElementHandler(element, contextState),
      commandWasExecuted: true,
    };
  }
  return {};
}

function reviewCommand({ contextState, commandName }) {
  const number = getNumber(commandName);
  if (Number.isInteger(number)) {
    return pickPointedElement(number, contextState);
  }
  return {};
}

function teardown({ contextState }) {
  return contextState;
}

function setup({ contextState }) {
  return {
    ...contextState,
    expandedCommands: getNumbersUntil(getVisibleElementsInViewPort(contextState.labels).length),
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-tag',
  contexts: [{
    context: 'pickLabel',
    name: 'i18n-name',
    setup,
    teardown,
    htmlExample: 'i18n-html-example',
    commands: [{
      name: '*',
      help: 'i18n-help.*',
      group: 'i18n-group',
      action: reviewCommand,
    }],
    i18n: {
      en: {
        name: 'Element Picker',
        'help.*': 'Say the number of the selected label',
        group: 'Pick a number',
        'html-example': 'Use the command "click" over the following two buttons <p style="margin-top: 1em; margin-bottom: 0.2em;"><button>Button A</button> <button>Button B</button></p>',
        'label-options': 'Say the number of the selected label',
        exit: 'Exit',
      },
      es: {
        name: 'Seleccionar',
        'help.*': 'Indicar el nombre de la etiqueta seleccionada',
        group: 'Seleccionar un número',
        'html-example': 'Usa el comando "click" sobre los siguientes botones <p style="margin-top: 1em; margin-bottom: 0.2em;"><button>Botón A</button> <button>Botón B</button></p>',
        'label-options': 'Indicar el nombre de la etiqueta seleccionada',
        exit: 'Salir',
      },
      pt: {
        name: 'Selecionador de Elementos',
        'help.*': 'Diga o número do rótulo selecionado',
        group: 'Selecionar um número',
        'html-example': 'Use o comando "clique" nos dois botões a seguir',
        'label-options': 'Diga o número do rótulo selecionado',
        exit: 'Sair',
      },
      yue: {
        name: '選取元件',
        'help.*': '讀出選取元件的數字',
        group: '選擇一個數字',
        'html-example': '使用「點擊」指令點擊以下兩個按鈕 <p style="margin-top: 1em; margin-bottom: 0.2em;"><button>A按鈕</button> <button>B按鈕</button></p>',
        'label-options': '讀出選取元件的數字',
        exit: '離開',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Pick Label',
      description: 'This module is useful to pick the label of some element after use the commands "click" or "select" and there is more than one option to choose.',
    },
    es: {
      name: 'Seleccionar Etiqueta',
      description: 'Este módulo es útil para elegir un elemento luego de ejecutar los comandos "click" o "seleccionar" y existe más de un objeto para elegir.',
    },
    pt: {
      name: 'Selecionar rótulo',
      description: 'Este módulo é útil para escolher o rótulo de algum elemento depois de usar os comandos "clique" ou "selecionar" e há mais de uma opção para escolher.',
    },
    yue: {
      name: '選取標籤',
      description: '此模組的「點擊」或「選取」指令是用來選取某元件的標籤，而且有多於一項選項。',
    },
  },
};
