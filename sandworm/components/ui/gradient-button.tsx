import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Using hex values directly for gradient compatibility
// sand-300: #ffb370, red-400: #f9808a, violet-600: #6242e0
const gradientButtonOuterVariants = cva(
  'group inline-flex overflow-hidden rounded-full bg-gradient-to-r from-[#ffb370] via-[#f9808a] to-[#6242e0] bg-[length:200%_200%] bg-left transition-all duration-500 ease-in-out hover:scale-[1.02] hover:bg-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--magenta-600))] focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        outline: 'p-[2px]',
        filled: 'p-0',
      },
      size: {
        default: '',
        sm: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
    },
  }
);

const gradientButtonInnerVariants = cva(
  'block whitespace-nowrap rounded-full font-mono text-xs font-medium uppercase tracking-widest transition-colors duration-500',
  {
    variants: {
      variant: {
        outline: 'bg-stone-950 text-stone-200 group-hover:text-white',
        filled: 'bg-transparent text-stone-950 group-hover:text-stone-900',
      },
      size: {
        default: 'px-6 py-2.5',
        sm: 'px-4 py-1 text-[10px]',
        lg: 'px-8 py-3 text-sm',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
    },
  }
);

// Filled variant classes (single-element, no inner span needed)
const filledBaseClasses =
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#ffb370] via-[#f9808a] to-[#6242e0] bg-[length:200%_200%] bg-left font-mono text-xs font-medium uppercase tracking-widest text-stone-950 transition-all duration-500 ease-in-out hover:scale-[1.02] hover:bg-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--magenta-600))] focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 disabled:pointer-events-none disabled:opacity-50';

const filledSizeClasses: Record<string, string> = {
  default: 'px-6 py-2.5',
  sm: 'px-4 py-1 text-[10px]',
  lg: 'px-8 py-3 text-sm',
};

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonOuterVariants> {}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const sizeKey = (size as string) || 'default';

    if (variant === 'filled') {
      return (
        <button
          className={cn(filledBaseClasses, filledSizeClasses[sizeKey], className)}
          ref={ref}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <button
        className={cn(gradientButtonOuterVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            gradientButtonInnerVariants({ variant, size }),
            'flex items-center justify-center gap-2'
          )}
        >
          {children}
        </span>
      </button>
    );
  }
);

GradientButton.displayName = 'GradientButton';

export { GradientButton, gradientButtonOuterVariants, gradientButtonInnerVariants };
