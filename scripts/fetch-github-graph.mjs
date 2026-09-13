import { writeFile, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';

const USERNAME = 'AIT-ELCADI';
const BASE = `https://github.com/users/${USERNAME}/contributions`;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const out = resolve(process.cwd(), 'public', 'github-contributions.json');
const oldSvg = resolve(process.cwd(), 'public', 'github-contributions.svg');
const pad = (n) => String(n).padStart(2, '0');
const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

async function grab(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'bassma-portfolio (contribution graph generator)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function main() {
  const shell = await grab(`${BASE}`);
  const from = /data-from="([^"]+)"/.exec(shell)?.[1];
  const to = /data-to="([^"]+)"/.exec(shell)?.[1];
  const range = from && to
    ? `?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    : `?y=${new Date().getFullYear()}`;

  const html = await grab(`${BASE}${range}`);

  const map = new Map();
  const tdRe = /<td[^>]*ContributionCalendar-day[^>]*>/g;
  let m;
  while ((m = tdRe.exec(html))) {
    const date = /data-date="([^"]+)"/.exec(m[0])?.[1];
    const level = Number(/data-level="(\d)"/.exec(m[0])?.[1]);
    if (date) map.set(date, Number.isFinite(level) ? level : 0);
  }
  if (!map.size) throw new Error('No contribution day cells parsed');

  const countMap = new Map();
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`);
    if (res.ok) {
      const data = await res.json();
      for (const day of data.contributions || []) countMap.set(day.date, day.count || 0);
    }
  } catch {
    // counts are optional; levels still render the graph
  }

  const dates = [...map.keys()].sort();
  const first = new Date(`${dates[0]}T00:00:00`);
  const last = new Date(`${dates[dates.length - 1]}T00:00:00`);

  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());

  const cells = [];
  const sun = new Date(start);
  while (sun <= last) {
    for (let d = 0; d < 7; d++) {
      const day = new Date(sun);
      day.setDate(sun.getDate() + d);
      const key = toKey(day);
      if (key < toKey(first) || key > toKey(last)) {
        cells.push({ date: key, level: 0, count: 0 });
        continue;
      }
      cells.push({ date: key, level: map.get(key) ?? 0, count: countMap.get(key) ?? 0 });
    }
    sun.setDate(sun.getDate() + 7);
  }

  const months = [];
  let prev = -1;
  for (let i = 0; i < cells.length / 7; i++) {
    const colStart = new Date(start);
    colStart.setDate(start.getDate() + i * 7);
    if (colStart.getMonth() !== prev) {
      months.push({ label: MONTHS[colStart.getMonth()], col: i });
      prev = colStart.getMonth();
    }
  }

  const data = {
    username: USERNAME,
    start: toKey(start),
    cols: cells.length / 7,
    months,
    cells,
  };

  await writeFile(out, JSON.stringify(data), 'utf8');
  await unlink(oldSvg).catch(() => {});
  console.log(`Wrote ${out} (${data.cols} weeks, ${cells.length} days)`);
}

main().catch((err) => {
  console.warn(`[github-graph] Could not refresh graph: ${err.message}. Keeping existing file.`);
});