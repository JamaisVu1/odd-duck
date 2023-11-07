const duckContainer = document.getElementById("ducks");
const resultContainer = document.getElementById("results");

const image1 = document.querySelector('#ducks img:first-child');
const image2 = document.querySelector('#ducks img:nth-child(2)');
const image3 = document.querySelector('#ducks img:nth-child(3)');

const button = document.getElementById("showResults");


let condition = {
    currentClicks: 0,
    clicksAllowed: 25,
    allDucks: [],
}


function Duck(name,image) {
    this.name = name;
    this.imageFile = image;
    this.votes = 0;
    this.views = 0;
    condition.allDucks.push(this);
}


function duckRender() {
    function pickRandom(){
        return Math.floor(Math.random() * condition.allDucks.length);
}

let duck1 = pickRandom();
let duck2 = pickRandom();
let duck3 = pickRandom();

while (duck1 === duck2 || duck2 === duck3 || duck3 === duck1) {
    duck1 = pickRandom();
    duck2 = pickRandom();
    duck3 = pickRandom();
}


image1.src = condition.allDucks[duck1].imageFile;
image1.alt = condition.allDucks[duck1].name;

image2.src = condition.allDucks[duck2].imageFile;
image2.alt = condition.allDucks[duck2].name;

image3.src = condition.allDucks[duck3].imageFile;
image3.alt = condition.allDucks[duck3].name;

condition.allDucks[duck1].views++;
condition.allDucks[duck2].views++;
condition.allDucks[duck3].views++;

}


function renderResultsButton () {
    button.style.display = "block";
}

function renderResults() {
  for (let i = 0; i < condition.allDucks.length; i++) {
    const duck = condition.allDucks[i];
    console.log(`${duck.name}: Views - ${duck.views}, Votes - ${duck.votes}`);
  }
}


function handleClick(event) {
 
    let duckName = event.target.alt;

    for ( let i = 0; i < condition.allDucks.length; i++ ) {
    if( duckName === condition.allDucks[i].name ) {
    condition.allDucks[i].votes++;
    break;
  }
 }

 condition.currentClicks++;

 if(condition.currentClicks >= condition. clicksAllowed) {
  
  removeListener();
  renderResultsButton();
 } else {
   duckRender();
 }

}

function setupListeners() {
  
 duckContainer.addEventListener("click", handleClick);
 button.addEventListener("click", renderResults)
}

function removeListener() {
 duckContainer.removeEventListener("click", handleClick);
}


new Duck('bag','images/bag.jpg');
new Duck('banana','images/banana.jpg');
new Duck('bathroom','images/bathroom.jpg');
new Duck('boots','images/boots.jpg');
new Duck('breakfast','images/breakfast.jpg');
new Duck('bubblegum','images/bubblegum.jpg');
new Duck('chair','images/chair.jpg');
new Duck('cthulu','images/cthulhu.jpg');
new Duck('dog-duck','images/dog-duck.jpg');
new Duck('dragon','images/dragon.jpg');
new Duck('pen','images/pen.jpg');
new Duck('pet-sweep','images/pet-sweep.jpg');
new Duck('scissors','images/scissors.jpg');
new Duck('shark','images/shark.jpg');
new Duck('sweep','images/sweep.png');
new Duck('tauntaun','images/tauntaun.jpg');
new Duck('unicorn','images/unicorn.jpg');
new Duck('water-can','images/water-can.jpg');
new Duck('wine-glass','images/wine-glass.jpg');


duckRender();
setupListeners();
renderResults();