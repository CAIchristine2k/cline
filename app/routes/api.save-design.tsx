import type { ActionFunctionArgs } from 'react-router';
import { getCloudinaryConfig } from '~/utils/cloudinaryConfig';

// Cloudinary HTTP API client for serverless environments
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
    const productId = formData.get('productId') as string;
    const customizations = formData.get('customizations') as string;
    
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

    // Parse customizations if provided
    let customizationData: Record<string, any> = {};
    try {
      if (customizations) {
        customizationData = JSON.parse(customizations) as Record<string, any>;
      }
    } catch (error) {
      console.warn('Failed to parse customizations:', error);
    }

    // Create unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `design-${productId || 'unknown'}-${timestamp}`;
    const uploadTimestamp = Math.round(Date.now() / 1000).toString();

    // Prepare upload parameters
    const uploadParams: Record<string, string> = {
      timestamp: uploadTimestamp,
      public_id: filename,
      folder: 'saved-designs',
      tags: `customization,user-design,${productId || 'unknown'}`,
    };

    // Add context metadata
    const contextData = {
      product_id: productId || 'unknown',
      created_at: new Date().toISOString(),
      customizations: JSON.stringify(customizationData)
    };
    
    // Convert context to format expected by Cloudinary API
    const contextString = Object.entries(contextData)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('|');
    
    uploadParams.context = contextString;

    // Generate signature
    const signature = await generateCloudinarySignature(uploadParams, apiSecret);

    // Create form data for Cloudinary upload
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', dataURI);
    cloudinaryFormData.append('api_key', apiKey);
    cloudinaryFormData.append('timestamp', uploadTimestamp);
    cloudinaryFormData.append('signature', signature);
    cloudinaryFormData.append('public_id', filename);
    cloudinaryFormData.append('folder', 'saved-designs');
    cloudinaryFormData.append('tags', uploadParams.tags);
    cloudinaryFormData.append('context', contextString);

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

    const result = await uploadResponse.json() as {
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
      bytes: number;
    };

    return new Response(JSON.stringify({ 
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      filename: filename,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      productId: productId,
      customizations: customizationData
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error saving design to Cloudinary:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to save design',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 