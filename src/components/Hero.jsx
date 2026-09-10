import { useState, useEffect } from 'react';
import heroImage from '../assets/hero.png';

const words = ['Full-Stack Developer', 'Accounting Student'];

export default function Hero() {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    function type() {
      const current = words[wordIndex];
      if (isDeleting) {
        setTyped(current.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTyped(current.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 55 : 110;
      if (!isDeleting && charIndex === current.length) {
        speed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
      }
      timeout = setTimeout(type, speed);
    }
    type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <p className="hero-greeting">Hello, my name is</p>
          <h1 className="hero-name">Bassma Ait El Cadi</h1>
          <div className="hero-code">
            <span className="code-keyword">const</span> <span className="code-var">role</span> = <span className="code-string">"{typed}<span className="typing-cursor">|</span>"</span>;
          </div>
          <p className="hero-bio">
            I build clean, responsive, and user-friendly web experiences.
            Passionate about combining technical skills with creative design
            to bring ideas to life on the web.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="/cv/cv-bassma-ait-el-cadi.pdf" className="btn btn-outline" download>Download CV</a>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/AIT-ELCADI" target="_blank" rel="noopener" aria-label="GitHub"><i className="fab fa-github" /></a>
            <a href="https://www.linkedin.com/in/bassma-ait-elcadi/" target="_blank" rel="noopener" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
            <a href="https://www.instagram.com/_bassmaah" target="_blank" rel="noopener" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            <a href="https://wa.me/212658718865" target="_blank" rel="noopener" aria-label="WhatsApp"><i className="fab fa-whatsapp" /></a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img src={heroImage} alt="Bassma Ait El Cadi" className="hero-image" />
            <div className="hero-image-ring" />
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">1+</span>
              <span className="stat-label">Year Learning</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Technologies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Dedication</span>
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-indicator" aria-label="Scroll down">
        <span className="scroll-mouse">
          <span className="scroll-wheel" />
        </span>
      </a>
    </section>
  );
}
