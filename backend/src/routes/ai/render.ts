import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createClient } from '@supabase/supabase-js';

export default async function aiRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    fastify.post('/render', async (request, reply) => {
        const { prompt, projectId, userId } = request.body as any;

        try {
            // 1. Log the request to Supabase
            const { data: renderReq, error: insertError } = await supabase
                .from('render_requests')
                .insert([{
                    user_id: userId,
                    project_id: projectId,
                    prompt,
                    status: 'processing',
                    model: 'gemini-1.5-pro'
                }])
                .select()
                .single();

            if (insertError) throw insertError;

            // 2. Mock AI Processing Logic (Integration with actual AI model happens here)
            // In a real scenario, we'd send the prompt to Gemini or Claude
            setTimeout(async () => {
                const mockResultUrl = `https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop`; // Mock result

                await supabase
                    .from('render_results')
                    .insert([{
                        request_id: renderReq.id,
                        output_file_path: mockResultUrl,
                        model_used: 'gemini-1.5-pro',
                        cost_tokens: 1500
                    }]);

                await supabase
                    .from('render_requests')
                    .update({ status: 'completed', completed_at: new Date().toISOString() })
                    .eq('id', renderReq.id);

            }, 5000); // Simulate 5s processing

            return {
                success: true,
                requestId: renderReq.id,
                message: 'Rendering job started in the background.'
            };

        } catch (error: any) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Failed to initiate rendering.' });
        }
    });
}
