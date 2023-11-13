import DateManager from '../src/DateManager.js';
import EventPlanner from '../src/EventPlanner.js';
import MenuManager from '../src/MenuManager.js';

describe('EventPlanner 테스트', () => {
  const INVALID_INSTANCE_MESSAGE = '[ERROR] 인스턴스가 잘못되었습니다.';

  test('잘못된 인스턴스가 올 경우 에러처리', () => {
    const dateManager = {};
    const menuManager = {};
    expect(() => new EventPlanner(dateManager, menuManager)).toThrow(
      INVALID_INSTANCE_MESSAGE
    );
  });

  test('메뉴 총 금액 계산', () => {
    const dateManager = new DateManager(1);
    const menuManager = new MenuManager([
      { name: '타파스', count: 1 },
      { name: '티본스테이크', count: 2 },
      { name: '바비큐립', count: 1 },
      { name: '초코케이크', count: 3 },
    ]);
    const eventPlanner = new EventPlanner(dateManager, menuManager);
    expect(eventPlanner.originalTotalPrice).toBe(214500);
  });

  test('메뉴 총 금액 120000원 이상 시 샴페인 증정', () => {
    const dateManager = new DateManager(1);
    const menuManager = new MenuManager([
      { name: '타파스', count: 1 },
      { name: '티본스테이크', count: 2 },
      { name: '바비큐립', count: 1 },
      { name: '초코케이크', count: 3 },
    ]);
    const eventPlanner = new EventPlanner(dateManager, menuManager);
    expect(eventPlanner.approveGift()).toBe(true);
  });

  test('메뉴 총 금액 120000원 미만 시 샴페인 미증정', () => {
    const dateManager = new DateManager(1);
    const menuManager = new MenuManager([{ name: '초코케이크', count: 2 }]);
    const eventPlanner = new EventPlanner(dateManager, menuManager);
    expect(eventPlanner.approveGift()).toBe(false);
  });

  test('할인 총 내역', () => {
    const dateManager = new DateManager(1);
    const menuManager = new MenuManager([
      { name: '타파스', count: 1 },
      { name: '티본스테이크', count: 2 },
      { name: '바비큐립', count: 1 },
      { name: '초코케이크', count: 3 },
    ]);
    const expectResult = {
      holiday: 1000,
      weekend: 6069,
      weekday: 0,
      special: 0,
      gift: 25000,
    };
    const eventPlanner = new EventPlanner(dateManager, menuManager);
    expect(eventPlanner.allBenefitCalculate(1)).toEqual(expectResult);
  });

  test('할인 총 금액', () => {
    const dateManager = new DateManager(1);
    const menuManager = new MenuManager([
      { name: '타파스', count: 1 },
      { name: '티본스테이크', count: 2 },
      { name: '바비큐립', count: 1 },
      { name: '초코케이크', count: 3 },
    ]);
    const eventPlanner = new EventPlanner(dateManager, menuManager);
    expect(eventPlanner.totalDiscountPrice(1)).toBe(32069);
  });

  test('예상 결제 금액', () => {
    const dateManager = new DateManager(1);
    const menuManager = new MenuManager([
      { name: '타파스', count: 1 },
      { name: '티본스테이크', count: 2 },
      { name: '바비큐립', count: 1 },
      { name: '초코케이크', count: 3 },
    ]);
    const eventPlanner = new EventPlanner(dateManager, menuManager);
    expect(eventPlanner.expectPrice(1)).toBe(207431);
  });
});
