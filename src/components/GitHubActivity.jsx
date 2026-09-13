import { useEffect, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const USERNAME = 'AIT-ELCADI';
const PROFILE_URL = `https://github.com/${USERNAME}`;
const API = `https://api.github.com/users/${USERNAME}`;

const EVENT_ICONS = {
  PushEvent: 'fas fa-code-branch',
  CreateEvent: 'fas fa-plus',
  PullRequestEvent: 'fas fa-code-pull',
  PullRequestReviewEvent: 'fas fa-eye',
  IssuesEvent: 'fas fa-bug',
  IssueCommentEvent: 'fas fa-comment',
  WatchEvent: 'fas fa-star',
  ForkEvent: 'fas fa-code-fork',
  ReleaseEvent: 'fas fa-tag',
  PublicEvent: 'fas fa-globe',
};

const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n));

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatEvent(ev) {
  const repo = ev.repo ? ev.repo.name.replace(`${USERNAME}/`, '') : '';
  switch (ev.type) {
    case 'PushEvent': {
      const n = ev.payload && ev.payload.size ? ev.payload.size : 0;
      return (
        <>
          pushed <b>{n}</b> commit{n === 1 ? '' : 's'} to <b>{repo}</b>
        </>
      );
    }
    case 'CreateEvent':
      return ev.payload && ev.payload.ref
        ? (
            <>
              created branch <b>{ev.payload.ref}</b> in <b>{repo}</b>
            </>
          )
        : (
            <>
              created <b>{repo}</b>
            </>
          );
    case 'PullRequestEvent':
      return (
        <>
          opened a pull request in <b>{repo}</b>
        </>
      );
    case 'PullRequestReviewEvent':
      return (
        <>
          reviewed a pull request in <b>{repo}</b>
        </>
      );
    case 'IssuesEvent':
      return (
        <>
          opened an issue in <b>{repo}</b>
        </>
      );
    case 'IssueCommentEvent':
      return (
        <>
          commented on an issue in <b>{repo}</b>
        </>
      );
    case 'WatchEvent':
      return (
        <>
          starred <b>{repo}</b>
        </>
      );
    case 'ForkEvent':
      return (
        <>
          forked <b>{repo}</b>
        </>
      );
    case 'ReleaseEvent':
      return (
        <>
          released a new version of <b>{repo}</b>
        </>
      );
    default:
      return <b>{repo}</b>;
  }
}

const PINK = '196, 148, 152';
const LEVEL_ALPHA = [0.08, 0.22, 0.45, 0.72, 1];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function fmtDay(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function GitHubGraph() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/github-contributions.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <p className="github-error">
        Couldn't load the graph —{' '}
        <a href={PROFILE_URL} target="_blank" rel="noopener">see profile</a>.
      </p>
    );
  }

  if (!data) {
    return (
      <div className="gh-grid-skeleton" role="status" aria-label="Loading contribution graph">
        <span /><span /><span />
      </div>
    );
  }

  const { cols, cells, months } = data;

  return (
    <div className="gh-grid" style={{ '--gh-cols': cols }}>
      {months.map((m) => (
        <span
          key={m.label}
          className="gh-month"
          style={{ gridColumnStart: m.col + 2, gridRowStart: 1 }}
        >
          {m.label}
        </span>
      ))}
      {cells.map((cell, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        return (
          <span
            key={i}
            className="gh-cell"
            style={{
              gridColumnStart: c + 2,
              gridRowStart: r + 2,
              background: `rgba(${PINK}, ${LEVEL_ALPHA[cell.level] ?? 0.08})`,
            }}
            title={`${cell.count} contribution${cell.count === 1 ? '' : 's'} on ${fmtDay(cell.date)}`}
          />
        );
      })}
      {WEEKDAYS.map((label, r) => (
        <span key={label} className="gh-wday" style={{ gridColumnStart: 1, gridRowStart: r + 2 }}>
          {label}
        </span>
      ))}
    </div>
  );
}

