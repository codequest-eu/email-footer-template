import { AccountResource } from "footer-templates-app/api/schemas/account";

export interface AccountState {
  resources: Record<string, AccountResource>;
}
