export { hasEmberData };

function hasEmberData() {
  return typeof self.DS !== 'undefined';
}