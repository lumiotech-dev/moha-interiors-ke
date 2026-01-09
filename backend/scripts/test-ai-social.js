const axios = require('axios');

async function testSocialAI() {
    console.log('🚀 Testing AI Social Message Analysis...');

    try {
        // 1. Simulate an incoming message insertion via a test endpoint
        // First, let's mock what Supabase would send to the webhook
        const payload = {
            record: {
                id: 'test-uuid-' + Date.now(),
                content: 'I am looking for a minimalist luxury living room design for my new penthouse in Karen. Do you use Italian marble?',
                platform: 'instagram',
                sender_id: 'luxe_client_001'
            }
        };

        console.log('📡 Sending webhook payload to backend...');
        const response = await axios.post('http://localhost:3001/v1/social/webhook/analyze', payload);

        if (response.data.success) {
            console.log('✅ AI Analysis Triggered Successfully.');
            console.log('Check the Supabase table `social_messages` for AI suggestions.');
        }
    } catch (error) {
        console.error('❌ Test Failed:', error.message);
        if (error.response) {
            console.error('Response Data:', error.response.data);
        }
    }
}

testSocialAI();
