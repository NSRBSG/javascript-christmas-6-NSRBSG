class DateManager {
  #errorMessage = {
    INVALID_DATE: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  };
  #holidayDiscountDate = Array.from({ length: 25 }, (_, i) => i + 1);
  #weekendDiscountDate = [1, 2, 8, 9, 15, 16, 22, 23, 29, 30];
  #specialDiscountDate = [3, 10, 17, 24, 25, 31];
  #date;

  constructor(date) {
    this.#validateDate(date);
    this.#date = date;
  }

  #validateDate(date) {
    if (isNaN(date)) {
      throw new Error(this.#errorMessage.INVALID_DATE);
    }

    if (date < 1 || date > 31) {
      throw new Error(this.#errorMessage.INVALID_DATE);
    }

    if (!Number.isInteger(date)) {
      throw new Error(this.#errorMessage.INVALID_DATE);
    }
  }

  get isHolidayDiscount() {
    return this.#holidayDiscountDate.includes(this.#date);
  }

  get isWeekendDiscount() {
    return this.#weekendDiscountDate.includes(this.#date);
  }

  get isSpecialDiscount() {
    return this.#specialDiscountDate.includes(this.#date);
  }
}

export default DateManager;
