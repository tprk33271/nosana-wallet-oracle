// Nothink Proxy - Disables Qwen3.5 thinking mode for ElizaOS
// Adds chat_template_kwargs: {enable_thinking: false} to all chat completion requests
import http from 'http';
import https from 'https';

const UPSTREAM_HOST = '5i8frj7ann99bbw9gzpprvzj2esugg39hxbb4unypskq.node.k8s.prd.nos.ci';
const PORT = 5001;

const server = http.createServer((req, res) => {
  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', () => {
    let body = Buffer.concat(chunks).toString();

    // For chat completions, inject enable_thinking: false
    if (req.method === 'POST' && req.url.includes('/chat/completions')) {
      try {
        const parsed = JSON.parse(body);
        parsed.chat_template_kwargs = { enable_thinking: false };
        // Force non-streaming for reliability
        parsed.stream = false;
        if (!parsed.max_tokens || parsed.max_tokens < 2048) {
          parsed.max_tokens = 4096;
        }
        body = JSON.stringify(parsed);
        console.log('[nothink-proxy] Patched request: thinking=off, stream=false, max_tokens=' + parsed.max_tokens);
      } catch (e) {
        console.log('[nothink-proxy] JSON parse error:', e.message);
      }
    }

    const options = {
      hostname: UPSTREAM_HOST,
      port: 443,
      path: req.url,
      method: req.method,
      headers: {
        'content-type': 'application/json',
        'authorization': req.headers.authorization || 'Bearer nosana',
        'content-length': Buffer.byteLength(body),
        'accept': 'application/json'
      }
    };

    const proxyReq = https.request(options, (proxyRes) => {
      const respChunks = [];
      proxyRes.on('data', chunk => respChunks.push(chunk));
      proxyRes.on('end', () => {
        const respBody = Buffer.concat(respChunks);
        console.log('[nothink-proxy] Response status:', proxyRes.statusCode, 'length:', respBody.length);
        res.writeHead(proxyRes.statusCode, {
          'content-type': 'application/json',
          'content-length': respBody.length
        });
        res.end(respBody);
      });
    });

    proxyReq.on('error', (e) => {
      console.error('[nothink-proxy] Upstream error:', e.message);
      res.writeHead(502, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: { message: 'Proxy upstream error: ' + e.message } }));
    });

    proxyReq.write(body);
    proxyReq.end();
  });
});

server.listen(PORT, () => {
  console.log(`[nothink-proxy] Running on port ${PORT}`);
  console.log(`[nothink-proxy] Upstream: ${UPSTREAM_HOST}`);
  console.log(`[nothink-proxy] All chat completions will have thinking DISABLED`);
});
