import InputView from './InputView.js';
import OutputView from './OutputView.js';
import EventPlanner from './EventPlanner.js';
import DateManager from './DateManager.js';
import MenuManager from './MenuManager.js';

class App {
  #eventPlanner;

  async run() {
    const inputData = await this.#initialize();
    this.#displayEvent(inputData);
  }

  async #initialize() {
    OutputView.printWelcome();
    const [date, dateManager] = await this.#askUntilCreateValidClass(
      InputView.readDate,
      DateManager
    );
    const [menu, menuManager] = await this.#askUntilCreateValidClass(
      InputView.readMenu,
      MenuManager
    );
    this.#eventPlanner = new EventPlanner(dateManager, menuManager);
    return { date, menu };
  }

  async #askUntilCreateValidClass(askFunc, newClass) {
    while (true) {
      try {
        const data = await askFunc();
        return [data, new newClass(data)];
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }

  #displayEvent({ date, menu }) {
    OutputView.printPreviewBenefit(date);
    OutputView.printMenu(menu);
    OutputView.printBeforeBenefitPrice(this.#eventPlanner.originalTotalPrice);
    OutputView.printGiftMenu(this.#eventPlanner.approveGift());
    OutputView.printBenefitDetails(
      this.#eventPlanner.allBenefitCalculate(date)
    );
    OutputView.printTotalBenefitPrice(
      this.#eventPlanner.totalDiscountPrice(date)
    );
    OutputView.printAfterBenefitPrice(this.#eventPlanner.expectPrice(date));
    OutputView.printExpectEventBadge(
      this.#eventPlanner.totalDiscountPrice(date)
    );
  }
}

export default App;
