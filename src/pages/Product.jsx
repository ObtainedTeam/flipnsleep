import { useParams } from 'react-router-dom';
import { productById } from '../data';
import ProductPillow from './ProductPillow';
import ProductVariable from './ProductVariable';

// Dispatcher voor /product/:id.
// De drie variantproducten (maat + kleur) gaan naar ProductVariable, het kussen
// (en elke andere/onbekende id) naar de bestaande ProductPillow-pagina.
// useParams is de enige hook hier, dus wisselen tussen producttypes geeft geen
// rules-of-hooks-probleem.
export default function Product({ onCartOpen }) {
  const { id } = useParams();
  if (productById(id)) return <ProductVariable onCartOpen={onCartOpen} />;
  return <ProductPillow onCartOpen={onCartOpen} />;
}
