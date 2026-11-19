import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden bg-[#0F172A]',
  fallbackLabel
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={containerClassName}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className={className}
        />
      ) : (
        <div
          className="w-full h-full min-h-[160px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0F172A] via-[#131C31] to-[#060A14] border border-slate-800/80"
          role="img"
          aria-label={alt}
        >
          <Layers className="w-8 h-8 text-cyan-400/70 mb-2 shrink-0" />
          <span className="text-xs font-medium text-slate-300">
            {fallbackLabel || alt}
          </span>
        </div>
      )}
    </div>
  );
};
