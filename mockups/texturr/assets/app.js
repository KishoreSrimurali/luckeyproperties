/* Texturr site behaviour: sample requests, finish filters, decor pages and enquiry forms.
   Runs after partials.js (store, header) and catalog.js (decor data). No server needed:
   forms validate in the browser, then open a prefilled email to the Texturr team. */
(function () {
  const T = window.Texturr, S = window.TexturrSamples, icon = window.TexturrIcon;
  const P = T.decors;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);
  const CONTACT = { email: "info@texturr.com", phone: "+91 99160 89900" };

  // ---------- Announcements (screen readers + a brief visible toast) ----------
  const toast = document.createElement("div");
  toast.className = "toast"; toast.setAttribute("role", "status"); toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);
  let toastTimer;
  const announce = (msg) => {
    toast.textContent = msg; toast.classList.add("is-on");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("is-on"), 2600);
  };

  // ---------- Sample request toggles ----------
  const paintSampleButtons = () => $$("[data-sample]").forEach((b) => {
    const on = S.has(b.dataset.sample);
    b.setAttribute("aria-pressed", String(on));
    const label = b.querySelector("span:not(.sr-only)");
    if (label) label.textContent = b.dataset.onText && on ? b.dataset.onText : b.dataset.offText && !on ? b.dataset.offText : on ? "Sample requested" : "Sample";
    const svg = b.querySelector("svg"); if (svg) svg.outerHTML = icon(on ? "check" : "plus");
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-sample]");
    if (!b) return;
    const added = S.toggle(b.dataset.sample);
    announce(`${P[b.dataset.sample].code} ${added ? "added to" : "removed from"} your sample request`);
  });

  const paintCounts = () => {
    const n = S.list().length;
    $$(".sample-link .badge").forEach((el) => { el.textContent = n; el.hidden = !n; });
    $$(".sample-link").forEach((el) => el.setAttribute("aria-label", `Sample request, ${n} finish${n === 1 ? "" : "es"}`));
    $$(".sample-count").forEach((el) => (el.textContent = n));
    const bar = $(".sample-bar");
    if (bar) {
      bar.hidden = !n;
      $(".sb-count", bar).textContent = `${n} finish${n === 1 ? "" : "es"}`;
      $(".sb-slots", bar).innerHTML = S.list().slice(0, 5).map((k) => `<span data-swatch="${k}"></span>`).join("");
      T.paintSwatches(bar);
    }
  };
  document.addEventListener("samples:change", () => { paintSampleButtons(); paintCounts(); renderRequestList(); });

  // ---------- In-stock finishes: filter, search, sort ----------
  const grid = $("[data-finder]");
  if (grid) {
    const chips = $$("[data-series-chip]"), checks = $$("[data-series-check]");
    const search = $("#search"), sort = $("#sort"), status = $("[data-result-count]");
    const want = new Set((params.get("series") || "").split(",").filter(Boolean));
    const sync = () => {
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.seriesChip === "all" ? !want.size : want.has(c.dataset.seriesChip))));
      checks.forEach((c) => (c.checked = want.has(c.value)));
    };
    const render = () => {
      const q = (search.value || "").trim().toLowerCase().replace(/\s+/g, " ");
      let keys = Object.values(P).filter((p) => (!want.size || want.has(p.series.toLowerCase())) &&
        (!q || `${p.code} ${p.code.replace(" ", "")} ${p.look} ${p.series}`.toLowerCase().includes(q)));
      keys.sort(sort.value === "code" ? (a, b) => a.code.localeCompare(b.code) : (a, b) => a.order - b.order);
      T.renderCards(grid, keys.map((p) => p.key));
      status.textContent = `${keys.length} finish${keys.length === 1 ? "" : "es"} shown`;
      $("[data-empty]").hidden = !!keys.length;
      const url = new URL(location.href);
      want.size ? url.searchParams.set("series", [...want].join(",")) : url.searchParams.delete("series");
      history.replaceState(null, "", url);
      sync();
    };
    chips.forEach((c) => c.addEventListener("click", () => {
      const v = c.dataset.seriesChip;
      if (v === "all") want.clear(); else { want.clear(); want.add(v); }
      render();
    }));
    checks.forEach((c) => c.addEventListener("change", () => { c.checked ? want.add(c.value) : want.delete(c.value); render(); }));
    search.addEventListener("input", render);
    sort.addEventListener("change", render);
    $("[data-clear-filters]").addEventListener("click", () => { want.clear(); search.value = ""; render(); search.focus(); });
    render();
    if (location.hash === "#search") search.focus();
  }

  // ---------- Decor page: ?d=t-stn-8027 ----------
  const decor = $("[data-decor-page]");
  if (decor) {
    const show = (key) => {
      const p = P[key] || P["t-stn-8027"]; const s = T.series[p.series];
      document.title = `${p.code}, ${p.series} Series — Texturr`;
      $$("[data-bind=code]").forEach((el) => (el.textContent = p.code));
      $$("[data-bind=series]").forEach((el) => (el.textContent = `${p.series} Series`));
      $("[data-bind=lede]").textContent = `${p.look}. ${s.text}`;
      $("[data-bind=decors-label]").textContent = `${p.series} Series decors`;
      const room = $("[data-bind=room]");
      if (s.room) {
        room.src = `assets/img/${s.room}.webp`; room.removeAttribute("srcset"); room.width = s.roomW; room.height = 1000; room.alt = s.roomAlt;
        $("[data-bind=room-cap]").textContent = `${p.series} Series panels`;
      } else {
        room.src = `assets/img/sw-${p.key}-500.webp`; room.removeAttribute("srcset"); room.width = 500; room.height = 700;
        room.alt = `${p.code}, ${p.look.toLowerCase()}`; $("[data-bind=room-cap]").textContent = `${p.code} decor`;
      }
      const sw = $("[data-bind=swatch]");
      sw.src = `assets/img/sw-${p.key}-500.webp`; sw.alt = `${p.code} decor: ${p.look.toLowerCase()}`;
      $("[data-bind=swatch-cap]").textContent = `${p.code} decor`;
      // Same-series decors as switches
      const same = Object.values(P).filter((d) => d.series === p.series);
      $("[data-bind=decors]").innerHTML = same.map((d) =>
        `<button class="sw" type="button" data-decor="${d.key}" aria-pressed="${d.key === p.key}" aria-label="${d.code}"></button>`).join("");
      $$("[data-decor]").forEach((b) => { b.style.backgroundImage = `url("assets/img/sw-${b.dataset.decor}-360.webp")`; b.classList.add("swatch-img"); });
      $$("[data-sample-slot]").forEach((el) => {
        el.innerHTML = T.sampleBtn(p.key, el.dataset.sampleSlot);
        const b = el.firstElementChild; b.dataset.onText = "In your sample request"; b.dataset.offText = "Add to sample request";
      });
      $$("[data-bind=mb-swatch]").forEach((el) => (el.dataset.swatch = p.key));
      T.paintSwatches(decor.closest("main"));
      // Pairings: one decor from each other series
      const pairs = ["Wood", "Metal", "Stone", "Solid", "Cloth"].filter((x) => x !== p.series).slice(0, 4)
        .map((x) => Object.values(P).find((d) => d.series === x).key);
      T.renderCards($("[data-bind=pairs]"), pairs);
      paintSampleButtons();
    };
    let current = params.get("d") in P ? params.get("d") : "t-stn-8027";
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-decor]");
      if (!b) return;
      current = b.dataset.decor;
      const url = new URL(location.href); url.searchParams.set("d", current); history.replaceState(null, "", url);
      show(current);
      $(`[data-decor="${current}"]`).focus();
    });
    show(current);
  }

  // ---------- Sample request list ----------
  function renderRequestList() {
    const list = $("[data-request-list]");
    if (!list) return;
    const keys = S.list().filter((k) => P[k]);
    list.innerHTML = keys.map((k) => { const p = P[k]; return `<li><span class="thumb" data-swatch="${k}"></span><div><b>${p.code}</b><span>${p.series} Series · ${p.look}</span></div><button class="rm" type="button" data-remove="${k}">Remove<span class="sr-only"> ${p.code}</span></button></li>`; }).join("") +
      `<li><span class="empty-thumb">${icon("plus")}</span><p class="add-more">${keys.length ? "" : "No finishes yet. "}<a href="collection.html">${keys.length ? "Add another finish" : "Browse in-stock finishes"}</a></p><span></span></li>`;
    T.paintSwatches(list);
    $$("[data-bind=request-count]").forEach((el) => (el.textContent = `${keys.length} finish${keys.length === 1 ? "" : "es"}`));
    const pair = $("[data-pairing]");
    if (pair) {
      const first = keys[0] && P[keys[0]];
      const suggestion = first && Object.values(P).find((d) => d.series !== first.series && !keys.includes(d.key));
      pair.hidden = !suggestion;
      if (suggestion) {
        $("[data-bind=pair-swatch]", pair).dataset.swatch = suggestion.key;
        $("[data-bind=pair-text]", pair).textContent = `Pairs with ${first.code}: ${suggestion.code}, ${suggestion.look.toLowerCase()} from the ${suggestion.series} Series.`;
        $("[data-bind=pair-add]", pair).dataset.sample = suggestion.key;
        T.paintSwatches(pair);
      }
    }
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-remove]");
    if (!b) return;
    const code = P[b.dataset.remove].code; S.remove(b.dataset.remove);
    announce(`${code} removed from your sample request`);
    const next = $("[data-request-list] .rm") || $("[data-request-list] a"); next && next.focus();
  });

  // ---------- Enquiry forms (sample request, quote, visit) ----------
  $$("form[data-enquiry]").forEach((form) => {
    const summary = $(".error-summary", form);
    const fieldMsg = (input) => {
      const label = form.querySelector(`label[for="${input.id}"]`).childNodes[0].textContent.trim();
      if (input.validity.valueMissing) return `Enter your ${label.toLowerCase()}`;
      if (input.validity.typeMismatch && input.type === "email") return "Enter an email address, like name@studio.com";
      if (input.validity.patternMismatch) return input.dataset.patternMsg || `Check your ${label.toLowerCase()}`;
      return "";
    };
    const setError = (input, msg) => {
      const field = input.closest(".field");
      field.classList.toggle("field--error", !!msg);
      input.setAttribute("aria-invalid", String(!!msg));
      let err = $(".err", field);
      if (msg && !err) { err = document.createElement("p"); err.className = "err"; err.id = `${input.id}-err`; field.appendChild(err); }
      if (err) { err.innerHTML = msg ? `${icon("alert")} ${msg}` : ""; err.hidden = !msg; }
      msg ? input.setAttribute("aria-describedby", `${input.id}-err`) : input.removeAttribute("aria-describedby");
    };
    $$("input, select, textarea", form).forEach((i) => i.addEventListener("blur", () => i.closest(".field") && i.closest(".field").classList.contains("field--error") && setError(i, fieldMsg(i))));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const errors = [];
      $$("input[required], input[type=email], input[pattern]", form).forEach((i) => { const m = fieldMsg(i); setError(i, m); if (m) errors.push([i, m]); });
      const needsSamples = form.dataset.enquiry === "samples" && !S.list().length;
      if (needsSamples) errors.push([$("[data-request-list] a") || null, "Add at least one finish to your sample request"]);
      if (errors.length) {
        summary.hidden = false;
        $("ul", summary).innerHTML = errors.map(([i, m]) => `<li><a class="u" href="${i && i.id ? "#" + i.id : "collection.html"}">${m}</a></li>`).join("");
        summary.focus();
        return;
      }
      summary.hidden = true;
      // Compose the email
      const val = (id) => { const el = form.querySelector("#" + id); return el ? (el.type === "radio" ? "" : el.value.trim()) : ""; };
      const radio = (n) => { const r = form.querySelector(`input[name="${n}"]:checked`); return r ? r.value : ""; };
      const lines = $$("[data-mail]", form).map((el) => {
        const v = el.type === "radio" ? radio(el.name) : el.type === "checkbox" ? (el.checked ? "Yes" : "No") : el.value.trim();
        return v ? `${el.dataset.mail}: ${v}` : null;
      }).filter(Boolean);
      const finishes = S.list().filter((k) => P[k]).map((k) => `- ${P[k].code} (${P[k].series} Series, ${P[k].look})`);
      if (finishes.length) lines.push("", form.dataset.enquiry === "samples" ? "Samples requested:" : "Finishes of interest:", ...finishes);
      const topic = form.dataset.enquiry === "samples" ? "Sample request" : (radio("topic") || "Enquiry");
      const subject = `${topic} — ${val("pn") || val("co") || "Texturr website"}`;
      const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n") + "\n\nSent from texturr.com")}`;
      window.location.href = href;
      // Confirmation (the email still has to be sent from the visitor's mail app)
      form.hidden = true;
      const done = $("[data-done]");
      done.hidden = false;
      $("[data-bind=done-mail]", done).href = href;
      done.focus();
    });
  });
  $$("[data-new-request]").forEach((b) => b.addEventListener("click", () => { S.clear(); location.href = "collection.html"; }));

  // ---------- Quote page: preselect topic from ?topic= ----------
  const topic = params.get("topic");
  if (topic) { const r = document.querySelector(`input[name="topic"][data-topic="${topic}"]`); if (r) r.checked = true; }
  const interest = $("[data-interest]");
  if (interest) {
    const keys = S.list().filter((k) => P[k]);
    interest.hidden = !keys.length;
    $("ul", interest).innerHTML = keys.map((k) => `<li><span class="thumb" data-swatch="${k}"></span>${P[k].code}</li>`).join("");
    T.paintSwatches(interest);
  }

  paintSampleButtons(); paintCounts(); renderRequestList();
})();
