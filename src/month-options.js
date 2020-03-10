import _ from 'lodash';
import { isMonthPicker } from 'dom-element-types';
import moment from 'moment';
import { getNumber, getNumbersUntil } from './helpers/number-helpers';
import {
  optionsMap,
  setMonth,
  setYear,
  validateMonth,
  validateYear,
} from './datetime-options';

const reviewCommandActions = {
  month: {
    condition: validateMonth,
    action: _.wrap(setMonth, setDate),
  },
  year: {
    condition: validateYear,
    action: _.wrap(setYear, setDate),
  },
};

const options = Object.keys(reviewCommandActions);

function setDate(setTime, state, number, selectedElement) {
  const newDate = setTime(state, number);
  selectedElement.setAttribute('value', newDate.format('YYYY-MM'));
  const date = newDate.toDate();
  return {
    selectedDate: date,
  };
}

function reviewCommand({ contextState, commandName, selectedElement }) {
  const number = getNumber(commandName);
  const optionHandler = reviewCommandActions[contextState.selectedOption];
  if (Number.isInteger(number) && optionHandler.condition(contextState, number)) {
    const selectedAction = reviewCommandActions[contextState.selectedOption];
    return {
      ...selectedAction.action(contextState, number, selectedElement),
      commandWasExecuted: true,
    };
  }
  return {};
}

function handleSwitchOnSelectElement(selectedElement) {
  return isMonthPicker(selectedElement);
}

function getSelectedDate(selectedElement) {
  if (selectedElement.value) {
    return moment(selectedElement.value).toDate();
  }
  return new Date();
}

function setup({ selectedElement }) {
  const date = getSelectedDate(selectedElement);
  selectedElement.setAttribute('value', moment(date).format('YYYY-MM'));
  return {
    options,
    selectedDate: date,
    selectedOption: 'month',
    expandedCommands: getNumbersUntil(12),
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-calendar',
  contexts: [{
    context: 'monthOptions',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    setup,
    htmlExample: 'i18n-html-example',
    commands: [
      ...optionsMap(options),
      {
        name: '*',
        help: 'i18n-help.*',
        action: reviewCommand,
      },
    ],
    i18n: {
      en: {
        name: 'Month Picker',
        'help.*': 'Say the number of the selected label',
        'command.month': 'month',
        'command.year': 'year',
        'help.month': 'Switches to month picker',
        'help.year': 'Switches to year picker',
        'group.month': 'Switch tab',
        'group.year': 'Switch tab',
        'html-example': 'Use the command "click" or "click date" over the following date input then you will be able to pick a month of a given year<br/><input type="month" />',
        month: 'month',
        year: 'year',
        'say-year-number': 'Say the year number',
        locale: 'en',
        format: 'MMMM YYYY',
      },
      es: {
        name: 'Seleccionar mes',
        'help.*': 'Seleccionar número de la opción seleccionada',
        'command.month': 'mes',
        'command.year': 'año',
        'help.month': 'Seleccionar mes',
        'help.year': 'Seleccionar año',
        'group.month': 'Cambiar pestaña',
        'group.year': 'Cambiar pestaña',
        'html-example': 'Usa el comando "click" o "click fecha" sobre el siguiente campo para luego poder seleccionar un mes de un determinado año<br/><input type="month" />',
        month: 'mes',
        year: 'año',
        'say-year-number': 'Indica el número de año',
        locale: 'es',
        format: 'MMMM [del] YYYY',
      },
      pt: {
        name: 'Selecionador de Mês',
        'help.*': 'Diga o número do espaço desejado',
        'command.month': 'mês',
        'command.year': 'ano',
        'help.month': 'Alterna para o Seletor de Mês',
        'help.year': 'Alterna para o Seletor de Ano',
        'group.month': 'Mudar de Guia',
        'group.year': 'Mudar de Guia',
        'html-example': 'Use o comando "clique" ou "selecionar data" sobre o campo de inserção de data, então será possível escolher um determinado mês <br/><input type="month" />',
        month: 'Mês',
        year: 'Ano',
        'say-year-number': 'Diga o ano',
        locale: 'pt',
        format: 'MMMM [e] YYYY',
      },
      yue: {
        name: '選取月份',
        'help.*': '讀出選取標籤的數字',
        'command.month': '月份',
        'command.year': '年份',
        'help.month': '轉換至月份選取器',
        'help.year': '轉換至年份選取器',
        'group.month': '轉換分頁',
        'group.year': '轉換分頁',
        'html-example': '在以下日期輸入欄位使用「點擊」或「點擊日期」，你可以選取某年的一個月份<br/><input type="month" />',
        month: '月份',
        year: '年份',
        'say-year-number': '讀出年份',
        locale: 'en',
        format: 'YYYY [年] MMMM [月]',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Pick a month',
      description: 'After click over a date input it allows you to select a month of an year',
    },
    es: {
      name: 'Seleccionar Mes',
      description: 'Al hacer click sobre un campo de fecha permite seleccionar un mes de un determinado año',
    },
    pt: {
      name: 'Selecione um Mês',
      description: 'Após clicar no campo de inserção de data, será possível escolher o um mês determinado',
    },
    yue: {
      name: '選取月份',
      description: '點擊輸入日期的欄位後，你可以選擇月份。',
    },
  },
};
