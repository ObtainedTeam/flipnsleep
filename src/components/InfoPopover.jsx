import { c, FONT_DISPLAY } from '../theme';

// Klein uitleg-venster. Krijgt info = { title, body } of null.
// Klik op de achtergrond of de kruis-knop sluit het.
export default function InfoPopover({ info, onClose }) {
  if (!info) return null;
  return (
    <div onClick={onClose} role="dialog" aria-modal="true"
      style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(20,16,64,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: 20, maxWidth: 380, width: '100%', padding: '26px 24px', boxShadow: '0 20px 50px rgba(20,16,64,.4)', position: 'relative' }}>
        <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: c.grayD, lineHeight: 1 }}>×</button>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: c.navy, marginBottom: 10, paddingRight: 20 }}>{info.title}</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, color: c.grayD }}>{info.body}</p>
      </div>
    </div>
  );
}
