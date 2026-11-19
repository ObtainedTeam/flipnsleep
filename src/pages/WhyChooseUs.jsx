import { Link } from 'react-router-dom';
import { ReviewsBlock, CompareCards } from '../components/Blocks';
import Reveal from '../components/Reveal';
import { PageHead, NightBand } from '../components/Sky';

const ROWS = [
  ['Adjustable loft', 'Zip open, add or remove filling for your sleeping position', 'Fixed height, take it or leave it'],
  ['Temperature', 'Dual-sided: cool-touch (Q-max 0.26) and cozy bamboo', 'One fabric, often too warm'],
  ['Filling', 'Generous shredded memory foam, air circulates freely', 'Solid block or thin fiber fill that flattens'],
  ['Hygiene', 'Removable, machine-washable outer cover', 'Often not removable or washable'],
  ['Safety', 'OEKO-TEX Standard 100 and CertiPUR-US certified', 'Certification unknown'],
  ['Risk', '100-night trial, free returns, money back', "Once slept on, it's yours"],
];

export default function WhyChooseUs() {
  return (
    <div>
      <PageHead title="Why flip'nsleep?" intro="Most pillows make you adapt to them. Ours adapts to you: in height, in temperature, and in how much risk you take buying it." />

      <section className="sk-sec" style={{ paddingTop: 32 }}><div className="sk-wrap" style={{ maxWidth: 1080 }}>
        <Reveal once>
          <div className="m-only"><CompareCards rows={ROWS} ours="flip'nsleep" theirs="Standard pillow" /></div>
          <table className="d-only sk-table">
            <thead>
              <tr><th scope="col"><span className="sr-only">Feature</span></th><th scope="col" className="is-us">flip'nsleep</th><th scope="col">Standard pillow</th></tr>
            </thead>
            <tbody>
              {ROWS.map(([k, us, them]) => (
                <tr key={k}><td>{k}</td><td className="is-us">{us}</td><td>{them}</td></tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <div style={{ textAlign: 'center', marginTop: 40 }}><Link to="/product/signature-cold-pillow" className="sk-btn">Shop the deal</Link></div>
      </div></section>

      <ReviewsBlock />

      <NightBand title="Your coolest night" accent="starts tonight"
        text="Try it for 100 nights, risk-free. Not sleeping cooler? Ship it back for free and get a full refund."
        cta={{ label: 'Order your Cold Pillow', to: '/product/signature-cold-pillow' }} />
    </div>
  );
}
