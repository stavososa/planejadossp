/* Mapa do Google sob demanda. O iframe só é criado depois do clique: até lá nenhuma
 * requisição vai ao Google, e a política de privacidade continua verdadeira para
 * quem não abre o mapa. Uso: <div class="mapa" data-mapa="Pinheiros, São Paulo, SP" data-zoom="13">. */
(function () {
  "use strict";
  var caixas = document.querySelectorAll("[data-mapa]");
  Array.prototype.forEach.call(caixas, function (caixa) {
    var botao = caixa.querySelector("button");
    if (!botao) return;
    botao.addEventListener("click", function () {
      var q = caixa.getAttribute("data-mapa");
      var z = caixa.getAttribute("data-zoom") || "11";
      var f = document.createElement("iframe");
      f.src = "https://www.google.com/maps?q=" + encodeURIComponent(q) + "&z=" + z + "&hl=pt-BR&output=embed";
      f.title = "Mapa do Google: " + q;
      f.loading = "lazy";
      f.referrerPolicy = "no-referrer-when-downgrade";
      f.setAttribute("allowfullscreen", "");
      caixa.innerHTML = "";
      caixa.appendChild(f);
    });
  });
})();
