/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

import { arrayOfSchemas, oneOfSchemas } from "./schema";

describe("oneOfSchemas", () => {
  const schema = oneOfSchemas("type", {
    foo: yup
      .object({
        type: yup.string().oneOf(["foo"]).required(),
        foo: yup.string().required()
      })
      .defined(),
    bar: yup
      .object({
        type: yup.string().oneOf(["bar"]).required(),
        bar: yup.number().required().min(1)
      })
      .defined()
  });

  it("is not required by default", () => {
    expect(schema.isValidSync(undefined)).toBe(true);
    expect(schema.required().isValidSync(undefined)).toBe(false);
  });

  it("accepts any of the specified schemas", () => {
    expect(schema.isValidSync({ type: "foo", foo: "hello" })).toBe(true);
    expect(schema.isValidSync({ type: "bar", bar: 1 })).toBe(true);
  });

  it("throws on invalid discriminator", () => {
    expect(schema.isValidSync({ type: "not foo", foo: "hello" })).toBe(false);
  });

  it("throws on invalid schemas", () => {
    expect(schema.isValidSync({ type: "foo" })).toBe(false);
    expect(schema.isValidSync({ type: "foo", foo: "" })).toBe(false);
    expect(schema.isValidSync({ type: "bar" })).toBe(false);
    expect(schema.isValidSync({ type: "bar", bar: 0 })).toBe(false);
  });

  it.skip("supports recursive schemas", () => {
    interface Node {
      type: "foo";
      child?: Node;
    }

    const node: yup.ObjectSchema<Node | undefined> = oneOfSchemas("type", {
      foo: yup
        .object({
          type: yup.string().oneOf(["foo"]).required(),
          child: yup.lazy(() => node)
        })
        .defined()
    });

    const path = (...types: Node["type"][]) => {
      const root: Node = { type: types[0] };
      let leaf = root;

      types.slice(1).forEach((type) => {
        leaf.child = { type };
        leaf = leaf.child;
      });

      return root;
    };

    expect(node.isValidSync(path("foo"))).toBe(true);
    expect(node.isValidSync(path("bar" as any))).toBe(false);

    expect(node.isValidSync(path("foo", "foo"))).toBe(true);
    expect(node.isValidSync(path("foo", "bar" as any))).toBe(false);

    expect(node.isValidSync(path("foo", "foo", "foo"))).toBe(true);
    // eslint-disable-next-line no-warning-comments
    // TODO: figure out how to make this pass:
    expect(node.isValidSync(path("foo", "foo", "baz" as any))).toBe(false);
  });
});

describe("arrayOfSchemas", () => {
  const schema = arrayOfSchemas("type", {
    foo: yup
      .object({
        type: yup.string().oneOf(["foo"]).required(),
        foo: yup.string().required()
      })
      .required(),
    bar: yup
      .object({
        type: yup.string().oneOf(["bar"]).required(),
        bar: yup.number().required().min(1)
      })
      .required()
  }).defined();

  it("accepts any of the specified schemas", () => {
    expect(
      schema.isValidSync([
        { type: "foo", foo: "hello" },
        { type: "bar", bar: 1 }
      ])
    ).toBe(true);
  });

  it("ignores items with unexpected discriminators", () => {
    expect(
      schema.validateSync([
        { type: "foo", foo: "hello" },
        { type: "unknown" },
        { type: "bar", bar: 1 }
      ])
    ).toEqual([
      { type: "foo", foo: "hello" },
      { type: "bar", bar: 1 }
    ]);
  });

  it("throws on invalid items", () => {
    expect(
      schema.isValidSync([
        { type: "foo", foo: "" },
        { type: "bar", bar: 1 }
      ])
    ).toBe(false);
    expect(
      schema.isValidSync([
        { type: "foo", foo: "hello" },
        { type: "bar", bar: 0 }
      ])
    ).toBe(false);
  });
});
