import { getVisibleElementsInViewPort } from 'dom-element-types';
import focusElement from '../helpers/focus_element';
import {
  clickableSelector,
  getClickableSelector,
  focusableElementAfterClickSelector,
  is,
} from '../helpers/element_selectors';
import { getHtmlExample } from './docs';

const clickFilters = Object.keys(clickableSelector).map(filter => (filter === 'datePicker' ? 'date' : filter));

const filters = {
  en: {
    audio: 'audio',
    video: 'video',
    color: 'color',
    button: 'button',
    checkbox: 'checkbox',
    date: 'date',
    file: 'file',
    image: 'image',
    link: 'link',
    media: 'media',
    range: 'range',
    radio: 'radio',
    select: 'select',
    text: 'text',
  },
  es: {
    audio: 'audio',
    video: 'video',
    color: 'color',
    button: 'botón',
    checkbox: 'opción',
    date: 'fecha',
    file: 'archivo',
    image: 'imágen',
    link: 'vínculo',
    media: 'multimedia',
    range: 'rango',
    radio: 'opción única',
    select: 'opciones',
    text: 'texto',
  },
  pt: {
    audio: 'áudio',
    video: 'vídeo',
    color: 'cor',
    button: 'botão',
    checkbox: 'opção',
    date: 'data',
    file: 'arquivo',
    image: 'imagem',
    link: 'link',
    media: 'mídias',
    range: 'intervalo',
    radio: 'opção única',
    select: 'selecionar',
    text: 'texto',
  },
  yue: {
    audio: '音樂',
    video: '影片',
    color: '顏色',
    button: '按鈕',
    checkbox: '核取方塊',
    date: '日期',
    file: '檔案',
    image: '圖片',
    link: '連結',
    media: '多媒體',
    range: '下拉式選單',
    radio: '選項按鈕',
    select: '下拉式清單',
    text: '文字',
  },
};

