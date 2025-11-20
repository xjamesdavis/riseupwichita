// Cursor-parallax tilt for .card elements (desktop only, respects prefers-reduced-motion and touch devices)
// Medium effect: small rotateX/Y based on cursor, combined with CSS hover transform via --tilt variable.
// Will not run on touch devices or if user prefers reduced motion.

(function () {
  if (typeof window === 'undefined') return;

  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || reduceMotion) return;

  const getCards = () => Array.from(document.querySelectorAll('.card, .job-card, .profile-card'));
  let rafId = null;

  function handleMove(e) {
    const clientX = e.clientX;
    const clientY = e.clientY;

    getCards().forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (clientX - cx) / (rect.width / 2);
      const dy = (clientY - cy) / (rect.height / 2);
      const clampedX = Math.max(-1, Math.min(1, dx));
      const clampedY = Math.max(-1, Math.min(1, dy));

      const rotateY = clampedX * 3;   // ±3deg
      const rotateX = -clampedY * 4;  // ±4deg
      const translateX = clampedX * 6;  // ±6px
      const translateY = -Math.abs(clampedY) * 6; // up to -6px

      // Set CSS variable --tilt so CSS hover transforms are combined with this tilt
      const tilt = `translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.setProperty('--tilt', tilt);
    });

    if (!rafId) rafId = requestAnimationFrame(() => { rafId = null; });
  }

  function handleLeave() {
    getCards().forEach((card) => {
      card.style.removeProperty('--tilt');
    });
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  document.addEventListener('mousemove', handleMove, { passive: true });
  document.addEventListener('mouseleave', handleLeave, { passive: true });
  document.addEventListener('mouseout', (e) => { if (!e.relatedTarget && !e.toElement) handleLeave(); }, { passive: true });

  window.addEventListener('scroll', handleLeave, { passive: true });
  window.addEventListener('resize', handleLeave, { passive: true });

})();