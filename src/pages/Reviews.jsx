import { useState, useEffect } from 'react';
import { c, BTN, BTNO, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';
import { Link } from 'react-router-dom';
import { EmailCapture } from '../components/Blocks';
import Reveal from '../components/Reveal';
import { JUDGEME_REVIEW_FORM_URL } from '../judgeme';

export default function Reviews() {
  const isMobile = useIsMobile();
  const [data, setData] = useState(null); // { reviews, count, avg }

  useEffect(() => {
    fetch('/api/reviews').then((r) => r.json()).then(setData).catch(() => setData(null));
  }, []);

  const hasReviews = !!(data && data.count > 0);

  return (
    <div>
      <section style={{ textAlign: 'center', padding: isMobile ? '40px 20px 8px' : '56px 40px 10px' }}>
        <div style={EYEBROW}>Reviews</div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 30 : 50, color: c.navy, margin: '8px 0 10px' }}>Real sleepers, <span style={{ fontFamily: FONT_SUB }}>real reviews</span></h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 460, margin: '0 auto' }}>
          Reviews here are collected independently through Judge.me from verified flip'nsleep buyers. We can't edit them or make them up — and that's exactly the point.
        </p>
      </section>

      <section style={{ maxWidth: 860, margin: '0 auto', padding: isMobile ? '26px 20px 10px' : '34px 24px 10px' }}>
        <Reveal>
          {hasReviews ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: 22 }}>
                <span style={{ color: '#F2B33D', fontSize: 22, letterSpacing: 2 }}>{'★'.repeat(Math.round(data.avg))}</span>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: c.navy, marginLeft: 10 }}>{data.avg}</span>
                <span style={{ fontSize: 13, color: c.grayD, marginLeft: 8 }}>based on {data.count} verified review{data.count === 1 ? '' : 's'}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 14 }}>
                {data.reviews.map((r, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: 18, padding: '20px 20px 16px', boxShadow: '0 8px 22px rgba(32,27,93,.07)' }}>
                    <div style={{ color: '#F2B33D', fontSize: 14, letterSpacing: 2, marginBottom: 8 }}>{'★'.repeat(r.rating)}<span style={{ color: '#E4E1F0' }}>{'★'.repeat(5 - r.rating)}</span></div>
                    {r.title && <div style={{ fontFamily: FONT_SUB, fontWeight: 600, fontSize: 14.5, color: c.navy, marginBottom: 6 }}>{r.title}</div>}
                    <p style={{ fontSize: 13.5, lineHeight: 1.7, color: c.grayD, marginBottom: 12 }}>{r.body}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: c.gray }}>
                      <b style={{ color: c.navy }}>{r.name}</b>
                      <span>{r.verified ? 'Verified buyer' : r.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ background: '#fff', borderRadius: 22, padding: isMobile ? '26px 20px' : '36px 34px', boxShadow: '0 10px 26px rgba(32,27,93,.08)', textAlign: 'center' }}>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 20 : 24, color: c.navy, marginBottom: 10 }}>The first reviews are on their way</h2>
              <p style={{ fontSize: 13.5, lineHeight: 1.75, color: c.grayD, maxWidth: 520, margin: '0 auto' }}>
                flip'nsleep is a young brand, and our first customers are sleeping on their pillows right now. Every verified buyer automatically gets a review invitation, and as their reviews come in they'll appear on this page — unfiltered. Until then, we'd rather show you no reviews than fake ones.
              </p>
            </div>
          )}
        </Reveal>
      </section>

      {/* Waarom je ons nu al kunt vertrouwen */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: isMobile ? '18px 20px 10px' : '24px 24px 10px' }}>
        <Reveal delay={100}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
            {[
              ['🌙', '100-night sleep trial', "Try it for 100 nights. Not convinced? Free return, full refund."],
              ['🛡️', '2-year warranty', 'Materials and workmanship covered — repaired, replaced or refunded.'],
              ['🚚', 'Free shipping, always', 'Across the US and Canada, on every order. Free returns within the trial.'],
            ].map(([icon, t, d], i) => (
              <div key={i} style={{ background: c.sky, borderRadius: 18, padding: '20px 18px', textAlign: 'center' }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: FONT_SUB, fontWeight: 600, fontSize: 14.5, color: c.navy, marginBottom: 6 }}>{t}</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.6, color: c.grayD }}>{d}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section style={{ textAlign: 'center', padding: isMobile ? '24px 20px 40px' : '30px 24px 50px' }}>
        <Reveal delay={140}>
          {JUDGEME_REVIEW_FORM_URL ? (
            <>
              <p style={{ fontSize: 13.5, color: c.grayD, maxWidth: 420, margin: '0 auto 16px' }}>
                Already sleeping on a flip'nsleep pillow? Your honest review helps other hot sleepers find their way.
              </p>
              <a href={JUDGEME_REVIEW_FORM_URL} target="_blank" rel="noopener noreferrer" style={BTN}>Write a review</a>
              <div style={{ marginTop: 14 }}>
                <Link to="/product/signature-cold-pillow" style={BTNO}>Shop the 1+1 deal</Link>
              </div>
            </>
          ) : (
            <Link to="/product/signature-cold-pillow" style={BTN}>Shop the 1+1 deal</Link>
          )}
        </Reveal>
      </section>

      <EmailCapture />
    </div>
  );
}
