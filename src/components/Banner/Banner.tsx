import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "slick-carousel";
import "./banner.less";
import ArrowBlur from "@assets/icons/arrow.svg?react";

type PicsumPhoto = {
  id: number | string;
  author?: string;
};

type Slide = {
  id: number | string;
  title: string;
  desc: string;
  img: string;
  alt: string;
  cta: string;
};

const crop = (url: string, w = 1400, h = 520): string =>
  `${url}?w=${w}&h=${h}&fit=crop`;

export const Banner: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://picsum.photos/v2/list?page=2&limit=3");
      const data = (await res.json()) as PicsumPhoto[];

      setSlides(
        data.map<Slide>((s) => ({
          id: s.id,
          title: "Nowa kolekcja",
          desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab.",
          img: crop(`https://picsum.photos/id/${s.id}/1400/520`),
          alt: s.author || "Slajd promocyjny",
          cta: "#",
        }))
      );
    })();
  }, []);

  useEffect(() => {
    if (!slides.length || !sliderRef.current) return;

    const $el = $(sliderRef.current) as JQuery<HTMLElement>;

    const settings: JQuerySlickOptions = {
      accessibility: true,
      dots: true,
      appendDots: $(dotsRef.current as HTMLDivElement),
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      adaptiveHeight: false,
      lazyLoad: "ondemand",
    };

    $el.slick(settings);

    return () => {
      if ($el.hasClass("slick-initialized")) $el.slick("unslick");
    };
  }, [slides]);

  const goPrev = (): void => {
    if (!sliderRef.current) return;
    ($(sliderRef.current) as JQuery<HTMLElement>).slick("slickPrev");
  };

  const goNext = (): void => {
    if (!sliderRef.current) return;
    ($(sliderRef.current) as JQuery<HTMLElement>).slick("slickNext");
  };

  return (
    <section
      className="banner"
      aria-label="Promowane kolekcje"
      aria-roledescription="carousel"
    >
      <div className="container">
        <div className="banner__box" aria-live="polite">
          <div className="banner__arrows" aria-hidden="true">
            <button
              type="button"
              className="banner__nav banner__nav--prev"
              aria-label="Poprzedni slajd"
              onClick={goPrev}
            >
              <ArrowBlur />
            </button>
            <button
              type="button"
              className="banner__nav banner__nav--next"
              aria-label="Następny slajd"
              onClick={goNext}
            >
              <ArrowBlur />
            </button>
          </div>

          <div className="banner__slider" ref={sliderRef}>
            {slides.map((s) => (
              <div className="banner__slide" key={s.id}>
                <img
                  className="banner__img"
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                />
                <div className="banner__content">
                  <h1 className="banner__title">{s.title}</h1>
                  <p className="banner__desc">{s.desc}</p>
                </div>
                <a className="banner__cta" href={s.cta}>
                  Zobacz więcej
                </a>
              </div>
            ))}
          </div>

          <div className="banner__dots" ref={dotsRef} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
