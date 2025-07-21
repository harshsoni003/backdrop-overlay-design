import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const payload = await req.json()
    console.log('Webhook payload:', payload)

    // Check if this is a successful payment
    if (payload.event_type === 'payment.completed' && payload.data.status === 'completed') {
      const { custom_data: userId, product_id } = payload.data
      
      if (!userId) {
        console.error('No user ID found in payment data')
        return new Response('No user ID provided', { status: 400, headers: corsHeaders })
      }

      // Determine payment type based on product ID
      let paymentType = ''
      if (product_id === 'pdt_qTqiT2IJ8IpwtLFOIrplE') {
        paymentType = 'monthly'
      } else if (product_id === 'pdt_Hnxf8C6pkmQ8oixcS9ESe') {
        paymentType = 'lifetime'
      } else {
        console.error('Unknown product ID:', product_id)
        return new Response('Unknown product', { status: 400, headers: corsHeaders })
      }

      console.log(`Processing ${paymentType} payment for user ${userId}`)

      // Call the database function to handle successful payment
      const { error } = await supabaseClient.rpc('handle_successful_payment', {
        user_id_param: userId,
        payment_type: paymentType
      })

      if (error) {
        console.error('Error updating user credits:', error)
        return new Response('Database error', { status: 500, headers: corsHeaders })
      }

      console.log(`Successfully updated ${paymentType} subscription for user ${userId}`)
      
      return new Response('Payment processed successfully', { 
        status: 200, 
        headers: corsHeaders 
      })
    }

    return new Response('Event not processed', { status: 200, headers: corsHeaders })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Internal server error', { 
      status: 500, 
      headers: corsHeaders 
    })
  }
})