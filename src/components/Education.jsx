import useScrollReveal from '../hooks/useScrollReveal';

const items = [
  { date: 'May 2026 — Present', title: 'Web Development Training', company: 'WingsTech Center', desc: 'Intensive training in modern web development technologies and best practices.' },
  { date: '2024 — Present', title: "Bachelor's Degree in Accounting", company: 'Hassan II University', desc: 'Strong foundation in analytical thinking, data management, and financial analysis.' },
  { date: '2023 — 2024', title: 'Baccalaureate in Accounting', desc: 'Academic background in accounting and quantitative analysis.' },
];

export default function Education() {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const timelineRef = useScrollReveal();

  return (
    <section className="education" id="education">
      <div className="container">
        <p ref={labelRef} className="section-label">05 / Education</p>
        <h2 ref={titleRef} className="section-title">Education</h2>
        <div ref={timelineRef} className="timeline">
          {items.map((item, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-date">{item.date}</span>
                <h4 className="timeline-title">{item.title}</h4>
                {item.company && <p className="timeline-company">{item.company}</p>}
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
