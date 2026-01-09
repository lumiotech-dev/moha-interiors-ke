import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { aiService } from '../../services/ai.service';

export default async function aiConsultRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post('/consult', async (request, reply) => {
        const { query, context } = request.body as any;

        if (!query) {
            return reply.status(400).send({ error: 'Inquiry query is required.' });
        }

        try {
            const advice = await aiService.generateDesignAdvice(query, context);

            return {
                success: true,
                advice
            };
        } catch (error: any) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Failed to generate design advice.' });
        }
    });
}
