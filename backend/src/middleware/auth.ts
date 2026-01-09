import { FastifyReply, FastifyRequest } from 'fastify';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function verifySuperAdmin(request: FastifyRequest, reply: FastifyReply) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return reply.code(401).send({ error: 'Missing authorization header' });
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return reply.code(401).send({ error: 'Invalid token' });
        }

        // Check custom claims or profiles table for 'admin' role
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (!profile || profile.role !== 'admin') {
            return reply.code(403).send({ error: 'Forbidden: Super Admin access required' });
        }

        // Attach user to request for downstream use
        (request as any).user = user;
        (request as any).profile = profile;

    } catch (err) {
        return reply.code(500).send({ error: 'Internal Server Error during Auth' });
    }
}
