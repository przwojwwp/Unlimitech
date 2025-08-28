import { useEffect, useMemo, useRef, useState } from "react";
import $ from "jquery";
import "slick-carousel";
import "./products.less";

/** ----- Typy danych ----- **/

// dane z API picsum.photos – wystarczą nam te pola
interface PicsumPhoto {
  id: string | number;
  author?: string;
  // ignorujemy resztę pól
  [k: string]: unknown;
}

type Flag = "PROMOCJA" | "BESTSELLER" | "NOWOŚĆ";

interface Product {
  id: string | number;
  brand: string;
  title: string;
  img: string;
  alt: string;
  price: number;
  priceOld: number;
  lowest: number;
  inStock: boolean;
  flags: Flag[];
}

// taby – trzy dozwolone wartości
const TABS = ["promotions", "new", "bestsellers"] as const;
type Tab = (typeof TABS)[number];

/** ----- Pomocnicze utils ----- **/

const crop = (id: string | number, w = 520, h = 640): string =>
  `https://picsum.photos/id/${id}/${w}/${h}`;

// generator produktu na podstawie obrazka
const makeProduct = (src: PicsumPhoto, i: number): Product => {
  const priceOld = 399.99;
  const price = 350.1;

  const flags: Flag[] = [];
  if (i % 2 === 0) flags.push("PROMOCJA");
  if (i % 3 === 0) flags.push("BESTSELLER");
  if (i % 5 === 0) flags.push("NOWOŚĆ");

  return {
    id: src.id,
    brand: "Zapato",
    title: `Półbuty skóra naturalna – model ${250 + i}`,
    img: crop(src.id),
    alt: src.author ? `Zdjęcie: ${src.author}` : "produkt",
    price,
    priceOld,
    lowest: 399.99,
    inStock: true,
    flags,
  };
};

/** ----- Komponent ----- **/

export const Products = () => {
  const [tab, setTab] = useState<Tab>("promotions");
  const [all, setAll] = useState<Product[]>([]);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);

  // pobranie obrazków – 24 szt, żeby wystarczyło na wszystkie zakładki
  useEffect(() => {
    (async () => {
      const res = await fetch("https://picsum.photos/v2/list?page=3&limit=24");
      const data = (await res.json()) as PicsumPhoto[];
      setAll(data.map((x, i) => makeProduct(x, i)));
    })();
  }, []);

  // dane dla zakładek (proste filtrowanie)
  const data = useMemo<Product[]>(() => {
    if (!all.length) return [];
    if (tab === "promotions")
      return all.filter((p) => p.flags.includes("PROMOCJA")).slice(0, 12);
    if (tab === "new")
      return all.filter((p) => p.flags.includes("NOWOŚĆ")).slice(0, 12);
    return all.filter((p) => p.flags.includes("BESTSELLER")).slice(0, 12);
  }, [tab, all]);

  // inicjalizacja / reinit slicka po zmianie zakładki lub danych
  useEffect(() => {
    if (!sliderRef.current || !data.length) return;

    // jeżeli nie masz @types/slick-carousel, możesz zostawić as any
    const $el = $(sliderRef.current) as any;

    if ($el.hasClass("slick-initialized")) $el.slick("unslick");

    $el.slick({
      accessibility: true,
      dots: true,
      appendDots: $(dotsRef.current as HTMLDivElement),
      arrows: true,
      infinite: false,
      speed: 400,
      variableWidth: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: false,
      adaptiveHeight: false,
      lazyLoad: "ondemand",
      prevArrow:
        '<button type="button" class="products__nav slick-prev" aria-label="Poprzednie produkty">‹</button>',
      nextArrow:
        '<button type="button" class="products__nav slick-next" aria-label="Następne produkty">›</button>',
    });

    return () => {
      if ($el.hasClass("slick-initialized")) $el.slick("unslick");
    };
  }, [data]);

  return (
    <section className="products" aria-labelledby="products-heading">
      <div className="container">
        <header className="products__header">
          <h2 id="products-heading" className="sr-only">
            Promocje Nowości Bestsellery
          </h2>

          <nav className="products__tabs" aria-label="Kategorie produktów">
            <button
              type="button"
              className={`products__tab ${
                tab === "promotions" ? "is-active" : ""
              }`}
              onClick={() => setTab("promotions")}
            >
              Promocje
            </button>
            <span className="products__separator">|</span>
            <button
              type="button"
              className={`products__tab ${tab === "new" ? "is-active" : ""}`}
              onClick={() => setTab("new")}
            >
              Nowości
            </button>
            <span className="products__separator">|</span>
            <button
              type="button"
              className={`products__tab ${
                tab === "bestsellers" ? "is-active" : ""
              }`}
              onClick={() => setTab("bestsellers")}
            >
              Bestsellery
            </button>
          </nav>

          <a
            className="products__all"
            href="#"
            aria-label="Zobacz wszystkie produkty"
          >
            Zobacz wszystkie
          </a>
        </header>

        <div className="products__box">
          <div className="products__slider" ref={sliderRef}>
            {data.map((p) => (
              <article key={p.id} className="product" aria-label={p.title}>
                <div className="product__figure">
                  <div className="product__flags" aria-hidden="true">
                    {p.flags.includes("BESTSELLER") && (
                      <span className="product__flag product__flag--purple">
                        BESTSELLER
                      </span>
                    )}
                    {p.flags.includes("NOWOŚĆ") && (
                      <span className="product__flag product__flag--green">
                        NOWOŚĆ
                      </span>
                    )}
                    {p.flags.includes("PROMOCJA") && (
                      <span className="product__flag product__flag--red">
                        PROMOCJA
                      </span>
                    )}
                  </div>
                  <img
                    className="product__img"
                    src={p.img}
                    alt={p.alt}
                    loading="lazy"
                  />
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
                  <span className="product__old">
                    {p.priceOld.toFixed(2)}zł
                  </span>
                </div>

                <p className="product__lowest">
                  Najniższa cena z 30 dni przed obniżką: {p.lowest.toFixed(2)}zł
                </p>
              </article>
            ))}
          </div>

          <div className="products__dots" ref={dotsRef} />
        </div>
      </div>
    </section>
  );
};
