import type { Tab } from "../types";

type Props = {
  active: Tab;
  onChange: (t: Tab) => void;
};

export const ProductsTabs = ({ active, onChange }: Props) => {
  return (
    <nav className="products__tabs" aria-label="Kategorie produktów">
      <button
        type="button"
        className={`products__tab ${
          active === "promotions" ? "is-active" : ""
        }`}
        onClick={() => onChange("promotions")}
      >
        Promocje
      </button>

      <span className="products__separator">|</span>

      <button
        type="button"
        className={`products__tab ${active === "new" ? "is-active" : ""}`}
        onClick={() => onChange("new")}
      >
        Nowości
      </button>

      <span className="products__separator">|</span>

      <button
        type="button"
        className={`products__tab ${
          active === "bestsellers" ? "is-active" : ""
        }`}
        onClick={() => onChange("bestsellers")}
      >
        Bestsellery
      </button>
    </nav>
  );
};
