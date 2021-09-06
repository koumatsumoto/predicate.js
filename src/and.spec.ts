import { and } from './and';

test('and', () => {
  const isA = (v: { a: string; b: string }): v is { a: 'a'; b: string } => v.a === 'a';
  const isB = (v: { a: string; b: string }): v is { a: string; b: 'b' } => v.b === 'b';
  const isAandB = and(isA, isB);

  expect(isAandB({ a: 'a', b: 'b' })).toBeTruthy();
  expect(isAandB({ a: 'a', b: '-' })).toBeFalsy();
});
