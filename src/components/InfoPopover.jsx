import { c, FONT_DISPLAY, R, SH, T, LH } from '../theme';

// Klein uitleg-venster. Krijgt info = { title, body } of null.
// Klik op de achtergrond of de kruis-knop sluit het.
export default function InfoPopover({ info, onClose }) {
  if (!info) return null;
  return (
    <div onClick={onClose} role="dialog" aria-modal="true"
      style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(20,16,64,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: c.white, borderRadius: R.lg, maxWidth: 420, width: '100%', padding: '28px 24px', boxShadow: SH.float, position: 'relative' }}>
        <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: T.h3[0], cursor: 'pointer', color: c.grayD, lineHeight: 1 }}>×</button>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: T.h4[0], lineHeight: LH.head, color: c.navy, marginBottom: 12, paddingRight: 24 }}>{info.title}</h3>
        <p style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.grayD }}>{info.body}</p>
      </div>
    </div>
  );
}
