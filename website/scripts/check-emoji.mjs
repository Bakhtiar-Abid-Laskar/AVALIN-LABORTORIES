#!/usr/bin/env node
/**
 * check-emoji.mjs — CI emoji guard — Avalin Laboratories
 *
 * Scans source directories for emoji characters.
 * Exits with code 1 (fails CI) if any are found outside node_modules.
 *
 * Usage:
 *   node scripts/check-emoji.mjs
 *
 * Configured to scan:
 *   app/     components/    content/    lib/
 *
 * Allowed exceptions (test fixtures):
 *   None — all emoji are prohibited in source files.
 *
 * NOTE: ⚠ (U+26A0 WARNING SIGN) used in who-we-are/page.tsx:92
 * is flagged as a specific violation with instructions to remove it.
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Directories to scan
const SCAN_DIRS = ['app', 'components', 'content', 'lib']
// File extensions to check
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mts', '.mjs'])

// Emoji regex — covers common emoji ranges
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|\u{26A0}|\u{2764}|\u{1F004}|\u{1F0CF}/gu

let violations = 0

function scanFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  lines.forEach((line, index) => {
    const matches = [...line.matchAll(EMOJI_RE)]
    if (matches.length > 0) {
      const found = matches.map((m) => m[0]).join(' ')
      const rel = filePath.replace(ROOT + '/', '').replace(ROOT + '\\', '')
      console.error(`\u274C  ${rel}:${index + 1}  →  ${found}`)
      console.error(`   Line: ${line.trim().slice(0, 120)}`)
      violations++
    }
  })
}

function scanDir(dir) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return
  }
  for (const entry of entries) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      if (entry === 'node_modules' || entry === '.next') continue
      scanDir(full)
    } else if (EXTENSIONS.has(extname(entry))) {
      scanFile(full)
    }
  }
}

console.log('Scanning for emoji in source files...\n')

for (const dir of SCAN_DIRS) {
  scanDir(join(ROOT, dir))
}

if (violations === 0) {
  console.log('\u2705  No emoji found in source files.')
  process.exit(0)
} else {
  console.error(`\n\u274C  Found ${violations} emoji violation(s).`)
  console.error('   Remove all emoji from source files. Use Icon components instead.')
  console.error('   See components/ui/Icon.tsx and lib/icons/registry.tsx')
  process.exit(1)
}
