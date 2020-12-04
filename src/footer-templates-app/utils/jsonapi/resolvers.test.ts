/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { resolveRelations } from "./resolvers";
import { Resource } from "./types";

describe("resolveRelations", () => {
  describe("to-one relations", () => {
    it("resolves to full objects when found", () => {
      const book: Resource = {
        type: "book",
        id: "1",
        attributes: {},
        relationships: {
          author: {
            data: { type: "user", id: "1" }
          }
        }
      };

      const author: Resource = {
        type: "user",
        id: "1",
        attributes: {}
      };

      resolveRelations([book, author]);
      expect(book.relationships!.author.data).toBe(author);
    });

    it("leaves references when not found", () => {
      const book: Resource = {
        type: "book",
        id: "1",
        attributes: {},
        relationships: {
          author: {
            data: { type: "user", id: "1" }
          }
        }
      };

      resolveRelations([book]);
      expect(book.relationships!.author.data).toEqual({
        type: "user",
        id: "1"
      });
    });

    it("handles circular references", () => {
      const book: Resource = {
        type: "book",
        id: "1",
        attributes: {},
        relationships: {
          author: {
            data: { type: "user", id: "1" }
          }
        }
      };

      const author: Resource = {
        type: "user",
        id: "1",
        attributes: {},
        relationships: {
          firstBook: {
            data: { type: "book", id: "1" }
          }
        }
      };

      resolveRelations([book, author]);
      expect(book.relationships!.author.data).toBe(author);
      expect(author.relationships!.firstBook.data).toBe(book);
    });
  });

  describe("to-many relations", () => {
    it("resolves to full objects when found", () => {
      const book: Resource = {
        type: "book",
        id: "1",
        attributes: {},
        relationships: {
          authors: {
            data: [
              { type: "user", id: "1" },
              { type: "user", id: "2" }
            ]
          }
        }
      };

      const author1: Resource = {
        type: "user",
        id: "1",
        attributes: {}
      };
      const author2: Resource = {
        type: "user",
        id: "2",
        attributes: {}
      };

      resolveRelations([book, author1, author2]);
      expect(book.relationships!.authors.data).toEqual([author1, author2]);
    });

    it("leaves references when not found", () => {
      const book: Resource = {
        type: "book",
        id: "1",
        attributes: {},
        relationships: {
          authors: {
            data: [
              { type: "user", id: "1" },
              { type: "user", id: "2" }
            ]
          }
        }
      };

      const author1: Resource = {
        type: "user",
        id: "1",
        attributes: {}
      };

      resolveRelations([book, author1]);
      expect(book.relationships!.authors.data).toEqual([
        author1,
        { type: "user", id: "2" }
      ]);
    });

    it("handles circular references", () => {
      const book: Resource = {
        type: "book",
        id: "1",
        attributes: {},
        relationships: {
          authors: {
            data: [
              { type: "user", id: "1" },
              { type: "user", id: "2" }
            ]
          }
        }
      };

      const author1: Resource = {
        type: "user",
        id: "1",
        attributes: {},
        relationships: {
          books: {
            data: [{ type: "book", id: "1" }]
          }
        }
      };

      const author2: Resource = {
        type: "user",
        id: "2",
        attributes: {},
        relationships: {
          books: {
            data: [{ type: "book", id: "1" }]
          }
        }
      };

      resolveRelations([book, author1, author2]);
      expect(book.relationships!.authors.data).toEqual([author1, author2]);
      expect(author1.relationships!.books.data).toEqual([book]);
      expect(author2.relationships!.books.data).toEqual([book]);
    });
  });
});
