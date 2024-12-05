import { useRef, useState, useEffect } from 'react';

export function useProjectCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded) {
      // Add overlay to other cards
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card) => {
        if (card !== containerRef.current) {
          card.classList.add('opacity-50');
        }
      });

      // Animate content
      if (contentRef.current) {
        requestAnimationFrame(() => {
          contentRef.current?.classList.remove('opacity-0');
        });
      }

      // Scroll into view if needed
      containerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    } else {
      // Remove overlay from other cards
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card) => {
        card.classList.remove('opacity-50');
      });

      // Hide content
      if (contentRef.current) {
        contentRef.current.classList.add('opacity-0');
      }
    }
  }, [isExpanded]);

  const toggleExpanded = () => {
    if (!isExpanded) {
      setAnimationClass('scale-[1.02]');
      setTimeout(() => setAnimationClass(''), 300);
    }
    setIsExpanded(!isExpanded);
  };

  return {
    isExpanded,
    containerRef,
    contentRef,
    toggleExpanded,
    animationClass,
  };
}