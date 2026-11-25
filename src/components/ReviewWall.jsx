import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { REVIEW_VIDEOS, DEV_REVIEWS } from '../data/reviews-media';
import Reveal from './Reveal';
import { Cloud, CloudEdge, Mascot, Ico } from './Sky';

// Reviewsectie voor homepage en productpagina's (stijl: bento met video- en
// tekstreviews). Tekstreviews komen uit Judge.me via /api/reviews; videoslots
// staan in data/reviews-media.js en zijn placeholders tot de video's er zijn.
// Er komt nooit een verzonnen review live: zonder Judge.me-reviews tonen we in
// productie geen tekstkaarten (in development vullen dummy's de opmaak).

const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Eén fetch voor de hele site: het antwoord blijft in het geheugen.
let cache = null;
export function useReviews() {
  const [data, setData] = useState(cache);
  useEffect(() => {
    if (cache) return undefined;
    let on = true;
    fetch('/api/reviews').then(r => r.json()).then((d) => { cache = d; if (on) setData(d); }).catch(() => {});
    return () => { on = false; };
  }, []);
  return data;
}

// Tekstreviews, nieuwste eerst. In development dummy's als er geen echte zijn.
export function textReviews(data) {
  const real = ((data && data.reviews) || []).filter(r => r.body || r.title)
    .slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .map(r => ({ title: r.title, body: r.body, name: (r.name || '').split(' ')[0], rating: r.rating, verified: r.verified }));
  return real.length ? real : DEV_REVIEWS;
}
const summaryOf = (data) => (data && data.count > 0 ? `${data.avg} out of 5, from ${data.count} verified review${data.count === 1 ? '' : 's'}` : null);
const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

// Video speelt muted zodra hij voor de helft in beeld is en pauzeert daarbuiten.
// Bij prefers-reduced-motion start er niets vanzelf: de bezoeker tikt op play.
function useAutoplay(ref, onState) {
  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === 'undefined') return undefined;
    const sync = () => onState(!v.paused);
    v.addEventListener('play', sync); v.addEventListener('pause', sync);
    let io = null;
    if (!reduced()) {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          if (!v.getAttribute('src')) v.src = v.dataset.src;
          const p = v.play(); if (p && p.catch) p.catch(() => {});
        } else v.pause();
      }, { threshold: 0.5 });
      io.observe(v);
    }
    return () => { if (io) io.disconnect(); v.removeEventListener('play', sync); v.removeEventListener('pause', sync); };
  }, [ref, onState]);
}

const TONES = ['sky', 'pop', 'ink'];

// Videotegel: echte video, of een placeholder in de hemelstijl.
export function VideoTile({ video, tone = 'sky', className = '' }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);
  useAutoplay(ref, setPlaying);

  if (!video) {
    return (
      <div className={`rw-tile is-empty is-${tone}${className ? ` ${className}` : ''}`}>
        <Cloud className="rw-c1 sk-drift" /><Cloud className="rw-c2 sk-drift" />
        <Mascot className="rw-face sk-bob" color={tone === 'sky' ? '#ffffff' : '#d5ebf9'} />
        <span className="rw-chip">Video review coming soon</span>
      </div>
    );
  }
  const toggle = () => {
    const v = ref.current; if (!v) return;
    if (!v.getAttribute('src')) v.src = v.dataset.src;
    if (v.paused) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } else v.pause();
  };
  return (
    <figure className={`rw-tile is-video${className ? ` ${className}` : ''}`}>
      <video ref={ref} data-src={video.src} poster={video.poster} muted={!sound} loop playsInline preload="none" onClick={toggle} aria-label={`Video review${video.name ? ` by ${video.name}` : ''}`} />
      {!playing && <button type="button" className="rw-play" onClick={toggle} aria-label="Play video"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg></button>}
      <button type="button" className="rw-chip is-btn" onClick={() => setSound(s => !s)} aria-pressed={sound}>{sound ? 'Sound on' : 'Tap for sound'}</button>
      {(video.name || video.caption) && <figcaption>{video.caption && <b>{video.caption}</b>}{video.name && <span>{video.name}</span>}</figcaption>}
    </figure>
  );
}

// Tekstkaart
export function ReviewCard({ r, tone = 'line', className = '' }) {
  return (
    <figure className={`rw-card is-${tone}${className ? ` ${className}` : ''}`}>
      {r.rating ? <span className="sk-stars" aria-label={`${r.rating} out of 5 stars`}>{stars(r.rating)}</span> : null}
      {r.title && <b className="is-title">{r.title}</b>}
      <p>{r.body}</p>
      <footer><span>{r.name}</span>{r.verified && <span className="rw-verified">Verified buyer</span>}</footer>
    </figure>
  );
}

function Head({ title, data, fallback }) {
  return (
    <Reveal once><div className="sk-row-head">
      <div><h2 className="sk-h2">{title}</h2><p className="sk-lead" style={{ marginTop: 12 }}>{summaryOf(data) || fallback}</p></div>
      <Link to="/reviews" className="sk-btn is-line rw-all">All reviews</Link>
    </div></Reveal>
  );
}

