'use client';

export async function downloadFile(url: string, filename: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
}

export function getBackgroundColor(variant: string) {
  switch (variant) {
    case 'color-light':
    case 'slate-050':
      return 'bg-[hsl(var(--stone-025))] dark:bg-[hsl(var(--stone-025))]';
    case 'color-dark':
    case 'slate-850':
      return 'bg-[hsl(var(--stone-975))] dark:bg-[hsl(var(--stone-975))]';
    case 'sand-050':
      return 'bg-[hsl(var(--sand-050))] dark:bg-[hsl(var(--sand-050))]';
    case 'sand-850':
      return 'bg-[hsl(var(--sand-850))] dark:bg-[hsl(var(--sand-850))]';
    default:
      return 'bg-[hsl(var(--stone-025))] dark:bg-[hsl(var(--stone-025))]';
  }
}
