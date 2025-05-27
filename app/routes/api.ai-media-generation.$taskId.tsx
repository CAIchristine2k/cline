import type { LoaderFunctionArgs } from 'react-router';

// Environment variables for KlingAI API
const env = process.env as any;
const KLING_ACCESS_KEY = env.KLING_ACCESS_KEY as string | undefined;
const KLING_SECRET_KEY = env.KLING_SECRET_KEY as string | undefined;
const KLING_API_BASE = 'https://api.klingai.com';

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

export async function loader({ params }: LoaderFunctionArgs) {
  const taskId = params.taskId;

  if (!taskId) {
    return new Response(JSON.stringify({ message: 'Task ID is required' }), { 
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

  try {
    // Generate JWT token for KlingAI
    const token = await generateKlingToken();

    // Make request to KlingAI to check task status
    const response = await fetch(`${KLING_API_BASE}/v1/images/kolors-virtual-try-on/${taskId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const klingResult = await response.json() as KlingAITaskResponse;

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

    // Add result URL if task is completed successfully
    if (taskData.task_status === 'succeed' && taskData.task_result?.images?.[0]) {
      responseData.resultUrl = taskData.task_result.images[0].url;
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