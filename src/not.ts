import { Predicate, Refinement } from './predicate';

export function not<A, B extends A>(predicate: Refinement<A, B>): Refinement<A, Exclude<A, B>>;
export function not<A>(predicate: Predicate<A>): Predicate<A>;
export function not(predicate: (value: any) => boolean): (value: any) => boolean {
  return (value: any) => !predicate(value);
}
