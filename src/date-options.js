import _ from 'lodash';
import { isDatePicker } from 'dom-element-types';
import moment from 'moment';
import { getNumber, getNumbersUntil } from './helpers/number-helpers';
import {
  optionsMap,
  setDay,
  setMonth,
  setYear,
  validateMonth,
  validateDay,
  validateYear,
} from './datetime-options';

const reviewCommandActions = {
  month: {
    condition: validateMonth,
    action: _.wrap(setMonth, setDate),
  },
  day: {
    condition: validateDay,
    action: _.wrap(setDay, setDate),
  },
  year: {
    condition: validateYear,
    action: _.wrap(setYear, setDate),
  },
};

const options = Object.keys(reviewCommandActions);

function setDate(setTime, state, number, selectedElement) {
  const newDate = setTime(state, number);
  selectedElement.setAttribute('value', newDate.format('YYYY-MM-DD'));
  const date = newDate.toDate();
  return {
    selectedDate: date,
  };
}

function reviewCommand({ contextState, commandName, selectedElement }) {
  const number = getNumber(commandName);
  const optionHandler = reviewCommandActions[contextState.selectedOption];
  if (Number.isInteger(number) && optionHandler.condition(contextState, number)) {
    const option = reviewCommandActions[contextState.selectedOption];
    const state = option.action(contextState, number, selectedElement);
    return {
      ...state,
      commandWasExecuted: true,
    };
  }
  return undefined;
}

function handleSwitchOnSelectElement(selectedElement) {
  return isDatePicker(selectedElement);
}

function getSelectedDate(selectedElement) {
  if (selectedElement.value) {
    return moment(selectedElement.value).toDate();
  }
  return new Date();
}

function setup({ selectedElement }) {
  const date = getSelectedDate(selectedElement);
  selectedElement.setAttribute('value', moment(date).format('YYYY-MM-DD'));
  return {
    options,
    selectedDate: date,
    selectedOption: 'month',
    expandedCommands: getNumbersUntil(31),
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-calendar',
  contexts: [{
    context: 'dateOptions',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    setup,
    htmlExample: 'i18n-html-example',
    commands: [
      ...optionsMap(options),
      {
        name: '*',
        help: 'i18n-help',
        action: reviewCommand,
      },
    ],
    i18n: {
      en: {
        name: 'Date Picker',
        help: 'Say the number of the selected label',
        'command.month': 'month',
        'command.day': 'day',
        'command.year': 'year',
        'help.month': 'Switches to month picker',
        'help.day': 'Switches to day picker',
        'help.year': 'Switches to year picker',
        'group.month': 'Switch tab',
        'group.day': 'Switch tab',
        'group.year': 'Switch tab',
        'html-example': 'Use the command "click" o "click date" over the following date input then you will be able to pick a date<br/><input type="date" />',
        day: 'day',
        month: 'month',
        year: 'year',
        'say-year-number': 'Say the year number',
        locale: 'en',
        format: 'dddd, MMMM Do YYYY',
      },
      es: {
        name: 'Seleccionar Fecha',
        help: 'Indica el número de la opción deseada',
        'command.month': 'mes',
        'command.day': 'día',
        'command.year': 'año',
        'help.month': 'Seleccionar mes',
        'help.day': 'Seleccionar día',
        'help.year': 'Seleccionar año',
        'group.month': 'Cambiar pestaña',
        'group.day': 'Cambiar pestaña',
        'group.year': 'Cambiar pestaña',
        'html-example': 'Usa el comando "click" o "click fecha" sobre el siguiente campo para luego poder seleccionar la fecha deseada<br/><input type="date" />',
        day: 'día',
        month: 'mes',
        year: 'año',
        'say-year-number': 'Indica el número de año',
        locale: 'es',
        format: 'dddd D [de] MMMM [del] YYYY',
      },
      pt: {
        name: 'Seletor de data',
        help: 'Diga o número do marcador desejado',
        'command.month': 'mês',
        'command.day': 'dia',
        'command.year': 'ano',
        'help.month': 'Alternar para o seletor de mês',
        'help.day': 'Alternar para o seletor de dia',
        'help.year': 'Alternar para o seletor de mês',
        'group.month': 'Alternar seletor',
        'group.day': 'Alternar seletor',
        'group.year': 'Alternar seletor',
        'html-example': 'Use o comando "clique" ou "selecionar data" sobre o seguinte campo de inserção, então será permitido escolher uma data determinada <br> <input type="date"/>',
        day: 'dia',
        month: 'mês',
        year: 'ano',
        'say-year-number': 'Diga o ano desejado',
        locale: 'pt',
        format: 'dddd, MMMM [e] AAAA', // review
      },
      yue: {
        name: 'Date Picker',
        help: 'Say the number of the selected label',
        'command.month': 'month',
        'command.day': 'day',
        'command.year': 'year',
        'help.month': 'Switches to month picker',
        'help.day': 'Switches to day picker',
        'help.year': 'Switches to year picker',
        'group.month': 'Switch tab',
        'group.day': 'Switch tab',
        'group.year': 'Switch tab',
        'html-example': 'Use the command "click" o "click date" over the following date input then you will be able to pick a date<br/><input type="date" />',
        day: 'day',
        month: 'month',
        year: 'year',
        'say-year-number': 'Say the year number',
        locale: 'en',
        format: 'dddd, MMMM Do YYYY', // don't translate in case of doubt
      },
    },
  }],
  i18n: {
    en: {
      name: 'Pick a date',
      description: 'After click over date input it allows you select a date',
    },
    es: {
      name: 'Seleccionar Fecha',
      description: 'Al hacer click sobre un campo de fecha permite seleccionar una fecha específica',
    },
    pt: {
      name: 'Escolha uma data',
      description: 'Depois de clicar sobre o seletor de data é possível selecionar uma data.',
    },
    yue: {
      name: 'Pick a date',
      description: 'After click over date input it allows you select a date',
    },
  },
};
