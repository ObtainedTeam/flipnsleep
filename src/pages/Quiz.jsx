import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { c, BTN, useIsMobile, FONT_DISPLAY, FONT_SUB } from '../theme';
import { IMG } from '../data';
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
  const isMobile = useIsMobile();
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
    <div style={{ minHeight: '100vh', background: c.cream, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '26px 20px 60px' }}>
      {/* Logo */}
      <Link to="/" aria-label="flip'nsleep home" style={{ marginBottom: 22 }}>
        <img src={IMG.logoDark} alt="flip'nsleep" style={{ height: isMobile ? 34 : 42, width: 'auto' }} />
      </Link>

      {/* Voortgangsbalk */}
      <div style={{ width: '100%', maxWidth: 460, marginBottom: isMobile ? 34 : 44 }}>
        <div style={{ height: 8, background: '#E7E4DA', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${c.purple}, ${c.navy})`, borderRadius: 99, transition: 'width .4s ease' }} />
        </div>
        <div style={{ fontSize: 11.5, color: c.grayD, marginTop: 7, textAlign: 'right', fontFamily: FONT_SUB }}>
          {emailStep ? 'Last step' : `Question ${step + 1} of ${QUESTIONS.length}`}
        </div>
      </div>

      {!emailStep ? (
        <div style={{ width: '100%', maxWidth: 460, textAlign: 'center' }}>
          <h1 style={{ fontSize: isMobile ? 22 : 28, color: c.navy, fontFamily: FONT_SUB, fontWeight: 400, marginBottom: isMobile ? 24 : 32, lineHeight: 1.3 }}>
            {current.q[0]}<span style={{ fontFamily: FONT_DISPLAY }}>{current.q[1]}</span>{current.q[2]}
          </h1>
          <div style={{ display: 'grid', gap: 12 }}>
            {current.options.map(([emoji, label]) => (
              <button key={label} onClick={() => pick(current.id, label)}
                style={{ display: 'flex', alignItems: 'center', gap: 14, background: c.sky, border: '2px solid transparent', borderRadius: 15, padding: isMobile ? '16px 18px' : '19px 22px', cursor: 'pointer', fontFamily: FONT_SUB, fontSize: isMobile ? 15 : 16, color: c.navy, textAlign: 'left', transition: 'transform .1s, border .1s' }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(.98)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
                <span style={{ fontSize: 22 }}>{emoji}</span>
                <span><b style={{ fontFamily: FONT_DISPLAY, fontWeight: 400 }}>{label.split(' ')[0]}</b> {label.split(' ').slice(1).join(' ')}</span>
              </button>
            ))}
          </div>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{ background: 'none', border: 'none', color: c.grayD, fontSize: 12.5, marginTop: 22, cursor: 'pointer', fontFamily: FONT_SUB }}>← Back</button>
          )}
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: 460, textAlign: 'center' }}>
          {state === 'done' ? (
            <>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🌙</div>
              <h1 style={{ fontSize: isMobile ? 24 : 30, color: c.navy, fontFamily: FONT_DISPLAY, fontWeight: 400, marginBottom: 12 }}>Check your inbox!</h1>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: c.grayD }}>Your 15% discount code is on its way. We're taking you to your perfect pillow…</p>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: isMobile ? 24 : 30, color: c.navy, fontFamily: FONT_SUB, fontWeight: 400, marginBottom: 10, lineHeight: 1.3 }}>
                Your perfect pillow is <span style={{ fontFamily: FONT_DISPLAY }}>ready</span>
              </h1>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: c.grayD, marginBottom: 24 }}>
                Enter your email and we'll send your personal <b style={{ color: c.navy }}>15% discount code</b> right away.
              </p>
              <form onSubmit={submit} style={{ display: 'flex', background: '#fff', borderRadius: 999, padding: 5, boxShadow: '0 8px 22px rgba(32,27,93,.12)' }}>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address"
                  style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'Poppins,sans-serif', fontSize: 13.5, padding: '11px 16px', color: c.navy, minWidth: 0, outline: 'none' }} />
                <button type="submit" disabled={state === 'busy'} style={{ ...BTN, padding: '12px 22px', fontSize: 12.5 }}>{state === 'busy' ? '…' : 'Get 15% off'}</button>
              </form>
              {state === 'error' && <p style={{ fontSize: 12, color: '#b3423f', marginTop: 10 }}>Something went wrong — please try again.</p>}
              <p style={{ fontSize: 11, color: c.gray, marginTop: 12 }}>No spam. Unsubscribe anytime.</p>
              <button onClick={() => setStep(s => s - 1)} style={{ background: 'none', border: 'none', color: c.grayD, fontSize: 12.5, marginTop: 20, cursor: 'pointer', fontFamily: FONT_SUB }}>← Back</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
