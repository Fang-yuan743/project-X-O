/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
/*---------------------------- Variables (state) ----------------------------*/
let board = ["", "", "", "", "", "", "", "", ""]
let board2 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
let turn = "X"
let winner = false
let tie = false
/*------------------------ Cached Element References ------------------------*/
const sqrElem = document.querySelectorAll(".sqr")
const boardElem = document.querySelector(".board")
const resetBtnElem = document.querySelector("#reset")
const choiceElem1 = document.querySelector("#choice1")
const choiceElem2 = document.querySelector("#choice2")

const msgElem = document.querySelector("#message")

const sqrElem2 = document.querySelectorAll(".sqr2")
const boardElem2 = document.querySelector(".board2")
const resetBtnElem2 = document.querySelector("#reset2")
const choiceElem3 = document.querySelector("#choice3")
const choiceElem4 = document.querySelector("#choice4")

const untilFound = document.querySelector(".hidden")
/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ["", "", "", "", "", "", "", "", ""]
  board2 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
  turn = "X"
  winner = false
  tie = false
  render()
}

function render() {
  updateBoard()
  updateMessage()
  updateBoard2()
}

function updateBoard() {
  board.forEach((elem, index) => {
    sqrElem[index].textContent = elem
    if (board[index] === "") {
      sqrElem[index].style.backgroundColor = ""
      msgElem.style.color = ""
    }
  })
}
function updateBoard2() {
  board2.forEach((elem2, index) => {
    sqrElem2[index].textContent = elem2
    if (board2[index] === "") {
      sqrElem2[index].style.backgroundColor = ""
      msgElem.style.color = ""
    }
  })
}

function updateMessage() {
  if (winner === false && tie === false) {
    msgElem.textContent = `It's ${turn}'s turn`
  } else if (winner === false && tie === true) {
    msgElem.textContent = `It's tie!`
    msgElem.style.color = "red"
  } else if (winner === true) {
    msgElem.textContent = `${turn} wins!`
    msgElem.style.color = "yellow"
  }
}

function handleClick(event) {
  const sqrIndex = event.target.id
  if (board[sqrIndex] || winner === true) {
    return
  }
  placePiece(sqrIndex)
  checkForWinner()
  checkForTie()
  switchPlayerTurn()
  if (board[sqrIndex] === "X") {
    event.target.style.backgroundColor = "#702246ff"
    console.log("hi")
  } else if (board[sqrIndex] === "O") {
    event.target.style.backgroundColor = "#89621fff"
  }
  render()
}
function handleClick2(event2) {
  const sqrIndex2 = event2.target.id
  if (board2[sqrIndex2] || winner === true) {
    return
  }
  placePiece2(sqrIndex2)
  checkForWinner()
  checkForTie2()
  switchPlayerTurn()
  if (board2[sqrIndex2] === "X") {
    event2.target.style.backgroundColor = "#702246ff"
    console.log("hi1")
  } else if (board2[sqrIndex2] === "O") {
    event2.target.style.backgroundColor = "#89621fff"
  }
  render()
}

function placePiece(index) {
  board[index] = turn
}
function placePiece2(index) {
  board2[index] = turn
}

function checkForWinner() {
  for (let i = 0; i < 8; i++) {
    let combo = winningCombos[i]
    let a = board[combo[0]]
    let b = board[combo[1]]
    let c = board[combo[2]]
    if (a !== "" && a === b && a === c) {
      winner = true
    }
  }
}

function checkForTie() {
  for (let i = 0; i < 9; i++)
    if (winner === true) {
      return
    } else if (board[i] === "") {
      tie = false
      return
    } else {
      tie = true
    }
}
function checkForTie2() {
  for (let i = 0; i < 16; i++)
    if (winner === true) {
      return
    } else if (board2[i] === "") {
      tie = false
      return
    } else {
      tie = true
    }
}

function switchPlayerTurn() {
  if (winner === true) {
    return
  } else if (winner === false && turn === "X") {
    turn = "O"
  } else if (turn === "O") {
    turn = "X"
  }
}

/*----------------------------- Event Listeners ----------------------------*/
for (let i = 0; i < 9; i++) {
  sqrElem[i].addEventListener("click", handleClick)
}

for (let i = 0; i < 16; i++) {
  sqrElem2[i].addEventListener("click", handleClick2)
}

resetBtnElem.addEventListener("click", init)
resetBtnElem2.addEventListener("click", init)

choiceElem1.addEventListener("click", () => {
  choiceElem1.classList.add("hidden")
  choiceElem2.addEventListener("click", () => {
    choiceElem2.classList.add("hidden")
    boardElem.classList.remove("hidden")
    msgElem.classList.remove("hidden")
  })
})

choiceElem3.addEventListener("click", () => {
  choiceElem3.classList.add("hidden")
  choiceElem4.addEventListener("click", () => {
    choiceElem4.classList.add("hidden")
    boardElem2.classList.remove("hidden")
    msgElem.classList.remove("hidden")
  })
})
choiceElem4.classList.remove("hidden")
boardElem2.classList.add("hidden")

boardElem.classList.add("hidden")
msgElem.classList.add("hidden")
untilFound.classList.remove("hidden")

document.addEventListener("DOMContentLoaded", init)
