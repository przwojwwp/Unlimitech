import $ from "jquery";

export function initNewsletter(root: HTMLElement) {
  const $root = $(root);
  const $form = $root.find(".newsletter__form");
  let errorTimeout: number | null = null;
  if (!$form.length) return () => {};

  const $email = $root.find(".newsletter__input");
  const $consent = $root.find(".newsletter__consent input[type=checkbox]");
  const $error = $root.find(".newsletter__error");

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const showError = (msg: string) => {
    $error
      .find(".newsletter__error-text")
      .text(msg || "Proszę podać prawidłowy adres e-mail.");
    $error.prop("hidden", false);

    if (errorTimeout) clearTimeout(errorTimeout);
    errorTimeout = window.setTimeout(() => {
      hideError();
      errorTimeout = null;
    }, 3000);
  };
  const hideError = () => $error.prop("hidden", true);

  $email.on("input.nl blur.nl", () => {
    const val = String($email.val() || "");
    if (val && isValidEmail(val)) hideError();
  });

  $form.on("submit.nl", (e) => {
    e.preventDefault();
    hideError();

    const email = String($email.val() || "");
    const consentChecked = ($consent as any).is(":checked");

    if (!isValidEmail(email)) {
      showError("Proszę podać prawidłowy adres e-mail.");
      ($email[0] as HTMLInputElement)?.focus();
      return;
    }
    if (!consentChecked) {
      showError("Zaznacz zgodę na przetwarzanie danych.");
      ($consent[0] as HTMLInputElement)?.focus();
      return;
    }

    ($form[0] as HTMLFormElement).reset();
    hideError();

    const $ok = $(
      `<div
        class="alert alert-success"
        role="status"
        style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          padding: 16px 24px;
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
          text-align: center;
        "
      >
        Dziękujemy! Sprawdź swoją skrzynkę.
      </div>`
    );

    $ok
      .insertAfter($form)
      .delay(3000)
      .fadeOut(300, function () {
        $(this).remove();
      });
  });

  return () => {
    $email.off(".nl");
    $form.off(".nl");
  };
}
