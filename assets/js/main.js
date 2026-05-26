document.addEventListener('DOMContentLoaded', () => {
  // Loader logic
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      // Enable body scroll if disabled previously
      document.body.style.overflow = 'visible';
    }, 1500); // 1.5 seconds loading experience
  }

  // Custom Cursor (Desktop Only)
  const cursor = document.getElementById('custom-cursor');
  
  if (cursor && window.matchMedia("(pointer: fine)").matches) {
    // Show cursor element only if device has a fine pointer (mouse)
    cursor.style.display = 'block';

    document.addEventListener('mousemove', (e) => {
      // Small delay for smooth trailing effect
      requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
    });

    // Add hover effect for clickable elements
    const clickables = document.querySelectorAll('a, button, .card');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });
  }
});
