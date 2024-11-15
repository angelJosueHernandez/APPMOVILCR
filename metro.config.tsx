const { getDefaultConfig } = require("@expo/metro-config");
const { withSentryConfig } = require("@sentry/react-native");

const config = getDefaultConfig(__dirname);

module.exports = withSentryConfig(config);
