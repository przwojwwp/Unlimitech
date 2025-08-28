import type { PicsumPhoto, Product, Flag } from "./types";

export const crop = (id: string | number, w = 520, h = 640): string =>
  `https://picsum.photos/id/${id}/${w}/${h}`;

export const makeProduct = (src: PicsumPhoto, i: number): Product => {
  const priceOld = 399.99;
  const price = 350.1;

  let flags: Flag[];
  flags = i % 2 === 0 ? ["NOWOŚĆ", "BESTSELLER"] : ["PROMOCJA"];

  console.log(i % 2);

  return {
    id: src.id,
    brand: "Zapato",
    title: `Półbuty skóra naturalna - model ${250 + i}`,
    img: crop(src.id),
    alt: src.author ? `Zdjęcie: ${src.author}` : "produkt",
    price,
    priceOld,
    lowest: 399.99,
    inStock: true,
    flags,
  };
};
