class MenuManager {
  #errorMessage = {
    INVALID_ORDER: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  };
  #menuData = [
    { name: '양송이수프', type: 'appetizer', price: 6000 },
    { name: '타파스', type: 'appetizer', price: 5500 },
    { name: '시저샐러드', type: 'appetizer', price: 8000 },
    { name: '티본스테이크', type: 'mainCourse', price: 55000 },
    { name: '바비큐립', type: 'mainCourse', price: 54000 },
    { name: '해산물파스타', type: 'mainCourse', price: 35000 },
    { name: '크리스마스파스타', type: 'mainCourse', price: 25000 },
    { name: '초코케이크', type: 'dessert', price: 15000 },
    { name: '아이스크림', type: 'dessert', price: 5000 },
    { name: '제로콜라', type: 'drink', price: 3000 },
    { name: '레드와인', type: 'drink', price: 60000 },
    { name: '샴페인', type: 'drink', price: 25000 },
  ];
  #orderList;

  constructor(orderList) {
    this.#validateMenu(orderList);
    this.#orderList = orderList;
  }

  #validateMenu(orderList) {
    if (orderList.length === 0) {
      throw new Error(this.#errorMessage.INVALID_ORDER);
    }

    const orderDuplicateCheck = new Set();

    orderList.forEach((menu) => {
      if (!menu.name) {
        throw new Error(this.#errorMessage.INVALID_ORDER);
      }

      if (!this.#menuData.some((data) => data.name === menu.name)) {
        throw new Error(this.#errorMessage.INVALID_ORDER);
      }

      if (!menu.count) {
        throw new Error(this.#errorMessage.INVALID_ORDER);
      }

      if (isNaN(menu.count)) {
        throw new Error(this.#errorMessage.INVALID_ORDER);
      }

      if (menu.count < 1) {
        throw new Error(this.#errorMessage.INVALID_ORDER);
      }

      if (!Number.isInteger(menu.count)) {
        throw new Error(this.#errorMessage.INVALID_ORDER);
      }

      if (orderDuplicateCheck.has(menu.name)) {
        throw new Error(this.#errorMessage.INVALID_ORDER);
      }

      orderDuplicateCheck.add(menu.name);
    });
  }

  get orderList() {
    return this.#orderList;
  }

  get mainCourseCount() {
    const mainCourseOrder = this.#orderList.filter((order) => {
      const { type } = this.#menuData.find((data) => data.name === order.name);
      return type === 'mainCourse';
    });

    return mainCourseOrder.reduce((acc, order) => acc + order.count, 0);
  }

  get dessertCount() {
    const dessertOrder = this.#orderList.filter((order) => {
      const { type } = this.#menuData.find((data) => data.name === order.name);
      return type === 'dessert';
    });

    return dessertOrder.reduce((acc, order) => acc + order.count, 0);
  }

  calculateTotalPrice() {
    return this.#orderList.reduce((acc, cur) => {
      const { price } = this.#menuData.find((data) => data.name === cur.name);
      return acc + price * cur.count;
    }, 0);
  }
}

export default MenuManager;
