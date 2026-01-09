# Supabase Database Webhooks Configuration

To enable automated AI scoring and social message analysis, configure the following webhooks in your Supabase Dashboard (**Database -> Webhooks**):

## 1. Automated Lead Scoring
Trigger AI scoring whenever a new lead is inserted.

- **Name**: `autoscore_new_lead`
- **Table**: `public.leads`
- **Events**: `INSERT`
- **Webhook Method**: `POST`
- **Webhook URL**: `YOUR_BACKEND_URL/v1/leads/{{id}}/score`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer YOUR_SERVER_JWT`

---

## 2. Social Message AI Analysis
Trigger AI sentiment analysis and response drafting for new social messages.

- **Name**: `analyze_social_message`
- **Table**: `public.social_messages`
- **Events**: `INSERT`
- **Webhook Method**: `POST`
- **Webhook URL**: `YOUR_BACKEND_URL/v1/social/webhook/analyze`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer YOUR_SERVER_JWT`

---

## 3. AI Rendering Status Updates
Notify the frontend when a rendering job changes status.

- **Name**: `notify_render_status`
- **Table**: `public.render_requests`
- **Events**: `UPDATE`
- **Condition**: `status` changes
- **Webhook Method**: `POST`
- **Webhook URL**: `YOUR_FRONTEND_URL/api/webhooks/render`

---

### Security Note
Ensure your backend endpoints are protected by the `auth` middleware we implemented. The webhook should include a valid JWT in the Authorization header.
