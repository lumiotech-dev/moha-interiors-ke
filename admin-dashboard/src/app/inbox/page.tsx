'use client';

import { useEffect, useState } from 'react';
import SecureGuard from '@/components/SecureGuard';
import { supabase } from '@/lib/supabase';
import { MessageSquare, Instagram, MessageCircle, Search, Filter, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export default function InboxPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMessages() {
            const { data, error } = await supabase
                .from('social_messages')
                .select('*')
                .order('received_at', { ascending: false });

            if (data) setMessages(data);
            setLoading(false);
        }

        fetchMessages();

        const channel = supabase
            .channel('social_messages_realtime')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'social_messages' },
                (payload) => {
                    setMessages(prev => [payload.new, ...prev]);
                })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <SecureGuard>
            <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-charcoal text-offWhite">
                {/* Sidebar - Message List */}
                <div className="w-1/3 border-r border-offWhite/10 flex flex-col">
                    <div className="p-6 border-b border-offWhite/10">
                        <h1 className="text-2xl font-playfair font-bold mb-4 flex items-center gap-2">
                            <MessageSquare className="text-mutedGold" />
                            Unified Inbox
                        </h1>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-coolGrey w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full bg-offWhite/5 border border-offWhite/10 rounded-sm py-2 pl-10 pr-4 text-sm focus:border-mutedGold outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="p-10 text-center text-coolGrey italic">Searching the archives...</div>
                        ) : messages.length === 0 ? (
                            <div className="p-10 text-center text-coolGrey italic">No new signals detected.</div>
                        ) : (
                            messages.map(msg => (
                                <div
                                    key={msg.id}
                                    onClick={() => setSelectedMessage(msg)}
                                    className={clsx(
                                        "p-6 border-b border-offWhite/5 cursor-pointer transition-colors hover:bg-offWhite/5",
                                        selectedMessage?.id === msg.id && "bg-offWhite/10 border-r-2 border-r-mutedGold"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-mutedGold">
                                            {msg.platform === 'instagram' ? <Instagram size={14} /> : <MessageCircle size={14} />}
                                            {msg.platform}
                                        </span>
                                        <span className="text-[10px] text-coolGrey uppercase">{new Date(msg.received_at).toLocaleTimeString()}</span>
                                    </div>
                                    <h3 className="font-bold text-sm mb-1">{msg.sender_id}</h3>
                                    <p className="text-xs text-coolGrey line-clamp-1">{msg.content}</p>
                                    {msg.sentiment_score > 0.7 && (
                                        <span className="mt-2 inline-block px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] rounded-full">
                                            Positive Sentiment
                                        </span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Content - Message View */}
                <div className="flex-1 flex flex-col bg-charcoal-light/30">
                    {selectedMessage ? (
                        <>
                            <div className="p-8 border-b border-offWhite/10 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-playfair font-bold">{selectedMessage.sender_id}</h2>
                                    <p className="text-xs text-coolGrey uppercase tracking-widest">Conversation via {selectedMessage.platform}</p>
                                </div>
                                <div className="flex gap-4">
                                    <button className="px-4 py-2 border border-offWhite/10 rounded-sm text-xs uppercase tracking-widest hover:bg-offWhite/5 transition-colors">Archive</button>
                                    <button className="px-4 py-2 bg-mutedGold text-charcoal rounded-sm text-xs uppercase tracking-widest font-bold">Reply</button>
                                </div>
                            </div>

                            <div className="flex-1 p-8 overflow-y-auto space-y-6">
                                <div className="flex flex-col gap-1 max-w-lg">
                                    <div className="p-4 bg-offWhite/5 rounded-sm border border-offWhite/10">
                                        <p className="text-sm leading-relaxed">{selectedMessage.content}</p>
                                    </div>
                                    <span className="text-[10px] text-coolGrey uppercase self-end">Received {new Date(selectedMessage.received_at).toLocaleString()}</span>
                                </div>

                                {/* AI Insight Box */}
                                <div className="p-6 bg-mutedGold/5 border border-mutedGold/20 rounded-sm">
                                    <h4 className="text-xs uppercase tracking-widest text-mutedGold font-bold mb-2 flex items-center gap-2">
                                        <Sparkles size={14} /> AI Suggested Response
                                    </h4>
                                    {selectedMessage.ai_suggested_response ? (
                                        <>
                                            <p className="text-sm text-coolGrey italic mb-4 whitespace-pre-wrap">
                                                "{selectedMessage.ai_suggested_response}"
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        const textarea = document.querySelector('textarea');
                                                        if (textarea) textarea.value = selectedMessage.ai_suggested_response;
                                                    }}
                                                    className="text-[10px] px-3 py-1.5 bg-mutedGold/20 rounded-sm hover:bg-mutedGold/30 transition-colors uppercase tracking-widest font-bold"
                                                >
                                                    Apply Draft
                                                </button>
                                                <button className="text-[10px] px-3 py-1.5 border border-mutedGold/20 rounded-sm hover:bg-mutedGold/10 transition-colors uppercase tracking-widest">
                                                    Regenerate
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-2 text-coolGrey italic text-sm">
                                            <Clock size={14} className="animate-pulse" />
                                            AI Architect is analyzing this conversation...
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 border-t border-offWhite/10">
                                <div className="relative">
                                    <textarea
                                        placeholder="Type your response..."
                                        className="w-full bg-offWhite/5 border border-offWhite/10 rounded-sm p-4 text-sm focus:border-mutedGold outline-none resize-none"
                                        rows={3}
                                    />
                                    <div className="absolute bottom-4 right-4 text-[10px] text-coolGrey italic">
                                        AI will suggest improvements to your tone
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                            <div className="w-16 h-16 bg-offWhite/5 rounded-full flex items-center justify-center mb-6">
                                <MessageSquare className="text-coolGrey" size={32} />
                            </div>
                            <h2 className="text-2xl font-playfair mb-2">Select a Conversation</h2>
                            <p className="text-coolGrey max-w-xs mx-auto text-sm">
                                Connect with your clients across Instagram and TikTok from one unified dashboard.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </SecureGuard>
    );
}
