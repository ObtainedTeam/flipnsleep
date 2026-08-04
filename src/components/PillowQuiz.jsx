import { useState } from 'react';
import { c, BTN, useIsMobile, FONT_DISPLAY, FONT_SUB, EYEBROW } from '../theme';

// Gratis kussenvulling-quiz. Volledig op dezelfde pagina (geen redirect, geen
// e-mail). Berekent of iemand vulling moet toevoegen, weghalen of houden, ten
// opzichte van de standaardvulling. Vaste minimumhoogte zodat de pagina niet
// verspringt tijdens het antwoorden.

const QUESTIONS = [
  { q: 'How do you sleep most of the night?', opts: [['🛌', 'On my side', 2], ['🙂', 'On my back', 0], ['😴', 'On my stomach', -2]] },
  { q: 'How do you like a pillow to feel?', opts: [['🧱', 'Firm and high', 2], ['⚖️', 'Right in between', 0], ['☁️', 'Soft and low', -2]] },
  { q: 'Which sounds most like you?', opts: [['💪', 'Broad shoulders / larger build', 1], ['🧍', 'Average build', 0], ['🪶', 'Petite / lighter build', -1]] },
  { q: 'Do you often wake with a stiff neck?', opts: [['😖', 'Yes, quite often', 1], ['🙆', 'No, rarely', 0]] },
];

function result(score) {
  if (score >= 3) return {
    icon: '➕', title: 'Add a little filling',
    body: 'You sleep best on a higher, firmer pillow with proper neck support. Start from the standard filling and add a couple of handfuls until your head and spine line up. Side sleepers and broader shoulders usually want more loft.',
  };
  if (score <= -3) return {
    icon: '➖', title: 'Take a little filling out',
    body: 'You sleep best on a lower, softer pillow. Start from the standard filling and remove a couple of handfuls so your head is not pushed up. Stomach sleepers and lighter builds usually want less loft.',
  };
  return {
    icon: '👌', title: 'The standard filling is a great start',
    body: 'You land right in the middle, so the pillow as it arrives should suit you well. Sleep on it a few nights and add or remove just a handful if you want to fine-tune it.',
  };
}

export default function PillowQuiz() {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const done = step >= QUESTIONS.length;

  const answer = (val) => { setScore(s => s + val); setStep(s => s + 1); };
  const restart = () => { setStep(0); setScore(0); };

  return (
    <section style={{ background: '#fff', padding: isMobile ? '44px 20px' : '64px 40px' }}>
      <div style={{ maxWidth: 620, margin: '0 auto', background: `linear-gradient(180deg, ${c.sky} 0%, ${c.sky2} 100%)`, borderRadius: 24, padding: isMobile ? '26px 20px 30px' : '38px 40px 42px', textAlign: 'center', minHeight: isMobile ? 380 : 360 }}>
        <div style={EYEBROW}>Free filling finder</div>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 24 : 32, color: c.navy, margin: '8px 0 8px' }}>Get your filling just right 🪶</h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.grayD, maxWidth: 440, margin: '0 auto 20px' }}>
          Every Signature Cold Pillow ships with a standard amount of shredded memory foam. Answer a few quick questions to see whether to keep it, add a little or take some out. No email needed, and you can come back anytime to re-tune your pillow.
        </p>

        {!done ? (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: c.purple, marginBottom: 12, fontFamily: FONT_SUB }}>Question {step + 1} of {QUESTIONS.length}</div>
            <h3 style={{ fontFamily: FONT_SUB, fontSize: isMobile ? 16 : 18, fontWeight: 600, color: c.navy, marginBottom: 16 }}>{QUESTIONS[step].q}</h3>
            <div style={{ display: 'grid', gap: 10, maxWidth: 380, margin: '0 auto' }}>
              {QUESTIONS[step].opts.map(([emoji, label, val], i) => (
                <button key={i} onClick={() => answer(val)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = c.amber; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: '2px solid transparent', borderRadius: 14, padding: '13px 16px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, color: c.navy, textAlign: 'left', boxShadow: '0 4px 12px rgba(32,27,93,.08)', transition: 'border-color .12s' }}>
                  <span style={{ fontSize: 22 }}>{emoji}</span> {label}
                </button>
              ))}
            </div>
          </div>
        ) : (() => {
          const r = result(score);
          return (
            <div style={{ background: '#fff', borderRadius: 18, padding: isMobile ? '22px 18px' : '26px 24px', boxShadow: '0 8px 22px rgba(32,27,93,.10)', maxWidth: 420, margin: '0 auto' }}>
              <div style={{ fontSize: 40, marginBottom: 6 }}>{r.icon}</div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: c.navy, marginBottom: 8 }}>{r.title}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: c.grayD, marginBottom: 14 }}>{r.body}</p>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: c.grayD, background: c.sky, borderRadius: 12, padding: '10px 14px', marginBottom: 16 }}>
                🧵 Want to experiment freely? Spare bags of shredded memory foam filling are sold separately, so you can top up your pillow whenever you like.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="#offer" style={{ ...BTN, fontSize: 13 }}>Shop the pillow</a>
                <button onClick={restart} style={{ background: 'none', border: `2px solid ${c.navy}`, color: c.navy, borderRadius: 999, fontFamily: 'inherit', fontWeight: 600, fontSize: 13, padding: '11px 22px', cursor: 'pointer' }}>Start over</button>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
