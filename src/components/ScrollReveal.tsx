import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-in' | 'zoom-in';
  delayMs?: number;
  durationMs?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * ScrollReveal: Premium on-scroll reveal component
 * Uses native IntersectionObserver with GPU-accelerated transitions
 * Automatically reveals elements with elegant fade/slide effects as the user scrolls
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delayMs = 0,
  durationMs = 600,
  className = '',
  threshold = 0.08,
  rootMargin = '50px 0px -30px 0px',
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, reveal immediately
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && domRef.current) {
            observer.unobserve(domRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold, rootMargin, once]);

  // Initial hidden transform styles
  const getInitialStyle = () => {
    switch (animation) {
      case 'fade-up':
        return 'translate-y-8 opacity-0';
      case 'fade-down':
        return '-translate-y-8 opacity-0';
      case 'fade-left':
        return 'translate-x-8 opacity-0';
      case 'fade-right':
        return '-translate-x-8 opacity-0';
      case 'zoom-in':
        return 'scale-95 opacity-0';
      case 'fade-in':
      default:
        return 'opacity-0';
    }
  };

  const getVisibleStyle = () => {
    switch (animation) {
      case 'zoom-in':
        return 'scale-100 opacity-100';
      default:
        return 'translate-x-0 translate-y-0 opacity-100';
    }
  };

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
      }}
      className={`transition-all ease-out transform will-change-[transform,opacity] ${
        isVisible ? getVisibleStyle() : getInitialStyle()
      } ${className}`}
    >
      {children}
    </div>
  );
};
