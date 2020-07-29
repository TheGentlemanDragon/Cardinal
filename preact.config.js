import path from 'path'
// import { lstatSync, readdirSync } from 'fs'

// const isDirectory = source => lstatSync(source).isDirectory()

// const getDirectories = source =>
//   readdirSync(source)
//     .map(name => path.join(source, name))
//     .filter(isDirectory)

export default config => {
  // getDirectories('src/').map(dir => {
  //   config.resolve.alias[dir.replace('src/', '')] = path.resolve(__dirname, dir)
  // })

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
        },
      },
    ],
  }

  config.resolve.alias.src = path.resolve(__dirname, 'src')
  config.resolve.alias.assets = path.resolve(__dirname, 'src/assets')
  config.resolve.alias.components = path.resolve(__dirname, 'src/components')
  config.resolve.alias.contexts = path.resolve(__dirname, 'src/contexts')
  config.resolve.alias.hooks = path.resolve(__dirname, 'src/hooks')
  config.resolve.alias.lib = path.resolve(__dirname, 'src/lib')
  return config
}
