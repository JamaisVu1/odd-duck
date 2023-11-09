const duckContainer = document.getElementsByClassName("ducks");
const resultContainer = document.getElementsByClassName("results");

const image1 = document.querySelector(".ducks img:first-child");
const image2 = document.querySelector(".ducks img:nth-child(2)");
const image3 = document.querySelector(".ducks img:nth-child(3)");

const button = document.getElementsByClassName("showResults");

let condition = {
  currentClicks: 0,
  clicksAllowed: 25,
  allDucks: [],
};

// let allDucksJSON = localStorage.getItem("allDucks");
//     console.log(allDucksJSON);
// if (allDucksJSON) {
//   condition.allDucks = JSON.parse(allDucksJSON);
// }

function Duck(name, image) {
  this.name = name;
  this.imageFile = image;
  this.votes = 0;
  this.views = 0;
  condition.allDucks.push(this);
}

let previousImages = [];

function uniqueImageChecker() {
  function pickRandom() {
    return Math.floor(Math.random() * condition.allDucks.length);
  }
  let imageArray = [];
  while (imageArray.length < 3) {
    let randomIdx = pickRandom();
    // console.log(randomIdx);
    if (
      !imageArray.includes(randomIdx) &&
      !previousImages.includes(randomIdx)
    ) {
      imageArray.push(randomIdx);
    }
  }
  previousImages = imageArray;
  return imageArray;
}

function duckRender() {
  let uniqueDucks3 = uniqueImageChecker();

  let duck1 = uniqueDucks3[0];
  let duck2 = uniqueDucks3[1];
  let duck3 = uniqueDucks3[2];

  // console.log(duck1, duck2, duck3);

  image1.src = condition.allDucks[duck1].imageFile;
  image1.alt = condition.allDucks[duck1].name;

  image2.src = condition.allDucks[duck2].imageFile;
  image2.alt = condition.allDucks[duck2].name;

  // console.log(condition.allDucks[duck3]);

  image3.src = condition.allDucks[duck3].imageFile;
  image3.alt = condition.allDucks[duck3].name;

  condition.allDucks[duck1].views++;
  condition.allDucks[duck2].views++;
  condition.allDucks[duck3].views++;

  setupListeners();
}

function renderResultsButton() {
  const button = document.querySelector(".showResults");
  if (button) {
    button.style.display = "block";
  }
  const chartContainer = document.querySelector("#report");
  if (chartContainer) {
    chartContainer.style.display = "none";
  }
}

function renderResults() {
  console.log(condition);
  let duckName = [];
  let duckVotes = [];
  let duckViews = [];

  for (let i = 0; i < condition.allDucks.length; i++) {
    // console.log(condition.allDucks[i].votes);
    duckName.push(condition.allDucks[i].name);
    duckVotes.push(condition.allDucks[i].votes);
    duckViews.push(condition.allDucks[i].views);
  }
  // console.log(duckVotes);
  // console.log(duckViews);

  const data = {
    labels: duckName,
    datasets: [
      { label: "Votes", data: duckVotes },
      { label: "Views", data: duckViews },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: { beginAtZero: true },
      },
    },
  };
  const duckChart = new Chart("report", config);
}

function handleClick(event) {

    // localStorage.setItem("allDucks", JSON.stringify(condition.allDucks));

  // console.log("handle click called");
  let duckName = event.target.alt;
  // console.log(duckName);
  for (let i = 0; i < condition.allDucks.length; i++) {
    if (duckName === condition.allDucks[i].name) {
      condition.allDucks[i].votes++;
      // console.log("vote counter",condition.allDucks[i].votes);
      condition.currentClicks++;

      console.log(condition.currentClicks);
      if (condition.currentClicks >= condition.clicksAllowed) {
        document.querySelector(".results").style.display = "block";
      }
    }
  }



  if (condition.currentClicks >= condition.clicksAllowed) {
    removeListener();
    renderResultsButton();
  } else {
    duckRender();
  }
}

function setupListeners() {
  for (let i = 0; i < duckContainer.length; i++) {
    duckContainer[i].addEventListener("click", handleClick);
  }
}

function removeListener() {
  for (let i = 0; i < duckContainer.length; i++) {
    duckContainer[i].removeEventListener("click", handleClick);
  }
}

console.log(condition.allDucks);

const showResultsButton = document.querySelector(".showResults");
showResultsButton.addEventListener("click", function () {
  renderResults();
  const chartContainer = document.querySelector("#report");
  if (chartContainer) {
    chartContainer.style.display =
      chartContainer.style.display === "none" ? "block" : "none";
  }
  showResultsButton.style.display = "none";
});

new Duck("bag", "images/bag.jpg");
new Duck("banana", "images/banana.jpg");
new Duck("bathroom", "images/bathroom.jpg");
new Duck("boots", "images/boots.jpg");
new Duck("breakfast", "images/breakfast.jpg");
new Duck("bubblegum", "images/bubblegum.jpg");
new Duck("chair", "images/chair.jpg");
new Duck("cthulhu", "images/cthulhu.jpg");
new Duck("dog-duck", "images/dog-duck.jpg");
new Duck("dragon", "images/dragon.jpg");
new Duck("pen", "images/pen.jpg");
new Duck("pet-sweep", "images/pet-sweep.jpg");
new Duck("scissors", "images/scissors.jpg");
new Duck("shark", "images/shark.jpg");
new Duck("sweep", "images/sweep.png");
new Duck("tauntaun", "images/tauntaun.jpg");
new Duck("unicorn", "images/unicorn.jpg");
new Duck("water-can", "images/water-can.jpg");
new Duck("wine-glass", "images/wine-glass.jpg");

// check if local storage exists || if it does not create new instance of local storage || if not use local storage thats already there.
// if im getting local storage, convert local storage back to object and reapply . get local storage, parase, and set to allDucks

duckRender();
