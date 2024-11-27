"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function ToastExamples() {
  const { toast } = useToast();

  const showSuccessToast = () => {
    toast({
      title: "Success",
      description: "Your action was completed successfully."
    });
  };

  const showErrorToast = () => {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Something went wrong. Please try again."
    });
  };

  return (
    <div className="space-y-4">
      <Button onClick={showSuccessToast}>
        Show Success Toast
      </Button>
      <Button
        variant="destructive"
        onClick={showErrorToast}
      >
        Show Error Toast
      </Button>
    </div>
  );
}