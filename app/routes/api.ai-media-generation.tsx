import type { ActionFunctionArgs } from 'react-router';
import { CUSTOMER_DETAILS_QUERY } from '~/graphql/customer-account/CustomerDetailsQuery';
import { CUSTOMER_METAFIELD_UPDATE } from '~/graphql/customer-account/CustomerUpdateMutation';

// Environment variables for KlingAI API
const env = process.env as any;
const KLING_ACCESS_KEY = env.KLING_ACCESS_KEY as string | undefined;
const KLING_SECRET_KEY = env.KLING_SECRET_KEY as string | undefined;
const KLING_API_BASE = 'https://api.klingai.com';

if (!KLING_ACCESS_KEY || !KLING_SECRET_KEY) {
  console.warn('KlingAI API credentials not configured. AI media generation will not work.');
}

interface KlingAIResponse {
  code: number;
  message: string;
  request_id: string;
  data?: {
    task_id: string;
    task_status: string;
    created_at: number;
    updated_at: number;
  };
}

// Base64URL encode function for JWT
function base64URLEncode(str: ArrayBuffer): string {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(str)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Generate JWT token using Web Crypto API (compatible with Cloudflare Workers)
async function generateKlingToken(): Promise<string> {
  if (!KLING_ACCESS_KEY || !KLING_SECRET_KEY) {
    throw new Error('KlingAI API credentials not configured');
  }

  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload = {
    iss: KLING_ACCESS_KEY,
    exp: Math.floor(Date.now() / 1000) + 1800, // 30 minutes from now
    nbf: Math.floor(Date.now() / 1000) - 5     // 5 seconds ago
  };

  // Encode header and payload
  const encodedHeader = base64URLEncode(new TextEncoder().encode(JSON.stringify(header)));
  const encodedPayload = base64URLEncode(new TextEncoder().encode(JSON.stringify(payload)));
  
  // Create signature
  const data = `${encodedHeader}.${encodedPayload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(KLING_SECRET_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const encodedSignature = base64URLEncode(signature);
  
  return `${data}.${encodedSignature}`;
}

// Make the request body interface more flexible
interface AIGenerationRequest {
  userImage: string;
  influencerImage?: string;
  pose?: string;
  productImage?: string;
}

export async function action({ request, context }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Check authentication
    const isLoggedIn = await context.customerAccount.isLoggedIn();
    if (!isLoggedIn) {
      return new Response(JSON.stringify({ 
        message: 'Authentication required' 
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get customer data including usage tracking
    const { data } = await context.customerAccount.query(CUSTOMER_DETAILS_QUERY);
    const customer = data.customer;

    if (!customer) {
      return new Response(JSON.stringify({ 
        message: 'Customer data not found' 
      }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check usage limits
    const usageMetafield = customer.metafields?.find(
      (m: any) => m.namespace === 'ai_generation' && m.key === 'monthly_usage'
    );
    const resetMetafield = customer.metafields?.find(
      (m: any) => m.namespace === 'ai_generation' && m.key === 'last_reset'
    );

    const currentUsage = usageMetafield ? parseInt(usageMetafield.value) || 0 : 0;
    const lastReset = resetMetafield ? new Date(resetMetafield.value) : new Date(0);
    const now = new Date();
    
    // Check if usage needs to be reset (monthly)
    const monthsSinceReset = (now.getFullYear() - lastReset.getFullYear()) * 12 + 
                            (now.getMonth() - lastReset.getMonth());
    const needsReset = monthsSinceReset >= 1;
    const actualUsage = needsReset ? 0 : currentUsage;

    // Check if user has reached limit (default 10 per month)
    const usageLimit = 10;
    if (actualUsage >= usageLimit) {
      return new Response(JSON.stringify({ 
        message: 'Monthly usage limit reached' 
      }), { 
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse request body with the new parameters
    const body = await request.json() as AIGenerationRequest;
    const { userImage, influencerImage, pose, productImage } = body;

    if (!userImage) {
      return new Response(JSON.stringify({ message: 'User image is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!KLING_ACCESS_KEY || !KLING_SECRET_KEY) {
      return new Response(JSON.stringify({ 
        message: 'AI media generation service is not configured' 
      }), { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate JWT token for KlingAI
    const token = await generateKlingToken();

    // Prepare the request to KlingAI
    // For virtual try-on, we'll use the product image as the cloth_image
    // For poses, we could use different reference images based on the pose
    const klingRequest: Record<string, any> = {
      model_name: 'kolors-virtual-try-on-v1',
      human_image: userImage,
    };

    // Handle different pose types and virtual try-on
    if (pose === 'try-on' && productImage) {
      // For product try-on, use the selected product image
      const productImagePath = `/public/images/${productImage}.png`;
      // In a real implementation, you would convert the image to base64 here
      // For demo purposes, we'll just pass the influencer image
      klingRequest.cloth_image = influencerImage || undefined;
    } else {
      // For other poses, use the influencer reference image
      klingRequest.cloth_image = influencerImage || undefined;
      // You could add additional parameters based on the pose
      // if KlingAI supports specific pose types
    }

    // Make request to KlingAI
    const response = await fetch(`${KLING_API_BASE}/v1/images/kolors-virtual-try-on`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(klingRequest)
    });

    const klingResult = await response.json() as KlingAIResponse;

    if (!response.ok || klingResult.code !== 0) {
      console.error('KlingAI API error:', klingResult);
      return new Response(JSON.stringify({ 
        message: klingResult.message || 'Failed to create AI generation task' 
      }), { 
        status: response.status || 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!klingResult.data) {
      return new Response(JSON.stringify({ 
        message: 'Invalid response from AI service' 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // TODO: Update usage tracking
    // Note: Customer Account API doesn't support metafield updates directly
    // This would need to be implemented via Admin API or alternative storage
    console.log(`AI generation completed for customer ${customer.id}. Current usage: ${actualUsage + 1}/${usageLimit}`);

    // Return the task information
    return new Response(JSON.stringify({
      taskId: klingResult.data.task_id,
      status: klingResult.data.task_status,
      createdAt: klingResult.data.created_at,
      updatedAt: klingResult.data.updated_at
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('AI media generation error:', error);
    return new Response(JSON.stringify({ 
      message: 'Failed to create AI generation task' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle other methods
export async function loader() {
  return new Response(JSON.stringify({ message: 'Method not allowed' }), { 
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
} 