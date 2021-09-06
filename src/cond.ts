import { ParamOf, Predicate, Refinement } from './predicate';

type Cond<F1 extends Predicate, F2 extends Predicate> = F1 extends Refinement<infer A1, infer B1>
  ? F2 extends Refinement<infer A2, infer B2>
    ? Refinement<A1, B1 & B2>
    : F2 extends Predicate<infer A2>
    ? Refinement<A1, A2 & B1>
    : never
  : F1 extends Predicate<infer A1>
  ? F2 extends Refinement<infer A2, infer B2>
    ? Refinement<A1, A1 & B2>
    : F2 extends Predicate<infer A2>
    ? Refinement<A1, A1 & A2>
    : never
  : never;

export const cond = <F1 extends Predicate, F2 extends Predicate>(premise: F1, consequent: F2): Cond<F1, F2> => {
  return ((value: ParamOf<F1, F2>) => (premise(value) ? consequent(value) : true)) as Cond<F1, F2>;
};
