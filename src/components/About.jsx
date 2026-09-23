import { useEffect, useRef, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const lineOne = 'I BUILD CLEAN,';
const lineTwo = 'RESPONSIVE EXPERIENCES.';

const toolBoxes = [
  {
    box: 'box-1',
    icon: 'fas fa-code',
    title: 'Frontend Tools',
    desc: 'HTML5, CSS3, JavaScript, React, JSX, React Hooks & Responsive Design',
  },
  {
    box: 'box-2',
    icon: 'fas fa-layer-group',
    title: 'Backend & Tools',
    desc: 'Node.js, REST APIs, Git, GitHub, Vercel & Microsoft Excel',
  },
  {
    box: 'box-3',
    icon: 'fas fa-chart-line',
    title: 'Accounting & Analysis',
    desc: 'Accounting, Financial Reporting, Bookkeeping, Tax Preparation, Budgeting & Data Analysis',
  },
];

function CharLine({ text, order }) {
  return (
    <span className={`about-heading-line line-${order}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span key={i} className="char" style={{ '--i': i }} aria-hidden="true">
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

export default function About() {
  const headingRef = useScrollReveal();
  const p1Ref = useScrollReveal();
  const p2Ref = useScrollReveal();
  const p3Ref = useScrollReveal();
  const diagramRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = diagramRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about">
      <div className="container">
        <h2 ref={headingRef} className="about-heading">
          <CharLine text={lineOne} order={1} />
          <CharLine text={lineTwo} order={2} />
        </h2>

        <div className="about-grid">
          <div className="about-body">
            <p ref={p1Ref}>
              I'm Bassma Ait El Cadi, a junior full-stack developer with a strong foundation in
              modern web development.
              My journey into tech began with a deep curiosity about how websites work, and it has
              evolved into a passion for creating clean, responsive, and user-friendly digital experiences.
            </p>
            <p ref={p2Ref}>
              Currently, I'm expanding my skill set through hands-on projects and continuous learning,
              with a focus on building practical solutions that solve real-world problems. I believe in
              writing maintainable code and paying close attention to detail in every project I take on.
            </p>
            <p ref={p3Ref}>
              When I'm not coding, you'll find me exploring new technologies, refining my design eye,
              and seeking out opportunities to collaborate and grow as a developer.
            </p>
          </div>

          <div className="about-diagram" ref={diagramRef}>
            <div className={`about-staggered-wrapper${open ? ' is-open' : ''}`}>
              <button
                type="button"
                className={`merge-btn${open ? ' is-open' : ''}`}
                onClick={() => setOpen((v) => !v)}
              >
                Tools
              </button>

              <svg
                className="branch-svg-canvas"
                viewBox="0 0 660 600"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <path className="branch-line l1" pathLength="1" d="M62,48 C62,70 150,70 210,76" />
                <path className="branch-line l2" pathLength="1" d="M62,48 C62,160 15,190 15,268" />
                <path className="branch-line l3" pathLength="1" d="M62,48 C62,240 240,330 240,430" />
              </svg>

              <span className="branch-dot dot-1" aria-hidden="true" />
              <span className="branch-dot dot-2" aria-hidden="true" />
              <span className="branch-dot dot-3" aria-hidden="true" />

              {toolBoxes.map((card) => (
                <div key={card.box} className={`tooltip-content ${card.box}`}>
                  <div className="tooltip-header">
                    <i className={card.icon} />
                    <h3>{card.title}</h3>
                  </div>
                  <p className="tooltip-info">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}