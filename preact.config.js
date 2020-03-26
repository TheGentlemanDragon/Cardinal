import path from 'path'
import { lstatSync, readdirSync } from 'fs'

const isDirectory = source => lstatSync(source).isDirectory()

const getDirectories = source =>
  readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory)

export default config => {
  getDirectories('src/').map(dir => {
    config.resolve.alias[dir.replace('src/', '')] = path.resolve(__dirname, dir)
  })

  config.resolve.alias.src = path.resolve(__dirname, 'src')
  return config
}
