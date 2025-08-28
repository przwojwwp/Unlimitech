import { useRef, useState, useId, FormEvent } from "react";
import "./newsletter.less";

type Props = {
  onSubmit?: (email: string) => void | Promise<void>;
  decorSrc?: string; // opcjonalna grafika dekoracyjna po lewej
};

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const Newsletter: React.FC<Props> = ({ onSubmit, decorSrc }) => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailId = useId();
  const consentId = useId();

  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError("Proszę podać prawidłowy adres e-mail.");
      emailRef.current?.focus();
      return;
    }
    if (!consent) {
      setError("Zaznacz zgodę na przetwarzanie danych.");
      consentRef.current?.focus();
      return;
    }

    await onSubmit?.(email);
    setEmail("");
    setConsent(false);
  };

  return (
    <section
      className="newsletter"
      role="region"
      aria-labelledby="newsletter-heading"
    >
      <div className="container">
        <div className="row newsletter__box">
          <header className="col-sm-7 newsletter__copy">
            <h2 id="newsletter-heading" className="newsletter__title">
              Chcesz otrzymać 5% zniżki na swoje zakupy?
            </h2>
            <p className="newsletter__desc">
              Zapisz się do naszego newslettera i jako pierwsza dowiedz się o
              nowościach, promocjach i ofertach specjalnych!
            </p>

            {decorSrc && (
              <img
                className="newsletter__decor"
                src={decorSrc}
                alt=""
                loading="lazy"
                aria-hidden="true"
              />
            )}
          </header>

          <div className="col-sm-5 newsletter__form-col">
            <form
              className="newsletter__form"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="form-group newsletter__input-wrap">
                <label className="sr-only" htmlFor={emailId}>
                  Twój adres e-mail
                </label>

                <input
                  id={emailId}
                  ref={emailRef}
                  className="form-control newsletter__input"
                  type="email"
                  placeholder="Twój adres email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  hidden={!error}
                >
                  <span
                    className="glyphicon glyphicon-warning-sign"
                    aria-hidden="true"
                  />
                  <span className="newsletter__error-text">{error}</span>
                  <span
                    className="newsletter__error-arrow"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="checkbox newsletter__consent">
                <label htmlFor={consentId}>
                  <input
                    id={consentId}
                    ref={consentRef}
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
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
