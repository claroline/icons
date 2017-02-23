const fs = require('fs')
const path = require('path')
const dot = require('dot')

const srcDir = path.resolve(__dirname, '../inkscape')
const tplDir = path.resolve(__dirname, '../templates')
const tgtDir = path.resolve(__dirname, '../docs')

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
    const content = templates.icon({icon, domain})
    fs.writeFileSync(tgt, content)
  })
})

// generate an icon index
console.log('Generating index')
fs.writeFileSync(`${tgtDir}/index.html`, templates.index({meta}))

// generate panels example
console.log('Generating panels example')
fs.writeFileSync(`${tgtDir}/panels.html`, templates.panels({meta}))

// generate cards example
console.log('Generating cards example')
fs.writeFileSync(`${tgtDir}/cards.html`, templates.cards({meta}))
