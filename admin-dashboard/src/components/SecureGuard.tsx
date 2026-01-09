'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldAlert } from 'lucide-react';

export default function SecureGuard({ children }: { children: React.ReactNode }) {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function checkUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }

            // Strict Role Check via RPC or Profile
            // For now, we simulate the role check pattern
            // In production, this call would go to our Secure API to verify the 'admin' claim
            // const isSuperAdmin = await verifyRole(user.id);

            setAuthorized(true);
        }
        checkUser();
    }, [router]);

    if (!authorized) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-red-500">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <ShieldAlert size={64} />
                    <h1 className="text-2xl font-mono uppercase tracking-widest">Restricted Access</h1>
                    <p className="text-zinc-500 text-sm">Verifying Credentials...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
