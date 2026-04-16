module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
        modules: false, // conservar ESM — Jest usa --experimental-vm-modules
      },
    ],
  ],
}
