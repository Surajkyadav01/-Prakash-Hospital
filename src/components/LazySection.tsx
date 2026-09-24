import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  placeholderHeight?: string | number;
  minHeight?: string | number;
  rootMargin?: string;
  className?: string;
  id?: string;
}

/**
 * LazySection: Defers rendering and hydration of below-the-fold sections
 * until the user scrolls within `rootMargin` (default 300px) of the section.
 * This guarantees ultra-fast initial page load while ensuring zero wait time when scrolling.
 */
export const LazySection: React.FC<LazySectionProps> = ({
  children,
  placeholderHeight = '400px',
  minHeight,
  rootMargin = '800px 0px',
  className = '',
  id,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const effectiveHeight = minHeight ?? placeholderHeight;

  useEffect(() => {
    // If IntersectionObserver is not supported, render immediately
    if (!('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      {
        rootMargin,
      }
    );

    const currentElem = containerRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    // Idle pre-render fallback: after 2.5 seconds of initial load,
    // render background sections so they are ready before user even scrolls
    const idleTimer = setTimeout(() => {
      setShouldRender(true);
    }, 2500);

    return () => {
      clearTimeout(idleTimer);
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [rootMargin]);

  return (
    <div id={id} ref={containerRef} className={className}>
      {shouldRender ? (
        <div className="animate-in fade-in duration-500">
          {children}
        </div>
      ) : (
        <div
          style={{ minHeight: typeof effectiveHeight === 'number' ? `${effectiveHeight}px` : effectiveHeight }}
          className="w-full flex items-center justify-center opacity-0 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
