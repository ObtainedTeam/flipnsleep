import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { c, BTN, rv, FONT_DISPLAY, FONT_SUB, R, SH, T, LH, W } from '../theme';
import { IMG, dim } from '../data';
import { subscribe } from '../brevo';

// Sleep quiz funnel: één vraag per pagina, effen beige achtergrond, logo
// bovenaan en een voortgangsbalk. Antwoorden gaan als attributen mee naar
// Brevo (lijst quiz15); de 15%-couponmail wordt door een Brevo-automation op
// die lijst verstuurd. Na afloop door naar de productpagina.

const QUESTIONS = [
  {
    id: 'SLEEPER_TYPE',
    q: ['What kind of ', 'sleeper', ' are you?'],
    options: [
      ['🛌', 'Side sleeper'],
      ['😴', 'Back sleeper'],
      ['🛏️', 'Stomach sleeper'],
      ['🔄', 'It changes every night'],
    ],
  },
  {
    id: 'AGE_GROUP',
    q: ['How ', 'old', ' are you?'],
    options: [
      ['🌱', 'Under 35'],
      ['🌤️', '35 – 44'],
      ['🌞', '45 – 54'],
      ['🌙', '55 – 64'],
      ['⭐', '65 or older'],
    ],
  },
  {
    id: 'MAIN_COMPLAINT',
    q: ['What bothers you ', 'most', ' at night?'],
    options: [
      ['🥵', 'I get too warm'],
      ['💢', 'Neck or shoulder pain'],
      ['👀', 'I wake up during the night'],
      ['🥞', 'My pillow loses its shape'],
      ['🤷', 'Nothing specific'],
    ],
  },
  {
    id: 'PILLOW_FEEL',
    q: ['How does your ', 'current pillow', ' feel?'],
    options: [
      ['🔥', 'Too warm'],
      ['📉', 'Too flat'],
      ['⛰️', 'Too high'],
      ['😤', 'Just never right'],
    ],
  },
  {
    id: 'SLEEP_SINCE',
    q: ['How long has sleep been ', 'bothering', ' you?'],
    options: [
      ['🕐', 'Just recently'],
      ['📆', 'A few months'],
      ['🗓️', 'A few years'],
      ['♾️', 'As long as I can remember'],
    ],
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | busy | done | error

  // Vanuit de hero-widget: eerste vraag al beantwoord via ?sleeper=
  useEffect(() => {
    const pre = params.get('sleeper');
    if (pre === 'back') { setAnswers(a => ({ ...a, SLEEPER_TYPE: 'Back sleeper' })); setStep(1); }
    if (pre === 'stomach') { setAnswers(a => ({ ...a, SLEEPER_TYPE: 'Stomach sleeper' })); setStep(1); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const totalSteps = QUESTIONS.length + 1; // + e-mailstap
  const progress = Math.min(100, (step / totalSteps) * 100);
  const emailStep = step >= QUESTIONS.length;

  const pick = (qid, label) => {
    setAnswers(a => ({ ...a, [qid]: label }));
    setStep(s => s + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    setState('busy');
    try {
      await subscribe(email, 'quiz15', answers);
      setState('done');
      setTimeout(() => navigate('/product/signature-cold-pillow'), 2600);
    } catch {
      setState('error');
    }
  };

  const current = QUESTIONS[step];

  return (
    <div style={{ minHeight: '100vh', background: c.cream, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px 64px' }}>
      {/* Logo */}
      <Link to="/" aria-label="flip'nsleep home" style={{ marginBottom: 24 }}>
        <img src={IMG.logoDark} {...dim(IMG.logoDark)} decoding="async" alt="flip'nsleep" className="r-h" style={{ ...rv('h', 42, 34), width: 'auto' }} />
      </Link>

      {/* Voortgangsbalk */}
      <div className="r-mb" style={{ width: '100%', maxWidth: W.narrow, ...rv('mb', 48, 32) }}>
        <div style={{ height: 8, background: 'rgba(32,27,93,.10)', borderRadius: R.pill, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${c.purple}, ${c.navy})`, borderRadius: R.pill, transition: 'width .4s ease' }} />
        </div>
        <div style={{ fontSize: T.xs[0], color: c.grayD, marginTop: 8, textAlign: 'right', fontFamily: FONT_SUB }}>
          {emailStep ? 'Last step' : `Question ${step + 1} of ${QUESTIONS.length}`}
        </div>
      </div>

      {!emailStep ? (
        <div style={{ width: '100%', maxWidth: W.narrow, textAlign: 'center' }}>
          <h1 className="r-fs r-mb" style={{ ...rv('fs', ...T.h2), color: c.navy, fontFamily: FONT_SUB, fontWeight: 400, ...rv('mb', 32, 24), lineHeight: LH.head }}>
            {current.q[0]}<span style={{ fontFamily: FONT_DISPLAY }}>{current.q[1]}</span>{current.q[2]}
          </h1>
          <div style={{ display: 'grid', gap: 12 }}>
            {current.options.map(([emoji, label]) => (
              <button key={label} onClick={() => pick(current.id, label)}
                className="r-pad r-fs card-hover" style={{ display: 'flex', alignItems: 'center', gap: 16, background: c.sky, border: '2px solid transparent', borderRadius: R.sm, ...rv('pad', '20px 24px', '16px 20px'), cursor: 'pointer', fontFamily: FONT_SUB, ...rv('fs', ...T.md), color: c.navy, textAlign: 'left', transition: 'transform .1s, border .1s' }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(.98)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
                <span style={{ fontSize: T.h3[0] }}>{emoji}</span>
                <span><b style={{ fontFamily: FONT_DISPLAY, fontWeight: 400 }}>{label.split(' ')[0]}</b> {label.split(' ').slice(1).join(' ')}</span>
              </button>
            ))}
          </div>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{ background: 'none', border: 'none', color: c.grayD, fontSize: T.sm[0], marginTop: 24, cursor: 'pointer', fontFamily: FONT_SUB }}>← Back</button>
          )}
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: W.narrow, textAlign: 'center' }}>
          {state === 'done' ? (
            <>
              <div style={{ fontSize: T.h1[0], marginBottom: 12 }}>🌙</div>
              <h1 className="r-fs" style={{ ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, fontFamily: FONT_DISPLAY, fontWeight: 400, marginBottom: 12 }}>Check your inbox!</h1>
              <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD }}>Your 15% discount code is on its way. We're taking you to your perfect pillow…</p>
            </>
          ) : (
            <>
              <h1 className="r-fs" style={{ ...rv('fs', ...T.h2), color: c.navy, fontFamily: FONT_SUB, fontWeight: 400, marginBottom: 12, lineHeight: LH.head }}>
                Your perfect pillow is <span style={{ fontFamily: FONT_DISPLAY }}>ready</span>
              </h1>
              <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD, marginBottom: 24 }}>
                Enter your email and we'll send your personal <b style={{ color: c.navy }}>15% discount code</b> right away.
              </p>
              <form onSubmit={submit} style={{ display: 'flex', alignItems: 'center', background: c.white, borderRadius: R.pill, padding: 5, boxShadow: SH.card }}>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address" className="r-fs"
                  style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'inherit', ...rv('fs', ...T.md), padding: '11px 16px', color: c.navy, minWidth: 0, outline: 'none' }} />
                <button type="submit" disabled={state === 'busy'} style={{ ...BTN, flexShrink: 0 }}>{state === 'busy' ? '…' : 'Get 15% off'}</button>
              </form>
              {state === 'error' && <p style={{ fontSize: T.xs[0], color: c.danger, marginTop: 12 }}>Something went wrong — please try again.</p>}
              <p style={{ fontSize: T.xs[0], color: c.grayD, marginTop: 12 }}>No spam. Unsubscribe anytime.</p>
              <button onClick={() => setStep(s => s - 1)} style={{ background: 'none', border: 'none', color: c.grayD, fontSize: T.sm[0], marginTop: 24, cursor: 'pointer', fontFamily: FONT_SUB }}>← Back</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
