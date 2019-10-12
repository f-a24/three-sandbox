module.exports = ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(fs|vs|glsl|frag|vert)$/,
      loader: ['raw-loader', 'glslify-loader'],
      exclude: /node_modules/
    }
  );
  config.resolve.extensions.push('.ts', '.tsx');
  config.node = { fs: 'empty' };

  return config;
};
