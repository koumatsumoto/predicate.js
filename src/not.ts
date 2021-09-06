import { Predicate } from './predicate';

export type Not<P extends Predicate> = P extends Predicate<infer A, infer B> ? Predicate<A, Exclude<A, B>> : never;

export const not = <P extends Predicate>(predicate: P): Not<P> => {
  return ((value: any) => !predicate(value)) as Not<P>;
};
