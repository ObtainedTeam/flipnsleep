import { useState } from 'react';
import { c, BTN, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';

// Gratis kussenvulling-quiz. Volledig op dezelfde pagina (geen redirect, geen
// e-mail). Geeft een concreet aantal handjes schuim dat je uit het volle kussen
// haalt, op basis van slaaphouding, gewenste stevigheid, schouderbreedte en hoe
// het huidige kussen voelt. Gewicht wordt bewust niet gevraagd (gevoelig); de
// schouderbreedte bepaalt voor zijslapers de benodigde hoogte. Vaste
// minimumhoogte zodat de pagina niet verspringt tijdens het antwoorden.

const QUESTIONS = [
  { key: 'pos', q: 'How do you sleep most of the night?', opts: [['🛌', 'On my side', 'side'], ['🙂', 'On my back', 'back'], ['😴', 'On my stomach', 'stomach']] },
  { key: 'firm', q: 'How do you like a pillow to feel?', opts: [['☁️', 'Soft and low', 'soft'], ['⚖️', 'Right in between', 'medium'], ['🧱', 'Firm and high', 'firm']] },
  { key: 'shoulder', q: 'How broad are your shoulders?', opts: [['🙆', 'On the narrow side', 'narrow'], ['🧍', 'About average', 'average'], ['💪', 'Broad', 'broad']] },
  { key: 'current', q: 'Your current pillow usually feels…', opts: [['⬆️', 'Too high or too full', 'high'], ['👌', 'About right', 'right'], ['⬇️', 'Too flat', 'flat']] },
];

// Aantal handjes dat je uit het volle kussen haalt (basis: positie x stevigheid),
// bijgesteld met schouderbreedte en het huidige kussengevoel.
function recommend(a) {
  const table = {
    side: { soft: [4, 6], medium: [2, 4], firm: [0, 2] },
    back: { soft: [10, 12], medium: [9, 11], firm: [8, 10] },
    stomach: { soft: [10, 12], medium: [9, 11], firm: [8, 10] },
  };
  let [lo, hi] = table[a.pos][a.firm];
  const shoulder = { narrow: 1, average: 0, broad: -1 }[a.shoulder] || 0;
  const cur = { high: 1, right: 0, flat: -1 }[a.current] || 0;
  lo = Math.max(0, lo + shoulder + cur);
  hi = Math.max(lo, hi + shoulder + cur);
  const posText = a.pos === 'side'
    ? 'As a side sleeper you need the most height to keep your neck level with your spine, so keep plenty of filling in.'
    : a.pos === 'stomach'
      ? 'As a stomach sleeper you want the pillow as low as possible, so take out the most.'
      : 'As a back sleeper you want a medium, supportive height.';
  return { lo, hi, posText };
}

export default function PillowQuiz() {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const done = step >= QUESTIONS.length;

  const answer = (key, val) => { setAnswers(a => ({ ...a, [key]: val })); setStep(s => s + 1); };
  const restart = () => { setStep(0); setAnswers({}); };

  const r = done ? recommend(answers) : null;
  const range = r ? (r.lo === r.hi ? `${r.lo}` : `${r.lo}–${r.hi}`) : '';

  return (
    <section style={{ background: '#fff', padding: isMobile ? '44px 20px' : '64px 40px' }}>
      <div style={{ maxWidth: 620, margin: '0 auto', background: `linear-gradient(180deg, ${c.sky} 0%, ${c.sky2} 100%)`, borderRadius: 24, padding: isMobile ? '26px 20px 30px' : '38px 40px 42px', textAlign: 'center', minHeight: isMobile ? 420 : 400 }}>
        <div style={EYEBROW}>Free filling finder</div>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 32, color: c.navy, margin: '8px 0 8px' }}>Get your filling just right 🪶</h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.grayD, maxWidth: 450, margin: '0 auto 20px' }}>
          Your Signature Cold Pillow arrives generously filled with shredded memory foam. Answer four quick questions and we'll tell you roughly how many handfuls to take out for your perfect height. No email needed, and you can re-tune anytime.
        </p>

        {!done ? (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: c.purple, marginBottom: 12, fontFamily: FONT_SUB }}>Question {step + 1} of {QUESTIONS.length}</div>
            <h3 style={{ fontFamily: FONT_SUB, fontSize: isMobile ? 16 : 18, fontWeight: 600, color: c.navy, marginBottom: 16 }}>{QUESTIONS[step].q}</h3>
            <div style={{ display: 'grid', gap: 10, maxWidth: 380, margin: '0 auto' }}>
              {QUESTIONS[step].opts.map(([emoji, label, val], i) => (
                <button key={i} onClick={() => answer(QUESTIONS[step].key, val)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = c.amber; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: '2px solid transparent', borderRadius: 14, padding: '13px 16px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, color: c.navy, textAlign: 'left', boxShadow: '0 4px 12px rgba(32,27,93,.08)', transition: 'border-color .12s' }}>
                  <span style={{ fontSize: 22 }}>{emoji}</span> {label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 18, padding: isMobile ? '22px 18px' : '26px 24px', boxShadow: '0 8px 22px rgba(32,27,93,.10)', maxWidth: 440, margin: '0 auto' }}>
            <div style={{ fontSize: 34, marginBottom: 4 }}>🪶</div>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 20 : 23, color: c.navy, marginBottom: 4 }}>Take out about {range} {r.hi === 1 ? 'handful' : 'handfuls'}</h3>
            <p style={{ fontSize: 12.5, color: c.purple, fontWeight: 700, marginBottom: 12, fontFamily: FONT_SUB }}>of shredded memory foam, from the full pillow</p>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: c.grayD, marginBottom: 12 }}>
              {r.posText} Take out around {range} loose fistfuls, lie down, and check that your head and neck stay level. Add or remove one more handful either way until it feels right.
            </p>
            <p style={{ fontSize: 12.5, lineHeight: 1.6, color: c.grayD, background: c.sky, borderRadius: 12, padding: '10px 14px', marginBottom: 16 }}>
              🧵 Took out too much, or want to firm it up again later? Spare bags of shredded memory foam filling are sold separately, so you can top your pillow back up whenever you like.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#offer" style={{ ...BTN, fontSize: 13 }}>Shop the pillow</a>
              <button onClick={restart} style={{ background: 'none', border: `2px solid ${c.navy}`, color: c.navy, borderRadius: 999, fontFamily: 'inherit', fontWeight: 600, fontSize: 13, padding: '11px 22px', cursor: 'pointer' }}>Start over</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
