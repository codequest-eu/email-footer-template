import { UserResource } from "footer-templates-app/api/schemas/user";

export interface UserState {
  resources: Record<string, UserResource>;
}
