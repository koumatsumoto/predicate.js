import { getValidation } from './validation';

test('validation', () => {
  const isA = (v: { a: string }): v is { a: 'a' } => v.a === 'a';
  const isB = (v: { b: string }): v is { b: 'b' } => v.b === 'b';
  const validation = getValidation({ isA, isB });

  expect(validation({ a: 'a', b: 'b' })).toBeTruthy();
});
