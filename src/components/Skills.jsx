import { useState, useEffect, useRef, useCallback } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const skillsData = [
  { icon: 'fab fa-html5', name: 'HTML5', desc: 'Semantic markup, accessibility, SEO-friendly structure. The backbone of every web page.', cat: 'Frontend', color: '#e34f26' },
  { icon: 'fab fa-css3-alt', name: 'CSS3', desc: 'Flexbox, Grid, animations, responsive layouts. Making the web beautiful.', cat: 'Frontend', color: '#1572b6' },
  { icon: 'fab fa-js', name: 'JavaScript', desc: 'DOM manipulation, ES6+, async/await, APIs. Bringing websites to life.', cat: 'Frontend', color: '#f7df1e' },
  { icon: 'fab fa-react', name: 'React', desc: 'Component-based UI library with virtual DOM, hooks, and a powerful ecosystem for modern web apps.', cat: 'Frontend', color: '#61dafb' },
  { icon: 'fas fa-code', name: 'JSX', desc: 'Writing HTML-like syntax in JavaScript for declarative, readable component templates.', cat: 'Frontend', color: '#61dafb' },
  { icon: 'fas fa-plug', name: 'React Hooks', desc: 'useState, useEffect, useRef, useCallback — managing state and side effects in functional components.', cat: 'Frontend', color: '#61dafb' },
  { icon: 'fas fa-sitemap', name: 'Component Architecture', desc: 'Building reusable, composable UI pieces with proper prop drilling and separation of concerns.', cat: 'Frontend', color: '#61dafb' },
  { icon: 'fas fa-mobile-alt', name: 'Responsive Design', desc: 'Mobile-first approach, media queries, fluid grids. Every screen, perfectly.', cat: 'Frontend', color: '#c49498' },
  { icon: 'fab fa-git-alt', name: 'Git', desc: 'Version control, branching, merging, commit history. Tracking every change.', cat: 'Tool', color: '#f05032' },
  { icon: 'fab fa-github', name: 'GitHub', desc: 'Collaboration, pull requests, repositories, open source. Developer community.', cat: 'Platform', color: '#f5f0ec' },
  { icon: 'fab fa-microsoft', name: 'Microsoft Excel', desc: 'Data analysis, formulas, pivot tables, spreadsheets. Structured data mastery.', cat: 'Tool', color: '#217346' },
  { icon: 'fas fa-comments', name: 'Communication', desc: 'Clear expression, active listening, team collaboration. Bridging ideas and people.', cat: 'Soft Skill', color: '#c49498' },
  { icon: 'fas fa-users', name: 'Teamwork', desc: 'Collaborative problem solving, agile mindset, shared ownership of results.', cat: 'Soft Skill', color: '#c49498' },
  { icon: 'fas fa-lightbulb', name: 'Problem Solving', desc: 'Analytical thinking, creative solutions, debugging. Finding answers that work.', cat: 'Soft Skill', color: '#c49498' },
  { icon: 'fas fa-clock', name: 'Time Management', desc: 'Prioritization, deadlines, productivity. Making every hour count.', cat: 'Soft Skill', color: '#c49498' },
  { icon: 'fas fa-chart-line', name: 'Accounting', desc: 'Financial analysis, reporting, quantitative skills. The numbers behind decisions.', cat: 'Domain', color: '#c49498' },
  { icon: 'fas fa-file-invoice-dollar', name: 'Financial Reporting', desc: 'Preparing income statements, balance sheets, and cash flow reports with accuracy and compliance.', cat: 'Domain', color: '#c49498' },
  { icon: 'fas fa-book', name: 'Bookkeeping', desc: 'Recording daily transactions, managing ledgers, and maintaining accurate financial records.', cat: 'Domain', color: '#c49498' },
  { icon: 'fas fa-receipt', name: 'Tax Preparation', desc: 'Understanding tax codes, filing returns, and ensuring regulatory compliance for individuals and businesses.', cat: 'Domain', color: '#c49498' },
  { icon: 'fas fa-wallet', name: 'Budgeting', desc: 'Planning and controlling finances, forecasting revenue, and managing expenses effectively.', cat: 'Domain', color: '#c49498' },
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

const getCloudRadius = () => {
  const w = window.innerWidth;
  if (w <= 576) return 140;
  if (w <= 768) return 180;
  if (w <= 1024) return 215;
  return 330;
};

export default function Skills() {
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [info, setInfo] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [cloudRadius, setCloudRadius] = useState(getCloudRadius);
  const cloudRef = useRef(null);
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  const positions = fibonacciSphere(skillsData.length);

  useEffect(() => {
    const applyRadius = () => setCloudRadius(getCloudRadius());
    window.addEventListener('resize', applyRadius);
    return () => window.removeEventListener('resize', applyRadius);
  }, []);

  const handleMouse = useCallback((e) => {
    if (!info) return;
    const x = e.clientX + 20;
    const y = e.clientY - 10;
    setPos({ x: Math.min(x, window.innerWidth - 340), y: Math.min(y, window.innerHeight - 120) });
  }, [info]);

  const handleCloudMove = useCallback((e) => {
    const cloud = cloudRef.current;
    if (!cloud) return;
    let picked = null;
    let pickedZ = -Infinity;
    cloud.childNodes.forEach((el, i) => {
      if (el.nodeType !== Node.ELEMENT_NODE) return;
      const r = el.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        if (positions[i].z > pickedZ) {
          picked = i;
          pickedZ = positions[i].z;
        }
      }
    });
    if (picked !== null) {
      setInfo((prev) => (prev?.name === skillsData[picked].name ? prev : skillsData[picked]));
    } else {
      setInfo(null);
    }
  }, [positions]);

  const handleCloudLeave = useCallback(() => setInfo(null), []);

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
          <div
            ref={cloudRef}
            className={`icon-cloud ${paused ? 'paused' : ''}`}
            onMouseMove={handleCloudMove}
            onMouseLeave={handleCloudLeave}
            onClick={(e) => {
              if (e.target === e.currentTarget) setInfo(null);
            }}
          >
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
                  onClick={() => setInfo(skill)}
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
