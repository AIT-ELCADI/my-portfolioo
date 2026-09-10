import useScrollReveal from '../hooks/useScrollReveal';

const projects = [
  {
    number: '01',
    title: 'Personal Portfolio Website',
    desc: 'A fully responsive, modern personal portfolio built with vanilla HTML, CSS, and JavaScript. Features a custom design, smooth scroll animations, and a mobile-first approach.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    links: [
      { href: 'https://github.com/AIT-ELCADI/my-portfolioo', type: 'github', label: 'Source Code', icon: 'fab fa-github' },
      { href: 'https://bassma-ait-el-cadi.vercel.app', type: 'live', label: 'Live Demo', icon: 'fas fa-arrow-right' },
    ],
  },
  {
    number: '02',
    title: 'Mochi Mugs — E-commerce Store',
    image: '/img/mochi-mugs.png',
    alt: 'Mochi Mugs E-commerce',
    desc: 'A cute handcrafted ceramic mug shop with a kawaii aesthetic. Features product collections, animated hover effects, scrolling marquee, and a fully responsive design.',
    tags: ['HTML', 'CSS', 'JavaScript', 'E-commerce'],
    links: [
      { href: 'https://github.com/AIT-ELCADI/Mochi-Mugs', type: 'github', label: 'Source Code', icon: 'fab fa-github' },
      { href: 'https://mochi-mugs.vercel.app', type: 'live', label: 'Live Demo', icon: 'fas fa-arrow-right' },
    ],
  },
  {
    number: '03',
    title: 'Coming Soon',
    desc: 'This project is under development. Stay tuned for updates and new features.',
    tags: ['React', 'Tailwind CSS', 'Node.js'],
    links: [],
  },
  {
    number: '04',
    title: 'Coming Soon',
    desc: 'This project is under development. Stay tuned for updates and new features.',
    tags: ['React', 'Tailwind CSS', 'Node.js'],
    links: [],
  },
  {
    number: '05',
    title: 'Coming Soon',
    desc: 'This project is under development. Stay tuned for updates and new features.',
    tags: ['React', 'Tailwind CSS', 'Node.js'],
    links: [],
  },
  {
    number: '06',
    title: 'Coming Soon',
    desc: 'This project is under development. Stay tuned for updates and new features.',
    tags: ['React', 'Tailwind CSS', 'Node.js'],
    links: [],
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
        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const ref = useScrollReveal();

  return (
    <article ref={ref} className="project-card anim-item">
      <div className="project-media">
        {project.image ? (
          <img src={project.image} alt={project.alt} loading="lazy" className="project-media-img" />
        ) : (
          <div className="project-cover">
            <span className="project-cover-initial">{project.title.charAt(0)}</span>
            <span className="project-cover-note">Case Study</span>
          </div>
        )}
        <div className="project-media-overlay" />
        <span className="project-number">{project.number}</span>
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="project-tag">{tag}</span>
          ))}
        </div>
        {project.links.length > 0 ? (
          <div className="project-actions">
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener"
                className={`project-btn ${link.type === 'live' ? 'btn-project-live' : 'btn-project-gh'}`}
              >
                <span>{link.label}</span>
                <i className={link.icon} />
              </a>
            ))}
          </div>
        ) : (
          <div className="project-actions">
            <span className="project-coming">Under development</span>
          </div>
        )}
      </div>
    </article>
  );
}