const translations = {
  en: {
    click: 'click',
    help: 'Executes a "click" over a',
    audio: 'Audio',
    audioDescription: 'Use the command "click", "click audio" or "click media"',
    button: 'Button',
    buttonDescription: 'Use the command "click" or "click button"',
    clickHere: 'Click here',
    checkbox: 'Checkbox',
    checkboxDescription: 'Use the command "click" or "click checkbox"',
    option: 'Option',
    color: 'Color',
    colorDescription: 'Use the command "click" or "click color"',
    dates: 'Dates',
    datesDescription: 'Use the command "click" or "click date"',
    file: 'File',
    fileDescription: 'Use the command "click" or "click file"',
    image: 'Image',
    imageDescription: 'Use the command "click" or "click image"',
    link: 'Link',
    linkDescription: 'Use the command "click" or "click link"',
    range: 'Range',
    rangeDescription: 'Use the command "click" or "click range"',
    radioButtons: 'Radio buttons',
    radioButton: 'Radio button',
    radioButtonsDescription: 'Use the command "click" or "click radio"',
    select: 'Select',
    selectDescription: 'Use the command "click" or "click select"',
    text: 'Text',
    textDescription: 'Use the command "click" or "click text"',
    video: 'Video',
    videoDescription: 'Use the command "click", "click video" or "click media"',
  },
  es: {
    click: 'click',
    help: 'Ejecuta un "click" sobre un',
    audio: 'Audio',
    audioDescription: 'Usar comando "click", "click audio" o "click multimedia"',
    button: 'Botón',
    buttonDescription: 'Usar comando "click" o "click botón"',
    clickHere: 'Click aquí',
    checkbox: 'Opción',
    checkboxDescription: 'Usar comando "click" o "click opción"',
    option: 'Opción',
    color: 'Color',
    colorDescription: 'Usar comando "click" o "click color"',
    dates: 'Fechas',
    datesDescription: 'Usar comando "click" o "click fecha"',
    file: 'Archivo',
    fileDescription: 'Usar comando "click" o "click archivo"',
    image: 'Imagén',
    imageDescription: 'Usar comando "click" o "click imagén"',
    link: 'Vínculo',
    linkDescription: 'Usar comando "click" o "click vínculo"',
    range: 'Rango',
    rangeDescription: 'Usar comando "click" o "click rango"',
    radioButtons: 'Opción única',
    radioButton: 'opción',
    radioButtonsDescription: 'Usar comando "click" o "click opción"',
    select: 'Opciones',
    selectDescription: 'Usar comando "click" o "click opciones"',
    text: 'Texto',
    textDescription: 'Usar comando "click" o "click texto"',
    video: 'Video',
    videoDescription: 'Usar comando "click", "click video" o "click multimedia"',
  },
  pt: {
    click: 'clique',
    help: 'Executar um "clique" sobre um',
    audio: 'Audio',
    audioDescription: 'Executar um "clique", "clique audio" ou "clique multimedia"',
    button: 'Botão',
    buttonDescription: 'Executar um "clique" ou "clique botão"',
    clickHere: 'Clique',
    checkbox: 'Opções',
    checkboxDescription: 'Executar um "clique" ou "clique opção"',
    option: 'Opção',
    color: 'Color',
    colorDescription: 'Executar um "clique" ou "clique color"',
    dates: 'Data',
    datesDescription: 'Executar um "clique" ou "clique data"',
    file: 'Arquivo',
    fileDescription: 'Executar um "clique" ou "clique arquivo"',
    image: 'Imagem',
    imageDescription: 'Executar um "clique" ou "clique imagem"',
    link: 'Link',
    linkDescription: 'Executar um "clique" ou "clique link"',
    range: 'Intervalo',
    rangeDescription: 'Executar um "clique" ou "clique intervalo"',
    radioButtons: 'Opção única',
    radioButton: 'Opção única',
    radioButtonsDescription: 'Executar um "clique" ou "clique opção única"',
    select: 'Selecionar',
    selectDescription: 'Executar um "clique" ou "clique selecionar"',
    text: 'Texto',
    textDescription: 'Executar um "clique" ou "clique texto"',
    video: 'Video',
    videoDescription: 'Executar um "clique", "clique video" ou "click multimedia"',
  },
  yue: {
    click: '點擊',
    help: '進行「點擊」',
    audio: '音樂',
    audioDescription: '利用「點擊」、「點擊音樂」或「點擊多媒體」指令',
    button: '按鈕',
    buttonDescription: '利用「點擊」或「點擊按鈕」',
    clickHere: '點擊此處',
    checkbox: '核取方塊',
    checkboxDescription: '利用「點擊」或「點擊核取方塊」',
    option: '選項',
    color: '顏色',
    colorDescription: '利用「點擊」或「點擊顏色」',
    dates: '日期',
    datesDescription: '利用「點擊」或「點擊日期」',
    file: '檔案',
    fileDescription: '利用「點擊」或「點擊檔案」',
    image: '圖片',
    imageDescription: '利用「點擊」或「點擊圖片」',
    link: '連結',
    linkDescription: '利用「點擊」或「點擊連結」',
    range: '下拉式選單',
    rangeDescription: '利用「點擊」或「點擊下拉式選單」',
    radioButtons: '選項按鈕',
    radioButton: '選項按鈕',
    radioButtonsDescription: '利用「點擊」或「點擊選項按鈕」',
    select: '下拉式清單',
    selectDescription: '利用「點擊」或「點擊下拉式清單」',
    text: '文字',
    textDescription: '利用「點擊」或「點擊文字」',
    video: '影片',
    videoDescription: '利用「點擊」、「點擊影片」或「點擊多媒體」指令',
  },
};

const filterElementMap = clickFilters
  .filter(filter => filter !== 'hasOnClickAttr')
  .map(filter => ({
    name: `i18n-command.click-${filter}`,
    help: `i18n-help.click-${filter}`,
    group: 'i18n-group.click',
    action: params => click(params, filter),
  }));

