import { mockJsonapiResource, mockJsonapiResponse } from "../utils/jsonapi";
import { createMockResponsesConfig } from "../utils/miscellaneous";

import { accountResource, sessionResource, userResource } from "./resources";

export const auth = createMockResponsesConfig({
  "/auth/sessions": [
    {
      method: "get",
      data: mockJsonapiResponse({
        data: sessionResource,
        included: [userResource, accountResource]
      })
    },
    {
      method: "post",
      data: mockJsonapiResponse({
        data: sessionResource,
        included: [userResource, accountResource]
      })
    }
  ],
  "/auth/accounts": [
    {
      method: "post",
      data: mockJsonapiResponse({
        data: accountResource,
        included: [userResource]
      })
    },
    {
      method: "patch",
      data: mockJsonapiResponse({
        data: mockJsonapiResource({
          id: "accounts_uuid",
          type: "accounts",
          attributes: {}
        })
      })
    }
  ],
  "/auth/account_confirmations": [
    {
      method: "post",
      data: mockJsonapiResponse({
        data: mockJsonapiResource({
          id: "account_confirmations_uuid",
          type: "account_confirmations",
          attributes: {}
        })
      })
    }
  ],
  "/auth/password_recoveries": [
    {
      method: "post",
      data: mockJsonapiResponse({
        data: mockJsonapiResource({
          id: "password_recoveries_uuid",
          type: "password_recoveries",
          attributes: {}
        })
      })
    }
  ]
});