// ---------------------------------------------------------------------------
// Homepage: een rij met de drie nieuwste tekstreviews uit Judge.me (zodra die
// er zijn), daaronder twee rijen van drie video's en twee grote staande.
// ---------------------------------------------------------------------------
export const HOME_TEXT_COUNT = 3;
export function ReviewWallHome() {
  const data = useReviews();
  const texts = textReviews(data).slice(0, HOME_TEXT_COUNT);
  return (
    <section id="reviews" className="sk-sec rw" style={{ scrollMarginTop: 96 }}><div className="sk-wrap">
      <Head title="Reviews, written and on camera" data={data} fallback="Reviews from verified buyers land here as they come in." />
      {texts.length > 0 && (
        <div className="rw-grid is-quotes" style={{ '--n': texts.length }}>
          {texts.map((r, i) => (
            <Reveal key={i} once delay={i * 90} className="rw-cell"><ReviewCard r={r} tone={i === 1 ? 'sky' : 'line'} /></Reveal>
          ))}
        </div>
      )}
      <div className="rw-grid is-home">
        {REVIEW_VIDEOS.home.map((v, i) => (
          <Reveal key={i} once delay={(i % 3) * 90} className={`rw-cell${i % 3 === 1 ? ' is-drop' : ''}`}><VideoTile video={v} tone={TONES[(i + (i > 2 ? 1 : 0)) % 3]} /></Reveal>
        ))}
        {REVIEW_VIDEOS.homeTall.map((v, i) => (
          <Reveal key={`t${i}`} once delay={i * 120} className="rw-cell is-tall"><VideoTile video={v} tone={i ? 'pop' : 'ink'} /></Reveal>
        ))}
      </div>
    </div></section>
  );
}

// ---------------------------------------------------------------------------
// Productpagina: video- en tekstreviews door elkaar in een bento.
// ---------------------------------------------------------------------------
export function ReviewWallProduct({ productName }) {
  const data = useReviews();
  const texts = textReviews(data).slice(0, 5);
  const vids = REVIEW_VIDEOS.product;
  // Volgorde in de DOM: video, tekst, tekst, video, tekst, tekst, video, tekst.
  // Met vijf tekstreviews vult dat op desktop precies een bento van 4 x 3
  // (posities p1..p8 in sky.css); met minder staan de video's op een rij en de
  // teksten eronder; zonder teksten alleen de drie video's.
  const cells = [];
  let t = 0;
  vids.forEach((v, i) => {
    cells.push({ kind: 'video', v, i });
    for (let k = 0; k < (i === 2 ? 1 : 2) && t < texts.length; k += 1, t += 1) cells.push({ kind: 'text', r: texts[t], i: t });
  });
  for (; t < texts.length; t += 1) cells.push({ kind: 'text', r: texts[t], i: t });
  const mode = texts.length >= 5 ? 'is-bento' : texts.length ? 'is-loose' : 'is-videos-only';
  return (
    <section id="reviews" className="sk-sec rw" style={{ scrollMarginTop: 96 }}><div className="sk-wrap">
      <Head title={`Sleepers on the ${productName}`} data={data} fallback="Reviews from verified buyers land here as they come in." />
      <div className={`rw-grid is-product ${mode}`}>
        {cells.map((c, n) => c.kind === 'video'
          ? <Reveal key={`v${c.i}`} once delay={(n % 4) * 80} className={`rw-cell is-video rw-p${n + 1}`}><VideoTile video={c.v} tone={TONES[c.i % 3]} /></Reveal>
          : <Reveal key={`t${c.i}`} once delay={(n % 4) * 80} className={`rw-cell is-text rw-p${n + 1}`}><ReviewCard r={c.r} tone={c.i % 3 === 1 ? 'sky' : 'line'} /></Reveal>)}
      </div>
    </div></section>
  );
}

// ---------------------------------------------------------------------------
// Doorlopende carousel met tekstreviews (pauze bij hover, focus of aanraken).
// Zonder reviews rendert dit niets.
// ---------------------------------------------------------------------------
export function ReviewCarousel({ reviews }) {
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  if (!reviews || reviews.length === 0) return null;
  let list = reviews.slice(0, 10);
  while (list.length < 6) list = [...list, ...reviews];
  const hold = () => { clearTimeout(timer.current); setPaused(true); };
  const release = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setPaused(false), 2500); };
  return (
    <div className={`rc${paused ? ' is-paused' : ''}`} onTouchStart={hold} onTouchEnd={release} onTouchCancel={release}>
      <div className="rc-track" style={{ '--n': list.length }}>
        {list.map((r, i) => <ReviewCard key={`a${i}`} r={r} tone="white" />)}
        {list.map((r, i) => <div key={`b${i}`} className="rc-dup" aria-hidden="true"><ReviewCard r={r} tone="white" /></div>)}
      </div>
    </div>
  );
}

// Lichtblauwe band met de carousel en een wolkenrand eronder. `summary` komt van Judge.me.
// `skip` slaat de eerste reviews over als die op dezelfde pagina al in een
// rij staan (homepage); zijn er te weinig over, dan toont de band ze allemaal.
export function ReviewCarouselBand({ title = 'What happy sleepers are saying', skip = 0 }) {
  const data = useReviews();
  const all = textReviews(data);
  if (all.length === 0) return null;
  const list = all.length - skip >= 4 ? all.slice(skip) : all;
  return (
    <section>
      <div className="sk-sky" style={{ paddingBlock: '40px 32px' }}>
        <div className="sk-wrap"><div className="sk-head is-mid"><h2 className="sk-h2">{title}</h2>{summaryOf(data) && <p className="sk-lead">{summaryOf(data)}</p>}</div></div>
        <ReviewCarousel reviews={list} />
        <div style={{ textAlign: 'center', marginTop: 32 }}><Link to="/reviews" className="sk-btn is-line">Read all reviews</Link></div>
      </div>
      <CloudEdge down color="var(--sky)" back="#c0e5ff" />
    </section>
  );
}

// Heeft de site op dit moment tekstreviews om te tonen?
export function useHasReviews() {
  return textReviews(useReviews()).length > 0;
}
