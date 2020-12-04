import { Action } from "redux";

import { SessionResource } from "footer-templates-app/api/schemas/session";

export interface SessionState {
  resource: SessionResource | null;
}

export type SessionAction = Action<"signedOut">;
