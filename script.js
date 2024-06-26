const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Options values for buttons
let options = {
  fruits: [
    "Mango",
    "Grape",
    "Kiwi",
    "Mandarin",
    "Blueberry",
    "Pineapple",
    "Strawberry",
    "Peach",
    "Orange",
    "Lemon",
    "Banana",
    "Coconut",
    "Lime",
    "Grapefruit",
    "Watermelon",
    "Apple",
    "Pomegranate",
    "Apricot ",
    "Avocado",
    "Blackberry",
    "Cherry",
    "Cranberry",
    "Fig",
    "Mango",
    "Dragon fruit",
  ],
  animals: [
    "Hedgehog",
    "Rhinoceros",
    "Squirrel",
    "Panther",
    "Walrus",
    "Zebra",
    "Lion",
    "Tiger",
    "Elephant",
    "Giraffe",
    "Monkey",
    "Dolphin",
    "Penguin",
    "Wolf",
    "Cat",
    "Dog",
    "Mouse",
    "Cow",
    "Bear",
    "Fox",
    "Turtle",
    "Snake",
    "Kangaroo",
    "Sheep",
    "Horse",
    "Penguin",
    "Rabbit",
    "Bird",
  ],
  countries: [
    "Turkey",
    "Hungary",
    "Kyrgyzstan",
    "Switzerland",
    "Germany",
    "France",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Belgium",
    "Spain",
    "Italy",
    "Russia",
    "Poland",
    "Ukraine",
    "Greece",
    "Portugal",
    "Romania",
    "Croatia",
    "Bulgaria",
    "Serbia",
    "Czech Republic",
    "Slovakia",
    "Estonia",
    "Hungary",
    "Belarus",
    "Lithuania",
    "Netherlands",
    "Austria",
    "Ireland",
    "United Kingdom",
    "Canada",
    "Australia",
    "New Zealand",
    "Japan",
    "China",
    "Brazil",
    "Argentina",
    "Mexico",
    "South Korea",
  ],
};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValur matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word lenfth
            if (winCount == charArray.length) {
              Swal.fire({
                position: "top",
                icon: "success",
                title: "You win congrats!! Please click New Game button.",
                showConfirmButton: false,
                timer: 3000,
              });
              //block all buttons
              blocker();
            }
          }
        });
      } else {
       
        count += 1;
      
        drawMan(count);
       
        if (count == 7) {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "You lose!! Please click New Game button.",
            showConfirmButton: false,
            timer: 3000,
          });
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;