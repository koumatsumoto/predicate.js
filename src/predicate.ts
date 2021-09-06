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