function i18n(language) {
  const map = {};
  clickFilters
    .filter(filter => filter !== 'hasOnClickAttr')
    .forEach((filter) => {
      const element = filters[language][filter] || filter;
      map[`command.click-${filter}`] = `${translations[language].click} ${element}`;
      map[`help.click-${filter}`] = `${translations[language].help} ${element}`;
    });
  return map;
}

function clickOverElement(el) {
  const focus = is(focusableElementAfterClickSelector, el);
  el.dispatchEvent(new MouseEvent('mouseenter'));
  el.dispatchEvent(new MouseEvent('mouseover'));
  el.dispatchEvent(new MouseEvent('mousedown'));
  el.dispatchEvent(new MouseEvent('mouseup'));
  el.click();
  if (focus) {
    focusElement(el);
  }
  return {
    selectedElement: (focus && el) || null,
    context: 'root',
  };
}

function click(params, filter) {
  const updatedFilter = filter === 'date' ? 'datePicker' : filter;
  const selector = getClickableSelector(updatedFilter);
  const elements = getVisibleElementsInViewPort(selector);

  if (elements.length > 1) {
    return {
      context: 'pickLabel',
      labels: selector,
      selectedElementHandler: clickOverElement,
    };
  } if (elements.length === 1) {
    return clickOverElement(elements[0]);
  }
  return {};
}

function teardown({ contextState }) {
  return {
    selectedElementHandler: contextState.selectedElementHandler,
    labels: contextState.labels,
  };
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-mouse-pointer',
  contexts: [{
    context: 'root',
    teardown,
    commands: [{
      name: 'i18n-command.click',
      action: click,
      help: 'i18n-help.click',
      group: 'i18n-group.click',
    }, {
      name: 'i18n-command.press',
      action: click,
      help: 'i18n-help.press',
      group: 'i18n-group.press',
    },
    ...filterElementMap,
    ],
    htmlExample: 'i18n-html-example',
    i18n: {
      en: {
        'command.click': 'click',
        'help.click': 'Executes a "click" over an element',
        'group.click': 'Click something',
        'command.press': 'press',
        'help.press': 'Executes a "click" over an element',
        'group.press': 'Click something',
        'html-example': getHtmlExample(translations.en),
        ...i18n('en'),
      },
      es: {
        'command.click': 'click',
        'help.click': 'Ejecuta un "click" sobre algún elemento',
        'group.click': 'Click sobre algo',
        'command.press': 'presionar',
        'help.press': 'Ejecuta un "click" sobre algún elemento',
        'group.press': 'Click sobre algo',
        'html-example': getHtmlExample(translations.es),
        ...i18n('es'),
      },
      pt: {
        'command.click': 'clique',
        'help.click': 'Executar um "clique" sobre um item',
        'group.click': 'Clicar em algo',
        'command.press': 'pressionar',
        'help.press': 'Executar um "clique" sobre um item',
        'group.press': 'Clicar em algo',
        'html-example': getHtmlExample(translations.pt),
        ...i18n('pt'),
      },
      yue: {
        'command.click': '點擊',
        'help.click': '在選取物件進行「點擊」',
        'group.click': '點擊物件',
        'command.press': '按',
        'help.press': '在選取物件進行「點擊」',
        'group.press': '點擊物件',
        'html-example': getHtmlExample(translations.yue),
        ...i18n('yue'),
      },
    },
  }],
  i18n: {
    en: {
      name: 'Click',
      description: 'Perform a "click" over a selected element',
    },
    es: {
      name: 'Click',
      description: 'Efectua un "click" sobre un elemento previamente seleccionado',
    },
    pt: {
      name: 'Clicar',
      description: 'Realiza um "clique" sobre um item selecionado.',
    },
    yue: {
      name: '點擊',
      description: '在選取物件進行「點擊」',
    },
  },
};
