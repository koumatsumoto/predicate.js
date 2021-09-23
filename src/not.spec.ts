import { assert, IsExact } from 'conditional-type-checks';
import { not } from './not';
import { isNotNull, isNull } from './predicate';

test('not', () => {
  const isA = (v: { a: string; b: string }): v is { a: 'a'; b: string } => v.a === 'a';
  const isNotA = not(isA);
  expect(isNotA({ a: '-', b: 'b' })).toBeTruthy();
  expect(isNotA({ a: 'a', b: '-' })).toBeFalsy();

  const byNot = not(isNull);
  assert<IsExact<typeof byNot, typeof isNotNull>>(true);
});
