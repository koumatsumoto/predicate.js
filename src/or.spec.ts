import { or } from './or';

test('or', () => {
  const isA = (v: { a: string; b: string }): v is { a: 'a'; b: string } => v.a === 'a';
  const isB = (v: { a: string; b: string }): v is { a: string; b: 'b' } => v.b === 'b';
  const isAorB = or(isA, isB);

  expect(isAorB({ a: 'a', b: '-' })).toBeTruthy();
  expect(isAorB({ a: '-', b: '-' })).toBeFalsy();
});
