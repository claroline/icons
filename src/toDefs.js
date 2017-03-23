const fs = require('fs')
const os = require('os')
const path = require('path')
const svgToJs = require('svgo/lib/svgo/svg2js')
const jsToSvg = require('svgo/lib/svgo/js2svg')

const template = symbols =>
`<svg xmlns="http://www.w3.org/2000/svg">
    <defs>
${symbols}
    </defs>
</svg>
`

function toDefs(domain, files, target) {
  var symbols = ''

  files.forEach(file => {
    const parsed = path.parse(file)
    svgToJs(fs.readFileSync(file, 'utf8'), ast => {
      ast.elem = '#element'
      ast.content[0].elem = 'symbol'
      ast.content[0].local = 'symbol'
      ast.content[0].attrs.id = {
        name: 'id',
        value: `icon-${domain}-${parsed.name}`,
        prefix: '',
        local: 'id'
      }
      delete ast.content[0].attrs.xmlns
      const symbol = jsToSvg(ast, {pretty: true}).data
      symbols += symbol
        .split(os.EOL)
        .filter(line => line)
        .map(line => '        ' + line)
        .join(os.EOL)
        .concat(os.EOL)
    })
  })

  fs.writeFileSync(target, template(symbols))
}

module.exports = toDefs
