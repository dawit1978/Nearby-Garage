/**
 * Metro configuration for React Native
 
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
// const { getDefaultConfig } = require('@expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts = [...defaultConfig.resolver.assetExts, 'db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'gltf', 'glb'];

// module.exports = defaultConfig;