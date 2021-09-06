import { getValidation } from './validation';

test('validation', () => {
  const isA = (v: { a: string; b: string }): v is { a: 'a'; b: string } => v.a === 'a';
  const isB = (v: { a: string; b: string }): v is { a: string; b: 'b' } => v.b === 'b';
  const validation = getValidation({ isA, isB });

  expect(validation({ a: 'a', b: 'b' })).toBeTruthy();
});
