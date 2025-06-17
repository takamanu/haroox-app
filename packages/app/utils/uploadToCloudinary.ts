interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder?: string;
  access_mode: string;
  original_filename: string;
}

interface UploadOptions {
  folder?: string;
  public_id?: string;
  resource_type?: 'image' | 'video' | 'raw' | 'auto';
  tags?: string[];
  context?: Record<string, string>;
  use_filename?: boolean;
  unique_filename?: boolean;
  overwrite?: boolean;
  transformation?: string;
}

/**
 * Simple hash function for React Native (demo purposes only)
 * In production, generate signatures on your backend using proper SHA-1
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Generate signature for Cloudinary upload
 * This is a simple implementation - in production, generate signatures on your backend
 */
function generateSignature(params: Record<string, any>, apiSecret: string): string {
  // Sort parameters
  const sortedParams = Object.keys(params)
    .filter(key => key !== 'file' && key !== 'resource_type')
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  // Simple hash implementation for React Native
  // In production, use proper SHA-1 hash generated on your backend
  return simpleHash(sortedParams + apiSecret);
}

/**
 * Fetch file from URL and convert to blob
 */
async function fetchFileFromUrl(urlPath: string): Promise<{ blob: Blob; filename: string }> {
  try {
    const response = await fetch(urlPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob();
    
    // Extract filename from URL
    const url = new URL(urlPath);
    const pathname = url.pathname;
    const filename = pathname.split('/').pop() || 'file';
    
    return { blob, filename };
  } catch (error) {
    throw new Error(`Failed to fetch file from URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Upload file to Cloudinary using REST API
 * @param urlPath - URL of the file to upload
 * @param config - Cloudinary configuration
 * @param options - Upload options
 * @returns Promise<CloudinaryUploadResult>
 */
export async function uploadToCloudinaryREST(
  urlPath: string,
  config: CloudinaryConfig,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  try {
    // Validate inputs
    if (!urlPath || typeof urlPath !== 'string') {
      throw new Error('Invalid URL path provided');
    }

    if (!config.cloudName || !config.apiKey || !config.apiSecret) {
      throw new Error('Missing Cloudinary configuration');
    }

    // Validate URL
    try {
      new URL(urlPath);
    } catch {
      throw new Error('Invalid URL format');
    }

    // Fetch file from URL
    const { blob, filename } = await fetchFileFromUrl(urlPath);

    // Prepare upload parameters
    const timestamp = Math.round(Date.now() / 1000);
    const uploadParams: Record<string, any> = {
      timestamp,
      ...options,
    };

    // Remove undefined values
    Object.keys(uploadParams).forEach(key => {
      if (uploadParams[key] === undefined) {
        delete uploadParams[key];
      }
    });

    // Generate signature (in production, do this on your backend!)
    const signature = generateSignature(uploadParams, config.apiSecret);

    // Create form data
    const formData = new FormData();
    formData.append('file', blob, filename);
    formData.append('api_key', config.apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    // Add other parameters
    Object.entries(uploadParams).forEach(([key, value]) => {
      if (key !== 'timestamp') {
        formData.append(key, Array.isArray(value) ? value.join(',') : value.toString());
      }
    });

    // Upload to Cloudinary
    const uploadUrl = `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`;
    
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cloudinary upload failed: ${response.status} ${errorText}`);
    }

    const result: CloudinaryUploadResult = await response.json();
    return result;

  } catch (error) {
    console.error('Cloudinary REST upload error:', error);
    throw new Error(`Failed to upload to Cloudinary: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Alternative method: Upload by sending URL directly to Cloudinary
 * This method tells Cloudinary to fetch the file from the URL
 */
export async function uploadUrlToCloudinaryREST(
  urlPath: string,
  config: CloudinaryConfig,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  try {
    // Validate inputs
    if (!urlPath || typeof urlPath !== 'string') {
      throw new Error('Invalid URL path provided');
    }

    if (!config.cloudName || !config.apiKey || !config.apiSecret) {
      throw new Error('Missing Cloudinary configuration');
    }

    // Prepare upload parameters
    const timestamp = Math.round(Date.now() / 1000);
    const uploadParams: Record<string, any> = {
      timestamp,
      ...options,
    };

    // Remove undefined values
    Object.keys(uploadParams).forEach(key => {
      if (uploadParams[key] === undefined) {
        delete uploadParams[key];
      }
    });

    // Generate signature
    const signature = generateSignature(uploadParams, config.apiSecret);

    // Create form data
    const formData = new FormData();
    formData.append('file', urlPath); // Send URL directly
    formData.append('api_key', config.apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    // Add other parameters
    Object.entries(uploadParams).forEach(([key, value]) => {
      if (key !== 'timestamp') {
        formData.append(key, Array.isArray(value) ? value.join(',') : value.toString());
      }
    });

    // Upload to Cloudinary
    const uploadUrl = `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`;
    
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cloudinary upload failed: ${response.status} ${errorText}`);
    }

    const result: CloudinaryUploadResult = await response.json();
    return result;

  } catch (error) {
    console.error('Cloudinary URL upload error:', error);
    throw new Error(`Failed to upload URL to Cloudinary: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Upload multiple files using REST API
 */
export async function uploadMultipleToCloudinaryREST(
  urlPaths: string[],
  config: CloudinaryConfig,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult[]> {
  try {
    const uploadPromises = urlPaths.map(urlPath => 
      uploadToCloudinaryREST(urlPath, config, options)
    );

    const results = await Promise.allSettled(uploadPromises);
    
    const successfulUploads: CloudinaryUploadResult[] = [];
    const failedUploads: string[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        successfulUploads.push(result.value);
      } else {
        failedUploads.push(`${urlPaths[index]}: ${result.reason}`);
      }
    });

    if (failedUploads.length > 0) {
      console.warn('Some uploads failed:', failedUploads);
    }

    return successfulUploads;
  } catch (error) {
    console.error('Multiple REST upload error:', error);
    throw new Error(`Failed to upload multiple files: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Upload local file (React Native) to Cloudinary using UNSIGNED upload
 * This is the recommended approach for mobile apps - no API secret needed
 * @param fileUri - Local file URI (from image picker)
 * @param cloudName - Your Cloudinary cloud name
 * @param uploadPreset - Your unsigned upload preset name
 * @param options - Additional upload options
 * @returns Promise<CloudinaryUploadResult>
 */
export async function uploadToCloudinaryUnsigned(
  fileUri: string,
  cloudName: string,
  uploadPreset: string,
  options: Omit<UploadOptions, 'resource_type'> & { resource_type?: string } = {}
): Promise<CloudinaryUploadResult> {
  try {
    // Validate inputs
    if (!fileUri || typeof fileUri !== 'string') {
      throw new Error('Invalid file URI provided');
    }

    if (!cloudName || !uploadPreset) {
      throw new Error('Missing cloudName or uploadPreset');
    }

    // Create form data for React Native
    const formData = new FormData();
    
    // For React Native, append file with proper format
    formData.append('file', {
      uri: fileUri,
      type: 'image/jpeg', // You can make this dynamic based on file extension
      name: 'image.jpg',
    } as any);
    
    formData.append('upload_preset', uploadPreset);

    // Add other parameters (only safe ones for unsigned uploads)
    const allowedParams = ['folder', 'public_id', 'tags', 'context', 'use_filename', 'unique_filename', 'overwrite'];
    Object.entries(options).forEach(([key, value]) => {
      if (allowedParams.includes(key) && value !== undefined) {
        formData.append(key, Array.isArray(value) ? value.join(',') : value.toString());
      }
    });

    // Upload to Cloudinary (unsigned endpoint)
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cloudiary upload failed: ${response.status} ${errorText}`);
    }

    const result: CloudinaryUploadResult = await response.json();
    return result;

  } catch (error) {
    console.error('Cloudinary unsigned upload error:', error);
    throw new Error(`Failed to upload to Cloudinary: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Example usage:
/*
// RECOMMENDED: Use unsigned uploads for React Native
if (!result.canceled && result.assets.length > 0) {
  const uri = result.assets[0].uri;
  try {
    const cloudUrl = await uploadToCloudinaryUnsigned(
      uri,
      'your-cloud-name',
      'your-upload-preset', // Create this in Cloudinary dashboard
      {
        folder: 'uploads',
        tags: ['mobile-upload']
      }
    );
    console.log("URL =====>", cloudUrl.secure_url);
    // setPhotoUrl(cloudUrl.secure_url);
  } catch (e) {
    console.error('Upload error:', e);
    Alert.alert('Upload Error', 'Failed to upload image to Cloudinary');
  }
}

// Alternative: Use signed uploads (requires backend for security)
const config: CloudinaryConfig = {
  cloudName: 'your-cloud-name',
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret' // Keep this secure!
};

// React Native usage with image picker result (signed)
if (!result.canceled && result.assets.length > 0) {
  const uri = result.assets[0].uri;
  try {
    const cloudUrl = await uploadLocalFileToCloudinary(uri, config, {
      folder: 'uploads',
      tags: ['mobile-upload'],
      resource_type: 'image'
    });
    console.log("URL =====>", cloudUrl.secure_url);
    // setPhotoUrl(cloudUrl.secure_url);
  } catch (e) {
    Alert.alert('Upload Error', 'Failed to upload image to Cloudinary');
  }
}

// Web usage with URL
const result1 = await uploadToCloudinaryREST(
  'https://example.com/image.jpg',
  config,
  {
    folder: 'uploads',
    tags: ['rest-upload'],
    public_id: 'my-image'
  }
);
*/