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

  #approveGift() {
    if (this.#menuManager.calculateTotalPrice() >= 120000) {
      return true;
    }
    return false;
  }

  #calculateHolidayDiscount() {
    if (this.#dateManager.isHolidayDiscount) {
      const baseDiscount = 1000;
      const alphaDiscount = 100;

      return baseDiscount + (this.#dateManager.date - 1) * alphaDiscount;
    }

    return 0;
  }

  #calculateWeekendDiscount() {
    if (this.#dateManager.isWeekendDiscount) {
      return this.#menuManager.mainCourseCount * 2023;
    }

    return 0;
  }

  #calculateWeekdayDiscount() {
    if (!this.#dateManager.isWeekendDiscount) {
      return this.#menuManager.dessertCount * 2023;
    }

    return 0;
  }

  #calculateSpecialDiscount() {
    if (this.#dateManager.isSpecialDiscount) {
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

  #benefitDetails() {
    OutputView.printBenefitDetails();
    OutputView.printHolidayDiscount(this.#calculateHolidayDiscount());
    OutputView.printWeekendDiscount(this.#calculateWeekendDiscount());
    OutputView.printWeekdayDiscount(this.#calculateWeekdayDiscount());
    OutputView.printSpecialDiscount(this.#calculateSpecialDiscount());
    OutputView.printGiftPrice(this.#calculateGiftPrice());
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

  previewBenefit() {
    OutputView.printPreviewBenefit(this.#dateManager.date);
    OutputView.printMenu();
    OutputView.printOrder(this.#menuManager.orderList);
    OutputView.printBeforeBenefit();
    OutputView.printOriginalPrice(this.#menuManager.calculateTotalPrice());
    OutputView.printGiftMenu();
    OutputView.printGift(this.#approveGift());
    this.#benefitDetails();
    OutputView.printTotalBenefitPrice();
    OutputView.printTotalDiscountPrice(this.#totalDiscountPrice());
    OutputView.printAfterBenefit();
    OutputView.printExpectPrice(this.#expectPrice());
    OutputView.printEventBadge();
    OutputView.printExpectEventBadge(this.#totalDiscountPrice());
  }
}

export default EventPlanner;
