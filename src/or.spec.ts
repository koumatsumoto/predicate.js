import { or } from './or';
import { assert, IsExact } from 'conditional-type-checks';
import { Refinement } from './predicate';

test('or', () => {
  const isA = (v: { a: string; b: string }): v is { a: 'a'; b: string } => v.a === 'a';
  const isB = (v: { a: string; b: string }): v is { a: string; b: 'b' } => v.b === 'b';
  const isAorB = or(isA, isB);

  expect(isAorB({ a: 'a', b: '-' })).toBeTruthy();
  expect(isAorB({ a: '-', b: '-' })).toBeFalsy();
});

test('type check', () => {
  const is0 = (v: number): v is 0 => v === 0;
  const is1 = (v: number): v is 1 => v === 1;
  const is2 = (v: number): v is 2 => v === 2;
  const is012 = or(is0, is1, is2);

  assert<IsExact<typeof is012, Refinement<number, 0 | 1 | 2>>>(true);
});
