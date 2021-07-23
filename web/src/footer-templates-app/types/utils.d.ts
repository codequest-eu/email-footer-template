/* eslint-disable no-unused-vars */
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number];

type DeepPartial<T> = T extends AnyFunction
  ? T
  : T extends Array<infer U>
  ? _DeepPartialArray<U>
  : T extends UnknownRecord
  ? _DeepPartialObject<T>
  : T | undefined;

// eslint-disable-next-line @typescript-eslint/naming-convention
type _DeepPartialArray = Array<DeepPartial<T>>;
// eslint-disable-next-line @typescript-eslint/naming-convention
type _DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> };

type MaybeArrayElement<T> = T extends Array<infer K> ? K : T;
type ReturnTypes<Blocks extends Array<(...args: unknown[]) => unknown>> = {
  [K in keyof Blocks]: Blocks[K] extends () => infer R ? R : never;
};

type Diff<T, U> = T extends U ? never : T;
type Filter<T, U> = T extends U ? T : never;
type Has<T, U> = Filter<T, U> extends never ? false : true;

type OptionalKeys<T> = Diff<
  { [K in keyof T]: Has<T[K], undefined> extends true ? K : never }[keyof T],
  undefined
>;
type RequiredKeys<T> = Diff<
  { [K in keyof T]: Has<T[K], undefined> extends false ? K : never }[keyof T],
  undefined
>;
type HasOptionalKeys<T> = OptionalKeys<T> extends never ? false : true;
type HasRequiredKeys<T> = RequiredKeys<T> extends never ? false : true;
type PickOptional<T> = Partial<Pick<T, OptionalKeys<T>>>;
type PickRequired<T> = Pick<T, RequiredKeys<T>>;

type UndefinedToOptional<T> = PickOptional<T> & PickRequired<T>;

type PropsOf<T> = T extends (...args: infer A) => ReactNode ? A[0] : never;

type ObjectValues<T extends UnknownRecord> = T[keyof T];

type ActionsFromCreators<T extends ActionCreatorsMapObject> = ObjectValues<
  {
    [Key in keyof T]: ReturnType<T[Key]>;
  }
>;

type AnyFunction = (...args: unknown[]) => unknown;

type AsyncFunction<T = unknown> = (...args: unknown[]) => Promise<T>;

type Await<T> = T extends AsyncFunction<infer U> ? U : never;

type UnknownRecord = Record<string, unknown>;
