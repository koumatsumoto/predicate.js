import { UnionToIntersection } from 'utility-types';
import { Predicate, PredicateInputs, Refinement, RefinementResults } from './predicate';

export type And<
  Predicates extends Predicate[],
  Inputs = PredicateInputs<Predicates>,
  Results = UnionToIntersection<RefinementResults<Predicates>>,
> = Results extends never ? Predicate<Inputs> : Refinement<Inputs, Inputs & Results>;

export const and = <Predicates extends any[]>(...predicates: Predicates): And<Predicates> => {
  return ((value) => predicates.every((predicate) => predicate(value))) as And<Predicates>;
};
