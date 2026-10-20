import { useParams } from 'react-router-dom';
import { productById, PRODUCT } from '../data';
import NotFound from './NotFound';
import ProductPillow from './ProductPillow';
import ProductVariable from './ProductVariable';

// Dispatcher voor /product/:id.
// De drie variantproducten (maat + kleur) gaan naar ProductVariable, het kussen
// naar ProductPillow en een onbekende id naar de 404-pagina.
// useParams is de enige hook hier, dus wisselen tussen producttypes geeft geen
// rules-of-hooks-probleem.
export default function Product({ onCartOpen }) {
  const { id } = useParams();
  if (productById(id)) return <ProductVariable onCartOpen={onCartOpen} />;
  if (id === PRODUCT.id) return <ProductPillow onCartOpen={onCartOpen} />;
  return <NotFound />;
}
