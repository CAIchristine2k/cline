import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router';
import { getCloudinaryConfig } from '~/utils/cloudinaryConfig';

// Cloudinary configuration helper for edge environments
function parseCloudinaryUrl(cloudinaryUrl: string) {
  // Parse CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
  const url = new URL(cloudinaryUrl);
  return {
    cloudName: url.hostname,
    apiKey: url.username,
    apiSecret: url.password,
  };
}

// Generate SHA1 signature using Web Crypto API (edge-compatible)
async function generateCloudinarySignature(params: Record<string, string>, apiSecret: string): Promise<string> {
  // Sort parameters and create query string (excluding signature itself)
  const sortedParams = Object.keys(params)
    .sort()
    .filter(key => key !== 'signature' && key !== 'api_key' && key !== 'file')
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  const stringToSign = sortedParams + apiSecret;
  
  // Use Web Crypto API (available in edge environments)
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function action({ request, context }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig(context.env);
    
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const folder = formData.get('folder') as string;
    
    if (!imageFile) {
      return new Response(JSON.stringify({ error: 'No image file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Convert file to base64 for upload (safe for large files)
    const arrayBuffer = await imageFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Convert to base64 in chunks to avoid stack overflow
    let binaryString = '';
    const chunkSize = 8192; // Process in 8KB chunks
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.slice(i, i + chunkSize);
      binaryString += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    const base64String = btoa(binaryString);
    const dataURI = `data:${imageFile.type};base64,${base64String}`;

    // Prepare upload parameters
    const timestamp = Math.round(Date.now() / 1000).toString();
    const publicId = `upload-${Date.now()}`;
    
    const uploadParams: Record<string, string> = {
      timestamp,
      public_id: publicId,
      folder: folder || 'product-customization',
    };

    // Generate signature
    const signature = await generateCloudinarySignature(uploadParams, apiSecret);

    // Create form data for Cloudinary upload
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', dataURI);
    cloudinaryFormData.append('api_key', apiKey);
    cloudinaryFormData.append('timestamp', timestamp);
    cloudinaryFormData.append('signature', signature);
    cloudinaryFormData.append('public_id', publicId);
    cloudinaryFormData.append('folder', folder || 'product-customization');

    // Upload to Cloudinary via HTTP API
    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    );

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Cloudinary upload failed: ${errorText}`);
    }

    const uploadResult = await uploadResponse.json() as {
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
      bytes: number;
    };

    return new Response(JSON.stringify({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      bytes: uploadResult.bytes,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Optional: Handle GET requests for testing
export async function loader({ request, context }: LoaderFunctionArgs) {
  try {
    const config = getCloudinaryConfig(context.env);
    return new Response(JSON.stringify({ 
      message: 'Upload endpoint ready. Use POST with image file.',
      cloudinaryConfigured: !!(config.cloudName && config.apiKey && config.apiSecret)
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      message: 'Upload endpoint ready. Use POST with image file.',
      cloudinaryConfigured: false,
      error: 'Failed to load Cloudinary configuration'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 