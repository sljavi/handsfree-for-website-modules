import $ from 'jquery';
import { isImage } from 'dom-element-types';
import { copy as copyToClipboard } from './helpers/clipboard';
// import { executeBackgroundAction } from './background';

function getAddress(selectedElement) {
  return $(selectedElement).prop('src');
}

function copyAddress({ selectedElement }) {
  copyToClipboard(getAddress(selectedElement));
}

// TODO - restore these commands without use extension
/*
function openInNewTab({ selectedElement }) {
  executeBackgroundAction({ newTab: getAddress(selectedElement) });
}

function download({ selectedElement }) {
  executeBackgroundAction({ downloadFile: getAddress(selectedElement) });
}
*/

function handleSwitchOnSelectElement(selectedElement) {
  return isImage(selectedElement);
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-picture-o',
  contexts: [{
    context: 'imageOptions',
    name: 'i18n-name',
    switchOnSelectElement: handleSwitchOnSelectElement,
    commands: [{
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
    }, {
      name: 'i18n-command.download',
      action: download,
      help: 'i18n-help.download',
      group: 'i18n-group.download',
      switchToContext: 'root',
    }
    */
    ],
    htmlExample: 'i18n-html-example',
    i18n: {
      en: {
        name: 'Image Actions',
        'command.copy-address': 'copy address',
        'group.copy-address': 'Image Actions',
        'help.copy-address': 'Copies the address of the selected image',
        'command.open-in-new-tab': 'open in new tab',
        'group.open-in-new-tab': 'Image Actions',
        'help.open-in-new-tab': 'Opens the selected image address in a new tab',
        'command.download': 'download',
        'group.download': 'Image Actions',
        'help.download': 'Downloads the selected image',
        'copy-address': 'Copy address',
        'open-in-new-tab': 'Open in new tab',
        download: 'Download',
        'html-example': 'Use the command "select" or "select image"<br/><img src="https://handsfreeforweb.com/hfw-assets/image.png" />',
        exit: 'Exit',
      },
      es: {
        name: 'Opciones de Imagen',
        'command.copy-address': 'copiar dirección',
        'group.copy-address': 'Acciones de Imágenes',
        'help.copy-address': 'Copia la dirección de la imagen seleccionada',
        'command.open-in-new-tab': 'abrir en nueva pestaña',
        'group.open-in-new-tab': 'Acciones de Imágenes',
        'help.open-in-new-tab': 'Abre la dirección de la imagen en una nueva pestaña',
        'command.download': 'descargar',
        'group.download': 'Acciones de Imágenes',
        'help.download': 'Descarga la imagen seleccionada',
        'copy-address': 'Copiar dirección',
        'open-in-new-tab': 'Abrir en nueva pestaña',
        download: 'Descargar',
        'html-example': 'Usar el comando "seleccionar" or "seleccionar imagen"<br/><img src="https://handsfreeforweb.com/hfw-assets/image.png" />',
        exit: 'Salir',
      },
      pt: {
        name: 'Opções de Imagem',
        'command.copy-address': 'endereço de cópia',
        'group.copy-address': 'Opções de Imagem',
        'help.copy-address': 'Copia o endereço da imagem selecionada',
        'command.open-in-new-tab': 'abrir em uma nova guia',
        'group.open-in-new-tab': 'Opções de Imagem',
        'help.open-in-new-tab': 'Abrir o endereço da imagem selecionada em uma nova guia',
        'command.download': 'download',
        'group.download': 'Opções de Imagem',
        'help.download': 'Faz o download da imagem selecionada',
        'copy-address': 'Copiar endereço',
        'open-in-new-tab': 'Abrir em uma nova guia',
        download: 'Download',
        'html-example': 'Use o comando "selecionar" ou "selecionar imagem"<br/><img src="https://handsfreeforweb.com/hfw-assets/image.png" />',
        exit: 'Sair',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Image Options',
      description: 'After select an image it allows you to perform several actions',
    },
    es: {
      name: 'Opciones de Imágen',
      description: 'Luego de seleccionar una imagen habilita a realizar varias acciones',
    },
    pt: {
      name: 'Opções de Imagem',
      description: 'Após selecionar uma imagem, é possível executar diversas ações.',
    },
  },
};
