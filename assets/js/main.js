/*
 * MarcenariaSP — interações da home.
 * Todo o conteúdo da página está no HTML. Este arquivo só adiciona (o menu do cabeçalho está em nav.js):
 *   2. validar o formulário e montar a mensagem de WhatsApp;
 *   3. atualizar o ano do rodapé;
 *   4. entrada suave dos blocos ao rolar, seção atual no menu, pré-seleção do
 *      ambiente no formulário e máscara do WhatsApp.
 * Sem o JavaScript, a página continua completa e navegável.
 */
(function () {
  "use strict";

  var nav = document.getElementById("menu");

  /* 2. Formulário de projeto ------------------------------------------------ */
  var form = document.getElementById("form-projeto");

  if (form) {
    // Com JavaScript, as mensagens de erro ficam ao lado de cada campo (sem o balão do navegador).
    // Sem JavaScript, a validação nativa do navegador continua funcionando.
    form.noValidate = true;

    var status = document.getElementById("form-status-msg");
    var fields = Array.prototype.slice.call(form.querySelectorAll("[data-field]"));

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
      var clear = function () {
        if (field.checkValidity()) showError(field, false);
      };
      field.addEventListener("input", clear);
      field.addEventListener("change", clear);
    });

    form.addEventListener("submit", function (event) {
      var invalid = fields.filter(function (field) {
        var ok = field.checkValidity();
        showError(field, !ok);
        return !ok;
      });

      event.preventDefault();

      if (invalid.length) {
        invalid[0].focus();
        if (status) status.hidden = true;
        return;
      }

      // A mensagem é montada com os textos definidos no HTML (atributos data-*).
      var data = form.dataset;
      var lines = [data.msgIntro, ""];
      fields.forEach(function (field) {
        var value = field.value.trim();
        if (value) lines.push(field.dataset.msgLabel + ": " + value);
      });

      var base = form.getAttribute("action");
      var url = base + (base.indexOf("?") === -1 ? "?" : "&") + "text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");

      if (status) status.hidden = false;
    });
  }

  /* 3. Ano do rodapé -------------------------------------------------------- */
  var year = document.getElementById("ano-atual");
  if (year) year.textContent = String(new Date().getFullYear());

  /* 4. Entrada suave dos blocos ao rolar ------------------------------------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    var targets = document.querySelectorAll(
      ".trust__item, .environments .section-head, .env-card, .about__text, .about__media, " +
      ".projects .section-head, .gallery__item, .benefits__panel, .benefit, .process .section-head, " +
      ".step, .process__cta, .faq__intro, .faq__item, .closing__text, .lead-form"
    );

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

  /* 5. Seção atual no menu --------------------------------------------------- */
  if (nav && "IntersectionObserver" in window) {
    var spy = [];

    Array.prototype.forEach.call(nav.querySelectorAll(".site-nav__list > li > .site-nav__link"), function (link) {
      var id = link.tagName === "A"
        ? (link.getAttribute("href") || "").replace("#", "")
        : (link.getAttribute("aria-controls") || "").replace("sub-", "");
      var section = id && document.getElementById(id);
      if (section) spy.push({ id: id, link: link, section: section });
    });

    var current = null;
    var paint = function () {
      spy.forEach(function (item) {
        var on = item.id === current;
        item.link.classList.toggle("is-current", on);
        if (item.link.tagName === "A") {
          if (on) item.link.setAttribute("aria-current", "location");
          else item.link.removeAttribute("aria-current");
        }
      });
    };

    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        if (entry.isIntersecting) current = id;
        else if (current === id) current = null;
      });
      paint();
    }, { rootMargin: "-45% 0px -50% 0px" });

    spy.forEach(function (item) { spyObserver.observe(item.section); });
  }

  /* 6. Links de ambiente pré-selecionam o campo do formulário ---------------- */
  var ambienteField = document.getElementById("campo-ambiente");

  if (ambienteField) {
    var ambienteByPath = {
      "/cozinhas-planejadas/": "Cozinha",
      "/dormitorios-e-closets/": "Dormitório",
      "/salas-e-paineis/": "Sala",
      "/home-office-planejado/": "Home office",
      "/lavanderias-planejadas/": "Outro",
      "/banheiros-planejados/": "Outro",
      "/varanda-gourmet-planejada/": "Outro",
      "/espacos-comerciais/": "Outro"
    };

    // Só atua enquanto a página do ambiente não existe (o link ainda aponta para #contato).
    document.addEventListener("click", function (event) {
      var link = event.target.closest('a[data-destino-futuro][href="#contato"]');
      var value = link && ambienteByPath[link.getAttribute("data-destino-futuro")];
      if (value) ambienteField.value = value;
    });
  }

  /* 7. Máscara do WhatsApp: (43) 99999-9999 ---------------------------------- */
  var phone = document.getElementById("campo-telefone");

  if (phone) {
    phone.addEventListener("input", function () {
      var digits = phone.value.replace(/\D/g, "");
      if (digits.length > 11 && digits.indexOf("55") === 0) digits = digits.slice(2);
      digits = digits.slice(0, 11);

      var out = digits;
      if (digits.length > 10) out = "(" + digits.slice(0, 2) + ") " + digits.slice(2, 7) + "-" + digits.slice(7);
      else if (digits.length > 6) out = "(" + digits.slice(0, 2) + ") " + digits.slice(2, 6) + "-" + digits.slice(6);
      else if (digits.length > 2) out = "(" + digits.slice(0, 2) + ") " + digits.slice(2);
      else if (digits.length) out = "(" + digits;

      phone.value = out;
    });
  }
})();
