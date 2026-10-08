import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { apiRoutes } from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info'
  }
});

await fastify.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

await fastify.register(sensible);

fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error({ err: error, url: request.url }, 'Unhandled API error');

  if (reply.sent) {
    return;
  }

  const statusCode =
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof error.statusCode === 'number' &&
    error.statusCode >= 400
      ? error.statusCode
      : 500;
  const message = error instanceof Error ? error.message : 'Unknown server error';

  reply.status(statusCode).send({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message:
        process.env.NODE_ENV === 'production'
          ? 'The server could not complete this request.'
          : message,
    },
  });
});

// Register API Routes
await fastify.register(apiRoutes, { prefix: '/api' });

// Health check endpoint
fastify.get('/api/health', async () => {
  return {
    status: 'healthy',
    service: 'BharatVeda Heritage Platform API',
    timestamp: new Date().toISOString()
  };
});

// Serve frontend static build if dist directory exists
const distPath = path.resolve(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  await fastify.register(fastifyStatic, {
    root: distPath,
    prefix: '/',
    wildcard: false,
  });

  // SPA fallback for client-side routing
  fastify.setNotFoundHandler((request, reply) => {
    if (request.url.startsWith('/api')) {
      reply.status(404).send({
        success: false,
        error: {
          code: 'API_NOT_FOUND',
          message: `The requested API route '${request.url}' does not exist.`
        }
      });
    } else {
      reply.sendFile('index.html');
    }
  });
}

const port = Number(process.env.PORT) || 3001;

const start = async () => {
  try {
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 BharatVeda Full-Stack Platform listening on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
