## Guide for adjusting imports

We need to adjust some files to make a new absolute import path available everywhere in the application.

### `.storybook/main.js`

```js
module.exports = {
    ...
    webpackFinal: async (config) => {
        ...
        config.resolve.alias = {
            ...
            "@/name": path.resolve(__dirname, "../directory"),
        };
        ...
    },
};
```

### `jest.config.js`

```js
module.exports = {
    ...
    moduleNameMapper: {
        ...
        config.resolve.alias = {
            ...
            "@/name/(.*)": "<rootDir>/directory/$1",,
        };
        ...
    },
};
```
