import $ from 'jquery';
import { isLink } from 'dom-element-types';
import { copy } from './text-options';
import { copy as copyToClipboard } from './helpers/clipboard';
// import { executeBackgroundAction } from './background';

function copyAddress({ selectedElement }) {
  const address = $(selectedElement).prop('href');
  copyToClipboard(address);
}

/*
function openInNewTab({ selectedElement }) {
  const address = $(selectedElement).prop('href');
  executeBackgroundAction({ newTab: address });
}
*/

function handleSwitchOnSelectElement(selectedElement) {
  return isLink(selectedElement);
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-link',
  contexts: [{
    context: 'linkOptions',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    htmlExample: 'i18n-html-example',
    commands: [{
      name: 'i18n-command.copy',
      action: copy,
      help: 'i18n-help.copy',
      group: 'i18n-group.copy',
      switchToContext: 'root',
    }, {
      name: 'i18n-command.copy-address',
      action: copyAddress,
      help: 'i18n-help.copy-address',
      group: 'i18n-group.copy-address',
      switchToContext: 'root',
    },
    /* {
      name: 'i18n-command.open-in-new-tab',
      action: openInNewTab,
      help: 'i18n-help.open-in-new-tab',
      group: 'i18n-group.open-in-new-tab',
      switchToContext: 'root',
    }
    */
    ],
    i18n: {
      en: {
        name: 'Link Actions',
        'command.copy': 'copy',
        'help.copy': 'Copies the link text',
        'group.copy': 'Link Actions',
        'command.copy-address': 'copy address',
        'help.copy-address': 'Copies the address of the selected element',
        'group.copy-address': 'Link Actions',
        'command.open-in-new-tab': 'open in new tab',
        'help.open-in-new-tab': 'Opens the selected link address in a new tab',
        'group.open-in-new-tab': 'Link Actions',
        copy: 'Copy',
        'copy-address': 'Copy address',
        'open-in-new-tab': 'Open in new tab',
        'html-example': 'Use the command "select" or "select link"<br/><a href="#">Select this link</a>',
        exit: 'Exit',
      },
      es: {
        name: 'Opciones de Vínculo',
        'command.copy': 'copiar',
        'help.copy': 'Copia el texto del vínculo',
        'group.copy': 'Opciones de Vínculo',
        'command.copy-address': 'copiar dirección',
        'help.copy-address': 'Copia la dirección del vínculo',
        'group.copy-address': 'Opciones de Vínculo',
        'command.open-in-new-tab': 'abrir en nueva pestaña',
        'help.open-in-new-tab': 'Abre el vínculo en una nueva pestaña',
        'group.open-in-new-tab': 'Opciones de Vínculo',
        copy: 'Copiar',
        'copy-address': 'Copiar dirección',
        'open-in-new-tab': 'Abrir en nueva pestaña',
        'html-example': 'Usar el comando "seleccionar" o "seleccionar vínculo"<p class="box"><a href="#">Seleccionar este vínculo</a></p>',
        exit: 'Salir',
      },
      pt: {
        name: 'Opções de Link',
        'command.copy': 'copiar',
        'help.copy': 'Copia o texto do link',
        'group.copy': 'Ações disponíveis através de um link',
        'command.copy-address': 'copiar endereço',
        'help.copy-address': 'Copia o endereço do elemento selecionado',
        'group.copy-address': 'Ações disponíveis através de um link',
        'command.open-in-new-tab': 'abrir em uma nova guia',
        'help.open-in-new-tab': 'Abrir o endereço do link selecionado em uma nova guia',
        'group.open-in-new-tab': 'Ações disponíveis através de um link',
        copy: 'Cópia',
        'copy-address': 'Copiar endereço',
        'open-in-new-tab': 'Abrir em uma nova guia',
        'html-example': 'Use o comando "selecionar" ou "selecionar link" <br/> <a href="#"> Selecione este link </a>',
        exit: 'Sair',
      },
      yue: {
        name: 'Link Actions',
        'command.copy': 'copy',
        'help.copy': 'Copies the link text',
        'group.copy': 'Link Actions',
        'command.copy-address': 'copy address',
        'help.copy-address': 'Copies the address of the selected element',
        'group.copy-address': 'Link Actions',
        'command.open-in-new-tab': 'open in new tab',
        'help.open-in-new-tab': 'Opens the selected link address in a new tab',
        'group.open-in-new-tab': 'Link Actions',
        copy: 'Copy',
        'copy-address': 'Copy address',
        'open-in-new-tab': 'Open in new tab',
        'html-example': 'Use the command "select" or "select link"<br/><a href="#">Select this link</a>',
        exit: 'Exit',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Link Options',
      description: 'After select a link it allows you to perform several actions',
    },
    es: {
      name: 'Opciones de Vínculo',
      description: 'Luego de seleccionar un vínculo habilita a realizar varias acciones',
    },
    pt: {
      name: 'Opções de Link',
      description: 'Após selecionar o link, é possível executar diversas ações',
    },
    yue: {
      name: 'Link Options',
      description: 'After select a link it allows you to perform several actions',
    },
  },
};
