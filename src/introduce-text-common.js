import defer from 'lodash/defer';
import { exit as defaultExit } from './global';

function updateNodeElementText(text, element) {
  if (element.matches('input') || element.matches('textarea')) {
    element.setAttribute('value', text);
  } else {
    // eslint-disable-next-line no-param-reassign
    element.innerHTML = text;
  }
}

function showCursorAtEnd(el) {
  const text = getText(el);
  const valueLength = text.length;
  if (el.setSelectionRange) {
    el.focus();
    el.setSelectionRange(valueLength, valueLength);
  } else if (el.createTextRange) {
    const range = el.createTextRange();
    range.collapse(true);
    range.moveEnd('character', valueLength);
    range.moveStart('character', valueLength);
    range.select();
  }
}

function writeText(text, element) {
  text.split('').forEach((char) => {
    let e = new KeyboardEvent('keydown', {
      key: char,
      charCode: char.charCodeAt(0),
      bubbles: true,
    });
    element.dispatchEvent(e);

    element.dispatchEvent(new Event('beforeinput', { bubbles: true }));

    e = new KeyboardEvent('keypress', {
      key: char,
      charCode: char.charCodeAt(0),
      bubbles: true,
    });
    element.dispatchEvent(e);

    updateNodeElementText(`${getText(element)}${char}`, element);

    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('textInput', { bubbles: true }));

    e = new KeyboardEvent('keyup', {
      key: char,
      charCode: char.charCodeAt(0),
      bubbles: true,
    });
    element.dispatchEvent(e);
  });
}

export function getText(selectedElement) {
  if (selectedElement.matches('input') || selectedElement.matches('textarea')) {
    return selectedElement.value || '';
  }
  return selectedElement.innerHTML || '';
}

export function setText(selectedElement, text) {
  updateNodeElementText(text, selectedElement);
  showCursorAtEnd(selectedElement);
  selectedElement.dispatchEvent(new Event('input', { bubbles: true }));
  selectedElement.dispatchEvent(new Event('textInput', { bubbles: true }));
}


export function addText(contextState, newText, selectedElement) {
  const currentText = getText(selectedElement);

  let { textHistory } = contextState;
  if (contextState.textHistoryPointer < textHistory.length - 1) {
    textHistory = textHistory.slice(0, contextState.textHistoryPointer + 1);
  }

  writeText(newText, selectedElement);
  showCursorAtEnd(selectedElement);

  return {
    textHistory: [...textHistory, `${currentText}${newText}`],
    textHistoryPointer: contextState.textHistory.length,
  };
}

export function removeText(contextState, text, selectedElement) {
  const currentText = getText(selectedElement);

  let { textHistory } = contextState;
  if (contextState.textHistoryPointer < textHistory.length - 1) {
    textHistory = textHistory.slice(0, contextState.textHistoryPointer + 1);
  }

  deleteText(currentText.slice(text.length, currentText.length), selectedElement);
  showCursorAtEnd(selectedElement);

  return {
    textHistory: [...contextState.textHistory, `${text}`],
    textHistoryPointer: contextState.textHistory.length,
  };
}

function deleteText(text, element) {
  text.split('').forEach((char) => {
    let e = new KeyboardEvent('keydown', { keyCode: 8, bubbles: true });
    element.dispatchEvent(e);

    element.dispatchEvent(new Event('beforeinput', { bubbles: true }));

    e = new KeyboardEvent('keypress', { keyCode: 8, bubbles: true });
    element.dispatchEvent(e);

    updateNodeElementText(getText(element).slice(0, -1), element);

    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('textInput', { bubbles: true }));

    e = new KeyboardEvent('keyup', { keyCode: 8, bubbles: true });
    element.dispatchEvent(e);
  });
}

export function exit(params) {
  defer(() => params.selectedElement.blur());
  return {
    ...defaultExit({
      contextState: params.contextState,
    }),
    context: 'root',
  };
}
