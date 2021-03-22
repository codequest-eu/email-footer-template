## Directory structure

- `./api` API requests definitions 
- `./components` reusable React components, scene or page specific components shouldn't be there
- `./config` configuration files for locales, store, tests setup and other stuff
- `./fakeBackend` [module that allows for creating API responses' mocks](./fakeBackend/README.md)
- `./hooks` reusable React hooks, scene or page specific hooks shouldn't be there
- `./scenes` more complex React components composed from many smaller components
- `./stores` globally available application state stores
- `./types` global type declarations
- `./utils` simple functions/modules which are not strictly connected to anything from the above. Use this directory for functionalities, for which you would create a separate NPM package