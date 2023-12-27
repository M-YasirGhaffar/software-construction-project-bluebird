// Importing necessary dependencies
import { LucideMoveLeft } from "lucide-react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";

/**
 * BackButton Component: A button to navigate back using Next.js router.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.text] - Text to be displayed next to the icon. Defaults to "Back".
 */
export default function BackButton({ text }: { text?: string }) {
  // Accessing the Next.js router instance
  const router = useRouter();

  /**
   * Event handler for the BackButton onClick event.
   * Navigates back to the previous page using Next.js router.
   */
  const handleBack = () => {
    router.back();
  };

  // UI rendering for the BackButton
  return (
    <Button
      onClick={handleBack}
      variant="ghost"
      className="flex cursor-pointer items-center text-gray-500 hover:text-gray-600"
    >
      {/* Icon for the "move left" direction */}
      <LucideMoveLeft />

      {/* Text to be displayed next to the icon */}
      <p className="pl-2 text-sm leading-none">{text ?? "Back"}</p>
    </Button>
  );
}
