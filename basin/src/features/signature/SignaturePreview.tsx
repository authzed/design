import React, { useEffect, useState } from 'react';
import { SignatureConfig } from '@/core/types/signature';
import { generateSignatureHtml, SignatureGenerationError } from '@/utils/signature-generator';
import { SignatureErrorBoundary } from './SignatureErrorBoundary';
import { Card } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import { AlertCircle } from 'lucide-react';

interface SignaturePreviewProps {
  config: SignatureConfig;
  className?: string;
}

export function SignaturePreview({ config, className }: SignaturePreviewProps) {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const generateSignature = async () => {
      try {
        setLoading(true);
        setError(null);
        const generatedHtml = await generateSignatureHtml(config);
        
        if (mounted) {
          setHtml(generatedHtml);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof SignatureGenerationError
              ? err.message
              : 'An unexpected error occurred while generating the signature'
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    generateSignature();

    return () => {
      mounted = false;
    };
  }, [config]);

  if (loading) {
    return (
      <Card className={className}>
        <div className="p-4 space-y-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <SignatureErrorBoundary>
      <Card className={className}>
        <div 
          className="p-4"
          dangerouslySetInnerHTML={{ __html: html }} 
        />
      </Card>
    </SignatureErrorBoundary>
  );
}
