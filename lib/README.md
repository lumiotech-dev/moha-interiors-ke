# Shared Library

This folder contains shared code used by both `frontend` and `admin-dashboard`.

## Structure
- `supabase.ts` - Shared Supabase client configuration
- `index.ts` - Main export file

## Usage

### In Frontend or Admin Dashboard:
```typescript
import { supabase } from '@/lib/supabase';
// or
import { supabase } from '../../../lib/supabase';
```

## Environment Variables Required
Both apps need these in their `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
