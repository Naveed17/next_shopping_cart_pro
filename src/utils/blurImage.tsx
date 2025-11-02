'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getResponsiveSizes } from './imageOptimizer';

export default function ImageBlur({
  src,
  alt,
  width = 40,
  height = 40,
  fill,
  onError,
  className = '',
  ...props
}: any) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Image
        alt={alt}
        src={src}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII"
        {...(fill
          ? { fill, sizes: props.sizes || getResponsiveSizes('card') }
          : { width, height })}
        quality={props.quality || 75}
        priority={props.priority || false}
        className={`${className} ${loaded ? 'unblur' : ''}`}
        onLoad={() => setLoaded(true)}
        onError={onError}
        {...props}
      />

      <style jsx>{`
        .unblur {
          animation: unblur 0.3s linear;
        }
        @keyframes unblur {
          from {
            filter: blur(15px);
          }
          to {
            filter: blur(0);
          }
        }
      `}</style>
    </>
  );
}
