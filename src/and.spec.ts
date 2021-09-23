import { assert, IsExact } from 'conditional-type-checks';
import { and } from './and';
import { Refinement } from './predicate';

test('and', () => {
  const a = (v: { a: string }) => v.a === 'a';
  const b = (v: { b: string }) => v.b === 'b';
  const predicate = and(a, b);
  expect(predicate({ a: 'a', b: 'b' })).toBeTruthy();
  expect(predicate({ a: 'a', b: '-' })).toBeFalsy();
  expect(predicate({ a: '-', b: 'b' })).toBeFalsy();
});

test('type checks', () => {
  {
    const a = (v: { a: string }): v is { a: 'a' } => v.a === 'a';
    const b = (v: { b: string }): v is { b: 'b' } => v.b === 'b';
    const c = (v: { c: number }): v is { c: 1 } => v.c === 1;
    const r = and(a, b, c);
    assert<IsExact<typeof r, Refinement<{ a: string } | { b: string } | { c: number }, { a: 'a'; b: 'b'; c: 1 }>>>(true);
  }
  {
    const a = (v: unknown): v is { a: 'a' } => true;
    const b = (v: unknown): v is { b: 'b' } => true;
    const r = and(a, b);
    assert<IsExact<typeof r, Refinement<unknown, { a: 'a' } & { b: 'b' }>>>(true);
  }
  {
    const a = (v: string): v is 'a' => Boolean(v);
    const b = (v: string): v is 'b' => Boolean(v);
    const c = (v: number): v is 0 => Boolean(v);
    const r = and(a, b);
    const s = and(a, c);
    assert<IsExact<typeof r, never>>(true);
    assert<IsExact<typeof s, never>>(true);
  }
});
