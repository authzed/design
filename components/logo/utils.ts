"use client";

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
    case "color-dark":
    case "slate-050":
      return "bg-stone-900";
    case "color-light":
    case "slate-850":
      return "bg-stone-100";
    default:
      return "bg-stone-100";
  }
}