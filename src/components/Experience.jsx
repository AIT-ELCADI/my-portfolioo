import useScrollReveal from '../hooks/useScrollReveal';

export default function Experience() {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const timelineRef = useScrollReveal();

  return (
    <section className="experience" id="experience">
      <div className="container">
        <p ref={labelRef} className="section-label">04 / Experience</p>
        <h2 ref={titleRef} className="section-title">Work Experience</h2>
        <div ref={timelineRef} className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <span className="timeline-date">Internship</span>
              <h4 className="timeline-title">Web Development Intern</h4>
              <p className="timeline-desc">
                Gained hands-on experience in a professional development environment:
              </p>
              <ul className="timeline-list">
                <li>Contributed to real-world web development projects</li>
                <li>Collaborated with senior developers on code reviews</li>
                <li>Applied best practices in HTML, CSS, and JavaScript</li>
                <li>Strengthened problem-solving and debugging skills</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
