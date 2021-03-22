/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    /** Application API URL */
    REACT_APP_API_URL?: string;

    /** <title> content */
    REACT_APP_TITLE?: string;

    /** Path prefix, useful when the app is hosted from a directory, eg. /site */
    REACT_APP_BASENAME?: string;
  }
}
