// Importing necessary dependencies
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

// Importing utility function
import { cn } from "@/lib/utils";

/**
 * Avatar component that uses Radix UI Avatar primitives.
 *
 * @param {object} props - Props for the Avatar component.
 * @param {string} props.className - Additional CSS classes for styling.
 * @returns {JSX.Element} - Rendered Avatar component.
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    data-testid="avatar"
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

/**
 * AvatarImage component that uses Radix UI Avatar primitives.
 *
 * @param {object} props - Props for the AvatarImage component.
 * @param {string} props.className - Additional CSS classes for styling.
 * @returns {JSX.Element} - Rendered AvatarImage component.
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/**
 * AvatarFallback component that uses Radix UI Avatar primitives.
 *
 * @param {object} props - Props for the AvatarFallback component.
 * @param {string} props.className - Additional CSS classes for styling.
 * @returns {JSX.Element} - Rendered AvatarFallback component.
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    data-testid="avatar-image"
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Exporting components for external use
export { Avatar, AvatarFallback, AvatarImage };
