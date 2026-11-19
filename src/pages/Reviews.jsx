import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IMG, dim } from '../data';
import Reveal from '../components/Reveal';
import { JUDGEME_REVIEW_FORM_URL } from '../judgeme';
import { PageHead } from '../components/Sky';
import { TrustRow } from '../components/Sections';

export default function Reviews() {
  const [data, setData] = useState(null); // { reviews, count, avg }

  useEffect(() => {
    fetch('/api/reviews').then((r) => r.json()).then(setData).catch(() => setData(null));
  }, []);

  const hasReviews = !!(data && data.count > 0);
  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

  return (
    <div>
      <PageHead title="Real sleepers, real reviews"
        intro="Reviews here are collected independently through Judge.me from verified flip'nsleep buyers. We can't edit them or make them up, and that's exactly the point." />

      <section className="sk-sec" style={{ paddingTop: 32 }}><div className="sk-wrap" style={{ maxWidth: 1080 }}>
        <Reveal once>
          {hasReviews ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 32, color: 'var(--ink)' }}>
                <span className="sk-stars" style={{ fontSize: 24 }} aria-label={`${data.avg} out of 5 stars`}>{stars(Math.round(data.avg))}</span>
                <b style={{ font: "400 24px/1 var(--display)" }}>{data.avg}</b>
                <span style={{ fontSize: 16, color: 'var(--ink-2)' }}>based on {data.count} verified review{data.count === 1 ? '' : 's'}</span>
              </div>
              <div className="sk-grid is-2">
                {data.reviews.map((r, i) => (
                  <figure key={i} className="sk-rev" style={{ boxShadow: 'inset 0 0 0 1px var(--line)' }}>
                    <span className="sk-stars" aria-label={`${r.rating} out of 5 stars`}>{stars(r.rating)}</span>
                    {r.title && <b className="is-title">{r.title}</b>}
                    <p>{r.body}</p>
                    <footer><span>{r.name}</span><span>{r.verified ? 'Verified buyer' : r.date}</span></footer>
                  </figure>
                ))}
              </div>
            </>
          ) : (
            <div className="sk-card is-sky" style={{ textAlign: 'center', padding: 'clamp(28px, 5vw, 56px)' }}>
              <img className="sk-bob" src={IMG.iconCloud} {...dim(IMG.iconCloud)} decoding="async" alt="" aria-hidden="true" style={{ width: 120, height: 'auto', margin: '0 auto 20px', display: 'block', filter: 'drop-shadow(0 10px 10px rgba(20,16,64,.14))' }} />
              <h2 className="sk-h2" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)' }}>The first reviews are on their way</h2>
              <p className="sk-lead" style={{ margin: '16px auto 0', maxWidth: '60ch' }}>
                flip'nsleep is a young brand, and our first customers are sleeping on their pillows right now. Every verified buyer automatically gets a review invitation, and as their reviews come in they'll appear on this page, unfiltered. Until then, we'd rather show you no reviews than fake ones.
              </p>
            </div>
          )}
        </Reveal>

        <TrustRow />

        <div style={{ textAlign: 'center', marginTop: 56 }}>
          {JUDGEME_REVIEW_FORM_URL ? (
            <>
              <p className="sk-lead" style={{ margin: '0 auto 24px' }}>Already sleeping on a flip'nsleep pillow? Your honest review helps other hot sleepers find their way.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/product/signature-cold-pillow" className="sk-btn">Shop the deal</Link>
                <a href={JUDGEME_REVIEW_FORM_URL} target="_blank" rel="noopener noreferrer" className="sk-btn is-line">Write a review</a>
              </div>
            </>
          ) : (
            <Link to="/product/signature-cold-pillow" className="sk-btn">Shop the deal</Link>
          )}
        </div>
      </div></section>
    </div>
  );
}
