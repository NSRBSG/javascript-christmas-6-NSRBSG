class DateManager {
  #errorMessage = {
    INVALID_DATE: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  };
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

  get date() {
    return this.#date;
  }
}

export default DateManager;
