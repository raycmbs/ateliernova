// ───────────────────────────────────────────────────────────────
//  Gallery tour: a camera moves through 5 rooms in 3D CSS, driven by scroll.
(() => {
  const tour = document.getElementById("galerie");
  const world = document.getElementById("tour-world");
  const viewport = document.getElementById("tour-viewport");
  const beatsEl = document.getElementById("tour-beats");
  const sticky = tour.querySelector(".tour__sticky");
  const progress = tour.querySelector(".tour__progress");
  const { ROOMS, ARTWORKS } = window.ATELIER;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  // ---------- Geometry (px) ----------
  const D = 1400;   // room depth
  const W = 1000;   // width
  const FY = 220;   // floor (positive y = downwards)
  const CY = 300;   // ceiling
  const WH = FY + CY;
  const DW = 260;   // doorway width
  const DH = 380;   // doorway height
  const ART_Y = -45; // center of artworks
  const ART_W = 230;
  const BACK_X = 300; // center of back artworks from axis
  const N = ROOMS.length;

  // Camera positions (z): outside, center of each room, in front of final wall.
  const STOPS = [900];
  for (let r = 0; r < N; r++) STOPS.push(-r * D - (r === N - 1 ? 0.3 : 0.46) * D);
  STOPS.push(-N * D + 800);
  const SEG = STOPS.length - 1;

  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- Construction ----------
  const face = (cls, w, h, tf, inner = "") =>
    `<div class="face ${cls}" style="width:${w}px;height:${h}px;transform:${tf}">${inner}</div>`;

  const artSize = (a) => { const w = ART_W / Math.sqrt(a.ratio); return [w, w * a.ratio]; };

  // cx = horizontal center of artwork in face, in px
  const artHTML = (a, i, cx) => {
    const [w, h] = artSize(a);
    const top = ART_Y + CY - h / 2;
    return `<button class="art" type="button" data-i="${i}" style="left:${(cx - w / 2).toFixed(1)}px;top:${top.toFixed(1)}px;width:${w.toFixed(1)}px;height:${h.toFixed(1)}px" aria-label="${esc(a.title)}, ${esc(a.artist)}. View artwork">
      <span class="art__glow"></span>
      <span class="art__mat"><img src="${a.image}" alt="" draggable="false" decoding="async"></span>
      <span class="art__plaque"><b>${esc(a.title)}</b>${esc(a.artist)}</span>
    </button>`;
  };

  const roomHTML = (r) => {
    const mine = ARTWORKS.map((a, i) => [a, i]).filter(([a]) => a.room === r + 1);
    const [aL, aR, aBL, aBR] = mine;
    const last = r === N - 1;
    const panelW = (W - DW) / 2;
    let h = "";
    h += face("floor", W, D, `translate3d(${-W / 2}px,${FY}px,${-D}px) rotateX(90deg)`);
    h += face("ceiling", W, D, `translate3d(${-W / 2}px,${-CY}px,0) rotateX(-90deg)`, `<i class="lamp"></i>`);
    h += face("wall wall--l", D, WH, `translate3d(${-W / 2}px,${-CY}px,0) rotateY(90deg)`, aL ? artHTML(aL[0], aL[1], 0.56 * D) : "");
    h += face("wall wall--r", D, WH, `translate3d(${W / 2}px,${-CY}px,${-D}px) rotateY(-90deg)`, aR ? artHTML(aR[0], aR[1], 0.64 * D) : "");
    if (last) {
      h += face("wall wall--end", W, WH, `translate3d(${-W / 2}px,${-CY}px,${-D}px)`,
        `<div class="endwall"><img src="assets/logo-mark.png" alt="" width="362" height="343"><span>ATELIER NOVA</span><em lang="en">Connecting raw contemporary art with a new generation of collectors</em></div>`);
    } else {
      h += face("wall wall--bl", panelW, WH, `translate3d(${-W / 2}px,${-CY}px,${-D}px)`, aBL ? artHTML(aBL[0], aBL[1], BACK_X - DW / 2) : "");
      h += face("wall wall--br", panelW, WH, `translate3d(${DW / 2}px,${-CY}px,${-D}px)`, aBR ? artHTML(aBR[0], aBR[1], panelW - (BACK_X - DW / 2)) : "");
      h += face("wall wall--lintel", DW, CY + (FY - DH), `translate3d(${-DW / 2}px,${-CY}px,${-D}px)`);
    }
    return `<div class="room" data-r="${r}" style="transform:translate3d(0,0,${-r * D}px)">${h}</div>`;
  };

  // Entrance facade + outdoor floor
  const facade = () => {
    const pw = 700;
    return `<div class="outside">
      ${face("wall wall--facade", pw, WH + 800, `translate3d(${-DW / 2 - pw}px,${-CY - 800}px,0)`,
        `<div class="sign"><img src="assets/logo-mark.png" alt="" width="362" height="343"><span>ATELIER NOVA</span></div>`)}
      ${face("wall wall--facade", pw, WH + 800, `translate3d(${DW / 2}px,${-CY - 800}px,0)`,
        `<div class="sign sign--r"><em lang="en">Connecting raw contemporary art with a new generation of collectors</em></div>`)}
      ${face("wall wall--facade", DW, CY + (FY - DH) + 800, `translate3d(${-DW / 2}px,${-CY - 800}px,0)`)}
    </div>`;
  };

  world.innerHTML = facade() + ROOMS.map((_, r) => roomHTML(r)).join("");
  const roomEls = [...world.querySelectorAll(".room")];

  // ---------- Captions (HUD) ----------
  const pad = (n) => String(n).padStart(2, "0");
  let beatsHTML = `<li class="beat beat--intro" data-at="0">
      <p class="beat__eyebrow">Atelier Nova · 100% digital gallery</p>
      <h3 class="beat__title beat__title--xl">Step into<br>the gallery</h3>
      <p class="beat__sub">Scroll down to move forward, room by room.</p>
      <span class="beat__cue" aria-hidden="true"></span></li>`;
  ROOMS.forEach((room, r) => {
    beatsHTML += `<li class="beat beat--room" data-at="${r + 1}">
      <p class="beat__eyebrow">Room ${pad(r + 1)} / ${pad(N)}</p>
      <h3 class="beat__title">${esc(room.name)}</h3>
      <p class="beat__sub">${esc(room.line)}</p></li>`;
  });
  beatsHTML += `<li class="beat beat--end" data-at="${SEG}">
      <p class="beat__eyebrow">End of tour</p>
      <h3 class="beat__title">Did an artwork catch your eye?</h3>
      <p class="beat__sub">Inquire about it, or get the complete catalog by email.</p>
      <a class="beat__cta" href="#contact">Get the catalog
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a></li>`;
  beatsEl.innerHTML = beatsHTML;
  const beats = [...beatsEl.querySelectorAll(".beat")];

  // ---------- Camera ----------
  let P = 900;
  const resize = () => {
    const w = sticky.clientWidth;
    const h = sticky.clientHeight;
    P = Math.round(clamp(Math.min(w * 0.8, h * 1.15), 300, 1000));
    viewport.style.perspective = `${P}px`;
    needs = true;
  };

  const ease = (t) => {
    const k = Math.floor(clamp(t, 0, SEG - 1e-6));
    const u = t - k;
    return k + u - (Math.sin(2 * Math.PI * u) / (2 * Math.PI)) * 0.85;
  };
  const camZ = (t) => {
    const e = reduced.matches ? Math.round(t) : ease(t);
    const k = Math.min(Math.floor(e), SEG - 1);
    return STOPS[k] + (STOPS[k + 1] - STOPS[k]) * (e - k);
  };

  const fromScroll = () => {
    const r = tour.getBoundingClientRect();
    const run = r.height - sticky.clientHeight;
    return clamp(-r.top / run, 0, 1) * SEG;
  };

  let target = fromScroll();
  let current = target;
  let needs = true;
  let raf = 0;
  let last = 0;
  const LAG = 70;

  const render = (t) => {
    const z = camZ(t);
    const sway = reduced.matches ? 0 : Math.sin(t * 2.3) * 12;
    const bob = reduced.matches ? 0 : Math.sin(t * 5.1) * 3;
    world.style.transform = `translate3d(${-sway}px,${-bob}px,${P - z}px)`;

    roomEls.forEach((el, r) => {
      const center = -r * D - D / 2;
      const dist = Math.abs(z - center);
      el.style.setProperty("--fog", clamp((dist - 600) / 3000, 0, 0.88).toFixed(3));
      const show = -(r + 1) * D < z + 900 && -r * D > z - 3200;
      if (el.hidden === show) el.hidden = !show;
    });

    let top = null, topO = 0;
    beats.forEach((b) => {
      const at = Number(b.dataset.at);
      const d = Math.abs(t - at);
      const o = reduced.matches ? (d < 0.5 ? 1 : 0) : 1 - smooth(0.16, 0.42, d);
      const dir = t < at ? 1 : -1;
      b.style.setProperty("--o", o.toFixed(3));
      b.style.setProperty("--y", `${(dir * (1 - o) * 16).toFixed(1)}px`);
      b.classList.toggle("is-on", o > 0.6);
      if (o > topO) { topO = o; top = b; }
    });
    progress.style.setProperty("--p", (t / SEG).toFixed(4));
  };

  const tick = (now) => {
    raf = 0;
    const dt = Math.min(now - (last || now - 16), 64);
    last = now;
    const diff = target - current;
    current = reduced.matches || Math.abs(diff) < 0.0008 ? target : current + diff * (1 - Math.exp(-dt / LAG));
    render(current);
    if (current !== target) schedule();
    else { last = 0; if (needs) { needs = false; schedule(); } }
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(tick); };

  addEventListener("scroll", () => { target = fromScroll(); schedule(); }, { passive: true });
  addEventListener("resize", () => { resize(); target = fromScroll(); schedule(); });
  reduced.addEventListener?.("change", () => { needs = true; schedule(); });

  // Go to a room (keyboard, links)
  const scrollToStop = (k) => {
    const r = tour.getBoundingClientRect();
    const run = r.height - sticky.clientHeight;
    scrollTo({ top: scrollY + r.top + (k / SEG) * run, behavior: reduced.matches ? "auto" : "smooth" });
  };
  tour.addEventListener("focusin", (e) => {
    const art = e.target.closest(".art");
    if (!art) return;
    const a = ARTWORKS[Number(art.dataset.i)];
    if (Math.abs(current - a.room) > 0.7) scrollToStop(a.room);
  });

  resize();
  schedule();

  // ---------- Artwork modal ----------
  const lb = document.getElementById("lightbox");
  const catalog = document.getElementById("catalog");
  const $ = (id) => document.getElementById(id);
  let opener = null;

  const openArt = (i, from) => {
    const a = ARTWORKS[i];
    opener = from || document.activeElement;
    $("lb-img").src = a.image;
    $("lb-img").alt = `${a.title}, ${a.artist}`;
    $("lb-room").textContent = `Room ${pad(a.room)} · ${ROOMS[a.room - 1].name}`;
    $("lb-title").textContent = a.title;
    $("lb-artist").textContent = a.artist;
    $("lb-year").textContent = a.year;
    $("lb-medium").textContent = a.medium;
    $("lb-size").textContent = a.size;
    $("lb-ask").dataset.i = i;
    if (catalog.open) catalog.close();
    lb.showModal();
  };
  window.openArt = openArt;

  world.addEventListener("click", (e) => {
    const art = e.target.closest(".art");
    if (art) openArt(Number(art.dataset.i), art);
  });

  const closeOnBackdrop = (dlg) => dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  closeOnBackdrop(lb);
  closeOnBackdrop(catalog);
  $("lb-close").addEventListener("click", () => lb.close());
  $("cat-close").addEventListener("click", () => catalog.close());
  lb.addEventListener("close", () => { document.documentElement.classList.remove("is-locked"); opener?.focus?.({ preventScroll: true }); });
  [lb, catalog].forEach((d) => d.addEventListener("close", () => {
    if (!lb.open && !catalog.open) document.documentElement.classList.remove("is-locked");
  }));
  [lb, catalog].forEach((d) => new MutationObserver(() => {
    if (d.open) document.documentElement.classList.add("is-locked");
  }).observe(d, { attributes: true, attributeFilter: ["open"] }));

  $("lb-ask").addEventListener("click", () => {
    const a = ARTWORKS[Number($("lb-ask").dataset.i)];
    document.dispatchEvent(new CustomEvent("atelier:ask", { detail: a }));
    lb.close();
  });

  // ---------- List view ----------
  $("cat-body").innerHTML = ROOMS.map((room, r) => {
    const items = ARTWORKS.map((a, i) => [a, i]).filter(([a]) => a.room === r + 1);
    return `<section><h4><span>${pad(r + 1)}</span> ${esc(room.name)}</h4><ul>${items.map(([a, i]) =>
      `<li><button type="button" data-i="${i}"><span class="thumb"><img src="${a.image}" alt="" loading="lazy" decoding="async"></span><b>${esc(a.title)}</b><small>${esc(a.artist)}</small></button></li>`).join("")}</ul></section>`;
  }).join("");
  $("cat-body").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-i]");
    if (b) openArt(Number(b.dataset.i), $("open-list"));
  });
  $("open-list").addEventListener("click", () => catalog.showModal());
})();
