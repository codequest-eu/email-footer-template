// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";

process.env.DEBUG_PRINT_LIMIT = "0";
process.env.REACT_APP_API_URL = "http://localhost:4000";

afterEach(async () => {
  await cleanup();
});
