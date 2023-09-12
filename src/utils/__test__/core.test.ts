import { reverseKV } from '../core';

describe('test object', () => {
  test('test reverseKV', () => {
    const obj = { a: '_a_', b: '_b_' };
    const res = reverseKV(obj);
    expect(res).toEqual({
      _a_: 'a',
      _b_: 'b',
    });
  });
});
