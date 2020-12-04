import { RootState } from "../rootReducer";

export function selectIsAuthenticated(state: RootState) {
  return !!state.session.resource;
}
