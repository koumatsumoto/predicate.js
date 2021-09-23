import { Predicate, Refinement } from './predicate';

export type And<Fs extends any[]> = Fs extends []
  ? never
  : Fs extends [any]
  ? never
  : Fs extends [Refinement<infer A1, infer B1>, Refinement<infer A2, infer B2>]
  ? Refinement<A1 | A2, B1 & B2>
  : Fs extends [Refinement<infer A1, infer B1>, Predicate<infer A2>]
  ? Refinement<A1 | A2, B1 & A2>
  : Fs extends [Predicate<infer A1>, Refinement<infer A2, infer B2>]
  ? Refinement<A1 | A2, A1 & B2>
  : Fs extends [Predicate<infer A1>, Predicate<infer A2>]
  ? Predicate<A1 | A2>
  : Fs extends [Refinement<infer A1, infer B1>, Refinement<infer A2, infer B2>, ...infer Rest]
  ? And<[Refinement<A1 | A2, B1 & B2>, ...Rest]>
  : Fs extends [Refinement<infer A1, infer B1>, Predicate<infer A2>, ...infer Rest]
  ? And<[Refinement<A1 | A2, B1 & A2>, ...Rest]>
  : Fs extends [Predicate<infer A1>, Refinement<infer A2, infer B2>, ...infer Rest]
  ? And<[Refinement<A1 | A2, A1 & B2>, ...Rest]>
  : Fs extends [Predicate<infer A1>, Predicate<infer A2>, ...infer Rest]
  ? And<[Predicate<A1 | A2>, ...Rest]>
  : never;

export function and<Fs extends Predicate[]>(...predicates: Fs): And<Fs> {
  return ((value) => predicates.every((predicate) => predicate(value))) as And<Fs>;
}
