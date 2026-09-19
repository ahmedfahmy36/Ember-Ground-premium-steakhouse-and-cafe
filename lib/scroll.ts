export function cinematicScrollTo(targetId: string, duration = 1200) {
  const target = document.getElementById(targetId);
  if (!target && targetId !== "top") return;

  // 72px is the height of the fixed navbar
  const targetPosition = targetId === "top" ? 0 : target!.getBoundingClientRect().top + window.scrollY - 72;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // easeInOutQuart - very cinematic and slow-starting, slow-ending
    const ease = progress < 0.5 
      ? 8 * progress * progress * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 4) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      if (targetId !== "top") {
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  }

  requestAnimationFrame(animation);
}
