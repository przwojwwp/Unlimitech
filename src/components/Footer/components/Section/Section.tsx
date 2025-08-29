import React from "react";
import type { FooterSection } from "../../types";
import Phone from "@assets/icons/phone.svg?react";
import Write from "@assets/icons/write.svg?react";

export const FooterCol: React.FC<{ section: FooterSection }> = ({
  section,
}) => {
  if (section.kind === "contact") {
    return (
      <address
        className="footer__contact"
        aria-labelledby={`${section.id}-title`}
      >
        <h3 id={`${section.id}-title`} className="footer__heading">
          {section.title}
        </h3>
        <ul className="footer__contact-list">
          <li>
            <span className="footer__ico" aria-hidden="true">
              <Phone className="footer__img" />
            </span>
            <a href={section.tel.href}>{section.tel.label}</a>
          </li>
          <li>
            <span className="footer__ico" aria-hidden="true">
              <Write className="footer__img" />
            </span>
            <a href={section.email.href}>{section.email.label}</a>
          </li>
          {section.note && (
            <li className="footer__contact-note">{section.note}</li>
          )}
        </ul>
      </address>
    );
  }

  const collapsible = section.collapsible !== false;
  return (
    <div className="footer__col">
      <h3 className="footer__heading">
        {collapsible ? (
          <button
            type="button"
            className="footer__toggle"
            aria-controls={section.id}
            aria-expanded="true"
          >
            {section.title}
            <span className="footer__chevron" aria-hidden="true" />
          </button>
        ) : (
          <span>{section.title}</span>
        )}
      </h3>

      <ul id={section.id} className="footer__list">
        {section.items.map((it) => (
          <li key={it.href + it.label} className="footer__item">
            <a href={it.href}>{it.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
