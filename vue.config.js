module.exports = {
  pwa: {
    name: 'digiTask',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
  },
};
