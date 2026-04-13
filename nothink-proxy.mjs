// Tiny proxy to disable Qwen3.5 thinking mode
// Intercepts OpenAI API requests and adds chat_template_kwargs: {enable_thinking: false}
import http from 'http';
import https from 'https';
import { URL } from 'url';

const UPSTREAM = process.env.QWEN_UPSTREAM_URL || 'https://5i8frj7ann99bbw9gzpprvzj2esugg39hxbb4unypskq.node.k8s.prd.nos.ci';
const PORT = 5001;

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    // For chat completions, inject enable_thinking: false
    if (req.url.includes('/chat/completions') && body) {
      try {
        const parsed = JSON.parse(body);
        parsed.chat_template_kwargs = { enable_thinking: false };
        if (!parsed.max_tokens) parsed.max_tokens = 4096;
        body = JSON.stringify(parsed);
      } catch (e) { /* pass through */ }
    }

    const upstream = new URL(req.url, UPSTREAM);
    const options = {
      hostname: upstream.hostname,
      port: 443,
      path: upstream.pathname + upstream.search,
      method: req.method,
      headers: {
        ...req.headers,
        host: upstream.hostname,
        'content-length': Buffer.byteLength(body)
      }
    };

    const proxy = https.request(options, (upRes) => {
      res.writeHead(upRes.statusCode, upRes.headers);
      upRes.pipe(res);
    });
    proxy.on('error', (e) => {
      res.writeHead(502);
      res.end('Proxy error: ' + e.message);
    });
    if (body) proxy.write(body);
    proxy.end();
  });
});

server.listen(PORT, () => console.log(`[nothink-proxy] Listening on port ${PORT}, upstream: ${UPSTREAM}`));
