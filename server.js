const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 55873;
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let parsedUrl;
  try {
    parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  } catch (err) {
    res.statusCode = 400;
    return res.end('Bad Request');
  }

  let pathname = decodeURIComponent(parsedUrl.pathname);
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(ROOT, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Not found
      res.statusCode = 404;
      const notFoundPage = path.join(ROOT, '404.html');
      if (fs.existsSync(notFoundPage)) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return fs.createReadStream(notFoundPage).pipe(res);
      }
      return res.end(`404 Not Found: ${pathname}`);
    }

    if (stats.isDirectory()) {
      // If no trailing slash, redirect with trailing slash (CRITICAL for relative links!)
      if (!pathname.endsWith('/')) {
        res.writeHead(301, {
          'Location': pathname + '/' + (parsedUrl.search || '')
        });
        return res.end();
      }

      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (indexErr, indexStats) => {
        if (indexErr || !indexStats.isFile()) {
          res.statusCode = 404;
          return res.end('Index not found in directory');
        }
        serveFile(indexPath, req, res, indexStats);
      });
    } else if (stats.isFile()) {
      serveFile(filePath, req, res, stats);
    } else {
      res.statusCode = 404;
      res.end('Not found');
    }
  });
});

function serveFile(filePath, req, res, stats) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const fileSize = stats ? stats.size : fs.statSync(filePath).size;
  const range = req.headers ? req.headers.range : null;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize) {
      res.writeHead(416, {
        'Content-Range': `bytes */${fileSize}`
      });
      return res.end();
    }

    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes'
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
