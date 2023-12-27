import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";


/**
 * Toaster Component:
 *
 * Renders a ToastProvider with Toast components for displaying toasts.
 * Uses the useToast hook to retrieve toast data.
 *
 * @returns {JSX.Element} - Rendered Toaster component.
 */
export function Toaster() {

  // Retrieve toast data using the useToast hook

  const { toasts } = useToast();

  return (
    <ToastProvider>
      {/* Map over the array of toasts and render Toast components */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>

            {/* Render title and description inside a grid container */}
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>

            {/* Render optional action element */}
            {action}

            {/* Render ToastClose component for closing the toast */}
            <ToastClose />
          </Toast>
        );
      })}

      
      {/* Render ToastViewport component for managing toast positioning */}
      <ToastViewport />
    </ToastProvider>
  );
}
