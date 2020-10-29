let charUl = document.querySelector(".char-ul");
let personContainer = document.querySelector(".person-container");
let personName = document.querySelector(".person-name");
let currentPage = 1;

changeCurrentPage();

function getData() {
  return new Promise((resolve, reject) => {
    fetch("http://swapi.dev/api/people/?page=" + currentPage)
      .then((resp) => resp.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

getData().then((data) => {
  addChars(data.results);
  showCharDetails(data.results);
});

function changeCurrentPage() {
  let left = document.querySelector(".left");
  let right = document.querySelector(".right");
  let counter = document.querySelector(".counter");

  left.addEventListener("click", () => {
    if (currentPage === 1) {
      currentPage = 1;
    } else {
      currentPage -= 1;
      counter.textContent = currentPage;
    }
    getData().then((data) => {
      addChars(data.results);
      showCharDetails(data.results);
    });
  });

  right.addEventListener("click", () => {
    if (currentPage === 8) {
      document.querySelector(".inner-container").style.justifyContent =
        "space-between";
      currentPage += 1;
      counter.textContent = currentPage;
    } else if (currentPage === 9) {
      currentPage = 9;
    } else {
      currentPage += 1;
      counter.textContent = currentPage;
    }
    getData().then((data) => {
      addChars(data.results);
      showCharDetails(data.results);
    });
  });
}

function addChars(chars) {
  charUl.innerHTML = "";
  for (let i = 0; i < chars.length; i++) {
    let li = document.createElement("li");
    li.className = "char-li";
    li.textContent = chars[i].name;
    charUl.appendChild(li);
  }
}

function showCharDetails(chars) {
  let names = document.querySelectorAll(".char-li");
  for (let name of names) {
    name.addEventListener("click", () => {
      addCharDetails(chars, name.textContent);
    });
  }
}

function addCharDetails(chars, name) {
  chars.forEach((element) => {
    if (element.name === name) {
      document.querySelector(".person-name").innerHTML = element.name;

      document.querySelector(".person-one").innerHTML =
        "Height: " + "&nbsp" + element.height + "cm";

      document.querySelector(".person-two").innerHTML =
        "Mass: " + "&nbsp" + element.mass + "kg";

      document.querySelector(".person-three").innerHTML =
        "Hair color: " + "&nbsp" + element.hair_color;

      document.querySelector(".person-four").innerHTML =
        "Skin color: " + "&nbsp" + element.skin_color;

      document.querySelector(".person-five").innerHTML =
        "Birth year: " + "&nbsp" + element.birth_year;

      document.querySelector(".person-six").innerHTML =
        "Gender: " + "&nbsp" + element.gender;

      fetch(element.homeworld)
        .then((resp) => resp.json())
        .then((planet) => {
          document.querySelector(".planet-name").innerHTML = planet.name;

          document.querySelector(".planet-one").innerHTML =
            "Rotation period: " + "&nbsp" + planet.rotation_period + "h";

          document.querySelector(".planet-two").innerHTML =
            "Orbital period: " + "&nbsp" + planet.orbital_period + "days";

          document.querySelector(".planet-three").innerHTML =
            "Diameter: " + "&nbsp" + planet.diameter + "km";

          document.querySelector(".planet-four").innerHTML =
            "Climate: " + "&nbsp" + planet.climate;

          document.querySelector(".planet-five").innerHTML =
            "Gravity: " + "&nbsp" + planet.gravity;

          document.querySelector(".planet-six").innerHTML =
            "Terrain: " + "&nbsp" + planet.terrain;
        })
        .catch((err) => err.message);
    }
  });
}
