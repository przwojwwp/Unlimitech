import { useEffect, useRef } from "react";
import { initNewsletter } from "./newsletter.jq";
import "./newsletter.less";

export const Newsletter: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const destroy = initNewsletter(rootRef.current);
    return destroy;
  }, []);

  return (
    <section
      className="newsletter"
      role="region"
      aria-labelledby="newsletter-heading"
    >
      <div className="container">
        <div className="row newsletter__box" ref={rootRef}>
          <header className="col-sm-7 newsletter__copy">
            <h2 id="newsletter-heading" className="newsletter__title">
              Chcesz otrzymać 5% zniżki na swoje zakupy?
            </h2>
            <p className="newsletter__desc">
              Zapisz się do naszego newslettera i jako pierwsza dowiedz się o
              nowościach, promocjach i ofertach specjalnych!
            </p>
            {/* {decorSrc && (
              <img
                className="newsletter__decor"
                src={decorSrc}
                alt=""
                loading="lazy"
                aria-hidden="true"
              />
            )} */}
          </header>

          <div className="col-sm-5 newsletter__form-col">
            <form className="newsletter__form" noValidate>
              <div className="form-group newsletter__input-wrap">
                <label className="sr-only">Twój adres e-mail</label>

                <input
                  className="form-control newsletter__input"
                  type="email"
                  placeholder="Twój adres email"
                  aria-describedby="newsletter-error"
                />

                <button
                  type="submit"
                  className="newsletter__submit"
                  aria-label="Zapisz się do newslettera"
                >
                  <span className="sr-only">Wyślij</span>
                  <svg
                    viewBox="0 0 24 24"
                    className="newsletter__submit-icon"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h12M12 5l7 7-7 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  id="newsletter-error"
                  className="newsletter__error alert alert-danger"
                  role="alert"
                  hidden
                >
                  <span
                    className="glyphicon glyphicon-warning-sign"
                    aria-hidden="true"
                  />
                  <span className="newsletter__error-text">
                    Proszę podać prawidłowy adres e-mail.
                  </span>
                  <span
                    className="newsletter__error-arrow"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="checkbox newsletter__consent">
                <label>
                  <input type="checkbox" />
                  Akceptuję{" "}
                  <a href="#" target="_blank" rel="noopener">
                    Regulamin
                  </a>{" "}
                  i{" "}
                  <a href="#" target="_blank" rel="noopener">
                    Politykę Prywatności
                  </a>
                  .
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
