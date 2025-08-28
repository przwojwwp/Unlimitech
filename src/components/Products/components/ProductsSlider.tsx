import { useEffect, useRef } from "react";
import $ from "jquery";
import "slick-carousel";
import type { Product } from "../types";
import { ProductCard } from "./ProductCard";
import "./productsSlider.less";
import ArrowBlurUrl from "@assets/icons/arrow.svg";
import ArrowBlur from "@assets/icons/arrow.svg?react";

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
      arrows: false,
      infinite: false,
      speed: 400,
      variableWidth: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: false,
      adaptiveHeight: false,
      lazyLoad: "ondemand",
    });

    const firstImg =
      sliderRef.current.querySelector<HTMLImageElement>(".product__img");
    if (firstImg) {
      const h = firstImg.clientHeight || firstImg.naturalHeight || 456;
      sliderRef.current.style.setProperty("--product-img-h", `${h}px`);
    }

    return () => {
      if ($el.hasClass("slick-initialized")) $el.slick("unslick");
    };
  }, [items]);

  const goPrev = () => {
    if (sliderRef.current) ($(sliderRef.current) as any).slick("slickPrev");
  };
  const goNext = () => {
    if (sliderRef.current) ($(sliderRef.current) as any).slick("slickNext");
  };

  return (
    <div className="products__box">
      <div className="products__arrows" aria-hidden="true">
        <button
          type="button"
          className="products__nav products__nav--prev"
          aria-label="Poprzednie produkty"
          onClick={goPrev}
        >
          <ArrowBlur />
        </button>
        <button
          type="button"
          className="products__nav products__nav--next"
          aria-label="Następne produkty"
          onClick={goNext}
        >
          <ArrowBlur />
        </button>
      </div>

      <div className="products__slider" ref={sliderRef}>
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="products__dots" ref={dotsRef} />
    </div>
  );
};
