import $ from "jquery";

export function initFooter(root: HTMLElement) {
  const $root = $(root);
  const $toggles = $root.find<HTMLButtonElement>(".footer__toggle");
  const mql = window.matchMedia("(max-width: 767px)");


  const getPanel = (id?: string | null) => {
    if (!id) return $();
    const safe = (window as any).CSS?.escape
      ? (window as any).CSS.escape(id)
      : id;
    return $root.find(`#${safe}`);
  };

  const setPanel = ($btn: JQuery<HTMLButtonElement>, expanded: boolean) => {
    const id = $btn.attr("aria-controls");
    const $panel = getPanel(id);
    $btn.attr("aria-expanded", expanded ? "true" : "false");
    if (expanded) $panel.removeAttr("hidden");
    else $panel.attr("hidden", "hidden");
  };

  const applyMode = () => {
    const expanded = !mql.matches;
    $toggles.each((_, el) => setPanel($(el), expanded));
  };

  applyMode();

  const handler = () => applyMode();
  if (mql.addEventListener) mql.addEventListener("change", handler);
  else mql.addListener(handler);

  const clickHandler = (e: JQuery.TriggeredEvent) => {
    if (!mql.matches) return;
    const $btn = $(e.currentTarget as HTMLButtonElement);
    const expanded = $btn.attr("aria-expanded") === "true";
    setPanel($btn, !expanded);
  };

  $root.on("click.footer", ".footer__toggle", clickHandler);

  return () => {
    if (mql.removeEventListener) mql.removeEventListener("change", handler);
    else mql.removeListener(handler);
    $root.off("click.footer");
  };
}
