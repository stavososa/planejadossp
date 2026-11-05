/*
 * Vídeo de fundo do hero da home. O poster (<img class="hero__media">) é o LCP;
 * o vídeo só é criado depois do `load`, em ociosidade, e só se o visitante não
 * pediu menos movimento nem economia de dados. Sem vídeo, o poster fica como está.
 * Arquivos: assets/video/ (ver LEIA-ME.md, seção "Vídeo do hero").
 */
(function () {
  "use strict";

  var hero = document.querySelector(".hero");
  var poster = hero && hero.querySelector(".hero__media");
  if (!poster) return;

  var conn = navigator.connection || {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var slow = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || "");
  if (reduce || slow) return;

  var small = window.matchMedia("(max-width: 767px)").matches;
  var base = "assets/video/hero-marcenaria" + (small ? "-sm" : "");

  var start = function () {
    var video = document.createElement("video");
    video.className = "hero__video";
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "auto";
    video.disablePictureInPicture = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("aria-hidden", "true");
    video.setAttribute("tabindex", "-1");
    video.setAttribute("disablepictureinpicture", "");
    video.width = 1280;
    video.height = 720;

    // Safari não suporta AV1 na maioria dos dispositivos; verificar canPlayType antes
    var canAv1 = video.canPlayType && video.canPlayType('video/webm; codecs="av01.0.04M.08"');
    var sources = [];
    if (canAv1 && canAv1 !== "no" && canAv1 !== "") {
      sources.push(["video/webm; codecs=av01.0.04M.08", ".av1.webm"]);
    }
    sources.push(["video/mp4", ".mp4"]);

    sources.forEach(function (s) {
      var source = document.createElement("source");
      source.src = base + s[1];
      source.type = s[0];
      video.appendChild(source);
    });

    video.addEventListener("playing", function () {
      video.classList.add("is-playing");
    }, { once: true });

    poster.insertAdjacentElement("afterend", video);
    video.load();

    var attemptPlay = function () {
      var p = video.play();
      if (p && p.catch) {
        p.catch(function () {
          // Se o autoplay foi barrado por economia de energia ou política do Safari, tentar na primeira interação
          var onInteract = function () {
            video.play();
            window.removeEventListener("touchstart", onInteract);
            window.removeEventListener("scroll", onInteract);
            window.removeEventListener("click", onInteract);
          };
          window.addEventListener("touchstart", onInteract, { passive: true, once: true });
          window.addEventListener("scroll", onInteract, { passive: true, once: true });
          window.addEventListener("click", onInteract, { passive: true, once: true });
        });
      }
    };

    attemptPlay();
  };

  var idle = function () {
    if ("requestIdleCallback" in window) window.requestIdleCallback(start, { timeout: 2500 });
    else setTimeout(start, 800);
  };

  if (document.readyState === "complete") idle();
  else window.addEventListener("load", idle, { once: true });
})();
