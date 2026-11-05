const fs = require('fs');
const path = require('path');

const SITE = process.cwd();
const allHrefs = new Set();
const internalTargets = new Set();
const missingTargets = [];

function checkFile(filePath) {
  const dir = path.dirname(filePath);
  const rel = path.relative(SITE, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');

  const matches = html.matchAll(/href="([^"]*)"/gi);
  for (const m of matches) {
    const href = m[1];
    allHrefs.add(href);

    if (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#')) {
      const [pathPart, hashPart] = href.split('#');
      if (pathPart) {
        const resolved = path.resolve(dir, pathPart);
        // check if file or directory exists
        const exists = fs.existsSync(resolved);
        if (!exists) {
          missingTargets.push({ from: rel, href, resolved });
        } else {
          // If directory, does it have index.html?
          const stat = fs.statSync(resolved);
          if (stat.isDirectory()) {
            const hasIndex = fs.existsSync(path.join(resolved, 'index.html'));
            if (!hasIndex) {
              missingTargets.push({ from: rel, href, resolved: path.join(resolved, 'index.html') });
            }
          }
        }
      }
    }
  }
}

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') checkFile(p);
  }
}

walk(SITE);
console.log('Total distinct hrefs found:', allHrefs.size);
console.log('Missing targets:', missingTargets.length);
if (missingTargets.length > 0) {
  console.log('Sample missing targets:');
  for (const m of missingTargets.slice(0, 20)) {
    console.log(`  ${m.from} -> ${m.href}`);
  }
}
