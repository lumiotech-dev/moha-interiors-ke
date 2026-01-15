import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createClient } from '@supabase/supabase-js';
import { aiService } from '../../services/ai.service';

export default async function socialRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    /**
   * Supabase Webhook: Trigger AI analysis for a newly inserted social message
   */
    fastify.post('/webhook/analyze', async (request, reply) => {
        const { record } = request.body as any; // Supabase sends 'record'

        if (!record || !record.id || !record.content) {
            return reply.status(400).send({ error: 'Invalid record data from webhook.' });
        }

        try {
            // 1. Analyze with AI
            const analysis = await aiService.generateSocialResponse(record.content, record.platform);

            // 2. Update the record with AI suggestions
            const { error } = await supabase
                .from('social_messages')
                .update({
                    sentiment_score: analysis.sentiment === 'positive' ? 0.9 : analysis.sentiment === 'negative' ? 0.2 : 0.5,
                    ai_suggested_response: analysis.response
                })
                .eq('id', record.id);

            if (error) throw error;

            return { success: true };
        } catch (error: any) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Failed to analyze social message.' });
        }
    });

    /**
     * Mock Incoming Message (to test the system)
     */
    fastify.post('/webhook/test-incoming', async (request, reply) => {
    });
}
