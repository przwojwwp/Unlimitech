import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "slick-carousel";
import "./hero.less";

const crop = (url, w = 1400, h = 520) => `${url}?w=${w}&h=${h}&fit=crop`;

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const sliderRef = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://picsum.photos/v2/list?page=2&limit=3");
      const data = await res.json();
      setSlides(
        data.map((s) => ({
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

    const $el = $(sliderRef.current);
    $el.slick({
      accessibility: true,
      dots: true,
      appendDots: $(dotsRef.current),
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      adaptiveHeight: false,
      lazyLoad: "ondemand",
      prevArrow:
        '<button type="button" class="hero__nav slick-prev" aria-label="Poprzedni slajd">‹</button>',
      nextArrow:
        '<button type="button" class="hero__nav slick-next" aria-label="Następny slajd">›</button>',
    });

    return () => {
      if ($el.hasClass("slick-initialized")) $el.slick("unslick");
    };
  }, [slides]);

  return (
    <section
      className="hero"
      aria-label="Promowane kolekcje"
      aria-roledescription="carousel"
    >
      <div className="container">
        <div className="hero__box" aria-live="polite">
          <div className="hero__slider" ref={sliderRef}>
            {slides.map((s) => (
              <div className="hero__slide" key={s.id}>
                <img
                  className="hero__img"
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                />

                <div className="hero__content">
                  <h1 className="hero__title">{s.title}</h1>
                  <p className="hero__desc">{s.desc}</p>
                </div>

                <a className="hero__cta" href={s.cta}>
                  Zobacz więcej
                </a>
              </div>
            ))}
          </div>
          <div className="hero__dots" ref={dotsRef} />
        </div>
      </div>
    </section>
  );
}
