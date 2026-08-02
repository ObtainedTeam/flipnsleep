// Haalt gepubliceerde Judge.me-reviews op en geeft ze geschoond terug aan de
// reviewpagina. Gebruikt de PRIVATE Judge.me-token; die hoort uitsluitend hier
// (server-side) en staat in Vercel als environment variable:
//   JUDGEME_PRIVATE_TOKEN  (Settings > Environment Variables, daarna redeploy)
// Zonder token of bij fouten geeft de functie een lege lijst terug en toont de
// reviewpagina automatisch de tussenversie. Respons wordt een uur gecachet.

const SHOP_DOMAIN = '0j1ggm-z7.myshopify.com';

export default async function handler(req, res) {
  const token = process.env.JUDGEME_PRIVATE_TOKEN;
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  if (!token) return res.status(200).json({ reviews: [], count: 0, avg: 0 });

  try {
    const r = await fetch(`https://judge.me/api/v1/reviews?api_token=${token}&shop_domain=${SHOP_DOMAIN}&per_page=24`);
    if (!r.ok) throw new Error('judge.me ' + r.status);
    const data = await r.json();
    const reviews = (data.reviews || [])
      .filter((x) => !x.hidden)
      .map((x) => ({
        rating: x.rating,
        title: x.title || '',
        body: x.body || '',
        name: (x.reviewer && x.reviewer.name) || 'Anonymous',
        date: (x.created_at || '').slice(0, 10),
        verified: !!x.verified && x.verified !== 'nothing',
      }));
    const count = reviews.length;
    const avg = count ? Math.round((reviews.reduce((s, x) => s + x.rating, 0) / count) * 10) / 10 : 0;
    return res.status(200).json({ reviews, count, avg });
  } catch {
    return res.status(200).json({ reviews: [], count: 0, avg: 0 });
  }
}
