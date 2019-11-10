import $ from 'jquery';
import {
  getText,
  setText,
  addText,
  removeText,
  exit,
} from './introduce-text-common';
import { paste as pasteFromClipboard } from './helpers/clipboard';

function appendText(contextState, text, selectedElement) {
  let newText = text.trim();
  newText = ` ${text}`;

  return addText(contextState, newText, selectedElement);
}

function removeWord({ contextState, selectedElement }) {
  const newText = getText(selectedElement).split(' ').slice(0, -1).join(' ');
  return removeText(contextState, newText, selectedElement);
}

function removeLine({ contextState, selectedElement }) {
  const lineBreakIndex = getText(selectedElement).lastIndexOf('\n');
  if (lineBreakIndex > 0) {
    const newText = getText(selectedElement).substring(0, lineBreakIndex);
    return removeText(contextState, newText, selectedElement);
  }
  return cleanUp({ contextState, selectedElement });
}

function cleanUp({ contextState, selectedElement }) {
  return removeText(contextState, '', selectedElement);
}

function undo({ contextState, selectedElement }) {
  const newNextHistoryPointer = contextState.textHistoryPointer - 1;
  if (newNextHistoryPointer >= -1) {
    const newText = newNextHistoryPointer === -1 ? '' : contextState.textHistory[newNextHistoryPointer];
    // eslint-disable-next-line no-param-reassign
    contextState.textHistoryPointer = newNextHistoryPointer;
    return setText(selectedElement, newText);
  }
  return undefined;
}

function redo({ contextState, selectedElement }) {
  const newNextHistoryPointer = contextState.textHistoryPointer + 1;
  if (newNextHistoryPointer < contextState.textHistory.length) {
    // eslint-disable-next-line no-param-reassign
    contextState.textHistoryPointer = newNextHistoryPointer;
    const newText = contextState.textHistory[contextState.textHistoryPointer];
    return setText(selectedElement, newText);
  }
  return undefined;
}

function clickElement(el) {
  el.dispatchEvent(new MouseEvent('mouseenter'));
  el.dispatchEvent(new MouseEvent('mouseover'));
  el.dispatchEvent(new MouseEvent('mousedown'));
  el.dispatchEvent(new MouseEvent('mouseup'));
  el.click();
}

export function submit({ contextState, selectedElement }) {
  selectedElement.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 }));
  selectedElement.dispatchEvent(new KeyboardEvent('keypress', { keyCode: 13 }));
  selectedElement.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 13 }));

  const $el = $(selectedElement);
  const $form = $el.closest('form');
  if ($form) {
    const button = $form.find('[type=submit]');
    if (button && button[0]) {
      clickElement(button[0]);
    } else if ($form && $form[0] && $form[0].submit) {
      $form[0].submit();
    }
  }

  return exit({ contextState, selectedElement });
}

function paste() {
  pasteFromClipboard();
}

export function introduceText(contextState, text, selectedElement) {
  return appendText(contextState, text, selectedElement);
}

export default {
  commands: [{
    name: 'i18n-command.remove',
    help: 'i18n-help.remove',
    action: removeWord,
    group: 'i18n-group.remove',
  }, {
    name: 'i18n-command.remove-line',
    help: 'i18n-help.remove-line',
    action: removeLine,
    group: 'i18n-group.remove-line',
  }, {
    name: 'i18n-command.clean-up',
    help: 'i18n-help.clean-up',
    action: cleanUp,
    group: 'i18n-group.clean-up',
  }, {
    name: 'i18n-command.paste',
    help: 'i18n-help.paste',
    action: paste,
    group: 'i18n-group.paste',
  }, {
    name: 'i18n-command.undo',
    help: 'i18n-help.undo',
    action: undo,
    group: 'i18n-group.undo',
  }, {
    name: 'i18n-command.redo',
    help: 'i18n-help.redo',
    action: redo,
    group: 'i18n-group.redo',
  }, {
    name: 'i18n-command.submit',
    help: 'i18n-help.submit',
    action: submit,
    group: 'i18n-group.submit',
    switchToContext: 'root',
  }],
  i18n: {
    en: {
      'command.remove': 'remove',
      'help.remove': 'Removes the last word',
      'group.remove': 'Remove some text',
      'command.remove-line': 'remove line',
      'help.remove-line': 'Removes the last line',
      'group.remove-line': 'Remove some text',
      'command.clean-up': 'clean up',
      'help.clean-up': 'Removes the entire text',
      'group.clean-up': 'Remove some text',
      'command.paste': 'paste',
      'help.paste': 'Pastes copied text',
      'group.paste': 'Paste some text',
      'command.undo': 'undo',
      'help.undo': 'Undoes the last action',
      'group.undo': 'Revert a change',
      'command.redo': 'redo',
      'help.redo': 'Does the reverted action',
      'group.redo': 'Revert a change',
      'command.submit': 'submit',
      'help.submit': 'Submits the current form',
      'group.submit': 'Send the value',
    },
    es: {
      'command.remove': 'borrar',
      'help.remove': 'Borrar la última palabra',
      'group.remove': 'Borrar texto',
      'command.remove-line': 'borrar linea',
      'help.remove-line': 'Borrar la última linea de texto',
      'group.remove-line': 'Borrar texto',
      'command.clean-up': 'borrar todo',
      'help.clean-up': 'Borra todo el texto',
      'group.clean-up': 'Borrar texto',
      'command.paste': 'pegar',
      'help.paste': 'Pegar texto previamente copiado',
      'group.paste': 'Pegar texto',
      'command.undo': 'deshacer',
      'help.undo': 'Deshacer la última acción',
      'group.undo': 'Revertir un cambio',
      'command.redo': 'rehacer',
      'help.redo': 'Restaurar la acción revertida',
      'group.redo': 'Revertir un cambio',
      'command.submit': 'enviar',
      'help.submit': 'Enviar el formulario actual',
      'group.submit': 'Enviar el texto',
    },
    pt: {
      'command.remove': 'remover',
      'help.remove': 'Remove a última palavra',
      'group.remove': 'Remove algum texto',
      'command.remove-line': 'remove uma linha',
      'help.remove-line': 'Remove a última linha',
      'group.remove-line': 'Remove algum texto',
      'command.clean-up': 'limpar',
      'help.clean-up': 'Removes todo texto',
      'group.clean-up': 'Remove algum texto',
      'command.paste': 'colar',
      'help.paste': 'Colar texto copiado',
      'group.paste': 'Colar algum texto copiado',
      'command.undo': 'desfazer',
      'help.undo': 'Desfazer a última ação',
      'group.undo': 'Reverte uma alteração',
      'command.redo': 'refazer',
      'help.redo': 'Refaz a última ação',
      'group.redo': 'Reverte uma alteração',
      'command.submit': 'enviar',
      'help.submit': 'Envie o formulário atual',
      'group.submit': 'Envie o valor',
    },
  },
};
