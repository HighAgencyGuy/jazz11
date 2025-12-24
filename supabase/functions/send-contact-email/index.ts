import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactFormRequest = await req.json();

    console.log("Received contact form submission:", { name, email, phone });

    // Send email using Resend API directly
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "JAZZ 11/11 Website <onboarding@resend.dev>",
        to: ["skihyh@gmail.com"],
        subject: `New Contact Form Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #722F37, #8B4513); padding: 20px; text-align: center;">
              <h1 style="color: #D4AF37; margin: 0; font-size: 24px;">JAZZ 11/11</h1>
              <p style="color: #FFF8DC; margin: 5px 0 0 0;">New Contact Form Submission</p>
            </div>
            
            <div style="padding: 30px; background: #FFFAF0;">
              <h2 style="color: #722F37; margin-top: 0;">Customer Details</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #DDD; font-weight: bold; color: #333;">Name:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #DDD; color: #555;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #DDD; font-weight: bold; color: #333;">Email:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #DDD; color: #555;"><a href="mailto:${email}" style="color: #722F37;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #DDD; font-weight: bold; color: #333;">Phone:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #DDD; color: #555;"><a href="tel:${phone}" style="color: #722F37;">${phone}</a></td>
                </tr>
                ` : ''}
              </table>
              
              <h3 style="color: #722F37; margin-top: 25px;">Message:</h3>
              <div style="background: #FFF; padding: 15px; border-left: 4px solid #D4AF37; border-radius: 4px;">
                <p style="margin: 0; color: #555; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              
              ${phone ? `
              <div style="margin-top: 30px; padding: 15px; background: #25D366; border-radius: 8px; text-align: center;">
                <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: white; text-decoration: none; font-weight: bold;">
                  📱 Reply via WhatsApp
                </a>
              </div>
              ` : ''}
            </div>
            
            <div style="background: #333; padding: 15px; text-align: center;">
              <p style="color: #999; margin: 0; font-size: 12px;">This message was sent from the JAZZ 11/11 website contact form</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailResponse = await res.json();
    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
