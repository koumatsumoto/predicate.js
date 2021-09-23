import { UnionToIntersection, ValuesType } from 'utility-types';

export interface Predicate<A = any> {
  (value: A): boolean;
}

export interface Refinement<A = any, B extends A = A> {
  (value: A): value is B;
}

export type MapPredicateInput<T extends any[]> = {
  [P in keyof T as T[P] extends T[number] ? P : never]: T[P] extends Predicate<infer A> ? A : never;
};
export type MapRefinementResult<T extends any[]> = {
  [P in keyof T as T[P] extends T[number] ? P : never]: T[P] extends Refinement<infer A, infer B> ? B : never;
};
export type FilterNever<T> = {
  [P in keyof T as T[P] extends never ? never : P]: T[P];
};

export type PredicateInputs<Fs extends Predicate[]> = ValuesType<FilterNever<MapPredicateInput<Fs>>>;
export type RefinementResults<Fs extends Predicate[]> = ValuesType<FilterNever<MapRefinementResult<Fs>>>;
export type RefinementResultsIntersection<Fs extends Predicate[]> = UnionToIntersection<ValuesType<FilterNever<MapRefinementResult<Fs>>>>;

export type ParamOf<Fs extends any[]> = Fs extends []
  ? never
  : Fs extends [Predicate<infer A>]
  ? A
  : Fs extends [Predicate<infer A1>, Predicate<infer A2>]
  ? A1 & A2
  : Fs extends [Predicate<infer A1>, Predicate<infer A2>, ...infer Rest]
  ? ParamOf<[Predicate<A1 & A2>, ...Rest]>
  : never;

export const isNull = <V>(value: V | null): value is null => value === null;
export const isNotNull = <V>(value: V | null): value is Exclude<V, null> => value !== null;
export const isUndefined = <V>(value: V | undefined): value is undefined => value === undefined;
export const isNotUndefined = <V>(value: V | undefined): value is NonNullable<V> => value !== undefined;
export const isString = (value: unknown): value is string => typeof value === 'string';
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
