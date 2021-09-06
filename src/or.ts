import { Predicate, Refinement } from './predicate';

export type Or<F1 extends Predicate, F2 extends Predicate> = F1 extends Refinement<infer A1, infer B1>
  ? F2 extends Refinement<infer A2, infer B2>
    ? Refinement<A1 & A2, (A1 & A2 & B1) | (A1 & A2 & B2)>
    : F2 extends Predicate<infer A2>
    ? Refinement<A1 & A2, (A1 & A2) | (A1 & A2 & B1)>
    : never
  : F1 extends Predicate<infer A1>
  ? F2 extends Refinement<infer A2, infer B2>
    ? Refinement<A1 & A2, (A1 & A2) | (A1 & A2 & B2)>
    : F2 extends Predicate<infer A2>
    ? Predicate<A1 & A2>
    : never
  : never;

export type OrMany<Fs extends any[]> = Fs extends []
  ? never
  : Fs extends [any]
  ? never
  : Fs extends [Refinement<infer A1, infer B1>, Refinement<infer A2, infer B2>]
  ? Or<Refinement<A1, B1>, Refinement<A2, B2>>
  : Fs extends [Refinement<infer A1, infer B1>, Predicate<infer A2>]
  ? Or<Refinement<A1, B1>, Predicate<A2>>
  : Fs extends [Predicate<infer A1>, Refinement<infer A2, infer B2>]
  ? Or<Predicate<A1>, Refinement<A2, B2>>
  : Fs extends [Predicate<infer A1>, Predicate<infer A2>]
  ? Or<Predicate<A1>, Predicate<A2>>
  : Fs extends [Refinement<infer A1, infer B1>, Refinement<infer A2, infer B2>, ...infer Rest]
  ? OrMany<[Or<Refinement<A1, B1>, Refinement<A2, B2>>, ...Rest]>
  : Fs extends [Refinement<infer A1, infer B1>, Predicate<infer A2>, ...infer Rest]
  ? OrMany<[Or<Refinement<A1, B1>, Predicate<A2>>, ...Rest]>
  : Fs extends [Predicate<infer A1>, Refinement<infer A2, infer B2>, ...infer Rest]
  ? OrMany<[Or<Predicate<A1>, Refinement<A2, B2>>, ...Rest]>
  : Fs extends [Predicate<infer A1>, Predicate<infer A2>, ...infer Rest]
  ? OrMany<[Or<Predicate<A1>, Predicate<A2>>, ...Rest]>
  : never;

export function or<F1 extends Predicate, F2 extends Predicate>(f1: F1, f2: F2): Or<F1, F2>;
export function or<F1 extends Predicate, F2 extends Predicate, F3 extends Predicate>(f1: F1, f2: F2, f3: F3): OrMany<[F1, F2, F3]>;
export function or<F1 extends Predicate, F2 extends Predicate, F3 extends Predicate, F4 extends Predicate>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
): OrMany<[F1, F2, F3, F4]>;
export function or<F1 extends Predicate, F2 extends Predicate, F3 extends Predicate, F4 extends Predicate, F5 extends Predicate>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
): OrMany<[F1, F2, F3, F4, F5]>;
export function or<
  F1 extends Predicate,
  F2 extends Predicate,
  F3 extends Predicate,
  F4 extends Predicate,
  F5 extends Predicate,
  F6 extends Predicate,
>(f1: F1, f2: F2, f3: F3, f4: F4, f5: F5, f6: F6): OrMany<[F1, F2, F3, F4, F5, F6]>;
export function or<
  F1 extends Predicate,
  F2 extends Predicate,
  F3 extends Predicate,
  F4 extends Predicate,
  F5 extends Predicate,
  F6 extends Predicate,
  F7 extends Predicate,
>(f1: F1, f2: F2, f3: F3, f4: F4, f5: F5, f6: F6, f7: F7): OrMany<[F1, F2, F3, F4, F5, F6, F7]>;
export function or<
  F1 extends Predicate,
  F2 extends Predicate,
  F3 extends Predicate,
  F4 extends Predicate,
  F5 extends Predicate,
  F6 extends Predicate,
  F7 extends Predicate,
  F8 extends Predicate,
>(f1: F1, f2: F2, f3: F3, f4: F4, f5: F5, f6: F6, f7: F7, f8: F8): OrMany<[F1, F2, F3, F4, F5, F6, F7, F8]>;
export function or<Fs extends Predicate[]>(...predicates: Fs): OrMany<Fs> {
  return ((value: any) => predicates.some((predicate) => predicate(value))) as OrMany<Fs>;
}
