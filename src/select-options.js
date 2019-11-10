import map from 'lodash/map';
import $ from 'jquery';
import { isSelect } from 'dom-element-types';
import { getNumber, getNumbersUntil } from './helpers/number-helpers';
import scroll from './helpers/scroll';

const i18n = {
  en: {
    use: 'Use the command "click" or "click select" over the following select',
    value: 'Value',
  },
  es: {
    use: 'Utilizar el comando "click" o "click opciones" sobre el siguiente selector',
    value: 'Valor',
  },
  pt: {
    use: 'Use o comando "clique" ou "selecionar clique" sobre o seguinte elemento selecionado',
    value: 'Valor',
  },
};

function getHtmlExample(lang) {
  return `
    <p style="margin-top: 1em; margin-bottom: 0.2em;">
      ${i18n[lang].use} <br>
      <select>
        <option value="1">${i18n[lang].value}A</option>
        <option value="2" selected="selected">${i18n[lang].value} B</option>
        <option value="3">${i18n[lang].value}C</option>
        <option value="4">${i18n[lang].value}D</option>
        <option value="5">${i18n[lang].value}E</option>
        <option value="6">${i18n[lang].value}F</option>
      </select>
    </p>
  `;
}

function getScrollContainer(rootElement) {
  return $(rootElement.querySelector('.options-selector ul'));
}

function down({ rootElement }) {
  scroll.down(getScrollContainer(rootElement));
}

function up({ rootElement }) {
  scroll.up(getScrollContainer(rootElement));
}

function setOption(option, selectedElement) {
  const value = $(option).data('value');
  $(selectedElement).find(`option[value='${value}']`).prop('selected', true);
  return {
    context: 'root',
    commandWasExecuted: true,
  };
}

function reviewCommand({ rootElement, commandName, selectedElement }) {
  const number = getNumber(commandName);
  if (Number.isInteger(number)) {
    const option = rootElement.querySelector(`[data-key="${number}"]`);
    if (option) {
      return setOption(option, selectedElement);
    }
  }
  return {};
}

function getValues(el) {
  return map(el.querySelectorAll('option'), option => ({
    label: option.innerText,
    selected: option.selected,
    value: option.value,
  }));
}

function handleSwitchOnSelectElement(selectedElement) {
  return isSelect(selectedElement);
}

function setup({ selectedElement }) {
  const values = getValues(selectedElement);
  return {
    selectedElementValues: values,
    expandedCommands: getNumbersUntil(values.length),
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-list',
  contexts: [{
    context: 'selectOptions',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    setup,
    htmlExample: 'i18n-html-example',
    commands: [{
      name: 'i18n-command.scroll-up',
      help: 'i18n-help.scroll-up',
      action: up,
    }, {
      name: 'i18n-command.scroll-down',
      help: 'i18n-help.scroll-down',
      action: down,
    }, {
      name: '*',
      help: 'i18n-help.*',
      action: reviewCommand,
    }],
    i18n: {
      en: {
        name: 'Select Value',
        'command.scroll-up': 'scroll up',
        'command.scroll-down': 'scroll down',
        'help.scroll-up': 'Scroll up the option list',
        'help.scroll-down': 'Scroll down the option list',
        'help.*': 'Say the number of the selected label',
        'select-an-option': 'Select an option',
        'scroll-up': 'Scroll Up',
        'scroll-down': 'Scroll Down',
        'html-example': getHtmlExample('en'),
      },
      es: {
        name: 'Seleccionar Valor',
        'command.scroll-up': 'subir',
        'command.scroll-down': 'bajar',
        'help.scroll-up': 'Visualiza opciones de más arriba',
        'help.scroll-down': 'Visualiza las opciones de más abajo',
        'help.*': 'Selecciona el valor indicado',
        'select-an-option': 'Seleccionar una opción',
        'scroll-up': 'Subir',
        'scroll-down': 'Bajar',
        'html-example': getHtmlExample('es'),
      },
      pt: {
        name: 'Selecione um Valor',
        'command.scroll-up': 'rolar para cima',
        'command.scroll-down': 'rolar para baixo',
        'help.scroll-up': 'Rola para cima na lista de opções',
        'help.scroll-down': 'Rola para baixo na lista de opções',
        'help.*': 'Diga o número do marcador selecionado',
        'select-an-option': 'Selecione uma opção',
        'scroll-up': 'Rolar para Cima',
        'scroll-down': 'Rolar para Baixo',
        'html-example': getHtmlExample('pt'),
      },
    },
  }],
  i18n: {
    en: {
      name: 'Pick an option',
      description: 'After click over a select input it allows you to select a value.',
    },
    es: {
      name: 'Elegir una opción',
      description: 'Al hacer click sobre un campo de selección permite indicar el valor deseado.',
    },
    pt: {
      name: 'Escolha a opção',
      description: 'Após clicar num campo de seleção é possível selecionar um valor.',
    },
  },
};
