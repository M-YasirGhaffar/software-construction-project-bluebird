// Importing React for creating functional components
import * as React from "react";

// Importing utility function for class name generation
import { cn } from "@/lib/utils";

// Defining the props type for the Input component
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Input Component:
 *
 * Custom input component with additional styling and features.
 *
 * @param {object} props - React component props.
 * @param {string} props.className - Additional classes to be applied to the component.
 * @param {string} props.type - Type of the input element (e.g., text, password).
 * @param {React.Ref} props.ref - Forwarded ref to access the underlying DOM element.
 * @param {object} props... - Other props are spread to the underlying input element.
 *
 * @returns {JSX.Element} - Rendered Input component.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

// Assigning a display name to the Input component for better debugging and profiling
Input.displayName = "Input";

// Exporting the Input component for use in other parts of the application
export { Input };

