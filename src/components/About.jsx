import { useEffect, useRef, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const lineOne = 'I TURN IDEAS INTO';
const lineTwo = 'DIGITAL EXPERIENCES.';

const toolBoxes = [
  {
    box: 'box-1',
    icon: 'frontend',
    title: 'Frontend Tools',
    desc: 'HTML5, CSS3, JavaScript, React, JSX, React Hooks & Responsive Design',
  },
  {
    box: 'box-2',
    icon: 'backend',
    title: 'Backend & Tools',
    desc: 'Node.js, REST APIs, Git, GitHub, Vercel & Microsoft Excel',
  },
  {
    box: 'box-3',
    icon: 'analysis',
    title: 'Accounting & Analysis',
    desc: 'Accounting, Financial Reporting, Bookkeeping, Tax Preparation, Budgeting & Data Analysis',
  },
];

function CharLine({ text, order }) {
  return (
    <span className={`about-heading-line line-${order}`} aria-hidden="true">
      {text.split('').map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="char"
          style={{ '--i': index }}
          aria-hidden="true"
        >
          {character === ' ' ? '\u00A0' : character}
        </span>
      ))}
    </span>
  );
}

function ToolIcon({ type }) {
  if (type === 'backend') {
    return (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="2" width="12" height="5" rx="1.5" />
        <rect x="2" y="9" width="12" height="5" rx="1.5" />
        <circle cx="5" cy="4.5" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="5" cy="11.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === 'analysis') {
    return (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M8 2a6 6 0 1 0 6 6c0-1.5-1-2-2-2h-1a2 2 0 0 1-2-2V3a1 1 0 0 0-1-1Z" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <path d="M2 6h12" />
      <path d="M6 6v8" />
    </svg>
  );
}

export default function About() {
  const diagramRef = useRef(null);
  const headingRef = useScrollReveal(0.9);
  const p1Ref = useScrollReveal();
  const p2Ref = useScrollReveal();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;

    let openTimer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(openTimer);

        if (entry.isIntersecting) {
          openTimer = setTimeout(() => setOpen(true), 250);
        } else {
          setOpen(false);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(diagram);
    return () => {
      clearTimeout(openTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="about" id="about">
      <div className="container">
        <h2 ref={headingRef} className="about-heading" aria-label={`${lineOne} ${lineTwo}`}>
          <CharLine text={lineOne} order={1} />
          <CharLine text={lineTwo} order={2} />
        </h2>

        <div className="about-grid">
          <div className="about-body">
            <p ref={p1Ref}>
              I'm Bassma Ait El Cadi, a junior full-stack developer with a strong foundation in
              modern web development. My journey into tech began with curiosity about how websites
              work and has grown into a passion for clean, responsive, user-friendly experiences.
            </p>
            <p ref={p2Ref}>
              I'm always expanding my skill set through hands-on projects and continuous learning,
              with a focus on practical solutions that solve real-world problems. When I'm not coding,
              you'll find me exploring new technologies, refining my design eye, and seeking new
              opportunities to collaborate and grow.
            </p>
          </div>

          <div className="about-diagram">
            <div
              className={`about-staggered-wrapper${open ? ' is-open' : ''}`}
              ref={diagramRef}
            >
              <div className="trigger-wrapper">
                <button
                  type="button"
                  className="merge-btn"
                  onClick={() => setOpen((current) => !current)}
                  aria-expanded={open}
                  aria-controls="about-tool-panels"
                >
                  Tools
                </button>
              </div>

              <svg
                className="branch-svg-canvas"
                viewBox="0 0 660 600"
                aria-hidden="true"
                focusable="false"
              >
                <path className="branch-line line-box1" d="M62,48 C62,70 150,70 210,76" />
                <circle cx="210" cy="76" r="4" className="branch-dot dot-box1" />
                <path className="branch-line line-box2" d="M62,48 C62,150 15,170 15,245" />
                <circle cx="15" cy="245" r="4" className="branch-dot dot-box2" />
                <path className="branch-line line-box3" d="M62,48 C62,220 240,300 240,415" />
                <circle cx="240" cy="415" r="4" className="branch-dot dot-box3" />
              </svg>

              <div
                className="about-tool-panels"
                id="about-tool-panels"
                aria-hidden={!open}
              >
                {toolBoxes.map((card) => (
                  <div key={card.box} className={`tooltip-content ${card.box}`}>
                    <div className="tooltip-header">
                      <ToolIcon type={card.icon} />
                      <h3>{card.title}</h3>
                    </div>
                    <div className="tooltip-info">{card.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
