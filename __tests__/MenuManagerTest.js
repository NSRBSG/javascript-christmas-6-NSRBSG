import MenuManager from '../src/MenuManager.js';

describe('MenuManager 테스트', () => {
  const INVALID_ORDER_MESSAGE =
    '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.';

  test('메뉴가 없는 경우', () => {
    expect(() => new MenuManager([])).toThrow(INVALID_ORDER_MESSAGE);
  });

  test('메뉴 이름이 없는 경우', () => {
    expect(() => new MenuManager([{ count: 1 }])).toThrow(
      INVALID_ORDER_MESSAGE
    );
  });

  test('메뉴에 포함되지 않는 경우', () => {
    expect(
      () => new MenuManager([{ name: '콤비네이션피자', count: 1 }])
    ).toThrow(INVALID_ORDER_MESSAGE);
  });

  test('메뉴 개수가 없는 경우', () => {
    expect(() => new MenuManager([{ name: '타파스' }])).toThrow(
      INVALID_ORDER_MESSAGE
    );
  });

  test('메뉴 개수가 숫자가 아닌 경우', () => {
    expect(() => new MenuManager([{ name: '타파스', count: 'a' }])).toThrow(
      INVALID_ORDER_MESSAGE
    );
  });

  test('메뉴 개수가 1보다 작은 경우', () => {
    expect(() => new MenuManager([{ name: '타파스', count: 0 }])).toThrow(
      INVALID_ORDER_MESSAGE
    );
  });

  test('메뉴 개수가 정수가 아닌 경우', () => {
    expect(() => new MenuManager([{ name: '타파스', count: 1.5 }])).toThrow(
      INVALID_ORDER_MESSAGE
    );
  });

  test('메뉴가 중복된 경우', () => {
    expect(
      () =>
        new MenuManager([
          { name: '타파스', count: 1 },
          { name: '타파스', count: 1 },
        ])
    ).toThrow(INVALID_ORDER_MESSAGE);
  });

  test('메뉴 총 개수가 20개를 초과할 경우', () => {
    expect(() => new MenuManager([{ name: '타파스', count: 21 }])).toThrow(
      INVALID_ORDER_MESSAGE
    );
  });

  test('음료만 주문한 경우', () => {
    expect(
      () =>
        new MenuManager([
          { name: '제로콜라', count: 1 },
          { name: '레드와인', count: 1 },
          { name: '샴페인', count: 1 },
        ])
    ).toThrow(INVALID_ORDER_MESSAGE);
  });

  test('유효한 주문인 경우', () => {
    expect(
      new MenuManager([
        { name: '타파스', count: 1 },
        { name: '제로콜라', count: 1 },
      ])
    ).toBeInstanceOf(MenuManager);
  });

  test('메인 메뉴 개수 확인', () => {
    const menuManager = new MenuManager([
      { name: '티본스테이크', count: 1 },
      { name: '바비큐립', count: 1 },
      { name: '초코케이크', count: 2 },
      { name: '제로콜라', count: 1 },
    ]);

    expect(menuManager.mainCourseCount).toBe(2);
  });

  test('디저트 메뉴 개수 확인', () => {
    const menuManager = new MenuManager([
      { name: '티본스테이크', count: 1 },
      { name: '바비큐립', count: 1 },
      { name: '초코케이크', count: 2 },
      { name: '제로콜라', count: 1 },
    ]);

    expect(menuManager.dessertCount).toBe(2);
  });

  test('총 주문 금액 확인', () => {
    const menuManager = new MenuManager([
      { name: '티본스테이크', count: 1 },
      { name: '바비큐립', count: 1 },
      { name: '초코케이크', count: 2 },
      { name: '제로콜라', count: 1 },
    ]);

    expect(menuManager.calculateTotalPrice()).toBe(142000);
  });
});
