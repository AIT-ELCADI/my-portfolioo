import { useState, useEffect, useRef, useCallback } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const skillsData = [
  { icon: 'fab fa-html5', name: 'HTML5', desc: 'Semantic markup, accessibility, SEO-friendly structure. The backbone of every web page.', cat: 'Frontend', color: '#e34f26' },
  { icon: 'fab fa-css3-alt', name: 'CSS3', desc: 'Flexbox, Grid, animations, responsive layouts. Making the web beautiful.', cat: 'Frontend', color: '#1572b6' },
  { icon: 'fab fa-js', name: 'JavaScript', desc: 'DOM manipulation, ES6+, async/await, APIs. Bringing websites to life.', cat: 'Frontend', color: '#f7df1e' },
  { icon: 'fas fa-mobile-alt', name: 'Responsive Design', desc: 'Mobile-first approach, media queries, fluid grids. Every screen, perfectly.', cat: 'Frontend', color: '#c49498' },
  { icon: 'fab fa-git-alt', name: 'Git', desc: 'Version control, branching, merging, commit history. Tracking every change.', cat: 'Tool', color: '#f05032' },
  { icon: 'fab fa-github', name: 'GitHub', desc: 'Collaboration, pull requests, repositories, open source. Developer community.', cat: 'Platform', color: '#f5f0ec' },
  { icon: 'fab fa-microsoft', name: 'Microsoft Excel', desc: 'Data analysis, formulas, pivot tables, spreadsheets. Structured data mastery.', cat: 'Tool', color: '#217346' },
  { icon: 'fas fa-comments', name: 'Communication', desc: 'Clear expression, active listening, team collaboration. Bridging ideas and people.', cat: 'Soft Skill', color: '#c49498' },
  { icon: 'fas fa-users', name: 'Teamwork', desc: 'Collaborative problem solving, agile mindset, shared ownership of results.', cat: 'Soft Skill', color: '#c49498' },
  { icon: 'fas fa-lightbulb', name: 'Problem Solving', desc: 'Analytical thinking, creative solutions, debugging. Finding answers that work.', cat: 'Soft Skill', color: '#c49498' },
  { icon: 'fas fa-clock', name: 'Time Management', desc: 'Prioritization, deadlines, productivity. Making every hour count.', cat: 'Soft Skill', color: '#c49498' },
  { icon: 'fas fa-chart-line', name: 'Accounting', desc: 'Financial analysis, reporting, quantitative skills. The numbers behind decisions.', cat: 'Domain', color: '#c49498' },
  { icon: 'fas fa-file-excel', name: 'Data Analysis', desc: 'Extracting insights from data, reporting, spreadsheet modeling.', cat: 'Domain', color: '#217346' },
];

function fibonacciSphere(count) {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius });
  }
  return points;
}

export default function Skills() {
  const [paused, setPaused] = useState(false);
  const [info, setInfo] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const cloudRef = useRef(null);
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  const positions = fibonacciSphere(skillsData.length);
  const cloudRadius = 180;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPaused(true);
    }
  }, []);

  const handleMouse = useCallback((e) => {
    if (!info) return;
    const x = e.clientX + 20;
    const y = e.clientY - 10;
    setPos({ x: Math.min(x, window.innerWidth - 340), y: Math.min(y, window.innerHeight - 120) });
  }, [info]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);

  return (
    <section className="skills" id="skills">
      <div className="container">
        <p ref={labelRef} className="section-label">02 / Skills</p>
        <h2 ref={titleRef} className="section-title">Tech Stack &amp; Tools</h2>

        <div className="icon-cloud-wrapper">
          <div ref={cloudRef} className={`icon-cloud ${paused ? 'paused' : ''}`}>
            {skillsData.map((skill, i) => {
              const p = positions[i];
              const x = p.x * cloudRadius;
              const y = p.y * cloudRadius * 0.6;
              const z = p.z * cloudRadius;
              return (
                <div
                  key={i}
                  className="cloud-item"
                  style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)` }}
                  title={skill.name}
                  onMouseEnter={() => setInfo(skill)}
                  onMouseLeave={() => setInfo(null)}
                >
                  <i className={skill.icon} />
                </div>
              );
            })}
          </div>
          <button className="cloud-control" onClick={() => setPaused(!paused)} aria-label="Pause rotation">
            <i className={`fas fa-${paused ? 'play' : 'pause'}`} />
          </button>
        </div>

        <div className={`skill-info-card ${info ? 'visible' : ''}`} style={{ left: pos.x, top: pos.y }}>
          <div className="skill-info-icon" style={{ color: info?.color }}>
            <i className={info?.icon} />
          </div>
          <div className="skill-info-body">
            <h4>{info?.name}</h4>
            <p>{info?.desc}</p>
            <span className="skill-info-cat">{info?.cat}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
