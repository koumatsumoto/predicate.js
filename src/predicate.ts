export interface Predicate<A = any> {
  (value: A): boolean;
}

export interface Refinement<A = any, B extends A = A> {
  (value: A): value is B;
}

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
