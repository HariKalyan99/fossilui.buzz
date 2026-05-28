#!/usr/bin/env node
/**
 * Generate favicon.svg and PNG icons from the artwork embedded in public/Rex.svg.
 * Rex.svg’s viewBox includes empty margin; rasterizing the file as-is crops the logo.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const rexPath = join(publicDir, 'Rex.svg')
const faviconSvgPath = join(publicDir, 'favicon.svg')

const SIZES = [
  { name: 'favicon-32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
]

function extractEmbeddedPng(svgPath) {
  const svg = readFileSync(svgPath, 'utf8')
  const match = svg.match(/xlink:href="(data:image\/png;base64,[^"]+)"/)
  if (!match) {
    throw new Error('No embedded PNG found in Rex.svg')
  }
  return Buffer.from(match[1].replace('data:image/png;base64,', ''), 'base64')
}

function rasterizeSquare(sourcePng, size, outPath) {
  execFileSync(
    'convert',
    [
      sourcePng,
      '-fuzz',
      '1%',
      '-trim',
      '+repage',
      '-resize',
      `${size}x${size}`,
      '-background',
      'white',
      '-gravity',
      'center',
      '-extent',
      `${size}x${size}`,
      outPath,
    ],
    { stdio: 'inherit' },
  )
}

function writeFaviconSvg(pngPath, outPath) {
  const base64 = readFileSync(pngPath).toString('base64')
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"',
    ' viewBox="0 0 512 512" width="512" height="512">',
    `<image width="512" height="512" xlink:href="data:image/png;base64,${base64}"/>`,
    '</svg>',
  ].join('')
  writeFileSync(outPath, svg)
}

const tmpDir = join(root, 'node_modules/.cache/icon-gen')
mkdirSync(tmpDir, { recursive: true })
const sourcePng = join(tmpDir, 'rex-source.png')
writeFileSync(sourcePng, extractEmbeddedPng(rexPath))
console.log('Extracted artwork from Rex.svg')

for (const { name, size } of SIZES) {
  const outPath = join(publicDir, name)
  rasterizeSquare(sourcePng, size, outPath)
  console.log(`Wrote public/${name} (${size}×${size})`)
}

const faviconSvgSource = join(publicDir, 'icon-192.png')
writeFaviconSvg(faviconSvgSource, faviconSvgPath)
console.log('Wrote public/favicon.svg')

rmSync(tmpDir, { recursive: true, force: true })
console.log('Done.')
