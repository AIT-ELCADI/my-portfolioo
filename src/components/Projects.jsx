import useScrollReveal from '../hooks/useScrollReveal';

const projects = [
  {
    image: '/img/portfolio.png',
    alt: 'Personal Portfolio Website',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    title: 'Personal Portfolio Website',
    desc: 'A fully responsive, modern personal portfolio built with vanilla HTML, CSS, and JavaScript. Features a custom design, smooth scroll animations, and a mobile-first approach.',
    links: [
      { href: 'https://github.com/BassmaAitElCadi/portfolio', icon: 'fab fa-github', label: 'Source Code' },
      { href: 'https://bassma-ait-el-cadi.vercel.app', icon: 'fas fa-external-link-alt', label: 'Live Demo' },
    ],
    overlays: [
      { href: 'https://github.com/BassmaAitElCadi/portfolio', icon: 'fab fa-github', aria: 'View Code' },
      { href: 'https://bassma-ait-el-cadi.vercel.app', icon: 'fas fa-external-link-alt', aria: 'Live Demo' },
    ],
  },
  {
    image: '/img/mochi-mugs.png',
    alt: 'Mochi Mugs E-commerce',
    tags: ['HTML', 'CSS', 'JavaScript', 'E-commerce'],
    title: 'Mochi Mugs — E-commerce Store',
    desc: 'A cute handcrafted ceramic mug shop with a kawaii aesthetic. Features product collections, animated hover effects, scrolling marquee, and a fully responsive design.',
    links: [
      { href: 'https://mochi-mugs.vercel.app', icon: 'fas fa-external-link-alt', label: 'Live Demo' },
    ],
    overlays: [
      { href: 'https://mochi-mugs.vercel.app', icon: 'fas fa-external-link-alt', aria: 'Live Demo' },
    ],
  },
];

export default function Projects() {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  return (
    <section className="projects" id="projects">
      <div className="container">
        <p ref={labelRef} className="section-label">03 / Projects</p>
        <h2 ref={titleRef} className="section-title">Featured Work</h2>
        <div className="animated-list">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} delay={i * 200} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }) {
  const ref = useScrollReveal();

  return (
    <article ref={ref} className="project-card anim-item" style={{ transitionDelay: `${delay}ms` }}>
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.alt} className="project-image" />
        <div className="project-overlay">
          {project.overlays.map((o, i) => (
            <a key={i} href={o.href} target="_blank" rel="noopener" className="project-link-btn" aria-label={o.aria}>
              <i className={o.icon} />
            </a>
          ))}
        </div>
      </div>
      <div className="project-info">
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="project-tag">{tag}</span>
          ))}
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <div className="project-links">
          {project.links.map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noopener" className="project-link">
              <i className={link.icon} /> {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
