require('shelljs/make')

const toDefs = require('./src/toDefs')

target.clean = () => {
  rm('-rf', `${__dirname}/optimized/*`, `${__dirname}/dist/*`)
}

target.svgo = () => {
  ls('inkscape').forEach(dir => {
    exec(`./node_modules/.bin/svgo --pretty -f inkscape/${dir} -o optimized/${dir}`)
  })
}

target.defs = () => {
  ls('optimized').forEach(dir => {
    echo(`Writing definition file for ${dir}`)
    const path = `${__dirname}/optimized/${dir}`
    mkdir('-p', `${__dirname}/dist`)
    toDefs(dir, ls(path).map(file => `${path}/${file}`), `${__dirname}/dist/${dir}.svg`)
  })
}

target.doc = () => {
  exec('node ./src/doc.js')
}

target.build = () => {
  target.clean()
  target.svgo()
  target.defs()
  target.doc()
}

target.serve = () => {
  target.build()
  exec('node src/watch')
}
