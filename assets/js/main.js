document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // LOADER
  // ============================================
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      document.body.style.overflow = 'visible';
    }, 1200);
  }

  // ============================================
  // PREMIUM CURSOR LABEL SYSTEM
  // ============================================
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    // Smooth ring follow
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Cursor label rules: [selector, label]
    const labelRules = [
      ['a[href*="project-"]', 'VIEW'],
      ['.project-card', 'VIEW'],
      ['.wizard-option', 'SELECT'],
      ['.stack-tab', 'EXPLORE'],
      ['.btn-primary', 'OPEN'],
      ['.btn-secondary', 'OPEN'],
      ['.manifesto-principle', 'READ'],
      ['.domain-cell', 'DOMAIN'],
      ['a[href="contact.html"]', 'CONTACT'],
      ['a[href="labs.html"]', 'LABS'],
    ];

    function attachCursorLabel(el, label) {
      el.addEventListener('mouseenter', () => {
        ring.setAttribute('data-label', label);
        document.body.classList.add('cursor-expand');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-expand');
      });
    }

    labelRules.forEach(([selector, label]) => {
      document.querySelectorAll(selector).forEach(el => attachCursorLabel(el, label));
    });

    // Generic fallback for any unmatched buttons/links
    document.querySelectorAll('a:not([data-cursor-set]), button:not([data-cursor-set])').forEach(el => {
      // Only attach if no specific rule matched
      if (!el.matches(labelRules.map(r => r[0]).join(','))) {
        el.addEventListener('mouseenter', () => {
          ring.setAttribute('data-label', '');
          document.body.classList.add('cursor-expand');
        });
        el.addEventListener('mouseleave', () => {
          document.body.classList.remove('cursor-expand');
        });
      }
    });
  }
});
