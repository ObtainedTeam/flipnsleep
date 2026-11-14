// Lijniconen in plaats van emoji. De data houdt de emoji als sleutel, de weergave tekent het icoon.
import { Moon, Truck, BadgeCheck, ShieldCheck, Package, Snowflake, Thermometer, BedDouble, Wind, Scale, Leaf, Feather, Sprout, Trash2, X, Check } from 'lucide-react';

const MAP = {
  '🌙': Moon, '🚚': Truck, '✅': BadgeCheck, '🛡️': ShieldCheck, '🛡': ShieldCheck, '📦': Package,
  '❄️': Snowflake, '❄': Snowflake, '🌡️': Thermometer, '🌡': Thermometer, '😴': Moon, '🛏️': BedDouble, '🛏': BedDouble,
  '🌬️': Wind, '🌬': Wind, '🫧': Scale, '🎋': Leaf, '🌿': Sprout, '🪶': Feather, '🗑️': Trash2, '🗑': Trash2, '❌': X,
};

export default function Ico({ e, size = 18, stroke = 1.5, style }) {
  const C = MAP[e] || Check;
  return <C size={size} strokeWidth={stroke} aria-hidden="true" style={{ flexShrink: 0, ...style }} />;
}
