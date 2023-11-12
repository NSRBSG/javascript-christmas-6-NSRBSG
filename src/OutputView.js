import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printWelcome() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
  },

  printPreviewBenefit(date) {
    Console.print(
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`
    );
  },

  printMenu() {
    Console.print('<주문 메뉴>');
  },

  printOrder(orderList) {
    orderList.forEach((order) => {
      Console.print(`${order.name} ${order.count}개`);
    });
  },

  printBeforeBenefit() {
    Console.print('<할인 전 총주문 금액>');
  },

  printOriginalPrice(originalPrice) {
    Console.print(`${originalPrice.toLocaleString('ko-KR')}원`);
  },

  printGiftMenu() {
    Console.print('<증정 메뉴>');
  },

  printGift(approveGift) {
    Console.print(approveGift ? '샴페인 1개' : '없음');
  },

  printBenefitDetails() {
    Console.print('<혜택 내역>');
  },

  printHolidayDiscount(price) {
    if (price) {
      Console.print(
        `크리스마스 디데이 할인: -${price.toLocaleString('ko-KR')}원`
      );
      return 0;
    }
  },

  printWeekdayDiscount(price) {
    if (price) {
      Console.print(`평일 할인: -${price.toLocaleString('ko-KR')}원`);
      return 0;
    }
  },

  printWeekendDiscount(price) {
    if (price) {
      Console.print(`주말 할인: -${price.toLocaleString('ko-KR')}원`);
      return 0;
    }
  },

  printSpecialDiscount(price) {
    if (price) {
      Console.print(`특별 할인: -${price.toLocaleString('ko-KR')}원`);
      return 0;
    }
  },

  printGiftPrice(price) {
    if (price) {
      Console.print(`증정 이벤트: -${price.toLocaleString('ko-KR')}원`);
      return 0;
    }
  },

  printNoBenefit() {
    Console.print('없음');
  },

  printTotalBenefitPrice() {
    Console.print('<총혜택 금액>');
  },

  printTotalDiscountPrice(price) {
    if (price) {
      Console.print(`-${price.toLocaleString('ko-KR')}원`);
    }

    Console.print('0원');
  },

  printAfterBenefit() {
    Console.print('<할인 후 예상 결제 금액>');
  },

  printExpectPrice(price) {
    Console.print(`${price.toLocaleString('ko-KR')}원`);
  },

  printEventBadge() {
    Console.print('<12월 이벤트 배지>');
  },

  printExpectEventBadge(price) {
    if (price >= 20000) {
      return Console.print('산타');
    }

    if (price >= 10000) {
      return Console.print('트리');
    }

    if (price >= 5000) {
      return Console.print('별');
    }

    Console.print('없음');
  },

  printError(message) {
    Console.print(message);
  },
};

export default OutputView;
