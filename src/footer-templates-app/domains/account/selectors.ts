import { RootState } from "../rootReducer";

export function selectCurrentAccount(state: RootState) {
  const sessionResource = state.session.resource;
  const sessionAccount = sessionResource?.relationships.account;
  const sessionAccountId = sessionAccount?.data.id;

  if (sessionAccountId) {
    return state.account.resources[sessionAccountId];
  }
}
