import { useState, useEffect } from 'react';

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#github', label: 'GitHub' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + 200;
      document.querySelectorAll('section[id]').forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          setActive('#' + id);
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => setMenuOpen(false);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container header-inner">
        <a href="#hero" className="logo">
          <span className="logo-bracket">&lt;</span>bassma<span className="logo-dot">.</span>dev<span className="logo-bracket">/&gt;</span>
        </a>
        <nav id="nav" className={menuOpen ? 'show' : ''}>
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${active === item.href ? 'active' : ''}`}
              onClick={handleClick}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span />
        </button>
      </div>
    </header>
  );
}
