'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO, SITE } from '@/lib/content';

type Status = 'idle' | 'invalid' | 'checked';

/**
 * ZIP availability checker.
 *
 * Front-end only by design - there is no backend in this build. It validates
 * the ZIP format and hands the visitor to a human to confirm capacity at
 * their exact address, which is the honest outcome: satellite availability
 * depends on cell capacity, not on ZIP alone.
 */
export function ZipChecker() {
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setStatus(/^\d{5}$/.test(zip.trim()) ? 'checked' : 'invalid');
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-2.5 sm:flex-row sm:items-center"
      >
        <label htmlFor="zip" className="sr-only">
          {HERO.zipLabel}
        </label>

        <div className="relative flex-1 sm:min-w-0">
          <input
            id="zip"
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={zip}
            onChange={(event) => {
              setZip(event.target.value.replace(/\D/g, '').slice(0, 5));
              if (status !== 'idle') setStatus('idle');
            }}
            placeholder={HERO.zipPlaceholder}
            aria-invalid={status === 'invalid'}
            aria-describedby="zip-result"
            className="h-14 w-full rounded-full border border-hairline-strong bg-white/[0.04] px-6 text-base font-medium text-pure placeholder:text-muted transition-colors duration-300 focus:border-accent focus:bg-white/[0.07] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="h-14 shrink-0 rounded-full bg-accent px-7 text-[0.9375rem] font-medium tracking-tight text-pure transition-colors duration-300 hover:bg-accent-bright active:scale-[0.98]"
        >
          {HERO.zipCta}
        </button>
      </form>

      <div id="zip-result" aria-live="polite" className="min-h-0">
        <AnimatePresence mode="wait">
          {status === 'invalid' && (
            <motion.p
              key="invalid"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
              className="mt-3 text-sm text-mist"
            >
              Please enter a valid 5-digit ZIP code.
            </motion.p>
          )}

          {status === 'checked' && (
            <motion.div
              key="checked"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
            >
              <span className="flex items-center gap-2 text-pure">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
                Starlink covers ZIP {zip}.
              </span>
              <span className="text-mist">
                Call {SITE.phoneDisplay} to confirm capacity at your address.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ZipChecker;
