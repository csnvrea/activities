document.addEventListener("DOMContentLoaded", function () {

  var navCollapseEl = document.getElementById("mainNav");

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("href");
      var target = document.querySelector(targetId);
      if (!target) { return; }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", targetId);

      if (navCollapseEl.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navCollapseEl).hide();
      }
    });
  });

  var navLinks = document.querySelectorAll(".studyspace-nav .nav-link");
  var sectionIds = ["overview", "planner"];

  function updateActiveLink() {
    var scrollPos = window.scrollY + 160;
    var current = sectionIds[0];

    sectionIds.forEach(function (id) {
      var section = document.getElementById(id);
      if (section && section.offsetTop <= scrollPos) { current = id; }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  var now = new Date();

  document.getElementById("today-label").textContent = now.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric"
  });

});