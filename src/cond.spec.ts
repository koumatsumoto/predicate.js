import { cond } from './cond';

test('cond', () => {
  const isA = (v: { a: string; b: string }): v is { a: 'a'; b: string } => v.a === 'a';
  const isB = (v: { a: string; b: string }): v is { a: string; b: 'b' } => v.b === 'b';
  const isBifA = cond(isA, isB);

  expect(isBifA({ a: '-', b: 'b' })).toBeTruthy();
  expect(isBifA({ a: 'a', b: '-' })).toBeFalsy();
  expect(isBifA({ a: 'a', b: 'b' })).toBeTruthy();
});
