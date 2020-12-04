import * as yup from "yup";

import { jsonapi } from "./api";
import { accountResourceSchema } from "./schemas/account";
import { sessionResourceSchema } from "./schemas/session";
import { userResourceSchema } from "./schemas/user";
import { included } from "./schemas/utils";

export function signIn({
  email,
  password
}: {
  email: string;
  password: string;
}) {
  return jsonapi.create({
    path: "auth/sessions",
    type: "session",
    responseSchema: yup
      .object({
        data: sessionResourceSchema,
        included: included({
          user: userResourceSchema,
          account: accountResourceSchema
        })
      })
      .required(),
    attributes: {
      email,
      password
    }
  });
}

export function signUp(payload: { email: string; password: string }) {
  return jsonapi.create({
    type: "accounts",
    path: "auth/accounts",
    attributes: payload,
    responseSchema: yup
      .object({
        data: accountResourceSchema,
        included: included({
          user: userResourceSchema
        })
      })
      .required()
  });
}

export function confirmAccount(payload: { token: string }) {
  return jsonapi.create({
    type: "account_confirmations",
    path: "auth/account_confirmations",
    attributes: {},
    responseSchema: yup
      .object({
        data: yup
          .object({
            id: yup.string().required(),
            type: yup.string().required(),
            attributes: yup.object({}).required()
          })
          .required()
      })
      .required(),
    axiosConfig: {
      headers: {
        Authorization: `Bearer ${payload.token}`
      }
    }
  });
}

export function forgotPassword(payload: { email: string }) {
  return jsonapi.create({
    type: "password_recoveries",
    path: "auth/password_recoveries",
    attributes: payload,
    responseSchema: yup
      .object({
        data: yup
          .object({
            id: yup.string().required(),
            type: yup.string().required(),
            attributes: yup.object({}).required()
          })
          .required()
      })
      .required()
  });
}

export function resetPassword(payload: { token: string; password: string }) {
  return jsonapi.update({
    type: "accounts",
    path: "auth/accounts",
    attributes: {
      password: payload.password
    },
    responseSchema: yup
      .object({
        data: yup
          .object({
            id: yup.string().required(),
            type: yup.string().required(),
            attributes: yup.object({}).required()
          })
          .required()
      })
      .required(),
    axiosConfig: {
      headers: {
        Authorization: `Bearer ${payload.token}`
      }
    }
  });
}
