// Videoreviews en de achtergrondvideo van de BOGO-tegel op de homepage.
//
// Een videoslot is `null` (placeholder "Video review coming soon") of:
//   { src: '/videos/reviews/naam.mp4', poster: '/images/reviews/naam.webp',
//     name: 'Voornaam A.', caption: 'Korte regel uit de video' }
// Zet bestanden in public/videos/reviews en public/images/reviews en vul het
// slot hieronder; de site speelt ze muted af zodra ze in beeld zijn.
//
// Homepage: 6 liggende/vierkante slots (twee rijen van drie) + 2 staande grote.
// Productpagina: 3 slots, gemengd met de tekstreviews uit Judge.me.
export const REVIEW_VIDEOS = {
  home: [null, null, null, null, null, null],
  homeTall: [null, null],
  product: [null, null, null],
};

// Achtergrondvideo van "Buy one, get one free" op de homepage. Zolang `src`
// null is, staat alleen de poster er.
export const PROMO_VIDEO = {
  src: null, // bijvoorbeeld '/videos/bogo.mp4'
  poster: '/images/step-3.webp',
};

// Dummykaarten om de opmaak te vullen tijdens het bouwen. Alleen in
// development (vite dev): in de productiebuild is deze lijst leeg, zodat er
// nooit een verzonnen review live komt.
export const DEV_REVIEWS = import.meta.env.DEV ? [
  { title: 'Dummy review one', body: 'Development only. This card shows how a short text review sits in the layout.', name: 'Dummy A.', rating: 5, verified: true },
  { title: 'Dummy review two', body: 'Development only. A longer text review so the clamp and the card height can be checked against a few lines of copy that keep going for a while before they stop.', name: 'Dummy B.', rating: 5, verified: true },
  { title: 'Dummy review three', body: 'Development only. Medium length text for the third slot.', name: 'Dummy C.', rating: 4, verified: true },
  { title: 'Dummy review four', body: 'Development only. Another card for the carousel and the bento.', name: 'Dummy D.', rating: 5, verified: false },
  { title: 'Dummy review five', body: 'Development only. Fifth card.', name: 'Dummy E.', rating: 5, verified: true },
] : [];