export default function GitHubActivity() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [events, setEvents] = useState(null);
  const [failed, setFailed] = useState(false);

  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const ctaRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const chartRef = useScrollReveal();
  const listRef = useScrollReveal();

  useEffect(() => {
    let cancelled = false;

    const loadUser = fetch(`${API}`).then((r) => (r.ok ? r.json() : Promise.reject(r)));
    const loadRepos = fetch(`${API}/repos?per_page=100&sort=pushed&type=owner`).then((r) =>
      r.ok ? r.json() : Promise.reject(r)
    );
    const loadEvents = fetch(`${API}/events/public`).then((r) =>
      r.ok ? r.json() : Promise.reject(r)
    );

    Promise.allSettled([loadUser, loadRepos, loadEvents]).then(([u, r, e]) => {
      if (cancelled) return;
      if (u.status === 'fulfilled') setUser(u.value);
      if (r.status === 'fulfilled') setRepos(r.value);
      if (e.status === 'fulfilled') setEvents((e.value || []).slice(0, 4));
      if (u.status === 'rejected' || r.status === 'rejected') setFailed(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const stars = repos ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0) : null;

  const stats = [
    { icon: 'fas fa-bookmark', label: 'Repositories', value: user ? fmt(user.public_repos) : null },
    { icon: 'fas fa-star', label: 'Stars', value: stars !== null ? fmt(stars) : null },
    { icon: 'fas fa-users', label: 'Followers', value: user ? fmt(user.followers) : null },
    { icon: 'fas fa-user-plus', label: 'Following', value: user ? fmt(user.following) : null },
  ];

  return (
    <section className="github" id="github">
      <div className="container">
        <p ref={labelRef} className="section-label">04 / GitHub</p>
        <h2 ref={titleRef} className="section-title">GitHub Activity</h2>

        <div ref={ctaRef} className="github-cta">
          <a href={PROFILE_URL} target="_blank" rel="noopener" className="github-handle">
            <i className="fab fa-github" />
            <span>@{USERNAME}</span>
            <i className="fas fa-arrow-up-right-from-square gh-handle-arrow" />
          </a>
        </div>

        <div ref={statsRef} className="github-stats">
          {stats.map((s, i) => (
            <div key={i} className="gh-stat-card">
              <div className="gh-stat-icon"><i className={s.icon} /></div>
              <span className={`gh-stat-number ${s.value === null ? 'loading' : ''}`}>
                {s.value ?? (failed ? '--' : '...')}
              </span>
              <span className="gh-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div ref={chartRef} className="github-card">
          <div className="github-card-head">
            <h4><i className="fab fa-github" /> Contribution Graph</h4>
            <span>Last Year</span>
          </div>
          <div className="github-heatmap">
            <GitHubGraph />
          </div>
          <div className="github-legend">
            Less
            <span className="legend-scale">
              <i /><i /><i /><i /><i />
            </span>
            More
          </div>
        </div>

        <div ref={listRef} className="github-card">
          <div className="github-card-head">
            <h4><i className="fas fa-bolt" /> Recent Activity</h4>
            <span>Public Events</span>
          </div>
          {events && events.length > 0 ? (
            <ul className="activity-list">
              {events.map((ev, i) => {
                const repoName = ev.repo ? ev.repo.name : '';
                return (
                  <li key={ev.id || i} className="activity-item">
                    <span className="activity-icon"><i className={EVENT_ICONS[ev.type] || 'fab fa-github'} /></span>
                    <div className="activity-main">
                      <p className="activity-text">{formatEvent(ev)}</p>
                      <span className="activity-time">{timeAgo(ev.created_at)}</span>
                    </div>
                    <a
                      href={`https://github.com/${repoName}`}
                      target="_blank"
                      rel="noopener"
                      className="activity-link"
                      aria-label={`Open ${repoName}`}
                    >
                      <i className="fas fa-arrow-right" />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : events && events.length === 0 ? (
            <p className="github-error">No public activity yet — check back soon!</p>
          ) : (
            <ul className="activity-list">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="activity-item activity-skeleton">
                  <span className="activity-icon skeleton-block" />
                  <div className="activity-main">
                    <p className="skeleton-block skeleton-line" />
                    <span className="skeleton-block skeleton-time" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}