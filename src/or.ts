import { Predicate, Refinement } from './predicate';

export type Or<Fs extends any[]> = Fs extends []
  ? never
  : Fs extends [any]
  ? never
  : Fs extends [Refinement<infer A1, infer B1>, Refinement<infer A2, infer B2>]
  ? Refinement<A1 | A2, B1 | B2>
  : Fs extends [Refinement<infer A1, infer B1>, Predicate<infer A2>]
  ? Refinement<A1 | A2, B1 | A2>
  : Fs extends [Predicate<infer A1>, Refinement<infer A2, infer B2>]
  ? Refinement<A1 | A2, A1 | B2>
  : Fs extends [Predicate<infer A1>, Predicate<infer A2>]
  ? Predicate<A1 | A2>
  : Fs extends [Refinement<infer A1, infer B1>, Refinement<infer A2, infer B2>, ...infer Rest]
  ? Or<[Refinement<A1 | A2, B1 | B2>, ...Rest]>
  : Fs extends [Refinement<infer A1, infer B1>, Predicate<infer A2>, ...infer Rest]
  ? Or<[Refinement<A1 | A2, B1 | A2>, ...Rest]>
  : Fs extends [Predicate<infer A1>, Refinement<infer A2, infer B2>, ...infer Rest]
  ? Or<[Refinement<A1 | A2, A1 | B2>, ...Rest]>
  : Fs extends [Predicate<infer A1>, Predicate<infer A2>, ...infer Rest]
  ? Or<[Predicate<A1 | A2>, ...Rest]>
  : never;

export function or<Fs extends Predicate[]>(...predicates: Fs): Or<Fs> {
  return ((value) => predicates.some((predicate) => predicate(value))) as Or<Fs>;
}
