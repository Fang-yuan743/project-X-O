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
let turn = "X"
let winner = false
let tie = false
/*------------------------ Cached Element References ------------------------*/
const sqrElem = document.querySelectorAll(".sqr")
const msgElem = document.querySelector("#message")
const resetBtnElem = document.querySelector("#reset")
const untilFound = document.querySelector("#hidden")
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

sqrElem.forEach((sqr) => {
  sqr.classList.add("hidden")
})
console.log(untilFound)

untilFound.style.font
untilFound.classList.remove("hidden")

document.addEventListener("DOMContentLoaded", init)
