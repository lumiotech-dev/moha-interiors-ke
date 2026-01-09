'use client';

import SecureGuard from '@/components/SecureGuard';
import { Lock } from 'lucide-react';

export default function DashboardPage() {
  return (
    <SecureGuard>
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-zinc-800 bg-zinc-950/50 from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <Lock className="mr-2 h-4 w-4 text-green-500" />
            <code className="font-mono font-bold">ZERO TRUST ZONE</code>
            <span className="ml-2 text-zinc-400">Super Admin Active</span>
          </p>
        </div>

        <div className="mt-12 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left text-zinc-100">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900/30">
            <h2 className="mb-3 text-2xl font-semibold">
              Users{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Manage RBAC roles & permissions.
            </p>
          </div>

          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900/30">
            <h2 className="mb-3 text-2xl font-semibold">
              Analytics{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              AI-driven insights & sentiment.
            </p>
          </div>

          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900/30">
            <h2 className="mb-3 text-2xl font-semibold">
              3D AI{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Generate & review renderings.
            </p>
          </div>

          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900/30">
            <h2 className="mb-3 text-2xl font-semibold">
              Inbox{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Unified Social Media feed.
            </p>
          </div>
        </div>
      </div>
    </SecureGuard>
  );
}
