// components/Products/Products.tsx
import { useEffect, useMemo, useState } from "react";
import "./products.less";
import { ProductsTabs } from "./components/ProductsTabs";
import { ProductsSlider } from "./components/ProductsSlider";
import type { PicsumPhoto, Product, Tab } from "./types";
import { makeProduct } from "./utils";

export const Products = () => {
  const [tab, setTab] = useState<Tab>("promotions");
  const [all, setAll] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://picsum.photos/v2/list?page=3&limit=24");
      const data = (await res.json()) as PicsumPhoto[];
      setAll(data.map((x, i) => makeProduct(x, i)));
    })();
  }, []);

  const data = useMemo<Product[]>(() => {
    if (!all.length) return [];
    if (tab === "promotions")
      return all.filter((p) => p.flags.includes("PROMOCJA")).slice(0, 12);
    if (tab === "new")
      return all.filter((p) => p.flags.includes("NOWOŚĆ")).slice(0, 12);
    return all.filter((p) => p.flags.includes("BESTSELLER")).slice(0, 12);
  }, [tab, all]);

  return (
    <section className="products" aria-labelledby="products-heading">
      <div className="container">
        <header className="products__header">
          <h2 id="products-heading" className="sr-only">
            Promocje Nowości Bestsellery
          </h2>

          <ProductsTabs active={tab} onChange={setTab} />

          <a
            className="products__all"
            href="#"
            aria-label="Zobacz wszystkie produkty"
          >
            Zobacz wszystkie
          </a>
        </header>

        <ProductsSlider items={data} />
      </div>
    </section>
  );
};
