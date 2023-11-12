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

  printError(message) {
    Console.print(message);
  },
};

export default OutputView;
