/*
 * MarcenariaSP — menu do cabeçalho (compartilhado pela home e pelas páginas de ambiente).
 *   1. abrir e fechar o menu no mobile;
 *   1b. dropdowns do menu (hover no desktop com mouse, clique e teclado nos demais).
 * Sem o JavaScript, o menu continua navegável: no mobile a lista fica aberta e, no desktop, os dropdowns abrem com hover ou foco.
 */
(function () {
  "use strict";

  /* 1. Menu mobile ---------------------------------------------------------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("menu");

  if (toggle && nav) {
    var desktop = window.matchMedia("(min-width: 1200px)");

    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".site-header")) setMenu(false);
    });

    var onViewportChange = function (event) {
      if (event.matches) setMenu(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onViewportChange);
    else if (desktop.addListener) desktop.addListener(onViewportChange);
  }

  /* 1b. Dropdowns do menu --------------------------------------------------- */
  var items = Array.prototype.slice.call(document.querySelectorAll(".site-nav .has-sub"));

  if (items.length) {
    var hoverMq = window.matchMedia("(min-width: 1200px) and (hover: hover)");
    var timer;

    var setItem = function (item, open) {
      var trigger = item.querySelector(".site-nav__trigger");
      item.classList.toggle("is-open", open);
      trigger.setAttribute("aria-expanded", String(open));
    };

    var closeAll = function (except) {
      items.forEach(function (item) {
        if (item !== except) setItem(item, false);
      });
    };

    items.forEach(function (item) {
      var trigger = item.querySelector(".site-nav__trigger");

      trigger.addEventListener("click", function () {
        // No desktop com mouse o hover já abriu o painel: o clique só o mantém aberto.
        var open = hoverMq.matches ? true : !item.classList.contains("is-open");
        closeAll(item);
        setItem(item, open);
      });

      item.addEventListener("mouseenter", function () {
        if (!hoverMq.matches) return;
        clearTimeout(timer);
        closeAll(item);
        setItem(item, true);
      });

      item.addEventListener("mouseleave", function () {
        if (!hoverMq.matches) return;
        timer = setTimeout(function () { setItem(item, false); }, 150);
      });

      item.addEventListener("focusout", function (event) {
        if (!item.contains(event.relatedTarget)) setItem(item, false);
      });

      item.addEventListener("click", function (event) {
        if (event.target.closest(".site-nav__sub a")) setItem(item, false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      var openItem = items.filter(function (item) { return item.classList.contains("is-open"); })[0];
      if (openItem) {
        setItem(openItem, false);
        if (hoverMq.matches) openItem.querySelector(".site-nav__trigger").focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".site-nav")) closeAll();
    });
  }

  /* 1c. Segundo nível do menu Ambientes ------------------------------------- */
  /* No desktop com mouse o CSS já abre no hover e no foco; aqui fica o clique,
     que é o que vale no celular e no teclado sem mouse. */
  var ramos = Array.prototype.slice.call(document.querySelectorAll(".site-nav .has-sub2"));

  ramos.forEach(function (ramo) {
    var botao = ramo.querySelector(".site-nav__branch-toggle");
    if (!botao) return;

    botao.addEventListener("click", function (event) {
      event.stopPropagation();
      var aberto = ramo.classList.contains("is-open2");
      ramos.forEach(function (outro) {
        if (outro !== ramo) {
          outro.classList.remove("is-open2");
          var b = outro.querySelector(".site-nav__branch-toggle");
          if (b) b.setAttribute("aria-expanded", "false");
        }
      });
      ramo.classList.toggle("is-open2", !aberto);
      botao.setAttribute("aria-expanded", String(!aberto));
    });
  });
})();
