import { ValuesType } from 'utility-types';
import { Predicate, Refinement } from './predicate';
import { TuplifyUnion } from './types';

export interface Validation<E extends string = string, A = any, B extends A = A> {
  <V extends A>(value: V): { valid: true; value: V & B; error: [] } | { valid: false; value: V; error: E[] };
}

export type CreateValidation<E extends string, Fn extends Predicate> = Fn extends Refinement<infer A, infer B>
  ? Validation<E, A, B>
  : Fn extends Predicate<infer A>
  ? Validation<E, A, A>
  : never;

export type ConcatValidations<Fs extends any[]> = Fs extends []
  ? never
  : Fs extends [Validation<infer E, infer A, infer B>]
  ? Validation<E, A, B>
  : Fs extends [Validation<infer E1, infer A1, infer B1>, Validation<infer E2, infer A2, infer B2>]
  ? Validation<E1 | E2, A1 & A2, B1 & B2>
  : Fs extends [Validation<infer E1, infer A1, infer B1>, Validation<infer E2, infer A2, infer B2>, ...infer Rest]
  ? ConcatValidations<[Validation<E1 | E2, A1 & A2, B1 & B2>, ...Rest]>
  : never;

export type MapToValidation<M extends Record<string, any>> = {
  [K in keyof M]: M[K] extends Refinement<infer A, infer B>
    ? Validation<Extract<K, string>, A, B>
    : M[K] extends Predicate<infer A>
    ? Validation<Extract<K, string>, A, A>
    : never;
};

export type CreateValidationFromRecord<M extends Record<string, Predicate>> = ConcatValidations<TuplifyUnion<ValuesType<MapToValidation<M>>>>;

export const createValidation = <E extends string, F extends Predicate, Vn = CreateValidation<E, F>>(error: E, predicate: F): Vn => {
  return ((value: any) => (predicate(value) ? { valid: true, value, error: [] } : { valid: false, value, error: [error] })) as any as Vn;
};

export const concatValidations = <Fs extends Validation[], Vn = ConcatValidations<[...Fs]>>(...validations: Fs): Vn => {
  return ((value: any) => {
    return validations.reduce<{ valid: boolean; value: any; error: string[] }>(
      (acc, f) => {
        const res = f(value);

        return { valid: acc.valid ? res.valid : false, value, error: acc.error.concat(res.error) };
      },
      { valid: true, value: value, error: [] },
    );
  }) as any as Vn;
};

export interface GetValidationFromRecord {
  <M extends Record<string, Predicate>>(m: M): CreateValidationFromRecord<M>;
}

export const getValidation: GetValidationFromRecord = <M extends Record<string, Predicate>, Vn = CreateValidationFromRecord<M>>(
  validationMap: M,
): Vn => {
  const validation = concatValidations(...Object.entries(validationMap).map(([error, predicate]) => createValidation(error, predicate))) as any;

  return ((value: any) => validation(value)) as any as Vn;
};
