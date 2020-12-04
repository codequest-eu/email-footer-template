import qs, { IParseOptions } from "qs";
import * as yup from "yup";

export interface PaginationBase {
  number: number;
  size: number;
}

export function parseQuery<T extends PaginationBase>(
  query: string,
  options: Omit<
    IParseOptions,
    "strictNullHandling" | "ignoreQueryPrefix" | "decoder"
  > & {
    schema: yup.ObjectSchema<T>;
    defaults: T;
  }
) {
  const { schema, defaults } = options;

  const parsedQuery = qs.parse(query, {
    strictNullHandling: true,
    ignoreQueryPrefix: true,
    decoder: (str, defaultDecoder, charset) => {
      const isStrNumber = /^(\d+|\d*\.\d+)$/.test(str);

      if (isStrNumber) {
        return parseFloat(str);
      }

      const primitives = {
        true: true,
        false: false,
        null: null,
        undefined
      };

      if (str in primitives) {
        return primitives[str as keyof typeof primitives];
      } else {
        return defaultDecoder(str, defaultDecoder, charset);
      }
    },
    ...options
  });

  try {
    return schema.noUnknown().validateSync(parsedQuery, { strict: true });
  } catch (err) {
    return defaults;
  }
}
