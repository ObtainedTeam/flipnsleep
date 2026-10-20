import { useState, useEffect } from 'react';
import { c, BTN, BTNO, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, T, LH, SP, W, CARD, CARD_SOFT } from '../theme';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { JUDGEME_REVIEW_FORM_URL } from '../judgeme';

export default function Reviews() {
  const [data, setData] = useState(null); // { reviews, count, avg }

  useEffect(() => {
    fetch('/api/reviews').then((r) => r.json()).then(setData).catch(() => setData(null));
  }, []);

  const hasReviews = !!(data && data.count > 0);

  return (
    <div>
      <section className="r-pad" style={{ textAlign: 'center', ...rv('pad', ...SP.sectionTop) }}>
        <div style={EYEBROW}>Reviews</div>
        <h1 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h1), lineHeight: LH.tight, color: c.navy, margin: '8px 0 16px' }}>Real sleepers, <span style={{ fontFamily: FONT_SUB }}>real reviews</span></h1>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, maxWidth: W.narrow, margin: '0 auto' }}>
          Reviews here are collected independently through Judge.me from verified flip'nsleep buyers. We can't edit them or make them up, and that's exactly the point.
        </p>
      </section>

      <section className="r-pad" style={{ maxWidth: W.page - 200, margin: '0 auto', ...rv('pad', '40px 40px 0', '32px 20px 0') }}>
        <Reveal>
          {hasReviews ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <span style={{ color: c.amberD, fontSize: T.h3[0], letterSpacing: 2 }}>{'★'.repeat(Math.round(data.avg))}</span>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: T.h4[0], color: c.navy, marginLeft: 10 }}>{data.avg}</span>
                <span style={{ fontSize: T.sm[0], color: c.grayD, marginLeft: 8 }}>based on {data.count} verified review{data.count === 1 ? '' : 's'}</span>
              </div>
              <div className="grid-2m1 r-gap" style={rv('gap', ...SP.gap)}>
                {data.reviews.map((r, i) => (
                  <div key={i} className="r-pad" style={{ ...CARD, ...rv('pad', ...SP.card) }}>
                    <div style={{ color: c.amberD, fontSize: T.sm[0], letterSpacing: 2, marginBottom: 8 }}>{'★'.repeat(r.rating)}<span style={{ color: c.lilac }}>{'★'.repeat(5 - r.rating)}</span></div>
                    {r.title && <div className="r-fs" style={{ fontFamily: FONT_SUB, fontWeight: 600, ...rv('fs', ...T.md), color: c.navy, marginBottom: 6 }}>{r.title}</div>}
                    <p style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.grayD, marginBottom: 12 }}>{r.body}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: T.xs[0], color: c.gray }}>
                      <b style={{ color: c.navy }}>{r.name}</b>
                      <span>{r.verified ? 'Verified buyer' : r.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="r-pad" style={{ ...CARD, ...rv('pad', 40, SP.card[1]), textAlign: 'center' }}>
              <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h3), lineHeight: LH.head, color: c.navy, marginBottom: 12 }}>The first reviews are on their way</h2>
              <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.loose, color: c.grayD, maxWidth: W.narrow, margin: '0 auto' }}>
                flip'nsleep is a young brand, and our first customers are sleeping on their pillows right now. Every verified buyer automatically gets a review invitation, and as their reviews come in they'll appear on this page, unfiltered. Until then, we'd rather show you no reviews than fake ones.
              </p>
            </div>
          )}
        </Reveal>
      </section>

      {/* Waarom je ons nu al kunt vertrouwen */}
      <section className="r-pad" style={{ maxWidth: W.page - 200, margin: '0 auto', ...rv('pad', '40px 40px 0', '32px 20px 0') }}>
        <Reveal delay={100}>
          <div className="grid-3m1 r-gap" style={rv('gap', ...SP.gap)}>
            {[
              ['🌙', '100-night sleep trial', "Try it for 100 nights. Not convinced? Free return, full refund."],
              ['🛡️', '2-year warranty', 'Materials and workmanship covered, repaired, replaced or refunded.'],
              ['🚚', 'Free shipping, always', 'Across the US and Canada, on every order. Free returns within the trial.'],
            ].map(([icon, t, d], i) => (
              <div key={i} className="r-pad" style={{ ...CARD_SOFT, ...rv('pad', ...SP.card), textAlign: 'center' }}>
                <div style={{ fontSize: T.h3[0], marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: FONT_SUB, fontWeight: 600, fontSize: T.md[1], color: c.navy, marginBottom: 6 }}>{t}</div>
                <div style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.grayD }}>{d}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="r-pad" style={{ textAlign: 'center', ...rv('pad', '56px 40px 80px', '40px 20px 56px') }}>
        <Reveal delay={140}>
          {JUDGEME_REVIEW_FORM_URL ? (
            <>
              <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD, maxWidth: W.narrow, margin: '0 auto 20px' }}>
                Already sleeping on a flip'nsleep pillow? Your honest review helps other hot sleepers find their way.
              </p>
              <a href={JUDGEME_REVIEW_FORM_URL} target="_blank" rel="noopener noreferrer" style={BTN}>Write a review</a>
              <div style={{ marginTop: 16 }}>
                <Link to="/product/signature-cold-pillow" style={BTNO}>Shop the deal</Link>
              </div>
            </>
          ) : (
            <Link to="/product/signature-cold-pillow" style={BTN}>Shop the deal</Link>
          )}
        </Reveal>
      </section>
    </div>
  );
}
