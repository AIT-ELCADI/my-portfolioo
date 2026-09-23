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

const featuredProjects = projects.slice(0, 2);
const upcomingProjects = projects.slice(2);

export default function Projects() {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const subRef = useScrollReveal();

  return (
    <section className="projects" id="projects">
      <div className="container">
        <p ref={labelRef} className="section-label">03 / Projects</p>
        <h2 ref={titleRef} className="section-title">Featured Work</h2>
        <p ref={subRef} className="projects-subtitle">
          A curated look at the projects I build and the ones currently in the works.
        </p>

        <div className="projects-list">
          {featuredProjects.map((project, i) => (
            <FeaturedProject key={project.number} project={project} flip={i % 2 === 1} />
          ))}
        </div>

        <div className="projects-upcoming-head">
          <h3 className="upcoming-title">In the Works</h3>
          <span className="upcoming-line" />
        </div>
        <div className="projects-upcoming">
          {upcomingProjects.map((project) => (
            <CardProject key={project.number} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({ project, flip }) {
  const ref = useScrollReveal();

  return (
    <article ref={ref} className={`project-featured${flip ? ' flip' : ''} anim-item`}>
      <div className="project-featured-media">
        <div className="project-media">
          {project.image ? (
            <img src={project.image} alt={project.alt} loading="lazy" className="project-media-img" />
          ) : (
            <div className="project-cover">
              <span className="project-cover-initial">{project.title.charAt(0)}</span>
              <span className="project-cover-note">{project.number} / Case Study</span>
            </div>
          )}
          <div className="project-media-overlay" />
        </div>
        <span className="project-number">{project.number}</span>
      </div>

      <div className="project-featured-body">
        <span className="featured-index">{project.number}</span>
        <div className="featured-meta">
          <span className="featured-meta-tag">Featured Project</span>
          <span className="featured-meta-line" />
          <span className="featured-meta-tag">{project.tags[0]}</span>
        </div>
        <h3 className="featured-title">{project.title}</h3>
        <p className="featured-desc">{project.desc}</p>
        <div className="project-tags">
          {project.tags.map((tag, t) => (
            <span key={t} className="project-tag">{tag}</span>
          ))}
        </div>
        <div className="project-actions">
          {project.links.map((link, li) => (
            <a
              key={li}
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
      </div>
    </article>
  );
}

function CardProject({ project }) {
  const ref = useScrollReveal();

  return (
    <article ref={ref} className="project-wip anim-item">
      <div className="wip-top">
        <span className="wip-number">{project.number}</span>
        <span className="project-coming">Under development</span>
      </div>
      <div className="wip-tags">
        {project.tags.map((tag, t) => (
          <span key={t} className="project-tag">{tag}</span>
        ))}
      </div>
      <h4 className="wip-title">{project.title}</h4>
      <p className="wip-desc">{project.desc}</p>
    </article>
  );
}