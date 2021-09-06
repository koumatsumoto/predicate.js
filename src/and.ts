import { Predicate } from './predicate';

export type And<P1 extends Predicate, P2 extends Predicate> = P1 extends Predicate<infer A1, infer B1>
  ? P2 extends Predicate<infer A2, infer B2>
    ? Predicate<A1 & A2, B1 & B2>
    : never
  : never;

export type AndMany<Ps extends any[]> = Ps extends []
  ? never
  : Ps extends [any]
  ? never
  : Ps extends [Predicate<infer A1, infer B1>, Predicate<infer A2, infer B2>]
  ? And<Predicate<A1, B1>, Predicate<A2, B2>>
  : Ps extends [Predicate<infer A1, infer B1>, Predicate<infer A2, infer B2>, ...infer Rest]
  ? AndMany<[And<Predicate<A1, B1>, Predicate<A2, B2>>, ...Rest]>
  : never;

export function and<P1 extends Predicate, P2 extends Predicate>(p1: P1, p2: P2): And<P1, P2>;
export function and<P1 extends Predicate, P2 extends Predicate, P3 extends Predicate>(p1: P1, p2: P2, p3: P3): AndMany<[P1, P2, P3]>;
export function and<P1 extends Predicate, P2 extends Predicate, P3 extends Predicate, P4 extends Predicate>(
  p1: P1,
  p2: P2,
  p3: P3,
  p4: P4,
): AndMany<[P1, P2, P3, P4]>;
export function and<P1 extends Predicate, P2 extends Predicate, P3 extends Predicate, P4 extends Predicate, P5 extends Predicate>(
  p1: P1,
  p2: P2,
  p3: P3,
  p4: P4,
  p5: P5,
): AndMany<[P1, P2, P3, P4, P5]>;
export function and<
  P1 extends Predicate,
  P2 extends Predicate,
  P3 extends Predicate,
  P4 extends Predicate,
  P5 extends Predicate,
  P6 extends Predicate,
>(p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): AndMany<[P1, P2, P3, P4, P5, P6]>;
export function and<
  P1 extends Predicate,
  P2 extends Predicate,
  P3 extends Predicate,
  P4 extends Predicate,
  P5 extends Predicate,
  P6 extends Predicate,
  P7 extends Predicate,
>(p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7): AndMany<[P1, P2, P3, P4, P5, P6, P7]>;
export function and<
  P1 extends Predicate,
  P2 extends Predicate,
  P3 extends Predicate,
  P4 extends Predicate,
  P5 extends Predicate,
  P6 extends Predicate,
  P7 extends Predicate,
  P8 extends Predicate,
>(p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8): AndMany<[P1, P2, P3, P4, P5, P6, P7, P8]>;
export function and(...predicates: Predicate[]) {
  return (value: any) => predicates.every((predicate) => predicate(value));
}
