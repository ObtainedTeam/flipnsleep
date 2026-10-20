import { useState } from 'react';
import { c, BTN, BTNO, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, R, SH, T, LH, SP, W, CARD } from '../theme';

// Gratis kussenvulling-quiz. Volledig op dezelfde pagina (geen redirect, geen
// e-mail). Geeft een concreet aantal handjes schuim dat je uit het volle kussen
// haalt, op basis van slaaphouding, gewenste stevigheid, schouderbreedte en hoe
// het huidige kussen voelt. Gewicht wordt bewust niet gevraagd (gevoelig); de
// schouderbreedte bepaalt voor zijslapers de benodigde hoogte. Vaste
// minimumhoogte zodat de pagina niet verspringt tijdens het antwoorden.

const QUESTIONS = [
  { key: 'pos', q: 'How do you sleep most of the night?', opts: [['🛌', 'On my side', 'side'], ['🙂', 'On my back', 'back'], ['😴', 'On my stomach', 'stomach']] },
  { key: 'firm', q: 'How do you like a pillow to feel?', opts: [['☁️', 'Soft and low', 'soft'], ['⚖️', 'Right in between', 'medium'], ['🧱', 'Firm and high', 'firm']] },
  { key: 'weight', q: 'Roughly how much do you weigh? This just helps us size the filling.', opts: [['🪶', 'Under 130 lb · 60 kg', 'under130'], ['🚶', '130–170 lb · 60–77 kg', 'w130'], ['🧍', '170–210 lb · 77–95 kg', 'w170'], ['💪', '210–250 lb · 95–113 kg', 'w210'], ['🏋️', 'Over 250 lb · 113 kg+', 'over250']] },
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
  const weight = { under130: 2, w130: 1, w170: 0, w210: -1, over250: -2 }[a.weight] || 0;
  const cur = { high: 1, right: 0, flat: -1 }[a.current] || 0;
  lo = Math.max(0, lo + weight + cur);
  hi = Math.max(lo, hi + weight + cur);
  const posText = a.pos === 'side'
    ? 'As a side sleeper you need the most height to keep your neck level with your spine, so keep plenty of filling in.'
    : a.pos === 'stomach'
      ? 'As a stomach sleeper you want the pillow as low as possible, so take out the most.'
      : 'As a back sleeper you want a medium, supportive height.';
  return { lo, hi, posText };
}

export default function PillowQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const done = step >= QUESTIONS.length;

  const answer = (key, val) => { setAnswers(a => ({ ...a, [key]: val })); setStep(s => s + 1); };
  const restart = () => { setStep(0); setAnswers({}); };

  const r = done ? recommend(answers) : null;
  const range = r ? (r.lo === r.hi ? `${r.lo}` : `${r.lo}–${r.hi}`) : '';

  return (
    <section className="r-pad" style={{ background: c.white, ...rv('pad', ...SP.section) }}>
      <div className="r-pad r-mh" style={{ maxWidth: W.text, margin: '0 auto', background: `linear-gradient(180deg, ${c.sky} 0%, ${c.sky2} 100%)`, borderRadius: R.lg, boxShadow: SH.card, ...rv('pad', 40, SP.card[1]), textAlign: 'center', ...rv('mh', 470, 520) }}>
        <div style={EYEBROW}>Free filling finder</div>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, margin: '8px 0 12px' }}>Get your filling just right 🪶</h2>
        <p className="r-fs" style={{ ...rv('fs', ...T.sm), lineHeight: LH.body, color: c.grayD, maxWidth: W.narrow, margin: '0 auto 24px' }}>
          Your Signature Cold Pillow arrives generously filled with shredded memory foam. Answer four quick questions and we'll tell you roughly how many handfuls to take out for your perfect height. No email needed, and you can re-tune anytime.
        </p>

        {!done ? (
          <div>
            <div style={{ fontSize: T.xs[0], fontWeight: 700, color: c.purple, marginBottom: 12, fontFamily: FONT_SUB }}>Question {step + 1} of {QUESTIONS.length}</div>
            <h3 className="r-fs" style={{ fontFamily: FONT_SUB, ...rv('fs', ...T.lg), lineHeight: LH.head, fontWeight: 600, color: c.navy, marginBottom: 16 }}>{QUESTIONS[step].q}</h3>
            <div style={{ display: 'grid', gap: 12, maxWidth: 400, margin: '0 auto' }}>
              {QUESTIONS[step].opts.map(([emoji, label, val], i) => (
                <button key={i} onClick={() => answer(QUESTIONS[step].key, val)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = c.amber; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, background: c.white, border: '2px solid transparent', borderRadius: R.sm, padding: '14px 16px', cursor: 'pointer', fontFamily: 'inherit', fontSize: T.sm[0], color: c.navy, textAlign: 'left', boxShadow: SH.card, transition: 'border-color .12s' }}>
                  <span style={{ fontSize: T.h3[1] }}>{emoji}</span> {label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="r-pad" style={{ ...CARD, ...rv('pad', ...SP.card), maxWidth: W.narrow, margin: '0 auto' }}>
            <div style={{ fontSize: T.h2[1], marginBottom: 4 }}>🪶</div>
            <h3 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h3), lineHeight: LH.head, color: c.navy, marginBottom: 6 }}>Take out about {range} {r.hi === 1 ? 'handful' : 'handfuls'}</h3>
            <p style={{ fontSize: T.sm[0], color: c.purple, fontWeight: 700, marginBottom: 12, fontFamily: FONT_SUB }}>of shredded memory foam, from the full pillow</p>
            <p style={{ fontSize: T.sm[0], lineHeight: LH.body, color: c.grayD, marginBottom: 12 }}>
              {r.posText} Take out around {range} loose fistfuls, lie down, and check that your head and neck stay level. Add or remove one more handful either way until it feels right.
            </p>
            <p style={{ fontSize: T.xs[0], lineHeight: LH.body, color: c.grayD, background: c.sky, borderRadius: R.sm, padding: '12px 16px', marginBottom: 20 }}>
              🧵 Took out too much, or want to firm it up again later? Spare bags of shredded memory foam filling are sold separately, so you can top your pillow back up whenever you like.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#offer" style={BTN}>Shop the pillow</a>
              <button onClick={restart} style={BTNO}>Start over</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
