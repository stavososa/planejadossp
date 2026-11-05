const fs = require('fs');
const path = require('path');

const SITE = process.cwd();
const deadLinks = [];
const hashLinks = [];
const futureLinks = [];
const brokenTargets = [];

function checkFile(filePath) {
  const rel = path.relative(SITE, filePath).replace(/\\/g, '/');
  const dir = path.dirname(filePath);
  const html = fs.readFileSync(filePath, 'utf8');

  // Find all hrefs
  const matches = html.matchAll(/<a\s+[^>]*href="([^"]*)"[^>]*>/gi);
  for (const m of matches) {
    const fullTag = m[0];
    const href = m[1];

    if (fullTag.includes('data-destino-futuro')) {
      futureLinks.push({ page: rel, tag: fullTag, href });
    }

    if (href === '#' || href === '') {
      deadLinks.push({ page: rel, tag: fullTag });
    } else if (href.startsWith('#')) {
      // check if anchor exists in this page
      const anchor = href.slice(1);
      const idMatch = new RegExp(`id="${anchor}"`, 'i');
      if (!idMatch.test(html)) {
        hashLinks.push({ page: rel, href });
      }
    } else if (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
      // Local link
      const [pathPart] = href.split('#');
      if (pathPart) {
        const target = path.resolve(dir, pathPart);
        const exists = fs.existsSync(target);
        if (!exists) {
          brokenTargets.push({ page: rel, href, target });
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

console.log('Results:');
console.log('Broken local targets:', brokenTargets.length);
if (brokenTargets.length > 0) console.log(brokenTargets.slice(0, 10));

console.log('Empty href or href="#":', deadLinks.length);
if (deadLinks.length > 0) console.log(deadLinks.slice(0, 10));

console.log('Missing anchor targets (#anchor):', hashLinks.length);
if (hashLinks.length > 0) console.log(hashLinks.slice(0, 10));

console.log('Links with data-destino-futuro:', futureLinks.length);
if (futureLinks.length > 0) console.log(futureLinks.slice(0, 5));
