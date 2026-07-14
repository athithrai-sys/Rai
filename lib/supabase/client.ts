import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client. Uses ONLY the public anon key — all data
// access is enforced by Row Level Security in the database. The service
// role key must never be imported anywhere the browser can reach.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
