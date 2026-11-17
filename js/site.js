// Shared header and footer for every page.
// Links are built relative to this script's own location, so the site works
// both on GitHub Pages (/main/...) and when opened from a local server.
(function () {
  var root = new URL("../", document.currentScript.src);
  var here = location.pathname.replace(/index\.html$/, "");

  var links = [
    { href: "", label: "Home" },
    { href: "games/", label: "Games" },
    { href: "records.html", label: "Records" },
    { href: "date/", label: "Date?" }
  ];

  function isCurrent(href) {
    var p = new URL(href, root).pathname;
    if (href === "") return here === p;
    return here === p || here.indexOf(p) === 0;
  }

  var nav = links.map(function (l) {
    var url = new URL(l.href, root).href;
    return '<a href="' + url + '"' + (isCurrent(l.href) ? ' aria-current="page"' : "") + ">" + l.label + "</a>";
  }).join("");

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="inner">' +
      '<a class="brand" href="' + root.href + '"><span class="dot"></span>Raymond</a>' +
      '<nav class="site-nav" aria-label="Main">' + nav + "</nav>" +
    "</div>";
  document.body.insertBefore(header, document.body.firstChild);

  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="inner">' +
      "<span>&copy; " + new Date().getFullYear() + " Raymond</span>" +
      '<span class="links">' +
        '<a href="https://instagram.com/ray_n_ond" target="_blank" rel="noopener">Instagram</a>' +
        '<a href="https://tellonym.me/STARYray" target="_blank" rel="noopener">Tellonym</a>' +
        '<a href="https://github.com/RAY1PNG" target="_blank" rel="noopener">GitHub</a>' +
      "</span>" +
    "</div>";
  document.body.appendChild(footer);

  // Click any gallery image to see it larger.
  var box = null;
  document.addEventListener("click", function (e) {
    var img = e.target.closest && e.target.closest(".gallery img");
    if (img) {
      if (!box) {
        box = document.createElement("div");
        box.className = "lightbox";
        box.innerHTML = "<img alt=\"\">";
        box.addEventListener("click", function () { box.classList.remove("open"); });
        document.body.appendChild(box);
      }
      box.firstChild.src = img.src;
      box.firstChild.alt = img.alt;
      box.classList.add("open");
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && box) box.classList.remove("open");
  });
})();
