import { setVegetarianState } from './index';
import { browser } from './browser';

(function() {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  browser().runtime.onMessage.addListener((message) => {
    if (message.command === "vegetarian") {
      setVegetarianState(message.state);
    }
  });

})();