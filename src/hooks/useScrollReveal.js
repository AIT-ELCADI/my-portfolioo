import { useEffect, useRef } from 'react';

export default function useScrollReveal(threshold = 0.88) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-active');
          observer.unobserve(el);
        }
      },
      { threshold: 1 - threshold }
    );

    el.classList.add('reveal');
    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
