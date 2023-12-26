import fallbackImage from "@/../public/placeholder.png"
import Image, { type ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

type ImageWithFallbackProps = {
    fallback?: ImageProps["src"]
    src: ImageProps["src"]
    alt?: ImageProps["alt"]  // Adding alt as an optional prop
}

/**
 * ImageWithFallback Component
 *
 * This component renders an image using Next.js Image component with fallback functionality.
 *
 * @param {ImageWithFallbackProps} props - The properties of the component.
 * @param {string} props.src - The source URL of the image.
 * @param {string} [props.alt] - The alternative text for the image (optional).
 * @param {string} [props.fallback] - The fallback source URL in case the main image fails to load (optional).
 *
 * @returns {React.Component} - The rendered ImageWithFallback component.
 */
const ImageWithFallback = ({
    fallback = fallbackImage,
    alt,
    src,
    ...props
}: ImageProps & ImageWithFallbackProps) => {
    const [error, setError] = useState(false)

    /**
     * useEffect to reset error state when the source changes.
     */
    useEffect(() => {
        setError(false)
    }, [src])

    /**
     * Render the Image component with fallback functionality.
     *
     * @returns {React.Component} - The rendered Image component.
     */
    return (
        <Image
            alt={alt}
            onError={() => setError(true)} // Handling error state when the image fails to load.
            src={error ? fallback : src}
            {...props}
        />
    )
}

export default ImageWithFallback;
