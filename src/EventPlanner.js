import DateManager from './DateManager.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';

class EventPlanner {
  #dateManager;

  constructor() {}

  async getDateToVisit() {
    OutputView.printWelcome();
    while (true) {
      try {
        const date = await InputView.readDate();
        return (this.#dateManager = new DateManager(Number(date)));
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }
}

export default EventPlanner;
