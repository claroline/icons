const fs = require('fs')
const path = require('path')
const dot = require('dot')

const srcDir = path.resolve(__dirname, '../inkscape')
const tplDir = path.resolve(__dirname, '../templates')
const tgtDir = path.resolve(__dirname, '../doc')

dot.templateSettings.strip = false

const domains = fs.readdirSync(srcDir)
const templates = dot.process({ path: tplDir})

// collect metadata about icons
const meta = domains.reduce((acc, domain) => {
  acc[domain] = fs
    .readdirSync(`${srcDir}/${domain}`)
    .map(file => path.parse(file).name)
  return acc
}, {})

// generate individual icon doc files
Object.keys(meta).forEach(domain => {
  meta[domain].forEach(icon => {
    const tgt = `${tgtDir}/icons/${domain}-${icon}.html`
    console.log('Generating icon file', tgt)
    const content = templates.icon({name: icon})
    fs.writeFileSync(tgt, content)
  })
})

// generate an icon index
console.log('Generating index')
const tgt = `${tgtDir}/index.html`
fs.writeFileSync(tgt, templates.index({meta}))
