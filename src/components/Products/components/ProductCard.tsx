import type { Product } from "../types";
import "./productCard.less";

type Props = { product: Product };

export const ProductCard = ({ product: p }: Props) => {
  return (
    <article className="product" aria-label={p.title}>
      <div className="product__figure">
        <div className="product__flags" aria-hidden="true">
          {p.flags.includes("BESTSELLER") && (
            <span className="product__flag product__flag--bestseller">
              BESTSELLER
            </span>
          )}
          {p.flags.includes("NOWOŚĆ") && (
            <span className="product__flag product__flag--new">NOWOŚĆ</span>
          )}
          {p.flags.includes("PROMOCJA") && (
            <span className="product__flag product__flag--promotion">PROMOCJA</span>
          )}
        </div>

        <img className="product__img" src={p.img} alt={p.alt} loading="lazy" />
      </div>

      <h3 className="product__title">{p.title}</h3>

      <div className="product__meta">
        <span className="product__brand">{p.brand}</span>
        <span className="product__stock">
          {p.inStock ? "Dostępny" : "Niedostępny"}
        </span>
      </div>

      <div className="product__prices">
        <span className="product__price">{p.price.toFixed(2)}zł</span>
        <span className="product__old">{p.priceOld.toFixed(2)}zł</span>
      </div>

      <p className="product__lowest">
        Najniższa cena z 30 dni przed obniżką: {p.lowest.toFixed(2)}zł
      </p>
    </article>
  );
};
