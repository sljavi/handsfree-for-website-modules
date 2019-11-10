import pick from 'lodash/pick';
import omit from 'lodash/omit';
import some from 'lodash/some';
import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';
import { getAllElementTypes } from 'dom-element-types';

export const clickableSelector = omit(getAllElementTypes(), ['text']);
clickableSelector.text = clickableSelector.textInput;
delete clickableSelector.textInput;

export const focusableElementAfterClickSelector = pick(clickableSelector, [
  'audio', 'checkbox', 'color', 'datePicker', 'file', 'media', 'range', 'radio', 'select', 'text',
]);

export const selectableSelectors = pick(getAllElementTypes(), [
  'audio', 'image', 'link', 'media', 'text', 'video',
]);

export function is(selectors, el) {
  return some(selectors, (selector) => {
    if (isArray(selector)) {
      return is(selector, el);
    }
    return el.matches(selector);
  });
}

export function getQuerySelectorFor(selectors) {
  return reduce(selectors, (all, selector) => all.push(selector) && all, []).join(', ');
}

export function getClickableSelector(filter) {
  let selector = clickableSelector[filter] && clickableSelector[filter].join(', ');
  if (!selector) {
    selector = getQuerySelectorFor(clickableSelector);
  }
  return selector;
}

export function getSelectableSelector(filter) {
  let selector = selectableSelectors[filter] && selectableSelectors[filter].join(', ');
  if (!selector) {
    selector = getQuerySelectorFor(selectableSelectors);
  }
  return selector;
}
