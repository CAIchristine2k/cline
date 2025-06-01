// Cloudinary configuration
// This is a workaround for environment variable loading issues
// In production, these should be loaded from actual environment variables

interface CloudinaryConfig {
  cloudinaryUrl: string;
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

// Parse CLOUDINARY_URL from Hydrogen context environment variables
function getCloudinaryConfig(env: any): CloudinaryConfig {
  const cloudinaryUrl = env.CLOUDINARY_URL;

  if (!cloudinaryUrl) {
    throw new Error('CLOUDINARY_URL environment variable is not set');
  }

  // Parse CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
  try {
    const url = new URL(cloudinaryUrl);
    return {
      cloudinaryUrl,
      cloudName: url.hostname,
      apiKey: url.username,
      apiSecret: url.password,
    };
  } catch (error) {
    console.error('Failed to parse CLOUDINARY_URL:', error);
    throw new Error('Invalid CLOUDINARY_URL format');
  }
}

export {getCloudinaryConfig};
