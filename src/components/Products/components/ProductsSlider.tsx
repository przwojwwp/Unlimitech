import { useEffect, useRef } from "react";
import $ from "jquery";
import "slick-carousel";
import type { Product } from "../types";
import { ProductCard } from "./ProductCard";

type Props = { items: Product[] };

export const ProductsSlider = ({ items }: Props) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sliderRef.current || !items.length) return;

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
  }, [items]);

  return (
    <div className="products__box">
      <div className="products__slider" ref={sliderRef}>
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="products__dots" ref={dotsRef} />
    </div>
  );
};
