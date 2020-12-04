import { buildQuery, createIncludeList } from "./query";

describe("createIncludeList", () => {
  it("handles flat include object", () => {
    expect(
      createIncludeList({
        some: true,
        other: true,
        different: true
      })
    ).toEqual("some,other,different");
  });

  it("handles nested include objects", () => {
    expect(
      createIncludeList({
        some: true,
        other: true,
        different: {
          nested: true,
          nested2: true
        },
        next: true
      })
    ).toEqual("some,other,different.nested,different.nested2,next");
  });
});

describe("buildQuery", () => {
  it("handles query object", () => {
    expect(
      buildQuery({
        filter: {
          fooBar: "bar foo bar BAR foBAR !@#123 1"
        },
        sort: ["attribute", "otherAttribute", "-camelCase"],
        pagination: {
          number: 52,
          size: 100
        },
        include: {
          some: true
        },
        fields: ["test", "camelCase"]
      })
    ).toEqual(
      "?filter[foo_bar]=bar foo bar BAR foBAR !@#123 1&sort=attribute,other_attribute,-camel_case&include=some&page[number]=52&page[size]=100&fields=test,camel_case"
    );
  });
});
