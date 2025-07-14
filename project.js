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
const sqrElem2 = document.querySelectorAll(".sqr2")
const msgElem = document.querySelector("#message")
const resetBtnElem = document.querySelector("#reset")
const untilFound = document.querySelector(".hidden")
const boardElem = document.querySelector(".board")
const boardElem2 = document.querySelector(".board2")
const choiElem1 = document.querySelector("#choi1")
const choiElem2 = document.querySelector("#choi2")
const choiElem3 = document.querySelector("#choi3")
const choiElem4 = document.querySelector("#choi4")
/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ["", "", "", "", "", "", "", "", ""]
  turn = "X"
  winner = false
  tie = false
  render()
}

function render() {
  updateBoard()
  updateMessage()
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

function placePiece(index) {
  board[index] = turn
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

resetBtnElem.addEventListener("click", init)

choiElem1.addEventListener("click", () => {
  choiElem1.classList.add("hidden")
  choiElem2.addEventListener("click", () => {
    choiElem2.classList.add("hidden")
    boardElem.classList.remove("hidden")
    msgElem.classList.remove("hidden")
  })
})

boardElem.classList.add("hidden")
msgElem.classList.add("hidden")
untilFound.classList.remove("hidden")

document.addEventListener("DOMContentLoaded", init)
