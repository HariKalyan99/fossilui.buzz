#!/usr/bin/env node
/**
 * Render public/Rex.svg into the transparent PNG logos and icons the site serves.
 *
 * Rex.svg builds the mark from embedded rasters cut out with masks and filters, so it
 * has to go through a real browser: extracting the embedded PNG loses the masks
 * (black corners), and iOS WebKit paints the SVG itself late or as a black square.
 * Requires google-chrome (or set CHROME_BIN) and ImageMagick `convert`.
 */
import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const tmpDir = join(root, 'node_modules/.cache/icon-gen')
const chrome = process.env.CHROME_BIN ?? 'google-chrome'
const MASTER = 1024

const TRANSPARENT = [
  { name: 'rex-1024.png', size: 1024 },
  { name: 'rex-256.png', size: 256 },
  { name: 'rex-128.png', size: 128 },
  { name: 'icon-512.png', size: 512 },
  { name: 'icon-192.png', size: 192 },
  { name: 'favicon-32.png', size: 32 },
]

mkdirSync(tmpDir, { recursive: true })
copyFileSync(join(publicDir, 'Rex.svg'), join(tmpDir, 'Rex.svg'))
writeFileSync(
  join(tmpDir, 'render.html'),
  `<!doctype html><style>html,body{margin:0;background:transparent}img{display:block;width:${MASTER}px;height:${MASTER}px}</style><img src="Rex.svg">`,
)

const master = join(tmpDir, 'rex-master.png')
execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--default-background-color=00000000',
  '--force-device-scale-factor=1',
  `--window-size=${MASTER},${MASTER}`,
  '--virtual-time-budget=3000',
  `--screenshot=${master}`,
  `file://${join(tmpDir, 'render.html')}`,
])
console.log('Rendered Rex.svg with headless Chrome')

for (const { name, size } of TRANSPARENT) {
  execFileSync('convert', [master, '-filter', 'Lanczos', '-resize', `${size}x${size}`, '-strip', join(publicDir, name)])
  console.log(`Wrote public/${name}`)
}

// iOS home-screen icons can't be transparent.
execFileSync('convert', [
  master, '-filter', 'Lanczos', '-resize', '160x160',
  '-background', 'white', '-gravity', 'center', '-extent', '180x180', '-strip',
  join(publicDir, 'apple-touch-icon.png'),
])
console.log('Wrote public/apple-touch-icon.png')

const icon192 = readFileSync(join(publicDir, 'icon-192.png')).toString('base64')
writeFileSync(
  join(publicDir, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 192 192" width="192" height="192"><image width="192" height="192" xlink:href="data:image/png;base64,${icon192}"/></svg>`,
)
console.log('Wrote public/favicon.svg')
