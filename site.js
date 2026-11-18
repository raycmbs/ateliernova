// ───────────────────────────────────────────────────────────────
//  FORM — to be connected to a service to receive messages.
//  Paste here the address provided by a form service
//  (e.g., Formspree: "https://formspree.io/f/xxxxxxx"). As long as this field
//  is empty, the form works in demo mode: nothing is sent.
// ───────────────────────────────────────────────────────────────
const FORM_ENDPOINT = "https://formspree.io/f/mppdrkjr";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Scroll reveal
const rise = $$("[data-rise]");
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("has-rise");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  rise.forEach((el) => io.observe(el));
}

// ---------- Form ----------
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
  label.textContent = ask ? "Send my inquiry" : "Get the catalog";
  $('label[for="f-message"]').textContent = role === "artiste" ? "Tell us about your work" : "What are you looking for?";
};
$$('input[name="role"], input[name="action"]').forEach((i) => i.addEventListener("change", sync));
sync();

// From an artwork view: "Inquire about this artwork"
document.addEventListener("atelier:ask", (e) => {
  const a = e.detail;
  $('input[name="role"][value="acheteur"]').checked = true;
  $('input[name="action"][value="demande"]').checked = true;
  sync();
  msg.value = `Hello, I would like to know more about « ${a.title} » by ${a.artist} (${a.medium}, ${a.size}).`;
});

const showErr = (t, el) => { err.textContent = t; err.hidden = false; el?.focus(); };

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  err.hidden = true;
  const ask = $('input[name="action"]:checked').value === "demande";
  const email = $("#f-email");
  if (!val("name")) return showErr("Please enter your name.", $("#f-name"));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) return showErr("Please enter a valid email address.", email);
  if (ask && !msg.value.trim()) return showErr("Please write a few words to us.", msg);
  if (!form.elements.consent.checked) return showErr("Please check the agreement box to continue.", form.elements.consent);

  const data = new FormData(form);
  // Fields from the other profile are not sent.
  const other = val("role") === "artiste" ? ".only--acheteur" : ".only--artiste";
  $$("input, select, textarea", $(other)).forEach((el) => data.delete(el.name));
  const btn = $(".btn", form);
  btn.disabled = true;

  try {
    if (FORM_ENDPOINT) {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
    } else {
      console.warn("Atelier Nova: FORM_ENDPOINT is empty (site.js), the form is not sending anything.");
    }
  } catch (e) {
    btn.disabled = false;
    return showErr("Sending failed. Please try again in a moment.", btn);
  }

  const first = val("name").split(/\s+/)[0];
  $("#done-title").textContent = `Thank you ${first}!`;
  $("#done-text").textContent = ask
    ? "Your inquiry has been sent successfully. We will get back to you personally very soon."
    : "The catalog is on its way to your inbox. Remember to check your spam folder.";
  $("#done-demo").hidden = !!FORM_ENDPOINT;
  $$(":scope > *:not(.form__done)", form).forEach((el) => { el.hidden = true; });
  done.hidden = false;
  done.focus();
});
})();
