import { mockJsonapiResource, mockJsonapiResponse } from "../utils/jsonapi";
import { createMockResponsesConfig } from "../utils/miscellaneous";

function createTodo({
  id,
  memo,
  is_completed
}: {
  id: string;
  memo: string;
  is_completed: boolean;
}) {
  return mockJsonapiResource({
    id,
    type: "todo",
    attributes: {
      memo,
      is_completed
    }
  });
}

export const todos = createMockResponsesConfig({
  "/todos": [
    {
      method: "get",
      data: mockJsonapiResponse({
        data: [
          createTodo({
            id: "0",
            memo: "Buy bread",
            is_completed: false
          }),
          createTodo({
            id: "1",
            memo: "Clean up the room",
            is_completed: false
          }),
          createTodo({
            id: "2",
            memo: "Work on side project",
            is_completed: true
          })
        ]
      })
    }
  ]
});
