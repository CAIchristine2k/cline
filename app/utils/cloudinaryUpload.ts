/**
 * Upload a canvas data URL or blob to Cloudinary via our API endpoint
 */
export async function uploadCanvasToCloudinary(
  canvasDataURL: string,
  options: {
    filename?: string;
    folder?: string;
  } = {}
): Promise<{
  success: boolean;
  url?: string;
  publicId?: string;
  width?: number;
  height?: number;
  bytes?: number;
  error?: string;
}> {
  try {
    // Convert data URL to blob
    const response = await fetch(canvasDataURL);
    const blob = await response.blob();
    
    // Create form data
    const formData = new FormData();
    const filename = options.filename || `customization-${Date.now()}.png`;
    formData.append('image', blob, filename);
    
    if (options.folder) {
      formData.append('folder', options.folder);
    }

    // Upload via our edge-compatible API endpoint
    const uploadResponse = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json().catch(() => ({ error: 'Unknown error' })) as { error?: string };
      throw new Error(errorData.error || `Upload failed with status ${uploadResponse.status}`);
    }

    const result = await uploadResponse.json() as {
      success: boolean;
      url?: string;
      publicId?: string;
      width?: number;
      height?: number;
      bytes?: number;
      error?: string;
    };
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Upload a file directly to Cloudinary via our API endpoint
 */
export async function uploadFileToCloudinary(
  file: File,
  options: {
    folder?: string;
  } = {}
): Promise<{
  success: boolean;
  url?: string;
  publicId?: string;
  width?: number;
  height?: number;
  bytes?: number;
  error?: string;
}> {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    if (options.folder) {
      formData.append('folder', options.folder);
    }

    const uploadResponse = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json().catch(() => ({ error: 'Unknown error' })) as { error?: string };
      throw new Error(errorData.error || `Upload failed with status ${uploadResponse.status}`);
    }

    const result = await uploadResponse.json() as {
      success: boolean;
      url?: string;
      publicId?: string;
      width?: number;
      height?: number;
      bytes?: number;
      error?: string;
    };
    return result;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Save a canvas design with metadata to Cloudinary
 */
export async function saveDesignToCloudinary(
  canvasDataURL: string,
  options: {
    productId?: string;
    customizations?: Record<string, any>;
  } = {}
): Promise<{
  success: boolean;
  url?: string;
  publicId?: string;
  filename?: string;
  width?: number;
  height?: number;
  bytes?: number;
  error?: string;
}> {
  try {
    // Convert data URL to blob
    const response = await fetch(canvasDataURL);
    const blob = await response.blob();
    
    // Create form data
    const formData = new FormData();
    formData.append('image', blob, `design-${Date.now()}.png`);
    
    if (options.productId) {
      formData.append('productId', options.productId);
    }
    
    if (options.customizations) {
      formData.append('customizations', JSON.stringify(options.customizations));
    }

    // Save design via our edge-compatible API endpoint
    const saveResponse = await fetch('/api/save-design', {
      method: 'POST',
      body: formData,
    });

    if (!saveResponse.ok) {
      const errorData = await saveResponse.json().catch(() => ({ error: 'Unknown error' })) as { error?: string };
      throw new Error(errorData.error || `Save failed with status ${saveResponse.status}`);
    }

    const result = await saveResponse.json() as {
      success: boolean;
      url?: string;
      publicId?: string;
      filename?: string;
      width?: number;
      height?: number;
      bytes?: number;
      error?: string;
    };

    return result;

  } catch (error) {
    console.error('Save design to Cloudinary failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Save failed'
    };
  }
}