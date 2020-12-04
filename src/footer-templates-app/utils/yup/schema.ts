import _pick from "lodash/pick";
import * as yup from "yup";

export function pick<T extends UnknownRecord, Keys extends Array<keyof T>>(
  schema: yup.ObjectSchema<T>,
  ...keys: Keys
): yup.ObjectSchema<Pick<T, Keys[number]>> {
  return yup.object(_pick(schema.fields, keys)).required();
}

export type DiscriminatedHash<D extends string> = Record<
  string,
  Record<D, string>
>;
export type DiscriminatedSchemasHash<
  D extends string,
  T extends DiscriminatedHash<D>
> = {
  [P in keyof T]: yup.ObjectSchema<T[P]>;
};

function oneOfBaseSchema<D extends string, T extends DiscriminatedHash<D>>(
  discriminator: D,
  schemas: DiscriminatedSchemasHash<D, T>
) {
  const discriminatorValues = Object.keys(schemas);
  return yup
    .object({
      [discriminator]: yup.string().oneOf(discriminatorValues).required()
    })
    .default(undefined);
}

export function oneOfSchemas<D extends string, T extends DiscriminatedHash<D>>(
  discriminator: D,
  schemas: DiscriminatedSchemasHash<D, T>
) {
  const base = oneOfBaseSchema(discriminator, schemas);

  return base.when(
    `.${discriminator}`,
    (discriminatorValue: unknown, schema: typeof base) => {
      if (
        typeof discriminatorValue !== "string" ||
        !schemas[discriminatorValue]
      ) {
        return schema;
      }

      return schema.concat(schemas[discriminatorValue]);
    }
  ) as yup.ObjectSchema<T[keyof T] | undefined>;
}

export function arrayOfSchemas<
  D extends string,
  T extends DiscriminatedHash<D>
>(discriminator: D, schemas: DiscriminatedSchemasHash<D, T>) {
  const base = oneOfBaseSchema(discriminator, schemas).required();
  type Base = yup.InferType<typeof base>;

  return yup
    .array()
    .compact((value) => !base.isValidSync(value))
    .of(
      yup.lazy((value) => {
        return schemas[(value as Base)[discriminator]];
      }) as yup.ObjectSchema<T[keyof T]>
    );
}
