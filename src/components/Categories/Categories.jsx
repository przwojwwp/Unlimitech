import { useEffect, useState } from "react";
import "./categories.less";

const crop = (id, w = 600, h = 600) =>
  `https://picsum.photos/id/${id}/${w}/${h}`;

export const Categories = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://picsum.photos/v2/list?limit=8");
      const data = await res.json();

      const labels = [
        "Baleriny",
        "Jazzówki",
        "Mokasyny",
        "Czółenka",
        "Sandały",
        "Kozaki",
        "Półbuty",
        "Wyprzedaż",
      ];

      setItems(
        data.slice(0, 8).map((x, i) => ({
          id: x.id,
          title: labels[i] ?? "Kategoria",
          img: crop(x.id),
          alt: x.author ? `${labels[i]} - zdjęcie: ${x.author}` : labels[i],
          href: "#",
        }))
      );
    })();
  }, []);

  const chunkWithMods = (arr, size = 2) =>
    arr.reduce((acc, cur, i) => {
      const mod =
        i % (size * 2) === 0 || i % (size * 2) === 3 ? "big" : "small";
      const item = { ...cur, __mod: mod };

      if (i % size === 0) acc.push([item]);
      else acc[acc.length - 1].push(item);

      return acc;
    }, []);
  return (
    <section className="categories" aria-labelledby="categories-heading">
      <div className="container">
        <h2 id="categories-heading" className="categories__heading sr-only">
          Popularne kategorie
        </h2>

        <div className="row categories__row">
          {chunkWithMods(items, 2).map((pair, colIdx) => (
            <div key={colIdx} className="categories__col col-xs-6 col-lg-3">
              {pair.map((it) => (
                <a
                  key={it.id}
                  className={`categories__item categories__item--${it.__mod}`}
                  href={it.href}
                  aria-label={`Przejdź do: ${it.title}`}
                >
                  <img
                    src={it.img}
                    alt={it.alt || it.title}
                    loading="lazy"
                    className="categories__img"
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
