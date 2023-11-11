import DateManager from './DateManager.js';
import InputView from './InputView.js';
import MenuManager from './MenuManager.js';
import OutputView from './OutputView.js';

class EventPlanner {
  #dateManager;
  #menuManager;

  constructor() {}

  async getDateToVisit() {
    OutputView.printWelcome();
    while (true) {
      try {
        const date = await InputView.readDate();
        return (this.#dateManager = new DateManager(date));
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }

  async getMenu() {
    while (true) {
      try {
        const menu = await InputView.readMenu();
        return (this.#menuManager = new MenuManager(menu));
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }

  previewBenefit() {
    OutputView.printPreviewBenefit(this.#dateManager.date);
    OutputView.printOrder(this.#menuManager.orderList);
  }
}

export default EventPlanner;
