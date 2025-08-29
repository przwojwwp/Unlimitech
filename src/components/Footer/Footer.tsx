import React, { useEffect, useRef } from "react";
import "./footer.less";
import { initFooter } from "./footer.jq";
import { FooterCol } from "./components/Section/Section";
import { contactSection, navSections } from "./components/Section/section.data";
import { PAYMENTS } from "./payments.data";
import { Socials } from "./components/Socials/Socials";

export const Footer: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    return initFooter(rootRef.current);
  }, []);

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__box row" ref={rootRef}>
          <nav
            className="footer__nav col-sm-8 col-md-9"
            aria-label="Linki w stopce"
          >
            <div className="row">
              {navSections.map((s) => (
                <div key={s.id} className={s.colClass ?? "col-sm-3"}>
                  <FooterCol section={s} />
                </div>
              ))}
            </div>
          </nav>

          <div className={contactSection.colClass ?? "col-sm-4 col-md-3"}>
            <FooterCol section={contactSection} />
          </div>

          <div className="col-xs-12">
            <hr className="footer__divider" />
          </div>

          <div
            className="footer__payments col-sm-8 col-md-9"
            aria-label="Dostawa i płatność"
          >
            <h4 className="footer__subheading">Dostawa i płatność</h4>
            <ul className="footer__badges">
              {PAYMENTS.map(({ key, label, Icon }) => (
                <li key={key} className="footer__badge">
                  <Icon
                    className="footer__badge-ico"
                    aria-hidden="true"
                    focusable="false"
                  />
                  <span className="sr-only">{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <Socials />
        </div>
      </div>
    </footer>
  );
};
