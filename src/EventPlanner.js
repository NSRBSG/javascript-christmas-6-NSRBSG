import DateManager from './DateManager.js';
import InputView from './InputView.js';
import MenuManager from './MenuManager.js';
import OutputView from './OutputView.js';

class EventPlanner {
  #dateManager;
  #menuManager;

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

  #approveGift() {
    if (this.#menuManager.calculateTotalPrice() >= 120000) {
      return true;
    }
    return false;
  }

  #calculateHolidayDiscount() {
    if (
      this.#menuManager.calculateTotalPrice() >= 10000 &&
      this.#dateManager.isHolidayDiscount
    ) {
      const baseDiscount = 1000;
      const alphaDiscount = 100;

      return baseDiscount + (this.#dateManager.date - 1) * alphaDiscount;
    }

    return 0;
  }

  #calculateWeekendDiscount() {
    if (
      this.#menuManager.calculateTotalPrice() >= 10000 &&
      this.#dateManager.isWeekendDiscount
    ) {
      return this.#menuManager.mainCourseCount * 2023;
    }

    return 0;
  }

  #calculateWeekdayDiscount() {
    if (
      this.#menuManager.calculateTotalPrice() >= 10000 &&
      !this.#dateManager.isWeekendDiscount
    ) {
      return this.#menuManager.dessertCount * 2023;
    }

    return 0;
  }

  #calculateSpecialDiscount() {
    if (
      this.#menuManager.calculateTotalPrice() >= 10000 &&
      this.#dateManager.isSpecialDiscount
    ) {
      const baseDiscount = 1000;
      return baseDiscount;
    }

    return 0;
  }

  #calculateGiftPrice() {
    if (this.#approveGift()) {
      const giftPrice = 25000;
      return giftPrice;
    }

    return 0;
  }

  #totalDiscountPrice() {
    return (
      this.#calculateHolidayDiscount() +
      this.#calculateWeekendDiscount() +
      this.#calculateWeekdayDiscount() +
      this.#calculateSpecialDiscount() +
      this.#calculateGiftPrice()
    );
  }

  #expectPrice() {
    return (
      this.#menuManager.calculateTotalPrice() -
      this.#calculateHolidayDiscount() -
      this.#calculateWeekendDiscount() -
      this.#calculateWeekdayDiscount() -
      this.#calculateSpecialDiscount()
    );
  }

  #displayOrderMenu() {
    OutputView.printMenu();
    OutputView.printOrder(this.#menuManager.orderList);
  }

  #displayBeforeBenefit() {
    OutputView.printBeforeBenefit();
    OutputView.printOriginalPrice(this.#menuManager.calculateTotalPrice());
  }

  #displayGiftMenu() {
    OutputView.printGiftMenu();
    OutputView.printGift(this.#approveGift());
  }

  #displayBenefitDetails() {
    OutputView.printBenefitDetails();

    const leastOneDiscount = new Set();

    leastOneDiscount.add(
      OutputView.printHolidayDiscount(this.#calculateHolidayDiscount())
    );
    leastOneDiscount.add(
      OutputView.printWeekendDiscount(this.#calculateWeekendDiscount())
    );
    leastOneDiscount.add(
      OutputView.printWeekdayDiscount(this.#calculateWeekdayDiscount())
    );
    leastOneDiscount.add(
      OutputView.printSpecialDiscount(this.#calculateSpecialDiscount())
    );
    leastOneDiscount.add(OutputView.printGiftPrice(this.#calculateGiftPrice()));

    if (!leastOneDiscount.has(0)) {
      OutputView.printNoBenefit();
    }
  }

  #displayTotalBenefitPrice() {
    OutputView.printTotalBenefitPrice();
    OutputView.printTotalDiscountPrice(this.#totalDiscountPrice());
  }

  #displayAfterBenefitPrice() {
    OutputView.printAfterBenefit();
    OutputView.printExpectPrice(this.#expectPrice());
  }

  #displayEventBadge() {
    OutputView.printEventBadge();
    OutputView.printExpectEventBadge(this.#totalDiscountPrice());
  }

  previewBenefit() {
    OutputView.printPreviewBenefit(this.#dateManager.date);
    this.#displayOrderMenu();
    this.#displayBeforeBenefit();
    this.#displayGiftMenu();
    this.#displayBenefitDetails();
    this.#displayTotalBenefitPrice();
    this.#displayAfterBenefitPrice();
    this.#displayEventBadge();
  }
}

export default EventPlanner;
