import Fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const server: FastifyInstance = Fastify({
    logger: true
});

import { healthRoutes } from './routes/health';

import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import cors from '@fastify/cors';

server.register(helmet);
server.register(cors, {
    origin: [process.env.ADMIN_URL || 'http://localhost:3000', process.env.PUBLIC_URL || 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
});
server.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute'
});

server.get('/', async (request, reply) => {
    return { status: 'ok', message: 'Moha Interiors API is running' };
});

import aiRenderRoutes from './routes/ai/render';
import aiConsultRoutes from './routes/ai/consult';
import socialRoutes from './routes/social/messages';
import leadRoutes from './routes/leads/score';

const start = async () => {
    try {
        // Register routes
        await server.register(healthRoutes, { prefix: '/v1/health' });
        await server.register(aiRenderRoutes, { prefix: '/v1/ai/render-jobs' });
        await server.register(aiConsultRoutes, { prefix: '/v1/ai' });
        await server.register(socialRoutes, { prefix: '/v1/social' });
        await server.register(leadRoutes, { prefix: '/v1/leads' });

        await server.listen({ port: parseInt(process.env.PORT || '3001'), host: '0.0.0.0' });
        const address = server.server.address();
        const port = typeof address === 'string' ? address : address?.port;
        console.log(`Server listening on port ${port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
