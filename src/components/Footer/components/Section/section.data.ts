import type { FooterLinksSection, FooterContactSection } from "../../types";

export const navSections: FooterLinksSection[] = [
  {
    kind: "links",
    id: "f-about",
    title: "O nas",
    items: [
      { label: "Poznajmy się", href: "#" },
      { label: "Skontaktuj się z nami", href: "#" },
      { label: "Dołącz do nas", href: "#" },
    ],
    colClass: "col-sm-3",
  },

  {
    kind: "links",
    id: "f-info",
    title: "Informacje",
    items: [
      { label: "Regulamin", href: "#" },
      { label: "Polityka prywatności", href: "#" },
      { label: "Zasady gwarancji", href: "#" },
    ],
    colClass: "col-sm-3",
  },

  {
    kind: "links",
    id: "f-account",
    title: "Twoje konto",
    items: [
      { label: "Twoje konto", href: "#" },
      { label: "Twoje zamówienia", href: "#" },
      { label: "Logowanie", href: "#" },
      { label: "Rejestracja", href: "#" },
    ],
    colClass: "col-sm-3",
  },

  {
    kind: "links",
    id: "f-service",
    title: "Obsługa klienta",
    items: [
      { label: "Dostawa i płatność", href: "#" },
      { label: "Wymiana", href: "#" },
      { label: "Zwrot", href: "#" },
      { label: "Reklamacje", href: "#" },
      { label: "FAQ", href: "#" },
    ],
    colClass: "col-sm-3",
  },
];

export const contactSection: FooterContactSection = {
  kind: "contact",
  id: "f-contact",
  title: "Skontaktuj się z nami",
  tel: { label: "(+48) 000 000 000", href: "tel:+48000000000" },
  email: { label: "sklep@kontakt.com.pl", href: "mailto:sklep@kontakt.com.pl" },
  note: "Jesteśmy do Twojej dyspozycji od poniedziałku do piątku w godzinach 8:00 - 16:00",
  colClass: "col-sm-4 col-md-3",
  collapsible: false,
};
