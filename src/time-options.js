import _ from 'lodash';
import { isTimePicker } from 'dom-element-types';
import moment from 'moment';
import { getNumber, getNumbersUntil } from './helpers/number-helpers';
import {
  optionsMap,
  setHour,
  setMinutes,
  validateHour,
  validateMinutes,
} from './datetime-options';


const reviewCommandActions = {
  hour: {
    condition: validateHour,
    action: _.wrap(setHour, setDate),
  },
  minutes: {
    condition: validateMinutes,
    action: _.wrap(setMinutes, setDate),
  },
};

const options = Object.keys(reviewCommandActions);

function setDate(setTime, state, number, selectedElement) {
  const newDate = setTime(state, number);
  selectedElement.setAttribute('value', newDate.format('HH:mm'));
  const date = newDate.toDate();
  return {
    formatedDate: getFormatedDate(date),
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
  return isTimePicker(selectedElement);
}

function getSelectedDate(selectedElement) {
  const currentDate = moment().format('YYYY-MM-DD');
  const currentValue = selectedElement.value;
  return moment(`${currentDate} ${currentValue}`).toDate();
}

function getFormatedDate(date) {
  return moment(date).format('h:mm a');
}

function setup({ selectedElement }) {
  const date = getSelectedDate(selectedElement);
  selectedElement.setAttribute('value', moment(date).format('HH:mm'));
  return {
    options,
    selectedDate: date,
    selectedOption: 'hour',
    expandedCommands: getNumbersUntil(60),
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-clock-o',
  contexts: [{
    context: 'timeOptions',
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
        name: 'Time Picker',
        help: 'Say the number of the selected label',
        'command.hour': 'hour',
        'command.minutes': 'minutes',
        'help.hour': 'Switches to hour picker',
        'help.minutes': 'Switches to minutes picker',
        'group.hour': 'Switch tab',
        'group.minutes': 'Switch tab',
        'html-example': 'Use the command "click" or "click date" over the following time input then you will be able to pick a time<br/><input type="time" />',
        hour: 'hour',
        minutes: 'minutes',
        'say-minute-number': 'Say the minute number. (0 to 59)',
        'say-hour-number': 'Say the hour number. (0 to 23)',
        locale: 'en',
        format: 'h:mm a',
      },
      es: {
        name: 'Seleccionar Tiempo',
        help: 'Indica el número de la opción deseada',
        'command.hour': 'hora',
        'command.minutes': 'minutos',
        'help.hour': 'Seleccionar hora',
        'help.minutes': 'Seleccionar minutos',
        'group.hour': 'Cambiar pestaña',
        'group.minutes': 'Cambiar pestaña',
        'html-example': 'Usar el comando "click" o "click fecha" sobre el siguiente campo de fecha luego podrás seleccionar un horario<br/><input type="time" />',
        hour: 'hora',
        minutes: 'minutos',
        'say-minute-number': 'Indica el número de minuto. (0 a 59)',
        'say-hour-number': 'Indica el número de hora. (0 a 23)',
        locale: 'es',
        format: 'h:mm a',
      },
      pt: {
        name: 'Seletor de Hora',
        help: 'Diga o número do marcador desejado',
        'command.hour': 'hora',
        'command.minutes': 'minutos',
        'help.hour': 'Alternar para seletor de hora',
        'help.minutes': 'Alternar para seletor de minutos',
        'group.hour': 'Alternar seletor',
        'group.minutes': 'Alternar seletor',
        'html-example': 'Use o comando "clique" ou "selecionar hora" sobre o seguinte campo de inserção, então será permitido escolher um tempo determinado <br/><input type="time" />',
        hour: 'hora',
        minutes: 'minutos',
        'say-minute-number': 'Diga o minuto. (0 à 59)',
        'say-hour-number': 'Diga a hora. (0 à 23)',
        locale: 'pt',
        format: 'h:mm a',
      },
      yue: {
        name: '時間選取器',
        help: '讀出己選取標籤的數字',
        'command.hour': '時',
        'command.minutes': '分',
        'help.hour': '移至選取小時的欄位',
        'help.minutes': '移至選取分鐘的欄位',
        'group.hour': '轉換分頁',
        'group.minutes': '轉換分頁',
        'html-example': '在以下時間輸入欄位利用「點擊」或「點擊日期」指令，你可以選取一個時間<br/><input type="time" />',
        hour: '時',
        minutes: '分',
        'say-minute-number': '讀出分鐘。（0至59）',
        'say-hour-number': '讀出小時。（0至23）',
        locale: 'yue',
        format: 'h:mm a',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Pick a time',
      description: 'After click over date input its allow you to select a time',
    },
    es: {
      name: 'Seleccionar un Horario',
      description: 'Al hacer click sobre un campo de fecha permite seleccionar un horario',
    },
    pt: {
      name: 'Seleciona uma hora',
      description: 'Após clicar sobre o seletor de horas é possível selecionar uma hora.',
    },
    yue: {
      name: '選取時間',
      description: '點擊日期欄位後，你可以選取一個時間',
    },
  },
};
