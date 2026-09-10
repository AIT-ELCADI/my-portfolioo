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
              <h4 className="timeline-title">Administrative &amp; Accounting Intern</h4>
              <p className="timeline-company">Restaurant Administration Department</p>
              <p className="timeline-desc">
                During my internship I contributed to administrative and accounting operations while improving my organizational and communication skills.
              </p>
              <ul className="timeline-list">
                <li>Recorded daily &amp; weekly revenues.</li>
                <li>Prepared financial reports.</li>
                <li>Managed invoices and cheques.</li>
                <li>Communicated with suppliers.</li>
                <li>Organized administrative documents.</li>
                <li>Worked with Microsoft Excel.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
