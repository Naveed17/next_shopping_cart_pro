import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-lg bg-white dark:bg-gray-800 transition-colors',
          {
            'shadow-sm': variant === 'default',
            'border border-gray-200 dark:border-gray-700': variant === 'outlined',
            'shadow-lg': variant === 'elevated',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;