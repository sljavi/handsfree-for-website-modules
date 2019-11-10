import $ from 'jquery';
import { isMultilineTextInput } from 'dom-element-types';
import {
  exit,
  getText,
  addText,
  removeText,
} from './introduce-text-common';
import { submit } from './introduce-text-free-speak';

function appendText(contextState, selectedElement, text) {
  return addText(contextState, text, selectedElement);
}

function removeLetter(contextState, selectedElement) {
  const newText = getText(selectedElement).slice(0, -1);
  return removeText(contextState, newText, selectedElement);
}

function shift(contextState, selectedElement) {
  return {
    keyboard: contextState.keyboard === 'general' ? 'shift' : 'general',
  };
}

function enter(contextState, selectedElement) {
  if (isMultilineTextInput(selectedElement)) {
    return insertCharacter(contextState, selectedElement, '\n');
  }
  return submit(contextState, selectedElement);
}

const actionHandlers = {
  space: (contextState, selectedElement) => insertCharacter(contextState, selectedElement, ' '),
  '↤ bksp': removeLetter,
  'tab ↦': (contextState, selectedElement) => insertCharacter(contextState, selectedElement, '  '),
  '↵ enter': enter,
  '⇧ shift': shift,
  accept: exit,
};

function insertCharacter(contextState, selectedElement, character) {
  return appendText(contextState, selectedElement, character);
}

function getActionHandler(action) {
  return actionHandlers[action] || insertCharacter;
}

function pressButton(element, contextState, selectedElement) {
  const action = `${$(element).data('action')}`;
  const actionHandler = getActionHandler(action);
  return actionHandler(contextState, selectedElement, action);
}

export function pressKeyboardKey(contextState, number, rootElement, selectedElement) {
  const element = rootElement.querySelector(`[data-key="${number}"]`);
  if (element) {
    const newState = pressButton(element, contextState, selectedElement) || {};
    return {
      ...newState,
      commandWasExecuted: true,
    };
  }
  return undefined;
}
