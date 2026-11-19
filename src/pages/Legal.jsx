import { useLocation } from 'react-router-dom';

const SECTIONS = {
  '/privacy': {
    title: 'Privacy Policy',
    blocks: [
      ['What we collect', 'When you place an order or sign up for our newsletter we collect your name, email address, shipping address and order details. Payment data is processed by Shopify Payments and its payment providers; we never see or store your full card details.'],
      ['How we use it', 'We use your data to fulfil orders, provide customer support, send order updates, and, only if you opted in, send marketing emails through Brevo. You can unsubscribe at any time via the link in every email.'],
      ['Analytics & advertising', 'We use Google Analytics and the Meta Pixel to understand how the site is used and to measure advertising. These tools may set cookies. You can control cookies in your browser settings.'],
      ['Sharing', 'We share data only with the service providers needed to run the store: Shopify (checkout and orders), our fulfilment and shipping partners, Brevo (email), Google and Meta (analytics/ads). We never sell your personal data.'],
      ['Your rights', 'You can request access to, correction of, or deletion of your personal data at any time by emailing info@flipnsleep.com. We respond within 30 days.'],
    ],
  },
  '/terms': {
    title: 'Terms of Service',
    blocks: [
      ['Who we are', "flipnsleep.com is operated by Obtained VOF ('flip'nsleep', 'we'). By ordering on this site you agree to these terms."],
      ['Products & pricing', 'All prices are shown in USD or CAD depending on your region and include our bundle discounts. Obvious pricing errors may be corrected before shipment; you will always be informed and may cancel free of charge.'],
      ['Orders & shipping', 'Orders placed before 11 PM ET ship the same business day where possible. Shipping is free within the United States and Canada. Risk transfers to you on delivery.'],
      ['100-night trial & returns', 'You may try the product for up to 100 nights after delivery. Within that period you can return it free of charge for a full refund of the purchase price. Contact info@flipnsleep.com to start a return.'],
      ['Warranty', 'All products come with a 2-year warranty on materials and workmanship, in addition to your statutory rights. Defects are repaired, replaced or refunded at no cost.'],
      ['Liability', 'Our liability is limited to the purchase price of the order, except where the law does not permit such limitation.'],
    ],
  },
  '/returns': {
    title: 'Shipping & Returns',
    blocks: [
      ['Shipping', 'We ship across the United States and Canada. Shipping is free on every order. Orders placed before 11 PM ET ship the same business day where possible; delivery typically takes 2–6 business days. You receive tracking by email as soon as your order ships.'],
      ['The 100-night trial', 'Sleep on your pillow for up to 100 nights. Adjust it, flip it, wash the cover, really use it. If it is not for you, we take it back.'],
      ['How to return', 'Email info@flipnsleep.com with your order number. You receive a prepaid return label; drop the parcel off and your refund is processed within 5 business days of arrival at our warehouse.'],
      ['Refunds', 'Refunds go back to your original payment method and cover the full purchase price. Shipping was free, so there is nothing to deduct.'],
    ],
  },
};

export default function Legal() {
  const { pathname } = useLocation();
  const page = SECTIONS[pathname] || SECTIONS['/terms'];

  return (
    <div className="sk-sec"><div className="sk-wrap"><div className="sk-prose">
      <h1 className="sk-h1" style={{ fontSize: 'clamp(30px, 4vw, 46px)', marginBottom: 12 }}>{page.title}</h1>
      <p style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 32 }}>Last updated: July 2026. flip'nsleep is part of Obtained VOF.</p>
      {page.blocks.map(([h, t]) => (
        <div key={h}>
          <h3>{h}</h3>
          <p>{t}</p>
        </div>
      ))}
    </div></div></div>
  );
}
