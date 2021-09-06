import { ParamOf, Predicate } from './predicate';

type Cond<P1 extends Predicate, P2 extends Predicate> = P1 extends Predicate<infer A1, infer B1>
  ? P2 extends Predicate<infer A2, infer B2>
    ? Predicate<A1, A1 | (B1 & B2)>
    : never
  : never;

export const cond = <P1 extends Predicate, P2 extends Predicate>(premise: P1, consequent: P2): Cond<P1, P2> => {
  return ((value: ParamOf<P1, P2>) => (premise(value) ? consequent(value) : true) as any) as Cond<P1, P2>;
};
