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

test('type check #1', () => {
  const isA = (v: { a: string }): v is { a: 'a' } => v.a === 'a';
  const isB = (v: { b: string }): v is { b: 'b' } => v.b === 'b';
  const isC = (v: { c: number }): v is { c: 1 } => v.c === 1;
  const isABC = or(isA, isB, isC);

  assert<
    IsExact<
      typeof isABC,
      Refinement<
        { a: string } | { b: string } | { c: number },
        { a: 'a' } | ({ a: string } & { b: 'b' }) | (({ a: string } | { b: string }) & { c: 1 })
      >
    >
  >(true);
});
