import { setVegetarianState } from './index';

(function() {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  let browser = (typeof chrome !== 'undefined')
    ? chrome
    : browser;

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "vegetarian") {
      setVegetarianState('only');
    }
  });

})();