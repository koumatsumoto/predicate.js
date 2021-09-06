import { not } from './not';
import { isNull, isUndefined } from './predicate';

test('not', () => {
  const isA = (v: { a: string; b: string }): v is { a: 'a'; b: string } => v.a === 'a';
  const isNotA = not(isA);

  expect(isNotA({ a: '-', b: 'b' })).toBeTruthy();
  expect(isNotA({ a: 'a', b: '-' })).toBeFalsy();
});

test('assert notNull and notUndefined', () => {
  const isNotNull = not(isNull);
  const isNotUndefined = not(isUndefined);

  const v1 = { a: '' } as { a: string } | null;
  if (isNotNull(v1)) {
    expect(v1.a); // should narrow type to non-null and not errored
  }

  const v2 = { a: '' } as { a: string } | undefined;
  if (isNotUndefined(v2)) {
    expect(v2.a); // should narrow type to non-undefined and not errored
  }
});
