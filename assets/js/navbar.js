document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navbarLinks = document.querySelector('.navbar-links');

  // Glassmorphism scroll effect
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Initial check in case page is loaded scrolled down
  handleScroll();

  window.addEventListener('scroll', handleScroll);

  // Mobile Menu Toggle (Basic implementation for now)
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      // Toggle display for mobile links (will need more robust CSS/JS for a proper sliding drawer later)
      if (navbarLinks.style.display === 'flex') {
        navbarLinks.style.display = 'none';
      } else {
        navbarLinks.style.display = 'flex';
        navbarLinks.style.flexDirection = 'column';
        navbarLinks.style.position = 'absolute';
        navbarLinks.style.top = '100%';
        navbarLinks.style.left = '0';
        navbarLinks.style.width = '100%';
        navbarLinks.style.background = 'var(--bg-secondary)';
        navbarLinks.style.padding = 'var(--space-4)';
        navbarLinks.style.borderBottom = '1px solid var(--border)';
      }
    });
  }
});
