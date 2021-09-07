import { Predicate, Refinement } from './predicate';

export type And<F1 extends Predicate, F2 extends Predicate> = F1 extends Refinement<infer A1, infer B1>
  ? F2 extends Refinement<infer A2, infer B2>
    ? Refinement<A1, B1 & B2>
    : F2 extends Predicate<infer A2>
    ? Refinement<A1, B1 & A2>
    : never
  : F1 extends Predicate<infer A1>
  ? F2 extends Refinement<infer A2, infer B2>
    ? Refinement<A1, A1 & B2>
    : F2 extends Predicate<infer A2>
    ? Predicate<A1>
    : never
  : never;

export type AndMany<Fs extends any[]> = Fs extends []
  ? never
  : Fs extends [any]
  ? never
  : Fs extends [Refinement<infer A1, infer B1>, Refinement<infer A2, infer B2>]
  ? And<Refinement<A1, B1>, Refinement<A2, B2>>
  : Fs extends [Refinement<infer A1, infer B1>, Predicate<infer A2>]
  ? And<Refinement<A1, B1>, Predicate<A2>>
  : Fs extends [Predicate<infer A1>, Refinement<infer A2, infer B2>]
  ? And<Predicate<A1>, Refinement<A2, B2>>
  : Fs extends [Predicate<infer A1>, Predicate<infer A2>]
  ? And<Predicate<A1>, Predicate<A2>>
  : Fs extends [Refinement<infer A1, infer B1>, Refinement<infer A2, infer B2>, ...infer Rest]
  ? AndMany<[And<Refinement<A1, B1>, Refinement<A2, B2>>, ...Rest]>
  : Fs extends [Refinement<infer A1, infer B1>, Predicate<infer A2>, ...infer Rest]
  ? AndMany<[And<Refinement<A1, B1>, Predicate<A2>>, ...Rest]>
  : Fs extends [Predicate<infer A1>, Refinement<infer A2, infer B2>, ...infer Rest]
  ? AndMany<[And<Predicate<A1>, Refinement<A2, B2>>, ...Rest]>
  : Fs extends [Predicate<infer A1>, Predicate<infer A2>, ...infer Rest]
  ? AndMany<[And<Predicate<A1>, Predicate<A2>>, ...Rest]>
  : never;

export function and<F1 extends Predicate, F2 extends Predicate>(f1: F1, f2: F2): And<F1, F2>;
export function and<F1 extends Predicate, F2 extends Predicate, F3 extends Predicate>(f1: F1, f2: F2, f3: F3): AndMany<[F1, F2, F3]>;
export function and<F1 extends Predicate, F2 extends Predicate, F3 extends Predicate, F4 extends Predicate>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
): AndMany<[F1, F2, F3, F4]>;
export function and<F1 extends Predicate, F2 extends Predicate, F3 extends Predicate, F4 extends Predicate, F5 extends Predicate>(
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
): AndMany<[F1, F2, F3, F4, F5]>;
export function and<
  F1 extends Predicate,
  F2 extends Predicate,
  F3 extends Predicate,
  F4 extends Predicate,
  F5 extends Predicate,
  F6 extends Predicate,
>(f1: F1, f2: F2, f3: F3, f4: F4, f5: F5, f6: F6): AndMany<[F1, F2, F3, F4, F5, F6]>;
export function and<
  F1 extends Predicate,
  F2 extends Predicate,
  F3 extends Predicate,
  F4 extends Predicate,
  F5 extends Predicate,
  F6 extends Predicate,
  F7 extends Predicate,
>(f1: F1, f2: F2, f3: F3, f4: F4, f5: F5, f6: F6, f7: F7): AndMany<[F1, F2, F3, F4, F5, F6, F7]>;
export function and<
  F1 extends Predicate,
  F2 extends Predicate,
  F3 extends Predicate,
  F4 extends Predicate,
  F5 extends Predicate,
  F6 extends Predicate,
  F7 extends Predicate,
  F8 extends Predicate,
>(f1: F1, f2: F2, f3: F3, f4: F4, f5: F5, f6: F6, f7: F7, f8: F8): AndMany<[F1, F2, F3, F4, F5, F6, F7, F8]>;
export function and<Fs extends Predicate[]>(...predicates: Fs): AndMany<Fs> {
  return ((value: any) => predicates.every((predicate) => predicate(value))) as AndMany<Fs>;
}
