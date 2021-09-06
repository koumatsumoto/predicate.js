import { not } from './not';

test('not', () => {
  const isA = (v: { a: string; b: string }): v is { a: 'a'; b: string } => v.a === 'a';
  const isNotA = not(isA);

  expect(isNotA({ a: '-', b: 'b' })).toBeTruthy();
  expect(isNotA({ a: 'a', b: '-' })).toBeFalsy();
});
