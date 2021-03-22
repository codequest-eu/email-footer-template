import pickBy from "lodash/pickBy";

export function sleepPromise(timeMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  });
}

export function pickNonNullable<T extends UnknownRecord>(object: T) {
  return pickBy(object, (value) => value !== null && value !== undefined);
}
