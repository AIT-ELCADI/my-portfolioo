import useScrollReveal from '../hooks/useScrollReveal';

const projects = [
  {
    number: '01',
    title: 'Personal Portfolio Website',
    desc: 'A fully responsive personal portfolio with a custom design, smooth scroll animations, and a mobile-first approach.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    links: [
      { href: 'https://bassma-ait-el-cadi.vercel.app', type: 'live', label: 'Live Site' },
      { href: 'https://github.com/AIT-ELCADI/my-portfolioo', type: 'github' },
    ],
  },
  {
    number: '02',
    title: 'Mochi Mugs — E-commerce Store',
    image: '/img/mochi-mugs.png',
    alt: 'Mochi Mugs E-commerce Store',
    desc: 'A handcrafted ceramic mug shop with a kawaii aesthetic. Features product collections, animated hover effects, a scrolling marquee, and a fully responsive layout.',
    tags: ['HTML', 'CSS', 'JavaScript', 'E-commerce'],
    links: [
      { href: 'https://mochi-mugs.vercel.app', type: 'live', label: 'Live Site' },
      { href: 'https://github.com/AIT-ELCADI/Mochi-Mugs', type: 'github' },
    ],
  },
  {
    number: '03',
    title: 'TaskFlow',
    image: '/img/TaskFlow.png',
    alt: 'TaskFlow task management dashboard',
    desc: 'A calm task manager for tracking tasks, deadlines and progress. Includes account registration and sign-in, task creation and editing with priorities and due dates, search, filters and sorting, a completion ring, live stats and an upcoming deadlines panel, across a soft and a bold theme.',
    tags: ['React 19', 'Vite', 'React Router', 'REST API'],
    links: [
      { href: 'https://taskflow-by-bassma.vercel.app', type: 'live', label: 'Live Site' },
      { href: 'https://github.com/AIT-ELCADI/TaskFlow', type: 'github' },
    ],
  },
  {
    number: '04',
    title: 'Coming Soon',
    desc: 'This project is under development. Stay tuned for updates and new features.',
    tags: ['React', 'Tailwind CSS', 'Node.js'],
  },
  {
    number: '05',
    title: 'Coming Soon',
    desc: 'This project is under development. Stay tuned for updates and new features.',
    tags: ['React', 'Tailwind CSS', 'Node.js'],
  },
  {
    number: '06',
    title: 'Coming Soon',
    desc: 'This project is under development. Stay tuned for updates and new features.',
    tags: ['React', 'Tailwind CSS', 'Node.js'],
  },
];

const featuredProjects = projects.filter((project) => project.links?.length);
const upcomingProjects = projects.filter((project) => !project.links?.length);
const totalCount = projects.length;

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.2c-3.2.7-3.88-1.38-3.88-1.38-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.07.78 2.16v3.02c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LiveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 2 24 22H0L12 2Z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

function CharLine({ text }) {
  return (
    <span className="projects-heading-line">
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

export default function Projects() {
  const labelRef = useScrollReveal();
  const headingRef = useScrollReveal(0.9);
  const subRef = useScrollReveal();

  return (
    <section className="projects" id="projects">
      <div className="container">
        <p ref={labelRef} className="section-label">03 / Projects</p>

        <h2 ref={headingRef} className="projects-heading" aria-label="Featured Work">
          <span className="sr-only">Featured Work</span>
          <span aria-hidden="true">
            <CharLine text="Featured Work" />
          </span>
        </h2>

        <p ref={subRef} className="projects-subtitle">
          From handcrafted storefronts to full-stack task management — built with care, motion, and
          precision.
        </p>

        <div className="projects-list">
          {featuredProjects.map((project, i) => (
            <FeaturedProject
              key={project.number}
              project={project}
              flip={i % 2 === 1}
              index={i + 1}
              total={totalCount}
            />
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

function FeaturedProject({ project, flip, index, total }) {
  const cardRef = useScrollReveal(0.5);
  const textRef = useScrollReveal(0.4);
  const mediaRef = useScrollReveal(0.4);

  const live = project.links.find((link) => link.type === 'live');
  const repo = project.links.find((link) => link.type === 'github');

  return (
    <article ref={cardRef} className={`project-card${flip ? ' flip' : ''}`}>
      <span className="project-card-glow project-card-glow-a" aria-hidden="true" />
      <span className="project-card-glow project-card-glow-b" aria-hidden="true" />
      <span className="project-card-sheen" aria-hidden="true" />

      <div className="project-card-inner">
        <div ref={textRef} className="project-card-text">
          <div className="project-card-links">
            {repo && (
              <a
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-gh-btn"
                title="Source Code"
                aria-label={`${project.title} source code on GitHub`}
              >
                <GithubIcon />
              </a>
            )}

            {live && (
              <a
                href={live.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-live-btn"
                title="Live Website"
              >
                <span className="project-live-icon">
                  <LiveIcon />
                </span>
                <span>{live.label}</span>
                <span className="project-live-arrow">
                  <ExternalIcon />
                </span>
              </a>
            )}

            <span className="project-counter">
              {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-desc">{project.desc}</p>

          <div className="project-pills">
            {project.tags.map((tag, t) => (
              <span key={t} className="project-pill">{tag}</span>
            ))}
          </div>
        </div>

        <div ref={mediaRef} className="project-card-media">
          <div className="browser-frame">
            <div className="browser-bar" aria-hidden="true">
              <span className="browser-dot dot-red" />
              <span className="browser-dot dot-yellow" />
              <span className="browser-dot dot-green" />
            </div>
            <div className="browser-shot">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  decoding="async"
                  className="project-shot-img"
                />
              ) : (
                <div className="project-cover">
                  <span className="project-cover-initial">{project.title.charAt(0)}</span>
                  <span className="project-cover-note">{project.number} / Case Study</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function CardProject({ project }) {
  const ref = useScrollReveal();

  return (
    <article ref={ref} className="project-wip">
      <span className="project-card-sheen" aria-hidden="true" />

      <div className="wip-top">
        <span className="wip-number">{project.number}</span>
        <span className="project-coming">Under development</span>
      </div>

      <div className="wip-tags">
        {project.tags.map((tag, t) => (
          <span key={t} className="project-pill">{tag}</span>
        ))}
      </div>

      <h4 className="wip-title">{project.title}</h4>
      <p className="wip-desc">{project.desc}</p>
    </article>
  );
}