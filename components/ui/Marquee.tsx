interface MarqueeProps {
  items: readonly string[];
  /** Seconds for one full loop. Higher is slower. */
  duration?: number;
  className?: string;
}

/**
 * Infinite trust-marker ticker.
 *
 * Pure CSS transform animation on a duplicated track - no JS, no scroll
 * listener, no layout thrash. The duplicate half is hidden from assistive
 * tech so the list is announced exactly once.
 */
export function Marquee({ items, duration = 38, className = '' }: MarqueeProps) {
  return (
    <div
      className={`marquee-mask relative w-full overflow-hidden ${className}`}
    >
      <div
        className="marquee-track flex w-max items-center"
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        <MarqueeRow items={items} />
        <MarqueeRow items={items} ariaHidden />
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  ariaHidden = false,
}: {
  items: readonly string[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
    >
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="flex shrink-0 items-center gap-10 sm:gap-14"
        >
          <span className="text-[0.8125rem] font-medium tracking-[0.02em] whitespace-nowrap text-mist sm:text-sm">
            {item}
          </span>
          <span
            aria-hidden="true"
            className="h-1 w-1 shrink-0 rounded-full bg-accent"
          />
        </li>
      ))}
    </ul>
  );
}

export default Marquee;
