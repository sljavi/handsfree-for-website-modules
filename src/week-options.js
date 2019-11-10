import wrap from 'lodash/wrap';
import { isWeekPicker } from 'dom-element-types';
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
    action: wrap(setMonth, setDate),
  },
  year: {
    condition: validateYear,
    action: wrap(setYear, setDate),
  },
  week: {
    condition: validateWeek,
    action: wrap(setWeek, setDate),
  },
};

const options = Object.keys(reviewCommandActions);

function setDate(setTime, state, number, selectedElement) {
  const newDate = setTime(state, number);
  selectedElement.setAttribute('value', newDate.format('YYYY-[W]ww'));
  const date = newDate.toDate();
  return {
    selectedDate: date,
  };
}

function validateWeek(state, number, selectedElement) {
  const firstDateInMonth = moment(state.selectedDate).date(1);
  const lastDateInMonth = moment(state.selectedDate).add('months', 1).date(0);
  return number >= firstDateInMonth.week() && number <= lastDateInMonth.week();
}

function setWeek(state, number, selectedElement) {
  return moment(state.selectedDate).week(number);
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
  return isWeekPicker(selectedElement);
}

function getSelectedDate(selectedElement) {
  if (selectedElement.value) {
    return moment(selectedElement.value).toDate();
  }
  return new Date();
}

function setup({ selectedElement }) {
  const date = getSelectedDate(selectedElement);
  selectedElement.setAttribute('value', moment(date).format('YYYY-[W]ww'));
  return {
    options,
    selectedDate: date,
    selectedOption: 'month',
    expandedCommands: getNumbersUntil(60),
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-calendar',
  contexts: [{
    context: 'weekOptions',
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
        name: 'Week Picker',
        help: 'Say the number of the selected label',
        'command.month': 'month',
        'command.week': 'week',
        'command.year': 'year',
        'help.month': 'Switches to month picker',
        'help.week': 'Switches to week picker',
        'help.year': 'Switches to year picker',
        'group.month': 'Switch tab',
        'group.week': 'Switch tab',
        'group.year': 'Switch tab',
        'html-example': 'Use the command "click" o "click date" over the following date input then you will be able to pick a week<br/><input type="week" />',
        month: 'month',
        week: 'week',
        year: 'year',
        'say-year-number': 'Say the year number',
        locale: 'en',
        format: 'MMMM YYYY, [week] w',
      },
      es: {
        name: 'Seleccionar Semana',
        help: 'Indica el número de la opción deseada',
        'command.month': 'mes',
        'command.week': 'semana',
        'command.year': 'año',
        'help.month': 'Seleccionar mes',
        'help.week': 'Seleccionar semana',
        'help.year': 'Seleccionar año',
        'group.month': 'Cambiar pestaña',
        'group.week': 'Cambiar pestaña',
        'group.year': 'Cambiar pestaña',
        'html-example': 'Usa el comando "click" o "click fecha" sobre el siguiente campo para luego poder seleccionar la semana deseada<br/><input type="week" />',
        month: 'mes',
        week: 'semana',
        year: 'año',
        'say-year-number': 'Indica el número de año',
        locale: 'es',
        format: 'MMMM YYYY, [semana] w',
      },
      pt: {
        name: 'Seletor Semanal',
        help: 'Diga o número do marcador desejado',
        'command.month': 'mês',
        'command.week': 'semana',
        'command.year': 'ano',
        'help.month': 'Alterna para o Seletor de Mês',
        'help.week': 'Alterna para o Seletor de Semana',
        'help.year': 'Alterna para o Seletor de Ano',
        'group.month': 'Alternar seletor',
        'group.week': 'Alternar seletor',
        'group.year': 'Alternar seletor',
        'html-example': 'Use o comando "clique" ou "selecionar data" sobre o campo de inserção de data, então será possível escolher uma determinada semana<br/><input type="week" />',
        month: 'mês',
        week: 'semana',
        year: 'ano',
        'say-year-number': 'Diga o ano',
        locale: 'pt',
        format: 'MMMM YYYY, [semana] w',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Pick a week',
      description: 'After click over date input it allows you select a week',
    },
    es: {
      name: 'Seleccionar Semana',
      description: 'Al hacer click sobre un campo de fecha permite seleccionar una semana específica',
    },
    pt: {
      name: 'Selecione uma semana',
      description: 'Após clicar no campo de inserção de data, será possível escolher a semana determinada.',
    },
  },
};
