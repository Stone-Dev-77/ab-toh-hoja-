const selectionButtons = document.querySelectorAll("[data-selection]")
const finalColumn = document.querySelector("[data-final-column]")
const yourScoreSpan = document.querySelector("[data-your-score]")
const computerScoreSpan = document.querySelector("[data-computer-score]")
const SELECTIONS = [
  {
    name: "rock",
    emoji: "✊",
    beats: "scissors",
  },
  {
    name: "paper",
    emoji: "✋",
    beats: "rock",
  },
  {
    name: "scissors",
    emoji: "✌",
    beats: "paper",
  },
]

selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", () => {
    const selectionName = selectionButton.dataset.selection
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName,
    )
    makeSelection(selection)
  })
})

function makeSelection(selection) {
  const computerSelection = randomIndex()
  const yourWinner = isWinner(selection, computerSelection)
  const computerWinner = isWinner(computerSelection, selection)

  addSelection(computerSelection, computerWinner)
  addSelection(selection, yourWinner)

  if (yourWinner) incrementSpan(yourScoreSpan)
  if (computerWinner) incrementSpan(computerScoreSpan)
}

function incrementSpan(scoreSpan) {
  scoreSpan.textContent = parseInt(scoreSpan.textContent) + 1
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}

function addSelection(selection, winner) {
  const div = document.createElement("div")
  div.textContent = selection.emoji
  div.classList.add("result-selection")
  if (winner) div.classList.add("winner")
  finalColumn.after(div)
}

function randomIndex() {
  const index = Math.floor(Math.random() * SELECTIONS.length)
  return SELECTIONS[index]
}
