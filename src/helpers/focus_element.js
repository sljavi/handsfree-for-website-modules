import _ from 'lodash';
import { clickableSelector } from './element_selectors';

export default function focusElement(el) {
  if (_.some(clickableSelector.text, selector => el.matches(selector))) {
    if (el.value && el.value.length) {
      const valueLength = el.value.length;
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
  }
  if (el.focus) {
    el.focus();
  }
  document.dispatchEvent(new FocusEvent('focus', { relatedTarget: el }));
}
