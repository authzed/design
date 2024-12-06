export function getOgImage(url: string): string {
  // Remove trailing slash if present
  const cleanUrl = url.replace(/\/$/, '');
  
  // Known patterns for popular sites
  if (cleanUrl.includes('github.com')) {
    return `https://opengraph.githubassets.com/1/${cleanUrl.split('github.com/')[1]}`;
  }
  
  // For other sites, use a reliable OG image service
  return `https://og-image.vercel.app/${encodeURIComponent(cleanUrl)}`;
}