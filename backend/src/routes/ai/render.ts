import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createClient } from '@supabase/supabase-js';
import { aiService } from '../../services/ai.service';

export default async function aiRenderRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    fastify.post('/render', async (request, reply) => {
        const { prompt, projectId, userId } = request.body as any;

        try {
            // 1. Expand the prompt with AI
            const expandedPrompt = await aiService.expandRenderPrompt(prompt);

            // 2. Log the request to Supabase
            const { data: renderReq, error: insertError } = await supabase
                .from('render_requests')
                .insert([{
                    user_id: userId,
                    project_id: projectId,
                    prompt: expandedPrompt, // Store the expanded version
                    status: 'processing',
                    model: 'gemini-1.5-pro + flux-pro' // Mocking model stack
                }])
                .select()
                .single();

            if (insertError) throw insertError;

            // 3. Simulated Async Processing
            // In production, this would call a service like FAL.AI or STABILITY.AI
            setTimeout(async () => {
                const mockResultUrl = `https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop`; // Mock result

                const { error: resultError } = await supabase
                    .from('render_results')
                    .insert([{
                        request_id: renderReq.id,
                        output_file_path: mockResultUrl,
                        model_used: 'flux-pro-v1',
                        cost_tokens: 2500
                    }]);

                if (!resultError) {
                    await supabase
                        .from('render_requests')
                        .update({ status: 'completed', completed_at: new Date().toISOString() })
                        .eq('id', renderReq.id);
                }
            }, 8000); // Simulate longer high-quality processing

            return {
                success: true,
                requestId: renderReq.id,
                expandedPrompt,
                message: 'High-fidelity rendering job initiated.'
            };

        } catch (error: any) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Failed to initiate rendering.' });
        }
    });
}
