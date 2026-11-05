const fs = require('fs');
const path = require('path');

const SITE = process.cwd();
let pagesWithoutContato = 0;

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') {
      const html = fs.readFileSync(p, 'utf8');
      if (html.includes('href="#contato"') && !html.includes('id="contato"')) {
        pagesWithoutContato++;
        console.log('No #contato in:', path.relative(SITE, p));
      }
    }
  }
}
walk(SITE);
console.log('Total pages with href="#contato" but no id="contato":', pagesWithoutContato);
