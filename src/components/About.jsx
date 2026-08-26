import useScrollReveal from '../hooks/useScrollReveal';

const cards = [
  { icon: 'fas fa-graduation-cap', title: 'Education', desc: 'Web Development Training at WingsTech Center & Bachelor\'s in Accounting' },
  { icon: 'fas fa-code', title: 'Full-Stack Focus', desc: 'Building end-to-end web applications with HTML, CSS, JavaScript & modern tools' },
  { icon: 'fas fa-briefcase', title: 'Internship', desc: 'Hands-on professional experience in real-world development environments' },
  { icon: 'fas fa-rocket', title: 'Current Goal', desc: 'Launching my career as a junior developer & building impactful projects' },
];

export default function About() {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const textRef = useScrollReveal();
  const cardsRef = useScrollReveal();

  return (
    <section className="about" id="about">
      <div className="container">
        <p ref={labelRef} className="section-label">01 / About Me</p>
        <h2 ref={titleRef} className="section-title">Who I Am</h2>
        <div className="about-grid">
          <div ref={textRef} className="about-text">
            <p>
              I'm Bassma Ait El Cadi, a junior full-stack developer with a strong foundation in
              HTML, CSS, and JavaScript, and a growing expertise in modern web development.
              My journey into tech began with a deep curiosity about how websites work, and it has
              evolved into a passion for creating clean, responsive, and user-friendly digital experiences.
            </p>
            <p>
              Currently, I'm expanding my skill set through hands-on projects and continuous learning,
              with a focus on building practical solutions that solve real-world problems. I believe in
              writing maintainable code and paying close attention to detail in every project I take on.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, refining my design eye,
              and seeking out opportunities to collaborate and grow as a developer.
            </p>
          </div>
          <div ref={cardsRef} className="about-cards">
            {cards.map((card, i) => (
              <div key={i} className="about-card">
                <div className="about-card-icon"><i className={card.icon} /></div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
