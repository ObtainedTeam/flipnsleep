import { Link } from 'react-router-dom';
import { FAQ_ITEMS } from '../data';
import { Acc, PageHead, NightBand } from '../components/Sky';

export default function FAQ() {
  return (
    <div>
      <PageHead title="Questions? Answered." intro={<>Everything about the trial, shipping, washing and adjusting. Still stuck? Email <a href="mailto:info@flipnsleep.com" style={{ color: 'inherit', fontWeight: 600 }}>info@flipnsleep.com</a>.</>} />
      <section className="sk-sec" style={{ paddingTop: 32 }}><div className="sk-wrap" style={{ maxWidth: 900 }}>
        <Acc items={FAQ_ITEMS} />
        <div style={{ textAlign: 'center', marginTop: 48 }}><Link to="/product/signature-cold-pillow" className="sk-btn">Shop the deal</Link></div>
      </div></section>
      <NightBand title="Try it for" accent="100 nights"
        text="Sleep on it, adjust it, flip it. Not for you? Send it back for free and get a full refund."
        cta={{ label: 'Shop the pillow', to: '/product/signature-cold-pillow' }} />
    </div>
  );
}
