const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'RESEND_API_KEY is not configured.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const payload = {
      from: 'team@madhyamconnects.com',
      to: ['teghpreetsingh01@gmail.com'],
      subject: 'Daily Status Summary - Madhyam Connects',
      html: `
        <h3>Madhyam Connects - Daily Status Check</h3>
        <p>This is an automated daily summary to keep the Supabase project active.</p>
        <p><strong>Status:</strong> Active & Healthy</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `,
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const resData = await res.json()

    return new Response(
      JSON.stringify(resData),
      {
        status: res.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
