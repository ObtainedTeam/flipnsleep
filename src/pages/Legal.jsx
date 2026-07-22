import { useLocation } from 'react-router-dom';
import { c, useIsMobile, FONT_DISPLAY } from '../theme';

const SECTIONS = {
  '/privacy': {
    title: 'Privacy Policy',
    blocks: [
      ['What we collect', 'When you place an order or sign up for our newsletter we collect your name, email address, shipping address and order details. Payment data is processed by Shopify Payments and its payment providers; we never see or store your full card details.'],
      ['How we use it', 'We use your data to fulfil orders, provide customer support, send order updates, and — only if you opted in — send marketing emails through Brevo. You can unsubscribe at any time via the link in every email.'],
      ['Analytics & advertising', 'We use Google Analytics and the Meta Pixel to understand how the site is used and to measure advertising. These tools may set cookies. You can control cookies in your browser settings.'],
      ['Sharing', 'We share data only with the service providers needed to run the store: Shopify (checkout and orders), our fulfilment and shipping partners, Brevo (email), Google and Meta (analytics/ads). We never sell your personal data.'],
      ['Your rights', 'You can request access to, correction of, or deletion of your personal data at any time by emailing support@flipnsleep.com. We respond within 30 days.'],
    ],
  },
  '/terms': {
    title: 'Terms of Service',
    blocks: [
      ['Who we are', "flipnsleep.com is operated by Obtained VOF ('flip'nsleep', 'we'). By ordering on this site you agree to these terms."],
      ['Products & pricing', 'All prices are shown in USD or CAD depending on your region and include our bundle discounts. Obvious pricing errors may be corrected before shipment; you will always be informed and may cancel free of charge.'],
      ['Orders & shipping', 'Orders placed before 11 PM ET ship the same business day where possible. Shipping is free within the United States and Canada. Risk transfers to you on delivery.'],
      ['100-night trial & returns', 'You may try the product for up to 100 nights after delivery. Within that period you can return it free of charge for a full refund of the purchase price. Contact support@flipnsleep.com to start a return.'],
      ['Warranty', 'Statutory warranty rights apply. Defects in materials or workmanship are repaired, replaced or refunded at no cost.'],
      ['Liability', 'Our liability is limited to the purchase price of the order, except where the law does not permit such limitation.'],
    ],
  },
  '/returns': {
    title: 'Shipping & Returns',
    blocks: [
      ['Shipping', 'We ship across the United States and Canada. Shipping is free on every order. Orders placed before 11 PM ET ship the same business day where possible; delivery typically takes 2–6 business days. You receive tracking by email as soon as your order ships.'],
      ['The 100-night trial', 'Sleep on your pillow for up to 100 nights. Adjust it, flip it, wash the cover — really use it. If it is not for you, we take it back.'],
      ['How to return', 'Email support@flipnsleep.com with your order number. You receive a prepaid return label; drop the parcel off and your refund is processed within 5 business days of arrival at our warehouse.'],
      ['Refunds', 'Refunds go back to your original payment method and cover the full purchase price. Shipping was free, so there is nothing to deduct.'],
    ],
  },
};

export default function Legal() {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const page = SECTIONS[pathname] || SECTIONS['/terms'];

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: isMobile ? '36px 22px 50px' : '54px 24px 70px' }}>
      <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 28 : 36, color: c.navy, marginBottom: 6 }}>{page.title}</h1>
      <p style={{ fontSize: 12, color: c.gray, marginBottom: 26 }}>Last updated: July 2026 · flip'nsleep is part of Obtained VOF</p>
      {page.blocks.map(([h, t], i) => (
        <div key={i} style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 6 }}>{h}</h2>
          <p style={{ fontSize: 13.5, lineHeight: 1.75, color: c.grayD }}>{t}</p>
        </div>
      ))}
    </div>
  );
}
