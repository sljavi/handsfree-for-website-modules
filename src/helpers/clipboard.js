import isElement from 'lodash/isElement';
import $ from 'jquery';

function copyElement(el) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(el);
  selection.removeAllRanges();
  selection.addRange(range);
  return document.execCommand('copy');
}

function copyString(text) {
  const $elToCopy = $(`<p>${text}</p>`);
  $('body').append($elToCopy);
  const result = copyElement($elToCopy[0]);
  $elToCopy.remove();
  return result;
}

export function copy(something) {
  if (isElement(something)) {
    return copyElement(something);
  }
  return copyString(something);
}

export function paste() {
  return document.execCommand('paste');
}
