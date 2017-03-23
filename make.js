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

target.optimize = () => {
  ls('inkscape').forEach(dir => {
    mkdir('-p', `optimized/${dir}`)
    ls(`inkscape/${dir}`).forEach(icon => {
      exec(`node_modules/.bin/svgcleaner --indent=2 --convert-shapes=false inkscape/${dir}/${icon} optimized/${dir}/${icon}`)
    })
    exec(`node_modules/.bin/svgo --pretty --config=svgo.yml optimized/${dir}`)
  })
}

target.defs = () => {
  ls('optimized').forEach(dir => {
    echo(`Writing definition file for ${dir}`)
    const path = `${__dirname}/optimized/${dir}`
    mkdir('-p', `${__dirname}/dist`)
    const file = `${__dirname}/dist/${dir}.svg`
    toDefs(dir, ls(path).map(file => `${path}/${file}`), file)
  })
}

target.doc = () => {
  exec('node ./src/doc.js')
}

target.build = () => {
  target.clean()
  target.optimize()
  target.defs()
  target.assets()
  target.doc()
}

target.serve = () => {
  target.build()
  exec('node src/watch')
}
