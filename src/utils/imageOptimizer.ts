/**
 * Image optimization utility for better performance
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}

/**
 * Optimizes Unsplash image URLs for better performance
 */
export function optimizeImageUrl(
  url: string, 
  options: ImageOptimizationOptions = {}
): string {
  const { width = 200, height = 200, quality = 60, format = 'webp' } = options;
  
  // Check if it's an Unsplash URL
  if (url.includes('images.unsplash.com')) {
    // Remove existing parameters
    const baseUrl = url.split('?')[0];
    
    // Add optimized parameters
    return `${baseUrl}?w=${width}&h=${height}&fit=crop&q=${quality}&fm=${format}&auto=format`;
  }
  
  return url;
}

/**
 * Get optimized image sizes for different contexts
 */
export const IMAGE_SIZES = {
  thumbnail: { width: 80, height: 80, quality: 60 },
  card: { width: 250, height: 250, quality: 75 },
  gallery: { width: 500, height: 500, quality: 80 },
  hero: { width: 800, height: 600, quality: 85 },
  logo: { width: 60, height: 60, quality: 70 }
} as const;

/**
 * Get responsive image sizes string for Next.js Image component
 */
export function getResponsiveSizes(context: 'card' | 'gallery' | 'hero' | 'thumbnail'): string {
  switch (context) {
    case 'thumbnail':
      return '80px';
    case 'card':
      return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
    case 'gallery':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    case 'hero':
      return '100vw';
    default:
      return '(max-width: 768px) 100vw, 50vw';
  }
}