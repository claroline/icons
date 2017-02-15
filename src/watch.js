const childProcess = require('child_process')
const browserSync = require('browser-sync')

const bs = browserSync.create()

bs.watch('inkscape/**/*.svg').on('change', () => {
  childProcess.execSync('node make build', {stdio: 'inherit'})
  bs.reload()
})

bs.init({
  server: './doc'
})
