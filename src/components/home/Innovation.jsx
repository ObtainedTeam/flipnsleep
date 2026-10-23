import { useState, useRef } from 'react';
import { useLazyVideo, videoHtml } from '../../lazyVideo';
import { Link } from 'react-router-dom';
import { c, BTNO, rv, FONT_DISPLAY, FONT_SUB, R, SH, T, LH, SP, W, CHIP } from '../../theme';
import { HOME_IMG } from '../../data/home-content';
import Reveal from '../Reveal';

// "Redefining sleep": links kop + accordion (eerste open), rechts een
// 4:5-videokaart (placeholder: ander fragment uit de herovideo).
const ITEMS = [
  [<><path d="M12 3v18M3 12h18" /><path d="M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" /></>,
    "Why flip'nsleep",
    'One pillow, two sides: a cool-touch face for warm nights and soft bamboo for cold ones. Unzip it and add or remove filling until the height is exactly right.'],
  [<><path d="M3 18V8" /><path d="M3 14h18v4" /><path d="M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="2" /></>,
    'Built for every sleeper',
    'Side, back or stomach: the shredded memory foam adjusts to you. Side sleepers keep more filling, stomach sleepers take some out.',
    <Link to="/quiz" className="nav-link" style={{ display: 'inline-block', marginTop: 10, fontSize: T.sm[0], fontWeight: 700, color: c.purple }}>Find your fill →</Link>],
  [<><path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.4l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 3Z" /></>,
    'Innovation in every detail',
    'A cool side with a tested Q-max of 0.26, so it feels cool the moment you touch it. OEKO-TEX Standard 100 fabrics, CertiPUR-US certified foam and a cover that zips off for the wash.'],
];

export default function Innovation() {
  const vidRef = useRef(null);
  useLazyVideo(vidRef);
  const [open, setOpen] = useState(0);
  const poster = HOME_IMG.innovationPoster;
  return (
    <section className="r-pad" style={rv('pad', ...SP.section)}>
      <div className="home-innov" style={{ maxWidth: W.page, margin: '0 auto' }}>
        <div className="home-innov-head">
          <Reveal>
            <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.h1), lineHeight: LH.head, color: c.navy }}>
              Redefining sleep, <span style={{ fontFamily: FONT_SUB, color: c.purple }}>one innovation at a time.</span>
            </h2>
            <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD, margin: '16px 0 28px', maxWidth: W.narrow }}>
              Most pillows are a block of foam that holds heat and fits nobody in particular. We started from the other end: what does a hot sleeper actually need at 3 AM? A cool side, a warm side and a height you set yourself.
            </p>
          </Reveal>
        </div>
        <div className="home-innov-acc">
          <div style={{ borderTop: '1px solid rgba(32,27,93,.16)' }}>
            {ITEMS.map(([icon, title, body, link], i) => {
              const isOpen = open === i;
              return (
                <div key={title} style={{ borderBottom: '1px solid rgba(32,27,93,.16)' }}>
                  <button type="button" className="home-acc-btn" aria-expanded={isOpen} aria-controls={`innov-${i}`} id={`innov-btn-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span aria-hidden="true" style={{ width: 48, height: 48, borderRadius: R.pill, background: isOpen ? c.navy : c.sky, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background .25s ease' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isOpen ? c.amber : c.purple} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                    </span>
                    <span className="r-fs" style={{ fontFamily: FONT_SUB, fontWeight: 600, ...rv('fs', ...T.h3), lineHeight: LH.head, color: c.navy }}>{title}</span>
                    <svg className="home-acc-plus" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c.navy} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                  </button>
                  <div id={`innov-${i}`} role="region" aria-labelledby={`innov-btn-${i}`} className={`home-acc-panel${isOpen ? ' is-open' : ''}`}>
                    <div>
                      <div className="r-pad" style={rv('pad', '0 40px 24px 66px', '0 4px 20px 66px')}>
                        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD }}>{body}</p>
                        {link}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 32 }}><Link to="/how-it-works" style={BTNO}>How it works</Link></div>
        </div>

        <div className="home-innov-media">
          <Reveal delay={120}>
            <div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: R.lg, overflow: 'hidden', boxShadow: SH.strong, background: c.night }}>
              <div ref={vidRef} aria-hidden="true" style={{ position: 'absolute', inset: 0 }} dangerouslySetInnerHTML={{ __html:
                videoHtml({ src: HOME_IMG.innovationVideo, poster: poster.src, width: poster.width, height: poster.height })
              }} />
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,16,64,0) 55%, rgba(20,16,64,.7))' }} />
              <div style={{ position: 'absolute', left: 20, right: 20, bottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: FONT_SUB, fontSize: T.lg[0], color: c.white, textShadow: SH.text }}>Cool-touch, up close</span>
                <span style={{ ...CHIP, fontSize: T.xs[0], background: c.cream, color: c.navy }}>Full video coming soon</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
