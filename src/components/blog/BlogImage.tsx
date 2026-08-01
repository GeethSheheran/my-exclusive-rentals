"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BlogImageProps {
  src?: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

function isSupportedImageSource(src?: string): src is string {
  if (!src) return false;
  if (src.startsWith("/")) return true;

  try {
    const url = new URL(src);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function BlogImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: BlogImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const hasError = Boolean(src && failedSrc === src);

  if (!isSupportedImageSource(src) || hasError) {
    return (
      <div
        role="img"
        aria-label={alt || "Story image unavailable"}
        className="absolute inset-0 flex items-center justify-center bg-soft-gray text-gold/60"
      >
        <ImageIcon aria-hidden="true" size={34} strokeWidth={1} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "Blog story cover"}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized
      onError={() => setFailedSrc(src)}
      className={cn("object-cover", className)}
    />
  );
}
