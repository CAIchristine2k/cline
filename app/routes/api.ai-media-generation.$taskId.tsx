import type { LoaderFunctionArgs } from 'react-router';

const KLING_API_BASE = 'https://api-singapore.klingai.com';

interface KlingAITaskResponse {
  code: number;
  message: string;
  request_id: string;
  data?: {
    task_id: string;
    task_status: string;
    task_status_msg?: string;
    created_at: number;
    updated_at: number;
    task_result?: {
      images?: Array<{
        index: number;
        url: string;
      }>;
    };
  };
}

// Base64URL encode function for JWT
function base64URLEncode(str: ArrayBuffer): string {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(str)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Generate JWT token using Web Crypto API (compatible with Cloudflare Workers)
async function generateKlingToken(accessKey: string, secretKey: string): Promise<string> {
  if (!accessKey || !secretKey) {
    throw new Error('KlingAI API credentials not configured');
  }

  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload = {
    iss: accessKey,
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
    new TextEncoder().encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const encodedSignature = base64URLEncode(signature);
  
  const token = `${data}.${encodedSignature}`;
  
  // Log JWT token details for verification
  console.log('🔐 JWT TOKEN VERIFICATION DETAILS:');
  console.log('✅ Complete JWT Token:', token);
  console.log('✅ Token Parts:');
  console.log('   Header:', encodedHeader);
  console.log('   Payload:', encodedPayload);
  console.log('   Signature:', encodedSignature);
  console.log('✅ Decoded Payload:', payload);
  console.log('✅ Token Length:', token.length);
  console.log('✅ Generation Timestamp:', new Date().toISOString());
  
  return token;
}

export async function loader({ params, context }: LoaderFunctionArgs) {
  const taskId = params.taskId;

  if (!taskId) {
    return new Response(JSON.stringify({ message: 'Task ID is required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get environment variables from context
  const KLING_ACCESS_KEY = context.env.KLING_ACCESS_KEY as string | undefined;
  const KLING_SECRET_KEY = context.env.KLING_SECRET_KEY as string | undefined;

  if (!KLING_ACCESS_KEY || !KLING_SECRET_KEY) {
    return new Response(JSON.stringify({ 
      message: 'AI media generation service is not configured' 
    }), { 
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Generate JWT token for KlingAI
    const token = await generateKlingToken(KLING_ACCESS_KEY, KLING_SECRET_KEY);

    // Try both endpoints (virtual try-on first, then image generation)
    let response: Response;
    let klingResult: KlingAITaskResponse;

    // First try virtual try-on endpoint
    response = await fetch(`${KLING_API_BASE}/v1/images/kolors-virtual-try-on/${taskId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    klingResult = await response.json() as KlingAITaskResponse;

    // If virtual try-on fails (404 or task not found), try image generation endpoint
    if (!response.ok || klingResult.code !== 0) {
      response = await fetch(`${KLING_API_BASE}/v1/images/generations/${taskId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      klingResult = await response.json() as KlingAITaskResponse;
    }

    if (!response.ok || klingResult.code !== 0) {
      console.error('KlingAI API error:', klingResult);
      return new Response(JSON.stringify({ 
        message: klingResult.message || 'Failed to check task status' 
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

    const taskData = klingResult.data;
    
    // Prepare response data
    const responseData: any = {
      taskId: taskData.task_id,
      status: taskData.task_status,
      createdAt: taskData.created_at,
      updatedAt: taskData.updated_at
    };

    // Add result URL(s) if task is completed successfully
    if (taskData.task_status === 'succeed' && taskData.task_result?.images) {
      if (taskData.task_result.images.length === 1) {
        // Single image - return as resultUrl for backward compatibility
        responseData.resultUrl = taskData.task_result.images[0].url;
      } else {
        // Multiple images - return as array
        responseData.resultUrls = taskData.task_result.images.map(img => img.url);
        responseData.resultUrl = taskData.task_result.images[0].url; // Also set first image as primary
      }
    }

    // Add error message if task failed
    if (taskData.task_status === 'failed') {
      responseData.error = taskData.task_status_msg || 'Task failed';
    }

    return new Response(JSON.stringify(responseData), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('AI media generation status check error:', error);
    return new Response(JSON.stringify({ 
      message: 'Failed to check task status' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 