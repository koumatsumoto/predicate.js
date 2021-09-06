import { Predicate, Refinement } from './predicate';

export type Not<F extends Predicate> = F extends Refinement<infer A, infer B>
  ? Refinement<A, Exclude<A, B>>
  : F extends Predicate<infer A>
  ? Predicate<A>
  : never;

export const not = <P extends Predicate>(predicate: P): Not<P> => {
  return ((value: any) => !predicate(value)) as Not<P>;
};
