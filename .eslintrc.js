module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "react-native"
    ],
    "parser": "babel-eslint",
    "rules": {
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 2,
        "react-native/no-color-literals": 2,
        "react/jsx-indent": [2, 'tab'],
        "react/jsx-indent-props": [2, 'tab'],
        "indent": ["error", 'tab'],
        "no-tabs": 0,
        "no-use-before-define": 0,
    }
};