import { isRange } from 'dom-element-types';
import { getNumber, getNumbersUntil } from './helpers/number-helpers';

function reviewCommand({ contextState, commandName, selectedElement }) {
  const number = getNumber(commandName);
  if (Number.isInteger(number) && number >= contextState.min && number <= contextState.max) {
    selectedElement.setAttribute('value', number);
    return {
      commandWasExecuted: true,
      selectedNumber: number,
    };
  }
  return {};
}

function handleSwitchOnSelectElement(selectedElement) {
  return isRange(selectedElement);
}

function setup({ selectedElement }) {
  const max = +selectedElement.getAttribute('max') || 100;
  return {
    max,
    min: +selectedElement.getAttribute('min') || 0,
    selectedNumber: +selectedElement.value || 0,
    expandedCommands: getNumbersUntil(max),
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-sliders',
  contexts: [{
    context: 'rangeOptions',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    setup,
    htmlExample: 'i18n-html-example',
    commands: [{
      name: '*',
      help: 'i18n-help.*',
      action: reviewCommand,
    }],
    i18n: {
      en: {
        name: 'Range Selection',
        'help.*': 'Say the number of the selected value',
        'say-a-number-between': 'Say a number between ',
        and: 'and',
        'selected-value': 'Selected value',
        'html-example': 'Use the command "click" or "click range" over the following range input <p style="margin-top: 1em; margin-bottom: 0.2em;"><input type="range"/></p>',
      },
      es: {
        name: 'Seleccionar Rango',
        'help.*': 'Indicar el valor deseado dentro del rango',
        'say-a-number-between': 'Menciona un número entre',
        and: 'y',
        'selected-value': 'Valor seleccionado',
        'html-example': 'Usa el comando "click" o "click rango" sobre el siguiente campo de rango <p style="margin-top: 1em; margin-bottom: 0.2em;"><input type="range"/></p>',
      },
      pt: {
        name: 'Seleção de Alcance',
        'help.*': 'Diga o número do valor selecionado',
        'say-a-number-between': 'Diga um número entre',
        and: 'e',
        'selected-value': 'Valor selecionado',
        'html-example': 'Use o comando "click" ou "click alcance" na seguinte entrada de intervalo <p style="margin-top: 1em; margin-bottom: 0.2em;"><input type="range"/></p>',
      },
      yue: {
        name: '數值選項',
        'help.*': '讀出已選取的數值的總數',
        'say-a-number-between': '在這個範圍讀出一個數字，',
        and: '及',
        'selected-value': '已選取的數值',
        'html-example': '在範圍輸入欄位利用「點擊」或「點擊範圍」指令<p style="margin-top: 1em; margin-bottom: 0.2em;"><input type="range"/></p>',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Range Options',
      description: 'After select a link it allows you to set a value between the specified minimum and maximum.',
    },
    es: {
      name: 'Opciones de Rango',
      description: 'Luego de seleccionar un rango permite seleccionar un valor entre el mínimo y el máximo especificado.',
    },
    pt: {
      name: 'Opções de Alcance',
      description: 'Depois de selecionar um link, você pode definir um valor entre o mínimo e o máximo especificados.',
    },
    yue: {
      name: '數值選項',
      description: '選取連結後，你可以在特定範圍設定一個數值。',
    },
  },
};
