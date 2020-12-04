import { screen, waitFor } from "@testing-library/dom";
import React from "react";

import {
  createFakeBackendMock,
  MirageServer,
  mockResponse
} from "footer-templates-app/fakeBackend/fakeBackendMock";

import { testRender } from "../../utils/testing";

import { TodoList } from "./TodoList";

describe("TodoList", () => {
  let fakeBackendMock: MirageServer;

  beforeEach(async () => {
    fakeBackendMock = await createFakeBackendMock(fakeBackendMock);
  });

  it("should show title", () => {
    testRender({
      jsx: <TodoList />
    });

    expect(screen.getByTestId("title")).toBeInTheDocument();
  });

  describe("when request is pending", () => {
    it("should show six skeleton components", () => {
      testRender({
        jsx: <TodoList />
      });

      const skeletons = screen.queryAllByTestId("skeleton");

      expect(skeletons).toHaveLength(6);
    });
  });

  describe("when request is resolved and list is empty", () => {
    it("should message about empty list", async () => {
      mockResponse(fakeBackendMock)("/todos", {
        method: "get",
        data: {
          data: []
        }
      });

      testRender({
        jsx: <TodoList />
      });

      await waitFor(() =>
        expect(
          screen.getByText("There are no todos yet, please add some!")
        ).toBeVisible()
      );
    });
  });

  describe("when request is resolved and there are some todos", () => {
    it("should show three todo items", async () => {
      testRender({
        jsx: <TodoList />
      });

      await waitFor(() =>
        expect(screen.queryAllByTestId("todo")).toHaveLength(3)
      );
    });
  });

  describe("when request is rejected", () => {
    it("should show error message", async () => {
      mockResponse(fakeBackendMock)("/todos", {
        method: "get",
        status: 400,
        data: {
          data: []
        }
      });

      testRender({
        jsx: <TodoList />
      });

      await waitFor(() =>
        expect(
          screen.getByText("Something went wrong, please try again later")
        ).toBeVisible()
      );
    });
  });
});
