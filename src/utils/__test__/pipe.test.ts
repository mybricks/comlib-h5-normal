import pipe from '../pipe';

describe('test pipe', () => {
  const defaultValue = { a: 1 };
  let target: typeof defaultValue;
  beforeEach(() => {
    target = defaultValue;
  });

  it('test empty', () => {
    const res = pipe()(target);
    expect(res).toEqual({ a: 1 });
  });
  it('test multiple', () => {
    const res = pipe(
      (x) => x,
      (x) => {
        x.a = x.a + 1;
        return x;
      },
    )(target);
    expect(res).toEqual({ a: 2 });
  });
});
