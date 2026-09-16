import Image from 'next/image';
import type { SiteImage } from '@/lib/content';

interface BackdropImageProps {
  image: SiteImage;
  /** Set on the hero only - it is the LCP element. */
  priority?: boolean;
  /** Tailwind object-position override for the landscape crop. */
  objectPosition?: string;
}

/**
 * Full-bleed section backdrop with art direction.
 *
 * A phone viewport is roughly 0.4:1 while these photographs are 1.6-1.8:1, so
 * `object-cover` on a landscape frame throws away ~75% of its width and the
 * subject disappears. Where a portrait `mobileSrc` exists we serve that below
 * the `sm` breakpoint instead.
 *
 * Both variants are in the DOM (browsers fetch `display:none` images anyway),
 * so the hidden one is given a `sizes` slot of 1px. Next then resolves it to
 * the smallest entry in the srcset - about a kilobyte - rather than a second
 * full-size download. The visible one gets the real 100vw slot.
 */
export function BackdropImage({
  image,
  priority = false,
  objectPosition = 'object-center',
}: BackdropImageProps) {
  const hasMobile = Boolean(image.mobileSrc);

  return (
    <>
      {hasMobile && (
        <Image
          src={image.mobileSrc as string}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(max-width: 639px) 100vw, 1px"
          className="object-cover object-center sm:hidden"
        />
      )}

      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={hasMobile ? '(min-width: 640px) 100vw, 1px' : '100vw'}
        className={[
          'object-cover',
          objectPosition,
          hasMobile ? 'hidden sm:block' : '',
        ].join(' ')}
      />
    </>
  );
}

export default BackdropImage;
