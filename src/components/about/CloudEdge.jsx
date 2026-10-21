import { c } from '../../theme';

// Wolkenrand onder de About-hero. Beide uiteinden starten en eindigen op
// dezelfde hoogte midden in een wolkboog, zodat de rand naadloos tot aan de
// rechter (en linker) paginarand doorloopt zonder harde hoek.
export default function CloudEdge({ fill = c.cream }) {
  return (
    <svg viewBox="0 0 560 48" preserveAspectRatio="none" aria-hidden="true"
      style={{ display: 'block', width: '100%', height: 48, marginBottom: -1 }}>
      <path d="M0 24 Q35 6 70 22 Q105 4 140 22 Q175 6 210 22 Q245 4 280 22 Q315 6 350 22 Q385 4 420 22 Q455 6 490 22 Q525 4 560 24 L560 48 L0 48 Z" fill={fill} />
    </svg>
  );
}
