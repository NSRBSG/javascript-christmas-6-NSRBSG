class EventPlanner {
  #dateManager;
  #menuManager;

  constructor(dateManager, menuManager) {
    this.#dateManager = dateManager;
    this.#menuManager = menuManager;
  }

  get originalTotalPrice() {
    return this.#menuManager.calculateTotalPrice();
  }

  approveGift() {
    if (this.#menuManager.calculateTotalPrice() >= 120000) {
      return true;
    }
    return false;
  }

  calculateHolidayDiscount(date) {
    if (
      this.#menuManager.calculateTotalPrice() >= 10000 &&
      this.#dateManager.isHolidayDiscount
    ) {
      const baseDiscount = 1000;
      const alphaDiscount = 100;

      return baseDiscount + (date - 1) * alphaDiscount;
    }

    return 0;
  }

  calculateWeekendDiscount() {
    if (
      this.#menuManager.calculateTotalPrice() >= 10000 &&
      this.#dateManager.isWeekendDiscount
    ) {
      return this.#menuManager.mainCourseCount * 2023;
    }

    return 0;
  }

  calculateWeekdayDiscount() {
    if (
      this.#menuManager.calculateTotalPrice() >= 10000 &&
      !this.#dateManager.isWeekendDiscount
    ) {
      return this.#menuManager.dessertCount * 2023;
    }

    return 0;
  }

  calculateSpecialDiscount() {
    if (
      this.#menuManager.calculateTotalPrice() >= 10000 &&
      this.#dateManager.isSpecialDiscount
    ) {
      return 1000;
    }

    return 0;
  }

  calculateGiftPrice() {
    if (this.approveGift()) {
      return 25000;
    }

    return 0;
  }

  allBenefitCalculate(date) {
    const holiday = this.calculateHolidayDiscount(date);
    const weekend = this.calculateWeekendDiscount();
    const weekday = this.calculateWeekdayDiscount();
    const special = this.calculateSpecialDiscount();
    const gift = this.calculateGiftPrice();

    return {
      holiday,
      weekend,
      weekday,
      special,
      gift,
    };
  }

  totalDiscountPrice(date) {
    return (
      this.calculateHolidayDiscount(date) +
      this.calculateWeekendDiscount() +
      this.calculateWeekdayDiscount() +
      this.calculateSpecialDiscount() +
      this.calculateGiftPrice()
    );
  }

  expectPrice(date) {
    return (
      this.#menuManager.calculateTotalPrice() -
      this.calculateHolidayDiscount(date) -
      this.calculateWeekendDiscount() -
      this.calculateWeekdayDiscount() -
      this.calculateSpecialDiscount()
    );
  }
}

export default EventPlanner;
