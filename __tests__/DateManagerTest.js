import DateManager from '../src/DateManager.js';

describe('DateManager 테스트', () => {
  const INVALID_DATE_MESSAGE =
    '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.';

  test('날짜가 숫자가 아닌 경우 에러처리', () => {
    expect(() => new DateManager('a')).toThrow(INVALID_DATE_MESSAGE);
  });

  test('날짜가 1보다 작은 경우 에러처리', () => {
    expect(() => new DateManager(0)).toThrow(INVALID_DATE_MESSAGE);
  });

  test('날짜가 31보다 큰 경우 에러처리', () => {
    expect(() => new DateManager(32)).toThrow(INVALID_DATE_MESSAGE);
  });

  test('날짜가 정수가 아닌 경우 에러처리', () => {
    expect(() => new DateManager(1.5)).toThrow(INVALID_DATE_MESSAGE);
  });

  test('크리스마스 이벤트 날짜가 아닌 경우', () => {
    expect(new DateManager(26).isHolidayDiscount).toBe(false);
  });

  test('크리스마스 이벤트 날짜인 경우', () => {
    expect(new DateManager(25).isHolidayDiscount).toBe(true);
  });

  test('주말 할인 날짜가 아닌 경우', () => {
    expect(new DateManager(3).isWeekendDiscount).toBe(false);
  });

  test('주말 할인 날짜인 경우', () => {
    expect(new DateManager(1).isWeekendDiscount).toBe(true);
  });

  test('특별 할인 날짜가 아닌 경우', () => {
    expect(new DateManager(2).isSpecialDiscount).toBe(false);
  });

  test('특별 할인 날짜인 경우', () => {
    expect(new DateManager(10).isSpecialDiscount).toBe(true);
  });

  test('유효한 날짜인 경우', () => {
    expect(new DateManager(10)).toBeInstanceOf(DateManager);
  });
});
