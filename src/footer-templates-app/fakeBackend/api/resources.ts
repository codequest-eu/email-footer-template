import { mockJsonapiResource } from "../utils/jsonapi";

export const sessionResource = mockJsonapiResource({
  id: "session_uuid",
  type: "session",
  attributes: {},
  relationships: {
    user: {
      data: {
        id: "user_uuid",
        type: "user"
      }
    },
    account: {
      data: {
        id: "account_uuid",
        type: "account"
      }
    }
  }
});

export const userResource = mockJsonapiResource({
  id: "user_uuid",
  type: "user",
  attributes: {
    first_name: "John",
    last_name: "Doe"
  }
});

export const accountResource = mockJsonapiResource({
  id: "account_uuid",
  type: "account",
  attributes: {
    email: "john@doe.com"
  },
  relationships: {
    session: {
      data: {
        id: "session_uuid",
        type: "session"
      }
    },
    user: {
      data: {
        id: "user_uuid",
        type: "user"
      }
    }
  }
});
