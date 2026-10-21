import { Link } from 'react-router-dom';
import { c, R, SH, T, LH, SP, W, BTN_SM, rv, FONT_DISPLAY, FONT_SUB, EYEBROW, CHIP } from '../../theme';
import { IMG, dim } from '../../data';
import Reveal from '../Reveal';
import './about.css';

const TILE = { position: 'relative', borderRadius: R.lg, boxShadow: SH.card, overflow: 'hidden', textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' };
const PAD = rv('pad', SP.card[0], SP.card[1]);
const BIG = { fontFamily: FONT_DISPLAY, lineHeight: LH.tight };
const SMALL = { fontSize: T.sm[0], lineHeight: LH.body };

// Foto-tegel met donker verloop onderin en een bijschrift.
function PhotoTile({ src, alt, eyebrow, title, to, pos = 'center' }) {
  return (
    <Link to={to} className="card-hover" style={{ ...TILE, background: c.navy, justifyContent: 'flex-end' }}>
      <img src={src} {...dim(src)} loading="lazy" decoding="async" alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(20,16,64,0) 40%, rgba(20,16,64,.82) 100%)` }} />
      <div className="r-pad" style={{ position: 'relative', ...PAD }}>
        <div style={{ ...EYEBROW, color: c.amber }}>{eyebrow}</div>
        <div className="r-fs" style={{ fontFamily: FONT_SUB, fontWeight: 600, ...rv('fs', ...T.h3), lineHeight: LH.head, color: c.white, marginTop: 6, textShadow: SH.text }}>{title}</div>
      </div>
    </Link>
  );
}

function StatTile({ bg, fg, sub, big, text }) {
  return (
    <div className="r-pad" style={{ ...TILE, background: bg, justifyContent: 'space-between', ...PAD }}>
      <div style={{ ...EYEBROW, color: sub }}>{text[0]}</div>
      <div>
        <div className="r-fs" style={{ ...BIG, ...rv('fs', ...T.display), color: fg }}>{big}</div>
        <div style={{ ...SMALL, color: sub, marginTop: 6 }}>{text[1]}</div>
      </div>
    </div>
  );
}

export default function Bento() {
  return (
    <section className="r-pad" style={{ maxWidth: W.page + 80, margin: '0 auto', ...rv('pad', ...SP.sectionTop) }}>
      <Reveal><div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={EYEBROW}>Why we built it</div>
        <h2 className="r-fs" style={{ fontFamily: FONT_DISPLAY, ...rv('fs', ...T.h2), lineHeight: LH.head, color: c.navy, margin: '8px 0 12px' }}>Why we built <span style={{ fontFamily: FONT_SUB }}>flip'nsleep</span></h2>
        <p className="r-fs" style={{ ...rv('fs', ...T.md), lineHeight: LH.body, color: c.grayD, maxWidth: W.narrow, margin: '0 auto' }}>One pillow, two sides, no gimmicks. Here is what goes into it.</p>
      </div></Reveal>

      <Reveal><div className="ab-bento r-gap" style={rv('gap', ...SP.gap)}>
        <div className="ab-t-big">
          <PhotoTile src={IMG.filling} alt="Shredded memory foam filling inside the Signature Cold Pillow" eyebrow="Inside" title="Shredded memory foam that lets air move, so heat can escape" to="/product/signature-cold-pillow" />
        </div>

        <StatTile bg={c.navy} fg={c.white} sub={c.lilac} big="0.26" text={['Cool side', 'Tested Q-max of the cool-touch fabric']} />
        <StatTile bg={c.sky} fg={c.navy} sub={c.grayD} big="100" text={['Sleep trial', 'nights to try it at home, on us']} />

        <div className="ab-t-wide">
          <PhotoTile src={IMG.heroPoster} alt="The Signature Cold Pillow on a bed at night" eyebrow="Two sides" title="Cool side up on warm nights, soft bamboo when it gets chilly" to="/how-it-works" pos="center 60%" />
        </div>

        <div className="r-pad ab-m-full" style={{ ...TILE, background: c.cream, justifyContent: 'space-between', ...PAD }}>
          <div className="r-fs" style={{ ...BIG, ...rv('fs', 56, 40), color: c.amberD, lineHeight: 1 }} aria-hidden="true">&ldquo;</div>
          <div>
            <p className="r-fs" style={{ fontFamily: FONT_SUB, fontWeight: 600, ...rv('fs', ...T.lg), lineHeight: LH.head, color: c.navy }}>The cold side should always be there when you need it.</p>
            <div style={{ fontSize: T.xs[0], color: c.grayD, marginTop: 8 }}>The flip'nsleep team</div>
          </div>
        </div>

        <div className="r-pad" style={{ ...TILE, background: c.white, justifyContent: 'space-between', ...PAD }}>
          <div style={EYEBROW}>Certified</div>
          <div>
            <div className="r-fs" style={{ fontFamily: FONT_SUB, fontWeight: 600, ...rv('fs', ...T.h4), lineHeight: LH.head, color: c.navy }}>OEKO-TEX &amp; CertiPUR-US</div>
            <div style={{ ...SMALL, color: c.grayD, marginTop: 6 }}>Fabrics and foam you can check.</div>
          </div>
        </div>

        <StatTile bg={c.purple} fg={c.amber} sub={c.lilac} big="2 yrs" text={['Warranty', 'on materials and workmanship']} />

        <Link to="/product/signature-cold-pillow" className="card-hover r-pad ab-m-full" style={{ ...TILE, background: c.sky, justifyContent: 'space-between', ...PAD }}>
          <span style={{ ...CHIP, alignSelf: 'flex-start', background: c.amber, color: c.navy, fontSize: T.xs[0], padding: '5px 12px' }}>Buy 1, Get 1 Free</span>
          <div>
            <div style={{ ...SMALL, color: c.navy, fontWeight: 600, marginBottom: 12 }}>Ships free to the US &amp; Canada.</div>
            <span style={BTN_SM}>Shop the pillow</span>
          </div>
        </Link>
      </div></Reveal>
    </section>
  );
}
