import { Link } from 'react-router-dom';
import { c, BTN, BTNO, rv, FONT_DISPLAY, T, LH, SP, W } from '../theme';
import { IMG, dim } from '../data';

// 404: crème vlak, gecentreerd. Wordt gerenderd door de catch-all route en
// geprerenderd naar dist/404.html.
export default function NotFound() {
  return (
    <section className="r-pad" style={{ background: c.cream, textAlign: 'center', ...rv('pad', '96px 40px 72px', '64px 20px 48px') }}>
      <div style={{ maxWidth: W.narrow, margin: '0 auto' }}>
        <img src={IMG.iconCloud} {...dim(IMG.iconCloud)} decoding="async" alt="" style={{ width: 120, height: 'auto', margin: '0 auto 24px', display: 'block' }} />
        <h1 className="r-fs" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, ...rv('fs', ...T.display), lineHeight: LH.tight, color: c.navy, marginBottom: 16 }}>This page took a nap</h1>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD, marginBottom: 32 }}>
          We couldn't find the page you were looking for. It may have moved, or the link has a typo. Your pillow, however, is right where you left it.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={BTN}>Back to home</Link>
          <Link to="/shop" style={BTNO}>Shop pillows</Link>
        </div>
      </div>
    </section>
  );
}
