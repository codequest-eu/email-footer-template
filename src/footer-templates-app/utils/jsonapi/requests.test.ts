import axios from "axios";
import sinon from "sinon";
import * as yup from "yup";

import { createResource } from "./requests";

const sandbox = sinon.createSandbox();

describe("createResource", () => {
  describe("basic request", () => {
    const axiosPost = sandbox.stub(axios, "post").resolves({
      data: {
        data: {
          id: "123",
          type: "some_resource",
          attributes: {
            test: "foo bar"
          }
        }
      }
    });

    function callCreateResource() {
      return createResource({
        path: "some_resources",
        type: "some_resources",
        responseSchema: yup
          .object({
            data: yup
              .object({
                id: yup.string().required(),
                type: yup.string().required(),
                attributes: yup
                  .object({
                    test: yup.string()
                  })
                  .required()
              })
              .required()
          })
          .required(),
        attributes: {
          foo: "bar"
        },
        relationships: {
          someRelation: {
            id: "1",
            type: "other_resources"
          }
        }
      });
    }

    it("calls axios method with proper arguments", async () => {
      await callCreateResource();
      expect(
        axiosPost.calledWith("some_resources", {
          data: {
            type: "some_resources",
            attributes: { foo: "bar" },
            relationships: {
              someRelation: {
                data: {
                  id: "1",
                  type: "other_resources"
                }
              }
            }
          }
        })
      ).toEqual(true);
    });

    it("returns formatted response", async () => {
      const response = await callCreateResource();
      expect(response).toEqual({
        data: {
          attributes: { test: "foo bar" },
          id: "123",
          type: "some_resource"
        }
      });
    });
  });
});
