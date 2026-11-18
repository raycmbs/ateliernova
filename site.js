(() => {
  // ───────────────────────────────────────────────────────────────
  //  FORMULAIRE — à relier à un service pour recevoir les messages.
  //  Colle ici l'adresse fournie par un service de formulaires
  //  (ex. Formspree : "https://formspree.io/f/xxxxxxx"). Tant que ce champ
  //  est vide, le formulaire fonctionne en mode démo : rien n'est envoyé.
  // ───────────────────────────────────────────────────────────────
  const FORM_ENDPOINT = "https://formspree.io/f/mppdrkjr";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Apparition au scroll
  const rise = $$("[data-rise]");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("has-rise");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    rise.forEach((el) => io.observe(el));
  }

  // ---------- Formulaire ----------
  const form = $("#contact-form");
  if (!form) return;
  const msgField = $("#msg-field");
  const msg = $("#f-message");
  const label = $("#submit-label");
  const err = $("#form-error");
  const done = $("#form-done");
  const val = (n) => (form.elements[n]?.value || "").trim();

  const sync = () => {
    const role = val("role") || $('input[name="role"]:checked').value;
    const action = $('input[name="action"]:checked').value;
    $$(".only").forEach((el) => { el.hidden = !el.classList.contains(`only--${role}`); });
    const ask = action === "demande";
    msgField.hidden = !ask;
    msg.required = ask;
    label.textContent = ask ? "Envoyer ma demande" : "Recevoir le catalogue";
    $('label[for="f-message"]').textContent = role === "artiste" ? "Parlez-nous de votre travail" : "Que cherchez-vous ?";
  };
  $$('input[name="role"], input[name="action"]').forEach((i) => i.addEventListener("change", sync));
  sync();

  // Depuis la fiche d'une œuvre : "Demander cette œuvre"
  document.addEventListener("atelier:ask", (e) => {
    const a = e.detail;
    $('input[name="role"][value="acheteur"]').checked = true;
    $('input[name="action"][value="demande"]').checked = true;
    sync();
    msg.value = `Bonjour, je souhaite en savoir plus sur « ${a.title} » de ${a.artist} (${a.medium}, ${a.size}).`;
  });

  const showErr = (t, el) => { err.textContent = t; err.hidden = false; el?.focus(); };

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    err.hidden = true;
    const ask = $('input[name="action"]:checked').value === "demande";
    const email = $("#f-email");
    if (!val("name")) return showErr("Indiquez votre nom.", $("#f-name"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) return showErr("Indiquez une adresse e-mail valide.", email);
    if (ask && !msg.value.trim()) return showErr("Écrivez-nous quelques mots.", msg);
    if (!form.elements.consent.checked) return showErr("Merci de cocher la case d'accord pour continuer.", form.elements.consent);

    const data = new FormData(form);
    // Les champs de l'autre profil ne sont pas envoyés.
    const other = val("role") === "artiste" ? ".only--acheteur" : ".only--artiste";
    $$("input, select, textarea", $(other)).forEach((el) => data.delete(el.name));
    const btn = $(".btn", form);
    btn.disabled = true;

    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        console.warn("Atelier Nova : FORM_ENDPOINT est vide (site.js), le formulaire n'envoie rien.");
      }
    } catch (e) {
      btn.disabled = false;
      return showErr("L'envoi a échoué. Réessayez dans un instant.", btn);
    }

    const first = val("name").split(/\s+/)[0];
    $("#done-title").textContent = `Merci ${first} !`;
    $("#done-text").textContent = ask
      ? "Votre demande est bien partie. Nous revenons vers vous personnellement très vite."
      : "Le catalogue arrive dans votre boîte e-mail. Pensez à vérifier vos courriers indésirables.";
    $("#done-demo").hidden = !!FORM_ENDPOINT;
    $$(":scope > *:not(.form__done)", form).forEach((el) => { el.hidden = true; });
    done.hidden = false;
    done.focus();
  });
})();
