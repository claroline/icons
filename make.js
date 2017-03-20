require('shelljs/make')

const toDefs = require('./src/toDefs')

target.clean = () => {
  ['dist', 'docs/dist', 'docs/icons', 'optimized'].forEach(dir => {
    mkdir('-p', dir)
    rm('-rf', `${dir}/*`)
  })
}

target.assets = () => {
  cp('node_modules/bootstrap/dist/css/bootstrap.min.css', './docs/bootstrap.min.css')
  cp('-r', './dist', './docs')
}

target.svgo = () => {
  ls('inkscape').forEach(dir => {
    mkdir('-p', `optimized/${dir}`)
    ls(`inkscape/${dir}`).forEach(icon => {
      exec(`node_modules/.bin/svgcleaner --indent=2 inkscape/${dir}/${icon} optimized/${dir}/${icon}`)
    })
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
  target.assets()
  target.doc()
}

target.serve = () => {
  target.build()
  exec('node src/watch')
}
