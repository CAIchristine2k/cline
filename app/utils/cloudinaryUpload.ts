/**
 * Upload a canvas data URL or blob to Cloudinary via our API endpoint
 */
export async function uploadCanvasToCloudinary(
  canvasDataURL: string,
  options: {
    filename?: string;
    folder?: string;
    baseUrl?: string;
  } = {},
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
    console.log(`🖼️ uploadCanvasToCloudinary called with ${canvasDataURL.substring(0, 50)}...`);
    
    // Safe way to convert data URL to blob without triggering a CSP violation
    let blob: Blob;
    
    if (canvasDataURL.startsWith('data:')) {
      // Convert data URL to blob without using fetch on the data URL
      const arr = canvasDataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      
      blob = new Blob([u8arr], { type: mime });
      console.log(`✅ Successfully converted data URL to blob (${blob.size} bytes)`);
    } else {
      // It's a URL, we need to fetch it
      try {
        const response = await fetch(canvasDataURL);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }
        blob = await response.blob();
        console.log(`✅ Successfully fetched image as blob (${blob.size} bytes)`);
      } catch (fetchError) {
        console.error('Failed to fetch image from URL:', fetchError);
        throw new Error(`Failed to fetch image: ${fetchError instanceof Error ? fetchError.message : 'Network error'}`);
      }
    }

    // Create form data
    const formData = new FormData();
    const filename = options.filename || `customization-${Date.now()}.png`;
    formData.append('image', blob, filename);

    if (options.folder) {
      formData.append('folder', options.folder);
    }

    // Determine the correct URL to use for uploads
    let uploadUrl: string;
    
    // Check if in browser context
    const isBrowser = typeof window !== 'undefined';
    
    if (isBrowser) {
      // Browser context - use relative URL
      uploadUrl = '/api/upload-image';
      console.log(`🌐 Using client-side upload URL: ${uploadUrl}`);
    } else {
      // Server context - need absolute URL
      // Use the provided baseUrl or default to localhost:3000
      const baseUrl = options.baseUrl || 'http://localhost:3000';
      uploadUrl = `${baseUrl}/api/upload-image`;
      console.log(`🌐 Using server-side upload URL: ${uploadUrl}`);
    }

    // Upload via our edge-compatible API endpoint
    try {
      console.log(`📤 Uploading image to ${uploadUrl} (${blob.size} bytes)`);
      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        // Add cache control headers to prevent caching
        headers: {
          'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
          'Pragma': 'no-cache'
        }
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        let errorMessage: string;
        
        try {
          const errorData = JSON.parse(errorText) as {error?: string};
          errorMessage = errorData.error || `HTTP error: ${uploadResponse.status} ${uploadResponse.statusText}`;
        } catch (e) {
          errorMessage = `HTTP error: ${uploadResponse.status} ${uploadResponse.statusText} - ${errorText.substring(0, 200)}`;
        }
        
        console.error(`❌ Upload failed: ${errorMessage}`);
        throw new Error(errorMessage);
      }

      const result = (await uploadResponse.json()) as {
        success: boolean;
        url?: string;
        publicId?: string;
        width?: number;
        height?: number;
        bytes?: number;
        error?: string;
      };
      
      if (result.success && result.url) {
        console.log(`✅ Successfully uploaded to Cloudinary: ${result.url}`);
      } else {
        console.error(`❌ Upload returned success: false - ${result.error || 'Unknown error'}`);
      }
      
      return result;
    } catch (uploadError) {
      console.error('Upload request failed:', uploadError);
      throw new Error(`Upload request failed: ${uploadError instanceof Error ? uploadError.message : 'Network error'}`);
    }
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
    baseUrl?: string;
  } = {},
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

    // Determine the correct URL to use for uploads
    let uploadUrl: string;
    
    // Check if in browser context
    const isBrowser = typeof window !== 'undefined';
    
    if (isBrowser) {
      // Browser context - use relative URL
      uploadUrl = '/api/upload-image';
    } else {
      // Server context - need absolute URL
      // Use the provided baseUrl or default to localhost:3000
      const baseUrl = options.baseUrl || 'http://localhost:3000';
      uploadUrl = `${baseUrl}/api/upload-image`;
    }

    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorData = (await uploadResponse
        .json()
        .catch(() => ({error: 'Unknown error'}))) as {error?: string};
      throw new Error(
        errorData.error || `Upload failed with status ${uploadResponse.status}`,
      );
    }

    const result = (await uploadResponse.json()) as {
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
    baseUrl?: string;
  } = {},
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

    // Determine the correct URL to use for saving design
    let saveUrl: string;
    
    // Check if in browser context
    const isBrowser = typeof window !== 'undefined';
    
    if (isBrowser) {
      // Browser context - use relative URL
      saveUrl = '/api/save-design';
    } else {
      // Server context - need absolute URL
      // Use the provided baseUrl or default to localhost:3000
      const baseUrl = options.baseUrl || 'http://localhost:3000';
      saveUrl = `${baseUrl}/api/save-design`;
    }

    // Save design via our edge-compatible API endpoint
    const saveResponse = await fetch(saveUrl, {
      method: 'POST',
      body: formData,
    });

    if (!saveResponse.ok) {
      const errorData = (await saveResponse
        .json()
        .catch(() => ({error: 'Unknown error'}))) as {error?: string};
      throw new Error(
        errorData.error || `Save failed with status ${saveResponse.status}`,
      );
    }

    const result = (await saveResponse.json()) as {
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
      error: error instanceof Error ? error.message : 'Save failed',
    };
  }
}

/**
 * Download an image from a URL and re-upload it to Cloudinary
 * This is useful for handling external images (like KlingAI) that may have CSP/CORS issues
 */
export async function downloadAndReuploadToCloudinary(
  imageUrl: string,
  options: {
    folder?: string;
    filename?: string;
    baseUrl?: string;
  } = {},
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
    console.log('📥 Downloading image from:', imageUrl);

    // Fetch the image from the external URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`,
      );
    }

    // Get the image as a blob
    const blob = await response.blob();
    if (!blob.type.startsWith('image/')) {
      throw new Error('Downloaded content is not an image');
    }

    // Create form data
    const formData = new FormData();
    const filename = options.filename || `reupload-${Date.now()}.jpg`;
    formData.append('image', blob, filename);

    if (options.folder) {
      formData.append('folder', options.folder);
    }

    // Determine the correct URL to use for uploads
    let uploadUrl: string;
    
    // Check if in browser context
    const isBrowser = typeof window !== 'undefined';
    
    if (isBrowser) {
      // Browser context - use relative URL
      uploadUrl = '/api/upload-image';
    } else {
      // Server context - need absolute URL
      // Use the provided baseUrl or default to localhost:3000
      const baseUrl = options.baseUrl || 'http://localhost:3000';
      uploadUrl = `${baseUrl}/api/upload-image`;
    }

    // Upload to Cloudinary
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorData = (await uploadResponse
        .json()
        .catch(() => ({error: 'Unknown error'}))) as {error?: string};
      throw new Error(
        errorData.error || `Upload failed with status ${uploadResponse.status}`,
      );
    }

    const result = (await uploadResponse.json()) as {
      success: boolean;
      url?: string;
      publicId?: string;
      width?: number;
      height?: number;
      bytes?: number;
      error?: string;
    };

    console.log('📤 Reuploaded image to:', result.url);
    return result;
  } catch (error) {
    console.error('Error reuploading to Cloudinary:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Reupload failed',
    };
  }
}
