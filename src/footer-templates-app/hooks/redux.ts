import {
  shallowEqual,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from "react-redux";

import { Dispatch } from "footer-templates-app/config/store/store";
import { RootState } from "footer-templates-app/domains/rootReducer";

export function useSelector<TSelected>(
  selector: (state: RootState) => TSelected,
  equalityFn: (left: TSelected, right: TSelected) => boolean = shallowEqual
) {
  return useReduxSelector(selector, equalityFn);
}

export function useDispatch() {
  return useReduxDispatch<Dispatch>();
}
