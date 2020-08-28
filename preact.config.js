import path from 'path'

export default config => {
  const { options, ...babelLoaderRule } = config.module.rules[0] // Get the babel rule and options
  options.presets.push('@babel/preset-react', 'linaria/babel') // Push the necessary presets
  config.module.rules[0] = {
    ...babelLoaderRule,
    loader: undefined, // Disable the predefined babel-loader on the rule
    use: [
      {
        loader: 'babel-loader',
        options,
      },
      {
        loader: 'linaria/loader',
        options: {
          babelOptions: options, // Pass the current babel options to linaria's babel instance
          displayName: true,
        },
      },
    ],
  }

  // Module import aliases would go here
  // config.resolve.alias.src = path.resolve(__dirname, 'src')

  return config
}
