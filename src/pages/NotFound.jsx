import { Link } from 'react-router-dom';
import { IMG, dim } from '../data';
import { Cloud } from '../components/Sky';

// 404: een stukje hemel met het lachende wolkje. Wordt gerenderd door de
// catch-all route en geprerenderd naar dist/404.html.
export default function NotFound() {
  return (
    <section className="sk-sec"><div className="sk-wrap">
      <div className="sk-card is-sky" style={{ position: 'relative', overflow: 'hidden', textAlign: 'center', padding: 'clamp(48px, 8vw, 96px) 24px', borderRadius: 28 }}>
        <Cloud className="sk-drift" style={{ position: 'absolute', left: '4%', top: '14%', width: 'clamp(70px, 14vw, 180px)' }} />
        <Cloud className="sk-drift" style={{ position: 'absolute', right: '5%', bottom: '12%', width: 'clamp(90px, 18vw, 220px)', animationDuration: '15s' }} />
        <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
          <img className="sk-bob" src={IMG.iconCloud} {...dim(IMG.iconCloud)} decoding="async" alt="" style={{ width: 132, height: 'auto', margin: '0 auto 24px', display: 'block', filter: 'drop-shadow(0 10px 10px rgba(20,16,64,.14))' }} />
          <h1 className="sk-h1" style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}>This page took a nap</h1>
          <p className="sk-lead" style={{ margin: '16px auto 32px' }}>We couldn't find the page you were looking for. It may have moved, or the link has a typo. Your pillow, however, is right where you left it.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="sk-btn">Back to home</Link>
            <Link to="/shop" className="sk-btn is-line">Shop pillows</Link>
          </div>
        </div>
      </div>
    </div></section>
  );
}
