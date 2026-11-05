/*
 * MarcenariaSP — página de ambiente (conversão).
 *   1. captura de origem (UTM e gclid) para os campos ocultos e o dataLayer;
 *   2. formulários: validação, máscara do WhatsApp e mensagem pronta no WhatsApp;
 *   3. eventos de conversão no dataLayer (GTM / GA4 / Google Ads);
 *   4. abas de layouts, barra fixa no celular, menu âncora e entrada suave dos blocos.
 * Sem JavaScript a página continua completa: todos os layouts ficam visíveis e os links funcionam.
 */
(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];

  var track = function (name, params) {
    var payload = { event: name };
    Object.keys(params || {}).forEach(function (key) { payload[key] = params[key]; });
    window.dataLayer.push(payload);
  };

  document.documentElement.classList.add("js");

  /* 1. Origem do clique -------------------------------------------------------- */
  var KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];
  var origin = {};

  try {
    var stored = JSON.parse(sessionStorage.getItem("lp_origin") || "{}");
    var query = new URLSearchParams(window.location.search);
    KEYS.forEach(function (key) {
      var value = query.get(key) || stored[key];
      if (value) origin[key] = value.slice(0, 200);
    });
    sessionStorage.setItem("lp_origin", JSON.stringify(origin));
  } catch (error) {
    origin = {};
  }

  Array.prototype.forEach.call(document.querySelectorAll("form[data-lead]"), function (form) {
    KEYS.forEach(function (key) {
      var input = form.querySelector('input[name="' + key + '"]');
      if (input && origin[key]) input.value = origin[key];
    });
  });

  /* 2. Formulários ------------------------------------------------------------- */
  var maskPhone = function (input) {
    input.addEventListener("input", function () {
      var digits = input.value.replace(/\D/g, "");
      if (digits.length > 11 && digits.indexOf("55") === 0) digits = digits.slice(2);
      digits = digits.slice(0, 11);

      var out = digits;
      if (digits.length > 10) out = "(" + digits.slice(0, 2) + ") " + digits.slice(2, 7) + "-" + digits.slice(7);
      else if (digits.length > 6) out = "(" + digits.slice(0, 2) + ") " + digits.slice(2, 6) + "-" + digits.slice(6);
      else if (digits.length > 2) out = "(" + digits.slice(0, 2) + ") " + digits.slice(2);
      else if (digits.length) out = "(" + digits;

      input.value = out;
    });
  };

  Array.prototype.forEach.call(document.querySelectorAll("form[data-lead]"), function (form) {
    var formId = form.getAttribute("data-lead");
    var status = form.querySelector("[data-status]");
    var fields = Array.prototype.slice.call(form.querySelectorAll("[data-field]"));
    var started = false;

    form.noValidate = true;

    var showError = function (field, show) {
      var error = document.getElementById(field.id + "-erro");
      if (!error) return;
      error.hidden = !show;
      if (show) {
        field.setAttribute("aria-invalid", "true");
        field.setAttribute("aria-describedby", error.id);
      } else {
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
      }
    };

    fields.forEach(function (field) {
      if (field.type === "tel") maskPhone(field);

      var clear = function () {
        if (field.checkValidity()) showError(field, false);
      };
      field.addEventListener("input", clear);
      field.addEventListener("change", clear);

      field.addEventListener("focus", function () {
        if (started) return;
        started = true;
        track("form_start", { form_id: formId });
      }, { once: true });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var invalid = fields.filter(function (field) {
        var ok = field.checkValidity();
        showError(field, !ok);
        return !ok;
      });

      if (invalid.length) {
        invalid[0].focus();
        if (status) status.hidden = true;
        return;
      }

      var data = form.dataset;
      var lines = [data.msgIntro, ""];
      var summary = {};
      fields.forEach(function (field) {
        var value = field.value.trim();
        if (!value) return;
        lines.push(field.dataset.msgLabel + ": " + value);
        summary[field.dataset.msgLabel] = value;
      });

      var base = form.getAttribute("action");
      var url = base + (base.indexOf("?") === -1 ? "?" : "&") + "text=" + encodeURIComponent(lines.join("\n"));

      // Evento de conversão: configure no GTM como conversão do Google Ads (gatilho: evento generate_lead).
      var payload = { form_id: formId, page: data.page || document.title, lead_type: data.leadType || "projeto_3d" };
      Object.keys(origin).forEach(function (key) { payload[key] = origin[key]; });
      if (summary.Imóvel) payload.imovel = summary.Imóvel;
      track("generate_lead", payload);

      window.open(url, "_blank", "noopener");
      if (status) status.hidden = false;
    });
  });

  /* 3. Cliques em botões e links de conversão ---------------------------------- */
  document.addEventListener("click", function (event) {
    var el = event.target.closest("[data-track]");
    if (!el) return;
    var isWhatsApp = /wa\.me|api\.whatsapp\.com/.test(el.getAttribute("href") || "");
    track(isWhatsApp ? "whatsapp_click" : "cta_click", {
      location: el.getAttribute("data-track"),
      label: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60)
    });
  });

  /* 4a. Abas de layouts ---------------------------------------------------------- */
  var tablist = document.querySelector("[data-tabs]");

  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (tab) { return document.getElementById(tab.getAttribute("aria-controls")); });

    var select = function (index, focus) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();
    };

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        select(index, false);
        track("layout_view", { layout: tab.textContent.trim() });
      });

      tab.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next === null) return;
        event.preventDefault();
        select(next, true);
      });
    });

    /* Âncoras das palavras-chave de seção (spans .lp-anchor antes de cada
       painel): quando a URL chega com uma delas, abre a aba daquele painel,
       senão o conteúdo apontado nasce dentro de um painel escondido. */
    var abaDaAncora = {};
    panels.forEach(function (panel, index) {
      var irmao = panel.previousElementSibling;
      while (irmao && irmao.classList && irmao.classList.contains("lp-anchor")) {
        abaDaAncora[irmao.id] = index;
        irmao = irmao.previousElementSibling;
      }
    });

    var abrirPeloHash = function () {
      var id = location.hash.slice(1);
      if (!id) return false;
      var alvo = document.getElementById(id);
      if (!alvo) return false;
      var index = abaDaAncora[id];
      if (index === undefined) {
        for (var i = 0; i < panels.length; i++) {
          if (panels[i].contains(alvo)) { index = i; break; }
        }
      }
      if (index === undefined) return false;
      select(index, false);
      alvo.scrollIntoView();
      return true;
    };

    if (!abrirPeloHash()) select(0, false);
    window.addEventListener("hashchange", abrirPeloHash);
  }

  /* 4b. Barra fixa no celular: some enquanto um formulário está na tela ----------- */
  var sticky = document.querySelector(".lp-sticky");
  var leadForms = document.querySelectorAll("form[data-lead][data-hides-sticky]");

  if (sticky && "IntersectionObserver" in window) {
    var visibleForms = {};
    var pastHero = false;
    var hero = document.querySelector(".lp-hero");

    var paint = function () {
      sticky.classList.toggle("is-on", pastHero && Object.keys(visibleForms).length === 0);
    };

    var formObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visibleForms[entry.target.id] = true;
        else delete visibleForms[entry.target.id];
      });
      paint();
    }, { threshold: 0.2 });

    Array.prototype.forEach.call(leadForms, function (form) { formObserver.observe(form); });

    // Posição lida na rolagem (e não por observer): um salto por âncora não gera cruzamento de limite.
    if (hero) {
      var ticking = false;
      var onScroll = function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          ticking = false;
          pastHero = hero.getBoundingClientRect().bottom < 0;
          paint();
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  /* 4c. Menu âncora: seção atual -------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".lp-nav a[href^='#']"));

  if (navLinks.length && "IntersectionObserver" in window) {
    var sections = navLinks.map(function (link) { return document.getElementById(link.getAttribute("href").slice(1)); });
    var current = null;

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) current = entry.target.id;
        else if (current === entry.target.id) current = null;
      });
      navLinks.forEach(function (link) {
        link.classList.toggle("is-current", link.getAttribute("href") === "#" + current);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (section) { if (section) spy.observe(section); });
  }

  /* 4d. Entrada suave dos blocos ------------------------------------------------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    var targets = document.querySelectorAll("[data-reveal]");
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });

    Array.prototype.forEach.call(targets, function (el) {
      var siblings = Array.prototype.slice.call(el.parentElement.children);
      el.style.setProperty("--reveal-delay", Math.min(siblings.indexOf(el), 4) * 80 + "ms");
      el.classList.add("reveal");
      revealer.observe(el);
    });

    document.documentElement.classList.add("has-reveal");
  }

  /* 4e. Extensão da imagem do hero: fundo espelhado e desfocado à esquerda */
  try {
    var hero = document.querySelector(".lp-hero");
    var heroMedia = hero ? hero.querySelector(".lp-hero__media") : null;
    if (hero && heroMedia && !hero.querySelector(".lp-hero__bg")) {
      var bg = heroMedia.cloneNode(true);
      bg.className = "lp-hero__bg";
      bg.removeAttribute("fetchpriority");
      bg.removeAttribute("id");
      bg.setAttribute("aria-hidden", "true");
      hero.insertBefore(bg, heroMedia);
    }
  } catch (e) {}

  /* 5. Ano do rodapé -------------------------------------------------------------- */
  var year = document.getElementById("ano-atual");
  if (year) year.textContent = String(new Date().getFullYear());
})();
