import { TodoResource } from "footer-templates-app/api/schemas/todo";

export interface TodoState {
  resources: Record<string, TodoResource>;
}
