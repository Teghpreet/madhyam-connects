-- Enable pg_cron and pg_net extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule the cron job to run once a day at midnight (00:00) UTC
-- It makes a POST request to the daily-summary edge function with the Anon Key
SELECT cron.schedule(
  'daily-summary-keep-active',
  '0 0 * * *',
  $$
  SELECT net.http_post(
    url := 'https://squqihqbvfegkyrgjcvh.supabase.co/functions/v1/daily-summary',
    headers := '{"Content-Type": "application/json", "apikey": "sb_publishable_f2PaLWqtSgXfdLqteIcseQ_GBUJ60Xe"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);
