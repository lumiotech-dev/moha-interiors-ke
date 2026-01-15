import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createClient } from '@supabase/supabase-js';
import { aiService } from '../../services/ai.service';

export default async function leadRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    /**
     * Automations: Score a new lead
     */
    fastify.post('/:leadId/score', async (request, reply) => {
        const { leadId } = request.params as any;

        try {
            // 1. Fetch lead data
            const { data: lead, error: fetchError } = await supabase
                .from('leads')
                .select('*')
                .eq('id', leadId)
                .single();

            if (fetchError || !lead) throw fetchError || new Error('Lead not found');

            // 2. Score with AI
            const scoreData = await aiService.scoreLead({
                name: lead.name,
                email: lead.email,
                message: lead.notes || (lead as any).message || "" // Adapt to schema
            });

            // 3. Store result
            const { data: scoring, error: insertError } = await supabase
                .from('lead_scoring')
                .insert([{
                    lead_id: leadId,
                    score: scoreData.score,
                    factors: { reasoning: scoreData.reasoning, category: scoreData.category },
                    model_version: 'gemini-1.5-flash'
                }])
                .select()
                .single();

            if (insertError) throw insertError;

            return {
                success: true,
                scoring
            };

        } catch (error: any) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Failed to score lead.' });
        }
    });
}
