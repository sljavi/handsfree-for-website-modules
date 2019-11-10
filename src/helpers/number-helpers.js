export function getNumber(text) {
  const updatedText = text
    .toLowerCase()
    .replace('number', '')
    .replace('número', '')
    .replace('numero', '')
    .trim();
  return parseInt(updatedText, 10);
}

export function getNumbersUntil(n) {
  return [...Array(n).keys()].map(key => `${key}`);
}
