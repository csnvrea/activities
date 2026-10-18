var elParent = document.getElementById("parent"); // where the cards go
var elMessage = document.getElementById("message"); // loading / error / empty text
var elSearch = document.getElementById("search"); // the search box
var elFilters = document.querySelectorAll(".btn-filter"); // the 4 category buttons

var menu = [];
var activeCategory = "All";

function getAccent(category) {
  if (category == "Coffee") {
    return "accent-blush";
  } else if (category == "Tea & Matcha") {
    return "accent-mint";
  } else {
    return "accent-lavender";
  }
}

function showMenu() {
  var searchText = elSearch.value.toLowerCase().trim();
  var shown = 0;

  elParent.innerHTML = "";

  for (var i = 0; i < menu.length; i++) {
    var item = menu[i];

    var categoryMatch = activeCategory == "All" || item.category == activeCategory;

    var searchMatch =
      item.name.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText);

    if (categoryMatch && searchMatch) {
      elParent.innerHTML += `<div class="col-12 col-md-6 col-lg-4">
          <article class="menu-card h-100 ${getAccent(item.category)}">
            <img src="${item.image}" class="menu-img" alt="${item.name}" loading="lazy" />
            <div class="menu-body">
              <span class="badge category-badge">${item.category}</span>
              <h3 class="menu-name">${item.name}</h3>
              <p class="menu-desc">${item.description}</p>
              <div class="menu-price">₱${item.price}</div>
            </div>
          </article>
        </div>`;
      shown++;
    }
  }

  if (shown == 0) {
    elMessage.innerHTML = `No treats found for "${elSearch.value}" 🍰<br />Try a different word or pick another category!`;
    elMessage.classList.remove("d-none");
  } else {
    elMessage.classList.add("d-none");
  }
}

for (var i = 0; i < elFilters.length; i++) {
  elFilters[i].addEventListener("click", function () {
    for (var j = 0; j < elFilters.length; j++) {
      elFilters[j].classList.remove("active");
    }
    this.classList.add("active");

    activeCategory = this.dataset.category;
    showMenu();
  });
}

elSearch.addEventListener("input", showMenu);

fetch("menu.json")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Could not find menu.json");
    }
    return response.json();
  })
  .then(function (data) {
    menu = data;
    showMenu();
  });