export default function openUrl(url, newTab = false) {
  if (newTab || window.location.protocol === 'chrome-extension:') {
    const win = window.open(url, '_blank');
    win.focus();
  } else {
    window.location.href = url;
  }
}
