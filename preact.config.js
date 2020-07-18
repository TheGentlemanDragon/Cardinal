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

  config.resolve.alias.src = path.resolve(__dirname, 'src')
  config.resolve.alias.assets = path.resolve(__dirname, 'src/assets')
  config.resolve.alias.components = path.resolve(__dirname, 'src/components')
  config.resolve.alias.contexts = path.resolve(__dirname, 'src/contexts')
  config.resolve.alias.hooks = path.resolve(__dirname, 'src/hooks')
  config.resolve.alias.lib = path.resolve(__dirname, 'src/lib')
  return config
}
