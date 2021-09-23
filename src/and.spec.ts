import { assert, IsExact } from 'conditional-type-checks';
import { and } from './and';
import { Refinement } from './predicate';

test('and', () => {
  const isA = (v: { a: string }): v is { a: 'a' } => v.a === 'a';
  const isB = (v: { b: string }): v is { b: 'b' } => v.b === 'b';
  const isAB = and(isA, isB);

  expect(isAB({ a: 'a', b: 'b' })).toBeTruthy();
  expect(isAB({ a: 'a', b: '-' })).toBeFalsy();
  expect(isAB({ a: '-', b: 'b' })).toBeFalsy();
});

test('type check #1', () => {
  const isA = (v: { a: string }): v is { a: 'a' } => v.a === 'a';
  const isB = (v: { b: string }): v is { b: 'b' } => v.b === 'b';
  const isC = (v: { c: number }): v is { c: 1 } => v.c === 1;
  const isABC = and(isA, isB, isC);

  assert<IsExact<typeof isABC, Refinement<{ a: string } | { b: string } | { c: number }, { a: 'a'; b: 'b'; c: 1 }>>>(true);
});

test('type check #2', () => {
  const isA = (v: string): v is '' => Boolean(v);
  const isB = (v: number): v is 0 => Boolean(v);

  const shouldNever = and(isA, isB);
  assert<IsExact<typeof shouldNever, Refinement<string | number, never>>>(true);
});
