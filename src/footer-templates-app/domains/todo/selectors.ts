import { RootState } from "../rootReducer";

export function selectTodos(state: RootState) {
  return Object.values(state.todo.resources);
}
