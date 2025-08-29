import $ from "jquery";

export function initFooter(root: HTMLElement) {
  const $root = $(root);
  const $toggles = $root.find<HTMLButtonElement>(".footer__toggle");

  const mql = window.matchMedia("(max-width: 767px)");

  const applyMode = () => {
    if (mql.matches) {
      $toggles.attr("aria-expanded", "false");
    } else {
      $toggles.attr("aria-expanded", "true");
    }
  };

  applyMode();
  const handler = () => applyMode();
  mql.addEventListener
    ? mql.addEventListener("change", handler)
    : mql.addListener(handler);

  const clickHandler = (e: JQuery.TriggeredEvent) => {
    if (!mql.matches) return;
    const $btn = $(e.currentTarget as HTMLButtonElement);
    const expanded = $btn.attr("aria-expanded") === "true";
    $btn.attr("aria-expanded", expanded ? "false" : "true");
  };

  $root.on("click.footer", ".footer__toggle", clickHandler);

  return () => {
    mql.removeEventListener
      ? mql.removeEventListener("change", handler)
      : mql.removeListener(handler);
    $root.off("click.footer");
  };
}
