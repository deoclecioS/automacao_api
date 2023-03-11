// npm install -D babel-jest @babel/preset-env
// babel.config.js

module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
};  